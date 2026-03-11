import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, TrendingUp, DollarSign, Calendar, 
  ChevronRight, ArrowRight, Shield, CreditCard,
  Plus, Search, Info, Trash2
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useFinance, Debt } from '../context/FinanceContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

export const DebtCalculator = () => {
  const { debts, addDebt, updateDebt, getTotalDebt } = useFinance();
  const [isAddDebtOpen, setIsAddDebtOpen] = useState(false);

  // Form State
  const [newName, setNewName] = useState('');
  const [newTotal, setNewTotal] = useState('');
  const [newMonthly, setNewMonthly] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newType, setNewType] = useState<Debt['type']>('BNPL');
  const [newDate, setNewDate] = useState('');

  const totalDebtValue = getTotalDebt();

  const handleAddDebt = () => {
    if (!newName || !newTotal || !newMonthly) return;
    addDebt({
      itemName: newName,
      totalAmount: parseFloat(newTotal),
      remainingAmount: parseFloat(newTotal),
      interestRate: parseFloat(newInterest) || 0,
      monthlyPayment: parseFloat(newMonthly),
      type: newType,
      dueDate: newDate || new Date().toISOString()
    });
    setNewName(''); setNewTotal(''); setNewMonthly(''); setNewInterest(''); setIsAddDebtOpen(false);
    toast.success('Debt added successfully!');
  };

  // Find the iPhone 15 Pro debt or use first debt
  const primaryDebt = debts.find(d => d.itemName.includes('iPhone')) || debts[0];
  const debtProgress = primaryDebt ? ((primaryDebt.totalAmount - primaryDebt.remainingAmount) / primaryDebt.totalAmount) * 100 : 0;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0A0E27] pb-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0D1435] to-[#0A0E27]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EF4444]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl" />

      {/* Mobile & Web Responsive Layout */}
      <div className="relative z-10 px-6 pt-8 pb-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Debt Analyzer</h1>
            <p className="text-sm text-gray-400 font-medium">Manage and eliminate your liabilities.</p>
          </div>
          
          <Dialog open={isAddDebtOpen} onOpenChange={setIsAddDebtOpen}>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#06B6D4] hover:bg-[#0891B2] text-white rounded-2xl gap-2 h-12 px-6 font-bold flex items-center shadow-lg shadow-cyan-900/30"
              >
                <Plus size={20} /> Add Debt
              </motion.button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl bg-[#0D1435] border-white/10 w-[90vw] max-w-md">
              <DialogHeader><DialogTitle className="text-white">New Liability</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Item Name (e.g. iPhone 15)" value={newName} onChange={e => setNewName(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                <Select value={newType} onValueChange={(v: any) => setNewType(v)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Debt Type" /></SelectTrigger>
                  <SelectContent className="bg-[#0D1435] border-white/10">
                    <SelectItem value="BNPL">BNPL (Buy Now Pay Later)</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Loan">Personal Loan</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="number" placeholder="Total (RM)" value={newTotal} onChange={e => setNewTotal(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  <Input type="number" placeholder="Monthly (RM)" value={newMonthly} onChange={e => setNewMonthly(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                </div>
                <Input type="number" placeholder="Interest Rate (%)" value={newInterest} onChange={e => setNewInterest(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="bg-white/5 border-white/10 text-white" />
                <Button onClick={handleAddDebt} className="w-full bg-[#06B6D4] hover:bg-[#0891B2] rounded-xl font-bold">Save Debt</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Asymmetrical Hero Section - Large Serif Typography */}
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 mb-8">
          {/* Left: Total Debt Hero */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div
              className="p-8 rounded-3xl relative overflow-hidden"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
              }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <AlertTriangle size={120} className="text-red-500" />
              </div>
              <div className="relative z-10">
                <div className="text-[#F97316]/60 text-xs font-semibold uppercase tracking-widest mb-3">
                  Total Debt
                </div>
                <div
                  className="text-[#F1F5F9] leading-none mb-2"
                  style={{ fontFamily: 'Fraunces, serif', fontSize: '3rem', fontWeight: 900 }}
                >
                  RM
                </div>
                <div
                  className="text-white leading-none mb-6"
                  style={{ fontFamily: 'Fraunces, serif', fontSize: '4.5rem', fontWeight: 900, letterSpacing: '-0.04em' }}
                >
                  {totalDebtValue.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <TrendingUp size={18} className="text-[#10B981]" />
                  <span className="text-sm font-bold text-gray-300">On track to be debt-free</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Primary Debt Progress (iPhone 15 Pro) */}
          {primaryDebt && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div
                className="p-8 rounded-3xl relative overflow-hidden h-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-10 w-10 rounded-xl bg-orange-500/20 text-[#F97316] flex items-center justify-center">
                        <CreditCard size={20} />
                      </div>
                      <span className="text-xs font-bold text-orange-400 uppercase tracking-wider px-2 py-1 bg-orange-500/20 rounded-full border border-orange-500/30">
                        {primaryDebt.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Fraunces, serif' }}>
                      {primaryDebt.itemName}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">{primaryDebt.interestRate}% APR</p>
                  </div>
                </div>

                {/* Gradient Progress Bar - Orange to Teal */}
                <div className="mb-6">
                  <div className="flex justify-between items-end text-sm font-bold mb-3">
                    <span className="text-gray-400 uppercase text-xs tracking-wider">Repayment Progress</span>
                    <div className="text-right">
                      <div className="text-white text-xl" style={{ fontFamily: 'Fraunces, serif' }}>
                        RM {primaryDebt.remainingAmount.toLocaleString()}
                      </div>
                      <div className="text-gray-500 text-xs">of RM {primaryDebt.totalAmount.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${debtProgress}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                      className="h-full relative"
                      style={{
                        background: 'linear-gradient(90deg, #F97316 0%, #06B6D4 100%)',
                        boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)'
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          backgroundPosition: ['0% 0%', '200% 0%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                          backgroundSize: '200% 100%'
                        }}
                      />
                    </motion.div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 font-bold">{Math.round(debtProgress)}% Paid</span>
                    <span className="text-xs text-[#06B6D4] font-bold">{100 - Math.round(debtProgress)}% Remaining</span>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                    }}
                  >
                    <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Monthly Payment</div>
                    <div className="text-2xl font-bold text-[#06B6D4]" style={{ fontFamily: 'Fraunces, serif' }}>
                      RM {primaryDebt.monthlyPayment}
                    </div>
                  </div>
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Next Payment</div>
                    <div className="text-sm font-bold text-[#10B981]">
                      {new Date(primaryDebt.dueDate).toLocaleDateString('en-MY', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-[#06B6D4] hover:bg-[#0891B2] text-white rounded-xl h-12 font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30"
                  onClick={() => updateDebt(primaryDebt.id, Math.max(0, primaryDebt.remainingAmount - primaryDebt.monthlyPayment))}
                >
                  Make Payment <ArrowRight size={18} />
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Other Debts List */}
        {debts.length > 1 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4 px-1">Other Liabilities</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {debts.filter(d => d.id !== primaryDebt?.id).map((debt, index) => (
                <motion.div
                  key={debt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4 rounded-2xl overflow-hidden group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${debt.type === 'BNPL' ? 'bg-orange-500/20 text-[#F97316]' : 'bg-cyan-500/20 text-[#06B6D4]'}`}>
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{debt.itemName}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">{debt.type} • {debt.interestRate}% APR</p>
                      </div>
                    </div>
                    <button className="text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between items-end text-xs font-bold mb-1">
                      <span className="text-gray-500 uppercase">Progress</span>
                      <span className="text-gray-300">RM {debt.remainingAmount.toLocaleString()} / RM {debt.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round((1 - (debt.remainingAmount / debt.totalAmount)) * 100)}%` }}
                        className="h-full bg-gradient-to-r from-[#F97316] to-[#06B6D4]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">RM {debt.monthlyPayment}/mo</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-bold text-[#06B6D4] hover:bg-[#06B6D4]/10"
                      onClick={() => updateDebt(debt.id, Math.max(0, debt.remainingAmount - debt.monthlyPayment))}
                    >
                      Pay Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Debt Strategy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div
            className="p-6 rounded-3xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2))',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
            }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield size={100} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={20} className="text-[#F97316]" />
                <h3 className="text-lg font-bold text-white">Debt Snowball Strategy</h3>
              </div>
              <p className="text-sm text-gray-300 mb-5 leading-relaxed">
                Based on your current balance, you could eliminate your <span className="font-bold text-white">{primaryDebt?.itemName || 'primary debt'}</span> 4 months earlier by increasing monthly payments to RM {primaryDebt ? Math.ceil(primaryDebt.monthlyPayment * 1.5) : 600}.
              </p>
              <Button className="bg-white/90 hover:bg-white text-red-600 font-bold rounded-xl h-11 px-6 text-sm shadow-lg">
                Apply Strategy
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};