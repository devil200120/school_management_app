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
import { Textarea } from "../../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { toast } from "sonner";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Calendar,
  Eye,
  Download,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const UploadStudentExternalResult = () => {
  // State management
  const [formData, setFormData] = useState({
    studentId: "",
    examType: "",
    examYear: "",
    resultDetails: "",
    resultFile: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingResult, setViewingResult] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [uploadedResults, setUploadedResults] = useState([
    {
      id: 1,
      studentName: "Adebayo Johnson",
      examType: "WAEC",
      examYear: "2023",
      uploadDate: "2024-10-15",
      status: "Approved",
      resultDetails: "English: A1, Mathematics: B2, Physics: B3, Chemistry: C4",
    },
    {
      id: 2,
      studentName: "Fatima Ibrahim",
      examType: "JAMB",
      examYear: "2023",
      uploadDate: "2024-10-10",
      status: "Pending",
      resultDetails:
        "UTME Score: 285/400 - English: 75, Mathematics: 70, Physics: 68, Chemistry: 72",
    },
  ]);

  // Sample students data
  const students = [
    { id: "student1", name: "Adebayo Johnson", regNumber: "EDU/2023/001" },
    { id: "student2", name: "Fatima Ibrahim", regNumber: "EDU/2023/002" },
    { id: "student3", name: "Chinedu Okafor", regNumber: "EDU/2023/003" },
    { id: "student4", name: "Aisha Mohammed", regNumber: "EDU/2023/004" },
    { id: "student5", name: "Emeka Nwankwo", regNumber: "EDU/2023/005" },
    { id: "student6", name: "Grace Adeyemi", regNumber: "EDU/2023/006" },
  ];

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      // Set both formData.resultFile and selectedFile for consistency
      setFormData((prev) => ({
        ...prev,
        resultFile: file,
      }));
      setSelectedFile(file);

      toast.success("File Selected", {
        description: `Selected: ${file.name} (${(
          file.size /
          1024 /
          1024
        ).toFixed(2)} MB)`,
        icon: <FileText className="h-4 w-4" />,
        duration: 3000,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.studentId) {
      toast.error("Validation Error", {
        description: "Please select a student.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
      return false;
    }

    if (!formData.examType) {
      toast.error("Validation Error", {
        description: "Please select an exam type.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
      return false;
    }

    if (!formData.examYear) {
      toast.error("Validation Error", {
        description: "Please select an exam year.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
      return false;
    }

    if (!formData.resultDetails.trim()) {
      toast.error("Validation Error", {
        description: "Please enter result details.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
      return false;
    }

    return true;
  };

  // Handle upload
  const handleUpload = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate file upload and API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get student name
      const selectedStudent = students.find((s) => s.id === formData.studentId);

      // Add to uploaded results
      const newResult = {
        id: Date.now(),
        studentName: selectedStudent?.name || "Unknown Student",
        examType: formData.examType,
        examYear: formData.examYear,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "Pending",
        resultDetails: formData.resultDetails,
        fileName: formData.resultFile?.name || null,
      };

      setUploadedResults((prev) => [newResult, ...prev]);

      toast.success("Upload Successful!", {
        description: `External result uploaded for ${selectedStudent?.name} - ${formData.examType} ${formData.examYear}`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 4000,
      });

      // Reset form
      setFormData({
        studentId: "",
        examType: "",
        examYear: "",
        resultDetails: "",
        resultFile: null,
      });

      // Reset file input
      const fileInput = document.getElementById("resultFile");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast.error("Upload Failed", {
        description: "Failed to upload external result. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete result
  const handleDeleteResult = (id) => {
    setUploadedResults((prev) => prev.filter((result) => result.id !== id));
    toast.success("Result Deleted", {
      description: "External result has been removed.",
      duration: 3000,
    });
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (validateFile(file)) {
        // Set both formData.resultFile and selectedFile for consistency
        setSelectedFile(file);
        setFormData((prev) => ({
          ...prev,
          resultFile: file,
        }));

        toast.success("File Selected", {
          description: `Selected: ${file.name} (${(
            file.size /
            1024 /
            1024
          ).toFixed(2)} MB)`,
          icon: <FileText className="h-4 w-4" />,
          duration: 3000,
        });
      }
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form first
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    // Check for file (use both selectedFile and formData.resultFile for compatibility)
    const fileToUpload = selectedFile || formData.resultFile;
    if (!fileToUpload) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get student name from the students array
      const selectedStudent = students.find((s) => s.id === formData.studentId);

      const newResult = {
        id: Date.now(),
        studentId: formData.studentId,
        studentName: selectedStudent?.name || "Unknown Student",
        examType: formData.examType,
        examYear: formData.examYear,
        resultDetails: formData.resultDetails,
        fileName: fileToUpload.name,
        fileSize: (fileToUpload.size / 1024 / 1024).toFixed(2) + " MB",
        uploadDate: new Date().toLocaleDateString(),
      };

      setUploadedResults((prev) => [...prev, newResult]);

      // Reset both file states
      setSelectedFile(null);
      setFormData({
        studentId: "",
        examType: "",
        examYear: "",
        resultDetails: "",
        resultFile: null,
      });

      toast.success("Result Uploaded Successfully!", {
        description: `External result for ${selectedStudent?.name} has been uploaded.`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } catch (error) {
      toast.error("Upload Failed", {
        description: "Failed to upload result. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // File validation
  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Please upload PDF, JPEG, PNG, or JPG files only."
      );
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size too large. Maximum allowed size is 10MB.");
      return false;
    }

    return true;
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Upload Student External Result
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>External Result Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">
                  Select Student <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.studentId}
                  onValueChange={(value) =>
                    handleSelectChange("studentId", value)
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {student.name} ({student.regNumber})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examType">
                  Exam Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.examType}
                  onValueChange={(value) =>
                    handleSelectChange("examType", value)
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waec">
                      WAEC (West African Examinations Council)
                    </SelectItem>
                    <SelectItem value="jamb">
                      JAMB (Joint Admissions and Matriculation Board)
                    </SelectItem>
                    <SelectItem value="neco">
                      NECO (National Examinations Council)
                    </SelectItem>
                    <SelectItem value="gce">
                      GCE (General Certificate of Education)
                    </SelectItem>
                    <SelectItem value="nabteb">
                      NABTEB (National Business and Technical Examinations
                      Board)
                    </SelectItem>
                    <SelectItem value="sat">
                      SAT (Scholastic Assessment Test)
                    </SelectItem>
                    <SelectItem value="ielts">
                      IELTS (International English Language Testing System)
                    </SelectItem>
                    <SelectItem value="toefl">
                      TOEFL (Test of English as a Foreign Language)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examYear">
                  Exam Year <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.examYear}
                  onValueChange={(value) =>
                    handleSelectChange("examYear", value)
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                    <SelectValue placeholder="Select exam year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                    <SelectItem value="2018">2018</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resultDetails">
                  Result Details <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="resultDetails"
                  value={formData.resultDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, resultDetails: e.target.value })
                  }
                  placeholder="Enter detailed result information (grades, scores, subjects, remarks, etc.)"
                  className="min-h-[120px] transition-all duration-300 focus:border-eduos-primary focus:ring-2 focus:ring-eduos-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resultFile">
                  Upload Result File <span className="text-red-500">*</span>
                </Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-eduos-primary bg-eduos-primary/10"
                      : "border-gray-300 hover:border-eduos-primary"
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    id="resultFile"
                    onChange={handleFileChange}
                  />
                  <Label htmlFor="resultFile" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload
                        className={`h-12 w-12 mb-2 ${
                          dragActive ? "text-eduos-primary" : "text-gray-400"
                        }`}
                      />
                      {selectedFile || formData.resultFile ? (
                        <div className="text-center">
                          <span className="text-eduos-primary font-medium">
                            {(selectedFile || formData.resultFile).name}
                          </span>
                          <br />
                          <span className="text-gray-400 text-sm">
                            {(
                              (selectedFile || formData.resultFile).size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </span>
                        </div>
                      ) : (
                        <>
                          <span className="text-gray-600">
                            Click to upload or drag and drop
                          </span>
                          <span className="text-gray-400 text-sm">
                            PDF, JPG, PNG, DOC up to 10MB
                          </span>
                        </>
                      )}
                    </div>
                  </Label>
                </div>
                {selectedFile && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedFile(null);
                      setFormData((prev) => ({ ...prev, resultFile: null }));
                      // Clear the file input
                      const fileInput = document.getElementById("resultFile");
                      if (fileInput) fileInput.value = "";
                    }}
                    className="mt-2"
                  >
                    Remove File
                  </Button>
                )}
              </div>
            </div>

            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Result
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Uploaded Results Display */}
      {uploadedResults.length > 0 && (
        <Card className="mt-8 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Uploaded External Results ({uploadedResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold">
                      Student Name
                    </TableHead>
                    <TableHead className="font-semibold">Student ID</TableHead>
                    <TableHead className="font-semibold">Exam Type</TableHead>
                    <TableHead className="font-semibold">Exam Year</TableHead>
                    <TableHead className="font-semibold">File</TableHead>
                    <TableHead className="font-semibold">Upload Date</TableHead>
                    <TableHead className="font-semibold text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedResults.map((result, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {result.studentName}
                      </TableCell>
                      <TableCell>{result.studentId}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-eduos-primary/10 text-eduos-primary rounded-full text-xs font-medium">
                          {result.examType.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>{result.examYear}</TableCell>
                      <TableCell>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {result.fileName}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {new Date(result.uploadDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setViewingResult(result);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              const newResults = uploadedResults.filter(
                                (_, i) => i !== index
                              );
                              setUploadedResults(newResults);
                              toast.success("Result Deleted", {
                                description: `Removed result for ${result.studentName}`,
                                icon: <CheckCircle className="h-4 w-4" />,
                              });
                            }}
                          >
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Result Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-eduos-primary">
              <FileText className="mr-2 h-5 w-5" />
              Student External Result Details
            </DialogTitle>
          </DialogHeader>

          {viewingResult && (
            <div className="space-y-6">
              {/* Student Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Student Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Student Name
                      </Label>
                      <p className="text-eduos-primary font-medium">
                        {viewingResult.studentName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Student ID
                      </Label>
                      <p className="text-gray-800">{viewingResult.studentId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exam Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Exam Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Exam Type
                      </Label>
                      <p className="text-gray-800">{viewingResult.examType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Exam Year
                      </Label>
                      <p className="text-gray-800">{viewingResult.examYear}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Result Details
                    </Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {viewingResult.resultDetails}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* File Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Uploaded File
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        File Name
                      </Label>
                      <p className="text-gray-800">{viewingResult.fileName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        File Size
                      </Label>
                      <p className="text-gray-800">{viewingResult.fileSize}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Upload Date
                    </Label>
                    <p className="text-gray-800">{viewingResult.uploadDate}</p>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        // Simulate file download
                        toast.success("Download Started", {
                          description: `Downloading ${viewingResult.fileName}`,
                          icon: <Download className="h-4 w-4" />,
                        });
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download File
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        // Simulate file preview
                        toast.info("Preview", {
                          description:
                            "File preview would open in a new window",
                          icon: <Eye className="h-4 w-4" />,
                        });
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview File
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadStudentExternalResult;
