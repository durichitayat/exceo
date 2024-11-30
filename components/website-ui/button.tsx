import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export default function Button({
  children,
  className,
  color,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-6 py-3 rounded-md transition-all text-white font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 flex items-center",
        color ? color : "bg-secondary hover:bg-secondary-dark",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
