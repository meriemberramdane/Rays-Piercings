import { useContext } from "react";
import { AdminAuthContext } from "./AdminAuthContext";

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth doit être utilisé dans AdminAuthProvider");
  return ctx;
}
