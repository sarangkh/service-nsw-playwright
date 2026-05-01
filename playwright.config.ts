import { defineConfig, devices } from '@playwright/test';
import { config } from './config';

/**
 * Playwright Configuration
 * Supports UI and API test projects with multi-browser testing
 */
export default defineConfig({
  /* Test directories */
  testMatch: ['tests/ui-tests/**/*.spec.ts', 'tests/api-tests/**/*.spec.ts'],
  testIgnore: ['tests/api-tests/products.spec.ts'],
  
  /* Run tests in parallel */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  /* Simple reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['playwright-ctrf-json-reporter', { outputFile: 'ctrf-report.json' }],
    ['list']
  ],
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: config.ui.baseUrl,
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    /* Video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: undefined,
  timeout: 30000,
  expect: { timeout: 5000 },
});
