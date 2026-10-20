import { test, expect } from '@playwright/test';


 test('SauceDemo login test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  //await page.locator('[data-test="username"]').click();

  await page.getByPlaceholder('Username').click();
   await page.getByPlaceholder('Username').fill('standard_user');

 await page.getByLabel('Password').click();
 await page.getByLabel('Password').fill('secret_sauce');


  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="title"]').click();



 
});

