import { expect, test } from '@playwright/test';
import { LoginPage } from '../models/LoginPage.js'

test.describe('Flowstate UI — auth', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('shows sign-in form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await expect(loginPage.heading).toHaveText('Sign In');
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('can switch to register mode', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // TO-DO: figure out an accessible way to make this toggle a single selector
    await page.getByRole('button', { name: 'Need an account? Register' }).click();

    await expect(loginPage.heading).toHaveText('Create Account');
    await expect(loginPage.createAccountButton).toBeVisible();
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
