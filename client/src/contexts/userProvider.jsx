import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Use jwtDecode instead of jwt_decode
        setCurrentUser(decoded); // You can pick specific fields from decoded if needed
      } catch (err) {
        console.warn("Failed to decode token", err);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserProvider;