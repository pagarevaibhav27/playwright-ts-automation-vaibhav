import {test,expect,Page} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; 


test('Invalid Password',async({page})=>{
     const loginPage = new LoginPage(page);
  await loginPage.goto();
 await loginPage.login('standard_user', 'wrongpassword');
  await loginPage.expectError("Username and password do not match any user in this service");

}


)