import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Search,
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  Download,
  Eye,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  X,
  Filter,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

const ManageLessonPlan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  // Sample data for lesson plans with state management
  const [lessonPlans, setLessonPlans] = useState([
    {
      id: 1,
      title: "Introduction to Algebra",
      subject: "Mathematics",
      teacher: "Mr. Johnson",
      class: "JSS 3",
      term: "First Term",
      week: "Week 1",
      dateSubmitted: "2025-04-28",
      status: "approved",
      lastModified: "2025-05-01",
      viewCount: 45,
    },
    {
      id: 2,
      title: "Shakespeare's Macbeth",
      subject: "English Language",
      teacher: "Mrs. Smith",
      class: "SSS 2",
      term: "First Term",
      week: "Week 1",
      dateSubmitted: "2025-04-29",
      status: "pending",
      lastModified: "2025-04-29",
      viewCount: 12,
    },
    {
      id: 3,
      title: "Cell Structure and Function",
      subject: "Biology",
      teacher: "Dr. Williams",
      class: "SSS 1",
      term: "First Term",
      week: "Week 1",
      dateSubmitted: "2025-04-26",
      status: "needs-revision",
      lastModified: "2025-04-30",
      viewCount: 28,
    },
    {
      id: 4,
      title: "Introduction to Electric Circuits",
      subject: "Physics",
      teacher: "Prof. Brown",
      class: "SSS 3",
      term: "First Term",
      week: "Week 1",
      dateSubmitted: "2025-04-27",
      status: "approved",
      lastModified: "2025-04-28",
      viewCount: 62,
    },
    {
      id: 5,
      title: "Chemical Reactions and Equations",
      subject: "Chemistry",
      teacher: "Dr. Davis",
      class: "SSS 2",
      term: "First Term",
      week: "Week 1",
      dateSubmitted: "2025-04-30",
      status: "draft",
      lastModified: "2025-05-02",
      viewCount: 8,
    },
    {
      id: 6,
      title: "Photosynthesis Process",
      subject: "Biology",
      teacher: "Dr. Williams",
      class: "JSS 2",
      term: "First Term",
      week: "Week 2",
      dateSubmitted: "2025-05-01",
      status: "approved",
      lastModified: "2025-05-01",
      viewCount: 34,
    },
  ]);

  // Filter lesson plans based on search and filters
  const filteredLessonPlans = lessonPlans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.class.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || plan.status === statusFilter;
    const matchesSubject =
      subjectFilter === "all" || plan.subject === subjectFilter;
    const matchesClass = classFilter === "all" || plan.class === classFilter;

    return matchesSearch && matchesStatus && matchesSubject && matchesClass;
  });

  // Action handlers
  const handleView = (plan) => {
    toast.info(`Viewing Lesson Plan - ${plan.title}`, {
      description: `Opening detailed view for ${plan.subject} lesson by ${plan.teacher}`,
      icon: <Eye className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleEdit = (plan) => {
    toast.info(`Edit Lesson Plan - ${plan.title}`, {
      description: `Opening editor for ${plan.subject} lesson`,
      icon: <Edit className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleDelete = (plan) => {
    setLessonPlans((prev) => prev.filter((p) => p.id !== plan.id));
    toast.error(`Lesson Plan Deleted`, {
      description: `"${plan.title}" by ${plan.teacher} has been removed successfully.`,
      icon: <Trash className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleApprove = (plan) => {
    setLessonPlans((prev) =>
      prev.map((p) => (p.id === plan.id ? { ...p, status: "approved" } : p))
    );
    toast.success(`Lesson Plan Approved`, {
      description: `"${plan.title}" has been approved and is now available to students.`,
      icon: <CheckCircle className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleReject = (plan) => {
    setLessonPlans((prev) =>
      prev.map((p) =>
        p.id === plan.id ? { ...p, status: "needs-revision" } : p
      )
    );
    toast.error(`Lesson Plan Rejected`, {
      description: `"${plan.title}" requires revision before approval.`,
      icon: <XCircle className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleAddNew = () => {
    toast.success("Add New Lesson Plan", {
      description: "Redirecting to lesson plan creation form...",
      icon: <Plus className="h-4 w-4" />,
      duration: 3000,
    });
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "ID",
        "Title",
        "Subject",
        "Teacher",
        "Class",
        "Term",
        "Week",
        "Status",
        "Date Submitted",
        "View Count",
      ],
      ...filteredLessonPlans.map((plan) => [
        plan.id,
        plan.title,
        plan.subject,
        plan.teacher,
        plan.class,
        plan.term,
        plan.week,
        plan.status,
        plan.dateSubmitted,
        plan.viewCount,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lesson_plans.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredLessonPlans.length} lesson plans to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredLessonPlans
      .map(
        (plan) =>
          `${plan.id}. ${plan.title}\\nSubject: ${plan.subject} | Teacher: ${plan.teacher} | Class: ${plan.class}\\nTerm: ${plan.term} | Week: ${plan.week} | Status: ${plan.status}\\nSubmitted: ${plan.dateSubmitted} | Views: ${plan.viewCount}`
      )
      .join("\\n\\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lesson_plans.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Text Export Complete", {
      description: `Successfully exported ${filteredLessonPlans.length} lesson plans to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print Dialog Opened", {
      description: `Preparing to print ${filteredLessonPlans.length} lesson plans.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredLessonPlans
      .map(
        (plan) =>
          `${plan.id}\\t${plan.title}\\t${plan.subject}\\t${plan.teacher}\\t${plan.class}\\t${plan.status}\\t${plan.dateSubmitted}\\t${plan.viewCount}`
      )
      .join("\\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredLessonPlans.length} lesson plans data to clipboard.`,
          icon: <Copy className="h-4 w-4" />,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error("Copy Failed", {
          description: "Unable to copy data to clipboard. Please try again.",
          icon: <X className="h-4 w-4" />,
          duration: 3000,
        });
      });
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: {
        className: "bg-green-100 text-green-800 hover:bg-green-200",
        label: "Approved",
      },
      pending: {
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        label: "Pending Review",
      },
      "needs-revision": {
        className: "bg-red-100 text-red-800 hover:bg-red-200",
        label: "Needs Revision",
      },
      draft: {
        className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        label: "Draft",
      },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Lesson Plans
        </h2>
        <Button
          className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          onClick={handleAddNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Lesson Plan
        </Button>
      </div>

      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Lesson Plans Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search lesson plans..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="needs-revision">Needs Revision</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English Language">English</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="JSS 1">JSS 1</SelectItem>
                  <SelectItem value="JSS 2">JSS 2</SelectItem>
                  <SelectItem value="JSS 3">JSS 3</SelectItem>
                  <SelectItem value="SSS 1">SSS 1</SelectItem>
                  <SelectItem value="SSS 2">SSS 2</SelectItem>
                  <SelectItem value="SSS 3">SSS 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{filteredLessonPlans.length}</span>{" "}
              of <span className="font-medium">{lessonPlans.length}</span>{" "}
              lesson plans
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-green-50 hover:border-green-300"
                onClick={handleExportCSV}
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>CSV</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                onClick={handleExportText}
              >
                <FileText className="h-4 w-4" />
                <span>Text</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-gray-50 hover:border-gray-300"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Title</TableHead>
                  <TableHead className="bg-gray-100">Subject</TableHead>
                  <TableHead className="bg-gray-100">Teacher</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Week</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Submitted</TableHead>
                  <TableHead className="bg-gray-100">Views</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLessonPlans.map((plan) => (
                  <TableRow
                    key={plan.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell
                      className="font-medium max-w-xs truncate"
                      title={plan.title}
                    >
                      {plan.title}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">
                        {plan.subject}
                      </Badge>
                    </TableCell>
                    <TableCell>{plan.teacher}</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-100 text-purple-800">
                        {plan.class}
                      </Badge>
                    </TableCell>
                    <TableCell>{plan.week}</TableCell>
                    <TableCell>{getStatusBadge(plan.status)}</TableCell>
                    <TableCell>{formatDate(plan.dateSubmitted)}</TableCell>
                    <TableCell>
                      <Badge className="bg-gray-100 text-gray-800">
                        {plan.viewCount}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50"
                          onClick={() => handleView(plan)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50"
                          onClick={() => handleEdit(plan)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {plan.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:border-green-300 hover:bg-green-50"
                              onClick={() => handleApprove(plan)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50"
                              onClick={() => handleReject(plan)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50"
                          onClick={() => handleDelete(plan)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-eduos-primary">
                Approved:{" "}
                {lessonPlans.filter((p) => p.status === "approved").length}
              </span>
              <span className="mx-2">•</span>
              <span className="font-medium text-yellow-600">
                Pending:{" "}
                {lessonPlans.filter((p) => p.status === "pending").length}
              </span>
              <span className="mx-2">•</span>
              <span className="font-medium text-red-600">
                Needs Revision:{" "}
                {
                  lessonPlans.filter((p) => p.status === "needs-revision")
                    .length
                }
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageLessonPlan;
