import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
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
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  FileText,
  Calendar,
  Clock,
  Search,
  Filter,
  BookOpen,
  Download,
  Eye,
  Upload,
  CheckCircle2,
  AlertCircle,
  Star,
} from "lucide-react";
import { toast } from "sonner";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Sample assignment data that would come from API
const assignmentsData = [
  {
    id: "1",
    title: "Algebraic Equations Worksheet",
    description:
      "Complete the worksheet on solving algebraic equations. Show all working steps and provide explanations for each solution method used.",
    subject: "Mathematics",
    teacher: "Ms. Sarah Johnson",
    dueDate: "2025-05-10",
    maxMarks: 20,
    status: "pending",
    priority: "high",
    attachments: [
      { name: "algebra_worksheet.pdf", size: "2.3 MB" },
      { name: "reference_guide.pdf", size: "1.1 MB" },
    ],
    assignedDate: "2025-05-01",
    estimatedTime: "2 hours",
  },
  {
    id: "2",
    title: "Essay on Environmental Conservation",
    description:
      "Write a 500-word essay on the importance of environmental conservation and sustainable practices in modern society.",
    subject: "English",
    teacher: "Mr. David Wilson",
    dueDate: "2025-05-15",
    maxMarks: 50,
    status: "submitted",
    priority: "medium",
    attachments: [{ name: "essay_guidelines.pdf", size: "856 KB" }],
    assignedDate: "2025-05-02",
    estimatedTime: "3 hours",
    submissionDate: "2025-05-08",
  },
  {
    id: "3",
    title: "Human Anatomy Quiz Preparation",
    description:
      "Study materials and practice questions for the upcoming quiz on human anatomy systems. Focus on cardiovascular and nervous systems.",
    subject: "Biology",
    teacher: "Dr. Emily Chen",
    dueDate: "2025-05-08",
    maxMarks: 30,
    status: "overdue",
    priority: "high",
    attachments: [
      { name: "anatomy_notes.pdf", size: "4.2 MB" },
      { name: "practice_questions.pdf", size: "1.8 MB" },
    ],
    assignedDate: "2025-04-28",
    estimatedTime: "4 hours",
  },
  {
    id: "4",
    title: "Historical Events Timeline Project",
    description:
      "Create a comprehensive timeline of major historical events from 1900 to 2000. Include at least 15 significant events with descriptions.",
    subject: "History",
    teacher: "Mr. Robert Martinez",
    dueDate: "2025-05-20",
    maxMarks: 25,
    status: "in-progress",
    priority: "medium",
    attachments: [
      { name: "timeline_template.docx", size: "245 KB" },
      { name: "research_sources.pdf", size: "3.1 MB" },
    ],
    assignedDate: "2025-05-03",
    estimatedTime: "5 hours",
  },
  {
    id: "5",
    title: "Chemistry Lab Report",
    description:
      "Write a detailed lab report on the chemical reactions observed in the acid-base neutralization experiment conducted in class.",
    subject: "Chemistry",
    teacher: "Dr. Lisa Thompson",
    dueDate: "2025-05-12",
    maxMarks: 40,
    status: "pending",
    priority: "high",
    attachments: [
      { name: "lab_report_format.pdf", size: "1.5 MB" },
      { name: "experimental_data.xlsx", size: "678 KB" },
    ],
    assignedDate: "2025-05-04",
    estimatedTime: "3 hours",
  },
];

