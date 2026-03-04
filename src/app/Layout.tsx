import React from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Home, MessageSquareText, AlertTriangle, GraduationCap, TrendingUp, User } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: TrendingUp, label: 'Invest', path: '/invest' },
  { icon: MessageSquareText, label: 'Coach', path: '/coach' },
  { icon: AlertTriangle, label: 'Debt', path: '/debt' },
  { icon: GraduationCap, label: 'Learn', path: '/learn' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full flex-col bg-[#F3F4F6] font-sans antialiased text-gray-900 overflow-hidden relative">
      <main className="flex-1 overflow-y-auto pb-16 no-scrollbar smooth-scroll">
        <Outlet />
      </main>

      {/* Standard Bottom Navigation */}
      <nav className="w-full bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-around py-2 px-1 z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 touch-manipulation"
            >
              <div 
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                  isActive ? "bg-[#1E3A8A]/10 text-[#1E3A8A]" : "text-gray-400"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span 
                className={cn(
                  "text-[10px] font-bold transition-colors duration-300",
                  isActive ? "text-[#1E3A8A]" : "text-gray-400"
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#1E3A8A]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
