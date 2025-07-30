exports.loginUI = async (
    page,
    { username = 'testuser', password = 'test123' } = {}
) => {
    // Always start clean so tests are independent
    await page.addInitScript(() => {
        try { localStorage.clear(); sessionStorage.clear(); } catch { }
    });

    // Go to login; CRA first paint can be slow, so give it a moment
    await page.goto('/login', { waitUntil: 'domcontentloaded' });

    // If we are still on /login, do the login flow; otherwise we are already logged in
    const pathname = new URL(page.url()).pathname;
    if (pathname === '/login') {
        await page.getByPlaceholder('Username').fill(username);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Login' }).click();
        // Wait for redirect to /todos
        await page.waitForURL('**/todos', { timeout: 20000 });
    } else if (pathname !== '/todos') {
        // If some other route, navigate to todos explicitly
        await page.goto('/todos', { waitUntil: 'domcontentloaded' });
    }

    // Now wait for the heading; test-id is the most reliable
    await page.getByTestId('todos-heading').waitFor({ timeout: 20000 });
};