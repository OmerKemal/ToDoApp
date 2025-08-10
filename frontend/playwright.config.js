// frontend/playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30_000,
    retries: 0,
    use: {
        baseURL: 'http://localhost:3000', // assumes frontend runs on 3000
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
});
