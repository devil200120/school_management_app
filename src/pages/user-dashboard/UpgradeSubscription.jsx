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
} from "@mui/material";
import routes from "../../routes";
import BreadcrumbCard from "../../components/BreadcrumbCard";

const UpgradeSubscription = () => {
  const navigate = useNavigate();
  const [currentSubscriptions, setCurrentSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [additionalStudents, setAdditionalStudents] = useState(50);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "NGN";
  });

  // Currency conversion rate
  const NGN_TO_USD = 0.0013;

  // Format amount based on currency
  const formatAmount = (amount) => {
    if (currency === "USD") {
      const usdAmount = amount * NGN_TO_USD;
      return `$${usdAmount.toFixed(2)}`;
    }
    return `₦${amount.toLocaleString()}`;
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
        pricePerStudent: 250,
        status: "Active",
        planId: "bronze",
        expiryDate: "2024-06-30",
        schoolName: "ABC Secondary School",
        color: "#CD7F32",
        icon: <FaGraduationCap />,
      },
      {
        id: "sub_002",
        planName: "Silver Plan",
        currentStudents: 200,
        pricePerStudent: 500,
        status: "Active",
        planId: "silver",
        expiryDate: "2024-08-15",
        schoolName: "XYZ Primary School",
        color: "#C0C0C0",
        icon: <FaChartLine />,
      },
    ];
    setCurrentSubscriptions(mockSubscriptions);
  }, []);

  const calculateUpgradePrice = (subscription, additionalStudents) => {
    return subscription.pricePerStudent * additionalStudents;
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
            Add more students to your existing school subscriptions
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
              You don't have any active subscriptions yet.
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
                              subscription.pricePerStudent
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
