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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Search,
  FileText,
  FileSpreadsheet,
  Printer,
  Copy,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Download,
  MessageSquare,
  Calendar,
  User,
} from "lucide-react";
import { toast } from "sonner";

const ManageTeacherComment = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    session: "",
    term: "",
    teacher: "",
    student: "",
    subject: "",
    comment: "",
    grade: "",
    status: "",
  });

  // Enhanced sample data for demonstration with state management
  const [comments, setComments] = useState([
    {
      id: 1,
      session: "2023/2024 First Term",
      term: "First Term",
      teacher: "Mr. John Smith",
      student: "Alice Johnson",
      subject: "Mathematics",
      comment:
        "Excellent performance in algebra. Shows great understanding of mathematical concepts.",
      grade: "A",
      status: "approved",
      dateCreated: "2023-08-15",
    },
    {
      id: 2,
      session: "2023/2024 Second Term",
      term: "Second Term",
      teacher: "Mrs. Sarah Wilson",
      student: "Bob Brown",
      subject: "English Language",
      comment:
        "Good improvement in writing skills. Needs to work on grammar and punctuation.",
      grade: "B+",
      status: "pending",
      dateCreated: "2023-08-10",
    },
    {
      id: 3,
      session: "2022/2023 Third Term",
      term: "Third Term",
      teacher: "Dr. Michael Davis",
      student: "Emma Thompson",
      subject: "Physics",
      comment:
        "Outstanding performance in practical work. Demonstrates excellent problem-solving skills.",
      grade: "A+",
      status: "approved",
      dateCreated: "2023-08-05",
    },
    {
      id: 4,
      session: "2022/2023 Second Term",
      term: "Second Term",
      teacher: "Ms. Lisa Anderson",
      student: "David Wilson",
      subject: "Chemistry",
      comment:
        "Satisfactory performance. Shows potential but needs more practice in chemical equations.",
      grade: "C+",
      status: "pending",
      dateCreated: "2023-07-28",
    },
  ]);

  // Filter comments based on search term
  const filteredComments = comments.filter(
    (comment) =>
      comment.session.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler functions
  const handleView = (comment) => {
    setSelectedComment(comment);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (comment) => {
    setSelectedComment(comment);
    setEditForm({
      session: comment.session,
      term: comment.term,
      teacher: comment.teacher,
      student: comment.student,
      subject: comment.subject,
      comment: comment.comment,
      grade: comment.grade,
      status: comment.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (comment) => {
    setSelectedComment(comment);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateComment = () => {
    if (!editForm.session || !editForm.comment || !editForm.grade) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
        duration: 3000,
      });
      return;
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === selectedComment.id
          ? {
              ...comment,
              session: editForm.session,
              term: editForm.term,
              teacher: editForm.teacher,
              student: editForm.student,
              subject: editForm.subject,
              comment: editForm.comment,
              grade: editForm.grade,
              status: editForm.status,
            }
          : comment
      )
    );

    setIsEditDialogOpen(false);
    setSelectedComment(null);
    setEditForm({
      session: "",
      term: "",
      teacher: "",
      student: "",
      subject: "",
      comment: "",
      grade: "",
      status: "",
    });

    toast.success("Comment Updated", {
      description: `Comment for ${editForm.student} has been updated successfully.`,
      icon: <Check className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const confirmDelete = () => {
    setComments((prev) =>
      prev.filter((comment) => comment.id !== selectedComment.id)
    );
    setIsDeleteDialogOpen(false);

    toast.success("Comment Deleted", {
      description: `Comment for ${selectedComment.student} has been deleted successfully.`,
      icon: <Check className="h-4 w-4" />,
      duration: 4000,
    });

    setSelectedComment(null);
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "S/N",
        "Session",
        "Teacher",
        "Student",
        "Subject",
        "Grade",
        "Status",
        "Date",
      ],
      ...filteredComments.map((comment) => [
        comment.id,
        comment.session,
        comment.teacher,
        comment.student,
        comment.subject,
        comment.grade,
        comment.status,
        comment.dateCreated,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "teacher_comments.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`CSV Export Complete`, {
      description: `Successfully exported ${filteredComments.length} comments to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredComments
      .map(
        (comment) =>
          `${comment.id}. ${comment.session} - ${comment.teacher} commented on ${comment.student} (${comment.subject}): Grade ${comment.grade} - ${comment.status}`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "teacher_comments.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`Text Export Complete`, {
      description: `Successfully exported ${filteredComments.length} comments to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info(`Print Dialog Opened`, {
      description: `Preparing to print ${filteredComments.length} teacher comments.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredComments
      .map(
        (comment) =>
          `${comment.id}\t${comment.session}\t${comment.teacher}\t${comment.student}\t${comment.subject}\t${comment.grade}\t${comment.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success(`Copied to Clipboard`, {
          description: `Successfully copied ${filteredComments.length} comments data to clipboard.`,
          icon: <Copy className="h-4 w-4" />,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error(`Copy Failed`, {
          description: `Unable to copy data to clipboard. Please try again.`,
          icon: <X className="h-4 w-4" />,
          duration: 3000,
        });
      });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Teacher Comment
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Comment List</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search comments..."
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
                  <TableHead className="bg-gray-100">Session Name</TableHead>
                  <TableHead className="bg-gray-100">Teacher</TableHead>
                  <TableHead className="bg-gray-100">Student</TableHead>
                  <TableHead className="bg-gray-100">Subject</TableHead>
                  <TableHead className="bg-gray-100">Grade</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment) => (
                  <TableRow
                    key={comment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{comment.id}</TableCell>
                    <TableCell className="font-medium">
                      {comment.session}
                    </TableCell>
                    <TableCell>{comment.teacher}</TableCell>
                    <TableCell>{comment.student}</TableCell>
                    <TableCell>{comment.subject}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-semibold">
                        {comment.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          comment.status === "approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        {comment.status === "approved" ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                          onClick={() => handleView(comment)}
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-yellow-50 hover:border-yellow-300"
                          onClick={() => handleEdit(comment)}
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-red-700 transition-colors"
                          onClick={() => handleDelete(comment)}
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
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

      {/* View Comment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comment Details
            </DialogTitle>
          </DialogHeader>
          {selectedComment && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Comment ID
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedComment.id}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Session
                    </label>
                    <p className="text-sm">{selectedComment.session}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Term
                    </label>
                    <p className="text-sm">{selectedComment.term}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Date Created
                    </label>
                    <p className="text-sm">{selectedComment.dateCreated}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Teacher
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedComment.teacher}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Student
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedComment.student}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Subject
                    </label>
                    <p className="text-sm">{selectedComment.subject}</p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Grade
                      </label>
                      <Badge variant="outline" className="font-semibold ml-2">
                        {selectedComment.grade}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Status
                      </label>
                      <Badge
                        className={`ml-2 ${
                          selectedComment.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedComment.status === "approved"
                          ? "Approved"
                          : "Pending"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Teacher&apos;s Comment
                </label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedComment.comment}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Comment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Comment
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editSession">Session *</Label>
                <Input
                  id="editSession"
                  value={editForm.session}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      session: e.target.value,
                    }))
                  }
                  placeholder="e.g., 2023/2024 First Term"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editTerm">Term</Label>
                <Select
                  value={editForm.term}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, term: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="First Term">First Term</SelectItem>
                    <SelectItem value="Second Term">Second Term</SelectItem>
                    <SelectItem value="Third Term">Third Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editTeacher">Teacher</Label>
                <Input
                  id="editTeacher"
                  value={editForm.teacher}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      teacher: e.target.value,
                    }))
                  }
                  placeholder="Teacher name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editStudent">Student</Label>
                <Input
                  id="editStudent"
                  value={editForm.student}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      student: e.target.value,
                    }))
                  }
                  placeholder="Student name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editSubject">Subject</Label>
                <Input
                  id="editSubject"
                  value={editForm.subject}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  placeholder="Subject name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editGrade">Grade *</Label>
                <Select
                  value={editForm.grade}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, grade: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C+">C+</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editStatus">Status</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editComment">Teacher&apos;s Comment *</Label>
              <Textarea
                id="editComment"
                value={editForm.comment}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, comment: e.target.value }))
                }
                placeholder="Enter teacher's comment about student performance"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedComment(null);
                setEditForm({
                  session: "",
                  term: "",
                  teacher: "",
                  student: "",
                  subject: "",
                  comment: "",
                  grade: "",
                  status: "",
                });
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleUpdateComment}>
              <Check className="h-4 w-4 mr-2" />
              Update Comment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete Comment
            </DialogTitle>
          </DialogHeader>
          {selectedComment && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this comment? This action cannot
                be undone.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Session:</span>{" "}
                    {selectedComment.session}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Teacher:</span>{" "}
                    {selectedComment.teacher}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Student:</span>{" "}
                    {selectedComment.student}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Subject:</span>{" "}
                    {selectedComment.subject}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedComment(null);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Comment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTeacherComment;
