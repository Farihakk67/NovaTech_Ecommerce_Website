import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiXMark, HiCheckCircle, HiExclamationCircle, HiInformationCircle } from 'react-icons/hi2'
import { useToast } from '@/context/ToastContext'
import type { Toast } from '@/types'
import { cn } from '@/utils'

const icons = {
  success: HiCheckCircle,
  error: HiExclamationCircle,
  warning: HiExclamationCircle,
  info: HiInformationCircle,
}

const styles = {
  success: 'border-success/30 bg-success/10 text-success',
  error: 'border-error/30 bg-error/10 text-error',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  info: 'border-secondary/30 bg-secondary/10 text-secondary',
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const Icon = icons[toast.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      className={cn(
        'flex items-center gap-3 rounded-xl border px-4 py-3 shadow-card backdrop-blur-sm',
        'bg-surface/95 min-w-[280px] max-w-[400px]',
        styles[toast.type],
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="flex-1 text-sm font-medium text-text">{toast.message}</p>
      <button
        onClick={onRemove}
        className="shrink-0 rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        aria-label="Dismiss notification"
      >
        <HiXMark className="h-4 w-4 text-text-muted" />
      </button>
    </motion.div>
  )
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2" aria-label="Notifications">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export function SEO({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = `${title} | NovaTech`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description)
    }
  }, [title, description])

  return null
}
