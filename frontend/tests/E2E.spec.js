const { test, expect } = require('@playwright/test');
const { BasePage } = require('../tests/PageObjects/BasePage.js')
const { LoginPage } = require('../tests/PageObjects/LoginPage.js');
const { CreateTodoPage } = require('../tests/PageObjects/CreateTodoPage');
const { EditTodoPage } = require('../tests/PageObjects/EditTodoPage.js');

test.only('E2E: login → create → edit → delete → logout', async ({ page }) => {

  const basePage = new BasePage(page);
  const createTodoPage = new CreateTodoPage(page);
  const loginPage = new LoginPage(page);
  const editTodoPage = new EditTodoPage(page);

  let newTask = 'Give Donation';
  let task = 'Read Books';

  await test.step('successfull login', async ({ page, baseURL }) => {

    // --- LOGIN ---

    await loginPage.gotoLoginPage();

    // enter username and password, login and validate the next page in a single method:

    await loginPage.login('testuser', 'test123');

  })

  // --- CREATE ---

  //generate a task to do and validate the new task

  await test.step('create a todo', async () => {

    await basePage.clickCreate();
    await createTodoPage.fillTodoText(task);
    await createTodoPage.submitAndWaitForTodos();
  })

  // --- EDIT ---

  //update one of the tasks:

  await test.step('edit a task', async () => {

    await basePage.clickEditByIndex(0);
    await editTodoPage.updateText(newTask);

  })

  // --- DELETE ---

  //delete one of the tasks and validate

  await test.step('update a task', async () => {

    await basePage.clickDeleteByIndex(0);
    await expect(page.getByText(newTask)).toHaveCount(0);

  })


  // --- LOG OUT ---

  //Logout and validate the login page

  await test.step('logout and validate login page', async () => {

    await basePage.clickLogout();
    await loginPage.expectOnLoginPage();

  })
});
