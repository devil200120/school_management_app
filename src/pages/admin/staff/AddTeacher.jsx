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
import {
  UserPlus,
  Save,
  RefreshCw,
  DollarSign,
  Users,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { Textarea } from "../../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";

const AddTeacher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: "",
    nationalId: "",

    // Professional Information
    employeeId: "",
    department: "",
    position: "",
    qualification: "",
    experience: "",
    joinDate: "",
    employmentType: "",
    subjects: [],
    classes: [],

    // Salary Information
    basicSalary: "",
    allowances: "",
    housingAllowance: "",
    transportAllowance: "",
    teachingAllowance: "",
    overtimeRate: "",
    currency: "NGN",
    paymentMethod: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    pensionScheme: "",
    taxDeduction: "",

    // Additional Information
    notes: "",
    profilePicture: "",
    status: "active",
  });

  // Mock data for dropdowns
  const departments = [
    "Mathematics",
    "English",
    "Science",
    "Social Studies",
    "Arts",
    "Physical Education",
    "Computer Science",
    "Economics",
    "Physics",
    "Chemistry",
    "Biology",
    "Administration",
  ];

  const positions = [
    "Principal",
    "Vice Principal",
    "Head Teacher",
    "Senior Teacher",
    "Teacher",
    "Junior Teacher",
    "Teaching Assistant",
    "Subject Coordinator",
    "Department Head",
  ];

  const subjects = [
    "Mathematics",
    "English Language",
    "Physics",
    "Chemistry",
    "Biology",
    "Geography",
    "History",
    "Economics",
    "Computer Science",
    "Physical Education",
    "Arts",
    "Music",
  ];

  const classes = [
    "JSS 1A",
    "JSS 1B",
    "JSS 2A",
    "JSS 2B",
    "JSS 3A",
    "JSS 3B",
    "SS 1A",
    "SS 1B",
    "SS 2A",
    "SS 2B",
    "SS 3A",
    "SS 3B",
  ];

  const banks = [
    "First Bank",
    "GTBank",
    "Zenith Bank",
    "UBA",
    "Access Bank",
    "Fidelity Bank",
    "Union Bank",
    "Sterling Bank",
    "Wema Bank",
    "Polaris Bank",
    "FCMB",
    "Ecobank",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultiSelectChange = (field, value, isSelected) => {
    setFormData((prev) => ({
      ...prev,
      [field]: isSelected
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const calculateTotalSalary = () => {
    const basic = parseFloat(formData.basicSalary) || 0;
    const allowances = parseFloat(formData.allowances) || 0;
    const housing = parseFloat(formData.housingAllowance) || 0;
    const transport = parseFloat(formData.transportAllowance) || 0;
    const teaching = parseFloat(formData.teachingAllowance) || 0;
    return basic + allowances + housing + transport + teaching;
  };

  const calculateNetSalary = () => {
    const gross = calculateTotalSalary();
    const tax = parseFloat(formData.taxDeduction) || 0;
    return gross - tax;
  };

  const generateEmployeeId = () => {
    const dept = formData.department
      ? formData.department.substring(0, 3).toUpperCase()
      : "TCH";
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `${dept}${randomNum}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.department ||
      !formData.position ||
      !formData.basicSalary
    ) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      // Generate employee ID if not provided
      if (!formData.employeeId) {
        formData.employeeId = generateEmployeeId();
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Teacher Added Successfully!", {
        description: `${formData.firstName} ${formData.lastName} has been added to the system with ID: ${formData.employeeId}`,
        duration: 4000,
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        emergencyContact: "",
        nationalId: "",
        employeeId: "",
        department: "",
        position: "",
        qualification: "",
        experience: "",
        joinDate: "",
        employmentType: "",
        subjects: [],
        classes: [],
        basicSalary: "",
        allowances: "",
        housingAllowance: "",
        transportAllowance: "",
        teachingAllowance: "",
        overtimeRate: "",
        currency: "NGN",
        paymentMethod: "",
        bankName: "",
        accountNumber: "",
        accountName: "",
        pensionScheme: "",
        taxDeduction: "",
        notes: "",
        profilePicture: "",
        status: "active",
      });
    } catch (error) {
      toast.error("Failed to add teacher. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-eduos-primary">
            Add New Teacher
          </h2>
          <p className="text-muted-foreground">
            Add a new teacher with comprehensive profile and salary information
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
                Teacher Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-4 w-4" />
                    <h3 className="text-lg font-semibold">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="john.doe@school.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+234 800 000 0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("gender", value)
                        }
                        value={formData.gender}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationalId">National ID</Label>
                      <Input
                        id="nationalId"
                        value={formData.nationalId}
                        onChange={(e) =>
                          handleInputChange("nationalId", e.target.value)
                        }
                        placeholder="12345678901"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Complete residential address"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) =>
                        handleInputChange("emergencyContact", e.target.value)
                      }
                      placeholder="Emergency contact person and phone"
                    />
                  </div>
                </div>

                {/* Professional Information Section */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="h-4 w-4" />
                    <h3 className="text-lg font-semibold">
                      Professional Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={formData.employeeId}
                        onChange={(e) =>
                          handleInputChange("employeeId", e.target.value)
                        }
                        placeholder="Auto-generated"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("department", value)
                        }
                        value={formData.department}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position *</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("position", value)
                        }
                        value={formData.position}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          {positions.map((pos) => (
                            <SelectItem key={pos} value={pos}>
                              {pos}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="qualification">
                        Highest Qualification
                      </Label>
                      <Input
                        id="qualification"
                        value={formData.qualification}
                        onChange={(e) =>
                          handleInputChange("qualification", e.target.value)
                        }
                        placeholder="e.g., B.Ed Mathematics, M.Sc Physics"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={formData.experience}
                        onChange={(e) =>
                          handleInputChange("experience", e.target.value)
                        }
                        placeholder="5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="joinDate">Join Date</Label>
                      <Input
                        id="joinDate"
                        type="date"
                        value={formData.joinDate}
                        onChange={(e) =>
                          handleInputChange("joinDate", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employmentType">Employment Type</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("employmentType", value)
                        }
                        value={formData.employmentType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="temporary">Temporary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subjects to Teach</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {subjects.map((subject) => (
                        <label
                          key={subject}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={formData.subjects.includes(subject)}
                            onChange={(e) =>
                              handleMultiSelectChange(
                                "subjects",
                                subject,
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300"
                          />
                          <span>{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Classes to Handle</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {classes.map((cls) => (
                        <label
                          key={cls}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={formData.classes.includes(cls)}
                            onChange={(e) =>
                              handleMultiSelectChange(
                                "classes",
                                cls,
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300"
                          />
                          <span>{cls}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Salary Information Section */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-4 w-4" />
                    <h3 className="text-lg font-semibold">
                      Salary Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="basicSalary">Basic Salary (₦) *</Label>
                      <Input
                        id="basicSalary"
                        type="number"
                        value={formData.basicSalary}
                        onChange={(e) =>
                          handleInputChange("basicSalary", e.target.value)
                        }
                        placeholder="200,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowances">General Allowances (₦)</Label>
                      <Input
                        id="allowances"
                        type="number"
                        value={formData.allowances}
                        onChange={(e) =>
                          handleInputChange("allowances", e.target.value)
                        }
                        placeholder="50,000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="housingAllowance">
                        Housing Allowance (₦)
                      </Label>
                      <Input
                        id="housingAllowance"
                        type="number"
                        value={formData.housingAllowance}
                        onChange={(e) =>
                          handleInputChange("housingAllowance", e.target.value)
                        }
                        placeholder="30,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transportAllowance">
                        Transport Allowance (₦)
                      </Label>
                      <Input
                        id="transportAllowance"
                        type="number"
                        value={formData.transportAllowance}
                        onChange={(e) =>
                          handleInputChange(
                            "transportAllowance",
                            e.target.value
                          )
                        }
                        placeholder="20,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teachingAllowance">
                        Teaching Allowance (₦)
                      </Label>
                      <Input
                        id="teachingAllowance"
                        type="number"
                        value={formData.teachingAllowance}
                        onChange={(e) =>
                          handleInputChange("teachingAllowance", e.target.value)
                        }
                        placeholder="25,000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="overtimeRate">
                        Overtime Rate (₦/hour)
                      </Label>
                      <Input
                        id="overtimeRate"
                        type="number"
                        value={formData.overtimeRate}
                        onChange={(e) =>
                          handleInputChange("overtimeRate", e.target.value)
                        }
                        placeholder="3,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxDeduction">Tax Deduction (₦)</Label>
                      <Input
                        id="taxDeduction"
                        type="number"
                        value={formData.taxDeduction}
                        onChange={(e) =>
                          handleInputChange("taxDeduction", e.target.value)
                        }
                        placeholder="15,000"
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Information Section */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="h-4 w-4" />
                    <h3 className="text-lg font-semibold">Bank Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("bankName", value)
                        }
                        value={formData.bankName}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {banks.map((bank) => (
                            <SelectItem key={bank} value={bank}>
                              {bank}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Payment Method</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("paymentMethod", value)
                        }
                        value={formData.paymentMethod}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank-transfer">
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value="cash">Cash Payment</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                          <SelectItem value="mobile-money">
                            Mobile Money
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber}
                        onChange={(e) =>
                          handleInputChange("accountNumber", e.target.value)
                        }
                        placeholder="0123456789"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input
                        id="accountName"
                        value={formData.accountName}
                        onChange={(e) =>
                          handleInputChange("accountName", e.target.value)
                        }
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pensionScheme">Pension Scheme</Label>
                    <Input
                      id="pensionScheme"
                      value={formData.pensionScheme}
                      onChange={(e) =>
                        handleInputChange("pensionScheme", e.target.value)
                      }
                      placeholder="e.g., RSA PIN: RSA1234567890"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-4 w-4" />
                    <h3 className="text-lg font-semibold">
                      Additional Information
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Administrative Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      placeholder="Any additional information about the teacher..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Employment Status</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("status", value)
                      }
                      value={formData.status}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                    {isLoading ? "Adding Teacher..." : "Add Teacher"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPreview(true)}
                    disabled={!formData.firstName || !formData.lastName}
                  >
                    Preview Details
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
                Salary Calculation
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
                    General Allowances:
                  </span>
                  <span className="font-medium">
                    ₦{Number(formData.allowances || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Housing Allowance:
                  </span>
                  <span className="font-medium">
                    ₦{Number(formData.housingAllowance || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Transport Allowance:
                  </span>
                  <span className="font-medium">
                    ₦{Number(formData.transportAllowance || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Teaching Allowance:
                  </span>
                  <span className="font-medium">
                    ₦{Number(formData.teachingAllowance || 0).toLocaleString()}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-green-600">
                  <span className="font-medium">Gross Salary:</span>
                  <span className="font-bold">
                    ₦{calculateTotalSalary().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span className="font-medium">Tax Deduction:</span>
                  <span className="font-bold">
                    -₦{Number(formData.taxDeduction || 0).toLocaleString()}
                  </span>
                </div>
                <hr className="border-2" />
                <div className="flex justify-between text-lg font-bold text-eduos-primary">
                  <span>Net Salary:</span>
                  <span>₦{calculateNetSalary().toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Overtime Rate: ₦
                  {Number(formData.overtimeRate || 0).toLocaleString()}/hour
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">
                    {formData.firstName} {formData.lastName || ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">
                    {formData.department || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position:</span>
                  <span className="font-medium">
                    {formData.position || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employee ID:</span>
                  <span className="font-medium">
                    {formData.employeeId || "Auto-generated"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subjects:</span>
                  <span className="font-medium">
                    {formData.subjects.length > 0
                      ? formData.subjects.length
                      : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Classes:</span>
                  <span className="font-medium">
                    {formData.classes.length > 0 ? formData.classes.length : 0}
                  </span>
                </div>
              </div>

              {formData.subjects.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Subjects:</p>
                  <div className="flex flex-wrap gap-1">
                    {formData.subjects.map((subject) => (
                      <Badge
                        key={subject}
                        variant="secondary"
                        className="text-xs"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Teacher Profile Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="font-semibold mb-3">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span>{" "}
                  {formData.firstName} {formData.lastName}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {formData.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {formData.phone}
                </div>
                <div>
                  <span className="font-medium">Date of Birth:</span>{" "}
                  {formData.dateOfBirth}
                </div>
                <div>
                  <span className="font-medium">Gender:</span> {formData.gender}
                </div>
                <div>
                  <span className="font-medium">National ID:</span>{" "}
                  {formData.nationalId}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Address:</span>{" "}
                  {formData.address}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Emergency Contact:</span>{" "}
                  {formData.emergencyContact}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="font-semibold mb-3">Professional Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Employee ID:</span>{" "}
                  {formData.employeeId || "Auto-generated"}
                </div>
                <div>
                  <span className="font-medium">Department:</span>{" "}
                  {formData.department}
                </div>
                <div>
                  <span className="font-medium">Position:</span>{" "}
                  {formData.position}
                </div>
                <div>
                  <span className="font-medium">Qualification:</span>{" "}
                  {formData.qualification}
                </div>
                <div>
                  <span className="font-medium">Experience:</span>{" "}
                  {formData.experience} years
                </div>
                <div>
                  <span className="font-medium">Join Date:</span>{" "}
                  {formData.joinDate}
                </div>
                <div>
                  <span className="font-medium">Employment Type:</span>{" "}
                  {formData.employmentType}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {formData.status}
                </div>
              </div>

              {formData.subjects.length > 0 && (
                <div className="mt-4">
                  <span className="font-medium">Subjects:</span>{" "}
                  {formData.subjects.join(", ")}
                </div>
              )}

              {formData.classes.length > 0 && (
                <div className="mt-2">
                  <span className="font-medium">Classes:</span>{" "}
                  {formData.classes.join(", ")}
                </div>
              )}
            </div>

            {/* Salary Information */}
            <div>
              <h3 className="font-semibold mb-3">Salary Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Basic Salary:</span> ₦
                  {Number(formData.basicSalary || 0).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">General Allowances:</span> ₦
                  {Number(formData.allowances || 0).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Housing Allowance:</span> ₦
                  {Number(formData.housingAllowance || 0).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Transport Allowance:</span> ₦
                  {Number(formData.transportAllowance || 0).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Teaching Allowance:</span> ₦
                  {Number(formData.teachingAllowance || 0).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Overtime Rate:</span> ₦
                  {Number(formData.overtimeRate || 0).toLocaleString()}/hour
                </div>
                <div>
                  <span className="font-medium">Tax Deduction:</span> ₦
                  {Number(formData.taxDeduction || 0).toLocaleString()}
                </div>
                <div className="col-span-2 border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Gross Salary:</span>
                    <span className="font-bold text-green-600">
                      ₦{calculateTotalSalary().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Net Salary:</span>
                    <span className="font-bold text-eduos-primary">
                      ₦{calculateNetSalary().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div>
              <h3 className="font-semibold mb-3">Bank Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Bank Name:</span>{" "}
                  {formData.bankName}
                </div>
                <div>
                  <span className="font-medium">Account Number:</span>{" "}
                  {formData.accountNumber}
                </div>
                <div>
                  <span className="font-medium">Account Name:</span>{" "}
                  {formData.accountName}
                </div>
                <div>
                  <span className="font-medium">Payment Method:</span>{" "}
                  {formData.paymentMethod}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Pension Scheme:</span>{" "}
                  {formData.pensionScheme}
                </div>
              </div>
            </div>

            {formData.notes && (
              <div>
                <h3 className="font-semibold mb-3">Additional Notes</h3>
                <p className="text-sm text-muted-foreground">
                  {formData.notes}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTeacher;
