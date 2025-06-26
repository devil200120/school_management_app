import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const AosInit = () => {
	useEffect(() => {
		Aos.init({
			duration: 1000, // Duration of the animation in milliseconds
			easing: "ease-in-out", // Optional, defines the easing function
			once: false, // Re-run animation every time element enters viewport
		});
	}, []);

	return null; // This component doesn't render anything
};

export default AosInit;
