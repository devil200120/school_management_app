import { forwardRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
	{
		id: 1,
		name: "Azzeetech Info. Tech.",
		text: "I love DigitalPortal. It's the best digital school management system for African schools.",
		image: "/teach.jpg",
	},
	{
		id: 2,
		name: "Adeniyi Abdulaziz",
		text: "I love DigitalPortal. It's the best digital school management system for African schools.",
		image: "/teach.jpg",
	},
	{
		id: 3,
		name: "Grace Academy",
		text: "DigitalPortal has transformed our school’s administration. Highly recommended!",
		image: "/teach.jpg",
	},
	{
		id: 4,
		name: "Grace Academy",
		text: "DigitalPortal has transformed our school’s administration. Highly recommended!",
		image: "/teach.jpg",
	},
];

const Testimonial = forwardRef(function Testimonial(props, ref) {
	return (
		<div ref={ref} className="sch-testimonial-container">
			<h4 className="testimonial-title">Testimonial</h4>
			<h2 className="testimonial-heading">What They Say</h2>

			{/* Swiper Wrapper */}
			<div className="testimonial-wrapper">
				<Swiper
					modules={[Pagination]}
					spaceBetween={20}
					slidesPerView={1}
					pagination={{ clickable: true }}
					breakpoints={{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					className="testimonial-slider"
				>
					{testimonials.map((testimonial) => (
						<SwiperSlide key={testimonial.id}>
							<div className="sch-testimonial-card">
								<img
									src={testimonial.image}
									alt={testimonial.name}
									className="testimonial-img"
								/>
								<div>
									<FaQuoteLeft className="quote-icon" />
									<p className="testimonial-text">{testimonial.text}</p>
									<h3 className="testimonial-name">{testimonial.name}</h3>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Pagination placed outside the Swiper */}
				<div className="swiper-pagination"></div>
			</div>
		</div>
	);
});

export default Testimonial;
