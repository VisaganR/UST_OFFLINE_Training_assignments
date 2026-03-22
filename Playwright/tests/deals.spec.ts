import { test, expect } from '@playwright/test';

const deals = [
  { name: 'GUJARAT', url: 'gujarat-christmas-special-tours-package' },
   { name: 'THAILAND', url: 'phuket-and-krabi-escapade-tours-package/' },
   { name: 'MALAYSIA', url: 'dazzling-kuala-lumpur-getaway-tours-package/' },
   { name: 'ANDAMAN', url: 'https://www.easemytrip.com/holidays/' },
   { name: 'MANALAI', url: 'https://www.easemytrip.com/holidays/' },
    { name: 'SRILANKA', url: 'https://www.easemytrip.com/holidays/' },
];

test.describe('Destination Navigation', () => {

  for (const dest of deals) {

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