import { Page } from '@playwright/test';

export class UIHelpers {
  static async fillInput(page: Page, selector: string, text: string): Promise<void> {
    await page.waitForSelector(selector);
    await page.fill(selector, text);
  }

  static async clickElement(page: Page, selector: string): Promise<void> {
    await page.waitForSelector(selector);
    await page.click(selector);
  }

  static async getText(page: Page, selector: string): Promise<string> {
    await page.waitForSelector(selector);
    return (await page.textContent(selector)) || '';
  }

  static async isElementVisible(page: Page, selector: string): Promise<boolean> {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      return await page.isVisible(selector);
    } catch {
      return false;
    }
  }

  static async getAllText(page: Page, selector: string): Promise<string[]> {
    return await page.$$eval(selector, (elements) =>
      elements.map((el) => (el.textContent || '').trim())
    );
  }
}
