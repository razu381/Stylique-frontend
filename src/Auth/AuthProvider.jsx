import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase_config";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";

export let AuthContext = createContext();

function AuthProvider({ children }) {
  let [user, setUser] = useState();
  let [userRole, setUserRole] = useState();
  let [loading, setLoading] = useState(true);

  function createAccount(email, pass) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  }
  function signIn(email, pass) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  }
  function LogOut() {
    setLoading(true);
    return signOut(auth);
  }
  function editProfile(userData) {
    return updateProfile(auth.currentUser, userData);
  }

  function resetPass(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (CurrUser) => {
      setUser(CurrUser);
      setLoading(false);
      if (CurrUser?.email) {
        axios
          .post(
            "https://stylique-backend.vercel.app/jwt",
            { email: CurrUser?.email },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  let authInfo = {
    user,
    setUser,
    loading,
    createAccount,
    signIn,
    LogOut,
    editProfile,
    resetPass,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
