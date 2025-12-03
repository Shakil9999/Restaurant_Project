import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import useAxiosPublic from "../Hooks/useAxiosPublic";
import { app } from "../Firebase/firebase.config.js";


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async currentUser => {
    setUser(currentUser);
    console.log("Current User:", currentUser); // ✅ এখানে লগ দিন

    if (currentUser) {
      try {
        const { data } = await axiosPublic.post('/jwt', { email: currentUser.email });
        if (data.token) {
          localStorage.setItem('access-token', data.token);
          // console.log("✅ Token saved:", data.token); // ✅ এখানে লগ দিন
        }
      } catch (err) {
        console.error('JWT fetch failed:', err);
      } finally {
        setLoading(false);
      }
    } else {
      localStorage.removeItem('access-token');
      setLoading(false);
    }
  });

  return unsubscribe;
}, [axiosPublic]);


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;