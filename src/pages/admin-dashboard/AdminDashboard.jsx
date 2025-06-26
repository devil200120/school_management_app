import AdminDashboardBox from "../../components/admin-dashboard/AdminDashboardBox";
import { TbStarsFilled } from "react-icons/tb";
import Button from "@mui/material/Button";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import {
	FaClipboardList,
	FaUserGraduate,
	FaMoneyCheckAlt,
} from "react-icons/fa";
import UserGraph from "../../components/UserGraph";

const AdminDashboard = () => {
	return (
		<>
			{/* Right content wrapper */}
			<div className="right-content w-100">
				{/* Row wrapper */}
				<div className="row dashboardBoxWrapperRow">
					{/* Column wrapper for dashboard boxes */}
					<div className="col-md-12 bottomEle">
						{/* Dashboard box wrapper */}
						<div className="user dashboardBoxWrapper">
							<AdminDashboardBox
								color={["#1da256", "#48d483"]}
								title="All subscription"
								value={2770}
								Icon={FaClipboardList}
								grow={true}
							/>
							<AdminDashboardBox
								color={["#c012e2", "#eb64fe"]}
								title="Total School User(s)"
								value={8007}
								Icon={FaUserGraduate}
								grow={false}
							/>
							<AdminDashboardBox
								color={["#2c78e5", "#60affa"]}
								title="User Transaction"
								value={17}
								Icon={FaMoneyCheckAlt}
								grow={false}
							/>
							<AdminDashboardBox
								color={["#e1950e", "#f3cd29"]}
								title="Active Subsccription"
								value={277}
								Icon={TbStarsFilled}
								grow={true}
							/>
						</div>
					</div>
					{/* Column wrapper for box component */}
				</div>

				<UserGraph />

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

export default AdminDashboard;
