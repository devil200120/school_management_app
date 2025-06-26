import AosInit from "../AosInit";
const FeaturesSection = () => {
const features = [
	{
		title: "Self-Installable and Ready to Use",
		description: "Set up in minutes, no technical expertise needed!",
		icon: "⚙️",
	},
	{
		title: "Comprehensive School Management",
		description:
			"Manage attendance, grading, scheduling, and more—all from one platform.",
		icon: "📚",
	},
	{
		title: "Online Classes Made Easy",
		description:
			"Host virtual classrooms with built-in tools for assignments and progress tracking.",
		icon: "💻",
	},
	{
		title: "Real-Time Communication",
		description:
			"Stay connected with students, teachers, and parents through instant messaging.",
		icon: "📡",
	},
	{
		title: "Secure Data Management",
		description: "Your school’s data is protected with robust cloud security.",
		icon: "🔒",
	},
	{
		title: "Affordable and Scalable",
		description:
			"Cost-effective solutions that grow with your institution’s needs.",
		icon: "💰",
	},
];


	return (
		<section className="eduos-features-section">
			<AosInit />
			<h2 className="eduos-features-heading" data-aos="fade-up">
				All the <span>Tools</span> You Need in One Portal
			</h2>
			<div className="eduos-features-grid" data-aos="fade-up">
				{features.map((feature, index) => (
					<div key={index} className="eduos-feature-card">
						<div className="eduos-feature-icon">{feature.icon}</div>
						<h3 className="eduos-feature-title">{feature.title}</h3>
						<p className="eduos-feature-description">{feature.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturesSection;
