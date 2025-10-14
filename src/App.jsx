import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import { AuthProvider } from "./context/AuthContext.jsx";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
// import Login from './pages/Login';
import StudentLogin from "./pages/StudentLogin.jsx";
import AddAssignment from "./pages/teacher/assignments/add";
import TeacherResultCardSettings from "./pages/teacher/result/ResultCardSettings";
import TeacherDashboard from "./pages/teacher/Dashboard";
import ManageAssignments from "./pages/teacher/assignments/manage";
import EditAssignment from "./pages/teacher/assignments/edit";
import AssignmentReports from "./pages/teacher/assignments/reports";
import AddAssessment from "./pages/teacher/exam/AddAssessment";
import ManageAssessment from "./pages/teacher/exam/ManageAssessment";
import EditAssessment from "./pages/teacher/exam/edit";
import ViewAssessment from "./pages/teacher/exam/view";
import ManageExamQuestions from "./pages/teacher/exam/ManageExamQuestions";
import AddLessonPlan from "./pages/teacher/lesson-plan/AddLessonPlan";
import ManageLessonPlans from "./pages/teacher/lesson-plan/ManageLessonPlans";
import EditLessonPlan from "./pages/teacher/lesson-plan/edit";
import TeacherAddQuiz from "./pages/teacher/quiz/add";
import TeacherManageQuiz from "./pages/teacher/quiz/manage";
import EditQuiz from "./pages/teacher/quiz/edit";
import ViewQuiz from "./pages/teacher/quiz/view";
import TeacherQuizResults from "./pages/teacher/quiz/results";
import ScheduleLiveClass from "./pages/teacher/live-classes/schedule";
import ManageLiveClasses from "./pages/teacher/live-classes/manage";
import TeacherTimetable from "./pages/teacher/timetable";
import MyAttendance from "./pages/teacher/attendance/my";
import LeaveManagement from "./pages/teacher/attendance/leave";
import StudentAttendanceManagement from "./pages/teacher/student-attendance";
import UploadStudentResult from "./pages/teacher/result/UploadStudentResult";
import UploadClassResult from "./pages/teacher/result/UploadClassResult";
import EditClassResult from "./pages/teacher/result/EditClassResult";
import TeacherLayout from "./components/TeacherLayout";

// Accountant Pages
import AccountantLayout from "./components/AccountantLayout";
import AccountantDashboard from "./pages/accountant/Dashboard";
import PaymentManagement from "./pages/accountant/payments/PaymentManagement";
import ClassPaymentList from "./pages/accountant/payments/ClassPaymentList";
import PaymentRecords from "./pages/accountant/payments/PaymentRecords";
import PaymentMethods from "./pages/accountant/payments/PaymentMethods";
import PaymentPurpose from "./pages/accountant/payments/PaymentPurpose";
import CollectFee from "./pages/accountant/fee-collection/CollectFee";
import FeeDue from "./pages/accountant/fee-collection/FeeDue";
import DueReports from "./pages/accountant/fee-collection/DueReports";
import ExpenseManagement from "./pages/accountant/expenses/ExpenseManagement";
import PettyCashManagement from "./pages/accountant/expenses/PettyCashManagement";
import PendingSalaries from "./pages/accountant/salary/PendingSalaries";
import SalaryHistory from "./pages/accountant/salary/SalaryHistory";
import CollectionReport from "./pages/accountant/reports/CollectionReport";
import ExpenseReport from "./pages/accountant/reports/ExpenseReport";
import RevenueAnalytics from "./pages/accountant/reports/RevenueAnalytics";
import BalanceSheet from "./pages/accountant/reports/BalanceSheet";
// Accountant Inventory Pages
import AccountantStationaryInventory from "./pages/accountant/inventory/StationaryInventory";
import AccountantGameEquipmentInventory from "./pages/accountant/inventory/GameEquipmentInventory";
import AccountantMedicalEquipmentInventory from "./pages/accountant/inventory/MedicalEquipmentInventory";
import AccountantBooksInventory from "./pages/accountant/inventory/BooksInventory";
// import AccountantAddItem from './pages/accountant/inventory/add-item';
// import AccountantAddItemStock from './pages/accountant/inventory/add-item-stock';
import AccountantIssuesItem from "./pages/accountant/inventory/issues-item";

