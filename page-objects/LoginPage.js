import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.userNameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.userRole = page.locator('.form-control').last();
        this.termsCheckbox = page.locator('#terms');
        this.signInBtn = page.locator('#signInBtn');
        this.alertMsg = page.getByText('Empty username/password.');
        this.userRadioType = page.locator('.radiotextsty').last();
        this.popupOkBtn = page.locator('#okayBtn');
        this.docLink = page.locator('[href*="documents-request"]');
        this.SmartHireLink = page.getByRole('link', { name: /TechSmartHire/ });


    }

    async login(username, password) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.userRadioType.click();
        await this.popupOkBtn.click();
        await this.userRole.click();
        await this.userRole.selectOption('consult')
        await this.termsCheckbox.click();
        await this.signInBtn.click();


    }

    getBlinkingLinks() {
        return {
            docLink: this.docLink,
            smartHireLink: this.SmartHireLink

        }
    }

}
    
