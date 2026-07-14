import { test, expect } from '@playwright/test'
import { RegistrationPage } from '../page-objects/RegistrationPage'


test('moave away focus, alert visible', async ({ page }) => {

    page.goto('https://rahulshettyacademy.com/angularpractice/');

    const registrationPage = new RegistrationPage(page);
    await registrationPage.focusNameInput();
    await expect(registrationPage.nameAlert).toBeHidden();
    //await expect(registrationPage.nameAlert).not.toBeVisible();
    await registrationPage.moveFocusAway();
    await expect(registrationPage.nameAlert).toBeVisible();

    await registrationPage.focusEmailInput();
    await expect(registrationPage.emailAlert).toBeHidden();
    await registrationPage.moveFocusAway();
    await expect(registrationPage.emailAlert).toBeVisible();


})

test('registration test', async ({ page }) => {

    page.goto('https://rahulshettyacademy.com/angularpractice/');

    const registrationPage = new RegistrationPage(page);

    //Create a JS object to store data
    const validUser = {
        name: 'Emma',
        email: 'Emma@hotmail.com',
        password: 'Ppp000!',
        gender: 'Female',
        status: 'Employed',
        DOB: '2009-09-19'
    }
    //Pass the whole object, and let the POM method pull out the Strings
    await registrationPage.fillRegistrationForm(validUser);

    const nameValue = await registrationPage.nameInput.inputValue();
    await expect(nameValue).toBe('Emma');
    await expect(registrationPage.iceCreamCheckBox).toBeChecked();
    await expect(registrationPage.dateofBirthInput).toHaveValue('2009-09-19');

    await registrationPage.submitForm();
    await expect(registrationPage.formSubmittedSuccessText).toBeVisible();




})



