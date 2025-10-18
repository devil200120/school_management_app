import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  Building,
  Bitcoin,
  ArrowLeft,
  Shield,
  Lock,
  CheckCircle,
  Info,
  Calendar,
  User,
} from "lucide-react";
import SEO from "../components/SEO";
import routes from "../routes";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [paymentData, setPaymentData] = useState({
    // Card details
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    // Bank transfer details
    bankName: "",
    accountNumber: "",
    // Crypto details
    walletAddress: "",
    cryptoType: "bitcoin",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Promo code state
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [applyingPromo, setApplyingPromo] = useState(false);

  // Get subscription data from localStorage
  const [subscriptionData, setSubscriptionData] = useState(null);

  // Promo codes database
  const promoCodes = {
    LAUNCH25: { discount: 0.25, description: "25% off launch special" },
    EDUOS20: { discount: 0.2, description: "20% off for schools" },
    SAVE15: { discount: 0.15, description: "15% discount" },
    EARLY10: { discount: 0.1, description: "10% early adopter discount" },
    WELCOME5: { discount: 0.05, description: "5% welcome discount" },
  };

  // Apply promo code function
  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setApplyingPromo(true);
    setPromoError("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const upperPromoCode = promoCode.trim().toUpperCase();
    const promo = promoCodes[upperPromoCode];

    if (promo) {
      setAppliedPromo({
        code: upperPromoCode,
        discount: promo.discount,
        description: promo.description,
      });
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Please try again.");
    }

    setApplyingPromo(false);
  };

  // Remove promo code
  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  };

  useEffect(() => {
    // Get selected plan, user data, and school details from localStorage
    const planData = localStorage.getItem("selectedSubscriptionPlan");
    const userData = localStorage.getItem("registrationData");
    const schoolData = localStorage.getItem("schoolDetails");

    if (!planData || !userData) {
      // Redirect to subscription plans if no data found
      navigate(routes.subscriptionPlans);
      return;
    }

    const parsedPlanData = JSON.parse(planData);
    const parsedUserData = JSON.parse(userData);
    const parsedSchoolData = schoolData ? JSON.parse(schoolData) : null;

    setSubscriptionData({
      ...parsedPlanData,
      user: parsedUserData,
      school: parsedSchoolData,
    });
  }, [navigate]);

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Pay securely with your card",
      popular: true,
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building,
      description: "Direct bank account transfer",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: Bitcoin,
      description: "Pay with Bitcoin or Ethereum",
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (selectedPaymentMethod === "card") {
      if (!paymentData.cardNumber || paymentData.cardNumber.length < 16) {
        newErrors.cardNumber = "Valid card number is required";
      }
      if (
        !paymentData.expiryDate ||
        !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)
      ) {
        newErrors.expiryDate = "Valid expiry date (MM/YY) is required";
      }
      if (!paymentData.cvv || paymentData.cvv.length < 3) {
        newErrors.cvv = "Valid CVV is required";
      }
      if (!paymentData.cardName) {
        newErrors.cardName = "Cardholder name is required";
      }
    } else if (selectedPaymentMethod === "bank") {
      if (!paymentData.bankName) {
        newErrors.bankName = "Bank name is required";
      }
      if (!paymentData.accountNumber) {
        newErrors.accountNumber = "Account number is required";
      }
    } else if (selectedPaymentMethod === "crypto") {
      if (!paymentData.walletAddress) {
        newErrors.walletAddress = "Wallet address is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    // Format card number with spaces
    if (field === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      if (value.length > 19) value = value.slice(0, 19);
    }

    // Format expiry date
    if (field === "expiryDate") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      if (value.length > 5) value = value.slice(0, 5);
    }

    // Format CVV
    if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    setPaymentData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store payment data in localStorage
      const paymentInfo = {
        method: selectedPaymentMethod,
        amount: finalPrice,
        pricePerStudent: pricePerStudent,
        studentCount: studentCount,
        subtotal: subtotal,
        billingDiscount: billingDiscountAmount,
        promoCode: appliedPromo?.code || null,
        promoDiscount: promoDiscountAmount,
        plan: subscriptionData.name,
        billing: subscriptionData.billing,
        timestamp: new Date().toISOString(),
        transactionId: `EDU_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)
          .toUpperCase()}`,
      };

      localStorage.setItem("paymentData", JSON.stringify(paymentInfo));

      // Navigate to success page
      navigate(routes.paymentSuccessEduos);
    } catch (error) {
      console.error("Payment error:", error);
      // Handle payment error
    } finally {
      setIsProcessing(false);
    }
  };

  if (!subscriptionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  const discount =
    subscriptionData.billing === "yearly"
      ? 0.2
      : subscriptionData.billing === "two-term"
      ? 0.1
      : 0;

  // Get student count from school data
  const studentCount = subscriptionData.school?.studentCount
    ? parseInt(subscriptionData.school.studentCount)
    : 1;

  // Calculate pricing based on per-student cost and total students
  const pricePerStudent = subscriptionData.price;
  const subtotal = pricePerStudent * studentCount;
  const billingDiscountAmount = subtotal * discount;
  const afterBillingDiscount = subtotal - billingDiscountAmount;

  // Apply promo code discount (if any)
  const promoDiscountAmount = appliedPromo
    ? afterBillingDiscount * appliedPromo.discount
    : 0;
  const finalPrice = afterBillingDiscount - promoDiscountAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SEO
        title="Payment - EduOS"
        description="Complete your EduOS subscription payment securely"
      />

      <motion.div
        className="container mx-auto px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(routes.subscriptionPlans)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 group"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Plans</span>
        </motion.button>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-6"
            >
              <motion.div
                className="flex items-center mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Lock className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">
                  Secure Payment
                </h2>
                <Shield className="w-4 h-4 text-green-600 ml-2" />
              </motion.div>

              {/* Payment Methods */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-base font-semibold text-gray-700 mb-3">
                  Choose Payment Method
                </h3>
                <div className="grid gap-3">
                  {paymentMethods.map((method, index) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? "border-blue-500 bg-blue-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {method.popular && (
                        <motion.span
                          className="absolute -top-2 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6, type: "spring" }}
                        >
                          Popular
                        </motion.span>
                      )}
                      <div className="flex items-center">
                        <method.icon
                          className={`w-5 h-5 mr-3 ${
                            selectedPaymentMethod === method.id
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {method.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {method.description}
                          </p>
                        </div>
                        <motion.div
                          className={`ml-auto w-4 h-4 rounded-full border-2 ${
                            selectedPaymentMethod === method.id
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300"
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {selectedPaymentMethod === method.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <CheckCircle className="w-4 h-4 text-white -mt-0.5 -ml-0.5" />
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Payment Form Fields */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {selectedPaymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardName}
                        onChange={(e) =>
                          handleInputChange("cardName", e.target.value)
                        }
                        placeholder="John Doe"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                          errors.cardName ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.cardName && (
                        <motion.p
                          className="text-red-500 text-xs mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {errors.cardName}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) =>
                          handleInputChange("cardNumber", e.target.value)
                        }
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                          errors.cardNumber
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.cardNumber && (
                        <motion.p
                          className="text-red-500 text-xs mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {errors.cardNumber}
                        </motion.p>
                      )}
                    </motion.div>

                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={paymentData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          placeholder="MM/YY"
                          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                            errors.expiryDate
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.expiryDate && (
                          <motion.p
                            className="text-red-500 text-xs mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {errors.expiryDate}
                          </motion.p>
                        )}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={paymentData.cvv}
                          onChange={(e) =>
                            handleInputChange("cvv", e.target.value)
                          }
                          placeholder="123"
                          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                            errors.cvv ? "border-red-300" : "border-gray-300"
                          }`}
                        />
                        {errors.cvv && (
                          <motion.p
                            className="text-red-500 text-xs mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {errors.cvv}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {selectedPaymentMethod === "bank" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3"
                  >
                    <motion.div
                      className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-start">
                        <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800 text-sm">
                            Bank Transfer Instructions
                          </h4>
                          <p className="text-xs text-blue-700 mt-1">
                            After submitting this form, you&apos;ll receive bank
                            account details to complete your transfer. Your
                            subscription will be activated once payment is
                            confirmed.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Your Bank Name
                      </label>
                      <input
                        type="text"
                        value={paymentData.bankName}
                        onChange={(e) =>
                          handleInputChange("bankName", e.target.value)
                        }
                        placeholder="First Bank Nigeria"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                          errors.bankName ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.bankName && (
                        <motion.p
                          className="text-red-500 text-xs mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {errors.bankName}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Your Account Number
                      </label>
                      <input
                        type="text"
                        value={paymentData.accountNumber}
                        onChange={(e) =>
                          handleInputChange("accountNumber", e.target.value)
                        }
                        placeholder="1234567890"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                          errors.accountNumber
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.accountNumber && (
                        <motion.p
                          className="text-red-500 text-xs mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {errors.accountNumber}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>
                )}

                {selectedPaymentMethod === "crypto" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Cryptocurrency Type
                      </label>
                      <select
                        value={paymentData.cryptoType}
                        onChange={(e) =>
                          handleInputChange("cryptoType", e.target.value)
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="bitcoin">Bitcoin (BTC)</option>
                        <option value="ethereum">Ethereum (ETH)</option>
                        <option value="usdt">Tether (USDT)</option>
                      </select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Your Wallet Address
                      </label>
                      <input
                        type="text"
                        value={paymentData.walletAddress}
                        onChange={(e) =>
                          handleInputChange("walletAddress", e.target.value)
                        }
                        placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                          errors.walletAddress
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.walletAddress && (
                        <motion.p
                          className="text-red-500 text-xs mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {errors.walletAddress}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>

              {/* Security Note */}
              <motion.div
                className="mt-5 bg-green-50 border border-green-200 rounded-lg p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-600 mr-2" />
                  <p className="text-xs text-green-700">
                    Your payment information is encrypted and secure. We never
                    store your card details.
                  </p>
                </div>
              </motion.div>

              {/* Promo Code Section */}
              <motion.div
                className="mt-5 border border-gray-200 rounded-lg p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Have a promo code?
                </h4>

                {!appliedPromo ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) =>
                        setPromoCode(e.target.value.toUpperCase())
                      }
                      onKeyPress={(e) => e.key === "Enter" && applyPromoCode()}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <motion.button
                      type="button"
                      onClick={applyPromoCode}
                      disabled={applyingPromo || !promoCode.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {applyingPromo ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                          <span>Applying...</span>
                        </div>
                      ) : (
                        "Apply"
                      )}
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <div>
                        <p className="font-semibold text-green-800 text-sm">
                          {appliedPromo.code} Applied!
                        </p>
                        <p className="text-xs text-green-700">
                          {appliedPromo.description}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-800 font-medium text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove
                    </motion.button>
                  </motion.div>
                )}

                {promoError && (
                  <motion.p
                    className="text-red-500 text-xs mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {promoError}
                  </motion.p>
                )}
              </motion.div>

              {/* Payment Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span className="text-sm">Processing Payment...</span>
                  </motion.div>
                ) : (
                  `Pay ₦${finalPrice.toLocaleString()}`
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-5 sticky top-8"
            >
              <motion.h3
                className="text-lg font-bold text-gray-800 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Order Summary
              </motion.h3>

              {/* User Info */}
              <motion.div
                className="mb-5 p-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center mb-2">
                  <User className="w-3 h-3 text-gray-600 mr-2" />
                  <span className="text-xs font-medium text-gray-600">
                    Account Holder
                  </span>
                </div>
                <p className="font-semibold text-gray-800 text-sm">
                  {subscriptionData.user.firstName}{" "}
                  {subscriptionData.user.lastName}
                </p>
                <p className="text-xs text-gray-600">
                  {subscriptionData.user.email}
                </p>
              </motion.div>

              {/* Plan Details */}
              <motion.div
                className="space-y-3 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">Plan</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {subscriptionData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">Billing</span>
                  <span className="font-semibold text-gray-800 capitalize text-sm">
                    {subscriptionData.billing}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">Students</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {studentCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">
                    Price per student
                  </span>
                  <span className="font-semibold text-gray-800 text-sm">
                    ₦{pricePerStudent.toLocaleString()}
                  </span>
                </div>
              </motion.div>

              <hr className="border-gray-200 mb-4" />

              {/* Pricing Breakdown */}
              <motion.div
                className="space-y-2.5 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">
                    Subtotal ({studentCount} × ₦
                    {pricePerStudent.toLocaleString()})
                  </span>
                  <span className="text-gray-800 text-sm">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>

                {discount > 0 && (
                  <motion.div
                    className="flex justify-between text-green-600"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="text-xs">
                      Billing Discount ({Math.round(discount * 100)}% off)
                    </span>
                    <span className="text-sm">
                      -₦{billingDiscountAmount.toLocaleString()}
                    </span>
                  </motion.div>
                )}

                {appliedPromo && (
                  <motion.div
                    className="flex justify-between text-purple-600"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-xs">
                      Promo Code ({appliedPromo.code} -{" "}
                      {Math.round(appliedPromo.discount * 100)}% off)
                    </span>
                    <span className="text-sm">
                      -₦{promoDiscountAmount.toLocaleString()}
                    </span>
                  </motion.div>
                )}

                <hr className="border-gray-200" />

                <motion.div
                  className="flex justify-between text-base font-bold"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="text-gray-800">Total</span>
                  <span className="text-blue-600">
                    ₦{finalPrice.toLocaleString()}
                  </span>
                </motion.div>
              </motion.div>

              {/* Payment Schedule */}
              <motion.div
                className="bg-blue-50 rounded-lg p-3 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center mb-2">
                  <Calendar className="w-3 h-3 text-blue-600 mr-2" />
                  <span className="text-xs font-medium text-blue-800">
                    Payment Schedule
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  {subscriptionData.billing === "yearly" &&
                    "Billed annually with 20% savings"}
                  {subscriptionData.billing === "two-term" &&
                    "Billed every 6 months with 10% savings"}
                  {subscriptionData.billing === "termly" &&
                    "Billed every 3 months"}
                </p>
              </motion.div>

              {/* Money Back Guarantee */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <div className="flex items-center justify-center text-green-600 mb-2">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span className="text-xs font-medium">
                    30-day money-back guarantee
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;
