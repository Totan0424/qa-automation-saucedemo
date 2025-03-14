const { expect } = require('@playwright/test'); // Import Playwright's expect function for assertions

class CheckoutPage {
    constructor(page) {
        this.page = page; // Store the Playwright page object
        
        // Selectors for checkout process
        this.checkoutButton = '[data-test="checkout"]'; // Button to proceed to checkout
        this.firstNameInput = '[data-test="firstName"]'; // Input field for first name
        this.lastNameInput = '[data-test="lastName"]'; // Input field for last name
        this.postalCodeInput = '[data-test="postalCode"]'; // Input field for postal code
        this.continueButton = '[data-test="continue"]'; // Button to continue to the next step
        this.finishButton = '[data-test="finish"]'; // Button to complete the purchase
        this.checkoutSummary = '.checkout_info'; // Section displaying checkout summary
        this.completeHeader = '.complete-header'; // Header confirming order completion
    }

    // Clicks the checkout button to navigate to the checkout page
    async goToCheckout() {
        await this.page.click(this.checkoutButton);
    }

    // Fills out the checkout form with the provided details and proceeds
    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
        await this.page.click(this.continueButton);
    }

    // Completes the purchase by clicking the finish button
    async completePurchase() {
        await this.page.click(this.finishButton);
    }

    // Verifies that the checkout summary page is visible
    async verifyCheckoutPageIsVisible() {
        const summaryElement = this.page.locator(this.checkoutSummary);
        await summaryElement.waitFor({ state: 'visible', timeout: 10000 }); //Wait up to 10s for visibility
        await expect(summaryElement).toBeVisible();
    }
    
    // Verifies that the order completion message appears
    async verifyOrderCompletion() {
        await expect(this.page.locator(this.completeHeader)).toHaveText('Thank you for your order!');
    }
}

module.exports = CheckoutPage; // Export the CheckoutPage class for use in other files