const ViewAssignments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Filter assignments based on search and filters
  const filteredAssignments = assignmentsData.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || assignment.status === statusFilter;
    const matchesSubject =
      subjectFilter === "all" || assignment.subject === subjectFilter;

    return matchesSearch && matchesStatus && matchesSubject;
  });

  // Get unique subjects for filter dropdown
  const subjects = [...new Set(assignmentsData.map((a) => a.subject))];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "submitted":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "overdue":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownloadAttachment = (attachment) => {
    toast.success(`Downloading ${attachment.name}`);
    // In a real app, this would trigger actual file download
  };

  const [submissionDialog, setSubmissionDialog] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState("");
  const [submissionFile, setSubmissionFile] = useState(null);

  const handleStartAssignment = (assignment) => {
    setCurrentAssignment(assignment);
    setSubmissionDialog(true);
    setSubmissionText("");
    setSubmissionFile(null);
  };

  const handleSubmitAssignment = () => {
    if (!submissionText.trim() && !submissionFile) {
      toast.error("Please provide either text submission or upload a file");
      return;
    }

    // Simulate assignment submission
    const updatedAssignments = assignmentsData.map((assignment) =>
      assignment.id === currentAssignment.id
        ? {
            ...assignment,
            status: "submitted",
            submissionDate: new Date().toISOString().split("T")[0],
          }
        : assignment
    );

    toast.success(
      `Assignment "${currentAssignment.title}" submitted successfully!`
    );
    setSubmissionDialog(false);
    setCurrentAssignment(null);
    setSubmissionText("");
    setSubmissionFile(null);

    // In a real app, you would update the state or refetch data here
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSubmissionFile(file);
      toast.info(`File "${file.name}" selected for upload`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
        <p className="text-gray-600 mt-2">
          View and manage your assignments from all subjects
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none"
            size={20}
          />
          <Input
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 pr-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>

        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Assignment Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAssignments.map((assignment) => (
          <motion.div key={assignment.id} variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight mb-2">
                      {assignment.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <BookOpen size={16} />
                      <span>{assignment.subject}</span>
                      <span>•</span>
                      <span>{assignment.teacher}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status.replace("-", " ")}
                    </Badge>
                    <div
                      className={`flex items-center gap-1 ${getPriorityColor(
                        assignment.priority
                      )}`}
                    >
                      <Star size={14} />
                      <span className="text-xs font-medium">
                        {assignment.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {assignment.description.length > 120
                    ? `${assignment.description.substring(0, 120)}...`
                    : assignment.description}
                </CardDescription>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <div>
                      <p className="font-medium">Due Date</p>
                      <p>{formatDate(assignment.dueDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <div>
                      <p className="font-medium">Est. Time</p>
                      <p>{assignment.estimatedTime}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-gray-700">
                    Max Marks: {assignment.maxMarks}
                  </span>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedAssignment(assignment)}
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{assignment.title}</DialogTitle>
                          <DialogDescription>
                            {assignment.subject} • {assignment.teacher}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-gray-700">
                              {assignment.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-1">
                                Assigned Date
                              </h4>
                              <p className="text-gray-700">
                                {formatDate(assignment.assignedDate)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Due Date</h4>
                              <p className="text-gray-700">
                                {formatDate(assignment.dueDate)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">
                                Maximum Marks
                              </h4>
                              <p className="text-gray-700">
                                {assignment.maxMarks}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">
                                Estimated Time
                              </h4>
                              <p className="text-gray-700">
                                {assignment.estimatedTime}
                              </p>
                            </div>
                          </div>

                          {assignment.attachments &&
                            assignment.attachments.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Attachments
                                </h4>
                                <div className="space-y-2">
                                  {assignment.attachments.map(
                                    (attachment, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                      >
                                        <div className="flex items-center gap-2">
                                          <FileText size={16} />
                                          <span className="text-sm">
                                            {attachment.name}
                                          </span>
                                          <span className="text-xs text-gray-500">
                                            ({attachment.size})
                                          </span>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            handleDownloadAttachment(attachment)
                                          }
                                        >
                                          <Download size={16} />
                                        </Button>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>

                        <DialogFooter>
                          <Button
                            onClick={() => handleStartAssignment(assignment)}
                            disabled={assignment.status === "submitted"}
                          >
                            {assignment.status === "submitted" ? (
                              <>
                                <CheckCircle2 size={16} className="mr-2" />
                                Submitted
                              </>
                            ) : (
                              <>
                                <Upload size={16} className="mr-2" />
                                Start Assignment
                              </>
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {assignment.status !== "submitted" && (
                      <Button
                        size="sm"
                        onClick={() => handleStartAssignment(assignment)}
                        className="bg-eduos-primary hover:bg-eduos-primary/90"
                      >
                        <Upload size={16} className="mr-1" />
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredAssignments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No assignments found
          </h3>
          <p className="text-gray-500 mt-1">
            {searchTerm || statusFilter !== "all" || subjectFilter !== "all"
              ? "Try adjusting your search or filters"
              : "You don't have any assignments at the moment"}
          </p>
        </motion.div>
      )}

      {/* Assignment Submission Dialog */}
      <Dialog open={submissionDialog} onOpenChange={setSubmissionDialog}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-lg">Submit Assignment</DialogTitle>
            <DialogDescription className="text-sm">
              {currentAssignment?.title} • {currentAssignment?.subject}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-1">
                Assignment Description
              </h4>
              <p className="text-xs text-gray-600 p-2 bg-gray-50 rounded text-justify leading-relaxed">
                {currentAssignment?.description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Text Submission
              </label>
              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Enter your assignment submission here..."
                className="w-full h-20 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                File Upload (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                <Upload className="mx-auto h-5 w-5 text-gray-400 mb-1" />
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">
                    Choose a file to upload
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                  >
                    Select File
                  </Button>
                  {submissionFile && (
                    <p className="text-xs text-green-600 mt-1">
                      Selected: {submissionFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-2 rounded-lg">
              <div className="flex items-center gap-1 text-blue-800">
                <AlertCircle size={14} />
                <span className="text-xs font-medium">Guidelines</span>
              </div>
              <ul className="text-xs text-blue-700 mt-1 space-y-0.5">
                <li>• Ensure submission is complete</li>
                <li>• Formats: PDF, DOC, DOCX, TXT, JPG, PNG</li>
                <li>• Max file size: 10MB</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSubmissionDialog(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmitAssignment}
              className="bg-eduos-primary hover:bg-eduos-primary/90"
            >
              <CheckCircle2 size={14} className="mr-1" />
              Submit Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewAssignments;
