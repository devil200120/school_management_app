import "../../css/TestimonialSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdStarRate, MdStarBorder } from "react-icons/md";
import { SiSpringCreators } from "react-icons/si";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { FaQuoteRight } from "react-icons/fa";
import AosInit from "../AosInit";

const TestimonialSlider = () => {
	const testimonials = [
		{
			avatar: "/user1.jpg",
			name: "Director",
			school: "Sunrise Public School, Kolkata",
			rating: 4.5,
			text: "As a school administrator, NLET School Management Software has been a boon. Its user-friendly interface and efficient features have made our daily operations smoother than ever!",
		},
		{
			avatar: "/user2.jpg",
			name: "Mr. Singh, Administrator",
			school: "Modern Public School, Chennai",
			rating: 4.5,
			text: "NLET's School ERP is a perfect fit for Indian schools. It has streamlined our administrative tasks, and the support team is outstanding. Proud to be associated!",
		},
		{
			avatar: "/user3.jpg",
			name: "Mr. Singh, Administrator",
			school: "Modern Public School, Chennai",
			rating: 4.5,
			text: "NLET's School ERP is a perfect fit for Indian schools. It has streamlined our administrative tasks, and the support team is outstanding. Proud to be associated!",
		},
	];

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: false, // Disable default arrows
		autoplay: true, // Enable autoplay
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	};

	let sliderRef = null;

	return (
		<div className="testimonial-slider" data-aos="zoom-in">
			<AosInit />
			<Slider ref={(slider) => (sliderRef = slider)} {...settings}>
				{testimonials.map((testimonial, index) => (
					<div className="testimonial-card" key={index}>
						<div className="icon hover">
							<SiSpringCreators />
						</div>
						<div className="icon quote">
							<FaQuoteRight />
						</div>

						<div className="toppings">
							<img
								src={testimonial.avatar}
								alt={testimonial.name}
								className="avatar"
							/>
							<div className="txt">
								<h3>{testimonial.name}</h3>
								<p className="school">{testimonial.school}</p>
								<div className="rating">
									{Array(5)
										.fill()
										.map((_, i) =>
											i < Math.floor(testimonial.rating) ? (
												<MdStarRate key={`filled-${i}`} />
											) : (
												<MdStarBorder key={`empty-${i}`} />
											)
										)}
								</div>
							</div>
						</div>
						<p className="test">{testimonial.text}</p>
					</div>
				))}
			</Slider>
			<div className="testimonial-arrows-container">
				<button
					className="testimonial-arrow-btn"
					onClick={() => sliderRef.slickPrev()}
				>
					<HiOutlineArrowSmLeft />
				</button>
				<button
					className="testimonial-arrow-btn"
					onClick={() => sliderRef.slickNext()}
				>
					<HiOutlineArrowSmRight />
				</button>
			</div>
		</div>
	);
};

export default TestimonialSlider;
