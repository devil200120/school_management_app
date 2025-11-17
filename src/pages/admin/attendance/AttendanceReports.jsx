import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  TrendingUp,
  Users,
  ArrowLeft,
  Download,
  Filter,
  FileSpreadsheet,
  Printer,
  CheckCircle,
  XCircle,
  AlertTriangle,
  PieChart,
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

const AttendanceReports = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("week");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [reportType, setReportType] = useState("summary");

  // Sample attendance data for reports
  const [attendanceData] = useState({
    summary: {
      totalStaff: 45,
      presentToday: 38,
      absentToday: 7,
      lateToday: 12,
      weeklyAttendanceRate: 94.2,
      monthlyAttendanceRate: 92.8,
      improvementFromLastMonth: 2.4,
    },
    methodUsage: {
      facialRecognition: { count: 134, percentage: 42.1 },
      manualLog: { count: 89, percentage: 28.0 },
      qrCode: { count: 67, percentage: 21.1 },
      nfcTap: { count: 28, percentage: 8.8 },
    },
    departmentStats: [
      { name: "Mathematics", total: 8, present: 7, absent: 1, rate: 87.5 },
      { name: "English", total: 6, present: 6, absent: 0, rate: 100.0 },
      { name: "Science", total: 10, present: 8, absent: 2, rate: 80.0 },
      { name: "Administration", total: 12, present: 10, absent: 2, rate: 83.3 },
      {
        name: "Physical Education",
        total: 5,
        present: 4,
        absent: 1,
        rate: 80.0,
      },
      { name: "Arts", total: 4, present: 3, absent: 1, rate: 75.0 },
    ],
    weeklyTrend: [
      { day: "Monday", present: 42, absent: 3, rate: 93.3 },
      { day: "Tuesday", present: 41, absent: 4, rate: 91.1 },
      { day: "Wednesday", present: 43, absent: 2, rate: 95.6 },
      { day: "Thursday", present: 40, absent: 5, rate: 88.9 },
      { day: "Friday", present: 38, absent: 7, rate: 84.4 },
    ],
    individualReports: [
      {
        staffId: "TCH001",
        name: "John Doe",
        department: "Mathematics",
        totalDays: 22,
        present: 20,
        absent: 2,
        late: 3,
        avgCheckIn: "08:18",
        attendanceRate: 90.9,
      },
      {
        staffId: "TCH002",
        name: "Sarah Johnson",
        department: "English",
        totalDays: 22,
        present: 22,
        absent: 0,
        late: 1,
        avgCheckIn: "08:12",
        attendanceRate: 100.0,
      },
      {
        staffId: "TCH003",
        name: "Michael Brown",
        department: "Science",
        totalDays: 22,
        present: 18,
        absent: 4,
        late: 2,
        avgCheckIn: "08:25",
        attendanceRate: 81.8,
      },
    ],
  });

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    setEndDate(today.toISOString().split("T")[0]);
    setStartDate(weekAgo.toISOString().split("T")[0]);
  }, []);

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

    const reportData = getReportData();

    switch (format) {
      case "csv":
        content = generateCSV(reportData);
        filename = `attendance_report_${reportType}_${
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

  const generateCSV = (data) => {
    switch (reportType) {
      case "summary":
        return [
          ["Metric", "Value"],
          ["Total Staff", data.summary.totalStaff],
          ["Present Today", data.summary.presentToday],
          ["Absent Today", data.summary.absentToday],
          ["Late Today", data.summary.lateToday],
          ["Weekly Attendance Rate", `${data.summary.weeklyAttendanceRate}%`],
          ["Monthly Attendance Rate", `${data.summary.monthlyAttendanceRate}%`],
        ]
          .map((row) => row.join(","))
          .join("\n");
      case "individual":
        return [
          [
            "Staff ID",
            "Name",
            "Department",
            "Total Days",
            "Present",
            "Absent",
            "Late",
            "Avg Check-in",
            "Attendance Rate",
          ],
          ...data.individualReports.map((staff) => [
            staff.staffId,
            staff.name,
            staff.department,
            staff.totalDays,
            staff.present,
            staff.absent,
            staff.late,
            staff.avgCheckIn,
            `${staff.attendanceRate}%`,
          ]),
        ]
          .map((row) => row.join(","))
          .join("\n");
      case "department":
        return [
          ["Department", "Total Staff", "Present", "Absent", "Attendance Rate"],
          ...data.departmentStats.map((dept) => [
            dept.name,
            dept.total,
            dept.present,
            dept.absent,
            `${dept.rate}%`,
          ]),
        ]
          .map((row) => row.join(","))
          .join("\n");
      default:
        return "";
    }
  };

  const getReportData = () => {
    // In a real application, this would filter data based on date range and department
    return attendanceData;
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

  const printReport = () => {
    window.print();
    toast.info("Print dialog opened", {
      icon: <Printer className="h-4 w-4" />,
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/attendance/staff")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Hub
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in flex items-center gap-3">
              <BarChart3 className="h-8 w-8" />
              Attendance Reports & Analytics
            </h2>
            <p className="text-muted-foreground mt-1">
              Comprehensive attendance insights and reporting
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
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="individual">Individual Report</SelectItem>
                  <SelectItem value="department">Department Report</SelectItem>
                  <SelectItem value="trends">Trends Analysis</SelectItem>
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
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={dateRange !== "custom"}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={dateRange !== "custom"}
              />
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
          </div>
        </CardContent>
      </Card>

      {/* Reports Content */}
      <Tabs
        value={reportType}
        onValueChange={setReportType}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="department">Department</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Summary Report */}
        <TabsContent value="summary" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Staff
                    </p>
                    <p className="text-3xl font-bold text-eduos-primary">
                      {attendanceData.summary.totalStaff}
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
                      Present Today
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {attendanceData.summary.presentToday}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Absent Today
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {attendanceData.summary.absentToday}
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Attendance Rate
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {attendanceData.summary.weeklyAttendanceRate}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Method Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Attendance Method Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {attendanceData.methodUsage.facialRecognition.count}
                  </div>
                  <div className="text-sm text-gray-600">
                    Facial Recognition
                  </div>
                  <div className="text-xs text-orange-600 font-medium">
                    {attendanceData.methodUsage.facialRecognition.percentage}%
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {attendanceData.methodUsage.manualLog.count}
                  </div>
                  <div className="text-sm text-gray-600">Manual Log</div>
                  <div className="text-xs text-blue-600 font-medium">
                    {attendanceData.methodUsage.manualLog.percentage}%
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {attendanceData.methodUsage.qrCode.count}
                  </div>
                  <div className="text-sm text-gray-600">QR Code</div>
                  <div className="text-xs text-green-600 font-medium">
                    {attendanceData.methodUsage.qrCode.percentage}%
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {attendanceData.methodUsage.nfcTap.count}
                  </div>
                  <div className="text-sm text-gray-600">NFC Tap</div>
                  <div className="text-xs text-purple-600 font-medium">
                    {attendanceData.methodUsage.nfcTap.percentage}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Individual Report */}
        <TabsContent value="individual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Staff Attendance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Avg Check-in</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.individualReports.map((staff) => (
                    <TableRow key={staff.staffId}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-sm text-gray-500">
                            {staff.staffId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {staff.present}
                      </TableCell>
                      <TableCell className="text-red-600 font-medium">
                        {staff.absent}
                      </TableCell>
                      <TableCell className="text-yellow-600 font-medium">
                        {staff.late}
                      </TableCell>
                      <TableCell>{staff.avgCheckIn}</TableCell>
                      <TableCell
                        className={`font-bold ${getAttendanceRateColor(
                          staff.attendanceRate
                        )}`}
                      >
                        {staff.attendanceRate}%
                      </TableCell>
                      <TableCell>
                        {getAttendanceRateBadge(staff.attendanceRate)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Department Report */}
        <TabsContent value="department" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Attendance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attendanceData.departmentStats.map((dept) => (
                  <Card
                    key={dept.name}
                    className="border-l-4 border-l-eduos-primary"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{dept.name}</h3>
                          <Badge variant="outline">{dept.total} staff</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-lg font-bold text-green-600">
                              {dept.present}
                            </p>
                            <p className="text-xs text-gray-500">Present</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-red-600">
                              {dept.absent}
                            </p>
                            <p className="text-xs text-gray-500">Absent</p>
                          </div>
                          <div>
                            <p
                              className={`text-lg font-bold ${getAttendanceRateColor(
                                dept.rate
                              )}`}
                            >
                              {dept.rate}%
                            </p>
                            <p className="text-xs text-gray-500">Rate</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-eduos-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${dept.rate}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Analysis */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Weekly Attendance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.weeklyTrend.map((day) => (
                  <div
                    key={day.day}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-sm font-medium">{day.day}</div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">
                            Present: {day.present}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Absent: {day.absent}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-eduos-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${day.rate}%` }}
                        ></div>
                      </div>
                      <span
                        className={`font-semibold ${getAttendanceRateColor(
                          day.rate
                        )}`}
                      >
                        {day.rate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-medium text-green-800 mb-1">
                    Positive Trends
                  </h4>
                  <p className="text-sm text-green-700">
                    Overall attendance has improved by{" "}
                    {attendanceData.summary.improvementFromLastMonth}% compared
                    to last month. English department maintains perfect
                    attendance.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-medium text-yellow-800 mb-1">
                    Areas for Improvement
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Friday attendance tends to be lower (84.4%). Consider
                    implementing Friday engagement initiatives to improve
                    end-of-week attendance.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-medium text-blue-800 mb-1">
                    Method Efficiency
                  </h4>
                  <p className="text-sm text-blue-700">
                    Facial recognition is the most popular method (42.1%).
                    Consider expanding NFC infrastructure as it currently has
                    the lowest usage (8.8%).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceReports;
