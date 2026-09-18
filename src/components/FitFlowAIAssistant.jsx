import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  Dumbbell,
  Apple,
  RotateCcw,
  CheckCircle2,
  Flame,
  Shield,
  MessageSquare,
  Zap,
  Gift,
} from 'lucide-react';
import { processFitnessQuery } from '../services/fitnessAIEngine';
import { useTokens } from '../context/TokenContext';

function generateAIResponse(userText, userInfo = {}) {
  return processFitnessQuery(userText, userInfo);
}

export default function FitFlowAIAssistant() {
  const { currentUser } = useAuth();
  const {
    tokens,
    isUnlimited,
    consumeTokens,
    openPaymentModal,
    claimDailyTrialBonus,
    isDailyClaimAvailable,
  } = useTokens();

  const userFirstName = currentUser?.name ? currentUser.name.trim().split(' ')[0] : 'Athlete';
  const userFullName = currentUser?.name || 'Athlete';
  const userInitial = userFirstName.charAt(0).toUpperCase() || 'A';
  const userWeight = currentUser?.weight ? (String(currentUser.weight).includes('kg') ? currentUser.weight : `${currentUser.weight} kg`) : '75 kg';
  const targetWeight = currentUser?.targetWeight ? (String(currentUser.targetWeight).includes('kg') ? currentUser.targetWeight : `${currentUser.targetWeight} kg`) : '72 kg';
  const streakDays = currentUser?.streakDays || 1;
  const points = currentUser?.points || 150;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hey ${userFirstName}! I'm your FitFlow AI Fitness Coach. I can analyze your exercise form, calculate your calories, customize your ${userWeight} → ${targetWeight} diet plan, or guide your desk breaks. What's on your workout agenda today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync greeting when logged-in user changes
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: `Hey ${userFirstName}! I'm your FitFlow AI Fitness Coach. I can analyze your exercise form, calculate your calories, customize your ${userWeight} → ${targetWeight} diet plan, or guide your desk breaks. What's on your workout agenda today?`,
        timestamp: 'Just now',
      },
    ]);
  }, [userFirstName, userWeight, targetWeight]);

  const suggestedPrompts = [
    'How many calories in 1 samosa?',
    'How do I perfect my Squat form?',
    `What should my daily macros be for ${userWeight} to ${targetWeight}?`,
    'How to lose belly fat effectively?',
    'Quick 3-minute desk posture exercises',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    // Check token balance
    if (!isUnlimited && tokens <= 0) {
      const alertMsg = {
        id: Date.now(),
        sender: 'bot',
        text: `⚠️ **Free Trial Tokens Depleted!**\n\nYou've used all your trial tokens. To keep asking questions and analyzing workout nutrition:\n\n• **Claim Daily Bonus:** Claim +5 Free Tokens if available today!\n• **Top Up Wallet:** Get 100 or 600 tokens via our instant UPI/Card payment gateway.\n\nChoose an option below to proceed:`,
        isOutOfTokens: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, alertMsg]);
      setInputValue('');
      return;
    }

    // Deduct 1 token for AI Coach query
    consumeTokens(1, 'FitFlow AI Coach Question');

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateAIResponse(text, {
        userFirstName,
        userWeight,
        targetWeight,
        streakDays,
        points,
      });
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Conversation cleared. What else can I assist you with, ${userFirstName}?`,
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white shadow-2xl shadow-indigo-950/40 hover:scale-105 active:scale-95 transition-all duration-200 border border-indigo-500/40 group cursor-pointer"
          aria-label="Open FitFlow AI Assistant"
        >
          <div className="relative">
            <Bot size={18} className="text-indigo-400 group-hover:rotate-12 transition-transform sm:w-5 sm:h-5" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
          </div>
          <span className="text-xs font-bold tracking-wide">FitFlow AI</span>
          <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/30 text-[10px] text-indigo-300 font-semibold border border-indigo-400/30">
            Online
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full sm:max-w-[480px] h-[90dvh] sm:h-[620px] max-h-[100dvh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 sm:border-slate-300">
            {/* Modal Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0 border-b border-indigo-900/40">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/30">
                  <Bot size={20} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-indigo-400 border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-extrabold tracking-tight">FitFlow AI Coach</h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {userFirstName} Pro
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    Instant Biomechanics & Nutrition Advice
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openPaymentModal()}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-[10px] font-extrabold text-indigo-200 transition-colors cursor-pointer"
                  title="Click to view plans & top up tokens"
                >
                  <Zap size={11} className="text-amber-400 fill-amber-400" />
                  <span>{isUnlimited ? 'VIP' : `${tokens} Tokens`}</span>
                </button>
                <button
                  onClick={handleResetChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Suggested Prompts Strip */}
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <Sparkles size={13} className="text-indigo-600 shrink-0" />
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 text-xs font-medium border border-slate-200/80 transition-colors shadow-2xs cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={"flex items-start gap-2.5 " + (isBot ? "justify-start" : "justify-end")}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                        <Bot size={14} />
                      </div>
                    )}
                    <div
                      className={"max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs " +
                        (isBot
                          ? "bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm"
                          : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-tr-sm shadow-indigo-600/10")}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      {msg.isOutOfTokens && (
                        <div className="mt-3 flex flex-wrap gap-2 pt-2.5 border-t border-slate-200">
                          <button
                            type="button"
                            onClick={() => openPaymentModal()}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Zap size={13} />
                            <span>Top Up Tokens / View Plans</span>
                          </button>
                          {isDailyClaimAvailable() && (
                            <button
                              type="button"
                              onClick={() => {
                                const res = claimDailyTrialBonus();
                                alert(res.message);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <Gift size={13} />
                              <span>Claim +5 Free Daily Bonus</span>
                            </button>
                          )}
                        </div>
                      )}
                      <div className={"mt-1.5 text-[10px] text-right " + (isBot ? "text-slate-400" : "text-indigo-100")}>
                        {msg.timestamp}
                      </div>
                    </div>
                    {!isBot && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs font-bold text-xs">
                        {userInitial}
                      </div>
                    )}
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-1">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-600 flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-1.5 border border-slate-200/80 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask FitFlow AI about form, calories, diet..."
                  className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-hidden"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white disabled:text-slate-400 transition-colors shadow-sm disabled:shadow-none cursor-pointer"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-medium">
                  <Zap size={11} className="text-amber-500 fill-amber-500" />
                  1 Token / query • {isUnlimited ? 'Unlimited VIP' : `${tokens} Tokens remaining`}
                </span>
                <button
                  type="button"
                  onClick={() => openPaymentModal()}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  + Top Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}