import { useState } from "react";
import { TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";

const AddFAQ = () => {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [successMessage, setSuccessMessage] = useState(false);

	const breadcrumbLinks = [
		{ to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.addFAQ, label: "FAQ" },
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		// Clear inputs and show success message
		setQuestion("");
		setAnswer("");
		setSuccessMessage(true);
	};
	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Add Frequently Asked Question"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container">
				<div className="faq-form-container">
					<Typography variant="h6">Add FAQ</Typography>
					<form className="myAccountPage-form faq-form" onSubmit={handleSubmit}>
						<TextField
							label="Question"
							variant="outlined"
							fullWidth
							required
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							className="input-field"
						/>
						<TextField
							label="Answer"
							variant="outlined"
							fullWidth
							required
							multiline
							rows={4}
							value={answer}
							onChange={(e) => setAnswer(e.target.value)}
							className="input-field"
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="myAccountPage-saveButton"
						>
							Add FAQ
						</Button>
					</form>

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
							className="success-alert"
						>
							FAQ successfully added!
						</Alert>
					</Snackbar>
				</div>
			</div>
		</div>
	);
};

export default AddFAQ;
