import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, Shield, Sparkles, Instagram, Github, Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 pt-12 pb-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
                <Activity size={20} className="stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 to-emerald-700 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent">
                FitFlow
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Your real-time AI fitness coach. Track reps, perfect your form, and achieve your wellness goals anywhere.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <Sparkles size={14} className="text-emerald-500" />
              <span>AI Pose Detection Powered</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Workouts
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/lower-body/squats" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Squats Trainer
                </Link>
              </li>
              <li>
                <Link to="/upper-body/pushup" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Pushups Trainer
                </Link>
              </li>
              <li>
                <Link to="/upper-body/bicep-curls" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Bicep Curls
                </Link>
              </li>
              <li>
                <Link to="/desk/knee" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Desk Breaks
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Body Focus Guide
                </Link>
              </li>
              <li>
                <Link to="/diet-plan" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Macro & Diet Tracker
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Profile & Badges
                </Link>
              </li>
              <li>
                <a
                  href="/FitFlow_Excercise.zip"
                  download="FitFlow_Excercise.zip"
                  className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
                >
                  <span>Download Code (.zip)</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    ZIP
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Developer & Socials Watermark Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-5 rounded-3xl text-white shadow-md relative overflow-hidden border border-slate-800">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Code2 size={15} />
              <span>Developer Watermark</span>
            </div>
            <h5 className="text-base font-extrabold text-white tracking-tight mb-1">
              Ritesh
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Full Stack AI Fitness Web Application. Built with React, Tailwind CSS, & TensorFlow.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-white text-xs font-semibold border border-pink-500/30 transition-all hover:scale-105 shadow-xs"
              >
                <Instagram size={14} className="text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all hover:scale-105 shadow-xs"
              >
                <Github size={14} className="text-slate-200" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Watermark Banner */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-2 text-center md:text-left">
            <span>© {new Date().getFullYear()} FitFlow AI. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
              <Code2 size={12} className="text-emerald-600 dark:text-emerald-400" />
              Watermark: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Ritesh</strong>
            </span>
          </div>

          {/* Socials Quick Links */}
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-pink-600 transition-colors font-semibold"
            >
              <Instagram size={14} className="text-pink-500" />
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors font-semibold"
            >
              <Github size={14} className="text-slate-800 dark:text-slate-200" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <div className="flex items-center gap-1 text-slate-400">
              <span>Made with</span>
              <Heart size={13} className="text-rose-500 fill-rose-500 inline" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;