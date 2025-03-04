import React, {useState} from "react";
import { createAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";

const formFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = formFields;
    
    if(password !== confirmPassword){
        alert("Passwords don't match");
        return;
    }
    try{
      const response = await createAuthUserWithEmailAndPassword(email, password);
      console.log(response);
    }
    catch(error){
        console.error("Error signing up", error.message);
    }
};

const SignUpForm = () => {

    const [formValues, setFormValues] = useState(formFields);
    const { displayName, email, password, confirmPassword } = formValues;
    console.log(formValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label >Display Name</label>
        <input type="text" name="displayName" onChange={handleChange} value={displayName} required />
        <label >Email</label>
        <input type="email"  name="email" onChange={handleChange} value={email} required/>
        <label >Password</label>
        <input type="password"  name="password"  onChange={handleChange}value={password} required/>
        <label >Confirm Password</label>
        <input type="password"  name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;