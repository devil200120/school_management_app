import "../css/Authform.css";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import routes from "../routes";

const ForgetPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"https://api.eduos.com.ng/api/password-reset/request",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				}
			);

			const data = await response.json();
            console.log("data:", data);
            

			if (!response.ok) {
				throw new Error(
					data.errors.email || "Failed to send password reset request"
				);
			}

			// Store the email and response in localStorage
			localStorage.setItem("passwordResetEmail", email);
			localStorage.setItem("passwordResetRequest", JSON.stringify(data));

			// Redirect to another page (e.g., confirmation page)
			navigate(routes.passwordresetconfirmation);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="Auth-form">
			<form onSubmit={handleSubmit}>
				<center>
					<img src="/EDUOSlogo.png" alt="Logo" />
				</center>

				<div className="title">Reset Password</div>

				{error && <p className="error-message">{error}</p>}

				<div className="input-boxes">
					<div className="input-box">
						<FaEnvelope />
						<input
							type="email"
							placeholder="Enter your email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="form-button input-box">
						<input
							type="submit"
							value={loading ? "Processing..." : "Reset password"}
							disabled={loading}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ForgetPassword;
