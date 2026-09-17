import React, { useState, useRef, useEffect } from 'react';
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
} from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Hey Ritesh! I'm your FitFlow AI Fitness Coach. I can analyze your exercise form, calculate your calories, customize your 75kg → 72kg diet plan, or guide your desk breaks. What's on your workout agenda today?",
    timestamp: 'Just now',
  },
];

const SUGGESTED_PROMPTS = [
  'How do I perfect my Squat form?',
  'What should my daily macros be for 75kg to 72kg?',
  'Give me an Upper Body workout routine',
  'Quick 3-minute desk posture exercises',
  'How does AI pose tracking work?',
];

function generateAIResponse(userText) {
  const q = userText.toLowerCase();

  if (q.includes('squat')) {
    return "🏋️ **Squats Form Checklist for Ritesh:**\n\n1. **Stance:** Feet shoulder-width apart, toes turned slightly outward (15° to 30°).\n2. **Hips & Knees:** Break at hips and knees simultaneously. Push knees outward in line with toes.\n3. **Depth:** Lower until your hip crease is below the top of your knees (parallel or deep squat).\n4. **Torso:** Keep your chest proud, spine neutral, and gaze forward.\n5. **Prescription:** 3 sets × 15 reps with controlled 2-second descent.\n\n*Tip: Use our AI Squat Trainer in the Workout tab for real-time hip-to-knee depth tracking!*";
  }

  if (q.includes('pushup') || q.includes('push up') || q.includes('chest')) {
    return "💪 **Push-Up Master Guide:**\n\n1. **Hand Placement:** Slightly wider than shoulder-width, fingers spread.\n2. **Elbow Angle:** Keep elbows tucked at 45° to your torso (avoid flaring them into a 'T' shape).\n3. **Core & Glutes:** Keep your body in a rigid plank from head to heels.\n4. **Full Range:** Lower until chest is 2-3 inches from ground, then push up to full extension.\n5. **Prescription:** 3 sets × 12 reps.\n\n*Tip: Launch our AI Pushups module to track elbow flexion angles in real time!*";
  }

  if (q.includes('diet') || q.includes('macro') || q.includes('calorie') || q.includes('75') || q.includes('72') || q.includes('food') || q.includes('weight')) {
    return "🥗 **Personalized Nutrition Strategy for Ritesh (75 kg → 72 kg Target):**\n\n• **Daily Calorie Target:** ~1,850 kcal (creates a safe, sustainable ~350 kcal deficit from your 2,200 kcal maintenance).\n• **Protein Target:** 140g - 150g per day (approx. 1.9g per kg of bodyweight to preserve lean muscle).\n• **Carbohydrates:** ~180g (complex carbs: oats, brown rice, sweet potatoes).\n• **Healthy Fats:** ~50g - 55g (avocado, nuts, olive oil).\n• **Hydration:** Aim for 3.0L to 3.5L of water daily.\n\n*Tip: Check your daily macro progress on the FitFlow Diet Plan tab!*";
  }

  if (q.includes('pullup') || q.includes('pull up') || q.includes('back')) {
    return "🧗 **Pull-Up Form Protocol:**\n\n1. **Grip:** Overhand grip slightly wider than shoulders.\n2. **Initiation:** Engage your scapulae (depress shoulders down and back) before pulling with your arms.\n3. **Apex:** Pull elbows down toward your ribs until chin cleanly clears the bar.\n4. **Descent:** Lower with control into a full dead hang to maximize lat stretch.\n5. **Target:** 3 sets of 6-8 reps.";
  }

  if (q.includes('bicep') || q.includes('curl') || q.includes('arm')) {
    return "🔥 **Bicep Curls Precision Guide:**\n\n1. **Elbows Pinned:** Glue your elbows to the sides of your ribcage. Do NOT let them drift forward.\n2. **No Momentum:** Avoid swinging your hips or arching your lower back.\n3. **Cadence:** 1 second explosive curl up, 1 second squeeze at peak contraction, 3 seconds slow eccentric descent.\n4. **Target:** 3 sets × 12-15 reps.";
  }

  if (q.includes('lunge') || q.includes('lunges') || q.includes('leg')) {
    return "🦵 **Walking Lunges Blueprint:**\n\n1. **Step Distance:** Take an ample step forward so both front and back knees bend to ~90°.\n2. **Knee Alignment:** Front knee should stay centered over your ankle, not shooting far past your toes.\n3. **Torso:** Keep your torso upright and tall to activate glutes and quads.\n4. **Prescription:** 3 sets × 12 reps per leg.";
  }

  if (q.includes('desk') || q.includes('sitting') || q.includes('neck') || q.includes('posture') || q.includes('pain')) {
    return "🧘 **3-Minute Ergonomic Desk Relief Session:**\n\n1. **Postural Chin Tucks (10 reps):** Draw your chin straight backward without tilting head, holding for 3 seconds.\n2. **Seated Spinal Twist (30s per side):** Hand on opposite knee, gently rotate torso while breathing deeply.\n3. **Seated Desk Curls & Wrist Flexion (1 min):** Rotate wrists and squeeze shoulder blades back.\n4. **Standing Calf Raises (15 reps):** Stand up to reactivate circulation in lower limbs.\n\n*Tip: Head to AI Exercises → Desk Breaks for guided interactive timers!*";
  }

  if (q.includes('ai') || q.includes('camera') || q.includes('pose') || q.includes('movenet') || q.includes('track')) {
    return "🤖 **How FitFlow AI Pose Detection Works:**\n\n1. **Computer Vision:** Runs TensorFlow.js MoveNet SinglePose Lightning locally inside your browser.\n2. **Keypoint Tracking:** Tracks 17 anatomical keypoints (shoulders, elbows, wrists, hips, knees, ankles) at 30+ FPS.\n3. **Biomechanical Analysis:** Computes trigonometric joint angles in real time to verify full depth and rep completion.\n4. **100% Private:** Camera frames are processed on your device GPU via WebGL; nothing is ever recorded or uploaded.\n\n*Tip: Stand 6-8 feet away from your camera with good lighting for best results!*";
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return "Hello Ritesh! Great to see you. You are currently on an active 15-day workout streak with 1,540 points. What would you like to work on today? Try asking about squats form, pushups, your 75kg diet plan, or desk breaks!";
  }

  return "Great question, Ritesh! To support your fitness progression (current: 75 kg, goal: 72 kg):\n\n1. **Form First:** Use our AI Pose Trainers to ensure full range of motion without compensating.\n2. **Progressive Overload:** Increase reps or resistance each week.\n3. **Recovery & Nutrition:** Maintain your 1,850 kcal target with 140g+ protein for muscle recovery.\n\nFeel free to ask me specifically about any exercise (Squats, Pushups, Curls, Lunges), nutrition goals, or posture corrections!";
}

