import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Search, Plus, Edit, Eye, Calendar, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AssessmentManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [createFormData, setCreateFormData] = useState({
    title: "",
    subject: "",
    level: "",
    type: "quiz",
    totalQuestions: "",
    totalMarks: "",
    duration: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [editFormData, setEditFormData] = useState({
    title: "",
    subject: "",
    level: "",
    type: "quiz",
    totalQuestions: "",
    totalMarks: "",
    duration: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [assessments, setAssessments] = useState([
    {
      id: "1",
      title: "Mathematics Mid-term Exam",
      subject: "Mathematics",
      level: "Grade 10",
      type: "exam",
      totalQuestions: 25,
      totalMarks: 100,
      duration: 120,
      startDate: "2024-02-01",
      endDate: "2024-02-03",
      status: "active",
      studentsEnrolled: 45,
      studentsCompleted: 32,
      createdBy: "Mr. Johnson",
    },
    {
      id: "2",
      title: "Science Quiz Chapter 5",
      subject: "Science",
      level: "Grade 8",
      type: "quiz",
      totalQuestions: 15,
      totalMarks: 30,
      duration: 30,
      startDate: "2024-01-25",
      endDate: "2024-01-27",
      status: "completed",
      studentsEnrolled: 38,
      studentsCompleted: 35,
      createdBy: "Ms. Davis",
    },
    {
      id: "3",
      title: "English Essay Assignment",
      subject: "English",
      level: "Grade 9",
      type: "assignment",
      totalQuestions: 3,
      totalMarks: 50,
      duration: 0,
      startDate: "2024-02-05",
      endDate: "2024-02-12",
      status: "draft",
      studentsEnrolled: 0,
      studentsCompleted: 0,
      createdBy: "Mrs. Smith",
    },
  ]);

  const filteredAssessments = assessments.filter(
    (assessment) =>
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "graded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "quiz":
        return "bg-yellow-100 text-yellow-800";
      case "exam":
        return "bg-red-100 text-red-800";
      case "assignment":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateAssessment = () => {
    setCreateFormData({
      title: "",
      subject: "",
      level: "",
      type: "quiz",
      totalQuestions: "",
      totalMarks: "",
      duration: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setShowCreateModal(true);
  };

  const handleEditAssessment = (id) => {
    const assessment = assessments.find((a) => a.id === id);
    if (assessment) {
      setSelectedAssessment(assessment);
      setEditFormData({
        title: assessment.title,
        subject: assessment.subject,
        level: assessment.level,
        type: assessment.type,
        totalQuestions: assessment.totalQuestions.toString(),
        totalMarks: assessment.totalMarks.toString(),
        duration: assessment.duration.toString(),
        startDate: assessment.startDate,
        endDate: assessment.endDate,
        description: assessment.description || "",
      });
      setShowEditModal(true);
    }
  };

  const handleViewAssessment = (id) => {
    const assessment = assessments.find((a) => a.id === id);
    if (assessment) {
      setSelectedAssessment(assessment);
      setShowViewModal(true);
    }
  };

  const handleDeleteAssessment = (id) => {
    if (window.confirm("Are you sure you want to delete this assessment?")) {
      setAssessments(assessments.filter((a) => a.id !== id));
      toast.success("Assessment deleted successfully!");
    }
  };

  const handleCreateFormChange = (name, value) => {
    setCreateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormChange = (name, value) => {
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "title",
      "subject",
      "level",
      "type",
      "totalQuestions",
      "totalMarks",
      "startDate",
      "endDate",
    ];
    const missingFields = requiredFields.filter(
      (field) => !createFormData[field]
    );

    if (missingFields.length > 0) {
      toast.error("Missing information", {
        description: "Please fill in all required fields",
      });
      return;
    }

    // Create new assessment
    const newAssessment = {
      id: (assessments.length + 1).toString(),
      ...createFormData,
      totalQuestions: parseInt(createFormData.totalQuestions),
      totalMarks: parseInt(createFormData.totalMarks),
      duration: parseInt(createFormData.duration) || 0,
      status: "draft",
      studentsEnrolled: 0,
      studentsCompleted: 0,
      createdBy: "Current User",
    };

    setAssessments([...assessments, newAssessment]);
    setShowCreateModal(false);

    toast.success("Assessment created successfully!", {
      description: "New assessment has been added to the system",
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "title",
      "subject",
      "level",
      "type",
      "totalQuestions",
      "totalMarks",
      "startDate",
      "endDate",
    ];
    const missingFields = requiredFields.filter(
      (field) => !editFormData[field]
    );

    if (missingFields.length > 0) {
      toast.error("Missing information", {
        description: "Please fill in all required fields",
      });
      return;
    }

    // Update assessment
    const updatedAssessments = assessments.map((a) =>
      a.id === selectedAssessment.id
        ? {
            ...a,
            ...editFormData,
            totalQuestions: parseInt(editFormData.totalQuestions),
            totalMarks: parseInt(editFormData.totalMarks),
            duration: parseInt(editFormData.duration) || 0,
          }
        : a
    );

    setAssessments(updatedAssessments);
    setShowEditModal(false);
    setSelectedAssessment(null);

    toast.success("Assessment updated successfully!", {
      description: "Changes have been saved",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Assessment Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage assessments, quizzes, and exams
          </p>
        </div>
        <Button
          onClick={handleCreateAssessment}
          className="bg-eduos-primary hover:bg-eduos-secondary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Assessments</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 px-5"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Title</th>
                  <th className="text-left p-3 font-semibold">Subject</th>
                  <th className="text-left p-3 font-semibold">Level</th>
                  <th className="text-left p-3 font-semibold">Type</th>
                  <th className="text-left p-3 font-semibold">
                    Questions/Marks
                  </th>
                  <th className="text-left p-3 font-semibold">Duration</th>
                  <th className="text-left p-3 font-semibold">Period</th>
                  <th className="text-left p-3 font-semibold">Progress</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((assessment) => (
                  <tr key={assessment.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{assessment.title}</div>
                        <div className="text-sm text-muted-foreground">
                          by {assessment.createdBy}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{assessment.subject}</td>
                    <td className="p-3">
                      <Badge variant="outline">{assessment.level}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={getTypeColor(assessment.type)}>
                        {assessment.type}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{assessment.totalQuestions} questions</div>
                        <div className="text-muted-foreground">
                          {assessment.totalMarks} marks
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      {assessment.duration > 0 ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {assessment.duration} min
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No limit</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {assessment.startDate}
                        </div>
                        <div className="text-muted-foreground">
                          to {assessment.endDate}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>
                          {assessment.studentsCompleted}/
                          {assessment.studentsEnrolled}
                        </div>
                        <div className="text-muted-foreground">completed</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(assessment.status)}>
                        {assessment.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewAssessment(assessment.id)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAssessment(assessment.id)}
                          title="Edit Assessment"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteAssessment(assessment.id)}
                          title="Delete Assessment"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAssessments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No assessments found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Assessment Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="createTitle">Assessment Title *</Label>
                <Input
                  id="createTitle"
                  value={createFormData.title}
                  onChange={(e) =>
                    handleCreateFormChange("title", e.target.value)
                  }
                  placeholder="Enter assessment title"
                  required
                />
              </div>

              <div>
                <Label>Subject *</Label>
                <Select
                  value={createFormData.subject}
                  onValueChange={(value) =>
                    handleCreateFormChange("subject", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Social Studies">
                      Social Studies
                    </SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Level *</Label>
                <Select
                  value={createFormData.level}
                  onValueChange={(value) =>
                    handleCreateFormChange("level", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
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

              <div>
                <Label>Assessment Type *</Label>
                <Select
                  value={createFormData.type}
                  onValueChange={(value) =>
                    handleCreateFormChange("type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="createQuestions">Total Questions *</Label>
                <Input
                  id="createQuestions"
                  type="number"
                  value={createFormData.totalQuestions}
                  onChange={(e) =>
                    handleCreateFormChange("totalQuestions", e.target.value)
                  }
                  placeholder="Number of questions"
                  required
                />
              </div>

              <div>
                <Label htmlFor="createMarks">Total Marks *</Label>
                <Input
                  id="createMarks"
                  type="number"
                  value={createFormData.totalMarks}
                  onChange={(e) =>
                    handleCreateFormChange("totalMarks", e.target.value)
                  }
                  placeholder="Total marks"
                  required
                />
              </div>

              <div>
                <Label htmlFor="createDuration">Duration (minutes)</Label>
                <Input
                  id="createDuration"
                  type="number"
                  value={createFormData.duration}
                  onChange={(e) =>
                    handleCreateFormChange("duration", e.target.value)
                  }
                  placeholder="Duration in minutes (0 for no limit)"
                />
              </div>

              <div>
                <Label htmlFor="createStartDate">Start Date *</Label>
                <Input
                  id="createStartDate"
                  type="date"
                  value={createFormData.startDate}
                  onChange={(e) =>
                    handleCreateFormChange("startDate", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="createEndDate">End Date *</Label>
                <Input
                  id="createEndDate"
                  type="date"
                  value={createFormData.endDate}
                  onChange={(e) =>
                    handleCreateFormChange("endDate", e.target.value)
                  }
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="createDescription">Description</Label>
                <textarea
                  id="createDescription"
                  value={createFormData.description}
                  onChange={(e) =>
                    handleCreateFormChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Assessment description (optional)"
                />
              </div>
            </div>

            <DialogFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Assessment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Assessment Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
          </DialogHeader>

          {selectedAssessment && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Title
                  </Label>
                  <p className="text-sm font-medium">
                    {selectedAssessment.title}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Subject
                  </Label>
                  <p className="text-sm">{selectedAssessment.subject}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Level
                  </Label>
                  <p className="text-sm">{selectedAssessment.level}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Type
                  </Label>
                  <Badge className={getTypeColor(selectedAssessment.type)}>
                    {selectedAssessment.type}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Questions
                  </Label>
                  <p className="text-sm">
                    {selectedAssessment.totalQuestions} questions
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Total Marks
                  </Label>
                  <p className="text-sm">
                    {selectedAssessment.totalMarks} marks
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Duration
                  </Label>
                  <p className="text-sm">
                    {selectedAssessment.duration > 0
                      ? `${selectedAssessment.duration} minutes`
                      : "No limit"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Status
                  </Label>
                  <Badge className={getStatusColor(selectedAssessment.status)}>
                    {selectedAssessment.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Start Date
                  </Label>
                  <p className="text-sm">{selectedAssessment.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    End Date
                  </Label>
                  <p className="text-sm">{selectedAssessment.endDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Created By
                  </Label>
                  <p className="text-sm">{selectedAssessment.createdBy}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Progress
                  </Label>
                  <p className="text-sm">
                    {selectedAssessment.studentsCompleted}/
                    {selectedAssessment.studentsEnrolled} completed
                  </p>
                </div>
              </div>

              {selectedAssessment.description && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Description
                  </Label>
                  <p className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">
                    {selectedAssessment.description}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowViewModal(false)}>
              Close
            </Button>
            {selectedAssessment && (
              <Button
                onClick={() => {
                  setShowViewModal(false);
                  handleEditAssessment(selectedAssessment.id);
                }}
              >
                Edit Assessment
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Assessment Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Assessment</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="editTitle">Assessment Title *</Label>
                <Input
                  id="editTitle"
                  value={editFormData.title}
                  onChange={(e) =>
                    handleEditFormChange("title", e.target.value)
                  }
                  placeholder="Enter assessment title"
                  required
                />
              </div>

              <div>
                <Label>Subject *</Label>
                <Select
                  value={editFormData.subject}
                  onValueChange={(value) =>
                    handleEditFormChange("subject", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Social Studies">
                      Social Studies
                    </SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Level *</Label>
                <Select
                  value={editFormData.level}
                  onValueChange={(value) =>
                    handleEditFormChange("level", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
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

              <div>
                <Label>Assessment Type *</Label>
                <Select
                  value={editFormData.type}
                  onValueChange={(value) => handleEditFormChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="editQuestions">Total Questions *</Label>
                <Input
                  id="editQuestions"
                  type="number"
                  value={editFormData.totalQuestions}
                  onChange={(e) =>
                    handleEditFormChange("totalQuestions", e.target.value)
                  }
                  placeholder="Number of questions"
                  required
                />
              </div>

              <div>
                <Label htmlFor="editMarks">Total Marks *</Label>
                <Input
                  id="editMarks"
                  type="number"
                  value={editFormData.totalMarks}
                  onChange={(e) =>
                    handleEditFormChange("totalMarks", e.target.value)
                  }
                  placeholder="Total marks"
                  required
                />
              </div>

              <div>
                <Label htmlFor="editDuration">Duration (minutes)</Label>
                <Input
                  id="editDuration"
                  type="number"
                  value={editFormData.duration}
                  onChange={(e) =>
                    handleEditFormChange("duration", e.target.value)
                  }
                  placeholder="Duration in minutes (0 for no limit)"
                />
              </div>

              <div>
                <Label htmlFor="editStartDate">Start Date *</Label>
                <Input
                  id="editStartDate"
                  type="date"
                  value={editFormData.startDate}
                  onChange={(e) =>
                    handleEditFormChange("startDate", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="editEndDate">End Date *</Label>
                <Input
                  id="editEndDate"
                  type="date"
                  value={editFormData.endDate}
                  onChange={(e) =>
                    handleEditFormChange("endDate", e.target.value)
                  }
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="editDescription">Description</Label>
                <textarea
                  id="editDescription"
                  value={editFormData.description}
                  onChange={(e) =>
                    handleEditFormChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Assessment description (optional)"
                />
              </div>
            </div>

            <DialogFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedAssessment(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssessmentManagement;
