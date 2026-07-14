import { expect, test } from '@playwright/test';
import { filePath, updateItemproperty, saveRowData, deleteRow } from '../utils/exceljsUtils';

test.only('Download excel file', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadBtn = page.getByRole('button', { name: 'Download' });
    const fileInput = page.locator('#fileinput');
    const uploadSuccessMsg = page.getByText('Updated Excel Data Successfully.')

    //Download and save file in project directory
    const donwloadPromise = page.waitForEvent('download');
    await downloadBtn.click();
    const download = await donwloadPromise;
    await download.saveAs(filePath);

    await updateItemproperty('Mango', "price", 99.99);
    await saveRowData([, 'Apple', 'yellow', 3.9, 'Fall']);
    await fileInput.setInputFiles(filePath);
    expect(uploadSuccessMsg).toBeVisible();
    await downloadBtn.click();

    //await deleteRow(8, 1);
    console.log('Testing Qodo');


})
