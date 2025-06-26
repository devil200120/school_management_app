import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import routes from "./routes";
import ScrollToTop from "./components/ScrollToTop";
import SEO from "./components/SEO";

// Main Site Pages
import Home from "./pages/main-site/Home";
import Contact from "./pages/main-site/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/main-site/About";
import Blog from "./pages/main-site/Blog";
import BlogPost from "./pages/main-site/BlogPost";
import VerifyOtp from "./pages/VerifyOtp";
import ResetOTPPassword from "./pages/ResetPassword";

// Dashboard Pages
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Newpage from "./pages/dashboard/Newpage";

// User Dashboard Pages
import UserDashboardLayout from "./layouts/UserDashboardLayout";
import UserDashboard from "./pages/user-dashboard/Dashboard";
import BuyProduct from "./pages/user-dashboard/BuyProduct";
import ViewProduct from "./pages/user-dashboard/ViewProduct";
import OrderSummary from "./pages/user-dashboard/OrderSummary";
import PaymentSuccess from "./pages/user-dashboard/PaymentSuccess";
import Congrats from "./components/user-dashboard/Congrats";
import Notification from "./pages/user-dashboard/Notification";
import MyAccount from "./pages/user-dashboard/MyAccount";
import ResetPassword from "./pages/user-dashboard/ResetPassword";
import OurFeatures from "./pages/user-dashboard/OurFeatures";
import PricePlan from "./pages/user-dashboard/PricePlan";
import ProductHistory from "./pages/user-dashboard/ProductHistory";
import ManageRegProduct from "./pages/user-dashboard/ManageRegProduct";

// Admin Dashboard Pages
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";
import AddFAQ from "./pages/admin-dashboard/AddFAQ";
import ManageFAQs from "./pages/admin-dashboard/ManageFAQ";
import AdminResetPassword from "./pages/admin-dashboard/ResetPassword";
import MyAdminAccount from "./pages/admin-dashboard/MyAccount";
import AddSubscription from "./pages/admin-dashboard/AddSubscription";
import AddTestimonial from "./pages/admin-dashboard/AddTestimonial";
import ManageSubscriptions from "./pages/admin-dashboard/ManageSubscriptions";
import ManageTestimonials from "./pages/admin-dashboard/ManageTestimonials";
import AboutEdous from "./pages/admin-dashboard/AboutEdous";
import ContactPage from "./pages/admin-dashboard/ContactEdit";
import AddBlog from "./pages/admin-dashboard/AddBlog";
import ManageBlog from "./pages/admin-dashboard/ManageBlog";

//school management system
import Homepage from "./pages/school-management/Homepage";
import SchoolContact from "./pages/school-management/SchoolContact";
import SchoolAboutPage from "./pages/school-management/SchoolAbout";
import StaffPage from "./pages/school-management/StaffPage";
import PortalLogin from "./pages/school-management/PortalLogin";
import ApplyForm from "./pages/school-management/apply/ApplyForm";
import AddStudentBio from "./pages/school-management/apply/AddStudentBio";
import EduBackground from "./pages/school-management/apply/EduBackground";
import ForgetPassword from "./pages/ForgetPassword";
import ResetOtp from "./pages/ResetOtp";
import ProtectedRoute from "./ProtectedRoute.jsx";
import MainLogin from "./pages/school-management/MainLogin";
import StudentLayout from "./components/StudentLayout.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";

import { AuthProvider } from './context/AuthContext.jsx';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
// import Login from './pages/Login';
import StudentLogin from './pages/StudentLogin.jsx';

