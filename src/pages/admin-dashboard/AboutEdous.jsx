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

const AboutEdous = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [mission, setMission] = useState(
		"Our mission is to empower learners worldwide through accessible and innovative education."
	);
	const [vision, setVision] = useState(
		"Our vision is to create a world where everyone has the opportunity to achieve their full potential through education."
	);
	const [tempMission, setTempMission] = useState(mission);
	const [tempVision, setTempVision] = useState(vision);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const breadcrumbLinks = [
		{ to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.aboutEdit, label: "Edit EDUOS" },
	];

	const handleEditToggle = () => {
		if (isEditing) {
			setMission(tempMission);
			setVision(tempVision);
			setSnackbarMessage("Changes saved successfully!");
			setSnackbarOpen(true);
		}
		setIsEditing(!isEditing);
	};

	const handleCancel = () => {
		setTempMission(mission);
		setTempVision(vision);
		setIsEditing(false);
		setSnackbarMessage("Changes canceled.");
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard title="About Edous" breadcrumbLinks={breadcrumbLinks} />
			<div className="main-container">
				<div className="about-edous-container">
					<CardContent>
						{!isEditing ? (
							<>
								<Typography variant="h6" className="about-edous-section">
									Mission
								</Typography>
								<Typography className="about-edous-text">{mission}</Typography>
								<Typography variant="h6" className="about-edous-section">
									Vision
								</Typography>
								<Typography className="about-edous-text">{vision}</Typography>
							</>
						) : (
							<>
								<Typography variant="h6" className="about-edous-section">
									Edit Mission
								</Typography>
								<TextField
									fullWidth
									multiline
									className="about-edous-input"
									value={tempMission}
									onChange={(e) => setTempMission(e.target.value)}
								/>
								<Typography variant="h6" className="about-edous-section">
									Edit Vision
								</Typography>
								<TextField
									fullWidth
									multiline
									className="about-edous-input"
									value={tempVision}
									onChange={(e) => setTempVision(e.target.value)}
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

export default AboutEdous;
