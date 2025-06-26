import { useState } from "react";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";
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
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ManageTestimonials = () => {
	const [testimonials, setTestimonials] = useState([
		{
			id: 1,
			fullName: "John Doe",
			organisation: "ABC School",
			userRate: 5,
			userComment: "Great experience!",
			personImage: "/01.jpg",
		},
		{
			id: 2,
			fullName: "Jane Smith",
			organisation: "XYZ Company",
			userRate: 4,
			userComment: "Good service!",
			personImage: "/02.jpg",
		},
	]);
	const [selectedTestimonial, setSelectedTestimonial] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [testimonialToDelete, setTestimonialToDelete] = useState(null);

	const breadcrumbLinks = [
		{ to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.manageTestimony, label: "Manage Testimonials" },
	];

	// Delete Testimonial
	const handleDelete = () => {
		setTestimonials(
			testimonials.filter(
				(testimonial) => testimonial.id !== testimonialToDelete
			)
		);
		setIsAlertOpen(false);
		setTestimonialToDelete(null);
	};

	// Open Alert Dialog
	const handleDeleteClick = (id) => {
		setTestimonialToDelete(id);
		setIsAlertOpen(true);
	};

	// Open Modal for Editing
	const handleEdit = (testimonial) => {
		setSelectedTestimonial(testimonial);
		setIsModalOpen(true);
	};

	// Handle Save Changes
	const handleSave = () => {
		setTestimonials(
			testimonials.map((testimonial) =>
				testimonial.id === selectedTestimonial.id
					? { ...testimonial, ...selectedTestimonial }
					: testimonial
			)
		);
		setIsModalOpen(false);
	};

	// Handle Image Upload
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setSelectedTestimonial({
					...selectedTestimonial,
					personImage: reader.result,
				});
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Manage Testimonials"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container">
				<Typography variant="h5" className="page-header">
					Manage Testimonials
				</Typography>
				<TableContainer className="table-container">
					<Table style={{ minWidth: "700px" }}>
						<TableHead className="table-head">
							<TableRow>
								<TableCell>S/N</TableCell>
								<TableCell>Full Name</TableCell>
								<TableCell>Organisation</TableCell>
								<TableCell>User Rate</TableCell>
								<TableCell>User Comment</TableCell>
								<TableCell>Person Image</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{testimonials.map((testimonial, index) => (
								<TableRow key={testimonial.id}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{testimonial.fullName}</TableCell>
									<TableCell>{testimonial.organisation}</TableCell>
									<TableCell>{testimonial.userRate}</TableCell>
									<TableCell>{testimonial.userComment}</TableCell>
									<TableCell>
										<img
											src={testimonial.personImage}
											alt={testimonial.fullName}
											style={{
												width: "50px",
												height: "50px",
												borderRadius: "10%",
											}}
										/>
									</TableCell>
									<TableCell className="actions">
										<div style={{ display: "flex", gap: "10px" }}>
											<Button
												color="success"
												onClick={() => handleEdit(testimonial)}
												className="edit-icon success"
											>
												<FiEdit />
											</Button>
											<Button
												color="error"
												className="delete-icon error"
												onClick={() => handleDeleteClick(testimonial.id)}
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
					aria-labelledby="edit-testimonial-modal"
					className="admin-modal"
				>
					<Box
						className="modal-box"
						sx={{
							maxHeight: "90vh",
							overflowY: "auto",
						}}
					>
						<Typography
							variant="h6"
							id="edit-testimonial-modal"
							className="modal-header"
						>
							Edit Testimonial
						</Typography>
						<TextField
							label="Full Name"
							variant="outlined"
							fullWidth
							value={selectedTestimonial?.fullName || ""}
							onChange={(e) =>
								setSelectedTestimonial({
									...selectedTestimonial,
									fullName: e.target.value,
								})
							}
							className="modal-input"
						/>
						<TextField
							label="Organisation"
							variant="outlined"
							fullWidth
							value={selectedTestimonial?.organisation || ""}
							onChange={(e) =>
								setSelectedTestimonial({
									...selectedTestimonial,
									organisation: e.target.value,
								})
							}
							className="modal-input"
						/>
						<TextField
							label="User Rate"
							variant="outlined"
							fullWidth
							type="number"
							value={selectedTestimonial?.userRate || ""}
							onChange={(e) =>
								setSelectedTestimonial({
									...selectedTestimonial,
									userRate: parseInt(e.target.value),
								})
							}
							className="modal-input"
						/>
						<TextField
							label="User Comment"
							variant="outlined"
							fullWidth
							value={selectedTestimonial?.userComment || ""}
							onChange={(e) =>
								setSelectedTestimonial({
									...selectedTestimonial,
									userComment: e.target.value,
								})
							}
							className="modal-input"
						/>
						<div>
							<Typography variant="body1">Person Image</Typography>
							<img
								src={selectedTestimonial?.personImage || ""}
								alt="Preview"
								style={{
									width: "100px",
									height: "100px",
									borderRadius: "10%",
									margin: "10px 0",
								}}
							/>
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className="modal-input"
							/>
						</div>
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
							Are you sure you want to delete this testimonial? This action
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
	);
};

export default ManageTestimonials;
