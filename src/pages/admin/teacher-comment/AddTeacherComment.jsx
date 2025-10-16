import React, { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Plus,
  MessageSquare,
  User,
  Calendar,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Sparkles,
  Eye,
  Edit,
  Trash2,
  FileText,
  Download,
  Copy,
  Printer,
  Clock,
  Star,
  Target,
  Users,
} from "lucide-react";

const AddTeacherComment = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    class: "",
    session: "",
    term: "",
    subject: "",
    comment: "",
    rating: "",
  });

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [comments, setComments] = useState([
    {
      id: 1,
      studentName: "John Doe",
      class: "Grade 10",
      session: "2024/2025",
      term: "First Term",
      subject: "Mathematics",
      comment:
        "John shows excellent understanding of algebraic concepts and consistently completes assignments on time. Keep up the good work!",
      rating: "Excellent",
      teacher: "Dr. Smith",
      dateAdded: "2024-10-15",
      status: "approved",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      class: "Grade 11",
      session: "2024/2025",
      term: "First Term",
      subject: "Physics",
      comment:
        "Jane demonstrates strong analytical skills but needs to improve participation in class discussions.",
      rating: "Good",
      teacher: "Prof. Johnson",
      dateAdded: "2024-10-14",
      status: "approved",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      class: "Grade 9",
      session: "2024/2025",
      term: "First Term",
      subject: "Chemistry",
      comment:
        "Mike shows great potential in laboratory work. Encourage more independent study to improve theoretical understanding.",
      rating: "Good",
      teacher: "Dr. Wilson",
      dateAdded: "2024-10-13",
      status: "pending",
    },
    {
      id: 4,
      studentName: "Sarah Davis",
      class: "Grade 12",
      session: "2024/2025",
      term: "First Term",
      subject: "Biology",
      comment:
        "Sarah consistently produces high-quality work and helps other students. Excellent leadership qualities.",
      rating: "Excellent",
      teacher: "Ms. Davis",
      dateAdded: "2024-10-12",
      status: "approved",
    },
    {
      id: 5,
      studentName: "David Brown",
      class: "Grade 8",
      session: "2024/2025",
      term: "First Term",
      subject: "English",
      comment:
        "David needs to focus more during lessons and complete homework assignments regularly.",
      rating: "Fair",
      teacher: "Mrs. Taylor",
      dateAdded: "2024-10-11",
      status: "approved",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.studentName.trim()) {
      toast.error("Please enter student name!", {
        description: "Student name is required to add a comment.",
        duration: 4000,
      });
      return;
    }

    if (!formData.class) {
      toast.error("Please select a class!", {
        description: "Class selection is required.",
        duration: 4000,
      });
      return;
    }

    if (!formData.comment.trim()) {
      toast.error("Please enter a comment!", {
        description: "Comment content is required.",
        duration: 4000,
      });
      return;
    }

    if (isEditing && editingId) {
      // Update existing comment
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === editingId
            ? {
                ...comment,
                studentName: formData.studentName,
                class: formData.class,
                session: formData.session || "2024/2025",
                term: formData.term || "First Term",
                subject: formData.subject || "General",
                comment: formData.comment,
                rating: formData.rating || "Good",
              }
            : comment
        )
      );
      setIsEditing(false);
      setEditingId(null);
      toast.success(
        `🎉 Comment for "${formData.studentName}" updated successfully!`,
        {
          description: `Changes have been saved and applied.`,
          duration: 5000,
        }
      );
    } else {
      // Create new comment
      const newComment = {
        id: comments.length + 1,
        studentName: formData.studentName,
        class: formData.class,
        session: formData.session || "2024/2025",
        term: formData.term || "First Term",
        subject: formData.subject || "General",
        comment: formData.comment,
        rating: formData.rating || "Good",
        teacher: "Current Teacher",
        dateAdded: new Date().toISOString().split("T")[0],
        status: "pending",
      };

      setComments((prev) => [newComment, ...prev]);

      toast.success(
        `🎉 Comment for "${formData.studentName}" added successfully!`,
        {
          description: `Teacher comment has been saved and is pending approval.`,
          duration: 5000,
          action: {
            label: "View",
            onClick: () => {
              toast.info(`Viewing comment for ${formData.studentName}`);
            },
          },
        }
      );
    }

    // Reset form
    setFormData({
      studentName: "",
      class: "",
      session: "",
      term: "",
      subject: "",
      comment: "",
      rating: "",
    });
  };

  const handleView = (comment) => {
    setSelectedComment(comment);
    setShowViewModal(true);
    toast.success(`Viewing comment for: ${comment.studentName}`);
  };

  const handleEdit = (comment) => {
    setFormData({
      studentName: comment.studentName,
      class: comment.class,
      session: comment.session,
      term: comment.term,
      subject: comment.subject,
      comment: comment.comment,
      rating: comment.rating,
    });
    setIsEditing(true);
    setEditingId(comment.id);
    toast.info(`Now editing comment for: ${comment.studentName}`);
    // Scroll to form
    setTimeout(() => {
      document
        .querySelector(".comment-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = (id) => {
    const comment = comments.find((c) => c.id === id);

    if (!comment) {
      toast.error("Comment not found!");
      return;
    }

    // Show confirmation before deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the comment for "${comment.studentName}"? This action cannot be undone.`
    );

    if (!confirmDelete) {
      toast.info("Deletion cancelled");
      return;
    }

    setComments((prev) => prev.filter((c) => c.id !== id));
    toast.success(
      `Comment for "${comment.studentName}" deleted successfully!`,
      {
        description:
          "The teacher comment has been permanently removed from the system.",
        duration: 4000,
      }
    );
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      studentName: "",
      class: "",
      session: "",
      term: "",
      subject: "",
      comment: "",
      rating: "",
    });
    toast.info("Edit cancelled");
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Student Name",
      "Class",
      "Session",
      "Term",
      "Subject",
      "Comment",
      "Rating",
      "Teacher",
      "Date Added",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...comments.map((comment) =>
        [
          comment.id,
          `"${comment.studentName}"`,
          `"${comment.class}"`,
          `"${comment.session}"`,
          `"${comment.term}"`,
          `"${comment.subject}"`,
          `"${comment.comment}"`,
          `"${comment.rating}"`,
          `"${comment.teacher}"`,
          comment.dateAdded,
          comment.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "teacher_comments_data.csv";
    a.click();
    toast.success("Data exported to CSV!");
  };

  const exportToText = () => {
    const textContent = comments
      .map(
        (comment) =>
          `ID: ${comment.id}\nStudent: ${comment.studentName}\nClass: ${
            comment.class
          }\nSession: ${comment.session}\nTerm: ${comment.term}\nSubject: ${
            comment.subject
          }\nComment: ${comment.comment}\nRating: ${comment.rating}\nTeacher: ${
            comment.teacher
          }\nDate Added: ${comment.dateAdded}\nStatus: ${
            comment.status
          }\n${"=".repeat(50)}\n`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "teacher_comments_data.txt";
    a.click();
    toast.success("Data exported to text file!");
  };

  const copyToClipboard = () => {
    const textContent = comments
      .map(
        (comment) =>
          `${comment.studentName} (${comment.class}) - ${comment.subject}: ${comment.comment} | Rating: ${comment.rating}`
      )
      .join("\n");

    navigator.clipboard.writeText(textContent).then(() => {
      toast.success("Data copied to clipboard!");
    });
  };

  const printData = () => {
    const printContent = `
      <h2>Teacher Comments Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>ID</th><th>Student</th><th>Class</th><th>Session</th><th>Subject</th><th>Comment</th><th>Rating</th><th>Status</th>
        </tr>
        ${comments
          .map(
            (comment) => `
          <tr>
            <td>${comment.id}</td>
            <td>${comment.studentName}</td>
            <td>${comment.class}</td>
            <td>${comment.session}</td>
            <td>${comment.subject}</td>
            <td>${comment.comment}</td>
            <td>${comment.rating}</td>
            <td>${comment.status}</td>
          </tr>
        `
          )
          .join("")}
      </table>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    toast.success("Print dialog opened!");
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Teacher Comments Management
        </h2>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button onClick={exportToText} variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Text
          </Button>
          <Button onClick={copyToClipboard} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button onClick={printData} variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 comment-form">
        <CardHeader
          className={`bg-gradient-to-r ${
            isEditing
              ? "from-orange-500 to-red-500"
              : "from-eduos-primary to-eduos-secondary"
          } text-white`}
        >
          <CardTitle className="flex items-center gap-2">
            {isEditing ? (
              <Edit className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            {isEditing
              ? "Edit Teacher Comment"
              : "Add Teacher Comment To Result"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name *</Label>
              <Input
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="e.g. John Doe"
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Select Class *</Label>
              <Select
                value={formData.class}
                onValueChange={(value) => handleSelectChange("class", value)}
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 1">Grade 1</SelectItem>
                  <SelectItem value="Grade 2">Grade 2</SelectItem>
                  <SelectItem value="Grade 3">Grade 3</SelectItem>
                  <SelectItem value="Grade 4">Grade 4</SelectItem>
                  <SelectItem value="Grade 5">Grade 5</SelectItem>
                  <SelectItem value="Grade 6">Grade 6</SelectItem>
                  <SelectItem value="Grade 7">Grade 7</SelectItem>
                  <SelectItem value="Grade 8">Grade 8</SelectItem>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                  <SelectItem value="Grade 12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session">Academic Session</Label>
              <Select
                value={formData.session}
                onValueChange={(value) => handleSelectChange("session", value)}
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024/2025">2024/2025</SelectItem>
                  <SelectItem value="2023/2024">2023/2024</SelectItem>
                  <SelectItem value="2022/2023">2022/2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <Select
                value={formData.term}
                onValueChange={(value) => handleSelectChange("term", value)}
              >
                <SelectTrigger className="transition-all duration-300">
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
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => handleSelectChange("subject", value)}
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Computer Science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Performance Rating</Label>
            <Select
              value={formData.rating}
              onValueChange={(value) => handleSelectChange("rating", value)}
            >
              <SelectTrigger className="transition-all duration-300">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Teacher Comment *</Label>
            <Textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Enter a detailed comment about the student's performance, behavior, and recommendations..."
              className="min-h-[120px] transition-all duration-300 focus:border-eduos-primary"
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              className={`flex-1 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg ${
                isEditing
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-eduos-primary hover:bg-eduos-secondary"
              }`}
            >
              {isEditing ? (
                <Edit className="h-4 w-4 mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              {isEditing ? "Update Comment" : "Add Comment Now"}
            </Button>
            {isEditing && (
              <Button
                onClick={cancelEdit}
                variant="outline"
                className="px-6 transition-all duration-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Teacher Comments ({comments.length})
            </span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Total: {comments.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-50">S/N</TableHead>
                  <TableHead className="bg-gray-50">Student Details</TableHead>
                  <TableHead className="bg-gray-50">Session/Term</TableHead>
                  <TableHead className="bg-gray-50">Subject</TableHead>
                  <TableHead className="bg-gray-50">Comment</TableHead>
                  <TableHead className="bg-gray-50">Rating</TableHead>
                  <TableHead className="bg-gray-50">Status</TableHead>
                  <TableHead className="bg-gray-50">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment, index) => (
                  <TableRow
                    key={comment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {comment.studentName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {comment.class}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {comment.session}
                        </div>
                        <div className="text-xs text-gray-500">
                          {comment.term}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 w-fit"
                      >
                        <BookOpen className="h-3 w-3" />
                        {comment.subject}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm truncate" title={comment.comment}>
                          {comment.comment}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`flex items-center gap-1 w-fit ${
                          comment.rating === "Excellent"
                            ? "bg-green-100 text-green-800"
                            : comment.rating === "Good"
                            ? "bg-blue-100 text-blue-800"
                            : comment.rating === "Fair"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <Star className="h-3 w-3" />
                        {comment.rating}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          comment.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {comment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(comment)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(comment)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(comment.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">
                No teacher comments added yet
              </p>
              <p className="text-sm">
                Add your first teacher comment using the form above!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Comment Modal */}
      {showViewModal && selectedComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-6 rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Teacher Comment for {selectedComment.studentName}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge className="bg-white/20 text-white">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {selectedComment.class}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <Calendar className="h-3 w-3 mr-1" />
                      {selectedComment.session} - {selectedComment.term}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {selectedComment.subject}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      {selectedComment.rating}
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => setShowViewModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4" />
                      Student Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {selectedComment.studentName}
                      </p>
                      <p>
                        <span className="font-medium">Class:</span>{" "}
                        {selectedComment.class}
                      </p>
                      <p>
                        <span className="font-medium">Subject:</span>{" "}
                        {selectedComment.subject}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      Assessment Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Session:</span>{" "}
                        {selectedComment.session}
                      </p>
                      <p>
                        <span className="font-medium">Term:</span>{" "}
                        {selectedComment.term}
                      </p>
                      <p>
                        <span className="font-medium">Rating:</span>
                        <Badge
                          className={`ml-2 ${
                            selectedComment.rating === "Excellent"
                              ? "bg-green-100 text-green-800"
                              : selectedComment.rating === "Good"
                              ? "bg-blue-100 text-blue-800"
                              : selectedComment.rating === "Fair"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedComment.rating}
                        </Badge>
                      </p>
                      <p>
                        <span className="font-medium">Teacher:</span>{" "}
                        {selectedComment.teacher}
                      </p>
                      <p>
                        <span className="font-medium">Date Added:</span>{" "}
                        {selectedComment.dateAdded}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>
                        <Badge
                          className={`ml-2 ${
                            selectedComment.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedComment.status}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4" />
                  Teacher Comment
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 italic">
                    "{selectedComment.comment}"
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(selectedComment);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Comment
                </Button>
                <Button
                  onClick={() => setShowViewModal(false)}
                  variant="outline"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeacherComment;
