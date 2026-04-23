import { Page, Locator } from '@playwright/test';

export class EmiPage {  // property declaration
    readonly page: Page;
    readonly homeLoanTab: Locator;
    readonly personalLoanTab: Locator;
    readonly carLoanTab: Locator;
    readonly loanAmountInput: Locator;
    readonly interestRateInput: Locator;
    readonly loanTenureInput: Locator;
    readonly emiResult: Locator;
    readonly totalInterestResult: Locator;
    readonly totalAmountResult: Locator;
    readonly downloadExcelBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        // Locating the tabs
        this.homeLoanTab = page.getByRole('link', { name: 'Home Loan', exact: true });
        this.personalLoanTab = page.getByRole('link', { name: 'Personal Loan', exact: true });
        this.carLoanTab = page.getByRole('link', { name: 'Car Loan', exact: true });
        
        // These IDs are consistent across the different loan calculators on this site
        this.loanAmountInput = page.locator('#loanamount');
        this.interestRateInput = page.locator('#loaninterest');
        this.loanTenureInput = page.locator('#loanterm');
        
        this.emiResult = page.locator('#emiamount span');
        this.totalInterestResult = page.locator('#emitotalinterest');
        this.totalAmountResult = page.locator('#emitotalamount');
        this.downloadExcelBtn = page.getByRole('button', { name: /Download Excel/i });
    }

    // navigate to that page
    async navigate() {
        await this.page.goto('https://emicalculator.net');
    }

    
    // Fill details in the page
    async fillDetails(amount: string, rate: string, tenure: string) {
        await this.loanAmountInput.fill(amount);
        await this.interestRateInput.fill(rate);
        await this.loanTenureInput.fill(tenure);
        await this.loanTenureInput.press('Enter');
    }

    // Fetching the details from the UI of the webpage
    async getCalculatedValues() {
        const emiText = await this.emiResult.innerText();
        const interestText = await this.totalInterestResult.innerText();
        const totalText = await this.totalAmountResult.innerText();

        // Helper to convert currency strings like "1,23,456" to Numbers
        const parse = (text: string) => Number(text.replace(/[^0-9.-]+/g, ""));

        return {
            emi: parse(emiText),
            totalInterest: parse(interestText),
            totalAmount: parse(totalText)
        };
    }
}