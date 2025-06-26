import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Modal,
	Box,
	Typography,
	TextField,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";

const ManageSubscriptions = () => {
	const [subscriptions, setSubscriptions] = useState([
		{
			id: 1,
			name: "Basic Plan",
			price: 9.99,
			duration: 1, // in months
			features: ["Feature 1", "Feature 2"],
		},
		{
			id: 2,
			name: "Pro Plan",
			price: 19.99,
			duration: 6,
			features: ["Feature A", "Feature B", "Feature C"],
		},
		{
			id: 3,
			name: "Premium Plan",
			price: 29.99,
			duration: 12,
			features: ["Feature X", "Feature Y", "Feature Z"],
		},
	]);
	const [selectedSubscription, setSelectedSubscription] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [subToDelete, setSubToDelete] = useState(null);

	const breadcrumbLinks = [
		{ to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.manageSubscription, label: "Manage Subscription" },
	];

	// Delete Testimonial
	const handleDelete = () => {
		setSubscriptions(subscriptions.filter((sub) => sub.id !== subToDelete));
		setIsAlertOpen(false);
		setSubToDelete(null);
	};

	// Open Alert Dialog
	const handleDeleteClick = (id) => {
		setSubToDelete(id);
		setIsAlertOpen(true);
	};

	// Open Edit Modal
	const handleEdit = (subscription) => {
		setSelectedSubscription(subscription);
		setIsModalOpen(true);
	};

	// Handle Save Changes
	const handleSave = () => {
		setSubscriptions(
			subscriptions.map((sub) =>
				sub.id === selectedSubscription.id
					? { ...sub, ...selectedSubscription }
					: sub
			)
		);
		setIsModalOpen(false);
	};

	// Add Feature
	const handleAddFeature = () => {
		setSelectedSubscription({
			...selectedSubscription,
			features: [...(selectedSubscription?.features || []), ""],
		});
	};

	// Update Feature
	const handleFeatureChange = (index, value) => {
		const updatedFeatures = [...selectedSubscription.features];
		updatedFeatures[index] = value;
		setSelectedSubscription({
			...selectedSubscription,
			features: updatedFeatures,
		});
	};

	// Remove Feature
	const handleRemoveFeature = (index) => {
		const updatedFeatures = [...selectedSubscription.features];
		updatedFeatures.splice(index, 1);
		setSelectedSubscription({
			...selectedSubscription,
			features: updatedFeatures,
		});
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Manage Subscriptions"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container">
				<div className="manage-subscriptions-container">
					<Typography variant="h5" className="page-header">
						Manage Subscriptions
					</Typography>
					<TableContainer className="table-container">
						<Table style={{ minWidth: "700px" }}>
							<TableHead className="table-head">
								<TableRow>
									<TableCell>S/N</TableCell>
									<TableCell>Subscription Name</TableCell>
									<TableCell>Price ($)</TableCell>
									<TableCell>Duration (Months)</TableCell>
									<TableCell>Features</TableCell>
									<TableCell>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{subscriptions.map((subscription, index) => (
									<TableRow key={subscription.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{subscription.name}</TableCell>
										<TableCell>{subscription.price.toFixed(2)}</TableCell>
										<TableCell>{subscription.duration}</TableCell>
										<TableCell>
											<ul style={{ paddingLeft: "0px" }}>
												{subscription.features.map((feature, idx) => (
													<li key={idx}>{feature}</li>
												))}
											</ul>
										</TableCell>
										<TableCell className="actions">
											<div style={{ display: "flex" }}>
												<Button
													color="success"
													className="edit-icon success"
													onClick={() => handleEdit(subscription)}
												>
													<FiEdit />
												</Button>
												<Button
													color="error"
													className="delete-icon error"
													onClick={() => handleDeleteClick(subscription.id)}
												>
													<MdDelete />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					{/* Edit Modal */}
					<Modal
						open={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						aria-labelledby="edit-subscription-modal"
						className="admin-modal"
						// style={{ overflow: "scroll" }}
					>
						<Box
							className="modal-box"
							sx={{
								maxHeight: "90vh", // Limits the modal height
								overflowY: "auto", // Adds vertical scrolling when content overflows
							}}
						>
							<Typography
								variant="h6"
								id="edit-subscription-modal"
								className="modal-header"
							>
								Edit Subscription
							</Typography>
							<TextField
								label="Subscription Name"
								variant="outlined"
								fullWidth
								value={selectedSubscription?.name || ""}
								onChange={(e) =>
									setSelectedSubscription({
										...selectedSubscription,
										name: e.target.value,
									})
								}
								className="modal-input"
							/>
							<TextField
								label="Price ($)"
								variant="outlined"
								fullWidth
								type="number"
								value={selectedSubscription?.price || ""}
								onChange={(e) =>
									setSelectedSubscription({
										...selectedSubscription,
										price: parseFloat(e.target.value),
									})
								}
								className="modal-input"
							/>
							<TextField
								label="Duration (Months)"
								variant="outlined"
								fullWidth
								type="number"
								value={selectedSubscription?.duration || ""}
								onChange={(e) =>
									setSelectedSubscription({
										...selectedSubscription,
										duration: parseInt(e.target.value),
									})
								}
								className="modal-input"
							/>

							{/* Features */}
							<Typography variant="subtitle1" style={{ marginTop: "20px" }}>
								Features
							</Typography>
							{selectedSubscription?.features?.map((feature, index) => (
								<div
									key={index}
									style={{
										display: "flex",
										gap: "10px",
										alignItems: "center",
										marginBottom: "10px",
									}}
								>
									<TextField
										label={`Feature ${index + 1}`}
										variant="outlined"
										className="modal-input"
										fullWidth
										value={feature}
										onChange={(e) => handleFeatureChange(index, e.target.value)}
									/>
									<IconButton
										color="error"
										onClick={() => handleRemoveFeature(index)}
									>
										<MdDelete />
									</IconButton>
								</div>
							))}
							<Button
								variant="contained"
								color="primary"
								onClick={handleAddFeature}
								startIcon={<FaPlus />}
								style={{ marginTop: "10px" }}
							>
								Add Feature
							</Button>

							<div className="modal-actions">
								<Button
									variant="contained"
									color="primary"
									onClick={handleSave}
									style={{ marginTop: "20px" }}
								>
									Save
								</Button>
								<Button
									variant="outlined"
									onClick={() => setIsModalOpen(false)}
									style={{ marginTop: "20px" }}
								>
									Cancel
								</Button>
							</div>
						</Box>
					</Modal>

					{/* Delete Confirmation Dialog */}
					<Dialog
						open={isAlertOpen}
						onClose={() => setIsAlertOpen(false)}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						className="DeleteDialog"
					>
						<DialogTitle id="alert-dialog-title">
							{"Confirm Deletion"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Are you sure you want to delete this Subscription? This action
								cannot be undone.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setIsAlertOpen(false)} color="primary">
								Cancel
							</Button>
							<Button onClick={handleDelete} color="error" autoFocus>
								Delete
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		</div>
	);
};

export default ManageSubscriptions;
