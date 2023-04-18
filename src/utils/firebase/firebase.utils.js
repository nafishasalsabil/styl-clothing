import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAh485FRltQSkt8aAQZy1E9ISTiH-ryte0",
  authDomain: "styl-clothing-db.firebaseapp.com",
  projectId: "styl-clothing-db",
  storageBucket: "styl-clothing-db.appspot.com",
  messagingSenderId: "950780579574",
  appId: "1:950780579574:web:5b28ba8b8013d37a6626d7"
};


const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};