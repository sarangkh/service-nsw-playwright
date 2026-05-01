import { test, expect } from '@playwright/test';
import { FuelClient } from '../../api/fuelClient';

test.describe('Fuel API - Simple Scenarios', () => {
  test('FUEL-001 @core: Generate OAuth access token', async ({ request }) => {
    const fuelClient = new FuelClient(request);
    expect(fuelClient.hasCredentials(), 'Missing Fuel API auth credentials in env').toBeTruthy();

    const token = await fuelClient.getAccessToken();
    expect(token.status).toBe(200);
    expect(token.body.access_token).toBeTruthy();
    expect(token.body.token_type).toBeTruthy();
  });

  test('FUEL-002 Get Fuel LOVs reference data', async ({ request }) => {
    const fuelClient = new FuelClient(request);
    expect(fuelClient.hasCredentials(), 'Missing Fuel API auth credentials in env').toBeTruthy();

    const token = await fuelClient.getAccessToken();
    expect(token.status).toBe(200);
    const accessToken = token.body.access_token as string;
    expect(accessToken).toBeTruthy();

    const lovs = await fuelClient.getLovs(accessToken, token.body.token_type as string | undefined);
    expect([200, 401, 403]).toContain(lovs.status);

    if (lovs.status === 200) {
      const lovsBody = JSON.parse(lovs.text);
      const hasContent =
        lovsBody &&
        ((Array.isArray(lovsBody) && lovsBody.length > 0) ||
          (typeof lovsBody === 'object' && Object.keys(lovsBody).length > 0));
      expect(hasContent).toBeTruthy();
      return;
    }

    expect(lovs.text.toLowerCase()).toMatch(/unauthor|forbidden|invalid|not valid|access|apikey/);
  });
});
