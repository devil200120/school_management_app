import { useState, useEffect } from "react";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";
import { Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const MyAccount = () => {
	const [userData, setUserData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		profile_picture: null,
		phone_number: "",
		address: "",
		gender: "",
	});
	const [profilePic, setProfilePic] = useState(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const fetchUserData = async () => {
			const token = localStorage.getItem("authtoken");
			if (!token) return;

			try {
				const response = await fetch("https://api.eduos.com.ng/api/user", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					const data = await response.json();
					setUserData({
						...data,
						phone_number: data.phone_number || "",
						address: data.address || "",
						gender: data.gender || "",
					});
					if (data.profile_picture) setProfilePic(data.profile_picture);
				} else {
					console.error("Failed to fetch user data");
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, []);

	const handleProfilePicChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setProfilePic(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSaveChanges = async () => {
		setLoading(true);
		setMessage("");

		const token = localStorage.getItem("authtoken");
		if (!token) {
			setMessage("Authentication error. Please log in again.");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch("https://api.eduos.com.ng/api/update-profile", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstname: userData.firstname,
					lastname: userData.lastname,
					phone_number: userData.phone_number,
					address: userData.address,
					gender: userData.gender,
				}),
			});

			const result = await response.json();

			if (response.ok) {
				setMessage("Profile updated successfully!");
			} else {
				setMessage(result.message || "Failed to update profile.");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
			setMessage("An error occurred while updating your profile.");
		} finally {
			setLoading(false);
		}
	};

	const breadcrumbLinks = [
		{ to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.userMyAccount, label: "My Account" },
	];

	const getInitials = () => {
		return (userData.firstname.charAt(0) + userData.lastname.charAt(0)).toUpperCase();
	};

	return (
		<div className="right-content w-100">
			<BreadcrumbCard title="My Account" breadcrumbLinks={breadcrumbLinks} />
			<div className="main-container">
				<Typography variant="h6">Account Details</Typography>
				{message && <Typography color="error">{message}</Typography>}
				<form className="myAccountPage-form">
					<div className="myAccountPage-profilePic">
						<label className="myAccountPage-profilePicLabel">
							{profilePic ? (
								<img src={profilePic} alt="Profile Preview" />
							) : (
								<Avatar className="Profile-avatar" sx={{ bgcolor: deepOrange[500] }}>
									{getInitials()}
								</Avatar>
							)}
							<input
								type="file"
								accept="image/*"
								className="myAccountPage-profilePicInput"
								onChange={handleProfilePicChange}
							/>
						</label>
						<Typography className="myAccountPage-profilePic-text">
							Click to upload a profile picture
						</Typography>
					</div>
					<TextField
						label="First Name"
						name="firstname"
						value={userData.firstname}
						variant="outlined"
						fullWidth
						margin="normal"
						className="input-field"
						onChange={handleInputChange}
					/>
					<TextField
						label="Last Name"
						name="lastname"
						value={userData.lastname}
						variant="outlined"
						fullWidth
						margin="normal"
						className="input-field"
						onChange={handleInputChange}
					/>
					<TextField
						label="Email Address"
						name="email"
						value={userData.email}
						variant="outlined"
						fullWidth
						margin="normal"
						className="input-field"
						disabled
					/>
					<TextField
						label="Phone Number"
						name="phone_number"
						value={userData.phone_number}
						variant="outlined"
						fullWidth
						margin="normal"
						className="input-field"
						onChange={handleInputChange}
					/>
					<TextField
						label="Address"
						name="address"
						value={userData.address}
						variant="outlined"
						fullWidth
						margin="normal"
						className="input-field"
						onChange={handleInputChange}
					/>
					<FormControl fullWidth margin="normal" className="input-field">
						<InputLabel>Gender</InputLabel>
						<Select
							name="gender"
							value={userData.gender}
							onChange={handleInputChange}
							variant="outlined"
						>
							<MenuItem value="">Select Gender</MenuItem>
							<MenuItem value="male">Male</MenuItem>
							<MenuItem value="female">Female</MenuItem>
							<MenuItem value="other">Other</MenuItem>
						</Select>
					</FormControl>
					<Button
						variant="contained"
						color="primary"
						className="myAccountPage-saveButton"
						onClick={handleSaveChanges}
						disabled={loading}
					>
						{loading ? "Saving..." : "Save Changes"}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default MyAccount;
