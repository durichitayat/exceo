import React from "react";
import clsx from "clsx";

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={clsx(
        "rounded-full overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-200 text-gray-500">
          {alt?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
