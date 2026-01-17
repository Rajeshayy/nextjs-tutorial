
import { auth, db } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Helper to save current state to LS for sync access if needed (optional cache)
const saveToLS = (key, data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const getFromLS = (key) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

// Auth state listener to keep LS in sync
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));

      if (userDoc.exists()) {
        saveToLS('currentUser', { ...userDoc.data(), id: user.uid });
      }
      if (adminDoc.exists()) {
        saveToLS('currentAdmin', { ...adminDoc.data(), id: user.uid });
      }
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentAdmin');
    }
  });
}

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch profile from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? { ...userDoc.data(), id: user.uid } : { email: user.email, id: user.uid };

    saveToLS('currentUser', userData);
    return { success: true, user: userData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const signupUser = async (userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;

    const newUser = {
      name: userData.name,
      email: userData.email,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', user.uid), newUser);
    const finalUser = { ...newUser, id: user.uid };

    saveToLS('currentUser', finalUser);
    return { success: true, user: finalUser };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const logoutUser = async () => {
  await signOut(auth);
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
  }
};

export const getCurrentUser = () => {
  return getFromLS('currentUser');
};

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if user exists in admins collection
    const adminDoc = await getDoc(doc(db, 'admins', user.uid));
    if (adminDoc.exists()) {
      const adminData = { ...adminDoc.data(), id: user.uid };
      saveToLS('currentAdmin', adminData);
      return { success: true, admin: adminData };
    } else {
      await signOut(auth);
      return { success: false, message: 'Not authorized as admin' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const logoutAdmin = async () => {
  await signOut(auth);
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentAdmin');
  }
};

export const getCurrentAdmin = () => {
  return getFromLS('currentAdmin');
};
