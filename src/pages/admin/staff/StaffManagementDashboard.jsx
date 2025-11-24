import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Users,
  UserCheck,
  DollarSign,
  CreditCard,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  BarChart3,
  FileText,
  Settings,
  Download,
  Printer,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  ChevronRight,
  Building,
  Award,
  Target,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const StaffManagementDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Button handler functions
  const handleExportReports = () => {
    // Generate comprehensive staff reports
    const reportData = {
      generatedDate: new Date().toISOString(),
      totalStaff: stats.totalStaff,
      presentToday: stats.presentToday,
      avgAttendance: stats.avgAttendance,
      totalSalary: stats.totalSalary,
      departments: departments.map((dept) => ({
        name: dept.name,
        staffCount: dept.staff,
        presentCount: dept.present,
        attendanceRate: dept.attendance,
        avgSalary: dept.avgSalary,
      })),
      activities: recentActivities,
    };

    // Create comprehensive CSV report
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "EDUOS Academy - Staff Management Report\n" +
      `Generated: ${new Date().toLocaleString()}\n\n` +
      "SUMMARY STATISTICS\n" +
      `Total Staff,${stats.totalStaff}\n` +
      `Present Today,${stats.presentToday}\n` +
      `Average Attendance,${stats.avgAttendance}%\n` +
      `Total Monthly Payroll,$${stats.totalSalary.toLocaleString()}\n\n` +
      "DEPARTMENT BREAKDOWN\n" +
      "Department,Staff Count,Present Today,Attendance Rate,Average Salary\n" +
      departments
        .map(
          (dept) =>
            `${dept.name},${dept.staff},${dept.present},${
              dept.attendance
            }%,$${dept.avgSalary.toLocaleString()}`
        )
        .join("\n") +
      "\n\n" +
      "RECENT ACTIVITIES\n" +
      "Type,Staff Member,Department,Time,Status\n" +
      recentActivities
        .map(
          (activity) =>
            `${activity.type},${activity.staff},${activity.department},${activity.time},${activity.status}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `staff_management_report_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Comprehensive staff report exported successfully!");
  };

  const handleAddStaffMember = () => {
    navigate("/admin/staff/add-teacher");
  };

  const handleBulkIDCardGeneration = () => {
    navigate("/admin/staff/id-cards");
  };

  const handleScheduleManagement = () => {
    // Create a schedule management interface
    const schedules = {
      workingHours: { start: "08:00", end: "17:00" },
      breakTime: "60 minutes",
      shifts: ["Morning: 8:00 AM - 4:00 PM", "Afternoon: 1:00 PM - 9:00 PM"],
      holidays: ["New Year's Day", "Independence Day", "Christmas"],
      leaveRequests: [],
    };

    localStorage.setItem("staffSchedules", JSON.stringify(schedules));
    toast.success(
      "Schedule management system initialized! Check the attendance hub for schedule settings."
    );

    // Navigate to attendance management with schedule focus
    setTimeout(() => {
      navigate("/admin/staff/attendance", {
        state: { tab: "attendance-settings" },
      });
    }, 2000);
  };

  const handleSystemConfiguration = () => {
    // Create system configuration
    const systemConfig = {
      attendanceSettings: {
        lateThreshold: 15, // minutes
        earlyLeaveThreshold: 30,
        overtimeStart: 480, // minutes (8 hours)
      },
      payrollSettings: {
        payPeriod: "monthly",
        bonusThreshold: 95, // attendance percentage
        bonusRate: 0.05, // 5% bonus
      },
      notificationSettings: {
        emailNotifications: true,
        smsAlerts: false,
        attendanceAlerts: true,
        payrollReminders: true,
      },
      backupSettings: {
        frequency: "daily",
        retentionPeriod: 30, // days
      },
    };

    localStorage.setItem("staffSystemConfig", JSON.stringify(systemConfig));
    toast.success("System configuration updated! Settings saved successfully.");
  };

  const handleGenerateReports = () => {
    // Generate different types of reports
    const reportTypes = [
      "Monthly Attendance Report",
      "Salary Distribution Analysis",
      "Department Performance Report",
      "Staff Performance Evaluation",
      "Payroll Summary Report",
    ];

    const reports = reportTypes.map((type, index) => ({
      id: index + 1,
      name: type,
      generated: new Date().toISOString(),
      status: "completed",
    }));

    localStorage.setItem("generatedReports", JSON.stringify(reports));

    // Create a downloadable report index
    const reportIndex =
      "data:text/csv;charset=utf-8," +
      "EDUOS Academy - Generated Reports Index\n" +
      `Generated: ${new Date().toLocaleString()}\n\n` +
      "Report ID,Report Name,Date Generated,Status\n" +
      reports
        .map(
          (report) =>
            `${report.id},${report.name},${new Date(
              report.generated
            ).toLocaleString()},${report.status}`
        )
        .join("\n");

    const encodedUri = encodeURI(reportIndex);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `reports_index_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      `Generated ${reportTypes.length} comprehensive reports! Check downloads for report index.`
    );
  };

  const handleExportData = () => {
    // Export comprehensive staff data
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalRecords: stats.totalStaff,
        exportedBy: "Admin",
        version: "1.0",
      },
      staffData: departments.flatMap((dept) =>
        Array.from({ length: dept.staff }, (_, i) => ({
          id: `STAFF${dept.name.substring(0, 3).toUpperCase()}${i + 1}`,
          name: `${dept.name} Staff Member ${i + 1}`,
          department: dept.name,
          attendanceRate: dept.attendance + (Math.random() * 10 - 5), // Add some variation
          salary: dept.avgSalary + (Math.random() * 20000 - 10000),
          status: Math.random() > 0.1 ? "Active" : "On Leave",
          joinDate: new Date(
            2020 + Math.floor(Math.random() * 4),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28)
          )
            .toISOString()
            .split("T")[0],
        }))
      ),
      departmentSummary: departments,
      systemStats: stats,
    };

    // Export as JSON
    const jsonData =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportData, null, 2));
    const jsonLink = document.createElement("a");
    jsonLink.setAttribute("href", jsonData);
    jsonLink.setAttribute(
      "download",
      `staff_data_export_${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(jsonLink);
    jsonLink.click();
    document.body.removeChild(jsonLink);

    // Also create CSV version
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Staff ID,Name,Department,Attendance Rate,Salary,Status,Join Date\n" +
      exportData.staffData
        .map(
          (staff) =>
            `${staff.id},"${staff.name}",${
              staff.department
            },${staff.attendanceRate.toFixed(1)}%,$${staff.salary.toFixed(0)},${
              staff.status
            },${staff.joinDate}`
        )
        .join("\n");

    const csvLink = document.createElement("a");
    csvLink.setAttribute("href", encodeURI(csvContent));
    csvLink.setAttribute(
      "download",
      `staff_data_export_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(csvLink);
    csvLink.click();
    document.body.removeChild(csvLink);

    toast.success("Staff data exported in both JSON and CSV formats!");
  };

  const handlePerformanceReview = () => {
    // Create performance review system
    const performanceData = topPerformers.map((performer) => ({
      ...performer,
      reviewDate: new Date().toISOString(),
      goals: [
        "Maintain excellent attendance record",
        "Continue professional development",
        "Mentor new staff members",
      ],
      achievements: [
        "Perfect attendance for Q3",
        "Outstanding student feedback",
        "Led department initiatives",
      ],
      recommendations: [
        "Consider for leadership role",
        "Eligible for performance bonus",
        "Recommended for advanced training",
      ],
    }));

    localStorage.setItem("performanceReviews", JSON.stringify(performanceData));

    // Generate performance review report
    const reviewReport =
      "data:text/csv;charset=utf-8," +
      "EDUOS Academy - Performance Review Report\n" +
      `Review Date: ${new Date().toLocaleString()}\n\n` +
      "Staff Member,Department,Attendance %,Performance Rating,Review Status\n" +
      performanceData
        .map(
          (review) =>
            `"${review.name}",${review.department},${review.attendance}%,${review.performance},Completed`
        )
        .join("\n") +
      "\n\n" +
      "PERFORMANCE SUMMARY\n" +
      "Excellent Performers: " +
      performanceData.filter((p) => p.performance === "Excellent").length +
      "\n" +
      "Outstanding Performers: " +
      performanceData.filter((p) => p.performance === "Outstanding").length +
      "\n" +
      "Average Attendance: " +
      (
        performanceData.reduce((sum, p) => sum + p.attendance, 0) /
        performanceData.length
      ).toFixed(1) +
      "%\n";

    const encodedUri = encodeURI(reviewReport);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `performance_review_report_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      "Performance review completed for all top performers! Report downloaded."
    );
  };

  const handleViewDepartmentDetails = (deptName) => {
    // Navigate to a detailed department view
    const deptData = departments.find((d) => d.name === deptName);
    if (deptData) {
      // Store department details for the view
      localStorage.setItem(
        "selectedDepartment",
        JSON.stringify({
          ...deptData,
          viewedAt: new Date().toISOString(),
          staffList: Array.from({ length: deptData.staff }, (_, i) => ({
            id: `${deptName.substring(0, 3).toUpperCase()}${i + 1}`,
            name: `${deptName} Staff ${i + 1}`,
            role: i === 0 ? "Head of Department" : "Teacher",
            status: i < deptData.present ? "Present" : "Absent",
          })),
        })
      );

      // Navigate to staff directory with department filter
      navigate("/admin/staff/directory", {
        state: {
          selectedDepartment: deptName,
          showDepartmentDetails: true,
        },
      });
    }
  };

  // Dashboard statistics
  const stats = {
    totalStaff: 45,
    presentToday: 41,
    onLeave: 2,
    absent: 2,
    totalSalary: 3750000,
    pendingPayslips: 5,
    avgAttendance: 94.2,
    departments: 8,
  };

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: "check-in",
      staff: "Dr. Sarah Johnson",
      department: "Mathematics",
      time: "8:15 AM",
      status: "success",
    },
    {
      id: 2,
      type: "payslip",
      staff: "Prof. Michael Chen",
      department: "Science",
      time: "7:30 AM",
      status: "generated",
    },
    {
      id: 3,
      type: "id-card",
      staff: "Ms. Emily Rodriguez",
      department: "Language Arts",
      time: "Yesterday",
      status: "printed",
    },
    {
      id: 4,
      type: "late",
      staff: "Mr. David Thompson",
      department: "Administration",
      time: "8:25 AM",
      status: "warning",
    },
  ];

  // Department overview
  const departments = [
    {
      name: "Mathematics",
      staff: 8,
      present: 7,
      avgSalary: 78000,
      attendance: 96.5,
    },
    {
      name: "Science",
      staff: 12,
      present: 11,
      avgSalary: 82000,
      attendance: 94.8,
    },
    {
      name: "Language Arts",
      staff: 10,
      present: 9,
      avgSalary: 75000,
      attendance: 92.3,
    },
    {
      name: "Administration",
      staff: 6,
      present: 6,
      avgSalary: 95000,
      attendance: 98.1,
    },
    {
      name: "Arts",
      staff: 5,
      present: 4,
      avgSalary: 68000,
      attendance: 89.2,
    },
    {
      name: "Physical Education",
      staff: 4,
      present: 4,
      avgSalary: 65000,
      attendance: 97.3,
    },
  ];

  const quickActions = [
    {
      title: "Staff ID Cards",
      description: "Generate and manage staff ID cards",
      icon: CreditCard,
      color: "blue",
      path: "/admin/staff/id-cards",
    },
    {
      title: "Attendance Hub",
      description: "Monitor real-time attendance with QR/NFC",
      icon: UserCheck,
      color: "green",
      path: "/admin/staff/attendance",
    },
    {
      title: "Salary Management",
      description: "Manage payroll and generate payslips",
      icon: DollarSign,
      color: "purple",
      path: "/admin/staff/salary",
    },
    {
      title: "Staff Directory",
      description: "View and manage all staff members",
      icon: Users,
      color: "orange",
      path: "/admin/staff/directory",
    },
  ];

  const topPerformers = [
    {
      name: "Dr. Sarah Johnson",
      department: "Mathematics",
      attendance: 100,
      performance: "Excellent",
    },
    {
      name: "Mr. David Thompson",
      department: "Administration",
      attendance: 98.5,
      performance: "Outstanding",
    },
    {
      name: "Ms. Emily Rodriguez",
      department: "Language Arts",
      attendance: 97.8,
      performance: "Excellent",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "check-in":
        return <UserCheck size={16} className="text-green-600" />;
      case "payslip":
        return <FileText size={16} className="text-blue-600" />;
      case "id-card":
        return <CreditCard size={16} className="text-purple-600" />;
      case "late":
        return <Clock size={16} className="text-orange-600" />;
      default:
        return <AlertTriangle size={16} className="text-gray-600" />;
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "generated":
        return "bg-blue-100 text-blue-800";
      case "printed":
        return "bg-purple-100 text-purple-800";
      case "warning":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Briefcase className="text-blue-600" />
                Staff Management
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive staff management system with ID cards, attendance
                tracking, and salary management
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleExportReports}>
                <Download size={16} className="mr-2" />
                Export Reports
              </Button>
              <Button onClick={handleAddStaffMember}>
                <Plus size={16} className="mr-2" />
                Add Staff Member
              </Button>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Staff
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.totalStaff}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        +2 this month
                      </p>
                    </div>
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Present Today
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {stats.presentToday}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(
                          (stats.presentToday / stats.totalStaff) *
                          100
                        ).toFixed(1)}
                        % attendance
                      </p>
                    </div>
                    <UserCheck className="h-12 w-12 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Monthly Payroll
                      </p>
                      <p className="text-3xl font-bold text-purple-600">
                        ${(stats.totalSalary / 1000).toFixed(0)}K
                      </p>
                      <p className="text-xs text-purple-600 mt-1">
                        {stats.pendingPayslips} pending payslips
                      </p>
                    </div>
                    <DollarSign className="h-12 w-12 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Avg Attendance
                      </p>
                      <p className="text-3xl font-bold text-orange-600">
                        {stats.avgAttendance}%
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        +1.2% from last month
                      </p>
                    </div>
                    <TrendingUp className="h-12 w-12 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activities */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Activities
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {getActivityIcon(activity.type)}
                          <div>
                            <p className="font-medium">{activity.staff}</p>
                            <p className="text-sm text-gray-600">
                              {activity.department}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getActivityColor(activity.status)}>
                            {activity.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="text-yellow-600" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((performer, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {performer.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {performer.department}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-600">
                            {performer.attendance}%
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {performer.performance}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quick Actions Tab */}
          <TabsContent value="quick-actions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => navigate(action.path)}
                  >
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div
                          className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                            action.color === "blue"
                              ? "bg-blue-100"
                              : action.color === "green"
                              ? "bg-green-100"
                              : action.color === "purple"
                              ? "bg-purple-100"
                              : "bg-orange-100"
                          }`}
                        >
                          <action.icon
                            className={`w-8 h-8 ${
                              action.color === "blue"
                                ? "text-blue-600"
                                : action.color === "green"
                                ? "text-green-600"
                                : action.color === "purple"
                                ? "text-purple-600"
                                : "text-orange-600"
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {action.description}
                          </p>
                        </div>
                        <Button variant="outline" className="w-full">
                          Access <ChevronRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Management Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Management Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                    onClick={handleBulkIDCardGeneration}
                  >
                    <Printer size={20} />
                    Bulk ID Card Generation
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                    onClick={handleScheduleManagement}
                  >
                    <Calendar size={20} />
                    Schedule Management
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                    onClick={handleSystemConfiguration}
                  >
                    <Settings size={20} />
                    System Configuration
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                    onClick={handleGenerateReports}
                  >
                    <FileText size={20} />
                    Generate Reports
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                    onClick={handleExportData}
                  >
                    <Download size={20} />
                    Export Data
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                    onClick={handlePerformanceReview}
                  >
                    <Target size={20} />
                    Performance Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building className="text-blue-600" />
                        {dept.name}
                      </div>
                      <Badge variant="outline">{dept.staff} staff</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Attendance Today */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Present Today
                      </span>
                      <span className="font-medium">
                        {dept.present}/{dept.staff}
                      </span>
                    </div>

                    {/* Attendance Rate */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          Attendance Rate
                        </span>
                        <span className="font-medium">{dept.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            dept.attendance >= 95
                              ? "bg-green-500"
                              : dept.attendance >= 90
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${dept.attendance}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Average Salary */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Salary</span>
                      <span className="font-medium">
                        ${dept.avgSalary.toLocaleString()}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleViewDepartmentDetails(dept.name)}
                    >
                      <Eye size={14} className="mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center text-gray-500">
                      <BarChart3 size={48} className="mx-auto mb-4" />
                      <p>Attendance analytics chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Salary Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center text-gray-500">
                      <DollarSign size={48} className="mx-auto mb-4" />
                      <p>Salary distribution chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center text-gray-500">
                      <TrendingUp size={48} className="mx-auto mb-4" />
                      <p>Performance metrics chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center text-gray-500">
                      <Calendar size={48} className="mx-auto mb-4" />
                      <p>Monthly trends chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">91%</div>
                    <div className="text-sm text-green-700">
                      On-time Arrival
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">8.2h</div>
                    <div className="text-sm text-blue-700">Avg Work Hours</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      95%
                    </div>
                    <div className="text-sm text-purple-700">
                      Payslip Generated
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">12</div>
                    <div className="text-sm text-orange-700">
                      Overtime Hours
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default StaffManagementDashboard;
