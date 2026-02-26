"use client";

import * as React from "react";

export type Toast = {
  id: string;
  title: string;
};

type ToastContextValue = {
  toasts: Toast[];
  toast: (title: string) => void;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback((title: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, title }]);
    window.setTimeout(() => dismiss(id), 2200);
  }, [dismiss]);

  return <ToastContext.Provider value={{ toasts, toast, dismiss }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}