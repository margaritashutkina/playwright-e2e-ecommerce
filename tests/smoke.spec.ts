import { test, expect } from '@playwright/test';

/**
 * CI smoke test.
 *
 * The full E2E suite runs against the live production storefront, which
 * Shopify's bot protection rate-limits from shared CI runner IPs. To keep the
 * pipeline signal reliable, CI runs this environment-independent smoke test
 * instead. The production suite is run locally / on demand.
 */
test('smoke: browser and test runner are healthy', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('smoke: navigation works end to end', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/.*intro/);
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});