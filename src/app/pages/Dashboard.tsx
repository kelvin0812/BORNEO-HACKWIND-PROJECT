import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Label, 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  Bell, ArrowUpRight, TrendingUp, Lock, Plus, 
  CreditCard, Wallet, Banknote, MoreHorizontal,
  ChevronRight, Shield, PieChart as PieChartIcon,
  TrendingDown, Info, Calendar, RefreshCcw, Users, Star
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useFinance, Account, CategoryType, Subscription } from '../context/FinanceContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const CATEGORIES: CategoryType[] = ['Food', 'Entertainment', 'Transport', 'Shopping', 'Health', 'Bills', 'Others'];

export const Dashboard = () => {
  const { 
    accounts, transactions, currentLevel, levels, addAccount, addTransaction, 
    getTotalBalance, xp, subscriptions, addSubscription 
  } = useFinance();

  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddSubOpen, setIsAddSubOpen] = useState(false);
  const [showAllLevels, setShowAllLevels] = useState(false);

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
  const pieData = accounts.map(acc => ({ name: acc.name, value: acc.balance, color: acc.color }));
  
  // Mock monthly conclusion
  const monthlyConclusion = {
    summary: "You spent 15% less on Food than last month! 🥗",
    savingsPotential: "RM 240",
    healthScore: 82
  };

  const socialComparison = {
    userSpend: 1200,
    averageSpend: 1450,
    percentage: 17
  };

  const handleAddAccount = () => {
    if (!newAccName || !newAccBalance) return;
    addAccount({
      name: newAccName, type: newAccType, balance: parseFloat(newAccBalance),
      color: newAccType === 'Bank' ? '#1E3A8A' : newAccType === 'Wallet' ? '#10B981' : '#F97316'
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
    <div className="flex min-h-screen w-full flex-col bg-[#F3F4F6] pb-10 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-[#1E3A8A]/5 blur-3xl" />
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-8 pb-6">
        <div>
          <h1 className="text-xl font-bold text-[#1E3A8A]">Hi, Alex! 👋</h1>
          <p className="text-sm text-gray-500 font-medium">Monthly Health: <span className="text-[#10B981] font-bold">{monthlyConclusion.healthScore}% Healthy</span></p>
        </div>
        <div className="relative rounded-full bg-white p-2 shadow-sm border border-gray-100">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </div>
      </div>

      {/* Monthly Conclusion Banner */}
      <div className="px-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#10B981]">
              <Star size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{monthlyConclusion.summary}</p>
              <p className="text-xs text-gray-500">You could save an extra {monthlyConclusion.savingsPotential} this month.</p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Level Card */}
      <div className="px-4 mb-6">
        <Card className="relative overflow-hidden bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white p-5 shadow-lg shadow-[#1E3A8A]/20 rounded-3xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-100">Progression</span>
            <span className="flex items-center gap-1 text-xs font-bold bg-white/10 px-2 py-1 rounded-full">
              <TrendingUp size={12} /> {xp} XP
            </span>
          </div>
          <div className="flex justify-between items-end mb-3">
            <div>
              <h2 className="text-xl font-bold">Level {currentLevel.level}: {currentLevel.name}</h2>
              <p className="text-xs text-blue-100 mt-1">{currentLevel.description}</p>
            </div>
            <button onClick={() => setShowAllLevels(!showAllLevels)} className="text-xs font-bold underline underline-offset-4 text-blue-100 hover:text-white">
              {showAllLevels ? "Hide Roadmap" : "View Roadmap"}
            </button>
          </div>
          <div className="relative h-2 w-full bg-blue-900/30 rounded-full overflow-hidden mb-3">
            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, (xp / currentLevel.maxXp) * 100)}%` }} transition={{ duration: 1 }} className="absolute h-full bg-[#10B981] rounded-full" />
          </div>
          <AnimatePresence>
            {showAllLevels && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 pt-4 border-t border-white/10 space-y-3">
                {levels.map((lvl) => (
                  <div key={lvl.level} className={`flex items-center gap-3 ${lvl.unlocked ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${lvl.unlocked ? 'bg-white/20' : 'bg-black/20'}`}>
                      {lvl.unlocked ? <TrendingUp size={14} /> : <Lock size={14} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">{lvl.name}</span>
                        <span className="text-[10px] uppercase font-bold">{lvl.xp} XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      {/* Social Comparison */}
      <div className="px-4 mb-8">
        <Card className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-[#1E3A8A]" />
            <h3 className="text-sm font-bold text-gray-900">Social Comparison (Age 25-30)</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase">
              <span>You</span>
              <span>Avg User</span>
            </div>
            <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="absolute h-full bg-blue-200" style={{ width: '70%' }} />
              <div className="absolute h-full bg-[#1E3A8A]" style={{ width: '55%' }} />
            </div>
            <p className="text-xs text-center text-gray-600">
              Your spending is <span className="text-[#10B981] font-bold">{socialComparison.percentage}% lower</span> than typical users in your age group! 🚀
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-8 grid grid-cols-3 gap-3">
        <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
          <DialogTrigger asChild>
            <button className="flex flex-col items-center gap-2">
              <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#1E3A8A]">
                <Plus size={24} />
              </div>
              <span className="text-[10px] font-bold text-gray-600">Add Bank</span>
            </button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader><DialogTitle>Add New Account</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Account Name" value={newAccName} onChange={e => setNewAccName(e.target.value)} />
              <Select value={newAccType} onValueChange={(v: any) => setNewAccType(v)}>
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank">Bank Account</SelectItem>
                  <SelectItem value="Wallet">Wallet</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" placeholder="Initial Balance (RM)" value={newAccBalance} onChange={e => setNewAccBalance(e.target.value)} />
              <Button onClick={handleAddAccount} className="w-full bg-[#1E3A8A]">Create Account</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
          <DialogTrigger asChild>
            <button className="flex flex-col items-center gap-2">
              <div className="h-14 w-14 rounded-2xl bg-[#1E3A8A] shadow-lg shadow-blue-900/20 flex items-center justify-center text-white">
                <TrendingDown size={24} />
              </div>
              <span className="text-[10px] font-bold text-gray-600">Expense</span>
            </button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader><DialogTitle>Record Expense</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input type="number" placeholder="Amount (RM)" value={newExpAmount} onChange={e => setNewExpAmount(e.target.value)} className="text-lg font-bold" />
              <Select value={newExpAccId} onValueChange={setNewExpAccId}>
                <SelectTrigger><SelectValue placeholder="Select Account" /></SelectTrigger>
                <SelectContent>{accounts.map(acc => <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>)}</SelectContent>
              </Select>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map(cat => <Button key={cat} variant={newExpCategory === cat ? 'default' : 'outline'} size="sm" onClick={() => setNewExpCategory(cat)} className="text-[10px]">{cat}</Button>)}
              </div>
              <Input placeholder="Description" value={newExpDesc} onChange={e => setNewExpDesc(e.target.value)} />
              <Button onClick={handleAddExpense} className="w-full bg-[#1E3A8A]">Save</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddSubOpen} onOpenChange={setIsAddSubOpen}>
          <DialogTrigger asChild>
            <button className="flex flex-col items-center gap-2">
              <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#F97316]">
                <RefreshCcw size={24} />
              </div>
              <span className="text-[10px] font-bold text-gray-600">Subscriptions</span>
            </button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader><DialogTitle>Track Subscription</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Subscription Name (e.g. Netflix)" value={newSubName} onChange={e => setNewSubName(e.target.value)} />
              <Input type="number" placeholder="Monthly Amount (RM)" value={newSubAmount} onChange={e => setNewSubAmount(e.target.value)} />
              <Select value={newSubAccId} onValueChange={setNewSubAccId}>
                <SelectTrigger><SelectValue placeholder="Deduct from Bank" /></SelectTrigger>
                <SelectContent>{accounts.map(acc => <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>)}</SelectContent>
              </Select>
              <Input type="number" placeholder="Billing Day (1-31)" value={newSubDate} onChange={e => setNewSubDate(e.target.value)} />
              <Button onClick={handleAddSub} className="w-full bg-[#F97316] text-white">Add Subscription</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subscriptions List */}
      <div className="px-4 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Auto Subscriptions</h3>
        <div className="space-y-3">
          {subscriptions.map(sub => {
            const acc = accounts.find(a => a.id === sub.accountId);
            return (
              <Card key={sub.id} className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{sub.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Auto-deduct: {acc?.name || 'Unknown'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">RM {sub.amount.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Next: Day {sub.billingDate}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Comparison & Charts */}
      <div className="px-4 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Wealth Analysis</h3>
        <Card className="p-6 bg-white shadow-xl shadow-gray-200/50 rounded-3xl">
          <div className="flex flex-col items-center">
            <div className="h-64 w-full" style={{ minHeight: '256px' }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    <Label content={({ viewBox }) => {
                      const { cx, cy } = viewBox as any;
                      return (
                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={cx} y={cy - 10} className="fill-[#1E3A8A] text-2xl font-bold">RM {totalBalance.toLocaleString()}</tspan>
                          <tspan x={cx} y={cy + 15} className="fill-gray-400 text-[10px] font-bold uppercase">Current Net</tspan>
                        </text>
                      );
                    }} />
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* SMART Goals Concept */}
      <div className="px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">SMART Goals</h3>
          <button className="text-xs font-bold text-[#1E3A8A]">New Goal</button>
        </div>
        <Card className="p-5 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold">S</div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Emergency Savings Fund</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Specific • Measurable • Achievable</p>
            </div>
          </div>
          <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className="absolute h-full bg-[#1E3A8A]" style={{ width: '42.5%' }} />
          </div>
          <div className="flex justify-between text-[10px] font-bold mb-4 text-gray-500 uppercase">
            <span>RM 4,250</span>
            <span>RM 10,000</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-2xl space-y-2">
            <div className="flex items-start gap-2">
              <Info size={12} className="text-[#1E3A8A] mt-0.5" />
              <p className="text-[10px] text-gray-600 font-medium">Goal: Save RM500/month by reducing dining expenses by 20% to reach RM10k by end of 2026.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};