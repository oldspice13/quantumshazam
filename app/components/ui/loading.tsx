import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "primary" | "secondary"
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
}

const variantClasses = {
  default: "text-gray-500",
  primary: "text-primary",
  secondary: "text-secondary",
}

export function Loading({
  className,
  size = "md",
  variant = "default",
  ...props
}: LoadingProps) {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <Loader2
        className={cn(
          "animate-spin",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
    </div>
  )
} 