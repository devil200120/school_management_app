import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  FileText,
  Upload,
  X,
  AlertCircle,
  Calendar,
  Clock,
  BookOpen,
  Send,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

// Sample assignments available for submission
const availableAssignments = [
  {
    id: "1",
    title: "Algebraic Equations Worksheet",
    subject: "Mathematics",
    teacher: "Ms. Sarah Johnson",
    dueDate: "2025-05-10",
    maxMarks: 20,
    description:
      "Complete the worksheet on solving algebraic equations. Show all working steps.",
    status: "pending",
  },
  {
    id: "4",
    title: "Historical Events Timeline Project",
    subject: "History",
    teacher: "Mr. Robert Martinez",
    dueDate: "2025-05-20",
    maxMarks: 25,
    description:
      "Create a comprehensive timeline of major historical events from 1900 to 2000.",
    status: "in-progress",
  },
  {
    id: "5",
    title: "Chemistry Lab Report",
    subject: "Chemistry",
    teacher: "Dr. Lisa Thompson",
    dueDate: "2025-05-12",
    maxMarks: 40,
    description:
      "Write a detailed lab report on the acid-base neutralization experiment.",
    status: "pending",
  },
];

const SubmitAssignment = () => {
  const navigate = useNavigate();
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [submissionText, setSubmissionText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assignment = availableAssignments.find(
    (a) => a.id === selectedAssignment
  );

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      type: file.type,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    toast.info("File removed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAssignment) {
      toast.error("Please select an assignment");
      return;
    }

    if (!submissionText.trim() && uploadedFiles.length === 0) {
      toast.error("Please provide either text submission or upload files");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Assignment submitted successfully!");

      // Reset form
      setSelectedAssignment("");
      setSubmissionText("");
      setUploadedFiles([]);

      // Navigate to submissions page
      navigate("/student/assignment/my-submissions");
    } catch {
      toast.error("Failed to submit assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/student/assignment/view-assignments")}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Submit Assignment
          </h1>
          <p className="text-gray-600 mt-1">
            Submit your completed assignment work
          </p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Assignment Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} />
                Select Assignment
              </CardTitle>
              <CardDescription>
                Choose the assignment you want to submit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="assignment">Assignment</Label>
                  <Select
                    value={selectedAssignment}
                    onValueChange={setSelectedAssignment}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select an assignment to submit" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAssignments.map((assignment) => (
                        <SelectItem key={assignment.id} value={assignment.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {assignment.title}
                            </span>
                            <span className="text-sm text-gray-500">
                              {assignment.subject} • Due:{" "}
                              {formatDate(assignment.dueDate)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {assignment && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            Subject
                          </p>
                          <p className="text-sm text-blue-700">
                            {assignment.subject}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            Due Date
                          </p>
                          <p className="text-sm text-blue-700">
                            {formatDate(assignment.dueDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            Days Left
                          </p>
                          <p
                            className={`text-sm font-medium ${
                              getDaysUntilDue(assignment.dueDate) <= 1
                                ? "text-red-600"
                                : getDaysUntilDue(assignment.dueDate) <= 3
                                ? "text-yellow-600"
                                : "text-blue-700"
                            }`}
                          >
                            {getDaysUntilDue(assignment.dueDate)} days
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Description
                      </p>
                      <p className="text-sm text-blue-700">
                        {assignment.description}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm font-medium text-blue-900">
                        Max Marks:
                      </span>
                      <span className="text-sm text-blue-700 font-medium">
                        {assignment.maxMarks}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Text Submission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={20} />
                Text Submission
              </CardTitle>
              <CardDescription>
                Type your assignment submission here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="submission">Assignment Response</Label>
                <Textarea
                  id="submission"
                  placeholder="Enter your assignment response here..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  className="mt-2 min-h-[200px] resize-vertical"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Character count: {submissionText.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* File Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload size={20} />
                File Upload
              </CardTitle>
              <CardDescription>
                Upload documents, images, or other files related to your
                assignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Upload files
                    </p>
                    <p className="text-sm text-gray-500">
                      Click to browse or drag and drop files here
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, GIF (Max
                      10MB each)
                    </p>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">
                      Uploaded Files
                    </h4>
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {file.name}
                            </p>
                            <p className="text-sm text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-between"
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/student/assignment/view-assignments")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !selectedAssignment ||
              (!submissionText.trim() && uploadedFiles.length === 0)
            }
            className="bg-eduos-primary hover:bg-eduos-primary/90"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Submit Assignment
              </>
            )}
          </Button>
        </motion.div>
      </form>

      {/* Warning for overdue assignments */}
      {assignment && getDaysUntilDue(assignment.dueDate) <= 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle className="text-red-600" size={20} />
          <div>
            <p className="font-medium text-red-900">Assignment Overdue</p>
            <p className="text-sm text-red-700">
              This assignment was due on {formatDate(assignment.dueDate)}. Late
              submissions may receive reduced marks.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SubmitAssignment;
