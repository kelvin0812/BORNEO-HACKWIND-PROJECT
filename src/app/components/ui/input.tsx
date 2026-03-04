import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon, ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          ref={ref}
          placeholder=" "
          className={cn(
            'peer w-full rounded-2xl border-2 border-gray-200 bg-white px-4 pt-6 pb-2 text-base font-medium text-gray-900 outline-none transition-all placeholder:text-transparent hover:border-gray-300 focus:border-[#1E3A8A] focus:ring-0',
            icon && 'pl-11',
            className
          )}
          {...props}
        />
        <label
          className={cn(
            'pointer-events-none absolute left-4 top-4 origin-[0] -translate-y-2.5 scale-75 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#1E3A8A]',
            icon && 'left-11 peer-placeholder-shown:left-11 peer-focus:left-11'
          )}
        >
          {label}
        </label>
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#1E3A8A]">
            {icon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
