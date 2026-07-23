import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 13'] });

test('menu drawer works on a mobile viewport', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const menuButton = page.getByRole('button', { name: 'Open menu' });
  await menuButton.waitFor({ state: 'visible' });
  await menuButton.click();
  await expect(page.getByRole('link', { name: 'SHOP ALL', exact: true })).toBeVisible();
});