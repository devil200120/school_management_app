import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaStar,
  FaTag,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import routes from "../../routes";
import BreadcrumbCard from "../../components/BreadcrumbCard";
const BuyProduct = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Product data (this would typically come from an API connected to admin system)
  const [products] = useState([
    {
      id: 1,
      name: "Premium School Management License",
      description:
        "Full access to school management system with unlimited students, advanced analytics, and premium support.",
      price: 299.99,
      originalPrice: 399.99,
      category: "Software License",
      image: "/sms.jpg",
      isActive: true,
      stock: 999,
      rating: 4.8,
      reviews: 245,
      features: [
        "Unlimited Students",
        "Advanced Analytics",
        "Premium Support",
        "Cloud Backup",
        "Mobile App",
      ],
      discount: 25,
    },
    {
      id: 2,
      name: "Student Assessment Package",
      description:
        "Advanced assessment tools and analytics for comprehensive student performance evaluation and reporting.",
      price: 149.99,
      originalPrice: 199.99,
      category: "Assessment Tools",
      image: "/sms.jpg",
      isActive: true,
      stock: 250,
      rating: 4.6,
      reviews: 128,
      features: [
        "Custom Assessments",
        "Auto Grading",
        "Performance Analytics",
        "Report Generation",
        "Parent Portal",
      ],
      discount: 25,
    },
    {
      id: 3,
      name: "Teacher Training Course",
      description:
        "Comprehensive online training program for effective use of EDUOS platform and modern teaching methods.",
      price: 99.99,
      originalPrice: 149.99,
      category: "Training",
      image: "/sms.jpg",
      isActive: true,
      stock: 100,
      rating: 4.9,
      reviews: 89,
      features: [
        "Video Tutorials",
        "Live Sessions",
        "Certification",
        "24/7 Support",
        "Course Materials",
      ],
      discount: 33,
    },
    {
      id: 4,
      name: "Library Management System",
      description:
        "Digital library management with book tracking, digital resources, and student reading analytics.",
      price: 199.99,
      originalPrice: 249.99,
      category: "Software License",
      image: "/sms.jpg",
      isActive: true,
      stock: 150,
      rating: 4.7,
      reviews: 67,
      features: [
        "Book Cataloging",
        "Digital Resources",
        "Reading Analytics",
        "Fine Management",
        "Mobile Access",
      ],
      discount: 20,
    },
    {
      id: 5,
      name: "Parent Communication Hub",
      description:
        "Enhanced communication platform connecting parents, teachers, and students with real-time updates.",
      price: 79.99,
      originalPrice: 99.99,
      category: "Communication Tools",
      image: "/sms.jpg",
      isActive: true,
      stock: 300,
      rating: 4.5,
      reviews: 156,
      features: [
        "Real-time Messaging",
        "Event Notifications",
        "Progress Reports",
        "Attendance Updates",
        "Photo Sharing",
      ],
      discount: 20,
    },
  ]);

  // Available promo codes
  const promoCodes = [
    { code: "SAVE20", discount: 20, type: "percentage" },
    { code: "FLAT50", discount: 50, type: "fixed" },
  ];

  const breadcrumbLinks = [
    { to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
    { to: routes.buyProduct, label: "Buy Product" },
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory && product.isActive;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setSnackbarMessage(`${product.name} added to cart!`);
    setSnackbarOpen(true);
  };

  const handleBuyNow = (product) => {
    // Navigate to checkout or payment page
    navigate(routes.orderSummary, { state: { product, promoCode } });
  };

  const applyPromoCode = () => {
    const validPromo = promoCodes.find(
      (promo) => promo.code === promoCode.toUpperCase()
    );
    if (validPromo) {
      setSnackbarMessage(
        `Promo code ${promoCode} applied! ${
          validPromo.type === "percentage"
            ? validPromo.discount + "%"
            : "$" + validPromo.discount
        } discount`
      );
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Invalid promo code");
      setSnackbarOpen(true);
    }
  };
  return (
    <div className="right-content w-100">
      <BreadcrumbCard
        title="Buy Our Products"
        breadcrumbLinks={breadcrumbLinks}
      />

      <div className="main-container">
        {/* Header Section with Search and Filters */}
        <Box sx={{ mb: 4, p: 3, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "#1976d2", fontWeight: "bold" }}
          >
            🛍️ EDUOS Product Store
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            Discover premium educational solutions to enhance your institution
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300 }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
                startAdornment={<FaFilter style={{ marginRight: 8 }} />}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaTag />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="outlined" onClick={applyPromoCode} size="small">
                Apply
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} lg={4} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  {product.discount && (
                    <Chip
                      label={`${product.discount}% OFF`}
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        fontWeight: "bold",
                      }}
                    />
                  )}
                </Box>

                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {product.name}
                  </Typography>

                  <Chip
                    label={product.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ alignSelf: "flex-start", mb: 1 }}
                  />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {product.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Rating
                      value={product.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({product.reviews} reviews)
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography
                      variant="h5"
                      color="primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      ${product.price}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{
                          ml: 1,
                          textDecoration: "line-through",
                          color: "text.secondary",
                        }}
                      >
                        ${product.originalPrice}
                      </Typography>
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    color="success.main"
                    sx={{ mb: 2 }}
                  >
                    ✅ {product.stock} in stock
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewProduct(product)}
                      sx={{ flex: 1 }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleBuyNow(product)}
                      startIcon={<FaShoppingCart />}
                      sx={{ flex: 1 }}
                    >
                      Buy Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No products found matching your criteria
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search terms or category filter
            </Typography>
          </Box>
        )}

        {/* Product Details Dialog */}
        <Dialog
          open={productDialogOpen}
          onClose={() => setProductDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedProduct && (
            <>
              <DialogTitle sx={{ pb: 0 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  {selectedProduct.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Rating
                    value={selectedProduct.rating}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                  </Typography>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                      {selectedProduct.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h4"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        ${selectedProduct.price}
                      </Typography>
                      {selectedProduct.originalPrice && (
                        <Typography
                          variant="h6"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                          }}
                        >
                          ${selectedProduct.originalPrice}
                        </Typography>
                      )}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom>
                      Features:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {selectedProduct.features?.map((feature, index) => (
                        <Typography
                          component="li"
                          key={index}
                          variant="body2"
                          sx={{ mb: 0.5 }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button onClick={() => setProductDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleBuyNow(selectedProduct);
                    setProductDialogOpen(false);
                  }}
                  startIcon={<FaShoppingCart />}
                >
                  Buy Now - ${selectedProduct.price}
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default BuyProduct;
