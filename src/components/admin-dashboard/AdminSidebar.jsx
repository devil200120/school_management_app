import Button from "@mui/material/Button";
import { BiSolidDashboard } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoMdLock } from "react-icons/io";
import {
	FaRegComments,
	FaTags,
	// FaBoxOpen,
	FaBlog,
} from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import routes from "../../routes";
import PropTypes from "prop-types";
import {
	IoMdInformationCircleOutline,
	IoMdCall,
	// IoMdNotifications,
} from "react-icons/io";

const AdminSidebar = ({ onClose }) => {
	const location = useLocation(); // Current route path
	const [activeTab, setActiveTab] = useState(-1); // Manage active tabs
	const [isToggleSubmenu, setIsToggleSubmenu] = useState(false); // Dropdown toggle

	const handleMenuClick = (index, hasSubmenu = false) => {
		if (hasSubmenu) {
			if (activeTab === index) {
				// If the same tab is clicked, toggle its submenu
				setIsToggleSubmenu((prev) => !prev);
			} else {
				// Open the clicked submenu and close others
				setActiveTab(index);
				setIsToggleSubmenu(true);
			}
		} else {
			// Close the submenu and navigate to the page
			setActiveTab(index);
			setIsToggleSubmenu(false);
			onClose();
		}
	};

	return (
		<div className="sidebar">
			<ul>
				{/* Dashboard */}
				<li>
					<Link to={routes.adminDashboard}>
						<Button
							className={`w-100 ${
								location.pathname === `${routes.adminDashboard}` ? "active" : ""
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
					<Link to={routes.aboutEdit}>
						<Button
							className={`w-100 ${
								location.pathname === `${routes.aboutEdit}` ? "active" : ""
							}`}
							onClick={() => handleMenuClick(2)}
						>
							<span className="icon">
								<IoMdInformationCircleOutline />
							</span>
							About EDUOS
						</Button>
					</Link>
				</li>
				<li>
					<Link to={routes.contactEdit}>
						<Button
							className={`w-100 ${
								location.pathname === `${routes.contactEdit}` ? "active" : ""
							}`}
							onClick={() => handleMenuClick(2)}
						>
							<span className="icon">
								<IoMdCall />
							</span>
							EDUOS Contact
						</Button>
					</Link>
				</li>

				{/* FAQ Section */}
				<li>
					<Button
						className={`w-100 ${
							activeTab === 1 && isToggleSubmenu ? "active" : ""
						} ${
							location.pathname === `${routes.addFAQ}` ||
							location.pathname === `${routes.manageFAQ}`
								? "current-active"
								: ""
						} 					}`}
						onClick={() => handleMenuClick(1, true)}
					>
						<span className="icon">
							<FaRegComments />
						</span>
						FAQ
						<span className="arrow">
							<FaAngleRight />
						</span>
					</Button>
					<div
						className={`submenuWrapper ${
							activeTab === 1 && isToggleSubmenu ? "colapse" : "collapsed"
						}`}
					>
						<ul className="submenu">
							<li>
								<Link
									to={routes.addFAQ}
									className={`${
										location.pathname === `${routes.addFAQ}` ? "active" : ""
									}`}
								>
									Add FAQ
								</Link>
							</li>
							<li>
								<Link
									to={routes.manageFAQ}
									className={`${
										location.pathname === `${routes.manageFAQ}` ? "active" : ""
									}`}
								>
									Manage FAQ
								</Link>
							</li>
						</ul>
					</div>
				</li>

				{/* Subscription Section */}
				<li>
					<Button
						className={`w-100 ${
							activeTab === 2 && isToggleSubmenu ? "active" : ""
						}  ${
							location.pathname === `${routes.addSubscription}` ||
							location.pathname === `${routes.manageSubscription}`
								? "current-active"
								: ""
						} `}
						onClick={() => handleMenuClick(2, true)}
					>
						<span className="icon">
							<FaTags />
						</span>
						Subscription
						<span className="arrow">
							<FaAngleRight />
						</span>
					</Button>
					<div
						className={`submenuWrapper ${
							activeTab === 2 && isToggleSubmenu ? "colapse" : "collapsed"
						}`}
					>
						<ul className="submenu">
							<li>
								<Link
									to={routes.addSubscription}
									className={`${
										location.pathname === `${routes.addSubscription}`
											? "active"
											: ""
									}`}
								>
									Add Subscription
								</Link>
							</li>
							<li>
								<Link
									to={routes.manageSubscription}
									className={`${
										location.pathname === `${routes.manageSubscription}`
											? "active"
											: ""
									}`}
								>
									Manage Subscription
								</Link>
							</li>
						</ul>
					</div>
				</li>

				{/* Testimony Section */}
				<li>
					<Button
						className={`w-100 ${
							activeTab === 3 && isToggleSubmenu ? "active" : ""
						}  ${
							location.pathname === `${routes.addTestimony}` ||
							location.pathname === `${routes.manageTestimony}`
								? "current-active"
								: ""
						} `}
						onClick={() => handleMenuClick(3, true)}
					>
						<span className="icon">
							<BiMessageDetail />
						</span>
						Testimony
						<span className="arrow">
							<FaAngleRight />
						</span>
					</Button>
					<div
						className={`submenuWrapper ${
							activeTab === 3 && isToggleSubmenu ? "colapse" : "collapsed"
						}`}
					>
						<ul className="submenu">
							<li>
								<Link
									to={routes.addTestimony}
									className={`${
										location.pathname === `${routes.addTestimony}`
											? "active"
											: ""
									}`}
								>
									Add Testimony
								</Link>
							</li>
							<li>
								<Link
									to={routes.manageTestimony}
									className={`${
										location.pathname === `${routes.manageTestimony}`
											? "active"
											: ""
									}`}
								>
									Manage Testimony
								</Link>
							</li>
						</ul>
					</div>
				</li>

				{/* Product Section */}
				{/* <li>
					<Button
						className={`w-100 ${
							activeTab === 4 && isToggleSubmenu ? "active" : ""
						}`}
						onClick={() => handleMenuClick(4, true)}
					>
						<span className="icon">
							<FaBoxOpen />
						</span>
						Product
						<span className="arrow">
							<FaAngleRight />
						</span>
					</Button>
					<div
						className={`submenuWrapper ${
							activeTab === 4 && isToggleSubmenu ? "colapse" : "collapsed"
						}`}
					>
						<ul className="submenu">
							<li>
								<Link
									to={routes.addProduct}
									className={`${
										location.pathname === `${routes.addProduct}` ? "active" : ""
									}`}
								>
									Add Product
								</Link>
							</li>
							<li>
								<Link
									to={routes.manageProduct}
									className={`${
										location.pathname === `${routes.manageProduct}`
											? "active"
											: ""
									}`}
								>
									Manage Product
								</Link>
							</li>
						</ul>
					</div>
				</li> */}

				{/* blog with Submenu */}
				<li>
					<Button
						className={`w-100 ${
							activeTab === 5 && isToggleSubmenu ? "active" : ""
						}  ${
							location.pathname === `${routes.addBlog}` ||
							location.pathname === `${routes.manageBlog}`
								? "current-active"
								: ""
						} `}
						onClick={() => handleMenuClick(5, true)}
					>
						<span className="icon">
							<FaBlog />
						</span>
						Blog
						<span className="arrow">
							<FaAngleRight />
						</span>
					</Button>
					{/* Submenu */}
					<div
						className={`submenuWrapper ${
							activeTab === 5 && isToggleSubmenu ? "colapse" : "collapsed"
						}`}
					>
						<ul className="submenu">
							<li>
								<Link
									to={routes.addBlog}
									className={`${
										location.pathname === `${routes.addBlog}` ? "active" : ""
									}`}
								>
									Add Blog
								</Link>
							</li>
							<li>
								<Link
									to={routes.manageBlog}
									className={`${
										location.pathname === `${routes.manageBlog}` ? "active" : ""
									}`}
								>
									Manage Blog
								</Link>
							</li>
						</ul>
					</div>
				</li>
				{/* <li>
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
				</li> */}
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

export default AdminSidebar;
AdminSidebar.propTypes = {
	onClose: PropTypes.func.isRequired, // onClose should be a required function
};
