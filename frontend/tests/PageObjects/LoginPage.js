const { expect } = require('@playwright/test');

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
    async gotoLoginPage() {
        // --- Start in a known state: same origin, clear storage ---

        await this.page.evaluate(() => {
            try { localStorage.clear(); sessionStorage.clear(); } catch { }
        });
        await this.page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
        await expect(this.title).toBeVisible();
    }

    async fillUsername(username) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async submit() {
        // Wait for the login form to be submitted and capture the response
        const [response] = await Promise.all([
            this.page.waitForResponse(response => response.url().includes('/login') && response.status() === 200), // Wait for the login response
            this.submitButton.click(), // Click the submit button
        ]);

        // Assuming the response contains a JSON body with a 'token' field
        const data = await response.json(); // Get JSON response
        if (data.token) {
            await this.storeAuthToken(data.token);  // Store the token in localStorage
        } else {
            throw new Error('Token not found in the response');
        }

        // Wait for the URL to change to /todos after successful login
        await this.page.waitForURL('**/todos', { waitUntil: 'load' });
    }

    async storeAuthToken(token) {
        await this.page.evaluate((token) => {
            localStorage.setItem('authToken', token);  // Store the token in localStorage
        }, token);
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