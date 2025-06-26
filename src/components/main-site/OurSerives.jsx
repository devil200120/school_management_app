import {
	FaUsers,
	FaUserGraduate,
	FaBook,
	FaTasks,
	FaChalkboardTeacher,
	FaVoteYea,
} from "react-icons/fa";
import PropTypes from "prop-types";
import "../../css/ourservices.css";
import AosInit from "../AosInit";

// Reusable ServiceCard component with prop validation
const ServiceCard = ({ icon, title, text }) => (
	<div className="service-card">
		<div className="service-icon">{icon}</div>
        <div className="empty"></div>
		<h3 className="service-title">{title}</h3>
		<p className="service-text">{text}</p>
	</div>
);

ServiceCard.propTypes = {
	icon: PropTypes.element.isRequired, // Ensures 'icon' is a React element (icon component)
	title: PropTypes.string.isRequired, // Ensures 'title' is a string
	text: PropTypes.string.isRequired, // Ensures 'text' is a string
};

const OurSerives = () => {
	return (
		<section className="our-services">
			<AosInit />
			<h2 className="services-title" data-aos="zoom-in-up">
				Our Services
			</h2>
			<p className="services-description" data-aos="zoom-in-up">
				Innovative solutions for your needs, helping you reach new heights.
			</p>
			<div className="services-container" data-aos="zoom-in-up">
				<ServiceCard
					icon={<FaUsers size={30} />}
					title="Admin/Staff Management"
					text="Efficient tools for managing staff and operations."
				/>
				<ServiceCard
					icon={<FaUserGraduate size={30} />}
					title="Student Management"
					text="Manage student data and academic progress effortlessly."
				/>
				<ServiceCard
					icon={<FaBook size={30} />}
					title="E-library Management"
					text="Access digital resources for learning and growth."
				/>
				<ServiceCard
					icon={<FaTasks size={30} />}
					title="Assignment Management"
					text="Streamlined assignment submission and grading."
				/>
				<ServiceCard
					icon={<FaChalkboardTeacher size={30} />}
					title="Online Classes"
					text="Interactive learning through online platforms."
				/>
				<ServiceCard
					icon={<FaVoteYea size={30} />}
					title="Voting System"
					text="Secure and transparent voting for decision-making."
				/>
			</div>
		</section>
	);
};

export default OurSerives;
