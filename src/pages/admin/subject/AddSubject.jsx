import React, { useState } from "react";
import { toast } from "sonner";
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
  BookOpen,
  GraduationCap,
  Building,
  Users,
  Calendar,
  UserCheck,
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
  Award,
  Target,
} from "lucide-react";

const AddSubject = () => {
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectLevel: "",
    class: "",
    description: "",
    credits: "",
    duration: "",
  });

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Mathematics",
      level: "High School",
      class: "Grade 10",
      teacher: "Dr. Smith",
      credits: 4,
      duration: "1 Year",
      status: "active",
      enrolledStudents: 85,
      description:
        "Advanced mathematics covering algebra, geometry, and trigonometry",
      createdAt: "2024-01-15",
      curriculum: ["Algebra", "Geometry", "Trigonometry", "Statistics"],
    },
    {
      id: 2,
      name: "Physics",
      level: "High School",
      class: "Grade 11",
      teacher: "Prof. Johnson",
      credits: 4,
      duration: "1 Year",
      status: "active",
      enrolledStudents: 72,
      description:
        "Comprehensive physics covering mechanics, thermodynamics, and electromagnetism",
      createdAt: "2024-01-12",
      curriculum: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics"],
    },
    {
      id: 3,
      name: "Chemistry",
      level: "High School",
      class: "Grade 12",
      teacher: "Dr. Wilson",
      credits: 4,
      duration: "1 Year",
      status: "active",
      enrolledStudents: 68,
      description:
        "Organic and inorganic chemistry with laboratory experiments",
      createdAt: "2024-01-10",
      curriculum: [
        "Organic Chemistry",
        "Inorganic Chemistry",
        "Physical Chemistry",
        "Laboratory",
      ],
    },
    {
      id: 4,
      name: "Biology",
      level: "Middle School",
      class: "Grade 8",
      teacher: "Ms. Davis",
      credits: 3,
      duration: "1 Year",
      status: "active",
      enrolledStudents: 95,
      description: "Introduction to life sciences and basic biology concepts",
      createdAt: "2024-01-08",
      curriculum: ["Cell Biology", "Genetics", "Ecology", "Human Body Systems"],
    },
    {
      id: 5,
      name: "Computer Science",
      level: "High School",
      class: "Grade 11",
      teacher: "Mr. Brown",
      credits: 3,
      duration: "1 Year",
      status: "active",
      enrolledStudents: 56,
      description: "Programming fundamentals and computer science principles",
      createdAt: "2024-01-05",
      curriculum: [
        "Programming",
        "Data Structures",
        "Algorithms",
        "Web Development",
      ],
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
    if (!formData.subjectName.trim()) {
      toast.error("Please enter a subject name!", {
        description: "Subject name is required to create a new subject.",
        duration: 4000,
      });
      return;
    }

    if (!formData.subjectLevel) {
      toast.error("Please select a subject level!", {
        description: "Subject level selection is required.",
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

    if (isEditing && editingId) {
      // Update existing subject
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === editingId
            ? {
                ...subject,
                name: formData.subjectName,
                level: formData.subjectLevel,
                class: formData.class,
                description: formData.description || "No description provided",
                credits: parseInt(formData.credits) || 3,
                duration: formData.duration || "1 Year",
              }
            : subject
        )
      );
      setIsEditing(false);
      setEditingId(null);
      toast.success(
        `🎉 Subject "${formData.subjectName}" updated successfully!`,
        {
          description: `Changes have been saved and applied.`,
          duration: 5000,
        }
      );
    } else {
      // Create new subject
      const newSubject = {
        id: subjects.length + 1,
        name: formData.subjectName,
        level: formData.subjectLevel,
        class: formData.class,
        teacher: "TBD",
        credits: parseInt(formData.credits) || 3,
        duration: formData.duration || "1 Year",
        status: "active",
        enrolledStudents: 0,
        description: formData.description || "No description provided",
        createdAt: new Date().toISOString().split("T")[0],
        curriculum: [
          "Introduction",
          "Basic Concepts",
          "Advanced Topics",
          "Assessment",
        ],
      };

      setSubjects((prev) => [newSubject, ...prev]);

      toast.success(
        `🎉 Subject "${formData.subjectName}" created successfully!`,
        {
          description: `${formData.class} subject has been added and is ready for enrollment.`,
          duration: 5000,
          action: {
            label: "View",
            onClick: () => {
              toast.info(`Viewing ${formData.subjectName} details`);
            },
          },
        }
      );
    }

    // Reset form
    setFormData({
      subjectName: "",
      subjectLevel: "",
      class: "",
      description: "",
      credits: "",
      duration: "",
    });
  };

  const handleView = (subject) => {
    setSelectedSubject(subject);
    setShowViewModal(true);
    toast.success(`Viewing subject: ${subject.name}`);
  };

  const handleEdit = (subject) => {
    setFormData({
      subjectName: subject.name,
      subjectLevel: subject.level,
      class: subject.class,
      description: subject.description,
      credits: subject.credits.toString(),
      duration: subject.duration,
    });
    setIsEditing(true);
    setEditingId(subject.id);
    toast.info(`Now editing: ${subject.name}`);
    // Scroll to form
    setTimeout(() => {
      document
        .querySelector(".subject-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = (id) => {
    const subject = subjects.find((s) => s.id === id);

    if (!subject) {
      toast.error("Subject not found!");
      return;
    }

    if (subject.enrolledStudents > 0) {
      toast.error(
        `Cannot delete subject "${subject.name}" with ${subject.enrolledStudents} enrolled students`,
        {
          description: "Please transfer students to another subject first.",
          duration: 5000,
        }
      );
      return;
    }

    // Show confirmation before deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the subject "${subject.name}"? This action cannot be undone.`
    );

    if (!confirmDelete) {
      toast.info("Deletion cancelled");
      return;
    }

    setSubjects((prev) => prev.filter((s) => s.id !== id));
    toast.success(`Subject "${subject.name}" deleted successfully!`, {
      description: "The subject has been permanently removed from the system.",
      duration: 4000,
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      subjectName: "",
      subjectLevel: "",
      class: "",
      description: "",
      credits: "",
      duration: "",
    });
    toast.info("Edit cancelled");
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Level",
      "Class",
      "Teacher",
      "Credits",
      "Duration",
      "Enrolled Students",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...subjects.map((subject) =>
        [
          subject.id,
          `"${subject.name}"`,
          `"${subject.level}"`,
          `"${subject.class}"`,
          `"${subject.teacher}"`,
          subject.credits,
          `"${subject.duration}"`,
          subject.enrolledStudents,
          subject.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subjects_data.csv";
    a.click();
    toast.success("Data exported to CSV!");
  };

  const exportToText = () => {
    const textContent = subjects
      .map(
        (subject) =>
          `ID: ${subject.id}\nName: ${subject.name}\nLevel: ${
            subject.level
          }\nClass: ${subject.class}\nTeacher: ${subject.teacher}\nCredits: ${
            subject.credits
          }\nDuration: ${subject.duration}\nEnrolled Students: ${
            subject.enrolledStudents
          }\nStatus: ${subject.status}\nDescription: ${
            subject.description
          }\n${"=".repeat(50)}\n`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subjects_data.txt";
    a.click();
    toast.success("Data exported to text file!");
  };

  const copyToClipboard = () => {
    const textContent = subjects
      .map(
        (subject) =>
          `${subject.name} - ${subject.class} | Teacher: ${subject.teacher} | Students: ${subject.enrolledStudents}`
      )
      .join("\n");

    navigator.clipboard.writeText(textContent).then(() => {
      toast.success("Data copied to clipboard!");
    });
  };

  const printData = () => {
    const printContent = `
      <h2>Subject Management Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>ID</th><th>Name</th><th>Level</th><th>Class</th><th>Teacher</th><th>Credits</th><th>Duration</th><th>Enrolled Students</th><th>Status</th>
        </tr>
        ${subjects
          .map(
            (subject) => `
          <tr>
            <td>${subject.id}</td>
            <td>${subject.name}</td>
            <td>${subject.level}</td>
            <td>${subject.class}</td>
            <td>${subject.teacher}</td>
            <td>${subject.credits}</td>
            <td>${subject.duration}</td>
            <td>${subject.enrolledStudents}</td>
            <td>${subject.status}</td>
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
          Add Subject
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

      <Card className="mt-3 animate-fade-in delay-100 max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 subject-form">
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
            {isEditing ? "Edit Subject Information" : "Subject Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subjectName">Enter Subject Name *</Label>
              <Input
                id="subjectName"
                name="subjectName"
                value={formData.subjectName}
                onChange={handleInputChange}
                placeholder="e.g. Mathematics, Physics, etc."
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subjectLevel">Select Subject Level *</Label>
              <Select
                value={formData.subjectLevel}
                onValueChange={(value) =>
                  handleSelectChange("subjectLevel", value)
                }
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Elementary">Elementary</SelectItem>
                  <SelectItem value="Middle School">Middle School</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="College">College</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                name="credits"
                type="number"
                value={formData.credits}
                onChange={handleInputChange}
                placeholder="e.g. 3"
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="e.g. 1 Year, 6 Months"
              className="transition-all duration-300 focus:border-eduos-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Subject Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of the subject curriculum and objectives..."
              className="min-h-[100px] transition-all duration-300 focus:border-eduos-primary"
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
              {isEditing ? "Update Subject" : "Add Subject Now"}
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
              <BookOpen className="h-5 w-5" />
              Existing Subjects ({subjects.length})
            </span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Total: {subjects.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-50">S/N</TableHead>
                  <TableHead className="bg-gray-50">Subject Name</TableHead>
                  <TableHead className="bg-gray-50">Level</TableHead>
                  <TableHead className="bg-gray-50">Class</TableHead>
                  <TableHead className="bg-gray-50">Teacher</TableHead>
                  <TableHead className="bg-gray-50">Credits</TableHead>
                  <TableHead className="bg-gray-50">Students</TableHead>
                  <TableHead className="bg-gray-50">Status</TableHead>
                  <TableHead className="bg-gray-50">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject, index) => (
                  <TableRow
                    key={subject.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {subject.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 w-fit"
                      >
                        <GraduationCap className="h-3 w-3" />
                        {subject.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 w-fit"
                      >
                        <Building className="h-3 w-3" />
                        {subject.class}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-gray-400" />
                        <span
                          className={
                            subject.teacher === "TBD"
                              ? "text-red-500 font-medium"
                              : "text-gray-900"
                          }
                        >
                          {subject.teacher}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-gray-400" />
                        <span>{subject.credits}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span
                          className={
                            subject.enrolledStudents > 0
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {subject.enrolledStudents}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          subject.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {subject.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(subject)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(subject)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(subject.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          disabled={subject.enrolledStudents > 0}
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

          {subjects.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">
                No subjects created yet
              </p>
              <p className="text-sm">
                Add your first subject using the form above!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Subject Modal */}
      {showViewModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-6 rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {selectedSubject.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge className="bg-white/20 text-white">
                      <Building className="h-3 w-3 mr-1" />
                      {selectedSubject.class}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {selectedSubject.level}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <UserCheck className="h-3 w-3 mr-1" />
                      {selectedSubject.teacher}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <Users className="h-3 w-3 mr-1" />
                      {selectedSubject.enrolledStudents} Students
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
                      Subject Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Level:</span>{" "}
                        {selectedSubject.level}
                      </p>
                      <p>
                        <span className="font-medium">Class:</span>{" "}
                        {selectedSubject.class}
                      </p>
                      <p>
                        <span className="font-medium">Credits:</span>{" "}
                        {selectedSubject.credits}
                      </p>
                      <p>
                        <span className="font-medium">Duration:</span>{" "}
                        {selectedSubject.duration}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      Timeline
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Created:</span>{" "}
                        {selectedSubject.createdAt}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>
                        <Badge
                          className={`ml-2 ${
                            selectedSubject.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedSubject.status}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      Enrollment
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Enrolled Students:</span>
                        <span
                          className={
                            selectedSubject.enrolledStudents > 0
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {selectedSubject.enrolledStudents}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Assigned Teacher:</span>
                        <span
                          className={
                            selectedSubject.teacher === "TBD"
                              ? "text-red-500"
                              : "text-gray-900"
                          }
                        >
                          {selectedSubject.teacher}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  Description
                </h4>
                <p className="text-gray-700">{selectedSubject.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4" />
                  Curriculum
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSubject.curriculum?.map((item, index) => (
                    <Badge key={index} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(selectedSubject);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Subject
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

export default AddSubject;
