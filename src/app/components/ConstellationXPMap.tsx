import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Trophy, Lock, Star, Zap } from 'lucide-react';

interface Level {
  level: number;
  name: string;
  xp: number;
  maxXp: number;
  unlocked: boolean;
  description: string;
}

interface ConstellationPoint extends Level {
  x: number;
  y: number;
}

export const ConstellationXPMap: React.FC<{
  currentXp: number;
  currentLevel: Level;
  levels: Level[];
}> = ({ currentXp, currentLevel, levels }) => {
  // Generate constellation points with organic positions
  const constellationPoints: ConstellationPoint[] = useMemo(() => {
    return levels.map((level, index) => {
      const angle = (index / levels.length) * Math.PI * 2 - Math.PI / 2;
      const radius = 60 + index * 8;
      const wobble = Math.sin(index * 1.5) * 15;

      return {
        ...level,
        x: 100 + Math.cos(angle) * radius + wobble,
        y: 100 + Math.sin(angle) * radius + Math.cos(index) * 10,
      };
    });
  }, [levels]);

  const currentLevelIndex = levels.findIndex(l => l.level === currentLevel.level);
  const xpProgress = (currentXp / currentLevel.maxXp) * 100;
  const xpRemaining = currentLevel.maxXp - currentXp;

  // Create curved path between points
  const createCurvedPath = (points: ConstellationPoint[]) => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      const controlX = midX + (Math.random() - 0.5) * 30;
      const controlY = midY + (Math.random() - 0.5) * 30;

      path += ` Q ${controlX} ${controlY}, ${next.x} ${next.y}`;
    }

    return path;
  };

  const unlockedPath = createCurvedPath(constellationPoints.filter(p => p.unlocked));
  const fullPath = createCurvedPath(constellationPoints);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="relative"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '24px',
        minHeight: '400px'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-[#06B6D4]" />
          <div className="text-white text-sm font-bold">XP Progression</div>
        </div>
        <div className="text-xs text-gray-500">Constellation Map</div>
      </div>

      {/* SVG Constellation */}
      <svg viewBox="0 0 200 200" className="w-full h-72 mb-4">
        <defs>
          {/* Glowing gradient for unlocked path */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for current level */}
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background stars */}
        {[...Array(30)].map((_, i) => (
          <motion.circle
            key={`star-${i}`}
            cx={Math.random() * 200}
            cy={Math.random() * 200}
            r="0.5"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Full path (locked) */}
        <motion.path
          d={fullPath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {/* Unlocked path (glowing) */}
        <motion.path
          d={unlockedPath}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
        />

        {/* Animated particles along unlocked path */}
        {[0, 0.3, 0.6].map((offset, i) => (
          <motion.circle
            key={`particle-${i}`}
            r="2"
            fill="#06B6D4"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{
              offsetDistance: ['0%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: 'linear'
            }}
            style={{
              offsetPath: `path("${unlockedPath}")`,
            }}
          />
        ))}

        {/* Constellation points */}
        {constellationPoints.map((point, index) => {
          const isCurrent = point.level === currentLevel.level;
          const isUnlocked = point.unlocked;
          const isNext = point.level === currentLevel.level + 1;

          return (
            <g key={point.level}>
              {/* Orbital ring for current level */}
              {isCurrent && (
                <>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="15"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="1"
                    opacity="0.3"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{
                      scale: { duration: 2, repeat: Infinity },
                      rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
                    }}
                  />
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="20"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="0.5"
                    opacity="0.2"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  />
                </>
              )}

              {/* Main point */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={isCurrent ? 10 : isUnlocked ? 6 : 4}
                fill={isCurrent ? '#06B6D4' : isUnlocked ? '#8B5CF6' : 'rgba(255,255,255,0.2)'}
                filter={isCurrent ? 'url(#strongGlow)' : isUnlocked ? 'url(#glow)' : 'none'}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 200
                }}
                className={isCurrent ? 'cursor-pointer' : ''}
              />

              {/* Pulsing effect for current level */}
              {isCurrent && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="10"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="2"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.8, 0, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              )}

              {/* Next level indicator */}
              {isNext && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              )}

              {/* Icon overlay */}
              {isCurrent && (
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                  <circle cx={point.x} cy={point.y} r="5" fill="#0A0E27" />
                  <text
                    x={point.x}
                    y={point.y + 2}
                    textAnchor="middle"
                    fill="#06B6D4"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    ★
                  </text>
                </motion.g>
              )}

              {/* Level label */}
              <motion.text
                x={point.x}
                y={point.y + (isCurrent ? 30 : 20)}
                textAnchor="middle"
                fill={isCurrent ? '#06B6D4' : isUnlocked ? 'white' : 'rgba(255,255,255,0.3)'}
                fontSize={isCurrent ? '11' : '9'}
                fontWeight="bold"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                L{point.level}
              </motion.text>

              {/* Level name for current */}
              {isCurrent && (
                <motion.text
                  x={point.x}
                  y={point.y - 20}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {point.name}
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Current Progress Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div
          className="p-4 rounded-xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.05))',
            border: '1px solid rgba(6, 182, 212, 0.3)'
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap size={16} className="text-[#06B6D4]" />
            <div className="text-xs text-gray-400">Current XP</div>
          </div>
          <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Fraunces, serif' }}>
            {currentXp}
          </div>
        </div>

        <div
          className="p-4 rounded-xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(249, 115, 22, 0.05))',
            border: '1px solid rgba(249, 115, 22, 0.3)'
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star size={16} className="text-[#F97316]" />
            <div className="text-xs text-gray-400">To Next Level</div>
          </div>
          <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Fraunces, serif' }}>
            {xpRemaining}
          </div>
        </div>
      </div>

      {/* Progress bar to next level */}
      <div className="relative h-3 w-full rounded-full bg-white/5 overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${xpProgress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #06B6D4, #8B5CF6)',
            boxShadow: '0 0 10px #06B6D4'
          }}
        />
      </div>

      {/* Level description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-gray-400 text-center leading-relaxed"
      >
        {currentLevel.description}
      </motion.div>
    </motion.div>
  );
};
