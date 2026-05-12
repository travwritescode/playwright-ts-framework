import { expect, test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage.js";
import { TasksPage } from "../models/TasksPage.js";

test.describe("Flowstate Auth Journeys", () => {
  let loginPage: LoginPage;
  let tasksPage: TasksPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    tasksPage = new TasksPage(page);

    await loginPage.goto();
  })

  test(
    "Sign in smoke",
    {
      tag: ["@smoke", "@journey-auth", "@regression"],
    },
    async () => {
      const email = `travshootsphotos@gmail.com`;
      const password = "Test1234?";

      await loginPage.login(email, password);

      await expect(tasksPage.heading).toBeVisible();
      await expect(tasksPage.createTaskButton).toBeVisible();
      await expect(tasksPage.signOutButton).toBeVisible();
      await expect(tasksPage.tasks).toHaveCount(3);
    },
  );

  test(
    "Journey A: first-time user registration path",
    {
      tag: ["@journey-auth", "@regression"],
    },
    async () => {
      const email = `travshootsphotos+${Date.now()}@gmail.com`;
      const password = "Test1234?";
      
      await loginPage.register(email, password);

      await expect(tasksPage.heading).toBeVisible();
      await expect(tasksPage.emptyState).toBeVisible();
      await expect(tasksPage.createTaskButton).toBeVisible();
      await expect(tasksPage.signOutButton).toBeVisible();
    },
  );
});
