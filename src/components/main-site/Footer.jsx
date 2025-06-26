import { Link } from "react-router-dom";
import { CiMail, CiPhone, CiHome } from "react-icons/ci";
import {
	SlSocialFacebook,
	SlSocialLinkedin,
	SlSocialTwitter,
	SlSocialInstagram,
} from "react-icons/sl";
import "../../css/footer.css";
import routes from "../../routes";

const Footer = () => {
	return (
		<footer>
			<div className="upper">
				<div className="footer-item">
					<img src="/EDUOSlogo.png" alt="koach-logo" />
					<p>
						A Modern and Complete School School Management System with Website
						Component that digitalises all your school operations. This system
						can handle: student admission, Assessment Tool, Online Class, Online
						Exams, Result Processing and Checking and much more.
					</p>
				</div>
				<div className="footer-item">
					<h2>Useful Links</h2>
					<Link to={routes.home}>Home</Link>
					<Link to={routes.about}>About</Link>
					<Link to={routes.contact}>Contact</Link>
					<Link to={routes.register}>Get Started</Link>
				</div>
				<div className="footer-item">
					<h2>Our Services</h2>
					<Link to="#">Software Architecture and Design</Link>
					<Link to="#">Software Development </Link>
					<Link to="#">Project Management</Link>
					<Link to="#"> ICT Support and Consulting Services</Link>
					<Link to="#">Feasibility Studies</Link>
				</div>
				<div className="footer-item">
					<h2>Contact us</h2>
					<Link
						to="#"
						style={{ display: "flex", alignItems: "center", gap: "5px" }}
					>
						<CiMail />{" "}
						<span style={{ textDecoration: "underline" }}>
							support@eduos.com.ng
						</span>
					</Link>
					<Link
						to="#"
						style={{ display: "flex", alignItems: "center", gap: "5px" }}
					>
						<CiPhone />
						<span> +2348160327173</span>
					</Link>
					<Link
						to="#"
						style={{ display: "flex", alignItems: "flex-start", gap: "5px" }}
					>
						<CiHome />
						<span style={{ fontSize: "14px" }}>
							Danladi Nasidi Housing Estate Kano State, Nigeria.
						</span>
					</Link>
				</div>
			</div>
			<div className="lower">
				<div className="socials">
					<Link to="#">
						<SlSocialFacebook />
					</Link>
					<Link to="#">
						<SlSocialLinkedin />
					</Link>
					<Link
						to="#"
						style={{
							backgroundColor: "var(--primary-color)",
							color: "white",
						}}
					>
						<SlSocialTwitter />
					</Link>
					<Link to="#">
						<SlSocialInstagram />
					</Link>
				</div>
			</div>
				<p className="copyright">© Copyright Edous. All Rights Reserved</p>
		</footer>
	);
};

export default Footer;
