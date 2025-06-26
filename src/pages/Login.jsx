/* eslint-disable no-unused-vars */
import "../css/Authform.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import routes from "../routes";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(""); // Clear previous errors
		setLoading(true); // Start loading

		try {
			const response = await fetch("https://api.eduos.com.ng/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (data.status === "success") {
				localStorage.setItem("authtoken", data.token);
				localStorage.setItem("role", data.user.role);

				// Redirect based on role
				if (data.user.role === "admin") {
					navigate(routes.adminDashboard);
				} else if (data.user.role === "user") {
					navigate(routes.userDashboard);
				} else {
					navigate(routes.home);
				}
			} else {
				setError(data.message || "Login failed");
			}
		} catch (error) {
			setError("Network error. Please try again.");
		} finally {
			setLoading(false); // Stop loading
		}
	};

	return (
		<div className="Auth-form">
			<form onSubmit={handleSubmit}>
				<center>
					<img src="/EDUOSlogo.png" alt="Logo" />
				</center>

				<div className="title">Login</div>

				{error && <div className="error-message">{error}</div>}

				<div className="input-boxes">
					<div className="input-box">
						<FaEnvelope />
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="input-box">
						<FaLock />
						<input
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="text">
						<a href={routes.forgetPassword}>Forgot password?</a>
					</div>

					<div className="form-button input-box">
						<input
							type="submit"
							value={loading ? "Logging in..." : "Log in"}
							disabled={loading}
						/>
					</div>

					<div className="text sign-up-text">
						Don&apos;t have an account?{" "}
						<Link to="/register" htmlFor="flip">
							Signup now
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
