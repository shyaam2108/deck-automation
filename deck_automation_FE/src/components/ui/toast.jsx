import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Toast = ({ className, variant = "default", onClose, children, ...props }) => {
  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        variant === "default" && "bg-background text-foreground",
        variant === "destructive" && "bg-red-600 text-white border-red-600",
        variant === "success" && "bg-green-600 text-white border-green-600",
        className
      )}
      {...props}
    >
      <div className="flex gap-3 items-center flex-1">
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export { Toast }

