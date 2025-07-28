import { createContext, useContext, useState, useEffect } from "react";
import { getToken, login as loginService } from "../services/authService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id });
      } catch (err) {
        console.error("❌ Token decode failed", err.message);
        logout();
      }
    }
  }, []);

  const loginUser = async (data) => {
    const res = await loginService(data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
