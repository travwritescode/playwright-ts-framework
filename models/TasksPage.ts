import { type Locator, type Page } from "@playwright/test";

export class TasksPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly createTaskButton: Locator;
  readonly signOutButton: Locator;

  readonly statusFilter: Locator;
  readonly priorityFilter: Locator;

  readonly tasks: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;

    // Using User-Centric Locators with accessible names
    this.heading = page.getByRole("heading", { name: "My Tasks" });
    this.createTaskButton = page.getByRole("button", { name: "Create Task" });
    this.signOutButton = page.getByRole("button", { name: "Sign Out" });

    this.statusFilter = page.locator('#filter-status');
    this.priorityFilter = page.locator('#filter-priority');

    this.tasks = page.locator('[data-testid*="task-item-"]');
    this.emptyState = page
      .getByRole("paragraph")
      .filter({ hasText: "No tasks found. Create one to get started." });
  }

  async applyFilters(filters: { status?: string; priority?: string }) {
    if (filters.status) {
        await this.statusFilter.selectOption(filters.status)
    }
    if (filters.priority) {
        await this.priorityFilter.selectOption(filters.priority)
    }
  }

  async openCreateModal() {
    await this.createTaskButton.click();
  }

  taskRow(title: string) {
    return this.page.getByRole("listitem").filter({ hasText: title });
  }

  async openEditFor(title: string) {
    await this.taskRow(title).getByRole("button", { name: "Edit" }).click();
  }

  async deleteTask(title: string) {
    await this.taskRow(title).getByRole("button", { name: "Delete" }).click();
  }
}
