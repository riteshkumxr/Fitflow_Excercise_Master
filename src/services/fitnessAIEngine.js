// FitFlow Comprehensive Fitness & Nutrition AI Engine

export const FOOD_DATABASE = {
  samosa: {
    name: 'Samosa (standard potato & pea filled)',
    serving: '1 piece (~90-100g)',
    calories: 262,
    carbs: 32,
    protein: 4.5,
    fat: 17,
    fiber: 2.1,
    sodium: '420 mg',
    category: 'snack',
    notes: 'Deep-fried pastry filled with spiced potatoes, peas, and coriander. High in refined carbs and trans/saturated fats.',
    healthTip: 'Opt for air-fried or baked samosas (~130 kcal) to cut fat intake by 60% while enjoying the same authentic spices.',
  },
  roti: {
    name: 'Whole Wheat Roti / Chapati (plain, no oil)',
    serving: '1 medium (~35-40g)',
    calories: 75,
    carbs: 15,
    protein: 3.1,
    fat: 0.5,
    fiber: 2.4,
    category: 'staple',
    notes: 'Complex carbohydrate staple rich in fiber, B vitamins, and whole-grain satiety.',
    healthTip: 'Pair with lean protein (dal, paneer, chicken) to lower the glycemic response.',
  },
  'roti with ghee': {
    name: 'Roti / Chapati with Ghee/Butter',
    serving: '1 medium with 1 tsp ghee',
    calories: 120,
    carbs: 15,
    protein: 3.1,
    fat: 5.5,
    fiber: 2.4,
    category: 'staple',
    notes: 'Good source of healthy fatty acids (CLA), but adds ~45 kcal per teaspoon of ghee.',
  },
  paratha: {
    name: 'Aloo Paratha (with oil/butter)',
    serving: '1 medium paratha (~130g)',
    calories: 285,
    carbs: 36,
    protein: 5.5,
    fat: 13.5,
    fiber: 3.2,
    category: 'staple',
    notes: 'Stuffed spiced potato flatbread, typically cooked in ghee or mustard oil.',
    healthTip: 'Use minimal oil on a non-stick pan to drop calories to ~180 kcal per piece.',
  },
  paneer: {
    name: 'Paneer (Raw Indian Cottage Cheese)',
    serving: '100g serving',
    calories: 265,
    carbs: 3.5,
    protein: 18.3,
    fat: 20.8,
    fiber: 0,
    category: 'protein',
    notes: 'Excellent vegetarian casein protein source with high bioavailable calcium and phosphorus.',
    healthTip: 'Low-fat / toned paneer provides ~25g protein with only 4g-6g fat (approx. 160 kcal per 100g).',
  },
  'paneer butter masala': {
    name: 'Paneer Butter Masala / Shahi Paneer',
    serving: '1 bowl (~200g)',
    calories: 390,
    carbs: 14,
    protein: 12.5,
    fat: 32,
    fiber: 2.2,
    category: 'curry',
    notes: 'Rich cashew and dairy butter gravy. Very calorie and fat dense.',
  },
  dal: {
    name: 'Cooked Yellow Dal (Moong / Toor / Arhar)',
    serving: '1 katori / bowl (~150g)',
    calories: 145,
    carbs: 21,
    protein: 8.8,
    fat: 2.8,
    fiber: 4.5,
    category: 'staple',
    notes: 'Staple plant-based protein rich in dietary fiber, potassium, and folate.',
    healthTip: 'Combine with rice or roti to form a complete amino acid profile.',
  },
  rice: {
    name: 'Cooked White Rice',
    serving: '1 cup cooked (~150g)',
    calories: 195,
    carbs: 44,
    protein: 4.2,
    fat: 0.4,
    fiber: 0.6,
    category: 'staple',
    notes: 'Fast-digesting carbohydrate that efficiently restores muscle glycogen post-workout.',
  },
  'brown rice': {
    name: 'Cooked Brown Rice',
    serving: '1 cup cooked (~150g)',
    calories: 175,
    carbs: 38,
    protein: 4.0,
    fat: 1.5,
    fiber: 3.2,
    category: 'staple',
    notes: 'High-fiber complex carbohydrate with a low glycemic index, promoting steady blood glucose.',
  },
  biryani: {
    name: 'Chicken Biryani',
    serving: '1 plate (~300g)',
    calories: 520,
    carbs: 58,
    protein: 28,
    fat: 18,
    fiber: 2.5,
    category: 'meal',
    notes: 'Aromatic basmati rice cooked with chicken pieces, whole spices, and ghee/oil.',
    healthTip: 'Choose breast pieces and pair with cucumber raita to increase protein and hydration.',
  },
  egg: {
    name: 'Whole Boiled Egg',
    serving: '1 large egg (~50g)',
    calories: 74,
    carbs: 0.4,
    protein: 6.3,
    fat: 5.0,
    fiber: 0,
    category: 'protein',
    notes: 'Gold standard complete protein containing all 9 essential amino acids, choline, lutein, and vitamin B12.',
  },
  'egg white': {
    name: 'Egg White (boiled)',
    serving: '1 large egg white (~33g)',
    calories: 17,
    carbs: 0.2,
    protein: 3.6,
    fat: 0.1,
    fiber: 0,
    category: 'protein',
    notes: 'Pure, lean albumin protein with zero fat and zero cholesterol. Ideal for aggressive cutting.',
  },
  omelette: {
    name: '2-Egg Omelette with oil & veggies',
    serving: '1 omelette (2 eggs)',
    calories: 195,
    carbs: 2.0,
    protein: 13.5,
    fat: 15.0,
    fiber: 0.8,
    category: 'protein',
    notes: 'Quick breakfast packed with bioavailable protein and essential fats.',
  },
  chicken: {
    name: 'Grilled Chicken Breast',
    serving: '100g cooked',
    calories: 165,
    carbs: 0,
    protein: 31.0,
    fat: 3.6,
    fiber: 0,
    category: 'protein',
    notes: 'Premier lean protein for muscle hypertrophy, containing 31g protein per 165 kcal.',
  },
  banana: {
    name: 'Fresh Banana',
    serving: '1 medium fruit (~118g)',
    calories: 105,
    carbs: 27,
    protein: 1.3,
    fat: 0.3,
    fiber: 3.1,
    category: 'fruit',
    notes: 'Ideal pre-workout snack: rich in potassium and fast-acting glucose & fructose for workout endurance.',
  },
  apple: {
    name: 'Fresh Apple',
    serving: '1 medium apple (~180g)',
    calories: 95,
    carbs: 25,
    protein: 0.5,
    fat: 0.3,
    fiber: 4.4,
    category: 'fruit',
    notes: 'Packed with pectin soluble fiber and quercetin antioxidants, supporting digestive wellness.',
  },
  milk: {
    name: 'Cow Milk (Toned)',
    serving: '1 glass (~250ml)',
    calories: 130,
    carbs: 12,
    protein: 8.2,
    fat: 5.0,
    fiber: 0,
    category: 'dairy',
    notes: 'Contains an 80:20 ratio of slow-digesting casein to fast-absorbing whey protein plus 300mg calcium.',
  },
  chai: {
    name: 'Indian Masala Chai (with milk & 1 tsp sugar)',
    serving: '1 teacup (~150ml)',
    calories: 85,
    carbs: 12,
    protein: 2.5,
    fat: 3.0,
    fiber: 0,
    category: 'beverage',
    notes: 'Traditional tea with ginger, cardamom, and milk. Black tea without sugar contains only ~2 kcal.',
  },
  coffee: {
    name: 'Coffee with Milk & Sugar',
    serving: '1 cup (~180ml)',
    calories: 95,
    carbs: 13,
    protein: 3.0,
    fat: 3.5,
    fiber: 0,
    category: 'beverage',
    notes: 'Provides ~80mg caffeine. Black coffee with zero sugar has only ~2-3 kcal and boosts metabolic rate by 3-5%.',
  },
  idli: {
    name: 'Steamed Rice & Urad Dal Idli',
    serving: '1 piece (~45g)',
    calories: 55,
    carbs: 12,
    protein: 2.1,
    fat: 0.2,
    fiber: 1.1,
    category: 'staple',
    notes: 'Steamed and fermented food that is gentle on gut microbiota and naturally low in fat.',
  },
  dosa: {
    name: 'Plain Dosa',
    serving: '1 medium dosa (~80g)',
    calories: 140,
    carbs: 24,
    protein: 3.5,
    fat: 3.5,
    fiber: 1.5,
    category: 'staple',
    notes: 'Fermented crepe. Note: Masala Dosa with spiced potato filling and ghee averages ~270-300 kcal.',
  },
  'chole bhature': {
    name: 'Chole Bhature (2 bhature + chole)',
    serving: '1 full plate',
    calories: 760,
    carbs: 82,
    protein: 17,
    fat: 42,
    fiber: 8.5,
    category: 'meal',
    notes: 'Deep-fried maida flatbread with spiced chickpea curry. Extremely calorie and saturated fat heavy.',
    healthTip: 'Eat chole with tandoori roti or steamed rice instead of deep-fried bhature to save ~400 kcal.',
  },
  momos: {
    name: 'Steamed Veg/Chicken Momos',
    serving: '6 pieces (~150g)',
    calories: 215,
    carbs: 30,
    protein: 8.5,
    fat: 6.0,
    fiber: 1.8,
    category: 'snack',
    notes: 'Steamed dumplings. Note: Fried momos double the calorie density to ~380-420 kcal for 6 pieces.',
  },
  maggi: {
    name: 'Maggi / Instant Noodles',
    serving: '1 standard single pack (~70g)',
    calories: 315,
    carbs: 44,
    protein: 6.2,
    fat: 13.0,
    fiber: 2.0,
    sodium: '920 mg (40% daily limit)',
    category: 'snack',
    notes: 'Noodle cake is flash-fried in palm oil. Contains high refined sodium and low dietary fiber.',
    healthTip: 'Add 2 boiled eggs and fresh veggies (peas, carrots, capsicum) to balance the protein and micronutrients.',
  },
  pizza: {
    name: 'Cheese & Veggie Pizza',
    serving: '1 medium slice (~105g)',
    calories: 260,
    carbs: 30,
    protein: 10.5,
    fat: 11.2,
    fiber: 2.0,
    category: 'snack',
    notes: 'Refined crust with mozzarella cheese and tomato sauce. 2 slices typically exceed 500 kcal.',
  },
  burger: {
    name: 'Standard Veg/Chicken Burger',
    serving: '1 burger (~160g)',
    calories: 380,
    carbs: 42,
    protein: 14.5,
    fat: 17.5,
    fiber: 2.5,
    category: 'meal',
    notes: 'Mayonnaise and brioche buns contribute substantially to total fat and energy density.',
  },
  'peanut butter': {
    name: 'Natural Peanut Butter (no added sugar/oil)',
    serving: '1 tablespoon (~16g)',
    calories: 95,
    carbs: 3.2,
    protein: 4.1,
    fat: 8.0,
    fiber: 1.1,
    category: 'fat',
    notes: 'Rich in heart-healthy monounsaturated fats, vitamin E, magnesium, and plant-based protein.',
  },
  almonds: {
    name: 'Almonds (raw or soaked)',
    serving: '10-12 nuts (~15g)',
    calories: 88,
    carbs: 3.1,
    protein: 3.2,
    fat: 7.5,
    fiber: 1.8,
    category: 'nuts',
    notes: 'Excellent source of vitamin E, healthy fats, and magnesium for muscle relaxation.',
  },
  oats: {
    name: 'Rolled Oats (cooked in water)',
    serving: '1 bowl (~40g dry / 150g cooked)',
    calories: 152,
    carbs: 27,
    protein: 5.3,
    fat: 2.6,
    fiber: 4.2,
    category: 'staple',
    notes: 'Contains beta-glucan soluble fiber which lowers LDL cholesterol and sustains satiety for hours.',
  },
  'gulab jamun': {
    name: 'Gulab Jamun',
    serving: '1 piece (~45g)',
    calories: 150,
    carbs: 24,
    protein: 2.2,
    fat: 5.5,
    fiber: 0,
    category: 'dessert',
    notes: 'Deep-fried milk solids (khoya) soaked in concentrated sugar syrup.',
  },
  jalebi: {
    name: 'Jalebi',
    serving: '100g serving (~3-4 pieces)',
    calories: 395,
    carbs: 82,
    protein: 2.0,
    fat: 7.5,
    fiber: 0,
    category: 'dessert',
    notes: 'Deep-fried fermented flour batter soaked in saffron sugar syrup.',
  },
  'pani puri': {
    name: 'Pani Puri / Golgappa',
    serving: '6 pieces with flavored mint/tamarind water',
    calories: 195,
    carbs: 32,
    protein: 3.2,
    fat: 6.2,
    fiber: 2.0,
    category: 'snack',
    notes: 'Crispy hollow puris filled with spiced potato/chana and flavored waters.',
  },
  curd: {
    name: 'Plain Curd / Dahi / Yogurt',
    serving: '1 katori / bowl (~150g)',
    calories: 95,
    carbs: 6.8,
    protein: 5.2,
    fat: 4.5,
    fiber: 0,
    category: 'dairy',
    notes: 'Natural probiotic that supports gut microbiome health, nutrient absorption, and bone density.',
  },
  fish: {
    name: 'Grilled Fish (Pomfret / Rohu / Salmon)',
    serving: '100g fillet',
    calories: 135,
    carbs: 0,
    protein: 23.5,
    fat: 4.5,
    fiber: 0,
    category: 'protein',
    notes: 'Abundant in EPA and DHA Omega-3 fatty acids, reducing systemic inflammation and speeding muscle repair.',
  },
  'whey protein': {
    name: 'Whey Protein Powder (Isolate / Concentrate)',
    serving: '1 level scoop (~30g)',
    calories: 122,
    carbs: 2.0,
    protein: 24.5,
    fat: 1.5,
    fiber: 0,
    category: 'supplement',
    notes: 'Rapidly absorbed complete protein rich in Leucine (2.8g+ per scoop), triggering muscle protein synthesis (mTOR).',
    healthTip: 'Safe for healthy individuals; drink 3L+ water daily to support optimal kidney filtration and hydration.',
  },
  creatine: {
    name: 'Creatine Monohydrate',
    serving: '1 standard scoop (3g - 5g)',
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    fiber: 0,
    category: 'supplement',
    notes: 'Most researched sports supplement in the world. Replenishes phosphocreatine for explosive ATP energy, power output, and intracellular muscle hydration.',
    healthTip: 'Take 3g to 5g consistently every day with water or juice. No complex cycling or loading required.',
  },
  'french fries': {
    name: 'French Fries (deep-fried)',
    serving: '1 medium serving (~115g)',
    calories: 365,
    carbs: 48,
    protein: 3.8,
    fat: 17.5,
    fiber: 3.8,
    category: 'snack',
    notes: 'High in refined trans fats and sodium.',
  },
  'soya chunks': {
    name: 'Soya Chunks / Nutrela (cooked)',
    serving: '50g dry (~120g cooked)',
    calories: 172,
    carbs: 16,
    protein: 26.0,
    fat: 0.5,
    fiber: 6.5,
    category: 'protein',
    notes: 'Incredible plant-based protein density (52% protein by dry weight). Excellent for vegetarian bodybuilding.',
  },
  rajma: {
    name: 'Rajma / Kidney Beans Curry',
    serving: '1 bowl cooked (~180g)',
    calories: 220,
    carbs: 37,
    protein: 13.5,
    fat: 2.5,
    fiber: 9.0,
    category: 'staple',
    notes: 'High fiber, complex carbohydrate, and plant protein dish. Keeps insulin levels steady.',
  },
  chole: {
    name: 'Chole / Chickpeas Curry',
    serving: '1 bowl cooked (~180g)',
    calories: 240,
    carbs: 35,
    protein: 11.5,
    fat: 6.0,
    fiber: 8.0,
    category: 'staple',
    notes: 'Nutrient-rich legume packed with zinc, iron, magnesium, and resistant starch.',
  },
  poha: {
    name: 'Poha with Peanuts & Veggies',
    serving: '1 plate / bowl (~150g)',
    calories: 185,
    carbs: 33,
    protein: 3.8,
    fat: 4.2,
    fiber: 2.5,
    category: 'breakfast',
    notes: 'Flattened rice cooked with turmeric, mustard seeds, onions, and peanuts. Easy to digest.',
  },
  upma: {
    name: 'Rava Upma with Veggies',
    serving: '1 bowl (~150g)',
    calories: 180,
    carbs: 30,
    protein: 4.2,
    fat: 4.8,
    fiber: 2.2,
    category: 'breakfast',
    notes: 'Semolina dish loaded with energy-dense complex carbs.',
  },
};

