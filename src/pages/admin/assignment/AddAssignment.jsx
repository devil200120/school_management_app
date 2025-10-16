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
import { Calendar, Clock, Save, FileText, Upload } from "lucide-react";
import { toast } from "sonner";

const AddAssignment = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    class: "",
    level: "",
    dueDate: "",
    dueTime: "",
    maxMarks: "",
    instructions: "",
    attachmentFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(
          "File size too large! Please select a file smaller than 10MB."
        );
        event.target.value = "";
        return;
      }

      setFormData((prev) => ({
        ...prev,
        attachmentFile: file,
      }));
      toast.success(`File "${file.name}" attached successfully!`);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "title",
      "subject",
      "class",
      "level",
      "dueDate",
      "maxMarks",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return false;
    }

    if (parseInt(formData.maxMarks) <= 0) {
      toast.error("Maximum marks must be greater than 0");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Assignment created successfully!", {
        description: `"${formData.title}" has been assigned to ${formData.class}`,
        duration: 5000,
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        subject: "",
        class: "",
        level: "",
        dueDate: "",
        dueTime: "",
        maxMarks: "",
        instructions: "",
        attachmentFile: null,
      });

      // Reset file input
      const fileInput = document.getElementById("attachmentFile");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast.error("Failed to create assignment", {
        description:
          error.message || "An error occurred while creating the assignment",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-eduos-primary">
            Add Assignment
          </h1>
          <p className="text-muted-foreground">
            Create a new assignment for students
          </p>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-eduos-primary hover:bg-eduos-secondary disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Create Assignment
            </>
          )}
        </Button>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assignment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Assignment Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter assignment title"
                  className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxMarks">
                  Maximum Marks <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="maxMarks"
                  type="number"
                  value={formData.maxMarks}
                  onChange={(e) =>
                    handleInputChange("maxMarks", e.target.value)
                  }
                  placeholder="Enter maximum marks"
                  min="1"
                  className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter assignment description"
                rows={3}
                className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">
                  Level <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => handleInputChange("level", value)}
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="junior-secondary">
                      Junior Secondary
                    </SelectItem>
                    <SelectItem value="senior-secondary">
                      Senior Secondary
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">
                  Class <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.class}
                  onValueChange={(value) => handleInputChange("class", value)}
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class10a">Class 10A</SelectItem>
                    <SelectItem value="class10b">Class 10B</SelectItem>
                    <SelectItem value="class11a">Class 11A</SelectItem>
                    <SelectItem value="class12a">Class 12A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => handleInputChange("subject", value)}
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="english">English Language</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Due Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Due Time
                </Label>
                <Input
                  id="dueTime"
                  type="time"
                  value={formData.dueTime}
                  onChange={(e) => handleInputChange("dueTime", e.target.value)}
                  className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) =>
                  handleInputChange("instructions", e.target.value)
                }
                placeholder="Enter assignment instructions for students"
                rows={4}
                className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="attachmentFile">Attachment (Optional)</Label>
              <div className="space-y-2">
                <Input
                  id="attachmentFile"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                  className="transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-eduos-primary file:text-white hover:file:bg-eduos-secondary"
                />
                <p className="text-xs text-gray-500">
                  Accepted formats: PDF, DOC, TXT, PPT, XLS (max 10MB)
                </p>

                {formData.attachmentFile && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                    <Upload className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">
                      {formData.attachmentFile.name}
                    </span>
                    <span className="text-xs text-green-600">
                      ({(formData.attachmentFile.size / 1024 / 1024).toFixed(2)}{" "}
                      MB)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddAssignment;
