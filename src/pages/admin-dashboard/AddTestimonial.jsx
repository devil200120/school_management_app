import { useState } from "react";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";
import {
	TextField,
	Button,
	Grid,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";

const AddTestimonial = () => {
	const breadcrumbLinks = [
		{ to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.addTestimony, label: "Testimonial" },
	];

	const [fullName, setFullName] = useState("");
	const [organisation, setOrganisation] = useState("");
	const [userRate, setUserRate] = useState("");
	const [userComment, setUserComment] = useState("");
	const [personImage, setPersonImage] = useState(null);
	const [personImagePreview, setPersonImagePreview] = useState(null);
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState(false);

	const validateForm = () => {
		const validationErrors = {};

		if (!fullName.trim()) validationErrors.fullName = "Full Name is required.";
		if (!organisation.trim())
			validationErrors.organisation = "Organisation/School Name is required.";
		if (
			!userRate.trim() ||
			isNaN(Number(userRate)) ||
			+userRate < 1 ||
			+userRate > 5
		)
			validationErrors.userRate = "Valid User Rate (1-5) is required.";
		if (!userComment.trim())
			validationErrors.userComment = "User Comment is required.";
		if (!personImage)
			validationErrors.personImage = "Person Image is required.";

		setErrors(validationErrors);
		return Object.keys(validationErrors).length === 0; // Return true if no errors
	};

	const handleSubmit = () => {
		if (!validateForm()) return;

		const testimonialData = {
			fullName,
			organisation,
			userRate,
			userComment,
			personImage,
		};

		console.log("Testimonial Data:", testimonialData);
		setSuccessMessage(true);
		setErrors({});
		// Send `testimonialData` to your backend API
	};

	const handleImageChange = (e) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			setPersonImage(file);
			setPersonImagePreview(URL.createObjectURL(file));
		}
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Add Testimonial"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container">
				<Typography variant="h6" className="title">
					Add New Testimonial
				</Typography>
				<Grid container spacing={2} className="form-grid">
					<Grid item xs={12} sm={6}>
						<TextField
							label="Full Name"
							className="form-input"
							fullWidth
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							error={!!errors.fullName}
							helperText={errors.fullName}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Organisation/School Name"
							fullWidth
							className="form-input"
							value={organisation}
							onChange={(e) => setOrganisation(e.target.value)}
							error={!!errors.organisation}
							helperText={errors.organisation}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="User Rate (1-5)"
							fullWidth
							type="number"
							className="form-input"
							value={userRate}
							onChange={(e) => setUserRate(e.target.value)}
							error={!!errors.userRate}
							helperText={errors.userRate}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="User Comment"
							fullWidth
							multiline
							className="form-input"
							rows={4}
							value={userComment}
							onChange={(e) => setUserComment(e.target.value)}
							error={!!errors.userComment}
							helperText={errors.userComment}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							component="label"
							className="upload-button"
							sx={{
								backgroundColor: "black",
							}}
						>
							Upload Person Image
							<input
								type="file"
								hidden
								accept="image/*"
								onChange={handleImageChange}
							/>
						</Button>
						{personImage ? (
							<div style={{ marginTop: "10px" }}>
								<img
									src={personImagePreview}
									alt="Preview"
									style={{
										maxWidth: "100%",
										maxHeight: "150px",
										borderRadius: "8px",
									}}
								/>
								<Typography variant="body2" style={{ marginTop: "5px" }}>
									{personImage.name}
								</Typography>
							</div>
						) : (
							!!errors.personImage && (
								<Typography
									variant="body2"
									color="error"
									style={{ marginTop: "10px", color: "red" }}
								>
									{errors.personImage}
								</Typography>
							)
						)}
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="success"
							onClick={handleSubmit}
							className="submit-button"
						>
							Save Testimonial
						</Button>
					</Grid>
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
						Testimonial successfully added!
					</Alert>
				</Snackbar>
			</div>
		</div>
	);
};

export default AddTestimonial;
