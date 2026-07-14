import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";
import { CategoryPage } from "../page-objects/CategoryPage";
import { DocumentRequestPage } from "../page-objects/DocumentRequestPage";

test("Browser Context fixture test", async ({ browser }) => {
  //Open a fresh browser instance, inject cookies/cache if needed
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://google.com/");
  console.log(await page.title());


})

test("page fixture test", async ({ page }) => {
  //with default browser, context
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

})

test('Block by alert when login with incorrect username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await loginPage.login('', ' Learning@830$3mK2');
  await expect(loginPage.alertMsg).toBeVisible();


})


test('User can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');
  await expect(page).toHaveTitle('ProtoCommerce');

  const categoryPage = new CategoryPage(page);
  const checkoutLink = categoryPage.verifyArticleNb();
  await expect(checkoutLink).toHaveCount(0);
  await categoryPage.addProduct('Samsung Note 8');

  //Explicitly wait for the checkout button to be ready again
  await checkoutLink.waitFor({ state: 'visible' });
  await expect(categoryPage.verifyArticleNb()).toContainText('1');

})


test('Child window handle test', async ({ context, page }) => {
  const loginPage = new LoginPage(page);
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const blinkingLinks = loginPage.getBlinkingLinks();
  await expect(blinkingLinks.docLink).toHaveAttribute('class', 'blinkingText');
  await expect(blinkingLinks.smartHireLink).toHaveAttribute('class', 'blinkingText');

  //Promise.all() accepts array of promises,wait until all promises fulfilled
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),//listen for any new page(promise status: pending, rejected, fulfilled)
    blinkingLinks.docLink.click(), //click to triger new tab

  ])
  await newPage.waitForLoadState();//wait for new tab to load content

  const documentRequestPage = new DocumentRequestPage(newPage);
  const emailAddress = await documentRequestPage.getEmailAddress();
  const domain = emailAddress.split('@')[1].split('.')[0];

  await page.bringToFront();
  await loginPage.login(domain, 'Learning@830$3mK2');
  await expect(page).toHaveTitle('ProtoCommerce');


})


