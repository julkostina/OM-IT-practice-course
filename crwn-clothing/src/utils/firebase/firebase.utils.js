import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAARxGqVBKmMCVQS5KvgNlwWLCENWgUI7M",
  authDomain: "crwnd-clothing.firebaseapp.com",
  projectId: "crwnd-clothing",
  storageBucket: "crwnd-clothing.firebasestorage.app",
  messagingSenderId: "1077984920966",
  appId: "1:1077984920966:web:7f9557b258c5f36debd807",
  measurementId: "G-9NCWXRLR1Q",
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation 
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password)=>{

    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth,email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;
  return signInWithEmailAndPassword(auth,email, password)
}

export const signOutUser = async ()=>{
  return  await signOut(auth);
}