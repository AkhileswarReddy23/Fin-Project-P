import { test } from '@playwright/test';
import { EmiPage } from '../pages/EmiPage';
import testData from '../testData.json';
import { calcEMI } from '../utils/mathUtils';

test('Validate Car Loan and Download', { tag: '@functional' }, async ({ page }) => {
    const emiPage = new EmiPage(page);
    await emiPage.navigate();
    await emiPage.carLoanTab.click();
    await emiPage.fillDetails(testData.car.principle, testData.car.rate, testData.car.time);

    const results = await emiPage.getCalculatedValues();
    await page.screenshot({path:"screenshots/carLoan.png"});
    
    console.log(`Car Loan UI EMI: ${results.emi}, Expected: ${calcEMI(Number(testData.car.principle), Number(testData.car.rate), Number(testData.car.time))}`);

    const intPer = ((results.totalInterest / results.totalAmount) * 100).toFixed(1);
    console.log(`Car Loan Interest % from total amount: ${intPer}%`);

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        emiPage.downloadExcelBtn.click()
    ]);

    const filePath = './downloads/' + download.suggestedFilename();
    await download.saveAs(filePath);
    console.log(`Car Loan Excel saved to: ${filePath}`);
});