import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  onClick,
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "rounded-md transition-all font-medium flex items-center",
        {
          "bg-primary hover:bg-primary-dark text-white": variant === "primary",
          "border border-secondary hover:border-secondary-dark hover:bg-secondary/40 text-secondary-dark":
            variant === "secondary",
          "border border-secondary text-secondary hover:text-secondary-dark hover:border-secondary-dark hover:bg-secondary/40 transition-all":
            variant === "outline",
          "text-sm px-4 py-2": size === "sm",
          "text-base px-6 py-3": size === "md",
          "text-lg px-8 py-4": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
