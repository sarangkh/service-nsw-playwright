import { Locator, Page } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly pageMain: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageMain = page.locator('main').first();
  }
}
