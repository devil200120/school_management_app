import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  User,
  Download,
  Printer,
  DollarSign,
  Eye,
  Search,
  Filter,
  FileText,
  CreditCard,
  Building2,
  Clock,
  TrendingUp,
  Mail,
  Phone,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const SelfServiceStaffPortal = () => {
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Current logged-in staff info (would come from auth context)
  const [currentStaff] = useState({
    id: "TCH001",
    name: "John Doe",
    position: "Senior Mathematics Teacher",
    department: "Mathematics",
    email: "john.doe@eduos.edu.ng",
    phone: "+234 803 123 4567",
    address: "123 Victoria Island, Lagos",
    employeeNumber: "EMP001",
    hireDate: "2020-01-15",
    profilePhoto: "/api/placeholder/100/100",
  });

  // Sample payslip history
  const [payslipHistory] = useState([
    {
      id: "PS001",
      month: "November",
      year: "2024",
      payDate: "2024-11-30",
      basicSalary: 85000,
      allowances: 25000,
      bonuses: 5000,
      deductions: 12000,
      netSalary: 103000,
      status: "paid",
      workingDays: 22,
      presentDays: 20,
    },
    {
      id: "PS002",
      month: "October",
      year: "2024",
      payDate: "2024-10-31",
      basicSalary: 85000,
      allowances: 25000,
      bonuses: 3000,
      deductions: 11500,
      netSalary: 101500,
      status: "paid",
      workingDays: 23,
      presentDays: 22,
    },
    {
      id: "PS003",
      month: "September",
      year: "2024",
      payDate: "2024-09-30",
      basicSalary: 85000,
      allowances: 25000,
      bonuses: 7000,
      deductions: 12500,
      netSalary: 104500,
      status: "paid",
      workingDays: 21,
      presentDays: 20,
    },
    {
      id: "PS004",
      month: "August",
      year: "2024",
      payDate: "2024-08-31",
      basicSalary: 85000,
      allowances: 25000,
      bonuses: 2000,
      deductions: 11000,
      netSalary: 101000,
      status: "paid",
      workingDays: 22,
      presentDays: 21,
    },
  ]);

  // Calculate summary statistics
  const [summaryStats] = useState(() => {
    const totalEarnings = payslipHistory.reduce(
      (sum, payslip) => sum + payslip.netSalary,
      0
    );
    const avgSalary = totalEarnings / payslipHistory.length;
    const totalBonuses = payslipHistory.reduce(
      (sum, payslip) => sum + payslip.bonuses,
      0
    );
    const totalDeductions = payslipHistory.reduce(
      (sum, payslip) => sum + payslip.deductions,
      0
    );

    return {
      totalEarnings,
      avgSalary,
      totalBonuses,
      totalDeductions,
      payslipCount: payslipHistory.length,
    };
  });

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

  const years = ["2024", "2023", "2022", "2021"];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredPayslips = payslipHistory.filter((payslip) => {
    const yearMatch = payslip.year === selectedYear;
    const monthMatch =
      selectedMonth === "all" || payslip.month === selectedMonth;
    const searchMatch =
      payslip.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payslip.year.includes(searchTerm);

    return yearMatch && monthMatch && searchMatch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const viewPayslip = (payslip) => {
    // Navigate to detailed payslip view
    navigate(`/staff/payslip/${payslip.id}`);
  };

  const downloadPayslip = async (payslip, format = "pdf") => {
    try {
      // Generate the payslip content
      const payslipContent = generatePayslipHTML(payslip, currentStaff);

      if (format === "pdf") {
        // Create a new window for PDF generation
        const printWindow = window.open("", "_blank");
        printWindow.document.write(payslipContent);
        printWindow.document.close();

        // Wait for content to load then trigger download
        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();

          // Create download link for PDF
          const link = document.createElement("a");
          const blob = new Blob([payslipContent], { type: "text/html" });
          const url = URL.createObjectURL(blob);

          link.href = url;
          link.download = `${currentStaff.name}_Payslip_${payslip.month}_${payslip.year}.html`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          URL.revokeObjectURL(url);
          setTimeout(() => printWindow.close(), 1000);
        };

        toast.success(`Downloading ${payslip.month} ${payslip.year} Payslip`, {
          description: "Payslip downloaded successfully.",
          icon: <Download className="h-4 w-4" />,
        });
      }
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed", {
        description: "Unable to download payslip. Please try again.",
      });
    }
  };

  const printPayslip = (payslip) => {
    try {
      // Generate the payslip content
      const payslipContent = generatePayslipHTML(payslip, currentStaff);

      // Create a new window for printing
      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow.document.write(payslipContent);
      printWindow.document.close();

      // Wait for content to load then trigger print dialog
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        setTimeout(() => printWindow.close(), 1000);
      };

      toast.success(`Printing ${payslip.month} ${payslip.year} Payslip`, {
        description: "Print dialog opened.",
        icon: <Printer className="h-4 w-4" />,
      });
    } catch (error) {
      console.error("Print failed:", error);
      toast.error("Print failed", {
        description: "Unable to print payslip. Please try again.",
      });
    }
  };

  // Function to generate HTML content for payslip
  const generatePayslipHTML = (payslip, staff) => {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
      }).format(amount);
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payslip - ${staff.name} - ${payslip.month} ${
      payslip.year
    }</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            color: #333;
          }
          .payslip-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border: 2px solid #2563eb;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #2563eb, #1e40af);
            color: white;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
          }
          .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
          }
          .content {
            padding: 30px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
          }
          .info-section h3 {
            color: #2563eb;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: 600;
            color: #4b5563;
          }
          .value {
            color: #111827;
          }
          .salary-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
          }
          .salary-table th {
            background: #f8fafc;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 1px solid #e5e7eb;
          }
          .salary-table td {
            padding: 15px;
            border-bottom: 1px solid #f3f4f6;
          }
          .earnings {
            color: #059669;
            font-weight: 600;
          }
          .deductions {
            color: #dc2626;
            font-weight: 600;
          }
          .net-salary {
            background: #f0fdf4;
            border: 2px solid #22c55e;
          }
          .net-salary td {
            font-size: 18px;
            font-weight: bold;
            color: #15803d;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          @media print {
            body { margin: 0; }
            .payslip-container { border: none; box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="payslip-container">
          <div class="header">
            <h1>EDUOS International School</h1>
            <p>Salary Statement - ${payslip.month} ${payslip.year}</p>
          </div>
          
          <div class="content">
            <div class="info-grid">
              <div class="info-section">
                <h3>Employee Information</h3>
                <div class="info-row">
                  <span class="label">Employee Name:</span>
                  <span class="value">${staff.name}</span>
                </div>
                <div class="info-row">
                  <span class="label">Employee ID:</span>
                  <span class="value">${staff.employeeNumber}</span>
                </div>
                <div class="info-row">
                  <span class="label">Position:</span>
                  <span class="value">${staff.position}</span>
                </div>
                <div class="info-row">
                  <span class="label">Department:</span>
                  <span class="value">${staff.department}</span>
                </div>
                <div class="info-row">
                  <span class="label">Email:</span>
                  <span class="value">${staff.email}</span>
                </div>
              </div>
              
              <div class="info-section">
                <h3>Pay Period Information</h3>
                <div class="info-row">
                  <span class="label">Pay Period:</span>
                  <span class="value">${payslip.month} ${payslip.year}</span>
                </div>
                <div class="info-row">
                  <span class="label">Pay Date:</span>
                  <span class="value">${new Date(
                    payslip.payDate
                  ).toLocaleDateString()}</span>
                </div>
                <div class="info-row">
                  <span class="label">Working Days:</span>
                  <span class="value">${payslip.workingDays}</span>
                </div>
                <div class="info-row">
                  <span class="label">Present Days:</span>
                  <span class="value">${payslip.presentDays}</span>
                </div>
                <div class="info-row">
                  <span class="label">Status:</span>
                  <span class="value">Paid</span>
                </div>
              </div>
            </div>

            <table class="salary-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right;">Amount (₦)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Earnings</strong></td>
                  <td></td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Basic Salary</td>
                  <td style="text-align: right;" class="earnings">${formatCurrency(
                    payslip.basicSalary
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Allowances</td>
                  <td style="text-align: right;" class="earnings">${formatCurrency(
                    payslip.allowances
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Bonuses</td>
                  <td style="text-align: right;" class="earnings">${formatCurrency(
                    payslip.bonuses
                  )}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td><strong>Total Earnings</strong></td>
                  <td style="text-align: right;" class="earnings"><strong>${formatCurrency(
                    payslip.basicSalary + payslip.allowances + payslip.bonuses
                  )}</strong></td>
                </tr>
                <tr>
                  <td><strong>Deductions</strong></td>
                  <td></td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Income Tax</td>
                  <td style="text-align: right;" class="deductions">${formatCurrency(
                    payslip.deductions * 0.6
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Pension (8%)</td>
                  <td style="text-align: right;" class="deductions">${formatCurrency(
                    payslip.deductions * 0.3
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Other Deductions</td>
                  <td style="text-align: right;" class="deductions">${formatCurrency(
                    payslip.deductions * 0.1
                  )}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td><strong>Total Deductions</strong></td>
                  <td style="text-align: right;" class="deductions"><strong>${formatCurrency(
                    payslip.deductions
                  )}</strong></td>
                </tr>
                <tr class="net-salary">
                  <td><strong>NET SALARY</strong></td>
                  <td style="text-align: right;"><strong>${formatCurrency(
                    payslip.netSalary
                  )}</strong></td>
                </tr>
              </tbody>
            </table>

            <div class="footer">
              <p><strong>EDUOS International School</strong></p>
              <p>Lagos, Nigeria | Phone: +234 1 234 5678 | Email: hr@eduos.edu.ng</p>
              <p>This is a computer-generated document. Generated on ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-eduos-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-eduos-primary mb-2">
          Welcome to Your Payslip Portal
        </h2>
        <p className="text-gray-600">
          Access, view, and download your salary statements securely
        </p>

        {/* Quick Action Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => downloadPayslip(payslipHistory[0], "pdf")}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Latest Payslip
          </Button>
          <Button
            variant="outline"
            onClick={() => printPayslip(payslipHistory[0])}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Latest Payslip
          </Button>
          <Button
            variant="outline"
            onClick={() => viewPayslip(payslipHistory[0])}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Latest Payslip
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(summaryStats.totalEarnings)}
                </p>
                <p className="text-xs text-gray-500">
                  Last {summaryStats.payslipCount} months
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
                  Average Salary
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(summaryStats.avgSalary)}
                </p>
                <p className="text-xs text-gray-500">Monthly average</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Bonuses
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(summaryStats.totalBonuses)}
                </p>
                <p className="text-xs text-gray-500">Performance rewards</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Payslip Records
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {summaryStats.payslipCount}
                </p>
                <p className="text-xs text-gray-500">Available downloads</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Generate Payslips
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Quick Generate Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Payslip Report
            </h4>
            <p className="text-blue-700 text-sm mb-3">
              Generate and download a comprehensive payslip report for the
              selected period.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => downloadPayslip(payslipHistory[0], "pdf")}
              >
                <Download className="mr-1 h-4 w-4" />
                Current Month PDF
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  // Generate annual report
                  const annualData = {
                    ...payslipHistory[0],
                    month: "Annual Report",
                    year: selectedYear,
                    basicSalary: payslipHistory.reduce(
                      (sum, p) => sum + p.basicSalary,
                      0
                    ),
                    allowances: payslipHistory.reduce(
                      (sum, p) => sum + p.allowances,
                      0
                    ),
                    bonuses: payslipHistory.reduce(
                      (sum, p) => sum + p.bonuses,
                      0
                    ),
                    deductions: payslipHistory.reduce(
                      (sum, p) => sum + p.deductions,
                      0
                    ),
                    netSalary: payslipHistory.reduce(
                      (sum, p) => sum + p.netSalary,
                      0
                    ),
                    workingDays: payslipHistory.reduce(
                      (sum, p) => sum + p.workingDays,
                      0
                    ),
                    presentDays: payslipHistory.reduce(
                      (sum, p) => sum + p.presentDays,
                      0
                    ),
                  };
                  downloadPayslip(annualData, "pdf");
                }}
              >
                <FileText className="mr-1 h-4 w-4" />
                Annual Report
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => printPayslip(payslipHistory[0])}
              >
                <Printer className="mr-1 h-4 w-4" />
                Print Current
              </Button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by month or year..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedYear(new Date().getFullYear().toString());
                  setSelectedMonth("all");
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payslips Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              My Payslip History
            </span>
            <Badge variant="outline">{filteredPayslips.length} records</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Pay Date</TableHead>
                  <TableHead>Basic Salary</TableHead>
                  <TableHead>Allowances</TableHead>
                  <TableHead>Bonuses</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayslips.map((payslip) => (
                  <TableRow key={payslip.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {payslip.month} {payslip.year}
                        </p>
                        <p className="text-sm text-gray-500">
                          {payslip.presentDays}/{payslip.workingDays} days
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(payslip.payDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(payslip.basicSalary)}
                    </TableCell>
                    <TableCell className="text-blue-600">
                      {formatCurrency(payslip.allowances)}
                    </TableCell>
                    <TableCell className="text-green-600">
                      {formatCurrency(payslip.bonuses)}
                    </TableCell>
                    <TableCell className="text-red-600">
                      -{formatCurrency(payslip.deductions)}
                    </TableCell>
                    <TableCell className="font-bold text-green-600 text-lg">
                      {formatCurrency(payslip.netSalary)}
                    </TableCell>
                    <TableCell>{getStatusBadge(payslip.status)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 min-w-[140px]">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => downloadPayslip(payslip, "pdf")}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download PDF
                        </Button>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => viewPayslip(payslip)}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => printPayslip(payslip)}
                            className="flex-1"
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            Print
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPayslips.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No payslips found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security & Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Mail className="h-8 w-8 text-eduos-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-3">
                Contact HR for payslip queries
              </p>
              <Button variant="outline" size="sm">
                Email HR
              </Button>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <Lock className="h-8 w-8 text-eduos-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Secure Access</h4>
              <p className="text-sm text-gray-600 mb-3">
                Your data is encrypted and secure
              </p>
              <Button variant="outline" size="sm">
                Security Info
              </Button>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <Phone className="h-8 w-8 text-eduos-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Support Hotline</h4>
              <p className="text-sm text-gray-600 mb-3">
                Call for immediate assistance
              </p>
              <Button variant="outline" size="sm">
                +234 1 234 5678
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelfServiceStaffPortal;