const App = () => {
	const renderRoutesWithLayout = (Layout, routes) =>
		routes.map(({ path, element }, index) => (
			<Route key={index} path={path} element={<Layout>{element}</Layout>} />
		));

	return (
		<HelmetProvider>
			<Router>
				<AuthProvider>

					<ScrollToTop />
					<Routes>
						{renderRoutesWithLayout(StudentLayout, [
							{ path: routes.dashboard, element: <Dashboard /> },
							{ path: routes.newPage, element: <Newpage /> },
							{ path: routes.notFound, element: <NotFound /> },
							{ path: routes.home, element: <Index /> },
							{ path: routes.login, element: <Login /> },
							{ path: routes.studentLogin, element: <StudentLogin /> },
						])}
						<Route path="/student" element={<StudentLayout />}>
							<Route index element={<StudentDashboard />} />
						</Route>
						{/* Catch all route for 404 */}
						{/* <Route path="*" element={<NotFound />} /> */}
						{/* <Route path="/" element={<Index />} /> */}
						{/* <Route path="/login" element={<Login />} /> */}
						{/* <Route path="/student-login" element={<StudentLogin />} /> */}
					</Routes>
					<Routes>
						{/* Main Site Routes */}
						<Route
							path={routes.home}
							element={
								<>
									<SEO
										title="Home | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<Home />
								</>
							}
						/>
						<Route
							path={routes.contact}
							element={
								<>
									<SEO
										title="Contact Us | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<Contact />
								</>
							}
						/>
						<Route
							path={routes.login}
							element={
								<>
									<SEO
										title="Login | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<Login />
								</>
							}
						/>
						<Route
							path={routes.verifyOTP}
							element={
								<>
									<SEO
										title="Verify OTP | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<VerifyOtp />
								</>
							}
						/>
						<Route
							path={routes.forgetPassword}
							element={
								<>
									<SEO
										title="Forget Password | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<ForgetPassword />
								</>
							}
						/>
						<Route
							path={routes.passwordresetconfirmation}
							element={
								<>
									<SEO
										title="Resend Otp | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<ResetOtp />
								</>
							}
						/>
						<Route
							path={routes.resetPassword}
							element={
								<>
									<SEO
										title="Resent Password | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<ResetOTPPassword />
								</>
							}
						/>
						<Route
							path={routes.register}
							element={
								<>
									<SEO
										title="Register | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<Register />
								</>
							}
						/>
						<Route
							path={routes.about}
							element={
								<>
									<SEO
										title="About Us | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<About />
								</>
							}
						/>
						<Route
							path={routes.blog}
							element={
								<>
									<SEO
										title="Blog | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<Blog />
								</>
							}
						/>
						<Route
							path={routes.blogPost(":title")}
							element={
								<>
									<SEO
										title="Blog Post | Eduos"
										favicon="/public/favicons/EDUOSlogo.png"
									/>
									<BlogPost />
								</>
							}
						/>

						{/* Dashboard Routes */}
						{renderRoutesWithLayout(DashboardLayout, [
							{ path: routes.dashboard, element: <Dashboard /> },
							{ path: routes.newPage, element: <Newpage /> },
						])}

						<Route element={<ProtectedRoute allowedRoles={["user"]} />}>
							{/* User Dashboard Routes */}
							{renderRoutesWithLayout(UserDashboardLayout, [
								{ path: routes.userDashboard, element: <UserDashboard /> },
								{ path: routes.buyProduct, element: <BuyProduct /> },
								{ path: routes.viewProduct, element: <ViewProduct /> },
								{ path: routes.orderSummary, element: <OrderSummary /> },
								{ path: routes.paymentSuccess, element: <PaymentSuccess /> },
								{ path: routes.Congrats, element: <Congrats /> },
								{ path: routes.userNotification, element: <Notification /> },
								{ path: routes.userMyAccount, element: <MyAccount /> },
								{ path: routes.userResetPassword, element: <ResetPassword /> },
								{ path: routes.ourFeatures, element: <OurFeatures /> },
								{ path: routes.pricePlan, element: <PricePlan /> },
								{ path: routes.productHistory, element: <ProductHistory /> },
								{
									path: routes.ManageRegisteredProduct,
									element: <ManageRegProduct />,
								},
							])}
						</Route>
						{renderRoutesWithLayout(AdminDashboardLayout, [
							{ path: routes.adminDashboard, element: <AdminDashboard /> },
							{ path: routes.addFAQ, element: <AddFAQ /> },
							{ path: routes.manageFAQ, element: <ManageFAQs /> },
							{
								path: routes.adminResetPassword,
								element: <AdminResetPassword />,
							},
							{ path: routes.adminMyAccount, element: <MyAdminAccount /> },
							{ path: routes.addSubscription, element: <AddSubscription /> },
							{ path: routes.addTestimony, element: <AddTestimonial /> },
							{
								path: routes.manageSubscription,
								element: <ManageSubscriptions />,
							},
							{ path: routes.manageTestimony, element: <ManageTestimonials /> },
							{ path: routes.aboutEdit, element: <AboutEdous /> },
							{ path: routes.contactEdit, element: <ContactPage /> },
							{ path: routes.addBlog, element: <AddBlog /> },
							{ path: routes.manageBlog, element: <ManageBlog /> },
						])}

						<Route
							path={routes.schoolManagement}
							element={
								<>
									<SEO
										title="Home | My Website"
										favicon="/public/favicons/abuad.png"
									/>
									<Homepage />
								</>
							}
						/>
						<Route
							path={routes.schoolContact}
							element={
								<>
									<SEO
										title="Contact | My Website"
										favicon="/public/favicons/abuad.png"
									/>
									<SchoolContact />
								</>
							}
						/>
						<Route
							path={routes.schoolAbout}
							element={
								<>
									<SEO
										title="About | My Website"
										favicon="/public/favicons/abuad.png"
									/>
									<SchoolAboutPage />
								</>
							}
						/>
						<Route
							path={routes.schoolStaff}
							element={
								<>
									<SEO
										title="staff | My Website"
										favicon="/public/favicons/abuad.png"
									/>
									<StaffPage />
								</>
							}
						/>
						<Route
							path={routes.schoolPortal}
							element={
								<>
									<SEO
										title="Portal Login | My Website"
										favicon="/public/favicons/abuad.png"
									/>
									{/* <PortalLogin /> */}

									<MainLogin />
								</>
							}
						/>
						<Route
							path={routes.schoolApply}
							element={
								<>
									<SEO
										title="Apply | My Website"
										favicon="/public/favicons/abuad.png"
									/>
									<ApplyForm />
								</>
							}
						/>
						<Route
							path={routes.studentBio}
							element={
								<>
									<SEO
										title="Add Student Bio"
										favicon="/public/favicons/abuad.png"
									/>
									<AddStudentBio />
								</>
							}
						/>
						<Route
							path={routes.studentEdulevel}
							element={
								<>
									<SEO
										title="Add Student Bio"
										favicon="/public/favicons/abuad.png"
									/>
									<EduBackground />
								</>
							}
						/>
					</Routes>
				</AuthProvider>
			</Router>
		</HelmetProvider>
	);
};

export default App;
