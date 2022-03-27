import {  useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import {SignUpcontainer} from './sign-up-form-styles.js'
import Button from "../button/button.component";


const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
      setFormFields(defaultFormFields)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const {user} = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()

      console.log(user);
    } catch (error) {
        if(error.code === 'auth/email-already-in-use'){
            alert('Cannot create user because email is already in use')
        } else {
            console.error("User creation encounter an error", error);

        }
    }
  };

  return (
    <SignUpcontainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput
          label="Display Name" 
          type="text"
          onChange={handleChange}
          name="displayName"
          required
          value={displayName} //all the props apart from 'label' could be passed as an object with a prop inputOptions, so you don't have to spread {...otherProps} which might confuse other coders
        />

        
        <FormInput
          label="Email"   
          type="email"
          onChange={handleChange}
          name="email"
          required
          value={email}
        />

       
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          required
          value={password}
        />

        
        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          required
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpcontainer>
  );
};

export default SignUpForm;
