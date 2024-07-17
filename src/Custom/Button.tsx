import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  variant?: string;
  size?: "sm" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<Props> = ({
  variant = "primary",
  size,
  disabled = false,
  onClick,
  children,
  type,
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
