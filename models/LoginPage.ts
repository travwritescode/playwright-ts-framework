import { type Locator, type Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page;

    readonly heading: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Using User-Centric Locators with accessible names
        this.heading = page.getByRole('heading');
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' })
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    }

    async goto() {
        await this.page.goto('/login');
    }
}