import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Searchbox from "../Searchbox";

// material ui
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";

// icons
import { IoShieldHalfOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { Mycontext } from "../../../layouts/DashboardLayout";

const Header = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [isOpennotificationDrop, setisOpennotificationDrop] = useState(false);

	const open = Boolean(anchorEl);
	const openNotifications = Boolean(isOpennotificationDrop);

	const context = useContext(Mycontext);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMyAccDrop = () => {
		setAnchorEl(null);
	};

	const handleOpennotificationsDrop = () => {
		setisOpennotificationDrop(true);
	};
	const handleClosenotificationsDrop = () => {
		setisOpennotificationDrop(false);
	};

	return (
		<header className="d-flex align-items-center">
			<div className="container-fluid w-100">
				<div className="row d-flex align-items-center w-100 ">
					{/* Logo wrapper */}
					<div className="col col-sm-2 d-flex align-items-center part1">
						<Link to={"/dashboard"}>
							<img src="/EDUOSlogo.png" alt="Logo" className="logo" />
						</Link>
					</div>

					{context.windowWidth > 992 && (
						// Menu button
						<div className="col col-sm-3 d-flex align-items-center part2 pl-4 res-hide">
							<Button
								className="rounded-circle"
								onClick={() =>
									context.setIsToggleSidebar(!context.isToggleSidebar)
								}
							>
								{context.isToggleSidebar === false ? (
									<MdMenuOpen />
								) : (
									<MdOutlineMenu />
								)}
							</Button>
							<Searchbox />
						</div>
					)}

					{/* Menu button */}
					<div className="col col-sm-7 d-flex align-items-center justify-content-end part3">
						<Button
							className="rounded-circle"
							onClick={() => context.setThemeMode(!context.themeMode)}
						>
							<CiLight />
						</Button>
						<div className="dropdownWrapper position-relative">
							<Button
								className="rounded-circle"
								onClick={handleOpennotificationsDrop}
							>
								<IoIosNotificationsOutline />
							</Button>

							{context.windowWidth < 992 && (
								<Button
									className="rounded-circle "
									onClick={() => context.openNav()}
								>
									<IoMenu />
								</Button>
							)}

							<Menu
								anchorEl={isOpennotificationDrop}
								id="notifications"
								className="notifications"
								open={openNotifications}
								onClose={handleClosenotificationsDrop}
								onClick={handleClosenotificationsDrop}
								slotProps={{
									paper: {
										elevation: 0,
										sx: {
											overflow: "visible",
											filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
											mt: 1.5,
											"& .MuiAvatar-root": {
												width: 32,
												height: 32,
												ml: -0.5,
												mr: 1,
											},
											"&::before": {
												content: '""',
												display: "block",
												position: "absolute",
												top: 0,
												right: 14,
												width: 10,
												height: 10,
												bgcolor: "background.paper",
												transform: "translateY(-50%) rotate(45deg)",
												zIndex: 0,
											},
										},
									},
								}}
							>
								<MenuItem onClick={handleCloseMyAccDrop}>
									<ListItemIcon>
										<PersonAdd fontSize="small" />
									</ListItemIcon>
									My Notification
								</MenuItem>
								<MenuItem onClick={handleCloseMyAccDrop}>
									<ListItemIcon>
										<IoShieldHalfOutline />
									</ListItemIcon>
									Reset Password
								</MenuItem>
								<MenuItem onClick={handleCloseMyAccDrop}>
									<ListItemIcon>
										<Logout fontSize="small" />
									</ListItemIcon>
									Logout
								</MenuItem>
							</Menu>
						</div>

						<div className="myAccWrapper">
							<Button
								className="myAcc d-flex align-items-center"
								onClick={handleClick}
							>
								<div className="userImg">
									<span className="rounded-circle">
										<img src="/user3.jpg" alt="user icon" />
									</span>
								</div>

								<div className="userInfo res-hide">
									<h4>King Damie</h4>
									<p className="mb-0">@kingdamie21</p>
								</div>
							</Button>
							<Menu
								anchorEl={anchorEl}
								id="account-menu"
								open={open}
								onClose={handleCloseMyAccDrop}
								onClick={handleCloseMyAccDrop}
								slotProps={{
									paper: {
										elevation: 0,
										sx: {
											overflow: "visible",
											filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
											mt: 1.5,
											"& .MuiAvatar-root": {
												width: 32,
												height: 32,
												ml: -0.5,
												mr: 1,
											},
											"&::before": {
												content: '""',
												display: "block",
												position: "absolute",
												top: 0,
												right: 14,
												width: 10,
												height: 10,
												bgcolor: "background.paper",
												transform: "translateY(-50%) rotate(45deg)",
												zIndex: 0,
											},
										},
									},
								}}
								transformOrigin={{ horizontal: "right", vertical: "top" }}
								anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
							>
								<MenuItem onClick={handleCloseMyAccDrop}>
									<ListItemIcon>
										<PersonAdd fontSize="small" />
									</ListItemIcon>
									my Account
								</MenuItem>
								<MenuItem onClick={handleCloseMyAccDrop}>
									<ListItemIcon>
										<IoShieldHalfOutline />
									</ListItemIcon>
									Reset Password
								</MenuItem>
								<MenuItem onClick={handleCloseMyAccDrop}>
									<ListItemIcon>
										<Logout fontSize="small" />
									</ListItemIcon>
									Logout
								</MenuItem>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
