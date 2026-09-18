import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TokenContext = createContext();

export const PLANS = [
  {
    id: 'starter',
    name: 'Starter Booster',
    tokens: 100,
    priceInr: 99,
    priceUsd: 1.29,
    badge: 'Quick Top-Up',
    popular: false,
    theme: 'emerald',
    themeName: 'Electric Mint & Emerald',
    accentColor: '#10b981',
    description: 'Perfect for quick workout reviews, diet checks, and AI coaching questions.',
    features: [
      '100 FitFlow AI Tokens',
      'Valid for 90 Days',
      'AI Fitness Coach Questions (1 token/ea)',
      'AI Pose-Tracking Workouts (2 tokens/ea)',
      'Basic Meal & Macro Generator',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Athlete Pack',
    tokens: 600, // 500 + 100 free bonus
    bonusTokens: 100,
    priceInr: 299,
    priceUsd: 3.69,
    badge: 'Most Popular',
    popular: true,
    theme: 'indigo',
    themeName: 'Royal Indigo & Violet',
    accentColor: '#6366f1',
    description: 'Our highest value bundle for dedicated athletes training 3-5 days per week.',
    features: [
      '500 + 100 BONUS Tokens (600 Total)',
      'Never Expires',
      'Priority Fast AI Coach Answers',
      'All 12 AI Pose-Tracking Modules',
      'Detailed Macro & Calorie Burn Engine',
      'Free Daily Streak Token Boost (+10)',
    ],
  },
  {
    id: 'vip',
    name: 'Unlimited VIP Elite',
    tokens: 999999,
    isUnlimited: true,
    priceInr: 699,
    priceUsd: 8.49,
    badge: '30-Day VIP Pass',
    popular: false,
    theme: 'amber',
    themeName: 'Royal Cyber-Gold & Obsidian',
    accentColor: '#f59e0b',
    description: 'Zero limits. Complete VIP access to all AI models, camera vision & personalized coaching.',
    features: [
      'Unlimited AI Tokens for 30 Days',
      'Real-time Computer Vision Rep Counting',
      'Customized Diet & Meal Blueprints',
      '1-on-1 AI Ergonomics & Form Correction',
      'Verified PRO Athlete Profile Badge',
      'Dedicated Priority Server Access',
    ],
  },
];

export const TokenProvider = ({ children }) => {
  const { currentUser, updateProfile } = useAuth();

  // Storage key based on user, fallback to guest
  const storageKey = currentUser?.userId
    ? `fitflow_tokens_${currentUser.userId}`
    : 'fitflow_tokens_guest';

  // Load token data
  const [tokenState, setTokenState] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          tokens: typeof parsed.tokens === 'number' ? parsed.tokens : 50,
          plan: parsed.plan || 'Free Trial',
          isUnlimited: !!parsed.isUnlimited,
          vipExpiresAt: parsed.vipExpiresAt || null,
          lastDailyClaim: parsed.lastDailyClaim || null,
          transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
        };
      }
    } catch (e) {
      console.error('Error loading token state:', e);
    }

    return {
      tokens: 50, // Initial Free Trial Grant
      plan: 'Free Trial',
      isUnlimited: false,
      vipExpiresAt: null,
      lastDailyClaim: null,
      transactions: [
        {
          id: 'TXN_WELCOME_TRIAL',
          type: 'CREDIT',
          amountTokens: 50,
          cost: '₹0 (Free Trial)',
          description: 'Welcome Free Trial Allotment',
          date: new Date().toISOString(),
          status: 'Completed',
          paymentMethod: 'FitFlow Welcome Trial',
        },
      ],
    };
  });

  // Global Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(PLANS[1]); // Default to Pro Pack
  const [insufficientTokensAlert, setInsufficientTokensAlert] = useState(null);

  // Sync with user switch or changes
  useEffect(() => {
    const currentKey = currentUser?.userId
      ? `fitflow_tokens_${currentUser.userId}`
      : 'fitflow_tokens_guest';

    try {
      const saved = localStorage.getItem(currentKey);
      if (saved) {
        setTokenState(JSON.parse(saved));
      } else {
        // If brand new profile, grant fresh 50 trial tokens
        const freshState = {
          tokens: 50,
          plan: 'Free Trial',
          isUnlimited: false,
          vipExpiresAt: null,
          lastDailyClaim: null,
          transactions: [
            {
              id: `TXN_TRIAL_${Date.now().toString().slice(-6)}`,
              type: 'CREDIT',
              amountTokens: 50,
              cost: '₹0 (Free Trial)',
              description: 'Welcome Free Trial Allotment',
              date: new Date().toISOString(),
              status: 'Completed',
              paymentMethod: 'FitFlow Welcome Trial',
            },
          ],
        };
        setTokenState(freshState);
        localStorage.setItem(currentKey, JSON.stringify(freshState));
      }
    } catch (e) {
      console.error('Failed to sync tokens on user switch:', e);
    }
  }, [currentUser?.userId]);

  // Persist to localStorage whenever tokenState updates
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tokenState));
    } catch (e) {
      console.error('Failed to save tokens to localStorage:', e);
    }
  }, [tokenState, storageKey]);

  // Open Payment Modal with optional preselected plan
  const openPaymentModal = (planIdOrObject) => {
    if (typeof planIdOrObject === 'string') {
      const found = PLANS.find((p) => p.id === planIdOrObject) || PLANS[1];
      setSelectedPlanForCheckout(found);
    } else if (planIdOrObject && planIdOrObject.id) {
      setSelectedPlanForCheckout(planIdOrObject);
    } else {
      setSelectedPlanForCheckout(PLANS[1]);
    }
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setInsufficientTokensAlert(null);
  };

  // Consume tokens for an AI activity
  const consumeTokens = (count = 1, reason = 'FitFlow AI Activity') => {
    // Check if user has active VIP Unlimited
    if (tokenState.isUnlimited) {
      const logTxn = {
        id: `USE_${Date.now().toString().slice(-6)}`,
        type: 'DEBIT_VIP',
        amountTokens: 0,
        cost: 'Included in VIP',
        description: reason,
        date: new Date().toISOString(),
        status: 'Completed',
      };
      setTokenState((prev) => ({
        ...prev,
        transactions: [logTxn, ...prev.transactions].slice(0, 50),
      }));
      return { success: true, remainingTokens: Infinity, isUnlimited: true };
    }

    if (tokenState.tokens < count) {
      setInsufficientTokensAlert({
        required: count,
        available: tokenState.tokens,
        actionName: reason,
      });
      return {
        success: false,
        reason: 'INSUFFICIENT_TOKENS',
        required: count,
        available: tokenState.tokens,
      };
    }

    const remaining = tokenState.tokens - count;
    const logTxn = {
      id: `USE_${Date.now().toString().slice(-6)}`,
      type: 'DEBIT',
      amountTokens: -count,
      cost: `${count} Token${count > 1 ? 's' : ''}`,
      description: reason,
      date: new Date().toISOString(),
      status: 'Completed',
    };

    setTokenState((prev) => ({
      ...prev,
      tokens: remaining,
      transactions: [logTxn, ...prev.transactions].slice(0, 50),
    }));

    return { success: true, remainingTokens: remaining };
  };

  // Add tokens (called after successful payment checkout)
  const addTokens = ({
    planId,
    tokenAmount,
    pricePaid,
    paymentMethod,
    transactionId,
    orderId,
  }) => {
    const isVip = planId === 'vip';
    const planObj = PLANS.find((p) => p.id === planId);
    const planName = planObj ? planObj.name : 'Token Pack';

    const newTxn = {
      id: transactionId || `TXN_${Date.now().toString().slice(-8)}`,
      orderId: orderId || `ORD_${Date.now().toString().slice(-6)}`,
      type: 'CREDIT',
      amountTokens: isVip ? 'Unlimited' : tokenAmount,
      cost: `₹${pricePaid}`,
      description: `${planName} Purchase`,
      date: new Date().toISOString(),
      status: 'Completed',
      paymentMethod: paymentMethod || 'Online Gateway',
    };

    setTokenState((prev) => ({
      ...prev,
      tokens: isVip ? prev.tokens + 1000 : prev.tokens + tokenAmount,
      plan: planName,
      isUnlimited: isVip ? true : prev.isUnlimited,
      vipExpiresAt: isVip
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        : prev.vipExpiresAt,
      transactions: [newTxn, ...prev.transactions].slice(0, 50),
    }));

    // Update user rank/role if VIP
    if (isVip && currentUser) {
      updateProfile({ role: 'PRO VIP Athlete' });
    }

    return newTxn;
  };

  // Claim Daily Free Trial Refill (+5 tokens every 24 hrs)
  const claimDailyTrialBonus = () => {
    const today = new Date().toISOString().split('T')[0];
    if (tokenState.lastDailyClaim === today) {
      return {
        success: false,
        message: 'You have already claimed today\'s Free Trial Bonus! Come back tomorrow.',
      };
    }

    const bonus = 5;
    const bonusTxn = {
      id: `DAILY_${Date.now().toString().slice(-6)}`,
      type: 'DAILY_BONUS',
      amountTokens: bonus,
      cost: '₹0 (Free Daily Reward)',
      description: 'Daily Streak Free Trial Bonus',
      date: new Date().toISOString(),
      status: 'Completed',
      paymentMethod: 'Daily Streak Bonus',
    };

    setTokenState((prev) => ({
      ...prev,
      tokens: prev.tokens + bonus,
      lastDailyClaim: today,
      transactions: [bonusTxn, ...prev.transactions].slice(0, 50),
    }));

    return {
      success: true,
      bonus,
      newTotal: tokenState.tokens + bonus,
      message: `🎉 Success! +${bonus} Free Trial Tokens added to your wallet!`,
    };
  };

  const isDailyClaimAvailable = () => {
    const today = new Date().toISOString().split('T')[0];
    return tokenState.lastDailyClaim !== today;
  };

  // Instant switch / activate membership for testing and preview
  const activatePlan = (planId) => {
    const isVip = planId === 'vip';
    const planObj = PLANS.find((p) => p.id === planId);
    const planName = planObj ? planObj.name : 'Free Trial';

    setTokenState((prev) => ({
      ...prev,
      tokens: isVip ? 999999 : planId === 'pro' ? 600 : planId === 'starter' ? 100 : 50,
      plan: planName,
      isUnlimited: isVip,
      vipExpiresAt: isVip ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null,
    }));

    if (currentUser) {
      updateProfile({
        role: isVip
          ? '👑 PRO VIP Athlete'
          : planId === 'pro'
          ? '🔥 Pro Athlete Member'
          : planId === 'starter'
          ? '⚡ Starter Athlete Member'
          : 'Athlete',
      });
    }
  };

  return (
    <TokenContext.Provider
      value={{
        tokens: tokenState.tokens,
        plan: tokenState.plan,
        isUnlimited: tokenState.isUnlimited,
        vipExpiresAt: tokenState.vipExpiresAt,
        transactions: tokenState.transactions,
        consumeTokens,
        addTokens,
        activatePlan,
        claimDailyTrialBonus,
        isDailyClaimAvailable,
        openPaymentModal,
        closePaymentModal,
        isPaymentModalOpen,
        selectedPlanForCheckout,
        setSelectedPlanForCheckout,
        insufficientTokensAlert,
        setInsufficientTokensAlert,
        plans: PLANS,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
};

export default TokenContext;
