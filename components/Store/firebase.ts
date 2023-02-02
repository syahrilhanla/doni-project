
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyBUif4QCds0M-tKmr4ivIiFmkPIFQbXKY4",
  authDomain: "skripsi-ridhoni.firebaseapp.com",
  projectId: "skripsi-ridhoni",
  storageBucket: "skripsi-ridhoni.appspot.com",
  messagingSenderId: "389861914249",
  appId: "1:389861914249:web:a1de21411cc9299021f858"
};

// Initialize Firebase
// const fire = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);


// export default fire;