import { createContext, useEffect, useState } from "react";
import axios from '../utils/axios';

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('users')) || null
  );

  const login = async (inputs) => {
    const res = await axios.post('/auth/login', inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    setCurrentUser(null)
  };

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(currentUser));
  }, [currentUser])

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
      { children }
    </AuthContext.Provider>
  )
};

