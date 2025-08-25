"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface CommonInputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const CommonInput: React.FC<CommonInputProps> = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      <input
        type={isPassword && showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all pr-10 ${className}`}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/70 hover:text-white focus:outline-none"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

export default CommonInput;
