import { test as base } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

type Pages = {
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

export const test = base.extend<Pages>({
  inventoryPage: async ({ page }, use) => {
    await page.goto('/inventory.html');
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';