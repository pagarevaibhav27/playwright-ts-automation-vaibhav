import {test,expect} from '@playwright/test';

test.describe.configure({ mode: 'serial' });


let authtoken: string;  
let BookingId: number;
const invalidtoken = "invalidtok";



test("Auth",{ tag: ['@smoke','@sanity' ]},async({request})=>{

    const authbody ={
         "username" : "admin",
    "password" : "password123"

    }

    const auth = await request.post("https://restful-booker.herokuapp.com/auth",{data:authbody,headers:{"Content-Type": "application/json"}});

    const authis = await auth.json();
    authtoken = authis.token;

     console.log("Auth token is "+authtoken);
}

)

//passing auth in post api

test("Create New Booking",{ tag: ['@smoke','@sanity' ]},async ({request})=>{

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

test("TEST GET created Booking ",{ tag: ['@smoke','@sanity' ]},async ({request})=>{
    const geturl = "https://restful-booker.herokuapp.com/booking/"+BookingId;
    console.log("get url formed is "+geturl)

   const  getreponse = await request.get(geturl);
     console.log("get response is",await getreponse.json());

    const resstatus =  getreponse.status();
    const resstatustext =  getreponse.statusText();
   const res = await getreponse.json();
  
   console.log(resstatus);
    console.log(resstatustext);
    console.log(res);
     expect(getreponse.status()).toBe(200);
     expect(res.firstname).toBe('Jim');
expect(res.totalprice).toBe(111);

}

)



//Updating booking created in previous test by passing the booking ID
test("Test PUT for booking id created in POST Test",{ tag: ['@sanity' ]},async({request})=>{

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
    
    expect(put.status()).toBe(200);
    expect(putb.firstname).toBe('James');
    expect(putb.totalprice).toBe(222);

   console.log("Updated total Price is "+putb.totalprice);

})




test("DELETE created/updated booking record",async({request})=>{

   const del = await request.delete("https://restful-booker.herokuapp.com/booking/"+BookingId,{headers:{"Cookie": "token="+authtoken, "Accept": "application/json"}})
    console.log("Token being sent: " + authtoken);
      console.log(del.status());
   console.log(del.statusText());
      expect(del.status()).toBe(201);
     const deleted = await request.get("https://restful-booker.herokuapp.com/booking/"+BookingId);
      expect(deleted.status()).toBe(404);
      expect(deleted.statusText()).toBe("Not Found");


}

)




test("Negative : Token not passed",{ tag: ['@sanity' ]},async({request})=>{

    const neg = await request.delete("https://restful-booker.herokuapp.com/booking/"+BookingId,{headers:{"Cookie": "token="+invalidtoken, "Accept": "application/json"}})
    
    console.log("Token being sent: " + invalidtoken);

    console.log(neg.status());
   console.log(neg.statusText());
    

       expect(neg.status()).toBe(403);
      expect(neg.statusText()).toBe('Forbidden');


}

)


