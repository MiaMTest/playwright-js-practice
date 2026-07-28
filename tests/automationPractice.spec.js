import { expect } from '@playwright/test';
import { customTest } from '../utils/base-test';


customTest.describe('Automation practice tests', () => {

    customTest('dialog handling test', async ({autoPracticePage}) => {
        const name = 'Tom Hanks';
        let alertMessage = '';

        await autoPracticePage.enterNameValue(name);
        await expect(autoPracticePage.nameInput).toHaveValue(name);
        alertMessage = await autoPracticePage.confirmNameAndDismissAlert();
        await expect(alertMessage).toBe(`Hello ${name}, Are you sure you want to confirm?`);
        await expect(autoPracticePage.nameInput).not.toHaveValue(name);

    })

    customTest('mouse hover test', async ({autoPracticePage}) => {

        await expect(autoPracticePage.moveToTopLink).not.toBeVisible();
        await autoPracticePage.mourseHoverBtn.hover();
        await autoPracticePage.moveToTopLink.click();
        //Wrap method in an arrow function and pass it in expect.poll to repeat executing until condition is met
        await expect.poll(() => autoPracticePage.verifyPageScroll()).toBe(0);

    })

    customTest('window handle test', async ({ page,autoPracticePage }) => {
        await expect(page).toHaveTitle('Practice Page');
        const newPage = await autoPracticePage.openAndGetNewWindow();
        await expect(newPage).toHaveURL('https://www.qaclickacademy.com/');
        await page.bringToFront();


    })

    customTest('frame handle test', async ({ autoPracticePage }) => {
        await autoPracticePage.navigateToAllAccessPlan();
        const suscriberNb = await autoPracticePage.getsuscriberNumber();
        console.log(suscriberNb);

    })

    customTest.only('visual comparison test', async ({ page,autoPracticePage }) => {
        //Wait until network traffic completely stops
        await page.waitForLoadState('networkidle');
       // await expect(page).toHaveScreenshot('autoPracticePage.png',{fullpage:true}); 
       await expect(autoPracticePage.sectionBelowPracticeHeader).toHaveScreenshot('sectionBelowPracticeHeader.png');

    });

    customTest('text blinking test', async({autoPracticePage}) =>{
        await expect (autoPracticePage.blinkingText).toHaveClass(/blinking/);
    })

    customTest('Web Table test', async({autoPracticePage})=>{
        const totalAmount = await autoPracticePage.calculateTotalAmount();
        const amountDisplayed = await autoPracticePage.getTotalAmountDisplayed();
        await expect(Number(amountDisplayed)).toBe(totalAmount);
        
       //console.log(await autoPracticePage.getAllCellsValue());
       const engineers =await autoPracticePage.getByPosition('Engineer');
       console.log(engineers);
        
    })

})




