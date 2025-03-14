// Import necessary libraries
const { test, expect } = require('@playwright/test'); // Import Playwright's test and expect functions
const CatalogPage = require('../pages/CatalogPage').default; // Import CatalogPage class for catalog interactions
const testData = require('../data/testData.json'); // Import test data from external JSON file
const logger = require('../utils/logger'); // Import logger for logging test steps

// Test case: Navigate through the product catalog
test('Navigate through product catalog', async ({ page }) => {
    try {
        // Select environment from testData
        const currentEnv = testData.environments.production; // Retrieve production environment URL

        // Select a random language from testData
        const selectedLanguage = testData.languages[Math.floor(Math.random() * testData.languages.length)]; // Randomly select a language

        logger.info(`Navigating to environment: ${currentEnv} with language: ${selectedLanguage}`);
        await page.goto(`${currentEnv}?lang=${selectedLanguage}`); // Navigate to the selected environment with the chosen language

        // Select valid user credentials from testData
        const user = testData.validUser; // Retrieve valid user credentials

        // Login with credentials from testData
        logger.info(`Logging in with user: ${user.username}`);
        await page.fill('#user-name', user.username); // Fill in the username field
        await page.fill('#password', user.password); // Fill in the password field
        await page.click('#login-button'); // Click the login button

        // Verify login was successful
        await expect(page.locator('.inventory_list')).toBeVisible(); // Ensure the product list is visible after login
        logger.info('Login successful');

        // Initialize CatalogPage
        const catalogPage = new CatalogPage(page); // Create an instance of CatalogPage

        // Validate product count
        const productCount = await catalogPage.getProductsCount(); // Retrieve the number of products displayed
        logger.info(`Total products found: ${productCount}`);

        if (productCount <= 0) {
            throw new Error('No products found on the catalog page.'); // Throw an error if no products are found
        }

        // Click on the first product to view details
        await catalogPage.viewFirstProduct(); // Click the first product
        logger.info('Viewing first product details');
        await expect(page.locator('.inventory_details_container')).toBeVisible(); // Ensure product details are visible

        // Go back to the product list
        await catalogPage.goBackToProducts(); // Navigate back to the product list
        logger.info('Navigated back to product list');
        await expect(page.locator('.inventory_list')).toBeVisible(); // Verify product list is visible

        // Add first product to cart
        await catalogPage.addFirstProductToCart(); // Add first product to the cart
        logger.info('First product added to cart');

        // Go to cart
        await catalogPage.goToCart(); // Navigate to the cart page
        logger.info('Navigated to cart');
        await expect(page.locator('.cart_list')).toBeVisible(); // Ensure cart list is visible

        logger.info('Navigation through catalog completed successfully'); // Log successful test completion

    } catch (error) {
        logger.error(`Test failed: ${error.message}`); // Log any test failures
        throw new Error(`Test execution error: ${error.message}`); // Throw an error to fail the test
    }
});
