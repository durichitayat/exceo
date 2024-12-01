import React from "react";
import clsx from "clsx";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  return (
    <label
      className={clsx("block text-sm font-medium text-gray-700", className)}
      {...props}
    />
  );
};

export default Label;
