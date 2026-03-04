import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { Bell, ArrowUpRight, TrendingUp, Lock } from 'lucide-react';
import { Card } from '../components/ui/Card';

const data = [
  { name: 'Remaining', value: 350, color: '#10B981' },
  { name: 'Spent', value: 450, color: '#E5E7EB' },
];

export const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F4F6] pb-24 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-[#1E3A8A]/5 blur-3xl" />
      <div className="absolute top-20 -right-20 h-64 w-64 rounded-full bg-[#10B981]/5 blur-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 pt-8 sm:pt-12 pb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A]">Hi, Alex! 👋</h1>
          <p className="text-xs sm:text-sm text-gray-500">Let's grow your wealth.</p>
        </div>
        <div className="relative rounded-full bg-white p-2 shadow-sm">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </div>
      </div>

      {/* Gamification Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 sm:px-6 mb-6"
      >
        <Card className="relative overflow-hidden bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white p-5 shadow-lg shadow-[#1E3A8A]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-100">Current Level</span>
            <span className="flex items-center gap-1 text-xs font-bold bg-white/10 px-2 py-1 rounded-full">
              <TrendingUp size={12} />
              340 XP
            </span>
          </div>
          <h2 className="text-xl font-bold mb-3">Level 1: Beginner Saver</h2>
          
          <div className="relative h-2 w-full bg-blue-900/30 rounded-full overflow-hidden mb-3">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute h-full bg-[#10B981] rounded-full"
            />
          </div>
          
          <div className="flex items-center gap-2 text-xs text-blue-100">
            <Lock size={12} />
            <span>Next: Smart Planner (Unlock at 500 XP)</span>
          </div>
        </Card>
      </motion.div>

      {/* Budget Donut Chart */}
      <div className="px-4 sm:px-6 mb-6">
        <h3 className="mb-4 text-base sm:text-lg font-bold text-gray-900">Smart Budget</h3>
        <Card className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white shadow-xl shadow-gray-200/50">
          <div className="relative h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label
                    value="RM 350"
                    position="center"
                    fill="#1E3A8A"
                    style={{ fontSize: '24px', fontWeight: 'bold' }}
                  />
                  <Label
                    value="Remaining"
                    position="center"
                    dy={20}
                    fill="#6B7280"
                    style={{ fontSize: '12px' }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div className="absolute bottom-0 w-full flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#10B981]" />
                <span className="text-gray-600">Remaining</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-gray-200" />
                <span className="text-gray-600">Spent</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Insight Banner */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="px-4 sm:px-6"
      >
        <div className="relative flex items-start gap-3 sm:gap-4 overflow-hidden rounded-2xl bg-[#F97316]/10 p-4 border border-[#F97316]/20">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-white shadow-md shadow-[#F97316]/30">
            <AlertTriangleIcon />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#F97316]">Spending Alert</h4>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Spending on food is <span className="font-bold">20% higher</span> this week compared to last month.
            </p>
          </div>
          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm hover:text-[#F97316] active:scale-95 transition-transform">
            <ArrowUpRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const AlertTriangleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);