import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'glass';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'white', ...props }, ref) => {
    const variants = {
      white: 'bg-white shadow-xl shadow-gray-200/50',
      glass: 'bg-white/80 backdrop-blur-xl shadow-xl shadow-[#1E3A8A]/5 border border-white/50',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-3xl p-6 transition-all', variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
