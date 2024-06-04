// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getFirestore} from 'firebase/firestore';
// import firestore from '@react-native-firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCsC1fhviXjcq70Sn4nn8jgEOeEwCsggNU',
  authDomain: 'fir-auth-d65c4.firebaseapp.com',
  projectId: 'fir-auth-d65c4',
  storageBucket: 'YOUR_STORAGE-PROJECT',
  messagingSenderId: 'fir-auth-d65c4.appspot.com',
  appId: '1:351928958111:web:e6281d08edc9a21189f6aa',
  measurementId: '351928958111',
};

// Initialize Firebase (

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const firestore = firebase
  .firestore()
  .settings({experimentalForceLongPolling: true});
const authentication = getAuth(app);
export {firebase, authentication};
