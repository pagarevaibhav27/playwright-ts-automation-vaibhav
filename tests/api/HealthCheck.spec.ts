import {test, expect} from '@playwright/test'

test("Test Health Check - Check response 201 and response under 1500ms for 60secs",async({request})=>{
test.setTimeout(60000)

while(true){
    const start = Date.now();
const pingres = await request.get("https://restful-booker.herokuapp.com/ping");

const responseTime = Date.now() - start;
console.log("ping response time (ms): " + responseTime);
const pingtext = await pingres.text();

expect(pingres.status()).toBe(201);
  expect(responseTime).toBeLessThan(1500);   // threshold in ms

}

})