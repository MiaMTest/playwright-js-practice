export class AutomationPracticePage {
    /**
* @param {import('@playwright/test').Page} page
* @param {import('@playwright/test').BrowserContext} context
*/
    constructor(page) {
        this.page = page;
        this.context = page.context(); //call page object's parent context
        this.confirmBtn = page.getByRole('button', { name: 'Confirm' });
        this.mourseHoverBtn = page.locator('#mousehover');
        this.moveToTopLink = page.getByRole('link', { name: 'top' });
        this.nameInput = page.getByPlaceholder('Enter Your Name');
        this.openWindowBtn = page.locator('#openwindow');
        this.courseFrame = page.frameLocator('#courses-iframe');
        this.allAccessPlan = this.courseFrame.locator('li a[href="lifetime-access"]:visible');
        this.suscriberNb = this.courseFrame.locator('h2:has-text("Subscibers") span');
        this.fullPageLayout = page.locator('html');
        this.blinkingText = page.locator('.blinkingText');
        this.amountHeader = page.getByRole('columnheader', { name: 'Amount' });
        this.totalAmountCollected = page.getByText('Total Amount Collected:');
        this.amountCells = page.locator('.tableFixHead tbody tr td:nth-child(4)');
        this.cellsValue = page.locator('.tableFixHead tbody tr td');
        //this.positionsLocator = page.locator('.tableFixHead tbody tr td:nth-child(2)')


    }
    async getByPosition(position) {
        /**
 * Filters the dataset by position and returns all matching full row objects.
 * @param {string} position 
 * @returns {Array<Object>}
 */
        const employeeData = await this.getAllCellsValue();
        return employeeData.filter(employee => employee.position.toLowerCase() === position.toLowerCase());

    }

    async getAllCellsValue() {
        //Grab and flatten data into a single,one-dimensioned array of strings
        //return await this.cellsValue.allTextContents();

        //Construct an array of strucutred row objects
        const rowLocator = this.page.locator('.tableFixHead tbody tr');
        const rowCount = await rowLocator.count();
        const dataset = [];

        for (let i = 0; i < rowCount; i++) {
            const row = rowLocator.nth(i);
           // await row.scrollIntoViewIfNeeded();

            //Grab the text of td element inside specific row
            const cells = await row.locator('td').allTextContents();
            if (cells.length >= 4) {
                dataset.push({
                    name: cells[0],
                    position: cells[1],
                    city: cells[2],
                    amount: Number(cells[3])
                })
            }
        }
        return dataset;
    }

    async calculateTotalAmount() {
        const allAmounts = await this.amountCells.allTextContents();
        let totalAmount = 0;
        for (const amountText of allAmounts) {
            totalAmount = totalAmount + Number(amountText.trim());
        }
        return totalAmount;

    }
    async getTotalAmountDisplayed() {
        const text = await this.totalAmountCollected.textContent();
        const amountDisplayed = text.split(':')[1].trim();
        return amountDisplayed;
    }


    async getsuscriberNumber() {
        return this.suscriberNb.textContent();
    }
    async navigateToAllAccessPlan() {
        await this.allAccessPlan.click();
    }

    async enterNameValue(name) {
        await this.nameInput.fill(name);
    }

    async confirmNameAndDismissAlert() {
        let message = '';

        this.page.on('dialog', async (dialog) => {
            message = dialog.message();
            await dialog.dismiss();
        });
        await this.confirmBtn.click();

        //the following solution is not working on the env
        /*  const dialogPromise = this.page.waitForEvent('dialog');
        const [dialog] = await Promise.all([
              dialogPromise,
              this.confirmBtn.click()
          ]);
           const dialog = await dialogPromise;*/

        // const message = dialog.message();
        // await dialog.dismiss();
        return message;

    }
    async verifyPageScroll() {
        return await this.page.evaluate(() => window.scrollY);
    }

    async openAndGetNewWindow() {
        const pagePromise = this.context.waitForEvent('page'); //setup listner
        await this.page.locator('#openwindow').click(); //trigger new window
        const newPage = await pagePromise;  //await and return new page instance

        await newPage.waitForLoadState() //endore it's ready
        return newPage;


    }

}
