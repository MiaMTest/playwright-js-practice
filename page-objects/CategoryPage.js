
import expect from "@playwright/test"

export class CategoryPage {
    constructor(page) {
        this.page = page; //store the page object so the methods can use it
        this.productCards = page.locator('div.card');
        this.checkoutLink = page.locator("a:has-text('Checkout')");


    }
    async addProduct(productName) {
        await this.productCards.filter({ hasText: new RegExp(productName, 'i') })
            .getByRole('button', { name: 'Add' }).click();
    }

    async verifyArticleNb(articleNb) {
        return await this.checkoutLink.hasCount();

    }

    async goCheckoutPage(){
        await this.checkoutLink.click();
    }
}
