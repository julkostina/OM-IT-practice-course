import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentFormCOnatiner, FormContainer } from "./payment-form.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const PaymentForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const paymentHandler = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const response = await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 10000 }),
    }).then(res=> res.json());
    console.log(response);
    const clientSecret = response.clientSecret;
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
    payment_method:{
        card: elements.getElement(CardElement),
        billing_details:{
            name: "Jenny Rosen"
    },
    }});
    if (paymentResult.error) {
        
      alert("Error",paymentResult.error);
    }
    else{
        if(paymentResult.paymentIntent.status === "succeeded"){
            alert("Payment Successfull");
        }
    }
  };
  return (
    <PaymentFormCOnatiner  onSubmit={paymentHandler}>
      <FormContainer>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
      </FormContainer>
    </PaymentFormCOnatiner>
  );
};
export default PaymentForm;
