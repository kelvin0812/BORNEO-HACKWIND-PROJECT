import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Bot, User, BarChart2, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: React.ReactNode;
  timestamp: Date;
}

export const Coach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      content: 'I want to buy new shoes that cost RM400. Is it a good idea?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate AI typing delay
    if (messages.length === 1) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: '2',
            sender: 'ai',
            content: <AIResponseCard />,
            timestamp: new Date(),
          },
        ]);
      }, 1500);
    }
  }, [messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        content: inputValue,
        timestamp: new Date(),
      },
    ]);
    setInputValue('');
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#F3F4F6] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white px-4 sm:px-6 py-4 shadow-sm z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A]">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-900">Finance Coach</h1>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-6 space-y-4 sm:space-y-6 pb-24">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex max-w-[90%] sm:max-w-[85%] items-end gap-2 ${
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
                  className={`rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-md text-sm ${
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
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-20 left-0 w-full bg-white px-3 sm:px-4 py-3 shadow-lg border-t border-gray-100">
        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 sm:px-4 py-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none min-w-0"
          />
          <button className="text-gray-400 hover:text-[#1E3A8A] active:scale-95 transition-transform touch-manipulation">
            <Mic size={20} />
          </button>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#1E3A8A] text-white shadow-md disabled:opacity-50 transition-all hover:scale-105 active:scale-95 touch-manipulation"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AIResponseCard = () => {
  return (
    <div className="w-full min-w-[280px]">
      <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
        <BarChart2 size={16} className="text-[#F97316]" />
        <span className="text-xs font-bold uppercase text-gray-500">Spending Ratio Analysis</span>
      </div>

      <div className="mb-4">
        <div className="mb-1 flex justify-between text-xs font-medium">
          <span className="text-gray-600">Purchase Cost</span>
          <span className="text-[#F97316]">50% of Allowance</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-[#F97316]"
          />
        </div>
        <div className="mt-1 text-right text-[10px] text-gray-400">RM 400 / RM 800</div>
      </div>

      <div className="rounded-xl bg-orange-50 p-3">
        <div className="flex gap-2">
          <AlertCircle size={16} className="shrink-0 text-[#F97316] mt-0.5" />
          <p className="text-xs leading-relaxed text-gray-700">
            <span className="font-bold text-[#F97316]">Warning:</span> Your savings are currently below the recommended 3-month emergency fund.
          </p>
        </div>
        <div className="mt-3 border-t border-orange-100 pt-2">
          <p className="text-xs font-medium text-gray-800">Suggestion:</p>
          <p className="text-xs text-gray-600">Wait 2 months, or check out these cheaper alternatives.</p>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
          Set Savings Goal
        </Button>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500">
          Dismiss
        </Button>
      </div>
    </div>
  );
};