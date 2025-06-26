import { useState, useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { GiBookPile } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";

const images = [
	"/class.jpg",
	"/stu.jpg",
	"/medium-shot-queer-students-outdoors.jpg",
];

const Slideshow = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 8000);
		return () => clearInterval(interval);
	}, []);

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length
		);
	};

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	return (
		<div className="banner-slideshow-container">
			<button onClick={prevSlide} className="slideshow-button left">
				❮
			</button>
			<img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
			<button onClick={nextSlide} className="slideshow-button right">
				❯
			</button>
		</div>
	);
};

const SchoolBanner = () => {
	return (
		<div className="school-banner">
			<Slideshow />
			<div className="banner-features">
				<div className="feature">
					<span role="img" aria-label="Scholarship">
						<FaGraduationCap />
					</span>
					<div>
						<h3>Scholarship Facility</h3>
						<p>Simply dummy text printing industry.</p>
					</div>
				</div>
				<div className="feature">
					<span role="img" aria-label="Library">
						<GiBookPile />
					</span>
					<div>
						<h3>Books & Library</h3>
						<p>Simply dummy text printing industry.</p>
					</div>
				</div>
				<div className="feature">
					<span role="img" aria-label="Teachers">
						<FaChalkboardTeacher />
					</span>
					<div>
						<h3>Certified Teachers</h3>
						<p>Simply dummy text printing industry.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SchoolBanner;
