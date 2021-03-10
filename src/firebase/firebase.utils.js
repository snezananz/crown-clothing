import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCdxcZ7h23IENz4pxOmvVeAY7WpzNl6g-Y",
    authDomain: "crown-db-ffef8.firebaseapp.com",
    projectId: "crown-db-ffef8",
    storageBucket: "crown-db-ffef8.appspot.com",
    messagingSenderId: "958005106372",
    appId: "1:958005106372:web:98a780eb23976ffea2db91"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



