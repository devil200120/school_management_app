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
import { FileSpreadsheet, Download, Upload, AlertTriangle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import { toast } from "sonner";

const AddStudentExcel = () => {
  const [level, setLevel] = useState("");
  const [classValue, setClassValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];

      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        toast.success("File selected successfully!", {
          description: `Selected file: ${file.name}`,
          duration: 3000,
        });
      } else {
        toast.error("Invalid file type", {
          description: "Please select a valid Excel file (.xlsx or .xls)",
          duration: 4000,
        });
        setSelectedFile(null);
      }
    }
  };

  const handleDownloadTemplate = () => {
    // Create Excel template data
    const templateData = [
      [
        "First Name",
        "Last Name",
        "Gender",
        "Date of Birth",
        "Parent/Guardian Name",
        "Contact Phone",
        "Email Address",
        "Address",
        "Admission Number",
        "Blood Group",
      ],
      [
        "John",
        "Doe",
        "Male",
        "2010-05-15",
        "Jane Doe",
        "08012345678",
        "john.doe@email.com",
        "123 Main Street, Lagos",
        "STU001",
        "O+",
      ],
      [
        "Mary",
        "Smith",
        "Female",
        "2011-03-20",
        "James Smith",
        "08087654321",
        "mary.smith@email.com",
        "456 Oak Avenue, Abuja",
        "STU002",
        "A-",
      ],
    ];

    // Convert to CSV format
    const csvContent = templateData
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "student_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Template downloaded!", {
      description:
        "Excel template has been downloaded successfully. Fill it with student data and upload.",
      duration: 4000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("No file selected", {
        description: "Please select an Excel file to upload.",
        duration: 3000,
      });
      return;
    }

    if (!level || !classValue) {
      toast.error("Missing information", {
        description: "Please select both Level and Class before uploading.",
        duration: 3000,
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate file processing (replace with actual upload logic)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful upload
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("level", level);
      formData.append("class", classValue);

      // Here you would typically send the formData to your backend
      console.log("Upload Excel:", {
        fileName: selectedFile.name,
        level,
        class: classValue,
        fileSize: selectedFile.size,
      });

      toast.success("Students uploaded successfully!", {
        description: `Successfully processed ${selectedFile.name} for ${level} - ${classValue}. Students have been added to the system.`,
        duration: 5000,
      });

      // Reset form
      setSelectedFile(null);
      setLevel("");
      setClassValue("");

      // Reset file input
      const fileInput = document.getElementById("excelFile");
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed", {
        description:
          "There was an error processing the Excel file. Please check the file format and try again.",
        duration: 4000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Student with Excel
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Add Student With Excel</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-600">Important Note</AlertTitle>
              <AlertDescription>
                Please download the Excel template first, fill it with student
                data, and then upload it. Make sure all required fields are
                completed and the data is in the correct format.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="level">Select Level</Label>
                  <select
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="Primary">Primary</option>
                    <option value="Junior Secondary">Junior Secondary</option>
                    <option value="Senior Secondary">Senior Secondary</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Select Class</Label>
                  <select
                    id="class"
                    value={classValue}
                    onChange={(e) => setClassValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="Primary 1">Primary 1</option>
                    <option value="Primary 2">Primary 2</option>
                    <option value="Primary 3">Primary 3</option>
                    <option value="Primary 4">Primary 4</option>
                    <option value="Primary 5">Primary 5</option>
                    <option value="Primary 6">Primary 6</option>
                    <option value="JS 1">JS 1</option>
                    <option value="JS 2">JS 2</option>
                    <option value="JS 3">JS 3</option>
                    <option value="SS 1">SS 1</option>
                    <option value="SS 2">SS 2</option>
                    <option value="SS 3">SS 3</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excelFile">Upload Excel File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-eduos-primary transition-colors">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileSpreadsheet className="h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label
                        htmlFor="excelFile"
                        className="cursor-pointer text-eduos-primary hover:text-eduos-secondary underline"
                      >
                        Click to browse
                      </label>
                      <span> or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Excel files only (*.xlsx, *.xls)
                    </p>
                    <Input
                      id="excelFile"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </div>
                </div>
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-1">
                    File selected: {selectedFile.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300"
                  onClick={handleDownloadTemplate}
                >
                  <Download size={16} />
                  <span>Download Template</span>
                </Button>
                <Button
                  type="submit"
                  className="bg-eduos-primary hover:bg-eduos-secondary transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    !selectedFile || !level || !classValue || isUploading
                  }
                >
                  <Upload size={16} />
                  <span>
                    {isUploading ? "Uploading..." : "Upload Students"}
                  </span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold">Step 1</h4>
                <p className="text-gray-600">
                  Download the Excel template using the provided button.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Step 2</h4>
                <p className="text-gray-600">
                  Fill in all the required student information in the Excel
                  sheet. Do not modify the column headers.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Step 3</h4>
                <p className="text-gray-600">
                  Select the appropriate Level and Class for the students in the
                  form.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Step 4</h4>
                <p className="text-gray-600">
                  Upload the filled Excel file and submit to add all students at
                  once.
                </p>
              </div>

              <Alert className="mt-8 bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-600">
                  Required Fields
                </AlertTitle>
                <AlertDescription className="text-sm">
                  <ul className="list-disc list-inside space-y-1">
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li>Gender</li>
                    <li>Date of Birth</li>
                    <li>Parent/Guardian Name</li>
                    <li>Contact Phone</li>
                    <li>Email Address</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddStudentExcel;
