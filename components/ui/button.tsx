import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  children,
  className,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "text-sm px-6 py-3 rounded-md transition-all font-medium flex items-center",
        {
          "bg-primary hover:bg-primary-dark text-white": variant === "primary",
          "border border-secondary hover:border-secondary-dark hover:bg-secondary/40 text-secondary-dark":
            variant === "secondary",
          "border border-gray-500 text-gray-500 hover:bg-gray-100":
            variant === "outline",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
