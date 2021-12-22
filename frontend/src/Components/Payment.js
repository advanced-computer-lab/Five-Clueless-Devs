import StripeCheckout from "react-stripe-checkout";
import { useState } from 'react';

function Payment(){
const[product,setproduct] = useState({
    name:"Ticket",
    price:2000, ///price of ticket from input //remove hardcode
    productBy: "FiveCluelessDevs"
})

const makePayment= token =>{
    const body={
        token,
        product
    }
    const headers={
        "Content-Type": "application/json"
    }
    return fetch('http://localhost:5000/payment',{
      method: "POST",
      headers,
      body:JSON.stringify(body)
      .then(response=>{
          console.log("RESPONSE", response);
          const {status} = response;
          console.log("STATUS",status);
      })
      
    })
    .catch(err => console.log(err));
};

return(
<div>
    <header>
<a>
    Payment
</a>
</header>

<header>
<StripeCheckout
    stripeKey="pk_test_51K9D6UA32Adg2XeIayrvPhQ3Y97itWgoKPGMDyhxforRJofQ1DmX0G66AUBJp2USDguA6DP5KAKireIv4DwbmYSh00oxYvRo7K"
    token={makePayment}
    name="Buy Ticket"
    amount={product.price*100}
    >

        <button className="btn-large style={{ color: '#599BB3' }}" >
            pay for reservation {product.price}
        </button>
        </StripeCheckout>
</header>
</div>
)
}
export default Payment;