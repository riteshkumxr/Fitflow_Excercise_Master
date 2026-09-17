import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Dumbbell, Sparkles, Laptop, Flame, ChevronRight } from 'lucide-react';

const ExerciseDropdown = ({ mobile = false, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    if (onItemClick) onItemClick();
  };

  const upperBody = [
    { name: 'Pushups', path: '/upper-body/pushup', badge: 'Chest & Core' },
    { name: 'Pullups', path: '/upper-body/pullup', badge: 'Back & Lats' },
    { name: 'Shoulder Press', path: '/upper-body/shoulder-press', badge: 'Delts' },
    { name: 'Bicep Curls', path: '/upper-body/bicep-curls', badge: 'Arms' },
    { name: 'Front Raises', path: '/upper-body/front-raises', badge: 'Shoulders' },
  ];

  const lowerBody = [
    { name: 'Squats', path: '/lower-body/squats', badge: 'Quads & Glutes' },
    { name: 'Lunges', path: '/lower-body/lunges', badge: 'Legs & Balance' },
    { name: 'High Knees', path: '/lower-body/highknees', badge: 'Cardio Core' },
    { name: 'Good Mornings', path: '/lower-body/morning', badge: 'Hamstrings' },
  ];

  const deskExercises = [
    { name: 'Seated Knee Raises', path: '/desk/knee', badge: 'Core' },
    { name: 'Desk Arm Curls', path: '/desk/curls', badge: 'Biceps' },
    { name: 'Seated Hand Raises', path: '/desk/hand', badge: 'Mobility' },
  ];

  if (mobile) {
    return (
      <div className="py-2 border-t border-slate-100">
        <div className="px-4 py-2 font-semibold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Dumbbell size={14} className="text-emerald-500" />
          AI Pose Exercises
        </div>
        <div className="grid grid-cols-2 gap-1 px-3">
          {[...upperBody, ...lowerBody].map((ex) => (
            <Link
              key={ex.path}
              to={ex.path}
              onClick={handleLinkClick}
              className="px-3 py-2 text-sm text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 rounded-lg transition-colors flex items-center justify-between"
            >
              <span>{ex.name}</span>
            </Link>
          ))}
        </div>

        <div className="px-4 pt-3 pb-1 font-semibold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Laptop size={14} className="text-teal-500" />
          Desk & Posture Breaks
        </div>
        <div className="space-y-1 px-3">
          {deskExercises.map((ex) => (
            <Link
              key={ex.path}
              to={ex.path}
              onClick={handleLinkClick}
              className="px-3 py-2 text-sm text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 rounded-lg transition-colors flex items-center justify-between"
            >
              <span>{ex.name}</span>
              <span className="text-xs text-slate-400">{ex.badge}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          isOpen
            ? 'bg-emerald-50 text-emerald-700 shadow-sm'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
        }`}
      >
        <Sparkles size={16} className="text-emerald-500" />
        <span>AI Exercises</span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 text-slate-400 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-[560px] bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Real-Time Pose Guidance
              </span>
            </div>
            <Link
              to="/workout"
              onClick={handleLinkClick}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
            >
              Browse All Workouts
              <ChevronRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Upper Body */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                <Dumbbell size={13} className="text-emerald-600" />
                Upper Body
              </div>
              <div className="space-y-1">
                {upperBody.map((ex) => (
                  <Link
                    key={ex.path}
                    to={ex.path}
                    onClick={handleLinkClick}
                    className="group block px-2.5 py-1.5 rounded-lg hover:bg-emerald-50/70 transition-colors"
                  >
                    <div className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
                      {ex.name}
                    </div>
                    <div className="text-[11px] text-slate-400 group-hover:text-emerald-600/80">
                      {ex.badge}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Lower Body */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                <Flame size={13} className="text-amber-500" />
                Lower Body
              </div>
              <div className="space-y-1">
                {lowerBody.map((ex) => (
                  <Link
                    key={ex.path}
                    to={ex.path}
                    onClick={handleLinkClick}
                    className="group block px-2.5 py-1.5 rounded-lg hover:bg-emerald-50/70 transition-colors"
                  >
                    <div className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
                      {ex.name}
                    </div>
                    <div className="text-[11px] text-slate-400 group-hover:text-emerald-600/80">
                      {ex.badge}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Desk & Mobility */}
            <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                <Laptop size={13} className="text-teal-600" />
                Desk Breaks
              </div>
              <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                Quick 2-minute posture & joint resets while sitting.
              </p>
              <div className="space-y-1">
                {deskExercises.map((ex) => (
                  <Link
                    key={ex.path}
                    to={ex.path}
                    onClick={handleLinkClick}
                    className="group block px-2 py-1.5 rounded-lg hover:bg-white transition-colors shadow-none hover:shadow-sm"
                  >
                    <div className="text-xs font-medium text-slate-700 group-hover:text-teal-700">
                      {ex.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {ex.badge}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseDropdown;

