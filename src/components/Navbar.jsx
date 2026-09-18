import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Flame,
  User,
  Menu,
  X,
  LayoutDashboard,
  Dumbbell,
  Apple,
  Sparkles,
  Sun,
  Moon,
  LogIn,
  LogOut,
  Zap,
  CreditCard,
} from 'lucide-react';
import ExerciseDropdown from './ExerciseDropdown';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useTokens } from '../context/TokenContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { tokens, isUnlimited, openPaymentModal } = useTokens();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(() => {
    return localStorage.getItem('fitflow_user_avatar') || null;
  });

  useEffect(() => {
    const handleAvatarUpdate = () => {
      setAvatarUrl(localStorage.getItem('fitflow_user_avatar') || currentUser?.avatar || null);
    };

    window.addEventListener('storage', handleAvatarUpdate);
    window.addEventListener('fitflow-avatar-updated', handleAvatarUpdate);

    return () => {
      window.removeEventListener('storage', handleAvatarUpdate);
      window.removeEventListener('fitflow-avatar-updated', handleAvatarUpdate);
    };
  }, [currentUser]);

  const desktopNavItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Workouts', path: '/workout', icon: Dumbbell },
    { name: 'Diet Plan', path: '/diet-plan', icon: Apple },
    { name: 'Pricing', path: '/pricing', icon: Zap },
    { name: 'Body Focus', path: '/tutorials', icon: Sparkles },
  ];

  const mobileNavItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Workouts', path: '/workout', icon: Dumbbell },
    { name: 'Diet Plan', path: '/diet-plan', icon: Apple },
    { name: 'Pricing', path: '/pricing', icon: Zap },
    { name: 'Body Focus', path: '/tutorials', icon: Sparkles },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const displayName = currentUser?.name || 'Athlete';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16 items-center gap-2">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Activity size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg lg:text-xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-600 dark:from-white dark:via-slate-100 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
                  FitFlow
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  AI
                </span>
              </div>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium -mt-1 tracking-wide hidden xl:block">
                Smart Fitness Coach
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5 min-w-0">
            {desktopNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 shadow-sm shadow-indigo-500/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70'
                  }`}
                >
                  <Icon size={15} className={active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* AI Exercise Dropdown */}
            <ExerciseDropdown />
          </div>

          {/* Right Action / Theme Toggle, Streak & Profile */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode (Active: Dark)' : 'Switch to Dark Mode (Active: Light)'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 transition-all cursor-pointer shadow-xs shrink-0 group"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <>
                  <Sun size={15} className="text-amber-400 fill-amber-400 group-hover:rotate-45 transition-transform" />
                  <span className="text-xs font-bold text-slate-200">Light</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="text-indigo-600 fill-indigo-500/20 group-hover:-rotate-12 transition-transform" />
                  <span className="text-xs font-bold text-slate-800">Dark</span>
                </>
              )}
            </button>

            {/* Streak Badge */}
            {currentUser && (
              <div className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-xs shrink-0">
                <Flame size={14} className="text-amber-500 fill-amber-500 animate-pulse" />
                <span>{currentUser.streakDays || 1}d</span>
              </div>
            )}

            {/* Token Wallet Pill */}
            <button
              onClick={() => openPaymentModal()}
              title="FitFlow AI Tokens • Click to Top Up"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/60 dark:to-violet-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/10 transition-all cursor-pointer group shrink-0"
            >
              <Zap size={13} className="text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400 group-hover:scale-110 transition-transform" />
              <span>{isUnlimited ? 'VIP' : `${tokens}`}</span>
              <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-black group-hover:bg-indigo-500 transition-colors">
                +
              </span>
            </button>

            {/* Profile and Sign Out */}
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  to="/profile"
                  title={`View Profile: ${displayName}`}
                  className={`flex items-center gap-1.5 p-1 pr-2.5 rounded-full border transition-all shrink-0 ${
                    location.pathname === '/profile'
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white font-extrabold text-xs shadow-xs border border-indigo-400/40 shrink-0">
                    {currentUser.avatar || avatarUrl ? (
                      <img
                        src={currentUser.avatar || avatarUrl}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{initial}</span>
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 border-2 border-white dark:border-slate-900 z-10" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[85px] truncate">
                    {displayName}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  title="Sign Out"
                  className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer shrink-0"
                  aria-label="Log Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-sm shadow-indigo-500/20 transition-all shrink-0"
              >
                <LogIn size={13} />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} />}
            </button>

            {currentUser && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800/40">
                <Flame size={14} className="text-amber-500 fill-amber-500" />
                <span>{currentUser.streakDays || 1}d</span>
              </div>
            )}

            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 cursor-pointer shadow-xs shrink-0"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <>
                  <Sun size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-bold">Light</span>
                </>
              ) : (
                <>
                  <Moon size={14} className="text-indigo-600 fill-indigo-500/20" />
                  <span className="text-[11px] font-bold">Dark</span>
                </>
              )}
            </button>

            {/* Mobile Token Pill */}
            <button
              onClick={() => openPaymentModal()}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold border border-indigo-200 dark:border-indigo-800/60 cursor-pointer shrink-0"
              title="Token Wallet"
            >
              <Zap size={13} className="text-indigo-600 dark:text-indigo-400 fill-indigo-600" />
              <span>{isUnlimited ? 'VIP' : tokens}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl z-50 px-4 py-3 space-y-1 animate-in slide-in-from-top duration-200">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                  active
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={18} className={active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {isAuthenticated && currentUser ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                  location.pathname === '/profile'
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {currentUser.avatar || avatarUrl ? (
                    <img src={currentUser.avatar || avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    initial
                  )}
                </div>
                <span>My Profile ({displayName})</span>
              </Link>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                  navigate('/login');
                }}
                className="flex items-center gap-3 w-full px-3.5 py-2 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left cursor-pointer"
              >
                <LogOut size={18} />
                <span>Sign Out ({displayName})</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white transition-colors text-left mt-2"
            >
              <LogIn size={18} />
              <span>Sign In / Create Profile</span>
            </Link>
          )}

          {/* Mobile Theme Switcher Row */}
          <div className="pt-2 pb-1 border-t border-slate-200/80 dark:border-slate-800 my-1.5">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Sun size={18} className="text-amber-400 fill-amber-400" />
                ) : (
                  <Moon size={18} className="text-indigo-600 fill-indigo-500/20" />
                )}
                <div>
                  <p className="text-sm font-bold">Dark Mode</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Currently active: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{isDark ? 'Dark Theme' : 'Light Theme'}</span>
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-xs">
                {isDark ? 'Switch Light ☀️' : 'Switch Dark 🌙'}
              </span>
            </button>
          </div>

          <ExerciseDropdown mobile onItemClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

