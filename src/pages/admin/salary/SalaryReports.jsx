import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Building,
  PieChart as PieChartIcon,
  BarChart3,
  Download,
} from "lucide-react";
import { toast } from "sonner";

const SalaryReports = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Sample data for reports
  const salaryData = [
    {
      month: "Jan",
      totalSalaries: 1850000,
      employeeCount: 12,
      avgSalary: 154167,
    },
    {
      month: "Feb",
      totalSalaries: 1920000,
      employeeCount: 12,
      avgSalary: 160000,
    },
    {
      month: "Mar",
      totalSalaries: 2100000,
      employeeCount: 13,
      avgSalary: 161538,
    },
    {
      month: "Apr",
      totalSalaries: 2050000,
      employeeCount: 13,
      avgSalary: 157692,
    },
    {
      month: "May",
      totalSalaries: 2200000,
      employeeCount: 14,
      avgSalary: 157143,
    },
    {
      month: "Jun",
      totalSalaries: 2150000,
      employeeCount: 14,
      avgSalary: 153571,
    },
    {
      month: "Jul",
      totalSalaries: 2300000,
      employeeCount: 15,
      avgSalary: 153333,
    },
    {
      month: "Aug",
      totalSalaries: 2280000,
      employeeCount: 15,
      avgSalary: 152000,
    },
    {
      month: "Sep",
      totalSalaries: 2400000,
      employeeCount: 16,
      avgSalary: 150000,
    },
    {
      month: "Oct",
      totalSalaries: 2350000,
      employeeCount: 16,
      avgSalary: 146875,
    },
    {
      month: "Nov",
      totalSalaries: 2500000,
      employeeCount: 17,
      avgSalary: 147059,
    },
    {
      month: "Dec",
      totalSalaries: 2600000,
      employeeCount: 17,
      avgSalary: 152941,
    },
  ];

  const departmentData = [
    { name: "Mathematics", value: 4200000, count: 5, color: "#8884d8" },
    { name: "English", value: 3800000, count: 4, color: "#82ca9d" },
    { name: "Science", value: 3600000, count: 4, color: "#ffc658" },
    { name: "Administration", value: 2400000, count: 3, color: "#ff7300" },
    { name: "Sports", value: 1800000, count: 2, color: "#00ff88" },
  ];

  const positionData = [
    { position: "Head Teacher", avgSalary: 200000, count: 2 },
    { position: "Senior Teacher", avgSalary: 170000, count: 6 },
    { position: "Teacher", avgSalary: 130000, count: 8 },
    { position: "Secretary", avgSalary: 90000, count: 2 },
    { position: "Security", avgSalary: 70000, count: 1 },
  ];

  const monthlyTrends = [
    { month: "Jan", baseSalary: 1200000, allowances: 400000, overtime: 250000 },
    { month: "Feb", baseSalary: 1250000, allowances: 420000, overtime: 250000 },
    { month: "Mar", baseSalary: 1350000, allowances: 450000, overtime: 300000 },
    { month: "Apr", baseSalary: 1320000, allowances: 430000, overtime: 300000 },
    { month: "May", baseSalary: 1400000, allowances: 480000, overtime: 320000 },
    { month: "Jun", baseSalary: 1380000, allowances: 460000, overtime: 310000 },
    { month: "Jul", baseSalary: 1450000, allowances: 500000, overtime: 350000 },
    { month: "Aug", baseSalary: 1420000, allowances: 480000, overtime: 380000 },
    { month: "Sep", baseSalary: 1500000, allowances: 520000, overtime: 380000 },
    { month: "Oct", baseSalary: 1480000, allowances: 500000, overtime: 370000 },
    { month: "Nov", baseSalary: 1550000, allowances: 550000, overtime: 400000 },
    { month: "Dec", baseSalary: 1600000, allowances: 580000, overtime: 420000 },
  ];

  // Calculate totals
  const totalAnnualSalary = salaryData.reduce(
    (sum, month) => sum + month.totalSalaries,
    0
  );
  const avgMonthlySalary = totalAnnualSalary / 12;
  const totalEmployees = Math.max(...salaryData.map((d) => d.employeeCount));
  const avgEmployeeSalary = totalAnnualSalary / totalEmployees / 12;

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      ["Month", "Total Salaries", "Employee Count", "Average Salary"],
      ...salaryData.map((item) => [
        item.month,
        item.totalSalaries.toLocaleString(),
        item.employeeCount,
        item.avgSalary.toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `salary_report_${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`CSV Export Complete`, {
      description: `Successfully exported salary report for ${selectedYear}.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = `
SALARY REPORT - ${selectedYear}
================================

ANNUAL SUMMARY:
- Total Annual Salary: ₦${totalAnnualSalary.toLocaleString()}
- Average Monthly Salary: ₦${avgMonthlySalary.toLocaleString()}
- Total Employees: ${totalEmployees}
- Average Employee Salary: ₦${avgEmployeeSalary.toLocaleString()}

MONTHLY BREAKDOWN:
${salaryData
  .map(
    (item) =>
      `${item.month}: ₦${item.totalSalaries.toLocaleString()} (${
        item.employeeCount
      } employees)`
  )
  .join("\n")}

DEPARTMENT BREAKDOWN:
${departmentData
  .map(
    (dept) =>
      `${dept.name}: ₦${dept.value.toLocaleString()} (${dept.count} employees)`
  )
  .join("\n")}
    `;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `salary_report_${selectedYear}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`Text Export Complete`, {
      description: `Successfully exported detailed salary report.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info(`Print Dialog Opened`, {
      description: `Preparing to print salary reports for ${selectedYear}.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const reportData = `Salary Report ${selectedYear} - Total: ₦${totalAnnualSalary.toLocaleString()}, Employees: ${totalEmployees}, Avg: ₦${avgEmployeeSalary.toLocaleString()}`;

    navigator.clipboard
      .writeText(reportData)
      .then(() => {
        toast.success(`Copied to Clipboard`, {
          description: `Successfully copied salary report summary.`,
          icon: <Copy className="h-4 w-4" />,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error(`Copy Failed`, {
          description: `Unable to copy data to clipboard.`,
          duration: 3000,
        });
      });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Salary Reports & Analytics
        </h2>
      </div>

      {/* Filters */}
      <Card className="animate-fade-in delay-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
              >
                <option value="all">All Months</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
              >
                <option value="all">All Departments</option>
                <option value="mathematics">Mathematics</option>
                <option value="english">English</option>
                <option value="science">Science</option>
                <option value="administration">Administration</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <div className="flex items-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="flex items-center gap-1"
              >
                <FileSpreadsheet className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportText}
                className="flex items-center gap-1"
              >
                <FileText className="h-4 w-4" />
                Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="flex items-center gap-1"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-1"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="animate-fade-in delay-200">
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Annual Salary
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ₦{totalAnnualSalary.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-300">
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Avg Monthly Salary
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  ₦{Math.round(avgMonthlySalary).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-400">
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-full mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Employees
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalEmployees}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-500">
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-full mr-4">
                <Building className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Avg Employee Salary
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  ₦{Math.round(avgEmployeeSalary).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Salary Trends */}
        <Card className="animate-fade-in delay-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Salary Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `₦${value.toLocaleString()}`,
                    "Total Salaries",
                  ]}
                />
                <Legend />
                <Bar dataKey="totalSalaries" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="animate-fade-in delay-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Department Salary Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `₦${value.toLocaleString()}`,
                    "Total Salary",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Salary Component Trends */}
      <Card className="animate-fade-in delay-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Salary Component Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="baseSalary"
                stroke="#8884d8"
                name="Base Salary"
              />
              <Line
                type="monotone"
                dataKey="allowances"
                stroke="#82ca9d"
                name="Allowances"
              />
              <Line
                type="monotone"
                dataKey="overtime"
                stroke="#ffc658"
                name="Overtime"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Position Analysis Table */}
      <Card className="animate-fade-in delay-900">
        <CardHeader>
          <CardTitle>Salary Analysis by Position</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Position</TableHead>
                  <TableHead className="bg-gray-100">Employee Count</TableHead>
                  <TableHead className="bg-gray-100">Average Salary</TableHead>
                  <TableHead className="bg-gray-100">Total Cost</TableHead>
                  <TableHead className="bg-gray-100">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positionData.map((position, index) => {
                  const totalCost = position.avgSalary * position.count * 12;
                  const percentage = (totalCost / totalAnnualSalary) * 100;
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {position.position}
                      </TableCell>
                      <TableCell>{position.count}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ₦{position.avgSalary.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₦{totalCost.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {percentage.toFixed(1)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryReports;
