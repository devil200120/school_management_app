import { IoSearch } from "react-icons/io5";

const AdminSearchbox = () => {
	return (
		<div className="searchBox position-rlative d-flex align-items-center">
			<IoSearch />
			<input type="text" placeholder="Search...." />
		</div>
	);
};

export default AdminSearchbox;
