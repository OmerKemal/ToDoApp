// tests/pom/TodoListPage.js
class TodoListPage {
    constructor(page) {
        this.page = page;
        this.root = page.getByTestId('todos-page');
        this.heading = page.getByTestId('todos-heading');
        this.createLink = page.getByTestId('create-todo-link');
        this.todoItems = page.getByTestId('todo-item');
    }

    async clickCreateNewTodo() {
        await this.createLink.click();
    }

    async getTodoTexts() {
        return this.page.getByTestId('todo-text').allTextContents();
    }

    async clickEditButtonById(todoId) {
        await this.page
            .getByTestId('todo-edit-button')
            .filter({ has: this.page.locator(`[data-todo-id="${todoId}"]`) })
            .click();
    }

    async clickDeleteButtonById(todoId) {
        await this.page
            .getByTestId('todo-delete-button')
            .filter({ has: this.page.locator(`[data-todo-id="${todoId}"]`) })
            .click();
    }
}

module.exports = { TodoListPage };
