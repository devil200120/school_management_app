import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
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

const StaffPayslip = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Detect if we're in admin or accountant context
  const isAccountantView = location.pathname.includes("/accountant/");
  const baseRoute = isAccountantView ? "/accountant" : "/admin";

  const [isLoading, setIsLoading] = useState(true);

  // Sample staff payslip data
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
      email: "info@eduos.edu.ng",
      taxId: "RC-123456789",
    },
    payPeriod: {
      month: "November",
      year: "2024",
      startDate: "2024-11-01",
      endDate: "2024-11-30",
      payDate: "2024-11-30",
      workingDays: 22,
    },
    earnings: {
      basicSalary: 85000,
      housingAllowance: 15000,
      transportAllowance: 8000,
      utilityAllowance: 2000,
      overtimePayment: 3500,
      performanceBonus: 5000,
      totalEarnings: 118500,
    },
    deductions: {
      incomeTax: 8500,
      pensionContribution: 4250,
      nhfContribution: 1275,
      lifeInsurance: 850,
      cooperativeSavings: 2000,
      loanRepayment: 5000,
      totalDeductions: 21875,
    },
    netPay: 96625,
    attendanceInfo: {
      daysWorked: 20,
      daysAbsent: 2,
      overtimeHours: 7,
      lateArrivals: 1,
    },
    bankDetails: {
      bankName: "First Bank of Nigeria",
      accountNumber: "3012345678",
      accountName: "John Doe",
    },
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const printPayslip = () => {
    window.print();
    toast.success("Print dialog opened", {
      icon: <Printer className="h-4 w-4" />,
    });
  };

  const downloadPayslip = (format) => {
    // Simulate download
    toast.success(`Payslip Downloaded as ${format.toUpperCase()}`, {
      description: "Payslip has been saved to your downloads folder.",
      icon: <Download className="h-4 w-4" />,
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-eduos-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`${baseRoute}/reports`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in flex items-center gap-3">
              <CreditCard className="h-8 w-8" />
              Staff Payslip
            </h2>
            <p className="text-muted-foreground mt-1">
              {payslipData.payPeriod.month} {payslipData.payPeriod.year} -{" "}
              {payslipData.staffInfo.name}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={printPayslip}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button
            onClick={() => downloadPayslip("pdf")}
            className="bg-red-600 hover:bg-red-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Payslip Content */}
      <div className="max-w-4xl mx-auto bg-white">
        <div className="print:p-8 space-y-6">
          {/* Company Header */}
          <div className="text-center border-b-2 border-eduos-primary pb-6">
            <h1 className="text-3xl font-bold text-eduos-primary mb-2">
              {payslipData.companyInfo.name}
            </h1>
            <p className="text-gray-600 mb-1">
              {payslipData.companyInfo.address}
            </p>
            <p className="text-gray-600 mb-1">
              Tel: {payslipData.companyInfo.phone} | Email:{" "}
              {payslipData.companyInfo.email}
            </p>
            <p className="text-gray-600">
              Tax ID: {payslipData.companyInfo.taxId}
            </p>
          </div>

          {/* Payslip Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              SALARY PAYSLIP
            </h2>
            <div className="flex justify-center items-center gap-4 text-gray-600">
              <span>
                Pay Period: {payslipData.payPeriod.month}{" "}
                {payslipData.payPeriod.year}
              </span>
              <span>•</span>
              <span>
                Pay Date:{" "}
                {new Date(payslipData.payPeriod.payDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Employee Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Employee Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Employee Name
                    </label>
                    <p className="text-lg font-semibold">
                      {payslipData.staffInfo.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Employee ID
                    </label>
                    <p className="text-lg font-semibold">
                      {payslipData.staffInfo.id}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Position
                    </label>
                    <p className="font-medium">
                      {payslipData.staffInfo.position}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Department
                    </label>
                    <p className="font-medium">
                      {payslipData.staffInfo.department}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Grade
                    </label>
                    <p className="font-medium">{payslipData.staffInfo.grade}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Step
                    </label>
                    <p className="font-medium">{payslipData.staffInfo.step}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Pay Period & Attendance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Working Days
                    </label>
                    <p className="text-lg font-semibold">
                      {payslipData.payPeriod.workingDays}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Days Worked
                    </label>
                    <p className="text-lg font-semibold text-green-600">
                      {payslipData.attendanceInfo.daysWorked}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Days Absent
                    </label>
                    <p className="text-lg font-semibold text-red-600">
                      {payslipData.attendanceInfo.daysAbsent}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Overtime Hours
                    </label>
                    <p className="text-lg font-semibold text-blue-600">
                      {payslipData.attendanceInfo.overtimeHours}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Late Arrivals
                  </label>
                  <p className="text-lg font-semibold text-yellow-600">
                    {payslipData.attendanceInfo.lateArrivals}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Salary Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings */}
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <DollarSign className="h-5 w-5" />
                  Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Basic Salary</span>
                  <span className="font-semibold">
                    {formatCurrency(payslipData.earnings.basicSalary)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Housing Allowance</span>
                  <span>
                    {formatCurrency(payslipData.earnings.housingAllowance)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Transport Allowance</span>
                  <span>
                    {formatCurrency(payslipData.earnings.transportAllowance)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Utility Allowance</span>
                  <span>
                    {formatCurrency(payslipData.earnings.utilityAllowance)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Overtime Payment</span>
                  <span>
                    {formatCurrency(payslipData.earnings.overtimePayment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Performance Bonus</span>
                  <span>
                    {formatCurrency(payslipData.earnings.performanceBonus)}
                  </span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-bold text-lg text-green-600">
                  <span>Total Earnings</span>
                  <span>
                    {formatCurrency(payslipData.earnings.totalEarnings)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Deductions */}
            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <FileText className="h-5 w-5" />
                  Deductions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Income Tax (PAYE)</span>
                  <span className="font-semibold">
                    {formatCurrency(payslipData.deductions.incomeTax)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pension Contribution</span>
                  <span>
                    {formatCurrency(payslipData.deductions.pensionContribution)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>NHF Contribution</span>
                  <span>
                    {formatCurrency(payslipData.deductions.nhfContribution)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Life Insurance</span>
                  <span>
                    {formatCurrency(payslipData.deductions.lifeInsurance)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cooperative Savings</span>
                  <span>
                    {formatCurrency(payslipData.deductions.cooperativeSavings)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Repayment</span>
                  <span>
                    {formatCurrency(payslipData.deductions.loanRepayment)}
                  </span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-bold text-lg text-red-600">
                  <span>Total Deductions</span>
                  <span>
                    {formatCurrency(payslipData.deductions.totalDeductions)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Net Pay */}
          <Card className="border-4 border-eduos-primary bg-eduos-primary/5">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-eduos-primary">
                  NET PAY
                </h3>
                <p className="text-4xl font-bold text-eduos-primary">
                  {formatCurrency(payslipData.netPay)}
                </p>
                <p className="text-gray-600">
                  Paid to: {payslipData.bankDetails.bankName} -{" "}
                  {payslipData.bankDetails.accountNumber}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Bank Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Bank Name
                  </label>
                  <p className="font-semibold">
                    {payslipData.bankDetails.bankName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Account Number
                  </label>
                  <p className="font-semibold">
                    {payslipData.bankDetails.accountNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Account Name
                  </label>
                  <p className="font-semibold">
                    {payslipData.bankDetails.accountName}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="border-t pt-6 text-center text-gray-600 text-sm">
            <p className="mb-2">
              This payslip is computer generated and does not require a
              signature.
            </p>
            <p>
              For any queries regarding this payslip, please contact HR
              Department at hr@eduos.edu.ng
            </p>
            <p className="mt-4 font-medium">
              Generated on: {new Date().toLocaleDateString()} at{" "}
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPayslip;
