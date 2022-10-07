import React,{useState} from "react";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js"
import axios from "axios";
import { async } from "@firebase/util";






const CARD_OPTIONS ={
    iconStyle : "solid" ,
    style :{
     base:{
       iconColor: "#c4F0ff",
       color :"#fff",
       fontWeight : 500,
       fontFamily :"Roboto, Open Sans ,Segoe UI , sans-serif",
       fontSize: "16px",
       fontSmoothing: "antialiased" ,
    " ::-webkit-autofill":{color :"#fce883"},
    " ::placeholder":{color: "#87bbfd"}
     },
    invalid:{
    iconColor :"#ffc7ee",
    color:"#ffc7ee"
    }
    } }
function PaymentForm(){

    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) =>{
    e.preventDefault()
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type:"card",
      card: elements.getElement(CardElement)


    })

if (!error)
{
try{
    const {id} = paymentMethod
    const response = await axios.post("http://localhost:3000/Plan", {
        amount: 10,
        id
    })
if (response.data.success){
    console.log("successful payment")
    setSuccess(true)

}


}catch(error){
console("Error", error)
}
}else{
    console(error.message)
}
    }
return(
    <div>
    {!success ?
    <form onSubmit={handleSubmit} >
      <fieldset className="FormGroup">
         <div className="FormRow">
            <CardElement options={CARD_OPTIONS} />

         </div>



      </fieldset>
      <button>
        Pay
      </button>
    </form>
    :
    <div>
        <h2>You are a membership now</h2>
    </div>


}

</div>
)




}

export default PaymentForm