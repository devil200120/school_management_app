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
import { Check, BookOpen, AlertCircle } from "lucide-react";

const AddClass = () => {
  const [formData, setFormData] = useState({
    className: "",
    classLevel: "",
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
    if (!formData.className.trim()) {
      toast.error("Validation Error", {
        description: "Please enter a class name.",
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

    if (formData.className.trim().length < 2) {
      toast.error("Validation Error", {
        description: "Class name must be at least 2 characters long.",
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
      toast.success("Class Added Successfully!", {
        description: `${formData.className} (${formData.classLevel}) has been added to the system.`,
        icon: <Check className="h-4 w-4" />,
        duration: 4000,
      });

      // Reset form
      setFormData({
        className: "",
        classLevel: "",
      });
    } catch (error) {
      toast.error("Failed to Add Class", {
        description: "There was an error adding the class. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Class
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 mt-3 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Class Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="className">Enter Class Name *</Label>
              <Input
                id="className"
                value={formData.className}
                onChange={(e) => handleInputChange("className", e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g. Class 1A, 10th Grade, Science Class, etc."
                className="transition-all duration-300 focus:border-eduos-primary"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classLevel">Select Class Level *</Label>
              <Select
                value={formData.classLevel}
                onValueChange={(value) =>
                  handleInputChange("classLevel", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a level" />
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
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                Preview:
              </h4>
              <p className="text-sm text-blue-700">
                <strong>Class Name:</strong>{" "}
                {formData.className || "Not specified"}
                <br />
                <strong>Level:</strong>{" "}
                {formData.classLevel
                  ? formData.classLevel.charAt(0).toUpperCase() +
                    formData.classLevel.slice(1).replace("-", " ")
                  : "Not selected"}
              </p>
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
                Adding Class...
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

export default AddClass;
