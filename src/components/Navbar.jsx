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
} from 'lucide-react';
import ExerciseDropdown from './ExerciseDropdown';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, isAuthenticated, logout } = useAuth();
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

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Workouts', path: '/workout', icon: Dumbbell },
    { name: 'Diet Plan', path: '/diet-plan', icon: Apple },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Body Focus', path: '/tutorials', icon: Sparkles },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const displayName = currentUser?.name || 'Athlete';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <Activity size={22} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 dark:from-white dark:via-slate-100 dark:to-emerald-400 bg-clip-text text-transparent tracking-tight">
                  FitFlow
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium -mt-1 tracking-wide">
                Smart Fitness Coach
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 shadow-sm shadow-emerald-500/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70'
                  }`}
                >
                  <Icon size={16} className={active ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* AI Exercise Dropdown */}
            <ExerciseDropdown />
          </div>

          {/* Right Action / Theme Toggle, Streak & Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun size={19} className="text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon size={19} className="text-slate-600 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Streak Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-xs">
              <Flame size={15} className="text-amber-500 fill-amber-500 animate-pulse" />
              <span>{currentUser?.streakDays || 15} Days</span>
            </div>

            {/* Profile or Sign In Button */}
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all ${
                    location.pathname === '/profile'
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-extrabold text-xs shadow-xs border border-emerald-400/40">
                    {currentUser.avatar || avatarUrl ? (
                      <img
                        src={currentUser.avatar || avatarUrl}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{initial}</span>
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 z-10" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden lg:inline max-w-[90px] truncate">
                    {displayName}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  title="Sign Out"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  aria-label="Log Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm shadow-emerald-500/20 transition-all"
              >
                <LogIn size={14} />
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

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800/40">
              <Flame size={14} className="text-amber-500 fill-amber-500" />
              <span>{currentUser?.streakDays || 15}d</span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                  active
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={18} className={active ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'} />
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
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
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
              className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 text-white transition-colors text-left mt-2"
            >
              <LogIn size={18} />
              <span>Sign In / Create Profile</span>
            </Link>
          )}

          <ExerciseDropdown mobile onItemClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

