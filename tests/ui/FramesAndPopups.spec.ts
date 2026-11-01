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

)
