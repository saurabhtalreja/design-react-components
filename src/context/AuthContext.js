import React, { createContext, useState } from "react";

export const AuthContext = createContext();

/** Wrapping Context and returing as provider.*/
function AuthProvider({ children, initialLoggedInUser }) {
  const [loggedInUser, setLoggedInUser] = useState(initialLoggedInUser);
  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
