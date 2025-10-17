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
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";
import {
  Check,
  Building2,
  AlertCircle,
  Users,
  GraduationCap,
} from "lucide-react";

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    departmentName: "",
    classLevel: "",
    headOfDepartment: "",
    description: "",
    capacity: "",
    establishedYear: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.departmentName.trim()) {
      toast.error("Validation Error", {
        description: "Please enter a department name.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 3000,
      });
      return false;
    }

    if (!formData.classLevel) {
      toast.error("Validation Error", {
        description: "Please select a class level.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 3000,
      });
      return false;
    }

    if (!formData.headOfDepartment.trim()) {
      toast.error("Validation Error", {
        description: "Please enter the head of department.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 3000,
      });
      return false;
    }

    if (formData.departmentName.trim().length < 2) {
      toast.error("Validation Error", {
        description: "Department name must be at least 2 characters long.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 3000,
      });
      return false;
    }

    if (
      formData.capacity &&
      (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0)
    ) {
      toast.error("Validation Error", {
        description: "Please enter a valid positive number for capacity.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 3000,
      });
      return false;
    }

    if (
      formData.establishedYear &&
      (isNaN(Number(formData.establishedYear)) ||
        Number(formData.establishedYear) < 1900 ||
        Number(formData.establishedYear) > new Date().getFullYear())
    ) {
      toast.error("Validation Error", {
        description: "Please enter a valid year between 1900 and current year.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success toast
      toast.success("Department Added Successfully!", {
        description: `${formData.departmentName} (${formData.classLevel}) has been added to the system with ${formData.headOfDepartment} as HOD.`,
        icon: <Check className="h-4 w-4" />,
        duration: 4000,
      });

      // Reset form
      setFormData({
        departmentName: "",
        classLevel: "",
        headOfDepartment: "",
        description: "",
        capacity: "",
        establishedYear: "",
      });
    } catch (error) {
      toast.error("Failed to Add Department", {
        description:
          "There was an error adding the department. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.type !== "textarea") {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Department
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Department Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="departmentName">Department Name *</Label>
              <Input
                id="departmentName"
                value={formData.departmentName}
                onChange={(e) =>
                  handleInputChange("departmentName", e.target.value)
                }
                onKeyPress={handleKeyPress}
                placeholder="e.g. Science Department, Arts Department, etc."
                className="transition-all duration-300 focus:border-eduos-primary"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classLevel">Primary Class Level *</Label>
              <Select
                value={formData.classLevel}
                onValueChange={(value) =>
                  handleInputChange("classLevel", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select primary level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary School</SelectItem>
                  <SelectItem value="elementary">Elementary School</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="junior-secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="senior-secondary">
                    Senior Secondary
                  </SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="college">College Level</SelectItem>
                  <SelectItem value="university">University Level</SelectItem>
                  <SelectItem value="all-levels">All Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="headOfDepartment">Head of Department *</Label>
              <Input
                id="headOfDepartment"
                value={formData.headOfDepartment}
                onChange={(e) =>
                  handleInputChange("headOfDepartment", e.target.value)
                }
                onKeyPress={handleKeyPress}
                placeholder="e.g. Dr. John Smith, Prof. Mary Johnson"
                className="transition-all duration-300 focus:border-eduos-primary"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Department Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                max="1000"
                value={formData.capacity}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g. 200 (optional)"
                className="transition-all duration-300 focus:border-eduos-primary"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="establishedYear">Established Year</Label>
              <Input
                id="establishedYear"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.establishedYear}
                onChange={(e) =>
                  handleInputChange("establishedYear", e.target.value)
                }
                onKeyPress={handleKeyPress}
                placeholder="e.g. 2020 (optional)"
                className="transition-all duration-300 focus:border-eduos-primary"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Department Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the department, its focus areas, and objectives (optional)"
              className="transition-all duration-300 focus:border-eduos-primary min-h-[100px]"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Department Preview:
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>
                  <strong>Name:</strong>{" "}
                  {formData.departmentName || "Not specified"}
                </p>
                <p>
                  <strong>Level:</strong>{" "}
                  {formData.classLevel
                    ? formData.classLevel.charAt(0).toUpperCase() +
                      formData.classLevel.slice(1).replace("-", " ")
                    : "Not selected"}
                </p>
                <p>
                  <strong>HOD:</strong>{" "}
                  {formData.headOfDepartment || "Not assigned"}
                </p>
                {formData.capacity && (
                  <p>
                    <strong>Capacity:</strong> {formData.capacity} students
                  </p>
                )}
                {formData.establishedYear && (
                  <p>
                    <strong>Established:</strong> {formData.establishedYear}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:transform-none disabled:shadow-md"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding Department...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Add Now
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDepartment;
