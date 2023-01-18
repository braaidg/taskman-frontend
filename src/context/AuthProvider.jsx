import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios("users/profile", config);
        setAuth(data);
      } catch (error) {
        setAuth({});
      }
      setLoading(false);
    };

    authenticateUser();
  }, []);

  const logoutUserSession = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logoutUserSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
