import {initializeApp} from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth';
const firebaseConfig = {

    apiKey: "AIzaSyAARxGqVBKmMCVQS5KvgNlwWLCENWgUI7M",
    authDomain: "crwnd-clothing.firebaseapp.com",
    projectId: "crwnd-clothing",
    storageBucket: "crwnd-clothing.firebasestorage.app",
    messagingSenderId: "1077984920966",  
    appId: "1:1077984920966:web:7f9557b258c5f36debd807",
    measurementId: "G-9NCWXRLR1Q"
  
  };
  
  
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
