import { type Locator, type Page } from '@playwright/test'

export class TasksPage {
    readonly page: Page;

    readonly heading: Locator;
    readonly emptyStateTip: Locator;
    readonly createTaskButton: Locator;
    readonly signOutButton: Locator;
    readonly tasks: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Using User-Centric Locators with accessible names
        this.heading = page.getByRole('heading', { name: 'My Tasks'});
        this.emptyStateTip = page.getByRole('paragraph').filter({hasText: 'No tasks found. Create one to get started.'});
        this.createTaskButton = page.getByRole('button', { name: 'Create Task'});
        this.signOutButton = page.getByRole('button', { name: 'Sign Out'});
        this.tasks = page.locator('[data-testid*="task-item-"]');
    }
}