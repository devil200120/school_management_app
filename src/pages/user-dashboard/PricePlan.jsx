import { Card, CardContent, Typography } from "@mui/material";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const PricePlan = () => {
	const breadcrumbLinks = [
		{ to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.pricePlan, label: "Price Plan" },
	];

	const plans = [
		{
			title: "Basic",
			price: 30,
			duration: "3 months",
			features: [
				"Access basic tools",
				"5 GB cloud storage",
				"Standard support",
			],
		},
		{
			title: "Premium",
			price: 60,
			duration: "6 months",
			features: [
				"All features in Basic",
				"50 GB cloud storage",
				"Priority support",
			],
			popular: true,
		},
		{
			title: "Enterprise",
			price: 120,
			duration: "12 months",
			features: [
				"All features in Premium",
				"Unlimited cloud storage",
				"Dedicated account manager",
			],
		},
	];

	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Our Price Plan"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container price-plan">
				<div className="pricing-section">
					<Typography variant="h3" className="pricing-title">
						<span>Flexible</span> Subscription Plans
					</Typography>
					<Typography variant="subtitle1" className="pricing-subtitle">
						Choose a plan that works best for you and your team.
					</Typography>
					<div className="pricing-cards">
						{plans.map((plan, index) => (
							<Card
								key={index}
								className={`pricing-card ${
									plan.popular ? "pricing-card-popular" : ""
								}`}
							>
								{plan.popular && <div className="popular-badge">POPULAR</div>}
								<CardContent>
									<Typography variant="h6" className="plan-title">
										{plan.title}
									</Typography>
									<Typography variant="h4" className="plan-price">
										${plan.price} <span>for {plan.duration}</span>
									</Typography>
									<ul className="plan-features">
										{plan.features.map((feature, i) => (
											<li key={i}>
												<IoCheckmarkDoneSharp /> {feature}
											</li>
										))}
									</ul>
									{/* <Button variant="contained" className="choose-plan-btn">
										Choose Plan
									</Button> */}
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PricePlan;
