import { test } from '@playwright/test';
import { EmiPage } from '../pages/EmiPage';

test.describe('Smoke Tests - Page Navigation', { tag: '@smoke' }, () => {
    test('Validate all loan pages open', async ({ page }, testInfo) => {
        const emiPage = new EmiPage(page);
        await emiPage.navigate();

        const sections = [
            { name: 'Home Loan', locator: emiPage.homeLoanTab, screen: 'smoke_home.png' },
            { name: 'Personal Loan', locator: emiPage.personalLoanTab, screen: 'smoke_personal.png' },
            { name: 'Car Loan', locator: emiPage.carLoanTab, screen: 'smoke_car.png' }
        ];

        for (const section of sections) {
            await test.step(`Validate ${section.name} Page`, async () => {
                await section.locator.click();
                const screenshot = await page.screenshot({ path: `./screenshots/${section.screen}` });
                await testInfo.attach(section.name, { body: screenshot, contentType: 'image/png' });
            });
        }
    });
});