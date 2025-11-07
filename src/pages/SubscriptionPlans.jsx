import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import routes from "../routes";

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [selectedBillingCycle, setSelectedBillingCycle] = useState("termly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const billingCycles = {
    termly: { label: "Termly", discount: 0 },
    "two-terms": { label: "Two Terms", discount: 0.05 },
    yearly: { label: "Yearly", discount: 0.1 },
  };

  const plans = [
    {
      name: "Bronze",
      subtitle: "The Essentials",
      price: 250,
      usdPrice: 0.16,
      students: "Up to 500",
      description:
        "Web Only - Perfect for schools starting their digital transformation",
      color: "from-amber-600 to-amber-800",
      borderColor: "border-amber-200 hover:border-amber-400",
      popular: false,
      features: [
        "Student Panel (Web): Dashboard, Print Result, Print Form, Print Exam Pass",
        "Teacher Panel (Web): Dashboard, Result Management",
        "Admin Panel (Web): Basic Dashboard, Result Management, Event Management",
        "Full management modules: Admin, Class, Department, Level, News, Promotion, Section, Subject, Term",
        "Notification, Pin Generator, and School Settings tools",
        "Payment settings not available",
        "Accountant Panel: Not Available",
        "Mobile App: Not Included",
      ],
    },
    {
      name: "Silver",
      subtitle: "Operational Efficiency",
      price: 500,
      usdPrice: 0.33,
      students: "Up to 1,000",
      description:
        "Web Only - Integrated financial management for growing schools",
      color: "from-gray-500 to-gray-700",
      borderColor: "border-gray-200 hover:border-gray-400",
      popular: false,
      features: [
        "All Bronze features included",
        "Student Panel (Web): Adds E-Library, Assessment, Make Payment, Time Table",
        "Teacher Panel (Web): Adds Time-Table and Assessment management, Basic Attendance",
        "Accountant Panel (Web): Payment Processing, Payment Management, Fee Collection, Reports (Collection, Balance Sheets, Revenue Analysis)",
        "Admin Panel (Web): Adds Manage Time-Table, School Library, Manage Assessment, Basic Attendance Management",
        "Payment Management, Class Payment List, Payment Method, Payment Purpose",
        "Mobile App: Not Included",
      ],
    },
    {
      name: "Gold",
      subtitle: "Engagement & Analytics",
      price: 750,
      usdPrice: 0.49,
      students: "Up to 2,000",
      description:
        "Web Only - Advanced tracking and student engagement features",
      color: "from-yellow-500 to-yellow-700",
      borderColor: "border-yellow-200 hover:border-yellow-400",
      popular: true,
      features: [
        "All Silver features included (Basic Attendance)",
        "Student Panel (Web): Adds Online Exam and Attendance Report",
        "Teacher Panel (Web): Adds Exam Management, Lesson Plan, Teacher/Student Attendance, QR-based Attendance",
        "Admin Panel (Web): Adds Analytics, Teacher/Student Attendance management, QR-based Attendance",
        "Exam Management, Teacher Comment Management, Inventory, Lesson Plan Management",
        "Accountant Panel: Same as Silver",
        "Mobile App: Not Included",
      ],
    },
    {
      name: "Platinum",
      subtitle: "The Ultimate Ecosystem",
      price: 1000,
      usdPrice: 0.65,
      students: "Unlimited",
      description:
        "Web + Mobile - Complete modern platform with mobile accessibility",
      color: "from-purple-600 to-purple-800",
      borderColor: "border-purple-200 hover:border-purple-400",
      popular: false,
      features: [
        "All Gold features included (QR Attendance)",
        "Student Panel (Web & Mobile): Adds Assignment, Quiz, E-Learning, Live Class",
        "Teacher Panel (Web & Mobile): Adds Quiz, Assignment, Live Class management",
        "Accountant Panel (Web): Adds Expenses, Salary Management, Petty Cash",
        "Admin Panel (Web): Adds User Management, Quiz Management, Live Class & Course management",
        "Assignment Features, Basic Attendance, QR Attendance, Face Recognition, NFC Attendance",
        "Report Card Insights, E-Learning management",
        "Mobile App Access: Exclusively for Teachers and Students",
      ],
    },
  ];

  const calculatePrice = (basePrice) => {
    const discount = billingCycles[selectedBillingCycle].discount;
    return Math.round(basePrice * (1 - discount));
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const toggleExpanded = (planName) => {
    setExpandedCards((prev) => ({
      ...prev,
      [planName]: !prev[planName],
    }));
  };

  const handleContinue = () => {
    if (selectedPlan) {
      // Store subscription data in localStorage
      const subscriptionData = {
        name: selectedPlan.name,
        price: selectedPlan.price,
        billing: selectedBillingCycle,
        students: selectedPlan.students,
        finalPrice: calculatePrice(selectedPlan.price),
        features: selectedPlan.features,
      };

      localStorage.setItem(
        "selectedSubscriptionPlan",
        JSON.stringify(subscriptionData)
      );

      // Navigate to school details page
      navigate(routes.schoolDetails);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <img src="/EDUOSlogo.png" alt="EDUOS" className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EDUOS
              </span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center"
            >
              <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                ✓
              </div>
              <span className="ml-2 text-xs text-green-600 font-medium">
                Account Created
              </span>
            </motion.div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-indigo-600 rounded-full"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center"
            >
              <div className="w-7 h-7 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                2
              </div>
              <span className="ml-2 text-xs text-indigo-600 font-medium">
                Choose Plan
              </span>
            </motion.div>
            <div className="w-8 h-0.5 bg-gray-200 rounded-full"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center"
            >
              <div className="w-7 h-7 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="ml-2 text-xs text-gray-400 font-medium">
                School Details
              </span>
            </motion.div>
            <div className="w-8 h-0.5 bg-gray-200 rounded-full"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center"
            >
              <div className="w-7 h-7 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">
                4
              </div>
              <span className="ml-2 text-xs text-gray-400 font-medium">
                Payment
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Choose Your Subscription Plan
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select the plan that best fits your school&apos;s needs. You can
            upgrade or downgrade anytime.
          </p>
        </motion.div>

        {/* Billing Cycle Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Select Billing Cycle
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Choose your payment frequency and save more with longer commitments
          </p>
          <div className="flex justify-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/20">
              {Object.entries(billingCycles).map(([key, cycle], index) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBillingCycle(key)}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                    selectedBillingCycle === key
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white/50"
                  }`}
                >
                  {cycle.label}
                  {cycle.discount > 0 && (
                    <div className="mt-0.5">
                      <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-bold">
                        Save {Math.round(cycle.discount * 100)}%
                      </span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group ${
                selectedPlan?.name === plan.name
                  ? "ring-2 ring-indigo-500 shadow-xl scale-[1.02] bg-gradient-to-br from-white to-indigo-50"
                  : "shadow-md hover:shadow-lg hover:-translate-y-1"
              } ${
                plan.popular
                  ? "border-2 border-yellow-400"
                  : "border border-gray-100"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectPlan(plan)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Selection Indicator */}
              {selectedPlan?.name === plan.name && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-3 right-3 z-10"
                >
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </motion.div>
              )}

              {/* Header Section */}
              <div className="relative px-4 pt-4 pb-3">
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 ${
                    plan.popular
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-gradient-to-r" + " " + plan.color
                  }`}
                ></div>

                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price Section */}
                <div className="text-center mt-3 mb-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-xs text-gray-500 font-medium">₦</span>
                    <span className="text-2xl font-bold text-gray-900 mx-1">
                      {calculatePrice(plan.price).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    per student / {selectedBillingCycle}
                  </p>

                  {billingCycles[selectedBillingCycle].discount > 0 && (
                    <div className="mt-1.5 inline-block">
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        Save{" "}
                        {Math.round(
                          billingCycles[selectedBillingCycle].discount * 100
                        )}
                        %
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-center text-xs text-gray-600 leading-relaxed px-1">
                  {plan.description}
                </p>
              </div>

              {/* Features Section */}
              <motion.div
                className="px-5 pb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    What&apos;s Included
                  </h4>
                  <ul className="space-y-1.5">
                    {plan.features
                      .slice(
                        0,
                        expandedCards[plan.name] ? plan.features.length : 3
                      )
                      .map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start group/item"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <motion.div
                              className="w-3 h-3 rounded-full bg-green-100 flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Check className="h-2 w-2 text-green-600" />
                            </motion.div>
                          </div>
                          <span className="ml-2 text-xs text-gray-600 leading-relaxed group-hover/item:text-gray-800 transition-colors">
                            {feature}
                          </span>
                        </motion.li>
                      ))}

                    {plan.features.length > 3 && (
                      <li className="flex items-center mt-2">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(plan.name);
                          }}
                          className="text-xs text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center"
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {expandedCards[plan.name] ? (
                            <>
                              Show less
                              <motion.svg
                                className="w-3 h-3 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ rotate: 180 }}
                                transition={{ duration: 0.2 }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </motion.svg>
                            </>
                          ) : (
                            <>
                              +{plan.features.length - 3} more
                              <motion.svg
                                className="w-3 h-3 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.2 }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </motion.svg>
                            </>
                          )}
                        </motion.button>
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.div
                  className="mt-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs transition-all duration-300 ${
                      selectedPlan?.name === plan.name
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : plan.popular
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-lg"
                        : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
                    } focus:outline-none focus:ring-4 focus:ring-indigo-200/50`}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {selectedPlan?.name === plan.name ? (
                      <motion.span
                        className="flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Check className="h-3 w-3 mr-1.5" />
                        Selected
                      </motion.span>
                    ) : (
                      "Choose Plan"
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Hover Effect Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none ${plan.color}`}
              ></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        {selectedPlan && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleContinue}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center mx-auto transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
            >
              Continue with {selectedPlan.name} Plan
              <ArrowRight className="h-4 w-4 ml-2" />
            </motion.button>
            <p className="text-gray-500 mt-2.5 text-xs">
              Next: Enter your school details and complete setup
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-md border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            Need help choosing?{" "}
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-800 font-medium underline decoration-2 underline-offset-2"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SubscriptionPlans;
