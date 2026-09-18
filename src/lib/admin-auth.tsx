import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface AdminUser {
  name: string;
  email: string;
  role: "admin";
}

export interface AdminAuthContextValue {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

const STORAGE_KEY = "darmajaya_admin_auth";
const VALID_ADMINS: Record<string, string> = {
  "admin@darmajaya.ac.id": "admin123",
  "superadmin@darmajaya.ac.id": "superdarmajaya2026",
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as AdminUser;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const cleanEmail = email.trim().toLowerCase();
    const valid = VALID_ADMINS[cleanEmail];
    if (!valid || valid !== password) {
      throw new Error("Email atau kata sandi salah.");
    }
    setUser({
      name: cleanEmail.startsWith("super") ? "Super Admin" : "Administrator",
      email: cleanEmail,
      role: "admin",
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