import AdminLayout from "./components/AdminLayout";

// Admin Pages
import AdminDashboardNew from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/users/UserManagement";
import SiteSettings from "./pages/admin/settings/SiteSettings";
import DashboardAnalytics from "./pages/admin/analytics/DashboardAnalytics";
import AddAdmin from "./pages/admin/admin-users/AddAdmin";
import ManageAdmin from "./pages/admin/admin-users/ManageAdmin";
import StudentAttendance from "./pages/admin/attendance/StudentAttendance";
import TeacherAttendance from "./pages/admin/attendance/TeacherAttendance";
import ViewPaymentRecords from "./pages/admin/ViewPaymentRecords";
import TheSchool from "./pages/admin/TheSchool";
import SiteLink from "./pages/admin/SiteLink";
import AddItem from "./pages/admin/inventory/add-item";
import AddItemStock from "./pages/admin/inventory/add-item-stock";
import IssuesItem from "./pages/admin/inventory/issues-item";

// Admin Class pages
import AddClass from "./pages/admin/class/AddClass";
import ManageClass from "./pages/admin/class/ManageClass";

// Admin Department pages
import AddDepartment from "./pages/admin/department/AddDepartment";
import ManageDepartment from "./pages/admin/department/ManageDepartment";

// Admin News pages
import AddNews from "./pages/admin/news/AddNews";

// Admin Promotion pages
import RollbackPromotion from "./pages/admin/promotion/RollbackPromotion";

// Admin Subject pages
import AddSubject from "./pages/admin/subject/AddSubject";

// Admin Inventory Pages
import StationaryInventory from "./pages/admin/inventory/StationaryInventory";
import GameEquipmentInventory from "./pages/admin/inventory/GameEquipmentInventory";
import MedicalEquipmentInventory from "./pages/admin/inventory/MedicalEquipmentInventory";
import BooksInventory from "./pages/admin/inventory/BooksInventory";

// Admin Quiz Pages
import AddQuiz from "./pages/admin/quiz/AddQuiz";
import ManageQuiz from "./pages/admin/quiz/ManageQuiz";
import QuizResults from "./pages/admin/quiz/QuizResults";
import QuizAnswers from "./pages/admin/quiz/QuizAnswers";

// Admin Live Class Pages
import AddLiveClass from "./pages/admin/live-class/AddLiveClass";
import ManageLiveClass from "./pages/admin/live-class/ManageLiveClass";
import ViewLessonPlans from "./pages/admin/lesson-plan/ViewLessonPlans";

// Admin Payment pages
import ManagePaymentList from "./pages/admin/payment/ManagePaymentList";
import AddPaymentList from "./pages/admin/payment/AddPaymentList";

// Admin Events pages
import ManageTestimonial from "./pages/admin/events/ManageTestimonial";
import StudentPriceList from "./pages/admin/events/StudentPriceList";

// Admin Level and Section Pages
import AddLevel from "./pages/admin/level/AddLevel";
import ManageLevel from "./pages/admin/level/ManageLevel";
import AddSection from "./pages/admin/section/AddSection";
import ManageSection from "./pages/admin/section/ManageSection";

// Admin Assessment Management
import AssessmentManagement from "./pages/admin/exam/AssessmentManagement";
import { Toaster as Sonner } from "./components/ui/sonner";

// Admin Exam pages
import AdminAddAssessment from "./pages/admin/exam/AddAssessment";
import AdminManageAssessment from "./pages/admin/exam/ManageAssessment";
import AdminManageExamQuestions from "./pages/admin/exam/ManageExamQuestions";
import ManageSetAssessment from "./pages/admin/exam/ManageSetAssessment";
import ManageSetExam from "./pages/admin/exam/ManageSetExam";
import UploadExcelQuestions from "./pages/admin/exam/UploadExcelQuestions";

