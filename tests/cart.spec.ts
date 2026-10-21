import { test, expect } from './fixtures';

test('add backpack to cart', async ({ inventoryPage, page }) => {
  await inventoryPage.addBackpackToCart();
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart/);
});