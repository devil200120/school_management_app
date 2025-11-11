import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  CreditCard,
  DollarSign,
  User,
  BookOpen,
  Clock,
  AlertCircle,
  Download,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";

const SchoolFeesPayment = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState("");
  const [selectedFeeType, setSelectedFeeType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data for children and their fees
  const children = [
    {
      id: 1,
      name: "Sarah Johnson",
      class: "JSS 2A",
      admissionNo: "EDU2023001",
      fees: [
        {
          id: 1,
          type: "Term 1 School Fees",
          amount: 45000,
          dueDate: "2024-11-30",
          status: "pending",
        },
        {
          id: 2,
          type: "Extra Curricular Activities",
          amount: 8000,
          dueDate: "2024-11-25",
          status: "pending",
        },
        {
          id: 3,
          type: "Term 1 Books & Materials",
          amount: 12000,
          dueDate: "2024-12-01",
          status: "pending",
        },
      ],
    },
    {
      id: 2,
      name: "Michael Johnson",
      class: "Primary 5B",
      admissionNo: "EDU2023002",
      fees: [
        {
          id: 4,
          type: "Term 1 School Fees",
          amount: 35000,
          dueDate: "2024-12-15",
          status: "overdue",
        },
        {
          id: 5,
          type: "Sports Activities",
          amount: 5000,
          dueDate: "2024-11-20",
          status: "pending",
        },
      ],
    },
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "transfer", name: "Bank Transfer", icon: DollarSign },
    { id: "paystack", name: "Paystack" },
    { id: "flutterwave", name: "Flutterwave" },
  ];

  const handlePayment = async () => {
    if (!selectedChild || !selectedFeeType || !paymentMethod) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get selected child and fee data for the success page
      const selectedChildData = getSelectedChildData();
      const selectedFeeData = getSelectedFee();

      // Create payment data to pass to success page
      const paymentData = {
        transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: selectedFeeData?.amount || 0,
        childName: selectedChildData?.name || '',
        childClass: selectedChildData?.class || '',
        feeType: selectedFeeData?.type || '',
        paymentMethod: getPaymentMethodName(paymentMethod),
        paymentDate: new Date().toISOString(),
        status: 'successful',
        receiptNumber: 'RCT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      };

      // Navigate to success page with payment data
      navigate('/parent/payments/success', {
        state: { paymentData }
      });

    } catch {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getSelectedChildData = () =>
    children.find((child) => child.id === parseInt(selectedChild));
  const getSelectedFee = () => {
    const child = getSelectedChildData();
    return child?.fees.find((fee) => fee.id === parseInt(selectedFeeType));
  };

  const getPaymentMethodName = (method) => {
    const methods = {
      'card': 'Credit/Debit Card',
      'transfer': 'Bank Transfer',
      'paystack': 'Paystack',
      'flutterwave': 'Flutterwave'
    };
    return methods[method] || method;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          School Fees Payment
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pay your children&apos;s school fees securely and conveniently. Select
          your child and the fee type to proceed.
        </p>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Outstanding
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ₦
              {children
                .flatMap((child) =>
                  child.fees.filter((fee) => fee.status !== "paid")
                )
                .reduce((sum, fee) => sum + fee.amount, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all children</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                children.flatMap((child) =>
                  child.fees.filter((fee) => fee.status === "pending")
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Items due soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {
                children.flatMap((child) =>
                  child.fees.filter((fee) => fee.status === "overdue")
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Child Selection */}
            <div className="space-y-2">
              <Label htmlFor="child">Select Child *</Label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your child" />
                </SelectTrigger>
                <SelectContent>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.id.toString()}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {child.name} - {child.class}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fee Type Selection */}
            {selectedChild && (
              <div className="space-y-2">
                <Label htmlFor="feeType">Select Fee Type *</Label>
                <Select
                  value={selectedFeeType}
                  onValueChange={setSelectedFeeType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose fee type" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSelectedChildData()
                      ?.fees.filter((fee) => fee.status !== "paid")
                      .map((fee) => (
                        <SelectItem key={fee.id} value={fee.id.toString()}>
                          <div className="flex justify-between items-center w-full">
                            <span>{fee.type}</span>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(fee.status)}>
                                {fee.status}
                              </Badge>
                              <span className="font-bold">
                                ₦{fee.amount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Payment Method *</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex items-center gap-2">
                        {method.icon && <method.icon className="h-4 w-4" />}
                        {method.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payment Details Form */}
            {paymentMethod === "card" && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Card Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Card Holder Name</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "transfer" && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium">Bank Transfer Details</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Bank:</strong> First Bank of Nigeria
                  </p>
                  <p>
                    <strong>Account Name:</strong> Bright Future Academy
                  </p>
                  <p>
                    <strong>Account Number:</strong> 1234567890
                  </p>
                  <p>
                    <strong>Reference:</strong> Use your child&apos;s admission
                    number
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedChild && selectedFeeType && getSelectedFee() ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">
                    Payment Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Student:</span>
                      <span className="font-medium">
                        {getSelectedChildData()?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Class:</span>
                      <span className="font-medium">
                        {getSelectedChildData()?.class}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Admission No:</span>
                      <span className="font-medium">
                        {getSelectedChildData()?.admissionNo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fee Type:</span>
                      <span className="font-medium">
                        {getSelectedFee()?.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span className="font-medium">
                        {new Date(
                          getSelectedFee()?.dueDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-green-600">
                        ₦{getSelectedFee()?.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={loading || !paymentMethod}
                >
                  {loading
                    ? "Processing Payment..."
                    : `Pay ₦${getSelectedFee()?.amount.toLocaleString()}`}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">
                  Select a child and fee type to see payment details
                </p>
              </div>
            )}

            {/* Recent Payments */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Recent Payments</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Sarah - Term 1 Books</p>
                    <p className="text-gray-600">Nov 8, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₦12,000</p>
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Michael - Sports Fee</p>
                    <p className="text-gray-600">Nov 5, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₦5,000</p>
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History & Receipts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment History & Receipts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Payment Receipts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolFeesPayment;
