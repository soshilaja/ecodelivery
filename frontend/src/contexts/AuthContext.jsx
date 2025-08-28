import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../services/firebase";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profileDoc = await getDoc(doc(db, "users", currentUser.uid));
        setUserProfile(profileDoc.exists() ? profileDoc.data() : null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password, profileData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        ...profileData,
        email: user.email,
        createdAt: new Date(),
        status: "online",
        greenScore: 0,
      });

      return user;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user profile exists
      const profileDoc = await getDoc(doc(db, "users", user.uid));

      if (!profileDoc.exists()) {
        // Create new user profile with merged data
        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
          status: "online",
          greenScore: 0,
          lastLogin: new Date(),
        };

        await setDoc(doc(db, "users", user.uid), userData);
      }

      return user;
    } catch (error) {
      console.error("Google Authentication Error:", error);
      throw error;
    }
  };

  // Use the same handler for both sign-in and sign-up
  const googleSignIn = () => handleGoogleAuth();
  

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signUp,
        signIn,
        googleSignIn,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node,
};
