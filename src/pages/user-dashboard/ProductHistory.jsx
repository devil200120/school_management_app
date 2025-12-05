import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome, FaEye, FaDownload, FaStar, FaClock } from "react-icons/fa";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Chip,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Rating,
} from "@mui/material";
import { GoDotFill } from "react-icons/go";
import { MdShoppingBag, MdReceipt, MdStar } from "react-icons/md";

// EDUOS School Management Plans Data
const subscriptionPlans = [
  {
    id: "PLAN-2024-001",
    productName: "EDUOS Bronze Plan - Termly",
    category: "School Management System",
    purchaseDate: "2024-11-01",
    expiryDate: "2025-03-01",
    daysUntilExpiry: () => {
      const expiry = new Date("2025-03-01");
      const today = new Date();
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    },
    studentCapacity: 150,
    unitPrice: 500,
    totalAmount: 75000,
    status: "Active",
    paymentMethod: "Bank Transfer",
    planType: "Termly Subscription",
    subscriptionStatus: "Active",
    autoRenewal: true,
    rating: 4,
    invoice: "EDU-INV-001.pdf",
    description:
      "Basic school management system with essential features for small to medium schools.",
    features: [
      "Student Dashboard (Web Access)",
      "Teacher Result Management",
      "Basic Admin Panel",
      "Student Registration",
      "Academic Record Management",
      "Basic Reporting",
      "Email Notifications",
    ],
    planTier: "Bronze",
    billingCycle: "Termly",
    studentCount: 150,
    pricePerStudent: 500,
    nextBillingDate: "2025-03-01",
    billingAddress: {
      name: "St. Mary's Academy",
      email: "admin@stmarysacademy.edu.ng",
      phone: "+234-803-123-4567",
      address: "123 Education Lane, Victoria Island, Lagos State, Nigeria",
    },
    supportLevel: "Email Support",
    supportExpiry: "2025-03-01",
  },
  {
    id: "PLAN-2024-002",
    productName: "EDUOS Silver Plan - Annual",
    category: "School Management System",
    purchaseDate: "2024-10-15",
    expiryDate: "2025-10-15",
    daysUntilExpiry: () => {
      const expiry = new Date("2025-10-15");
      const today = new Date();
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    },
    studentCapacity: 500,
    unitPrice: 400,
    totalAmount: 200000,
    status: "Active",
    paymentMethod: "Online Transfer",
    planType: "Annual Subscription",
    subscriptionStatus: "Active",
    autoRenewal: true,
    rating: 5,
    invoice: "EDU-INV-002.pdf",
    description:
      "Comprehensive school management solution with advanced features for growing institutions.",
    features: [
      "Everything in Bronze Plan",
      "Parent Portal Access",
      "Advanced Attendance Management",
      "Fee Management System",
      "Exam & Assessment Tools",
      "Detailed Analytics Dashboard",
      "Mobile App Access",
      "SMS Notifications",
      "Library Management",
    ],
    planTier: "Silver",
    billingCycle: "Annual",
    studentCount: 500,
    pricePerStudent: 400,
    nextBillingDate: "2025-10-15",
    billingAddress: {
      name: "Greenfield International School",
      email: "admin@greenfieldschool.edu.ng",
      phone: "+234-801-987-6543",
      address: "45 Independence Avenue, Abuja, FCT, Nigeria",
    },
    supportLevel: "Priority Email & Phone Support",
    supportExpiry: "2025-10-15",
  },
  {
    id: "PLAN-2024-003",
    productName: "EDUOS Gold Plan - Annual",
    category: "Premium School Management",
    purchaseDate: "2024-09-01",
    expiryDate: "2025-09-01",
    daysUntilExpiry: () => {
      const expiry = new Date("2025-09-01");
      const today = new Date();
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    },
    studentCapacity: 1000,
    unitPrice: 300,
    totalAmount: 300000,
    status: "Active",
    paymentMethod: "Credit Card",
    planType: "Annual Subscription",
    subscriptionStatus: "Active",
    autoRenewal: true,
    rating: 5,
    invoice: "EDU-INV-003.pdf",
    description:
      "Premium school management solution with enterprise-grade features and dedicated support.",
    features: [
      "Everything in Silver Plan",
      "Staff Management & HR",
      "Advanced Financial Management",
      "Inventory Management",
      "Transport Management",
      "Hostel Management",
      "Custom Report Builder",
      "API Access",
      "White-label Option",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
    planTier: "Gold",
    billingCycle: "Annual",
    studentCount: 1000,
    pricePerStudent: 300,
    nextBillingDate: "2025-09-01",
    billingAddress: {
      name: "Royal Academy International",
      email: "admin@royalacademy.edu.ng",
      phone: "+234-802-555-0199",
      address: "78 Royal Avenue, Ikeja, Lagos State, Nigeria",
    },
    supportLevel: "24/7 Premium Support + Dedicated Manager",
    supportExpiry: "2025-09-01",
  },
  {
    id: "PLAN-2024-004",
    productName: "EDUOS Starter Plan - Monthly",
    category: "Trial Plan",
    purchaseDate: "2024-11-15",
    expiryDate: "2024-12-15",
    daysUntilExpiry: () => {
      const expiry = new Date("2024-12-15");
      const today = new Date();
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    },
    studentCapacity: 50,
    unitPrice: 800,
    totalAmount: 40000,
    status: "Expiring Soon",
    paymentMethod: "Mobile Money",
    planType: "Monthly Trial",
    subscriptionStatus: "Expiring Soon",
    autoRenewal: false,
    rating: 4,
    invoice: "EDU-INV-004.pdf",
    description:
      "Perfect starter plan for small schools to test our platform before upgrading.",
    features: [
      "Basic Student Management",
      "Simple Grade Recording",
      "Basic Parent Communication",
      "Standard Reporting",
      "Email Support",
    ],
    planTier: "Starter",
    billingCycle: "Monthly",
    studentCount: 50,
    pricePerStudent: 800,
    nextBillingDate: "2024-12-15",
    billingAddress: {
      name: "Little Angels Nursery & Primary",
      email: "admin@littleangels.edu.ng",
      phone: "+234-805-234-5678",
      address: "12 School Lane, Kaduna State, Nigeria",
    },
    supportLevel: "Email Support",
    supportExpiry: "2024-12-15",
  },
  {
    id: "PLAN-2024-005",
    productName: "EDUOS Enterprise Plan - Annual",
    category: "Enterprise Solution",
    purchaseDate: "2024-08-01",
    expiryDate: "2025-08-01",
    daysUntilExpiry: () => {
      const expiry = new Date("2025-08-01");
      const today = new Date();
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    },
    studentCapacity: 2500,
    unitPrice: 250,
    totalAmount: 625000,
    status: "Active",
    paymentMethod: "Bank Transfer",
    planType: "Enterprise Annual",
    subscriptionStatus: "Active",
    autoRenewal: true,
    rating: 5,
    invoice: "EDU-INV-005.pdf",
    description:
      "Enterprise-grade solution for large educational institutions with multiple campuses.",
    features: [
      "Everything in Gold Plan",
      "Multi-Campus Management",
      "Advanced Analytics & BI",
      "Custom Integrations",
      "Data Migration Service",
      "Training & Onboarding",
      "Custom Development",
      "SLA Guarantee",
      "On-site Support Available",
    ],
    planTier: "Enterprise",
    billingCycle: "Annual",
    studentCount: 2500,
    pricePerStudent: 250,
    nextBillingDate: "2025-08-01",
    billingAddress: {
      name: "Federal Government College Consortium",
      email: "admin@fgconsortium.edu.ng",
      phone: "+234-807-111-2233",
      address: "Federal Secretariat, Central Business District, Abuja, Nigeria",
    },
    supportLevel: "Enterprise Support + SLA",
    supportExpiry: "2025-08-01",
  },
  {
    id: "PLAN-2024-006",
    productName: "EDUOS Bronze Plan - Monthly",
    category: "School Management System",
    purchaseDate: "2024-10-28",
    expiryDate: "2024-11-28",
    daysUntilExpiry: () => {
      const expiry = new Date("2024-11-28");
      const today = new Date();
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    },
    studentCapacity: 100,
    unitPrice: 600,
    totalAmount: 60000,
    status: "Expired",
    paymentMethod: "Mobile Money",
    planType: "Monthly Subscription",
    subscriptionStatus: "Expired",
    autoRenewal: false,
    rating: 3,
    invoice: "EDU-INV-006.pdf",
    description:
      "Monthly subscription for schools that prefer flexible payment options.",
    features: [
      "Student Dashboard (Web Access)",
      "Basic Admin Panel",
      "Student Registration",
      "Grade Management",
      "Basic Reporting",
    ],
    planTier: "Bronze",
    billingCycle: "Monthly",
    studentCount: 100,
    pricePerStudent: 600,
    nextBillingDate: null,
    billingAddress: {
      name: "Community High School Kano",
      email: "admin@chskano.edu.ng",
      phone: "+234-803-987-6543",
      address: "Community Road, Kano State, Nigeria",
    },
    supportLevel: "Email Support",
    supportExpiry: "2024-11-28",
  },
];

const ProductHistory = () => {
  const breadcrumbLinks = [
    { to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
    { to: routes.productHistory, label: "Purchase History" },
  ];

  // Show expiry notifications
  const expiringSoon = subscriptionPlans.filter((plan) => {
    const daysLeft = plan.daysUntilExpiry();
    return daysLeft <= 7 && daysLeft > 0;
  });

  const expired = subscriptionPlans.filter((plan) => {
    return plan.daysUntilExpiry() <= 0;
  });

  return (
    <div className="right-content w-100">
      <BreadcrumbCard
        title="My Subscription Plans & Expiry Tracking"
        breadcrumbLinks={breadcrumbLinks}
      />

      {/* Expiry Alerts */}
      {(expiringSoon.length > 0 || expired.length > 0) && (
        <div style={{ marginBottom: "20px" }}>
          {expired.length > 0 && (
            <Card style={{ marginBottom: "10px", backgroundColor: "#ffebee" }}>
              <CardContent style={{ padding: "12px" }}>
                <Typography
                  variant="h6"
                  style={{ color: "#d32f2f", marginBottom: "8px" }}
                >
                  ⚠️ Expired Plans ({expired.length})
                </Typography>
                {expired.map((plan) => (
                  <Typography
                    key={plan.id}
                    variant="body2"
                    style={{ color: "#d32f2f" }}
                  >
                    • {plan.productName} - Expired on{" "}
                    {new Date(plan.expiryDate).toLocaleDateString()}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          )}

          {expiringSoon.length > 0 && (
            <Card style={{ marginBottom: "10px", backgroundColor: "#fff3e0" }}>
              <CardContent style={{ padding: "12px" }}>
                <Typography
                  variant="h6"
                  style={{ color: "#f57c00", marginBottom: "8px" }}
                >
                  ⚡ Plans Expiring Soon ({expiringSoon.length})
                </Typography>
                {expiringSoon.map((plan) => (
                  <Typography
                    key={plan.id}
                    variant="body2"
                    style={{ color: "#f57c00" }}
                  >
                    • {plan.productName} - {plan.daysUntilExpiry()} days left
                    (Expires: {new Date(plan.expiryDate).toLocaleDateString()})
                  </Typography>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="main-container">
        <PurchaseHistoryStats />
        <TableWithPagination />
      </div>
    </div>
  );
};

const PurchaseHistoryStats = () => {
  // Calculate stats dynamically
  const totalPlans = subscriptionPlans.length;
  const totalSpent = subscriptionPlans.reduce(
    (sum, plan) => sum + plan.totalAmount,
    0
  );
  const activePlans = subscriptionPlans.filter(
    (plan) => plan.status === "Active"
  ).length;
  const expiringSoon = subscriptionPlans.filter((plan) => {
    const daysLeft = plan.daysUntilExpiry();
    return daysLeft <= 30 && daysLeft > 0;
  }).length;

  const stats = [
    {
      title: "Total Plans",
      value: totalPlans.toString(),
      icon: <MdShoppingBag size={24} />,
      color: "#4CAF50",
    },
    {
      title: "Total Spent",
      value: `₦${totalSpent.toLocaleString()}`,
      icon: <MdReceipt size={24} />,
      color: "#2196F3",
    },
    {
      title: "Active Plans",
      value: activePlans.toString(),
      icon: <MdStar size={24} />,
      color: "#FF9800",
    },
    {
      title: "Expiring Soon",
      value: expiringSoon.toString(),
      icon: <FaClock size={20} />,
      color: expiringSoon > 0 ? "#F44336" : "#9C27B0",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      {stats.map((stat, index) => (
        <Card key={index} style={{ flex: 1, minWidth: "200px" }}>
          <CardContent
            style={{ display: "flex", alignItems: "center", padding: "16px" }}
          >
            <Avatar
              style={{ backgroundColor: stat.color, marginRight: "16px" }}
            >
              {stat.icon}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", margin: 0 }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {stat.title}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const TableWithPagination = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#4CAF50";
      case "Expiring Soon":
        return "#FF9800";
      case "Expired":
        return "#F44336";
      case "Pending":
        return "#2196F3";
      default:
        return "#9E9E9E";
    }
  };

  const getExpiryStatusColor = (daysLeft) => {
    if (daysLeft <= 0) return "#F44336"; // Red for expired
    if (daysLeft <= 7) return "#FF9800"; // Orange for expiring soon
    if (daysLeft <= 30) return "#FFC107"; // Yellow for expiring in a month
    return "#4CAF50"; // Green for active
  };

  const getExpiryStatusText = (daysLeft) => {
    if (daysLeft <= 0) return "Expired";
    if (daysLeft <= 7) return `${daysLeft} days left`;
    if (daysLeft <= 30) return `${daysLeft} days left`;
    return `${daysLeft} days left`;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleDownloadInvoice = (order) => {
    if (order.invoice) {
      // Generate and download actual PDF invoice
      const invoiceContent = generateInvoicePDF(order);
      downloadFile(invoiceContent, order.invoice, "application/pdf");
    } else {
      alert("Invoice not available for this order.");
    }
  };

  const generateInvoicePDF = (order) => {
    // Generate invoice content as base64 encoded PDF-like content
    const invoiceData = `
EDUOS ACADEMY - INVOICE
======================

Invoice #: ${order.invoice}
Order ID: ${order.id}
Date: ${new Date(order.purchaseDate).toLocaleDateString()}

Bill To:
${order.billingAddress.name}
${order.billingAddress.email}
${order.billingAddress.phone}
${order.billingAddress.address}

Order Details:
Product: ${order.productName}
Category: ${order.category}
Quantity: ${order.quantity}
Unit Price: $${order.unitPrice.toFixed(2)}
Total Amount: $${order.totalAmount.toFixed(2)}

Payment Method: ${order.paymentMethod}
Order Type: ${order.orderType}
Status: ${order.status}

${order.licenseKey ? `License Key: ${order.licenseKey}` : ""}
${order.supportExpiry ? `Support Until: ${order.supportExpiry}` : ""}

Thank you for your purchase!

---
EDUOS Academy
education@eduos.com
1-800-EDUOS-HELP
		`.trim();

    // Convert to base64 (simulating PDF content)
    return btoa(invoiceData);
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([atob(content)], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleRateProduct = (order) => {
    if (order.status === "Active" || order.status === "Expiring Soon") {
      setSelectedOrder(order);
      setCurrentRating(order.rating || 0);
      setShowRatingDialog(true);
    } else {
      alert("You can only rate active products.");
    }
  };

  const handleRenewSubscription = (plan) => {
    // Simulate renewal process
    const confirmRenewal = window.confirm(
      `Would you like to renew "${plan.productName}" for another ${
        plan.billingCycle?.toLowerCase() || "period"
      }?\n\nAmount: ₦${plan.totalAmount.toLocaleString()}\nNext billing: ${
        plan.nextBillingDate || "TBD"
      }`
    );

    if (confirmRenewal) {
      // In a real app, this would redirect to payment page
      alert(`Redirecting to payment for renewal of ${plan.productName}...`);
      // window.location.href = `/checkout/renew/${plan.id}`;
    }
  };

  const handleSubmitRating = () => {
    if (selectedOrder && currentRating > 0) {
      // Update the rating in the data (in a real app, this would be an API call)
      selectedOrder.rating = currentRating;
      setShowRatingDialog(false);
      setSelectedOrder(null);
      setCurrentRating(0);
      alert(
        `Thank you for rating ${selectedOrder.productName} with ${currentRating} stars!`
      );
    }
  };

  const handleDownloadProduct = (order) => {
    if (order.downloadLink && order.status === "Delivered") {
      // In a real app, this would trigger the actual download
      window.open(order.downloadLink, "_blank");
    } else if (order.status === "Processing") {
      alert("Download will be available once the order is processed.");
    } else {
      alert("Download not available for this order.");
    }
  };

  const filteredData = subscriptionPlans.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
        className="tbl-30"
      >
        <TextField
          placeholder="Search plans, subscription details, or plan ID..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          className="tbl-30-search"
          style={{ minWidth: "300px" }}
        />
        <Typography variant="body2" color="textSecondary">
          Total Plans: {filteredData.length}
        </Typography>
      </div>

      <TableContainer className="table-container">
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Plan ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Subscription Details
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Start Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Expiry Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Payment Method
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Rating</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((plan, index) => {
              const daysLeft = plan.daysUntilExpiry();
              return (
                <TableRow
                  key={index}
                  style={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell>
                    <Typography
                      variant="body2"
                      style={{ fontWeight: "bold", color: "#1976d2" }}
                    >
                      {plan.id}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {plan.planType}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" style={{ fontWeight: "500" }}>
                      {plan.productName}
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "4px",
                      }}
                    >
                      <Chip
                        label={plan.planTier}
                        size="small"
                        style={{ backgroundColor: "#e3f2fd", fontSize: "11px" }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {plan.studentCapacity} students × ₦
                        {plan.unitPrice.toLocaleString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" style={{ fontWeight: "500" }}>
                      {new Date(plan.purchaseDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {plan.billingCycle || "One-time"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" style={{ fontWeight: "500" }}>
                      {new Date(plan.expiryDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </Typography>
                    <Chip
                      label={getExpiryStatusText(daysLeft)}
                      size="small"
                      style={{
                        backgroundColor: getExpiryStatusColor(daysLeft),
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "10px",
                        marginTop: "2px",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      ₦{plan.totalAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {plan.paymentMethod}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={plan.status}
                      style={{
                        backgroundColor: getStatusColor(plan.status),
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                      icon={<GoDotFill style={{ color: "white" }} />}
                    />
                    {plan.autoRenewal && plan.status === "Active" && (
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        style={{ display: "block", marginTop: "2px" }}
                      >
                        Auto-renew: ON
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {plan.rating ? (
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            color={i < plan.rating ? "#FFD700" : "#E0E0E0"}
                            size={14}
                          />
                        ))}
                        <Typography
                          variant="caption"
                          style={{ marginLeft: "4px" }}
                        >
                          ({plan.rating}/5)
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="caption" color="textSecondary">
                        {plan.status === "Active" ? "Not Rated" : "-"}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box
                      style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<FaEye />}
                        onClick={() => handleViewDetails(plan)}
                        style={{ minWidth: "auto", padding: "4px 8px" }}
                      >
                        View
                      </Button>
                      {plan.invoice && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<FaDownload />}
                          onClick={() => handleDownloadInvoice(plan)}
                          style={{
                            minWidth: "auto",
                            padding: "4px 8px",
                            color: "#1976d2",
                          }}
                        >
                          Invoice
                        </Button>
                      )}
                      {(plan.status === "Active" ||
                        plan.status === "Expiring Soon") && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<FaStar />}
                          onClick={() => handleRateProduct(plan)}
                          style={{
                            minWidth: "auto",
                            padding: "4px 8px",
                            color: plan.rating ? "#FFD700" : "#666",
                          }}
                        >
                          Rate
                        </Button>
                      )}
                      {(plan.status === "Expiring Soon" || daysLeft <= 30) && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleRenewSubscription(plan)}
                          style={{
                            minWidth: "auto",
                            padding: "4px 8px",
                            backgroundColor: "#2196F3",
                            color: "white",
                          }}
                        >
                          Renew
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="table-pagination-container"
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Plans per page:"
      />

      {/* Order Details Dialog */}
      <Dialog
        open={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Subscription Plan Details - #{selectedOrder?.id}</span>
            <Chip
              label={selectedOrder?.status}
              color={getStatusColor(selectedOrder?.status)}
              size="small"
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* Product Information */}
              <Paper style={{ padding: "16px" }}>
                <Typography
                  variant="h6"
                  style={{ marginBottom: "12px", color: "#1976d2" }}
                >
                  Subscription Plan Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Plan:</strong> {selectedOrder.productName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Student Capacity:</strong>{" "}
                      {selectedOrder.studentCapacity}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total Price:</strong> ₦
                      {selectedOrder.totalAmount.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Description:</strong> {selectedOrder.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Features Included:</strong>
                    </Typography>
                    <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                      {selectedOrder.features.map((feature, index) => (
                        <li key={index} style={{ marginBottom: "4px" }}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Grid>
                </Grid>
              </Paper>

              {/* Order Summary */}
              <Paper style={{ padding: "16px" }}>
                <Typography
                  variant="h6"
                  style={{ marginBottom: "12px", color: "#1976d2" }}
                >
                  Subscription Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Start Date:</strong> {selectedOrder.purchaseDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Plan Type:</strong> {selectedOrder.planType}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Payment Method:</strong>{" "}
                      {selectedOrder.paymentMethod}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total Amount:</strong> ₦
                      {selectedOrder.totalAmount.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Billing Cycle:</strong>{" "}
                      {selectedOrder.billingCycle}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Support Level:</strong>{" "}
                      {selectedOrder.supportLevel}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Billing Information */}
              {selectedOrder.billingAddress && (
                <Paper style={{ padding: "16px" }}>
                  <Typography
                    variant="h6"
                    style={{ marginBottom: "12px", color: "#1976d2" }}
                  >
                    Billing Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Name:</strong>{" "}
                        {selectedOrder.billingAddress.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Email:</strong>{" "}
                        {selectedOrder.billingAddress.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Phone:</strong>{" "}
                        {selectedOrder.billingAddress.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Address:</strong>{" "}
                        {selectedOrder.billingAddress.address}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Support Information */}
              {selectedOrder.supportExpiry && (
                <Paper style={{ padding: "16px" }}>
                  <Typography
                    variant="h6"
                    style={{ marginBottom: "12px", color: "#1976d2" }}
                  >
                    Support Information
                  </Typography>
                  <Typography>
                    <strong>Support Valid Until:</strong>{" "}
                    {selectedOrder.supportExpiry}
                  </Typography>
                  {selectedOrder.status === "Delivered" && (
                    <Box
                      style={{ marginTop: "12px", display: "flex", gap: "8px" }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          window.open(
                            "mailto:support@eduos.com?subject=Support Request - Order #" +
                              selectedOrder.id
                          )
                        }
                      >
                        Contact Support
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => window.open("/support-docs", "_blank")}
                      >
                        Documentation
                      </Button>
                    </Box>
                  )}
                </Paper>
              )}

              {/* Rating Section */}
              {selectedOrder.rating && (
                <Paper style={{ padding: "16px" }}>
                  <Typography
                    variant="h6"
                    style={{ marginBottom: "12px", color: "#1976d2" }}
                  >
                    Your Rating
                  </Typography>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Rating value={selectedOrder.rating} readOnly />
                    <Typography>({selectedOrder.rating}/5)</Typography>
                  </Box>
                </Paper>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowOrderDetails(false)}>Close</Button>
          {selectedOrder?.invoice && (
            <Button
              variant="outlined"
              startIcon={<FaDownload />}
              onClick={() => handleDownloadInvoice(selectedOrder)}
            >
              Download Invoice
            </Button>
          )}
          {selectedOrder?.downloadLink &&
            selectedOrder?.status === "Delivered" && (
              <Button
                variant="contained"
                startIcon={<FaDownload />}
                onClick={() => handleDownloadProduct(selectedOrder)}
                style={{ backgroundColor: "#4CAF50" }}
              >
                Download Product
              </Button>
            )}
        </DialogActions>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog
        open={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Rate Product</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box style={{ textAlign: "center", padding: "20px" }}>
              <Typography variant="h6" style={{ marginBottom: "16px" }}>
                {selectedOrder.productName}
              </Typography>
              <Typography style={{ marginBottom: "20px", color: "#666" }}>
                How would you rate this product?
              </Typography>
              <Rating
                value={currentRating}
                onChange={(event, newValue) => setCurrentRating(newValue)}
                size="large"
                style={{ fontSize: "3rem" }}
              />
              <Typography style={{ marginTop: "16px", color: "#666" }}>
                {currentRating ? `${currentRating}/5 Stars` : "Click to rate"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRatingDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmitRating}
            disabled={!currentRating}
          >
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductHistory;
