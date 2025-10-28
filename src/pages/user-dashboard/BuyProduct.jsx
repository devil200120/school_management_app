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
} from "@mui/material";
import routes from "../../routes";
import BreadcrumbCard from "../../components/BreadcrumbCard";

const BuyProduct = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("termly");
  const [selectedPlan, setSelectedPlan] = useState(null);

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
          "Basic Profile Management"
        ],
        teacher: [
          "Grade Management", 
          "Assignment Creation", 
          "Basic Class Management"
        ],
        admin: [
          "Student Registration", 
          "Basic Reporting", 
          "User Management"
        ],
        accountant: [],
        mobile: false,
        exclusive: null
      }
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
          "Disciplinary Records"
        ],
        teacher: [
          "All Bronze Features",
          "Advanced Gradebook", 
          "Lesson Planning", 
          "Parent Communication", 
          "Attendance Management"
        ],
        admin: [
          "All Bronze Features",
          "Fee Management", 
          "Advanced Analytics", 
          "Staff Management", 
          "School Calendar"
        ],
        accountant: [
          "Basic Financial Reports", 
          "Fee Collection Tracking"
        ],
        mobile: false,
        exclusive: null
      }
    },
    {
      id: "gold",
      name: "Gold Plan",
      subtitle: "Advanced Management (Web Only)",
      pricePerStudent: 750,
      priceUSD: 0.50,
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
          "Certificate Generation"
        ],
        teacher: [
          "All Silver Features",
          "Advanced Assessment Tools", 
          "Curriculum Management", 
          "Professional Development Tracking"
        ],
        admin: [
          "All Silver Features",
          "Advanced Reporting Dashboard", 
          "Inventory Management", 
          "HR Management", 
          "Custom Workflows"
        ],
        accountant: [
          "All Silver Features",
          "Budget Planning", 
          "Expense Management", 
          "Financial Analytics", 
          "Audit Trail"
        ],
        mobile: false,
        exclusive: "Priority Customer Support"
      }
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
          "AI-Powered Recommendations"
        ],
        teacher: [
          "All Gold Features",
          "Mobile Teaching Tools", 
          "Advanced AI Analytics", 
          "Cross-Platform Sync"
        ],
        admin: [
          "All Gold Features",
          "Enterprise Dashboard", 
          "Multi-Campus Management", 
          "Advanced Security Features", 
          "API Access"
        ],
        accountant: [
          "All Gold Features",
          "Enterprise Financial Suite", 
          "Multi-Currency Support", 
          "Advanced Compliance Tools"
        ],
        mobile: true,
        exclusive: "24/7 Dedicated Support & Custom Integrations"
      }
    }
  ];

  // Billing cycle options
  const billingCycles = [
    { value: "termly", label: "Termly", multiplier: 1 },
    { value: "annually", label: "Annually", multiplier: 2.5 },
    { value: "biannually", label: "Bi-Annually", multiplier: 4.5 }
  ];

  const calculatePrice = (plan, cycle) => {
    const cycleData = billingCycles.find(c => c.value === cycle);
    if (!cycleData || !plan || !plan.pricePerStudent) {
      return 0; // Return 0 instead of NaN
    }
    return Math.round(plan.pricePerStudent * cycleData.multiplier);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    // Navigate to school details step - only pass serializable data
    navigate(routes.orderSummary, { 
      state: { 
        selectedPlan: {
          name: plan.name,
          tier: plan.tier,
          monthlyPrice: plan.monthlyPrice,
          yearlyPrice: plan.yearlyPrice,
          description: plan.description,
          features: plan.features
        },
        billingCycle: billingCycle,
        price: calculatePrice(plan, billingCycle),
        step: 2 // School details step
      } 
    });
  };

  return (
    <div className="main-content">
      <div className="container-fluid">
        {/* Breadcrumb */}
        <BreadcrumbCard
          title="Choose Your Plan"
          breadcrumbLinks={[
            { label: "Home", to: "/user" },
            { label: "Buy Product", to: "/user/buy-product" }
          ]}
        />

        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}>
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
                        fontSize: "0.7rem"
                      }}
                    />
                  )}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Plans Grid */}
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} md={6} lg={3} key={plan.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  border: plan.popular ? "3px solid #1976d2" : "1px solid #e0e0e0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                {plan.popular && (
                  <Chip
                    label="MOST POPULAR"
                    color="primary"
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontWeight: "bold",
                      zIndex: 1
                    }}
                  />
                )}

                {/* Plan Header */}
                <Box 
                  sx={{ 
                    background: `linear-gradient(135deg, ${plan.color}, ${plan.color}80)`,
                    color: plan.id === "bronze" || plan.id === "gold" ? "black" : "white",
                    p: 3,
                    textAlign: "center"
                  }}
                >
                  <Box sx={{ fontSize: "2rem", mb: 1 }}>
                    {plan.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                    {plan.subtitle}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                    ₦{calculatePrice(plan, billingCycle).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    per student / {billingCycles.find(c => c.value === billingCycle)?.label.toLowerCase()}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    (${plan.priceUSD} USD per student)
                  </Typography>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="body2" 
                    color="primary" 
                    sx={{ fontWeight: "bold", mb: 2, fontStyle: "italic" }}
                  >
                    {plan.idealFor}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  {/* Student Panel Features */}
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#2196f3" }}>
                    👨‍🎓 Student Panel
                  </Typography>
                  <List dense>
                    {plan.features.student.slice(0, 3).map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <FaCheck style={{ color: "#4caf50", fontSize: "0.8rem" }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          sx={{ 
                            "& .MuiListItemText-primary": { 
                              fontSize: "0.85rem" 
                            } 
                          }} 
                        />
                      </ListItem>
                    ))}
                    {plan.features.student.length > 3 && (
                      <Typography variant="caption" color="text.secondary">
                        +{plan.features.student.length - 3} more features
                      </Typography>
                    )}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  {/* Teacher Panel Features */}
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#ff9800" }}>
                    👩‍🏫 Teacher Panel
                  </Typography>
                  <List dense>
                    {plan.features.teacher.slice(0, 2).map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <FaCheck style={{ color: "#4caf50", fontSize: "0.8rem" }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          sx={{ 
                            "& .MuiListItemText-primary": { 
                              fontSize: "0.85rem" 
                            } 
                          }} 
                        />
                      </ListItem>
                    ))}
                    {plan.features.teacher.length > 2 && (
                      <Typography variant="caption" color="text.secondary">
                        +{plan.features.teacher.length - 2} more features
                      </Typography>
                    )}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  {/* Admin Panel Features */}
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#4caf50" }}>
                    ⚙️ Admin Panel
                  </Typography>
                  <List dense>
                    {plan.features.admin.slice(0, 2).map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <FaCheck style={{ color: "#4caf50", fontSize: "0.8rem" }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          sx={{ 
                            "& .MuiListItemText-primary": { 
                              fontSize: "0.85rem" 
                            } 
                          }} 
                        />
                      </ListItem>
                    ))}
                    {plan.features.admin.length > 2 && (
                      <Typography variant="caption" color="text.secondary">
                        +{plan.features.admin.length - 2} more features
                      </Typography>
                    )}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  {/* Accountant Panel Features */}
                  {plan.features.accountant && plan.features.accountant.length > 0 ? (
                    <>
                      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#9c27b0" }}>
                        💰 Accountant Panel
                      </Typography>
                      <List dense>
                        {plan.features.accountant.slice(0, 2).map((feature, index) => (
                          <ListItem key={index} sx={{ py: 0, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              <FaCheck style={{ color: "#4caf50", fontSize: "0.8rem" }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature} 
                              sx={{ 
                                "& .MuiListItemText-primary": { 
                                  fontSize: "0.85rem" 
                                } 
                              }} 
                            />
                          </ListItem>
                        ))}
                        {plan.features.accountant.length > 2 && (
                          <Typography variant="caption" color="text.secondary">
                            +{plan.features.accountant.length - 2} more features
                          </Typography>
                        )}
                      </List>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, mt: 2, color: "#f44336" }}>
                        💰 Accountant Panel
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FaTimes style={{ color: "#f44336", fontSize: "0.8rem", marginRight: 8 }} />
                        <Typography variant="body2" color="text.secondary">
                          Not Available
                        </Typography>
                      </Box>
                    </>
                  )}

                  {/* Mobile App */}
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, mt: 2, color: "#607d8b" }}>
                    📱 Mobile App
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {plan.features.mobile ? (
                      <>
                        <FaCheck style={{ color: "#4caf50", fontSize: "0.8rem", marginRight: 8 }} />
                        <Typography variant="body2" color="success.main">
                          Included
                        </Typography>
                      </>
                    ) : (
                      <>
                        <FaTimes style={{ color: "#f44336", fontSize: "0.8rem", marginRight: 8 }} />
                        <Typography variant="body2" color="text.secondary">
                          Not Included
                        </Typography>
                      </>
                    )}
                  </Box>

                  {plan.features.exclusive && (
                    <Box sx={{ mt: 2, p: 1, backgroundColor: "#fff3e0", borderRadius: 1 }}>
                      <Typography variant="caption" color="warning.main" sx={{ fontWeight: "bold" }}>
                        ⭐ {plan.features.exclusive}
                      </Typography>
                    </Box>
                  )}
                </CardContent>

                <Box sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant={plan.popular ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    onClick={() => handleSelectPlan(plan)}
                    sx={{
                      py: 1.5,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      ...(plan.popular && {
                        background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #1565c0, #1976d2)",
                        }
                      })
                    }}
                  >
                    {plan.popular ? "🚀 Choose Popular Plan" : "Select Plan"}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features Comparison Note */}
        <Box sx={{ mt: 4, p: 3, backgroundColor: "#f3e5f5", borderRadius: 2, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#9c27b0" }}>
            🔍 Need More Details?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Each higher tier includes all features from lower tiers. 
            Mobile app access is exclusive to Platinum plan users.
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default BuyProduct;