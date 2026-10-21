import {Page,Locator,expect} from '@playwright/test';

//export
export class CheckoutOverview{
readonly page:Page ;
readonly finishButton: Locator;



//constuctor
constructor(page : Page){
this.page = page;
this.finishButton = page.locator('[data-test="finish"]');

}

//function
async clickFinish(){
   await this.finishButton.click();
}

}