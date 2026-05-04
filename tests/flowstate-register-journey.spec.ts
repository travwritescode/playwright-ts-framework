import { expect, test } from '@playwright/test';
import { LoginPage } from '../models/LoginPage.js'
import { TasksPage } from '../models/TasksPage.js'

test.describe('Journey A: first-time user registration path', () => {
    test('User registers and is logged in + sees empty task list', async ({ page }) => {
        const email = `travshootsphotos+${Date.now()}@gmail.com`;
        const password = 'Test1234?';
        const loginPage = new LoginPage(page);
        const tasksPage = new TasksPage(page);

        await loginPage.goto();
        await loginPage.register(email, password)

        await expect(tasksPage.heading).toBeVisible();
        await expect(tasksPage.emptyStateTip).toBeVisible();
        await expect(tasksPage.createTaskButton).toBeVisible();
        await expect(tasksPage.signOutButton).toBeVisible();
    })
})