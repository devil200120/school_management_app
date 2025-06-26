import { useState } from "react";
import "../../css/WhyChooseUs.css";
import AosInit from "../AosInit";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const WhyChooseUs = () => {
	const [activeTab, setActiveTab] = useState("Our Products");

	const tabs = ["Our Products", "Customer Care", "Reliability"];
	const features = {
		"Our Products": [
			"Affordable for all schools",
			"A Cross-platform School Portal Solution",
			"A Multi-Level, Self-Install, and Easy to use Educational Systems",
		],
		"Customer Care": [
			"24/7 support for schools",
			"Quick resolution of queries",
			"Dedicated care team to handle issues",
		],
		Reliability: [
			"Trusted by hundreds of schools",
			"Scalable systems for all educational levels",
			"Data security and consistency",
		],
	};

	return (
		<section className="why-choose-us">
            <AosInit/>
			<div className="content-wrapper">
				{/* Left Section */}
				<div className="text-section" data-aos="zoom-in-right">
					<h2 className="section-title">Why People Choose Us</h2>
					<div className="tabs">
						{tabs.map((tab) => (
							<span
								key={tab}
								className={`tab ${activeTab === tab ? "active" : ""}`}
								onClick={() => setActiveTab(tab)}
							>
								{tab}
							</span>
						))}
					</div>
					<ul className="feature-list">
						{features[activeTab].map((feature, index) => (
							<>
								<li key={index}>
									{" "}
									<IoCheckmarkDoneOutline />
									{feature}
								</li>
							</>
						))}
					</ul>
				</div>

				{/* Right Section */}
				<div className="image-section" data-aos="zoom-in-left">
					<img
						src="/mwhy.png" // Replace with your local image path
						alt="Students working on laptops"
						className="banner-image"
					/>
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
