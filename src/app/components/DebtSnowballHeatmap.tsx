import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingDown, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';

interface DebtInfo {
  name: string;
  current: number;
  total: number;
  monthlyPayment: number;
  interestRate?: number;
}

export const DebtSnowballHeatmap: React.FC<{ debt?: DebtInfo }> = ({
  debt = {
    name: 'iPhone 15 Pro',
    current: 3200,
    total: 4800,
    monthlyPayment: 400,
    interestRate: 0
  }
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const progressPercent = (debt.current / debt.total) * 100;
  const remaining = debt.total - debt.current;
  const monthsRemaining = Math.ceil(remaining / debt.monthlyPayment);

  // Calculate color stops based on progress
  const getProgressColor = (percent: number) => {
    if (percent < 33) return '#EF4444'; // Red
    if (percent < 66) return '#F59E0B'; // Amber
    return '#10B981'; // Green
  };

  const currentColor = getProgressColor(progressPercent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '28px',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown size={18} className="text-[#F97316]" />
            <div className="text-white text-lg font-bold">{debt.name}</div>
          </div>
          <div className="text-gray-400 text-xs">Debt Snowball Progress</div>
        </div>
        <div className="text-right">
          <div className="text-[#F97316] text-sm font-bold">
            RM {debt.monthlyPayment}/mo
          </div>
          <div className="text-gray-500 text-xs">{monthsRemaining} months left</div>
        </div>
      </div>

      {/* Heatmap Progress Bar */}
      <div className="relative mb-6">
        {/* Background track with gradient */}
        <div
          className="relative h-16 w-full rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}
        >
          {/* Texture overlay - Diagonal stripes */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255, 255, 255, 0.1) 10px,
                rgba(255, 255, 255, 0.1) 20px
              )`
            }}
          />

          {/* Grid pattern texture */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Progress fill with dynamic gradient */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-y-0 left-0 rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(90deg,
                #EF4444 0%,
                #F59E0B ${Math.min(progressPercent, 50)}%,
                #10B981 ${Math.min(progressPercent, 100)}%
              )`,
              boxShadow: `0 0 30px ${currentColor}40, inset 0 2px 10px rgba(255,255,255,0.2)`
            }}
          >
            {/* Shimmer animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ width: '100px' }}
            />

            {/* Dot pattern overlay on progress */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '12px 12px'
              }}
            />

            {/* Heat zones visualization */}
            <div className="absolute inset-0 flex">
              {[...Array(Math.floor(progressPercent / 10))].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 0.3, scaleY: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-1 border-r border-white/10"
                  style={{
                    background: `linear-gradient(to top, ${getProgressColor(i * 10)}40, transparent)`
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Current progress marker */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: `calc(${progressPercent}% - 2px)` }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))'
            }}
          />

          {/* Pulsing indicator at progress point */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1],
              x: `calc(${progressPercent}% - 8px)`
            }}
            transition={{
              x: { duration: 1.5, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 2, repeat: Infinity },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white"
            style={{
              boxShadow: `0 0 15px ${currentColor}, 0 0 30px ${currentColor}80`
            }}
          />
        </div>

        {/* Progress labels */}
        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#10B981]" />
            <span className="text-gray-400">
              Paid: <span className="text-white font-bold">RM {debt.current.toLocaleString()}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className="text-[#F97316]" />
            <span className="text-gray-400">
              Total: <span className="text-white font-bold">RM {debt.total.toLocaleString()}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div
          className="text-center p-3 rounded-xl"
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}
        >
          <div className="text-2xl font-bold text-[#10B981]" style={{ fontFamily: 'Fraunces, serif' }}>
            {Math.round(progressPercent)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Complete</div>
        </div>

        <div
          className="text-center p-3 rounded-xl"
          style={{
            background: 'rgba(249, 115, 22, 0.1)',
            border: '1px solid rgba(249, 115, 22, 0.2)'
          }}
        >
          <div className="text-2xl font-bold text-[#F97316]" style={{ fontFamily: 'Fraunces, serif' }}>
            RM {remaining.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400 mt-1">Remaining</div>
        </div>

        <div
          className="text-center p-3 rounded-xl"
          style={{
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.2)'
          }}
        >
          <div className="text-2xl font-bold text-[#06B6D4]" style={{ fontFamily: 'Fraunces, serif' }}>
            {monthsRemaining}
          </div>
          <div className="text-xs text-gray-400 mt-1">Months</div>
        </div>
      </div>

      {/* Payment schedule preview */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isHovered ? 'auto' : 0,
          opacity: isHovered ? 1 : 0
        }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <Calendar size={12} />
            <span>Next 3 payments</span>
          </div>
          {[1, 2, 3].map((month) => (
            <div
              key={month}
              className="flex items-center justify-between p-2 rounded-lg bg-white/5"
            >
              <span className="text-xs text-gray-400">
                Month {month}
              </span>
              <span className="text-xs text-white font-bold">
                -RM {debt.monthlyPayment}
              </span>
              <span className="text-xs text-gray-500">
                RM {Math.max(0, remaining - (debt.monthlyPayment * month)).toLocaleString()} left
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Motivation message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-3 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${currentColor}20, ${currentColor}10)`,
          border: `1px solid ${currentColor}30`
        }}
      >
        <div className="text-xs leading-relaxed" style={{ color: currentColor }}>
          {progressPercent < 33 && "🚀 Great start! Every payment brings you closer to financial freedom."}
          {progressPercent >= 33 && progressPercent < 66 && "💪 You're making excellent progress! Keep up the momentum."}
          {progressPercent >= 66 && "🎉 Almost there! You're on the final stretch to being debt-free!"}
        </div>
      </motion.div>
    </motion.div>
  );
};
