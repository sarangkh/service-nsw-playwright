import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

export type TestEnvironment = 'dev' | 'test' | 'local';

function resolveEnvironment(): TestEnvironment {
  const env = (process.env.TEST_ENV || process.env.ENVIRONMENT || 'dev').toLowerCase();
  if (env === 'dev' || env === 'test' || env === 'local') {
    return env;
  }
  return 'dev';
}

function loadEnvironmentFiles(environment: TestEnvironment): void {
  const envFiles = [
    '.env',
    '.env.local',
    `.env.${environment}`,
    `.env.${environment}.local`,
  ];

  for (const file of envFiles) {
    const fullPath = resolve(process.cwd(), file);
    if (existsSync(fullPath)) {
      dotenv.config({ path: fullPath });
    }
  }
}

const environment = resolveEnvironment();
loadEnvironmentFiles(environment);

/** All URLs and paths come from env (see `.env.example` and `.env.<environment>`). No in-code defaults. */
export const config = {
  environment,
  api: {
    baseUrl: process.env.API_BASE_URL ?? '',
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    authorizationHeader: process.env.API_AUTH_HEADER ?? '',
    endpoints: {
      productCategory: process.env.API_PRODUCT_CATEGORY_PATH ?? '',
    },
  },
  fuel: {
    baseUrl: process.env.FUEL_API_BASE_URL ?? '',
    oauthPath: process.env.FUEL_API_OAUTH_PATH ?? '',
    lovsPath: process.env.FUEL_API_LOVS_PATH ?? '',
    apiKey: process.env.FUEL_API_KEY ?? process.env.API_KEY ?? '',
    apiSecret: process.env.FUEL_API_SECRET ?? process.env.API_SECRET ?? '',
    authorizationHeader: process.env.FUEL_API_AUTH_HEADER ?? process.env.API_AUTH_HEADER ?? '',
  },
  ui: {
    baseUrl: process.env.UI_BASE_URL ?? '',
    searchPath: process.env.UI_SEARCH_PATH ?? '',
  },
};
