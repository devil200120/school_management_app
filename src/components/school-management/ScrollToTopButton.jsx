import { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when user scrolls down 100px
	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > 100);
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	// Scroll to top function
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			className={`scroll-to-top ${isVisible ? "show" : ""}`}
			onClick={scrollToTop}
		>
			<FaAngleUp />
		</button>
	);
};

export default ScrollToTopButton;
