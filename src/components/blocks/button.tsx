import { cn } from "@/utils/tailwind";
import { ButtonHTMLAttributes } from "react";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BaseButtonProps) {
  const base =
    "inline-flex cursor-pointer items-center justify-center px-4 py-2 text-sm font-medium uppercase font-body rounded-xl transition duration-150 active:translate-y-[2px]";

  const styles = {
    primary:
      "bg-accent-green text-text-main shadow-[0_4px_0_0_#4a7a3b] hover:bg-[#7fbf6b]",
    secondary:
      "bg-elevated text-text-main/80 shadow-[0_4px_0_0_#222222] hover:bg-[#4c4c4c]",
    outline:
      "bg-transparent border border-text-muted text-text-muted shadow-[0_4px_0_0_#4c4c4c] hover:bg-[#2e2e2e]",
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      {...props}
      className={cn(base, styles[variant], styles[size], className)}
    >
      {children}
    </button>
  );
}
