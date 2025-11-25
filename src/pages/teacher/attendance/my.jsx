import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Clock,
  CreditCard,
  QrCode,
  Camera,
  DollarSign,
  FileText,
  Download,
  Timer,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  TrendingUp,
  Play,
  Square,
  Radio,
  Smartphone,
  Eye,
  Printer,
  BarChart3,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

// Enhanced sample attendance data with more details
const attendanceRecords = [
  {
    id: "1",
    date: "2025-11-25",
    status: "present",
    checkInTime: "08:15",
    checkOutTime: "16:30",
    hours: 8.25,
    method: "nfc",
    overtime: 0.25,
  },
  {
    id: "2",
    date: "2025-11-24",
    status: "present",
    checkInTime: "08:10",
    checkOutTime: "16:25",
    hours: 8.25,
    method: "face",
    overtime: 0.25,
  },
  {
    id: "3",
    date: "2025-11-23",
    status: "present",
    checkInTime: "08:20",
    checkOutTime: "16:40",
    hours: 8.33,
    method: "qr",
    overtime: 0.33,
  },
  {
    id: "4",
    date: "2025-11-22",
    status: "present",
    checkInTime: "08:05",
    checkOutTime: "16:35",
    hours: 8.5,
    method: "manual",
    overtime: 0.5,
  },
  {
    id: "5",
    date: "2025-11-21",
    status: "present",
    checkInTime: "08:25",
    checkOutTime: "16:20",
    hours: 7.92,
    method: "nfc",
    overtime: 0,
  },
  {
    id: "6",
    date: "2025-11-20",
    status: "late",
    checkInTime: "09:20",
    checkOutTime: "16:30",
    hours: 7.17,
    method: "manual",
    overtime: 0,
    reason: "Traffic congestion",
  },
  {
    id: "7",
    date: "2025-11-19",
    status: "absent",
    reason: "Medical leave",
    hours: 0,
    method: "none",
  },
  {
    id: "8",
    date: "2025-11-18",
    status: "present",
    checkInTime: "08:00",
    checkOutTime: "16:30",
    hours: 8.5,
    method: "face",
    overtime: 0.5,
  },
  {
    id: "9",
    date: "2025-11-17",
    status: "leave",
    reason: "Personal leave",
    hours: 0,
    method: "none",
  },
  {
    id: "10",
    date: "2025-11-16",
    status: "present",
    checkInTime: "07:55",
    checkOutTime: "16:45",
    hours: 8.83,
    method: "qr",
    overtime: 0.83,
  },
];

// Nigerian Naira salary configuration
const salaryConfig = {
  basicSalary: 180000, // ₦180,000
  allowances: {
    transport: 25000,
    housing: 30000,
    meal: 15000,
    medical: 10000,
  },
  deductions: {
    tax: 0.075, // 7.5%
    pension: 0.08, // 8%
    nhis: 1200, // ₦1,200
  },
  attendanceBonus: 0.05, // 5% for perfect attendance
  hourlyRate: 1200, // ₦1,200 per hour for overtime
  currency: "₦",
};

