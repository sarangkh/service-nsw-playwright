import { expect, Locator, Page } from '@playwright/test';

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

  async open(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/service\.nsw\.gov\.au/);
    await expect(this.page).toHaveTitle(/.+/);
    await expect(this.heading).toBeVisible();
  }

  async assertCoreElementsVisible(): Promise<void> {
    await expect(this.header).toBeVisible();
    await expect(this.footer).toBeVisible();
    await expect(this.searchInput).toBeVisible();
  }

  async searchForService(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
