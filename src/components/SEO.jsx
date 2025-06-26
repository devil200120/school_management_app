import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEO = ({ title, favicon = "/favicons/EDUOSlogo.png" }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<link rel="icon" type="image/png" href={favicon} />
		</Helmet>
	);
};

// Prop validation
SEO.propTypes = {
	title: PropTypes.string.isRequired, // Title is required and must be a string
	favicon: PropTypes.string, // Favicon is optional but must be a string
};

export default SEO;
