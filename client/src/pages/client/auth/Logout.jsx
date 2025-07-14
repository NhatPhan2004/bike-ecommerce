import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

const Logout = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser();
    navigate("/");
  }, []);

  return null;
};

export default Logout;
