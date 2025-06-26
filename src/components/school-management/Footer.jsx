import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoIosPlay, IoIosCall } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import routes from "../../routes";


const Footer = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="sch-footer">
				<div className="col">
					<h2>Follow Us</h2>
					<div className="social-link">
						<Link to="#">
							<Button>
								<FaFacebookF />
							</Button>
						</Link>
						<Link to="#">
							<Button>
								<FaXTwitter />
							</Button>
						</Link>
						<Link to="#">
							<Button>
								<FaInstagram />
							</Button>
						</Link>
					</div>
				</div>
				<div className="col">
					<h2>Sitemap</h2>
					<div className="footer-nav">
						<Link to={routes.schoolManagement}>
							<IoIosPlay />
							<span>Home</span>
						</Link>
						<Link to={routes.schoolPortal}>
							<IoIosPlay />
							<span>Student Portal</span>
						</Link>
						<Link to={routes.schoolAbout}>
							<IoIosPlay />
							<span>About Us</span>
						</Link>
						<Link to={routes.schoolStaff}>
							<IoIosPlay />
							<span>Staff</span>
						</Link>
						<Link to={routes.schoolManagement}>
							<IoIosPlay />
							<span>Apply</span>
						</Link>
						<Link
							onClick={(e) => {
								e.preventDefault();
								navigate(routes.schoolManagement, {
									state: { scrollToTestimonial: true },
								});
							}}
						>
							<IoIosPlay />
							<span>Testimonal</span>
						</Link>
						<Link to={routes.schoolContact}>
							<IoIosPlay />
							<span>Contact Us</span>
						</Link>
					</div>
				</div>
				<div className="col">
					<h2>Contact us</h2>
					<div className="contact-nav">
						<Link to="#">
							<IoIosCall />
							<span>08060989901</span>
						</Link>
						<Link to="#">
							<TiMessages />
							<span>admin@yourdomain.com</span>
						</Link>
					</div>
				</div>
			</div>
			<p className="footer-schName">King Comprehensive College</p>
		</>
	);
};
export default Footer;
