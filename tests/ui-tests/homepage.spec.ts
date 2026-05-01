import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';
import { testData } from '../../fixtures/testData';

test.describe('Service NSW - Public Website UI Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
  });

  test('UI-001 Validate homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.assertLoaded();
  });

  test('UI-002 Validate important UI elements', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.assertCoreElementsVisible();
  });

  test('UI-003 Search for a service (driver licence renewal)', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    await homePage.searchForService(testData.ui.validSearchTerm);
    await searchResultsPage.assertSearchResultsLoaded();
  });

});
