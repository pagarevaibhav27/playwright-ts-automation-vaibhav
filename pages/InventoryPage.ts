import {Page ,Locator, expect} from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
readonly backpack_addtocartbtn: Locator;
readonly shopping_cart_link: Locator;


constructor(page: Page) {
    this.page = page;
  //  this.backpack_addtocartbtn = page.getByPlaceholder('add-to-cart-sauce-labs-backpack');
    this.backpack_addtocartbtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.shopping_cart_link = page.getByRole('button', { name: /^Cart/ });
}   

async addBackpackToCart() {
    await this.backpack_addtocartbtn.click();

  }

  async goToCart() {
    await this.shopping_cart_link.click();

  }

}
