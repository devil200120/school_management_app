import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BreadcrumbCard = ({ title, breadcrumbLinks }) => {
	return (
		<div className="bread-crumb-card shadow d-flex  border-0 w-100 p-3 justify-content-between">
			<h5>{title}</h5>
			<div className="bread-crumb">
				<div className="bread-crumb-links">
					{breadcrumbLinks.map((link, index) => (
						<React.Fragment key={index}>
							{link.to ? (
								<Link to={link.to}>
									{link.icon} {link.label}
								</Link>
							) : (
								<span>{link.label}</span>
							)}
							{index < breadcrumbLinks.length - 1 && <span>/</span>}
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

export default BreadcrumbCard;

BreadcrumbCard.propTypes = {
	title: PropTypes.string.isRequired, // Title must be a string and is required
	breadcrumbLinks: PropTypes.arrayOf(
		PropTypes.shape({
			to: PropTypes.string, // 'to' is an optional string (URL path)
			icon: PropTypes.node, // 'icon' can be any renderable node (e.g., JSX or text)
			label: PropTypes.string.isRequired, // 'label' must be a string and is required
		})
	).isRequired, // breadcrumbLinks must be an array of objects and is required
};
