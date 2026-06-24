import { useState, type ReactNode } from "react";
import { AdminAuthContext } from "./AdminAuthContext";

const SESSION_KEY = "rays-piercing-admin-session";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );

  const login = (password: string) => {
    const expected = import.meta.env.VITE_ADMIN_PASSWORD;
    if (expected && password === expected) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