// Aliases for user query matching (synonyms, plurals, typos)
export const FOOD_ALIASES = {
  samosa: ['samosa', 'samosas', 'samose', 'somosa', 'samosha'],
  roti: ['roti', 'rotis', 'chapati', 'chapatis', 'chapatti', 'phulka', 'fulka'],
  'roti with ghee': ['ghee roti', 'butter roti', 'roti with ghee', 'chapati with ghee'],
  paratha: ['paratha', 'parathas', 'pratha', 'aloo paratha', 'parantha'],
  paneer: ['paneer', 'panir', 'cottage cheese', 'raw paneer'],
  'paneer butter masala': ['paneer butter masala', 'shahi paneer', 'kadai paneer', 'paneer curry'],
  dal: ['dal', 'daal', 'dhal', 'yellow dal', 'moong dal', 'toor dal', 'arhar dal', 'dal tadka'],
  rice: ['rice', 'white rice', 'chawal', 'boiled rice', 'steamed rice'],
  'brown rice': ['brown rice'],
  biryani: ['biryani', 'biriyani', 'briyani', 'chicken biryani', 'mutton biryani'],
  egg: ['egg', 'eggs', 'boiled egg', 'boiled eggs', 'ande', 'anda'],
  'egg white': ['egg white', 'egg whites'],
  omelette: ['omelette', 'omlet', 'omlete', 'egg omelette'],
  chicken: ['chicken', 'chicken breast', 'grilled chicken', 'murgh'],
  banana: ['banana', 'bananas', 'kela', 'kele', 'bannana'],
  apple: ['apple', 'apples', 'seb'],
  milk: ['milk', 'doodh', 'cow milk'],
  chai: ['chai', 'tea', 'chaye', 'masala chai'],
  coffee: ['coffee', 'nescafe', 'espresso'],
  idli: ['idli', 'idlis', 'idly'],
  dosa: ['dosa', 'dosas', 'masala dosa'],
  'chole bhature': ['chole bhature', 'bhature', 'chola bhatura'],
  momos: ['momo', 'momos', 'dumpling', 'dumplings'],
  maggi: ['maggi', 'maggie', 'magi', 'instant noodles', 'ramen'],
  pizza: ['pizza', 'pizza slice'],
  burger: ['burger', 'burgers', 'hamburger'],
  'peanut butter': ['peanut butter', 'pb'],
  almonds: ['almond', 'almonds', 'badam'],
  oats: ['oat', 'oats', 'oatmeal'],
  'gulab jamun': ['gulab jamun', 'gulabjamun'],
  jalebi: ['jalebi', 'jalebis'],
  'pani puri': ['pani puri', 'panipuri', 'golgappa', 'golgappe', 'puchka'],
  curd: ['curd', 'dahi', 'yogurt'],
  fish: ['fish', 'salmon', 'pomfret', 'rohu'],
  'whey protein': ['whey', 'whey protein', 'protein powder', 'protein scoop'],
  creatine: ['creatine', 'creatine monohydrate'],
  'french fries': ['french fries', 'fries'],
  'soya chunks': ['soya chunks', 'nutrela', 'soya'],
  rajma: ['rajma', 'kidney beans'],
  chole: ['chole', 'chana', 'chickpeas'],
  poha: ['poha', 'chivda'],
  upma: ['upma'],
};