function TeacherMyAttendance() {
  const [month, setMonth] = useState(
    new Date().toISOString().split("-").slice(0, 2).join("-")
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [showPayslip, setShowPayslip] = useState(false);

  // Calculate stats
  const monthRecords = attendanceRecords.filter((record) =>
    record.date.startsWith(month)
  );

  const stats = {
    workingDays: monthRecords.length,
    present: monthRecords.filter(
      (r) => r.status === "present" || r.status === "late"
    ).length,
    absent: monthRecords.filter((r) => r.status === "absent").length,
    late: monthRecords.filter((r) => r.status === "late").length,
    leave: monthRecords.filter((r) => r.status === "leave").length,
    totalHours: monthRecords.reduce((sum, r) => sum + (r.hours || 0), 0),
    overtimeHours: monthRecords.reduce((sum, r) => sum + (r.overtime || 0), 0),
    attendancePercentage:
      Math.round(
        (monthRecords.filter(
          (r) => r.status === "present" || r.status === "late"
        ).length /
          monthRecords.length) *
          100
      ) || 0,
  };

  // Enhanced salary calculation
  const calculateSalary = () => {
    const totalWorkingDays = 22; // Standard working days
    const attendanceRatio = stats.present / totalWorkingDays;

    // Base calculations
    const adjustedBasic = salaryConfig.basicSalary * attendanceRatio;
    const totalAllowances = Object.values(salaryConfig.allowances).reduce(
      (sum, val) => sum + val * attendanceRatio,
      0
    );

    // Bonuses
    const attendanceBonus =
      stats.attendancePercentage >= 100
        ? salaryConfig.basicSalary * salaryConfig.attendanceBonus
        : 0;
    const overtimePay = stats.overtimeHours * salaryConfig.hourlyRate;

    // Gross salary
    const grossSalary =
      adjustedBasic + totalAllowances + attendanceBonus + overtimePay;

    // Deductions
    const tax = grossSalary * salaryConfig.deductions.tax;
    const pension = grossSalary * salaryConfig.deductions.pension;
    const nhis = salaryConfig.deductions.nhis;
    const totalDeductions = tax + pension + nhis;

    // Net salary
    const netSalary = grossSalary - totalDeductions;

    return {
      adjustedBasic,
      allowances: {
        transport: salaryConfig.allowances.transport * attendanceRatio,
        housing: salaryConfig.allowances.housing * attendanceRatio,
        meal: salaryConfig.allowances.meal * attendanceRatio,
        medical: salaryConfig.allowances.medical * attendanceRatio,
      },
      attendanceBonus,
      overtimePay,
      grossSalary,
      deductions: { tax, pension, nhis },
      totalDeductions,
      netSalary,
    };
  };

  const salary = calculateSalary();

  const formatCurrency = (amount) => {
    return `${salaryConfig.currency}${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const today = new Date().toISOString().split("T")[0];
  const todayRecord = attendanceRecords.find((record) => record.date === today);

  const generatePayslip = () => {
    setShowPayslip(true);
    setActiveTab("payslip");
    toast.success("Payslip generated successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Attendance</h1>
          <p className="text-muted-foreground">
            View and manage your attendance records with salary calculations
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Selected Month</p>
          <Input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-40"
          />
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-blue-700">Working Days</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.workingDays}
            </div>
            <p className="text-xs text-blue-600">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Present</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.present}
            </div>
            <p className="text-xs text-green-600">
              {stats.attendancePercentage}% attendance
            </p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-700">Absent</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.absent + stats.leave}
            </div>
            <p className="text-xs text-red-600">{stats.late} late arrivals</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-purple-700">Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalHours.toFixed(1)}
            </div>
            <p className="text-xs text-purple-600">
              +{stats.overtimeHours.toFixed(1)}h overtime
            </p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-orange-600" />
              <span className="text-orange-700">Net Salary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-orange-600">
              {formatCurrency(salary.netSalary)}
            </div>
            <p className="text-xs text-orange-600">Expected earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">Records</TabsTrigger>
          <TabsTrigger value="salary">Salary Details</TabsTrigger>
          <TabsTrigger value="payslip">Payslip</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Status */}
            <Card
              className={
                todayRecord?.status === "present"
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50"
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Timer className="h-5 w-5" />
                  <span>Today's Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayRecord ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge
                        variant={
                          todayRecord.status === "present"
                            ? "default"
                            : todayRecord.status === "late"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {todayRecord.status.charAt(0).toUpperCase() +
                          todayRecord.status.slice(1)}
                      </Badge>
                    </div>

                    {todayRecord.checkInTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Check In:</span>
                        <span className="font-semibold">
                          {todayRecord.checkInTime}
                        </span>
                      </div>
                    )}

                    {todayRecord.checkOutTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Check Out:</span>
                        <span className="font-semibold">
                          {todayRecord.checkOutTime}
                        </span>
                      </div>
                    )}

                    {todayRecord.hours && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Hours Worked:
                        </span>
                        <span className="font-semibold">
                          {todayRecord.hours}h
                        </span>
                      </div>
                    )}

                    {todayRecord.method && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Method:</span>
                        <div className="flex items-center space-x-1">
                          {todayRecord.method === "manual" && (
                            <User className="h-4 w-4" />
                          )}
                          {todayRecord.method === "nfc" && (
                            <CreditCard className="h-4 w-4" />
                          )}
                          {todayRecord.method === "qr" && (
                            <QrCode className="h-4 w-4" />
                          )}
                          {todayRecord.method === "face" && (
                            <Camera className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">
                            {todayRecord.method.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">
                      No attendance record for today
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Use the punch system to mark your attendance
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Punch In/Out
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Apply for Leave
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={generatePayslip}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Payslip
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Records
                </Button>
              </CardContent>
            </Card>

            {/* Monthly Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>
                  {new Date(month).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Attendance Rate</span>
                    <span className="font-semibold">
                      {stats.attendancePercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.attendancePercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-2xl font-bold text-green-600">
                      {stats.present}
                    </p>
                    <p className="text-xs text-green-600">Present</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <p className="text-2xl font-bold text-red-600">
                      {stats.absent + stats.leave}
                    </p>
                    <p className="text-xs text-red-600">Absent</p>
                  </div>
                </div>

                <div className="text-center bg-blue-50 p-2 rounded">
                  <p className="text-lg font-bold text-blue-600">
                    {stats.totalHours.toFixed(1)}h
                  </p>
                  <p className="text-xs text-blue-600">Total Hours</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Records Tab */}
        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                Detailed view of your attendance history for{" "}
                {new Date(month).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthRecords.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No attendance records found for this month
                    </p>
                  </div>
                ) : (
                  monthRecords
                    .slice()
                    .reverse()
                    .map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-center min-w-[60px]">
                            <p className="text-sm font-medium">
                              {new Date(record.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(record.date).toLocaleDateString(
                                "en-US",
                                { weekday: "short" }
                              )}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2">
                            {record.method === "manual" && (
                              <User className="h-4 w-4 text-gray-600" />
                            )}
                            {record.method === "nfc" && (
                              <CreditCard className="h-4 w-4 text-blue-600" />
                            )}
                            {record.method === "qr" && (
                              <QrCode className="h-4 w-4 text-purple-600" />
                            )}
                            {record.method === "face" && (
                              <Camera className="h-4 w-4 text-green-600" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {record.method !== "none"
                                ? record.method.toUpperCase()
                                : "N/A"}
                            </Badge>
                          </div>

                          <div className="flex-1">
                            <Badge
                              variant={
                                record.status === "present"
                                  ? "default"
                                  : record.status === "late"
                                  ? "warning"
                                  : record.status === "leave"
                                  ? "secondary"
                                  : "destructive"
                              }
                              className="mb-1"
                            >
                              {record.status === "present"
                                ? "✓ Present"
                                : record.status === "late"
                                ? "⏰ Late"
                                : record.status === "leave"
                                ? "📅 Leave"
                                : "✗ Absent"}
                            </Badge>
                            {record.reason && (
                              <p className="text-xs text-gray-600">
                                {record.reason}
                              </p>
                            )}
                            {record.checkInTime && record.checkOutTime && (
                              <div className="flex space-x-4 text-xs text-gray-600">
                                <span>In: {record.checkInTime}</span>
                                <span>Out: {record.checkOutTime}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-medium text-lg">
                            {record.hours?.toFixed(1) || 0}h
                          </p>
                          {record.overtime > 0 && (
                            <p className="text-xs text-blue-600">
                              +{record.overtime.toFixed(1)}h OT
                            </p>
                          )}
                          <p className="text-xs text-gray-600">worked</p>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salary Details Tab */}
        <TabsContent value="salary" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Earnings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <TrendingUp className="h-5 w-5" />
                  <span>Earnings Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Basic Salary (Adjusted)</span>
                  <span className="font-medium">
                    {formatCurrency(salary.adjustedBasic)}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Allowances:
                  </p>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Transport</span>
                      <span>{formatCurrency(salary.allowances.transport)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Housing</span>
                      <span>{formatCurrency(salary.allowances.housing)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Meal</span>
                      <span>{formatCurrency(salary.allowances.meal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Medical</span>
                      <span>{formatCurrency(salary.allowances.medical)}</span>
                    </div>
                  </div>
                </div>

                {salary.attendanceBonus > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Attendance Bonus (5%)</span>
                    <span className="font-medium">
                      {formatCurrency(salary.attendanceBonus)}
                    </span>
                  </div>
                )}

                {salary.overtimePay > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>
                      Overtime Pay ({stats.overtimeHours.toFixed(1)}h)
                    </span>
                    <span className="font-medium">
                      {formatCurrency(salary.overtimePay)}
                    </span>
                  </div>
                )}

                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Gross Total</span>
                    <span>{formatCurrency(salary.grossSalary)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deductions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700">
                  <XCircle className="h-5 w-5" />
                  <span>Deductions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Income Tax (7.5%)</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(salary.deductions.tax)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Pension (8%)</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(salary.deductions.pension)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>NHIS</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(salary.deductions.nhis)}
                  </span>
                </div>

                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-red-600">
                    <span>Total Deductions</span>
                    <span>-{formatCurrency(salary.totalDeductions)}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-xl text-green-600">
                    <span>Net Salary</span>
                    <span>{formatCurrency(salary.netSalary)}</span>
                  </div>
                  <p className="text-xs text-gray-600 text-right mt-1">
                    Take-home pay
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Salary History
            </Button>
            <Button onClick={generatePayslip}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Payslip
            </Button>
          </div>
        </TabsContent>

        {/* Payslip Tab */}
        <TabsContent value="payslip" className="space-y-6">
          {showPayslip ? (
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h2 className="text-2xl font-bold">PAYSLIP</h2>
                    <p className="text-gray-600">Monthly Salary Statement</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Pay Period</p>
                    <p className="font-semibold">
                      {new Date(month).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                {/* Employee Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Employee Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span className="font-medium">John Smith</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Employee ID:</span>
                        <span className="font-medium">EMP2024001</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Department:</span>
                        <span className="font-medium">Mathematics</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Position:</span>
                        <span className="font-medium">Senior Teacher</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Attendance Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Working Days:</span>
                        <span className="font-medium">22</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Days Present:</span>
                        <span className="font-medium">{stats.present}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attendance Rate:</span>
                        <span className="font-medium">
                          {stats.attendancePercentage}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Hours:</span>
                        <span className="font-medium">
                          {stats.totalHours.toFixed(1)}h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Salary Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-green-700">
                      Earnings
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Basic Salary:</span>
                        <span>{formatCurrency(salary.adjustedBasic)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transport Allowance:</span>
                        <span>
                          {formatCurrency(salary.allowances.transport)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Housing Allowance:</span>
                        <span>{formatCurrency(salary.allowances.housing)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Meal Allowance:</span>
                        <span>{formatCurrency(salary.allowances.meal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medical Allowance:</span>
                        <span>{formatCurrency(salary.allowances.medical)}</span>
                      </div>
                      {salary.attendanceBonus > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Attendance Bonus:</span>
                          <span>{formatCurrency(salary.attendanceBonus)}</span>
                        </div>
                      )}
                      {salary.overtimePay > 0 && (
                        <div className="flex justify-between text-blue-600">
                          <span>Overtime Pay:</span>
                          <span>{formatCurrency(salary.overtimePay)}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Gross Salary:</span>
                        <span>{formatCurrency(salary.grossSalary)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-red-700">
                      Deductions
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Income Tax (7.5%):</span>
                        <span>{formatCurrency(salary.deductions.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pension (8%):</span>
                        <span>{formatCurrency(salary.deductions.pension)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NHIS:</span>
                        <span>{formatCurrency(salary.deductions.nhis)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Deductions:</span>
                        <span>{formatCurrency(salary.totalDeductions)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Salary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
                    <span className="text-xl font-bold">NET SALARY:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(salary.netSalary)}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t text-xs text-gray-500">
                  <div>
                    Generated on:{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.print()}
                      className="text-xs"
                    >
                      <Printer className="h-3 w-3 mr-1" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No Payslip Generated
                </h3>
                <p className="text-gray-600 mb-4">
                  Generate your payslip to view detailed salary information.
                </p>
                <Button onClick={generatePayslip}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Payslip
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TeacherMyAttendance;
