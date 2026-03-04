import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Bot, User, BarChart2, AlertCircle, Info, Sparkles, ChevronRight, Shield, TrendingUp, Wallet } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useFinance } from '../context/FinanceContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: React.ReactNode;
  timestamp: Date;
}

export const Coach = () => {
  const { accounts, transactions, getTotalBalance } = useFinance();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Hi! I’m FinanceLens AI, powered by Gemini 2.5. How can I help you grow your wealth today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAIResponse = (userText: string) => {
    setIsTyping(true);
    
    // Simulate complex AI processing
    setTimeout(() => {
      let response: React.ReactNode;
      const text = userText.toLowerCase();

      if (text.includes('spend') || text.includes('buy') || text.includes('cost')) {
        response = <SpendingAnalysisCard amount={400} allowance={800} />;
      } else if (text.includes('invest') || text.includes('grow')) {
        response = <InvestmentSuggestionCard />;
      } else if (text.includes('insurance') || text.includes('protect')) {
        response = <InsuranceSuggestionCard />;
      } else if (text.includes('balance') || text.includes('how much')) {
        response = `You have a total of RM ${getTotalBalance().toLocaleString()} across ${accounts.length} accounts. Your largest balance is in ${accounts[0]?.name}.`;
      } else {
        response = "That's an interesting question! Based on your current cash flow of RM 2,400/month, I suggest setting aside 20% for investments. Would you like to see some options?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          content: response,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        content: userMsg,
        timestamp: new Date(),
      },
    ]);
    setInputValue('');
    generateAIResponse(userMsg);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#F3F4F6] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 sm:px-6 py-4 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#10B981] text-white shadow-lg">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-gray-900">FinanceLens AI</h1>
              <span className="text-[8px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-bold">GEMINI 2.5</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-500 font-medium">Ready to analyze</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Info size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-32">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex max-w-[90%] items-end gap-2 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#1E3A8A] text-white'
                      : 'bg-white text-[#10B981] border border-gray-100'
                  }`}
                >
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#1E3A8A] text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start pl-10"
            >
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300 animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md px-4 py-4 border-t border-gray-100 pb-8">
        <div className="flex items-center gap-2 rounded-2xl bg-gray-100/50 px-4 py-2 border border-gray-200">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Gemini 2.5..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none min-w-0 h-10"
          />
          <button className="text-gray-400 hover:text-[#1E3A8A] transition-colors p-2">
            <Mic size={20} />
          </button>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E3A8A] text-white shadow-md shadow-[#1E3A8A]/20 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SpendingAnalysisCard = ({ amount, allowance }: { amount: number; allowance: number }) => {
  const percentage = (amount / allowance) * 100;
  return (
    <div className="w-full min-w-[260px]">
      <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
        <BarChart2 size={16} className="text-[#F97316]" />
        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Gemini Spending Insight</span>
      </div>
      <p className="mb-3 text-xs leading-relaxed text-gray-700">
        Buying these shoes would use <span className="font-bold text-[#F97316]">{percentage}%</span> of your monthly allowance.
      </p>
      <div className="mb-4">
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-[#F97316]"
          />
        </div>
        <div className="mt-1 text-right text-[10px] text-gray-400 font-bold">RM {amount} / RM {allowance}</div>
      </div>
      <div className="rounded-xl bg-orange-50 p-3 mb-4">
        <div className="flex gap-2">
          <AlertCircle size={16} className="shrink-0 text-[#F97316] mt-0.5" />
          <p className="text-xs text-gray-700">
            <span className="font-bold">Warning:</span> You're already 15% over budget in the 'Shopping' category this month.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1 h-8 text-[10px] font-bold bg-[#1E3A8A] text-white rounded-lg">Set Goal</Button>
        <Button variant="outline" className="flex-1 h-8 text-[10px] font-bold rounded-lg">Wait 30 Days</Button>
      </div>
    </div>
  );
};

const InvestmentSuggestionCard = () => (
  <div className="w-full min-w-[260px]">
    <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
      <TrendingUp size={16} className="text-[#10B981]" />
      <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Investment Strategy</span>
    </div>
    <p className="mb-4 text-xs leading-relaxed text-gray-700">
      Your current balance of RM 2,500 could earn up to <span className="font-bold text-[#10B981]">RM 105/year</span> in a High-Yield account.
    </p>
    <div className="space-y-2 mb-4">
      <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
            <TrendingUp size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold">Digital Stocks</p>
            <p className="text-[8px] text-gray-400 font-bold uppercase">Moderate Risk</p>
          </div>
        </div>
        <p className="text-[10px] font-bold text-green-600">+8.5%</p>
      </div>
    </div>
    <Button className="w-full h-8 text-[10px] font-bold bg-[#10B981] text-white rounded-lg">Learn How to Invest</Button>
  </div>
);

const InsuranceSuggestionCard = () => (
  <div className="w-full min-w-[260px]">
    <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
      <Shield size={16} className="text-[#1E3A8A]" />
      <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Protection Plan</span>
    </div>
    <p className="mb-4 text-xs leading-relaxed text-gray-700">
      We noticed you're active in sports! You're currently unprotected for accidental injuries.
    </p>
    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 mb-4">
      <div className="flex justify-between items-center mb-1">
        <p className="text-[10px] font-bold text-blue-900 uppercase">Micro-Insurance</p>
        <p className="text-[10px] font-bold text-blue-900">RM 5/mo</p>
      </div>
      <p className="text-[10px] text-blue-700">Covers up to RM 5,000 for outpatient sports injuries.</p>
    </div>
    <Button className="w-full h-8 text-[10px] font-bold bg-[#1E3A8A] text-white rounded-lg">Activate Coverage</Button>
  </div>
);
