import React, { useState, FormEvent, ChangeEvent  } from "react";
import {BUTTON_TYPE_CLASSES} from '../button/button.component';
import FormInput from "../form-input/form-input.component";
import {SignUpContainer, ButtonsContainer} from "./sign-in-form.styles";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/use.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";
const formFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formValues, setFormValues] = useState(formFields);
  const { email, password } = formValues;
  const dispatch = useDispatch();
  const resetFormFields = () => {
    setFormValues(formFields);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch( emailSignInStart(email, password));
      resetFormFields();
    } catch (error ) {
      if((error as AuthError).code === AuthErrorCodes.INVALID_EMAIL){
        alert("Incorrect credetentials")
      }
      else{
        console.log(error);
      }
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };
  return (
    <SignUpContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          label="Email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
          value={password}
          required
        />
        <ButtonsContainer>
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Sign In</Button>
        <Button  buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
