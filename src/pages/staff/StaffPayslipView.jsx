import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  ArrowLeft,
  Download,
  Printer,
  Building2,
  Calendar,
  User,
  CreditCard,
  DollarSign,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

const StaffPayslipView = () => {
  const { payslipId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Sample staff payslip data - in real app, this would be fetched based on payslipId
  const [payslipData] = useState({
    staffInfo: {
      id: "TCH001",
      name: "John Doe",
      position: "Senior Mathematics Teacher",
      department: "Mathematics",
      email: "john.doe@eduos.edu.ng",
      phone: "+234 803 123 4567",
      address: "123 Victoria Island, Lagos",
      employeeNumber: "EMP001",
      grade: "Level 12",
      step: "Step 7",
    },
    companyInfo: {
      name: "EDUOS International School",
      address: "456 Lekki Phase 1, Lagos State, Nigeria",
      phone: "+234 1 234 5678",
      email: "hr@eduos.edu.ng",
      logo: "/eduos2.png",
    },
    payslipDetails: {
      id: payslipId,
      month: "November",
      year: "2024",
      payDate: "2024-11-30",
      payPeriodStart: "2024-11-01",
      payPeriodEnd: "2024-11-30",
      workingDays: 22,
      presentDays: 20,
      leaveDays: 1,
      lateDays: 1,
      status: "paid",
    },
    earnings: {
      basicSalary: 85000,
      housingAllowance: 15000,
      transportAllowance: 8000,
      mealAllowance: 2000,
      performanceBonus: 5000,
      overtimeAllowance: 0,
    },
    deductions: {
      incomeTax: 7200,
      pensionContribution: 6800,
      nhfContribution: 850,
      cooperativeSavings: 2000,
      medicalInsurance: 1500,
      uniformDeduction: 0,
    },
  });

  const calculateTotals = () => {
    const totalEarnings = Object.values(payslipData.earnings).reduce(
      (sum, val) => sum + val,
      0
    );
    const totalDeductions = Object.values(payslipData.deductions).reduce(
      (sum, val) => sum + val,
      0
    );
    const netSalary = totalEarnings - totalDeductions;

    return { totalEarnings, totalDeductions, netSalary };
  };

  const totals = calculateTotals();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownloadPayslip = () => {
    // Generate and download the payslip
    const payslipContent = generatePayslipHTML();

    const printWindow = window.open("", "_blank");
    printWindow.document.write(payslipContent);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();

      // Create download link
      const link = document.createElement("a");
      const blob = new Blob([payslipContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.download = `${payslipData.staffInfo.name}_Payslip_${payslipData.payslipDetails.month}_${payslipData.payslipDetails.year}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      setTimeout(() => printWindow.close(), 1000);
    };

    toast.success("Payslip Downloaded", {
      description: "Payslip has been downloaded successfully.",
      icon: <Download className="h-4 w-4" />,
    });
  };

  const handlePrintPayslip = () => {
    const payslipContent = generatePayslipHTML();

    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(payslipContent);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      setTimeout(() => printWindow.close(), 1000);
    };

    toast.success("Opening Print Dialog", {
      description: "Print dialog has been opened.",
      icon: <Printer className="h-4 w-4" />,
    });
  };

  const generatePayslipHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payslip - ${payslipData.staffInfo.name} - ${
      payslipData.payslipDetails.month
    } ${payslipData.payslipDetails.year}</title>
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
            <h1>${payslipData.companyInfo.name}</h1>
            <p>Salary Statement - ${payslipData.payslipDetails.month} ${
      payslipData.payslipDetails.year
    }</p>
          </div>
          
          <div class="content">
            <div class="info-grid">
              <div class="info-section">
                <h3>Employee Information</h3>
                <div class="info-row">
                  <span class="label">Employee Name:</span>
                  <span class="value">${payslipData.staffInfo.name}</span>
                </div>
                <div class="info-row">
                  <span class="label">Employee ID:</span>
                  <span class="value">${
                    payslipData.staffInfo.employeeNumber
                  }</span>
                </div>
                <div class="info-row">
                  <span class="label">Position:</span>
                  <span class="value">${payslipData.staffInfo.position}</span>
                </div>
                <div class="info-row">
                  <span class="label">Department:</span>
                  <span class="value">${payslipData.staffInfo.department}</span>
                </div>
                <div class="info-row">
                  <span class="label">Email:</span>
                  <span class="value">${payslipData.staffInfo.email}</span>
                </div>
              </div>
              
              <div class="info-section">
                <h3>Pay Period Information</h3>
                <div class="info-row">
                  <span class="label">Pay Period:</span>
                  <span class="value">${payslipData.payslipDetails.month} ${
      payslipData.payslipDetails.year
    }</span>
                </div>
                <div class="info-row">
                  <span class="label">Pay Date:</span>
                  <span class="value">${new Date(
                    payslipData.payslipDetails.payDate
                  ).toLocaleDateString()}</span>
                </div>
                <div class="info-row">
                  <span class="label">Working Days:</span>
                  <span class="value">${
                    payslipData.payslipDetails.workingDays
                  }</span>
                </div>
                <div class="info-row">
                  <span class="label">Present Days:</span>
                  <span class="value">${
                    payslipData.payslipDetails.presentDays
                  }</span>
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
                    payslipData.earnings.basicSalary
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Housing Allowance</td>
                  <td style="text-align: right;" class="earnings">${formatCurrency(
                    payslipData.earnings.housingAllowance
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Transport Allowance</td>
                  <td style="text-align: right;" class="earnings">${formatCurrency(
                    payslipData.earnings.transportAllowance
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Meal Allowance</td>
                  <td style="text-align: right;" class="earnings">${formatCurrency(
                    payslipData.earnings.mealAllowance
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Performance Bonus</td>
                  <td style="text-align: right;" class="earnings">${formatCurrency(
                    payslipData.earnings.performanceBonus
                  )}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td><strong>Total Earnings</strong></td>
                  <td style="text-align: right;" class="earnings"><strong>${formatCurrency(
                    totals.totalEarnings
                  )}</strong></td>
                </tr>
                <tr>
                  <td><strong>Deductions</strong></td>
                  <td></td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Income Tax</td>
                  <td style="text-align: right;" class="deductions">${formatCurrency(
                    payslipData.deductions.incomeTax
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Pension (8%)</td>
                  <td style="text-align: right;" class="deductions">${formatCurrency(
                    payslipData.deductions.pensionContribution
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;NHF Contribution</td>
                  <td style="text-align: right;" class="deductions">${formatCurrency(
                    payslipData.deductions.nhfContribution
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Cooperative Savings</td>
                  <td style="text-align: right;" class="deductions">${formatCurrency(
                    payslipData.deductions.cooperativeSavings
                  )}</td>
                </tr>
                <tr>
                  <td>&nbsp;&nbsp;&nbsp;Medical Insurance</td>
                  <td style="text-align: right;" class="deductions">${formatCurrency(
                    payslipData.deductions.medicalInsurance
                  )}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td><strong>Total Deductions</strong></td>
                  <td style="text-align: right;" class="deductions"><strong>${formatCurrency(
                    totals.totalDeductions
                  )}</strong></td>
                </tr>
                <tr class="net-salary">
                  <td><strong>NET SALARY</strong></td>
                  <td style="text-align: right;"><strong>${formatCurrency(
                    totals.netSalary
                  )}</strong></td>
                </tr>
              </tbody>
            </table>

            <div class="footer">
              <p><strong>${payslipData.companyInfo.name}</strong></p>
              <p>${payslipData.companyInfo.address}</p>
              <p>Phone: ${payslipData.companyInfo.phone} | Email: ${
      payslipData.companyInfo.email
    }</p>
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
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/staff")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payslips
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-eduos-primary">
              Payslip Details
            </h1>
            <p className="text-gray-600">
              {payslipData.payslipDetails.month}{" "}
              {payslipData.payslipDetails.year} - {payslipData.staffInfo.name}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleDownloadPayslip}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" onClick={handlePrintPayslip}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Company Header */}
      <Card className="mb-6 border-2 border-eduos-primary">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-blue-700 text-white text-center">
          <div className="flex items-center justify-center gap-4">
            <Building2 className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">
                {payslipData.companyInfo.name}
              </CardTitle>
              <p className="text-blue-100 text-sm mt-1">
                Salary Statement - {payslipData.payslipDetails.month}{" "}
                {payslipData.payslipDetails.year}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Employee & Pay Period Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-eduos-primary">
              <User className="h-5 w-5" />
              Employee Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Employee Name:</span>
              <span className="font-semibold">
                {payslipData.staffInfo.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Employee ID:</span>
              <span>{payslipData.staffInfo.employeeNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Position:</span>
              <span>{payslipData.staffInfo.position}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Department:</span>
              <span>{payslipData.staffInfo.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-blue-600">
                {payslipData.staffInfo.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Phone:</span>
              <span>{payslipData.staffInfo.phone}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-eduos-primary">
              <Calendar className="h-5 w-5" />
              Pay Period Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Pay Period:</span>
              <span className="font-semibold">
                {payslipData.payslipDetails.month}{" "}
                {payslipData.payslipDetails.year}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Pay Date:</span>
              <span>
                {new Date(
                  payslipData.payslipDetails.payDate
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Working Days:</span>
              <span>{payslipData.payslipDetails.workingDays}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Present Days:</span>
              <span className="text-green-600 font-semibold">
                {payslipData.payslipDetails.presentDays}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Leave Days:</span>
              <span className="text-orange-600">
                {payslipData.payslipDetails.leaveDays}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Late Days:</span>
              <span className="text-red-600">
                {payslipData.payslipDetails.lateDays}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Breakdown */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-eduos-primary">
            <CreditCard className="h-5 w-5" />
            Salary Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">
                    Amount (₦)
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Earnings Section */}
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold text-green-800">
                    EARNINGS
                  </td>
                  <td className="border border-gray-300 px-4 py-3"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pl-8">
                    Basic Salary
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-green-600 font-semibold">
                    {formatCurrency(payslipData.earnings.basicSalary)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pl-8">
                    Housing Allowance
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-green-600 font-semibold">
                    {formatCurrency(payslipData.earnings.housingAllowance)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pl-8">
                    Transport Allowance
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-green-600 font-semibold">
                    {formatCurrency(payslipData.earnings.transportAllowance)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pl-8">
                    Meal Allowance
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-green-600 font-semibold">
                    {formatCurrency(payslipData.earnings.mealAllowance)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pl-8">
                    Performance Bonus
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-green-600 font-semibold">
                    {formatCurrency(payslipData.earnings.performanceBonus)}
                  </td>
                </tr>
                <tr className="bg-green-100 border-t-2 border-green-300">
                  <td className="border border-gray-300 px-4 py-3 font-bold text-green-800">
                    TOTAL EARNINGS
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold text-green-800 text-lg">
                    {formatCurrency(totals.totalEarnings)}
                  </td>
                </tr>

                {/* Deductions Section */}
                <tr className="bg-red-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold text-red-800">
                    DEDUCTIONS
                  </td>
                  <td className="border border-gray-300 px-4 py-3"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pl-8">
                    Income Tax
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-red-600 font-semibold">
                    {formatCurrency(payslipData.deductions.incomeTax)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pl-8">
                    Pension Contribution (8%)
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-red-600 font-semibold">
                    {formatCurrency(payslipData.deductions.pensionContribution)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pl-8">
                    NHF Contribution
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-red-600 font-semibold">
                    {formatCurrency(payslipData.deductions.nhfContribution)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pl-8">
                    Cooperative Savings
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-red-600 font-semibold">
                    {formatCurrency(payslipData.deductions.cooperativeSavings)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pl-8">
                    Medical Insurance
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-red-600 font-semibold">
                    {formatCurrency(payslipData.deductions.medicalInsurance)}
                  </td>
                </tr>
                <tr className="bg-red-100 border-t-2 border-red-300">
                  <td className="border border-gray-300 px-4 py-3 font-bold text-red-800">
                    TOTAL DEDUCTIONS
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold text-red-800 text-lg">
                    {formatCurrency(totals.totalDeductions)}
                  </td>
                </tr>

                {/* Net Salary */}
                <tr className="bg-gradient-to-r from-green-100 to-green-50 border-t-4 border-green-500">
                  <td className="border border-gray-300 px-4 py-4 font-bold text-green-900 text-xl">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-6 w-6" />
                      NET SALARY
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-right font-bold text-green-900 text-2xl">
                    {formatCurrency(totals.netSalary)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Footer Information */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-600">
            <p className="font-semibold text-lg mb-2">
              {payslipData.companyInfo.name}
            </p>
            <p className="text-sm">{payslipData.companyInfo.address}</p>
            <p className="text-sm">
              Phone: {payslipData.companyInfo.phone} | Email:{" "}
              {payslipData.companyInfo.email}
            </p>
            <p className="text-xs mt-4 text-gray-500">
              This is a computer-generated document. Generated on{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPayslipView;
