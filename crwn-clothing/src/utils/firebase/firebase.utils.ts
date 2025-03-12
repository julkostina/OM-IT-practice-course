import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import { Category } from "../../store/categories/category.types";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
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

 export type AdditionalInformation = {
  displayName?: string;
 }
export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void |QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating the user", error);
    }
  }
  return userSnapShot as QueryDocumentSnapshot<UserData>;
};
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};
type ObjectToAdd = {
  title: string;
}
export const addCollectionAndDocuments = async<T extends ObjectToAdd> ( collectionKey: string, objectsToAdd: T[] ):Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);   

  objectsToAdd.forEach((object)=>{
    const docRef  = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object); 
  })  

  await batch.commit();
  console.log("done");
};
export const getCategoriesAndDocuments = async (): Promise<Category[]>=>{
  const collectinRef = collection(db, 'categories');
  const q = query(collectinRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapShot)=>docSnapShot.data() as Category);
  
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User|null> => {
  return new Promise((resolve, reject) => {
    const unSubscribe = onAuthStateChanged(
      auth, (userAuth)=>{
        unSubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
};