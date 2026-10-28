import {test,expect} from "@playwright/test";

import fs from 'fs';

let BookMockBody = JSON.parse(fs.readFileSync('tests/api/test-data/BookMockBody.json', 'utf-8'));

test('Fulfill books request using stored json response', async ({ page }) => {

  await page.route("https://demoqa.com/BookStore/v1/Books", async route => {
    await route.fulfill({ status: 200,json: BookMockBody });
  });                                           

  await page.goto("https://demoqa.com/books");
  await page.waitForTimeout(15000);

  await expect(page.getByText('THIS IS TEST2')).toBeVisible();
  await page.screenshot({ path: "screenshots/mocked-books.png" });
});
