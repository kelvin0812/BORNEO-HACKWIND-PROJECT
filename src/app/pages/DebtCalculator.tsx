import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { AlertTriangle, Info, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const DebtCalculator = () => {
  const [price, setPrice] = useState<number>(1200);
  const [months, setMonths] = useState<number>(6);
  const [interest, setInterest] = useState<number>(5); // 5% flat
  const income = 800; // Monthly allowance from context

  const totalInterest = price * (interest / 100);
  const totalPaid = price + totalInterest;
  const monthlyPayment = totalPaid / months;
  const isHighRisk = monthlyPayment > (income * 0.15);

  const data = [
    {
      name: 'Original Price',
      amount: price,
      color: '#1E3A8A',
    },
    {
      name: 'Total You Pay',
      amount: totalPaid,
      color: isHighRisk ? '#F97316' : '#10B981',
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F4F6] pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-[#F97316]/5 rounded-bl-full pointer-events-none" />

      {/* Header */}
      <div className="px-4 sm:px-6 pt-8 sm:pt-12 pb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A]">Debt Analyzer</h1>
        <p className="text-xs sm:text-sm text-gray-500">Calculate hidden costs before you buy.</p>
      </div>

      {/* Inputs */}
      <div className="px-4 sm:px-6 space-y-4 mb-8">
        <Input
          label="Item Price (RM)"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <div className="flex gap-3 sm:gap-4">
          <Input
            label="Months"
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
          <Input
            label="Interest %"
            type="number"
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Result Card */}
      <div className="px-4 sm:px-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Cost Breakdown</h3>
            {isHighRisk && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 sm:px-3 py-1 text-xs font-bold text-red-600"
              >
                <AlertTriangle size={14} />
                <span className="hidden xs:inline">High Risk</span>
              </motion.div>
            )}
          </div>

          <div className="h-40 sm:h-48 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" barSize={32}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  width={90}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Monthly Payment</span>
              <span className={`text-lg font-bold ${isHighRisk ? 'text-red-600' : 'text-[#1E3A8A]'}`}>
                RM {monthlyPayment.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Hidden Fees / Interest</span>
              <span className="text-[#F97316] font-medium">+ RM {totalInterest.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Learn More */}
      <div className="px-4 sm:px-6 mt-6">
        <Button variant="outline" fullWidth className="justify-between group touch-manipulation">
          <span className="flex items-center gap-2">
            <Info size={16} />
            <span className="text-sm sm:text-base">How BNPL really works</span>
          </span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};