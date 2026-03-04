import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, ChevronRight, Fingerprint } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const goals = [
  { id: 'save', label: 'Save for Goals' },
  { id: 'invest', label: 'Start Investing' },
  { id: 'debt', label: 'Pay Off Debt' },
  { id: 'emergency', label: 'Emergency Fund' },
];

export const Onboarding = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F4F6] p-4 sm:p-6 pt-8 sm:pt-12 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 h-64 w-full bg-gradient-to-b from-[#1E3A8A]/10 to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#10B981]/20 blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-6 sm:mb-8 flex flex-col items-center text-center"
      >
        <div className="mb-3 sm:mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#1E3A8A] text-white shadow-xl shadow-[#1E3A8A]/30">
          <ShieldCheck size={28} className="sm:hidden" />
          <ShieldCheck size={32} className="hidden sm:block" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E3A8A]">
          FinanceLens AI
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500">Your smart financial companion.</p>
      </motion.div>

      {/* Main Content Card */}
      <Card className="relative z-10 w-full max-w-md mx-auto overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Let's get started</h2>
          <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-[#10B981]">
            <Lock size={12} />
            <span className="hidden xs:inline">Private & Secure</span>
            <span className="xs:hidden">Secure</span>
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* Inputs */}
          <div className="space-y-4">
            <Input
              label="Age"
              type="number"
              placeholder="e.g. 24"
            />
            <Input
              label="Monthly Income / Allowance"
              type="number"
              placeholder="e.g. 800"
              icon={<span className="text-gray-400 font-bold">RM</span>}
            />
          </div>

          {/* Goals */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700">
              What are your primary goals?
            </label>
            <div className="flex flex-wrap gap-2">
              {goals.map((goal) => (
                <motion.button
                  key={goal.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleGoal(goal.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    selectedGoals.includes(goal.id)
                      ? 'bg-[#1E3A8A] text-white shadow-md shadow-[#1E3A8A]/20'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {goal.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Biometric Prompt */}
          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1E3A8A] shadow-sm">
              <Fingerprint size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Face ID Enabled</p>
              <p className="text-xs text-gray-500">Your data is encrypted locally.</p>
            </div>
          </div>

          <Button fullWidth size="lg" onClick={handleContinue} className="mt-4">
            Create Secure Profile
            <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>
      </Card>
      
      <p className="mt-6 sm:mt-8 text-center text-[10px] sm:text-xs text-gray-400 px-4">
        By continuing, you agree to our Terms & Privacy Policy.
      </p>
    </div>
  );
};