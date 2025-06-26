import { Link } from "react-router-dom";
import routes from "../../routes";
const PortalLogin = () => {
	return (
		<div className="portal-container">
			<div className="portal-card">
				<Link to={routes.schoolManagement} className="logo" >
					<img src="/uibadan.jpeg" alt="Logo" width={"30%"} />
				</Link>
				<h2 className="portal-title">Sign in to your account</h2>
				<form>
					<label className="portal-label">Admission Number:</label>
					<input
						type="text"
						placeholder="Enter your admission number"
						className="portal-input"
					/>

					<label className="portal-label">Password:</label>
					<input
						type="password"
						placeholder="Enter your password"
						className="portal-input"
					/>

					<div className="portal-options">
						<label>
							<input type="checkbox" className="portal-checkbox" />
							Remember Me
						</label>
						<a href="#" className="portal-forgot">
							Forgot Password?
						</a>
					</div>

					<button type="submit" className="portal-button">
						Sign Me In
					</button>
				</form>
			</div>
		</div>
	);
};

export default PortalLogin;
