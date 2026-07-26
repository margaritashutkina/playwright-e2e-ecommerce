import { test, expect } from '@playwright/test';

const COLLECTION = '/collections/all';

test.describe('Product page navigation', () => {

  test('clicking a product card navigates to its own product page', async ({ page }) => {
    await page.goto(COLLECTION);

    const firstCard = page.locator('.watch-card').first();
    await expect(firstCard).toBeVisible();

    const href = await firstCard.getAttribute('href');
    expect(href).toContain('/products/');

    const cardTitle = (await firstCard.locator('.card-model').textContent())?.trim();

    await firstCard.click();

    await expect(page).toHaveURL(/\/products\//);
    await expect(page.locator('h1.product-title')).toContainText(cardTitle ?? '');
  });

  test('product page loads with title, price and inquire button', async ({ page }) => {
    await page.goto(COLLECTION);
    await page.locator('.watch-card').first().click();
    await expect(page).toHaveURL(/\/products\//);

    await expect(page.locator('h1.product-title')).toBeVisible();

    const price = page.locator('.product-price');
    await expect(price).toBeVisible();
    await expect(price).toHaveText(/Dhs\.\s?[\d,]+/);

    const inquire = page.locator('a.product-inquire');
    await expect(inquire).toBeVisible();
    await expect(inquire).toHaveAttribute('href', /wa\.me/);
  });

  test('a product URL is directly shareable (loads on its own)', async ({ page }) => {
    await page.goto(COLLECTION);
    const firstCard = page.locator('.watch-card').first();
    const href = await firstCard.getAttribute('href');
    expect(href).toBeTruthy();

    await page.goto(href!);

    await expect(page.locator('h1.product-title')).toBeVisible();
    await expect(page.locator('.product-price')).toBeVisible();
  });

});