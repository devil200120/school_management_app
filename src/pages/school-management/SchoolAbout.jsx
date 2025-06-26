import SchoolHeader from "../../components/school-management/SchoolHeader";
import Footer from "../../components/school-management/Footer";
import routes from "../../routes";
import PageHeader from "../../components/school-management/PageHeader";
import SchoolAbout from "../../components/school-management/SchoolAbout";
import SchoolStaff from "../../components/school-management/SchoolStaff";
const SchoolAboutPage = () => {
	return (
		<>
			<main className="main-school-container">
				<SchoolHeader />
				<PageHeader
					title="About Us"
					bgImage="/page-banner-1.jpg"
					links={[
						{ path: routes.schoolManagement, label: "Home" },
						{ path: routes.schoolAbout, label: "About" },
					]}
				/>
				<SchoolAbout />
				<SchoolStaff />
				<Footer />
			</main>
		</>
	);
};

export default SchoolAboutPage;
