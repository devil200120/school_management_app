import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import routes from "../../routes";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import ProductGallery from "../../components/user-dashboard/ProductGallery";
import {
	Box,
	TextField,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Button,
	Typography,
	FormHelperText,
} from "@mui/material";
import { useState } from "react";

const ViewProduct = () => {
	const navigate = useNavigate();
	const breadcrumbLinks = [
		{ to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.buyProduct, label: "Buy Product" },
		{ to: routes.viewProduct, label: "View Product" },
	];

	const [subscription, setSubscription] = useState("");
	const [domain, setDomain] = useState("");
	const [schoolName, setSchoolName] = useState("");
	const [paymentMethod, setPaymentMethod] = useState(""); // New state for payment method
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validation logic
		const validationErrors = {};
		if (!subscription)
			validationErrors.subscription = "Subscription is required";
		if (!domain) validationErrors.domain = "Domain selection is required";
		if (!schoolName) validationErrors.schoolName = "School name is required";
		if (!paymentMethod)
			validationErrors.paymentMethod = "Payment method is required";

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			console.log({ subscription, domain, schoolName, paymentMethod });
			navigate(routes.orderSummary);
		}
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard title="View Product" breadcrumbLinks={breadcrumbLinks} />
			<div className="main-container">
				<div className="d-flex gap-3 view-product">
					<ProductGallery />
					<div className="full-product-review">
						<h1>Complete School Management System</h1>
						<p>
							<span>Product Code:</span> #003222
						</p>
						<p>
							<span>Brand:</span> EDUOS
						</p>
						<p>
							<span>Secure with:</span> SSL
						</p>
						<div className="note">
							Buy our multi-functional, self-installable, and effortlessly easy
							educational portal, specially crafted for schools committed to
							progress.
						</div>
					</div>
				</div>
				<Box
					sx={{
						mx: "auto",
						mt: 4,
						px: 2,
						py: 3,
						borderRadius: "8px",
					}}
					className="checkout-form"
				>
					<Typography variant="h5" gutterBottom>
						Product Checkout
					</Typography>
					<form onSubmit={handleSubmit}>
						{/* Subscription Field */}
						<FormControl
							fullWidth
							className="input-field"
							sx={{ mb: 3 }}
							error={!!errors.subscription}
						>
							<InputLabel id="subscription-label" className="input-label">
								Select Subscription
							</InputLabel>
							<Select
								labelId="subscription-label"
								value={subscription}
								className="select-field"
								onChange={(e) => setSubscription(e.target.value)}
								label="Select Subscription"
							>
								<MenuItem value="basic">Basic</MenuItem>
								<MenuItem value="premium">Premium</MenuItem>
								<MenuItem value="enterprise">Enterprise</MenuItem>
							</Select>
							{errors.subscription && (
								<FormHelperText>{errors.subscription}</FormHelperText>
							)}
						</FormControl>

						{/* Domain Field */}
						<FormControl
							fullWidth
							className="input-field"
							sx={{ mb: 3 }}
							error={!!errors.domain}
						>
							<InputLabel id="domain-label" className="input-label">
								Do you have an existing domain with us?
							</InputLabel>
							<Select
								labelId="domain-label"
								className="select-field"
								value={domain}
								onChange={(e) => setDomain(e.target.value)}
								label="Do you have an existing domain with us?"
							>
								<MenuItem value="yes">Yes</MenuItem>
								<MenuItem value="no">No</MenuItem>
							</Select>
							{errors.domain && (
								<FormHelperText>{errors.domain}</FormHelperText>
							)}
						</FormControl>

						{/* School Name Field */}
						<TextField
							fullWidth
							className="input-field"
							label="Enter school name as URL"
							variant="outlined"
							value={schoolName}
							onChange={(e) => setSchoolName(e.target.value)}
							error={!!errors.schoolName}
							helperText={errors.schoolName}
							sx={{ mb: 3 }}
						/>

						{/* Payment Method Field */}
						<FormControl
							fullWidth
							className="input-field"
							sx={{ mb: 3 }}
							error={!!errors.paymentMethod}
						>
							<InputLabel id="payment-method-label" className="input-label">
								Payment Method
							</InputLabel>
							<Select
								labelId="payment-method-label"
								className="select-field"
								value={paymentMethod}
								onChange={(e) => setPaymentMethod(e.target.value)}
								label="Payment Method"
							>
								<MenuItem value="paystack">Paystack</MenuItem>
								<MenuItem value="crypto">Crypto</MenuItem>
							</Select>
							{errors.paymentMethod && (
								<FormHelperText>{errors.paymentMethod}</FormHelperText>
							)}
						</FormControl>

						<Button
							type="submit"
							className="submit-button"
							variant="contained"
							fullWidth
						>
							Confirm Order
						</Button>
					</form>
				</Box>
			</div>
		</div>
	);
};

export default ViewProduct;
