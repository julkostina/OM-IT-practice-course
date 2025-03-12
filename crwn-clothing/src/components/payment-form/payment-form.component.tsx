import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { PaymentFormCOnatiner, FormContainer } from "./payment-form.styles";
import { useState , FormEvent} from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const PaymentForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const ifValidCardElement = (card: StripeCardElement| null): card is StripeCardElement => card!==null;
  const paymentHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());
    console.log(response);
    const clientSecret = response.clientSecret;

    const cardDetils = elements.getElement(CardElement);
    if(!ifValidCardElement(cardDetils)){
      return;
    }
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardDetils,
        billing_details: {
          name: currentUser? currentUser.displayName:"Guest",
        },
      },
    });
    setIsProcessingPayment(false);
    if (paymentResult.error) {
      alert("Error: " + paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successfull");
      }
    }
  };
  return (
    <PaymentFormCOnatiner onSubmit={paymentHandler}>
      <FormContainer>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}>Pay Now</Button>
      </FormContainer>
    </PaymentFormCOnatiner>
  );
};
export default PaymentForm;
