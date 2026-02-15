import { createContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axiosClient.get("/auth/bypass", token);
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axiosClient.post("/auth/logout");
    } catch (err) {
      console.log(err);
    }
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
