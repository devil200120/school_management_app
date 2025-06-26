import { useState, useEffect } from "react";
import AosInit from "../AosInit";

const Testimonial = () => {
	const testimonials = [
		{
			text: "EDUOS made our administrative tasks so much easier! Teachers love it!",
			name: "Principal, XYZ School",
			avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Replace with the actual avatar URL
		},
		{
			text: "The best decision we made for our school. Online classes are now a breeze!",
			name: "Administrator, ABC Academy",
			avatar: "https://randomuser.me/api/portraits/women/2.jpg", // Replace with the actual avatar URL
		},
		// Add more testimonials with avatars as needed
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	// Function to handle automatic slideshow
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000); // Change slide every 5 seconds

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, [testimonials.length]);

	// Function to handle dot click
	const handleDotClick = (index) => {
		setCurrentIndex(index);
	};

	return (
		<section className="eduos-testimonial">
			<AosInit />
			<div className="eduos-testimonial-content" data-aos="zoom-in">
				<h2 className="eduos-testimonial-heading">
					What Schools Are Saying <span>About EDUOS</span>
				</h2>
				<div className="eduos-testimonial-slideshow">
					<div className="eduos-testimonial-item">
						<div className="eduos-testimonial-avatar">
							<img
								src={testimonials[currentIndex].avatar}
								alt="avatar"
								className="eduos-avatar-img"
							/>
						</div>
						<p className="eduos-testimonial-text">
							&ldquo; {testimonials[currentIndex]?.text} &ldquo;
						</p>
						<p className="eduos-testimonial-author">
							– {testimonials[currentIndex]?.name} {/* Fixed potential error */}
						</p>
					</div>
				</div>

				{/* Indicators */}
				<div className="eduos-testimonial-indicators">
					{testimonials.map((_, index) => (
						<span
							key={index}
							className={`eduos-testimonial-dot ${
								currentIndex === index ? "active" : ""
							}`}
							onClick={() => handleDotClick(index)}
						></span>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonial;
