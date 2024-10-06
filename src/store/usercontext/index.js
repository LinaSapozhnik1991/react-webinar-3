
import React, { createContext, useContext, useState } from 'react';

// Создание контекста
const UserContext = createContext();

// Провайдер для управления состоянием пользователя
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);



  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};


