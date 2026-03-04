import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, BookOpen, PlayCircle, Star, 
  CheckCircle, Lock, TrendingUp, DollarSign, 
  Clock, Award, Brain, Target, ChevronRight, Search
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useFinance } from '../context/FinanceContext';

const modules = [
  {
    id: 'm1',
    title: 'Financial Literacy 101',
    description: 'Learn the fundamentals of budgeting and saving.',
    xp: 150,
    difficulty: 'Beginner',
    time: '45 mins',
    lessons: [
      { id: 'l1', title: 'The 50/30/20 Rule', completed: true, type: 'article' },
      { id: 'l2', title: 'Building Emergency Funds', completed: false, type: 'video' },
      { id: 'l3', title: 'Managing Subscriptions', completed: false, type: 'article' },
    ],
    icon: <BookOpen className="text-blue-500" />
  },
  {
    id: 'm2',
    title: 'Investment Strategies',
    description: 'Understand risk vs reward in modern markets.',
    xp: 250,
    difficulty: 'Intermediate',
    time: '1.5 hrs',
    lessons: [
      { id: 'l4', title: 'Stocks vs Bonds', completed: false, type: 'video' },
      { id: 'l5', title: 'The Power of Compounding', completed: false, type: 'article' },
      { id: 'l6', title: 'Real Assets vs Digital Assets', completed: false, type: 'article' },
    ],
    icon: <TrendingUp className="text-green-500" />
  },
  {
    id: 'm3',
    title: 'Debt & Interest Mastery',
    description: 'Crush your debt with psychological and financial tactics.',
    xp: 200,
    difficulty: 'Beginner',
    time: '1 hr',
    lessons: [
      { id: 'l7', title: 'Debt Snowball vs Avalanche', completed: false, type: 'article' },
      { id: 'l8', title: 'Understanding BNPL Risks', completed: false, type: 'video' },
    ],
    icon: <Target className="text-red-500" />
  }
];

export const Learn = () => {
  const { xp, addXp } = useFinance();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleCompleteLesson = (moduleId: string, lessonId: string) => {
    // Logic to complete lesson
    addXp(50);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F4F6] pb-10 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl" />
      
      <div className="px-4 pt-8 pb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#1E3A8A]">Learning Hub</h1>
          <p className="text-sm text-gray-500 font-medium">Elevate your financial intelligence.</p>
        </div>
        <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-1.5">
          <Award size={16} className="text-purple-500" />
          <span className="text-xs font-bold text-gray-900">{xp} XP</span>
        </div>
      </div>

      {/* Daily Quest */}
      <div className="px-4 mb-6">
        <Card className="p-4 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] text-white rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20"><Brain size={60} /></div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-100 mb-1">Daily Challenge</h3>
            <p className="text-sm font-bold mb-3">Complete 1 lesson about "Compound Interest" and earn 50 XP!</p>
            <Button size="sm" className="bg-white text-purple-600 rounded-xl font-bold h-9 px-6">
              Start Now
            </Button>
          </div>
        </Card>
      </div>

      {/* Modules List */}
      <div className="px-4 space-y-4 mb-10">
        <h3 className="text-lg font-bold text-gray-900 px-1">Curated Path</h3>
        {modules.map((m) => (
          <Card key={m.id} className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden group">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                {m.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="text-sm font-bold text-gray-900">{m.title}</h4>
                  <span className="text-[10px] font-bold text-purple-500 uppercase tracking-wider">{m.xp} XP</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{m.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              <div className="flex items-center gap-1.5">
                <Clock size={12} /> {m.time}
              </div>
              <div className="flex items-center gap-1.5">
                <Target size={12} /> {m.difficulty}
              </div>
            </div>

            <div className="space-y-2">
              {m.lessons.map((l) => (
                <div key={l.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-100 transition-colors cursor-pointer group/lesson">
                  <div className="flex items-center gap-3">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center ${l.completed ? 'bg-[#10B981] text-white' : 'bg-white text-gray-300 border border-gray-100'}`}>
                      {l.completed ? <CheckCircle size={14} /> : (l.type === 'video' ? <PlayCircle size={14} /> : <BookOpen size={14} />)}
                    </div>
                    <span className={`text-[11px] font-bold ${l.completed ? 'text-gray-400' : 'text-gray-700'}`}>{l.title}</span>
                  </div>
                  {!l.completed && <ChevronRight size={14} className="text-gray-300 group-hover/lesson:text-purple-500 transition-colors" />}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Locked Path */}
      <div className="px-4 opacity-50">
        <Card className="p-5 bg-white border border-dashed border-gray-200 rounded-3xl flex flex-col items-center py-10">
          <Lock size={32} className="text-gray-300 mb-3" />
          <h4 className="text-sm font-bold text-gray-400">Advanced Wealth Mastery</h4>
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-1">Unlock at Level 3</p>
        </Card>
      </div>
    </div>
  );
};
