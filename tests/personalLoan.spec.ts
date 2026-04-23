import { test } from '@playwright/test';
import { EmiPage } from '../pages/EmiPage';
import testData from '../testData.json';
import { calcEMI } from '../utils/mathUtils';

test('Validate Personal Loan Calculation', { tag: '@functional' }, async ({ page }) => {
    const emiPage = new EmiPage(page);
    await emiPage.navigate();
    await emiPage.personalLoanTab.click();
    
    await emiPage.fillDetails(testData.personal.principle, testData.personal.rate, testData.personal.time);
    const results = await emiPage.getCalculatedValues();
    await page.screenshot({path:"screenshots/personalLoan.png"});

    console.log(`Personal Loan UI EMI: ${results.emi}, Expected: ${calcEMI(Number(testData.personal.principle), Number(testData.personal.rate), Number(testData.personal.time))}`);

    
    const intPer = ((results.totalInterest / results.totalAmount) * 100).toFixed(1);
    console.log(`Personal Loan Interest % from total amount: ${intPer}%`);
});