import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTokens } from '../context/TokenContext';

const DietPlan = () => {
  const { currentUser } = useAuth();
  const { tokens, isUnlimited, openPaymentModal } = useTokens();
  const [userProfile, setUserProfile] = useState(() => ({
    goal: currentUser?.targetGoal || 'weight-loss',
    dietType: 'balanced',
    manualCalorieGoal: null,
    weight: currentUser?.weight ? parseInt(currentUser.weight) : 75,
    height: currentUser?.height ? parseInt(currentUser.height) : 175,
    age: currentUser?.age || 23,
    gender: 'male',
    activityLevel: 'moderate',
  }));

  useEffect(() => {
    if (currentUser) {
      setUserProfile((prev) => ({
        ...prev,
        weight: currentUser.weight ? parseInt(currentUser.weight) : prev.weight,
        height: currentUser.height ? parseInt(currentUser.height) : prev.height,
        age: currentUser.age || prev.age,
        goal: currentUser.targetGoal || prev.goal,
      }));
    }
  }, [currentUser?.weight, currentUser?.height, currentUser?.age, currentUser?.targetGoal]);

  const [meals, setMeals] = useState([
    { id: 'breakfast', name: 'Breakfast', foods: [], expanded: true },
    { id: 'lunch', name: 'Lunch', foods: [], expanded: true },
    { id: 'dinner', name: 'Dinner', foods: [], expanded: true },
    { id: 'snacks', name: 'Snacks', foods: [], expanded: true },
  ]);

  const [waterIntake, setWaterIntake] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealId: 'breakfast',
    quantity: 1,
  });

  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const commonFoods = [
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice (100g, cooked)', calories: 112, protein: 2.6, carbs: 23, fat: 0.9 },
    { name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
    { name: 'Avocado (100g)', calories: 160, protein: 2, carbs: 9, fat: 15 },
    { name: 'Whole Eggs (1 large)', calories: 70, protein: 6, carbs: 0.6, fat: 5 },
    { name: 'Greek Yogurt (100g)', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    { name: 'Spinach (100g)', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
    { name: 'Banana (1 medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14 },
    { name: 'Sweet Potato (100g)', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  ];

  // Pure derived calculations: zero cascading effects, zero re-render loops
  const calorieGoal = useMemo(() => {
    if (userProfile.manualCalorieGoal) {
      return Number(userProfile.manualCalorieGoal);
    }
    const bmr =
      userProfile.gender === 'male'
        ? 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5
        : 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9,
    };

    const tdee = bmr * (activityMultipliers[userProfile.activityLevel] || 1.55);

    if (userProfile.goal === 'weight-loss') {
      return Math.round(tdee - 500);
    } else if (userProfile.goal === 'muscle-gain') {
      return Math.round(tdee + 300);
    }
    return Math.round(tdee);
  }, [
    userProfile.weight,
    userProfile.height,
    userProfile.age,
    userProfile.gender,
    userProfile.activityLevel,
    userProfile.goal,
    userProfile.manualCalorieGoal,
  ]);

  const dailyTotals = useMemo(() => {
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    meals.forEach((meal) => {
      meal.foods.forEach((food) => {
        const qty = Number(food.quantity) || 1;
        totals.calories += (Number(food.calories) || 0) * qty;
        totals.protein += (Number(food.protein) || 0) * qty;
        totals.carbs += (Number(food.carbs) || 0) * qty;
        totals.fat += (Number(food.fat) || 0) * qty;
      });
    });

    return {
      calories: Math.round(totals.calories),
      protein: Math.round(totals.protein),
      carbs: Math.round(totals.carbs),
      fat: Math.round(totals.fat),
    };
  }, [meals]);

  const recommendations = useMemo(() => {
    let recs = [];

    if (userProfile.dietType === 'balanced') {
      if (userProfile.goal === 'weight-loss') {
        recs = [
          'Focus on lean proteins and vegetables',
          'Limit processed foods and added sugars',
          'Include healthy fats in moderation',
          'Aim for 25-30% of calories from protein',
          'Stay hydrated with at least 2L of water daily',
        ];
      } else if (userProfile.goal === 'muscle-gain') {
        recs = [
          'Increase protein intake to 1.6-2.2g per kg of bodyweight',
          'Include carbs around workouts for energy',
          'Don\'t skimp on healthy fats for hormone production',
          'Space protein intake evenly throughout the day',
          'Consider a post-workout shake with protein and carbs',
        ];
      } else {
        recs = [
          'Maintain balanced macronutrient ratio (40% carbs, 30% protein, 30% fat)',
          'Focus on whole, nutrient-dense foods',
          'Include a variety of colorful fruits and vegetables',
          'Stay consistent with meal timing',
          'Adjust intake based on training days vs rest days',
        ];
      }
    } else if (userProfile.dietType === 'keto') {
      recs = [
        'Keep carbs under 50g daily, ideally 20-30g',
        'Get 70-80% of calories from healthy fats',
        'Moderate protein intake (around 20% of calories)',
        'Increase sodium intake to 3-5g daily',
        'Focus on avocados, olive oil, nuts, and fatty fish',
      ];
    } else if (userProfile.dietType === 'vegetarian' || userProfile.dietType === 'vegan') {
      recs = [
        'Combine plant proteins for complete amino acid profiles',
        'Include legumes, tofu, tempeh, and seitan as protein sources',
        'Consider B12, iron, zinc, and omega-3 supplements',
        'Focus on whole grains for complete nutrition',
        'Include plenty of nuts and seeds for healthy fats',
      ];
    }

    if (dailyTotals.protein < userProfile.weight * 1.6 && userProfile.goal === 'muscle-gain') {
      recs.unshift("⚠️ You're currently under your protein target for muscle gain");
    }

    if (dailyTotals.calories > calorieGoal && userProfile.goal === 'weight-loss') {
      recs.unshift("⚠️ You've exceeded your calorie target for weight loss");
    }

    return recs;
  }, [
    userProfile.dietType,
    userProfile.goal,
    userProfile.weight,
    calorieGoal,
    dailyTotals.calories,
    dailyTotals.protein,
  ]);

  const handleAddFood = (e) => {
    e.preventDefault();

    if (!newFood.name || !newFood.calories) {
      return;
    }

    const updatedMeals = meals.map(meal => {
      if (meal.id === newFood.mealId) {
        return {
          ...meal,
          foods: [...meal.foods, {
            id: Date.now(),
            name: newFood.name,
            calories: Number(newFood.calories),
            protein: Number(newFood.protein || 0),
            carbs: Number(newFood.carbs || 0),
            fat: Number(newFood.fat || 0),
            quantity: Number(newFood.quantity),
          }],
        };
      }
      return meal;
    });

    setMeals(updatedMeals);

    setNewFood({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      mealId: newFood.mealId,
      quantity: 1,
    });
  };

  const handleDeleteFood = (mealId, foodId) => {
    const updatedMeals = meals.map(meal => {
      if (meal.id === mealId) {
        return {
          ...meal,
          foods: meal.foods.filter(food => food.id !== foodId),
        };
      }
      return meal;
    });

    setMeals(updatedMeals);
  };

  const toggleMealExpansion = (mealId) => {
    const updatedMeals = meals.map(meal => {
      if (meal.id === mealId) {
        return {
          ...meal,
          expanded: !meal.expanded,
        };
      }
      return meal;
    });

    setMeals(updatedMeals);
  };

  const handleQuickAdd = (food) => {
    const updatedMeals = meals.map(meal => {
      if (meal.id === newFood.mealId) {
        return {
          ...meal,
          foods: [...meal.foods, {
            id: Date.now(),
            ...food,
            quantity: 1,
          }],
        };
      }
      return meal;
    });

    setMeals(updatedMeals);
    setShowQuickAdd(false);
  };

  const increaseWater = () => {
    setWaterIntake(prev => prev + 250);
  };

  const decreaseWater = () => {
    setWaterIntake(prev => Math.max(0, prev - 250));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setShowProfileModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-sm border border-indigo-500/30 mb-2">
                <span>Precision Nutrition & Macros</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                FitFlow Nutrition & Diet Tracker
              </h1>
              <p className="text-slate-400 text-sm mt-1">Calorie counting, macro goals, and smart food logging</p>
            </div>
            
            <div className="mt-2 md:mt-0 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openPaymentModal('starter')}
                title="View FitFlow AI Token Balance"
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>⚡</span>
                <span>{isUnlimited ? 'VIP Pass' : `${tokens} Tokens`}</span>
              </button>

              <button 
                onClick={() => setShowProfileModal(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                Customize Goals
              </button>
              
              <div className="inline-flex text-xs rounded-xl overflow-hidden shadow-xs border border-slate-700 bg-slate-800">
                <button
                  onClick={() => {
                    const prev = new Date(selectedDate);
                    prev.setDate(prev.getDate() - 1);
                    setSelectedDate(prev);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border-r border-slate-700 transition-colors cursor-pointer"
                  title="Previous day"
                >
                  ←
                </button>
                <button className="px-4 py-2 bg-slate-800/90 text-slate-100 font-bold">
                  {formatDate(selectedDate)}
                </button>
                <button
                  onClick={() => {
                    const next = new Date(selectedDate);
                    next.setDate(next.getDate() + 1);
                    setSelectedDate(next);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border-l border-slate-700 transition-colors cursor-pointer"
                  title="Next day"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-800 overflow-hidden mb-6">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Daily Summary</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1 text-slate-600 dark:text-slate-300">
                    <span>Calories</span>
                    <span className="font-bold text-slate-900 dark:text-white">{dailyTotals.calories} / {calorieGoal}</span>
                  </div>
                  <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        dailyTotals.calories > calorieGoal 
                          ? 'bg-rose-500' 
                          : 'bg-indigo-600'
                      }`}
                      style={{ width: `${Math.min(100, (dailyTotals.calories / calorieGoal) * 100)}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-center mb-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Protein</span>
                    </div>
                    <div className="h-20 w-20 mx-auto relative">
                      <svg className="h-full w-full" viewBox="0 0 36 36">
                        <circle 
                          cx="18" cy="18" r="16" 
                          fill="none" 
                          stroke="currentColor"
                          className="text-slate-200 dark:text-slate-700" 
                          strokeWidth="4" 
                        />
                        <circle 
                          cx="18" cy="18" r="16" 
                          fill="none" 
                          stroke="#3B82F6" 
                          strokeWidth="4" 
                          strokeDasharray={`${Math.min(100, (dailyTotals.protein / (calorieGoal * 0.25 / 4)) * 100)} 100`}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{dailyTotals.protein}g</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-center mb-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Carbs</span>
                    </div>
                    <div className="h-20 w-20 mx-auto relative">
                      <svg className="h-full w-full" viewBox="0 0 36 36">
                        <circle 
                          cx="18" cy="18" r="16" 
                          fill="none" 
                          stroke="currentColor"
                          className="text-slate-200 dark:text-slate-700" 
                          strokeWidth="4" 
                        />
                        <circle 
                          cx="18" cy="18" r="16" 
                          fill="none" 
                          stroke="#10B981" 
                          strokeWidth="4" 
                          strokeDasharray={`${Math.min(100, (dailyTotals.carbs / (calorieGoal * 0.5 / 4)) * 100)} 100`}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{dailyTotals.carbs}g</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-center mb-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Fat</span>
                    </div>
                    <div className="h-20 w-20 mx-auto relative">
                      <svg className="h-full w-full" viewBox="0 0 36 36">
                        <circle 
                          cx="18" cy="18" r="16" 
                          fill="none" 
                          stroke="currentColor"
                          className="text-slate-200 dark:text-slate-700" 
                          strokeWidth="4" 
                        />
                        <circle 
                          cx="18" cy="18" r="16" 
                          fill="none" 
                          stroke="#F59E0B" 
                          strokeWidth="4" 
                          strokeDasharray={`${Math.min(100, (dailyTotals.fat / (calorieGoal * 0.25 / 9)) * 100)} 100`}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{dailyTotals.fat}g</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Water Intake</h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{waterIntake / 1000}L of 2.5L</span>
                  </div>
                  
                  <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (waterIntake / 2500) * 100)}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      onClick={decreaseWater}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 font-medium transition-colors"
                    >
                      - 250ml
                    </button>
                    <button 
                      onClick={increaseWater}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      + 250ml
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Goal</span>
                    <span className="text-sm capitalize font-bold text-slate-800 dark:text-slate-200">{userProfile.goal.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Diet Type</span>
                    <span className="text-sm capitalize font-bold text-slate-800 dark:text-slate-200">{userProfile.dietType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Daily Calories</span>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{calorieGoal} kcal</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-800 overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Recommendations</h2>
                
                <ul className="space-y-3">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-600 dark:text-indigo-400 mr-2 font-bold">•</span>
                      <span className="text-sm text-slate-600 dark:text-slate-300">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-800 overflow-hidden mb-6">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add Food</h2>
                  
                  <div className="mt-2 sm:mt-0">
                    <button 
                      onClick={() => setShowQuickAdd(!showQuickAdd)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Quick Add Common Foods
                    </button>
                  </div>
                </div>
                
                {showQuickAdd && (
                  <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/60 max-h-60 overflow-y-auto">
                    <h3 className="font-semibold text-xs text-slate-700 dark:text-slate-300 mb-2">Common Foods</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {commonFoods.map((food, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAdd(food)}
                          className="text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-colors border border-slate-100 dark:border-slate-700 cursor-pointer"
                        >
                          <div className="font-medium text-xs text-slate-900 dark:text-white">{food.name}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleAddFood}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="food-name" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Food Name
                      </label>
                      <input
                        type="text"
                        id="food-name"
                        value={newFood.name}
                        onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. Grilled Chicken Breast"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="meal-id" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Meal
                      </label>
                      <select
                        id="meal-id"
                        value={newFood.mealId}
                        onChange={(e) => setNewFood({...newFood, mealId: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {meals.map(meal => (
                          <option key={meal.id} value={meal.id}>
                            {meal.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
                    <div>
                      <label htmlFor="calories" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Calories
                      </label>
                      <input
                        type="number"
                        id="calories"
                        value={newFood.calories}
                        onChange={(e) => setNewFood({...newFood, calories: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="kcal"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="protein" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Protein (g)
                      </label>
                      <input
                        type="number"
                        id="protein"
                        value={newFood.protein}
                        onChange={(e) => setNewFood({...newFood, protein: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="g"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="carbs" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Carbs (g)
                      </label>
                      <input
                        type="number"
                        id="carbs"
                        value={newFood.carbs}
                        onChange={(e) => setNewFood({...newFood, carbs: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="g"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="fat" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Fat (g)
                      </label>
                      <input
                        type="number"
                        id="fat"
                        value={newFood.fat}
                        onChange={(e) => setNewFood({...newFood, fat: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="g"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="quantity" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        min="0.25"
                        step="0.25"
                        value={newFood.quantity}
                        onChange={(e) => setNewFood({...newFood, quantity: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-bold text-sm shadow-sm transition-colors cursor-pointer"
                    >
                      Add Food Entry
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="space-y-6">
              {meals.map((meal) => (
                <div key={meal.id} className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-800 overflow-hidden">
                  <div 
                    className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    onClick={() => toggleMealExpansion(meal.id)}
                  >
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">{meal.name}</h2>
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {meal.foods.reduce((total, food) => total + (food.calories * food.quantity), 0)} kcal
                      </div>
                      <svg 
                        className={`h-5 w-5 text-slate-400 transition-transform ${meal.expanded ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {meal.expanded && (
                    <div className="px-5 py-3">
                      {meal.foods.length === 0 ? (
                        <p className="text-xs text-slate-400 dark:text-slate-500 py-3 text-center">No foods added yet for {meal.name}</p>
                      ) : (
                        <div className="space-y-2">
                          {meal.foods.map((food) => (
                            <div key={food.id} className="flex justify-between items-center p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors">
                              <div>
                                <div className="font-bold text-sm text-slate-800 dark:text-slate-200">{food.name}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  P: {food.protein * food.quantity}g | C: {food.carbs * food.quantity}g | F: {food.fat * food.quantity}g
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">{food.calories * food.quantity} kcal</span>
                                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">x{food.quantity}</span>
                                <button
                                  onClick={() => handleDeleteFood(meal.id, food.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                                  title="Delete food entry"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {showProfileModal && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Edit Nutrition Goals</h2>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={saveProfile} className="px-4 sm:px-6 py-4">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Target Goal
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {['weight-loss', 'maintenance', 'muscle-gain'].map((goal) => (
                      <label 
                        key={goal} 
                        className={`
                          flex items-center justify-center px-3 py-2.5 border rounded-xl text-xs font-bold cursor-pointer transition-all text-center
                          ${userProfile.goal === goal 
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-xs' 
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="goal"
                          value={goal}
                          checked={userProfile.goal === goal}
                          onChange={() => setUserProfile({...userProfile, goal})}
                          className="sr-only"
                        />
                        <span className="capitalize">{goal.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Diet Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {['balanced', 'keto', 'paleo', 'vegetarian', 'vegan'].map((dietType) => (
                      <label 
                        key={dietType} 
                        className={`
                          flex items-center justify-center px-2 py-2 border rounded-xl text-xs font-bold cursor-pointer transition-all text-center
                          ${userProfile.dietType === dietType 
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-xs' 
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="dietType"
                          value={dietType}
                          checked={userProfile.dietType === dietType}
                          onChange={() => setUserProfile({...userProfile, dietType})}
                          className="sr-only"
                        />
                        <span className="capitalize">{dietType}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="weight" className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      min="30"
                      max="300"
                      value={userProfile.weight}
                      onChange={(e) => setUserProfile({...userProfile, weight: Number(e.target.value)})}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="height" className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      id="height"
                      min="100"
                      max="250"
                      value={userProfile.height}
                      onChange={(e) => setUserProfile({...userProfile, height: Number(e.target.value)})}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="age" className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      min="12"
                      max="120"
                      value={userProfile.age}
                      onChange={(e) => setUserProfile({...userProfile, age: Number(e.target.value)})}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Gender
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['male', 'female'].map((gender) => (
                        <label 
                          key={gender} 
                          className={`
                            flex items-center justify-center px-3 py-2 border rounded-xl text-xs font-bold cursor-pointer transition-all
                            ${userProfile.gender === gender 
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-xs' 
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={gender}
                            checked={userProfile.gender === gender}
                            onChange={() => setUserProfile({...userProfile, gender})}
                            className="sr-only"
                          />
                          <span className="capitalize">{gender}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Activity Level
                  </label>
                  <select
                    value={userProfile.activityLevel}
                    onChange={(e) => setUserProfile({...userProfile, activityLevel: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Light (exercise 1-3 times/week)</option>
                    <option value="moderate">Moderate (exercise 3-5 times/week)</option>
                    <option value="active">Active (exercise 6-7 times/week)</option>
                    <option value="very-active">Very Active (exercise & physical job)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="manual-calories" className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Manual Calorie Goal Override (optional)
                  </label>
                  <input
                    type="number"
                    id="manual-calories"
                    placeholder="Leave empty for automatic calculation"
                    value={userProfile.manualCalorieGoal || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setUserProfile({
                        ...userProfile, 
                        manualCalorieGoal: value ? Number(value) : null,
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Save Goals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlan;