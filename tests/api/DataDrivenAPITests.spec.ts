import { test, expect } from '@playwright/test';
import fs from 'fs';

const bookings = JSON.parse(fs.readFileSync('tests/api/test-data/booking.json', 'utf-8'));

bookings.forEach((body : any) => {
  test("POST booking for " + body.firstname, async ({ request }) => {
    const postres = await request.post("https://restful-booker.herokuapp.com/booking", { data: body });
    expect(postres.status()).toBe(200);

    const postresjson = await postres.json();
    console.log("post response is ", postresjson);
    expect(postresjson.booking.firstname).toBe(body.firstname);
    expect(postresjson.booking.totalprice).toBe(body.totalprice);
  });
});