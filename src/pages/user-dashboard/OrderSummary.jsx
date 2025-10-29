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

    return price * students * multiplier;
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

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
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
            adminCredentials: {
              url: `https://${generatedSubdomain}`,
              username: "admin",
              password: "eduos123",
            },
          },
        });
      }
    }, 2000);
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

  const renderPaymentStep = () => (
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

                <Divider sx={{ my: 2 }} />

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
            disabled={!paymentMethod}
            sx={{ flex: 2, py: 1.5 }}
          >
            {paymentMethod
              ? `Pay ₦${Math.round(totalPrice).toLocaleString()}`
              : "Select Payment Method"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

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
