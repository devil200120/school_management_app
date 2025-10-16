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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";
import { UserPlus, Save, RefreshCw, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Textarea } from "../../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

const AddSalary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    staffId: "",
    staffName: "",
    position: "",
    department: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    bonus: "",
    overtimeHours: "",
    overtimeRate: "",
    salaryMonth: "",
    salaryYear: "",
    paymentMethod: "",
    bankAccount: "",
    notes: "",
  });

  // Mock staff data for selection
  const staffMembers = [
    {
      id: "STF001",
      name: "Dr. John Smith",
      position: "Principal",
      department: "Administration",
    },
    {
      id: "STF002",
      name: "Mrs. Sarah Johnson",
      position: "Vice Principal",
      department: "Administration",
    },
    {
      id: "STF003",
      name: "Mr. Michael Brown",
      position: "Mathematics Teacher",
      department: "Mathematics",
    },
    {
      id: "STF004",
      name: "Ms. Emily Davis",
      position: "English Teacher",
      department: "English",
    },
    {
      id: "STF005",
      name: "Dr. Robert Wilson",
      position: "Science Teacher",
      department: "Science",
    },
    {
      id: "STF006",
      name: "Mrs. Lisa Anderson",
      position: "School Secretary",
      department: "Administration",
    },
    {
      id: "STF007",
      name: "Mr. David Martinez",
      position: "Security Guard",
      department: "Security",
    },
    {
      id: "STF008",
      name: "Ms. Jennifer Garcia",
      position: "Librarian",
      department: "Library",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStaffSelect = (staffId) => {
    const selectedStaff = staffMembers.find((staff) => staff.id === staffId);
    if (selectedStaff) {
      setFormData((prev) => ({
        ...prev,
        staffId: selectedStaff.id,
        staffName: selectedStaff.name,
        position: selectedStaff.position,
        department: selectedStaff.department,
      }));
    }
  };

  const calculateGrossSalary = () => {
    const basic = parseFloat(formData.basicSalary) || 0;
    const allowances = parseFloat(formData.allowances) || 0;
    const bonus = parseFloat(formData.bonus) || 0;
    const overtime =
      (parseFloat(formData.overtimeHours) || 0) *
      (parseFloat(formData.overtimeRate) || 0);
    return basic + allowances + bonus + overtime;
  };

  const calculateNetSalary = () => {
    const gross = calculateGrossSalary();
    const deductions = parseFloat(formData.deductions) || 0;
    return gross - deductions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (
      !formData.staffId ||
      !formData.basicSalary ||
      !formData.salaryMonth ||
      !formData.salaryYear
    ) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Salary Record Added Successfully!", {
        description: `Salary for ${formData.staffName} (${formData.salaryMonth} ${formData.salaryYear}) has been added to pending payments.`,
        duration: 4000,
      });

      // Reset form
      setFormData({
        staffId: "",
        staffName: "",
        position: "",
        department: "",
        basicSalary: "",
        allowances: "",
        deductions: "",
        bonus: "",
        overtimeHours: "",
        overtimeRate: "",
        salaryMonth: "",
        salaryYear: "",
        paymentMethod: "",
        bankAccount: "",
        notes: "",
      });
    } catch (error) {
      toast.error("Failed to add salary record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-eduos-primary">
            Add Staff Salary
          </h2>
          <p className="text-muted-foreground">
            Create new salary records for staff members
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Salary Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Staff Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="staff">Staff Member *</Label>
                    <Select
                      onValueChange={handleStaffSelect}
                      value={formData.staffId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        {staffMembers.map((staff) => (
                          <SelectItem key={staff.id} value={staff.id}>
                            {staff.name} - {staff.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                {/* Salary Period */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salaryMonth">Salary Month *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("salaryMonth", value)
                      }
                      value={formData.salaryMonth}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryYear">Salary Year *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("salaryYear", value)
                      }
                      value={formData.salaryYear}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Salary Components */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basicSalary">Basic Salary (₦) *</Label>
                    <Input
                      id="basicSalary"
                      type="number"
                      placeholder="150,000"
                      value={formData.basicSalary}
                      onChange={(e) =>
                        handleInputChange("basicSalary", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowances">Allowances (₦)</Label>
                    <Input
                      id="allowances"
                      type="number"
                      placeholder="50,000"
                      value={formData.allowances}
                      onChange={(e) =>
                        handleInputChange("allowances", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bonus">Bonus (₦)</Label>
                    <Input
                      id="bonus"
                      type="number"
                      placeholder="25,000"
                      value={formData.bonus}
                      onChange={(e) =>
                        handleInputChange("bonus", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deductions">Deductions (₦)</Label>
                    <Input
                      id="deductions"
                      type="number"
                      placeholder="15,000"
                      value={formData.deductions}
                      onChange={(e) =>
                        handleInputChange("deductions", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Overtime */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="overtimeHours">Overtime Hours</Label>
                    <Input
                      id="overtimeHours"
                      type="number"
                      placeholder="10"
                      value={formData.overtimeHours}
                      onChange={(e) =>
                        handleInputChange("overtimeHours", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="overtimeRate">Overtime Rate (₦/hour)</Label>
                    <Input
                      id="overtimeRate"
                      type="number"
                      placeholder="2,000"
                      value={formData.overtimeRate}
                      onChange={(e) =>
                        handleInputChange("overtimeRate", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("paymentMethod", value)
                      }
                      value={formData.paymentMethod}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank-transfer">
                          Bank Transfer
                        </SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankAccount">Bank Account</Label>
                    <Input
                      id="bankAccount"
                      placeholder="0123456789"
                      value={formData.bankAccount}
                      onChange={(e) =>
                        handleInputChange("bankAccount", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information about this salary payment..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {isLoading ? "Adding Salary..." : "Add Salary Record"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPreview(true)}
                    disabled={!formData.staffId || !formData.basicSalary}
                  >
                    Preview
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Salary Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Salary Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Basic Salary:
                  </span>
                  <span className="font-medium">
                    ₦{Number(formData.basicSalary || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Allowances:
                  </span>
                  <span className="font-medium">
                    ₦{Number(formData.allowances || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bonus:</span>
                  <span className="font-medium">
                    ₦{Number(formData.bonus || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Overtime:
                  </span>
                  <span className="font-medium">
                    ₦
                    {(
                      (parseFloat(formData.overtimeHours) || 0) *
                      (parseFloat(formData.overtimeRate) || 0)
                    ).toLocaleString()}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-green-600">
                  <span className="font-medium">Gross Salary:</span>
                  <span className="font-bold">
                    ₦{calculateGrossSalary().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span className="font-medium">Deductions:</span>
                  <span className="font-bold">
                    -₦{Number(formData.deductions || 0).toLocaleString()}
                  </span>
                </div>
                <hr className="border-2" />
                <div className="flex justify-between text-lg font-bold text-eduos-primary">
                  <span>Net Salary:</span>
                  <span>₦{calculateNetSalary().toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Period Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Month:</span>
                  <span className="font-medium">
                    {formData.salaryMonth || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year:</span>
                  <span className="font-medium">
                    {formData.salaryYear || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staff:</span>
                  <span className="font-medium">
                    {formData.staffName || "Not selected"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Salary Record Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Staff:</span> {formData.staffName}
              </div>
              <div>
                <span className="font-medium">Position:</span>{" "}
                {formData.position}
              </div>
              <div>
                <span className="font-medium">Department:</span>{" "}
                {formData.department}
              </div>
              <div>
                <span className="font-medium">Period:</span>{" "}
                {formData.salaryMonth} {formData.salaryYear}
              </div>
            </div>
            <hr />
            <div className="space-y-2">
              <h4 className="font-medium">Salary Breakdown:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  Basic Salary: ₦
                  {Number(formData.basicSalary || 0).toLocaleString()}
                </div>
                <div>
                  Allowances: ₦
                  {Number(formData.allowances || 0).toLocaleString()}
                </div>
                <div>
                  Bonus: ₦{Number(formData.bonus || 0).toLocaleString()}
                </div>
                <div>
                  Overtime: ₦
                  {(
                    (parseFloat(formData.overtimeHours) || 0) *
                    (parseFloat(formData.overtimeRate) || 0)
                  ).toLocaleString()}
                </div>
                <div className="col-span-2 font-medium text-green-600">
                  Gross Salary: ₦{calculateGrossSalary().toLocaleString()}
                </div>
                <div className="col-span-2 font-medium text-red-600">
                  Deductions: ₦
                  {Number(formData.deductions || 0).toLocaleString()}
                </div>
                <div className="col-span-2 font-bold text-lg text-eduos-primary">
                  Net Salary: ₦{calculateNetSalary().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSalary;
