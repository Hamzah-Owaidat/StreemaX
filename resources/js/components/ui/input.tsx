import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean
}

function Input({ className, type, error, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full border-2 border-l-3 rounded-lg",
        error ? "border-l-red-500" : "border-l-green-500",
        "bg-transparent px-3 py-2 text-sm placeholder:text-gray-400",
        "disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }
