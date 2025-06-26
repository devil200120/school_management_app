// import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Gauge } from "@mui/x-charts/Gauge";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
} from "recharts";

const UserGraph = () => {
	const uptime = 99.9; // Example uptime percentage
	const speed = 75; // Example speed metric
	const scalability = 85; // Example scalability metric

	return (
		<div className="chart-container">
			<div className="first">
				<div className="item bar">
					<h4>Growth Statistics</h4>
					<CustomBarChart />
				</div>
				<div className="item gauge">
					<h4>Performance Metrics</h4>
					<div className="matrics">
						<div className="data">
							<h5> Uptime Percentage</h5>
							<Gauge
								width={100}
								height={100}
								value={uptime}
								startAngle={0}
								endAngle={360}
								innerRadius="71%"
								outerRadius="100%"
							/>
							<p>{uptime}%</p>
						</div>
						<div className="data">
							<h5> Speed Metrics</h5>
							<Gauge
								width={100}
								height={100}
								value={speed}
								startAngle={0}
								endAngle={360}
								innerRadius="71%"
								outerRadius="100%"
							/>
							<p>{speed}%</p>
						</div>
						<div className="data">
							<h5> Scalability</h5>
							<Gauge
								width={100}
								height={100}
								value={scalability}
								startAngle={0}
								endAngle={360}
								innerRadius="71%"
								outerRadius="100%"
							/>
							<p>{scalability}%</p>
						</div>
					</div>
				</div>
			</div>

			<div className="item" style={{ display: "none" }}>
				<PieChart
					series={[
						{
							data: [
								{ id: 0, value: 10, label: "series A" },
								{ id: 1, value: 15, label: "series B" },
								{ id: 2, value: 20, label: "series C" },
							],
						},
					]}
					width={300}
					height={200}
				/>
			</div>
			<div className="item" style={{ display: "none" }}>
				<LineChart
					xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
					series={[
						{
							data: [2, 5.5, 2, 8.5, 1.5, 5],
						},
					]}
					width={500}
					height={300}
				/>
			</div>
		</div>
	);
};

export default UserGraph;

const data = [
	{ name: "Jan", Subscriptions: 120, GrowthRate: 5, Satisfaction: 80 },
	{ name: "Feb", Subscriptions: 150, GrowthRate: 10, Satisfaction: 85 },
	{ name: "Mar", Subscriptions: 200, GrowthRate: 15, Satisfaction: 90 },
	{ name: "Apr", Subscriptions: 250, GrowthRate: 20, Satisfaction: 95 },
];

const CustomBarChart = () => {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" className="x-axis-labels" />
				<YAxis className="y-axis-labels" />
				<Tooltip
					//   formatter={(value, name) => `${name}: ${value}`}
					cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
				/>
				<Legend />
				<Bar dataKey="Subscriptions" fill="#4caf50" />
				<Bar dataKey="GrowthRate" fill="#2196f3" />
				<Bar dataKey="Satisfaction" fill="#ff9800" />
			</BarChart>
		</ResponsiveContainer>
	);
};
