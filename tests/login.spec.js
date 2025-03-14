import { test, expect } from '@playwright/test'; // Import Playwright's test and expect functions
import LoginPage from '../pages/LoginPage'; // Import LoginPage class for login interactions
import testData from '../data/testData.json'; // Import test data from external JSON file
import logger from '../utils/logger'; // Import logger for logging test steps

const BASE_URL = "https://www.saucedemo.com/"; // Define base URL for the test environment

test.describe('Login Tests on SauceDemo', () => {
    
    // Before each test, navigate to the login page
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        logger.info('Navigating to SauceDemo login page');
        await loginPage.goto(BASE_URL); // Navigate to SauceDemo login page
    });

    // Successful login with valid credentials
    test('Successful login with valid credentials', async ({ page }) => {
        try {
            const loginPage = new LoginPage(page);
            logger.info('Attempting successful login with valid credentials');

            await loginPage.login(testData.validUser.username, testData.validUser.password); // Perform login
            
            const isSuccess = await loginPage.isLoginSuccessful(); // Check if login was successful
            if (isSuccess) {
                logger.info('Login successful');
            } else {
                throw new Error('Login failed'); // Throw error if login is not successful
            }
            
            expect(isSuccess).toBeTruthy(); // Verify that login was successful
        } catch (error) {
            logger.error(`Test failed: ${error.message}`);
            throw new Error(`Test execution error: ${error.message}`);
        }
    });

    // Login attempt with incorrect username
    test('Login with incorrect username', async ({ page }) => {
        try {
            const loginPage = new LoginPage(page);
            logger.info(`Attempting login with incorrect username: ${testData.invalidUser.username}`);
            
            await loginPage.login(testData.invalidUser.username, testData.validUser.password); // Attempt login with incorrect username

            const errorMessage = await loginPage.getErrorMessage(); // Retrieve error message
            logger.info(`Received error message: "${errorMessage}"`);

            expect(errorMessage).toContain(testData.errorMessages.invalidCredentials); // Verify expected error message
        } catch (error) {
            logger.error(`Test failed: ${error.message}`);
            throw new Error(`Test execution error: ${error.message}`);
        }
    });

    // Login attempt with incorrect password
    test('Login with incorrect password', async ({ page }) => {
        try {
            const loginPage = new LoginPage(page);
            logger.info(`Attempting login with incorrect password for user: ${testData.validUser.username}`);
            
            await loginPage.login(testData.validUser.username, testData.invalidUser.password); // Attempt login with incorrect password

            const errorMessage = await loginPage.getErrorMessage(); // Retrieve error message
            logger.info(`Received error message: "${errorMessage}"`);

            expect(errorMessage).toContain(testData.errorMessages.invalidCredentials); // Verify expected error message
        } catch (error) {
            logger.error(`Test failed: ${error.message}`);
            throw new Error(`Test execution error: ${error.message}`);
        }
    });

    // Login attempt with empty credentials
    test('Login with empty credentials', async ({ page }) => {
        try {
            const loginPage = new LoginPage(page);
            logger.info('Attempting login with empty credentials');
            
            await loginPage.login('', ''); // Attempt login with empty username and password

            const errorMessage = await loginPage.getErrorMessage(); // Retrieve error message
            logger.info(`Received error message: "${errorMessage}"`);

            expect(errorMessage).toContain(testData.errorMessages.requiredUsername); // Verify expected error message
        } catch (error) {
            logger.error(`Test failed: ${error.message}`);
            throw new Error(`Test execution error: ${error.message}`);
        }
    });

    // Login attempt with a locked-out user
    test('Login with locked out user', async ({ page }) => {
        try {
            const loginPage = new LoginPage(page);
            logger.info(`Attempting login with locked-out user: ${testData.lockedOutUser.username}`);
            
            await loginPage.login(testData.lockedOutUser.username, testData.lockedOutUser.password); // Attempt login with locked-out user

            const errorMessage = await loginPage.getErrorMessage(); // Retrieve error message
            logger.info(`Received error message: "${errorMessage}"`);

            expect(errorMessage).toContain(testData.errorMessages.lockedOut); // Verify expected error message
        } catch (error) {
            logger.error(`Test failed: ${error.message}`);
            throw new Error(`Test execution error: ${error.message}`);
        }
    });
});
