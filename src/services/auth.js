import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Initialize Firebase Auth

export const login = async (email, password) => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const register = async (email, password) => {
  const auth = getAuth();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const auth = getAuth();

  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
