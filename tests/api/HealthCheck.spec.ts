import { test, expect } from '@playwright/test';

test("Test Health Check - Check response 201 and response under 1500ms for 60secs", { tag: ['@smoke'] }, async ({ request }) => {
  test.setTimeout(90000);

  const endTime = Date.now() + 60000;   // keep checking for 60 seconds

  while (Date.now() < endTime) {
    const start = Date.now();
    const pingres = await request.get("https://restful-booker.herokuapp.com/ping");
    const responseTime = Date.now() - start;

    const pingtext = await pingres.text();
    console.log("ping response: " + pingtext + ", time (ms): " + responseTime);

    expect(pingres.status()).toBe(201);
    expect(responseTime).toBeLessThan(1500);   // threshold in ms

    //await new Promise((resolve) => setTimeout(resolve, 5000));   // wait 5 seconds between checks
  }
});