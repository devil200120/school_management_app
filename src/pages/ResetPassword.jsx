/* eslint-disable no-unused-vars */
import "../css/Authform.css";
import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import routes from "../routes";

const ResetOTPPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [resetToken, setResetToken] = useState("");
	const navigate = useNavigate();

	// Retrieve reset token from localStorage
	useEffect(() => {
		const token = localStorage.getItem("authtoken");
		if (token) {
			setResetToken(token);
		} else {
			navigate(routes.forgetPassword); // Redirect if no token
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!password || !confirmPassword) {
			setError("Please fill in all fields.");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setLoading(true);

		try {
			const response = await fetch(
				"https://api.eduos.com.ng/api/password-reset",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${resetToken}`, // Send as Bearer Token
					},
					body: JSON.stringify({
						password,
						password_confirmation: confirmPassword,
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				setError(data.message || "Failed to reset password.");
			} else {
				alert("Password reset successful!");
				localStorage.removeItem("authtoken"); // Clear token after reset
				navigate(routes.login);
			}
		} catch (error) {
			setError("Network error. Try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="Auth-form">
			<form className="signup-form" onSubmit={handleSubmit}>
				<center>
					<img src="/EDUOSlogo.png" alt="EDUOS Logo" />
				</center>

				<div className="title">Reset Password</div>

				{error && <p className="error-message">{error}</p>}

				<div className="input-boxes">
					<div className="input-box">
						<FaLock />
						<input
							type="password"
							name="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="input-box">
						<FaLock />
						<input
							type="password"
							name="password_confirmation"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<div className="form-button input-box">
						<input
							type="submit"
							value={loading ? "Changing..." : "Change Password"}
							disabled={loading}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ResetOTPPassword;
