import React, { useState} from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/use.action";
import {SignUpContainer} from './sign-up-form.styles';
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
const formFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(formFields);
  const { displayName, email, password, confirmPassword } = formValues;
  const dispatch = useDispatch();

  const resetFormFields = ()=>{
    setFormValues(formFields);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
      if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error("Error signing up", error.message);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don`t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
        label="Display Name"
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
          required
        />
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
        <FormInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
          required
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.base } type="submit" >Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
