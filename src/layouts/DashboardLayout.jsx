import { createContext, useState, useEffect } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import "../css/dashboard.css";
import "../css/responsive.css";
import PropTypes from "prop-types";

const Mycontext = createContext();

const DashboardLayout = ({ children }) => {
	const [isToggleSidebar, setIsToggleSidebar] = useState(false);
	const [themeMode, setThemeMode] = useState(true);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isOpenNav, setIsOpenNav] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	const  openNav=()=>{
		setIsOpenNav(true);
	}

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

	useEffect(() => {
		if (themeMode === true) {
			document.body.classList.remove("dark");
			document.body.classList.add("light");
			localStorage.setItem("themeMode", "light");
		} else {
			document.body.classList.remove("light");
			document.body.classList.add("dark");
			localStorage.setItem("themeMode", "dark");
		}
	}, [themeMode]);

	return (
		<Mycontext.Provider value={values}>
			<div className="dashboard">
				<Header />
				<div className="main d-flex">
					<div
						className={`sidebarOverlay d-none ${isOpenNav === true ? 'show' : ''}`}
						onClick={() => setIsOpenNav(false)}
					></div>
					<div
						className={`sidebarWrapper ${
							isToggleSidebar === true ? "toggle" : " "
						} ${isOpenNav === true ? "open " : ""}`}
					>
						<Sidebar />
					</div>
					<div
						className={`content ${isToggleSidebar === true ? "toggle" : ""} `}
					>
						{children}
					</div>
				</div>
			</div>
		</Mycontext.Provider>
	);
};
DashboardLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default DashboardLayout;
export { Mycontext };
