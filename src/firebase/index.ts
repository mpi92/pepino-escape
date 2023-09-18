// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyACtLz3_zWzzbRUzzfgQjbMtobeSBKwkjg',
  authDomain: 'pepino-escape.firebaseapp.com',
  projectId: 'pepino-escape',
  storageBucket: 'pepino-escape.appspot.com',
  messagingSenderId: '829899825397',
  appId: '1:829899825397:web:a8c9f56acdbdf1b24f65bc',
  measurementId: 'G-CW6LTYCFZL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);