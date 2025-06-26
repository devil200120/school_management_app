import Header from "../../components/main-site/Header";
import Footer from "../../components/main-site/Footer";
import FAQ from "../../components/main-site/FAQ";
import TestimonialSlider from "../../components/main-site/TestimonialSlider";
import { Link } from "react-router-dom";
import AosInit from "../../components/AosInit";
import "../../css/about.css"
import routes from "../../routes";

const About = () => {
	return (
		<div>
			<AosInit />
			<div className="about-top">
				<Header />
				<div className="hero" data-aos="fade-up">
					<h2>About Us</h2>
					<div className="link">
						<Link to={routes.home}>HOME</Link>
						<span>/</span>
						<Link to={routes.about}>ABOUT</Link>
					</div>
				</div>
			</div>
			<div className="about" data-aos="zoom-in">
				<div className="hero-section">
					<div className="image">
						<img src="/class.jpg" alt="about" />
					</div>
					<div className="left">
						<h5>About EDUOS</h5>
						<h3>
							Our <span>Journey</span>
						</h3>
						<p>
							NLET School, established in 2015, has emerged as a leading
							provider of school management software solutions in India. Our
							journey began with a vision to revolutionize the way educational
							institutions operate by introducing innovative technology
							solutions. Over the years, we have strived relentlessly to develop
							cutting-edge software tailored to the unique needs of schools,
							aiming to streamline administrative processes, enhance
							productivity, and improve educational outcomes.
						</p>
					</div>
				</div>
				<div className="other-context" data-aos="fade-up">
					<p>
						Driven by a passion for excellence and a commitment to customer
						satisfaction, we have continuously evolved our products to meet the
						evolving demands of the education sector. With a team of skilled
						professionals and industry experts, we have developed robust,
						user-friendly software solutions that empower schools to optimize
						their operations, boost efficiency, and deliver superior educational
						experiences.
					</p>
				</div>
				<div className="statement" data-aos="fade-up">
					<div className="item">
						<h2>
							Our <span>Mission</span>
						</h2>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Accusamus vero fugiat laboriosam aut excepturi, corrupti
							temporibus consequatur magnam ipsam, adipisci voluptatem natus,
							incidunt mollitia optio! Porro tempore ipsa dolorum vel?
						</p>
					</div>
					<div className="item">
						<h2>
							Our{" "}
							<span style={{ color: "var(--secondary-color)" }}>Vision</span>
						</h2>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Accusamus vero fugiat laboriosam aut excepturi, corrupti
							temporibus consequatur magnam ipsam, adipisci voluptatem natus,
							incidunt mollitia optio! Porro tempore ipsa dolorum vel?
						</p>
					</div>
				</div>
			</div>
			<TestimonialSlider />
			<FAQ />
			<Footer />
		</div>
	);
};

export default About;
