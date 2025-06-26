
import { useParams } from "react-router-dom";
import blogData from "../../data/blogData";
import Header from "../../components/main-site/Header";
import Footer from "../../components/main-site/Footer";
import "../../css/blog.css";
import { Link } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import AosInit from "../../components/AosInit";
import routes from "../../routes";

const BlogPost = () => {
	const { title } = useParams();
	const blog = blogData.find((b) => b.title === decodeURIComponent(title));

	if (!blog) return <p>Blog post not found.</p>;

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
						<Link to={routes.blog}>{blog.title}</Link>
					</div>
				</div>
			</div>
			<div className="blog-detail">
				<h1 data-aos="zoon-in-up">{blog.title}</h1>
				<div className="blog-content">
					<div data-aos="fade-up">
						<img src={blog.image} alt={blog.title} />
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
					</div>
					<div data-aos="zoom-out">
						<p>{blog.content}</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default BlogPost;
