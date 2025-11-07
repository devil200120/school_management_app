import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCheck,
  FaPlus,
  FaCrown,
  FaStar,
  FaChartLine,
  FaUsers,
  FaGraduationCap,
  FaArrowUp,
  FaUpload,
} from "react-icons/fa";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
  Tabs,
  Tab,
} from "@mui/material";
import routes from "../../routes";
import BreadcrumbCard from "../../components/BreadcrumbCard";

const UpgradeSubscription = () => {
  const navigate = useNavigate();
  const [currentSubscriptions, setCurrentSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [additionalStudents, setAdditionalStudents] = useState(50);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [upgradeType, setUpgradeType] = useState("students"); // "students" or "plan"
  const [selectedNewPlan, setSelectedNewPlan] = useState(null);
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "NGN";
  });

  // Define available plans for upgrades
  const availablePlans = [
    {
      id: "bronze",
      name: "Bronze Plan",
      subtitle: "The Essentials (Web Only)",
      priceTermlyNGN: 500,
      priceTermlyUSD: 2,
      color: "#CD7F32",
      icon: <FaGraduationCap />,
      tier: 1,
    },
    {
      id: "silver",
      name: "Silver Plan",
      subtitle: "Operational Efficiency (Web Only)",
      priceTermlyNGN: 1000,
      priceTermlyUSD: 4,
      color: "#C0C0C0",
      icon: <FaChartLine />,
      tier: 2,
    },
    {
      id: "gold",
      name: "Gold Plan",
      subtitle: "Engagement & Analytics (Web Only)",
      priceTermlyNGN: 1500,
      priceTermlyUSD: 6.5,
      color: "#FFD700",
      icon: <FaCrown />,
      tier: 3,
    },
    {
      id: "platinum",
      name: "Platinum Plan",
      subtitle: "The Ultimate Ecosystem (Web + Mobile)",
      priceTermlyNGN: 2000,
      priceTermlyUSD: 8.5,
      color: "#E5E4E2",
      icon: <FaStar />,
      tier: 4,
    },
  ];

  // Currency conversion rate
  const NGN_TO_USD = 0.0013;

  // Format amount based on currency
  const formatAmount = (amount, isUSD = false) => {
    if (currency === "USD" || isUSD) {
      const usdAmount = isUSD ? amount : amount * NGN_TO_USD;
      return `$${usdAmount.toFixed(2)}`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  const handleUpgradePlan = (subscription, newPlan) => {
    const currentPlanPrice = currency === "USD" ? subscription.pricePerStudentUSD : subscription.pricePerStudent;
    const newPlanPrice = currency === "USD" ? newPlan.priceTermlyUSD : newPlan.priceTermlyNGN;
    const priceDifference = newPlanPrice - currentPlanPrice;
    const totalUpgradeCost = priceDifference * subscription.currentStudents;

    navigate(routes.orderSummary, {
      state: {
        upgradeDetails: {
          subscriptionId: subscription.id,
          fromPlan: subscription.planName,
          toPlan: newPlan.name,
          currentStudents: subscription.currentStudents,
          priceDifference: priceDifference,
          totalPrice: totalUpgradeCost,
          schoolName: subscription.schoolName,
          isPlanUpgrade: true,
        },
        isUpgrade: true,
        isPlanUpgrade: true,
        step: 2,
      },
    });
  };

  // Handle currency change
  const handleCurrencyChange = (event, newCurrency) => {
    if (newCurrency !== null) {
      setCurrency(newCurrency);
      localStorage.setItem("currency", newCurrency);
    }
  };

  // Mock current subscriptions - In real app, fetch from API
  useEffect(() => {
    // Simulate fetching user's current subscriptions
    const mockSubscriptions = [
      {
        id: "sub_001",
        planName: "Bronze Plan",
        currentStudents: 100,
        pricePerStudent: 500,
        pricePerStudentUSD: 2,
        status: "Active",
        planId: "bronze",
        tier: 1,
        expiryDate: "2024-06-30",
        schoolName: "ABC Secondary School",
        color: "#CD7F32",
        icon: <FaGraduationCap />,
      },
      {
        id: "sub_002",
        planName: "Silver Plan",
        currentStudents: 200,
        pricePerStudent: 1000,
        pricePerStudentUSD: 4,
        status: "Active",
        planId: "silver",
        tier: 2,
        expiryDate: "2024-08-15",
        schoolName: "XYZ Primary School",
        color: "#C0C0C0",
        icon: <FaChartLine />,
      },
    ];
    setCurrentSubscriptions(mockSubscriptions);
  }, []);

  const calculateUpgradePrice = (subscription, additionalStudents) => {
    const pricePerStudent = currency === "USD" ? subscription.pricePerStudentUSD : subscription.pricePerStudent;
    return pricePerStudent * additionalStudents;
  };

  const getUpgradeablePlans = (currentPlanId) => {
    const currentPlan = availablePlans.find(plan => plan.id === currentPlanId);
    if (!currentPlan) return [];
    
    return availablePlans.filter(plan => plan.tier > currentPlan.tier);
  };

  const handleUpgradeSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setShowUpgradeDialog(true);
  };

  const handleConfirmUpgrade = () => {
    // Navigate to payment with upgrade details
    navigate(routes.orderSummary, {
      state: {
        upgradeDetails: {
          subscriptionId: selectedSubscription.id,
          planName: selectedSubscription.planName,
          currentStudents: selectedSubscription.currentStudents,
          additionalStudents: additionalStudents,
          pricePerStudent: selectedSubscription.pricePerStudent,
          totalPrice: calculateUpgradePrice(
            selectedSubscription,
            additionalStudents
          ),
          schoolName: selectedSubscription.schoolName,
        },
        isUpgrade: true,
        step: 2, // Skip plan selection since this is an upgrade
      },
    });
    setShowUpgradeDialog(false);
  };

  const breadcrumbLinks = [
    { to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
    { to: routes.upgradeSubscription, label: "Upgrade Subscription" },
  ];

  return (
    <div className="right-content w-100">
      <BreadcrumbCard
        title="Upgrade Subscription"
        breadcrumbLinks={breadcrumbLinks}
      />

      <div className="main-container">
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}
          >
            <FaArrowUp style={{ marginRight: "8px" }} />
            Upgrade Your Subscriptions
          </Typography>
          <Typography variant="h6" sx={{ color: "#666", mb: 3 }}>
            Add more students or upgrade to higher tier plans
          </Typography>

          {/* Currency Toggle */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <ToggleButtonGroup
              value={currency}
              exclusive
              onChange={handleCurrencyChange}
              aria-label="currency selection"
              size="small"
            >
              <ToggleButton value="NGN" aria-label="Nigerian Naira">
                NGN (₦)
              </ToggleButton>
              <ToggleButton value="USD" aria-label="US Dollar">
                USD ($)
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {currentSubscriptions.length === 0 ? (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              No Active Subscriptions Found
            </Typography>
            <Typography variant="body2">
              You don&apos;t have any active subscriptions yet.
              <Link
                to={routes.buyProduct}
                style={{ marginLeft: "8px", color: "#1976d2" }}
              >
                Purchase a new subscription
              </Link>
            </Typography>
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {currentSubscriptions.map((subscription) => (
              <Grid item xs={12} md={6} key={subscription.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "2px solid #e0e0e0",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                      borderColor: "#1976d2",
                    },
                  }}
                >
                  {/* Subscription Header */}
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${subscription.color}, ${subscription.color}80)`,
                      color:
                        subscription.planId === "bronze" ||
                        subscription.planId === "gold"
                          ? "black"
                          : "white",
                      p: 3,
                      textAlign: "center",
                    }}
                  >
                    <Box sx={{ fontSize: "2rem", mb: 1 }}>
                      {subscription.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                      {subscription.planName}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1, opacity: 0.9 }}>
                      {subscription.schoolName}
                    </Typography>
                    <Chip
                      label={subscription.status}
                      color="success"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Current Subscription Details */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}
                      >
                        <FaUsers style={{ marginRight: "8px" }} />
                        Current Subscription
                      </Typography>

                      <List dense>
                        <ListItem sx={{ py: 0, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <FaCheck
                              style={{ color: "#4caf50", fontSize: "0.8rem" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${subscription.currentStudents} Students`}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontSize: "1rem",
                                fontWeight: "bold",
                              },
                            }}
                          />
                        </ListItem>
                        <ListItem sx={{ py: 0, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <FaCheck
                              style={{ color: "#4caf50", fontSize: "0.8rem" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${formatAmount(
                              currency === "USD" ? subscription.pricePerStudentUSD : subscription.pricePerStudent
                            )} per student`}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontSize: "0.9rem",
                              },
                            }}
                          />
                        </ListItem>
                        <ListItem sx={{ py: 0, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <FaCheck
                              style={{ color: "#4caf50", fontSize: "0.8rem" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={`Expires: ${subscription.expiryDate}`}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontSize: "0.9rem",
                              },
                            }}
                          />
                        </ListItem>
                      </List>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Plan Upgrade Section */}
                    {getUpgradeablePlans(subscription.planId).length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2, color: "#9c27b0" }}
                        >
                          <FaArrowUp style={{ marginRight: "8px" }} />
                          Upgrade Plan
                        </Typography>

                        <Grid container spacing={1}>
                          {getUpgradeablePlans(subscription.planId).map((plan) => {
                            const currentPlanPrice = currency === "USD" ? subscription.pricePerStudentUSD : subscription.pricePerStudent;
                            const newPlanPrice = currency === "USD" ? plan.priceTermlyUSD : plan.priceTermlyNGN;
                            const priceDifference = newPlanPrice - currentPlanPrice;
                            
                            return (
                              <Grid item xs={12} key={plan.id}>
                                <Card
                                  sx={{
                                    p: 2,
                                    border: "1px solid #e0e0e0",
                                    "&:hover": {
                                      borderColor: "#9c27b0",
                                      cursor: "pointer",
                                    },
                                  }}
                                  onClick={() => handleUpgradePlan(subscription, plan)}
                                >
                                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <Box sx={{ fontSize: "1.5rem", mr: 1, color: plan.color }}>
                                        {plan.icon}
                                      </Box>
                                      <Box>
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                          {plan.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                          {plan.subtitle}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Box sx={{ textAlign: "right" }}>
                                      <Typography variant="body2" color="success.main" sx={{ fontWeight: "bold" }}>
                                        +{formatAmount(priceDifference)} per student
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        Total: {formatAmount(priceDifference * subscription.currentStudents)}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Card>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    )}

                    <Divider sx={{ mb: 2 }} />

                    {/* Upgrade Options */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 2, color: "#ff9800" }}
                      >
                        <FaPlus style={{ marginRight: "8px" }} />
                        Quick Add Students
                      </Typography>

                      <Grid container spacing={1}>
                        {[25, 50, 100].map((count) => (
                          <Grid item xs={4} key={count}>
                            <Button
                              variant="outlined"
                              size="small"
                              fullWidth
                              onClick={() => {
                                setAdditionalStudents(count);
                                handleUpgradeSubscription(subscription);
                              }}
                              sx={{
                                fontSize: "0.8rem",
                                py: 1,
                                "&:hover": {
                                  backgroundColor: "#1976d2",
                                  color: "white",
                                },
                              }}
                            >
                              +{count}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>

                    {/* Custom Amount */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: "bold" }}
                      >
                        Or add custom amount:
                      </Typography>
                      <TextField
                        type="number"
                        size="small"
                        fullWidth
                        label="Number of students"
                        value={additionalStudents}
                        onChange={(e) =>
                          setAdditionalStudents(parseInt(e.target.value) || 0)
                        }
                        inputProps={{ min: 1, max: 1000 }}
                        sx={{ mb: 2 }}
                      />
                    </Box>

                    {/* Price Calculation */}
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 1,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Cost for {additionalStudents} additional students:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#1976d2" }}
                      >
                        {formatAmount(
                          calculateUpgradePrice(
                            subscription,
                            additionalStudents
                          )
                        )}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        New total:{" "}
                        {subscription.currentStudents + additionalStudents}{" "}
                        students
                      </Typography>
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={() => handleUpgradeSubscription(subscription)}
                      disabled={additionalStudents <= 0}
                      sx={{
                        py: 1.5,
                        fontWeight: "bold",
                        fontSize: "1rem",
                        background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #1565c0, #1976d2)",
                        },
                        "&:disabled": {
                          background: "#ccc",
                        },
                      }}
                    >
                      <FaArrowUp style={{ marginRight: "8px" }} />
                      Upgrade Subscription
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Upgrade Confirmation Dialog */}
        <Dialog
          open={showUpgradeDialog}
          onClose={() => setShowUpgradeDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Confirm Subscription Upgrade
            </Typography>
          </DialogTitle>
          <DialogContent>
            {selectedSubscription && (
              <Box>
                <Alert severity="info" sx={{ mb: 3 }}>
                  You are upgrading your{" "}
                  <strong>{selectedSubscription.planName}</strong> for{" "}
                  <strong>{selectedSubscription.schoolName}</strong>
                </Alert>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Current Students:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {selectedSubscription.currentStudents}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Additional Students:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#ff9800" }}
                    >
                      +{additionalStudents}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      New Total Students:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#4caf50" }}
                    >
                      {selectedSubscription.currentStudents +
                        additionalStudents}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Total Cost:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#1976d2" }}
                    >
                      {formatAmount(
                        calculateUpgradePrice(
                          selectedSubscription,
                          additionalStudents
                        )
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="text.secondary">
                  <strong>Note:</strong> The additional students will be added
                  to your existing subscription and will follow the same expiry
                  date ({selectedSubscription?.expiryDate}).
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setShowUpgradeDialog(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmUpgrade}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                "&:hover": {
                  background: "linear-gradient(45deg, #1565c0, #1976d2)",
                },
              }}
            >
              Proceed to Payment
            </Button>
          </DialogActions>
        </Dialog>

        {/* Help Section */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: "#f3e5f5",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "#9c27b0" }}>
            🤝 Need Help?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact our support team if you need assistance with upgrading your
            subscription or have questions about pricing.
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => window.open("mailto:support@eduos.com", "_blank")}
          >
            Contact Support
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default UpgradeSubscription;
