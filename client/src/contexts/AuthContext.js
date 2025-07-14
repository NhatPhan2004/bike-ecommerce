import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, getToken, logout } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (token) {
        try {
          const res = await getProfile();
          setUser(res.user);
        } catch (err) {
          logout();
          setUser(null);
        }
      }
    };

    fetchProfile();
  }, []);

  const loginUser = (userData) => setUser(userData.user);
  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
