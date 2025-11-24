import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Calendar,
  DollarSign,
  Clock,
  UserCheck,
  TrendingUp,
  Download,
  Printer,
  ChevronLeft,
  Users,
  Calculator,
  FileText,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  BarChart3,
  Eye,
  Edit,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const StaffSalaryManagement = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showPayslipDialog, setShowPayslipDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [activeTab, setActiveTab] = useState("salary-overview");

  // Dummy staff salary data
  const [staffSalaryData] = useState([
    {
      id: "STAFF001",
      name: "Dr. Sarah Johnson",
      department: "Mathematics",
      role: "Head of Department",
      baseSalary: 85000,
      workingDays: 22,
      presentDays: 21,
      absentDays: 1,
      lateArrivals: 0,
      overtime: 5,
      allowances: 5000,
      deductions: 2000,
      netSalary: 88000,
      payslipGenerated: true,
      lastPayslipDate: "2024-10-31",
      attendanceRate: 95.5,
    },
    {
      id: "STAFF002",
      name: "Prof. Michael Chen",
      department: "Science",
      role: "Physics Teacher",
      baseSalary: 75000,
      workingDays: 22,
      presentDays: 20,
      absentDays: 2,
      lateArrivals: 3,
      overtime: 8,
      allowances: 3000,
      deductions: 1500,
      netSalary: 76500,
      payslipGenerated: true,
      lastPayslipDate: "2024-10-31",
      attendanceRate: 90.9,
    },
    {
      id: "STAFF003",
      name: "Ms. Emily Rodriguez",
      department: "Language Arts",
      role: "English Teacher",
      baseSalary: 70000,
      workingDays: 22,
      presentDays: 22,
      absentDays: 0,
      lateArrivals: 1,
      overtime: 3,
      allowances: 2500,
      deductions: 1000,
      netSalary: 71500,
      payslipGenerated: false,
      lastPayslipDate: null,
      attendanceRate: 100,
    },
    {
      id: "STAFF004",
      name: "Mr. David Thompson",
      department: "Administration",
      role: "Vice Principal",
      baseSalary: 95000,
      workingDays: 22,
      presentDays: 21,
      absentDays: 1,
      lateArrivals: 0,
      overtime: 12,
      allowances: 8000,
      deductions: 3000,
      netSalary: 100000,
      payslipGenerated: true,
      lastPayslipDate: "2024-10-31",
      attendanceRate: 95.5,
    },
    {
      id: "STAFF005",
      name: "Mrs. Lisa Williams",
      department: "Arts",
      role: "Art Teacher",
      baseSalary: 65000,
      workingDays: 22,
      presentDays: 19,
      absentDays: 3,
      lateArrivals: 2,
      overtime: 0,
      allowances: 2000,
      deductions: 1200,
      netSalary: 65800,
      payslipGenerated: false,
      lastPayslipDate: null,
      attendanceRate: 86.4,
    },
  ]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const departments = [
    "Mathematics",
    "Science",
    "Language Arts",
    "Administration",
    "Arts",
  ];

  const handleGenerateAllPayslips = () => {
    const staffWithoutPayslips = staffSalaryData.filter(
      (staff) => !staff.payslipGenerated
    );

    if (staffWithoutPayslips.length === 0) {
      toast.info(
        "All staff members already have payslips generated for this month."
      );
      return;
    }

    toast.success(
      `Generating payslips for ${staffWithoutPayslips.length} staff members...`
    );

    // Simulate bulk payslip generation with real processing
    let processed = 0;
    const interval = setInterval(() => {
      if (processed < staffWithoutPayslips.length) {
        const staff = staffWithoutPayslips[processed];
        staff.payslipGenerated = true;
        staff.lastPayslipDate = new Date().toISOString().split("T")[0];
        processed++;

        // Create individual payslip files
        const payslipContent = generatePayslipPDF(staff);
        downloadPayslip(staff, payslipContent);

        toast.success(`Payslip generated for ${staff.name}`);
      } else {
        clearInterval(interval);
        toast.success(
          `All ${staffWithoutPayslips.length} payslips generated successfully!`
        );
      }
    }, 1000);
  };

  const generatePayslipPDF = (staff) => {
    const currentDate = new Date();
    const payPeriod = `${months[selectedMonth]} ${selectedYear}`;

    const earnings = [
      { label: "Basic Salary", amount: staff.baseSalary },
      { label: "Overtime", amount: staff.overtime * 100 },
      { label: "Allowances", amount: staff.allowances },
    ];

    const deductions = [
      { label: "Tax", amount: Math.floor(staff.deductions * 0.6) },
      { label: "Insurance", amount: Math.ceil(staff.deductions * 0.4) },
    ];

    return {
      header: `EDUOS ACADEMY - Staff Payslip - ${payPeriod}`,
      staff: staff,
      earnings: earnings,
      deductions: deductions,
      totalEarnings: earnings.reduce((sum, item) => sum + item.amount, 0),
      totalDeductions: deductions.reduce((sum, item) => sum + item.amount, 0),
      netPay: staff.netSalary,
      generatedDate: currentDate.toISOString(),
    };
  };

  const downloadPayslip = (staff, payslipData) => {
    // Create a detailed payslip as CSV (in real app, this would be PDF)
    const csvContent =
      "data:text/csv;charset=utf-8," +
      `${payslipData.header}\n\n` +
      `Employee Details\n` +
      `Name,${staff.name}\n` +
      `Employee ID,${staff.id}\n` +
      `Department,${staff.department}\n` +
      `Position,${staff.role}\n` +
      `Pay Period,${months[selectedMonth]} ${selectedYear}\n` +
      `Generated Date,${new Date().toLocaleDateString()}\n\n` +
      `Earnings\n` +
      payslipData.earnings
        .map((item) => `${item.label},$${item.amount.toLocaleString()}`)
        .join("\n") +
      `\nTotal Earnings,$${payslipData.totalEarnings.toLocaleString()}\n\n` +
      `Deductions\n` +
      payslipData.deductions
        .map((item) => `${item.label},$${item.amount.toLocaleString()}`)
        .join("\n") +
      `\nTotal Deductions,$${payslipData.totalDeductions.toLocaleString()}\n\n` +
      `NET PAY,$${payslipData.netPay.toLocaleString()}\n\n` +
      `Attendance Details\n` +
      `Working Days,${staff.workingDays}\n` +
      `Present Days,${staff.presentDays}\n` +
      `Absent Days,${staff.absentDays}\n` +
      `Attendance Rate,${staff.attendanceRate.toFixed(1)}%\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `payslip_${staff.name.replace(/\s+/g, "_")}_${
        months[selectedMonth]
      }_${selectedYear}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportSalaryReport = () => {
    toast.success("Generating comprehensive salary report...");

    // Create detailed salary report with analysis
    const reportData = {
      reportDetails: {
        period: `${months[selectedMonth]} ${selectedYear}`,
        generatedDate: new Date().toISOString(),
        totalStaff: filteredStaff.length,
      },
      salaryAnalysis: {
        totalBaseSalary: totalBaseSalary,
        totalNetSalary: totalNetSalary,
        averageAttendance: averageAttendance,
        highestSalary: Math.max(...filteredStaff.map((s) => s.netSalary)),
        lowestSalary: Math.min(...filteredStaff.map((s) => s.netSalary)),
        departmentBreakdown: {},
      },
      staffDetails: filteredStaff,
    };

    // Calculate department-wise salary breakdown
    const deptBreakdown = {};
    filteredStaff.forEach((staff) => {
      if (!deptBreakdown[staff.department]) {
        deptBreakdown[staff.department] = {
          count: 0,
          totalSalary: 0,
          avgAttendance: 0,
        };
      }
      deptBreakdown[staff.department].count++;
      deptBreakdown[staff.department].totalSalary += staff.netSalary;
      deptBreakdown[staff.department].avgAttendance += staff.attendanceRate;
    });

    // Calculate averages
    Object.keys(deptBreakdown).forEach((dept) => {
      deptBreakdown[dept].avgSalary =
        deptBreakdown[dept].totalSalary / deptBreakdown[dept].count;
      deptBreakdown[dept].avgAttendance =
        deptBreakdown[dept].avgAttendance / deptBreakdown[dept].count;
    });

    reportData.salaryAnalysis.departmentBreakdown = deptBreakdown;

    // Generate comprehensive CSV report
    const csvContent =
      "data:text/csv;charset=utf-8," +
      `EDUOS ACADEMY - SALARY REPORT\n` +
      `Period: ${months[selectedMonth]} ${selectedYear}\n` +
      `Generated: ${new Date().toLocaleString()}\n` +
      `Total Staff: ${filteredStaff.length}\n\n` +
      `SALARY SUMMARY\n` +
      `Total Base Salary,$${totalBaseSalary.toLocaleString()}\n` +
      `Total Net Salary,$${totalNetSalary.toLocaleString()}\n` +
      `Highest Salary,$${reportData.salaryAnalysis.highestSalary.toLocaleString()}\n` +
      `Lowest Salary,$${reportData.salaryAnalysis.lowestSalary.toLocaleString()}\n` +
      `Average Attendance,${averageAttendance.toFixed(1)}%\n\n` +
      `DEPARTMENT BREAKDOWN\n` +
      `Department,Staff Count,Total Salary,Average Salary,Average Attendance\n` +
      Object.entries(deptBreakdown)
        .map(
          ([dept, data]) =>
            `${dept},${
              data.count
            },$${data.totalSalary.toLocaleString()},$${Math.round(
              data.avgSalary
            ).toLocaleString()},${data.avgAttendance.toFixed(1)}%`
        )
        .join("\n") +
      "\n\n" +
      `DETAILED STAFF INFORMATION\n` +
      `Name,Department,Role,Base Salary,Net Salary,Attendance Rate,Payslip Status\n` +
      filteredStaff
        .map(
          (staff) =>
            `"${staff.name}",${staff.department},"${
              staff.role
            }",$${staff.baseSalary.toLocaleString()},$${staff.netSalary.toLocaleString()},${
              staff.attendanceRate
            }%,${staff.payslipGenerated ? "Generated" : "Pending"}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `comprehensive_salary_report_${months[selectedMonth]}_${selectedYear}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      toast.success("Comprehensive salary report exported successfully!");
    }, 1500);
  };

  const handleCalculateBonuses = () => {
    toast.success("Calculating performance bonuses based on attendance...");

    let totalBonuses = 0;
    const bonusRecipients = [];

    staffSalaryData.forEach((staff) => {
      let bonus = 0;
      let bonusReason = "";

      if (staff.attendanceRate >= 98) {
        bonus = staff.baseSalary * 0.08; // 8% bonus for perfect attendance
        bonusReason = "Perfect Attendance (98%+)";
      } else if (staff.attendanceRate >= 95) {
        bonus = staff.baseSalary * 0.05; // 5% bonus for excellent attendance
        bonusReason = "Excellent Attendance (95%+)";
      } else if (staff.attendanceRate >= 90) {
        bonus = staff.baseSalary * 0.03; // 3% bonus for good attendance
        bonusReason = "Good Attendance (90%+)";
      }

      if (bonus > 0) {
        staff.netSalary += bonus;
        totalBonuses += bonus;
        bonusRecipients.push({
          name: staff.name,
          department: staff.department,
          attendanceRate: staff.attendanceRate,
          bonusAmount: bonus,
          bonusReason: bonusReason,
        });
      }
    });

    // Generate bonus report
    if (bonusRecipients.length > 0) {
      const bonusReport =
        "data:text/csv;charset=utf-8," +
        `EDUOS ACADEMY - PERFORMANCE BONUS REPORT\n` +
        `Calculation Date: ${new Date().toLocaleString()}\n` +
        `Total Recipients: ${bonusRecipients.length}\n` +
        `Total Bonus Amount: $${totalBonuses.toLocaleString()}\n\n` +
        `BONUS BREAKDOWN\n` +
        `Staff Name,Department,Attendance Rate,Bonus Amount,Bonus Reason\n` +
        bonusRecipients
          .map(
            (recipient) =>
              `"${recipient.name}",${recipient.department},${
                recipient.attendanceRate
              }%,$${recipient.bonusAmount.toLocaleString()},"${
                recipient.bonusReason
              }"`
          )
          .join("\n") +
        "\n\n" +
        `BONUS CRITERIA\n` +
        `Perfect Attendance (98%+): 8% of base salary\n` +
        `Excellent Attendance (95%+): 5% of base salary\n` +
        `Good Attendance (90%+): 3% of base salary\n`;

      const encodedUri = encodeURI(bonusReport);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `bonus_calculation_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        toast.success(
          `Calculated bonuses for ${
            bonusRecipients.length
          } staff members totaling $${totalBonuses.toLocaleString()}! Report downloaded.`
        );
      }, 2000);
    } else {
      setTimeout(() => {
        toast.info(
          "No staff members qualified for bonuses based on current attendance criteria."
        );
      }, 2000);
    }
  };

  // Filter staff based on search and department
  const filteredStaff = staffSalaryData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || staff.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Calculate totals
  const totalStaff = filteredStaff.length;
  const totalBaseSalary = filteredStaff.reduce(
    (sum, staff) => sum + staff.baseSalary,
    0
  );
  const totalNetSalary = filteredStaff.reduce(
    (sum, staff) => sum + staff.netSalary,
    0
  );
  const averageAttendance =
    filteredStaff.reduce((sum, staff) => sum + staff.attendanceRate, 0) /
    filteredStaff.length;

  const handleGeneratePayslip = (staffMember) => {
    setSelectedStaff(staffMember);
    setShowPayslipDialog(true);
  };

  const handlePrintPayslip = () => {
    if (!selectedStaff) return;

    toast.success(`Payslip generated for ${selectedStaff.name}`);

    // Update the payslip status
    const updatedStaff = staffSalaryData.find((s) => s.id === selectedStaff.id);
    if (updatedStaff) {
      updatedStaff.payslipGenerated = true;
      updatedStaff.lastPayslipDate = new Date().toISOString().split("T")[0];
    }

    setShowPayslipDialog(false);
  };

  const PayslipPreview = ({ staff }) => {
    const currentDate = new Date();
    const payPeriod = `${months[selectedMonth]} ${selectedYear}`;

    const earnings = [
      { label: "Basic Salary", amount: staff.baseSalary },
      { label: "Overtime", amount: staff.overtime * 100 },
      { label: "Allowances", amount: staff.allowances },
    ];

    const deductions = [
      { label: "Tax", amount: staff.deductions * 0.6 },
      { label: "Insurance", amount: staff.deductions * 0.4 },
    ];

    const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
    const totalDeductions = deductions.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    return (
      <div className="bg-white p-6 space-y-6" style={{ minHeight: "800px" }}>
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">EDUOS ACADEMY</h2>
          <p className="text-gray-600">Staff Payslip</p>
          <p className="text-sm text-gray-500">Pay Period: {payPeriod}</p>
        </div>

        {/* Staff Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Employee Details</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Name:</span> {staff.name}
              </p>
              <p>
                <span className="font-medium">Employee ID:</span> {staff.id}
              </p>
              <p>
                <span className="font-medium">Department:</span>{" "}
                {staff.department}
              </p>
              <p>
                <span className="font-medium">Position:</span> {staff.role}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Pay Details</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Pay Date:</span>{" "}
                {currentDate.toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Working Days:</span>{" "}
                {staff.workingDays}
              </p>
              <p>
                <span className="font-medium">Present Days:</span>{" "}
                {staff.presentDays}
              </p>
              <p>
                <span className="font-medium">Attendance:</span>{" "}
                {staff.attendanceRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Earnings and Deductions */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Earnings</h3>
            <div className="space-y-2">
              {earnings.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span>${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-semibold">
                <div className="flex justify-between">
                  <span>Total Earnings</span>
                  <span>${totalEarnings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Deductions</h3>
            <div className="space-y-2">
              {deductions.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span>${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-semibold">
                <div className="flex justify-between">
                  <span>Total Deductions</span>
                  <span>${totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Net Pay */}
        <div className="border-t pt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">NET PAY</span>
              <span className="text-2xl font-bold text-green-600">
                ${staff.netSalary.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 border-t pt-4">
          <p>
            This is a computer-generated payslip and does not require a
            signature.
          </p>
          <p>
            Generated on {currentDate.toLocaleDateString()} at{" "}
            {currentDate.toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
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
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <DollarSign className="text-green-600" />
                Staff Salary Management
              </h1>
              <p className="text-gray-600">
                Manage staff salaries, attendance, and payslips
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => setSelectedMonth(parseInt(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2024, 2023, 2022].map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="salary-overview">Overview</TabsTrigger>
            <TabsTrigger value="staff-salaries">Staff Salaries</TabsTrigger>
            <TabsTrigger value="attendance-tracking">Attendance</TabsTrigger>
            <TabsTrigger value="payroll-reports">Reports</TabsTrigger>
          </TabsList>

          {/* Salary Overview Tab */}
          <TabsContent value="salary-overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Staff
                      </p>
                      <p className="text-2xl font-bold">{totalStaff}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Base Salary
                      </p>
                      <p className="text-2xl font-bold">
                        ${totalBaseSalary.toLocaleString()}
                      </p>
                    </div>
                    <Calculator className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Net Pay
                      </p>
                      <p className="text-2xl font-bold">
                        ${totalNetSalary.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Avg Attendance
                      </p>
                      <p className="text-2xl font-bold">
                        {averageAttendance.toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    className="flex items-center justify-center gap-2 h-16"
                    onClick={handleGenerateAllPayslips}
                  >
                    <Printer size={20} />
                    Generate All Payslips
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 h-16"
                    onClick={handleExportSalaryReport}
                  >
                    <Download size={20} />
                    Export Salary Report
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 h-16"
                    onClick={handleCalculateBonuses}
                  >
                    <Calculator size={20} />
                    Calculate Bonuses
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Salaries Tab */}
          <TabsContent value="staff-salaries" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <Input
                      placeholder="Search staff by name or role..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Department" />
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
              </CardContent>
            </Card>

            {/* Staff Salary Table */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Staff Salary Details - {months[selectedMonth]} {selectedYear}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Base Salary</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{staff.name}</div>
                            <div className="text-sm text-gray-500">
                              {staff.role}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{staff.department}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            ${staff.baseSalary.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                staff.attendanceRate >= 95
                                  ? "bg-green-500"
                                  : staff.attendanceRate >= 85
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                            <span className="text-sm">
                              {staff.attendanceRate.toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-bold text-green-600">
                            ${staff.netSalary.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          {staff.payslipGenerated ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle size={12} className="mr-1" />
                              Generated
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-orange-600"
                            >
                              <AlertTriangle size={12} className="mr-1" />
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleGeneratePayslip(staff)}
                            >
                              <Eye size={14} className="mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleGeneratePayslip(staff)}
                            >
                              <Printer size={14} className="mr-1" />
                              Print
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tracking Tab */}
          <TabsContent value="attendance-tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredStaff.map((staff) => (
                    <div key={staff.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{staff.name}</h4>
                          <p className="text-sm text-gray-500">
                            {staff.department}
                          </p>
                        </div>
                        <Badge
                          className={`${
                            staff.attendanceRate >= 95
                              ? "bg-green-100 text-green-800"
                              : staff.attendanceRate >= 85
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {staff.attendanceRate.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Present Days:</span>
                          <span className="font-medium">
                            {staff.presentDays}/{staff.workingDays}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Absent Days:</span>
                          <span className="font-medium text-red-600">
                            {staff.absentDays}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Late Arrivals:</span>
                          <span className="font-medium text-yellow-600">
                            {staff.lateArrivals}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Overtime Hours:</span>
                          <span className="font-medium text-blue-600">
                            {staff.overtime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payroll Reports Tab */}
          <TabsContent value="payroll-reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                  >
                    <FileText size={24} />
                    Monthly Salary Report
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                  >
                    <BarChart3 size={24} />
                    Attendance Analysis
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                  >
                    <Calculator size={24} />
                    Payroll Summary
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                  >
                    <Download size={24} />
                    Export All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payslip Dialog */}
        <Dialog open={showPayslipDialog} onOpenChange={setShowPayslipDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Payslip Preview - {selectedStaff?.name}</DialogTitle>
            </DialogHeader>
            {selectedStaff && <PayslipPreview staff={selectedStaff} />}
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPayslipDialog(false)}
              >
                Close
              </Button>
              <Button onClick={handlePrintPayslip}>
                <Printer size={16} className="mr-2" />
                Generate Payslip
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default StaffSalaryManagement;
