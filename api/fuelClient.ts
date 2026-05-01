import { APIRequestContext } from '@playwright/test';
import { config } from '../config';

export interface FuelTokenResponse {
  access_token?: string;
  token_type?: string;
  [key: string]: unknown;
}

export class FuelClient {
  private readonly request: APIRequestContext;
  private readonly basicAuthHeader: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.basicAuthHeader =
      config.fuel.authorizationHeader ||
      (config.fuel.apiKey && config.fuel.apiSecret
        ? `Basic ${Buffer.from(`${config.fuel.apiKey}:${config.fuel.apiSecret}`).toString('base64')}`
        : '');
  }

  hasCredentials(): boolean {
    return Boolean(this.basicAuthHeader);
  }

  async getAccessToken(): Promise<{ status: number; body: FuelTokenResponse }> {
    const response = await this.request.get(`${config.fuel.baseUrl}${config.fuel.oauthPath}`, {
      headers: {
        Authorization: this.basicAuthHeader,
        Accept: 'application/json',
      },
    });

    const body = (await response.json()) as FuelTokenResponse;
    return { status: response.status(), body };
  }

  async getLovs(accessToken: string, tokenType?: string): Promise<{ status: number; text: string }> {
    const normalizedTokenType = (tokenType || 'Bearer').replace(/^BearerToken$/i, 'Bearer');

    const response = await this.request.get(`${config.fuel.baseUrl}${config.fuel.lovsPath}`, {
      headers: {
        Authorization: `${normalizedTokenType} ${accessToken}`,
        Accept: 'application/json',
        ...(config.fuel.apiKey ? { 'X-API-Key': config.fuel.apiKey } : {}),
      },
    });

    return { status: response.status(), text: await response.text() };
  }
}
