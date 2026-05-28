import type { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
}

export const Button = ({ variant = 'primary', className = '', children, ...props }: ButtonProps) => {
  const baseClasses = "flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary: "bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    ghost: "bg-transparent text-neutral-400 hover:text-white disabled:opacity-30 px-6 py-3",
    outline: "bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-700"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
