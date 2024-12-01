import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "outline-primary"
    | "outline-secondary";
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
          "bg-primary hover:bg-primary-dark text-white border-primary-dark shadow-sm hover:shadow-lg transition-all":
            variant === "primary",
          "border border-secondary hover:border-secondary-dark bg-secondary hover:bg-secondary-dark text-white transition-all":
            variant === "secondary",
          "border border-secondary text-secondary bg-white hover:bg-secondary-dark/20 hover:text-secondary-dark hover:border-secondary-dark transition-all":
            variant === "outline-secondary",
          "border border-primary text-primary bg-white hover:bg-primary-dark/20 hover:text-primary-dark hover:border-primary-dark transition-all":
            variant === "outline-primary",
          "hover:bg-gray-300 transition-all": variant === "outline",
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
