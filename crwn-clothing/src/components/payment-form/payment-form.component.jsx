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
    
  };
  return (
    <PaymentFormCOnatiner>
      <FormContainer>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
      </FormContainer>
    </PaymentFormCOnatiner>
  );
};
export default PaymentForm;
