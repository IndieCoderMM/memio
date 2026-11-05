import { buttonClasses } from "@/components/pouf/Button";
import { cn } from "@/utils/tailwind";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BaseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
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
  return (
    <button
      {...props}
      className={cn(
        buttonClasses({
          size,
          tone: variant === "secondary" ? "mint" : "purple",
          variant: variant === "outline" ? "quiet" : "solid",
        }),
        className,
      )}
    >
      {children}
    </button>
  );
}
