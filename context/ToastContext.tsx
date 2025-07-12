import ToastComponent from "@/components/Toast";
import React, { createContext, useContext, useState } from "react";

type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
  message: string;
  type?: ToastType;
  key: number;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: ToastType = "info") => {
    const newToast: Toast = {
      message,
      type,
      key: Date.now(), // 👈 new key ensures re-render
    };
    setToast(newToast);
  };

  const clearToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <ToastComponent
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};
