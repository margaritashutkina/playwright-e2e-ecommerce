import { test, expect } from '@playwright/test';

test.describe('Product catalogue', () => {
  test('collection page renders product cards with name, price and image', async ({ page }) => {
    await page.goto('/collections/all', { waitUntil: 'domcontentloaded' });

    const firstCard = page.getByRole('img', { name: /rolex|oyster|datejust/i }).first();
    await expect(firstCard).toBeVisible();

    // price is present AND formatted as money — catches a price that fails to load
    await expect(page.getByText(/Dhs\.\s?[\d,]+/).first()).toBeVisible();

    await expect(page.getByRole('button', { name: 'VIEW DETAILS' }).first()).toBeVisible();
  });

  test('VIEW DETAILS opens the product detail dialog', async ({ page }) => {
    await page.goto('/collections/all', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'VIEW DETAILS' }).first().click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Payment Methods +' })).toBeVisible();
  });
});