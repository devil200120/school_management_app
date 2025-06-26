import Button from "@mui/material/Button";
import { BiSolidDashboard } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { BiPlayCircle } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoMdLock } from "react-icons/io";
import { FaWallet, FaServicestack } from "react-icons/fa";

const Sidebar = () => {
	const location = useLocation(); // Current route path
	const [activeTab, setActiveTab] = useState(-1); // Manage active tabs
	const [isToggleSubmenu, setIsToggleSubmenu] = useState(false); // Dropdown toggle

	const handleMenuClick = (index, hasSubmenu = false) => {
		setActiveTab(index);
		if (hasSubmenu) {
			setIsToggleSubmenu((prev) => !prev);
		}
	};

	return (
		<div className="sidebar">
			<ul>
				{/* Dashboard */}
				<li>
					<Link to="/dashboard">
						<Button
							className={`w-100 ${
								location.pathname === "/dashboard" ? "active" : ""
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
					<Link to="/new">
						<Button
							className={`w-100 ${
								location.pathname === "/new" ? "active" : ""
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
					<Link to="/new">
						<Button
							className={`w-100 ${
								location.pathname === "/new" ? "active" : ""
							}`}
							onClick={() => handleMenuClick(2)}
						>
							<span className="icon">
								<BiPlayCircle />
							</span>
							Live Demo
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
						Services
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
									to="/product/add"
									className={`${
										location.pathname === "/product/add" ? "active" : ""
									}`}
								>
									Add Product
								</Link>
							</li>
							<li>
								<Link
									to="/product/view"
									className={`${
										location.pathname === "/product/view" ? "active" : ""
									}`}
								>
									View Product
								</Link>
							</li>
							<li>
								<Link
									to="/product/list"
									className={`${
										location.pathname === "/product/list" ? "active" : ""
									}`}
								>
									List Product
								</Link>
							</li>
						</ul>
					</div>
				</li>

				{/* New Page */}

				{/* Mail */}
				<li>
					<Button
						className={`w-100 ${location.pathname === "/mail" ? "active" : ""}`}
						onClick={() => handleMenuClick(3)}
					>
						<span className="icon">
							<FaWallet />
						</span>
						My Wallet
					</Button>
				</li>
			</ul>

			{/* Logout */}
			<div className="logoutWrapper">
				<div className="LogoutBox">
					<Button variant="contained">
						<div className="icon">
							<IoMdLock />
						</div>
						Logout
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
