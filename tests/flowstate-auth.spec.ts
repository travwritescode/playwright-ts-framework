import { expect, test } from '@playwright/test';

test.describe('Flowstate UI — auth', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('shows sign-in form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('can switch to register mode', async ({ page }) => {
    await page.getByRole('button', { name: 'Need an account? Register' }).click();
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
  });

  test('logs in and lands on tasks', async ({ page }) => {
    const email = process.env.FLOWSTATE_E2E_EMAIL;
    const password = process.env.FLOWSTATE_E2E_PASSWORD;
    test.skip(!email || !password, 'Set FLOWSTATE_E2E_EMAIL and FLOWSTATE_E2E_PASSWORD (registered user; API must be up).');

    await page.getByLabel('Email').fill(email!);
    await page.getByLabel('Password').fill(password!);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByRole('heading', { name: 'My Tasks' })).toBeVisible({
      timeout: 15_000,
    });
  });
});
