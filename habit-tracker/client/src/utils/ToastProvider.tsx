import { AnimatePresence, motion } from "framer-motion"
import { Info, X } from "phosphor-react"
import { createContext, ReactNode, useState } from "react"

type Children = {
  children: ReactNode
}

interface ToastContextData {
  toast: (text: string) => void
}

interface ToastProps {
  text: string
  id: number
  timeout: number
}
export const ToastContext = createContext({} as ToastContextData)

export const ToastProvider = ({ children }: Children) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  function toast(text: string) {
    const newId = toasts.length
    const newToast = { text, id: newId, timeout: setTimeout(() => removeToastById(newId), 2000) }
    setToasts([...toasts, newToast])
  }
  const removeToastById = (id: number) => {
    setToasts(toasts => toasts.filter(toast => toast.id !== id))
  }
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="absolute right-0 top-0 bottom-0 flex h-full w-full max-w-[384px] flex-col-reverse items-center gap-3 py-4">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              className="z-50 flex w-full max-w-[360px] justify-between rounded-lg border-2 border-violet-500 bg-zinc-900 p-4"
              initial={{
                opacity: 0,
                y: 50
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: 200,
                transition: { duration: 0.4 }
              }}>
              <span className="flex items-center gap-3 font-semibold">
                <Info size={20} weight="bold" className="text-violet-400" />
                {toast.text}
              </span>
              <button className="text-zinc-400 hover:text-zinc-300" onClick={() => removeToastById(toast.id)}>
                <X size={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
