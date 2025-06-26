import PropTypes from "prop-types";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Button from "@mui/material/Button";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { IoIosTimer } from "react-icons/io";

const DashboardBox = ({ color, title, value, Icon, grow }) => {
	// Default colors for fallback
	const defaultColors = ["#000", "#fff"];

	// Validate the color prop; fallback to default if invalid
	const validatedColor =
		Array.isArray(color) && color.length === 2 ? color : defaultColors;

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const ITEM_HEIGHT = 48;

	return (
		<Button
			className="dashboardBox"
			style={{
				backgroundImage: `linear-gradient(to right, ${validatedColor[0]}, ${validatedColor[1]})`,
			}}
		>
			{grow ? (
				<span className="chart">
					<FaArrowTrendUp />
				</span>
			) : (
				<span className="chart">
					<FaArrowTrendDown />
				</span>
			)}
			<div className="d-flex w-100">
				<div className="col1">
					<h4 className="text-white">{title}</h4>
					<span className="text-white">{value}</span>
				</div>
				<div className="ml-auto">
					<span className="icon">{Icon && <Icon />}</span>
				</div>
			</div>

			<div className="d-flex align-items-center w-100 bottomEle">
				<h6 className="text-white mb-0 mt-0">Last Month</h6>
				<div className="ml-auto">
					<Button className="ml-auto toggleIcon" onClick={handleClick}>
						<HiOutlineDotsVertical />
					</Button>
					<Menu
						className="dropdown_menu"
						MenuListProps={{
							"aria-labelledby": "long-button",
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						slotProps={{
							paper: {
								style: {
									maxHeight: ITEM_HEIGHT * 4.5,
									width: "20ch",
								},
							},
						}}
					>
						<MenuItem onClick={handleClose}>
							<IoIosTimer /> Last day
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<IoIosTimer /> Last Week
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<IoIosTimer /> Last Month
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<IoIosTimer /> Last Year
						</MenuItem>
					</Menu>
				</div>
			</div>
		</Button>
	);
};

// PropTypes for runtime validation
DashboardBox.propTypes = {
	color: PropTypes.arrayOf(PropTypes.string), // Ensure 'color' is an array of strings
	title: PropTypes.string.isRequired, // Text to display as the title
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Value to display
	Icon: PropTypes.elementType, // Icon component
	grow: PropTypes.bool, // Boolean to show upward or downward trend
};

// Default props if not provided
DashboardBox.defaultProps = {
	color: ["#000", "#fff"], // Default gradient colors (black to white)
	Icon: null, // No default icon
	grow: true, // Default to upward trend
};

export default DashboardBox;
