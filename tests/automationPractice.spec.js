import { test, expect } from '@playwright/test';
import { AutomationPracticePage } from '../page-objects/AutomationPracticePage';

test.describe('Automation practice tests', () => {
    /**@type {AutomationPracticePage} */
    let autoPracticePage;

    test.beforeEach(async ({ page, context }) => {
        autoPracticePage = new AutomationPracticePage(page, context);
        await page.goto('/AutomationPractice/');
    })



    test('dialog handling test', async () => {
        const name = 'Tom Hanks';
        let alertMessage = '';

        await autoPracticePage.enterNameValue(name);
        await expect(autoPracticePage.nameInput).toHaveValue(name);
        alertMessage = await autoPracticePage.confirmNameAndDismissAlert();
        await expect(alertMessage).toBe(`Hello ${name}, Are you sure you want to confirm?`);
        await expect(autoPracticePage.nameInput).not.toHaveValue(name);

    })

    test('mouse hover test', async () => {

        await expect(autoPracticePage.moveToTopLink).not.toBeVisible();
        await autoPracticePage.mourseHoverBtn.hover();
        await autoPracticePage.moveToTopLink.click();
        //Wrap method in an arrow function and pass it in expect.poll to repeat executing until condition is met
        await expect.poll(() => autoPracticePage.verifyPageScroll()).toBe(0);

    })

    test('window handle test', async ({ page }) => {
        await expect(page).toHaveTitle('Practice Page');
        const newPage = await autoPracticePage.openAndGetNewWindow();
        await expect(newPage).toHaveURL('https://www.qaclickacademy.com/');
        await page.bringToFront();


    })

    test('frame handle test', async ({ page }) => {
        await autoPracticePage.navigateToAllAccessPlan();
        const suscriberNb = await autoPracticePage.getsuscriberNumber();
        console.log(suscriberNb);

    })

    test('visual comparison test', async ({ page }) => {
        //Wait until network traffic completely stops
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot(autoPracticePage.png);

    });

    test('text blinking test', async() =>{
        await expect (autoPracticePage.blinkingText).toHaveClass(/blinking/);
    })

    test('Web Table test', async(page)=>{
        const totalAmount = await autoPracticePage.calculateTotalAmount();
        const amountDisplayed = await autoPracticePage.getTotalAmountDisplayed();
        await expect(Number(amountDisplayed)).toBe(totalAmount);
        
       //console.log(await autoPracticePage.getAllCellsValue());
       const engineers =await autoPracticePage.getByPosition('Engineer');
       console.log(engineers);
        
    })

})




