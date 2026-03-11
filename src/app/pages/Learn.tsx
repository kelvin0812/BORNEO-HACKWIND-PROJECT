import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, BookOpen, PlayCircle, Star, 
  CheckCircle, Lock, TrendingUp, DollarSign, 
  Clock, Award, Brain, Target, ChevronRight, Search, Zap
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
    <div className="flex min-h-screen w-full flex-col bg-[#0A0E27] pb-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0D1435] to-[#0A0E27]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl" />

      <div className="relative z-10 px-6 pt-8 pb-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Learning Hub</h1>
            <p className="text-sm text-gray-400 font-medium">Elevate your financial intelligence.</p>
          </div>
          <div
            className="px-3 py-1.5 rounded-2xl flex items-center gap-1.5"
            style={{
              background: 'rgba(139, 92, 246, 0.2)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            <Award size={16} className="text-purple-400" />
            <span className="text-xs font-bold text-white">{xp} XP</span>
          </div>
        </div>

        {/* Staggered Bento-Box Layout: Daily Challenge + Curated Path */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Daily Challenge - Bento Box 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:row-span-1"
          >
            <div
              className="p-6 rounded-3xl relative overflow-hidden h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.3))',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
              }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Brain size={80} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={20} className="text-purple-300" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-purple-300">Daily Challenge</h3>
                </div>
                <p className="text-lg font-bold mb-4 text-white leading-relaxed">
                  Complete 1 lesson about "Compound Interest" and earn <span className="text-purple-300">50 XP</span>!
                </p>
                <div className="flex items-center gap-2 mb-6 text-xs text-gray-300">
                  <Clock size={14} className="text-purple-400" />
                  <span className="font-bold">10 mins</span>
                  <div className="h-1 w-1 rounded-full bg-gray-600" />
                  <Star size={14} className="text-purple-400" />
                  <span className="font-bold">Beginner</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-white/90 hover:bg-white text-purple-600 rounded-xl font-bold h-11 px-8 shadow-lg"
                >
                  Start Now
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Curated Path Preview - Bento Box 2 (Staggered) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:row-span-1 md:mt-12"
          >
            <div
              className="p-6 rounded-3xl relative overflow-hidden h-full"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                  <GraduationCap size={24} className="text-[#06B6D4]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">Curated Learning Path</h3>
                  <p className="text-xs text-gray-400">Personalized for your goals</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-[#10B981]" />
                    <span className="text-sm font-bold text-gray-300">3 Modules Completed</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                  <div className="flex items-center gap-2">
                    <PlayCircle size={18} className="text-[#06B6D4]" />
                    <span className="text-sm font-bold text-white">Continue Learning</span>
                  </div>
                  <ChevronRight size={16} className="text-[#06B6D4]" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">Total Progress</div>
                <div className="text-3xl font-bold text-[#06B6D4] mb-3" style={{ fontFamily: 'Fraunces, serif' }}>
                  42%
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Learning Modules - Full Width */}
        <div className="space-y-4 mb-10">
          <h3 className="text-lg font-bold text-white px-1">All Modules</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m, index) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-5 rounded-3xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-white leading-snug">{m.title}</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">{m.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} /> {m.time}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target size={12} /> {m.difficulty}
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-purple-400">
                    <Award size={12} /> {m.xp} XP
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {m.lessons.map((l) => (
                    <div 
                      key={l.id} 
                      className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-transparent hover:border-cyan-400/30 transition-colors group/lesson"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${l.completed ? 'bg-[#10B981] text-white' : 'bg-white/10 text-gray-500 border border-white/20'}`}>
                          {l.completed ? <CheckCircle size={14} /> : (l.type === 'video' ? <PlayCircle size={14} /> : <BookOpen size={14} />)}
                        </div>
                        <span className={`text-[11px] font-bold ${l.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>{l.title}</span>
                      </div>
                      {!l.completed && <ChevronRight size={14} className="text-gray-600 group-hover/lesson:text-cyan-400 transition-colors" />}
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white rounded-xl h-10 font-bold shadow-lg shadow-cyan-900/20"
                  onClick={() => addXp(m.xp)}
                >
                  Start Module
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Locked Path - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative opacity-60"
        >
          <div
            className="p-8 rounded-3xl flex flex-col items-center py-12 relative overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '2px dashed rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-gradient-to-br from-purple-500 to-cyan-500" />
            <Lock size={40} className="text-gray-600 mb-4" />
            <h4 className="text-lg font-bold text-gray-400 mb-2">Advanced Wealth Mastery</h4>
            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mb-4">Unlock at Level 3</p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Award size={14} />
                <span className="font-bold">500 XP Reward</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span className="font-bold">3+ Hours</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};