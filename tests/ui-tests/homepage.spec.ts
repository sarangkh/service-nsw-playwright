import { expect, test } from '@playwright/test';
import { config } from '../../config';
import { testData } from '../../fixtures/testData';
import { HomePage } from '../../pages/HomePage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';

test.describe('Service NSW - Public Website UI Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
  });

  test('UI-001 Validate homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(page).toHaveURL(/service\.nsw\.gov\.au/);
    await expect(page).toHaveTitle(/.+/);
    await expect(homePage.heading).toBeVisible();
  });

  test('UI-002 Validate important UI elements', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.header).toBeVisible();
    await expect(homePage.footer).toBeVisible();
    await expect(homePage.searchInput).toBeVisible();
  });

  test('UI-003 Search for a service (driver licence renewal)', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    await homePage.searchForService(testData.ui.validSearchTerm);
    await expect(page).toHaveURL(
      new RegExp(`${config.ui.searchPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\?q=`),
    );
    await expect(searchResultsPage.pageMain).toContainText(/Search|Popular search topics/i);
  });
});
