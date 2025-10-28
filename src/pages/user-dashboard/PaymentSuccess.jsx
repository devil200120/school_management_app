import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { 
  Button, 
  LinearProgress, 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Divider,
  Alert,
  IconButton,
  Snackbar
} from "@mui/material";
import { 
  FaCheck, 
  FaGlobe, 
  FaUser, 
  FaLock, 
  FaCopy, 
  FaExternalLinkAlt,
  FaEnvelope,
  FaCrown
} from "react-icons/fa";
import routes from "../../routes";
import BreadcrumbCard from "../../components/BreadcrumbCard";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [installing, setInstalling] = useState(true);
  const [progress, setProgress] = useState(0);
  const [copySuccess, setCopySuccess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Get data from payment completion
  const orderData = location.state || {
    schoolName: "Demo School",
    subdomain: "demoschool.eduos.com.ng",
    plan: { name: "Silver Plan", id: "silver" },
    totalAmount: 50000,
    studentCount: 100,
    adminCredentials: {
      url: "https://demoschool.eduos.com.ng",
      username: "admin",
      password: "eduos123"
    }
  };

  const breadcrumbLinks = [
    { to: routes.userDashboard, icon: <FaGlobe />, label: "Dashboard" },
    { to: routes.buyProduct, label: "Plans" },
    { to: "", label: "Success" },
  ];

  // Confetti effect
  useEffect(() => {
    if (!installing) {
      const end = Date.now() + 3 * 1000;
      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const frame = () => {
        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(15, 25),
          origin: { y: 0.6, x: 0.5 },
          scalar: 0.8,
          colors: ['#1976d2', '#42a5f5', '#4caf50', '#ff9800', '#9c27b0']
        });

        if (Date.now() < end) {
          setTimeout(() => requestAnimationFrame(frame), 300);
        }
      };

      frame();
    }
  }, [installing]);

  // Progress simulation
  useEffect(() => {
    if (installing) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            setInstalling(false);
            clearInterval(interval);
            return 100;
          }
          return prevProgress + Math.random() * 15;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [installing]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(`${label} copied!`);
      setSnackbarOpen(true);
    });
  };

  const visitPortal = () => {
    window.open(orderData.adminCredentials.url, '_blank');
  };

  if (installing) {
    return (
      <div className="right-content w-100">
        <BreadcrumbCard
          title="Step 4: Setting up your portal..."
          breadcrumbLinks={breadcrumbLinks}
        />
        <div className="main-container d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
          <Card sx={{ maxWidth: 500, width: "100%", textAlign: "center" }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ mb: 3 }}>
                <FaGlobe style={{ fontSize: "4rem", color: "#1976d2", marginBottom: "1rem" }} />
                <Typography variant="h4" gutterBottom>
                  Setting Up Your Portal
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Please wait while we configure your school management system...
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    backgroundColor: "#e3f2fd",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 5,
                      background: "linear-gradient(90deg, #1976d2, #42a5f5)"
                    }
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {Math.round(progress)}% Complete
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                ⚡ Configuring database<br/>
                🎨 Setting up your branding<br/>
                🔐 Creating admin credentials<br/>
                📧 Preparing welcome email
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="right-content w-100">
      <BreadcrumbCard
        title="Step 4: Portal Access Ready!"
        breadcrumbLinks={breadcrumbLinks}
      />

      <div className="main-container">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box sx={{ 
            display: "inline-flex", 
            alignItems: "center", 
            justifyContent: "center",
            width: 80, 
            height: 80, 
            borderRadius: "50%", 
            backgroundColor: "#4caf50", 
            color: "white",
            fontSize: "2rem",
            mb: 2
          }}>
            <FaCheck />
          </Box>
          <Typography variant="h3" gutterBottom sx={{ color: "#4caf50", fontWeight: "bold" }}>
            🎉 Congratulations!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Your school portal is ready!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to the future of school management
          </Typography>
        </Box>

        <Card sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <FaCrown style={{ fontSize: "1.5rem", color: "#ff9800", marginRight: 12 }} />
              <Typography variant="h5" fontWeight="bold">
                Order Confirmation
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>School Name:</strong> {orderData.schoolName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Plan:</strong> {orderData.plan.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Students:</strong> {orderData.studentCount}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Total Paid:</strong> ₦{orderData.totalAmount.toLocaleString()}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Portal Access Details */}
            <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FaGlobe style={{ color: "#1976d2" }} />
              Your Portal Access Details
            </Typography>

            <Alert severity="success" sx={{ mb: 3 }}>
              Your portal is now live and ready to use! DNS propagation may take up to 24 hours for global access.
            </Alert>

            <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
              {/* Portal URL */}
              <Card sx={{ backgroundColor: "#f8f9fa" }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <FaGlobe style={{ color: "#1976d2" }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Portal URL
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" sx={{ wordBreak: "break-all" }}>
                          {orderData.adminCredentials.url}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => copyToClipboard(orderData.adminCredentials.url, "Portal URL")}
                        sx={{ mr: 1 }}
                      >
                        <FaCopy />
                      </IconButton>
                      <IconButton size="small" onClick={visitPortal} color="primary">
                        <FaExternalLinkAlt />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Admin Username */}
              <Card sx={{ backgroundColor: "#f8f9fa" }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <FaUser style={{ color: "#4caf50" }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Admin Username
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {orderData.adminCredentials.username}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={() => copyToClipboard(orderData.adminCredentials.username, "Username")}
                    >
                      <FaCopy />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>

              {/* Admin Password */}
              <Card sx={{ backgroundColor: "#f8f9fa" }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <FaLock style={{ color: "#ff9800" }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Admin Password
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {orderData.adminCredentials.password}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={() => copyToClipboard(orderData.adminCredentials.password, "Password")}
                    >
                      <FaCopy />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
              <FaEnvelope style={{ marginRight: 8 }} />
              These credentials have also been sent to your email address. Please change your password after first login.
            </Alert>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                onClick={visitPortal}
                startIcon={<FaExternalLinkAlt />}
                sx={{ 
                  flex: 1, 
                  minWidth: 200,
                  background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1565c0, #1976d2)"
                  }
                }}
              >
                Access Your Portal
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(routes.userDashboard)}
                sx={{ flex: 1, minWidth: 200 }}
              >
                Return to Dashboard
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card sx={{ maxWidth: 800, mx: "auto" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              🚀 Next Steps
            </Typography>
            <Box component="ol" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Login to your portal using the credentials above
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Change your admin password in Settings
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Add your school information and branding
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Create classes, subjects, and student accounts
              </Typography>
              <Typography component="li" variant="body2">
                Start managing your school digitally!
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={copySuccess}
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;