// Parse number / quantity from text
function parseQuantity(text) {
  const numberWordMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    half: 0.5,
    a: 1,
    an: 1,
  };

  // Check digit match (e.g. "2 samosas", "1.5 rotis")
  const digitMatch = text.match(/\b(\d+(\.\d+)?)\s*(?:pieces?|piece|pcs|plate|plates|slice|slices|bowl|bowls|katori|katoris|cup|cups|g|grams|gm|nos)?\b/i);
  if (digitMatch && parseFloat(digitMatch[1]) > 0) {
    return Math.min(20, parseFloat(digitMatch[1]));
  }

  // Check word match (e.g. "two samosas", "half samosa")
  const words = text.toLowerCase().split(/\s+/);
  for (const w of words) {
    if (numberWordMap[w] !== undefined) {
      return numberWordMap[w];
    }
  }

  return 1;
}

// Find food match from user query
export function findFoodMatch(userText) {
  const lower = userText.toLowerCase();

  // Try exact food aliases first
  for (const [foodKey, aliases] of Object.entries(FOOD_ALIASES)) {
    for (const alias of aliases) {
      const regex = new RegExp(`\\b${alias}\\b`, 'i');
      if (regex.test(lower)) {
        const qty = parseQuantity(lower);
        return { foodKey, food: FOOD_DATABASE[foodKey], quantity: qty };
      }
    }
  }

  return null;
}

