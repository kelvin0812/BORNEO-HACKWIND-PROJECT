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
import { ConstellationXPMap } from '../components/ConstellationXPMap';

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
    <div className="flex min-h-screen w-full flex-col bg-[#0A0E27] pb-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0D1435] to-[#0A0E27]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-8 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="text-sm text-gray-400 font-medium">Your financial identity</p>
        </div>
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="rounded-xl border-white/20 text-gray-300 font-bold hover:bg-white/10 hover:text-white">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl w-[90vw] max-w-md bg-[#0D1435] border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-cyan-500/20 flex items-center justify-center text-[#06B6D4]">
                    <User size={40} />
                  </div>
                  <button className="absolute bottom-0 right-0 h-7 w-7 bg-[#06B6D4] text-white rounded-full flex items-center justify-center border-2 border-[#0D1435]">
                    <Camera size={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Full Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateProfile} className="w-full bg-[#06B6D4] hover:bg-[#0891B2] rounded-xl font-bold">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Card */}
      <div className="relative z-10 px-6 mb-6">
        <div
          className="p-6 rounded-3xl flex items-center gap-4 relative overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
          }}
        >
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <Zap size={80} className="text-[#06B6D4]" />
          </div>
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#0891B2] flex items-center justify-center text-white shadow-lg shadow-cyan-900/20 relative z-10">
            <User size={32} />
          </div>
          <div className="flex-1 relative z-10">
            <h2 className="text-lg font-bold text-white">{name}</h2>
            <p className="text-xs text-gray-400 font-medium">{email}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="bg-cyan-500/20 text-[#06B6D4] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-cyan-500/30">
                {currentLevel.name}
              </span>
              <div className="h-1 w-1 rounded-full bg-gray-600" />
              <span className="text-[10px] font-bold text-gray-500">Lv. {currentLevel.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Constellation XP Map - Matching Home Page Style */}
      <div className="relative z-10 px-6 mb-8">
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-lg font-bold text-white">Experience Journey</h3>
          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/30">Top 5% Users</span>
        </div>
        <ConstellationXPMap
          currentXp={xp}
          currentLevel={currentLevel}
          levels={levels}
        />
      </div>

      {/* Quick Stats Bento */}
      <div className="relative z-10 px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(6, 182, 212, 0.1)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <Award size={20} className="text-[#06B6D4] mb-2" />
            <div className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Total XP</div>
            <div className="text-white text-2xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
              {xp}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <Zap size={20} className="text-[#10B981] mb-2" />
            <div className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Level</div>
            <div className="text-white text-2xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
              {currentLevel.level}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(249, 115, 22, 0.1)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <Shield size={20} className="text-[#F97316] mb-2" />
            <div className="text-gray-400 text-xs mb-1 uppercase tracking-wider">To Next</div>
            <div className="text-white text-2xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
              {nextLevel ? nextLevel.xp - xp : 0}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="relative z-10 px-6 space-y-6">
        {/* Security & Access */}
        <section>
          <h3 className="text-sm font-bold text-white mb-3 px-1">Security & Access</h3>
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
            }}
          >
            <Dialog open={isSecurityOpen} onOpenChange={setIsSecurityOpen}>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/10 group">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Lock size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-200">Password & Security</p>
                      <p className="text-[10px] text-gray-500 font-medium">Last changed 2 months ago</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-600" />
                </button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl w-[90vw] max-w-md bg-[#0D1435] border-white/10">
                <DialogHeader><DialogTitle className="text-white">Security Settings</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Current Password</Label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="bg-white/5 border-white/10 text-white" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">New Password</Label>
                    <Input type="password" placeholder="Min 8 characters" className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  </div>
                  <Button className="w-full bg-[#06B6D4] hover:bg-[#0891B2] rounded-xl">Update Password</Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/20 text-[#06B6D4] flex items-center justify-center">
                  <Shield size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-200">Biometric Access</p>
                  <p className="text-[10px] text-gray-500 font-medium">FaceID or Fingerprint</p>
                </div>
              </div>
              <Switch checked={biometric} onCheckedChange={setBiometric} />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Smartphone size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-200">Trusted Devices</p>
                  <p className="text-[10px] text-gray-500 font-medium">1 active device</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-600" />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h3 className="text-sm font-bold text-white mb-3 px-1">Preferences</h3>
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
            }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
                  <Bell size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-200">Push Notifications</p>
                  <p className="text-[10px] text-gray-500 font-medium">Expense alerts & budget tips</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Globe size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-200">Language</p>
                  <p className="text-[10px] text-gray-500 font-medium">English (US)</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-600" />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <Heart size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-200">AI Personalized Insights</p>
                  <p className="text-[10px] text-gray-500 font-medium">Based on spending habits</p>
                </div>
              </div>
              <Switch checked={marketing} onCheckedChange={setMarketing} />
            </div>
          </div>
        </section>

        {/* Support */}
        <section>
          <h3 className="text-sm font-bold text-white mb-3 px-1">Support</h3>
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
            }}
          >
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white/10 text-gray-400 flex items-center justify-center">
                  <HelpCircle size={18} />
                </div>
                <span className="text-sm font-bold text-gray-200">Help Center & FAQ</span>
              </div>
              <ChevronRight size={16} className="text-gray-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white/10 text-gray-400 flex items-center justify-center">
                  <FileText size={18} />
                </div>
                <span className="text-sm font-bold text-gray-200">Legal Documents</span>
              </div>
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          </div>
        </section>

        {/* Actions */}
        <section className="pt-4 space-y-3">
          <Button
            className="w-full bg-white/10 text-white font-bold border border-white/20 shadow-sm hover:bg-white/15 h-14 rounded-2xl flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={20} className="text-red-400" />
            Log Out
          </Button>

          <button
            className="w-full flex items-center justify-center gap-2 text-[10px] font-bold text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest py-4"
            onClick={handleResetData}
          >
            <Trash2 size={12} />
            Delete All Account Data
          </button>
        </section>

        <div className="text-center space-y-1 pb-10">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
            FinanceLens AI v1.2.0
          </p>
          <p className="text-[10px] text-gray-500 font-medium">
            Crafted for the future of finance
          </p>
        </div>
      </div>
    </div>
  );
};