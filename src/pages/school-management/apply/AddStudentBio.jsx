import Footer from "../../../components/school-management/Footer";
import SchoolHeader from "../../../components/school-management/SchoolHeader";
import routes from "../../../routes";
import { useNavigate } from "react-router-dom";
const AddStudentBio = () => {
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
						<h4>Admission Application</h4>
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
									<select>
										<option value="" disabled selected>
											Select Gender
										</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</select>
								</div>
								<div className="apply-col">
									<input type="date" placeholder="Enter Date of Birth" />
								</div>
								<div className="apply-col">
									<input type="text" placeholder="Place of Birth" />
								</div>
							</div>
							<div className="apply-row">
								<textarea
									name="address"
									placeholder="Residential Address"
								></textarea>
							</div>
							<div className="apply-row">
								<div className="apply-col">
									<label htmlFor="file-upload" className="file-label">
										Upload Your Picture
									</label>
									<input type="file" id="file-upload" className="file-input" />
								</div>
							</div>

							<input
								type="submit"
								value={"Update Bio"}
								className="apply-submit"
							/>
						</form>
					</div>
				</div>
                <Footer/>
			</main>
		</>
	);
};

export default AddStudentBio;
