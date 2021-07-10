import React, { useEffect, useState, useContext } from "react";
import {auth} from "../Firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
 
  const [currentUser, setCurrentUser] = useState();
  const[loading,setLoading] = useState(true)
 
  const singup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email,passowrd) => {
    return auth.signInWithEmailAndPassword(email,passowrd)
  }

  const logOut  = () =>{
    return auth.signOut();
  }

  const resetPassowrd = (email) => {
    return auth.sendPasswordResetEmail(email);
  }

  const updatePassword = (password) => {
    return currentUser.updatePassword(password)
  } 

  const updateEmail = (email) => {
    return currentUser.updateEmail(email)
  }

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setLoading(false);
      })

      return unsubscribe
  },[]);

  
  const value = {
    currentUser,
    singup,
    login,
    logOut,
    resetPassowrd,
    updateEmail,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
