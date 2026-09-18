import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Bookmark,
  CheckCircle2,
  Play,
  Layers,
  Activity,
  Zap,
  ExternalLink,
  Youtube,
} from 'lucide-react';

const PersonalizedExercise = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState('stomach');
  const [savedExercises, setSavedExercises] = useState([]);

  const exercisesMapping = {
    stomach: [
      { name: 'Core Crunch', duration: '3 min', level: 'Beginner', videoId: 'dkGwcfo9zto' },
      { name: 'Standard Plank', duration: '2 min', level: 'Beginner', videoId: '0G_OI6oVzLA' },
      { name: 'Side Plank', duration: '3 min', level: 'Intermediate', videoId: 'fzLeV8X0Gb8' },
      { name: 'Russian Twists', duration: '4 min', level: 'Intermediate', videoId: '2KKNrUUwOw8' },
      { name: 'Mountain Climbers', duration: '3 min', level: 'Advanced', videoId: 'zT-9L3CEcmk' },
    ],
    chest: [
      { name: 'Standard Push-ups', duration: '4 min', level: 'Beginner', videoId: 'yQEx9OC2C3E' },
      { name: 'Dumbbell Chest Press', duration: '5 min', level: 'Intermediate', videoId: 'o7TvO377OqA' },
      { name: 'Incline Push-ups', duration: '3 min', level: 'Beginner', videoId: 'DORUKQ3zLIo' },
      { name: 'Chest Dumbbell Fly', duration: '4 min', level: 'Intermediate', videoId: 'rk8YayRoTRQ' },
      { name: 'Dumbbell Pullover', duration: '4 min', level: 'Intermediate', videoId: 'raU5C9bWo9U' },
    ],
    leg: [
      { name: 'Air Squats', duration: '4 min', level: 'Beginner', videoId: 'IfqrxS_-8oU' },
      { name: 'Bodyweight Lunges', duration: '4 min', level: 'Intermediate', videoId: 'BYe4uyGF-h4' },
      { name: 'Glute Bridges', duration: '3 min', level: 'Beginner', videoId: 'WEvLyLsV0xs' },
      { name: 'Hamstring Stretch', duration: '3 min', level: 'Beginner', videoId: 'T_l0AyZywjU' },
      { name: 'Straight Leg Raises', duration: '3 min', level: 'Beginner', videoId: 'U4L_6JEv9Jg' },
    ],
    shoulder: [
      { name: 'Overhead Shoulder Press', duration: '4 min', level: 'Intermediate', videoId: 'k6tzKisR3NY' },
      { name: 'Lateral Raises', duration: '3 min', level: 'Beginner', videoId: 'yHx8wPv4RPo' },
      { name: 'Arnold Press', duration: '4 min', level: 'Intermediate', videoId: '69z2KymlEvQ' },
      { name: 'Shoulder Circles', duration: '2 min', level: 'Beginner', videoId: 'eZXRXIJ2-hc' },
    ],
    arm: [
      { name: 'Bicep Curls', duration: '4 min', level: 'Beginner', videoId: 'ykJmrZ5v0Oo' },
      { name: 'Bench Tricep Dips', duration: '3 min', level: 'Intermediate', videoId: '89_spgcdQlw' },
      { name: 'Hammer Curls', duration: '4 min', level: 'Beginner', videoId: 'TwD-YGVP4Bk' },
      { name: 'Overhead Tricep Extension', duration: '4 min', level: 'Intermediate', videoId: 'nRiJVZDpdL0' },
    ],
    head: [
      { name: 'Gentle Neck Stretch', duration: '3 min', level: 'All Levels', videoId: 'LFdwi0VyhdE' },
      { name: 'Isometric Neck Strengthening', duration: '3 min', level: 'All Levels', videoId: '6Tr3GLfySYo' },
      { name: 'Lateral Head Tilts', duration: '2 min', level: 'All Levels', videoId: 'mCataY5uUo0' },
      { name: 'Postural Chin Tucks', duration: '2 min', level: 'All Levels', videoId: 'Cd1iscdQ-R0' },
    ],
    foot: [
      { name: 'Standing Calf Raises', duration: '3 min', level: 'Beginner', videoId: 'JTzf4IPR7dw' },
      { name: 'Ankle & Foot Circles', duration: '2 min', level: 'All Levels', videoId: 'Pby8XRtSjpk' },
      { name: 'Seated Toe Taps', duration: '2 min', level: 'All Levels', videoId: 'v1Fx2t9gNUw' },
      { name: 'Heel-to-Toe Walking', duration: '3 min', level: 'Beginner', videoId: 'JZr7QFnFhlc' },
    ],
  };

  const bodyPartLabels = {
    stomach: { label: 'Abs & Core', count: 5 },
    chest: { label: 'Chest', count: 5 },
    leg: { label: 'Legs & Glutes', count: 5 },
    shoulder: { label: 'Shoulders', count: 4 },
    arm: { label: 'Arms & Biceps', count: 4 },
    head: { label: 'Neck & Head', count: 4 },
    foot: { label: 'Calves & Feet', count: 4 },
  };

  const toggleSaveExercise = (name) => {
    if (savedExercises.includes(name)) {
      setSavedExercises(savedExercises.filter((n) => n !== name));
    } else {
      setSavedExercises([...savedExercises, name]);
    }
  };

  const currentExercises = exercisesMapping[selectedBodyPart] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-6 md:p-8 text-white shadow-xl shadow-slate-900/10 mb-8">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-sm border border-indigo-500/30">
              <Sparkles size={13} className="text-indigo-400" />
              Targeted Anatomical Routines
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Target Area & Body Focus
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Select a muscle group or anatomical region to explore curated video tutorials and form guides tailored to your workout split.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Muscle Group Selector & Interactive Body Frame */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Muscle Groups
            </h3>
            <div className="space-y-1.5">
              {Object.keys(exercisesMapping).map((bodyPart) => {
                const info = bodyPartLabels[bodyPart];
                const isSelected = selectedBodyPart === bodyPart;
                return (
                  <button
                    key={bodyPart}
                    onClick={() => setSelectedBodyPart(bodyPart)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-500/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{info.label}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {info.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Anatomical Model Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <Activity size={14} className="text-indigo-500" />
              Interactive Anatomy
            </h4>
            <div className="rounded-2xl overflow-hidden h-64 bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
              <iframe
                title="Human Body Anatomy Map"
                src="https://maya-gans.shinyapps.io/human_body_app/"
                className="w-full h-full"
                frameBorder="0"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Section: Exercise Video Cards */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {bodyPartLabels[selectedBodyPart]?.label} Workouts
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {currentExercises.length} recommended exercises with full video walkthroughs
              </p>
            </div>
            {savedExercises.length > 0 && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                <Bookmark size={13} className="fill-amber-500 text-amber-500" />
                {savedExercises.length} Saved
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentExercises.map((exercise) => {
              const isSaved = savedExercises.includes(exercise.name);
              return (
                <div
                  key={exercise.name}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Video Player Embed with Form Guides and Direct YouTube Access */}
                    <div className="relative aspect-video bg-slate-950 overflow-hidden group">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube-nocookie.com/embed/${exercise.videoId}?rel=0&modestbranding=1&enablejsapi=1`}
                        title={exercise.name}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />

                      {/* YouTube Direct Link Badge Overlay */}
                      <div className="absolute top-2.5 right-2.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                        <a
                          href={`https://www.youtube.com/watch?v=${exercise.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/85 hover:bg-red-600 text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 transition-all duration-200 shadow-md"
                          title="Open video on YouTube in a new tab"
                        >
                          <Youtube size={14} className="text-red-500 group-hover:text-white" />
                          <span>YouTube</span>
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {exercise.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                              {exercise.duration}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium">
                              {exercise.level}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSaveExercise(exercise.name)}
                          className={`p-2 rounded-xl border transition-colors ${
                            isSaved
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                              : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                          aria-label="Save exercise"
                        >
                          <Bookmark size={16} className={isSaved ? 'fill-amber-500' : ''} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <CheckCircle2 size={14} className="text-indigo-600 dark:text-indigo-400" />
                        Form Verified
                      </span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {bodyPartLabels[selectedBodyPart]?.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedExercise;