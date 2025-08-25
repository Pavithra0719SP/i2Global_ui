import React from "react";

interface CommonTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const CommonTextarea: React.FC<CommonTextareaProps> = ({
  className = "",
  ...props
}) => {
  return (
    <textarea
      {...props}
      className={`w-full p-3 bg-transparent border border-white/40 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 outline-none resize-none ${className}`}
    />
  );
};

export default CommonTextarea;
