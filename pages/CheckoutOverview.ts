import {Page,Locator,expect} from '@playwright/test';

//export
export class CheckoutOverview{
readonly page:Page ;
readonly finishbtn: Locator;



//constuctor
constructor(page : Page){
this.page = page;
this.finishbtn = page.locator('[data-test="finish"]');

}

//function
async clickfinish(){
    this.finishbtn.click();
}

}