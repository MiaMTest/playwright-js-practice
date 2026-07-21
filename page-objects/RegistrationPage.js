
export class RegistrationPage {
    //Using JSDoctype hinting to get autocomplete(IntelliSensense) and method suggestions
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.protractorText = page.getByText('Protractor Tutorial');
        this.nameInput = page.locator('.form-group', { hasText: 'Name' }).getByRole('textbox');
        this.emailInput = page.locator('.form-group', { hasText: 'Email' }).getByRole('textbox');
        this.nameAlert = page.getByText('Name is required');
        this.emailAlert = page.getByText('Email is required');
        this.passwordInput = page.getByPlaceholder('Password');
        this.iceCreamCheckBox = page.getByRole('checkbox', { name: 'IceCreams' });
        this.genderDropdown = page.getByLabel('Gender');
        this.dateofBirthInput = page.locator('.form-group', { hasText: 'Date of Birth' }).locator('input');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.formSubmittedSuccessText = page.getByText('Success');

    }

    async focusNameInput() {
        await this.nameInput.click();

    }

    async moveFocusAway() {
        await this.protractorText.click();
    }

    async focusEmailInput() {
        await this.emailInput.click();

    }

    async fillFormWithCustomFixture(data) {
        await this.nameInput.fill(data.name);
        await this.emailInput.fill(data.email);
        await this.passwordInput.fill(data.password);
        await this.iceCreamCheckBox.check();
        await this.genderDropdown.selectOption(data.gender);
        await this.page.getByLabel(data.status).check();
        await this.dateofBirthInput.fill(data.DOB);


    }
    //Extract specific string value form data object
    async fillRegistrationForm(userData) {
        //Putting if condition (defensive programming best practice),return undefined instead of error when missing data
        if (userData.name) await this.nameInput.fill(userData.name);
        if (userData.email) await this.emailInput.fill(userData.email);
        if (userData.password) await this.passwordInput.fill(userData.password);
        await this.iceCreamCheckBox.check();
        if (userData.gender) await this.genderDropdown.selectOption(userData.gender);
        if (userData.status) await this.page.getByLabel(userData.status).check();
        if (userData.DOB) await this.dateofBirthInput.fill(userData.DOB);


    }

    async submitForm() {
        await this.submitBtn.click();
    }

    //Using Object Destructuring: wrap parameters in curly braces inside function definition
    async fillFormWithExternalJson({ name, email, password, gender, status, DOB }) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.iceCreamCheckBox.check();
        await this.genderDropdown.selectOption(gender);
        await this.page.getByLabel(status).check();
        await this.dateofBirthInput.fill(DOB);

    }




}
