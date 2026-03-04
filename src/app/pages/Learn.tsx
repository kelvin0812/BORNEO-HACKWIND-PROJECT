import React from 'react';
import { BookOpen, GraduationCap, PlayCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';

const topics = [
  { title: 'The 50/30/20 Rule', category: 'Budgeting', duration: '5 min' },
  { title: 'Compound Interest Magic', category: 'Investing', duration: '8 min' },
  { title: 'Good Debt vs Bad Debt', category: 'Credit', duration: '6 min' },
  { title: 'Building an Emergency Fund', category: 'Savings', duration: '4 min' },
];

export const Learn = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F4F6] pb-24 relative overflow-hidden">
      <div className="px-4 sm:px-6 pt-8 sm:pt-12 pb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A]">Learning Hub</h1>
        <p className="text-xs sm:text-sm text-gray-500">Master your money in minutes.</p>
      </div>

      <div className="px-4 sm:px-6 grid gap-3 sm:gap-4">
        {topics.map((topic, i) => (
          <Card key={i} className="flex items-center gap-3 sm:gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors group active:scale-[0.98] touch-manipulation">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
              <PlayCircle size={22} className="sm:hidden" />
              <PlayCircle size={24} className="hidden sm:block" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] sm:text-xs font-bold text-[#10B981] uppercase tracking-wider">{topic.category}</span>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{topic.title}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500">{topic.duration} read</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};