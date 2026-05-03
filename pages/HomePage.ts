import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly header: Locator;
  readonly footer: Locator;
  readonly searchForm: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1#page-title, h1').first();
    this.header = page.locator('header, [role="banner"]').first();
    this.footer = page.locator('footer, [role="contentinfo"]').first();
    this.searchForm = page.locator('form[role="search"]').first();
    this.searchInput = this.searchForm.locator('input[name="q"]').first();
    this.searchButton = this.searchForm.locator('button[type="submit"]').first();
  }

  async open() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async searchForService(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
