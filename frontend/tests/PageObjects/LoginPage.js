const { expect, Page } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        // Locators via data-testid
        this.form = page.getByTestId('login-form');
        this.title = page.getByTestId('login-title');
        this.usernameInput = page.getByTestId('login-username');
        this.passwordInput = page.getByTestId('login-password');
        this.submitButton = page.getByTestId('login-submit');
    }

    /** Navigate to the login page. */
    async goto(baseURL = '/') {
        // Adjust the path if your route differs
        await this.page.goto(new URL('/login', baseURL).toString());
        await expect(this.title).toBeVisible();
    }

    async fillUsername(username) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async submit() {
        await Promise.all([
            // Successful login redirects to /todos
            this.page.waitForURL('**/todos', { waitUntil: 'load' }),
            this.submitButton.click(),
        ]);
    }

    /** Convenience method to perform the full login flow. */
    async login(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.submit();
    }

    /** Assert we are on the login page */
    async expectOnLoginPage() {
        await expect(this.form).toBeVisible();
        await expect(this.title).toHaveText(/login/i);
    }
}

module.exports = { LoginPage };