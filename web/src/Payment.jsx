import React from "react";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js"
const PublicKey = "pk_test_51LozWDDnHgImZsLr9vrnfLIvYVpLfWOXlUHY0EV6WL3VC5HBkM7qFrhrKl2LnjCZmbrMRgIdJHWq8vDwem859RbN00eaEcjjkT"
const stripetest = loadStripe(PublicKey)


function Payment(){
return(
<Elements stripe={ stripetest}>
<PaymentForm />
</Elements>)



}

export default Payment