import { useState } from "react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  FileText,
  Calendar,
  Clock,
  Search,
  Eye,
  Download,
  CheckCircle2,
  AlertCircle,
  Star,
  BookOpen,
  MessageSquare,
  Upload,
  Award,
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

// Sample submission data
const submissionsData = [
  {
    id: "s1",
    assignmentId: "1",
    assignmentTitle: "Algebraic Equations Worksheet",
    subject: "Mathematics",
    teacher: "Ms. Sarah Johnson",
    submissionDate: "2025-05-08",
    dueDate: "2025-05-10",
    status: "graded",
    marks: 18,
    maxMarks: 20,
    grade: "A",
    submissionText:
      "I have completed all the algebraic equations as requested. The solutions include step-by-step working for each problem, showing the application of various algebraic principles and methods.",
    files: [
      { name: "algebra_solutions.pdf", size: "1.2 MB" },
      { name: "working_steps.docx", size: "856 KB" },
    ],
    feedback:
      "Excellent work! Your solutions are clear and well-explained. Minor calculation error in question 7, but overall understanding is very good.",
    teacherComments:
      "Keep up the good work. Focus on double-checking calculations.",
    submissionTime: "2025-05-08 14:30",
    isLate: false,
  },
  {
    id: "s2",
    assignmentId: "2",
    assignmentTitle: "Essay on Environmental Conservation",
    subject: "English",
    teacher: "Mr. David Wilson",
    submissionDate: "2025-05-08",
    dueDate: "2025-05-15",
    status: "graded",
    marks: 45,
    maxMarks: 50,
    grade: "A-",
    submissionText:
      "Environmental conservation has become one of the most pressing issues of our time. This essay explores the importance of sustainable practices...",
    files: [{ name: "environmental_essay.docx", size: "2.1 MB" }],
    feedback:
      "Well-structured essay with good arguments. Could benefit from more recent statistics and examples.",
    teacherComments:
      "Good research and writing. Consider adding more contemporary examples in future essays.",
    submissionTime: "2025-05-08 16:45",
    isLate: false,
  },
  {
    id: "s3",
    assignmentId: "4",
    assignmentTitle: "Historical Events Timeline Project",
    subject: "History",
    teacher: "Mr. Robert Martinez",
    submissionDate: "2025-05-19",
    dueDate: "2025-05-20",
    status: "submitted",
    submissionText:
      "I have created a comprehensive timeline covering major events from 1900-2000, including detailed descriptions and historical context for each event.",
    files: [
      { name: "timeline_project.pptx", size: "5.2 MB" },
      { name: "research_notes.pdf", size: "1.8 MB" },
    ],
    submissionTime: "2025-05-19 10:15",
    isLate: false,
  },
  {
    id: "s4",
    assignmentId: "5",
    assignmentTitle: "Chemistry Lab Report",
    subject: "Chemistry",
    teacher: "Dr. Lisa Thompson",
    submissionDate: "2025-05-13",
    dueDate: "2025-05-12",
    status: "graded",
    marks: 35,
    maxMarks: 40,
    grade: "B+",
    submissionText:
      "This lab report details the acid-base neutralization experiment conducted in class, including observations, calculations, and conclusions.",
    files: [
      { name: "chemistry_lab_report.pdf", size: "3.1 MB" },
      { name: "data_analysis.xlsx", size: "654 KB" },
    ],
    feedback:
      "Good experimental work and analysis. Late submission resulted in point deduction. Ensure timely submission in future.",
    teacherComments: "Well-documented experiment. Work on time management.",
    submissionTime: "2025-05-13 09:20",
    isLate: true,
  },
];

const MySubmissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Filter submissions based on search and filters
  const filteredSubmissions = submissionsData.filter((submission) => {
    const matchesSearch =
      submission.assignmentTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;
    const matchesSubject =
      subjectFilter === "all" || submission.subject === subjectFilter;

    return matchesSearch && matchesStatus && matchesSubject;
  });

  // Get unique subjects for filter dropdown
  const subjects = [...new Set(submissionsData.map((s) => s.subject))];

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-blue-500";
      case "graded":
        return "bg-green-500";
      case "returned":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getGradeColor = (grade) => {
    if (!grade) return "text-gray-500";
    if (grade.startsWith("A")) return "text-green-600";
    if (grade.startsWith("B")) return "text-blue-600";
    if (grade.startsWith("C")) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGradeStats = () => {
    const graded = submissionsData.filter((s) => s.status === "graded");
    const totalMarks = graded.reduce((sum, s) => sum + s.marks, 0);
    const totalMaxMarks = graded.reduce((sum, s) => sum + s.maxMarks, 0);
    const averagePercentage =
      totalMaxMarks > 0 ? ((totalMarks / totalMaxMarks) * 100).toFixed(1) : 0;

    return {
      totalSubmissions: submissionsData.length,
      gradedSubmissions: graded.length,
      pendingGrading: submissionsData.filter((s) => s.status === "submitted")
        .length,
      averagePercentage,
    };
  };

  const stats = getGradeStats();

  const handleDownloadFile = (file) => {
    toast.success(`Downloading ${file.name}`);
    // In a real app, this would trigger actual file download
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">My Submissions</h1>
        <p className="text-gray-600 mt-2">
          Track your assignment submissions and grades
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Submissions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalSubmissions}
                </p>
              </div>
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Graded</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.gradedSubmissions}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Grading
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pendingGrading}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Grade
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.averagePercentage}%
                </p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="graded">Graded</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
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

      {/* Submissions List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredSubmissions.map((submission) => (
          <motion.div key={submission.id} variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight mb-2">
                      {submission.assignmentTitle}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <BookOpen size={16} />
                      <span>{submission.subject}</span>
                      <span>•</span>
                      <span>{submission.teacher}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                    {submission.isLate && (
                      <Badge
                        variant="outline"
                        className="text-red-600 border-red-200"
                      >
                        Late
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <div>
                      <p className="font-medium">Submitted</p>
                      <p>{formatDate(submission.submissionDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <div>
                      <p className="font-medium">Due Date</p>
                      <p>{formatDate(submission.dueDate)}</p>
                    </div>
                  </div>
                </div>

                {submission.status === "graded" && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-green-900">
                        Grade Received
                      </span>
                      <div className="flex items-center gap-2">
                        <Star className="text-yellow-500" size={16} />
                        <span
                          className={`font-bold text-lg ${getGradeColor(
                            submission.grade
                          )}`}
                        >
                          {submission.grade}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-green-800">
                      <span className="font-medium">
                        {submission.marks}/{submission.maxMarks}
                      </span>
                      <span className="ml-2">
                        (
                        {(
                          (submission.marks / submission.maxMarks) *
                          100
                        ).toFixed(1)}
                        %)
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">
                    {submission.files.length} file(s) submitted
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <Eye size={16} className="mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{submission.assignmentTitle}</DialogTitle>
                        <DialogDescription>
                          {submission.subject} • Submitted on{" "}
                          {formatDate(submission.submissionDate)}
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="submission" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="submission">
                            Submission
                          </TabsTrigger>
                          <TabsTrigger value="files">Files</TabsTrigger>
                          <TabsTrigger
                            value="feedback"
                            disabled={submission.status !== "graded"}
                          >
                            Feedback
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="submission" className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">
                              Submission Details
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div>
                                <span className="font-medium">Submitted:</span>
                                <p>
                                  {formatDateTime(submission.submissionTime)}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium">Status:</span>
                                <p className="capitalize">
                                  {submission.status}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">
                              Submission Text
                            </h4>
                            <div className="p-4 bg-gray-50 rounded-lg border">
                              <p className="text-gray-700 whitespace-pre-wrap">
                                {submission.submissionText}
                              </p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="files" className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">
                              Submitted Files
                            </h4>
                            <div className="space-y-2">
                              {submission.files.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded border"
                                >
                                  <div className="flex items-center gap-2">
                                    <FileText
                                      size={20}
                                      className="text-gray-500"
                                    />
                                    <div>
                                      <p className="font-medium">{file.name}</p>
                                      <p className="text-sm text-gray-500">
                                        {file.size}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDownloadFile(file)}
                                  >
                                    <Download size={16} />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="feedback" className="space-y-4">
                          {submission.status === "graded" && (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                  <h4 className="font-semibold text-green-900 mb-2">
                                    Grade
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-2xl font-bold ${getGradeColor(
                                        submission.grade
                                      )}`}
                                    >
                                      {submission.grade}
                                    </span>
                                    <span className="text-green-800">
                                      ({submission.marks}/{submission.maxMarks})
                                    </span>
                                  </div>
                                </div>

                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                  <h4 className="font-semibold text-blue-900 mb-2">
                                    Percentage
                                  </h4>
                                  <span className="text-2xl font-bold text-blue-700">
                                    {(
                                      (submission.marks / submission.maxMarks) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </span>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <MessageSquare size={16} />
                                  Teacher Feedback
                                </h4>
                                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                  <p className="text-gray-700 mb-3">
                                    {submission.feedback}
                                  </p>
                                  {submission.teacherComments && (
                                    <div className="border-t border-yellow-300 pt-3">
                                      <p className="text-sm text-gray-600 font-medium mb-1">
                                        Additional Comments:
                                      </p>
                                      <p className="text-gray-700">
                                        {submission.teacherComments}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredSubmissions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No submissions found
          </h3>
          <p className="text-gray-500 mt-1">
            {searchTerm || statusFilter !== "all" || subjectFilter !== "all"
              ? "Try adjusting your search or filters"
              : "You haven't submitted any assignments yet"}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MySubmissions;
