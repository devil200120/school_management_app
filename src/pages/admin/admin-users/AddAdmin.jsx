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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useToast } from "../../../hooks/use-toast";
import {
  CheckCircle,
  User,
  GraduationCap,
  Calculator,
  Shield,
} from "lucide-react";

const AddAdmin = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    username: "",
    role: "",
    // Teacher specific fields
    teacherType: "",
    level: "",
    subjects: [],
    classAssigned: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [generatedId, setGeneratedId] = useState("");

  // Available subjects by level
  const subjectsByLevel = {
    primary: [
      "Mathematics",
      "English",
      "Science",
      "Social Studies",
      "Arts",
      "Physical Education",
    ],
    junior: [
      "Mathematics",
      "English",
      "Basic Science",
      "Social Studies",
      "Computer Studies",
      "French",
      "Arts",
      "Physical Education",
    ],
    senior: [
      "Mathematics",
      "English",
      "Physics",
      "Chemistry",
      "Biology",
      "Geography",
      "History",
      "Economics",
      "Literature",
      "Computer Science",
      "Arts",
      "Physical Education",
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear dependent fields when role changes
    if (name === "role" && value !== "teacher") {
      setFormData((prev) => ({
        ...prev,
        teacherType: "",
        level: "",
        subjects: [],
        classAssigned: "",
      }));
    }

    // Clear subjects when level changes
    if (name === "level") {
      setFormData((prev) => ({
        ...prev,
        subjects: [],
      }));
    }

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubjectToggle = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.role) newErrors.role = "Role is required";

    // Teacher specific validations
    if (formData.role === "teacher") {
      if (!formData.teacherType)
        newErrors.teacherType = "Teacher type is required";
      if (!formData.level) newErrors.level = "Level is required";

      if (formData.teacherType === "subject_teacher") {
        if (formData.subjects.length === 0)
          newErrors.subjects = "At least one subject must be selected";
      }

      if (formData.teacherType === "class_teacher") {
        if (!formData.classAssigned)
          newErrors.classAssigned = "Class assignment is required";
      }
    }

    return newErrors;
  };

  const generateUserId = (role) => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const prefix =
      role === "teacher" ? "TCH" : role === "accountant" ? "ACC" : "ADM";
    return `${prefix}-${year}-${randomNum}`;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate user ID
      const userId = generateUserId(formData.role);
      setGeneratedId(userId);

      // Show success dialog
      setShowSuccessDialog(true);

      toast({
        title: "User Added Successfully!",
        description: `${
          formData.role.charAt(0).toUpperCase() + formData.role.slice(1)
        } ${formData.name} has been added successfully.`,
        duration: 4000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the user. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      username: "",
      role: "",
      teacherType: "",
      level: "",
      subjects: [],
      classAssigned: "",
      password: "",
    });
    setErrors({});
    setShowSuccessDialog(false);
    setGeneratedId("");
  };
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add User
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Enter User Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleInputChange}
                className={`transition-all duration-300 focus:border-eduos-primary ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Enter Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className={`transition-all duration-300 focus:border-eduos-primary ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Enter Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className={`transition-all duration-300 focus:border-eduos-primary ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Enter Address *</Label>
              <Input
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className={`transition-all duration-300 focus:border-eduos-primary ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Enter Username *</Label>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className={`transition-all duration-300 focus:border-eduos-primary ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Select User Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleSelectChange("role", value)}
              >
                <SelectTrigger
                  className={`transition-all duration-300 ${
                    errors.role ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      Super Admin
                    </div>
                  </SelectItem>
                  <SelectItem value="accountant">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-green-500" />
                      Accountant
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-500" />
                      Teacher
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role}</p>
              )}
            </div>
          </div>

          {/* Teacher Specific Fields */}
          {formData.role === "teacher" && (
            <div className="space-y-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-eduos-primary flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Teacher Configuration
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="teacherType">Teacher Type *</Label>
                  <Select
                    value={formData.teacherType}
                    onValueChange={(value) =>
                      handleSelectChange("teacherType", value)
                    }
                  >
                    <SelectTrigger
                      className={`transition-all duration-300 ${
                        errors.teacherType ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select teacher type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subject_teacher">
                        Subject Teacher
                      </SelectItem>
                      <SelectItem value="class_teacher">
                        Class Teacher
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.teacherType && (
                    <p className="text-sm text-red-500">{errors.teacherType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Select Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) =>
                      handleSelectChange("level", value)
                    }
                  >
                    <SelectTrigger
                      className={`transition-all duration-300 ${
                        errors.level ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary Level</SelectItem>
                      <SelectItem value="junior">Junior Secondary</SelectItem>
                      <SelectItem value="senior">Senior Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.level && (
                    <p className="text-sm text-red-500">{errors.level}</p>
                  )}
                </div>
              </div>

              {/* Subject Teacher Fields */}
              {formData.teacherType === "subject_teacher" && formData.level && (
                <div className="space-y-4">
                  <Label>Select Subjects to Teach *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {subjectsByLevel[formData.level]?.map((subject) => (
                      <div
                        key={subject}
                        className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                          formData.subjects.includes(subject)
                            ? "bg-eduos-primary text-white border-eduos-primary"
                            : "bg-white border-gray-200 hover:border-eduos-primary"
                        }`}
                        onClick={() => handleSubjectToggle(subject)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{subject}</span>
                          {formData.subjects.includes(subject) && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.subjects && (
                    <p className="text-sm text-red-500">{errors.subjects}</p>
                  )}

                  {formData.subjects.length > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-800 font-medium">
                        Selected Subjects:
                      </p>
                      <p className="text-sm text-green-700">
                        {formData.subjects.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Class Teacher Fields */}
              {formData.teacherType === "class_teacher" && formData.level && (
                <div className="space-y-2">
                  <Label htmlFor="classAssigned">Assign Class *</Label>
                  <Select
                    value={formData.classAssigned}
                    onValueChange={(value) =>
                      handleSelectChange("classAssigned", value)
                    }
                  >
                    <SelectTrigger
                      className={`transition-all duration-300 ${
                        errors.classAssigned ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select class to assign" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.level === "primary" && (
                        <>
                          <SelectItem value="primary-1-a">
                            Primary 1A
                          </SelectItem>
                          <SelectItem value="primary-1-b">
                            Primary 1B
                          </SelectItem>
                          <SelectItem value="primary-2-a">
                            Primary 2A
                          </SelectItem>
                          <SelectItem value="primary-2-b">
                            Primary 2B
                          </SelectItem>
                          <SelectItem value="primary-3-a">
                            Primary 3A
                          </SelectItem>
                          <SelectItem value="primary-3-b">
                            Primary 3B
                          </SelectItem>
                          <SelectItem value="primary-4-a">
                            Primary 4A
                          </SelectItem>
                          <SelectItem value="primary-4-b">
                            Primary 4B
                          </SelectItem>
                          <SelectItem value="primary-5-a">
                            Primary 5A
                          </SelectItem>
                          <SelectItem value="primary-5-b">
                            Primary 5B
                          </SelectItem>
                          <SelectItem value="primary-6-a">
                            Primary 6A
                          </SelectItem>
                          <SelectItem value="primary-6-b">
                            Primary 6B
                          </SelectItem>
                        </>
                      )}
                      {formData.level === "junior" && (
                        <>
                          <SelectItem value="jss-1-a">JSS 1A</SelectItem>
                          <SelectItem value="jss-1-b">JSS 1B</SelectItem>
                          <SelectItem value="jss-2-a">JSS 2A</SelectItem>
                          <SelectItem value="jss-2-b">JSS 2B</SelectItem>
                          <SelectItem value="jss-3-a">JSS 3A</SelectItem>
                          <SelectItem value="jss-3-b">JSS 3B</SelectItem>
                        </>
                      )}
                      {formData.level === "senior" && (
                        <>
                          <SelectItem value="sss-1-a">SSS 1A</SelectItem>
                          <SelectItem value="sss-1-b">SSS 1B</SelectItem>
                          <SelectItem value="sss-2-a">SSS 2A</SelectItem>
                          <SelectItem value="sss-2-b">SSS 2B</SelectItem>
                          <SelectItem value="sss-3-a">SSS 3A</SelectItem>
                          <SelectItem value="sss-3-b">SSS 3B</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.classAssigned && (
                    <p className="text-sm text-red-500">
                      {errors.classAssigned}
                    </p>
                  )}

                  {formData.classAssigned && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800 font-medium">
                        Class Teacher Assignment:
                      </p>
                      <p className="text-sm text-blue-700">
                        This teacher will be responsible for managing{" "}
                        {formData.classAssigned} including attendance, student
                        welfare, and class coordination.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Adding User...
              </>
            ) : (
              <>
                <User className="w-4 h-4 mr-2" />
                Add User
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              User Added Successfully!
            </DialogTitle>
            <DialogDescription>
              The user has been successfully added to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm space-y-2">
                <p className="font-semibold text-green-800">User Details:</p>
                <p className="text-green-700">
                  <span className="font-medium">Name:</span> {formData.name}
                </p>
                <p className="text-green-700">
                  <span className="font-medium">User ID:</span> {generatedId}
                </p>
                <p className="text-green-700">
                  <span className="font-medium">Role:</span>{" "}
                  {formData.role
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
                {formData.role === "teacher" && (
                  <>
                    <p className="text-green-700">
                      <span className="font-medium">Type:</span>{" "}
                      {formData.teacherType
                        .replace("_", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </p>
                    <p className="text-green-700">
                      <span className="font-medium">Level:</span>{" "}
                      {formData.level.charAt(0).toUpperCase() +
                        formData.level.slice(1)}
                    </p>
                    {formData.teacherType === "subject_teacher" &&
                      formData.subjects.length > 0 && (
                        <p className="text-green-700">
                          <span className="font-medium">Subjects:</span>{" "}
                          {formData.subjects.join(", ")}
                        </p>
                      )}
                    {formData.teacherType === "class_teacher" &&
                      formData.classAssigned && (
                        <p className="text-green-700">
                          <span className="font-medium">Class:</span>{" "}
                          {formData.classAssigned}
                        </p>
                      )}
                  </>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSuccessDialog(false)}
            >
              View User
            </Button>
            <Button
              onClick={resetForm}
              className="bg-eduos-primary hover:bg-eduos-secondary"
            >
              Add Another User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAdmin;
