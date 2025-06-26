/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Authform.css";
import routes from "../routes";

const ResetOtp = () => {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [timeLeft, setTimeLeft] = useState(300); // Countdown timer
	const [resendDisabled, setResendDisabled] = useState(true);
	const otpInputs = useRef([]);
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Retrieve email from localStorage
	useEffect(() => {
		const storedEmail = localStorage.getItem("passwordResetEmail");
		if (storedEmail) {
			setEmail(storedEmail);
		} else {
			navigate(routes.forgetPassword);
		}
	}, [navigate]);

	// Countdown timer for OTP resend
	useEffect(() => {
		if (timeLeft > 0) {
			const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
			return () => clearInterval(timer);
		} else {
			setResendDisabled(false);
		}
	}, [timeLeft]);

	// Handle OTP input
	const handleChange = (index, e) => {
		const value = e.target.value.replace(/\D/g, ""); // Allow only digits

		if (!value) return; // Ignore empty values
		if (value.length > 1) return; // Ensure only one character per input

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Move to next input if it's not the last field
		if (index < otp.length - 1) {
			otpInputs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			otpInputs.current[index - 1].focus();
		}
	};

	// Prevent non-numeric characters on paste
	const handlePaste = (e) => {
		e.preventDefault();
		const pasteData = e.clipboardData
			.getData("text")
			.replace(/\D/g, "")
			.slice(0, 6); // Get only numbers and max 6 digits
		if (pasteData.length !== 6) return;

		setOtp(pasteData.split(""));

		// Focus on the last field
		otpInputs.current[5].focus();
	};

	// Resend OTP
	const handleResend = async () => {
		setOtp(["", "", "", "", "", ""]);
		setTimeLeft(300);
		setResendDisabled(true);
		setError("");

		try {
			const response = await fetch(
				"https://api.eduos.com.ng/api/resend-verification-code",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email }),
				}
			);
			const data = await response.json();
			if (!response.ok) {
				if (data.message) {
					setError(data.message);
				} else {
					setError("Failed to resend OTP.");
				}
			}
		} catch {
			setError("Network error. Try again.");
		}
	};

	// Verify OTP
	const handleVerify = async () => {
		const enteredOtp = otp.join("").trim(); // Join array into string and remove spaces

		console.log("Entered OTP:", enteredOtp);
		console.log("Email:", email);

		if (enteredOtp.length !== 6) {
			// Ensure exactly 6 digits
			setError("Please enter a valid 6-digit OTP.");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const response = await fetch(
				"https://api.eduos.com.ng/api/password-reset/verify",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, otp: enteredOtp }), // Ensure correct field name
				}
			);

			const data = await response.json();
			console.log("API Response:", data); // Log response to debug

			if (!response.ok) {
				if (data.errors && data.errors.verification_code) {
					setError(data.errors.verification_code[0]); // Display API error
				} else if (data.message) {
					setError(data.message);
				} else {
					setError("Invalid OTP. Please try again.");
				}
			} else {
				localStorage.setItem("authtoken", data.reset_token);
				// Clear stored OTP email (optional)
				localStorage.removeItem("passwordResetEmail");
				// Clear OTP email from localStorage
				localStorage.removeItem("email");
				navigate(routes.resetPassword);
			}
		} catch (error) {
			setError("Verification failed. Try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="Auth-form">
			<form className="signup-form">
				<center>
					<img src="/EDUOSlogo.png" alt="EDUOS Logo" />
				</center>

				<div className="title">Verify Account</div>
				<p className="otp-text">Enter the OTP sent to your email: {email}</p>

				{error && <p className="error-message">{error}</p>}

				<div className="otp-container">
					{otp.map((digit, index) => (
						<input
							key={index}
							type="text"
							className="otp-input"
							maxLength="1"
							value={digit}
							onChange={(e) => handleChange(index, e)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							onPaste={handlePaste}
							ref={(el) => (otpInputs.current[index] = el)}
							inputMode="numeric"
						/>
					))}
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						gap: "1rem",
					}}
				>
					<div className="countdown">
						{timeLeft > 0 ? (
							<span>
								Resend in {Math.floor(timeLeft / 60)}:
								{(timeLeft % 60).toString().padStart(2, "0")}
							</span>
						) : (
							<button
								className="resend-btn"
								onClick={handleResend}
								disabled={resendDisabled}
							>
								Resend OTP
							</button>
						)}
					</div>

					<div className="verify-button">
						<button
							type="button"
							onClick={handleVerify}
							className="verify-btn"
							disabled={loading}
						>
							{loading ? "Verifying..." : "Verify"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ResetOtp;
