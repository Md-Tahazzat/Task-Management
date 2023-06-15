import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../Firebase/Firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetch("https://task-management-server-vert.vercel.app/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Corrected header spelling
          },
          body: JSON.stringify({ email: currentUser.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("access-token", data?.token);
            setLoading(false);
          });
      }
      setUser(currentUser);
    });

    return () => unsubscribed();
  }, []);

  const authInfo = {
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
