import { expect, Locator, Page } from '@playwright/test';
import { config } from '../config';

export class SearchResultsPage {
  readonly page: Page;
  readonly pageMain: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageMain = page.locator('main').first();
  }

  async assertSearchResultsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${config.ui.searchPath}\\?q=`));
    await expect(this.pageMain).toContainText(/Search|Popular search topics/i);
  }
}
