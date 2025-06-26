import SchoolHeader from "../../components/school-management/SchoolHeader";
import Footer from "../../components/school-management/Footer";
// import { Link } from "react-router-dom";
import routes from "../../routes";
import PageHeader from "../../components/school-management/PageHeader";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
const SchoolContact = () => {
	return (
		<>
			<main className="main-school-container">
				<SchoolHeader />
				<PageHeader
					title="Contact"
					bgImage="/page-banner-6.jpg"
					links={[
						{ path: routes.schoolManagement, label: "Home" },
						{ path: routes.schoolContact, label: "Contact" },
					]}
				/>
				<div className="contact-container">
					<div className="sch-contact-form">
						<h2>Contact Us</h2>
						<form>
							<input type="text" placeholder="Your Name" required />
							<input type="email" placeholder="Your Email" required />
							<input type="text" placeholder="Subject" required />
							<input type="tel" placeholder="Phone Number" required />
							<textarea placeholder="Your Message" required></textarea>
							<button type="submit">Send Message</button>
						</form>
					</div>

					<div className="sch-contact-info">
						<h2>Our Contact Information</h2>
						<p>
							<FaMapMarkerAlt /> Address: 123 Street, Ibadan, Nigeria
						</p>
						<p>
							<FaPhone /> Phone: +234 812 345 6789
						</p>
						<p>
							<FaEnvelope /> Email: info@eduos.com
						</p>
					</div>
				</div>
				<Footer />
			</main>
		</>
	);
};

export default SchoolContact;
