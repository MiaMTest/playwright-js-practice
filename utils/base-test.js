import { test as base } from '@playwright/test';
import { RegistrationPage } from '../page-objects/RegistrationPage';
import { LoginPage } from '../page-objects/LoginPage';
import { CategoryPage } from '../page-objects/CategoryPage';
import { AutomationPracticePage } from '../page-objects/AutomationPracticePage';
import { UploadPage } from '../page-objects/UploadPage';

//Type the extended test:Add a typedef describing all fixtures to solve fixture IntelliSense missing
/**
 * @typedef {Object} CustomFixtures
 * @property {LoginPage} loginPage
 * @property {RegistrationPage} registrationPage
 * @property {CategoryPage} categoryPage
 * @property {AutomationPracticePage} autoPracticePage
 * @property {UploadPage} uploadPage
 */

/** @type {import('@playwright/test').TestType<CustomFixtures, {}>} */

//Imports the named export test and renames it locally to base
//Calling .extend() returns a new test object that includes custom fixture
export const customTest = base.extend({
    registrationData: {
        name: "Joe",
        email: "Joe@hotmail.com",
        password: "Ppp000!",
        gender: "Male",
        status: "Employed",
        DOB: "2009-09-19"
    },
      
    //Define custom fixture with fixture function receiving 2 arguments
    registrationPage: async ({ page }, use) => {
        const regPage = new RegistrationPage(page);
        await page.goto('/angularpractice/');
        await use(regPage); //Provide this regPage object to the test
    },

    loginPage: async ({ page }, use) => {
        const login = new LoginPage(page);
        await page.goto("/loginpagePractise/");
        await use(login);
    },
    categoryPage: async ({ page }, use) => {
        const category = new CategoryPage(page);
        await use(category);
    },
    autoPracticePage: async ({ page }, use) => {
        const automationPractice = new AutomationPracticePage(page);
        await page.goto('/AutomationPractice/');
        await use(automationPractice);
    },
    uploadPage: async ({ page }, use) => {
        const updload = new UploadPage(page);
        await page.goto('/upload-download-test/');
        await use(updload);
    }
})
