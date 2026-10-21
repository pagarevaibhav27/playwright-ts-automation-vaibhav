import { Page,expect,Locator } from "@playwright/test";

export class CartPage{
    readonly page: Page;
    readonly removebackpack: Locator;
    readonly continueshopping: Locator;
    readonly checkout: Locator;
constructor(page : Page){
    this.page = page;
    this.removebackpack =page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.continueshopping =page.locator('[data-test="continue-shopping"]');
    this.checkout =page.locator('[data-test="checkout"]');
}

async removebackpackfromcartandcontinueshopping(){
   await this.removebackpack.click();
    await this.continueshopping.click();
}

async clickcheckout(){
   await this.checkout.click();
  
}

}