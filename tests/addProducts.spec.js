// Import necessary libraries
const { test, expect } = require('@playwright/test');
const AddProductsPage = require('../pages/AddProductsPage').default;
const testData = require('../data/testData.json'); // Import test data
const logger = require('../utils/logger'); // Import logger

// Navigate through product catalog and add products to the cart
test('Navigate through product catalog and add products to cart', async ({ page }) => {
    try {
        // Get production environment from testData.json
        const currentEnv = testData.environments.production;

        // Select a random language from testData.json
        const languages = testData.languages;
        const selectedLanguage = languages[Math.floor(Math.random() * languages.length)];

        logger.info(`Navigating to environment: ${currentEnv} with language: ${selectedLanguage}`);

        // Get valid user credentials from testData.json
        const { username, password } = testData.validUser;
        logger.info(`Logging in with user: ${username}`);

        // Create an instance of the AddProductsPage
        const addProductsPage = new AddProductsPage(page);

        // Navigate to the selected environment with the chosen language
        await addProductsPage.navigateTo(`${currentEnv}?lang=${selectedLanguage}`);

        // Perform login with valid user credentials
        await addProductsPage.login(username, password);
        logger.info('Login successful');

        // Add the first product to the cart
        await addProductsPage.addProductToCart(0);
        logger.info('First product added to cart');

        let cartCount = await addProductsPage.getCartItemCount();
        logger.info(`Cart count after first addition: ${cartCount}`);

        // Verify that the cart contains 1 product
        expect(cartCount).toBe('1');

        // Add a second product to the cart
        await addProductsPage.addProductToCart(1);
        logger.info('Second product added to cart');

        cartCount = await addProductsPage.getCartItemCount();
        logger.info(`Cart count after second addition: ${cartCount}`);

        // Verify that the cart contains 2 products
        expect(cartCount).toBe('2');

        logger.info('Navigation and adding products to cart completed successfully!');

    } catch (error) {
        logger.error(`Test failed: ${error.message}`);
        throw new Error(`Test execution error: ${error.message}`);
    }
});
