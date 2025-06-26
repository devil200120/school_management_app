import DashboardBox from "../../components/dashboard/DashboardBox";
import { TbStarsFilled } from "react-icons/tb";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Button from "@mui/material/Button";
import { Chart } from "react-google-charts";
import { FaEye, FaRegEdit  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { FaClipboardList, FaUserGraduate , FaMoneyCheckAlt  } from "react-icons/fa";


const data = [
	["Year", "Sales", "Expenses"],
	["2013", 1000, 400],
	["2014", 1170, 460],
	["2015", 660, 1120],
	["2016", 1030, 540],
];

const options = {
'backgroundColor':"transparent",
'chartArea':{'width' : '100%', 'height' : '100%'},
}

const Dashboard = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const ITEM_HEIGHT = 48;
	return (
		<>
			{/* Right content wrapper */}
			<div className="right-content w-100">
				{/* Row wrapper */}
				<div className="row dashboardBoxWrapperRow">
					{/* Column wrapper for dashboard boxes */}
					<div className="col-md-8 bottomEle">
						{/* Dashboard box wrapper */}
						<div className="dashboardBoxWrapper">
							<DashboardBox
								color={["#1da256", "#48d483"]}
								title="All subscription"
								value={2770}
								Icon={FaClipboardList}
								grow={true}
							/>
							<DashboardBox
								color={["#c012e2", "#eb64fe"]}
								title="Total Student User(s)"
								value={8007}
								Icon={FaUserGraduate}
								grow={false}
							/>
							<DashboardBox
								color={["#2c78e5", "#60affa"]}
								title="User Transaction"
								value={17}
								Icon={FaMoneyCheckAlt}
								grow={false}
							/>
							<DashboardBox
								color={["#e1950e", "#f3cd29"]}
								title="Active Subsccription"
								value={277}
								Icon={TbStarsFilled}
								grow={true}
							/>
						</div>
					</div>
					{/* Column wrapper for box component */}
					<div className="col-md-4 pr-0 boxEle topPart2">
						{/* Box component */}
						<div className="box graphBox">
							<div className="d-flex align-items-center w-100 justify-content-between bottomEle">
								<h6 className="text-white mb-0 mt-0">Total Sales</h6>
								<div className="ml-auto">
									<Button className="ml-auto toggleIcon" onClick={handleClick}>
										<HiOutlineDotsVertical />
									</Button>
									<Menu
										className="dropdown_menu"
										MenuListProps={{
											"aria-labelledby": "long-button",
										}}
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										slotProps={{
											paper: {
												style: {
													maxHeight: ITEM_HEIGHT * 4.5,
													width: "20ch",
												},
											},
										}}
									>
										<MenuItem onClick={handleClose}>
											<IoIosTimer /> Last day
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<IoIosTimer /> Last Week
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<IoIosTimer /> Last Month
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<IoIosTimer /> Last Year
										</MenuItem>
									</Menu>
								</div>
							</div>

							<h3>$3,787,681.00</h3>
							<p>$3,345.56 in last Month</p>

							<Chart
								chartType="PieChart"
								width="100%"
								height="170px"
								data={data}
								options={options}
							/>
						</div>
					</div>
				</div>

				<div className="card shadow border-0 p-3 mt-4">
					<h3 className="hd">Best Selling Products</h3>

					<div className="table-responsive mt-3">
						<table className="table table-bordered v-align">
							<thead className="thead-dark">
								<tr>
									<th>UID</th>
									<th>PRODUCT</th>
									<th>CATEGORY</th>
									<th>BRAND</th>
									<th>PRICE</th>
									<th>STOCK</th>
									<th>RATING</th>
									<th>ORDER</th>
									<th>SALES</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>#1</td>
									<td>Tops and Skirt set for Female</td>
									<td>Womans</td>
									<td>richman</td>
									<td>$21.00</td>
									<td>30</td>
									<td>4.9(16)</td>
									<td>380</td>
									<td>$38k</td>
									<td>
										<div className="actions d-flex align-items-center">
											<Button color="secondary" className="secondary">
												<FaEye />
											</Button>
											<Button color="success" className="success">
												<FaRegEdit />
											</Button>
											<Button color="error" className="error">
												<MdDelete />
											</Button>
										</div>
									</td>
								</tr>
								<tr>
									<td>#1</td>
									<td>Tops and Skirt set for Female</td>
									<td>Womans</td>
									<td>richman</td>
									<td>$21.00</td>
									<td>30</td>
									<td>4.9(16)</td>
									<td>380</td>
									<td>$38k</td>
									<td>
										<div className="actions d-flex align-items-center">
											<Button color="secondary" className="secondary">
												<FaEye />
											</Button>
											<Button color="success" className="success">
												<FaRegEdit />
											</Button>
											<Button color="error" className="error">
												<MdDelete />
											</Button>
										</div>
									</td>
								</tr>
								<tr>
									<td>#1</td>
									<td>Tops and Skirt set for Female</td>
									<td>Womans</td>
									<td>richman</td>
									<td>$21.00</td>
									<td>30</td>
									<td>4.9(16)</td>
									<td>380</td>
									<td>$38k</td>
									<td>
										<div className="actions d-flex align-items-center">
											<Button color="secondary" className="secondary">
												<FaEye />
											</Button>
											<Button color="success" className="success">
												<FaRegEdit />
											</Button>
											<Button color="error" className="error">
												<MdDelete />
											</Button>
										</div>
									</td>
								</tr>
								<tr>
									<td>#1</td>
									<td>Tops and Skirt set for Female</td>
									<td>Womans</td>
									<td>richman</td>
									<td>$21.00</td>
									<td>30</td>
									<td>4.9(16)</td>
									<td>380</td>
									<td>$38k</td>
									<td>
										<div className="actions d-flex align-items-center">
											<Button color="secondary" className="secondary">
												<FaEye />
											</Button>
											<Button color="success" className="success">
												<FaRegEdit />
											</Button>
											<Button color="error" className="error">
												<MdDelete />
											</Button>
										</div>
									</td>
								</tr>
								<tr>
									<td>#1</td>
									<td>Tops and Skirt set for Female</td>
									<td>Womans</td>
									<td>richman</td>
									<td>$21.00</td>
									<td>30</td>
									<td>4.9(16)</td>
									<td>380</td>
									<td>$38k</td>
									<td>
										<div className="actions d-flex align-items-center">
											<Button color="secondary" className="secondary">
												<FaEye />
											</Button>
											<Button color="success" className="success">
												<FaRegEdit />
											</Button>
											<Button color="error" className="error">
												<MdDelete />
											</Button>
										</div>
									</td>
								</tr>
								<tr>
									<td>#1</td>
									<td>Tops and Skirt set for Female</td>
									<td>Womans</td>
									<td>richman</td>
									<td>$21.00</td>
									<td>30</td>
									<td>4.9(16)</td>
									<td>380</td>
									<td>$38k</td>
									<td>
										<div className="actions d-flex align-items-center">
											<Button color="secondary" className="secondary">
												<FaEye />
											</Button>
											<Button color="success" className="success">
												<FaRegEdit />
											</Button>
											<Button color="error" className="error">
												<MdDelete />
											</Button>
										</div>
									</td>
								</tr>
								<tr>
									<td>#1</td>
									<td>Tops and Skirt set for Female</td>
									<td>Womans</td>
									<td>richman</td>
									<td>$21.00</td>
									<td>30</td>
									<td>4.9(16)</td>
									<td>380</td>
									<td>$38k</td>
									<td>
										<div className="actions d-flex align-items-center">
											<Button color="secondary" className="secondary">
												<FaEye />
											</Button>
											<Button color="success" className="success">
												<FaRegEdit />
											</Button>
											<Button color="error" className="error">
												<MdDelete />
											</Button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="d-flex tableFooter align-items-center mt-2">
						<p>
							Showing <b>10</b> of <b>50</b> results
						</p>
						<Pagination
							count={10}
							color="primary"
							className="pagination"
							showFirstButton
							showLastButton
						/>
					</div>
				</div>
			</div>
		</>
	);
};

/******  fd6a42b8-af02-4da4-9447-58a00ed59c3b  *******/

export default Dashboard;
