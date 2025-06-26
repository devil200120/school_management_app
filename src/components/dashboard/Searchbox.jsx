import { IoSearch } from "react-icons/io5";

const Searchbox = () => {
	return (
		<div className="searchBox position-rlative d-flex align-items-center">
			<IoSearch />
			<input type="text" placeholder="Quick finding...." />
		</div>
	);
};

export default Searchbox;
