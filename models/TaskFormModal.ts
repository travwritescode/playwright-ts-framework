import { type Locator, type Page } from "@playwright/test";

export type TaskFormCreateInput = {
  title: string;
  description: string;
  status: string;
  priority: string;
  /** Epoch ms → formatted for `<input type="date">` */
  dueDate: number;
};

export class TaskFormModal {
  readonly page: Page;

  readonly createTaskModalHeading: Locator;
  readonly editTaskModalHeading: Locator;

  readonly taskTitle: Locator;
  readonly taskDescription: Locator;
  readonly taskStatus: Locator;
  readonly taskPriority: Locator;
  readonly taskDueDate: Locator;

  readonly taskSaveButton: Locator;
  readonly taskCancelEditButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createTaskModalHeading = page.getByRole("heading", {
      name: "Create Task",
    });
    this.editTaskModalHeading = page.getByRole("heading", {
      name: "Edit Task",
    });

    this.taskTitle = page.getByLabel("Title");
    this.taskDescription = page.getByLabel("Description");
    this.taskStatus = page.getByTestId("task-form").getByLabel("Status");
    this.taskPriority = page.getByTestId("task-form").getByLabel("Priority");
    this.taskDueDate = page.getByTestId("task-form").getByLabel("Due date");

    this.taskSaveButton = page.getByRole("button", { name: "Save" });
    this.taskCancelEditButton = page.getByRole("button", { name: "Cancel" });
  }

  async createTask(taskData: TaskFormCreateInput) {
    await this.taskTitle.fill(taskData.title);
    await this.taskDescription.fill(taskData.description);
    await this.taskStatus.selectOption(taskData.status);
    await this.taskPriority.selectOption(taskData.priority);
    await this.taskDueDate.fill(
      this.formatTimestampAsISODate(taskData.dueDate),
    );

    await this.taskSaveButton.click();
  }

  async editTaskTitle(newTitle: string) {
    await this.taskTitle.fill(newTitle);

    await this.taskSaveButton.click();
  }

  private formatTimestampAsISODate(ts: number): string {
    const d = new Date(ts);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
}
