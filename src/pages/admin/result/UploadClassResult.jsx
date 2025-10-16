import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

const UploadClassResult = () => {
  // State management for form fields
  const [formData, setFormData] = useState({
    level: "",
    class: "",
    session: "",
    subject: "",
    term: "",
    firstCA: "",
    secondCA: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle form field changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const { level, class: className, session, subject, term } = formData;
    if (!level || !className || !session || !subject || !term) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields before proceeding.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
      return false;
    }
    return true;
  };

  // Handle Check Now button click
  const handleCheckNow = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Class Found!", {
        description: `Successfully loaded ${formData.class} students for ${formData.subject} result upload.`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 4000,
      });

      // Here you would typically navigate to the result upload interface
      console.log("Form Data:", formData);
    } catch (error) {
      toast.error("Error Loading Class", {
        description: "Failed to load class data. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Upload Class Result
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Upload Class and Subject</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="level">
                Select Level <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elementary">Elementary</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="senior-secondary">
                    Senior Secondary
                  </SelectItem>
                  <SelectItem value="junior-secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">
                Select Class <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.class}
                onValueChange={(value) => handleSelectChange("class", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class1">Class 1</SelectItem>
                  <SelectItem value="class2">Class 2</SelectItem>
                  <SelectItem value="class3">Class 3</SelectItem>
                  <SelectItem value="ss1">SS 1</SelectItem>
                  <SelectItem value="ss2">SS 2</SelectItem>
                  <SelectItem value="ss3">SS 3</SelectItem>
                  <SelectItem value="js1">JS 1</SelectItem>
                  <SelectItem value="js2">JS 2</SelectItem>
                  <SelectItem value="js3">JS 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session">
                Select Session <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.session}
                onValueChange={(value) => handleSelectChange("session", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-2026">2025/2026</SelectItem>
                  <SelectItem value="2024-2025">2024/2025</SelectItem>
                  <SelectItem value="2023-2024">2023/2024</SelectItem>
                  <SelectItem value="2022-2023">2022/2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">
                Select Subject <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => handleSelectChange("subject", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English Language</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="economics">Economics</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="geography">Geography</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">
                Select Term/Semester <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.term}
                onValueChange={(value) => handleSelectChange("term", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Term</SelectItem>
                  <SelectItem value="second">Second Term</SelectItem>
                  <SelectItem value="third">Third Term</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grade Section with First CA & Second CA fields */}
            <div className="border-t pt-4 mt-6">
              <h3 className="text-lg font-semibold text-eduos-primary mb-4">
                Grade Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstCA">First CA (Max Score)</Label>
                  <Input
                    id="firstCA"
                    name="firstCA"
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.firstCA}
                    onChange={handleInputChange}
                    className="focus:ring-2 focus:ring-eduos-primary"
                    min="0"
                    max="100"
                  />
                  <p className="text-sm text-gray-500">
                    Maximum score for First Continuous Assessment
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondCA">Second CA (Max Score)</Label>
                  <Input
                    id="secondCA"
                    name="secondCA"
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.secondCA}
                    onChange={handleInputChange}
                    className="focus:ring-2 focus:ring-eduos-primary"
                    min="0"
                    max="100"
                  />
                  <p className="text-sm text-gray-500">
                    Maximum score for Second Continuous Assessment
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCheckNow}
            disabled={isLoading}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading Class...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Check Now
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadClassResult;
