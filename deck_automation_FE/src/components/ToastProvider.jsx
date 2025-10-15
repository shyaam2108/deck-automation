import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toast } from './ui/toast'
import { CheckCircle, AlertCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = (message, variant = 'default') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, variant }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 4000)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-96">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Toast variant={toast.variant} onClose={() => removeToast(toast.id)}>
                {toast.variant === 'success' && <CheckCircle className="h-5 w-5" />}
                {toast.variant === 'destructive' && <AlertCircle className="h-5 w-5" />}
                <span className="flex-1">{toast.message}</span>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="rounded-md p-1 hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </Toast>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