export default function FitFlowAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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
      const replyText = generateAIResponse(text);
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
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 text-white shadow-2xl shadow-emerald-950/30 hover:scale-105 active:scale-95 transition-all duration-200 border border-emerald-500/40 group cursor-pointer"
          aria-label="Open FitFlow AI Assistant"
        >
          <div className="relative">
            <Bot size={20} className="text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-xs font-bold tracking-wide">FitFlow AI</span>
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/30 text-[10px] text-emerald-300 font-semibold border border-emerald-400/30">
            Online
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full sm:max-w-[480px] h-[85vh] sm:h-[620px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 sm:border-slate-300">
            {/* Modal Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white flex items-center justify-between shrink-0 border-b border-emerald-900/40">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/30">
                  <Bot size={20} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-extrabold tracking-tight">FitFlow AI Coach</h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Ritesh Pro
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Instant Biomechanics & Nutrition Advice
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
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
              <Sparkles size={13} className="text-emerald-600 shrink-0" />
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-xs font-medium border border-slate-200/80 transition-colors shadow-2xs cursor-pointer"
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
                      <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                        <Bot size={14} />
                      </div>
                    )}
                    <div
                      className={"max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs " +
                        (isBot
                          ? "bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm"
                          : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-sm shadow-emerald-600/10")}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      <div className={"mt-1.5 text-[10px] text-right " + (isBot ? "text-slate-400" : "text-emerald-100")}>
                        {msg.timestamp}
                      </div>
                    </div>
                    {!isBot && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs font-bold text-xs">
                        R
                      </div>
                    )}
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-1">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-1.5 border border-slate-200/80 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
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
                  className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white disabled:text-slate-400 transition-colors shadow-sm disabled:shadow-none cursor-pointer"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Shield size={11} className="text-emerald-600" />
                  Local AI Engine • Active 24/7
                </span>
                <span>Powered by FitFlow AI</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}