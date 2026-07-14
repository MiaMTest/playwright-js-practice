import { test, expect } from '@playwright/test'

test('dialog handling test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    //Using page.on() method to listen event, then perform action dialog.accept() or dialog.dismiss()
    //By default dialogs are auto-dismissed
    await page.on('dialog', dialog => dialog.accept());
    await page.locator('#alertbtn').click();

    //mouse hover
    await page.locator('#mousehover').hover();
    await page.pause();
    await page.getByRole('link', { name: 'top' }).click();

})

test('window handle test', async ({ context, page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('#openwindow').click()

    ])
    await newPage.getByRole('link', { name: 'Get This Domain' }).click();
    await expect(newPage).toHaveTitle('GoDaddy Domain Name Search')
    await page.bringToFront;


})
test('frame handle test', async ({ context, page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const courseFrame = page.frameLocator('#courses-iframe');
    await courseFrame.locator('li a[href="lifetime-access"]:visible').click();
    const suscriberNb = await courseFrame.locator('h2:has-text("Subscibers") span').textContent();
    console.log(suscriberNb);




})

test('visual comparison test',async({page})=>{

     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
     await page.waitForLoadState('networkidle');
     const fullPageLayout = page.locator('html');
     await expect(fullPageLayout).toHaveScreenshot('landing.png');

})




