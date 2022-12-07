// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDnBp9nsIm1HKVtw2QFqhYBV3hHdp_Gabc",
	authDomain: "oren-profile.firebaseapp.com",
	projectId: "oren-profile",
	storageBucket: "oren-profile.appspot.com",
	messagingSenderId: "1026898875214",
	appId: "1:1026898875214:web:845d95cef354426ef7041f",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };
