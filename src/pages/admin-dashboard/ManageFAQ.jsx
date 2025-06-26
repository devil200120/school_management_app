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
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";

const ManageFAQs = () => {
	const [faqs, setFaqs] = useState([
		{
			id: 1,
			question: "What is EDUOS?",
			answer:
				"EDUOS is a modern and complete school management system with a website component that digitalizes all your school operations.",
		},
		{
			id: 2,
			question: "What operations can EDUOS handle?",
			answer:
				"EDUOS can manage student admissions, assessment tools, online classes, online exams, result processing, and checking, among other school operations.",
		},
		{
			id: 3,
			question: "Can EDUOS integrate with existing systems?",
			answer:
				"Yes, EDUOS is designed to integrate with other systems, ensuring smooth data flow and interoperability.",
		},
		{
			id: 4,
			question: "Is there technical support available for EDUOS?",
			answer:
				"Yes, EDUOS offers dedicated technical support to ensure that schools can maximize the system's benefits.",
		},
	]);
	const [selectedFAQ, setSelectedFAQ] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [FAQToDelete, setFAQToDelete] = useState(null);

	const breadcrumbLinks = [
		{ to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.manageFAQ, label: "Manage FAQ" },
	];

	// Delete FAQ
	const handleDelete = () => {
		setFAQToDelete(faqs.filter((faq) => faq.id !== FAQToDelete));
		setIsAlertOpen(false);
		setFAQToDelete(null);
	};

	// Open Alert Dialog
	const handleDeleteClick = (id) => {
		setFAQToDelete(id);
		setIsAlertOpen(true);
	};

	// Open Edit Modal
	const handleEdit = (faq) => {
		setSelectedFAQ(faq);
		setIsModalOpen(true);
	};

	// Handle Save Changes
	const handleSave = () => {
		setFaqs(
			faqs.map((faq) =>
				faq.id === selectedFAQ.id ? { ...faq, ...selectedFAQ } : faq
			)
		);
		setIsModalOpen(false);
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Manage Frequently Asked Question"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container">
				<div className="manage-faqs-container">
					<Typography variant="h5" className="page-header">
						Manage FAQs
					</Typography>
					<TableContainer className="table-container">
						<Table style={{ minWidth: "500px" }}>
							<TableHead className="table-head">
								<TableRow>
									<TableCell>S/N</TableCell>
									<TableCell>Question</TableCell>
									<TableCell>Answer</TableCell>
									<TableCell>Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{faqs.map((faq, index) => (
									<TableRow key={faq.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{faq.question}</TableCell>
										<TableCell>{faq.answer}</TableCell>
										<TableCell className="actions">
											<div style={{ display: "flex" }}>
												<Button
													color="success"
													onClick={() => handleEdit(faq)}
													className="edit-icon success"
												>
													<FiEdit />
												</Button>
												<Button
													color="error"
													className="delete-icon error"
													onClick={() => handleDeleteClick(faq.id)}
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
						aria-labelledby="edit-faq-modal"
						className="admin-modal"
					>
						<Box className="modal-box">
							<Typography
								variant="h6"
								id="edit-faq-modal"
								className="modal-header"
							>
								Edit FAQ
							</Typography>
							<TextField
								label="Question"
								variant="outlined"
								fullWidth
								value={selectedFAQ?.question || ""}
								onChange={(e) =>
									setSelectedFAQ({ ...selectedFAQ, question: e.target.value })
								}
								className="modal-input"
							/>
							<TextField
								label="Answer"
								variant="outlined"
								fullWidth
								multiline
								rows={4}
								value={selectedFAQ?.answer || ""}
								onChange={(e) =>
									setSelectedFAQ({ ...selectedFAQ, answer: e.target.value })
								}
								className="modal-input"
							/>
							<div className="modal-actions">
								<Button
									variant="contained"
									color="primary"
									onClick={handleSave}
								>
									Save
								</Button>
								<Button
									variant="outlined"
									onClick={() => setIsModalOpen(false)}
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
								Are you sure you want to delete this FAQ? This action cannot be
								undone.
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

export default ManageFAQs;
