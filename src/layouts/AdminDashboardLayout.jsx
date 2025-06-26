import { createContext, useState, useEffect } from "react";
import AdminHeader from "../components/admin-dashboard/AdminHeader";
import AdminSidebar from "../components/admin-dashboard/AdminSidebar";
import "../css/dashboard.css";
import "../css/responsive.css";
import PropTypes from "prop-types";
import SEO from "../components/SEO";

const Mycontext = createContext();

const AdminDashboardLayout = ({ children }) => {
	// Initialize themeMode based on localStorage or system preference
	const [themeMode, setThemeMode] = useState(() => {
		const savedTheme = localStorage.getItem("themeMode");
		if (savedTheme) {
			return savedTheme === "dark"; // Convert saved value to boolean
		}
		// If no saved theme, use system preference
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	const [isToggleSidebar, setIsToggleSidebar] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isOpenNav, setIsOpenNav] = useState(false);

	// Apply the theme when the component mounts or themeMode changes
	useEffect(() => {
		if (themeMode) {
			document.body.classList.add("dark");
			document.body.classList.remove("light");
			localStorage.setItem("themeMode", "dark");
		} else {
			document.body.classList.add("light");
			document.body.classList.remove("dark");
			localStorage.setItem("themeMode", "light");
		}
	}, [themeMode]);

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	// console.log("windowWidth", windowWidth);

	const openNav = () => {
		setIsOpenNav(true);
	};
	const closeNav = () => {
		setIsOpenNav(false);
	};

	const values = {
		isToggleSidebar,
		setIsToggleSidebar,
		themeMode,
		setThemeMode,
		windowWidth,
		openNav,
		isOpenNav,
		setIsOpenNav,
	};

	return (
		<Mycontext.Provider value={values}>
			<SEO
				title="Admin Dashboard | Eduos"
				favicon="/public/favicons/EDUOSlogo.png"
			/>
			<div className="dashboard">
				<AdminHeader />
				<div className="main d-flex">
					<div
						className={`sidebarOverlay d-none ${isOpenNav ? "show" : ""}`}
						onClick={() => setIsOpenNav(false)}
					></div>
					<div
						className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""} ${
							isOpenNav ? "open" : ""
						}`}
					>
						<AdminSidebar onClose={closeNav} />
					</div>
					<div className={`content ${isToggleSidebar ? "toggle" : ""}`}>
						{children}
					</div>
				</div>
			</div>
		</Mycontext.Provider>
	);
};

AdminDashboardLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AdminDashboardLayout;
export { Mycontext };
