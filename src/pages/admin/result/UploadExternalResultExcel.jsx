import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { toast } from "sonner";
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

const UploadExternalResultExcel = () => {
  const [formData, setFormData] = useState({
    level: "",
    class: "",
    session: "",
    examType: "",
    examYear: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
        "text/csv", // .csv
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Invalid file type! Please select a valid Excel or CSV file."
        );
        event.target.value = "";
        return;
      }

      // Validate file size (max 15MB for external results)
      if (file.size > 15 * 1024 * 1024) {
        toast.error(
          "File size too large! Please select a file smaller than 15MB."
        );
        event.target.value = "";
        return;
      }

      setSelectedFile(file);
      toast.success(
        `External result file "${file.name}" selected successfully!`
      );
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "level",
      "class",
      "session",
      "examType",
      "examYear",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return false;
    }

    if (!selectedFile) {
      toast.error(
        "Please select an Excel file with external results to upload."
      );
      return false;
    }

    return true;
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate file upload with progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 8;
        });
      }, 250);

      // Simulate API call for external results processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setUploadProgress(100);

      // Simulate processing external results
      setTimeout(() => {
        toast.success(
          "External results uploaded successfully! Processing complete.",
          {
            description: `Uploaded ${selectedFile.name} for ${formData.examType} - ${formData.examYear}`,
            duration: 5000,
          }
        );

        // Reset form
        setFormData({
          level: "",
          class: "",
          session: "",
          examType: "",
          examYear: "",
        });
        setSelectedFile(null);
        setUploadProgress(0);

        // Reset file input
        document.getElementById("excelFile").value = "";
      }, 500);
    } catch (error) {
      toast.error("Upload failed! Please try again.", {
        description:
          error.message || "An error occurred during external results upload",
      });
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    toast.success("Downloading External Results Excel template...", {
      description: "Template will be downloaded to your Downloads folder",
    });
    // Simulate template download
    // In real implementation, this would trigger actual file download
  };
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Upload Student External Result with Excel
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Upload Student External Result with Excel</CardTitle>
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
                  <SelectItem value="class10a">Class 10A</SelectItem>
                  <SelectItem value="class10b">Class 10B</SelectItem>
                  <SelectItem value="class11a">Class 11A</SelectItem>
                  <SelectItem value="class12a">Class 12A</SelectItem>
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
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="examType">
                Select External Exam Type{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.examType}
                onValueChange={(value) => handleSelectChange("examType", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waec">WAEC SSCE</SelectItem>
                  <SelectItem value="neco">NECO SSCE</SelectItem>
                  <SelectItem value="jamb">JAMB UTME</SelectItem>
                  <SelectItem value="nabteb">NABTEB</SelectItem>
                  <SelectItem value="gce">GCE A/L</SelectItem>
                  <SelectItem value="cambridge">Cambridge IGCSE</SelectItem>
                  <SelectItem value="other">Other External Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="examYear">
                Select Exam Year <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.examYear}
                onValueChange={(value) => handleSelectChange("examYear", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select exam year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="excelFile">
                Select External Results File{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-2">
                <Input
                  id="excelFile"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Accepted formats: .csv, .xlsx, .xls (max 15MB)
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={downloadTemplate}
                    className="flex items-center gap-2 text-orange-600 hover:bg-orange-50 hover:text-orange-700 border-orange-300"
                  >
                    <Download className="h-3 w-3" />
                    Download Template
                  </Button>
                </div>
              </div>

              {selectedFile && (
                <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-md">
                  <ExternalLink className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-700 font-medium">
                    {selectedFile.name}
                  </span>
                  <span className="text-xs text-orange-600">
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              )}

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> External results include WAEC, NECO,
                  JAMB, and other standardized exam results. Ensure your Excel
                  file contains columns for: Student ID, Subject, Grade/Score,
                  and Exam Number.
                </p>
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing external results...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing External Results...
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4 mr-2" />
                Upload External Results
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadExternalResultExcel;
