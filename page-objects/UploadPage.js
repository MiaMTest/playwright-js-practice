
export class UploadPage {
    //Using JSDoctype hinting to get autocomplete(IntelliSensense) and method suggestions
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.downloadBtn = page.getByRole('button', { name: 'Download' });
        this.fileInput = page.locator('#fileinput');
        this.uploadSuccessMsg = page.getByText('Updated Excel Data Successfully.')

    }

    async fetchProperty(item, property) {
        //Map the property variables to the structural column IDs in DOM
        const columnMap = {
            SNo: 1,
            Name: 2,
            Color: 3,
            Price: 4,
            Season: 5
        }
        const targetColumnId = columnMap[property];

        const itemLocator = this.page.getByText(item);
        const targetRow = this.page.locator('div[role="row"]').filter({ has: itemLocator });
        const targetCell = targetRow.locator(`#cell-${targetColumnId}-undefined`);
       // const targetCell = targetRow.locator(`div[data-column-id=${targetColumnId}]`);
       const value = await targetCell.textContent();
       return value;


    }

}

