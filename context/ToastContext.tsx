"use client"

import { createContext, useContext, ReactNode } from "react"
import { toast } from "sonner"

type ToastContextType = {
  success: (message: string, description?: string) => void
  error: (message: string, description?: string) => void
  info: (message: string, description?: string) => void
  loading: (message: string) => string | number
  dismiss: (id?: string | number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const value: ToastContextType = {
    success: (message, description) =>
      toast.success(message, { description }),

    error: (message, description) =>
      toast.error(message, { description }),

    info: (message, description) =>
      toast.info(message, { description }),

    loading: (message) =>
      toast.loading(message),

    dismiss: (id) =>
      toast.dismiss(id),
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}