import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPY2xA6HeT7DdoHjyejLB-CTX7gncTfvM",
  authDomain: "crwn-clothing-db-2.firebaseapp.com",
  projectId: "crwn-clothing-db-2",
  storageBucket: "crwn-clothing-db-2.appspot.com",
  messagingSenderId: "421223050652",
  appId: "1:421223050652:web:3716035a9520ec43696c59",
}; //given by firebase

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// You can have many providers of Authentication
const provider = new GoogleAuthProvider();

//Here you set some params for that auth provider
provider.setCustomParameters({
  prompt: "select_account",
});

//instanciate the auth
export const auth = getAuth();

// acutally create the auth function with the auth initiliazed and the provider
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//Creates a dtabase variable that will point to firestore (Firebase's DB)
export const db = getFirestore()


//Here we will set a new User coming from the response after a succseful authentication. userAuth is the response from the Auth on the sign in component
export const createUserDocumentFromAuth = async (userAuth) => {
    //Here we check if there's an existing user document
    //doc func (method?) receives 3 args: database, the name of the collection, id (we can us the auth response user's UID)
    const userDocRef = doc(db, 'users', userAuth.uid )

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot) 
    console.log(userSnapshot.exists())//false: a user with that userAuth.uid doesn't exist in the document in firestore


    // Next steps:


    // if user data does NOT exists: create / set the doc with the data from userAuth in the collection of users-

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch(error){
            console.log('error creating the user'. error.message)
        }
    }

    //if user data exists: 
    // userSnapshot.exists() return true and we can do nothing but return.

    return userDocRef
}