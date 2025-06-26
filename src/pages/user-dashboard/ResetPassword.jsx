import { useState } from "react";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";
import {
	Typography,
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

const ResetPassword = () => {
	const [open, setOpen] = useState(false);

	const breadcrumbLinks = [
		{ to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.userResetPassword, label: "Reset Password" },
	];

	const handleSubmit = (event) => {
		event.preventDefault();
		setOpen(true); // Open the modal when the form is submitted
	};

	const handleClose = () => {
		setOpen(false); // Close the modal
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Reset Password"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container">
				<Typography variant="h6">Change your Password</Typography>
				<form className="myAccountPage-form" onSubmit={handleSubmit}>
					<TextField
						label="Old Password"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						className="input-field"
					/>
					<TextField
						label="New Password"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						className="input-field"
					/>
					<TextField
						label="Confirm Password"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						className="input-field"
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className="myAccountPage-saveButton"
					>
						Reset Password
					</Button>
				</form>

				{/* Modal */}
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="reset-password-modal-title"
					aria-describedby="reset-password-modal-description"
					className="reset-password-modal"
				>
					<DialogTitle
						id="reset-password-modal-title"
						className="reset-password-modal-title"
					>
						Password Reset
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="reset-password-modal-description">
							Your password has been successfully reset!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
};

export default ResetPassword;
