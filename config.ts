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

export const config = {
  environment,
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://api.nsw.gov.au',
    apiKey: process.env.API_KEY || '',
    apiSecret: process.env.API_SECRET || '',
    authorizationHeader: process.env.API_AUTH_HEADER || '',
    endpoints: {
      productCategory: process.env.API_PRODUCT_CATEGORY_PATH || '/ProductCategory',
    },
  },
  fuel: {
    baseUrl: process.env.FUEL_API_BASE_URL || 'https://api.onegov.nsw.gov.au',
    oauthPath:
      process.env.FUEL_API_OAUTH_PATH || '/oauth/client_credential/accesstoken?grant_type=client_credentials',
    lovsPath: process.env.FUEL_API_LOVS_PATH || '/FuelCheckRefData/v1/fuel/lovs',
    apiKey: process.env.FUEL_API_KEY || process.env.API_KEY || '',
    apiSecret: process.env.FUEL_API_SECRET || process.env.API_SECRET || '',
    authorizationHeader: process.env.FUEL_API_AUTH_HEADER || process.env.API_AUTH_HEADER || '',
  },
  ui: {
    baseUrl: process.env.UI_BASE_URL || 'https://www.service.nsw.gov.au',
    searchPath: process.env.UI_SEARCH_PATH || '/search-results',
  },
};
