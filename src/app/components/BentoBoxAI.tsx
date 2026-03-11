import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, TrendingUp, AlertCircle, Lightbulb, ArrowUpRight, Minimize2, Maximize2 } from 'lucide-react';

interface AIMessage {
  id: string;
  content: string;
  type: 'ai' | 'user';
  timestamp: Date;
}

interface Insight {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: string;
}

export const BentoBoxAI: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      content: "Your spending on subscriptions is optimal. Consider investing the extra RM 240 saved into your ASB fund for better returns.",
      type: 'ai',
      timestamp: new Date()
    },
    {
      id: '2',
      content: "Based on your current debt trajectory, you'll be debt-free in 4 months. Great progress!",
      type: 'ai',
      timestamp: new Date()
    }
  ]);

  const insights: Insight[] = [
    {
      icon: <TrendingUp size={16} className="text-[#10B981]" />,
      title: "Savings Opportunity",
      description: "You could save RM 240/mo by optimizing subscriptions",
      action: "Optimize Now"
    },
    {
      icon: <AlertCircle size={16} className="text-[#F97316]" />,
      title: "Upcoming Bills",
      description: "3 subscriptions renewing in the next 7 days",
      action: "View Calendar"
    },
    {
      icon: <Lightbulb size={16} className="text-[#06B6D4]" />,
      title: "Investment Tip",
      description: "ASB dividend payout expected next month",
      action: "Learn More"
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      type: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm analyzing your financial data. This is a demo response showing how Gemini 2.5 would provide insights based on your spending patterns and goals.",
        type: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <motion.div
      layout
      animate={{
        height: isExpanded ? '600px' : '280px',
      }}
      transition={{
        layout: { type: 'spring', damping: 25, stiffness: 200 },
        height: { type: 'spring', damping: 25, stiffness: 200 }
      }}
      style={{
        background: 'rgba(139, 92, 246, 0.08)',
        backdropFilter: 'blur(40px)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '24px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={20} className="text-[#8B5CF6]" />
          </motion.div>
          <div>
            <div className="text-white font-bold flex items-center gap-2">
              Gemini 2.5 Insights
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B5CF6]/30 text-[#A78BFA]">
                AI
              </span>
            </div>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-400"
              >
                Intelligent Financial Assistant
              </motion.div>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          {isExpanded ? <Minimize2 size={14} className="text-white" /> : <Maximize2 size={14} className="text-white" />}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Collapsed: Show insights grid
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <div className="grid grid-cols-1 gap-3 mb-4">
              {insights.slice(0, 2).map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="p-3 rounded-xl cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      {insight.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-bold mb-1">{insight.title}</div>
                      <div className="text-gray-300 text-xs leading-relaxed">{insight.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(true)}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
              }}
            >
              Ask AI Assistant <ArrowUpRight size={16} />
            </motion.button>
          </motion.div>
        ) : (
          // Expanded: Show chat interface
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col h-[calc(100%-60px)]"
          >
            {/* Bento grid of insights */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="p-2 rounded-lg cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-1">
                      {insight.icon}
                    </div>
                    <div className="text-white text-[10px] font-bold leading-tight">
                      {insight.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 custom-scrollbar">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-xl ${
                        message.type === 'user'
                          ? 'bg-[#8B5CF6] text-white'
                          : 'bg-white/10 text-gray-200 border border-white/10'
                      }`}
                    >
                      <div className="text-xs leading-relaxed">{message.content}</div>
                      {message.type === 'ai' && (
                        <div className="flex gap-2 mt-2">
                          <button className="text-[10px] px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors">
                            Helpful
                          </button>
                          <button className="text-[10px] px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors">
                            More
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {messages.length > 0 && messages[messages.length - 1].type === 'user' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-400 text-xs"
                >
                  <div className="flex gap-1">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                  AI is thinking...
                </motion.div>
              )}
            </div>

            {/* Input area */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about your finances..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="px-4 py-3 rounded-xl text-white font-bold flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
                }}
              >
                <Send size={16} />
              </motion.button>
            </div>

            {/* Quick suggestions */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {['Budget tips', 'Save more', 'Reduce debt'].map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setInputMessage(suggestion)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 whitespace-nowrap transition-colors border border-white/10"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </motion.div>
  );
};
