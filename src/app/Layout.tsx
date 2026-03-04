import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, MessageSquareText, AlertTriangle, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: MessageSquareText, label: 'Coach', path: '/coach' },
  { icon: AlertTriangle, label: 'Debt Risk', path: '/debt' },
  { icon: GraduationCap, label: 'Learn', path: '/learn' },
];

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full flex-col bg-[#F3F4F6] font-sans antialiased text-gray-900 overflow-hidden relative">
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar smooth-scroll">
        <Outlet />
      </main>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-4 sm:bottom-6 left-0 w-full px-4 sm:px-6 z-50 pointer-events-none">
        <nav className="mx-auto flex w-full max-w-md items-center justify-between rounded-3xl bg-white/90 px-1 sm:px-2 py-3 sm:py-4 shadow-2xl shadow-[#1E3A8A]/10 backdrop-blur-xl border border-white/50 pointer-events-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-1 flex-col items-center justify-center gap-0.5 sm:gap-1 touch-manipulation"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute -top-8 sm:-top-10 h-1 w-8 rounded-full bg-[#1E3A8A]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div 
                  className={cn(
                    "flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl transition-all duration-300 active:scale-95",
                    isActive ? "bg-[#1E3A8A]/10 text-[#1E3A8A]" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className="sm:hidden" />
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="hidden sm:block" />
                </div>
                <span 
                  className={cn(
                    "text-[9px] sm:text-[10px] font-semibold transition-colors duration-300",
                    isActive ? "text-[#1E3A8A]" : "text-gray-400"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};