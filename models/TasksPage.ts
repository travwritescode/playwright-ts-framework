import { type Locator, type Page } from '@playwright/test'

export class TasksPage {
    readonly page: Page;

    readonly heading: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Using User-Centric Locators with accessible names
        this.heading = page.getByRole('heading');
    }
}