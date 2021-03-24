import config from "../service/firebase/firebase";
import firebase from "firebase/app";

const provider = new firebase.auth.GoogleAuthProvider();


export const signInWithGoogle = () => config.auth().signInWithPopup(provider)
