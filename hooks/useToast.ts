//useToast.ts

'use client'

import { toast as sonnerToast } from 'sonner'
import * as React from 'react'

type ToastOptions = {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: 'default' | 'destructive'
  action?: {
    label: string
    onClick: () => void
  }
}

function toast({ title, description, variant, action }: ToastOptions) {
  const isError = variant === 'destructive'

  const id = isError
    ? sonnerToast.error(title as string, {
        description,
        action,
      })
    : sonnerToast(title as string, {
        description,
        action,
      })

  return {
    id,
    dismiss: () => sonnerToast.dismiss(id),
    update: (props: Partial<ToastOptions>) =>
      sonnerToast(props.title as string, {
        id,
        description: props.description,
        action: props.action,
      }),
  }
}

function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}

export { toast, useToast }