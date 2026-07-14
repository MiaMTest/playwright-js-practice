export class DocumentRequestPage{

    constructor(page){
        this.page = page;
        this.emailAddress = page.locator('[href*="mailto"]');
    }

    async getEmailAddress(){
       return await this.emailAddress.textContent();
    }
}