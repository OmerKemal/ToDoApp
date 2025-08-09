// tests/PageObjects/CreateTodoPage.js
const { expect } = require('@playwright/test');

class CreateTodoPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.pageContainer = page.getByTestId('create-todo-page');
        this.title = page.getByTestId('create-todo-title');
        this.form = page.getByTestId('create-todo-form');
        this.input = page.getByTestId('create-todo-input');
        this.submitButton = page.getByTestId('create-todo-submit');
    }

    async goto() {
        await this.page.goto('/create', { waitUntil: 'domcontentloaded' });
        await expect(this.title).toBeVisible();
    }

    async fillTodoText(todoText) {
        await this.input.fill(todoText);
    }

    async submitAndWaitForTodos() {
        await Promise.all([
            this.page.waitForURL('**/todos'),
            this.submitButton.click(),
        ]);
    }

    async createTodo(todoText) {
        await this.fillTodoText(todoText);
        await this.submitAndWaitForTodos();
    }

    async expectOnCreateTodoPage() {
        await expect(this.pageContainer).toBeVisible();
        await expect(this.title).toHaveText(/create new todo/i);
    }
}

module.exports = { CreateTodoPage };