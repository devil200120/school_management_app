import Header from "../../components/main-site/Header";
import AosInit from "../../components/AosInit";
import Footer from "../../components/main-site/Footer";
import "../../css/contact.css"
import { Link } from "react-router-dom";
import routes from "../../routes";

const Contact = () => {
	return (
		<div className="contact">
			<AosInit />
			<Header />
			<div className="new">
				<div className="hero" data-aos="fade-up">
					<h2>Contact Us</h2>
					<div className="link">
						<Link to={routes.home}>HOME</Link>
						<span>/</span>
						<Link to={routes.contact}>CONTACT</Link>
					</div>
				</div>
			</div>
			<div className="contact-content" data-aos="fade-up">
				<div className="contact-details" data-aos="zoom-in">
					<h2>Get In Touch With Us</h2>
					<p>
						At Edous, we are dedicated to assisting you with any questions,
						feedback, or support you may need. Feel free to get in touch with us
						at any time.
					</p>
					<div className="mini-contact" data-aos="fade-up">
						<div>
							<h6>Phone:</h6>
							<h5>+2348160327173 </h5>
						</div>
						<div>
							<h6>Email:</h6>

							<h5>support@eduos.com.ng</h5>
						</div>
						<div>
							<h6>Address:</h6>
							<h5>Danladi Nasidi Housing Estate Kano State, Nigeria.</h5>
						</div>
					</div>
				</div>

				<form className="contact-form" data-aos="zoom-in-up">
					<label>
						Enter your Name
						<input type="text" placeholder="Your Name" />
					</label>
					<label>
						Enter your Phone number
						<input type="text" placeholder="Your Phone number" />
					</label>
					<label>
						Enter your Email
						<input type="email" placeholder="Your Email" />
					</label>
					<label>
						Type your Message
						<textarea placeholder="Your Message..."></textarea>
					</label>
					{/* <p className="form-note">
						By submitting this form, you agree to our terms and conditions and
						privacy policy, which explain how we may collect, use, and disclose
						your personal information, including to third parties.
					</p> */}
					<button type="submit" className="submit-button">
						Send Message
					</button>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default Contact;
