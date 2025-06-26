import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";
import BreadcrumbCard from "../../components/BreadcrumbCard";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const ccyFormat = (num) => `${num.toFixed(2)}`;

// Mock data for calculations
const invoiceSubtotal = 40000;
const TAX_RATE = 0.0; // Update if there's a tax rate
const invoiceTaxes = invoiceSubtotal * TAX_RATE;
const invoiceTotal = invoiceSubtotal + invoiceTaxes;
const discount = 0.0;
const vat = 0.0;

const OrderSummary = () => {
	const navigate = useNavigate();
	const breadcrumbLinks = [
		{ to: routes.userDashboard, icon: <FaHome />, label: "Dashboard" },
		{ to: routes.viewProduct, label: "View Product" },
		{ to: routes.orderSummary, label: "Payment Summary" },
	];

	return (
		<div className="right-content w-100">
			<BreadcrumbCard
				title="Payment Summary"
				breadcrumbLinks={breadcrumbLinks}
			/>
			<div className="main-container payment-summary">
				<div className="row-top d-flex align-items-center justify-content-between">
					<div className="date fs-6">
						Date: <b>08/01/2025</b>
					</div>
					<div className="status">Pending</div>
				</div>
				<hr />
				<Box className="transaction-details container p-1">
					<Box className="row">
						{/* Buyer Details */}
						<Box className="buyer-details col-md-4 mb-4">
							<Typography variant="h6" className="text-primary">
								From:
							</Typography>
							<Typography variant="body1">Queen Ella</Typography>
							<Typography variant="body2" className="text-muted">
								ellaschool.https//eduos.edu.ng
							</Typography>
							<Typography variant="body2" className="text-muted">
								Phone: +2348160327173
							</Typography>
							<Typography variant="body2" className="text-muted">
								Email: 2i6sM@example.com
							</Typography>
						</Box>

						{/* Our Details */}
						<Box className="our-details col-md-4 mb-4">
							<Typography variant="h6" className="text-primary">
								To:
							</Typography>
							<Typography variant="body1">EDUOS</Typography>
							<Typography variant="body2" className="text-muted">
								Phone: +2348160327173
							</Typography>
							<Typography variant="body2" className="text-muted">
								Email: help@https//eduos.edu.ng
							</Typography>
						</Box>
						{/* Transaction ID */}
						<Box className="trnasID col-md-4 mb-4">
							<Typography variant="h6" className="text-primary">
								Transaction ID:
							</Typography>
							<Typography variant="body1">#123456789</Typography>
						</Box>
					</Box>
				</Box>

				<div className="table-responsive mt-3">
					<table className="table v-align">
						<thead className="thead-dark">
							<tr>
								<th>#</th>
								<th>Description</th>
								<th>Subscription</th>
								<th>Payment Method</th>
								<th>Amount</th>
								<th>Expired Date</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>Complete School Management System</td>
								<td>Premium Subscription (12 months)</td>
								<td>Paystack</td>
								<td>N40,000</td>
								<td>07/01/2026</td>
								<td>N40,000</td>
							</tr>
						</tbody>
					</table>
				</div>
				<Box className="payment-total">
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Paper elevation={0} className="content-left">
								Subtotal
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper elevation={0} className="content-right">
								{ccyFormat(invoiceSubtotal)}
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper elevation={0} className="content-left">
								Discount (0%)
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper elevation={0} className="content-right">
								{ccyFormat(discount)}
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper elevation={0} className="content-left">
								VAT (0%)
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper elevation={0} className="content-right">
								{ccyFormat(vat)}
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper elevation={0} className="content-left">
								Total
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper elevation={0} className="content-right">
								{ccyFormat(invoiceTotal)}
							</Paper>
						</Grid>
					</Grid>
				</Box>

				<Button
					variant="contained"
					className="mt-4"
					onClick={() => navigate(routes.paymentSuccess)}
				>
					Pay Now
				</Button>
			</div>
		</div>
	);
};

export default OrderSummary;
