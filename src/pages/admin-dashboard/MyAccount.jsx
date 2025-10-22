import { useState } from "react";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome, FaTag, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const MyAdminAccount = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // Promo Code States
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [promoFormData, setPromoFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    expiryDate: "",
    maxUses: "",
    isActive: true,
  });
  const [promoCodes, setPromoCodes] = useState([
    {
      id: 1,
      code: "SAVE20",
      description: "20% off on all products",
      discountType: "percentage",
      discountValue: 20,
      expiryDate: "2025-12-31",
      maxUses: 100,
      currentUses: 25,
      isActive: true,
      createdAt: "2025-10-01",
    },
    {
      id: 2,
      code: "FLAT50",
      description: "$50 off on orders above $200",
      discountType: "fixed",
      discountValue: 50,
      expiryDate: "2025-11-30",
      maxUses: 50,
      currentUses: 12,
      isActive: true,
      createdAt: "2025-10-15",
    },
  ]);

  // Product States
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    isActive: true,
    stock: "",
  });
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium School Management License",
      description:
        "Full access to school management system with unlimited students",
      price: 299.99,
      category: "Software License",
      image: "/public/eduos2.png",
      isActive: true,
      stock: 999,
      sales: 45,
    },
    {
      id: 2,
      name: "Student Assessment Package",
      description:
        "Advanced assessment tools and analytics for student performance",
      price: 149.99,
      category: "Assessment Tools",
      image: "/public/eduos2.png",
      isActive: true,
      stock: 250,
      sales: 28,
    },
    {
      id: 3,
      name: "Teacher Training Course",
      description:
        "Comprehensive online training for effective use of EDUOS platform",
      price: 99.99,
      category: "Training",
      image: "/public/eduos2.png",
      isActive: true,
      stock: 100,
      sales: 18,
    },
  ]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Promo Code Handlers
  const handlePromoSubmit = () => {
    if (editingPromo) {
      setPromoCodes(
        promoCodes.map((promo) =>
          promo.id === editingPromo.id
            ? {
                ...promoFormData,
                id: editingPromo.id,
                createdAt: editingPromo.createdAt,
              }
            : promo
        )
      );
    } else {
      const newPromo = {
        ...promoFormData,
        id: Date.now(),
        currentUses: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPromoCodes([...promoCodes, newPromo]);
    }
    setPromoDialogOpen(false);
    resetPromoForm();
  };

  const resetPromoForm = () => {
    setPromoFormData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      expiryDate: "",
      maxUses: "",
      isActive: true,
    });
    setEditingPromo(null);
  };

  const handleEditPromo = (promo) => {
    setEditingPromo(promo);
    setPromoFormData(promo);
    setPromoDialogOpen(true);
  };

  const handleDeletePromo = (id) => {
    setPromoCodes(promoCodes.filter((promo) => promo.id !== id));
  };

  const togglePromoStatus = (id) => {
    setPromoCodes(
      promoCodes.map((promo) =>
        promo.id === id ? { ...promo, isActive: !promo.isActive } : promo
      )
    );
  };

  // Product Handlers
  const handleProductSubmit = () => {
    if (editingProduct) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? {
                ...productFormData,
                id: editingProduct.id,
                sales: editingProduct.sales,
              }
            : product
        )
      );
    } else {
      const newProduct = {
        ...productFormData,
        id: Date.now(),
        sales: 0,
        price: parseFloat(productFormData.price),
        stock: parseInt(productFormData.stock),
      };
      setProducts([...products, newProduct]);
    }
    setProductDialogOpen(false);
    resetProductForm();
  };

  const resetProductForm = () => {
    setProductFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      isActive: true,
      stock: "",
    });
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductFormData(product);
    setProductDialogOpen(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const toggleProductStatus = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, isActive: !product.isActive }
          : product
      )
    );
  };

  const breadcrumbLinks = [
    { to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
    { to: routes.adminResetPassword, label: "My Account" },
  ];

  return (
    <div className="right-content w-100">
      <BreadcrumbCard title="My Account" breadcrumbLinks={breadcrumbLinks} />
      <div className="main-container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Account Details" />
              <Tab label="Promo Code Management" />
              <Tab label="Product Management" />
            </Tabs>
          </Box>

          {/* Account Details Tab */}
          {tabValue === 0 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <form className="myAccountPage-form">
                <div className="myAccountPage-profilePic">
                  <label className="myAccountPage-profilePicLabel">
                    {profilePic ? (
                      <img src={profilePic} alt="Profile Preview" />
                    ) : (
                      <Avatar
                        className="Profile-avatar"
                        sx={{ bgcolor: deepOrange[500] }}
                      >
                        GA
                      </Avatar>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="myAccountPage-profilePicInput"
                      onChange={handleProfilePicChange}
                    />
                  </label>
                  <Typography className="myAccountPage-profilePic-text">
                    Click to upload a profile picture
                  </Typography>
                </div>
                <TextField
                  label="First Name"
                  defaultValue="Giwa"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className="input-field"
                />
                <TextField
                  label="Last Name"
                  defaultValue="abdulbasit"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className="input-field"
                />
                <TextField
                  label="Email Address"
                  defaultValue="giwa3@example.com"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className="input-field"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="myAccountPage-saveButton"
                >
                  Save Changes
                </Button>
              </form>
            </Box>
          )}

          {/* Promo Code Management Tab */}
          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6">Promo Code Management</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaPlus />}
                  onClick={() => setPromoDialogOpen(true)}
                >
                  Add New Promo Code
                </Button>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Usage</TableCell>
                      <TableCell>Expiry</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {promoCodes.map((promo) => (
                      <TableRow key={promo.id}>
                        <TableCell>
                          <Chip
                            label={promo.code}
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{promo.description}</TableCell>
                        <TableCell>
                          {promo.discountType === "percentage"
                            ? `${promo.discountValue}%`
                            : `$${promo.discountValue}`}
                        </TableCell>
                        <TableCell>
                          {promo.currentUses}/{promo.maxUses}
                        </TableCell>
                        <TableCell>{promo.expiryDate}</TableCell>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={promo.isActive}
                                onChange={() => togglePromoStatus(promo.id)}
                                color="primary"
                              />
                            }
                            label={promo.isActive ? "Active" : "Inactive"}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            startIcon={<FaEdit />}
                            onClick={() => handleEditPromo(promo)}
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            startIcon={<FaTrash />}
                            onClick={() => handleDeletePromo(promo.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Product Management Tab */}
          {tabValue === 2 && (
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6">Product Management</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaPlus />}
                  onClick={() => setProductDialogOpen(true)}
                >
                  Add New Product
                </Button>
              </Box>

              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item xs={12} md={6} lg={4} key={product.id}>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 2,
                          }}
                        >
                          <Typography variant="h6" component="div">
                            {product.name}
                          </Typography>
                          <Chip
                            label={product.isActive ? "Active" : "Inactive"}
                            color={product.isActive ? "success" : "default"}
                            size="small"
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {product.description}
                        </Typography>
                        <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                          ${product.price}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Category: {product.category}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          Stock: {product.stock} | Sales: {product.sales}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<FaEdit />}
                            onClick={() => handleEditProduct(product)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="success"
                            onClick={() => toggleProductStatus(product.id)}
                          >
                            {product.isActive ? "Deactivate" : "Activate"}
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<FaTrash />}
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>

        {/* Promo Code Dialog */}
        <Dialog
          open={promoDialogOpen}
          onClose={() => setPromoDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingPromo ? "Edit Promo Code" : "Add New Promo Code"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Promo Code"
              fullWidth
              variant="outlined"
              value={promoFormData.code}
              onChange={(e) =>
                setPromoFormData({
                  ...promoFormData,
                  code: e.target.value.toUpperCase(),
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              value={promoFormData.description}
              onChange={(e) =>
                setPromoFormData({
                  ...promoFormData,
                  description: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Discount Type</InputLabel>
                <Select
                  value={promoFormData.discountType}
                  label="Discount Type"
                  onChange={(e) =>
                    setPromoFormData({
                      ...promoFormData,
                      discountType: e.target.value,
                    })
                  }
                >
                  <MenuItem value="percentage">Percentage (%)</MenuItem>
                  <MenuItem value="fixed">Fixed Amount ($)</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label={
                  promoFormData.discountType === "percentage"
                    ? "Percentage"
                    : "Amount ($)"
                }
                type="number"
                fullWidth
                variant="outlined"
                value={promoFormData.discountValue}
                onChange={(e) =>
                  setPromoFormData({
                    ...promoFormData,
                    discountValue: e.target.value,
                  })
                }
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="Expiry Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={promoFormData.expiryDate}
                onChange={(e) =>
                  setPromoFormData({
                    ...promoFormData,
                    expiryDate: e.target.value,
                  })
                }
              />
              <TextField
                label="Maximum Uses"
                type="number"
                fullWidth
                variant="outlined"
                value={promoFormData.maxUses}
                onChange={(e) =>
                  setPromoFormData({
                    ...promoFormData,
                    maxUses: e.target.value,
                  })
                }
              />
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={promoFormData.isActive}
                  onChange={(e) =>
                    setPromoFormData({
                      ...promoFormData,
                      isActive: e.target.checked,
                    })
                  }
                />
              }
              label="Active"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPromoDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePromoSubmit} variant="contained">
              {editingPromo ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Product Dialog */}
        <Dialog
          open={productDialogOpen}
          onClose={() => setProductDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Product Name"
              fullWidth
              variant="outlined"
              value={productFormData.name}
              onChange={(e) =>
                setProductFormData({ ...productFormData, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={productFormData.description}
              onChange={(e) =>
                setProductFormData({
                  ...productFormData,
                  description: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="Price ($)"
                type="number"
                fullWidth
                variant="outlined"
                value={productFormData.price}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    price: e.target.value,
                  })
                }
              />
              <TextField
                label="Stock Quantity"
                type="number"
                fullWidth
                variant="outlined"
                value={productFormData.stock}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    stock: e.target.value,
                  })
                }
              />
            </Box>
            <TextField
              margin="dense"
              label="Category"
              fullWidth
              variant="outlined"
              value={productFormData.category}
              onChange={(e) =>
                setProductFormData({
                  ...productFormData,
                  category: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Image URL"
              fullWidth
              variant="outlined"
              value={productFormData.image}
              onChange={(e) =>
                setProductFormData({
                  ...productFormData,
                  image: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={productFormData.isActive}
                  onChange={(e) =>
                    setProductFormData({
                      ...productFormData,
                      isActive: e.target.checked,
                    })
                  }
                />
              }
              label="Active"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setProductDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleProductSubmit} variant="contained">
              {editingProduct ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default MyAdminAccount;
