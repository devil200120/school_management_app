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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { useToast } from "../../../hooks/use-toast";
import {
  Search,
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  Edit,
  Trash2,
  Eye,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const ManageAssignment = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Mathematics Problem Set 1",
      subject: "Mathematics",
      class: "Class 10A",
      level: "Senior Secondary",
      dueDate: "2025-10-25",
      dueTime: "11:59 PM",
      maxMarks: 50,
      submittedCount: 28,
      totalStudents: 32,
      status: "active",
      createdDate: "2025-10-15",
    },
    {
      id: 2,
      title: "English Essay: Climate Change",
      subject: "English Language",
      class: "Class 11A",
      level: "Senior Secondary",
      dueDate: "2025-10-30",
      dueTime: "11:59 PM",
      maxMarks: 100,
      submittedCount: 15,
      totalStudents: 30,
      status: "active",
      createdDate: "2025-10-16",
    },
    {
      id: 3,
      title: "Physics Lab Report",
      subject: "Physics",
      class: "Class 12A",
      level: "Senior Secondary",
      dueDate: "2025-10-20",
      dueTime: "11:59 PM",
      maxMarks: 75,
      submittedCount: 25,
      totalStudents: 25,
      status: "closed",
      createdDate: "2025-10-10",
    },
    {
      id: 4,
      title: "History Research Project",
      subject: "History",
      class: "Class 10B",
      level: "Senior Secondary",
      dueDate: "2025-11-05",
      dueTime: "11:59 PM",
      maxMarks: 80,
      submittedCount: 5,
      totalStudents: 28,
      status: "draft",
      createdDate: "2025-10-16",
    },
  ]);

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "S/N",
        "Title",
        "Subject",
        "Class",
        "Due Date",
        "Max Marks",
        "Submissions",
        "Status",
      ],
      ...filteredAssignments.map((assignment, index) => [
        index + 1,
        assignment.title,
        assignment.subject,
        assignment.class,
        assignment.dueDate,
        assignment.maxMarks,
        `${assignment.submittedCount}/${assignment.totalStudents}`,
        assignment.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assignments.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Assignment data exported to CSV successfully!",
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredAssignments
      .map(
        (assignment, index) =>
          `${index + 1}. ${assignment.title} - ${assignment.subject} (${
            assignment.class
          }) - Due: ${assignment.dueDate} - Status: ${assignment.status}`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assignments.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Assignment data exported to text file successfully!",
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print",
      description: "Print dialog opened",
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredAssignments
      .map(
        (assignment, index) =>
          `${index + 1}\t${assignment.title}\t${assignment.subject}\t${
            assignment.class
          }\t${assignment.dueDate}\t${assignment.maxMarks}\t${
            assignment.submittedCount
          }/${assignment.totalStudents}\t${assignment.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast({
          title: "Copied!",
          description: "Assignment data copied to clipboard successfully!",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy data to clipboard",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  // Action functions
  const handleCreateNew = () => {
    // Navigate to create assignment page
    toast({
      title: "Navigation",
      description: "Redirecting to Create New Assignment page...",
      duration: 2000,
    });
    // window.location.href = '/admin/assignment/add';
  };

  const handleView = (assignment) => {
    setSelectedAssignment(assignment);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setEditFormData({ ...assignment });
    setIsEditDialogOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment.id === selectedAssignment.id
            ? { ...assignment, ...editFormData }
            : assignment
        )
      );

      setIsEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Assignment updated successfully!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update assignment. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (assignment) => {
    setSelectedAssignment(assignment);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setAssignments((prevAssignments) =>
      prevAssignments.filter(
        (assignment) => assignment.id !== selectedAssignment.id
      )
    );
    setIsDeleteDialogOpen(false);
    toast({
      title: "Deleted",
      description: "Assignment deleted successfully!",
      duration: 3000,
    });
  };

  const handleToggleStatus = (assignmentId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "closed" : "active";
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, status: newStatus }
          : assignment
      )
    );
    toast({
      title: "Status Updated",
      description: `Assignment ${
        newStatus === "active" ? "opened" : "closed"
      } successfully!`,
      duration: 3000,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Active
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Closed
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Draft
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            Unknown
          </Badge>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getSubmissionProgress = (submitted, total) => {
    const percentage = (submitted / total) * 100;
    return {
      percentage: Math.round(percentage),
      color:
        percentage >= 80
          ? "text-green-600"
          : percentage >= 50
          ? "text-yellow-600"
          : "text-red-600",
    };
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary">
          Manage Assignments
        </h2>
        <Button
          onClick={handleCreateNew}
          className="bg-eduos-primary hover:bg-eduos-secondary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Assignment
        </Button>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Assignment List</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search assignments..."
                className="pl-10 px-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">S/N</TableHead>
                  <TableHead className="bg-gray-100">Title</TableHead>
                  <TableHead className="bg-gray-100">Subject</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Due Date</TableHead>
                  <TableHead className="bg-gray-100">Max Marks</TableHead>
                  <TableHead className="bg-gray-100">Submissions</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment, index) => {
                  const progress = getSubmissionProgress(
                    assignment.submittedCount,
                    assignment.totalStudents
                  );
                  return (
                    <TableRow
                      key={assignment.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={assignment.title}>
                          {assignment.title}
                        </div>
                      </TableCell>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell>{assignment.class}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {formatDate(assignment.dueDate)}
                        </div>
                        {assignment.dueTime && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {assignment.dueTime}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {assignment.maxMarks}
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${progress.color}`}>
                          {assignment.submittedCount}/{assignment.totalStudents}
                        </div>
                        <div className="text-xs text-gray-500">
                          {progress.percentage}% submitted
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-blue-50 text-blue-600 border-blue-200"
                            onClick={() => handleView(assignment)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-yellow-50 text-yellow-600 border-yellow-200"
                            onClick={() => handleEdit(assignment)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          {assignment.status !== "draft" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className={
                                assignment.status === "active"
                                  ? "hover:bg-red-50 text-red-600 border-red-200"
                                  : "hover:bg-green-50 text-green-600 border-green-200"
                              }
                              onClick={() =>
                                handleToggleStatus(
                                  assignment.id,
                                  assignment.status
                                )
                              }
                            >
                              {assignment.status === "active" ? (
                                <>
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Close
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Open
                                </>
                              )}
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-red-50 text-red-600 border-red-200"
                            onClick={() => handleDeleteClick(assignment)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Assignment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-eduos-primary">
              <Eye className="w-5 h-5" />
              Assignment Details
            </DialogTitle>
            <DialogDescription>
              View complete assignment information and submission statistics.
            </DialogDescription>
          </DialogHeader>
          {selectedAssignment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Title
                  </Label>
                  <p className="text-sm bg-gray-50 p-2 rounded">
                    {selectedAssignment.title}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Subject
                  </Label>
                  <p className="text-sm bg-gray-50 p-2 rounded">
                    {selectedAssignment.subject}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Class
                  </Label>
                  <p className="text-sm bg-gray-50 p-2 rounded">
                    {selectedAssignment.class}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Level
                  </Label>
                  <p className="text-sm bg-gray-50 p-2 rounded">
                    {selectedAssignment.level}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Due Date
                  </Label>
                  <p className="text-sm bg-gray-50 p-2 rounded">
                    {formatDate(selectedAssignment.dueDate)} at{" "}
                    {selectedAssignment.dueTime}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Maximum Marks
                  </Label>
                  <p className="text-sm bg-gray-50 p-2 rounded">
                    {selectedAssignment.maxMarks}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Submission Progress
                </Label>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">
                      Submitted: {selectedAssignment.submittedCount}/
                      {selectedAssignment.totalStudents}
                    </span>
                    <span className="text-sm font-medium">
                      {Math.round(
                        (selectedAssignment.submittedCount /
                          selectedAssignment.totalStudents) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-eduos-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (selectedAssignment.submittedCount /
                            selectedAssignment.totalStudents) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <div>{getStatusBadge(selectedAssignment.status)}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false);
                handleEdit(selectedAssignment);
              }}
              className="bg-eduos-primary hover:bg-eduos-secondary"
            >
              Edit Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Assignment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-eduos-primary">
              <Edit className="w-5 h-5" />
              Edit Assignment
            </DialogTitle>
            <DialogDescription>
              Update assignment information and settings.
            </DialogDescription>
          </DialogHeader>
          {selectedAssignment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editFormData.title || ""}
                    onChange={handleEditInputChange}
                    placeholder="Enter assignment title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={editFormData.subject || ""}
                    onChange={handleEditInputChange}
                    placeholder="Enter subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class *</Label>
                  <Input
                    id="class"
                    name="class"
                    value={editFormData.class || ""}
                    onChange={handleEditInputChange}
                    placeholder="Enter class"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxMarks">Maximum Marks *</Label>
                  <Input
                    id="maxMarks"
                    name="maxMarks"
                    type="number"
                    value={editFormData.maxMarks || ""}
                    onChange={handleEditInputChange}
                    placeholder="Enter maximum marks"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={editFormData.dueDate || ""}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueTime">Due Time *</Label>
                  <Input
                    id="dueTime"
                    name="dueTime"
                    value={editFormData.dueTime || ""}
                    onChange={handleEditInputChange}
                    placeholder="e.g., 11:59 PM"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={isSubmitting}
              className="bg-eduos-primary hover:bg-eduos-secondary"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              Delete Assignment
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedAssignment?.title}"?
              This action cannot be undone and will permanently remove the
              assignment and all student submissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Assignment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageAssignment;
