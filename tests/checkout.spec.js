// Import necessary libraries
const { test, expect } = require('@playwright/test'); // Import Playwright's test and expect functions
const { faker } = require('@faker-js/faker'); // Import Faker.js to generate random user data
const CheckoutPage = require('../pages/CheckoutPage'); // Import CheckoutPage class for checkout interactions
const testData = require('../data/testData.json'); // Import test data from external JSON file
const logger = require('../utils/logger'); // Import logger for logging test steps

// Test case: Complete the checkout process
test('Complete checkout', async ({ page }) => {
    try {
        const checkoutPage = new CheckoutPage(page); // Initialize CheckoutPage instance

        // Get environment URL from testData
        const currentEnv = testData.environments.production; // Change to 'staging' or 'dev' if needed
        logger.info(`Navigating to environment: ${currentEnv}`);
        await page.goto(currentEnv); // Navigate to the test environment

        // Get valid user credentials from testData
        const { username, password } = testData.validUser; // Extract username and password
        logger.info(`Logging in with user: ${username}`);

        await page.fill('#user-name', username); // Fill in username field
        await page.fill('#password', password); // Fill in password field
        await page.click('#login-button'); // Click the login button

        // Verify login success
        await expect(page.locator('.inventory_list')).toBeVisible(); // Ensure product list is visible
        logger.info('Login successful');

        // Add product to cart
        const firstProductButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'); // Select first product button
        await firstProductButton.click(); // Click to add product to cart
        logger.info('Added "Sauce Labs Backpack" to cart');

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1'); // Verify cart badge shows 1 item
        logger.info('Cart updated with 1 item');

        await page.click('.shopping_cart_link'); // Click cart icon to navigate to cart page
        logger.info('Navigated to shopping cart');

        // Proceed to checkout
        await checkoutPage.goToCheckout(); // Click checkout button
        logger.info('Proceeded to checkout');

        await checkoutPage.verifyCheckoutPageIsVisible(); // Verify checkout page is visible
        logger.info('Checkout page is visible');

        // Generate random user details for checkout
        const firstName = faker.person.firstName(); // Generate random first name
        const lastName = faker.person.lastName(); // Generate random last name
        const postalCode = faker.location.zipCode(); // Generate random postal code

        logger.info(`Filling checkout form: ${firstName} ${lastName}, ${postalCode}`);
        await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode); // Fill out checkout form
        await checkoutPage.completePurchase(); // Complete purchase

        // Verify order completion
        await checkoutPage.verifyOrderCompletion(); // Confirm order success message
        logger.info('Order completed successfully');

    } catch (error) {
        logger.error(`Test failed: ${error.message}`); // Log failure message
        throw new Error(`Test execution error: ${error.message}`); // Throw error to fail the test
    }
});
