import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dumbbell,
  Flame,
  Timer,
  Trophy,
  TrendingUp,
  Sparkles,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Target,
  Bot,
  X,
  Play,
  ArrowUpRight,
  Activity,
  HeartPulse,
  Zap,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDay, setSelectedDay] = useState('Wed');

  const stats = [
    {
      name: 'Workouts Completed',
      value: '24',
      change: '+3 this week',
      isPositive: true,
      icon: Dumbbell,
      color: 'from-indigo-500 to-violet-600',
      bg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
    },
    {
      name: 'Calories Burned',
      value: '9,280',
      unit: 'kcal',
      change: '+520 this week',
      isPositive: true,
      icon: Flame,
      color: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-50 text-amber-600',
    },
    {
      name: 'Active Minutes',
      value: '386',
      unit: 'min',
      change: '+42 this week',
      isPositive: true,
      icon: Timer,
      color: 'from-cyan-500 to-blue-600',
      bg: 'bg-cyan-50 text-cyan-600',
    },
    {
      name: 'Achievements',
      value: '12',
      change: '+2 this week',
      isPositive: true,
      icon: Trophy,
      color: 'from-purple-500 to-indigo-600',
      bg: 'bg-purple-50 text-purple-600',
    },
  ];

  const weeklyData = [
    { day: 'Mon', calories: 640, duration: 45, exercises: 'Pushups & Squats' },
    { day: 'Tue', calories: 420, duration: 30, exercises: 'Desk Breaks' },
    { day: 'Wed', calories: 850, duration: 55, exercises: 'Full Body HIIT' },
    { day: 'Thu', calories: 510, duration: 35, exercises: 'Bicep & Core' },
    { day: 'Fri', calories: 720, duration: 50, exercises: 'Lower Body & Lunges' },
    { day: 'Sat', calories: 910, duration: 60, exercises: 'Cardio & Strength' },
    { day: 'Sun', calories: 380, duration: 25, exercises: 'Recovery Stretch' },
  ];

  const quickLaunch = [
    {
      name: 'Squats Coach',
      category: 'Lower Body',
      reps: '15 Reps Goal',
      path: '/lower-body/squats',
      accent: 'border-l-indigo-500',
    },
    {
      name: 'Pushups Trainer',
      category: 'Upper Body',
      reps: '12 Reps Goal',
      path: '/upper-body/pushup',
      accent: 'border-l-blue-500',
    },
    {
      name: 'Bicep Curls',
      category: 'Arms Focus',
      reps: '15 Reps Goal',
      path: '/upper-body/bicep-curls',
      accent: 'border-l-teal-500',
    },
    {
      name: 'Desk Knee Raises',
      category: 'Posture & Mobility',
      reps: '20 Reps Goal',
      path: '/desk/knee',
      accent: 'border-l-amber-500',
    },
  ];

  const upcomingWorkouts = [
    {
      title: 'HIIT Session & Core Blast',
      time: 'Tomorrow, 7:00 AM',
      duration: '30 min',
      type: 'Cardio',
      status: 'Ready',
      tagColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
    },
    {
      title: 'Lower Body Mobility & Squats',
      time: 'Friday, 6:30 PM',
      duration: '45 min',
      type: 'Strength',
      status: 'Scheduled',
      tagColor: 'bg-blue-100 text-blue-800',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Full Body AI Pose Workout',
      category: 'Strength & Conditioning',
      reps: '45 reps counted',
      calories: '320 kcal',
      duration: '45 min',
      accuracy: '96% Form Score',
      time: 'Today, 8:30 AM',
      icon: Dumbbell,
    },
    {
      id: 2,
      title: 'Upper Body Bicep & Pushup Set',
      category: 'Upper Body',
      reps: '30 reps counted',
      calories: '210 kcal',
      duration: '25 min',
      accuracy: '92% Form Score',
      time: 'Yesterday, 6:15 PM',
      icon: Zap,
    },
    {
      id: 3,
      title: 'Seated Posture & Desk Mobility',
      category: 'Desk Wellness',
      reps: '20 reps counted',
      calories: '85 kcal',
      duration: '15 min',
      accuracy: '98% Form Score',
      time: '2 days ago',
      icon: Activity,
    },
    {
      id: 4,
      title: 'Lower Body Squats & Lunges',
      category: 'Legs & Core',
      reps: '50 reps counted',
      calories: '410 kcal',
      duration: '40 min',
      accuracy: '94% Form Score',
      time: '4 days ago',
      icon: Flame,
    },
  ];

  const weeklyGoals = [
    {
      title: 'Weekly Workouts',
      current: 4,
      target: 5,
      unit: 'sessions',
      percentage: 80,
      color: 'bg-indigo-500',
    },
    {
      title: 'Calorie Burn Target',
      current: '9,280',
      target: '10,000',
      unit: 'kcal',
      percentage: 92,
      color: 'bg-amber-500',
    },
    {
      title: 'Active Workout Minutes',
      current: 386,
      target: 400,
      unit: 'minutes',
      percentage: 96,
      color: 'bg-blue-500',
    },
    {
      title: 'Water Intake Goal',
      current: '2.2',
      target: '2.5',
      unit: 'liters/day',
      percentage: 88,
      color: 'bg-cyan-500',
    },
  ];

  const selectedDayData = weeklyData.find((d) => d.day === selectedDay) || weeklyData[2];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 p-6 md:p-8 text-white shadow-xl shadow-indigo-950/25 mb-8 border border-indigo-900/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-sm border border-indigo-500/30">
                <Sparkles size={13} className="text-indigo-400" />
                AI Real-Time Coach Active
              </span>
              <span className="text-xs text-slate-400">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {currentUser ? (
                <>
                  Ready to crush your goals,{' '}
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                    {currentUser.name}?
                  </span>
                </>
              ) : (
                <>
                  Ready to crush your fitness{' '}
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                    goals?
                  </span>
                </>
              )}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {currentUser ? (
                <>
                  You are on a <strong className="text-white font-bold">{currentUser.streakDays || 1}-day streak</strong>! Your form score is up 8% this week.
                </>
              ) : (
                <>
                  Experience real-time AI computer vision rep counting, joint posture correction, and intelligent workout tracking.
                </>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/workout"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:from-indigo-600 hover:to-violet-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Play size={16} className="fill-white" />
              <span>Start Workout</span>
            </Link>
            {currentUser ? (
              <Link
                to="/diet-plan"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold backdrop-blur-sm border border-white/10 transition-colors"
              >
                <span>Log Diet</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold backdrop-blur-sm border border-white/10 transition-colors"
              >
                <span>Sign In / Register</span>
              </Link>
            )}

            {/* Dedicated Hero Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold backdrop-blur-sm border border-white/20 transition-all cursor-pointer shadow-xs group"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <>
                  <Sun size={17} className="text-amber-400 fill-amber-400 group-hover:rotate-45 transition-transform" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={17} className="text-indigo-300 fill-indigo-300/20 group-hover:-rotate-12 transition-transform" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.name}
                </span>
                <div className={`p-2.5 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                  <Icon size={18} className="stroke-[2.5]" />
                </div>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    {stat.unit}
                  </span>
                )}
              </div>

              <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                <TrendingUp size={13} className="stroke-[2.5]" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: HeartPulse },
          { id: 'activities', label: 'Recent Activities', icon: Activity },
          { id: 'goals', label: 'Weekly Goals', icon: Target },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                active
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Calorie Burn SVG Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Flame size={20} className="text-amber-500 fill-amber-500" />
                    Weekly Energy Expenditure
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Total burn this week:{' '}
                    <strong className="text-slate-800 dark:text-slate-200 font-bold">4,430 kcal</strong>
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 self-start sm:self-auto">
                  Daily Avg: 632 kcal
                </span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2">
                {weeklyData.map((item) => {
                  const maxCal = 1000;
                  const heightPercent = Math.round((item.calories / maxCal) * 100);
                  const isSelected = selectedDay === item.day;

                  return (
                    <button
                      key={item.day}
                      onClick={() => setSelectedDay(item.day)}
                      className="group flex-1 flex flex-col items-center gap-2 focus:outline-none"
                    >
                      <span
                        className={`text-[11px] font-bold transition-opacity ${
                          isSelected ? 'text-indigo-600 dark:text-indigo-400 opacity-100' : 'text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        {item.calories}
                      </span>
                      <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800 rounded-xl h-36 flex items-end p-1">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-lg transition-all duration-500 ${
                            isSelected
                              ? 'bg-gradient-to-t from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/25'
                              : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400 dark:group-hover:bg-slate-600'
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          isSelected ? 'text-indigo-700 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {item.day}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Day Details Strip */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold shadow-xs">
                    {selectedDayData.day}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                      {selectedDayData.exercises}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                      {selectedDayData.duration} minutes logged
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">Burned</span>
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                      {selectedDayData.calories} kcal
                    </span>
                  </div>
                  <Link
                    to="/workout"
                    className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                  >
                    Repeat Session
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Upcoming Workouts Column */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar size={18} className="text-indigo-600 dark:text-indigo-400" />
                    Upcoming Sessions
                  </h3>
                  <Link
                    to="/workout"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {upcomingWorkouts.map((workout) => (
                    <div
                      key={workout.title}
                      className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            {workout.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {workout.time}
                          </p>
                        </div>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${workout.tagColor}`}
                        >
                          {workout.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-medium">
                          {workout.duration}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-medium">
                          {workout.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to="/workout"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
                >
                  <Play size={14} className="fill-white" />
                  Launch Pose Detector
                </Link>
              </div>
            </div>
          </div>

          {/* Quick AI Pose Launchers */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Quick AI Pose Training
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select an exercise to start camera-assisted rep counting
                </p>
              </div>
              <Link
                to="/workout"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                All 12 AI Routines
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLaunch.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 border-l-4 ${item.accent} shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between`}
                >
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.reps}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <span>Start Session</span>
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Recent Activities */}
      {activeTab === 'activities' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Workout Activity Log
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed timeline of your AI pose detection sessions
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
              4 Sessions Logged
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {act.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {act.category} • <span className="font-semibold">{act.reps}</span>
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                        {act.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-6 self-start sm:self-center">
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white block">
                        {act.calories}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{act.duration}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {act.accuracy}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Weekly Goals */}
      {activeTab === 'goals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          {weeklyGoals.map((goal) => (
            <div
              key={goal.title}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {goal.title}
                  </h4>
                  <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                    {goal.percentage}%
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Current: <strong className="text-slate-800 dark:text-slate-200">{goal.current}</strong> of{' '}
                  {goal.target} {goal.unit}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${goal.color} rounded-full transition-all duration-500`}
                    style={{ width: `${goal.percentage}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 size={14} />
                  On track for this week
                </span>
                <span>Reset in 3 days</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick-Access Floating Dark Mode Switcher on Home Page */}
      <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 animate-in fade-in duration-300">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-indigo-500/60 dark:border-indigo-400/60 shadow-xl shadow-indigo-500/20 text-slate-800 dark:text-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer group ring-2 ring-indigo-500/20"
          title={isDark ? 'Switch to Clean Light Mode' : 'Switch to High-Contrast Dark Mode'}
          aria-label="Toggle Dark Mode"
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
            isDark ? 'bg-amber-400/20 text-amber-400' : 'bg-indigo-600/20 text-indigo-600'
          }`}>
            {isDark ? (
              <Sun size={16} className="fill-amber-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={16} className="fill-indigo-600/30 group-hover:-rotate-12 transition-transform" />
            )}
          </div>
          <div className="text-left pr-1 hidden sm:block">
            <p className="text-[10px] text-slate-400 font-semibold leading-none">Appearance</p>
            <p className="text-xs font-black tracking-tight leading-tight">
              {isDark ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;