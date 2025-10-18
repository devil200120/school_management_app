import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  Mail,
  CreditCard,
  Building,
  Globe,
  ArrowRight,
  Clock,
  Shield,
  Star,
} from "lucide-react";
import SEO from "../components/SEO";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [generatedSubdomain, setGeneratedSubdomain] = useState("");
  const [portalUrl, setPortalUrl] = useState("");

  useEffect(() => {
    // Get all data from localStorage
    const payment = localStorage.getItem("paymentData");
    const subscription = localStorage.getItem("selectedSubscriptionPlan");
    const user = localStorage.getItem("registrationData");

    if (!payment || !subscription || !user) {
      // Redirect to home if no payment data found
      navigate("/");
      return;
    }

    const parsedPayment = JSON.parse(payment);
    const parsedSubscription = JSON.parse(subscription);
    const parsedUser = JSON.parse(user);

    setPaymentData(parsedPayment);
    setSubscriptionData(parsedSubscription);
    setUserData(parsedUser);

    // Generate subdomain based on school name (this would normally be done by backend)
    const schoolName = parsedUser.schoolName || `${parsedUser.firstName}School`;
    const subdomain =
      schoolName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .substring(0, 15) + Math.floor(Math.random() * 1000);

    setGeneratedSubdomain(subdomain);
    setPortalUrl(`https://${subdomain}.eduos.ng`);

    // Store portal info
    const portalInfo = {
      subdomain,
      portalUrl: `https://${subdomain}.eduos.ng`,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    localStorage.setItem("eduosPortal", JSON.stringify(portalInfo));
  }, [navigate]);

  const downloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    const receiptData = {
      transactionId: paymentData?.transactionId,
      amount: paymentData?.amount,
      plan: paymentData?.plan,
      date: new Date(paymentData?.timestamp).toLocaleDateString(),
      customer: `${userData?.firstName} ${userData?.lastName}`,
      email: userData?.email,
    };

    // Create a simple text receipt (in real app, use PDF generation)
    const receipt = `
EduOS Payment Receipt
=====================
Transaction ID: ${receiptData.transactionId}
Date: ${receiptData.date}
Customer: ${receiptData.customer}
Email: ${receiptData.email}
Plan: ${receiptData.plan}
Amount: ₦${receiptData.amount?.toLocaleString()}
Status: Completed

Thank you for choosing EduOS!
    `;

    const blob = new Blob([receipt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EduOS-Receipt-${receiptData.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const accessPortal = () => {
    // In a real app, this would redirect to the actual portal
    window.open(portalUrl, "_blank");
  };

  if (!paymentData || !subscriptionData || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <SEO
        title="Payment Successful - EduOS"
        description="Your EduOS subscription is now active"
      />

      <motion.div
        className="container mx-auto px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-5 mx-auto"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
            >
              Payment Successful! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-2"
            >
              Welcome to EduOS, {userData.firstName}!
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500"
            >
              Your school management portal is now ready
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Payment Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-5"
            >
              <motion.h2
                className="text-lg font-bold text-gray-800 mb-5 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                Payment Details
              </motion.h2>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex justify-between py-2.5 border-b border-gray-100">
                  <span className="text-gray-600 text-xs">Transaction ID</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {paymentData.transactionId}
                  </span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-gray-100">
                  <span className="text-gray-600 text-xs">Plan</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {subscriptionData.name}
                  </span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-gray-100">
                  <span className="text-gray-600 text-xs">Billing Cycle</span>
                  <span className="font-semibold text-gray-800 capitalize text-sm">
                    {subscriptionData.billing}
                  </span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-gray-100">
                  <span className="text-gray-600 text-xs">Amount Paid</span>
                  <span className="font-bold text-green-600 text-base">
                    ₦{paymentData.amount?.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-gray-100">
                  <span className="text-gray-600 text-xs">Payment Method</span>
                  <span className="font-semibold text-gray-800 capitalize text-sm">
                    {paymentData.method}
                  </span>
                </div>

                <div className="flex justify-between py-2.5">
                  <span className="text-gray-600 text-xs">Date</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {new Date(paymentData.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={downloadReceipt}
                className="w-full mt-5 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors text-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </motion.button>
            </motion.div>

            {/* Portal Access */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-5"
            >
              <motion.h2
                className="text-lg font-bold text-gray-800 mb-5 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                Your School Portal
              </motion.h2>

              <motion.div
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <motion.div
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center mb-2">
                    <Globe className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-800 text-sm">
                      Portal URL
                    </span>
                  </div>
                  <a
                    href={portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-mono text-xs break-all"
                  >
                    {portalUrl}
                  </a>
                </motion.div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-xs">Subdomain</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {generatedSubdomain}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-xs">Status</span>
                    <span className="flex items-center text-green-600 font-semibold text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-xs">Max Students</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {subscriptionData.students}
                    </span>
                  </div>
                </div>

                <motion.div
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <div className="flex items-start">
                    <Clock className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 text-sm">
                        Setup in Progress
                      </h4>
                      <p className="text-xs text-yellow-700 mt-1">
                        Your portal is being configured. It will be fully ready
                        within 15 minutes.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={accessPortal}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-all text-sm"
                >
                  <Building className="w-4 h-4 mr-2" />
                  Access Portal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-5"
          >
            <motion.h2
              className="text-lg font-bold text-gray-800 mb-5 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Star className="w-5 h-5 mr-2 text-purple-600" />
              What&apos;s Next?
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <motion.div
                className="text-center p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ y: -2 }}
              >
                <motion.div
                  className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                </motion.div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                  Check Your Email
                </h3>
                <p className="text-xs text-gray-600">
                  We&apos;ve sent setup instructions and login credentials to{" "}
                  {userData.email}
                </p>
              </motion.div>

              <motion.div
                className="text-center p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ y: -2 }}
              >
                <motion.div
                  className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <Building className="w-5 h-5 text-green-600" />
                </motion.div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                  Set Up Your School
                </h3>
                <p className="text-xs text-gray-600">
                  Add departments, classes, teachers, and students to get
                  started
                </p>
              </motion.div>

              <motion.div
                className="text-center p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                whileHover={{ y: -2 }}
              >
                <motion.div
                  className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <Shield className="w-5 h-5 text-purple-600" />
                </motion.div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                  24/7 Support
                </h3>
                <p className="text-xs text-gray-600">
                  Our support team is ready to help you get the most out of
                  EduOS
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-5 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <p className="text-gray-600 mb-3 text-sm">
                Need help getting started?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2.5 px-5 rounded-lg font-semibold transition-colors text-sm"
                >
                  View Documentation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-lg font-semibold transition-colors text-sm"
                >
                  Contact Support
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Return Home */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.01, x: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-800 font-semibold text-sm"
            >
              ← Return to EduOS Homepage
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
