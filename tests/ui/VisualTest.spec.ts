import {test,expect} from '@playwright/test'


test('Visual Test for Saucedemo inventory page',{tag:['@visual','@smoke']},async({page})=>{

   await page.goto("https://www.saucedemo.com/inventory.html");
   await expect (page).toHaveScreenshot('baselineScreenshots/SaucedemoInventory.png',{maxDiffPixelRatio:0.1});

}

);


test('books page matches baseline', { tag: ['@visual'] }, async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Visual baseline kept for Chromium only');
  await page.goto("https://demoqa.com/books");
  //await page.goto('/inventory.html');
  await expect(page).toHaveScreenshot('baselineScreenshots/mocked-booksSS.png', { maxDiffPixelRatio: 0.01 });
});
