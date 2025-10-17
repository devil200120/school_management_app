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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  Search,
  FileText,
  FileSpreadsheet,
  Printer,
  Copy,
  Download,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Users,
  CreditCard,
  Save,
  Check,
} from "lucide-react";
import { toast } from "sonner";

const ManageCustomizationPayment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    studentName: "",
    admissionNo: "",
    class: "",
    term: "",
    amount: "",
    amountRemain: "",
    status: "",
  });

  // Sample data for demonstration with enhanced payment information
  const [payments, setPayments] = useState([
    {
      id: 1,
      transactionId: "TRX-12345",
      admissionNo: "ADM-2023-001",
      studentName: "John Doe",
      class: "Class 10A",
      term: "First Term",
      session: "2024/2025",
      amountRemain: 200,
      amount: 500,
      status: "partial",
      paymentDate: "2024-01-15",
    },
    {
      id: 2,
      transactionId: "TRX-67890",
      admissionNo: "ADM-2023-002",
      studentName: "Jane Smith",
      class: "Class 10B",
      term: "First Term",
      session: "2024/2025",
      amountRemain: 0,
      amount: 500,
      status: "completed",
      paymentDate: "2024-01-10",
    },
    {
      id: 3,
      transactionId: "TRX-54321",
      admissionNo: "ADM-2023-003",
      studentName: "Alice Johnson",
      class: "Class 10A",
      term: "First Term",
      session: "2024/2025",
      amountRemain: 100,
      amount: 500,
      status: "partial",
      paymentDate: "2024-01-12",
    },
    {
      id: 4,
      transactionId: "TRX-09876",
      admissionNo: "ADM-2023-004",
      studentName: "Bob Brown",
      class: "Class 10C",
      term: "First Term",
      session: "2024/2025",
      amountRemain: 500,
      amount: 500,
      status: "pending",
      paymentDate: "2024-01-08",
    },
    {
      id: 5,
      transactionId: "TRX-11111",
      admissionNo: "ADM-2023-005",
      studentName: "Sarah Wilson",
      class: "Class 10B",
      term: "First Term",
      session: "2024/2025",
      amountRemain: 0,
      amount: 500,
      status: "completed",
      paymentDate: "2024-01-14",
    },
  ]);

  // Filter payments based on search term
  const filteredPayments = payments.filter(
    (payment) =>
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "S/N",
        "Transaction ID",
        "Admission No",
        "Student Name",
        "Class",
        "Term",
        "Session",
        "Amount",
        "Amount Remain",
        "Status",
        "Payment Date",
      ],
      ...filteredPayments.map((payment) => [
        payment.id,
        payment.transactionId,
        payment.admissionNo,
        payment.studentName,
        payment.class,
        payment.term,
        payment.session,
        `₦${payment.amount}`,
        `₦${payment.amountRemain}`,
        payment.status,
        payment.paymentDate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payment_customization_records.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredPayments.length} payment records to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportPDF = () => {
    // Simulate PDF generation
    toast.success("PDF Export Complete", {
      description: `Successfully exported ${filteredPayments.length} payment records to PDF file.`,
      icon: <FileText className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print Dialog Opened", {
      description: `Preparing to print ${filteredPayments.length} payment records.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredPayments
      .map(
        (payment) =>
          `${payment.id}\t${payment.transactionId}\t${payment.admissionNo}\t${payment.studentName}\t${payment.class}\t${payment.term}\t₦${payment.amount}\t₦${payment.amountRemain}\t${payment.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredPayments.length} payment records to clipboard.`,
          icon: <Copy className="h-4 w-4" />,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error("Copy Failed", {
          description: "Unable to copy data to clipboard. Please try again.",
          duration: 3000,
        });
      });
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  const handleEditPayment = (payment) => {
    setSelectedPayment(payment);
    setEditForm({
      studentName: payment.studentName,
      admissionNo: payment.admissionNo,
      class: payment.class,
      term: payment.term,
      amount: payment.amount.toString(),
      amountRemain: payment.amountRemain.toString(),
      status: payment.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdatePayment = () => {
    if (!editForm.studentName || !editForm.admissionNo || !editForm.amount) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
        duration: 3000,
      });
      return;
    }

    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === selectedPayment.id
          ? {
              ...payment,
              studentName: editForm.studentName,
              admissionNo: editForm.admissionNo,
              class: editForm.class,
              term: editForm.term,
              amount: parseFloat(editForm.amount),
              amountRemain: parseFloat(editForm.amountRemain),
              status: editForm.status,
            }
          : payment
      )
    );

    setIsEditDialogOpen(false);
    setSelectedPayment(null);
    setEditForm({
      studentName: "",
      admissionNo: "",
      class: "",
      term: "",
      amount: "",
      amountRemain: "",
      status: "",
    });

    toast.success("Payment Record Updated", {
      description: `${editForm.studentName}'s payment record has been updated successfully.`,
      icon: <Check className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleDeletePayment = (payment) => {
    setPayments((prev) => prev.filter((p) => p.id !== payment.id));
    toast.success("Payment Record Deleted", {
      description: `Payment record for ${payment.studentName} has been deleted successfully.`,
      icon: <Trash2 className="h-4 w-4" />,
      duration: 4000,
    });
  };

  // Calculate statistics
  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const totalRemaining = filteredPayments.reduce(
    (sum, payment) => sum + payment.amountRemain,
    0
  );
  const totalPaid = totalAmount - totalRemaining;
  const completedPayments = filteredPayments.filter(
    (p) => p.status === "completed"
  ).length;

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Student Payment
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in delay-100">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredPayments.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  ₦{totalPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-full mr-4">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Amount Remaining
                </p>
                <p className="text-2xl font-bold text-red-600">
                  ₦{totalRemaining.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-full mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-purple-600">
                  {completedPayments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-3 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Records
            <Badge className="bg-white text-blue-600 ml-auto">
              {filteredPayments.length} Records
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
                placeholder="Search payments..."
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
                className="flex items-center gap-1 hover:bg-red-50 hover:border-red-300"
                onClick={handleExportPDF}
              >
                <FileText className="h-4 w-4" />
                <span>PDF</span>
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
                  <TableHead className="bg-gray-100">S/N</TableHead>
                  <TableHead className="bg-gray-100">Transaction ID</TableHead>
                  <TableHead className="bg-gray-100">Admission No.</TableHead>
                  <TableHead className="bg-gray-100">Student Name</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Term</TableHead>
                  <TableHead className="bg-gray-100">Amount</TableHead>
                  <TableHead className="bg-gray-100">Amount Remain</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {payment.transactionId}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {payment.admissionNo}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {payment.studentName}
                    </TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>{payment.term}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ₦{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className={`font-semibold ${
                        payment.amountRemain > 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      ₦{payment.amountRemain.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : payment.status === "partial"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {payment.status === "completed"
                          ? "Completed"
                          : payment.status === "partial"
                          ? "Partial"
                          : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                          onClick={() => handleViewPayment(payment)}
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-yellow-50 hover:border-yellow-300"
                          onClick={() => handleEditPayment(payment)}
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-red-700 transition-colors"
                          onClick={() => handleDeletePayment(payment)}
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPayments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8">
                      {searchTerm
                        ? `No payment records found matching "${searchTerm}"`
                        : "No payment records found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Payment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Transaction ID
                  </label>
                  <p className="text-sm font-semibold font-mono">
                    {selectedPayment.transactionId}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Student Name
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedPayment.studentName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Admission No.
                  </label>
                  <p className="text-sm font-mono">
                    {selectedPayment.admissionNo}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Class
                  </label>
                  <p className="text-sm">{selectedPayment.class}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Term
                  </label>
                  <p className="text-sm">{selectedPayment.term}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Session
                  </label>
                  <p className="text-sm">{selectedPayment.session}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Total Amount
                  </label>
                  <p className="text-sm font-semibold text-green-600">
                    ₦{selectedPayment.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Amount Remaining
                  </label>
                  <p
                    className={`text-sm font-semibold ${
                      selectedPayment.amountRemain > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    ₦{selectedPayment.amountRemain.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Payment Date
                  </label>
                  <p className="text-sm">{selectedPayment.paymentDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge
                    className={`${
                      selectedPayment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : selectedPayment.status === "partial"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedPayment.status.charAt(0).toUpperCase() +
                      selectedPayment.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Payment Progress
                </label>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      Paid: ₦
                      {(
                        selectedPayment.amount - selectedPayment.amountRemain
                      ).toLocaleString()}
                    </span>
                    <span>
                      Remaining: ₦
                      {selectedPayment.amountRemain.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${
                          ((selectedPayment.amount -
                            selectedPayment.amountRemain) /
                            selectedPayment.amount) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Payment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Payment Record</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editStudentName">Student Name</Label>
              <Input
                id="editStudentName"
                value={editForm.studentName}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    studentName: e.target.value,
                  }))
                }
                placeholder="Enter student name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editAdmissionNo">Admission Number</Label>
              <Input
                id="editAdmissionNo"
                value={editForm.admissionNo}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    admissionNo: e.target.value,
                  }))
                }
                placeholder="Enter admission number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editClass">Class</Label>
              <Select
                value={editForm.class}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, class: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 10A">Class 10A</SelectItem>
                  <SelectItem value="Class 10B">Class 10B</SelectItem>
                  <SelectItem value="Class 10C">Class 10C</SelectItem>
                  <SelectItem value="Class 11A">Class 11A</SelectItem>
                  <SelectItem value="Class 11B">Class 11B</SelectItem>
                  <SelectItem value="Class 12A">Class 12A</SelectItem>
                  <SelectItem value="Class 12B">Class 12B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editTerm">Term</Label>
              <Select
                value={editForm.term}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, term: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Term">First Term</SelectItem>
                  <SelectItem value="Second Term">Second Term</SelectItem>
                  <SelectItem value="Third Term">Third Term</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editAmount">Total Amount (₦)</Label>
                <Input
                  id="editAmount"
                  type="number"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  placeholder="Enter total amount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editAmountRemain">Amount Remaining (₦)</Label>
                <Input
                  id="editAmountRemain"
                  type="number"
                  value={editForm.amountRemain}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      amountRemain: e.target.value,
                    }))
                  }
                  placeholder="Enter remaining amount"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editStatus">Payment Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdatePayment}>
              <Save className="h-4 w-4 mr-2" />
              Update Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCustomizationPayment;
