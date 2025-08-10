// tests/pom/TodoListPage.js
const { test, expect } = require('@playwright/test');
class BasePage {
    constructor(page) {
        this.page = page;
        this.root = page.getByTestId('todos-page');
        this.heading = page.getByTestId('todos-heading');
        this.createLink = page.getByTestId('create-todo-link');
        this.items = page.getByTestId('todo-item');
        this.texts = page.getByTestId('todo-text');
        this.editButtons = page.getByTestId('todo-edit-button');
        this.deleteButtons = page.getByTestId('todo-delete-button');
        this.logoutButton = page.locator('button', { hasText: 'Logout' });
    }

    async goto() {
        await this.page.goto('/');
        await this.root.waitFor({ state: 'visible' });
    }

    async clickCreate() {
        await this.createLink.click();
    }

    async getAllTodoTexts() {
        return this.texts.allTextContents();
    }

    locatorForItemById(id) {
        return this.items.filter({ has: this.page.locator(`[data-todo-id="${id}"]`) });
    }

    async clickEditById(id) {
        const btn = this.editButtons.filter({ has: this.page.locator(`[data-todo-id="${id}"]`) });
        await btn.first().click();
    }

    async clickDeleteById(id) {
        const btn = this.deleteButtons.filter({ has: this.page.locator(`[data-todo-id="${id}"]`) });
        await btn.first().click();
    }

    async clickEditByIndex(index) {
        await this.editButtons.nth(index).click();
    }

    async clickDeleteByIndex(index) {

        //const itemToBedeleted = await this.deleteButtons;

        await this.deleteButtons.nth(0).click();
    }

    async expectItemCount(expect, count) {
        await expect(this.items).toHaveCount(count);
    }

    async clickLogout() {
        await this.logoutButton.click();
    }
}

module.exports = { BasePage };
