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
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Label, 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';

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
  };

  const debtData = debts.map(d => ({ name: d.itemName, value: d.remainingAmount }));
  const COLORS = ['#F97316', '#1E3A8A', '#8B5CF6', '#EF4444', '#10B981'];

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F4F6] pb-10 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-[#F97316]/5 blur-3xl" />
      
      <div className="px-4 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-[#1E3A8A]">Debt Analyzer</h1>
        <p className="text-sm text-gray-500 font-medium">Manage and eliminate your liabilities.</p>
      </div>

      {/* Debt Summary */}
      <div className="px-4 mb-6">
        <Card className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex flex-col items-center">
          <div className="h-48 w-full" style={{ minHeight: '192px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={192}>
              <PieChart>
                <Pie data={debtData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                  {debtData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  <Label content={({ viewBox }) => {
                    const { cx, cy } = viewBox as any;
                    return (
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={cx} y={cy - 10} className="fill-red-500 text-xl font-bold">RM {totalDebtValue.toLocaleString()}</tspan>
                        <tspan x={cx} y={cy + 15} className="fill-gray-400 text-[10px] font-bold uppercase">Total Debt</tspan>
                      </text>
                    );
                  }} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Debt List */}
      <div className="px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Liabilities</h3>
          <Dialog open={isAddDebtOpen} onOpenChange={setIsAddDebtOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#1E3A8A] text-white rounded-xl gap-2 h-10 px-4 font-bold">
                <Plus size={18} /> Add Debt
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl">
              <DialogHeader><DialogTitle>New Liability</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Item Name (e.g. iPhone 15)" value={newName} onChange={e => setNewName(e.target.value)} />
                <Select value={newType} onValueChange={(v: any) => setNewType(v)}>
                  <SelectTrigger><SelectValue placeholder="Debt Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BNPL">BNPL (Buy Now Pay Later)</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Loan">Personal Loan</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="number" placeholder="Total (RM)" value={newTotal} onChange={e => setNewTotal(e.target.value)} />
                  <Input type="number" placeholder="Monthly (RM)" value={newMonthly} onChange={e => setNewMonthly(e.target.value)} />
                </div>
                <Input type="number" placeholder="Interest Rate (%)" value={newInterest} onChange={e => setNewInterest(e.target.value)} />
                <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
                <Button onClick={handleAddDebt} className="w-full bg-[#1E3A8A]">Save Debt</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {debts.map(debt => (
            <Card key={debt.id} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${debt.type === 'BNPL' ? 'bg-orange-50 text-[#F97316]' : 'bg-blue-50 text-[#1E3A8A]'}`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{debt.itemName}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{debt.type} • {debt.interestRate}% Interest</p>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-end text-xs font-bold mb-1">
                  <span className="text-gray-500 uppercase">Repayment Progress</span>
                  <span className="text-gray-900">RM {debt.remainingAmount.toLocaleString()} / RM {debt.totalAmount.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((1 - (debt.remainingAmount / debt.totalAmount)) * 100)}%` }}
                    className="h-full bg-[#1E3A8A]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase">Next Payment: {new Date(debt.dueDate).toLocaleDateString()}</span>
                </div>
                <p className="text-xs font-bold text-[#1E3A8A]">RM {debt.monthlyPayment}/mo</p>
              </div>

              <Button 
                variant="ghost" 
                className="w-full mt-3 h-8 text-[10px] font-bold text-[#1E3A8A] flex items-center justify-center gap-2 border border-transparent hover:border-[#1E3A8A]/10"
                onClick={() => updateDebt(debt.id, Math.max(0, debt.remainingAmount - debt.monthlyPayment))}
              >
                Make Monthly Payment <ArrowRight size={14} />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Debt Strategy Banner */}
      <div className="px-4">
        <Card className="p-5 bg-gradient-to-br from-[#EF4444] to-[#F97316] text-white rounded-3xl relative overflow-hidden shadow-lg shadow-orange-900/20">
          <div className="absolute top-0 right-0 p-4 opacity-20"><AlertTriangle size={80} /></div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Debt Snowball Strategy</h3>
            <p className="text-xs text-orange-50 mb-4 leading-relaxed">
              Based on your RM 4,250 balance, you could pay off your <span className="font-bold">iPhone 15 Pro</span> 4 months earlier by increasing monthly payments to RM 600.
            </p>
            <Button className="bg-white text-red-600 font-bold rounded-xl h-9 px-4 text-xs">
              Apply Strategy
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};