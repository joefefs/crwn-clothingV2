import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
  
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form-styles.scss";
import Button from "../button/button.component";


const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
   
    
   
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password)
   
      resetFormFields();
    } catch (error) {

      switch(error.code){
        case 'auth/wrong-password':
          alert('Email or password are incorrect')
          break
        case 'auth/user-not-found':
          alert("There is no user registered with that email address")
          break
        default:
          console.log(error)
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
        <Button type="submit">Sign In</Button>
        <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>

        </div>
      </form>
    </div>
  );
};

export default SignInForm;
