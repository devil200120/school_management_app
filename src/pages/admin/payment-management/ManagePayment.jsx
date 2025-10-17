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
  Eye,
  Receipt,
  Download,
  DollarSign,
  Users,
  CreditCard,
  Calendar,
  Check,
  X,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const ManagePayment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    studentName: "",
    class: "",
    amount: "",
    status: "",
  });

  // Sample data for demonstration with enhanced payment information
  const [payments, setPayments] = useState([
    {
      id: 1,
      transactionId: "TRX-12345",
      studentName: "John Doe",
      admissionNo: "ADM-2023-001",
      class: "Class 10A",
      amount: 500,
      date: "2023-04-15",
      status: "Completed",
      paymentMethod: "Bank Transfer",
      description: "School fees for First Term",
    },
    {
      id: 2,
      transactionId: "TRX-67890",
      studentName: "Jane Smith",
      admissionNo: "ADM-2023-002",
      class: "Class 10B",
      amount: 500,
      date: "2023-04-14",
      status: "Pending",
      paymentMethod: "Card Payment",
      description: "School fees for First Term",
    },
    {
      id: 3,
      transactionId: "TRX-54321",
      studentName: "Alice Johnson",
      admissionNo: "ADM-2023-003",
      class: "Class 10A",
      amount: 500,
      date: "2023-04-12",
      status: "Completed",
      paymentMethod: "Cash",
      description: "School fees for First Term",
    },
    {
      id: 4,
      transactionId: "TRX-09876",
      studentName: "Bob Brown",
      admissionNo: "ADM-2023-004",
      class: "Class 10C",
      amount: 500,
      date: "2023-04-10",
      status: "Failed",
      paymentMethod: "Card Payment",
      description: "School fees for First Term",
    },
    {
      id: 5,
      transactionId: "TRX-11111",
      studentName: "Sarah Wilson",
      admissionNo: "ADM-2023-005",
      class: "Class 10B",
      amount: 500,
      date: "2023-04-08",
      status: "Completed",
      paymentMethod: "Bank Transfer",
      description: "School fees for First Term",
    },
  ]);

  // Filter payments based on search term
  const filteredPayments = payments.filter(
    (payment) =>
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "S/N",
        "Transaction ID",
        "Student Name",
        "Admission No",
        "Class",
        "Amount",
        "Date",
        "Status",
        "Payment Method",
      ],
      ...filteredPayments.map((payment) => [
        payment.id,
        payment.transactionId,
        payment.studentName,
        payment.admissionNo,
        payment.class,
        `$${payment.amount}`,
        payment.date,
        payment.status,
        payment.paymentMethod,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payment_records.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredPayments.length} payment records to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredPayments
      .map(
        (payment) =>
          `${payment.id}. ${payment.studentName} (${payment.admissionNo}) - ${payment.class} - $${payment.amount} - ${payment.status} - ${payment.date}`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payment_records.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Text Export Complete", {
      description: `Successfully exported ${filteredPayments.length} payment records to text file.`,
      icon: <Download className="h-4 w-4" />,
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
          `${payment.id}\t${payment.transactionId}\t${payment.studentName}\t${payment.class}\t$${payment.amount}\t${payment.date}\t${payment.status}`
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
      class: payment.class,
      amount: payment.amount.toString(),
      status: payment.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdatePayment = () => {
    if (!editForm.studentName || !editForm.class || !editForm.amount) {
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
              class: editForm.class,
              amount: parseFloat(editForm.amount),
              status: editForm.status,
            }
          : payment
      )
    );

    setIsEditDialogOpen(false);
    setSelectedPayment(null);
    setEditForm({ studentName: "", class: "", amount: "", status: "" });

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

  const handleGenerateReceipt = (payment) => {
    toast.success("Receipt Generated", {
      description: `Receipt for ${payment.studentName}'s payment (${payment.transactionId}) has been generated.`,
      icon: <Receipt className="h-4 w-4" />,
      duration: 4000,
    });
  };

  // Calculate statistics
  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const completedPayments = filteredPayments.filter(
    (p) => p.status === "Completed"
  ).length;
  const pendingPayments = filteredPayments.filter(
    (p) => p.status === "Pending"
  ).length;
  const failedPayments = filteredPayments.filter(
    (p) => p.status === "Failed"
  ).length;

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Payment
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in delay-100">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {completedPayments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingPayments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-full mr-4">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Failed</p>
                <p className="text-2xl font-bold text-red-600">
                  {failedPayments}
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
                  <TableHead className="bg-gray-100">S/N</TableHead>
                  <TableHead className="bg-gray-100">Transaction ID</TableHead>
                  <TableHead className="bg-gray-100">Student Name</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Amount</TableHead>
                  <TableHead className="bg-gray-100">Date</TableHead>
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
                    <TableCell className="font-semibold">
                      {payment.studentName}
                    </TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ${payment.amount}
                    </TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          payment.status === "Completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : payment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {payment.status}
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
                          className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
                          onClick={() => handleGenerateReceipt(payment)}
                        >
                          <Receipt size={14} />
                          <span>Receipt</span>
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
                    <TableCell colSpan={8} className="text-center py-8">
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
                    Amount
                  </label>
                  <p className="text-sm font-semibold text-green-600">
                    ${selectedPayment.amount}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Payment Date
                  </label>
                  <p className="text-sm">{selectedPayment.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Payment Method
                  </label>
                  <p className="text-sm">{selectedPayment.paymentMethod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge
                    className={`${
                      selectedPayment.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : selectedPayment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedPayment.status}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Description
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPayment.description}
                </p>
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
              <Label htmlFor="editAmount">Amount ($)</Label>
              <Input
                id="editAmount"
                type="number"
                value={editForm.amount}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, amount: e.target.value }))
                }
                placeholder="Enter amount"
              />
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
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
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
              <Check className="h-4 w-4 mr-2" />
              Update Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePayment;
