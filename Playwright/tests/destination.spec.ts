import { test, expect } from '@playwright/test';

const destinations = [
  { name: 'Europe', url: 'europe-tours-packages' },
  { name: 'Kerala', url: 'kerala-tours-packages' },
  { name: 'Bali', url: 'bali-tours-packages' },
  { name: 'Kashmir', url: 'kashmir-tours-packages' },
  { name: 'Vietnam', url: 'vietnam-tours-packages' },
];

test.describe('Destination Navigation', () => {

  for (const dest of destinations) {

    test(`Navigate to ${dest.name}`, async ({ page }) => {

     await page.goto('https://www.easemytrip.com/holidays/', {
        waitUntil: 'domcontentloaded'
      });

      await page.evaluate((urlPart) => {
        const link = document.querySelector(`a[href*="${urlPart}"]`) as HTMLElement;
        if (link) link.click();
      }, dest.url);

      await expect(page).toHaveURL(new RegExp(dest.url));

    });

  }

});