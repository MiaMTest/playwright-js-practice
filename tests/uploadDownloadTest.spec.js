import { expect, test } from '@playwright/test';
import { updateItemproperty, saveRowData } from '../utils/exceljsUtils';
import { UploadPage } from '../page-objects/UploadPage';
import path from 'path';
import { fileURLToPath } from 'url';


//Define a stable,unique file path to prvent cross-test data pollution
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '/../data/download.xlsx');

test.describe('Upload the updated excel data file', async () => {
     /**@type {UploadPage} */
    let uploadPage;

    test.beforeEach(async ({ page }) => {
        uploadPage = new UploadPage(page);
        await page.goto('/upload-download-test/');

    })

    test('Upload excel file after added new row data', async ({ page }) => {

        //Download and save file in project directory
        const donwloadPromise = page.waitForEvent('download');
        await uploadPage.downloadBtn.click();
        const download = await donwloadPromise;
        await download.saveAs(filePath);

        //add new row data
        const addedRowValue = ['Watermelon', 'white', '999.99', 'Winter']
        await saveRowData(addedRowValue);
        //Upload the file and assert the success mesage
        await uploadPage.fileInput.setInputFiles(filePath);
        await expect(uploadPage.uploadSuccessMsg).toBeVisible();
        //add assertion for row data
        const actualRowUIValue = await uploadPage.getRowCellsFromUI('Watermelon');
        const dataColumnsOnly = actualRowUIValue.slice(1); //drop SNo
        await expect(dataColumnsOnly).toEqual(addedRowValue);

    })


    test('Upload modified excel file', async ({ page }) => {

        //destructure array to capture download object
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            uploadPage.downloadBtn.click()
        ])
        await download.saveAs(filePath);

        //modify excel data: Mango's price to 77.11
        await updateItemproperty('Mango', "price", 77.11);
        await uploadPage.fileInput.setInputFiles(filePath);
        await expect(uploadPage.uploadSuccessMsg).toBeVisible();
        const actualValue = await uploadPage.fetchProperty('Mango', 'Price');
        await expect(actualValue).toBe('77.11');


    })
})

