import { expect, test } from '@playwright/test';
import { LoginPage } from '../models/LoginPage.js'
import { TasksPage } from '../models/TasksPage.js'

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

    await loginPage.registerToggle.click();

    await expect(loginPage.heading).toHaveText('Create Account');
    await expect(loginPage.createAccountButton).toBeVisible();
  });

  test('logs in and lands on tasks', async ({ page }) => {
    const email = `travshootsphotos@gmail.com`;
    const password = 'Test1234?';

    const loginPage = new LoginPage(page);
    const tasksPage = new TasksPage(page);

    await loginPage.login(email, password)

    await expect(tasksPage.heading).toHaveText('My Tasks', {
      timeout: 15_000,
    });
  });
});
