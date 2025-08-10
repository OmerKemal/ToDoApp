// tests/pom/EditTodoPage.js
const { test, expect } = require('@playwright/test');
class EditTodoPage {

    constructor(page) {
        this.page = page;
        this.root = page.getByTestId('edit-todo-page');
        this.title = page.getByTestId('edit-todo-title');
        this.form = page.getByTestId('edit-todo-form');
        this.input = page.getByTestId('edit-todo-input');
        this.submit = page.getByTestId('edit-todo-submit');
    }


    async waitForLoaded() {
        await this.root.waitFor({ state: 'visible' });
        await this.page.getByTestId('edit-todo-input').waitFor({ state: 'visible' });
    }

    async setText(text) {
        await this.input.clear();
        await this.input.fill(text);
    }

    async submitForm() {
        await this.submit.click();
    }

    async updateText(text) {
        await this.setText(text);
        await this.submitForm();
    }

    async getCurrentText() {
        return this.input.inputValue();
    }
}

module.exports = { EditTodoPage };
