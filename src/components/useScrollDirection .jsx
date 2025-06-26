import { useState, useEffect } from "react";

const useScrollDirection = () => {
	const [scrollingUp, setScrollingUp] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY < lastScrollY) {
				setScrollingUp(true);
			} else {
				setScrollingUp(false);
			}
			setLastScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	return scrollingUp;
};

export default useScrollDirection;
