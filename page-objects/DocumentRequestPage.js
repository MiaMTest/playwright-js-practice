export class DocumentRequestPage {

    //Using JSDoctype hinting to get autocomplete(IntelliSensense) and method suggestions
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.emailAddress = page.locator('[href*="mailto"]');
    }

    async getEmailAddress() {
        return await this.emailAddress.textContent();
    }
}

