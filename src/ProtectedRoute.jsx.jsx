/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import routes from "./routes";

const ProtectedRoute = ({ allowedRoles }) => {
	const authToken = localStorage.getItem("authtoken");
	const userRole = localStorage.getItem("role");

	console.log("Auth Token:", authToken);
	console.log("User Role:", userRole);
	console.log("Allowed Roles:", allowedRoles);

	if (!authToken) {
		return <Navigate to={routes.login} replace />;
	}

	if (!allowedRoles.includes(userRole)) {
		return <Navigate to={routes.home} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
