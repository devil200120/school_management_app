import SchoolHeader from "../../components/school-management/SchoolHeader";
import Footer from "../../components/school-management/Footer";
import SchoolStaff from "../../components/school-management/SchoolStaff";
import PageHeader from "../../components/school-management/PageHeader";
import routes from "../../routes";
const StaffPage = () => {

	return (
		<>
			<main className="main-school-container">
				<SchoolHeader />
				<PageHeader
					title="Our Staff"
					bgImage="/page-banner-1.jpg"
					links={[
						{ path: routes.schoolManagement, label: "Home" },
						{ path: routes.schoolStaff, label: "Staff" },
					]}
				/>
				<SchoolStaff />

				<Footer />
			</main>
		</>
	);
};

export default StaffPage;
