import {test,expect} from "@playwright/test";



test('API Mocking Test1 - fulfill', async ({page,request}) => {

console.log("test started now");

await page.route("https://demo.playwright.dev/api-mocking/api/v1/fruits",async route =>{

  //await route.abort();

  
  
  const  customresponse = await route.fulfill({status:500,json : [{
    "Id" : 123,
    "name" : "vaibhav loves harshada"
  },{
    "Id" : 124,
    "name" : "harshada loves vaibhav"
  }]

}
//await console.log("customereponse give is " +customresponse);

); 


}

)

  await page.goto("https://demo.playwright.dev/api-mocking/");

  

 await page.waitForTimeout(12000);
 // Assert that the harshada  is visible
  await expect(page.getByText('harshada loves')).toBeVisible();
 await page.screenshot({path : "screenshot.jpg"})



});