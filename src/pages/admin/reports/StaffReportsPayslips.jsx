import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  BarChart3,
  Users,
  ArrowLeft,
  Download,
  Filter,
  FileSpreadsheet,
  FileText,
  Printer,
  DollarSign,
  Calendar,
  Eye,
  UserCheck,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const StaffReportsPayslips = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect if we're in admin or accountant context
  const isAccountantView = location.pathname.includes("/accountant/");
  const baseRoute = isAccountantView ? "/accountant" : "/admin";

  const [dateRange, setDateRange] = useState("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState("all");
  const [reportType, setReportType] = useState("combined");

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    setEndDate(today.toISOString().split("T")[0]);
    setStartDate(monthAgo.toISOString().split("T")[0]);
  }, []);

  // Sample data for reports
  const [reportsData] = useState({
    summary: {
      totalStaff: 45,
      totalSalaryPaid: 2850000, // Naira
      averageAttendanceRate: 92.8,
      totalWorkingDays: 22,
      totalAbsences: 18,
      totalDeductions: 125000,
      totalBonuses: 85000,
    },
    staffData: [
      {
        id: "TCH001",
        name: "John Doe",
        department: "Mathematics",
        position: "Senior Teacher",
        basicSalary: 85000,
        allowances: 25000,
        bonuses: 5000,
        deductions: 8500,
        netSalary: 106500,
        workingDays: 22,
        presentDays: 20,
        absentDays: 2,
        attendanceRate: 90.9,
        overtime: 2.5,
        lateCount: 1,
      },
      {
        id: "TCH002",
        name: "Sarah Johnson",
        department: "English",
        position: "Head Teacher",
        basicSalary: 95000,
        allowances: 30000,
        bonuses: 8000,
        deductions: 9500,
        netSalary: 123500,
        workingDays: 22,
        presentDays: 22,
        absentDays: 0,
        attendanceRate: 100.0,
        overtime: 4.0,
        lateCount: 0,
      },
      {
        id: "TCH003",
        name: "Michael Brown",
        department: "Science",
        position: "Teacher",
        basicSalary: 75000,
        allowances: 20000,
        bonuses: 3000,
        deductions: 7500,
        netSalary: 90500,
        workingDays: 22,
        presentDays: 18,
        absentDays: 4,
        attendanceRate: 81.8,
        overtime: 0,
        lateCount: 3,
      },
      {
        id: "ACC001",
        name: "Lisa Wilson",
        department: "Administration",
        position: "Senior Accountant",
        basicSalary: 90000,
        allowances: 25000,
        bonuses: 7000,
        deductions: 9000,
        netSalary: 113000,
        workingDays: 22,
        presentDays: 21,
        absentDays: 1,
        attendanceRate: 95.5,
        overtime: 3.5,
        lateCount: 0,
      },
    ],
    departmentSummary: [
      {
        department: "Mathematics",
        staffCount: 8,
        totalSalary: 720000,
        avgAttendance: 87.5,
        totalDeductions: 28000,
        totalBonuses: 20000,
      },
      {
        department: "English",
        staffCount: 6,
        totalSalary: 690000,
        avgAttendance: 95.2,
        totalDeductions: 18500,
        totalBonuses: 25000,
      },
      {
        department: "Science",
        staffCount: 10,
        totalSalary: 820000,
        avgAttendance: 89.1,
        totalDeductions: 35000,
        totalBonuses: 18000,
      },
      {
        department: "Administration",
        staffCount: 12,
        totalSalary: 980000,
        avgAttendance: 93.8,
        totalDeductions: 42500,
        totalBonuses: 22000,
      },
    ],
  });

  const departments = [
    "Mathematics",
    "English",
    "Science",
    "Administration",
    "Physical Education",
    "Arts",
  ];

  const exportReport = (format) => {
    let content = "";
    let filename = "";
    let mimeType = "";

    switch (format) {
      case "csv":
        content = generateCSV();
        filename = `staff_reports_${reportType}_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        mimeType = "text/csv";
        break;
      case "pdf":
        toast.info("PDF generation is in development");
        return;
      case "excel":
        toast.info("Excel export is in development");
        return;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`${format.toUpperCase()} Report Exported`, {
      description: "Report has been downloaded successfully.",
      icon: <Download className="h-4 w-4" />,
    });
  };

  const generateCSV = () => {
    const headers = [
      "Staff ID",
      "Name",
      "Department",
      "Position",
      "Basic Salary",
      "Allowances",
      "Bonuses",
      "Deductions",
      "Net Salary",
      "Working Days",
      "Present Days",
      "Absent Days",
      "Attendance Rate",
      "Overtime Hours",
      "Late Count",
    ];

    const rows = reportsData.staffData.map((staff) => [
      staff.id,
      staff.name,
      staff.department,
      staff.position,
      `₦${staff.basicSalary.toLocaleString()}`,
      `₦${staff.allowances.toLocaleString()}`,
      `₦${staff.bonuses.toLocaleString()}`,
      `₦${staff.deductions.toLocaleString()}`,
      `₦${staff.netSalary.toLocaleString()}`,
      staff.workingDays,
      staff.presentDays,
      staff.absentDays,
      `${staff.attendanceRate}%`,
      staff.overtime,
      staff.lateCount,
    ]);

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };

  const printReport = () => {
    window.print();
    toast.info("Print dialog opened", {
      icon: <Printer className="h-4 w-4" />,
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getAttendanceRateColor = (rate) => {
    if (rate >= 95) return "text-green-600";
    if (rate >= 85) return "text-blue-600";
    if (rate >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceRateBadge = (rate) => {
    if (rate >= 95)
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (rate >= 85)
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    if (rate >= 75)
      return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`${baseRoute}/dashboard`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in flex items-center gap-3">
              <BarChart3 className="h-8 w-8" />
              Staff Reports & Payslips
            </h2>
            <p className="text-muted-foreground mt-1">
              Comprehensive attendance and salary reporting system
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={printReport}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button
            onClick={() => exportReport("csv")}
            className="bg-green-600 hover:bg-green-700"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Staff
                </p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {reportsData.summary.totalStaff}
                </p>
              </div>
              <Users className="h-8 w-8 text-eduos-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Salary Paid
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(reportsData.summary.totalSalaryPaid)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Attendance
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {reportsData.summary.averageAttendanceRate}%
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Working Days
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {reportsData.summary.totalWorkingDays}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Report Type
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="combined">Combined Report</SelectItem>
                  <SelectItem value="attendance">Attendance Only</SelectItem>
                  <SelectItem value="salary">Salary Only</SelectItem>
                  <SelectItem value="department">Department Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Date Range
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Department
              </label>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Staff Member
              </label>
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Staff</SelectItem>
                  {reportsData.staffData.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {dateRange === "custom" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reports Content */}
      <Tabs
        value={reportType}
        onValueChange={setReportType}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="combined">Combined</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
          <TabsTrigger value="department">Department</TabsTrigger>
        </TabsList>

        {/* Combined Report */}
        <TabsContent value="combined" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staff Combined Report - Attendance & Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportsData.staffData.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-sm text-gray-500">{staff.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>{staff.department}</TableCell>
                        <TableCell>{staff.position}</TableCell>
                        <TableCell className="font-medium text-green-600">
                          {formatCurrency(staff.netSalary)}
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <p
                              className={`font-bold ${getAttendanceRateColor(
                                staff.attendanceRate
                              )}`}
                            >
                              {staff.attendanceRate}%
                            </p>
                            <p className="text-xs text-gray-500">
                              {staff.presentDays}/{staff.workingDays} days
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getAttendanceRateBadge(staff.attendanceRate)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                navigate(
                                  `${baseRoute}/staff/payslip/${staff.id}`
                                )
                              }
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              onClick={() =>
                                navigate(
                                  `${baseRoute}/staff/reports/detailed/${staff.id}`
                                )
                              }
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Report */}
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Attendance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Working Days</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Late</TableHead>
                      <TableHead>Overtime</TableHead>
                      <TableHead>Attendance Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportsData.staffData.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-sm text-gray-500">{staff.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>{staff.department}</TableCell>
                        <TableCell>{staff.workingDays}</TableCell>
                        <TableCell className="text-green-600 font-medium">
                          {staff.presentDays}
                        </TableCell>
                        <TableCell className="text-red-600 font-medium">
                          {staff.absentDays}
                        </TableCell>
                        <TableCell className="text-yellow-600 font-medium">
                          {staff.lateCount}
                        </TableCell>
                        <TableCell className="text-blue-600 font-medium">
                          {staff.overtime}h
                        </TableCell>
                        <TableCell
                          className={`font-bold ${getAttendanceRateColor(
                            staff.attendanceRate
                          )}`}
                        >
                          {staff.attendanceRate}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salary Report */}
        <TabsContent value="salary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Salary Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Allowances</TableHead>
                      <TableHead>Bonuses</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportsData.staffData.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-sm text-gray-500">
                              {staff.department}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(staff.basicSalary)}
                        </TableCell>
                        <TableCell className="text-blue-600">
                          {formatCurrency(staff.allowances)}
                        </TableCell>
                        <TableCell className="text-green-600">
                          {formatCurrency(staff.bonuses)}
                        </TableCell>
                        <TableCell className="text-red-600">
                          -{formatCurrency(staff.deductions)}
                        </TableCell>
                        <TableCell className="font-bold text-green-600 text-lg">
                          {formatCurrency(staff.netSalary)}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() =>
                              navigate(`${baseRoute}/staff/payslip/${staff.id}`)
                            }
                          >
                            <CreditCard className="h-4 w-4 mr-1" />
                            Payslip
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Department Summary */}
        <TabsContent value="department" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Summary Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportsData.departmentSummary.map((dept) => (
                  <Card
                    key={dept.department}
                    className="border-l-4 border-l-eduos-primary"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">
                            {dept.department}
                          </h3>
                          <Badge variant="outline">
                            {dept.staffCount} staff
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">
                              {formatCurrency(dept.totalSalary)}
                            </p>
                            <p className="text-sm text-gray-600">
                              Total Salary
                            </p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">
                              {dept.avgAttendance}%
                            </p>
                            <p className="text-sm text-gray-600">
                              Avg Attendance
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <p className="text-lg font-bold text-red-600">
                              {formatCurrency(dept.totalDeductions)}
                            </p>
                            <p className="text-sm text-gray-600">Deductions</p>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <p className="text-lg font-bold text-yellow-600">
                              {formatCurrency(dept.totalBonuses)}
                            </p>
                            <p className="text-sm text-gray-600">Bonuses</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffReportsPayslips;
