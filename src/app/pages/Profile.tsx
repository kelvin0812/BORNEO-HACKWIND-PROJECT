import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Settings, Bell, Shield, LogOut, ChevronRight, 
  CreditCard, Award, Zap, HelpCircle, FileText,
  Mail, Phone, Lock, Eye, EyeOff, Trash2, Camera,
  Smartphone, Monitor, Globe, Heart
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useFinance } from '../context/FinanceContext';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export const Profile = () => {
  const { currentLevel, xp, levels } = useFinance();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [marketing, setMarketing] = useState(true);
  
  // UI States
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form States
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@example.com');
  const [phone, setPhone] = useState('+60 12-345 6789');

  const nextLevel = levels.find(l => l.level === currentLevel.level + 1);
  const progress = nextLevel 
    ? ((xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100 
    : 100;

  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  const handleResetData = () => {
    toast.error("Data reset feature disabled for demo");
  };

  const handleUpdateProfile = () => {
    setIsEditProfileOpen(false);
    toast.success("Profile updated!");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F4F6] pb-24 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#1E3A8A]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#10B981]/5 blur-3xl" />
      
      {/* Header */}
      <div className="px-4 pt-8 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#1E3A8A]">Profile</h1>
          <p className="text-sm text-gray-500 font-medium">Your financial identity</p>
        </div>
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="rounded-xl border-gray-200 text-gray-600 font-bold">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl w-[90vw] max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-[#1E3A8A]">
                    <User size={40} />
                  </div>
                  <button className="absolute bottom-0 right-0 h-7 w-7 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center border-2 border-white">
                    <Camera size={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateProfile} className="w-full bg-[#1E3A8A] rounded-xl font-bold">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Card */}
      <div className="px-4 mb-6">
        <Card className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <Zap size={80} className="text-[#1E3A8A]" />
          </div>
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-blue-900/20 relative z-10">
            <User size={32} />
          </div>
          <div className="flex-1 relative z-10">
            <h2 className="text-lg font-bold text-gray-900">{name}</h2>
            <p className="text-xs text-gray-500 font-medium">{email}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="bg-blue-50 text-[#1E3A8A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-blue-100">
                {currentLevel.name}
              </span>
              <div className="h-1 w-1 rounded-full bg-gray-300" />
              <span className="text-[10px] font-bold text-gray-400">Lv. {currentLevel.level}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Level Progress */}
      <div className="px-4 mb-8">
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="text-sm font-bold text-gray-900">Experience Roadmap</h3>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Top 5% Users</span>
        </div>
        <Card className="p-5 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Points</p>
              <h4 className="text-2xl font-bold text-[#1E3A8A] flex items-baseline gap-1">
                {xp} <span className="text-xs text-gray-300 font-bold tracking-normal uppercase">XP</span>
              </h4>
            </div>
            {nextLevel && (
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Target</p>
                <div className="flex items-center gap-1.5 text-[#10B981] font-bold">
                  <Award size={14} />
                  <span className="text-xs">{nextLevel.name}</span>
                </div>
              </div>
            )}
          </div>
          <div className="h-4 w-full bg-gray-50 rounded-2xl overflow-hidden mb-3 border border-gray-100/50">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#10B981]"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
              {nextLevel 
                ? `${nextLevel.xp - xp} XP to next level` 
                : "Ultimate Wealth Master"}
            </p>
            <div className="h-1 w-12 bg-gray-100 rounded-full" />
          </div>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="px-4 space-y-6">
        {/* Security & Access */}
        <section>
          <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">Security & Access</h3>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <Dialog open={isSecurityOpen} onOpenChange={setIsSecurityOpen}>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 group">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Lock size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-700">Password & Security</p>
                      <p className="text-[10px] text-gray-400 font-medium">Last changed 2 months ago</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl w-[90vw] max-w-md">
                <DialogHeader><DialogTitle>Security Settings</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Min 8 characters" />
                  </div>
                  <Button className="w-full bg-[#1E3A8A] rounded-xl">Update Password</Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center">
                  <Shield size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-700">Biometric Access</p>
                  <p className="text-[10px] text-gray-400 font-medium">FaceID or Fingerprint</p>
                </div>
              </div>
              <Switch checked={biometric} onCheckedChange={setBiometric} />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Smartphone size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-700">Trusted Devices</p>
                  <p className="text-[10px] text-gray-400 font-medium">1 active device</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">Preferences</h3>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <Bell size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-700">Push Notifications</p>
                  <p className="text-[10px] text-gray-400 font-medium">Expense alerts & budget tips</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Globe size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-700">Language</p>
                  <p className="text-[10px] text-gray-400 font-medium">English (US)</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <Heart size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-700">AI Personalized Insights</p>
                  <p className="text-[10px] text-gray-400 font-medium">Based on spending habits</p>
                </div>
              </div>
              <Switch checked={marketing} onCheckedChange={setMarketing} />
            </div>
          </div>
        </section>

        {/* Support */}
        <section>
          <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">Support</h3>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center">
                  <HelpCircle size={18} />
                </div>
                <span className="text-sm font-bold text-gray-700">Help Center & FAQ</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center">
                  <FileText size={18} />
                </div>
                <span className="text-sm font-bold text-gray-700">Legal Documents</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          </div>
        </section>

        {/* Actions */}
        <section className="pt-4 space-y-3">
          <Button 
            className="w-full bg-white text-gray-700 font-bold border border-gray-100 shadow-sm hover:bg-gray-50 h-14 rounded-2xl flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={20} className="text-red-500" />
            Log Out
          </Button>
          
          <button 
            className="w-full flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest py-4"
            onClick={handleResetData}
          >
            <Trash2 size={12} />
            Delete All Account Data
          </button>
        </section>

        <div className="text-center space-y-1 pb-10">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
            FinanceLens AI v1.2.0
          </p>
          <p className="text-[10px] text-gray-300 font-medium">
            Crafted for the future of finance
          </p>
        </div>
      </div>
    </div>
  );
};
