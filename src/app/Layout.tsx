import React from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Home, AlertTriangle, GraduationCap, User } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: AlertTriangle, label: 'Debt', path: '/debt' },
  { icon: GraduationCap, label: 'Learn', path: '/learn' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full flex-col bg-[#0A0E27] font-sans antialiased text-white overflow-hidden relative">
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar smooth-scroll">
        <Outlet />
      </main>

      {/* Dark Glassmorphic Bottom Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        style={{
          width: 'calc(100% - 3rem)',
          maxWidth: '500px',
        }}
      >
        <div
          className="flex items-center justify-around px-8 py-4 rounded-3xl shadow-2xl"
          style={{
            background: 'rgba(10, 14, 39, 0.8)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center gap-2 touch-manipulation"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 relative",
                    isActive
                      ? "bg-[#06B6D4]/20 text-[#06B6D4]"
                      : "text-gray-500 hover:text-gray-400"
                  )}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />

                  {/* Success Teal Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 rounded-2xl bg-[#06B6D4]/30 blur-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>

                <span
                  className={cn(
                    "text-[10px] font-bold transition-colors duration-300 uppercase tracking-wider",
                    isActive ? "text-[#06B6D4]" : "text-gray-600"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
};
