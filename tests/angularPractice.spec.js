import { expect } from '@playwright/test';
import registrationData from '../data/angularPracticeTestData.json' with {type: 'json'};
import dataset from '../data/angularPracticeTestDataSets.json' with {type: 'json'};
import { describe } from 'node:test';
import { customTest } from '../utils/base-test';

customTest.describe.configure({mode:'parallel'});
customTest.describe('Angular Practice Suite', () => {

    //Pass test data and page object as fixture by extend test annotation
    //Only accept one data set, cannot apply parameterization
    customTest('Submit form with custom fixture', async ({ registrationData, registrationPage }) => {
        await registrationPage.fillFormWithCustomFixture(registrationData);
        await registrationPage.submitForm();
        await expect(registrationPage.formSubmittedSuccessText).toBeVisible();
        
    })


    //Implement parameterization in running tests with different data sets
    dataset.forEach((data) => {
        customTest(`[Registration] should register successfully for : ${data.scenario}`, async ({ registrationPage }) => {
            await registrationPage.fillFormWithExternalJson(data);
            await registrationPage.submitForm();
            await expect(registrationPage.formSubmittedSuccessText).toBeVisible();

        })
    })


    customTest('Registration test -- drive data from external json file', async ({ registrationPage }) => {
        await registrationPage.fillFormWithExternalJson(registrationData);
        await registrationPage.submitForm();
        await expect(registrationPage.formSubmittedSuccessText).toBeVisible();

    })


    customTest('registration test--driver data from JS object', async ({ registrationPage }) => {


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

    customTest('move away focus, alert visible', async ({ registrationPage }) => {

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

})
