import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccountType = 'Bank' | 'Wallet' | 'Cash' | 'Asset';
export type CategoryType = 'Food' | 'Entertainment' | 'Transport' | 'Shopping' | 'Health' | 'Bills' | 'Subscription' | 'Investment' | 'Debt' | 'Others';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  color: string;
  institution?: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  accountId: string; // Account it's deducted from
  billingDate: number; // Day of month
  category: string;
}

export interface Asset {
  id: string;
  name: string;
  value: number;
  type: 'Real Estate' | 'Gold' | 'Stocks' | 'Crypto' | 'Others';
  purchasePrice: number;
  dateAcquired: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  isSmart: boolean; // SMART concept flag
  smartDetails: {
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timebound: string;
  };
}

export interface Debt {
  id: string;
  itemName: string;
  totalAmount: number;
  remainingAmount: number;
  interestRate: number;
  monthlyPayment: number;
  type: 'BNPL' | 'Credit Card' | 'Loan';
  dueDate: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  category: CategoryType;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

export interface UserLevel {
  level: number;
  name: string;
  xp: number;
  maxXp: number;
  description: string;
  unlocked: boolean;
}

interface FinanceContextType {
  accounts: Account[];
  transactions: Transaction[];
  subscriptions: Subscription[];
  assets: Asset[];
  debts: Debt[];
  goals: Goal[];
  levels: UserLevel[];
  currentLevel: UserLevel;
  addAccount: (account: Omit<Account, 'id'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addSubscription: (sub: Omit<Subscription, 'id'>) => void;
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  updateDebt: (id: string, remaining: number) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  deleteAccount: (id: string) => void;
  getTotalBalance: () => number;
  getTotalAssets: () => number;
  getTotalDebt: () => number;
  getAccountTransactions: (accountId: string) => Transaction[];
  xp: number;
  addXp: (amount: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const INITIAL_LEVELS: UserLevel[] = [
  { level: 1, name: 'Beginner Saver', xp: 0, maxXp: 500, description: 'Just starting the journey.', unlocked: true },
  { level: 2, name: 'Smart Planner', xp: 500, maxXp: 1500, description: 'Planning for the future.', unlocked: false },
  { level: 3, name: 'Budget Master', xp: 1500, maxXp: 3000, description: 'Full control over expenses.', unlocked: false },
  { level: 4, name: 'Wealth Builder', xp: 3000, maxXp: 6000, description: 'Investing and growing.', unlocked: false },
  { level: 5, name: 'Finance Pro', xp: 6000, maxXp: 10000, description: 'Financial freedom reached.', unlocked: false },
];

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('finance_accounts');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Maybank Main', type: 'Bank', balance: 4250, color: '#1E3A8A', institution: 'Maybank' },
      { id: '2', name: 'GrabPay', type: 'Wallet', balance: 150, color: '#10B981', institution: 'Grab' },
      { id: '3', name: 'Physical Cash', type: 'Cash', balance: 80, color: '#F97316' },
    ];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : [
      { id: 't1', accountId: '1', amount: 15, category: 'Food', description: 'Nasi Lemak', date: new Date().toISOString(), type: 'expense' },
      { id: 't2', accountId: '2', amount: 12, category: 'Transport', description: 'Grab Ride', date: new Date().toISOString(), type: 'expense' },
    ];
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('finance_subscriptions');
    return saved ? JSON.parse(saved) : [
      { id: 's1', name: 'Netflix', amount: 55, accountId: '1', billingDate: 15, category: 'Entertainment' },
      { id: 's2', name: 'Spotify', amount: 15.9, accountId: '1', billingDate: 1, category: 'Entertainment' },
      { id: 's3', name: 'iCloud', amount: 3.9, accountId: '1', billingDate: 20, category: 'Bills' },
    ];
  });

  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('finance_assets');
    return saved ? JSON.parse(saved) : [
      { id: 'a1', name: 'Bitcoin', value: 2500, type: 'Crypto', purchasePrice: 2000, dateAcquired: '2025-01-01' },
      { id: 'a2', name: 'ASB Investment', value: 10000, type: 'Stocks', purchasePrice: 10000, dateAcquired: '2024-06-15' },
    ];
  });

  const [debts, setDebts] = useState<Debt[]>(() => {
    const saved = localStorage.getItem('finance_debts');
    return saved ? JSON.parse(saved) : [
      { id: 'd1', itemName: 'iPhone 15 Pro', totalAmount: 4800, remainingAmount: 3200, interestRate: 0, monthlyPayment: 400, type: 'BNPL', dueDate: '2026-03-15' },
    ];
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('finance_goals');
    return saved ? JSON.parse(saved) : [
      { 
        id: 'g1', 
        title: 'Emergency Fund', 
        targetAmount: 10000, 
        currentAmount: 4250, 
        deadline: '2026-12-31', 
        isSmart: true,
        smartDetails: {
          specific: 'Save RM10,000 for 6 months of living expenses.',
          measurable: 'Track via monthly savings contribution of RM500.',
          achievable: 'Possible by reducing dining out by 20%.',
          relevant: 'Provides financial security during emergencies.',
          timebound: 'Achieve by end of December 2026.'
        }
      },
    ];
  });

  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('finance_xp');
    return saved ? parseInt(saved) : 340;
  });

  useEffect(() => { localStorage.setItem('finance_accounts', JSON.stringify(accounts)); }, [accounts]);
  useEffect(() => { localStorage.setItem('finance_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('finance_subscriptions', JSON.stringify(subscriptions)); }, [subscriptions]);
  useEffect(() => { localStorage.setItem('finance_assets', JSON.stringify(assets)); }, [assets]);
  useEffect(() => { localStorage.setItem('finance_debts', JSON.stringify(debts)); }, [debts]);
  useEffect(() => { localStorage.setItem('finance_goals', JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem('finance_xp', xp.toString()); }, [xp]);

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount = { ...account, id: Math.random().toString(36).substr(2, 9) };
    setAccounts([...accounts, newAccount]);
    addXp(50);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Math.random().toString(36).substr(2, 9) };
    setTransactions([newTransaction, ...transactions]);
    setAccounts(prev => prev.map(acc => acc.id === transaction.accountId ? { ...acc, balance: transaction.type === 'expense' ? acc.balance - transaction.amount : acc.balance + transaction.amount } : acc));
    addXp(10);
  };

  const addSubscription = (sub: Omit<Subscription, 'id'>) => {
    const newSub = { ...sub, id: Math.random().toString(36).substr(2, 9) };
    setSubscriptions([...subscriptions, newSub]);
    addXp(30);
  };

  const addAsset = (asset: Omit<Asset, 'id'>) => {
    const newAsset = { ...asset, id: Math.random().toString(36).substr(2, 9) };
    setAssets([...assets, newAsset]);
    addXp(100);
  };

  const addDebt = (debt: Omit<Debt, 'id'>) => {
    const newDebt = { ...debt, id: Math.random().toString(36).substr(2, 9) };
    setDebts([...debts, newDebt]);
    addXp(20);
  };

  const updateDebt = (id: string, remaining: number) => {
    setDebts(prev => prev.map(d => d.id === id ? { ...d, remainingAmount: remaining } : d));
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = { ...goal, id: Math.random().toString(36).substr(2, 9) };
    setGoals([...goals, newGoal]);
    addXp(50);
  };

  const deleteAccount = (id: string) => setAccounts(accounts.filter(a => a.id !== id));
  const getTotalBalance = () => accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const getTotalAssets = () => assets.reduce((sum, asset) => sum + asset.value, 0);
  const getTotalDebt = () => debts.reduce((sum, debt) => sum + debt.remainingAmount, 0);
  const getAccountTransactions = (accountId: string) => transactions.filter(t => t.accountId === accountId);
  const addXp = (amount: number) => setXp(prev => prev + amount);

  const currentLevel = INITIAL_LEVELS.find((l, i) => {
    const nextLevel = INITIAL_LEVELS[i+1];
    return xp >= l.xp && (!nextLevel || xp < nextLevel.xp);
  }) || INITIAL_LEVELS[0];

  const levels = INITIAL_LEVELS.map(l => ({ ...l, unlocked: xp >= l.xp }));

  return (
    <FinanceContext.Provider value={{ 
      accounts, transactions, subscriptions, assets, debts, goals, levels, currentLevel, 
      addAccount, addTransaction, addSubscription, addAsset, addDebt, updateDebt, addGoal,
      deleteAccount, getTotalBalance, getTotalAssets, getTotalDebt, getAccountTransactions, xp, addXp
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within a FinanceProvider');
  return context;
};
