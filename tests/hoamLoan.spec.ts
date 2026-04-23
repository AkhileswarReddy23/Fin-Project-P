import { test } from '@playwright/test';
import { EmiPage } from '../pages/EmiPage';  // importing the page in the test file.
import { calcEMI } from '../utils/mathUtils';
import testData from '../testData.json';

test('Validate Home Loan Calculation', { tag: '@functional' }, async ({ page }) => {
    const emiPage = new EmiPage(page);
    await emiPage.navigate();
    await emiPage.homeLoanTab.click();



    await emiPage.fillDetails(testData.home.principle, testData.home.rate, testData.home.time);
    const results = await emiPage.getCalculatedValues();
    await page.screenshot({path:"screenshots/homeLoan.png"});
    
    console.log(`Home Loan UI EMI: ${results.emi}, Expected: ${calcEMI(Number(testData.home.principle), Number(testData.home.rate), Number(testData.home.time))}`);
    const intPer = ((results.totalInterest / results.totalAmount) * 100).toFixed(1);
    console.log(`Home Loan Interest % from total amount: ${intPer}%`);
});