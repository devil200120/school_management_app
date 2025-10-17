import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import {
  Search,
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  User,
  Building,
} from "lucide-react";
import { toast } from "sonner";

const ManageSalary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  // Sample salary data with comprehensive information
  const [salaries, setSalaries] = useState([
    {
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
      approvedBy: null,
      paymentDate: null,
      bankAccount: "1234567890",
      bank: "First Bank",
      taxDeduction: 5000,
      pensionContribution: 3000,
      createdDate: "2024-12-01",
    },
    {
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
      approvedBy: "Admin User",
      paymentDate: "2024-12-15",
      bankAccount: "0987654321",
      bank: "GTBank",
      taxDeduction: 8000,
      pensionContribution: 4000,
      createdDate: "2024-12-01",
    },
    {
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
      approvedBy: "Admin User",
      paymentDate: "2024-12-10",
      bankAccount: "1122334455",
      bank: "Zenith Bank",
      taxDeduction: 4000,
      pensionContribution: 2000,
      createdDate: "2024-12-01",
    },
    {
      id: 4,
      employeeId: "EMP004",
      employeeName: "Sarah Wilson",
      department: "Administration",
      position: "Secretary",
      baseSalary: 80000,
      allowances: 15000,
      overtime: 8000,
      deductions: 4000,
      netSalary: 99000,
      month: "December",
      year: "2024",
      status: "Rejected",
      approvedBy: null,
      paymentDate: null,
      bankAccount: "5566778899",
      bank: "UBA",
      taxDeduction: 2000,
      pensionContribution: 2000,
      createdDate: "2024-12-01",
    },
  ]);

  // Filter salaries based on search term
  const filteredSalaries = salaries.filter(
    (salary) =>
      salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle salary actions
  const handleView = (salary) => {
    setSelectedSalary(salary);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (salary) => {
    toast.info(`Edit Salary`, {
      description: `Redirecting to edit salary for ${salary.employeeName}...`,
      icon: <Edit className="h-4 w-4" />,
      duration: 2000,
    });
    // Navigate to edit page with salary ID
    navigate(`/admin/salary-management/edit/${salary.id}`);
  };

  const handleDelete = (salary) => {
    setSelectedSalary(salary);
    setActionType("delete");
    setIsDeleteDialogOpen(true);
  };

  const handleApprove = (salary) => {
    setSelectedSalary(salary);
    setActionType("approve");
    setIsApproveDialogOpen(true);
  };

  const handleReject = (salary) => {
    setSelectedSalary(salary);
    setActionType("reject");
    setIsApproveDialogOpen(true);
  };

  const confirmDelete = () => {
    setSalaries((prev) =>
      prev.filter((salary) => salary.id !== selectedSalary.id)
    );
    setIsDeleteDialogOpen(false);
    toast.success(`Salary Record Deleted`, {
      description: `Salary record for ${selectedSalary.employeeName} has been permanently deleted.`,
      icon: <Trash2 className="h-4 w-4" />,
      duration: 4000,
    });
    setSelectedSalary(null);
  };

  const confirmAction = () => {
    const newStatus = actionType === "approve" ? "Approved" : "Rejected";
    setSalaries((prev) =>
      prev.map((salary) =>
        salary.id === selectedSalary.id
          ? {
              ...salary,
              status: newStatus,
              approvedBy: actionType === "approve" ? "Admin User" : null,
            }
          : salary
      )
    );
    setIsApproveDialogOpen(false);
    toast.success(
      `Salary ${actionType === "approve" ? "Approved" : "Rejected"}`,
      {
        description: `${selectedSalary.employeeName}'s salary has been ${actionType}d successfully.`,
        icon:
          actionType === "approve" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          ),
        duration: 4000,
      }
    );
    setSelectedSalary(null);
    setActionType("");
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "Employee ID",
        "Employee Name",
        "Department",
        "Position",
        "Base Salary",
        "Allowances",
        "Overtime",
        "Deductions",
        "Net Salary",
        "Month",
        "Year",
        "Status",
      ],
      ...filteredSalaries.map((salary) => [
        salary.employeeId,
        salary.employeeName,
        salary.department,
        salary.position,
        salary.baseSalary.toLocaleString(),
        salary.allowances.toLocaleString(),
        salary.overtime.toLocaleString(),
        salary.deductions.toLocaleString(),
        salary.netSalary.toLocaleString(),
        salary.month,
        salary.year,
        salary.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `salary_records_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`CSV Export Complete`, {
      description: `Successfully exported ${filteredSalaries.length} salary records to CSV file.`,
      icon: <FileSpreadsheet className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredSalaries
      .map(
        (salary) =>
          `${salary.employeeId} - ${salary.employeeName} (${
            salary.department
          }) - ₦${salary.netSalary.toLocaleString()} - ${salary.month} ${
            salary.year
          } - ${salary.status}`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `salary_records_${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`Text Export Complete`, {
      description: `Successfully exported ${filteredSalaries.length} salary records to text file.`,
      icon: <FileText className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info(`Print Dialog Opened`, {
      description: `Preparing to print ${filteredSalaries.length} salary records.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredSalaries
      .map(
        (salary) =>
          `${salary.employeeId}\t${salary.employeeName}\t${
            salary.department
          }\t${salary.position}\t₦${salary.netSalary.toLocaleString()}\t${
            salary.month
          } ${salary.year}\t${salary.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success(`Copied to Clipboard`, {
          description: `Successfully copied ${filteredSalaries.length} salary records to clipboard.`,
          icon: <Copy className="h-4 w-4" />,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error(`Copy Failed`, {
          description: `Unable to copy data to clipboard. Please try again.`,
          icon: <XCircle className="h-4 w-4" />,
          duration: 3000,
        });
      });
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
          Manage Salary Records
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Salary Management System
            <Badge className="bg-white text-eduos-primary ml-auto">
              {filteredSalaries.length} Records
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search salary records..."
                className="pl-10 px-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-green-50 hover:border-green-300"
                onClick={handleExportCSV}
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>CSV</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                onClick={handleExportText}
              >
                <FileText className="h-4 w-4" />
                <span>Text</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-gray-50 hover:border-gray-300"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Employee ID</TableHead>
                  <TableHead className="bg-gray-100">Employee Name</TableHead>
                  <TableHead className="bg-gray-100">Department</TableHead>
                  <TableHead className="bg-gray-100">Position</TableHead>
                  <TableHead className="bg-gray-100">Net Salary</TableHead>
                  <TableHead className="bg-gray-100">Period</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSalaries.map((salary) => (
                  <TableRow
                    key={salary.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {salary.employeeId}
                    </TableCell>
                    <TableCell>{salary.employeeName}</TableCell>
                    <TableCell>{salary.department}</TableCell>
                    <TableCell>{salary.position}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ₦{salary.netSalary.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {salary.month} {salary.year}
                    </TableCell>
                    <TableCell>{getStatusBadge(salary.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                          onClick={() => handleView(salary)}
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-yellow-50 hover:border-yellow-300"
                          onClick={() => handleEdit(salary)}
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </Button>
                        {salary.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 flex items-center gap-1"
                              onClick={() => handleApprove(salary)}
                            >
                              <CheckCircle size={14} />
                              <span>Approve</span>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => handleReject(salary)}
                            >
                              <XCircle size={14} />
                              <span>Reject</span>
                            </Button>
                          </>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleDelete(salary)}
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSalaries.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      {searchTerm
                        ? `No salary records found matching "${searchTerm}"`
                        : "No salary records found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Salary Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Salary Details
            </DialogTitle>
          </DialogHeader>
          {selectedSalary && (
            <div className="space-y-6">
              {/* Employee Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Employee Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Employee ID
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedSalary.employeeId}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedSalary.employeeName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Department
                    </label>
                    <p className="text-sm">{selectedSalary.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Position
                    </label>
                    <p className="text-sm">{selectedSalary.position}</p>
                  </div>
                </div>
              </div>

              {/* Salary Breakdown */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Salary Breakdown
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Base Salary
                    </label>
                    <p className="text-sm font-semibold text-green-600">
                      ₦{selectedSalary.baseSalary.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Allowances
                    </label>
                    <p className="text-sm font-semibold text-blue-600">
                      ₦{selectedSalary.allowances.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Overtime Pay
                    </label>
                    <p className="text-sm font-semibold text-purple-600">
                      ₦{selectedSalary.overtime.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Total Deductions
                    </label>
                    <p className="text-sm font-semibold text-red-600">
                      ₦{selectedSalary.deductions.toLocaleString()}
                    </p>
                  </div>
                  <div className="col-span-2 border-t pt-3">
                    <label className="text-sm font-medium text-gray-500">
                      Net Salary
                    </label>
                    <p className="text-lg font-bold text-green-600">
                      ₦{selectedSalary.netSalary.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Period
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedSalary.month} {selectedSalary.year}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <div className="mt-1">
                      {getStatusBadge(selectedSalary.status)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Bank
                    </label>
                    <p className="text-sm">{selectedSalary.bank}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Account Number
                    </label>
                    <p className="text-sm font-mono">
                      {selectedSalary.bankAccount}
                    </p>
                  </div>
                  {selectedSalary.approvedBy && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Approved By
                      </label>
                      <p className="text-sm">{selectedSalary.approvedBy}</p>
                    </div>
                  )}
                  {selectedSalary.paymentDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Payment Date
                      </label>
                      <p className="text-sm">{selectedSalary.paymentDate}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Salary Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the salary record for{" "}
              <strong>{selectedSalary?.employeeName}</strong>? This action
              cannot be undone and will permanently remove this salary record
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Approve/Reject Confirmation Dialog */}
      <AlertDialog
        open={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "approve" ? "Approve" : "Reject"} Salary
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {actionType} the salary for{" "}
              <strong>{selectedSalary?.employeeName}</strong>?{" "}
              {actionType === "approve"
                ? "This will mark the salary as approved and ready for payment processing."
                : "This will reject the salary and it will need to be reviewed again."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              className={
                actionType === "approve"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }
            >
              {actionType === "approve" ? "Approve Salary" : "Reject Salary"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageSalary;
