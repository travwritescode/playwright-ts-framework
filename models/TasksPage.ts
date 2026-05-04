import { type Locator, type Page } from "@playwright/test";

export class TasksPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly createTaskButton: Locator;
  readonly signOutButton: Locator;

  readonly tasks: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;

    // Using User-Centric Locators with accessible names
    this.heading = page.getByRole("heading", { name: "My Tasks" });
    this.createTaskButton = page.getByRole("button", { name: "Create Task" });
    this.signOutButton = page.getByRole("button", { name: "Sign Out" });

    this.tasks = page.locator('[data-testid*="task-item-"]');
    this.emptyState = page
      .getByRole("paragraph")
      .filter({ hasText: "No tasks found. Create one to get started." });
  }

  async openCreateModal() {
    await this.createTaskButton.click();
  }

  taskRow(title: string) {
    return this.page.getByRole("listitem").filter({ hasText: title });
  }

  async openEditFor(title: string) {
    await this.taskRow(title)
      .getByRole("button", { name: "Edit" })
      .click();
  }
}
