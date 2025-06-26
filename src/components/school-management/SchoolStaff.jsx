const staffMembers = [
	{
		id: 1,
		name: "John Doe",
		position: "Principal",
		image: "/teach.jpg",
	},
	{
		id: 2,
		name: "Jane Smith",
		position: "Vice Principal",
		image: "/teach.jpg",
	},
	{
		id: 3,
		name: "Michael Brown",
		position: "Head of Department",
		image: "/teach.jpg",
	},
	{
		id: 4,
		name: "Sarah Johnson",
		position: "Senior Teacher",
		image: "/teach.jpg",
	},
	{
		id: 5,
		name: "Daniel Lee",
		position: "Mathematics Teacher",
		image: "/teach.jpg",
	},
];

const SchoolStaff = () => {
	return (
		<div className="sch-staff-container">
			<h1 className="staff-title">Meet Our Staff</h1>
			<div className="staff-grid">
				{staffMembers.map((staff) => (
					<div key={staff.id} className="staff-card">
						<img src={staff.image} alt={staff.name} className="staff-image" />
						<h2 className="staff-name">{staff.name}</h2>
						<p className="staff-position">{staff.position}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default SchoolStaff;
