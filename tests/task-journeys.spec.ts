import { expect, test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage.js";
import { TasksPage } from "../models/TasksPage.js";

test.describe("Flowstate Task Lifespan Journeys", () => {
  let loginPage: LoginPage;
  let tasksPage: TasksPage;

  test.beforeEach(async ({ page }) => {
    const email = `travshootsphotos@gmail.com`;
    const password = "Test1234?";
    loginPage = new LoginPage(page);
    tasksPage = new TasksPage(page);

    await loginPage.goto();
    await loginPage.login(email, password);
  });

  test(
    "Journey B: task lifecycle (create → detail/edit → delete)",
    {
      tag: ["@journey-tasks"],
    },
    async () => {
        /*
        TODO:
        - create the task page model
        - build out the POM methods and selectors
        - write test
        */
    },
  );

  test(
    "Journey C: list filters persisted in URL + navigation",
    {
      tag: ["@journey-tasks"],
    },
    async () => {
                /*
        TODO:
        - add filter POM selectors and methods
        - write test
        */

    },
  );
});
