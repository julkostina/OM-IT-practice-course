import {initializeApp} from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth';
import {
    getFirestore,
    getDoc,
    setDoc,
    doc
} from 'firebase/firestore';
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
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef  = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef);
    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
            });
        }
        catch(error){
            console.log('Error creating the user', error.message);
        }
    }
    return userDocRef;  
  }