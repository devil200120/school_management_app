import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

const ProductGallery = () => {
	const mainSliderRef = useRef(null);
	const thumbnailSliderRef = useRef(null);

	useEffect(() => {
		// Initialize the main slider
		const mainSlider = new Splide(mainSliderRef.current, {
			type: "fade",
			heightRatio: 0.5,
			pagination: false,
			arrows: false,
			cover: true,
		}).mount();

		// Initialize the thumbnail slider
		const thumbnailSlider = new Splide(thumbnailSliderRef.current, {
			fixedWidth: 100,
			fixedHeight: 64,
			isNavigation: true,
			gap: 2,
			focus: "center",
			pagination: false,
			arrows: false, // Disable arrows for the thumbnail slider
			cover: true,
			perPage: 4,
			drag: false,
		}).mount();

		// Sync the sliders
		mainSlider.sync(thumbnailSlider);

		return () => {
			mainSlider.destroy();
			thumbnailSlider.destroy();
		};
	}, []);

	return (
		<div>
			{/* Main Slider */}
			<div id="main-slider" className="splide" ref={mainSliderRef}>
				<div className="splide__track">
					<ul className="splide__list">
						<li className="splide__slide">
							<img src="/01.jpg" alt="Main Image 1" />
						</li>
						<li className="splide__slide">
							<img src="/02.jpg" alt="Main Image 2" />
						</li>
						<li className="splide__slide">
							<img src="/03.jpg" alt="Main Image 3" />
						</li>
						<li className="splide__slide">
							<img src="/04.jpg" alt="Main Image 4" />
						</li>
					</ul>
				</div>
			</div>

			{/* Thumbnail Slider */}
			<div id="thumbnail-slider" className="splide" ref={thumbnailSliderRef}>
				<div className="splide__track">
					<ul className="splide__list">
						<li className="splide__slide">
							<img src="/01.jpg" alt="Thumbnail 1" />
						</li>
						<li className="splide__slide">
							<img src="/02.jpg" alt="Thumbnail 2" />
						</li>
						<li className="splide__slide">
							<img src="/03.jpg" alt="Thumbnail 3" />
						</li>
						<li className="splide__slide">
							<img src="/04.jpg" alt="Thumbnail 4" />
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProductGallery;
