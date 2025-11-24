import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import {
  FaHome,
  FaShoppingCart,
  FaEye,
  FaDownload,
  FaStar,
  FaTimes,
  FaGraduationCap,
} from "react-icons/fa";
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
  Divider,
  Rating,
} from "@mui/material";
import { GoDotFill } from "react-icons/go";
import {
  MdShoppingBag,
  MdReceipt,
  MdStar,
  MdLocationOn,
  MdPhone,
  MdEmail,
} from "react-icons/md";

const ProductHistory = () => {
  const breadcrumbLinks = [
    { to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
    { to: routes.productHistory, label: "Purchase History" },
  ];

  return (
    <div className="right-content w-100">
      <BreadcrumbCard
        title="My Purchase History"
        breadcrumbLinks={breadcrumbLinks}
      />
      <div className="main-container">
        <PurchaseHistoryStats />
        <TableWithPagination />
      </div>
    </div>
  );
};

const PurchaseHistoryStats = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "8",
      icon: <MdShoppingBag size={24} />,
      color: "#4CAF50",
    },
    {
      title: "Total Spent",
      value: "₦10,650,000",
      icon: <MdReceipt size={24} />,
      color: "#2196F3",
    },
    {
      title: "Active Plans",
      value: "5",
      icon: <MdStar size={24} />,
      color: "#FF9800",
    },
    {
      title: "Students Served",
      value: "2,050",
      icon: <FaGraduationCap size={20} />,
      color: "#9C27B0",
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

  const purchaseData = [
    {
      id: "ORD-2024-001",
      productName: "Bronze Plan - Termly",
      category: "School Management System",
      purchaseDate: "2024-11-01",
      quantity: 150,
      unitPrice: 500,
      totalAmount: 75000,
      status: "Delivered",
      paymentMethod: "Bank Transfer",
      orderType: "Termly Subscription",
      rating: 4,
      invoice: "INV-2024-001.pdf",
      description:
        "Basic school management system with web-only access. Includes student dashboard, teacher result management, and basic admin features.",
      features: [
        "Student Dashboard (Web)",
        "Print Result",
        "Print Form",
        "Teacher Dashboard",
        "Basic Admin Panel",
      ],
      downloadLink: "https://download.eduos.com/bronze-setup-v1.2.zip",
      licenseKey: "EDUOS-BRONZE-2024-A1B2C3",
      supportExpiry: "2025-02-01",
      planTier: "Bronze",
      billingCycle: "Termly",
      studentCount: 150,
      pricePerStudent: 500,
      billingAddress: {
        name: "St. Mary's Academy",
        email: "admin@stmarysacademy.edu.ng",
        phone: "+234-803-123-4567",
        address: "123 Education Lane, Victoria Island, Lagos State, Nigeria",
      },
    },
    {
      id: "ORD-2024-002",
      productName: "Student Management Module",
      category: "Add-on",
      purchaseDate: "2024-11-10",
      quantity: 1,
      unitPrice: 149.99,
      totalAmount: 149.99,
      status: "Delivered",
      paymentMethod: "PayPal",
      orderType: "Digital Download",
      rating: 4,
      invoice: "INV-002.pdf",
      description:
        "Advanced student management module with enrollment, profiles, and academic tracking.",
      features: [
        "Student Profiles",
        "Enrollment Management",
        "Academic Records",
        "Photo Management",
      ],
      downloadLink: "https://download.eduos.com/student-module-v1.5.zip",
      licenseKey: "EDUOS-STU-2024-D4E5F6",
      supportExpiry: "2025-11-10",
      billingAddress: {
        name: "Sarah Johnson",
        email: "sarah@academy.edu",
        phone: "+1-555-0124",
        address: "456 Academy Avenue, Education Town, ET 67890",
      },
    },
    {
      id: "ORD-2024-003",
      productName: "Staff Attendance Tracker",
      category: "Module",
      purchaseDate: "2024-11-08",
      quantity: 2,
      unitPrice: 79.99,
      totalAmount: 159.98,
      status: "Processing",
      paymentMethod: "Bank Transfer",
      orderType: "Digital License",
      rating: null,
      invoice: "INV-003.pdf",
      description:
        "Professional staff attendance tracking system with biometric integration and reporting.",
      features: [
        "Biometric Scanning",
        "QR Code Punch",
        "Attendance Reports",
        "Leave Management",
      ],
      downloadLink: null,
      licenseKey: "EDUOS-ATT-2024-G7H8I9",
      supportExpiry: "2025-11-08",
      billingAddress: {
        name: "Michael Chen",
        email: "mike@highschool.edu",
        phone: "+1-555-0125",
        address: "789 School Drive, Academic City, AC 54321",
      },
    },
    {
      id: "ORD-2024-004",
      productName: "EDUOS Complete Suite",
      category: "Bundle",
      purchaseDate: "2024-11-05",
      quantity: 1,
      unitPrice: 599.99,
      totalAmount: 599.99,
      status: "Delivered",
      paymentMethod: "Credit Card",
      orderType: "Annual License",
      rating: 5,
      invoice: "INV-004.pdf",
      description:
        "Complete school management solution with all modules included for comprehensive education management.",
      features: [
        "All Premium Modules",
        "Priority Support",
        "Custom Integration",
        "Training Sessions",
      ],
      downloadLink: "https://download.eduos.com/complete-suite-v3.0.zip",
      licenseKey: "EDUOS-COMP-2024-J1K2L3",
      supportExpiry: "2025-11-05",
      billingAddress: {
        name: "Emily Rodriguez",
        email: "emily@university.edu",
        phone: "+1-555-0126",
        address: "321 University Road, Campus City, CC 98765",
      },
    },
    {
      id: "ORD-2024-005",
      productName: "Grade Management System",
      category: "Software",
      purchaseDate: "2024-11-02",
      quantity: 1,
      unitPrice: 199.99,
      totalAmount: 199.99,
      status: "Delivered",
      paymentMethod: "Credit Card",
      orderType: "Digital License",
      rating: 4,
      invoice: "INV-005.pdf",
      description:
        "Comprehensive grade management system with gradebook, report cards, and analytics.",
      features: [
        "Digital Gradebook",
        "Report Cards",
        "Grade Analytics",
        "Parent Access",
      ],
      downloadLink: "https://download.eduos.com/grade-system-v2.3.zip",
      licenseKey: "EDUOS-GRAD-2024-M4N5O6",
      supportExpiry: "2025-11-02",
      billingAddress: {
        name: "David Thompson",
        email: "david@elementary.edu",
        phone: "+1-555-0127",
        address: "654 Elementary Street, Primary City, PC 13579",
      },
    },
    {
      id: "ORD-2024-006",
      productName: "Parent Communication Portal",
      category: "Add-on",
      purchaseDate: "2024-10-28",
      quantity: 1,
      unitPrice: 89.99,
      totalAmount: 89.99,
      status: "Cancelled",
      paymentMethod: "PayPal",
      orderType: "Monthly Subscription",
      rating: null,
      invoice: null,
      description:
        "Interactive parent communication portal with messaging, announcements, and progress tracking.",
      features: [
        "Parent Messaging",
        "Announcements",
        "Progress Reports",
        "Event Calendar",
      ],
      downloadLink: null,
      licenseKey: null,
      supportExpiry: null,
      billingAddress: {
        name: "Lisa Williams",
        email: "lisa@middleschool.edu",
        phone: "+1-555-0128",
        address: "987 Middle School Lane, Junior City, JC 24680",
      },
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#4CAF50";
      case "Processing":
        return "#FF9800";
      case "Cancelled":
        return "#F44336";
      case "Pending":
        return "#2196F3";
      default:
        return "#9E9E9E";
    }
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
    if (order.status === "Delivered") {
      setSelectedOrder(order);
      setCurrentRating(order.rating || 0);
      setShowRatingDialog(true);
    } else {
      alert("You can only rate delivered products.");
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

  const filteredData = purchaseData.filter((row) =>
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
          placeholder="Search orders, products, or order ID..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          className="tbl-30-search"
          style={{ minWidth: "300px" }}
        />
        <Typography variant="body2" color="textSecondary">
          Total Orders: {filteredData.length}
        </Typography>
      </div>

      <TableContainer className="table-container">
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Product Details
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Purchase Date
              </TableCell>
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
            {paginatedData.map((order, index) => (
              <TableRow
                key={index}
                style={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
              >
                <TableCell>
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", color: "#1976d2" }}
                  >
                    {order.id}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {order.orderType}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" style={{ fontWeight: "500" }}>
                    {order.productName}
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
                      label={order.category}
                      size="small"
                      style={{ backgroundColor: "#e3f2fd", fontSize: "11px" }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      Qty: {order.quantity} × ${order.unitPrice}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(order.purchaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                  >
                    ${order.totalAmount.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{order.paymentMethod}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    style={{
                      backgroundColor: getStatusColor(order.status),
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                    icon={<GoDotFill style={{ color: "white" }} />}
                  />
                </TableCell>
                <TableCell>
                  {order.rating ? (
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          color={i < order.rating ? "#FFD700" : "#E0E0E0"}
                          size={14}
                        />
                      ))}
                      <Typography
                        variant="caption"
                        style={{ marginLeft: "4px" }}
                      >
                        ({order.rating}/5)
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      {order.status === "Delivered" ? "Not Rated" : "-"}
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
                      onClick={() => handleViewDetails(order)}
                      style={{ minWidth: "auto", padding: "4px 8px" }}
                    >
                      View
                    </Button>
                    {order.invoice && (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<FaDownload />}
                        onClick={() => handleDownloadInvoice(order)}
                        style={{
                          minWidth: "auto",
                          padding: "4px 8px",
                          color: "#1976d2",
                        }}
                      >
                        Invoice
                      </Button>
                    )}
                    {order.downloadLink && order.status === "Delivered" && (
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<FaDownload />}
                        onClick={() => handleDownloadProduct(order)}
                        style={{
                          minWidth: "auto",
                          padding: "4px 8px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                        }}
                      >
                        Download
                      </Button>
                    )}
                    {order.status === "Delivered" && (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<FaStar />}
                        onClick={() => handleRateProduct(order)}
                        style={{
                          minWidth: "auto",
                          padding: "4px 8px",
                          color: order.rating ? "#FFD700" : "#666",
                        }}
                      >
                        Rate
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
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
        labelRowsPerPage="Orders per page:"
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
            <span>Order Details - #{selectedOrder?.id}</span>
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
                  Product Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Product:</strong> {selectedOrder.productName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Quantity:</strong> {selectedOrder.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Price:</strong> ₦
                      {selectedOrder.totalAmount.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Description:</strong> {selectedOrder.description}
                    </Typography>
                  </Grid>
                  {selectedOrder.licenseKey && (
                    <Grid item xs={12}>
                      <Typography>
                        <strong>License Key:</strong>
                        <Chip
                          label={selectedOrder.licenseKey}
                          size="small"
                          style={{
                            marginLeft: "8px",
                            backgroundColor: "#e3f2fd",
                          }}
                        />
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>

              {/* Order Summary */}
              <Paper style={{ padding: "16px" }}>
                <Typography
                  variant="h6"
                  style={{ marginBottom: "12px", color: "#1976d2" }}
                >
                  Order Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Order Date:</strong> {selectedOrder.purchaseDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Order Type:</strong> {selectedOrder.orderType}
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
