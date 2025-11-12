import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  Receipt,
  Download,
  Search,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

const PaymentHistory = () => {
  const [selectedChild, setSelectedChild] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingPayment, setViewingPayment] = useState(null);

  // Mock data for payment history
  const paymentHistory = [
    {
      id: "PAY-2024-001",
      childId: "1",
      childName: "Sarah Johnson",
      childClass: "JSS 2A",
      type: "School Fees - Term 1",
      amount: 45000,
      status: "paid",
      date: "2024-11-05",
      method: "Card Payment",
      reference: "TXN-894562",
      receiptUrl: "/receipt-001.pdf",
      description: "First Term School Fees 2024/2025 Session",
    },
    {
      id: "PAY-2024-002",
      childId: "1",
      childName: "Sarah Johnson",
      childClass: "JSS 2A",
      type: "Extra Curricular Activities",
      amount: 8000,
      status: "paid",
      date: "2024-10-28",
      method: "Bank Transfer",
      reference: "TXN-789456",
      receiptUrl: "/receipt-002.pdf",
      description: "Sports and Cultural Activities Fee",
    },
    {
      id: "PAY-2024-003",
      childId: "2",
      childName: "Michael Johnson",
      childClass: "Primary 5B",
      type: "School Fees - Term 1",
      amount: 35000,
      status: "pending",
      date: "2024-11-10",
      method: "Pending",
      reference: "PEN-123456",
      description: "First Term School Fees 2024/2025 Session",
    },
    {
      id: "PAY-2024-004",
      childId: "1",
      childName: "Sarah Johnson",
      childClass: "JSS 2A",
      type: "Books & Materials",
      amount: 12000,
      status: "paid",
      date: "2024-10-15",
      method: "Paystack",
      reference: "TXN-456789",
      receiptUrl: "/receipt-004.pdf",
      description: "Textbooks and Learning Materials",
    },
    {
      id: "PAY-2024-005",
      childId: "2",
      childName: "Michael Johnson",
      childClass: "Primary 5B",
      type: "Sports Activities",
      amount: 5000,
      status: "failed",
      date: "2024-10-20",
      method: "Card Payment",
      reference: "TXN-321654",
      description: "Football and Swimming Training Fee",
    },
    {
      id: "PAY-2023-001",
      childId: "1",
      childName: "Sarah Johnson",
      childClass: "JSS 1A",
      type: "School Fees - Term 3",
      amount: 42000,
      status: "paid",
      date: "2023-09-15",
      method: "Bank Transfer",
      reference: "TXN-987654",
      receiptUrl: "/receipt-005.pdf",
      description: "Third Term School Fees 2023/2024 Session",
    },
    {
      id: "PAY-2023-002",
      childId: "2",
      childName: "Michael Johnson",
      childClass: "Primary 4B",
      type: "School Fees - Term 3",
      amount: 32000,
      status: "paid",
      date: "2023-09-10",
      method: "Card Payment",
      reference: "TXN-654321",
      receiptUrl: "/receipt-006.pdf",
      description: "Third Term School Fees 2023/2024 Session",
    },
  ];

  const children = [
    { id: "1", name: "Sarah Johnson", class: "JSS 2A" },
    { id: "2", name: "Michael Johnson", class: "Primary 5B" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "paid", label: "Paid" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "School Fees", label: "School Fees" },
    { value: "Extra Curricular", label: "Extra Curricular" },
    { value: "Books & Materials", label: "Books & Materials" },
    { value: "Sports Activities", label: "Sports Activities" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter payments based on selections
  const filteredPayments = paymentHistory.filter((payment) => {
    const matchesChild =
      selectedChild === "all" || payment.childId === selectedChild;
    const matchesStatus =
      selectedStatus === "all" || payment.status === selectedStatus;
    const matchesType =
      selectedType === "all" || payment.type.includes(selectedType);
    const matchesSearch =
      searchTerm === "" ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.childName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesChild && matchesStatus && matchesType && matchesSearch;
  });

  // Calculate totals
  const totalPaid = paymentHistory
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = paymentHistory
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalFailed = paymentHistory
    .filter((p) => p.status === "failed")
    .reduce((sum, p) => sum + p.amount, 0);

  // Handle export all records
  const handleExportAllRecords = async () => {
    try {
      toast.success("Generating payment history export...");

      // Generate comprehensive payment history report
      const exportContent = `PAYMENT HISTORY REPORT
=====================================

Report Generated: ${new Date().toLocaleString()}
Total Payments: ${paymentHistory.length}
Total Amount Paid: ₦${totalPaid.toLocaleString()}
Total Pending: ₦${totalPending.toLocaleString()}
Total Failed: ₦${totalFailed.toLocaleString()}

PAYMENT RECORDS
=====================================

${filteredPayments
  .map(
    (payment, index) => `
${index + 1}. Payment ID: ${payment.id}
   Child: ${payment.childName} (${payment.childClass})
   Type: ${payment.type}
   Amount: ₦${payment.amount.toLocaleString()}
   Status: ${payment.status.toUpperCase()}
   Date: ${new Date(payment.date).toLocaleDateString()}
   Method: ${payment.method}
   Reference: ${payment.reference}
   Description: ${payment.description}
   ${payment.receiptUrl ? `Receipt: Available` : "Receipt: Not available"}
   ---`
  )
  .join("\n")}

SUMMARY BY STATUS
=====================================
✅ Paid: ${
        paymentHistory.filter((p) => p.status === "paid").length
      } payments (₦${totalPaid.toLocaleString()})
⏳ Pending: ${
        paymentHistory.filter((p) => p.status === "pending").length
      } payments (₦${totalPending.toLocaleString()})
❌ Failed: ${
        paymentHistory.filter((p) => p.status === "failed").length
      } payments (₦${totalFailed.toLocaleString()})

SUMMARY BY TYPE
=====================================
${Array.from(new Set(paymentHistory.map((p) => p.type)))
  .map((type) => {
    const typePayments = paymentHistory.filter((p) => p.type === type);
    const typeTotal = typePayments.reduce((sum, p) => sum + p.amount, 0);
    return `${type}: ${
      typePayments.length
    } payments (₦${typeTotal.toLocaleString()})`;
  })
  .join("\n")}

Report exported from School Management System - Parent Portal`;

      // Create and download the file
      const blob = new Blob([exportContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Payment_History_Export_${
        new Date().toISOString().split("T")[0]
      }.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Payment history exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export payment history. Please try again.");
    }
  };

  // Handle view payment details
  const handleViewPayment = (payment) => {
    setViewingPayment(payment);
    toast.success(`Viewing details for payment ${payment.id}`);
  };

  // Handle download receipt
  const handleDownloadReceipt = async (payment) => {
    try {
      toast.success("Generating receipt...");

      // Generate receipt content
      const receiptContent = `PAYMENT RECEIPT
=====================================

Receipt ID: ${payment.id}
Transaction Reference: ${payment.reference}
Date: ${new Date(payment.date).toLocaleString()}

STUDENT INFORMATION
=====================================
Name: ${payment.childName}
Class: ${payment.childClass}
Session: 2024/2025

PAYMENT DETAILS
=====================================
Type: ${payment.type}
Amount: ₦${payment.amount.toLocaleString()}
Payment Method: ${payment.method}
Status: ${payment.status.toUpperCase()}
Description: ${payment.description}

${
  payment.status === "paid"
    ? `✅ PAYMENT CONFIRMED
This payment has been successfully processed and confirmed.

Thank you for your payment!`
    : payment.status === "pending"
    ? `⏳ PAYMENT PENDING
This payment is currently being processed.

Please allow 24-48 hours for confirmation.`
    : `❌ PAYMENT FAILED
This payment was not successful.

Please contact the finance office for assistance.`
}

IMPORTANT NOTES
=====================================
- Keep this receipt for your records
- Contact the school finance office for any queries
- Reference number: ${payment.reference}

Receipt generated: ${new Date().toLocaleString()}
School Management System - Parent Portal

=====================================
This is an electronically generated receipt.`;

      // Create and download the file
      const blob = new Blob([receiptContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Receipt_${payment.id}_${payment.childName.replace(
        /\s+/g,
        "_"
      )}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download receipt. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
          <p className="text-gray-600 mt-1">
            View and manage all payment records and receipts
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleExportAllRecords}
        >
          <Download className="h-4 w-4" />
          Export All Records
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Payments
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPayments.length}</div>
            <p className="text-xs text-muted-foreground">
              All payment transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₦{totalPaid.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              ₦{totalPending.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ₦{totalFailed.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by reference, type, or child name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Child</label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger>
                  <SelectValue placeholder="Select child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name} - {child.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment Records ({filteredPayments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.length === 0 ? (
              <div className="text-center py-8">
                <Receipt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No payments found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria.
                </p>
              </div>
            ) : (
              filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    {/* Payment Info */}
                    <div className="lg:col-span-4">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(payment.status)}
                        <div>
                          <h4 className="font-semibold">{payment.type}</h4>
                          <p className="text-sm text-gray-600">
                            {payment.childName} - {payment.childClass}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {payment.description}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="lg:col-span-2 text-center">
                      <div className="text-lg font-bold">
                        ₦{payment.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {payment.method}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="lg:col-span-2 text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Reference: {payment.reference}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="lg:col-span-2 text-center">
                      {getStatusBadge(payment.status)}
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-2 text-center">
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewPayment(payment)}
                          title="View Payment Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {payment.receiptUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadReceipt(payment)}
                            title="Download Receipt"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Details Dialog */}
      {viewingPayment && (
        <Dialog
          open={!!viewingPayment}
          onOpenChange={() => setViewingPayment(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>
                Complete information for payment {viewingPayment.id}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Payment Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Payment ID
                    </label>
                    <p className="text-lg font-semibold">{viewingPayment.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Amount
                    </label>
                    <p className="text-2xl font-bold text-green-600">
                      ₦{viewingPayment.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(viewingPayment.status)}
                      <Badge className={getStatusColor(viewingPayment.status)}>
                        {viewingPayment.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Student
                    </label>
                    <p className="font-medium">{viewingPayment.childName}</p>
                    <p className="text-sm text-gray-600">
                      {viewingPayment.childClass}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Payment Date
                    </label>
                    <p className="font-medium">
                      {new Date(viewingPayment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Payment Method
                    </label>
                    <p className="font-medium">{viewingPayment.method}</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">
                  Transaction Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Payment Type
                    </label>
                    <p className="font-medium">{viewingPayment.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Reference Number
                    </label>
                    <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                      {viewingPayment.reference}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Description
                    </label>
                    <p className="text-gray-700">
                      {viewingPayment.description}
                    </p>
                  </div>
                  {viewingPayment.receiptUrl && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Receipt
                      </label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReceipt(viewingPayment)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Receipt
                        </Button>
                        <span className="text-sm text-green-600">
                          ✓ Available
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-xs text-gray-500">
                  Payment processed through secure payment gateway
                </div>
                <Button onClick={() => setViewingPayment(null)}>Close</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentHistory;
