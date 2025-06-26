import { useState } from "react";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";
import {
	TextField,
	Button,
	Grid,
	Typography,
	Box,
	Snackbar,
	Alert,
} from "@mui/material";

const AddSubscription = () => {
	const breadcrumbLinks = [
		{ to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.addFAQ, label: "Subscription" },
	];
	const [subscriptionName, setSubscriptionName] = useState("");
	const [subscriptionPrice, setSubscriptionPrice] = useState("");
	const [monthInFigure, setMonthInFigure] = useState("");
	const [features, setFeatures] = useState([""]);
	const [successMessage, setSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleFeatureChange = (index, value) => {
		const newFeatures = [...features];
		newFeatures[index] = value;
		setFeatures(newFeatures);
	};

	const addFeatureField = () => {
		setFeatures([...features, ""]);
	};

	const removeFeatureField = (index) => {
		const newFeatures = features.filter((_, i) => i !== index);
		setFeatures(newFeatures);
	};

	const validateForm = () => {
		if (!subscriptionName.trim()) {
			setErrorMessage("Subscription Name is required.");
			return false;
		}
		if (!subscriptionPrice.trim() || isNaN(subscriptionPrice)) {
			setErrorMessage("Valid Subscription Price is required.");
			return false;
		}
		if (!monthInFigure.trim() || isNaN(monthInFigure)) {
			setErrorMessage("Valid Month in Figure is required.");
			return false;
		}
		if (features.some((feature) => !feature.trim())) {
			setErrorMessage("All features must be filled.");
			return false;
		}
		setErrorMessage("");
		return true;
	};

	const handleSubmit = () => {
		if (!validateForm()) return;

		const subscriptionData = {
			subscriptionName,
			subscriptionPrice,
			monthInFigure,
			features: features.filter((feature) => feature.trim() !== ""),
		};

		console.log("Subscription Data:", subscriptionData);
		setSuccessMessage(true);
		// You can now send `subscriptionData` to your backend API
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Add Subscription"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container">
				<Typography variant="h6" className="title">
					Add New Subscription
				</Typography>
				<Grid container spacing={2} className="form-grid">
					<Grid item xs={12} sm={6}>
						<TextField
							label="Subscription Name"
							fullWidth
							value={subscriptionName}
							onChange={(e) => setSubscriptionName(e.target.value)}
							className="form-input"
							error={!subscriptionName.trim() && !!errorMessage}
							helperText={
								!subscriptionName.trim() && !!errorMessage ? errorMessage : ""
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Subscription Price ($)"
							fullWidth
							type="number"
							value={subscriptionPrice}
							onChange={(e) => setSubscriptionPrice(e.target.value)}
							className="form-input"
							error={
								(!subscriptionPrice.trim() || isNaN(subscriptionPrice)) &&
								!!errorMessage
							}
							helperText={
								(!subscriptionPrice.trim() || isNaN(subscriptionPrice)) &&
								!!errorMessage
									? errorMessage
									: ""
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Month in Figure"
							fullWidth
							type="number"
							value={monthInFigure}
							onChange={(e) => setMonthInFigure(e.target.value)}
							className="form-input"
							error={
								(!monthInFigure.trim() || isNaN(monthInFigure)) &&
								!!errorMessage
							}
							helperText={
								(!monthInFigure.trim() || isNaN(monthInFigure)) &&
								!!errorMessage
									? errorMessage
									: ""
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6" className="features-title">
							Features
						</Typography>
						{features.map((feature, index) => (
							<Box key={index} className="feature-input-group">
								<TextField
									label={`Feature ${index + 1}`}
									fullWidth
									value={feature}
									onChange={(e) => handleFeatureChange(index, e.target.value)}
									className="form-input"
									error={!feature.trim() && !!errorMessage}
									helperText={
										!feature.trim() && !!errorMessage
											? "Feature cannot be empty."
											: ""
									}
								/>
								<Button
									variant="outlined"
									color="error"
									onClick={() => removeFeatureField(index)}
									className="remove-feature-button"
								>
									Remove
								</Button>
							</Box>
						))}
						<Button
							variant="contained"
							color="primary"
							onClick={addFeatureField}
							className="add-feature-button"
						>
							Add Feature
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="success"
							onClick={handleSubmit}
							className="submit-button"
						>
							Save Subscription
						</Button>
					</Grid>

					{/* Success Snackbar */}
					<Snackbar
						open={successMessage}
						autoHideDuration={3000}
						onClose={() => setSuccessMessage(false)}
						anchorOrigin={{ vertical: "top", horizontal: "center" }}
					>
						<Alert
							onClose={() => setSuccessMessage(false)}
							severity="success"
							sx={{ width: "100%" }}
						>
							Subscription successfully added!
						</Alert>
					</Snackbar>
				</Grid>
			</div>
		</div>
	);
};

export default AddSubscription;
