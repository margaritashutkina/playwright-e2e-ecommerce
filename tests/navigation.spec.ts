import { test, expect } from '@playwright/test';

test.describe('Main navigation', () => {
    test('SHOP ALL leads to the full collection', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.getByRole('button', { name: 'Open menu' }).click();
        await page.getByRole('link', { name: 'SHOP ALL', exact: true }).click();
        await expect(page).toHaveURL(/collections\/all/);
        // TODO(you): assert that at least one product card is visible
    });

    test('Datejust collection opens from the MODELS menu', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.getByRole('button', { name: 'Open menu' }).click();
        await page.getByRole('link', { name: 'MODELS ›' }).click();

        const datejust = page.getByRole('link', { name: 'Datejust', exact: true });
        await expect(datejust).toBeVisible();   // wait for the submenu animation to finish
        await datejust.click();

        await page.waitForURL(/collections\/datejust/);   // explicit navigation wait
        await expect(page).toHaveURL(/collections\/datejust/);
    });

    test('Contact page is reachable', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.getByRole('button', { name: 'Open menu' }).click();
        await page.getByRole('link', { name: 'CONTACT', exact: true }).click();
        await expect(page).toHaveURL(/pages\/contact/);
    });
});