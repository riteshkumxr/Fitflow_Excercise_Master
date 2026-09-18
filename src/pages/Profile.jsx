import React, { useState } from 'react';
import {
  Activity,
  Award,
  Calendar,
  Heart,
  Medal,
  Phone,
  Shield,
  Star,
  User,
  Users,
  CheckCircle2,
  Scale,
  Zap,
  Flame,
  Sparkles,
  ChevronRight,
  Clock,
  FileText,
  TrendingUp,
  Camera,
  Upload,
  Trash2,
  LogIn,
  LogOut,
  UserPlus,
  CreditCard,
  Receipt,
  Gift,
  Sun,
  Moon,
  Crown,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTokens, PLANS } from '../context/TokenContext';
import { useTheme } from '../context/ThemeContext';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, logout, updateProfile, switchBackToRitesh } = useAuth();
  const {
    tokens,
    plan,
    isUnlimited,
    transactions,
    openPaymentModal,
    claimDailyTrialBonus,
    isDailyClaimAvailable,
    activatePlan,
  } = useTokens();
  const fileInputRef = React.useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(() => {
    return currentUser?.avatar || localStorage.getItem('fitflow_user_avatar') || null;
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WEBP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        try {
          localStorage.setItem('fitflow_user_avatar', compressedDataUrl);
          setAvatarUrl(compressedDataUrl);
          updateProfile({ avatar: compressedDataUrl });
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3500);
          window.dispatchEvent(new Event('fitflow-avatar-updated'));
          window.dispatchEvent(new Event('storage'));
        } catch (err) {
          console.error('Failed to save avatar to localStorage:', err);
          alert('Image could not be saved to local storage.');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    localStorage.removeItem('fitflow_user_avatar');
    setAvatarUrl(null);
    updateProfile({ avatar: null });
    window.dispatchEvent(new Event('fitflow-avatar-updated'));
    window.dispatchEvent(new Event('storage'));
  };

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto text-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-200/60 dark:border-indigo-800/60 shadow-sm">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            No Active Profile Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            You are currently not logged in. Sign in to your account or create a new profile to track your workouts, streaks, and personal fitness vitals.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-md shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition-all"
            >
              Sign In to Your Account
            </Link>
            <Link
              to="/signup"
              className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-colors border border-slate-200/60 dark:border-slate-700"
            >
              Create New Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeUser = currentUser;

  const userData = {
    name: activeUser.name || 'Athlete',
    userId: activeUser.userId || 'athlete',
    email: activeUser.email || `${activeUser.userId || 'athlete'}@fitflow.ai`,
    age: activeUser.age || 23,
    weight: activeUser.weight || '75 kg',
    targetWeight: activeUser.targetWeight || '72 kg',
    height: activeUser.height || '175 cm',
    bmi: activeUser.bmi || '24.5',
    role: activeUser.role || 'Fitness Athlete & Member',
    department: activeUser.department || 'Technology & Engineering',
    company: activeUser.company || 'FitFlow Pro',
    joinedDate: activeUser.joinedDate || 'January 2024',
    points: activeUser.points || 1540,
    rank: activeUser.rank || 3,
    streakDays: activeUser.streakDays || 15,
    goal: activeUser.goal || 'Weight Loss & Lean Muscle',
    badges: [
      {
        id: 1,
        name: 'Early Bird',
        description: 'Completed 10 morning workouts before 8 AM',
        icon: <Star className="text-amber-500" />,
      },
      {
        id: 2,
        name: 'Team Player',
        description: 'Participated in 5 group fitness challenges',
        icon: <Users className="text-blue-500" />,
      },
      {
        id: 3,
        name: 'Consistency King',
        description: 'Maintained a 15-day active workout streak',
        icon: <Award className="text-purple-500" />,
      },
      {
        id: 4,
        name: 'Form Master',
        description: 'Achieved 95%+ pose accuracy in 20 AI sessions',
        icon: <Zap className="text-indigo-500" />,
      },
      {
        id: 5,
        name: 'Century Club',
        description: 'Completed over 100 cumulative exercise reps',
        icon: <Flame className="text-rose-500" />,
      },
    ],
    insurance: {
      provider: 'HealthPlus Wellness',
      policyNumber: 'HP-98421034',
      expiryDate: 'December 31, 2026',
      type: 'Comprehensive Pro',
      coverageType: 'Inpatient, Outpatient & Physical Rehab',
      premium: 'Premium Diamond',
      status: 'Active',
    },
    upcomingConsultations: [
      {
        id: 1,
        doctor: 'Dr. Sarah Miller',
        specialty: 'Sports Nutrition',
        date: 'March 25, 2026',
        time: '10:00 AM',
        location: 'Virtual Telehealth',
      },
      {
        id: 2,
        doctor: 'Dr. James Wilson',
        specialty: 'Physical Therapy & Posture',
        date: 'April 4, 2026',
        time: '2:30 PM',
        location: 'Wellness Center Suite 4B',
      },
    ],
  };

  // Sample leaderboard data
  const leaderboardData = [
    { id: 1, name: 'Mark Williams', department: 'Engineering', points: 1850, rank: 1 },
    { id: 2, name: 'Sarah Chen', department: 'Product', points: 1720, rank: 2 },
    { id: 3, name: userData.name || 'You', department: userData.department || 'Technology & Engineering', points: userData.points || 1540, rank: 3, isCurrentUser: true },
    { id: 4, name: 'Emma Thompson', department: 'HR', points: 1380, rank: 4 },
    { id: 5, name: 'David Kim', department: 'Finance', points: 1120, rank: 5 },
    { id: 6, name: 'Olivia Martinez', department: 'Customer Support', points: 980, rank: 6 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Header with profile summary and custom athlete logo */}
      <div className={`text-white shadow-xl transition-all duration-300 ${
        isUnlimited
          ? 'bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 border-b-2 border-amber-500/50 shadow-amber-500/10'
          : plan === 'Starter Booster'
          ? 'bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 border-b-2 border-emerald-500/40 shadow-emerald-500/10'
          : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 border-b-2 border-indigo-500/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center">
              {/* Profile Avatar / Emblem with Photo Upload */}
              <div className="relative group shrink-0">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* Avatar Display Container */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-indigo-500/25 border-2 border-indigo-400/50 transform group-hover:scale-105 transition-transform duration-300 bg-slate-900"
                  title="Click to upload/change your profile picture"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    /* Dynamic Athlete Monogram Emblem */
                    <div className="w-full h-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex flex-col items-center justify-center text-white">
                      <div className="flex items-center gap-0.5 -mb-1">
                        <Sparkles size={13} className="text-amber-300 fill-amber-300" />
                      </div>
                      <span className="text-3xl sm:text-4xl font-black tracking-tighter drop-shadow-md">
                        {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-1.5 py-0.2 rounded-full bg-slate-900/40 text-indigo-100">
                        {userData.userId === 'ritesh' ? 'PRO' : 'MEMBER'}
                      </span>
                    </div>
                  )}

                  {/* Hover Camera Overlay */}
                  <div className="absolute inset-0 bg-slate-950/65 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-xs">
                    <Camera size={22} className="text-indigo-300" />
                    <span className="text-[10px] font-bold mt-1 text-slate-100">
                      {avatarUrl ? 'Change' : 'Upload'}
                    </span>
                  </div>
                </div>

                {/* Verification Checkmark Badge */}
                <div
                  className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-1.5 shadow-md border-2 border-slate-900 z-10"
                  title="Verified FitFlow Athlete"
                >
                  <CheckCircle2 size={14} className="stroke-[3]" />
                </div>
              </div>

              {/* Profile Details */}
              <div className="ml-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {userData.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold flex items-center gap-1">
                    <Sparkles size={11} className="text-indigo-400" />
                    {userData.userId === 'ritesh' ? 'PRO Athlete' : 'FitFlow Member'}
                  </span>

                  {/* Account Actions */}
                  <div className="flex flex-wrap items-center gap-2 ml-1">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold transition-colors cursor-pointer"
                      title="Upload or change profile picture"
                    >
                      <Camera size={13} />
                      <span>{avatarUrl ? 'Change Photo' : 'Upload Photo'}</span>
                    </button>
                    {avatarUrl && (
                      <button
                        onClick={handleRemoveAvatar}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
                        title="Reset back to default emblem"
                      >
                        <Trash2 size={12} />
                        <span>Reset</span>
                      </button>
                    )}
                    {currentUser?.userId !== 'ritesh' && (
                      <button
                        onClick={switchBackToRitesh}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-semibold transition-colors cursor-pointer"
                        title="Switch active profile back to Ritesh"
                      >
                        <Sparkles size={12} className="text-amber-400" />
                        <span>Switch to Ritesh</span>
                      </button>
                    )}
                    <button
                      onClick={toggleTheme}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                      {isDark ? (
                        <>
                          <Sun size={13} className="text-amber-400 fill-amber-400" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon size={13} className="text-indigo-200 fill-indigo-200/20" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-xs font-semibold transition-colors"
                      title="Login with another account or create a new profile"
                    >
                      <LogIn size={12} />
                      <span>Switch Account</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        navigate('/login');
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-200 text-xs font-semibold transition-colors cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut size={12} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

                {uploadSuccess && (
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-400/30 animate-pulse">
                    <CheckCircle2 size={12} />
                    <span>Profile photo uploaded and synced with Navbar!</span>
                  </div>
                )}

                <p className="text-slate-300 text-sm mt-0.5">
                  {userData.role} • {userData.company}
                </p>

                {/* Key Vitals Strip */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/10">
                    Age: <strong className="text-indigo-400 font-bold">{userData.age}</strong> yrs
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/10">
                    Weight: <strong className="text-cyan-400 font-bold">{userData.weight}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/10">
                    Height: <strong className="text-white font-bold">{userData.height}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/10">
                    BMI: <strong className="text-indigo-300 font-bold">{userData.bmi}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Header Badges: Rank & Streak */}
            <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-start">
              <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-sm border border-white/10 flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-xs">
                  <Flame size={22} className="fill-white" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-300 font-medium">Daily Streak</p>
                  <p className="text-xl font-extrabold text-white">{userData.streakDays} Days</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-sm border border-white/10 flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-xs">
                  <Medal size={22} />
                </div>
                <div>
                  <p className="text-[11px] text-slate-300 font-medium">Global Rank</p>
                  <p className="text-xl font-extrabold text-white">#{userData.rank}</p>
                </div>
              </div>

              <div
                onClick={() => openPaymentModal()}
                className={`rounded-2xl p-3.5 backdrop-blur-sm border flex items-center gap-3 cursor-pointer transition-all ${
                  isUnlimited
                    ? 'bg-gradient-to-r from-amber-500/30 to-yellow-500/20 hover:from-amber-500/40 hover:to-yellow-500/30 border-amber-400/60 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/40'
                    : plan === 'Starter Booster'
                    ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/40 text-white'
                    : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
                }`}
                title={isUnlimited ? "Unlimited VIP Elite Active • Click to Manage" : "Click to view tokens & top up"}
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-xs ${
                  isUnlimited
                    ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black'
                    : plan === 'Starter Booster'
                    ? 'bg-gradient-to-tr from-emerald-400 to-teal-500'
                    : 'bg-gradient-to-tr from-cyan-400 to-indigo-500'
                }`}>
                  {isUnlimited ? <Crown size={22} className="text-slate-950 fill-slate-950" /> : <Zap size={22} className="fill-white" />}
                </div>
                <div>
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${isUnlimited ? 'text-amber-200' : 'text-slate-300'}`}>
                    {isUnlimited ? 'Active Tier' : 'AI Tokens'}
                  </p>
                  <p className={`text-xl font-black ${isUnlimited ? 'text-amber-300 flex items-center gap-1' : 'text-white'}`}>
                    {isUnlimited ? 'VIP Elite 👑' : `${tokens}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto py-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'tokens', label: 'Tokens & Billing' },
              { id: 'badges', label: 'Badges & Achievements' },
              { id: 'consult', label: 'Doctor Consultations' },
              { id: 'insurance', label: 'Health Insurance' },
              { id: 'leaderboard', label: 'Leaderboard' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {/* Vitals & Profile Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Scale size={18} className="text-indigo-500" />
                Physical Vitals & Stats
              </h2>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-2 text-sm">
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Athlete Name:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{userData.name}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Age:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{userData.age} Years</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Current Weight:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{userData.weight}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Target Weight:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{userData.targetWeight}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Height:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{userData.height}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Body Mass Index (BMI):</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{userData.bmi} (Normal)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Total Fitness Points:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{userData.points} pts</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Company / Group:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{userData.company}</span>
                </div>
              </div>
            </div>

            {/* Recent Badges */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award size={18} className="text-amber-500" />
                  Earned Badges
                </h2>
                <button
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  onClick={() => setActiveTab('badges')}
                >
                  View All ({userData.badges.length})
                </button>
              </div>
              <div className="space-y-3">
                {userData.badges.slice(0, 3).map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60"
                  >
                    <div className="h-10 w-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shadow-xs">
                      {badge.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">{badge.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Consultations */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar size={18} className="text-blue-500" />
                  Health Consultations
                </h2>
                <button
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  onClick={() => setActiveTab('consult')}
                >
                  Schedule
                </button>
              </div>
              <div className="space-y-3">
                {userData.upcomingConsultations.map((consult) => (
                  <div
                    key={consult.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {consult.doctor}
                      </span>
                      <span className="text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                        {consult.specialty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <Clock size={13} />
                      <span>{consult.date} • {consult.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme & Display Appearance Setting */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs md:col-span-2 lg:col-span-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    {isDark ? <Moon size={22} className="text-indigo-400 fill-indigo-400/20" /> : <Sun size={22} className="text-amber-500 fill-amber-400" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Theme & Display Appearance</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Currently using <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">{isDark ? 'Dark Mode (High Contrast)' : 'Light Mode (Clean Bright)'}</strong>. You can toggle anytime across the entire app.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-xs ${
                      isDark
                        ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent'
                    }`}
                  >
                    {isDark ? (
                      <>
                        <Sun size={15} className="text-amber-400 fill-amber-400" />
                        <span>Switch to Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon size={15} className="text-white fill-white/20" />
                        <span>Switch to Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tokens & Billing Tab */}
        {activeTab === 'tokens' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Wallet Overview Hero */}
            <div className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden transition-all duration-300 ${
              isUnlimited
                ? 'bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 border-2 border-amber-500/60 shadow-amber-500/20'
                : plan === 'Starter Booster'
                ? 'bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/50 shadow-emerald-500/10'
                : 'bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 border-2 border-indigo-500/40 shadow-indigo-500/10'
            }`}>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
                      isUnlimited
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                        : plan === 'Starter Booster'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40'
                    }`}>
                      {isUnlimited ? <Crown size={12} className="text-amber-300 fill-amber-300" /> : <Sparkles size={12} className="text-emerald-400" />}
                      Active Tier: {plan}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold">
                      {isUnlimited ? '👑 30-Day VIP Pass Active' : 'FitFlow Wallet'}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                      Current FitFlow Token Balance
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight">
                        {isUnlimited ? 'Unlimited' : tokens}
                      </span>
                      <span className="text-sm font-semibold text-indigo-200">
                        {isUnlimited ? 'VIP Pass' : 'Tokens'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-indigo-200/80 max-w-lg leading-relaxed">
                    Tokens power your AI Fitness Coach questions (1 token), pose-tracking workouts (2 tokens), and custom diet generator (3 tokens).
                  </p>

                  {/* Daily Trial Bonus Action */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {isDailyClaimAvailable() ? (
                      <button
                        onClick={() => {
                          const res = claimDailyTrialBonus();
                          alert(res.message);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Gift size={16} />
                        <span>Claim +5 Free Daily Streak Bonus</span>
                      </button>
                    ) : (
                      <span className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        Today's +5 Free Daily Bonus Claimed
                      </span>
                    )}

                    <Link
                      to="/pricing"
                      className="text-xs text-indigo-300 hover:text-white underline font-semibold flex items-center gap-1"
                    >
                      <span>Explore all token benefits & plans</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Direct Top-Up Action Box */}
                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/15 text-center md:text-right space-y-3 shrink-0">
                  <div>
                    <p className="text-xs text-indigo-200 font-medium">Need more tokens?</p>
                    <p className="text-base font-black text-white">Starter from ₹99 • Pro for ₹299</p>
                  </div>
                  <button
                    onClick={() => openPaymentModal()}
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap size={16} className="fill-white" />
                    <span>Instant Payment Gateway</span>
                  </button>
                  <p className="text-[10px] text-slate-300">
                    UPI, Google Pay, PhonePe, Cards & Net Banking
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Purchase & Tier Switch Packs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PLANS.map((p) => {
                const isCurrent = plan === p.name;
                const isStarter = p.id === 'starter';
                const isPro = p.id === 'pro';
                const isVip = p.id === 'vip';

                return (
                  <div
                    key={p.id}
                    className={`rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                      isStarter
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : isPro
                        ? 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/20 dark:bg-indigo-950/20'
                        : 'border-amber-400 dark:border-amber-600 bg-amber-50/30 dark:bg-amber-950/25 shadow-md shadow-amber-500/10'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1.5">
                          {isVip && <Crown size={15} className="text-amber-500 fill-amber-500" />}
                          {isStarter && <Zap size={14} className="text-emerald-500 fill-emerald-500" />}
                          {isPro && <Flame size={14} className="text-indigo-500 fill-indigo-500" />}
                          <h4 className={`font-extrabold text-sm ${
                            isStarter ? 'text-emerald-900 dark:text-emerald-200' : isPro ? 'text-indigo-900 dark:text-indigo-200' : 'text-amber-900 dark:text-amber-200 font-black'
                          }`}>
                            {p.name}
                          </h4>
                        </div>
                        {isCurrent ? (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                            Active
                          </span>
                        ) : p.popular ? (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white">
                            Best Value
                          </span>
                        ) : isVip ? (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                            👑 VIP
                          </span>
                        ) : null}
                      </div>

                      <div className="flex items-baseline gap-1 my-2">
                        <span className={`text-2xl font-black ${
                          isStarter ? 'text-emerald-700 dark:text-emerald-300' : isPro ? 'text-indigo-700 dark:text-indigo-300' : 'text-amber-600 dark:text-amber-400'
                        }`}>
                          ₹{p.priceInr}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          / {p.isUnlimited ? '30 Days VIP' : `${p.tokens} Tokens`}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-4 space-y-2">
                      <button
                        onClick={() => openPaymentModal(p)}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isStarter
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-95'
                            : isPro
                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-95'
                            : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black hover:opacity-95'
                        }`}
                      >
                        {isVip ? <Crown size={13} className="fill-slate-950" /> : <Zap size={13} />}
                        <span>Pay ₹{p.priceInr} via Gateway</span>
                      </button>

                      <button
                        onClick={() => activatePlan(p.id)}
                        className="w-full py-1.5 rounded-lg text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-white/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Instant test switcher to preview this membership theme"
                      >
                        ⚡ 1-Click Instant Preview Switch
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Transaction & Billing Ledger */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Wallet Transactions & Billing Ledger
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Record of trial allotments, daily rewards, and payment receipts
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {transactions.length} Total Records
                </span>
              </div>

              {transactions.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No transactions recorded yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                        <th className="pb-3 pr-4">Date & Time</th>
                        <th className="pb-3 px-4">Description</th>
                        <th className="pb-3 px-4">Tokens</th>
                        <th className="pb-3 px-4">Amount / Fee</th>
                        <th className="pb-3 px-4">Method / Ref</th>
                        <th className="pb-3 pl-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {transactions.map((t) => {
                        const isCredit = t.type === 'CREDIT' || t.type === 'DAILY_BONUS';
                        return (
                          <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                            <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">
                              {new Date(t.date).toLocaleDateString([], {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                              {t.description}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span
                                className={`font-bold ${
                                  isCredit
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                {isCredit ? `+${t.amountTokens}` : t.amountTokens} Tokens
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                              {t.cost}
                            </td>
                            <td className="py-3 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                              {t.paymentMethod || t.id}
                            </td>
                            <td className="py-3 pl-4 text-right">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                {t.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs animate-in fade-in duration-200">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Achievements & Trophy Room</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Milestones unlocked through continuous workouts and proper pose tracking
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {userData.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all flex items-start gap-4"
                >
                  <div className="h-12 w-12 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-xs shrink-0">
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{badge.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{badge.description}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                      Unlocked
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doctor Consultations Tab */}
        {activeTab === 'consult' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Specialist Consultations</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Connect with licensed sports dietitians and physical therapists
                </p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start sm:self-auto cursor-pointer">
                + Book New Appointment
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {userData.upcomingConsultations.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-base text-slate-900 dark:text-white">{c.doctor}</span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                        Confirmed
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{c.specialty}</p>
                    <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      <p>📅 {c.date}</p>
                      <p>⏰ {c.time}</p>
                      <p>📍 {c.location}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                    <button className="flex-1 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors cursor-pointer">
                      Join Video Call
                    </button>
                    <button className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insurance Tab */}
        {activeTab === 'insurance' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs animate-in fade-in duration-200">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Corporate Health & Fitness Coverage
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Policy active and verified under {userData.company}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950 text-white shadow-lg mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold block">
                      {userData.insurance.provider}
                    </span>
                    <h3 className="text-xl font-black mt-1">
                      {userData.insurance.premium} Plan
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-bold border border-indigo-400/30">
                    {userData.insurance.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Policy Number</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {userData.insurance.policyNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Valid Until</span>
                    <span className="font-bold text-white text-sm">
                      {userData.insurance.expiryDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <p>
                  <strong className="text-slate-800 dark:text-slate-200">Coverage Includes:</strong> {userData.insurance.coverageType}
                </p>
                <p>
                  <strong className="text-slate-800 dark:text-slate-200">Fitness Reimbursement:</strong> Up to $500/year for gym memberships and wearables.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Fitness Leaderboard
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Points earned from AI pose rep completions and workout consistency
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Your Rank: #3
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {leaderboardData.map((athlete) => (
                <div
                  key={athlete.id}
                  className={`py-3.5 px-4 rounded-2xl flex items-center justify-between transition-colors ${
                    athlete.isCurrentUser
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-bold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-extrabold ${
                        athlete.rank === 1
                          ? 'bg-amber-400 text-white'
                          : athlete.rank === 2
                          ? 'bg-slate-300 text-slate-800'
                          : athlete.rank === 3
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {athlete.rank}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {athlete.name}
                        </span>
                        {athlete.isCurrentUser && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                        {athlete.department}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {athlete.points}
                    </span>
                    <span className="text-xs text-slate-400 block font-medium">pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
