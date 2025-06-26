import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Newpage = () => {
	return (
		<div className="right-content w-100">
			<div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
				<h5>New Page</h5>
				<div className="bread-crumb">
					<div className="bread-crumb-links">
						<Link to="/dashboard">
							<FaHome /> Dashboard
						</Link>
						<span>/</span>
						<Link to="/new">
							New
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Newpage;
