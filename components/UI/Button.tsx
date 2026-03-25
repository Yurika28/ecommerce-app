import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles = 'rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-amber-200 hover:bg-amber-300 focus:ring-blue-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-neutral-500 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-500 focus:ring-neutral-500',
  };

  const sizeStyles = {
    small: 'px-1.5 py-1.5 text-[0.5rem] md:px-4 md:py-2 md:text-base',
    medium: 'px-4 py-2 text-base md:px-6 md:py-3 md:text-md',
    large: 'px-6 py-3 text-md w-full md:w-3/4 md:px-8 md:py-4 md:text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 