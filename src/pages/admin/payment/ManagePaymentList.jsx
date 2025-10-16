import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
import {
  Search,
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  Edit,
  Trash2,
  Eye,
  Plus,
  DollarSign,
  Calendar,
} from "lucide-react";

const ManagePaymentList = () => {
  const [session, setSession] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPayments, setShowPayments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([
    {
      id: 1,
      studentName: "John Smith",
      admissionNo: "STU001",
      class: "SS 3",
      session: "2024/2025",
      tuitionFee: 150000,
      developmentFee: 25000,
      examFee: 15000,
      totalAmount: 190000,
      amountPaid: 150000,
      balance: 40000,
      status: "partial",
      lastPaymentDate: "2024-10-10",
    },
    {
      id: 2,
      studentName: "Mary Johnson",
      admissionNo: "STU002",
      class: "JS 2",
      session: "2024/2025",
      tuitionFee: 120000,
      developmentFee: 20000,
      examFee: 12000,
      totalAmount: 152000,
      amountPaid: 152000,
      balance: 0,
      status: "paid",
      lastPaymentDate: "2024-09-25",
    },
    {
      id: 3,
      studentName: "Peter Williams",
      admissionNo: "STU003",
      class: "Primary 5",
      session: "2024/2025",
      tuitionFee: 80000,
      developmentFee: 15000,
      examFee: 8000,
      totalAmount: 103000,
      amountPaid: 0,
      balance: 103000,
      status: "unpaid",
      lastPaymentDate: null,
    },
    {
      id: 4,
      studentName: "Sarah Brown",
      admissionNo: "STU004",
      class: "SS 1",
      session: "2024/2025",
      tuitionFee: 140000,
      developmentFee: 22000,
      examFee: 14000,
      totalAmount: 176000,
      amountPaid: 176000,
      balance: 0,
      status: "paid",
      lastPaymentDate: "2024-10-05",
    },
  ]);

  const filteredPayments = payments.filter(
    (payment) =>
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckNow = async () => {
    if (!session.trim()) {
      toast.error("Please enter a session to check payments");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowPayments(true);
      toast.success(`Payment records loaded for session ${session}`, {
        description: `Found ${payments.length} payment records`,
        duration: 4000,
      });
    } catch (error) {
      toast.error("Failed to load payment records");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      [
        "S/N",
        "Student Name",
        "Admission No",
        "Class",
        "Total Amount",
        "Amount Paid",
        "Balance",
        "Status",
      ],
      ...filteredPayments.map((payment, index) => [
        index + 1,
        payment.studentName,
        payment.admissionNo,
        payment.class,
        payment.totalAmount,
        payment.amountPaid,
        payment.balance,
        payment.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payment_records_${session.replace("/", "_")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Payment records exported to CSV successfully!");
  };

  const handleExportText = () => {
    const textContent = filteredPayments
      .map(
        (payment, index) =>
          `${index + 1}. ${payment.studentName} (${payment.admissionNo}) - ${
            payment.class
          } - Total: ₦${payment.totalAmount.toLocaleString()} - Paid: ₦${payment.amountPaid.toLocaleString()} - Balance: ₦${payment.balance.toLocaleString()} - Status: ${
            payment.status
          }`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payment_records_${session.replace("/", "_")}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Payment records exported to text file successfully!");
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print dialog opened for payment records");
  };

  const handleCopy = () => {
    const tableData = filteredPayments
      .map(
        (payment, index) =>
          `${index + 1}\t${payment.studentName}\t${payment.admissionNo}\t${
            payment.class
          }\t₦${payment.totalAmount.toLocaleString()}\t₦${payment.amountPaid.toLocaleString()}\t₦${payment.balance.toLocaleString()}\t${
            payment.status
          }`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Payment records copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy payment records");
      });
  };

  const handleViewPayment = (payment) => {
    toast.info(`Payment Details - ${payment.studentName}`, {
      description: `Total: ₦${payment.totalAmount.toLocaleString()} • Paid: ₦${payment.amountPaid.toLocaleString()} • Balance: ₦${payment.balance.toLocaleString()}`,
      duration: 6000,
    });
  };

  const handleEditPayment = (payment) => {
    toast.info(`Editing payment record for ${payment.studentName}`);
  };

  const handleDeletePayment = (paymentId) => {
    setPayments((prevPayments) =>
      prevPayments.filter((payment) => payment.id !== paymentId)
    );
    toast.success("Payment record deleted successfully!");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Paid
          </Badge>
        );
      case "partial":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Partial
          </Badge>
        );
      case "unpaid":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Unpaid
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            Unknown
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <h2 className="text-3xl font-bold tracking-tight text-eduos-primary">
        Manage Payment List
      </h2>

      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Select Payment List Session
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="session">
                  SESSION <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="session"
                  placeholder="Enter session (e.g. 2024/2025)"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleCheckNow}
                  disabled={isLoading}
                  className="w-full md:w-auto bg-eduos-primary hover:bg-eduos-secondary disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Check Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPayments && (
        <Card className="mt-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Payment Records - {session}</CardTitle>
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
                    <TableHead className="bg-gray-100">Student Name</TableHead>
                    <TableHead className="bg-gray-100">Admission No</TableHead>
                    <TableHead className="bg-gray-100">Class</TableHead>
                    <TableHead className="bg-gray-100">Total Amount</TableHead>
                    <TableHead className="bg-gray-100">Amount Paid</TableHead>
                    <TableHead className="bg-gray-100">Balance</TableHead>
                    <TableHead className="bg-gray-100">Status</TableHead>
                    <TableHead className="bg-gray-100">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment, index) => (
                    <TableRow
                      key={payment.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {payment.studentName}
                      </TableCell>
                      <TableCell className="text-blue-600">
                        {payment.admissionNo}
                      </TableCell>
                      <TableCell>{payment.class}</TableCell>
                      <TableCell className="font-medium">
                        ₦{payment.totalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">
                        ₦{payment.amountPaid.toLocaleString()}
                      </TableCell>
                      <TableCell
                        className={`font-medium ${
                          payment.balance === 0
                            ? "text-green-600"
                            : payment.balance === payment.totalAmount
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        ₦{payment.balance.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-blue-50"
                            onClick={() => handleViewPayment(payment)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-yellow-50"
                            onClick={() => handleEditPayment(payment)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="hover:bg-red-600"
                            onClick={() => handleDeletePayment(payment.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManagePaymentList;
