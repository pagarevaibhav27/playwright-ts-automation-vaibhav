import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutForm } from '../../pages/Checkoutform';
import { CheckoutOverview } from '../../pages/CheckoutOverview';
test.use({ storageState: { cookies: [], origins: [] } });
//serial mode - login >> Add to Cart >> remove from Cart and contunie shopping>>add to cart and fill checkout and finsh

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('SauceDemo login test', async () => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('SauceDemo add backpack to cart', async () => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addBackpackToCart();
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart/);
});

test('Remove added backpack from cart and continue shopping', async () => {
  const cartPage = new CartPage(page);
  await cartPage.removeBackpackAndContinueShopping();
  
  await expect(page).toHaveURL(/inventory/);
});

//again add backpack to cart and click checkout
test('SauceDemo add backpack to cart and click checkout', async () => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addBackpackToCart();
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart/);
  const cartPage = new CartPage(page);
  await cartPage.clickCheckout();
   await expect(page).toHaveURL(/checkout-step-one/);
});

//fill checkout form
test('Fill checkout form', async () => {
  const checkoutform = new CheckoutForm(page);
  await checkoutform.fillCheckoutForm('Testfirstname','Testlastname','12345');
await checkoutform.clickContinue();
  

   await expect(page).toHaveURL(/checkout-step-two/);
});

//finish checkout

test('finish checkout',async()=>{
const checkoutfinish = new CheckoutOverview(page);
await checkoutfinish.clickFinish();
await expect(page).toHaveURL(/checkout-complete/);

})




