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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  CreditCard,
  CheckCircle,
  XCircle,
  Eye,
  DollarSign,
  User,
  Calendar,
  Hash,
} from "lucide-react";
import { toast } from "sonner";

const ConfirmPayment = () => {
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedPayment, setVerifiedPayment] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample payment data for demonstration
  const [pendingPayments, setPendingPayments] = useState([
    {
      id: 1,
      transactionId: "TRX-12345-ABCDE",
      amount: 50000,
      studentName: "John Doe",
      studentId: "STU001",
      class: "SS 3",
      level: "Senior Secondary",
      paymentDate: "2024-12-15",
      paymentMethod: "Bank Transfer",
      purpose: "School Fees",
      status: "Pending",
      reference: "REF-2024-001",
    },
    {
      id: 2,
      transactionId: "TRX-67890-FGHIJ",
      amount: 25000,
      studentName: "Jane Smith",
      studentId: "STU002",
      class: "JS 2",
      level: "Junior Secondary",
      paymentDate: "2024-12-14",
      paymentMethod: "Online Payment",
      purpose: "Examination Fees",
      status: "Pending",
      reference: "REF-2024-002",
    },
    {
      id: 3,
      transactionId: "TRX-11111-KKKKK",
      amount: 75000,
      studentName: "Michael Johnson",
      studentId: "STU003",
      class: "Primary 5",
      level: "Primary",
      paymentDate: "2024-12-13",
      paymentMethod: "Cash",
      purpose: "School Fees",
      status: "Pending",
      reference: "REF-2024-003",
    },
  ]);

  // Filter payments based on search term
  const filteredPayments = pendingPayments.filter(
    (payment) =>
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle transaction ID verification
  const handleVerifyPayment = async () => {
    if (!transactionId.trim()) {
      toast.error("Please enter a transaction ID", {
        description: "Transaction ID is required to verify payment.",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Find payment by transaction ID
      const payment = pendingPayments.find(
        (p) => p.transactionId.toLowerCase() === transactionId.toLowerCase()
      );

      if (payment) {
        setVerifiedPayment(payment);
        toast.success("Payment Verified", {
          description: `Transaction ${transactionId} found and verified successfully.`,
          icon: <CheckCircle className="h-4 w-4" />,
          duration: 4000,
        });
      } else {
        toast.error("Payment Not Found", {
          description: `No payment found with transaction ID: ${transactionId}`,
          icon: <XCircle className="h-4 w-4" />,
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error("Verification Failed", {
        description: "Failed to verify payment. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle payment confirmation
  const handleConfirmPayment = () => {
    if (!verifiedPayment) return;

    setPendingPayments((prev) =>
      prev.map((payment) =>
        payment.id === verifiedPayment.id
          ? { ...payment, status: "Confirmed" }
          : payment
      )
    );

    toast.success("Payment Confirmed", {
      description: `Payment of ₦${verifiedPayment.amount.toLocaleString()} for ${
        verifiedPayment.studentName
      } has been confirmed.`,
      icon: <CheckCircle className="h-4 w-4" />,
      duration: 4000,
    });

    setVerifiedPayment(null);
    setTransactionId("");
    setIsConfirmDialogOpen(false);
  };

  // Handle payment rejection
  const handleRejectPayment = () => {
    if (!verifiedPayment) return;

    setPendingPayments((prev) =>
      prev.map((payment) =>
        payment.id === verifiedPayment.id
          ? { ...payment, status: "Rejected" }
          : payment
      )
    );

    toast.error("Payment Rejected", {
      description: `Payment of ₦${verifiedPayment.amount.toLocaleString()} for ${
        verifiedPayment.studentName
      } has been rejected.`,
      icon: <XCircle className="h-4 w-4" />,
      duration: 4000,
    });

    setVerifiedPayment(null);
    setTransactionId("");
    setIsRejectDialogOpen(false);
  };

  // Handle direct confirmation from table
  const handleDirectConfirm = (payment) => {
    setPendingPayments((prev) =>
      prev.map((p) => (p.id === payment.id ? { ...p, status: "Confirmed" } : p))
    );

    toast.success("Payment Confirmed", {
      description: `Payment of ₦${payment.amount.toLocaleString()} for ${
        payment.studentName
      } has been confirmed.`,
      icon: <CheckCircle className="h-4 w-4" />,
      duration: 4000,
    });
  };

  // Handle direct rejection from table
  const handleDirectReject = (payment) => {
    setPendingPayments((prev) =>
      prev.map((p) => (p.id === payment.id ? { ...p, status: "Rejected" } : p))
    );

    toast.error("Payment Rejected", {
      description: `Payment of ₦${payment.amount.toLocaleString()} for ${
        payment.studentName
      } has been rejected.`,
      icon: <XCircle className="h-4 w-4" />,
      duration: 4000,
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
      case "Confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Confirmed
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
          Confirm Payment
        </h2>
      </div>

      {/* Verify Payment by Transaction ID */}
      <Card className="animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Verify Payment by Transaction ID
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transactionId">
                Enter Transaction/Reference ID
              </Label>
              <Input
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter the transaction or reference ID"
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
          </div>

          <Button
            onClick={handleVerifyPayment}
            disabled={isLoading}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Verify Payment
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Payment Details Card (Shows after verification) */}
      {verifiedPayment && (
        <Card className="animate-fade-in delay-200 max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Transaction ID:</p>
                  <p className="font-medium">{verifiedPayment.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount:</p>
                  <p className="font-medium text-green-600">
                    ₦{verifiedPayment.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student:</p>
                  <p className="font-medium">{verifiedPayment.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student ID:</p>
                  <p className="font-medium">{verifiedPayment.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Class:</p>
                  <p className="font-medium">{verifiedPayment.class}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Level:</p>
                  <p className="font-medium">{verifiedPayment.level}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Date:</p>
                  <p className="font-medium">{verifiedPayment.paymentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method:</p>
                  <p className="font-medium">{verifiedPayment.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purpose:</p>
                  <p className="font-medium">{verifiedPayment.purpose}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status:</p>
                  {getStatusBadge(verifiedPayment.status)}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setIsConfirmDialogOpen(true)}
                className="flex-1 bg-green-500 hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm Payment
              </Button>
              <Button
                onClick={() => setIsRejectDialogOpen(true)}
                variant="destructive"
                className="flex-1 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Payments Table */}
      <Card className="animate-fade-in delay-300 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pending Payments
            <Badge className="bg-white text-blue-600 ml-auto">
              {filteredPayments.filter((p) => p.status === "Pending").length}{" "}
              Pending
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <Search
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none"
                size={20}
              />
              <Input
                placeholder="Search payments..."
                className="pl-3 pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Transaction ID</TableHead>
                  <TableHead className="bg-gray-100">Student</TableHead>
                  <TableHead className="bg-gray-100">Amount</TableHead>
                  <TableHead className="bg-gray-100">Purpose</TableHead>
                  <TableHead className="bg-gray-100">Date</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">
                      {payment.transactionId}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.studentName}</p>
                        <p className="text-sm text-gray-500">{payment.class}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ₦{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{payment.purpose}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {payment.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleDirectConfirm(payment)}
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDirectReject(payment)}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPayments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      {searchTerm
                        ? `No payments found matching "${searchTerm}"`
                        : "No pending payments found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirm Payment Dialog */}
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to confirm this payment of{" "}
              <strong>₦{verifiedPayment?.amount.toLocaleString()}</strong> for{" "}
              <strong>{verifiedPayment?.studentName}</strong>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmPayment}
              className="bg-green-500 hover:bg-green-600"
            >
              Confirm Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Payment Dialog */}
      <AlertDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this payment of{" "}
              <strong>₦{verifiedPayment?.amount.toLocaleString()}</strong> for{" "}
              <strong>{verifiedPayment?.studentName}</strong>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectPayment}
              className="bg-red-500 hover:bg-red-600"
            >
              Reject Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConfirmPayment;
