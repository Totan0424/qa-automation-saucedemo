class CatalogPage {
    constructor(page) {
        this.page = page; // Store the page instance
        this.inventoryItems = '.inventory_item'; // Selector for all product items
        this.firstProduct = '.inventory_item:nth-child(1) .inventory_item_name'; // Selector for the first product name
        this.productDetailsContainer = '.inventory_details_container'; // Selector for product details container
        this.addToCartButtons = '.btn_inventory'; // Selector for add-to-cart buttons
        this.cartIcon = '.shopping_cart_link'; // Selector for the shopping cart icon
        this.backToProducts = '#back-to-products'; // Selector for the back button to return to the product list
    }

    async getProductsCount() {
        // Returns the total count of products available in the catalog
        return await this.page.locator(this.inventoryItems).count();
    }

    async viewFirstProduct() {
        // Clicks on the first product to view its details
        await this.page.click(this.firstProduct);
        // Waits until the product details container is visible
        await this.page.waitForSelector(this.productDetailsContainer);
    }

    async goBackToProducts() {
        // Clicks the back button to return to the product list
        await this.page.click(this.backToProducts);
        // Waits until the product list is visible again
        await this.page.waitForSelector(this.inventoryItems);
    }

    async addFirstProductToCart() {
        // Selects the first 'Add to Cart' button and clicks it
        const firstButton = await this.page.locator(this.addToCartButtons).first();
        await firstButton.click();
    }

    async goToCart() {
        // Clicks the cart icon to navigate to the cart page
        await this.page.click(this.cartIcon);
    }
}

export default CatalogPage; // Export the CatalogPage class for use in tests

