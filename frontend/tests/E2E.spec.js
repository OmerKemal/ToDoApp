const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../tests/PageObjects/LoginPage.js');
const { CreateTodoPage } = require('../tests/PageObjects/CreateTodoPage');
const { EditTodoPage } = require('../tests/PageObjects/EditTodoPage.js');

test.only('E2E: login → create → edit → delete → logout', async ({ page }) => {
  test.setTimeout(90_000); // more room on slow dev servers

  // --- Start in a known state: same origin, clear storage ---
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    try { localStorage.clear(); sessionStorage.clear(); } catch { }
  });



  await test.step('successfull login', async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);

    // --- LOGIN ---

    await loginPage.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });

    // enter username and password, login and validate the next page in a single method:

    await loginPage.login('testuser', 'test123');

  })

  // --- CREATE ---

  //generate a task to do and validate todos:

  await test.step('create a todo', async () => {
    let task = 'Read Books';
    let createTodoPage = new CreateTodoPage(page);
    await createTodoPage.createTodo(task);
    await createTodoPage.submitAndWaitForTodos();
  })

  // --- EDIT ---
  await test.step('edit a task', async () => {
    let taskId = 1;
    let newTask = 'Give Donation';
    const editTodoPage = new updateTodoPage(page);
    await editTodoPage.updatedText(taskId, newTask);

  })

  // --- DELETE ---
  await page.locator('li', { hasText: updatedText })
    .getByRole('button', { name: 'Delete' })
    .click();

  await expect(page.getByText(updatedText)).toHaveCount(0);

  // --- LOG OUT ---
  await page.evaluate(() => localStorage.removeItem('token'));
  await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/login$/);
});
