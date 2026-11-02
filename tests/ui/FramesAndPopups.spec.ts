import {test,expect} from '@playwright/test'

test('Test Nested frames',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/');
    
    await page.getByText('Nested Frames').click();
 
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/nested_frames');
    

    const middle = page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-middle"]');
   await expect(middle.getByText('MIDDLE')).toBeVisible();
   

}
);

test('TEST New Window',async({page})=>{
await page.goto('https://the-internet.herokuapp.com/');

    
 await page.getByText('Multiple Windows').click();
 const popupPromise = page.waitForEvent('popup');
 await page.getByText('Click Here').click();
 const popup = await popupPromise;
 await expect(popup.getByRole('heading', { name: 'New Window' })).toBeVisible();
 await expect(popup).toHaveURL('https://the-internet.herokuapp.com/windows/new');



}

);

test('Test dailoge handling',async({page})=>{

await page.goto('https://the-internet.herokuapp.com/');
await page.getByText('JavaScript Alerts').click();
await expect(page).toHaveURL('https://the-internet.herokuapp.com/javascript_alerts');
    //dialog Accept/OK
   page.once('dialog', async (dialog) => {               
     expect(dialog.message()).toBe('I am a JS Alert');
     await dialog.accept();
   });

   await page.getByRole('button', { name: 'Click for JS Alert' }).click();
   await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');


   //Dailog cancel
    page.once('dialog', async (dialog2) => {
     expect(dialog2.message()).toBe('I am a JS Confirm');
     await dialog2.dismiss();
   });

   await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

   await expect(page.locator('#result')).toHaveText('You clicked: Cancel');

   //dailog OK with filling dialog text
   page.once('dialog',async(dailogOK) => {
    expect(dailogOK.message()).toBe('I am a JS prompt');
    await dailogOK.accept('THIS IS A TEST');

   });
    await page.getByRole('button',{name: 'Click for JS Prompt'}).click();

    await expect(page.locator('#result')).toHaveText('You entered: THIS IS A TEST');


});


