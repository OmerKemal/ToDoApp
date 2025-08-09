// tests/pom/EditTodoPage.js
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

    async setText(value) {
        await this.input.fill(value);
    }

    async submitForm() {
        await this.submit.click();
    }

    async updateText(id, value) {
        await this.goto(id);
        await this.setText(value);
        await this.submitForm();
    }

    async getCurrentText() {
        return this.input.inputValue();
    }
}

module.exports = { EditTodoPage };
