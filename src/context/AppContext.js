import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [cart, setCart] = useState([]);
  const [settings, setSettings] = useState({ theme: "light", language: "en" });

  const login = (data) => setUser(data);
  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const toggleTheme = () =>
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));

  const value = {
    userData: { user, login },
    cartData: { cart, addToCart },
    settingsData: { settings, toggleTheme },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
