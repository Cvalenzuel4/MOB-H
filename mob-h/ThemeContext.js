import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const value = await AsyncStorage.getItem('@modo_tema');
      if (value !== null) setIsDark(value === 'oscuro');
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const nuevo = !isDark ? 'oscuro' : 'claro';
    await AsyncStorage.setItem('@modo_tema', nuevo);
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
