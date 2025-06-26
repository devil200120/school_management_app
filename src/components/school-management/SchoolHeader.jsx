import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi"; // Import menu icons
import NewsScroll from "./NewsScroll";
import routes from "../../routes";
import { CgMenuRightAlt } from "react-icons/cg";

const SchoolHeader = () => {
	const [underlineStyle, setUnderlineStyle] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu
	const navRef = useRef(null);
	const location = useLocation();
	const [isScrolled, setIsScrolled] = useState(false);
	const navigate = useNavigate();

	const moveUnderline = (e) => {
		if (navRef.current) {
			const { left: navLeft } = navRef.current.getBoundingClientRect();
			const { left, width } = e.target.getBoundingClientRect();
			setUnderlineStyle({ left: left - navLeft, width });
		}
	};

	const hideUnderline = () => setUnderlineStyle(null);
	const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle mobile menu

	useEffect(() => {
		// Add scroll event listener
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		// Cleanup listener on component unmount
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [menuOpen]);

	return (
		<div className="SchoolHeader">
			<NewsScroll />
			<div className={`sch-header ${isScrolled ? "scrolled" : ""}`}>
				<div className="top-row">
					<div className="logo">
						<img src="/uibadan.jpeg" alt="Logo" />
					</div>
					<a className="email" href="mailto:info@example.com">
						info@example.com
					</a>
					<div className="menu-icon" onClick={toggleMenu}>
						{menuOpen ? <FiX size={25} /> : <CgMenuRightAlt size={25} />}
					</div>
				</div>
				<div className={`bottom-row ${menuOpen ? "show" : ""}`}>
					<div className="nav-row" ref={navRef} onMouseLeave={hideUnderline}>
						<nav>
							<Link
								to={routes.schoolManagement}
								className={
									location.pathname === `${routes.schoolManagement}`
										? "active"
										: ""
								}
								onMouseEnter={moveUnderline}
								onClick={() => setMenuOpen(false)}
							>
								Home
							</Link>
							<Link
								to={routes.schoolPortal}
								className={location.pathname === "/portal" ? "active" : ""}
								onMouseEnter={moveUnderline}
								onClick={() => setMenuOpen(false)}
							>
								Portal
							</Link>
							<Link
								to={routes.schoolApply}
								className={
									location.pathname === `${routes.schoolApply}` ? "active" : ""
								}
								onMouseEnter={moveUnderline}
								onClick={() => setMenuOpen(false)}
							>
								Apply
							</Link>
							<Link
								to={routes.schoolAbout}
								className={
									location.pathname === `${routes.schoolAbout}` ? "active" : ""
								}
								onMouseEnter={moveUnderline}
								onClick={() => setMenuOpen(false)}
							>
								About
							</Link>
							<Link
								to={routes.schoolStaff}
								className={
									location.pathname === `${routes.schoolStaff}` ? "active" : ""
								}
								onMouseEnter={moveUnderline}
								onClick={() => setMenuOpen(false)}
							>
								Staff
							</Link>
							<Link
								to={routes.schoolManagement}
								className={location.pathname === "/apply" ? "active" : ""}
								onMouseEnter={moveUnderline}
								onClick={(e) => {
									e.preventDefault();
									navigate(routes.schoolManagement, {
										state: { scrollToTestimonial: true },
									});
								}}
							>
								Testimonial
							</Link>

							<Link
								to={routes.schoolContact}
								className={
									location.pathname === `${routes.schoolContact}`
										? "active"
										: ""
								}
								onMouseEnter={moveUnderline}
								onClick={() => setMenuOpen(false)}
							>
								Contact
							</Link>
							{underlineStyle && (
								<div
									className="nav-underline"
									style={{
										left: underlineStyle.left,
										width: underlineStyle.width,
									}}
								></div>
							)}
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SchoolHeader;
