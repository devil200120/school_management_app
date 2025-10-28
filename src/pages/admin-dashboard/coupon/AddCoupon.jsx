import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { FaTicketAlt, FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import BreadcrumbCard from "../../../components/BreadcrumbCard";
import routes from "../../../routes";

const AddCoupon = () => {
  const [couponData, setCouponData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    usageLimit: "",
    expiryDate: "",
    isActive: true,
  });

  const handleInputChange = (field) => (event) => {
    setCouponData({
      ...couponData,
      [field]: event.target.value,
    });
  };

  const handleSwitchChange = (field) => (event) => {
    setCouponData({
      ...couponData,
      [field]: event.target.checked,
    });
  };

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCouponData({
      ...couponData,
      code: result,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!couponData.code || !couponData.discountValue) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (
      couponData.discountType === "percentage" &&
      couponData.discountValue > 100
    ) {
      toast.error("Percentage discount cannot exceed 100%");
      return;
    }

    // Simulate API call
    console.log("Coupon Data:", couponData);
    toast.success("Coupon created successfully!");

    // Reset form after successful creation
    setCouponData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      minOrderAmount: "",
      maxDiscountAmount: "",
      usageLimit: "",
      expiryDate: "",
      isActive: true,
    });
  };

  const breadcrumbLinks = [
    { to: routes.adminDashboard, label: "Dashboard" },
    { to: routes.manageCoupon, label: "Manage Coupons" },
    { label: "Add Coupon" },
  ];

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Add New Coupon</h5>
        <BreadcrumbCard breadcrumbLinks={breadcrumbLinks} />
      </div>

      <Box sx={{ p: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <FaTicketAlt
                style={{
                  fontSize: "24px",
                  marginRight: "12px",
                  color: "#1976d2",
                }}
              />
              <Typography variant="h5" component="h1">
                Create New Coupon
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      fullWidth
                      label="Coupon Code"
                      value={couponData.code}
                      onChange={handleInputChange("code")}
                      placeholder="e.g., SAVE20"
                      required
                      sx={{ textTransform: "uppercase" }}
                    />
                    <Button
                      variant="outlined"
                      onClick={generateCouponCode}
                      sx={{ minWidth: "120px" }}
                    >
                      Generate
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Discount Type</InputLabel>
                    <Select
                      value={couponData.discountType}
                      label="Discount Type"
                      onChange={handleInputChange("discountType")}
                    >
                      <MenuItem value="percentage">Percentage (%)</MenuItem>
                      <MenuItem value="fixed">Fixed Amount (₦)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={`Discount Value ${
                      couponData.discountType === "percentage" ? "(%)" : "(₦)"
                    }`}
                    type="number"
                    value={couponData.discountValue}
                    onChange={handleInputChange("discountValue")}
                    placeholder={
                      couponData.discountType === "percentage" ? "20" : "5000"
                    }
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Minimum Order Amount (₦)"
                    type="number"
                    value={couponData.minOrderAmount}
                    onChange={handleInputChange("minOrderAmount")}
                    placeholder="10000"
                  />
                </Grid>

                {couponData.discountType === "percentage" && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Maximum Discount Amount (₦)"
                      type="number"
                      value={couponData.maxDiscountAmount}
                      onChange={handleInputChange("maxDiscountAmount")}
                      placeholder="50000"
                    />
                  </Grid>
                )}

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Usage Limit"
                    type="number"
                    value={couponData.usageLimit}
                    onChange={handleInputChange("usageLimit")}
                    placeholder="100"
                    helperText="Leave empty for unlimited usage"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    type="date"
                    value={couponData.expiryDate}
                    onChange={handleInputChange("expiryDate")}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={couponData.description}
                    onChange={handleInputChange("description")}
                    placeholder="Describe when and how this coupon can be used..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={couponData.isActive}
                        onChange={handleSwitchChange("isActive")}
                        color="primary"
                      />
                    }
                    label="Active (Users can use this coupon)"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<FaPlus />}
                      sx={{ minWidth: "150px" }}
                    >
                      Create Coupon
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default AddCoupon;
