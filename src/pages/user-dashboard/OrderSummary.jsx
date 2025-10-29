import { useState, useEffect } from "react";
import {
  FaHome,
  FaSchool,
  FaGlobe,
  FaLock,
  FaCreditCard,
  FaUniversity,
  FaBitcoin,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  CircularProgress,
  Backdrop,
  LinearProgress,
  Fade,
  Grow,
  Slide,
} from "@mui/material";
import routes from "../../routes";
import BreadcrumbCard from "../../components/BreadcrumbCard";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1); // Start at School Details step
  const [schoolName, setSchoolName] = useState("");
  const [generatedSubdomain, setGeneratedSubdomain] = useState("");
  const [studentCount, setStudentCount] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState("form"); // "form", "processing", "success"
  const [progress, setProgress] = useState(0);
  const [currentProcessingStep, setCurrentProcessingStep] = useState(0);

  // Get data from location state (from plan selection or upgrade)
  const planData = location.state || {};
  const isUpgrade = planData.isUpgrade || false;
  const upgradeDetails = planData.upgradeDetails || null;

  const selectedPlan = planData.selectedPlan || {
    name: "Silver Plan",
    pricePerStudent: 500,
    id: "silver",
  };
  const billingCycle = planData.billingCycle || "termly";

  // Calculate total price with proper error handling
  const calculateTotal = () => {
    if (isUpgrade && upgradeDetails) {
      return upgradeDetails.totalPrice;
    }

    const price = selectedPlan.pricePerStudent || 500;
    const students = studentCount || 1;
    let multiplier = 1;

    if (billingCycle === "yearly") {
      multiplier = 3.2;
    } else if (billingCycle === "twoterms") {
      multiplier = 1.8;
    }

    const subtotal = price * students * multiplier;
    
    // Apply coupon discount if available
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        return subtotal - (subtotal * appliedCoupon.discount / 100);
      } else if (appliedCoupon.type === 'fixed') {
        return Math.max(0, subtotal - appliedCoupon.discount);
      }
    }
    
    return subtotal;
  };

  const getSubtotal = () => {
    if (isUpgrade && upgradeDetails) {
      return upgradeDetails.totalPrice;
    }

    const price = selectedPlan.pricePerStudent || 500;
    const students = studentCount || 1;
    let multiplier = 1;

    if (billingCycle === "yearly") {
      multiplier = 3.2;
    } else if (billingCycle === "twoterms") {
      multiplier = 1.8;
    }

    return price * students * multiplier;
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      // Simulate API call to validate coupon
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock coupon validation - replace with actual API call
      const mockCoupons = [
        { code: 'SAVE10', type: 'percentage', discount: 10, description: '10% Off' },
        { code: 'SAVE20', type: 'percentage', discount: 20, description: '20% Off' },
        { code: 'FIRST100', type: 'fixed', discount: 10000, description: '₦10,000 Off' },
        { code: 'STUDENT50', type: 'percentage', discount: 50, description: '50% Student Discount' },
        { code: 'NEWSCHOOL', type: 'percentage', discount: 15, description: '15% New School Discount' },
      ];

      const foundCoupon = mockCoupons.find(
        coupon => coupon.code.toLowerCase() === couponCode.toLowerCase()
      );

      if (foundCoupon) {
        setAppliedCoupon(foundCoupon);
        setCouponCode("");
        setCouponError("");
      } else {
        setCouponError("Invalid coupon code");
      }
    } catch (error) {
      setCouponError("Failed to apply coupon. Please try again.");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const totalPrice = calculateTotal();

  const steps = isUpgrade
    ? ["Select Plan", "Upgrade Details", "Payment", "Confirmation"]
    : ["Select Plan", "School Details", "Payment", "Portal Access"];

  const breadcrumbLinks = [
    { to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
    {
      to: isUpgrade ? routes.upgradeSubscription : routes.buyProduct,
      label: isUpgrade ? "Upgrade Subscription" : "Select Plan",
    },
    {
      to: routes.orderSummary,
      label: isUpgrade ? "Complete Upgrade" : "Complete Order",
    },
  ];

  // Auto-generate subdomain when school name changes (only for new subscriptions)
  useEffect(() => {
    if (!isUpgrade && schoolName.trim()) {
      const subdomain = schoolName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .substring(0, 20);
      setGeneratedSubdomain(`${subdomain}.eduos.com.ng`);
    } else if (!isUpgrade) {
      setGeneratedSubdomain("");
    }
  }, [schoolName, isUpgrade]);

  // Determine which step to show based on location state
  useEffect(() => {
    if (planData.step === 2) {
      setCurrentStep(1); // School details
    } else if (planData.step === 3) {
      setCurrentStep(2); // Payment
    }
  }, [planData.step]);

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (isUpgrade) {
        // For upgrades, go directly to payment
        setCurrentStep(2);
      } else {
        // Validate school details for new subscriptions
        if (!schoolName.trim()) {
          alert("Please enter your school name");
          return;
        }
        if (studentCount < 1) {
          alert("Please enter a valid student count");
          return;
        }
        setCurrentStep(2); // Go to payment
      }
    } else if (currentStep === 2) {
      // Process payment
      handlePayment();
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Start payment processing animation
    setIsProcessingPayment(true);
    setPaymentStep("processing");
    setProgress(0);
    setCurrentProcessingStep(0);

    try {
      const processingSteps = [
        "Validating payment details...",
        "Connecting to payment gateway...",
        "Processing transaction...",
        "Verifying payment...",
        "Setting up your account..."
      ];

      // Animate through processing steps
      for (let i = 0; i < processingSteps.length; i++) {
        setCurrentProcessingStep(i);
        setProgress((i + 1) * 20);
        await new Promise(resolve => setTimeout(resolve, 600));
      }
      
      setPaymentStep("success");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Show success animation longer
      
      // Navigate to final success page
      if (isUpgrade) {
        navigate(routes.paymentSuccess, {
          state: {
            isUpgrade: true,
            upgradeDetails,
            totalAmount: totalPrice,
            message: "Subscription upgrade successful!",
          },
        });
      } else {
        navigate(routes.paymentSuccess, {
          state: {
            schoolName,
            subdomain: generatedSubdomain,
            plan: selectedPlan,
            totalAmount: totalPrice,
            studentCount,
            appliedCoupon,
            adminCredentials: {
              url: `https://${generatedSubdomain}`,
              username: "admin",
              password: "eduos123",
            },
          },
        });
      }
    } catch (error) {
      setIsProcessingPayment(false);
      setPaymentStep("form");
      setProgress(0);
      setCurrentProcessingStep(0);
      alert("Payment failed. Please try again.");
    }
  };

  const renderSchoolDetailsStep = () => (
    <Card sx={{ maxWidth: 600, mx: "auto" }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <FaSchool
            style={{ fontSize: "3rem", color: "#1976d2", marginBottom: "1rem" }}
          />
          <Typography variant="h4" gutterBottom>
            Name Your School
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your school's name and we'll generate your unique subdomain
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="School Name"
            placeholder="e.g., St. Mary's International School"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          {generatedSubdomain && (
            <Alert severity="success" sx={{ mb: 2 }}>
              <Typography variant="body2">
                🌐 Your school will be available at: <br />
                <strong>https://{generatedSubdomain}</strong>
              </Typography>
            </Alert>
          )}

          <TextField
            fullWidth
            label="Number of Students"
            type="number"
            value={studentCount}
            onChange={(e) => setStudentCount(parseInt(e.target.value) || 0)}
            inputProps={{ min: 1 }}
            sx={{ mb: 2 }}
          />

          <Card sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Plan:</Typography>
              <Typography fontWeight="bold">{selectedPlan.name}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Students:</Typography>
              <Typography>{studentCount}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Billing:</Typography>
              <Typography sx={{ textTransform: "capitalize" }}>
                {billingCycle}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                ₦{Math.round(totalPrice).toLocaleString()}
              </Typography>
            </Box>
          </Card>
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleNextStep}
          disabled={!schoolName.trim() || studentCount < 1}
          sx={{ py: 1.5 }}
        >
          Continue to Payment →
        </Button>
      </CardContent>
    </Card>
  );

  const renderUpgradeDetailsStep = () => (
    <Card sx={{ maxWidth: 600, mx: "auto" }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <FaSchool
            style={{ fontSize: "3rem", color: "#1976d2", marginBottom: "1rem" }}
          />
          <Typography variant="h4" gutterBottom>
            Upgrade Confirmation
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review your subscription upgrade details
          </Typography>
        </Box>

        {upgradeDetails && (
          <Box sx={{ mb: 3 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Upgrading {upgradeDetails.planName} for{" "}
                {upgradeDetails.schoolName}
              </Typography>
            </Alert>

            <Card sx={{ backgroundColor: "#f5f5f5", p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Current Subscription
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Plan:</Typography>
                <Typography fontWeight="bold">
                  {upgradeDetails.planName}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Current Students:</Typography>
                <Typography>{upgradeDetails.currentStudents}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>School:</Typography>
                <Typography>{upgradeDetails.schoolName}</Typography>
              </Box>
            </Card>

            <Card sx={{ backgroundColor: "#e8f5e8", p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom color="success.main">
                Upgrade Details
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Additional Students:</Typography>
                <Typography fontWeight="bold" color="success.main">
                  +{upgradeDetails.additionalStudents}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>New Total Students:</Typography>
                <Typography fontWeight="bold">
                  {upgradeDetails.currentStudents +
                    upgradeDetails.additionalStudents}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Price per Student:</Typography>
                <Typography>
                  ₦{upgradeDetails.pricePerStudent.toLocaleString()}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Upgrade Cost:</Typography>
                <Typography variant="h6" color="success.main">
                  ₦{upgradeDetails.totalPrice.toLocaleString()}
                </Typography>
              </Box>
            </Card>

            <Alert severity="warning">
              <Typography variant="body2">
                <strong>Note:</strong> The additional students will be added to
                your existing subscription and will follow the same billing
                cycle and expiry date.
              </Typography>
            </Alert>
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleNextStep}
          sx={{ py: 1.5 }}
        >
          Proceed to Payment →
        </Button>
      </CardContent>
    </Card>
  );

  const renderPaymentProcessing = () => {
    const processingSteps = [
      "Validating payment details...",
      "Connecting to payment gateway...",
      "Processing transaction...",
      "Verifying payment...",
      "Setting up your account..."
    ];

    return (
      <Backdrop 
        open={true} 
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, rgba(25,118,210,0.95) 0%, rgba(67,56,202,0.95) 100%)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Fade in={true} timeout={500}>
          <Card sx={{ 
            maxWidth: 500, 
            mx: "auto", 
            textAlign: "center", 
            p: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <CardContent sx={{ p: 4 }}>
              {paymentStep === "processing" && (
                <Grow in={true} timeout={800}>
                  <Box>
                    {/* Floating particles animation */}
                    <Box sx={{ 
                      position: 'relative', 
                      height: 120, 
                      mb: 3,
                      overflow: 'hidden',
                      borderRadius: 2
                    }}>
                      {/* Animated background waves */}
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '300%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(25,118,210,0.1), transparent)',
                        animation: 'wave 2s linear infinite',
                        '@keyframes wave': {
                          '0%': { transform: 'translateX(0)' },
                          '100%': { transform: 'translateX(100%)' }
                        }
                      }} />
                      
                      {/* Main processing icon */}
                      <Box sx={{ 
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                      }}>
                        <Box sx={{ position: 'relative' }}>
                          <CircularProgress 
                            size={80} 
                            thickness={3}
                            sx={{ 
                              color: "#1976d2",
                              animation: 'pulse 2s ease-in-out infinite',
                              '@keyframes pulse': {
                                '0%': { transform: 'scale(1)', opacity: 1 },
                                '50%': { transform: 'scale(1.05)', opacity: 0.8 },
                                '100%': { transform: 'scale(1)', opacity: 1 }
                              }
                            }} 
                          />
                          <FaCreditCard 
                            style={{ 
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              fontSize: '2rem',
                              color: '#1976d2'
                            }} 
                          />
                        </Box>
                      </Box>
                      
                      {/* Floating payment icons */}
                      {[...Array(6)].map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            position: 'absolute',
                            fontSize: '1.2rem',
                            color: 'rgba(25,118,210,0.3)',
                            animation: `float${i} ${3 + i * 0.5}s ease-in-out infinite`,
                            left: `${10 + i * 15}%`,
                            top: `${20 + (i % 2) * 40}%`,
                            '@keyframes float0': {
                              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                              '50%': { transform: 'translateY(-10px) rotate(180deg)' }
                            },
                            '@keyframes float1': {
                              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                              '50%': { transform: 'translateY(-15px) rotate(-180deg)' }
                            },
                            '@keyframes float2': {
                              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                              '50%': { transform: 'translateY(-8px) rotate(180deg)' }
                            },
                            '@keyframes float3': {
                              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                              '50%': { transform: 'translateY(-12px) rotate(-180deg)' }
                            },
                            '@keyframes float4': {
                              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                              '50%': { transform: 'translateY(-18px) rotate(180deg)' }
                            },
                            '@keyframes float5': {
                              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                              '50%': { transform: 'translateY(-7px) rotate(-180deg)' }
                            }
                          }}
                        >
                          {['💳', '🔒', '✓', '💰', '🏦', '📱'][i]}
                        </Box>
                      ))}
                    </Box>

                    <Typography 
                      variant="h4" 
                      gutterBottom
                      sx={{
                        background: 'linear-gradient(45deg, #1976d2 30%, #673ab7 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                        mb: 2
                      }}
                    >
                      Processing Payment
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={progress} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'rgba(25,118,210,0.1)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: 'linear-gradient(90deg, #1976d2, #673ab7)'
                          }
                        }} 
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {progress}% Complete
                      </Typography>
                    </Box>

                    <Slide direction="up" in={true} timeout={500}>
                      <Typography 
                        variant="h6" 
                        color="text.primary" 
                        sx={{ 
                          mb: 2,
                          minHeight: 30,
                          animation: 'fadeInUp 0.5s ease-out'
                        }}
                      >
                        {processingSteps[currentProcessingStep]}
                      </Typography>
                    </Slide>
                    
                    <Typography variant="body2" color="text.secondary">
                      Please wait while we securely process your payment.
                      <br />
                      <strong>Do not close this window or refresh the page.</strong>
                    </Typography>
                  </Box>
                </Grow>
              )}
              
              {paymentStep === "success" && (
                <Grow in={true} timeout={1000}>
                  <Box>
                    {/* Success animation container */}
                    <Box sx={{ 
                      position: 'relative', 
                      height: 120, 
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {/* Ripple effect */}
                      <Box sx={{
                        position: 'absolute',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'rgba(76, 175, 80, 0.2)',
                        animation: 'ripple 1.5s ease-out infinite',
                        '@keyframes ripple': {
                          '0%': { transform: 'scale(0)', opacity: 1 },
                          '100%': { transform: 'scale(2)', opacity: 0 }
                        }
                      }} />
                      
                      {/* Success checkmark */}
                      <Box sx={{ 
                        fontSize: "5rem", 
                        animation: "successBounce 1s ease-out",
                        position: 'relative',
                        zIndex: 1,
                        '@keyframes successBounce': {
                          "0%": { transform: "scale(0) rotate(0deg)", opacity: 0 },
                          "50%": { transform: "scale(1.2) rotate(180deg)", opacity: 1 },
                          "75%": { transform: "scale(0.9) rotate(270deg)" },
                          "100%": { transform: "scale(1) rotate(360deg)" }
                        }
                      }}>
                        ✅
                      </Box>
                      
                      {/* Confetti particles */}
                      {[...Array(12)].map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            position: 'absolute',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: ['#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0'][i % 5],
                            animation: `confetti${i} 2s ease-out infinite`,
                            [`@keyframes confetti${i}`]: {
                              '0%': { 
                                transform: `translate(0, 0) rotate(0deg)`,
                                opacity: 1
                              },
                              '100%': { 
                                transform: `translate(${(Math.random() - 0.5) * 200}px, ${Math.random() * 100 + 50}px) rotate(${Math.random() * 360}deg)`,
                                opacity: 0
                              }
                            }
                          }}
                        />
                      ))}
                    </Box>

                    <Typography 
                      variant="h4" 
                      gutterBottom 
                      sx={{
                        color: '#4caf50',
                        fontWeight: 'bold',
                        animation: 'slideInUp 0.8s ease-out',
                        '@keyframes slideInUp': {
                          '0%': { transform: 'translateY(30px)', opacity: 0 },
                          '100%': { transform: 'translateY(0)', opacity: 1 }
                        }
                      }}
                    >
                      Payment Successful! 🎉
                    </Typography>
                    
                    <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                      ₦{Math.round(totalPrice).toLocaleString()} paid successfully
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: 1,
                      mb: 2
                    }}>
                      <CircularProgress size={20} sx={{ color: "success.main" }} />
                      <Typography variant="body1" color="success.main">
                        Setting up your dashboard...
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary">
                      You will be redirected to your dashboard shortly.
                    </Typography>
                  </Box>
                </Grow>
              )}
            </CardContent>
          </Card>
        </Fade>
      </Backdrop>
    );
  };

  const renderPaymentStep = () => {
    // Show processing overlay if payment is being processed
    if (isProcessingPayment) {
      return renderPaymentProcessing();
    }

    return (
    <Card sx={{ maxWidth: 700, mx: "auto" }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <FaCreditCard
            style={{ fontSize: "3rem", color: "#1976d2", marginBottom: "1rem" }}
          />
          <Typography variant="h4" gutterBottom>
            Secure Payment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Complete your transaction to access your school portal
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ mb: 2, fontWeight: "bold" }}>
                Select Payment Method
              </FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <Card
                  sx={{
                    mb: 2,
                    border:
                      paymentMethod === "card"
                        ? "2px solid #1976d2"
                        : "1px solid #e0e0e0",
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <FaCreditCard style={{ color: "#1976d2" }} />
                          <Box>
                            <Typography variant="body1" fontWeight="bold">
                              Credit/Debit Card
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Visa, MasterCard, Verve
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    mb: 2,
                    border:
                      paymentMethod === "bank"
                        ? "2px solid #1976d2"
                        : "1px solid #e0e0e0",
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <FormControlLabel
                      value="bank"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <FaUniversity style={{ color: "#4caf50" }} />
                          <Box>
                            <Typography variant="body1" fontWeight="bold">
                              Bank Transfer
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Direct bank transfer
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    border:
                      paymentMethod === "crypto"
                        ? "2px solid #1976d2"
                        : "1px solid #e0e0e0",
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <FormControlLabel
                      value="crypto"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <FaBitcoin style={{ color: "#ff9800" }} />
                          <Box>
                            <Typography variant="body1" fontWeight="bold">
                              Cryptocurrency
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Bitcoin, Ethereum, USDT
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>
              </RadioGroup>
            </FormControl>

            {paymentMethod === "card" && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Card Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          number: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cardholder Name"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, name: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          expiry: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cvv: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{ backgroundColor: "#f8f9fa", position: "sticky", top: 20 }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">School:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {schoolName || "Your School"}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Plan:</Typography>
                  <Typography variant="body2">{selectedPlan.name}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Students:</Typography>
                  <Typography variant="body2">{studentCount}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Billing:</Typography>
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {billingCycle}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Subdomain:</Typography>
                  <Typography variant="body2" fontSize="0.7rem">
                    {generatedSubdomain}
                  </Typography>
                </Box>

                {/* Coupon Section */}
                <Box sx={{ mb: 2 }}>
                  {!appliedCoupon ? (
                    <>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Have a coupon code?
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <TextField
                          size="small"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          sx={{ flex: 1 }}
                          error={!!couponError}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={applyCoupon}
                          disabled={isApplyingCoupon || !couponCode.trim()}
                          sx={{ whiteSpace: 'nowrap' }}
                        >
                          {isApplyingCoupon ? 'Applying...' : 'Apply'}
                        </Button>
                      </Box>
                      {couponError && (
                        <Typography variant="caption" color="error">
                          {couponError}
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Box sx={{ 
                      backgroundColor: '#e8f5e8', 
                      p: 1.5, 
                      borderRadius: 1,
                      mb: 1
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body2" color="success.main" fontWeight="bold">
                            ✓ {appliedCoupon.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Code: {appliedCoupon.code}
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          onClick={removeCoupon}
                          sx={{ color: 'text.secondary', minWidth: 'auto', p: 0.5 }}
                        >
                          ✕
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Show subtotal and discount if coupon applied */}
                {appliedCoupon && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2">Subtotal:</Typography>
                      <Typography variant="body2">
                        ₦{Math.round(getSubtotal()).toLocaleString()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="success.main">
                        Discount ({appliedCoupon.description}):
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        -{appliedCoupon.type === 'percentage' 
                          ? `${appliedCoupon.discount}%` 
                          : `₦${appliedCoupon.discount.toLocaleString()}`}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                  </>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    ₦{Math.round(totalPrice).toLocaleString()}
                  </Typography>
                </Box>

                <Alert severity="info" sx={{ mb: 2, fontSize: "0.8rem" }}>
                  <FaLock style={{ marginRight: 8 }} />
                  Your payment is secured with SSL encryption
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setCurrentStep(1)}
            sx={{ flex: 1 }}
          >
            ← Back to School Details
          </Button>
          <Button
            variant="contained"
            onClick={handleNextStep}
            disabled={!paymentMethod || isProcessingPayment}
            sx={{ flex: 2, py: 1.5 }}
          >
            {isProcessingPayment 
              ? "Processing..." 
              : paymentMethod
              ? `Pay ₦${Math.round(totalPrice).toLocaleString()}`
              : "Select Payment Method"}
          </Button>
        </Box>
      </CardContent>
    </Card>
    );
  };

  return (
    <div className="right-content w-100">
      <BreadcrumbCard
        title={`Step ${currentStep + 1}: ${steps[currentStep]}`}
        breadcrumbLinks={breadcrumbLinks}
      />

      <div className="main-container">
        {/* Progress Stepper */}
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "0.9rem",
                      fontWeight: index === currentStep ? "bold" : "normal",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step Content */}
        {currentStep === 1 && !isUpgrade && renderSchoolDetailsStep()}
        {currentStep === 1 && isUpgrade && renderUpgradeDetailsStep()}
        {currentStep === 2 && renderPaymentStep()}
      </div>
    </div>
  );
};

export default OrderSummary;
