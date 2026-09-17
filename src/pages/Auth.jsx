import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Activity,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Scale,
  Calendar,
  Ruler,
  Target,
  Flame,
  Shield,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Auth({ defaultMode = 'login' }) {
  const [searchParams] = useSearchParams();
  const queryMode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(queryMode === 'signup' || defaultMode === 'signup' ? false : true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register, switchBackToRitesh } = useAuth();

  // Login Form State
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up / New Profile State
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '24',
    weight: '70',
    height: '175',
    targetWeight: '66',
    goal: 'Weight Loss & Lean Muscle',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!loginId || !loginPassword) {
      setError('Please enter both User ID and Password.');
      setIsLoading(false);
      return;
    }

    const res = login(loginId, loginPassword);
    setIsLoading(false);

    if (res.success) {
      setSuccessMsg(`Welcome back, ${res.user.name}!`);
      setTimeout(() => navigate('/profile'), 600);
    } else {
      setError(res.error);
    }
  };

  const handleQuickLoginRitesh = () => {
    setError('');
    switchBackToRitesh();
    setSuccessMsg('Signed in as Athlete Ritesh!');
    setTimeout(() => navigate('/profile'), 400);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.name.trim() || !formData.userId.trim() || !formData.password) {
      setError('Please fill out Name, User ID, and Password.');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters long.');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    const res = register({
      name: formData.name,
      userId: formData.userId,
      email: formData.email,
      password: formData.password,
      age: formData.age,
      weight: formData.weight,
      height: formData.height,
      targetWeight: formData.targetWeight,
      goal: formData.goal,
    });

    setIsLoading(false);

    if (res.success) {
      setSuccessMsg(`Account created for ${res.user.name}! Directing to your profile...`);
      setTimeout(() => navigate('/profile'), 800);
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-200">
              <Activity size={26} className="stroke-[2.5]" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 dark:from-white dark:via-slate-100 dark:to-emerald-400 bg-clip-text text-transparent">
              FitFlow AI
            </span>
          </Link>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isLogin ? 'Welcome to your Fitness Hub' : 'Create Your Athlete Profile'}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {isLogin
              ? 'Sign in to access your workout telemetry, calories & AI coach'
              : 'Set up your ID and physical vitals to get customized AI workout plans'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 bg-slate-200/70 dark:bg-slate-900 rounded-2xl flex items-center text-xs font-bold border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              isLogin
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              !isLogin
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create New Profile
          </button>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle size={16} className="shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-pulse">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
          {isLogin ? (
            /* ================= SIGN IN FORM ================= */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  User ID or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="e.g. ritesh or your-id"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In to FitFlow'}</span>
                <ArrowRight size={16} />
              </button>

              {/* Quick Demo Login Option */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-center text-slate-400 mb-2">
                  Need to test fast?
                </p>
                <button
                  type="button"
                  onClick={handleQuickLoginRitesh}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  <Zap size={14} className="text-amber-500 fill-amber-500" />
                  <span>1-Click Sign In as Ritesh (Age 23, 75 kg)</span>
                </button>
              </div>
            </form>
          ) : (
            /* ================= SIGN UP / PROFILE CREATION FORM ================= */
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Kumar"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
                    User ID *
                  </label>
                  <input
                    type="text"
                    required
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    placeholder="e.g. alex24"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
                    Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Min 4 characters"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
                    Confirm Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>
              </div>

              {/* Physical Vitals Section */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <Sparkles size={14} />
                  <span>Physical Vitals & Target</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      min="12"
                      max="100"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs text-center font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      min="30"
                      max="250"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs text-center font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      min="100"
                      max="250"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs text-center font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Target Goal
                  </label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium outline-hidden"
                  >
                    <option value="Weight Loss & Lean Muscle">Weight Loss & Lean Muscle</option>
                    <option value="Hypertrophy & Strength">Hypertrophy & Strength</option>
                    <option value="Endurance & Stamina">Endurance & Cardio Stamina</option>
                    <option value="Posture & Desk Mobility">Posture & Desk Mobility</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isLoading ? 'Creating Profile...' : 'Complete Profile & Get Started'}</span>
                <CheckCircle2 size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <Shield size={13} className="text-emerald-500" />
          <span>Locally stored and encrypted in your browser session.</span>
        </div>
      </div>
    </div>
  );
}