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

const ManageBlog = () => {
	const [blogs, setBlogs] = useState([
		{
			id: 1,
			title: "The Future of AI",
			content:
				"Artificial intelligence is transforming industries  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere blanditiis ut iste dicta placeat voluptatem cum, in impedit quas possimus fugiat, sed obcaecati sequi dolorum numquam quod reiciendis adipisci molestias.",
			image: "/01.jpg", // Initial placeholder
		},
		{
			id: 2,
			title: "React vs Vue: Which One to Choose?",
			content: "React and Vue are both powerful frontend frameworks...",
			image: "/02.jpg", // Initial placeholder
		},
	]);

	const [selectedBlog, setSelectedBlog] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [blogToDelete, setBlogToDelete] = useState(null);

	const breadcrumbLinks = [
		{ to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.manageBlog, label: "Manage Blogs" },
	];

	// Delete Blog
	const handleDelete = () => {
		setBlogs(blogs.filter((blog) => blog.id !== blogToDelete));
		setIsAlertOpen(false);
		setBlogToDelete(null);
	};

	// Open Alert Dialog
	const handleDeleteClick = (id) => {
		setBlogToDelete(id);
		setIsAlertOpen(true);
	};

	// Open Edit Modal
	const handleEdit = (blog) => {
		setSelectedBlog(blog);
		setIsModalOpen(true);
	};

	// Handle Save Changes
	const handleSave = () => {
		setBlogs(
			blogs.map((blog) =>
				blog.id === selectedBlog.id ? { ...blog, ...selectedBlog } : blog
			)
		);
		setIsModalOpen(false);
	};

	// Handle Image Upload
	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedBlog({ ...selectedBlog, image: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard title="Manage Blogs" breadcrumbLinks={breadcrumbLinks} />
			<div className="main-container">
				<Typography variant="h5" className="page-header">
					Manage Blogs
				</Typography>
				<TableContainer className="table-container">
					<Table>
						<TableHead className="table-head">
							<TableRow>
								<TableCell>S/N</TableCell>
								<TableCell>Cover</TableCell>
								<TableCell>Title</TableCell>
								<TableCell>Content</TableCell>
								<TableCell>Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{blogs.map((blog, index) => (
								<TableRow key={blog.id}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>
										<img
											src={blog.image}
											alt="Cover"
											style={{
												width: "60px",
												height: "40px",
												borderRadius: "5px",
											}}
										/>
									</TableCell>
									<TableCell>{blog.title}</TableCell>
									<TableCell>
										{blog.content.length > 50
											? `${blog.content.substring(0, 50)}...`
											: blog.content}
									</TableCell>
									<TableCell className="actions">
										<div style={{ display: "flex" }}>
											<Button
												color="success"
												onClick={() => handleEdit(blog)}
												className="edit-icon success"
											>
												<FiEdit />
											</Button>
											<Button
												color="error"
												className="delete-icon error"
												onClick={() => handleDeleteClick(blog.id)}
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
					aria-labelledby="edit-blog-modal"
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
							id="edit-blog-modal"
							className="modal-header"
						>
							Edit Blog
						</Typography>
						<TextField
							label="Title"
							variant="outlined"
							fullWidth
							value={selectedBlog?.title || ""}
							onChange={(e) =>
								setSelectedBlog({ ...selectedBlog, title: e.target.value })
							}
							className="modal-input"
						/>

						<TextField
							label="Content"
							variant="outlined"
							fullWidth
							multiline
							rows={4}
							value={selectedBlog?.content || ""}
							onChange={(e) =>
								setSelectedBlog({ ...selectedBlog, content: e.target.value })
							}
							className="modal-input"
						/>

						<div>
							<Typography variant="body1">Cover Image</Typography>
							{selectedBlog?.image && (
								<img
									src={selectedBlog.image}
									alt="Selected"
									style={{
										width: "100%",
										maxHeight: "200px",
										objectFit: "cover",
										margin: "10px 0",
									}}
								/>
							)}
							<input
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								className="modal-input"
							/>
						</div>

						<div className="modal-actions">
							<Button variant="contained" color="primary" onClick={handleSave}>
								Save
							</Button>
							<Button variant="outlined" onClick={() => setIsModalOpen(false)}>
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
							Are you sure you want to delete this blog? This action cannot be
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
	);
};

export default ManageBlog;
