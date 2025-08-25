import React from "react";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "danger" | "success";
}

const CommonButton: React.FC<CommonButtonProps> = ({
  label,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "px-5 py-2 rounded-lg text-white font-semibold transition-all shadow-md";

  const variants: Record<string, string> = {
    primary: "bg-teal-600 hover:bg-teal-700",
    secondary: "bg-gray-500 hover:bg-gray-600",
    success: "bg-green-500 hover:bg-green-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default CommonButton;
