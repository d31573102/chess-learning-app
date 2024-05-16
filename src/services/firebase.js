import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDODnuAa3D1p5Qp7T2QvEuZp2ohFD-kB0I",
  authDomain: "chess-learning-app.firebaseapp.com",
  projectId: "chess-learning-app",
  storageBucket: "chess-learning-app.appspot.com",
  messagingSenderId: "323874663500",
  appId: "1:323874663500:web:74049b794340e2a69298e9"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const firestore = getFirestore(app);

export { auth, firestore, onAuthStateChanged };
