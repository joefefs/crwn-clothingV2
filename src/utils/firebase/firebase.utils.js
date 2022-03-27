import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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
const googleProvider = new GoogleAuthProvider();

//Here you set some params for that auth provider
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//instanciate the auth
export const auth = getAuth();

// acutally create the auth function with the auth initiliazed and the provider
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider); // this is pop up redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider); //this is redirect sign in

//Creates a dtabase variable that will point to firestore (Firebase's DB)
export const db = getFirestore();

// New method to populate DB in firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  // console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=> {
    const {title, items} = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap

}

//Here we will set a new User coming from the response after a succseful authentication. userAuth is the response from the Auth on the sign in component
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  //the second param is a methid for the SignUp with Email and password (because it might return a user without displayName for example)

  //Here we check if there's an existing user document
  //doc func (method?) receives 3 args: database, the name of the collection, id (we can us the auth response user's UID)
  const userDocRef = doc(db, "users", userAuth.uid);

  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists()); //false: a user with that userAuth.uid doesn't exist in the document in firestore

  // Next steps:

  // if user data does NOT exists: create / set the doc with the data from userAuth in the collection of users-

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exists:
  // userSnapshot.exists() return true and we can do nothing but return.

  return userDocRef;
};

// custom Func that calls the firebase auth Func with the data from the sign-up Component
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password); //This one is from Firebase/app
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//Sign out method
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
