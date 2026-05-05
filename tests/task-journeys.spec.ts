import { expect, test } from "@playwright/test";
import { LoginPage } from "../models/LoginPage.js";
import { TasksPage } from "../models/TasksPage.js";
import { TaskFormModal } from "../models/TaskFormModal.js";

test.describe("Flowstate Task Lifespan Journeys", () => {
  let loginPage: LoginPage;
  let tasksPage: TasksPage;
  let taskFormModal: TaskFormModal;

  test.beforeEach(async ({ page }) => {
    const email = `travshootsphotos@gmail.com`;
    const password = "Test1234?";
    loginPage = new LoginPage(page);
    tasksPage = new TasksPage(page);
    taskFormModal = new TaskFormModal(page);

    await loginPage.goto();
    await loginPage.login(email, password);
  });

  test(
    "Journey B: task lifecycle (create → detail/edit → delete)",
    {
      tag: ["@journey-tasks"],
    },
    async () => {
      const taskData = {
        title: "Auto Task",
        description: "This is a task created by test automation",
        status: "To do",
        priority: "Low",
        dueDate: Date.now(),
      };

      const newTitle = "Edited Task";

      // Open task create modal
      await tasksPage.openCreateModal();
      await expect(taskFormModal.createTaskModalHeading).toBeVisible();

      // Fill modal form + save, verify task displays in list
      await taskFormModal.createTask(taskData);
      await expect(taskFormModal.createTaskModalHeading).not.toBeVisible();
      await expect(tasksPage.taskRow(taskData.title)).toBeVisible();

      // Open task modal and edit title, verify new title displays in list
      await tasksPage.openEditFor(taskData.title);
      await expect(taskFormModal.editTaskModalHeading).toBeVisible();
      await expect(taskFormModal.taskTitle).toHaveValue(taskData.title);
      await taskFormModal.editTaskTitle(newTitle);
      await expect(taskFormModal.editTaskModalHeading).not.toBeVisible();
      await expect(tasksPage.taskRow(newTitle)).toBeVisible();

      // Delete task
      await tasksPage.deleteTask(newTitle);
      await expect(tasksPage.taskRow(newTitle)).not.toBeVisible();
    },
  );

  test.skip(
    "Journey C: list filters persisted in URL + navigation",
    {
      tag: ["@journey-tasks"],
    },
    async () => {
      const filters = {
        status: "To do",
        priority: "Low"
      };

      await tasksPage.applyFilters(filters);
      await expect(tasksPage.tasks).toHaveCount(1);

      // Need to complete engineering tickets before this test can be finished
    },
  );
});
