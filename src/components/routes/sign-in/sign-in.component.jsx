import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,

} from "../../../utils/firebase/firebase.utils";
import SignUpForm from "../../sign-up-form/sign-up-form.component";
import Button from "../../button/button.component";

const SignIn = () => {
    useEffect(async ()=>{
        const response = await getRedirectResult(auth)
        if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user)
        }
    },[])
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user); //changed 'response' to user object from the Auth esponse
  };
 
  
  return (
    <div>
      <h1>Sign In</h1>
      <Button buttonType={'google'} onClick={logGoogleUser}>Sign in with Google</Button>
     
      <SignUpForm />
    </div>
  );
};

export default SignIn;
