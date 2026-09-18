import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  Download,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Gift,
} from 'lucide-react';
import { useTokens, PLANS } from '../context/TokenContext';
import { useAuth } from '../context/AuthContext';

export default function PaymentGatewayModal() {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    selectedPlanForCheckout,
    setSelectedPlanForCheckout,
    addTokens,
    insufficientTokensAlert,
  } = useTokens();

  const { currentUser } = useAuth();

  const [activeMethod, setActiveMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('hdfc');
  const [selectedWallet, setSelectedWallet] = useState('phonepe');

  // Checkout phases: 'selection' -> 'processing' -> 'otp' -> 'success'
  const [checkoutPhase, setCheckoutPhase] = useState('selection');
  const [processingStepText, setProcessingStepText] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [receiptData, setReceiptData] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Sync initial cardholder name with current user
  useEffect(() => {
    if (currentUser?.name) {
      setCardName(currentUser.name);
    }
    if (currentUser?.userId) {
      setUpiId(`${currentUser.userId}@okhdfcbank`);
    }
  }, [currentUser]);

  // Reset phase when modal opens
  useEffect(() => {
    if (isPaymentModalOpen) {
      setCheckoutPhase('selection');
      setReceiptData(null);
    }
  }, [isPaymentModalOpen]);

  if (!isPaymentModalOpen) return null;

  const currentPlan = selectedPlanForCheckout || PLANS[1];
  const subtotal = currentPlan.priceInr;
  const gstAmount = Math.round(subtotal * 0.18);
  const totalAmount = subtotal; // All-inclusive GST

  // Format card number with spaces
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  // Format MM/YY
  const handleExpiryChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  // Detect card brand
  const getCardBrand = () => {
    const num = cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'Mastercard';
    if (num.startsWith('6')) return 'RuPay';
    return 'Credit/Debit';
  };

  // Copy Merchant UPI ID
  const handleCopyMerchantUpi = () => {
    navigator.clipboard?.writeText('pay.fitflow@icici');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // Execute Payment Simulation
  const handleInitiatePayment = (e) => {
    e?.preventDefault();

    if (activeMethod === 'card') {
      // Trigger 3D Secure OTP Step
      setCheckoutPhase('otp');
      setOtpCode('782941'); // Prefill 3D Secure simulation code
      return;
    }

    startPaymentProcessing();
  };

  const startPaymentProcessing = () => {
    setCheckoutPhase('processing');
    setProcessingStepText('Initializing 256-Bit SSL Secure Gateway...');

    setTimeout(() => {
      setProcessingStepText(
        activeMethod === 'upi'
          ? 'Contacting NPCI UPI Payment Switch...'
          : activeMethod === 'card'
          ? 'Verifying Card Security & 3D Secure Token...'
          : 'Connecting to Core Banking Server...'
      );
    }, 800);

    setTimeout(() => {
      setProcessingStepText('Payment authorized! Crediting FitFlow AI Tokens...');
    }, 1700);

    setTimeout(() => {
      const txnId = `TXN_${Date.now().toString().slice(-8)}`;
      const ordId = `ORD_${Date.now().toString().slice(-6)}`;
      const invId = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const methodNames = {
        upi: `UPI (${upiId || 'QR Instant Scan'})`,
        card: `${getCardBrand()} Card (ending in ${cardNumber.slice(-4) || '4242'})`,
        netbanking: `Net Banking (${selectedBank.toUpperCase()})`,
        wallet: `Mobile Wallet (${selectedWallet.toUpperCase()})`,
      };

      // Credit tokens in context
      const createdTxn = addTokens({
        planId: currentPlan.id,
        tokenAmount: currentPlan.tokens,
        pricePaid: totalAmount,
        paymentMethod: methodNames[activeMethod],
        transactionId: txnId,
        orderId: ordId,
      });

      setReceiptData({
        ...createdTxn,
        invoiceId: invId,
        orderId: ordId,
        customerName: currentUser?.name || 'FitFlow Athlete',
        customerEmail: currentUser?.email || 'athlete@fitflow.ai',
        planName: currentPlan.name,
        tokensAdded: currentPlan.isUnlimited ? 'Unlimited (30 Days)' : currentPlan.tokens,
        amount: totalAmount,
        basePrice: Math.round(totalAmount / 1.18),
        gst: totalAmount - Math.round(totalAmount / 1.18),
        date: new Date().toLocaleString(),
        paymentMethodDisplay: methodNames[activeMethod],
      });

      setCheckoutPhase('success');
    }, 2500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="relative px-6 py-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white flex items-center justify-between border-b border-indigo-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
              <Zap size={22} className="fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold tracking-tight">
                  FitFlow Secure Checkout
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck size={11} /> 256-Bit SSL
                </span>
              </div>
              <p className="text-xs text-indigo-200/80">
                Instant Token Allotment & VIP Activation
              </p>
            </div>
          </div>

          <button
            onClick={closePaymentModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Insufficient Tokens Warning Banner if triggered by out-of-tokens */}
        {insufficientTokensAlert && checkoutPhase === 'selection' && (
          <div className="px-6 py-2.5 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2.5 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <AlertCircle size={16} className="shrink-0 text-amber-500" />
            <span>
              Your trial tokens are depleted. Choose a token booster below to continue your{' '}
              <strong>{insufficientTokensAlert.actionName}</strong>!
            </span>
          </div>
        )}

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-grow">
          {/* PHASE 1: Plan & Payment Selection */}
          {checkoutPhase === 'selection' && (
            <>
              {/* Plan Selection Cards */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Select Your Plan / Token Bundle:
                  </label>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Instant Credit
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {PLANS.map((p) => {
                    const isSelected = currentPlan.id === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPlanForCheckout(p)}
                        className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-md shadow-indigo-500/15 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                        }`}
                      >
                        {p.badge && (
                          <span
                            className={`absolute -top-2.5 right-3 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs ${
                              p.popular
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                                : 'bg-indigo-600 text-white'
                            }`}
                          >
                            {p.badge}
                          </span>
                        )}

                        <div>
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {p.name}
                          </p>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-xl font-black text-slate-900 dark:text-white">
                              ₹{p.priceInr}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              / {p.isUnlimited ? 'month' : `${p.tokens} tokens`}
                            </span>
                          </div>
                          {p.bonusTokens && (
                            <span className="inline-block mt-1 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                              🎁 +{p.bonusTokens} Free Bonus
                            </span>
                          )}
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-bold">
                          <span className={isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}>
                            {isSelected ? '✓ Selected' : 'Tap to Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="pt-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  Payment Method:
                </label>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / QR', icon: QrCode },
                    { id: 'card', label: 'Cards', icon: CreditCard },
                    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                    { id: 'wallet', label: 'Wallets', icon: Wallet },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isActive = activeMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setActiveMethod(m.id)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon size={18} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method Details Form */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                {/* 1. UPI METHOD */}
                {activeMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                      {/* Dynamic Simulated QR Code */}
                      <div className="p-2.5 bg-white rounded-xl shadow-md border border-slate-200 flex flex-col items-center shrink-0">
                        <div className="relative w-32 h-32 bg-slate-900 rounded-lg flex items-center justify-center p-2 text-white">
                          {/* Stylized QR Code Graphic */}
                          <div className="w-full h-full border-4 border-indigo-400 p-1.5 flex flex-col justify-between">
                            <div className="flex justify-between">
                              <div className="w-5 h-5 bg-white rounded-xs" />
                              <div className="w-5 h-5 bg-white rounded-xs" />
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-[10px] font-black text-white shadow-xs">
                                ⚡
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div className="w-5 h-5 bg-white rounded-xs" />
                              <div className="w-5 h-5 bg-amber-400 rounded-xs animate-pulse" />
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-700 mt-1.5 flex items-center gap-1">
                          Scan to Pay ₹{totalAmount}
                        </span>
                      </div>

                      {/* Supported UPI Apps */}
                      <div className="flex-grow space-y-2 text-center sm:text-left">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          Scan with Any UPI App
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Supports Google Pay, PhonePe, Paytm, CRED, BHIM & all banking apps.
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1 justify-center sm:justify-start">
                          {['GPay', 'PhonePe', 'Paytm', 'CRED', 'BHIM'].map((app) => (
                            <span
                              key={app}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                            >
                              {app}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center gap-2 justify-center sm:justify-start">
                          <span className="text-[10px] text-slate-400 font-mono">
                            pay.fitflow@icici
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyMerchantUpi}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                          >
                            {copiedUpi ? <Check size={12} /> : <Copy size={12} />}
                            <span>{copiedUpi ? 'Copied' : 'Copy UPI'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center my-2">
                      <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
                      <span className="bg-slate-50 dark:bg-slate-800 px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
                        Or Pay via UPI ID / VPA
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Enter UPI ID
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. yourname@okhdfcbank"
                          className="flex-grow px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CARD METHOD */}
                {activeMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Card Details
                      </span>
                      <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                        {getCardBrand()}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4532 8912 3456 7890"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono tracking-wider focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                          CVV / Security Code
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name on card"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* 3. NET BANKING METHOD */}
                {activeMethod === 'netbanking' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Select Your Bank:
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'hdfc', name: 'HDFC Bank' },
                        { id: 'sbi', name: 'State Bank of India' },
                        { id: 'icici', name: 'ICICI Bank' },
                        { id: 'axis', name: 'Axis Bank' },
                        { id: 'kotak', name: 'Kotak Bank' },
                        { id: 'other', name: 'All Other Banks' },
                      ].map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBank(bank.id)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                            selectedBank === bank.id
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          🏦 {bank.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. WALLET METHOD */}
                {activeMethod === 'wallet' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Select Mobile Wallet:
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'phonepe', name: 'PhonePe' },
                        { id: 'paytm', name: 'Paytm Wallet' },
                        { id: 'amazon', name: 'Amazon Pay' },
                      ].map((w) => (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setSelectedWallet(w.id)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                            selectedWallet === w.id
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          📱 {w.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{currentPlan.name} ({currentPlan.isUnlimited ? 'Unlimited' : `${currentPlan.tokens} Tokens`})</span>
                  <span>₹{Math.round(totalAmount / 1.18)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                  <span>GST (18% inclusive)</span>
                  <span>₹{totalAmount - Math.round(totalAmount / 1.18)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-extrabold text-sm text-slate-900 dark:text-white">
                  <span>Total Amount Payable:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-base">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleInitiatePayment}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Lock size={16} />
                <span>Pay ₹{totalAmount} & Activate {currentPlan.isUnlimited ? 'VIP Pass' : `${currentPlan.tokens} Tokens`}</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-500" /> RBI Compliant
                </span>
                <span>•</span>
                <span>Instant Token Allotment</span>
                <span>•</span>
                <span>100% Refund Guarantee</span>
              </div>
            </>
          )}

          {/* PHASE 2: 3D Secure OTP Verification Simulation */}
          {checkoutPhase === 'otp' && (
            <div className="py-6 px-4 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-200/60 dark:border-indigo-800/60 shadow-sm">
                <Lock size={26} />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Bank 3D Secure Authentication
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  A one-time simulation passcode was sent to your registered mobile number for authorizing <strong>₹{totalAmount}</strong>.
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center text-xl font-mono tracking-widest py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="123456"
                />
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ Simulation test OTP auto-filled
                </p>
              </div>

              <div className="flex gap-2 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => setCheckoutPhase('selection')}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={startPaymentProcessing}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Submit & Authorize
                </button>
              </div>
            </div>
          )}

          {/* PHASE 3: Processing Animation */}
          {checkoutPhase === 'processing' && (
            <div className="py-12 text-center space-y-5 animate-in fade-in duration-200">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900 animate-ping opacity-30" />
                <div className="w-20 h-20 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin flex items-center justify-center">
                  <Lock size={24} className="text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Processing Payment...
                </h4>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1 animate-pulse">
                  {processingStepText}
                </p>
                <p className="text-[11px] text-slate-400 mt-2">
                  Please do not refresh or close this window.
                </p>
              </div>
            </div>
          )}

          {/* PHASE 4: Tax Invoice & Payment Success */}
          {checkoutPhase === 'success' && receiptData && (
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              {/* Success Banner */}
              <div className="text-center py-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-300 dark:border-emerald-800 shadow-md">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  Payment Successful!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Your FitFlow tokens have been credited to your account.
                </p>
              </div>

              {/* Printable Digital Tax Invoice */}
              <div
                id="printable-tax-invoice"
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 font-sans text-xs"
              >
                <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-700 pb-3">
                  <div>
                    <span className="text-base font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      FitFlow AI Technology Ltd.
                    </span>
                    <p className="text-[10px] text-slate-400">
                      Tax Invoice / Payment Receipt
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">
                      {receiptData.invoiceId}
                    </p>
                    <p className="text-[10px] text-slate-400">{receiptData.date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Billed To:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{receiptData.customerName}</strong>
                    <p className="text-slate-500">{receiptData.customerEmail}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Payment Mode:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{receiptData.paymentMethodDisplay}</span>
                    <p className="text-slate-500 font-mono text-[10px]">{receiptData.id}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between py-1 font-bold text-slate-800 dark:text-slate-200">
                    <span>{receiptData.planName}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      +{receiptData.tokensAdded} Tokens
                    </span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-500">
                    <span>Amount Paid (incl. 18% GST)</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ₹{receiptData.amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download / Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={closePaymentModal}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-xs shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Start Training Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
