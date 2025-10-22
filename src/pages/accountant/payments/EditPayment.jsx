import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Save, User, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const EditPayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    class: "",
    section: "",
    paymentType: "",
    amount: "",
    paymentMethod: "",
    referenceNumber: "",
    description: "",
    term: "",
    academicYear: new Date().getFullYear(),
    status: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sample student data
  const students = [
    { id: "STU001", name: "John Smith", class: "JSS 3", section: "A" },
    { id: "STU002", name: "Sarah Johnson", class: "JSS 2", section: "B" },
    { id: "STU003", name: "Michael Brown", class: "SSS 1", section: "A" },
    { id: "STU004", name: "Jessica Williams", class: "SSS 3", section: "C" },
    { id: "STU005", name: "David Miller", class: "JSS 1", section: "A" },
  ];

  // Load existing payment data
  useEffect(() => {
    // Mock loading payment data (in real app, fetch from API using the ID)
    const loadPaymentData = async () => {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data based on ID
      const mockPaymentData = {
        studentId: "STU001",
        studentName: "John Smith",
        class: "JSS 3A",
        section: "Science",
        paymentType: "tuition",
        amount: "45000",
        paymentMethod: "bank-transfer",
        referenceNumber: "TRX-456789123",
        description: "Second term tuition payment",
        term: "second",
        academicYear: 2024,
        status: "Confirmed",
      };

      setFormData(mockPaymentData);
      setIsLoading(false);
    };

    loadPaymentData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-populate student info when student is selected
    if (name === "studentId") {
      const student = students.find((s) => s.id === value);
      if (student) {
        setFormData((prev) => ({
          ...prev,
          studentName: student.name,
          class: student.class,
          section: student.section,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "studentId",
      "paymentType",
      "amount",
      "paymentMethod",
      "term",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Payment Updated Successfully", {
        description: `Payment record for ${formData.studentName} has been updated.`,
      });

      // Navigate back to payment details or list
      navigate(`/accountant/payments/view/${id}`);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to update payment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/accountant/payments/view/${id}`)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Payment Details
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Payment</h1>
            <p className="text-muted-foreground">
              Update payment information for {formData.studentName}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
            <CardDescription>
              Update the payment details for the student
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student *</Label>
                  <Select
                    value={formData.studentId}
                    onValueChange={(value) =>
                      handleSelectChange("studentId", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {student.name} ({student.id})
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Student name (auto-filled)"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Input
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    placeholder="Class (auto-filled)"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Input
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    placeholder="Section (auto-filled)"
                    readOnly
                  />
                </div>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="paymentType">Payment Type *</Label>
                  <Select
                    value={formData.paymentType}
                    onValueChange={(value) =>
                      handleSelectChange("paymentType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tuition">Tuition Fee</SelectItem>
                      <SelectItem value="development">
                        Development Levy
                      </SelectItem>
                      <SelectItem value="sports">Sports Fee</SelectItem>
                      <SelectItem value="library">Library Fee</SelectItem>
                      <SelectItem value="examination">
                        Examination Fee
                      </SelectItem>
                      <SelectItem value="transportation">
                        Transportation Fee
                      </SelectItem>
                      <SelectItem value="uniform">Uniform Fee</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₦) *</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method *</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      handleSelectChange("paymentMethod", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank-transfer">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="pos">POS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referenceNumber">Reference Number</Label>
                  <Input
                    id="referenceNumber"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleInputChange}
                    placeholder="Transaction/Reference number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="term">Term *</Label>
                  <Select
                    value={formData.term}
                    onValueChange={(value) => handleSelectChange("term", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first">First Term</SelectItem>
                      <SelectItem value="second">Second Term</SelectItem>
                      <SelectItem value="third">Third Term</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    name="academicYear"
                    type="number"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    placeholder="Academic year"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Payment Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Additional notes or description for this payment"
                  rows={3}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/accountant/payments/view/${id}`)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Update Payment
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default EditPayment;
