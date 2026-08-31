import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // NEW: Role state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setRole(res.data.role); // NEW: Set role
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setRole(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (name, email, password) => {
    await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password,
    });
    navigate("/login");
  };

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
    setRole(user.role); // NEW: Set role on login
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRole(null); // NEW: Clear role on logout
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
