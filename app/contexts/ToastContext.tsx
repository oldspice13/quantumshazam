'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

type ToastType = 'default' | 'destructive' | 'success';

interface ToastContextType {
  showToast: (props: {
    title: string;
    description?: string;
    type?: ToastType;
    action?: React.ReactNode;
  }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    title: string;
    description?: string;
    type?: ToastType;
    action?: React.ReactNode;
  }>>([]);

  const showToast = ({
    title,
    description,
    type = 'default',
    action,
  }: {
    title: string;
    description?: string;
    type?: ToastType;
    action?: React.ReactNode;
  }) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, title, description, type, action }]);

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastProvider>
        {children}
        {toasts.map((toast) => (
          <Toast key={toast.id} variant={toast.type}>
            <div className="grid gap-1">
              <ToastTitle>{toast.title}</ToastTitle>
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
            </div>
            {toast.action && <ToastAction altText="Perform action">{toast.action}</ToastAction>}
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastContextProvider');
  }
  return context;
} 