// Admin Teacher Comment pages
import AddTeacherComment from "./pages/admin/teacher-comment/AddTeacherComment";
import ManageTeacherComment from "./pages/admin/teacher-comment/ManageTeacherComment";

// Admin Notification pages
import DashboardNotification from "./pages/admin/notification/DashboardNotification";
import EmailNotification from "./pages/admin/notification/EmailNotification";

// Admin Payment Management pages
import ConfirmPayment from "./pages/admin/payment-management/ConfirmPayment";
import CustomizationPayment from "./pages/admin/payment-management/CustomizationPayment";
import ManageCustomizationPayment from "./pages/admin/payment-management/ManageCustomizationPayment";
import ManagePayment from "./pages/admin/payment-management/ManagePayment";
import PayCustomizedBill from "./pages/admin/payment-management/PayCustomizedBill";
import PayStudentBill from "./pages/admin/payment-management/PayStudentBill";

// Admin Term pages
import AddTerm from "./pages/admin/term/AddTerm";
import ManageTerm from "./pages/admin/term/ManageTerm";

// Student pages
import TakeAssessment from "./pages/student/assignment/TakeAssessment";
import AssessmentScore from "./pages/student/assignment/AssessmentScore";

// Library pages
import AudioBooks from "./pages/student/library/AudioBooks";
import EBooks from "./pages/student/library/EBooks";
import VideoBooks from "./pages/student/library/VideoBooks";

// Payment pages
import PayBill from "./pages/student/payment/PayBill";
import PaymentRecord from "./pages/student/payment/PaymentRecord";
// Admin Payment Method pages
import AddPaymentMethod from "./pages/admin/payment-method/AddPaymentMethod";

// Admin Payment Purpose pages
import AddPaymentPurpose from "./pages/admin/payment-purpose/AddPaymentPurpose";
import ManagePayPurpose from "./pages/admin/payment-purpose/ManagePayPurpose";

// Admin Pin Generator pages
import GenerateApplicationPin from "./pages/admin/pin/GenerateApplicationPin";
import GenerateResultPin from "./pages/admin/pin/GenerateResultPin";

// Admin Report Card pages
import ReportCardInsights from "./pages/admin/report-card/ReportCardInsights";

// New Admin pages
// Library pages
import LibraryAudioBooks from "./pages/admin/library/LibraryAudioBooks";
import LibraryTextBooks from "./pages/admin/library/LibraryTextBooks";
import LibraryVideoBooks from "./pages/admin/library/LibraryVideoBooks";
import UploadBooks from "./pages/admin/library/UploadBooks";

// Student pages
import AddStudent from "./pages/admin/student/AddStudent";
import AddStudentExcel from "./pages/admin/student/AddStudentExcel";
import GroupStudent from "./pages/admin/student/GroupStudent";
import ManageApplication from "./pages/admin/student/ManageApplication";
import ManageStudent from "./pages/admin/student/ManageStudent";
import ManageTrashedStudent from "./pages/admin/student/ManageTrashedStudent";
import PromoteStudents from "./pages/admin/student/PromoteStudents";
import ViewClassStudents from "./pages/admin/student/ViewClassStudents";

// Admin Result Management pages
import AdminEditClassResult from "./pages/admin/result/EditClassResult";
import ManageTeamResults from "./pages/admin/result/ManageTeamResults";
import AdminUploadStudentResult from "./pages/admin/result/UploadStudentResult";
import AdminUploadClassResult from "./pages/admin/result/UploadClassResult";
import UploadExternalResultExcel from "./pages/admin/result/UploadExternalResultExcel";
import UploadResultExcel from "./pages/admin/result/UploadResultExcel";
import UploadStudentExternalResult from "./pages/admin/result/UploadStudentExternalResult";
import UploadResult from "./pages/admin/result/UploadResult";

