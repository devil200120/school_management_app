import Button from "@mui/material/Button";
import { BiSolidDashboard } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { BiPlayCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import { useState } from "react";
import { IoMdLock, IoMdPricetags } from "react-icons/io";
import { FaServicestack } from "react-icons/fa";
import routes from "../../routes";
import { IoMdNotifications } from "react-icons/io";
import PropTypes from "prop-types";
import { AiOutlineFolderOpen } from "react-icons/ai";

const Sidebar = ({ onClose }) => {
	const location = useLocation(); // Current route path
	const [activeTab, setActiveTab] = useState(-1); // Manage active tabs
	const [isToggleSubmenu, setIsToggleSubmenu] = useState(false); // Dropdown toggle

	const handleMenuClick = (index, hasSubmenu = false) => {
		setActiveTab(index);
		if (hasSubmenu) {
			setIsToggleSubmenu((prev) => !prev);
		} else {
			// Call the onClose function when a menu item is clicked
			onClose();
		}
	};

	return (
		<div className="sidebar">
			<ul>
				{/* Dashboard */}
				<li>
					<Link to={routes.userDashboard}>
						<Button
							className={`w-100 ${
								location.pathname === `${routes.userDashboard}` ? "active" : ""
							}`}
							onClick={() => handleMenuClick(0)}
						>
							<span className="icon">
								<BiSolidDashboard />
							</span>
							Dashboard
						</Button>
					</Link>
				</li>

				<li>
					<Link to={routes.buyProduct}>
						<Button
							className={`w-100 ${
								location.pathname === `${routes.buyProduct}` ||
								location.pathname === `${routes.viewProduct}` ||
								location.pathname === `${routes.orderSummary}`
									? "active"
									: ""
							}`}
							onClick={() => handleMenuClick(2)}
						>
							<span className="icon">
								<MdShoppingCart />
							</span>
							Buy Our Product
						</Button>
					</Link>
				</li>

				<li>
					<Link to="#">
						<Button
							className={`w-100 ${location.pathname === "#" ? "active" : ""}`}
							onClick={() => handleMenuClick(2)}
						>
							<span className="icon">
								<BiPlayCircle />
							</span>
							Live Demo
						</Button>
					</Link>
				</li>
				<li>
					<Link to={routes.ourFeatures}>
						<Button
							className={`w-100 ${
								location.pathname === `${routes.ourFeatures}` ? "active" : ""
							}`}
							onClick={() => handleMenuClick(2)}
						>
							<span className="icon">
								<AiOutlineFolderOpen />
							</span>
							Our Features
						</Button>
					</Link>
				</li>

				<li>
					<Link to={routes.pricePlan}>
						<Button
							className={`w-100 ${
								location.pathname === `${routes.pricePlan}` ? "active" : ""
							}`}
							onClick={() => handleMenuClick(2)}
						>
							<span className="icon">
								<IoMdPricetags />
							</span>
							Price Plan
						</Button>
					</Link>
				</li>

				{/* Product with Submenu */}
				<li>
					<Button
						className={`w-100 ${
							activeTab === 1 && isToggleSubmenu ? "active" : ""
						}`}
						onClick={() => handleMenuClick(1, true)}
					>
						<span className="icon">
							<FaServicestack />
						</span>
						My Services
						<span className="arrow">
							<FaAngleRight />
						</span>
					</Button>
					{/* Submenu */}
					<div
						className={`submenuWrapper ${
							activeTab === 1 && isToggleSubmenu ? "colapse" : "collapsed"
						}`}
					>
						<ul className="submenu">
							<li>
								<Link
									to={routes.ManageRegisteredProduct}
									className={`${
										location.pathname === `${routes.ManageRegisteredProduct}`
											? "active"
											: ""
									}`}
								>
									Manage Registered Product
								</Link>
							</li>
							<li>
								<Link
									to={routes.productHistory}
									className={`${
										location.pathname === `${routes.productHistory}`
											? "active"
											: ""
									}`}
								>
									Products History
								</Link>
							</li>
						</ul>
					</div>
				</li>

				{/* New Page */}

				{/* Mail */}
				<li>
					<Link to={routes.userNotification}>
						<Button
							className={`w-100 ${
								location.pathname === `${routes.userNotification}`
									? "active"
									: ""
							}`}
							onClick={() => handleMenuClick(3)}
						>
							<span className="icon">
								<IoMdNotifications />
							</span>
							Notification
							<span className="blinker"></span>
						</Button>
					</Link>
				</li>
			</ul>

			{/* Logout */}
			<Logout/>
			
		</div>
	);
};

export default Sidebar;
Sidebar.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose should be a required function
};

const Logout = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		const authToken = localStorage.getItem("authtoken");

		if (!authToken) {
			console.error("No auth token found.");
			navigate(routes.login);
			return;
		}

		try {
			const response = await fetch("https://api.eduos.com.ng/api/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			});

			if (!response.ok) {
				console.error("Logout failed:", response.statusText);
				return;
			}

			// Clear user data from localStorage
			localStorage.removeItem("authtoken");
			localStorage.removeItem("role");

			// Redirect to login
			navigate(routes.login);
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return (
		<div className="logoutWrapper">
			<div className="LogoutBox">
				<Button variant="contained" onClick={handleLogout}>
					<div className="icon">
						<IoMdLock />
					</div>
					Logout
				</Button>
			</div>
		</div>
	);
};