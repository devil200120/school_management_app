import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  FaTicketAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaPlus,
  FaCopy,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import BreadcrumbCard from "../../../components/BreadcrumbCard";
import routes from "../../../routes";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "WELCOME20",
      description: "Welcome discount for new users",
      discountType: "percentage",
      discountValue: 20,
      minOrderAmount: 5000,
      maxDiscountAmount: 10000,
      usageLimit: 100,
      usedCount: 23,
      expiryDate: "2025-12-31",
      isActive: true,
      createdAt: "2024-10-01",
    },
    {
      id: 2,
      code: "SAVE5000",
      description: "Fixed discount for bulk orders",
      discountType: "fixed",
      discountValue: 5000,
      minOrderAmount: 25000,
      maxDiscountAmount: null,
      usageLimit: 50,
      usedCount: 12,
      expiryDate: "2025-11-30",
      isActive: true,
      createdAt: "2024-10-15",
    },
    {
      id: 3,
      code: "STUDENT15",
      description: "Student discount for educational plans",
      discountType: "percentage",
      discountValue: 15,
      minOrderAmount: 0,
      maxDiscountAmount: 7500,
      usageLimit: null,
      usedCount: 156,
      expiryDate: "2025-06-30",
      isActive: false,
      createdAt: "2024-09-01",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setViewDialogOpen(true);
  };

  const handleDeleteClick = (coupon) => {
    setSelectedCoupon(coupon);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setCoupons(coupons.filter((c) => c.id !== selectedCoupon.id));
    setDeleteDialogOpen(false);
    setSelectedCoupon(null);
    toast.success("Coupon deleted successfully!");
  };

  const handleToggleStatus = (couponId) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === couponId
          ? { ...coupon, isActive: !coupon.isActive }
          : coupon
      )
    );
    const coupon = coupons.find((c) => c.id === couponId);
    toast.success(
      `Coupon ${coupon.isActive ? "deactivated" : "activated"} successfully!`
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Coupon code copied to clipboard!");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isExpired = (dateString) => {
    return new Date(dateString) < new Date();
  };

  const getUsagePercentage = (used, limit) => {
    if (!limit) return 0;
    return Math.round((used / limit) * 100);
  };

  const breadcrumbLinks = [
    { to: routes.adminDashboard, label: "Dashboard" },
    { label: "Manage Coupons" },
  ];

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Manage Coupons</h5>
        <BreadcrumbCard breadcrumbLinks={breadcrumbLinks} />
      </div>

      <Box sx={{ p: 3 }}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FaTicketAlt
                  style={{
                    fontSize: "24px",
                    marginRight: "12px",
                    color: "#1976d2",
                  }}
                />
                <Typography variant="h5" component="h1">
                  Coupon Management
                </Typography>
              </Box>
              <Link to={routes.addCoupon} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  startIcon={<FaPlus />}
                  sx={{ minWidth: "150px" }}
                >
                  Add New Coupon
                </Button>
              </Link>
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search coupons by code or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Code</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Discount</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Usage</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Expiry</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCoupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography
                            variant="h6"
                            component="span"
                            sx={{ fontFamily: "monospace" }}
                          >
                            {coupon.code}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => copyToClipboard(coupon.code)}
                            title="Copy code"
                          >
                            <FaCopy size={12} />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {coupon.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {coupon.discountType === "percentage"
                            ? `${coupon.discountValue}%`
                            : `₦${coupon.discountValue.toLocaleString()}`}
                        </Typography>
                        {coupon.minOrderAmount > 0 && (
                          <Typography variant="body2" color="text.secondary">
                            Min: ₦{coupon.minOrderAmount.toLocaleString()}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {coupon.usedCount}
                          {coupon.usageLimit ? `/${coupon.usageLimit}` : ""}
                        </Typography>
                        {coupon.usageLimit && (
                          <Typography variant="body2" color="text.secondary">
                            {getUsagePercentage(
                              coupon.usedCount,
                              coupon.usageLimit
                            )}
                            % used
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            isExpired(coupon.expiryDate)
                              ? "Expired"
                              : coupon.isActive
                              ? "Active"
                              : "Inactive"
                          }
                          color={
                            isExpired(coupon.expiryDate)
                              ? "error"
                              : coupon.isActive
                              ? "success"
                              : "default"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(coupon.expiryDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleViewCoupon(coupon)}
                            title="View details"
                          >
                            <FaEye />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleToggleStatus(coupon.id)}
                            title={coupon.isActive ? "Deactivate" : "Activate"}
                          >
                            <FaEdit />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(coupon)}
                            title="Delete coupon"
                            color="error"
                          >
                            <FaTrash />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredCoupons.length === 0 && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No coupons found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Get started by creating your first coupon"}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* View Coupon Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Coupon Details</DialogTitle>
        <DialogContent>
          {selectedCoupon && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedCoupon.code}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedCoupon.description}
              </Typography>
              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <Box>
                  <Typography variant="subtitle2">Discount Type:</Typography>
                  <Typography variant="body2">
                    {selectedCoupon.discountType === "percentage"
                      ? "Percentage"
                      : "Fixed Amount"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Discount Value:</Typography>
                  <Typography variant="body2">
                    {selectedCoupon.discountType === "percentage"
                      ? `${selectedCoupon.discountValue}%`
                      : `₦${selectedCoupon.discountValue.toLocaleString()}`}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Minimum Order:</Typography>
                  <Typography variant="body2">
                    ₦{selectedCoupon.minOrderAmount.toLocaleString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Usage Limit:</Typography>
                  <Typography variant="body2">
                    {selectedCoupon.usageLimit || "Unlimited"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Times Used:</Typography>
                  <Typography variant="body2">
                    {selectedCoupon.usedCount}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Expiry Date:</Typography>
                  <Typography variant="body2">
                    {formatDate(selectedCoupon.expiryDate)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Coupon</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the coupon &ldquo;
            {selectedCoupon?.code}&rdquo;? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageCoupons;
