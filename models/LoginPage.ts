import { type Locator, type Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page;

    readonly signInHeading: Locator;
    readonly signInButton: Locator;
    readonly signInToggle: Locator;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;

    readonly createAccountHeading: Locator;
    readonly createAccountButton: Locator;
    readonly registerToggle: Locator;


    constructor(page: Page) {
        this.page = page;
        // Using User-Centric Locators with accessible names
        this.signInHeading = page.getByRole('heading', { name: 'Sign In' });
        this.signInButton = page.getByRole('button', { name: 'Sign In' })
        this.signInToggle = page.getByRole('button', { name: 'Already have an account? Sign In' })

        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');

        this.createAccountHeading = page.getByRole('heading', { name: 'Create Account' });
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
        this.registerToggle = page.getByRole('button', { name: 'Need an account? Register' })
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.signInButton.click()
    }

    async register(email: string, password: string) {
        await this.registerToggle.click()
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.createAccountButton.click()
    }
}