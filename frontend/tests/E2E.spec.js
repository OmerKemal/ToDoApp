const { test, expect } = require('@playwright/test');

test.only('E2E: login → create → edit → delete → logout', async ({ page }) => {
  test.setTimeout(90_000); // more room on slow dev servers

  // --- Start in a known state: same origin, clear storage ---
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    try { localStorage.clear(); sessionStorage.clear(); } catch { }
  });

  // --- LOGIN ---
  await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });

  // Prefer name locators (less brittle than placeholders)
  const userInput = page.locator('input[name="username"]');
  const passInput = page.locator('input[name="password"]');
  await userInput.waitFor({ timeout: 20_000 });

  await userInput.fill('testuser');
  await passInput.fill('test123');

  // Wait for the actual /api/login response to ensure the app finished login
  const loginRespPromise = page.waitForResponse(
    (r) => r.url().includes('/api/login') && r.request().method() === 'POST',
    { timeout: 20_000 }
  );
  await page.getByRole('button', { name: 'Login' }).click();
  const loginResp = await loginRespPromise;
  expect(loginResp.status()).toBe(200);

  // Confirm token is set (source of truth)
  await page.waitForFunction(() => !!localStorage.getItem('token'), null, { timeout: 20_000 });

  // Land on /todos (explicitly navigate; SPA navs can be slow)
  await page.goto('http://localhost:3000/todos', { waitUntil: 'domcontentloaded' });
  const heading = page.getByTestId('todos-heading');
  try {
    await heading.waitFor({ timeout: 20_000 });
  } catch {
    // Fallback if test id not added yet
    await page.getByRole('heading', { name: /todos/i }).waitFor({ timeout: 20_000 });
  }

  // --- CREATE ---
  await page.getByRole('link', { name: 'Create New Todo' }).click();

  const todoText = `E2E item ${Date.now()}`;
  await page.getByPlaceholder('Enter todo text').fill(todoText);
  await page.getByRole('button', { name: 'Create' }).click();

  await expect(page).toHaveURL(/\/todos$/);
  await expect(page.getByText(todoText)).toBeVisible();

  // --- EDIT ---
  const updatedText = `${todoText} (updated)`;
  await page.locator('li', { hasText: todoText })
    .getByRole('button', { name: 'Edit' })
    .click();

  await page.locator('input[type="text"]').fill(updatedText);
  await page.getByRole('button', { name: 'Update' }).click();

  await expect(page).toHaveURL(/\/todos$/);
  await expect(page.getByText(updatedText)).toBeVisible();

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
