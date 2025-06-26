import Footer from "../../../components/school-management/Footer";
import SchoolHeader from "../../../components/school-management/SchoolHeader";
import routes from "../../../routes";
import { useNavigate } from "react-router-dom";

const EduBackground = () => {
	const navigate = useNavigate();
	const handleSubmit = () => {
		navigate(routes.studentEdulevel);
	};
	return (
		<>
			<main className="main-school-container">
				<SchoolHeader />
				<div className="application">
					<div className="apply-form">
						<h2>Application Form</h2>
						<h4>Educational Backgorund and Parent Details</h4>
						<form onSubmit={handleSubmit}>
							<div className="apply-row">
								<div className="apply-col">
									<select>
										<option value="" disabled selected>
											Education Level
										</option>
										<option value="primary-level">Primary Level</option>
										<option value="secondary-level">Secondary Level</option>
									</select>
								</div>
							</div>
							<div className="apply-row">
								<div className="apply-col">
									<select>
										<option value="" disabled selected>
											Class
										</option>
										<option value="primary-one">Primary One</option>
										<option value="primary-two">Primary Two</option>
										<option value="primary-three">Primary Three</option>
										<option value="primary-four">Primary Four</option>
										<option value="primary-five">Primary Five</option>
										<option value="primary-six">Primary Six</option>
									</select>
								</div>
							</div>
							<div className="apply-row">
								<div className="apply-col">
									<input type="text" placeholder="Parent Full Name" />
								</div>
								<div className="apply-col">
									<input type="text" placeholder="Parent Phone Number" />
								</div>
							</div>
							<div className="apply-row">
								<textarea
									name="address"
									placeholder="Parent Residential Address"
								></textarea>
							</div>

							<input type="submit" value={"Update"} className="apply-submit" />
						</form>
					</div>
				</div>
				<Footer />
			</main>
		</>
	);
};

export default EduBackground;
