import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  DollarSign,
  User,
  Building,
  Save,
  ArrowLeft,
  Calculator,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

const EditSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    department: "",
    position: "",
    baseSalary: "",
    allowances: "",
    overtime: "",
    deductions: "",
    netSalary: "",
    month: "",
    year: "",
    status: "",
    bankAccount: "",
    bank: "",
    taxDeduction: "",
    pensionContribution: "",
  });

  // Mock data - in real app, this would fetch from API
  useEffect(() => {
    // Simulate loading salary data
    const mockSalaryData = {
      1: {
        id: 1,
        employeeId: "EMP001",
        employeeName: "John Doe",
        department: "Mathematics",
        position: "Senior Teacher",
        baseSalary: 150000,
        allowances: 25000,
        overtime: 15000,
        deductions: 8000,
        netSalary: 182000,
        month: "December",
        year: "2024",
        status: "Pending",
        bankAccount: "1234567890",
        bank: "First Bank",
        taxDeduction: 5000,
        pensionContribution: 3000,
      },
      2: {
        id: 2,
        employeeId: "EMP002",
        employeeName: "Jane Smith",
        department: "English",
        position: "Head Teacher",
        baseSalary: 180000,
        allowances: 30000,
        overtime: 10000,
        deductions: 12000,
        netSalary: 208000,
        month: "December",
        year: "2024",
        status: "Approved",
        bankAccount: "0987654321",
        bank: "GTBank",
        taxDeduction: 8000,
        pensionContribution: 4000,
      },
      3: {
        id: 3,
        employeeId: "EMP003",
        employeeName: "Michael Johnson",
        department: "Science",
        position: "Teacher",
        baseSalary: 120000,
        allowances: 20000,
        overtime: 12000,
        deductions: 6000,
        netSalary: 146000,
        month: "December",
        year: "2024",
        status: "Paid",
        bankAccount: "1122334455",
        bank: "Zenith Bank",
        taxDeduction: 4000,
        pensionContribution: 2000,
      },
    };

    const salaryData = mockSalaryData[id];
    if (salaryData) {
      setFormData({
        employeeId: salaryData.employeeId,
        employeeName: salaryData.employeeName,
        department: salaryData.department,
        position: salaryData.position,
        baseSalary: salaryData.baseSalary.toString(),
        allowances: salaryData.allowances.toString(),
        overtime: salaryData.overtime.toString(),
        deductions: salaryData.deductions.toString(),
        netSalary: salaryData.netSalary.toString(),
        month: salaryData.month,
        year: salaryData.year,
        status: salaryData.status,
        bankAccount: salaryData.bankAccount,
        bank: salaryData.bank,
        taxDeduction: salaryData.taxDeduction.toString(),
        pensionContribution: salaryData.pensionContribution.toString(),
      });
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-calculate net salary when base salary, allowances, overtime, or deductions change
      if (
        [
          "baseSalary",
          "allowances",
          "overtime",
          "deductions",
          "taxDeduction",
          "pensionContribution",
        ].includes(field)
      ) {
        const baseSalary = parseFloat(updated.baseSalary) || 0;
        const allowances = parseFloat(updated.allowances) || 0;
        const overtime = parseFloat(updated.overtime) || 0;
        const deductions = parseFloat(updated.deductions) || 0;
        const taxDeduction = parseFloat(updated.taxDeduction) || 0;
        const pensionContribution =
          parseFloat(updated.pensionContribution) || 0;

        const grossSalary = baseSalary + allowances + overtime;
        const totalDeductions = deductions + taxDeduction + pensionContribution;
        const netSalary = grossSalary - totalDeductions;

        updated.netSalary = netSalary.toString();
      }

      return updated;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(`Salary Updated Successfully`, {
        description: `${formData.employeeName}'s salary record has been updated for ${formData.month} ${formData.year}.`,
        icon: <Save className="h-4 w-4" />,
        duration: 4000,
      });

      // Navigate back to manage salary
      navigate("/admin/salary-management/manage");
    } catch (error) {
      toast.error(`Update Failed`, {
        description: `Failed to update salary record. Please try again.`,
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/salary-management/manage");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Pending
          </Badge>
        );
      case "Approved":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Approved
          </Badge>
        );
      case "Paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Paid
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Edit Salary Record
        </h2>
        <Button
          variant="outline"
          onClick={handleCancel}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Manage Salary
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee Information */}
        <Card className="animate-fade-in delay-100">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Employee Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeName">Employee Name</Label>
                <Input
                  id="employeeName"
                  value={formData.employeeName}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary Details */}
        <Card className="animate-fade-in delay-200">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Salary Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="baseSalary">Base Salary (₦)</Label>
                <Input
                  id="baseSalary"
                  type="number"
                  value={formData.baseSalary}
                  onChange={(e) =>
                    handleInputChange("baseSalary", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowances">Allowances (₦)</Label>
                <Input
                  id="allowances"
                  type="number"
                  value={formData.allowances}
                  onChange={(e) =>
                    handleInputChange("allowances", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="overtime">Overtime Pay (₦)</Label>
                <Input
                  id="overtime"
                  type="number"
                  value={formData.overtime}
                  onChange={(e) =>
                    handleInputChange("overtime", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deductions">Other Deductions (₦)</Label>
                <Input
                  id="deductions"
                  type="number"
                  value={formData.deductions}
                  onChange={(e) =>
                    handleInputChange("deductions", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxDeduction">Tax Deduction (₦)</Label>
                <Input
                  id="taxDeduction"
                  type="number"
                  value={formData.taxDeduction}
                  onChange={(e) =>
                    handleInputChange("taxDeduction", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pensionContribution">
                  Pension Contribution (₦)
                </Label>
                <Input
                  id="pensionContribution"
                  type="number"
                  value={formData.pensionContribution}
                  onChange={(e) =>
                    handleInputChange("pensionContribution", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Net Salary Display */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-green-800">
                  Net Salary:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ₦
                  {formData.netSalary
                    ? parseFloat(formData.netSalary).toLocaleString()
                    : "0"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Period and Status */}
        <Card className="animate-fade-in delay-300">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <select
                  id="month"
                  value={formData.month}
                  onChange={(e) => handleInputChange("month", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <select
                  id="year"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Paid">Paid</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Current Status</Label>
                <div className="mt-2">{getStatusBadge(formData.status)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Information */}
        <Card className="animate-fade-in delay-400">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Bank Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bank">Bank Name</Label>
                <select
                  id="bank"
                  value={formData.bank}
                  onChange={(e) => handleInputChange("bank", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Bank</option>
                  <option value="First Bank">First Bank</option>
                  <option value="GTBank">GTBank</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="UBA">UBA</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="Fidelity Bank">Fidelity Bank</option>
                  <option value="Union Bank">Union Bank</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Account Number</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) =>
                    handleInputChange("bankAccount", e.target.value)
                  }
                  placeholder="Enter account number"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <Card className="animate-fade-in delay-500">
          <CardContent className="p-6">
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Salary
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default EditSalary;
