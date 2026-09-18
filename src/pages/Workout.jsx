import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Dumbbell,
  Flame,
  Camera,
  Play,
  ArrowUpRight,
  Laptop,
  CheckCircle2,
  Info,
  Layers,
  Zap,
} from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL || '/';
const getAsset = (file) => `${BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`}${file.replace(/^\//, '')}`;

const Workout = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const workouts = [
    {
      id: 'squats',
      name: 'Squats Trainer',
      category: 'lower',
      gif: getAsset('squat.gif'),
      difficulty: 'Beginner',
      muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
      calories: '12-15 kcal/min',
      targetReps: '3 sets × 15 reps',
      path: '/lower-body/squats',
      aiFeatures: 'Hip-to-knee depth tracking & posture check',
      color: 'from-indigo-500 to-violet-500',
    },
    {
      id: 'pushup',
      name: 'Pushups Trainer',
      category: 'upper',
      gif: getAsset('pushup.gif'),
      difficulty: 'Intermediate',
      muscles: ['Pectorals', 'Triceps', 'Core'],
      calories: '10-14 kcal/min',
      targetReps: '3 sets × 12 reps',
      path: '/upper-body/pushup',
      aiFeatures: 'Elbow angle flexion & full chest depth',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'bicep-curls',
      name: 'Bicep Curls',
      category: 'upper',
      gif: getAsset('bicep.gif'),
      difficulty: 'Beginner',
      muscles: ['Biceps Brachii', 'Forearms'],
      calories: '8-10 kcal/min',
      targetReps: '3 sets × 15 reps',
      path: '/upper-body/bicep-curls',
      aiFeatures: 'Arm curl angle & eccentric speed tracker',
      color: 'from-violet-500 to-indigo-500',
    },
    {
      id: 'lunges',
      name: 'Walking Lunges',
      category: 'lower',
      gif: getAsset('lunges.gif'),
      difficulty: 'Intermediate',
      muscles: ['Quads', 'Hamstrings', 'Calves'],
      calories: '12-16 kcal/min',
      targetReps: '3 sets × 12 reps/leg',
      path: '/lower-body/lunges',
      aiFeatures: '90-degree knee flexion & torso balance',
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'shoulder-press',
      name: 'Overhead Shoulder Press',
      category: 'upper',
      gif: getAsset('shoulder.gif'),
      difficulty: 'Intermediate',
      muscles: ['Deltoids', 'Trapezius', 'Triceps'],
      calories: '9-12 kcal/min',
      targetReps: '3 sets × 12 reps',
      path: '/upper-body/shoulder-press',
      aiFeatures: 'Overhead lockout detection & symmetry',
      color: 'from-rose-500 to-pink-500',
    },
    {
      id: 'front-raises',
      name: 'Front Dumbbell Raises',
      category: 'upper',
      gif: getAsset('front.gif'),
      difficulty: 'Beginner',
      muscles: ['Anterior Deltoid', 'Serratus Anterior'],
      calories: '7-10 kcal/min',
      targetReps: '3 sets × 12 reps',
      path: '/upper-body/front-raises',
      aiFeatures: 'Shoulder height elevation limit checking',
      color: 'from-cyan-500 to-indigo-500',
    },
    {
      id: 'pullup',
      name: 'Pullups Trainer',
      category: 'upper',
      gif: getAsset('pullup.gif'),
      difficulty: 'Advanced',
      muscles: ['Latissimus Dorsi', 'Biceps', 'Upper Back'],
      calories: '14-18 kcal/min',
      targetReps: '3 sets × 8 reps',
      path: '/upper-body/pullup',
      aiFeatures: 'Chin-over-bar height & dead hang extension',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'highknees',
      name: 'High Knees Cardio',
      category: 'lower',
      gif: getAsset('highknees.gif'),
      difficulty: 'Intermediate',
      muscles: ['Hip Flexors', 'Quads', 'Cardio Core'],
      calories: '15-20 kcal/min',
      targetReps: '4 sets × 30 sec',
      path: '/lower-body/highknees',
      aiFeatures: 'Hip-height knee lift tracking & rhythm count',
      color: 'from-indigo-500 to-violet-600',
    },
    {
      id: 'morning',
      name: 'Good Morning Posture Trainer',
      category: 'lower',
      gif: getAsset('goodmorning.gif'),
      difficulty: 'Intermediate',
      muscles: ['Lower Back', 'Glutes', 'Hamstrings'],
      calories: '10-14 kcal/min',
      targetReps: '3 sets × 12 reps',
      path: '/lower-body/morning',
      aiFeatures: 'Hip hinge depth & neutral spine posture check',
      color: 'from-amber-500 to-emerald-500',
    },
    {
      id: 'diamond-pushup',
      name: 'Diamond Pushups Tricep Focus',
      category: 'upper',
      gif: getAsset('diamond_pushup.gif'),
      difficulty: 'Advanced',
      muscles: ['Triceps Brachii', 'Pectorals', 'Core'],
      calories: '12-16 kcal/min',
      targetReps: '3 sets × 10 reps',
      path: '/upper-body/pushup',
      aiFeatures: 'Narrow base elbow flexion & chest lockout',
      color: 'from-indigo-600 to-cyan-500',
    },
    {
      id: 'military-press',
      name: 'Strict Overhead Lockouts',
      category: 'upper',
      gif: getAsset('military_press.gif'),
      difficulty: 'Advanced',
      muscles: ['Anterior Deltoids', 'Trapezius', 'Core'],
      calories: '11-15 kcal/min',
      targetReps: '3 sets × 10 reps',
      path: '/upper-body/shoulder-press',
      aiFeatures: 'Vertical overhead alignment & lumbar stability',
      color: 'from-purple-600 to-pink-500',
    },
    {
      id: 'power-lunges',
      name: 'Dynamic Power Lunges',
      category: 'lower',
      gif: getAsset('power_lunges.gif'),
      difficulty: 'Intermediate',
      muscles: ['Gluteus Maximus', 'Quadriceps', 'Calf Complex'],
      calories: '14-18 kcal/min',
      targetReps: '3 sets × 14 reps',
      path: '/lower-body/lunges',
      aiFeatures: 'Stance width stability & knee impact cushioning',
      color: 'from-rose-500 to-amber-500',
    },
    {
      id: 'hammer-curls',
      name: 'Neutral Grip Hammer Curls',
      category: 'upper',
      gif: getAsset('hammer_curls.gif'),
      difficulty: 'Beginner',
      muscles: ['Brachialis', 'Brachioradialis', 'Forearms'],
      calories: '8-11 kcal/min',
      targetReps: '3 sets × 12 reps',
      path: '/upper-body/bicep-curls',
      aiFeatures: 'Neutral wrist angle & elbow pinpoint stabilization',
      color: 'from-blue-600 to-violet-500',
    },
    {
      id: 'wide-pullups',
      name: 'Wide-Grip Lat Pullups',
      category: 'upper',
      gif: getAsset('wide_pullups.gif'),
      difficulty: 'Advanced',
      muscles: ['Latissimus Dorsi', 'Teres Major', 'Rhomboids'],
      calories: '15-20 kcal/min',
      targetReps: '3 sets × 8 reps',
      path: '/upper-body/pullup',
      aiFeatures: 'Scapular retraction & chin bar clearance tracker',
      color: 'from-cyan-600 to-indigo-600',
    },
    {
      id: 'lateral-raises',
      name: 'Deltoid Lateral Raises',
      category: 'upper',
      gif: getAsset('lateral_raises.gif'),
      difficulty: 'Beginner',
      muscles: ['Lateral Deltoids', 'Supraspinatus', 'Trapezius'],
      calories: '7-10 kcal/min',
      targetReps: '3 sets × 15 reps',
      path: '/upper-body/front-raises',
      aiFeatures: '90-degree arm elevation symmetry & tempo tracking',
      color: 'from-teal-500 to-blue-500',
    },
    {
      id: 'desk-knee',
      name: 'Seated Knee Raises',
      category: 'desk',
      gif: getAsset('desk_knee.gif'),
      difficulty: 'All Levels',
      muscles: ['Lower Abs', 'Hip Flexors'],
      calories: '4-6 kcal/min',
      targetReps: '2 sets × 20 reps',
      path: '/desk/knee',
      aiFeatures: 'Seated posture validation & core engagement',
      color: 'from-amber-400 to-amber-600',
    },
    {
      id: 'desk-curls',
      name: 'Desk Arm Curls',
      category: 'desk',
      gif: getAsset('desk_curls.gif'),
      difficulty: 'All Levels',
      muscles: ['Biceps', 'Forearms', 'Wrist Flexors'],
      calories: '3-5 kcal/min',
      targetReps: '2 sets × 15 reps',
      path: '/desk/curls',
      aiFeatures: 'Ergonomic posture & range of motion check',
      color: 'from-teal-400 to-teal-600',
    },
    {
      id: 'desk-hand',
      name: 'Seated Hand Raises',
      category: 'desk',
      gif: getAsset('desk_hand.gif'),
      difficulty: 'All Levels',
      muscles: ['Upper Back', 'Shoulders', 'Neck Relief'],
      calories: '3-5 kcal/min',
      targetReps: '2 sets × 15 reps',
      path: '/desk/hand',
      aiFeatures: 'Shoulder mobility & spinal extension monitoring',
      color: 'from-blue-400 to-indigo-600',
    },
    {
      id: 'desk-posture',
      name: 'Desk Posture Alignment & Stretch',
      category: 'desk',
      gif: getAsset('desk_posture.gif'),
      difficulty: 'All Levels',
      muscles: ['Cervical Spine', 'Upper Traps', 'Chest Opener'],
      calories: '3-5 kcal/min',
      targetReps: '3 rounds × 30 sec',
      path: '/desk/hand',
      aiFeatures: 'Shoulder roll angle & cervical alignment monitor',
      color: 'from-emerald-400 to-teal-600',
    },
    {
      id: 'desk-mobility',
      name: 'Desk Wrist & Forearm Release',
      category: 'desk',
      gif: getAsset('desk_mobility.gif'),
      difficulty: 'All Levels',
      muscles: ['Forearms', 'Carpal Tunnel Relief', 'Wrists'],
      calories: '3-5 kcal/min',
      targetReps: '2 sets × 20 reps',
      path: '/desk/curls',
      aiFeatures: 'Wrist flexion-extension cadence & ergonomic check',
      color: 'from-sky-400 to-indigo-500',
    },
  ];

  const filteredWorkouts =
    activeCategory === 'all'
      ? workouts
      : workouts.filter((w) => w.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-6 md:p-8 text-white shadow-xl shadow-slate-900/10 mb-8">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-sm border border-indigo-500/30">
              <Camera size={13} className="text-indigo-400" />
              Computer Vision & AI Pose Guidance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Workout Command Center
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Position your camera, step into the frame, and let real-time AI computer vision count your repetitions, analyze joint angles, and guide your form.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Workouts', count: workouts.length, icon: Layers },
          { id: 'upper', label: 'Upper Body', count: workouts.filter((w) => w.category === 'upper').length, icon: Dumbbell },
          { id: 'lower', label: 'Lower Body', count: workouts.filter((w) => w.category === 'lower').length, icon: Flame },
          { id: 'desk', label: 'Desk & Posture Breaks', count: workouts.filter((w) => w.category === 'desk').length, icon: Laptop },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-500/25'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  active ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredWorkouts.map((workout) => (
          <div
            key={workout.id}
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Media Preview / GIF Container */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
                {workout.gif ? (
                  <>
                    <img
                      src={workout.gif}
                      alt={workout.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div
                      style={{ display: 'none' }}
                      className="w-full h-full flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-indigo-300 p-6 text-center"
                    >
                      <Dumbbell size={36} className="text-indigo-400 mb-2 animate-bounce" />
                      <span className="text-xs font-bold text-white tracking-wide">{workout.name}</span>
                      <span className="text-[10px] text-indigo-300/80 mt-1">AI Pose Tracker Ready</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                    <Laptop size={36} className="text-indigo-400 mb-2" />
                    <span className="text-xs text-slate-300 font-medium">
                      Desk-Friendly Mobility Break
                    </span>
                  </div>
                )}

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-bold backdrop-blur-md border border-white/10 flex items-center gap-1">
                    <Sparkles size={12} className="text-indigo-400" />
                    AI Vision
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-indigo-600/90 text-white text-[11px] font-bold backdrop-blur-md">
                    {workout.difficulty}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-medium backdrop-blur-md">
                    {workout.calories}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {workout.name}
                </h3>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {workout.targetReps}
                </p>

                {/* AI Feature Pill */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <Info size={15} className="text-indigo-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight">
                    {workout.aiFeatures}
                  </span>
                </div>

                {/* Target Muscle Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {workout.muscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-medium"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-6 pt-0">
              <Link
                to={workout.path}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 dark:bg-slate-800 dark:hover:from-indigo-600 dark:hover:to-violet-600 text-white text-xs font-bold transition-all shadow-sm group-hover:shadow-md cursor-pointer"
              >
                <Play size={14} className="fill-white" />
                <span>Launch AI Pose Trainer</span>
                <ArrowUpRight size={14} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Camera Guidance Box */}
      <div className="rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-800/40 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-center">
            <Camera size={18} />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            How AI Pose Detection Works
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-800 dark:text-slate-200 font-bold mb-0.5">
                1. Step Back 6-8 Feet
              </strong>
              Ensure your full body (head to ankles) is clearly in the frame with good room lighting.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-800 dark:text-slate-200 font-bold mb-0.5">
                2. Real-Time Tracking
              </strong>
              TensorFlow MoveNet maps 17 skeletal joint coordinates 30 times per second directly in your browser.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-800 dark:text-slate-200 font-bold mb-0.5">
                3. Automatic Rep Counting
              </strong>
              Listen for audio cues and visual meters as you hit full depth and lock out each repetition.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;