import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
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
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Download,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Upload,
  Paperclip,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const Assignments = () => {
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);
  const [submissionText, setSubmissionText] = useState("");
  const [submissionFile, setSubmissionFile] = useState(null);

  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      childId: "1",
      childName: "Sarah Johnson",
      subject: "Mathematics",
      title: "Quadratic Equations Practice",
      description:
        "Solve the given quadratic equations using factorization and quadratic formula methods.",
      teacher: "Mr. Adebayo",
      assignedDate: "2024-11-05",
      dueDate: "2024-11-15",
      submittedDate: "2024-11-12",
      status: "submitted",
      grade: "A",
      score: 92,
      maxScore: 100,
      feedback: "Excellent work! Your solutions are clear and well-presented.",
      attachments: ["quadratic_problems.pdf"],
      submissionFile: "sarah_math_assignment.pdf",
    },
    {
      id: 2,
      childId: "1",
      childName: "Sarah Johnson",
      subject: "English Language",
      title: "Creative Writing - Short Story",
      description:
        'Write a 500-word short story with the theme "Friendship and Courage".',
      teacher: "Mrs. Oluwaseun",
      assignedDate: "2024-11-08",
      dueDate: "2024-11-20",
      submittedDate: null,
      status: "pending",
      grade: null,
      score: null,
      maxScore: 50,
      feedback: null,
      attachments: ["writing_guidelines.pdf", "sample_stories.pdf"],
      submissionFile: null,
    },
    {
      id: 3,
      childId: "1",
      childName: "Sarah Johnson",
      subject: "Physics",
      title: "Simple Machines Lab Report",
      description:
        "Complete the lab report on simple machines experiment conducted in class.",
      teacher: "Dr. Emeka",
      assignedDate: "2024-11-01",
      dueDate: "2024-11-10",
      submittedDate: null,
      status: "overdue",
      grade: null,
      score: null,
      maxScore: 30,
      feedback: null,
      attachments: ["lab_template.docx"],
      submissionFile: null,
    },
    {
      id: 4,
      childId: "2",
      childName: "Michael Johnson",
      subject: "Mathematics",
      title: "Multiplication Tables Practice",
      description:
        "Complete the multiplication table exercises for numbers 6-12.",
      teacher: "Mrs. Funmi",
      assignedDate: "2024-11-10",
      dueDate: "2024-11-17",
      submittedDate: null,
      status: "pending",
      grade: null,
      score: null,
      maxScore: 25,
      feedback: null,
      attachments: ["multiplication_worksheet.pdf"],
      submissionFile: null,
    },
    {
      id: 5,
      childId: "2",
      childName: "Michael Johnson",
      subject: "English Language",
      title: "Reading Comprehension",
      description: "Read the story and answer the comprehension questions.",
      teacher: "Mr. Segun",
      assignedDate: "2024-11-07",
      dueDate: "2024-11-14",
      submittedDate: "2024-11-13",
      status: "submitted",
      grade: "B+",
      score: 22,
      maxScore: 25,
      feedback: "Good understanding of the story. Work on vocabulary.",
      attachments: ["story.pdf", "questions.pdf"],
      submissionFile: "michael_comprehension.pdf",
    },
  ];

  const children = [
    { id: "1", name: "Sarah Johnson", class: "JSS 2A" },
    { id: "2", name: "Michael Johnson", class: "Primary 5B" },
  ];

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "English Language", label: "English Language" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "submitted", label: "Submitted" },
    { value: "graded", label: "Graded" },
    { value: "overdue", label: "Overdue" },
  ];

  // Filter assignments
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesChild =
      selectedChild === "all" || assignment.childId === selectedChild;
    const matchesSubject =
      selectedSubject === "all" || assignment.subject === selectedSubject;
    const matchesStatus =
      selectedStatus === "all" || assignment.status === selectedStatus;
    return matchesChild && matchesSubject && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "submitted":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Submitted
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "graded":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Graded
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate statistics
  const totalAssignments = filteredAssignments.length;
  const pendingAssignments = filteredAssignments.filter(
    (a) => a.status === "pending"
  ).length;
  const submittedAssignments = filteredAssignments.filter(
    (a) => a.status === "submitted"
  ).length;
  const overdueAssignments = filteredAssignments.filter(
    (a) => a.status === "overdue"
  ).length;

  // Handle download materials
  const handleDownloadMaterials = async (assignment) => {
    try {
      toast.success("Starting download...");
      
      // In a real application, this would download actual files
      // For demo purposes, we'll create dummy files
      assignment.attachments.forEach((filename, index) => {
        setTimeout(() => {
          const content = `Assignment Material: ${assignment.title}
Subject: ${assignment.subject}
Teacher: ${assignment.teacher}
Due Date: ${assignment.dueDate}

This is the content for ${filename}

Instructions:
${assignment.description}

Good luck with your assignment!`;

          const blob = new Blob([content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename.replace('.pdf', '.txt');
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, index * 500); // Stagger downloads
      });
      
      toast.success(`Downloaded ${assignment.attachments.length} file(s) successfully!`);
    } catch (error) {
      toast.error("Failed to download materials. Please try again.");
    }
  };

  // Handle assignment submission
  const handleSubmitAssignment = async () => {
    if (!submissionText.trim() && !submissionFile) {
      toast.error("Please add submission text or upload a file");
      return;
    }

    try {
      // Simulate submission process
      toast.success("Submitting assignment...");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the assignment status (in real app, this would be handled by the backend)
      const updatedAssignments = assignments.map(assignment => {
        if (assignment.id === selectedAssignment.id) {
          return {
            ...assignment,
            status: 'submitted',
            submittedDate: new Date().toISOString(),
            submissionFile: submissionFile ? submissionFile.name : `${selectedAssignment.childName}_submission.txt`
          };
        }
        return assignment;
      });
      
      toast.success("Assignment submitted successfully!");
      setIsSubmissionDialogOpen(false);
      setSubmissionText("");
      setSubmissionFile(null);
      setSelectedAssignment(null);
      
      // In a real app, you would refetch the assignments data here
      
    } catch (error) {
      toast.error("Failed to submit assignment. Please try again.");
    }
  };

  // Handle file selection for submission
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }
      setSubmissionFile(file);
      toast.success(`File "${file.name}" selected for upload`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-1">
            Track your children&apos;s assignments and homework
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Assignments
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssignments}</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingAssignments}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {submittedAssignments}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting grades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {overdueAssignments}
            </div>
            <p className="text-xs text-muted-foreground">Late submission</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Child</label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.id}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {child.name} - {child.class}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assignments ({filteredAssignments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssignments.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No assignments found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more assignments.
                </p>
              </div>
            ) : (
              filteredAssignments.map((assignment) => {
                const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                return (
                  <div
                    key={assignment.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {assignment.title}
                          </h3>
                          {getStatusBadge(assignment.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">
                              <User className="inline h-4 w-4 mr-1" />
                              {assignment.childName} - {assignment.subject}
                            </p>
                            <p className="text-sm text-gray-600">
                              <User className="inline h-4 w-4 mr-1" />
                              Teacher: {assignment.teacher}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">
                              <Calendar className="inline h-4 w-4 mr-1" />
                              Assigned:{" "}
                              {new Date(
                                assignment.assignedDate
                              ).toLocaleDateString()}
                            </p>
                            <p
                              className={`text-sm ${
                                assignment.status === "overdue"
                                  ? "text-red-600 font-medium"
                                  : daysUntilDue <= 2 &&
                                    assignment.status === "pending"
                                  ? "text-orange-600 font-medium"
                                  : "text-gray-600"
                              }`}
                            >
                              <Clock className="inline h-4 w-4 mr-1" />
                              Due:{" "}
                              {new Date(
                                assignment.dueDate
                              ).toLocaleDateString()}
                              {assignment.status === "pending" && (
                                <span className="ml-2">
                                  (
                                  {daysUntilDue > 0
                                    ? `${daysUntilDue} days left`
                                    : daysUntilDue === 0
                                    ? "Due today"
                                    : `${Math.abs(daysUntilDue)} days overdue`}
                                  )
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">
                          {assignment.description}
                        </p>

                        {/* Grading Info */}
                        {assignment.grade && (
                          <div className="bg-green-50 p-3 rounded-lg mb-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">
                                Grade: {assignment.grade}
                              </span>
                              <span className="font-bold text-green-600">
                                {assignment.score}/{assignment.maxScore} (
                                {Math.round(
                                  (assignment.score / assignment.maxScore) * 100
                                )}
                                %)
                              </span>
                            </div>
                            {assignment.feedback && (
                              <p className="text-sm text-gray-700 italic">
                                &quot;{assignment.feedback}&quot;
                              </p>
                            )}
                          </div>
                        )}

                        {/* Submission Info */}
                        {assignment.submittedDate && (
                          <div className="bg-blue-50 p-3 rounded-lg mb-3">
                            <p className="text-sm text-blue-800">
                              <CheckCircle className="inline h-4 w-4 mr-1" />
                              Submitted on{" "}
                              {new Date(
                                assignment.submittedDate
                              ).toLocaleDateString()}
                              {assignment.submissionFile && (
                                <span className="ml-2">
                                  - File: {assignment.submissionFile}
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 justify-between items-center border-t pt-3">
                      <div className="flex flex-wrap gap-2">
                        {assignment.attachments &&
                          assignment.attachments.length > 0 && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDownloadMaterials(assignment)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Materials (
                              {assignment.attachments.length})
                            </Button>
                          )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>

                      {assignment.status === "pending" && (
                        <Dialog open={isSubmissionDialogOpen && selectedAssignment?.id === assignment.id} onOpenChange={setIsSubmissionDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => setSelectedAssignment(assignment)}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Submit Assignment
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Submit Assignment</DialogTitle>
                              <DialogDescription>
                                Submit your work for &quot;{assignment.title}&quot; in {assignment.subject}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                              {/* Assignment Info */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Assignment Details</h4>
                                <div className="space-y-1 text-sm">
                                  <p><strong>Title:</strong> {assignment.title}</p>
                                  <p><strong>Subject:</strong> {assignment.subject}</p>
                                  <p><strong>Teacher:</strong> {assignment.teacher}</p>
                                  <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                </div>
                              </div>

                              {/* Submission Text */}
                              <div>
                                <Label htmlFor="submission-text">Submission Notes (Optional)</Label>
                                <Textarea
                                  id="submission-text"
                                  placeholder="Add any notes about your submission..."
                                  value={submissionText}
                                  onChange={(e) => setSubmissionText(e.target.value)}
                                  rows={4}
                                />
                              </div>

                              {/* File Upload */}
                              <div>
                                <Label htmlFor="submission-file">Upload Assignment File</Label>
                                <div className="mt-2">
                                  <Input
                                    id="submission-file"
                                    type="file"
                                    onChange={handleFileSelect}
                                    accept=".pdf,.doc,.docx,.txt,.jpg,.png,.zip"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, ZIP (Max 10MB)
                                  </p>
                                </div>
                                {submissionFile && (
                                  <div className="mt-2 p-2 bg-green-50 rounded flex items-center gap-2">
                                    <Paperclip className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-green-800">{submissionFile.name}</span>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => setSubmissionFile(null)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsSubmissionDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleSubmitAssignment}>
                                <Send className="h-4 w-4 mr-2" />
                                Submit Assignment
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assignments;
