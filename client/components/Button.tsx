import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  theme?: "blue" | "purple";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const ButtonTheme = {
  blue: "bg-gradient-to-r from-blue-600 to-blue-700",
  purple:
    "bg-gradient-to-r from-[rgba(210,0,255,0.8)] to-[rgba(210,0,255,0.5)]",
};

const Button = ({ type, theme, className, children, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-12 ${
        theme ? ButtonTheme[theme] : ButtonTheme.blue
      } hover:bg-[rgba(255,255,255,0.4)] text-white font-medium py-2 px-4 rounded-md transition-all focus:shadow-[0_0_0_3px_rgba(255,255,255,.5)] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
