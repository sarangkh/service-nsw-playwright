import { Page, Locator } from '@playwright/test';

export class ServiceDetailsPage {
  readonly page: Page;
  readonly serviceTitle: Locator;
  readonly serviceDescription: Locator;
  readonly actionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.serviceTitle = page.locator('h1, [data-testid="service-title"]');
    this.serviceDescription = page.locator('[data-testid="service-description"], article p');
    this.actionButton = page.locator('button:has-text("Apply"), button:has-text("Get started")');
  }

  async isLoaded(): Promise<boolean> {
    return await this.serviceTitle.isVisible();
  }

  async getServiceTitle(): Promise<string> {
    return (await this.serviceTitle.textContent()) || '';
  }

  async hasDescription(): Promise<boolean> {
    return await this.serviceDescription.isVisible();
  }

  async isActionButtonVisible(): Promise<boolean> {
    return await this.actionButton.isVisible();
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }
}
