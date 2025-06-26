import { useState, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";


const staffs = [
	{ name: "Stella Roffin", image: "/backImg.jpg", role: "Math Teacher" },
	{ name: "Princy Flora", image: "/teach.jpg", role: "Math Teacher" },
	{ name: "Jesica Matt", image: "/backImg.jpg", role: "Math Teacher" },
	{ name: "Janaton Doe", image: "/teacher3.jpg", role: "Math Teacher" },
];

const StaffShowcase = () => {
	const [current, setCurrent] = useState(0);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrent((prev) => (prev === staffs.length - 1 ? 0 : prev + 1));
	};

	const prevSlide = () => {
		setCurrent((prev) => (prev === 0 ? staffs.length - 1 : prev - 1));
	};

	return (
		<div className="staff-carousel">
			<h1>OUR EXPERIENCED STAFFS</h1>
			{/* Desktop View (Show 4 Staff Members) */}
			{!isMobile ? (
				<div className="staff-grid">
					{staffs.map((staff, index) => (
						<div key={index} className="staff-card">
							<div className="staff-image">
								<img src={staff.image} alt={staff.name} />
								<div className="overlay"></div>
							</div>
							<h3 className="staff-name">{staff.name}</h3>
							<p className="staff-role">{staff.role}</p>
						</div>
					))}
				</div>
			) : (
				// Mobile View (Show 1 Staff at a Time)
				<div className="carousel-container">
					<div className="staff-card active">
						<div className="staff-image">
							<img src={staffs[current].image} alt={staffs[current].name} />
							<div className="overlay"></div>
						</div>
						<h3 className="staff-name">{staffs[current].name}</h3>
						<p className="staff-role">{staffs[current].role}</p>
					</div>

					{/* Navigation Buttons */}
					<button onClick={prevSlide} className="carousel-btn left">
						<GrFormPrevious />
					</button>
					<button onClick={nextSlide} className="carousel-btn right">
						<GrFormNext/>
					</button>
				</div>
			)}
		</div>
	);
};

export default StaffShowcase;
