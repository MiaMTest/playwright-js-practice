import { expect, test } from '@playwright/test';
//import { filePath, updateItemproperty, saveRowData, deleteRow } from '../utils/exceljsUtils';
import { UploadPage } from '../page-objects/UploadPage';
import { saveRowData } from '../utils/exceljsUtils';


//Define a stable,unique file path to prvent cross-test data pollution
const filePath = path.join(__dirname, '/../data/download.xlsx');

test('Upload modified excel file', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await page.goto('/upload-download-test/');

    //Download and save file in project directory
    /* const donwloadPromise = page.waitForEvent('download');
     await downloadBtn.click();
     const download = await donwloadPromise;
     await download.saveAs(filePath);*/

    //destructure array to capture download object
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        uploadPage.downloadBtn.click()
    ])
    await download.saveAs(filePath);

    //modify excel data
    await saveRowData(['Watermelon', 'white', 999.99, 'Winter']);
    //Upload the file and assert the success mesage
    await uploadPage.fileInput.setInputFiles(filePath);
    await expect(uploadPage.uploadSuccessMsg).toBeVisible();

    //await updateItemproperty('Mango', "price", 99.99);
    // await saveRowData(['Watermelon', 'white', 999.99, 'Winter'],5);
    const actualValue = await uploadPage.fetchProperty('Mango', 'Price');
    await expect(actualValue).toBe('99.99');

    //await deleteRow(8, 1);



})
