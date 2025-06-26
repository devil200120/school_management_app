import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import {
	FaSmile,
	FaClipboardList,
} from "react-icons/fa"; 
import { PiStudent } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import "../../css/StatsSection.css";
import Aos from "aos";
import { useEffect } from "react";


const StatsSection = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.3,
	});

	const stats = [
		{
			value: 232,
			label: "Total Clients",
			description:
				"Delivering exceptional outcomes with a focus on client satisfaction.",
			icon: <FaSmile className="stat-icon" />,
		},
		{
			value: 521,
			label: "Results System Users",
			description: "Streamlining results processing for enhanced efficiency",
			icon: <FaClipboardList className="stat-icon" />,
		},
		{
			value: 1453,
			label: "Examination System Users",
			description: "Ensuring reliable and seamless examination management.",
			icon: <PiStudent className="stat-icon" />,
		},
		{
			value: 32,
			label: "Payment System Users",
			description: "Simplifying transactions for businesses and users alike",
			icon: <MdPayments className="stat-icon" />,
		},
	];

        useEffect(() => {
            Aos.init({
                duration: 1000, // Duration of the animation in milliseconds
                easing: "ease-in-out", // Optional, defines the easing function
                once: false,
            });
        })

	return (
		<section ref={ref} className="stats-section">
			<div className="image" data-aos="fade-up">
				<img src="/stats-img.svg" alt="" />
			</div>
			<div className="stats-container" data-aos="zoom-in">
				{stats.map((stat, index) => (
					<div key={index} className="stat-card">
						<div>{stat.icon}</div>
						<div>
							<h2 className="stat-number">
								{inView ? (
									<CountUp start={0} end={stat.value} duration={2} />
								) : (
									0
								)}
							</h2>
							<h4 className="stat-label">{stat.label}</h4>
							<p className="stat-description">{stat.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default StatsSection;
