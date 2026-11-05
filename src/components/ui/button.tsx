import { Slot } from "@radix-ui/react-slot";
import { buttonClasses } from "@/components/pouf/Button";
import { cn } from "@/utils/tailwind";
import * as React from "react";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

const tones = {
  default: "purple",
  destructive: "pink",
  outline: "blue",
  secondary: "mint",
  ghost: "blue",
  link: "purple",
} as const;

const sizes = {
  default: "md",
  sm: "sm",
  lg: "lg",
  icon: "md",
  "icon-sm": "sm",
  "icon-lg": "lg",
} as const;

function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  const quiet = variant === "outline" || variant === "ghost" || variant === "link";
  const icon = size.startsWith("icon");

  return cn(
    buttonClasses({
      tone: tones[variant],
      size: sizes[size],
      variant: quiet ? "quiet" : "solid",
      shape: icon ? "icon" : "label",
    }),
    className,
  );
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Button, buttonVariants };
