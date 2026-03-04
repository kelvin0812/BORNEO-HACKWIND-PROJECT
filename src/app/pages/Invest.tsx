import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, TrendingDown, PieChart as PieIcon, 
  Plus, ArrowUpRight, ChevronRight, Briefcase, 
  LineChart, Coins, Globe, Search, Info
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useFinance, Asset } from '../context/FinanceContext';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, PieChart, Pie, Cell, Label 
} from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const ASSET_TYPES = ['Real Estate', 'Gold', 'Stocks', 'Crypto', 'Others'];

const performanceData = [
  { month: 'Jan', value: 12000 },
  { month: 'Feb', value: 12500 },
  { month: 'Mar', value: 11800 },
  { month: 'Apr', value: 13200 },
  { month: 'May', value: 14500 },
  { month: 'Jun', value: 15120 },
];

export const Invest = () => {
  const { assets, addAsset, getTotalAssets } = useFinance();
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);

  // Form State
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<Asset['type']>('Stocks');
  const [newValue, setNewValue] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const totalAssetsValue = getTotalAssets();

  const handleAddAsset = () => {
    if (!newName || !newValue) return;
    addAsset({
      name: newName,
      type: newType,
      value: parseFloat(newValue),
      purchasePrice: parseFloat(newPrice) || parseFloat(newValue),
      dateAcquired: new Date().toISOString(),
    });
    setNewName('');
    setNewValue('');
    setNewPrice('');
    setIsAddAssetOpen(false);
  };

  const assetDistribution = ASSET_TYPES.map(type => ({
    name: type,
    value: assets.filter(a => a.type === type).reduce((sum, a) => sum + a.value, 0)
  })).filter(d => d.value > 0);

  const COLORS = ['#1E3A8A', '#10B981', '#F97316', '#8B5CF6', '#EC4899'];

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F4F6] pb-10 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-[#10B981]/5 blur-3xl" />
      
      <div className="px-4 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-[#1E3A8A]">Investment Hub</h1>
        <p className="text-sm text-gray-500">Track and grow your real assets.</p>
      </div>

      {/* Portfolio Summary */}
      <div className="px-4 mb-6">
        <Card className="p-6 bg-[#1E3A8A] text-white rounded-3xl shadow-xl shadow-blue-900/20">
          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Total Asset Value</p>
          <div className="flex items-end gap-2 mb-4">
            <h2 className="text-3xl font-bold">RM {totalAssetsValue.toLocaleString()}</h2>
            <div className="flex items-center text-green-400 text-xs font-bold mb-1">
              <TrendingUp size={14} className="mr-1" />
              +12.4%
            </div>
          </div>
          
          <div className="h-32 w-full" style={{ minHeight: '128px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={128}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                <Tooltip hide />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Distribution Chart */}
      <div className="px-4 mb-6">
        <Card className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Asset Allocation</h3>
          <div className="h-48 w-full flex items-center" style={{ minHeight: '192px' }}>
            <div className="w-1/2" style={{ height: '192px' }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={192}>
                <PieChart>
                  <Pie data={assetDistribution} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                    {assetDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2">
              {assetDistribution.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-xs font-bold text-gray-600">{d.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">{Math.round((d.value / totalAssetsValue) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Asset List & Add */}
      <div className="px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Your Assets</h3>
          <Dialog open={isAddAssetOpen} onOpenChange={setIsAddAssetOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#1E3A8A] text-white rounded-xl gap-2">
                <Plus size={16} /> Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl">
              <DialogHeader><DialogTitle>Add New Asset</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Asset Name (e.g. BTC, Apartment)" value={newName} onChange={e => setNewName(e.target.value)} />
                <Select value={newType} onValueChange={(v: any) => setNewType(v)}>
                  <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent>
                    {ASSET_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input type="number" placeholder="Current Value (RM)" value={newValue} onChange={e => setNewValue(e.target.value)} />
                <Input type="number" placeholder="Purchase Price (RM)" value={newPrice} onChange={e => setNewPrice(e.target.value)} />
                <Button onClick={handleAddAsset} className="w-full bg-[#1E3A8A]">Save Asset</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {assets.map(asset => (
            <Card key={asset.id} className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#1E3A8A]">
                  {asset.type === 'Crypto' && <Coins size={20} />}
                  {asset.type === 'Stocks' && <LineChart size={20} />}
                  {asset.type === 'Real Estate' && <Globe size={20} />}
                  {asset.type === 'Gold' && <Briefcase size={20} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{asset.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{asset.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">RM {asset.value.toLocaleString()}</p>
                <p className={`text-[10px] font-bold ${asset.value >= asset.purchasePrice ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.value >= asset.purchasePrice ? '+' : ''}
                  {Math.round(((asset.value - asset.purchasePrice) / asset.purchasePrice) * 100)}%
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Market Analysis */}
      <div className="px-4 mb-8">
        <Card className="p-5 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] text-white rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20"><LineChart size={80} /></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Search size={14} className="text-purple-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-100">AI Portfolio Analysis</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Portfolio Health: Excellent</h3>
            <p className="text-xs text-purple-100 mb-4 leading-relaxed">
              Your crypto exposure is balanced. Consider increasing <span className="underline">Real Estate Trust (REITs)</span> to hedge against inflation.
            </p>
            <Button className="bg-white text-purple-600 font-bold rounded-xl h-9 px-4 text-xs">
              Deep Dive Analysis
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};