import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PageHeader = ({ title, links, bgImage }) => {
	return (
		<div className="page-header" style={{ backgroundImage: `url(${bgImage})` }}>
			<h1>{title}</h1>
			<div className="links">
				{links.map((link, index) => (
					<React.Fragment key={index}>
						<Link to={link.path}>{link.label}</Link>
						{index < links.length - 1 && <span>/</span>}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

PageHeader.propTypes = {
	title: PropTypes.string.isRequired,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			path: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	bgImage: PropTypes.string.isRequired,
};

export default PageHeader;
