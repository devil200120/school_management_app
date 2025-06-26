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

const AddBlog = () => {
	const breadcrumbLinks = [
		{ to: routes.adminDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.addBlog, label: "Add Blog" },
	];

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [coverImage, setCoverImage] = useState(null);
	const [coverImagePreview, setCoverImagePreview] = useState(null);
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState(false);

	const validateForm = () => {
		const validationErrors = {};

		if (!title.trim()) validationErrors.title = "Blog title is required.";
		if (!content.trim()) validationErrors.content = "Blog content is required.";
		if (!coverImage) validationErrors.coverImage = "Cover image is required.";

		setErrors(validationErrors);
		return Object.keys(validationErrors).length === 0;
	};

	const handleSubmit = () => {
		if (!validateForm()) return;

		const blogData = {
			title,
			content,
			coverImage,
		};

		console.log("Blog Data:", blogData);
		setSuccessMessage(true);
		setErrors({});
		// Send `blogData` to your backend API
	};

	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setCoverImage(file);
			setCoverImagePreview(URL.createObjectURL(file));
		}
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard title="Add Blog" breadcrumbLinks={breadcrumbLinks} />
			<div className="main-container">
				<Typography variant="h6" className="title">
					Add New Blog
				</Typography>
				<Grid container spacing={2} className="form-grid">
					<Grid item xs={12}>
						<TextField
							label="Blog Title"
							fullWidth
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							error={!!errors.title}
							helperText={errors.title}
							className="form-input"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Blog Content"
							fullWidth
							multiline
							rows={6}
							value={content}
							onChange={(e) => setContent(e.target.value)}
							error={!!errors.content}
							helperText={errors.content}
							className="form-input"
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							component="label"
							className="upload-button"
							sx={{ backgroundColor: "black" }}
						>
							Upload Cover Image
							<input
								type="file"
								hidden
								accept="image/*"
								onChange={handleImageChange}
							/>
						</Button>
						{coverImagePreview && (
							<div style={{ marginTop: "10px" }}>
								<img
									src={coverImagePreview}
									alt="Cover Preview"
									style={{
										maxWidth: "100%",
										maxHeight: "200px",
										borderRadius: "8px",
									}}
								/>
								<Typography variant="body2" style={{ marginTop: "5px" }}>
									{coverImage?.name}
								</Typography>
							</div>
						)}
						{!!errors.coverImage && (
							<Typography
								variant="body2"
								color="error"
								style={{ marginTop: "10px", color: "red" }}
							>
								{errors.coverImage}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="success"
							onClick={handleSubmit}
							className="submit-button"
						>
							Publish Blog
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
						Blog successfully published!
					</Alert>
				</Snackbar>
			</div>
		</div>
	);
};

export default AddBlog;
