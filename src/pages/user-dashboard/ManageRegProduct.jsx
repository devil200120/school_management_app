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
	Button,
	Popover,
} from "@mui/material";
import { GoDotFill } from "react-icons/go";
import { PiDotsThreeOutlineBold } from "react-icons/pi";
const ManageRegProduct = () => {
	const breadcrumbLinks = [
		{ to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.ManageRegisteredProduct, label: "Manage Registered Product" },
	];
	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Manage Registered Product"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container">
				<TableWithPagination />
			</div>
		</div>
	);
};

export default ManageRegProduct;

const TableWithPagination = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const data = [
		{
			sn: 1,
			schoolID: 101,
			url: "https://example.com/school-alpha",
			registeredBy: "admin1@eduos.com",
			status: "Active",
			insightLink: "https://example.com/insight-alpha",
		},
		{
			sn: 2,
			schoolID: 102,
			url: "https://example.com/school-beta",
			registeredBy: "eduos@gmail.com",
			status: "Inactive",
			insightLink: "https://example.com/insight-beta",
		},
		{
			sn: 3,
			schoolID: 103,
			url: "https://example.com/school-gamma",
			registeredBy: "admin2@eduos.com",
			status: "Active",
			insightLink: "https://example.com/insight-gamma",
		},
		{
			sn: 4,
			schoolID: 104,
			url: "https://example.com/school-delta",
			registeredBy: "eduos@gmail.com",
			status: "Pending",
			insightLink: "https://example.com/insight-delta",
		},
		{
			sn: 5,
			schoolID: 105,
			url: "https://example.com/school-epsilon",
			registeredBy: "admin3@eduos.com",
			status: "Active",
			insightLink: "https://example.com/insight-epsilon",
		},
		{
			sn: 6,
			schoolID: 106,
			url: "https://example.com/school-zeta",
			registeredBy: "eduos@gmail.com",
			status: "Inactive",
			insightLink: "https://example.com/insight-zeta",
		},
		{
			sn: 7,
			schoolID: 107,
			url: "https://example.com/school-eta",
			registeredBy: "admin4@eduos.com",
			status: "Active",
			insightLink: "https://example.com/insight-eta",
		},
		{
			sn: 8,
			schoolID: 108,
			url: "https://example.com/school-theta",
			registeredBy: "eduos@gmail.com",
			status: "Pending",
			insightLink: "https://example.com/insight-theta",
		},
		{
			sn: 9,
			schoolID: 109,
			url: "https://example.com/school-iota",
			registeredBy: "admin5@eduos.com",
			status: "Active",
			insightLink: "https://example.com/insight-iota",
		},
		{
			sn: 10,
			schoolID: 110,
			url: "https://example.com/school-kappa",
			registeredBy: "eduos@gmail.com",
			status: "Inactive",
			insightLink: "https://example.com/insight-kappa",
		},
		{
			sn: 11,
			schoolID: 111,
			url: "https://example.com/school-lambda",
			registeredBy: "admin6@eduos.com",
			status: "Active",
			insightLink: "https://example.com/insight-lambda",
		},
		{
			sn: 12,
			schoolID: 112,
			url: "https://example.com/school-mu",
			registeredBy: "eduos@gmail.com",
			status: "Pending",
			insightLink: "https://example.com/insight-mu",
		},
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

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
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
							<TableCell>School ID</TableCell>
							<TableCell>School URL</TableCell>
							<TableCell>Registered By</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Insight</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedData.map((row, index) => (
							<TableRow key={index}>
								<TableCell>{row.sn}</TableCell>
								<TableCell>{row.schoolID}</TableCell>
								<TableCell>
									<a href={row.url} target="_blank" rel="noopener noreferrer">
										{row.url}
									</a>
								</TableCell>
								<TableCell>{row.registeredBy}</TableCell>
								<TableCell>
									<span
										className={`status ${
											row.status === "Active"
												? "status-active"
												: row.status === "Inactive"
												? "status-inactive"
												: "status-pending"
										}`}
									>
										<center>
											<GoDotFill /> <span>{row.status}</span>
										</center>
									</span>
								</TableCell>
								<TableCell>
									<a
										href={row.insightLink}
										target="_blank"
										rel="noopener noreferrer"
									>
										Insight
									</a>
								</TableCell>
								<TableCell className="action-cell">
									<Button onClick={handleClick}>
										<PiDotsThreeOutlineBold />
									</Button>
									<Popover
										id={id}
										open={open}
										anchorEl={anchorEl}
										onClose={handleClose}
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "left",
										}}
										transformOrigin={{
											vertical: "top",
											horizontal: "center",
										}}
									>
										<div className="p-1 popover-content">
											<Button onClick={() => alert("Button 1 clicked!")}>
												Edit
											</Button>
											<Button
												color="secondary"
												onClick={() => alert("Button 2 clicked!")}
											>
												Disable
											</Button>
										</div>
									</Popover>
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
