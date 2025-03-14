class LoginPage {
    constructor(page) {
        this.page = page; // Store the Playwright page object for browser interactions
    }

    // Navigates to the specified URL
    async goto(url) {
        await this.page.goto(url);
    }

    // Performs login with the given username and password
    async login(username, password) {
        await this.page.fill('#user-name', username); // Fill in the username field
        await this.page.fill('#password', password); // Fill in the password field
        await this.page.click('#login-button'); // Click the login button to submit
    }

    // Retrieves the error message if login fails
    async getErrorMessage() {
        return await this.page.textContent('.error-message-container'); // Extract text content from the error message container
    }

    // Checks if the login was successful by verifying the visibility of the product inventory
    async isLoginSuccessful() {
        return await this.page.locator('.inventory_list').isVisible(); // Returns true if the product list is visible
    }
}

export default LoginPage; // Export the LoginPage class for use in other modules

