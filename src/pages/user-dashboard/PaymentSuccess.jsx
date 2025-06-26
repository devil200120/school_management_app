import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Button, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";

const PaymentSuccess = () => {
	return (
		<div className="right-content w-100">
			<div className="main-container payment-success d-flex align-items-center justify-content-center flex-column shadow">
				<ConfettiPage />
			</div>
		</div>
	);
};

export default PaymentSuccess;

const ConfettiPage = () => {
	const [installing, setInstalling] = useState(false); // State to handle installation animation
	const [progress, setProgress] = useState(0); // State for LinearProgress
	const navigate = useNavigate(); // Navigation hook for page redirection

	useEffect(() => {
		if (!installing) {
			const end = Date.now() + 5 * 1000; // 5 seconds for confetti

			const randomInRange = (min, max) => Math.random() * (max - min) + min;

			const frame = () => {
				confetti({
					angle: randomInRange(55, 125),
					spread: randomInRange(50, 70),
					particleCount: randomInRange(20, 30),
					origin: { y: 1, x: 0.5 }, // Start from the bottom center
					scalar: 0.75,
				});

				if (Date.now() < end) {
					setTimeout(() => requestAnimationFrame(frame), 200);
				}
			};

			frame();
		}
	}, [installing]); // Confetti runs only when `installing` is false

	useEffect(() => {
		if (installing) {
			const interval = setInterval(() => {
				setProgress((prevProgress) => {
					if (prevProgress >= 100) {
						clearInterval(interval);
						navigate(routes.Congrats); // Redirect after progress completes
						return 100;
					}
					return prevProgress + 1; // Increment progress by 1%
				});
			}, 100); // Update progress every 100ms (10 seconds total)
		}
	}, [installing, navigate]);

	const handleInstall = () => {
		setInstalling(true); // Show the installation animation
	};

	return (
		<>
			{!installing ? (
				<>
					<Typography variant="h4" sx={{ marginBottom: "1rem" }}>
						Payment Successful
					</Typography>
					<Button variant="contained" color="primary" onClick={handleInstall}>
						Install Now
					</Button>
				</>
			) : (
				<>
					<Typography variant="h6" sx={{ marginBottom: "1rem" }}>
						Installing... Please wait
					</Typography>
					<LinearProgress
						variant="determinate"
						value={progress}
						className="linear-progress"
					/>
					<Typography variant="body2">{Math.round(progress)}%</Typography>
				</>
			)}
		</>
	);
};
