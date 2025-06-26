import { MdOutlineDateRange } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import PropTypes from "prop-types";
import Header from "../../components/main-site/Header";
import Footer from "../../components/main-site/Footer";
import "../../css/blog.css";
import blogData from "../../data/blogData";
import { Link } from "react-router-dom";
import AosInit from "../../components/AosInit";
import routes from "../../routes";

const Blog = () => {

	return (
		<div>
			<AosInit />
			<div className="about-top">
				<Header />
				<div className="hero" data-aos="fade-up">
					<h2>Blog</h2>
					<div className="link">
						<Link to={routes.home}>HOME</Link>
						<span>/</span>
						<Link to={routes.blog}>Blog</Link>
					</div>
				</div>
			</div>
			<div className="blog" data-aos="zoom-in-up">
				<h1>Our Latest News & Blog</h1>
				<p>
					Choose from data centers worldwide to store your content close to your
					website visitors. Cloudflare has a network.
				</p>

				{/* Blog Section */}
				<div className="blog-section" data-aos="fade-up">
					{blogData.map((blog) => (
						<MyBlog key={blog.id} blog={blog} />
					))}
				</div>
			</div>

			<Footer />
		</div>
	);
};

const MyBlog = ({ blog }) => {
	return (
		<div className="blog-card">
			<img src={blog.image} alt="Blog" />
			<div className="blog-metadata">
				<div>
					<MdOutlineDateRange />
					<span>{blog.date}</span>
				</div>
				<div>
					<FaRegCommentDots />
					<span>{blog.comments}</span>
				</div>
			</div>
			<h3>{blog.title}</h3>
			<Link to={`/blog/${encodeURIComponent(blog.title)}`}>
				<button className="animated-button">
					<svg
						viewBox="0 0 24 24"
						className="arr-2"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
					</svg>
					<span className="text">Click here</span>
					<span className="circle"></span>
					<svg
						viewBox="0 0 24 24"
						className="arr-1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
					</svg>
				</button>
			</Link>
		</div>
	);
};

MyBlog.propTypes = {
	blog: PropTypes.shape({
		id: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		comments: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired,
};
export default Blog;
