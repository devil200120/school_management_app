
import { Box, Typography, Link, } from "@mui/material";

const Congrats = () => {
  return (
		<div className="right-content w-100">
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				className="main-container congrats"
			>
				<Typography variant="h4" gutterBottom>
					🎉 Congratulations! 🎉
				</Typography>
				<Typography variant="body1" paragraph>
					Your school management system has been successfully installed.
				</Typography>
				<Typography variant="body1" paragraph className="text-danger">
					Please note that it may take 12 to 24 hours for your website to become
					fully functional.
				</Typography>
				<Typography variant="body2" color="textSecondary" paragraph>
					Below are the URLs for your website and admin portal:
				</Typography>

				<Box className="d-flex align-items-center gap-2 justify-content-center flex-column">
					<div className="d-flex align-items-center gap-2 justify-content-center">
						<h6>Main Website:</h6>
						<Link
							href="https://www.schoolwebsite.com"
							target="_blank"
							rel="noopener noreferrer"
							underline="hover"
						>
							https://www.schoolwebsite.com
						</Link>
					</div>
					<div className="d-flex align-items-center gap-2 justify-content-center">
						<h6>Admin Portal:</h6>
						<Link
							href="https://admin.schoolwebsite.com"
							target="_blank"
							rel="noopener noreferrer"
							underline="hover"
						>
							https://admin.schoolwebsite.com
						</Link>
					</div>
				</Box>

				<div className="admin-credentials shadow">
					<h4>Admin login credentials:</h4>
					<p>
						<strong>Username:</strong> admin
					</p>
					<p>
						<strong>Password:</strong> password123
					</p>
				</div>

				<Typography variant="caption" className="text-danger fw-bold">
					Please change your password after logging in for the first time.
				</Typography>
			</Box>
		</div>
	);
};

export default Congrats;
