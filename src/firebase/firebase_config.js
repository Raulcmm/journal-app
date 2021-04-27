import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCxvPPObXX0q8q485OUnO88Uig1mcl_JP8",
	authDomain: "journalapp-3e90f.firebaseapp.com",
	projectId: "journalapp-3e90f",
	storageBucket: "journalapp-3e90f.appspot.com",
	messagingSenderId: "371581476184",
	appId: "1:371581476184:web:ffb30ec1c9b3f91e2a992d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
