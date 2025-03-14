class AddProductsPage {
    constructor(page) {
        this.page = page;
        // Selectors for login fields
        this.usernameField = '#user-name';
        this.passwordField = '#password';
        this.loginButton = '#login-button';
        
        // Selector for verifying successful login
        this.productList = '.inventory_list';
        
        // Selectors for adding products to the cart
        this.addToCartButtons = '.btn_inventory';
        this.cartIcon = '.shopping_cart_link';
        this.cartBadge = '.shopping_cart_badge';
    }

    // Navigates to a given URL
    async navigateTo(url) {
        await this.page.goto(url);
    }

    // Performs login using provided username and password
    async login(username, password) {
        await this.page.fill(this.usernameField, username);
        await this.page.fill(this.passwordField, password);
        await this.page.click(this.loginButton);
        // Wait until the product list is visible to confirm login success
        await this.page.waitForSelector(this.productList);
    }

    // Adds a product to the cart based on the index in the product list
    async addProductToCart(productIndex = 0) {
        const buttons = await this.page.$$(this.addToCartButtons);
        if (buttons.length > productIndex) {
            await buttons[productIndex].click();
        }
    }

    // Navigates to the cart page
    async goToCart() {
        await this.page.click(this.cartIcon);
    }

    // Returns the number of items in the cart as a string
    async getCartItemCount() {
        const cartBadge = await this.page.locator(this.cartBadge);
        return cartBadge.isVisible() ? await cartBadge.innerText() : '0';
    }
}

export default AddProductsPage;

