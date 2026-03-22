import { test, expect } from '@playwright/test';

test.describe('EaseMyTrip Holidays Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.easemytrip.com/holidays/');
  });

  test('Verify homepage elements', async ({ page }) => {
    // Logo
    const logo = page.locator('img[alt="EaseMyTrip.com"]');
    await expect(logo).toBeVisible();

    // Menu icons
    // const menuItems = ['Flights', 'Hotels', 'Trains', 'Bus', 'Holidays', 'Cabs', 'Activities', 'Visa', 'More'];
    // for (const item of menuItems) {
    //   await expect(page.locator(`text=${item}`)).toBeVisible();
    // }

    // // Login/Signup button
    // await expect(page.locator('button:has-text("Login or Signup")')).toBeVisible();

    // // Currency/Language selector
    // await expect(page.locator('div:has-text("INR")')).toBeVisible();
  });

  test('Verify search functionality', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Enter Your Dream Destination!"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Dubai');
    await expect(page).toHaveURL('https://www.easemytrip.com/holidays/');
  });

  
  test('Verify Holiday Types section', async ({ page }) => {
    const holidayTypes = ['Easy Book', 'Honeymoon', 'Luxury', 'Adventure'];//need to check pilgrimage
    for (const type of holidayTypes) {
      const locator = page.locator(`text=${type}`).first();
      await locator.waitFor({ state: 'attached' });
      await expect(locator).toBeVisible({ timeout: 10000 });
      
    await locator.click();

    
    const expectedUrlPart = type.toLowerCase().replace(/\s+/g, '-');
    // if(expectedUrlPart=="Pilgrimage"){
    //      await expect(page).toHaveURL(new RegExp("easydarshan"));
    //       await page.goBack();
    // }
    await expect(page).toHaveURL(new RegExp(expectedUrlPart));
    await page.goBack();
    }

  });
  

  test('Verify Top Trending Destinations', async ({ page }) => {
    const destinations = page.locator('section:has-text("Top Trending Destinations") img');
    const count = await destinations.count();
   // expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(destinations.nth(i)).toBeVisible();
    }
  });

  


});