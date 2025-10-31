import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCheck,
  FaTimes,
  FaCrown,
  FaStar,
  FaMobile,
  FaGlobe,
  FaChartLine,
  FaUsers,
  FaGraduationCap,
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
  ToggleButton,
  ToggleButtonGroup,
  keyframes,
} from "@mui/material";
import routes from "../../routes";
import BreadcrumbCard from "../../components/BreadcrumbCard";

// ==================== ANIMATION KEYFRAMES ====================
// Very long and smooth animations for plan selection

const cardPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
  }
  25% {
    transform: scale(1.02);
    box-shadow: 0 8px 30px rgba(76, 175, 80, 0.5);
  }
  50% {
    transform: scale(1.04);
    box-shadow: 0 12px 40px rgba(76, 175, 80, 0.7);
  }
  75% {
    transform: scale(1.02);
    box-shadow: 0 8px 30px rgba(76, 175, 80, 0.5);
  }
`;

const gentleFloat = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  33% {
    transform: translateY(-10px);
  }
  66% {
    transform: translateY(-5px);
  }
`;

const smoothGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(76, 175, 80, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 25px rgba(76, 175, 80, 1));
  }
`;

const shimmerEffect = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const rotateAndScale = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.3) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
`;

const confettiFall = keyframes`
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`;

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const BuyProduct = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("termly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem("currency") || "NGN";
    } catch (e) {
      return "NGN";
    }
  });

  // Subscription plans data
  const plans = [
    {
      id: "bronze",
      name: "Bronze Plan",
      subtitle: "The Essentials (Web Only)",
      pricePerStudent: 250,
      priceUSD: 0.16,
      color: "#CD7F32",
      icon: <FaGraduationCap />,
      idealFor: "Small schools getting started with digital management",
      popular: false,
      features: {
        student: [
          "View Grades & Results",
          "Access Assignments",
          "Class Schedule",
          "Basic Profile Management",
        ],
        teacher: [
          "Grade Management",
          "Assignment Creation",
          "Basic Class Management",
        ],
        admin: ["Student Registration", "Basic Reporting", "User Management"],
        accountant: [],
        mobile: false,
        exclusive: null,
      },
    },
    {
      id: "silver",
      name: "Silver Plan",
      subtitle: "Operational Efficiency (Web Only)",
      pricePerStudent: 500,
      priceUSD: 0.33,
      color: "#C0C0C0",
      icon: <FaChartLine />,
      idealFor: "Growing schools needing comprehensive management",
      popular: true,
      features: {
        student: [
          "All Bronze Features",
          "Attendance Tracking",
          "Fee Payment Status",
          "Library Access",
          "Disciplinary Records",
        ],
        teacher: [
          "All Bronze Features",
          "Advanced Gradebook",
          "Lesson Planning",
          "Parent Communication",
          "Attendance Management",
        ],
        admin: [
          "All Bronze Features",
          "Fee Management",
          "Advanced Analytics",
          "Staff Management",
          "School Calendar",
        ],
        accountant: ["Basic Financial Reports", "Fee Collection Tracking"],
        mobile: false,
        exclusive: null,
      },
    },
    {
      id: "gold",
      name: "Gold Plan",
      subtitle: "Advanced Management (Web Only)",
      pricePerStudent: 750,
      priceUSD: 0.5,
      color: "#FFD700",
      icon: <FaCrown />,
      idealFor: "Established schools requiring advanced features",
      popular: false,
      features: {
        student: [
          "All Silver Features",
          "Online Assessments",
          "E-Learning Resources",
          "Progress Analytics",
          "Certificate Generation",
        ],
        teacher: [
          "All Silver Features",
          "Advanced Assessment Tools",
          "Curriculum Management",
          "Professional Development Tracking",
        ],
        admin: [
          "All Silver Features",
          "Advanced Reporting Dashboard",
          "Inventory Management",
          "HR Management",
          "Custom Workflows",
        ],
        accountant: [
          "All Silver Features",
          "Budget Planning",
          "Expense Management",
          "Financial Analytics",
          "Audit Trail",
        ],
        mobile: false,
        exclusive: "Priority Customer Support",
      },
    },
    {
      id: "platinum",
      name: "Platinum Plan",
      subtitle: "Complete Solution (Web + Mobile)",
      pricePerStudent: 1000,
      priceUSD: 0.67,
      color: "#E5E4E2",
      icon: <FaStar />,
      idealFor: "Large institutions requiring full digital transformation",
      popular: false,
      features: {
        student: [
          "All Gold Features",
          "Mobile App Access",
          "Offline Capabilities",
          "Advanced Notifications",
          "AI-Powered Recommendations",
        ],
        teacher: [
          "All Gold Features",
          "Mobile Teaching Tools",
          "Advanced AI Analytics",
          "Cross-Platform Sync",
        ],
        admin: [
          "All Gold Features",
          "Enterprise Dashboard",
          "Multi-Campus Management",
          "Advanced Security Features",
          "API Access",
        ],
        accountant: [
          "All Gold Features",
          "Enterprise Financial Suite",
          "Multi-Currency Support",
          "Advanced Compliance Tools",
        ],
        mobile: true,
        exclusive: "24/7 Dedicated Support & Custom Integrations",
      },
    },
  ];

  // Billing cycle options
  const billingCycles = [
    { value: "termly", label: "Termly", multiplier: 1 },
    { value: "annually", label: "Annually", multiplier: 2.5 },
    { value: "biannually", label: "Bi-Annually", multiplier: 4.5 },
  ];

  const calculatePrice = (plan, cycle) => {
    const cycleData = billingCycles.find((c) => c.value === cycle);
    if (!cycleData || !plan || !plan.pricePerStudent) {
      return 0; // Return 0 instead of NaN
    }
    return Math.round(plan.pricePerStudent * cycleData.multiplier);
  };

  const formatPriceForDisplay = (plan, cycle, curr) => {
    const cycleData =
      billingCycles.find((c) => c.value === cycle) || billingCycles[0];
    if (curr === "USD") {
      const usd = (plan.priceUSD || 0) * cycleData.multiplier;
      return `$${usd.toFixed(2)}`;
    }
    // NGN
    return `₦${Math.round(
      (plan.pricePerStudent || 0) * cycleData.multiplier
    ).toLocaleString()}`;
  };

  const handleSelectPlan = (plan) => {
    // Set selected plan to trigger animations
    setSelectedPlan(plan);
    
    // Delay navigation to allow user to enjoy the smooth animations
    setTimeout(() => {
      // Navigate to school details step - only pass serializable data
      navigate(routes.orderSummary, {
        state: {
          selectedPlan: {
            name: plan.name,
            tier: plan.tier,
            monthlyPrice: plan.monthlyPrice,
            yearlyPrice: plan.yearlyPrice,
            description: plan.description,
            features: plan.features,
          },
          billingCycle: billingCycle,
          price: calculatePrice(plan, billingCycle),
          currency: currency,
          formattedPrice: formatPriceForDisplay(plan, billingCycle, currency),
          step: 2, // School details step
        },
      });
    }, 2500); // 2.5 second delay to enjoy the animations
  };

  return (
    <div className="main-content">
      <div className="container-fluid">
        {/* Breadcrumb */}
        <BreadcrumbCard
          title="Choose Your Plan"
          breadcrumbLinks={[
            { label: "Home", to: "/user" },
            { label: "Buy Product", to: "/user/buy-product" },
          ]}
        />

        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}
          >
            Choose Your EduOS Plan
          </Typography>
          <Typography variant="h6" sx={{ color: "#666", mb: 3 }}>
            Transform your school with our comprehensive management system
          </Typography>

          {/* Billing Cycle Toggle */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <ToggleButtonGroup
              value={billingCycle}
              exclusive
              onChange={(event, newCycle) => {
                if (newCycle !== null) {
                  setBillingCycle(newCycle);
                }
              }}
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                "& .MuiToggleButton-root": {
                  border: "none",
                  borderRadius: "8px !important",
                  px: 3,
                  py: 1,
                  "&.Mui-selected": {
                    backgroundColor: "#1976d2",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  },
                },
              }}
            >
              {billingCycles.map((cycle) => (
                <ToggleButton key={cycle.value} value={cycle.value}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {cycle.label}
                  </Typography>
                  {cycle.discount && (
                    <Chip
                      label={cycle.discount}
                      size="small"
                      color="success"
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        fontSize: "0.7rem",
                      }}
                    />
                  )}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          {/* Currency Toggle */}
          <Box
            sx={{ display: "flex", justifyContent: "center", mb: 3, gap: 2 }}
          >
            <ToggleButtonGroup
              value={currency}
              exclusive
              onChange={(e, val) => {
                if (val) {
                  setCurrency(val);
                  try {
                    localStorage.setItem("currency", val);
                  } catch {
                    /* ignore */
                  }
                }
              }}
              size="small"
              aria-label="currency"
            >
              <ToggleButton value="NGN" aria-label="naira">
                ₦ NGN
              </ToggleButton>
              <ToggleButton value="USD" aria-label="usd">
                $ USD
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Plans Grid */}
        <Grid container spacing={2} sx={{ position: "relative" }}>
          {/* Confetti Overlay - Only shows when a plan is selected */}
          {selectedPlan && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                zIndex: 10,
                overflow: "hidden",
              }}
            >
              {[...Array(12)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: "absolute",
                    top: "-10px",
                    left: `${Math.random() * 100}%`,
                    width: "8px",
                    height: "8px",
                    background: [
                      "#4caf50",
                      "#66bb6a",
                      "#81c784",
                      "#ffeb3b",
                      "#ffc107",
                      "#ff9800",
                    ][i % 6],
                    animation: `${confettiFall} ${5 + Math.random() * 3}s linear infinite`,
                    animationDelay: `${i * 0.2}s`,
                    borderRadius: "50%",
                    opacity: 0.8,
                  }}
                />
              ))}
            </Box>
          )}
          
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={plan.id}>
              <Card
                onClick={() => handleSelectPlan(plan)}
                sx={{
                  maxHeight: "600px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  cursor: "pointer",
                  border: selectedPlan?.id === plan.id
                    ? "3px solid #4caf50"
                    : plan.popular
                    ? "2px solid #1976d2"
                    : "1px solid #e0e0e0",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: 12,
                  },
                  // Selected state with long animations
                  ...(selectedPlan?.id === plan.id && {
                    animation: `${cardPulse} 6s ease-in-out infinite`,
                    background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                      backgroundSize: "200% 200%",
                      animation: `${shimmerEffect} 5s linear infinite`,
                      borderRadius: "inherit",
                      pointerEvents: "none",
                      zIndex: 0,
                    },
                  }),
                }}
              >
                {/* Show SELECTED badge when plan is selected */}
                {selectedPlan?.id === plan.id ? (
                  <Chip
                    label="✓ SELECTED"
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontWeight: "bold",
                      zIndex: 2,
                      background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                      color: "white",
                      animation: `${rotateAndScale} 2s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
                      boxShadow: "0 4px 20px rgba(76, 175, 80, 0.6)",
                    }}
                  />
                ) : (
                  plan.popular && (
                    <Chip
                      label="MOST POPULAR"
                      color="primary"
                      sx={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontWeight: "bold",
                        zIndex: 1,
                      }}
                    />
                  )
                )}

                {/* Plan Header */}
                <Box
                  sx={{
                    background: selectedPlan?.id === plan.id
                      ? "linear-gradient(135deg, #4caf50, #66bb6a)"
                      : `linear-gradient(135deg, ${plan.color}, ${plan.color}80)`,
                    color: selectedPlan?.id === plan.id
                      ? "white"
                      : plan.id === "bronze" || plan.id === "gold"
                      ? "black"
                      : "white",
                    p: 2,
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                    transition: "all 1s ease-in-out",
                    ...(selectedPlan?.id === plan.id && {
                      animation: `${smoothGlow} 5s ease-in-out infinite`,
                    }),
                  }}
                >
                  <Box 
                    sx={{ 
                      fontSize: selectedPlan?.id === plan.id ? "2.5rem" : "1.5rem",
                      mb: 0.5,
                      display: "inline-block",
                      transition: "all 1s ease-in-out",
                      ...(selectedPlan?.id === plan.id && {
                        animation: `${gentleFloat} 8s ease-in-out infinite`,
                      }),
                    }}
                  >
                    {selectedPlan?.id === plan.id ? "🎉" : plan.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ mb: 1, opacity: 0.9, display: "block" }}
                  >
                    {plan.subtitle}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {formatPriceForDisplay(plan, billingCycle, currency)}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    per student /{" "}
                    {billingCycles
                      .find((c) => c.value === billingCycle)
                      ?.label.toLowerCase()}
                  </Typography>
                </Box>

                <CardContent sx={{ p: 2, overflow: "auto" }}>
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{
                      fontWeight: "bold",
                      mb: 1.5,
                      fontStyle: "italic",
                      display: "block",
                    }}
                  >
                    {plan.idealFor}
                  </Typography>

                  <Divider sx={{ mb: 1.5 }} />

                  {/* Student Panel Features */}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 0.5, color: "#2196f3" }}
                  >
                    👨‍🎓 Student Panel
                  </Typography>
                  <List dense sx={{ py: 0 }}>
                    {plan.features.student.slice(0, 2).map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <FaCheck
                            style={{ color: "#4caf50", fontSize: "0.7rem" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "0.75rem",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                    {plan.features.student.length > 2 && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        +{plan.features.student.length - 2} more
                      </Typography>
                    )}
                  </List>

                  <Divider sx={{ my: 1 }} />

                  {/* Teacher Panel Features */}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 0.5, color: "#ff9800" }}
                  >
                    👩‍🏫 Teacher Panel
                  </Typography>
                  <List dense sx={{ py: 0 }}>
                    {plan.features.teacher.slice(0, 1).map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <FaCheck
                            style={{ color: "#4caf50", fontSize: "0.7rem" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "0.75rem",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                    {plan.features.teacher.length > 1 && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        +{plan.features.teacher.length - 1} more
                      </Typography>
                    )}
                  </List>

                  <Divider sx={{ my: 1 }} />

                  {/* Admin Panel Features */}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 0.5, color: "#4caf50" }}
                  >
                    ⚙️ Admin Panel
                  </Typography>
                  <List dense sx={{ py: 0 }}>
                    {plan.features.admin.slice(0, 1).map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <FaCheck
                            style={{ color: "#4caf50", fontSize: "0.7rem" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "0.75rem",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                    {plan.features.admin.length > 1 && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        +{plan.features.admin.length - 1} more
                      </Typography>
                    )}
                  </List>

                  {/* Accountant Panel Features - Only show if exists */}
                  {plan.features.accountant &&
                    plan.features.accountant.length > 0 && (
                      <>
                        <Divider sx={{ my: 1 }} />
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", mb: 0.5, color: "#9c27b0" }}
                        >
                          💰 Accountant
                        </Typography>
                        <List dense sx={{ py: 0 }}>
                          {plan.features.accountant
                            .slice(0, 1)
                            .map((feature, index) => (
                              <ListItem key={index} sx={{ py: 0, px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 20 }}>
                                  <FaCheck
                                    style={{
                                      color: "#4caf50",
                                      fontSize: "0.7rem",
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={feature}
                                  sx={{
                                    "& .MuiListItemText-primary": {
                                      fontSize: "0.75rem",
                                    },
                                  }}
                                />
                              </ListItem>
                            ))}
                          {plan.features.accountant.length > 1 && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: "0.7rem" }}
                            >
                              +{plan.features.accountant.length - 1} more
                            </Typography>
                          )}
                        </List>
                      </>
                    )}

                  {/* Not Available Accountant Message - Remove or simplify */}
                  {(!plan.features.accountant ||
                    plan.features.accountant.length === 0) && (
                    <>
                      <Divider sx={{ my: 1 }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: "bold",
                          color: "#f44336",
                          display: "block",
                          mb: 0.5,
                        }}
                      >
                        💰 Accountant Panel
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FaTimes
                          style={{
                            color: "#f44336",
                            fontSize: "0.7rem",
                            marginRight: 6,
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Not Available
                        </Typography>
                      </Box>
                    </>
                  )}

                  {/* Mobile App Status */}
                  <Divider sx={{ my: 1.5 }} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: "bold", mr: 1 }}
                    >
                      📱 Mobile App:
                    </Typography>
                    {plan.features.mobile ? (
                      <>
                        <FaCheck
                          style={{
                            color: "#4caf50",
                            fontSize: "0.7rem",
                            marginRight: 4,
                          }}
                        />
                        <Typography variant="caption" color="success.main">
                          Included
                        </Typography>
                      </>
                    ) : (
                      <>
                        <FaTimes
                          style={{
                            color: "#f44336",
                            fontSize: "0.7rem",
                            marginRight: 4,
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Not Included
                        </Typography>
                      </>
                    )}
                  </Box>

                  {plan.features.exclusive && (
                    <Box
                      sx={{
                        mt: 1.5,
                        p: 0.75,
                        backgroundColor: "#fff3e0",
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="warning.main"
                        sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                      >
                        ⭐ {plan.features.exclusive}
                      </Typography>
                    </Box>
                  )}
                </CardContent>

                <Box sx={{ p: 2, pt: 0, position: "relative", zIndex: 1 }}>
                  <Button
                    variant={
                      selectedPlan?.id === plan.id
                        ? "contained"
                        : plan.popular
                        ? "contained"
                        : "outlined"
                    }
                    fullWidth
                    size="medium"
                    onClick={() => handleSelectPlan(plan)}
                    sx={{
                      py: 1,
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.8s ease",
                      ...(selectedPlan?.id === plan.id && {
                        background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                        color: "white",
                        animation: `${cardPulse} 6s ease-in-out infinite`,
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                          animation: `${shimmerEffect} 4s linear infinite`,
                        },
                      }),
                      ...(plan.popular && selectedPlan?.id !== plan.id && {
                        background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #1565c0, #1976d2)",
                          transform: "scale(1.05)",
                        },
                      }),
                      ...(!plan.popular && selectedPlan?.id !== plan.id && {
                        "&:hover": {
                          transform: "scale(1.05)",
                          borderWidth: "2px",
                        },
                      }),
                    }}
                  >
                    {selectedPlan?.id === plan.id
                      ? "🎊 SELECTED"
                      : plan.popular
                      ? "🚀 Choose Plan"
                      : "Select Plan"}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features Comparison Note */}
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
            🔍 Need More Details?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Each higher tier includes all features from lower tiers. Mobile app
            access is exclusive to Platinum plan users.
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default BuyProduct;