// Import inventory pages

import ItemCategory from "./pages/admin/inventory/item-category";
import ItemStore from "./pages/admin/inventory/item-store";
import ItemSupplier from "./pages/admin/inventory/item-supplier";

// Exam pages
import ExamScore from "./pages/student/exam/ExamScore";
import TakeExam from "./pages/student/exam/TakeExam";
import ExamCard from "./pages/student/ExamCard";
import ExamPass from "./pages/student/ExamPass";
import PrintForm from "./pages/student/PrintForm";

// Result pages
import CheckResult from "./pages/student/result/CheckResult";
import ReprintResult from "./pages/student/result/ReprintResult";

// New pages
import TimeTable from "./pages/student/TimeTable";
import AttendanceReport from "./pages/student/AttendanceReport";
import Quiz from "./pages/student/Quiz";
import ELearning from "./pages/student/elearning/LiveClasses";
import Courses from "./pages/student/elearning/Courses";

// Add the new imports for Result Card Settings
import AdminResultCardSettings from "./pages/admin/result/ResultCardSettings";
import { TooltipProvider } from "./components/ui/tooltip.jsx";
import { Toaster } from "./components/ui/toaster";

// import TeacherResultCardSettings from './pages/teacher/result/ResultCardSettings';
const App = () => {
  const renderRoutesWithLayout = (Layout, routes) =>
    routes.map(({ path, element }, index) => (
      <Route key={index} path={path} element={<Layout>{element}</Layout>} />
    ));

  return (
    <HelmetProvider>
      {/* <Router> */}
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            {/* <Sonner /> */}

            <ScrollToTop />

            <Routes>
              {/* Main Site Routes */}
              {/* <Route path="/" element={<Index />} /> */}
              <Route path="/login" element={<MainLogin />} />
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/student-login" element={<StudentLogin />} /> */}
              {renderRoutesWithLayout(StudentLayout, [
                { path: routes.dashboard, element: <Dashboard /> },
                { path: routes.newPage, element: <Newpage /> },
                // { path: routes.notFound, element: <NotFound /> },
                // { path: routes.home, element: <Index /> },
                { path: routes.login, element: <MainLogin /> },
                { path: routes.studentLogin, element: <StudentLogin /> },
              ])}
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

              <Route path="/student" element={<StudentLayout />}>
                <Route index element={<StudentDashboard />} />

                {/* Assignment routes */}
                <Route path="assignment">
                  <Route index element={<TakeAssessment />} />
                  <Route path="take-assessment" element={<TakeAssessment />} />
                  <Route
                    path="assessment-score"
                    element={<AssessmentScore />}
                  />
                </Route>

                {/* Library routes */}
                <Route path="library">
                  <Route index element={<AudioBooks />} />
                  <Route path="audio" element={<AudioBooks />} />
                  <Route path="ebooks" element={<EBooks />} />
                  <Route path="video" element={<VideoBooks />} />
                  <Route path="video-books" element={<VideoBooks />} />
                </Route>

                {/* Payment routes */}
                <Route path="payment">
                  <Route index element={<PayBill />} />
                  <Route path="pay-bill" element={<PayBill />} />
                  <Route path="record" element={<PaymentRecord />} />
                </Route>

                {/* Exam routes */}
                <Route path="exam">
                  <Route index element={<ExamScore />} />
                  <Route path="score" element={<ExamScore />} />
                  <Route path="take" element={<TakeExam />} />
                </Route>

                <Route path="exam-card" element={<ExamCard />} />
                <Route path="exam-pass" element={<ExamPass />} />
                <Route path="print-form" element={<PrintForm />} />

                {/* Result routes */}
                <Route path="result">
                  <Route index element={<CheckResult />} />
                  <Route path="check" element={<CheckResult />} />
                  <Route path="reprint" element={<ReprintResult />} />
                </Route>

                {/* New routes */}
                <Route path="timetable" element={<TimeTable />} />
                <Route path="attendance" element={<AttendanceReport />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="elearning">
                  <Route index element={<ELearning />} />
                  <Route path="live-classes" element={<ELearning />} />
                  <Route path="courses" element={<Courses />} />
                </Route>
              </Route>

              {/* <Route path="student">
						</Route> */}

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardNew />} />
                <Route
                  path="analytics/dashboard-analytics"
                  element={<DashboardAnalytics />}
                />
                <Route path="analytics" element={<DashboardAnalytics />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="settings" element={<SiteSettings />} />
                <Route path="admin-users/add-admin" element={<AddAdmin />} />
                <Route
                  path="admin-users/manage-admin"
                  element={<ManageAdmin />}
                />
                <Route
                  path="attendance/student-attendance"
                  element={<StudentAttendance />}
                />
                <Route
                  path="attendance/teacher-attendance"
                  element={<TeacherAttendance />}
                />
                <Route
                  path="view-payment-records"
                  element={<ViewPaymentRecords />}
                />
                <Route path="the-school" element={<TheSchool />} />
                <Route path="site-link" element={<SiteLink />} />

                {/* The School route */}
                <Route path="school" element={<TheSchool />} />

                {/* View Payment Records route */}
                <Route
                  path="payment-records"
                  element={<ViewPaymentRecords />}
                />

                {/* Inventory Routes */}
                <Route path="inventory/add-item" element={<AddItem />} />
                <Route
                  path="inventory/add-item-stock"
                  element={<AddItemStock />}
                />
                <Route path="inventory/issues-item" element={<IssuesItem />} />
                <Route
                  path="inventory/stationary"
                  element={<StationaryInventory />}
                />
                <Route
                  path="inventory/game-equipment"
                  element={<GameEquipmentInventory />}
                />
                <Route
                  path="inventory/medical-equipment"
                  element={<MedicalEquipmentInventory />}
                />
                <Route path="inventory/books" element={<BooksInventory />} />

                {/* Quiz Management Routes */}
                <Route path="quiz/add" element={<AddQuiz />} />
                <Route path="quiz/manage" element={<ManageQuiz />} />
                <Route path="quiz/results" element={<QuizResults />} />
                <Route path="quiz/answers" element={<QuizAnswers />} />

                {/* Live Class Routes */}
                <Route path="live-class/add" element={<AddLiveClass />} />
                <Route path="live-class/manage" element={<ManageLiveClass />} />

                {/* Level Management Routes */}
                <Route path="level/add" element={<AddLevel />} />
                <Route path="level/manage" element={<ManageLevel />} />

                {/* Manage Teacher Comment routes */}
                <Route path="teacher-comment">
                  <Route index element={<AddTeacherComment />} />
                  <Route path="add" element={<AddTeacherComment />} />
                  <Route path="manage" element={<ManageTeacherComment />} />
                </Route>

                {/* Manage Term routes */}
                <Route path="term">
                  <Route index element={<AddTerm />} />
                  <Route path="add" element={<AddTerm />} />
                  <Route path="manage" element={<ManageTerm />} />
                </Route>

                {/* Notification routes */}
                <Route path="notification">
                  <Route index element={<DashboardNotification />} />
                  <Route path="dashboard" element={<DashboardNotification />} />
                  <Route path="email" element={<EmailNotification />} />
                </Route>

                {/* Payment Method routes */}
                <Route path="payment-method">
                  <Route index element={<AddPaymentMethod />} />
                  <Route path="add" element={<AddPaymentMethod />} />
                </Route>

                {/* Payment Purpose routes */}
                <Route path="payment-purpose">
                  <Route index element={<AddPaymentPurpose />} />
                  <Route path="add" element={<AddPaymentPurpose />} />
                  <Route path="manage" element={<ManagePayPurpose />} />
                </Route>

                {/* Pin Generator routes */}
                <Route path="pin">
                  <Route index element={<GenerateApplicationPin />} />
                  <Route
                    path="application"
                    element={<GenerateApplicationPin />}
                  />
                  <Route path="result" element={<GenerateResultPin />} />
                </Route>

                {/* Report Card Insights routes */}
                <Route path="report-card" element={<ReportCardInsights />} />

                {/* New School Library routes */}
                <Route path="library">
                  <Route index element={<LibraryAudioBooks />} />
                  <Route path="audio" element={<LibraryAudioBooks />} />
                  <Route path="textbooks" element={<LibraryTextBooks />} />
                  <Route path="video" element={<LibraryVideoBooks />} />
                  <Route path="upload" element={<UploadBooks />} />
                </Route>

                {/* Site Link route */}
                <Route path="site-link" element={<SiteLink />} />

                {/* Result Management routes */}
                <Route path="result">
                  <Route index element={<AdminEditClassResult />} />
                  <Route path="edit" element={<AdminEditClassResult />} />
                  <Route path="manage-team" element={<ManageTeamResults />} />
                  <Route
                    path="upload-student"
                    element={<AdminUploadStudentResult />}
                  />
                  <Route
                    path="upload-class"
                    element={<AdminUploadClassResult />}
                  />
                  <Route
                    path="upload-external-excel"
                    element={<UploadExternalResultExcel />}
                  />
                  <Route path="upload-excel" element={<UploadResultExcel />} />
                  <Route
                    path="upload-student-external"
                    element={<UploadStudentExternalResult />}
                  />
                  <Route path="upload" element={<UploadResult />} />
                </Route>

                {/* Payment Management routes */}
                <Route path="payment-management">
                  <Route index element={<ConfirmPayment />} />
                  <Route path="confirm" element={<ConfirmPayment />} />
                  <Route
                    path="customization"
                    element={<CustomizationPayment />}
                  />
                  <Route
                    path="manage-customization"
                    element={<ManageCustomizationPayment />}
                  />
                  <Route path="manage" element={<ManagePayment />} />
                  <Route
                    path="pay-customized"
                    element={<PayCustomizedBill />}
                  />
                  <Route path="pay-student" element={<PayStudentBill />} />
                </Route>

                {/* Student routes */}
                <Route path="student">
                  <Route index element={<ManageStudent />} />
                  <Route path="add" element={<AddStudent />} />
                  <Route path="add-excel" element={<AddStudentExcel />} />
                  <Route path="group" element={<GroupStudent />} />
                  <Route
                    path="manage-application"
                    element={<ManageApplication />}
                  />
                  <Route path="manage" element={<ManageStudent />} />
                  <Route path="trashed" element={<ManageTrashedStudent />} />
                  <Route path="promote" element={<PromoteStudents />} />
                  <Route path="view-class" element={<ViewClassStudents />} />
                </Route>

                {/* Add inventory routes here */}
                <Route path="inventory">
                  <Route path="issues-item" element={<IssuesItem />} />
                  <Route path="add-item-stock" element={<AddItemStock />} />
                  <Route path="add-item" element={<AddItem />} />
                  <Route path="item-category" element={<ItemCategory />} />
                  <Route path="item-store" element={<ItemStore />} />
                  <Route path="item-supplier" element={<ItemSupplier />} />
                </Route>
                {/* Section Management Routes */}
                <Route path="section/add" element={<AddSection />} />
                <Route path="section/manage" element={<ManageSection />} />

                {/* Assessment Management Route */}
                <Route
                  path="exam/assessment-management"
                  element={<AssessmentManagement />}
                />

                {/* Add the new Result Card Settings route */}
                <Route
                  path="result/result-card-settings"
                  element={<AdminResultCardSettings />}
                />

                {/* Lesson Plans */}
                <Route path="lesson-plan">
                  <Route index element={<ViewLessonPlans />} />
                  <Route path="view" element={<ViewLessonPlans />} />
                </Route>

                {/* Payment routes */}
                <Route path="payment">
                  <Route index element={<ManagePaymentList />} />
                  <Route path="manage" element={<ManagePaymentList />} />
                  <Route path="add" element={<AddPaymentList />} />
                </Route>

                {/* Exam Management routes */}
                <Route path="exam">
                  <Route index element={<AdminManageExamQuestions />} />
                  <Route
                    path="add-assessment"
                    element={<AdminAddAssessment />}
                  />
                  <Route
                    path="manage-assessment"
                    element={<AdminManageAssessment />}
                  />
                  <Route
                    path="manage-exam-questions"
                    element={<AdminManageExamQuestions />}
                  />
                  <Route
                    path="manage-set-assessment"
                    element={<ManageSetAssessment />}
                  />
                  <Route path="manage-set-exam" element={<ManageSetExam />} />
                  <Route
                    path="upload-excel"
                    element={<UploadExcelQuestions />}
                  />
                </Route>

                {/* Events and Testimonials routes */}
                <Route path="events">
                  <Route index element={<ManageTestimonial />} />
                  <Route
                    path="manage-testimonial"
                    element={<ManageTestimonial />}
                  />
                  <Route path="price-list" element={<StudentPriceList />} />
                </Route>

                {/* Manage Class routes */}
                <Route path="class">
                  <Route index element={<ManageClass />} />
                  <Route path="add" element={<AddClass />} />
                  <Route path="manage" element={<ManageClass />} />
                </Route>

                {/* Manage Department routes */}
                <Route path="department">
                  <Route index element={<ManageDepartment />} />
                  <Route path="add" element={<AddDepartment />} />
                  <Route path="manage" element={<ManageDepartment />} />
                </Route>

                {/* Manage Level routes */}
                <Route path="level">
                  <Route index element={<AddLevel />} />
                  <Route path="add" element={<AddLevel />} />
                </Route>

                {/* Manage News routes */}
                <Route path="news">
                  <Route index element={<AddNews />} />
                  <Route path="add" element={<AddNews />} />
                </Route>

                {/* Manage Promotion routes */}
                <Route path="promotion">
                  <Route index element={<RollbackPromotion />} />
                  <Route path="rollback" element={<RollbackPromotion />} />
                </Route>

                {/* Manage Section routes */}
                <Route path="section">
                  <Route index element={<AddSection />} />
                  <Route path="add" element={<AddSection />} />
                </Route>

                {/* Manage Subject routes */}
                <Route path="subject">
                  <Route index element={<AddSubject />} />
                  <Route path="add" element={<AddSubject />} />
                </Route>
              </Route>

              {/* Teacher Routes */}
              <Route path="/teacher" element={<TeacherLayout />}>
                <Route index element={<TeacherDashboard />} />

                {/* Assignment routes */}
                <Route path="assignments/add" element={<AddAssignment />} />
                <Route
                  path="assignments/manage"
                  element={<ManageAssignments />}
                />
                <Route
                  path="assignments/edit/:id"
                  element={<EditAssignment />}
                />
                <Route
                  path="assignments/reports"
                  element={<AssignmentReports />}
                />

                {/* Exam routes */}
                <Route path="exam/add-assessment" element={<AddAssessment />} />
                <Route
                  path="exam/manage-assessment"
                  element={<ManageAssessment />}
                />
                <Route path="exam/edit/:id" element={<EditAssessment />} />
                <Route path="exam/view/:id" element={<ViewAssessment />} />
                <Route
                  path="exam/manage-exam-questions"
                  element={<ManageExamQuestions />}
                />

                {/* Lesson Plan routes */}
                <Route path="lesson-plan/add" element={<AddLessonPlan />} />
                <Route
                  path="lesson-plan/manage"
                  element={<ManageLessonPlans />}
                />
                <Route
                  path="lesson-plan/edit/:id"
                  element={<EditLessonPlan />}
                />

                {/* Quiz routes */}
                <Route path="quiz/add" element={<TeacherAddQuiz />} />
                <Route path="quiz/manage" element={<TeacherManageQuiz />} />
                <Route path="quiz/edit/:id" element={<EditQuiz />} />
                <Route path="quiz/view/:id" element={<ViewQuiz />} />
                <Route
                  path="quiz/results/:id"
                  element={<TeacherQuizResults />}
                />

                {/* Live Classes routes */}
                <Route
                  path="live-classes/schedule"
                  element={<ScheduleLiveClass />}
                />
                <Route
                  path="live-classes/manage"
                  element={<ManageLiveClasses />}
                />

                {/* Other routes */}
                <Route path="timetable" element={<TeacherTimetable />} />
                <Route path="attendance/my" element={<MyAttendance />} />
                <Route path="attendance/leave" element={<LeaveManagement />} />
                <Route
                  path="student-attendance"
                  element={<StudentAttendanceManagement />}
                />

                {/* Result routes */}
                <Route
                  path="result/upload-student"
                  element={<UploadStudentResult />}
                />
                <Route
                  path="result/upload-class"
                  element={<UploadClassResult />}
                />
                <Route path="result/edit" element={<EditClassResult />} />

                {/* Add the new Result Card Settings route */}
                <Route
                  path="result/result-card-settings"
                  element={<TeacherResultCardSettings />}
                />
              </Route>

              {/* Accountant Routes */}
              <Route path="/accountant" element={<AccountantLayout />}>
                <Route index element={<AccountantDashboard />} />

                {/* Payment Routes */}
                <Route
                  path="payments/management"
                  element={<PaymentManagement />}
                />
                <Route
                  path="payments/class-list"
                  element={<ClassPaymentList />}
                />
                <Route path="payments/records" element={<PaymentRecords />} />
                <Route path="payments/methods" element={<PaymentMethods />} />
                <Route path="payments/purpose" element={<PaymentPurpose />} />

                {/* Fee Collection Routes */}
                <Route path="fee-collection/collect" element={<CollectFee />} />
                <Route path="fee-collection/due" element={<FeeDue />} />
                <Route path="fee-collection/reports" element={<DueReports />} />

                {/* Expense Routes */}
                <Route
                  path="expenses/management"
                  element={<ExpenseManagement />}
                />
                <Route
                  path="expenses/petty-cash"
                  element={<PettyCashManagement />}
                />

                {/* Salary Routes */}
                <Route path="salary/pending" element={<PendingSalaries />} />
                <Route path="salary/history" element={<SalaryHistory />} />

                {/* Report Routes */}
                <Route
                  path="reports/collection"
                  element={<CollectionReport />}
                />
                <Route path="reports/expense" element={<ExpenseReport />} />
                <Route
                  path="reports/balance-sheet"
                  element={<BalanceSheet />}
                />
                <Route path="reports/revenue" element={<RevenueAnalytics />} />

                {/* Inventory Routes */}
                <Route
                  path="inventory/stationary"
                  element={<AccountantStationaryInventory />}
                />
                <Route
                  path="inventory/game-equipment"
                  element={<AccountantGameEquipmentInventory />}
                />
                <Route
                  path="inventory/medical-equipment"
                  element={<AccountantMedicalEquipmentInventory />}
                />
                <Route
                  path="inventory/books"
                  element={<AccountantBooksInventory />}
                />

                <Route
                  path="inventory/issues-item"
                  element={<AccountantIssuesItem />}
                />
                {/* <Route path="inventory/add-item-stock" element={<AccountantAddItemStock />} />
									<Route path="inventory/add-item" element={<AccountantAddItem />} /> */}
              </Route>

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
                  {
                    path: routes.userResetPassword,
                    element: <ResetPassword />,
                  },
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
                {
                  path: routes.manageTestimony,
                  element: <ManageTestimonials />,
                },
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
      {/* </Router> */}
    </HelmetProvider>
  );
};

export default App;
