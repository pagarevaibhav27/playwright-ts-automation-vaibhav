import {test,expect} from '@playwright/test'
import { InventoryPage } from '../../pages/InventoryPage';

test('Reusing Login state from storageState',async({page})=>{
const inventoryPage = new InventoryPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
  await inventoryPage.addBackpackToCart();
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart/);

}
)