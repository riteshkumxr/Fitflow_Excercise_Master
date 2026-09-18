import React from 'react';
import {
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  Flame,
  HelpCircle,
  Clock,
  Award,
  ArrowRight,
  Gift,
  CheckCircle2,
  Crown,
  Star,
} from 'lucide-react';
import { useTokens, PLANS } from '../context/TokenContext';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const {
    openPaymentModal,
    tokens,
    plan,
    isUnlimited,
    claimDailyTrialBonus,
    isDailyClaimAvailable,
  } = useTokens();

  const { currentUser } = useAuth();
  const dailyAvailable = isDailyClaimAvailable();

  const handleClaim = () => {
    const res = claimDailyTrialBonus();
    if (res.success) {
      alert(res.message);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-xs">
            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            <span>FitFlow Token Store & Membership Plans</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Train Smarter with{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              FitFlow AI Tokens
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Every athlete begins with <strong>50 Free Trial Tokens</strong>. Need more? Top up your wallet anytime or unlock unlimited VIP access with zero commitments.
          </p>

          {/* Current User Token Status Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Active Wallet:
            </span>
            <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold border border-indigo-300/30 flex items-center gap-1.5">
              <Zap size={13} className="text-indigo-600 fill-indigo-600" />
              {isUnlimited ? 'Unlimited VIP' : `${tokens} Tokens Available`}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Tier: <strong className="text-indigo-600 dark:text-indigo-400">{plan}</strong>
            </span>

            {dailyAvailable && (
              <button
                onClick={handleClaim}
                className="ml-2 inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                title="Claim daily streak bonus"
              >
                <Gift size={13} />
                <span>Claim +5 Free Daily Bonus</span>
              </button>
            )}
          </div>
        </div>

        {/* Free Trial Highlight Box */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                  ✓ Always 100% Free to Try
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Start with 50 Free Trial Tokens
              </h3>
              <p className="text-xs sm:text-sm text-indigo-200/80 max-w-xl">
                Test our AI Pose Tracking, ask the AI Fitness Coach anything, and generate custom diet blueprints. Plus, earn <strong>+5 Free Tokens every single day</strong> you stay active!
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-2">
              <button
                onClick={() => openPaymentModal('starter')}
                className="py-3 px-6 rounded-2xl bg-white text-indigo-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>View Token Packs</span>
                <ArrowRight size={16} />
              </button>
              <span className="text-[10px] text-indigo-300/70">
                Instant UPI & Card Checkout
              </span>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {PLANS.map((p) => {
            const isStarter = p.id === 'starter';
            const isPro = p.id === 'pro';
            const isVip = p.id === 'vip';

            return (
              <div
                key={p.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border-2 ${
                  isStarter
                    ? 'border-emerald-400/80 dark:border-emerald-600/70 shadow-lg shadow-emerald-500/10 hover:border-emerald-500 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/25 dark:via-slate-900 dark:to-slate-900'
                    : isPro
                    ? 'border-indigo-600 shadow-xl shadow-indigo-500/15 scale-100 md:-translate-y-2 bg-gradient-to-b from-indigo-50/40 via-white to-white dark:from-indigo-950/25 dark:via-slate-900 dark:to-slate-900'
                    : /* Unlimited VIP Elite (Most Expensive Membership) */
                      'border-amber-400 dark:border-amber-500 shadow-2xl shadow-amber-500/30 ring-2 ring-amber-400/50 scale-100 md:-translate-y-3 bg-gradient-to-b from-amber-50/80 via-yellow-50/20 to-white dark:from-amber-950/45 dark:via-yellow-950/15 dark:to-slate-900'
                }`}
              >
                {/* Badge */}
                {p.badge && (
                  <span
                    className={`absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 ${
                      isStarter
                        ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white'
                        : isPro
                        ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white'
                        : /* VIP Elite Badge */
                          'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30 ring-1 ring-yellow-200/60'
                    }`}
                  >
                    {isVip && <Crown size={11} className="fill-slate-950" />}
                    {isStarter && <Zap size={11} className="fill-white" />}
                    {isPro && <Flame size={11} className="fill-white" />}
                    {p.badge}
                  </span>
                )}

                <div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {isStarter && <Zap size={18} className="text-emerald-500 fill-emerald-500" />}
                      {isPro && <Flame size={18} className="text-indigo-500 fill-indigo-500" />}
                      {isVip && <Crown size={20} className="text-amber-500 fill-amber-500 animate-pulse" />}
                      <h3 className={`text-xl font-extrabold ${
                        isStarter
                          ? 'text-emerald-950 dark:text-emerald-200'
                          : isPro
                          ? 'text-indigo-950 dark:text-indigo-200'
                          : 'text-amber-950 dark:text-amber-200 font-black'
                      }`}>
                        {p.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">
                      {p.description}
                    </p>
                  </div>

                  <div className="my-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-black ${
                        isStarter
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : isPro
                          ? 'text-indigo-700 dark:text-indigo-300'
                          : 'text-amber-600 dark:text-amber-400 font-black'
                      }`}>
                        ₹{p.priceInr}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {p.isUnlimited ? '/ month' : `(approx. $${p.priceUsd})`}
                      </span>
                    </div>

                    {p.bonusTokens ? (
                      <span className="inline-block mt-2 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-xs font-bold border border-orange-200/80">
                        🎁 Includes +{p.bonusTokens} Free Bonus Tokens
                      </span>
                    ) : isVip ? (
                      <span className="inline-block mt-2 px-2.5 py-1 rounded-lg bg-amber-100/70 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black border border-amber-300/80">
                        👑 Zero Limits • Unlimited AI & Vision 30 Days
                      </span>
                    ) : (
                      <span className="inline-block mt-2 text-xs font-semibold text-slate-500">
                        One-time payment • No auto-renewal
                      </span>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      What's Included:
                    </p>
                    {p.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        {isVip ? (
                          <Crown size={15} className="text-amber-500 fill-amber-500/20 shrink-0 mt-0.5" />
                        ) : isStarter ? (
                          <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                        )}
                        <span className={isVip ? 'font-medium' : ''}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => openPaymentModal(p)}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isStarter
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/20'
                      : isPro
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/25'
                      : /* VIP Elite CTA */
                        'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-slate-950 font-black shadow-amber-500/35 ring-2 ring-yellow-200/60'
                  }`}
                >
                  {isVip ? <Crown size={17} className="fill-slate-950" /> : <Zap size={16} />}
                  <span>{p.isUnlimited ? 'Get Unlimited VIP Elite Access' : `Buy ${p.tokens} Tokens`}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Token Usage Breakdown Guide */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              How Tokens are Consumed
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clear, transparent pricing with no hidden charges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-800/40 text-center space-y-1">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                1 Token
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                AI Fitness Coach Query
              </p>
              <p className="text-[11px] text-slate-500">
                Ask about food calories, macros, exercise form, or biomechanics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200/50 dark:border-violet-800/40 text-center space-y-1">
              <span className="text-2xl font-black text-violet-600 dark:text-violet-400">
                2 Tokens
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                AI Pose-Tracking Session
              </p>
              <p className="text-[11px] text-slate-500">
                Live camera angle tracking, automated rep counting, and depth feedback.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40 text-center space-y-1">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                3 Tokens
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                AI Meal Plan Generation
              </p>
              <p className="text-[11px] text-slate-500">
                Full 7-day personalized calorie and macronutrient schedule.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-6 pt-4">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Got questions about tokens or payments? We've got answers.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How does the Free Trial work?',
                a: 'Every new athlete immediately receives 50 free tokens. You can use these tokens across the AI Coach, pose-tracking workouts, or diet planning. Additionally, you can claim +5 free tokens every day you log in!',
              },
              {
                q: 'Do purchased tokens expire?',
                a: 'Tokens in the Pro Athlete Pack and Starter Booster do not expire as long as your account remains active. You can use them at your own pace.',
              },
              {
                q: 'Which payment methods are supported?',
                a: 'We support all major Indian and international payment gateways: UPI (Google Pay, PhonePe, Paytm, CRED), Credit & Debit Cards (Visa, Mastercard, RuPay), Net Banking (HDFC, ICICI, SBI, Axis), and mobile wallets.',
              },
              {
                q: 'Can I get a tax invoice / payment receipt?',
                a: 'Yes! Upon completing any transaction, you receive an official GST tax invoice with an Order ID and Transaction Reference number that you can download or print directly.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5 shadow-xs"
              >
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle size={15} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Guarantee Seal */}
        <div className="text-center pt-4 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>256-Bit SSL Encrypted • RBI & PCI-DSS Level 1 Compliant • 100% Satisfaction Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
