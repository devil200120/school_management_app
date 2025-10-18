import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  School,
  Globe,
  MapPin,
  Users,
  CheckCircle,
} from "lucide-react";
import routes from "../routes";

const SchoolDetails = () => {
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    // Get subscription data from localStorage
    const savedSubscriptionData = localStorage.getItem(
      "selectedSubscriptionPlan"
    );
    if (!savedSubscriptionData) {
      // Redirect back to subscription plans if no data
      navigate(routes.subscriptionPlans);
      return;
    }
    setSubscriptionData(JSON.parse(savedSubscriptionData));
  }, [navigate]);

  const [formData, setFormData] = useState({
    schoolName: "",
    subdomain: "",
    country: "Nigeria",
    state: "",
    city: "",
    address: "",
    studentCount: "",
    schoolType: "primary",
    phoneNumber: "",
    website: "",
  });

  const [subdomainAvailable, setSubdomainAvailable] = useState(null);
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);

  // Countries list
  const countries = [
    "Nigeria",
    "Ghana",
    "Kenya",
    "South Africa",
    "Tanzania",
    "Uganda",
    "Rwanda",
    "Ethiopia",
    "Egypt",
    "Morocco",
    "Tunisia",
    "Algeria",
    "Senegal",
    "Mali",
    "Burkina Faso",
    "Niger",
  ];

  const schoolTypes = [
    { value: "nursery", label: "Nursery School" },
    { value: "primary", label: "Primary School" },
    { value: "secondary", label: "Secondary School" },
    { value: "college", label: "College/University" },
    { value: "mixed", label: "Mixed Levels" },
  ];

  // Generate subdomain from school name
  useEffect(() => {
    if (formData.schoolName) {
      const generatedSubdomain = formData.schoolName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "")
        .substring(0, 20);

      setFormData((prev) => ({
        ...prev,
        subdomain: generatedSubdomain,
      }));
    }
  }, [formData.schoolName]);

  // Check subdomain availability (simulated)
  useEffect(() => {
    if (formData.subdomain && formData.subdomain.length >= 3) {
      setCheckingSubdomain(true);
      const timer = setTimeout(() => {
        // Simulate API call - always available for demo
        setSubdomainAvailable(true);
        setCheckingSubdomain(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setSubdomainAvailable(null);
    }
  }, [formData.subdomain]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubdomainChange = (e) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .substring(0, 20);

    setFormData((prev) => ({
      ...prev,
      subdomain: value,
    }));
  };

  const validateForm = () => {
    return (
      formData.schoolName &&
      formData.subdomain &&
      formData.country &&
      formData.state &&
      formData.studentCount &&
      parseInt(formData.studentCount) > 0 &&
      subdomainAvailable
    );
  };

  const handleContinue = () => {
    if (validateForm() && subscriptionData) {
      // Store school details in localStorage
      localStorage.setItem("schoolDetails", JSON.stringify(formData));

      // Navigate to payment page
      navigate(routes.payment);
    }
  };

  const handleBack = () => {
    navigate(routes.subscriptionPlans);
  };

  if (!subscriptionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Plan Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please select a subscription plan first.
          </p>
          <button
            onClick={() => navigate("/choose-plan")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Choose Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header
        className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium text-sm">Back to Plans</span>
            </motion.button>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <img src="/EDUOSlogo.png" alt="EDUOS" className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EDUOS
              </span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step Indicator */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <motion.div
              className="flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
            >
              <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                ✓
              </div>
              <span className="ml-2 text-xs text-green-600 font-semibold">
                Account Created
              </span>
            </motion.div>
            <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-indigo-600 rounded-full"></div>
            <motion.div
              className="flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
            >
              <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                ✓
              </div>
              <span className="ml-2 text-xs text-green-600 font-semibold">
                Plan Selected
              </span>
            </motion.div>
            <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-indigo-600 rounded-full"></div>
            <motion.div
              className="flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
            >
              <div className="w-7 h-7 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                3
              </div>
              <span className="ml-2 text-xs text-indigo-600 font-semibold">
                School Details
              </span>
            </motion.div>
            <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
            <motion.div
              className="flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 500 }}
            >
              <div className="w-7 h-7 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">
                4
              </div>
              <span className="ml-2 text-xs text-gray-400 font-medium">
                Payment
              </span>
            </motion.div>
          </div>

          <motion.h1
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Tell Us About Your School
          </motion.h1>
          <motion.p
            className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Provide your school details to generate your unique subdomain and
            customize your portal.
          </motion.p>
        </motion.div>

        {/* Selected Plan Summary */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-xl border border-white/20 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <School className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {subscriptionData.name} Plan
                </h3>
                <p className="text-xs text-gray-600">
                  {subscriptionData.name} • {subscriptionData.billing}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">
                ₦{subscriptionData.finalPrice.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">per student</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-5">
              {/* School Name */}
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  <School className="inline h-3 w-3 mr-1.5" />
                  School Name *
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="Enter your school's full name"
                />
              </motion.div>

              {/* Subdomain */}
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  <Globe className="inline h-3 w-3 mr-1.5" />
                  Your School Portal URL *
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="subdomain"
                    value={formData.subdomain}
                    onChange={handleSubdomainChange}
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                    placeholder="yourschool"
                  />
                  <span className="px-3 py-2.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-xs text-gray-600 font-medium">
                    .eduos.com.ng
                  </span>
                </div>
                {formData.subdomain && (
                  <motion.div
                    className="mt-2 flex items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {checkingSubdomain ? (
                      <div className="flex items-center text-gray-500">
                        <div className="w-3 h-3 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin mr-2"></div>
                        <span className="text-xs">
                          Checking availability...
                        </span>
                      </div>
                    ) : subdomainAvailable ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-3 w-3 mr-2" />
                        <span className="text-xs font-medium">
                          Available! Your school will be accessible at{" "}
                          {formData.subdomain}.eduos.com.ng
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <span className="text-xs">
                          Not available. Please try a different name.
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Country & State */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-3 w-3 mr-1.5" />
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  State/Province *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                  placeholder="Enter state or province"
                />
              </motion.div>

              {/* City & School Type */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                  placeholder="Enter city"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  School Type *
                </label>
                <select
                  name="schoolType"
                  value={formData.schoolType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                >
                  {schoolTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Student Count */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  <Users className="inline h-3 w-3 mr-1.5" />
                  Number of Students *
                </label>
                <input
                  type="number"
                  name="studentCount"
                  value={formData.studentCount}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                  placeholder="Enter total number of students"
                />
                {formData.studentCount && subscriptionData && (
                  <motion.div
                    className="mt-2 p-2.5 bg-indigo-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs text-indigo-800">
                      <strong>Total Cost:</strong> ₦
                      {(
                        subscriptionData.finalPrice *
                        parseInt(formData.studentCount || 0)
                      ).toLocaleString()}
                      <span className="text-indigo-600">
                        {" "}
                        ({formData.studentCount} students × ₦
                        {subscriptionData.finalPrice})
                      </span>
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Phone Number */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                  placeholder="+234 xxx xxx xxxx"
                />
              </motion.div>

              {/* Address */}
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  School Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-sm"
                  placeholder="Enter complete school address"
                />
              </motion.div>

              {/* Website */}
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Existing Website (Optional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                  placeholder="https://www.yourschool.com"
                />
              </motion.div>
            </div>

            {/* Continue Button */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <motion.button
                onClick={handleContinue}
                disabled={!validateForm()}
                className={`px-8 py-3 rounded-lg font-semibold text-sm flex items-center mx-auto transition-all duration-300 ${
                  validateForm()
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-indigo-500/25"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                whileHover={validateForm() ? { scale: 1.02, y: -2 } : {}}
                whileTap={validateForm() ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Continue to Payment
                <ArrowRight className="h-4 w-4 ml-2" />
              </motion.button>
              <motion.p
                className="text-gray-500 mt-3 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
              >
                Next: Complete your payment and get instant access
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolDetails;
