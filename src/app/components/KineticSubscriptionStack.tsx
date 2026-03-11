import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar } from 'lucide-react';

interface Subscription {
  id: string;
  name: string;
  amount: number;
  color: string;
  gradient: string;
  icon?: string;
  billingDate: number;
}

const subscriptions: Subscription[] = [
  {
    id: 'netflix',
    name: 'Netflix Premium',
    amount: 55,
    color: '#E50914',
    gradient: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
    billingDate: 1
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    amount: 15.90,
    color: '#1DB954',
    gradient: 'linear-gradient(135deg, #1DB954 0%, #1AA34A 100%)',
    billingDate: 5
  },
  {
    id: 'icloud',
    name: 'iCloud Storage',
    amount: 3.90,
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    billingDate: 10
  }
];

export const KineticSubscriptionStack: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getCardTransform = (index: number, id: string) => {
    if (expandedId === id) {
      return {
        x: 0,
        y: -20,
        rotate: 0,
        scale: 1.08,
        zIndex: 50
      };
    }

    if (hoveredId === id) {
      return {
        x: index * 220,
        y: -12,
        rotate: index * 2,
        scale: 1.03,
        zIndex: 40
      };
    }

    // Default fan layout with rotation
    return {
      x: index * 220,
      y: 0,
      rotate: index * 2 - 2,
      scale: 1,
      zIndex: 30 - index
    };
  };

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-white text-lg font-bold">Active Subscriptions</div>
          <div className="text-gray-400 text-sm">
            Total: <span className="text-[#F97316] font-bold">RM {totalMonthly.toFixed(2)}</span>/mo
          </div>
        </div>
        <div className="text-xs text-gray-500">Kinetic Stack</div>
      </div>

      {/* Card Fan Container */}
      <div className="relative h-40 w-full">
        {subscriptions.map((sub, index) => (
          <motion.div
            key={sub.id}
            onHoverStart={() => setHoveredId(sub.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
            animate={getCardTransform(index, sub.id)}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            className="absolute left-0 top-0 w-72 cursor-pointer"
            style={{
              transformOrigin: 'bottom center'
            }}
          >
            <div
              className="relative h-32 rounded-2xl overflow-hidden"
              style={{
                background: sub.gradient,
                boxShadow: hoveredId === sub.id
                  ? `0 20px 40px ${sub.color}60, 0 0 0 2px rgba(255,255,255,0.2)`
                  : `0 10px 20px ${sub.color}40, 0 0 0 1px rgba(255,255,255,0.1)`
              }}
            >
              {/* Decorative pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, white 1px, transparent 1px),
                                   radial-gradient(circle at 80% 70%, white 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 0.5
                }}
                style={{ width: '50%' }}
              />

              {/* Card Content */}
              <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="text-white text-base font-bold mb-1">{sub.name}</div>
                  <div className="text-white/70 text-xs flex items-center gap-1">
                    <Calendar size={12} />
                    Billing Day {sub.billingDate}
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-white text-3xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
                      RM {sub.amount.toFixed(2)}
                    </div>
                    <div className="text-white/60 text-xs">per month</div>
                  </div>

                  {/* Animated indicator */}
                  <motion.div
                    animate={{
                      scale: hoveredId === sub.id ? [1, 1.2, 1] : 1,
                      rotate: hoveredId === sub.id ? [0, 180, 360] : 0
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </motion.div>
                </div>
              </div>

              {/* Glow effect on hover */}
              {hoveredId === sub.id && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${sub.color}40, transparent 70%)`
                  }}
                />
              )}
            </div>

            {/* Expanded details */}
            <AnimatePresence>
              {expandedId === sub.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
                >
                  <div className="text-xs text-gray-400 space-y-2">
                    <div className="flex justify-between">
                      <span>Next billing:</span>
                      <span className="text-white font-bold">
                        {new Date().getMonth() + 1}/{sub.billingDate}/{new Date().getFullYear()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual cost:</span>
                      <span className="text-white font-bold">RM {(sub.amount * 12).toFixed(2)}</span>
                    </div>
                    <button className="w-full mt-2 bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded-lg transition-colors">
                      Manage Subscription
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Subscription insights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex items-center justify-between text-xs"
      >
        <div className="text-gray-400">
          You're saving <span className="text-[#10B981] font-bold">RM 45/mo</span> vs. individual plans
        </div>
        <button className="text-[#06B6D4] hover:text-[#0891B2] font-bold">
          Optimize →
        </button>
      </motion.div>
    </motion.div>
  );
};
