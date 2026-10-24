import {test,expect,request,Route} from '@playwright/test';

test.describe.configure({ mode: 'serial' });


let authtoken: string;  
let BookingId: number;
const invalidtoken = "invalidtok";

test("TEST GET Booking 1",async ({request})=>{


   const  getreponse = await request.get("https://restful-booker.herokuapp.com/booking/1");

    const resstatus = await getreponse.status();
    const resstatustext = await getreponse.statusText();
   const res = await    getreponse.json();
  
   console.log(resstatus);
    console.log(resstatustext);
    console.log(res);
    await expect(getreponse.status()).toBe(200);

}

)



test("Auth",async({request})=>{

    const authbody ={
         "username" : "admin",
    "password" : "password123"

    }

    const auth = await request.post("https://restful-booker.herokuapp.com/auth",{data:authbody,headers:{"Content-Type": "application/json"}});

    const authis = await auth.json();
    authtoken = authis.token;

    await console.log("Auth token is "+authtoken);
}

)

//passing auth in post api

test("Create New Booking",async ({request})=>{

    const bookinbody={
         "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
    }

   const BookingNew = await request.post("https://restful-booker.herokuapp.com/booking",{ data:bookinbody,headers:{"Cookie": "token="+authtoken}})

   const booking = await BookingNew.json();
     expect(BookingNew.status()).toBe(200);
   console.log(booking);
   BookingId = booking.bookingid;
   console.log("Booking created with ID "+BookingId)
}
)

<<<<<<< Updated upstream
=======
test("TEST GET created Booking ",async ({request})=>{
    const geturl = "https://restful-booker.herokuapp.com/booking/"+BookingId;
    console.log("get url formed is "+geturl)

   const  getreponse = await request.get(geturl);
     console.log("get response is",await getreponse.json());

    const resstatus =  getreponse.status();
    const resstatustext =  getreponse.statusText();
   //const res = await getreponse.json();
   const res = await getreponse.json();
  
   console.log(resstatus);
    console.log(resstatustext);
    console.log(res);
     expect(getreponse.status()).toBe(200);
     expect(res.firstname).toBe('Jim');
expect(res.totalprice).toBe(111);

}

)


>>>>>>> Stashed changes

//Updating booking created in previous test by passing the booking ID
test("Test PUT for booking id created in POST Test",async({request})=>{

    const putbody ={
    "firstname" : "James",
    "lastname" : "Brown",
    "totalprice" : 222,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast edited"
};

  const put = await  request.put("https://restful-booker.herokuapp.com/booking/"+BookingId,{data : putbody,headers:{"Cookie": "token="+authtoken, "Accept": "application/json"}})


    const putb = await put.json();
   console.log(putb);
    
   await expect(put.status()).toBe(200);
   await expect(putb.firstname).toBe('James');
   await expect(putb.totalprice).toBe(222);

   console.log("Updated total Price is "+putb.totalprice);

})




test("DELETE created/updated booking record",async({request})=>{

   const del = await request.delete("https://restful-booker.herokuapp.com/booking/"+BookingId,{headers:{"Cookie": "token="+authtoken, "Accept": "application/json"}})
    console.log("Token being sent: " + authtoken);
    console.log((await del).status());
     console.log((await del).statusText());
     await expect(del.status()).toBe(201);
}

)

<<<<<<< Updated upstream
test("Negative : Token not passed",async({request})=>{
=======



test("Negative : DELETE with invalid token returns 403",async({request})=>{
>>>>>>> Stashed changes

    const del = await request.delete("https://restful-booker.herokuapp.com/booking/"+BookingId,{headers:{"Cookie": "token="+invalidtoken, "Accept": "application/json"}})
    console.log("Token being sent: " + invalidtoken);
    console.log((await del).status());
     console.log((await del).statusText());

      await expect(del.status()).toBe(403);
     await expect((await del).statusText()).toBe('Forbidden');


}

)

test("Negative/Fail expect",async({request})=>{

  const bookinbody={
         "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
    }

   const BookingNew = await request.post("https://restful-booker.herokuapp.com/booking",{ data:bookinbody,headers:{"Cookie": "token="+authtoken}})

   const booking = await BookingNew.json();
    await expect(BookingNew.status()).toBe(201);
   console.log(booking);
  
})