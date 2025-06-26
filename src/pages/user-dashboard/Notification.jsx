import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";
import {
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

const Notification = () => {
	const breadcrumbLinks = [
		{ to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.userNotification, label: "Notification" },
	];
	const notifications = [
		{
			id: 1,
			type: "success",
			message: "Payment successful for Plan B.",
			time: "2 hours ago",
		},
		{
			id: 2,
			type: "warning",
			message: "Your subscription is expiring soon.",
			time: "1 day ago",
		},
		{
			id: 3,
			type: "info",
			message: "New feature update: Attendance Tracking!",
			time: "3 days ago",
		},
		{
			id: 4,
			type: "success",
			message: "Your account has been verified!",
			time: "5 days ago",
		},
	];

	const handleMarkAllAsRead = () => {
		alert("All notifications marked as read!");
		// Logic to mark notifications as read
	};
	return (
		<div className="right-content w-100">
			<BreadcrumbCard title="Notifications" breadcrumbLinks={breadcrumbLinks} />
			<div className="main-container">
				{/* Header */}
				<div className="notifications-header">
					<Typography variant="h6" className="notifications-title">
						See All Notifications
					</Typography>
					<Button
						variant="contained"
						color="primary"
						onClick={handleMarkAllAsRead}
						className="mark-read-btn"
					>
						Mark All as Read
					</Button>
				</div>

				{/* Notification List */}
				<List className="notifications-list">
					{notifications.map((notification) => (
						<ListItem
							key={notification.id}
							className={`notification-item ${notification.type}`}
						>
							<ListItemIcon>
								{notification.type === "success" && (
									<CheckCircleIcon color="success" />
								)}
								{notification.type === "warning" && (
									<WarningIcon color="warning" />
								)}
								{notification.type === "info" && <InfoIcon color="info" />}
							</ListItemIcon>
							<ListItemText
								primary={notification.message}
								secondary={notification.time}
							/>
						</ListItem>
					))}
				</List>
			</div>
		</div>
	);
};

export default Notification;
