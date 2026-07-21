import ExcelJS from 'exceljs'; //import ExcelJS class
import path from 'path';
import { fileURLToPath } from 'url';

//Extracts the path of the parent folder(directory) that contains the current file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//Resolve the path relative to the script(go up to project root, then data folder)
export const filePath = path.join(__dirname, '/../data/download.xlsx');


// Shared helper to load the Excel file and return core context.
async function getWorksheetContext() {
   const workbook = new ExcelJS.Workbook();
   await workbook.xlsx.readFile(filePath);
   //const worksheet = workbook.getWorksheet('Sheet1');
   const worksheet = workbook.worksheets[0];

   if (!worksheet) {
      console.error('No worksheet found in the workbook');
      return null;
   };
   return { workbook, worksheet, filePath };
}


async function readExcel() {

   const context = await getWorksheetContext();
   if (!context) {
      console.error('Cannot read Excel: Worksheet context is invalid or missing ')
      return;
   }
   const { worksheet } = context;

   //Iterate the value in worksheet
   worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, cellNumber) => {
         console.log(cell.value);
      })
   });

}


/**
 * Update any specific column property for a given item dynamically.
 * @param {string} lookupKey - The item name to search for (e.g., 'Apple')
 * @param {string} targetColumnHeader - The column header to update (e.g., 'price', 'color', 'season')
 * @param {any} newValue - The new value to set (e.g., 1200.00, 'Summer', 'Red')
 */
export async function updateItemproperty(lookupKey, targetColumnHeader, newValue) {
   const context = await getWorksheetContext();
   if (!context) return;
   //JS object destructuring to extrat properties into an object
   const { workbook, worksheet, filePath } = context;

   //Dynamically locate the target column index based on the header name provided
   let targetColumnIndex = null;
   const headerRow = await worksheet.getRow(1);
   headerRow.eachCell((cell, colNumber) => {
      //Using optional chaining to clean the header string to make matching flexible
      const currentHeader = cell.value?.toString().toLowerCase().trim();
      if (currentHeader === targetColumnHeader.toLowerCase()) {
         targetColumnIndex = colNumber;
      }
   });

   if (!targetColumnIndex) {
      console.error(`Could not find ${targetColumnHeader} column header`)
   }

   //Add flag for saving perfomance(rewrite only flag updated) and preventing data corruption.
   let isUpdated = false;
   worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {

         if (cell.value?.toString().toLowerCase().trim() === lookupKey.toLowerCase()) {
            const targetCell = row.getCell(targetColumnIndex);
            targetCell.value = newValue;
            isUpdated = true;
         }
      })
   });

   if (isUpdated) {
      await workbook.xlsx.writeFile(filePath);
      console.log(`Successfully updated  ${targetColumnHeader} to ${newValue} for ${lookupKey}`);
   } else {
      console.log(`Item ${lookupKey} not found`);
   }
}

export async function saveRowData(rowData, insertAtPosition = null) {
   const context = await getWorksheetContext();
   if (!context) return;
   const { workbook, worksheet, filePath } = context;

   // Auto-generate SNo at the start column, handle data structured as an Array or an Object
   const formatRowWithSNo = (sNoValue, data) => {
      return Array.isArray(data) ? [sNoValue, ...data] : { sNo: sNoValue, ...data };
   }

   const rowCount = worksheet.rowCount;
   //INSERTION FLOW (middle of sheet)
   if (insertAtPosition != null && insertAtPosition <= rowCount) {
      //Use the target position as the new row's SNo
      const finalRowData = formatRowWithSNo(insertAtPosition, rowData);
      worksheet.insertRow(insertAtPosition, finalRowData);


      //CASCADING RE-INDEX:update every single row below the insertion point
      for (let i = insertAtPosition +1; i <= rowCount; i++) {
         const currentRow = worksheet.getRow(i);
         currentRow.getCell(1).value = i;
         currentRow.commit(); //Update the internal row layout buffer;Ensure row's change are locked
      }
      await workbook.xlsx.writeFile(filePath);
      console.log(`Row successfully inserted at position ${insertAtPosition}`)
   } else {
      //APPEND FLOW (end of sheet)
    
      const nextSNo = rowCount > 0 ? rowCount : 1;
      const finalRowData = formatRowWithSNo(nextSNo, rowData);
      await worksheet.addRow(finalRowData);
      await workbook.xlsx.writeFile(filePath);
      console.log('Row successfully appended to the end of the sheet')
   }
}



export async function deleteRow(startRow, deleteCount) {

   const context = await getWorksheetContext();
   if (!context) return;
   const { workbook, worksheet, filePath } = context;
   worksheet.spliceRows(startRow, deleteCount);
   console.log('Row deleted successfully.')
   await workbook.xlsx.writeFile(filePath);

}


async function findAndReplaceAll(targetValue, newValue) {
   const context = await getWorksheetContext();
   if (!context) return;
   const { workbook, worksheet, filePath } = context;

   let found = false;
   worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
         if (cell.value === targetValue) {
            console.log(`Found ${targetValue} at Row ${rowNumber} Cell ${colNumber}`)
            cell.value = newValue;
            found = true;
         }
      })
   });

   if (found) {
      await workbook.xlsx.writeFile(filePath);
   }
   else {
      console.log(`Target value ${targetValue} was not found in the sheet.`)
   }
}


