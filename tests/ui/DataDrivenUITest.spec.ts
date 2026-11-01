import { expect, test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

import fs from 'fs';

let logindata = JSON.parse(fs.readFileSync('tests/ui/test-data-ui/testdataui.json', 'utf-8'));

//console.log("parsed json is -" ,logindata);

logindata.forEach( data => {
    if(data.run==true){
test(`Data Driven Login Test for Login User = ${data.username}`,{tag:['@DataDriven','@sanity']}, async ({ page}) => {
const loginpageo = new LoginPage(page);
await loginpageo.goto();
await loginpageo.login(data.username,data.password);

if(data.expected === "success"){
await expect(page).toHaveURL("/inventory.html");
}
else{
    loginpageo.expectError("Epic sadface");
}

})
;
}
}
)