// Generate rich response for food query
export function formatFoodResponse(match, userInfo = {}) {
  const { food, quantity } = match;
  const name = userInfo.userFirstName || 'Athlete';
  const targetWeight = userInfo.targetWeight || '72 kg';

  const totalCalories = Math.round(food.calories * quantity);
  const totalCarbs = (food.carbs * quantity).toFixed(1);
  const totalProtein = (food.protein * quantity).toFixed(1);
  const totalFat = (food.fat * quantity).toFixed(1);

  // Exercise burn-off estimates
  const jogMinutes = Math.max(5, Math.round(totalCalories / 9.5));
  const squatPushupMinutes = Math.max(4, Math.round(totalCalories / 11));
  const walkingSteps = Math.round(totalCalories * 18.5);

  const plural = quantity > 1 ? 's' : '';
  const itemHeader = `${quantity} ${food.name}`;

  return `🍽️ **Nutrition Breakdown for ${itemHeader}:**

• **Total Energy:** **${totalCalories} kcal** (Calories)
• **Carbohydrates:** ${totalCarbs}g
• **Protein:** ${totalProtein}g
• **Fats:** ${totalFat}g
${food.fiber ? `• **Fiber:** ${(food.fiber * quantity).toFixed(1)}g\n` : ''}${food.sodium ? `• **Sodium:** ${food.sodium}\n` : ''}
ℹ️ **Profile:** ${food.notes}

🔥 **How to burn off these ${totalCalories} calories:**
• 🏃 **Brisk Jogging / Cycling:** ~${jogMinutes} minutes
• 🏋️ **FitFlow AI Squats or Push-ups:** ~${squatPushupMinutes} minutes
• 🚶 **Walking:** ~${walkingSteps.toLocaleString()} steps

💡 **Coach Tip for ${name}:**
${food.healthTip || `Keep your target weight of ${targetWeight} in mind. Track this item against your daily calorie limit on the FitFlow Diet Plan tab!`}`;
}

