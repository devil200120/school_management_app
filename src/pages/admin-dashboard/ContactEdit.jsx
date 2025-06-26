import { useState } from "react";
import {
	CardContent,
	CardActions,
	Typography,
	Button,
	TextField,
	Snackbar,
	Alert,
} from "@mui/material";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";

const ContactPage = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [phone, setPhone] = useState("+1 234 567 8900");
	const [email, setEmail] = useState("info@eduos.com");
	const [address, setAddress] = useState("1234 Elm Street, Springfield, USA");
	const [tempPhone, setTempPhone] = useState(phone);
	const [tempEmail, setTempEmail] = useState(email);
	const [tempAddress, setTempAddress] = useState(address);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const breadcrumbLinks = [
		{ to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.contactEdit, label: "Edit Contact" },
	];

	const handleEditToggle = () => {
		if (isEditing) {
			setPhone(tempPhone);
			setEmail(tempEmail);
			setAddress(tempAddress);
			setSnackbarMessage("Changes saved successfully!");
			setSnackbarOpen(true);
		}
		setIsEditing(!isEditing);
	};

	const handleCancel = () => {
		setTempPhone(phone);
		setTempEmail(email);
		setTempAddress(address);
		setIsEditing(false);
		setSnackbarMessage("Changes canceled.");
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard title="Contact" breadcrumbLinks={breadcrumbLinks} />
			<div className="main-container">
				<div className="about-edous-container">
					<CardContent>
						{!isEditing ? (
							<>
								<Typography variant="h6" className="about-edous-section">
									Phone
								</Typography>
								<Typography className="contact-text about-edous-text">
									{phone}
								</Typography>
								<Typography variant="h6" className="about-edous-section">
									Email
								</Typography>
								<Typography className="contact-text about-edous-text">
									{email}
								</Typography>
								<Typography variant="h6" className="about-edous-section">
									Address
								</Typography>
								<Typography className="contact-text about-edous-text">
									{address}
								</Typography>
							</>
						) : (
							<>
								<Typography variant="h6" className="about-edous-section">
									Edit Phone
								</Typography>
								<TextField
									fullWidth
									className="about-edous-input"
									value={tempPhone}
									onChange={(e) => setTempPhone(e.target.value)}
								/>
								<Typography variant="h6" className="contact-section">
									Edit Email
								</Typography>
								<TextField
									fullWidth
									className="about-edous-input"
									value={tempEmail}
									onChange={(e) => setTempEmail(e.target.value)}
								/>
								<Typography variant="h6" className="contact-section">
									Edit Address
								</Typography>
								<TextField
									fullWidth
									multiline
									className="about-edous-input"
									value={tempAddress}
									onChange={(e) => setTempAddress(e.target.value)}
								/>
							</>
						)}
					</CardContent>
					<CardActions className="about-edous-actions">
						{isEditing ? (
							<>
								<Button onClick={handleCancel} variant="outlined" color="error">
									Cancel
								</Button>
								<Button
									onClick={handleEditToggle}
									variant="contained"
									color="primary"
									className="about-edous-save-button"
								>
									Save
								</Button>
							</>
						) : (
							<Button
								onClick={handleEditToggle}
								variant="contained"
								color="primary"
								className="about-edous-edit-button"
							>
								Edit
							</Button>
						)}
					</CardActions>
				</div>
			</div>

			{/* Snackbar for success/cancel feedback */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity="success"
					sx={{ width: "100%" }}
					className="success-alert"
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default ContactPage;
