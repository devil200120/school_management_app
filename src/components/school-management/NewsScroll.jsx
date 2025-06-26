import { useState } from "react";

const NewsScroll = () => {
	// News data stored within the component
	const newsData = [
		"Breaking: Our School Achieves Record Graduation Rates!",
		"Weather Alert: Thunderstorms Expected Tomorrow, Stay Safe!",
		"Sports Update: Our School’s Football Team Wins the State Cup!",
		"Tech News: New Online Learning Portal Launched for Students!",
	];

	const [hovered, setHovered] = useState(false);

	return (
		<div
			className="news-scroll"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className={`news-text ${hovered ? "paused" : ""}`}>
				{newsData.map((news, index) => {
					const [highlight, ...rest] = news.split(": ");
					return (
						<span key={index} className="news-item">
							<span className="highlight">{highlight}:</span> {rest.join(": ")}
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default NewsScroll;
