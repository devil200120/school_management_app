import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  CheckCircle,
  Download,
  Receipt,
  Calendar,
  User,
  CreditCard,
  DollarSign,
  ArrowLeft,
  Share,
  Mail,
  Printer,
  Home,
  FileText,
  BookOpen,
} from "lucide-react";
import confetti from "canvas-confetti";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Trigger confetti animation on component mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Get payment data from location state or create mock data
    const payment = location.state?.paymentData || {
      transactionId:
        "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      amount: 45000,
      childName: "Sarah Johnson",
      childClass: "JSS 2A",
      feeType: "Term 1 School Fees",
      paymentMethod: "Credit Card",
      paymentDate: new Date().toISOString(),
      status: "successful",
      receiptNumber:
        "RCT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    };
    setPaymentData(payment);
  }, [location.state]);

  const handleDownloadReceipt = () => {
    // In a real application, this would generate and download a PDF receipt
    const receiptContent = `
PAYMENT RECEIPT
================

Transaction ID: ${paymentData?.transactionId}
Receipt Number: ${paymentData?.receiptNumber}
Date: ${new Date(paymentData?.paymentDate).toLocaleString()}

Student: ${paymentData?.childName}
Class: ${paymentData?.childClass}
Fee Type: ${paymentData?.feeType}

Amount: ₦${paymentData?.amount?.toLocaleString()}
Payment Method: ${paymentData?.paymentMethod}
Status: ${paymentData?.status}

Thank you for your payment!
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${paymentData?.receiptNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Payment Receipt",
          text: `Payment successful! Transaction ID: ${paymentData?.transactionId}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `Payment successful! Transaction ID: ${
          paymentData?.transactionId
        } - Amount: ₦${paymentData?.amount?.toLocaleString()}`
      );
      alert("Payment details copied to clipboard!");
    }
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent("School Fees Payment Receipt");
    const body = encodeURIComponent(`
Dear Sir/Madam,

Please find below the payment details for school fees:

Transaction ID: ${paymentData?.transactionId}
Student: ${paymentData?.childName}
Class: ${paymentData?.childClass}
Amount: ₦${paymentData?.amount?.toLocaleString()}
Fee Type: ${paymentData?.feeType}
Payment Date: ${new Date(paymentData?.paymentDate).toLocaleString()}

Thank you.
    `);

    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  if (!paymentData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Success Animation */}
        <div className="text-center py-8">
          <div className="relative inline-block">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-25 animate-ping"></div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your school fees payment has been processed successfully. A receipt
            has been generated for your records.
          </p>
        </div>

        {/* Payment Details Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Receipt className="h-6 w-6" />
              Payment Receipt
            </CardTitle>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <span>Transaction ID: {paymentData.transactionId}</span>
              <span>•</span>
              <span>Receipt: {paymentData.receiptNumber}</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Student Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Student Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{paymentData.childName}</p>
                      <p className="text-sm text-gray-600">
                        Class: {paymentData.childClass}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Fee Type</p>
                      <p className="text-sm text-gray-600">
                        {paymentData.feeType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Payment Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Amount Paid</p>
                      <p className="text-2xl font-bold text-green-600">
                        ₦{paymentData.amount?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Payment Method</p>
                      <p className="text-sm text-gray-600">
                        {paymentData.paymentMethod}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Payment Date</p>
                      <p className="text-sm text-gray-600">
                        {new Date(paymentData.paymentDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-6 flex justify-center">
              <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg">
                <CheckCircle className="h-4 w-4 mr-2" />
                Payment Successful
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={handleDownloadReceipt}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>

          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print Receipt
          </Button>

          <Button
            onClick={handleShare}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Share className="h-4 w-4" />
            Share Details
          </Button>

          <Button
            onClick={handleSendEmail}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Email Receipt
          </Button>
        </div>

        {/* Next Steps Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              What&apos;s Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Keep Your Receipt
                </h4>
                <p className="text-sm text-blue-700">
                  Save this receipt for your records. You may need it for future
                  reference or school inquiries.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Payment Confirmation
                </h4>
                <p className="text-sm text-green-700">
                  The school will receive notification of your payment within 24
                  hours. No further action required.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Contact Support
                </h4>
                <p className="text-sm text-purple-700">
                  If you have any questions about this payment, contact the
                  school office with your transaction ID.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">
                  View Payment History
                </h4>
                <p className="text-sm text-orange-700">
                  You can view all your payment history in the Payment History
                  section of your parent dashboard.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/parent")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <Button
            onClick={() => navigate("/parent/payments/history")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Receipt className="h-4 w-4" />
            View Payment History
          </Button>

          <Button
            onClick={() => navigate("/parent/payments/school-fees")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Make Another Payment
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center py-6">
          <p className="text-sm text-gray-500">
            Thank you for using our secure payment system. This transaction is
            protected by industry-standard encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