// General Intelligent Fitness Query Processor
export function processFitnessQuery(userText, userInfo = {}) {
  const q = userText.toLowerCase().trim();
  const name = userInfo.userFirstName || 'Athlete';
  const weight = userInfo.userWeight || '75 kg';
  const target = userInfo.targetWeight || '72 kg';
  const streak = userInfo.streakDays || 1;
  const points = userInfo.points || 150;

  // 1. First, check if the query is asking about a food / calories / nutrition
  const foodMatch = findFoodMatch(q);
  if (foodMatch) {
    return formatFoodResponse(foodMatch, userInfo);
  }

  // 2. Generic food extraction if query contains "calories in X" or "calires in X"
  const calorieIntentRegex = /(?:how\s+(?:much|many)\s+)?(?:calire|calires|calorie|calories|calory|caloreis|kcal|kcl|nutrition|protein|carbs|fat)\s+(?:in|of|for|is\s+in)\s+([a-zA-Z0-9\s]+)/i;
  const matchCaloriePattern = q.match(calorieIntentRegex);
  if (matchCaloriePattern && matchCaloriePattern[1]) {
    const requestedFood = matchCaloriePattern[1].replace(/[?.,!]/g, '').trim();
    return `🥗 **Calorie & Nutrition Estimate for "${requestedFood}":**\n\n` +
      `For **${requestedFood}**, the exact caloric content depends on serving size and cooking method:\n` +
      `• **Estimated Calories:** ~150 - 280 kcal per typical serving (100g)\n` +
      `• **Key Advice:** If it is deep-fried or oily, fat content accounts for up to 65% of the calories. If boiled or grilled, protein and complex carbs dominate.\n\n` +
      `🔥 **To burn off ~200 kcal:** Approximately 20 minutes of moderate cardio or 18 minutes of AI Squats/Pushups.\n\n` +
      `*Tip: You can log custom foods with exact grams and macros directly in the FitFlow Diet Plan tracker!*`;
  }

  // 3. Belly Fat / Spot Reduction
  if (q.includes('belly fat') || q.includes('stomach fat') || q.includes('lose belly') || q.includes('abs')) {
    return `🔥 **The Science of Losing Belly Fat for ${name}:**\n\n` +
      `1. **No Spot Reduction:** Scientific physiology proves you cannot burn fat exclusively from one spot (like doing 500 crunches). Fat loss occurs systemically across your entire body.\n` +
      `2. **Caloric Deficit:** Consume 300 - 400 kcal below your maintenance level. This signals your body to mobilize stored adipose tissue for energy.\n` +
      `3. **High-Protein Diet:** Aim for ~1.6g to 2.0g protein per kg of bodyweight (${weight}) to preserve lean muscle while stripping fat.\n` +
      `4. **Compound AI Movements:** FitFlow Squats, Walking Lunges, and Pushups burn 3x more calories per minute than isolated sit-ups because they recruit massive muscle groups.\n` +
      `5. **Rest & Cortisol:** High stress and under 7 hours of sleep spike cortisol, promoting visceral abdominal fat storage. Prioritize 7-8 hours of sleep!`;
  }

  // 4. Muscle Building / Hypertrophy / Bulk
  if (q.includes('build muscle') || q.includes('muscle gain') || q.includes('bulk') || q.includes('hypertrophy') || q.includes('grow')) {
    return `💪 **Maximum Muscle Hypertrophy Protocol for ${name}:**\n\n` +
      `1. **Mechanical Tension & Full ROM:** Train in the 8 - 15 rep range. Use our AI Pose Trainers to ensure full joint range of motion.\n` +
      `2. **Progressive Overload:** Add 1-2 reps or increase resistance each week.\n` +
      `3. **Protein Timing:** Consume 25g - 35g of high-quality protein every 3 to 4 hours with 2.5g+ Leucine (eggs, paneer, chicken, whey, soya).\n` +
      `4. **Caloric Surplus:** For lean muscle gain, eat in a mild +250 to +300 kcal surplus above maintenance.\n` +
      `5. **Recovery:** Muscles do not grow in the gym; they are broken down in the gym and grow during 48-72 hours of rest and sleep.`;
  }

  // 5. Weight Loss / Fat Loss
  if (q.includes('weight loss') || q.includes('lose weight') || q.includes('cut') || q.includes('fat loss') || q.includes('slim')) {
    return `📉 **Sustainable Fat Loss Blueprint (${weight} → ${target} Target):**\n\n` +
      `• **Optimal Calorie Deficit:** A safe, sustainable deficit is ~350 - 500 kcal/day (results in ~0.5 kg fat loss per week without metabolic slowdown).\n` +
      `• **Protein Shield:** 130g - 150g protein/day protects your hard-earned muscle.\n` +
      `• **NEAT (Daily Steps):** Aim for 8,000 - 10,000 steps daily.\n` +
      `• **FitFlow Workouts:** 3 to 4 strength sessions weekly using our AI Pose Tracking modules to keep your metabolic rate high.\n` +
      `• **Hydration:** 3.0L to 3.5L of water daily to reduce fluid retention and optimize lipolysis (fat breakdown).`;
  }

  // 6. Water / Hydration
  if (q.includes('water') || q.includes('drink') || q.includes('hydration') || q.includes('liters')) {
    return `💧 **Hydration Guidelines for ${name} (${weight}):**\n\n` +
      `• **Target Intake:** **3.2 to 3.8 Liters** daily (approx. 35-45 ml per kg of bodyweight).\n` +
      `• **Why it matters:** Even a 2% drop in cellular hydration decreases workout strength and cognitive focus by up to 15%.\n` +
      `• **Workout Rule:** Drink 250ml of water 20 mins before working out, and sip 150-200ml every 15-20 mins during intense sessions.\n` +
      `• **Electrolytes:** If sweating heavily, add a pinch of Himalayan salt and lemon for sodium/potassium balance.`;
  }

  // 7. Pre-Workout Nutrition
  if (q.includes('pre workout') || q.includes('pre-workout') || q.includes('before workout')) {
    return `⚡ **Optimal Pre-Workout Fuel Strategy:**\n\n` +
      `• **Timing:** 30 to 45 minutes before training.\n` +
      `• **Best Choices:**\n` +
      `  - 1 medium Banana + 1 tbsp Peanut Butter (~200 kcal)\n` +
      `  - 1 bowl of Oatmeal cooked with water + a few almonds (~180 kcal)\n` +
      `  - 2 whole wheat toasts with black coffee (~160 kcal, caffeine boosts power output)\n` +
      `• **What to Avoid:** Deep-fried or heavy dairy foods right before training, as fat slows digestion and diverts blood flow away from muscles to your stomach.`;
  }

  // 8. Post-Workout Nutrition
  if (q.includes('post workout') || q.includes('post-workout') || q.includes('after workout')) {
    return `🔄 **Anabolic Window Post-Workout Recovery:**\n\n` +
      `• **Timing:** Within 45 to 90 minutes post-training.\n` +
      `• **The 2 Crucial Ingredients:**\n` +
      `  1. **Fast Acting Protein (25g - 35g):** 1 scoop Whey Protein, 3-4 Egg Whites, 100g Grilled Chicken, or 100g low-fat Paneer/Soya.\n` +
      `  2. **Replenishing Carbs (30g - 50g):** White rice, banana, whole wheat roti, or sweet potatoes to restore depleted muscle glycogen.\n` +
      `• **Rehydration:** Replace 150% of the fluid weight lost in sweat.`;
  }

  // 9. Supplements (Creatine / Whey / BCAA)
  if (q.includes('creatine') || q.includes('whey') || q.includes('supplement') || q.includes('protein powder')) {
    return `🧪 **Evidence-Based Supplement Guide:**\n\n` +
      `1. **Creatine Monohydrate (Rating: 10/10):**\n` +
      `   - Most clinically researched supplement on Earth.\n` +
      `   - Dose: 3g to 5g daily with water. Increases cellular ATP, boosting strength by 5-15% and drawing intracellular water into muscle cells.\n\n` +
      `2. **Whey Protein (Rating: 9/10):**\n` +
      `   - Simply powdered dairy protein (derived from milk during cheese making). 100% safe for healthy kidneys and very convenient to meet daily protein targets.\n\n` +
      `3. **Are they necessary?** No! Supplements only supplement a solid diet. If you already hit 1.6g-2g protein per kg from eggs, paneer, chicken, or dal, whey is optional!`;
  }

  // 10. Knee Pain / Joint Health
  if (q.includes('knee pain') || q.includes('back pain') || q.includes('injury') || q.includes('hurt')) {
    return `🩺 **Joint Health & Form Correction Checklist:**\n\n` +
      `• **Knee Pain during Squats/Lunges:**\n` +
      `  1. Keep knees tracking outward in line with your 2nd toe (never let knees collapse inward into valgus).\n` +
      `  2. Sit your hips back like into an imaginary chair so the load is distributed across your glutes and quads rather than patellar tendons.\n` +
      `• **Lower Back Pain:**\n` +
      `  1. Brace your core (valsalva maneuver) as if someone is about to punch your stomach.\n` +
      `  2. Avoid hyperextending your lumbar spine at the top of squats or overhead press.\n` +
      `• *Note: If pain is sharp or persists outside of workouts, rest and consult an orthopedic physiotherapist.*`;
  }

  // 11. Specific FitFlow Exercises
  if (q.includes('squat')) {
    return `🏋️ **Squats Biomechanics Guide for ${name}:**\n\n` +
      `1. **Foot Positioning:** Shoulder-width apart, toes turned slightly out (15° to 30°).\n` +
      `2. **Hip Hinge:** Push hips back while breaking knees outwards.\n` +
      `3. **Depth:** Lower until hip crease is below the top of knees (parallel).\n` +
      `4. **Torso:** Proud chest, neutral spine, gaze forward.\n` +
      `5. **FitFlow AI:** Launch the **AI Squat Trainer** in the Workout tab for real-time live depth angle tracking!`;
  }

  if (q.includes('pushup') || q.includes('push up') || q.includes('chest')) {
    return `💪 **Push-Up Precision Form Guide:**\n\n` +
      `1. **Elbow Angle:** Keep elbows at 45° to your torso (arrow shape, never flared into a 'T').\n` +
      `2. **Body Alignment:** Squeeze glutes and abs to form a straight line from heels to ears.\n` +
      `3. **Full Range:** Lower until chest touches 2 inches from floor, then push to full lockout.\n` +
      `4. **Prescription:** 3 sets × 12 reps.\n` +
      `*Tip: Use our AI Pushups module to verify elbow flexion angles in real time!*`;
  }

  if (q.includes('bicep') || q.includes('curl') || q.includes('arm')) {
    return `🔥 **Bicep Curls Mastery:**\n\n` +
      `1. **Elbows Glued:** Pin elbows against your ribcage. Do NOT swing shoulders or sway back.\n` +
      `2. **Tempo:** 1 second explosive concentric curl, 1 second squeeze at peak contraction, 3 seconds slow eccentric lowering.\n` +
      `3. **Wrist Neutrality:** Keep wrists straight to prevent forearm strain.\n` +
      `*Tip: Check out our Bicep Curl Tracker for automated repetition detection!*`;
  }

  if (q.includes('lunge') || q.includes('lunges') || q.includes('leg')) {
    return `🦵 **Walking Lunges Blueprint:**\n\n` +
      `1. **Step Stride:** Step forward so both front and back knees bend to ~90° angles.\n` +
      `2. **Front Knee:** Centered directly over your front ankle, not driving excessively over toes.\n` +
      `3. **Torso:** Keep spine vertical to heavily engage glutes and quads.\n` +
      `4. **Prescription:** 3 sets × 12 reps per leg.`;
  }

  if (q.includes('pullup') || q.includes('pull up') || q.includes('back')) {
    return `🧗 **Pull-Up Form Protocol:**\n\n` +
      `1. **Grip:** Overhand grip slightly wider than shoulder width.\n` +
      `2. **Scapular Engagement:** Pull shoulder blades down and back before bending elbows.\n` +
      `3. **Chin Over Bar:** Drive elbows down to your ribcage until chin cleanly clears the bar.\n` +
      `4. **Dead Hang:** Return smoothly to full hang to maximize lat stretch.`;
  }

  if (q.includes('shoulder') || q.includes('press')) {
    return `🛡️ **Overhead Shoulder Press Protocol:**\n\n` +
      `1. **Bar / Dumbbell Path:** Press straight up overhead directly in line with your ears and midfoot.\n` +
      `2. **Core Braced:** Squeeze glutes and pull ribs down to prevent lower back arching.\n` +
      `3. **Lockout:** Lock arms overhead with active shoulders (shrug slightly at top).`;
  }

  if (q.includes('desk') || q.includes('sitting') || q.includes('neck') || q.includes('posture')) {
    return `🧘 **Ergonomic Desk Relief Routine for ${name}:**\n\n` +
      `1. **Chin Tucks (10 reps):** Draw chin backward without tilting head to decompress cervical spine.\n` +
      `2. **Seated Spinal Twists (30s):** Gently rotate upper spine while taking deep breaths.\n` +
      `3. **Seated Knee Raises (15 reps):** Activates lower abs and hip flexors after prolonged sitting.\n` +
      `4. **Desk Wrist Curls (1 min):** Flex and extend wrists to avoid carpal tunnel strain.\n\n` +
      `*Head to the Workout tab → Desk & Posture Breaks for guided AI timers!*`;
  }

  if (q.includes('ai') || q.includes('camera') || q.includes('pose') || q.includes('movenet')) {
    return `🤖 **How FitFlow AI Pose Tracking Works:**\n\n` +
      `1. **TensorFlow.js MoveNet:** Runs high-accuracy deep learning computer vision directly in your browser.\n` +
      `2. **Keypoint Tracking:** Tracks 17 anatomical joints (shoulders, elbows, wrists, hips, knees, ankles) at 30+ FPS.\n` +
      `3. **Private & Local:** 100% on-device processing via WebGL GPU acceleration; no camera images are ever stored or uploaded.`;
  }

  if (q.includes('diet') || q.includes('macro') || q.includes('calorie') || q.includes('calire') || q.includes('food')) {
    return `🥗 **Personalized Nutrition Strategy for ${name} (${weight} → ${target} Target):**\n\n` +
      `• **Daily Calorie Target:** ~1,850 kcal (creates a safe, sustainable ~350 kcal deficit from your 2,200 kcal maintenance).\n` +
      `• **Protein Target:** 140g - 150g per day (approx. 1.9g per kg of bodyweight to preserve lean muscle).\n` +
      `• **Carbohydrates:** ~180g (complex carbs: oats, brown rice, sweet potatoes).\n` +
      `• **Healthy Fats:** ~50g - 55g (avocado, nuts, olive oil).\n` +
      `• **Hydration:** Aim for 3.0L to 3.5L of water daily.\n\n` +
      `*Tip: You can ask me the exact calories for any food, like "how many calories in 1 samosa" or "protein in 3 eggs"!*`;
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hello ${name}! 👋 Great to see you.\n\n` +
      `You are on an active **${streak}-day workout streak** with **${points.toLocaleString()} points**! Current weight: ${weight}, goal: ${target}.\n\n` +
      `What would you like to know today? You can ask me:\n` +
      `• *"How many calories in 1 samosa?"* or any food (roti, egg, chicken, rice, biryani, banana)\n` +
      `• *"How to lose belly fat?"*\n` +
      `• *"Perfect squat or pushup form"*\n` +
      `• *"Should I take creatine or whey protein?"*`;
  }

  // 12. Intelligent Fallback with User Profile Context
  return `Great question, ${name}! Here is what you need to know for your fitness progression (${weight} → ${target}):\n\n` +
    `1. **Nutrition Precision:** Every food has a calorie and macronutrient breakdown. Try asking me directly, like *"how many calories in 1 samosa"* or *"calories in 2 rotis"*!\n` +
    `2. **Consistent Strength Training:** Utilize our 12 AI Pose Trainers (Squats, Pushups, Curls, Lunges) with real-time rep and joint tracking.\n` +
    `3. **Recovery:** Maintain 7-8 hours of sleep and adequate hydration (3.2L+) to support your daily metabolism.\n\n` +
    `Feel free to ask me anything about calories in any food, workout form, fat loss, or muscle building!`;
}
