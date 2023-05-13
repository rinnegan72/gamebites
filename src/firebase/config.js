import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6MD-3D2lGsTF_U7OEMGEqBf96DT1z7p4",
  authDomain: "gamecritic-21f82.firebaseapp.com",
  projectId: "gamecritic-21f82",
  storageBucket: "gamecritic-21f82.appspot.com",
  messagingSenderId: "321699385423",
  appId: "1:321699385423:web:c5a6e835d553df65299a3a"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
