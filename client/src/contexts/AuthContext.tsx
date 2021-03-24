import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

interface AuthContextInterface {
  currentUser: string | null;
  loading: boolean;
}

interface UserDataInterface {
  email: string;
  password: string;
}

interface RegisterUserInterface extends UserDataInterface {
  address: string;
}

const AuthContext = React.createContext<AuthContextInterface | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({
  children,
  ...props
}: React.PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function registerUser(userData: RegisterUserInterface): Promise<any> {
    return await axios.post("/api/register", userData);
  }

  async function loginUser(userData: UserDataInterface): Promise<any> {
    return await axios.post("/api/login", userData);
  }

  function logout(): void {
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    loading,
    loginUser,
    logout,
    registerUser,
  };

  useEffect(() => {
    // Successfully load initial data
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={value} {...props}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
