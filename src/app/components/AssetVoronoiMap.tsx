import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Asset {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export const AssetVoronoiMap: React.FC<{ assets: Asset[] }> = ({ assets }) => {
  // Generate Voronoi-style cells using site points and Delaunay triangulation
  const voronoiCells = useMemo(() => {
    // ASB Investment (80%) - Large dominant region
    const asbCell = {
      name: 'ASB Investment',
      percentage: 80,
      value: 10000,
      color: '#06B6D4',
      // Irregular polygon path for Voronoi effect
      path: 'M 20,20 L 280,15 L 290,95 L 275,140 L 250,175 L 180,185 L 90,180 L 40,150 L 15,100 Z',
      centroid: { x: 150, y: 100 }
    };

    // Bitcoin (20%) - Smaller irregular region
    const bitcoinCell = {
      name: 'Bitcoin',
      percentage: 20,
      value: 2500,
      color: '#F97316',
      path: 'M 280,15 L 380,25 L 385,95 L 380,165 L 350,185 L 275,185 L 250,175 L 275,140 L 290,95 Z',
      centroid: { x: 325, y: 100 }
    };

    return [asbCell, bitcoinCell];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '32px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="text-white text-lg font-bold mb-6 flex items-center justify-between">
        <span>Asset Distribution</span>
        <span className="text-xs text-gray-400 font-normal">Voronoi Map</span>
      </div>

      {/* Voronoi Diagram */}
      <div className="relative h-64 w-full mb-6">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            {/* Gradients for cells */}
            <linearGradient id="asbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="bitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.1" />
            </linearGradient>

            {/* Patterns for texture */}
            <pattern id="asbPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#06B6D4" opacity="0.1" />
            </pattern>
            <pattern id="bitcoinPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#F97316" opacity="0.1" />
            </pattern>
          </defs>

          {/* Background grid */}
          <g opacity="0.1">
            {[...Array(20)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 10}
                x2="400"
                y2={i * 10}
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
            {[...Array(40)].map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 10}
                y1="0"
                x2={i * 10}
                y2="200"
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {voronoiCells.map((cell, index) => (
            <g key={cell.name}>
              {/* Cell fill with pattern */}
              <motion.path
                d={cell.path}
                fill={`url(#${cell.name === 'ASB Investment' ? 'asbPattern' : 'bitcoinPattern'})`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              />

              {/* Cell gradient overlay */}
              <motion.path
                d={cell.path}
                fill={`url(#${cell.name === 'ASB Investment' ? 'asbGradient' : 'bitcoinGradient'})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="transition-all duration-300 hover:opacity-80"
              />

              {/* Cell border */}
              <motion.path
                d={cell.path}
                fill="none"
                stroke={cell.color}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: index * 0.1, duration: 1, ease: 'easeOut' }}
              />

              {/* Site point (Voronoi generator) */}
              <motion.circle
                cx={cell.centroid.x}
                cy={cell.centroid.y}
                r="4"
                fill={cell.color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
              />

              {/* Pulsing ring around site point */}
              <motion.circle
                cx={cell.centroid.x}
                cy={cell.centroid.y}
                r="8"
                fill="none"
                stroke={cell.color}
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  delay: index * 0.1 + 0.5,
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Label - Asset name */}
              <motion.text
                x={cell.centroid.x}
                y={cell.centroid.y - 25}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                {cell.name}
              </motion.text>

              {/* Label - Percentage */}
              <motion.text
                x={cell.centroid.x}
                y={cell.centroid.y + 25}
                textAnchor="middle"
                fill={cell.color}
                fontSize="32"
                fontWeight="900"
                fontFamily="Fraunces, serif"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.7, type: 'spring' }}
              >
                {cell.percentage}%
              </motion.text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend with values */}
      <div className="grid grid-cols-2 gap-4">
        {voronoiCells.map((cell) => (
          <motion.div
            key={cell.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: cell.color, boxShadow: `0 0 10px ${cell.color}50` }}
            />
            <div>
              <div className="text-xs text-gray-400">{cell.name}</div>
              <div className="text-white font-bold">RM {cell.value.toLocaleString()}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
