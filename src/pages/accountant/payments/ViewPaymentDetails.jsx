import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
import {
  ArrowLeft,
  Edit,
  Download,
  Printer,
  User,
  CreditCard,
  Calendar,
  FileText,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const ViewPaymentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock payment data (in real app, this would be fetched based on ID)
  const paymentDetails = {
    id: id || 1,
    receiptNo: "RCP-2024-001",
    studentId: "STU001",
    studentName: "John Smith",
    class: "JSS 3A",
    section: "Science",
    paymentType: "Tuition Fee",
    amount: 45000,
    paymentMethod: "Bank Transfer",
    referenceNumber: "TRX-456789123",
    date: "2024-04-28",
    time: "10:30 AM",
    term: "Second Term",
    academicYear: 2024,
    status: "Confirmed",
    description: "Second term tuition payment",
    processedBy: "Mrs. Janet Adeyemi",
    confirmationDate: "2024-04-28",
  };

  const handlePrint = () => {
    toast.success("Print Started", {
      description: "Payment receipt is being prepared for printing.",
    });
  };

  const handleDownload = () => {
    toast.success("Download Started", {
      description: "Payment receipt PDF is being downloaded.",
    });
  };

  const handleEdit = () => {
    navigate(`/accountant/payments/edit/${paymentDetails.id}`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() =>
                navigate("/accountant/payments/class-payment-list")
              }
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Payment List
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Payment Details</h1>
              <p className="text-muted-foreground">
                Receipt #{paymentDetails.receiptNo}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEdit} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Payment Details */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <Badge
                  variant={
                    paymentDetails.status === "Confirmed"
                      ? "default"
                      : "secondary"
                  }
                  className="flex items-center gap-1"
                >
                  {paymentDetails.status === "Confirmed" && (
                    <CheckCircle className="h-3 w-3" />
                  )}
                  {paymentDetails.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Information */}
              <div>
                <h3 className="font-medium flex items-center gap-2 mb-3">
                  <User className="h-4 w-4" />
                  Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Student Name
                    </p>
                    <p className="font-medium">{paymentDetails.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Student ID</p>
                    <p className="font-medium">{paymentDetails.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Class</p>
                    <p className="font-medium">{paymentDetails.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Section</p>
                    <p className="font-medium">{paymentDetails.section}</p>
                  </div>
                </div>
              </div>

              <div className="border-t my-4"></div>

              {/* Payment Details */}
              <div>
                <h3 className="font-medium flex items-center gap-2 mb-3">
                  <CreditCard className="h-4 w-4" />
                  Payment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Payment Type
                    </p>
                    <p className="font-medium">{paymentDetails.paymentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium text-lg text-green-600">
                      ₦{paymentDetails.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Payment Method
                    </p>
                    <p className="font-medium">
                      {paymentDetails.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Reference Number
                    </p>
                    <p className="font-medium font-mono text-sm">
                      {paymentDetails.referenceNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t my-4"></div>

              {/* Academic Information */}
              <div>
                <h3 className="font-medium flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Term</p>
                    <p className="font-medium">{paymentDetails.term}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Academic Year
                    </p>
                    <p className="font-medium">{paymentDetails.academicYear}</p>
                  </div>
                </div>
              </div>

              {paymentDetails.description && (
                <>
                  <div className="border-t my-4"></div>
                  <div>
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <FileText className="h-4 w-4" />
                      Description
                    </h3>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                      {paymentDetails.description}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Summary & Actions */}
        <motion.div variants={item} className="space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Receipt No:</span>
                  <span className="font-mono text-sm">
                    {paymentDetails.receiptNo}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{paymentDetails.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Time:</span>
                  <span>{paymentDetails.time}</span>
                </div>
                <div className="border-t my-4"></div>
                <div className="flex justify-between items-center font-medium text-lg">
                  <span>Total Amount:</span>
                  <span className="text-green-600">
                    ₦{paymentDetails.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Processed By</p>
                  <p className="font-medium">{paymentDetails.processedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Confirmation Date
                  </p>
                  <p className="font-medium">
                    {paymentDetails.confirmationDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      paymentDetails.status === "Confirmed"
                        ? "default"
                        : "secondary"
                    }
                    className="flex items-center gap-1 w-fit"
                  >
                    {paymentDetails.status === "Confirmed" && (
                      <CheckCircle className="h-3 w-3" />
                    )}
                    {paymentDetails.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="justify-start gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Payment
                </Button>
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="justify-start gap-2"
                >
                  <Printer className="h-4 w-4" />
                  Print Receipt
                </Button>
                <Button
                  onClick={handleDownload}
                  className="justify-start gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ViewPaymentDetails;
