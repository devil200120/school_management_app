import SchoolHeader from "../../../components/school-management/SchoolHeader";
import routes from "../../../routes";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/school-management/Footer";

const ApplyForm = () => {
    const navigate = useNavigate()
    const handleSubmit = () => {
        navigate(routes.studentBio)
    }
	return (
		<>
			<main className="main-school-container">
				<SchoolHeader />
				<div className="application">
					<div className="apply-form">
						<h2>Apply Now</h2>
						<h4>Application Form</h4>
						<form onSubmit={handleSubmit}>
							<div className="apply-row">
								<div className="apply-col">
									<input type="text" placeholder="Your SurName" />
								</div>
								<div className="apply-col">
									<input type="text" placeholder="Your First name" />
								</div>
								<div className="apply-col">
									<input type="text" placeholder="Your Middle name" />
								</div>
							</div>
							<div className="apply-row">
								<div className="apply-col">
									<input type="email" placeholder="Email" />
								</div>
								<div className="apply-col">
									<input type="tel" placeholder="Phone Number" />
								</div>
							</div>
							<div className="apply-row">
								<div className="apply-col">
									<input type="password" placeholder="Enter Access Pin" />
								</div>
							</div>
							<input
								type="submit"
								value={"Apply Now"}
								className="apply-submit"
							/>
						</form>
						<hr />
						<div className="bottom">
							<p>
								Already Appled? <Link to={routes.schoolPortal}>Log in</Link>
							</p>
							<div className="help">Need Help? Call: 09000002202</div>
						</div>
					</div>
				</div>
				<Footer />
			</main>
		</>
	);
};

export default ApplyForm;
