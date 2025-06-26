import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Button from "@mui/material/Button";
import routes from "../../routes";
import BreadcrumbCard from "../../components/BreadcrumbCard";
const BuyProduct = () => {
	const breadcrumbLinks = [
		{ to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.buyProduct, label: "Buy Product" },
	];
	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Buy Our Product"
				breadcrumbLinks={breadcrumbLinks}
			/>

			<div className="display-product w-100 shadow">
				<div className="product shadow">
					<img src="/sms.jpg" alt="school Management systwm" />
					<div className="product-detail">
						<h1>School Management System</h1>
						<p>
							Buy our multi-functional, self installable and ready to use school
							management system
						</p>
						<Link to={routes.viewProduct}>
							<Button variant="contained">Buy Now</Button>
						</Link>
					</div>
				</div>

				{/* <div className="product shadow">
					<img src="/sms.jpg" alt="school Management systwm" />
					<div className="product-detail">
						<h1>School Management System</h1>
						<p>
							Buy our multi-functional, self installable and ready to use school
							management system
						</p>
						<Button variant="contained">Buy Now</Button>
					</div>
				</div>
				<div className="product shadow">
					<img src="/sms.jpg" alt="school Management systwm" />
					<div className="product-detail">
						<h1>School Management System</h1>
						<p>
							Buy our multi-functional, self installable and ready to use school
							management system
						</p>
						<Button variant="contained">Buy Now</Button>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default BuyProduct;
