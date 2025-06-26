import BreadcrumbCard from "../../components/BreadcrumbCard";
import routes from "../../routes";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	TextField,
} from "@mui/material";
import { GoDotFill } from "react-icons/go";
const ProductHistory = () => {
	const breadcrumbLinks = [
		{ to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.productHistory, label: "Product History" },
	];
	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Product History"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container">
				<TableWithPagination />
			</div>
		</div>
	);
};

export default ProductHistory;

const TableWithPagination = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const data = [
		{
			sn: 1,
			productName: "Product A",
			url: "https://example.com/a",
			subscriptionDate: "2025-01-01",
			expiredDate: "2025-12-31",
			plan: "Premium",
			registeredBy: "eduos@gmail.com",
			payment: "$120",
			status: "Active",
		},
		{
			sn: 2,
			productName: "Product B",
			url: "https://example.com/b",
			subscriptionDate: "2025-02-01",
			expiredDate: "2025-12-31",
			plan: "Basic",
			registeredBy: "User2",
			payment: "$80",
			status: "Inactive",
		},
		{
			sn: 3,
			productName: "Complete School Managemet System",
			url: "https://example.com/b",
			subscriptionDate: "2025-02-01",
			expiredDate: "2025-12-31",
			plan: "Basic",
			registeredBy: "User2",
			payment: "$80",
			status: "Active",
		},
		{
			sn: 4,
			productName: "Complete School Managemet System",
			url: "https://example.com/b",
			subscriptionDate: "2025-02-01",
			expiredDate: "2025-12-31",
			plan: "Basic",
			registeredBy: "User2",
			payment: "$80",
			status: "Inactive",
		},
		{
			sn: 5,
			productName: "Complete School Managemet System",
			url: "https://example.com/b",
			subscriptionDate: "2025-02-01",
			expiredDate: "2025-12-31",
			plan: "Basic",
			registeredBy: "User2",
			payment: "$80",
			status: "Active",
		},
		{
			sn: 6,
			productName: "Product B",
			url: "https://example.com/b",
			subscriptionDate: "2025-02-01",
			expiredDate: "2025-12-31",
			plan: "Basic",
			registeredBy: "User2",
			payment: "$80",
			status: "Active",
		},
		{
			sn: 7,
			productName: "Product B",
			url: "https://example.com/b",
			subscriptionDate: "2025-02-01",
			expiredDate: "2025-12-31",
			plan: "Basic",
			registeredBy: "User2",
			payment: "$80",
			status: "Inactive",
		},
		{
			sn: 8,
			productName: "Product B",
			url: "https://example.com/b",
			subscriptionDate: "2025-02-01",
			expiredDate: "2025-12-31",
			plan: "Basic",
			registeredBy: "User2",
			payment: "$80",
			status: "Active",
		},
		{
			sn: 9,
			productName: "Product B",
			url: "https://example.com/b",
			subscriptionDate: "2025-02-01",
			expiredDate: "2025-12-31",
			plan: "Basic",
			registeredBy: "User2",
			payment: "$80",
			status: "Inactive",
		},
		// Add more rows as needed
	];

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const filteredData = data.filter((row) =>
		Object.values(row)
			.join(" ")
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);

	const paginatedData = filteredData.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
				className="tbl-30"
			>
				<TextField
					placeholder="Search"
					variant="outlined"
					value={searchTerm}
					onChange={handleSearch}
					className="tbl-30-search"
				/>
			</div>
			<TableContainer className="table-container">
				<Table>
					<TableHead className="table-head">
						<TableRow>
							<TableCell>S/N</TableCell>
							<TableCell>Product Name</TableCell>
							<TableCell>URL</TableCell>
							<TableCell>Subscription Date</TableCell>
							<TableCell>Expired Date</TableCell>
							<TableCell>Plan</TableCell>
							<TableCell>Registered By</TableCell>
							<TableCell>Payment</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedData.map((row, index) => (
							<TableRow key={index}>
								<TableCell>{row.sn}</TableCell>
								<TableCell>{row.productName}</TableCell>
								<TableCell>
									<a href={row.url} target="_blank" rel="noopener noreferrer">
										{row.url}
									</a>
								</TableCell>
								<TableCell>{row.subscriptionDate}</TableCell>
								<TableCell>{row.expiredDate}</TableCell>
								<TableCell>{row.plan}</TableCell>
								<TableCell>{row.registeredBy}</TableCell>
								<TableCell>{row.payment}</TableCell>
								<TableCell>
									<span
										className={`status ${
											row.status === "Active"
												? "status-active"
												: "status-inactive"
										}`}
									>
										<GoDotFill /> <span>{row.status}</span>
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				className="table-pagination-container"
				rowsPerPageOptions={[5, 10, 15]}
				component="div"
				count={filteredData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	);
};
