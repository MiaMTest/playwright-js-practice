import { expect } from "@playwright/test";
import { customTest } from "../utils/base-test";
import { DocumentRequestPage } from '../page-objects/DocumentRequestPage';

customTest('Block by alert when login with incorrect username', async ({ loginPage }) => {

  await loginPage.login('', ' Learning@830$3mK2');
  await expect(loginPage.alertMsg).toBeVisible();

})


customTest('@Smoke User can login successfully', async ({ page, loginPage, categoryPage }) => {

  await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');
  await expect(page).toHaveTitle('ProtoCommerce');

  await expect(categoryPage.checkoutLink).toContainText('0');
  await categoryPage.addProduct('Samsung Note 8');

  //Explicitly wait for the checkout button to be ready again
  await categoryPage.checkoutLink.waitFor({ state: 'visible' });
  await expect(categoryPage.checkoutLink).toContainText('1');

})


customTest('Child window handle test', async ({ context, page, loginPage }) => {
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



