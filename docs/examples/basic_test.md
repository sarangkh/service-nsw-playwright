# Basic Test Example

## UI example (page object usage)

```ts
import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('homepage loads', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.assertLoaded();
});
```

## API example (Fuel client usage)

```ts
import { test, expect } from '@playwright/test';
import { FuelClient } from '../../api/fuelClient';

test('fuel token', async ({ request }) => {
  const fuel = new FuelClient(request);
  expect(fuel.hasCredentials()).toBeTruthy();
  const token = await fuel.getAccessToken();
  expect(token.status).toBe(200);
});
```

