import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp, Lock, Plus, TrendingDown,
  Calendar, RefreshCcw, Star, Sparkles,
  MessageSquare, Wallet, ArrowUpRight,
  Send, Target, Zap, Trophy
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useFinance, CategoryType } from '../context/FinanceContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { AssetVoronoiMap } from '../components/AssetVoronoiMap';
import { KineticSubscriptionStack } from '../components/KineticSubscriptionStack';
import { DebtSnowballHeatmap } from '../components/DebtSnowballHeatmap';
import { ConstellationXPMap } from '../components/ConstellationXPMap';
import { BentoBoxAI } from '../components/BentoBoxAI';

const CATEGORIES: CategoryType[] = ['Food', 'Entertainment', 'Transport', 'Shopping', 'Health', 'Bills', 'Others'];

export const Dashboard = () => {
  const {
    accounts, transactions, currentLevel, levels, addAccount, addTransaction,
    getTotalBalance, xp, subscriptions, addSubscription, assets
  } = useFinance();

  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddSubOpen, setIsAddSubOpen] = useState(false);

  // Form states
  const [newAccName, setNewAccName] = useState('');
  const [newAccType, setNewAccType] = useState<'Bank' | 'Wallet' | 'Cash'>('Bank');
  const [newAccBalance, setNewAccBalance] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpAccId, setNewExpAccId] = useState('');
  const [newExpCategory, setNewExpCategory] = useState<CategoryType>('Food');
  const [newExpDesc, setNewExpDesc] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [newSubAmount, setNewSubAmount] = useState('');
  const [newSubAccId, setNewSubAccId] = useState('');
  const [newSubDate, setNewSubDate] = useState('1');

  const totalBalance = getTotalBalance();

  // Mock data for the redesign
  const totalAssetValue = 12500;

  const handleAddAccount = () => {
    if (!newAccName || !newAccBalance) return;
    addAccount({
      name: newAccName, type: newAccType, balance: parseFloat(newAccBalance),
      color: newAccType === 'Bank' ? '#06B6D4' : newAccType === 'Wallet' ? '#10B981' : '#F97316'
    });
    setNewAccName(''); setNewAccBalance(''); setIsAddAccountOpen(false);
    toast.success("Account added successfully!");
  };

  const handleAddExpense = () => {
    if (!newExpAmount || !newExpAccId) return;
    addTransaction({
      accountId: newExpAccId, amount: parseFloat(newExpAmount), category: newExpCategory,
      description: newExpDesc || newExpCategory, date: new Date().toISOString(), type: 'expense'
    });
    setNewExpAmount(''); setNewExpDesc(''); setIsAddExpenseOpen(false);
    toast.success("Expense recorded!");
  };

  const handleAddSub = () => {
    if (!newSubName || !newSubAmount || !newSubAccId) return;
    addSubscription({
      name: newSubName, amount: parseFloat(newSubAmount), accountId: newSubAccId,
      billingDate: parseInt(newSubDate), category: 'Subscription'
    });
    setNewSubName(''); setNewSubAmount(''); setIsAddSubOpen(false);
    toast.success("Subscription tracked!");
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0E27] relative overflow-hidden pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0D1435] to-[#0A0E27]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl" />

      {/* Broken Grid Layout: 20% / 50% / 30% */}
      <div className="relative z-10 grid grid-cols-[20%_50%_30%] gap-6 p-8 max-w-[1800px] mx-auto">

        {/* LEFT COLUMN - 20% */}
        <div className="space-y-6">
          {/* Hero Typography - Total Asset Value */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="text-[#06B6D4]/40 text-xs font-semibold uppercase tracking-widest mb-2">
              Total Asset Value
            </div>
            <div
              className="text-[#F1F5F9] leading-none mb-3"
              style={{ fontFamily: 'Fraunces, serif', fontSize: '4.5rem', fontWeight: 900 }}
            >
              RM
            </div>
            <div
              className="text-white leading-none"
              style={{ fontFamily: 'Fraunces, serif', fontSize: '6rem', fontWeight: 900, letterSpacing: '-0.04em' }}
            >
              {totalAssetValue.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-4 text-[#06B6D4]">
              <TrendingUp size={20} />
              <span className="text-lg font-bold">+12.4%</span>
              <span className="text-xs text-gray-400">this month</span>
            </div>
          </motion.div>

          {/* Constellation XP Map */}
          <ConstellationXPMap
            currentXp={xp}
            currentLevel={currentLevel}
            levels={levels}
          />
        </div>

        {/* CENTER COLUMN - 50% */}
        <div className="space-y-6" style={{ marginTop: '80px' }}>

          {/* Asset Voronoi Map */}
          <AssetVoronoiMap
            assets={[
              { name: 'ASB Investment', value: 10000, percentage: 80, color: '#06B6D4' },
              { name: 'Bitcoin', value: 2500, percentage: 20, color: '#F97316' }
            ]}
          />

          {/* Kinetic Subscription Stack */}
          <KineticSubscriptionStack />

          {/* Debt Snowball Heatmap */}
          <DebtSnowballHeatmap
            debt={{
              name: 'iPhone 15 Pro',
              current: 3200,
              total: 4800,
              monthlyPayment: 400
            }}
          />
        </div>

        {/* RIGHT COLUMN - 30% */}
        <div className="space-y-6" style={{ marginTop: '40px' }}>

          {/* Bento-Box AI Interface */}
          <BentoBoxAI />

          {/* Quick Stats Bento */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(6, 182, 212, 0.1)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '20px',
                padding: '20px',
              }}
            >
              <Target size={20} className="text-[#06B6D4] mb-2" />
              <div className="text-gray-400 text-xs mb-1">Goals</div>
              <div className="text-white text-2xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
                3/5
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(249, 115, 22, 0.1)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: '20px',
                padding: '20px',
              }}
            >
              <Zap size={20} className="text-[#F97316] mb-2" />
              <div className="text-gray-400 text-xs mb-1">Streak</div>
              <div className="text-white text-2xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
                28d
              </div>
            </motion.div>
          </div>

          {/* Health Score */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '24px',
              padding: '24px',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star size={20} className="text-[#10B981]" />
              <div className="text-white font-bold">Financial Health</div>
            </div>

            <div className="text-center">
              <div
                className="text-6xl font-bold text-[#10B981] mb-2"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                82%
              </div>
              <div className="text-gray-400 text-sm">Excellent Standing</div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-xs text-gray-400 leading-relaxed">
                You spent 15% less on Food than last month. Keep up the great work!
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vertical Action Dock - Far Right */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '16px 12px',
        }}
      >
        <div className="flex flex-col gap-4">
          <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-[#06B6D4] text-white flex items-center justify-center"
                title="Add Account"
              >
                <Wallet size={20} />
              </motion.button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl bg-[#0D1435] border-white/10">
              <DialogHeader><DialogTitle className="text-white">Add New Account</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Account Name" value={newAccName} onChange={e => setNewAccName(e.target.value)} className="bg-white/5 border-white/10 text-white" />
                <Select value={newAccType} onValueChange={(v: any) => setNewAccType(v)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent className="bg-[#0D1435] border-white/10">
                    <SelectItem value="Bank">Bank Account</SelectItem>
                    <SelectItem value="Wallet">Wallet</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="number" placeholder="Initial Balance (RM)" value={newAccBalance} onChange={e => setNewAccBalance(e.target.value)} className="bg-white/5 border-white/10 text-white" />
                <Button onClick={handleAddAccount} className="w-full bg-[#06B6D4] hover:bg-[#0891B2]">Create Account</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-[#F97316] text-white flex items-center justify-center"
                title="Add Expense"
              >
                <TrendingDown size={20} />
              </motion.button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl bg-[#0D1435] border-white/10">
              <DialogHeader><DialogTitle className="text-white">Record Expense</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <Input type="number" placeholder="Amount (RM)" value={newExpAmount} onChange={e => setNewExpAmount(e.target.value)} className="bg-white/5 border-white/10 text-white text-lg font-bold" />
                <Select value={newExpAccId} onValueChange={setNewExpAccId}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Select Account" /></SelectTrigger>
                  <SelectContent className="bg-[#0D1435] border-white/10">{accounts.map(acc => <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>)}</SelectContent>
                </Select>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map(cat => <Button key={cat} variant={newExpCategory === cat ? 'default' : 'outline'} size="sm" onClick={() => setNewExpCategory(cat)} className="text-xs bg-white/5 border-white/10 text-white hover:bg-[#06B6D4]">{cat}</Button>)}
                </div>
                <Input placeholder="Description" value={newExpDesc} onChange={e => setNewExpDesc(e.target.value)} className="bg-white/5 border-white/10 text-white" />
                <Button onClick={handleAddExpense} className="w-full bg-[#F97316] hover:bg-[#EA580C]">Save</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddSubOpen} onOpenChange={setIsAddSubOpen}>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center"
                title="Add Subscription"
              >
                <RefreshCcw size={20} />
              </motion.button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl bg-[#0D1435] border-white/10">
              <DialogHeader><DialogTitle className="text-white">Track Subscription</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Subscription Name (e.g. Netflix)" value={newSubName} onChange={e => setNewSubName(e.target.value)} className="bg-white/5 border-white/10 text-white" />
                <Input type="number" placeholder="Monthly Amount (RM)" value={newSubAmount} onChange={e => setNewSubAmount(e.target.value)} className="bg-white/5 border-white/10 text-white" />
                <Select value={newSubAccId} onValueChange={setNewSubAccId}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Deduct from Bank" /></SelectTrigger>
                  <SelectContent className="bg-[#0D1435] border-white/10">{accounts.map(acc => <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>)}</SelectContent>
                </Select>
                <Input type="number" placeholder="Billing Day (1-31)" value={newSubDate} onChange={e => setNewSubDate(e.target.value)} className="bg-white/5 border-white/10 text-white" />
                <Button onClick={handleAddSub} className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">Add Subscription</Button>
              </div>
            </DialogContent>
          </Dialog>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center backdrop-blur-xl"
            title="More Actions"
          >
            <Plus size={20} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
