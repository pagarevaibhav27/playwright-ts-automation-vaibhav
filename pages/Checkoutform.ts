import {Page,Locator,expect} from '@playwright/test'

export class Checkoutform{
    readonly page:Page;
    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly zipcode:Locator;
    readonly continue:Locator;



//constuctor
constructor(page:Page)
{
    this.page = page;
    this.firstname = page.locator('[data-test="firstName"]');
    this.lastname = page.locator('[data-test="lastName"]');
    this.zipcode = page.locator('[data-test="postalCode"]');
    this.continue = page.locator('[data-test="continue"]');
}

//function
async fillCheckoutform(firstname:string,lastname:string,zip:string){
      await this.firstname.fill(firstname);
      await this.lastname.fill(lastname);
      await this.zipcode.fill(zip);
}
async clickContinue(){
    await this.continue.click();
}



}