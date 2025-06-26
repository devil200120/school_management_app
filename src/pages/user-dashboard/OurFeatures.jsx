import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";
import { Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const features = [
	{
		title: "Student Management",
		description: "Easily manage student profiles, attendance, and grades.",
		icon: "🎓",
	},
	{
		title: "Teacher Management",
		description: "Organize teacher schedules, profiles, and performance.",
		icon: "👩‍🏫",
	},
	{
		title: "Fee Management",
		description: "Automate fee collection and generate receipts.",
		icon: "💰",
	},
	{
		title: "Exam Management",
		description: "Plan and manage exams, schedules, and results.",
		icon: "📝",
	},
	{
		title: "Library Management",
		description: "Track books, manage lending, and maintain records.",
		icon: "📚",
	},
	{
		title: "Parent Portal",
		description: "Enable parent access to student progress and updates.",
		icon: "👨‍👩‍👦",
	},
	{
		title: "Timetable Management",
		description: "Efficiently create and update class schedules.",
		icon: "📅",
	},
	{
		title: "Transport Management",
		description: "Monitor and manage school transportation services.",
		icon: "🚌",
	},
];

const OurFeatures = () => {
	const breadcrumbLinks = [
		{ to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.ourFeatures, label: "Our Features" },
	];

	return (
		<div className="right-content w-100">
			<BreadcrumbCard title="Our Features" breadcrumbLinks={breadcrumbLinks} />
			<div className="main-container user-dashboard-our-features">
				<Typography variant="h5" className="features-title">
					Explore Our Features of School Management System
				</Typography>
				<Grid container spacing={3} className="features-grid">
					{features.map((feature, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<Card className="feature-card">
								<CardMedia className="feature-icon">{feature.icon}</CardMedia>
								<CardContent>
									<Typography variant="h6" className="feature-title">
										{feature.title}
									</Typography>
									<Typography variant="body2" className="feature-description">
										{feature.description}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	);
};

export default OurFeatures;
