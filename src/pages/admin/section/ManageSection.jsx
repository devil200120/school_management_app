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
import { Badge } from "../../../components/ui/badge";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Scissors,
  Eye,
  Users,
  MapPin,
  Calendar,
  GraduationCap,
  FileText,
  Download,
  Copy,
  Printer,
  ToggleLeft,
  ToggleRight,
  Building,
  UserCheck,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const ManageSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    level: "",
    capacity: "",
    teacher: "",
    room: "",
    description: "",
    schedule: "",
  });

  const [sections, setSections] = useState([
    {
      id: "1",
      name: "Section A",
      level: "Grade 1",
      capacity: 30,
      currentStudents: 28,
      teacher: "Mrs. Johnson",
      teacherId: "T001",
      room: "Room 101",
      status: "active",
      createdAt: "2024-01-15",
      description:
        "Primary section for Grade 1 students with focus on foundational learning",
      schedule: "Monday-Friday, 8:00 AM - 2:00 PM",
      subjects: ["Mathematics", "English", "Science", "Social Studies"],
      lastUpdated: "2024-01-20",
    },
    {
      id: "2",
      name: "Section B",
      level: "Grade 1",
      capacity: 30,
      currentStudents: 25,
      teacher: "Mr. Smith",
      teacherId: "T002",
      room: "Room 102",
      status: "active",
      createdAt: "2024-01-15",
      description:
        "Secondary section for Grade 1 students with interactive learning approach",
      schedule: "Monday-Friday, 8:00 AM - 2:00 PM",
      subjects: ["Mathematics", "English", "Science", "Art"],
      lastUpdated: "2024-01-18",
    },
    {
      id: "3",
      name: "Section A",
      level: "Grade 2",
      capacity: 32,
      currentStudents: 30,
      teacher: "Ms. Davis",
      teacherId: "T003",
      room: "Room 201",
      status: "active",
      createdAt: "2024-01-15",
      description:
        "Advanced section for Grade 2 students with enhanced curriculum",
      schedule: "Monday-Friday, 8:00 AM - 2:30 PM",
      subjects: ["Mathematics", "English", "Science", "Computer Studies"],
      lastUpdated: "2024-01-22",
    },
    {
      id: "4",
      name: "Section C",
      level: "Grade 10",
      capacity: 25,
      currentStudents: 0,
      teacher: "TBD",
      teacherId: null,
      room: "Room 301",
      status: "inactive",
      createdAt: "2024-01-10",
      description:
        "New section for Grade 10 students - teacher assignment pending",
      schedule: "Monday-Friday, 9:00 AM - 3:00 PM",
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
      lastUpdated: "2024-01-10",
    },
    {
      id: "5",
      name: "Section B",
      level: "Grade 5",
      capacity: 28,
      currentStudents: 26,
      teacher: "Dr. Wilson",
      teacherId: "T004",
      room: "Room 105",
      status: "active",
      createdAt: "2024-01-12",
      description: "Middle grade section with focus on STEM education",
      schedule: "Monday-Friday, 8:30 AM - 2:30 PM",
      subjects: ["Mathematics", "Science", "Technology", "English"],
      lastUpdated: "2024-01-25",
    },
  ]);

  const filteredSections = sections.filter(
    (section) =>
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.name.trim() ||
      !formData.level.trim() ||
      !formData.capacity.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isEditing && editingId) {
      // Update existing section
      setSections((prev) =>
        prev.map((section) =>
          section.id === editingId
            ? {
                ...section,
                name: formData.name,
                level: formData.level,
                capacity: parseInt(formData.capacity),
                teacher: formData.teacher || "TBD",
                room: formData.room,
                description: formData.description,
                schedule: formData.schedule,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : section
        )
      );
      setIsEditing(false);
      setEditingId(null);
      toast.success("Section updated successfully!");
    } else {
      // Create new section
      const newSection = {
        id: (sections.length + 1).toString(),
        name: formData.name,
        level: formData.level,
        capacity: parseInt(formData.capacity),
        currentStudents: 0,
        teacher: formData.teacher || "TBD",
        teacherId: formData.teacher
          ? `T${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`
          : null,
        room: formData.room,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
        description: formData.description,
        schedule: formData.schedule,
        subjects: ["Mathematics", "English", "Science"],
        lastUpdated: new Date().toISOString().split("T")[0],
      };
      setSections((prev) => [newSection, ...prev]);
      toast.success("Section created successfully!");
    }

    setFormData({
      name: "",
      level: "",
      capacity: "",
      teacher: "",
      room: "",
      description: "",
      schedule: "",
    });
    setShowAddModal(false);
  };

  const handleView = (section) => {
    setSelectedSection(section);
    setShowViewModal(true);
    toast.success(`Viewing section: ${section.name} - ${section.level}`);
  };

  const handleEdit = (section) => {
    setFormData({
      name: section.name,
      level: section.level,
      capacity: section.capacity.toString(),
      teacher: section.teacher === "TBD" ? "" : section.teacher,
      room: section.room,
      description: section.description,
      schedule: section.schedule,
    });
    setIsEditing(true);
    setEditingId(section.id);
    setShowAddModal(true);
    toast.info(`Editing section: ${section.name} - ${section.level}`);
  };

  const handleDelete = (id) => {
    const section = sections.find((s) => s.id === id);
    if (section.currentStudents > 0) {
      toast.error(
        `Cannot delete section with ${section.currentStudents} enrolled students`
      );
      return;
    }
    setSections((prev) => prev.filter((section) => section.id !== id));
    toast.success("Section deleted successfully!");
  };

  const toggleStatus = (id) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id
          ? {
              ...section,
              status: section.status === "active" ? "inactive" : "active",
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : section
      )
    );
    toast.success("Section status updated!");
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getCapacityColor = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  const getCapacityIcon = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90)
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    if (percentage >= 75) return <Clock className="h-4 w-4 text-yellow-600" />;
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Level",
      "Teacher",
      "Room",
      "Capacity",
      "Current Students",
      "Status",
      "Created Date",
    ];
    const csvContent = [
      headers.join(","),
      ...sections.map((section) =>
        [
          section.id,
          `"${section.name}"`,
          `"${section.level}"`,
          `"${section.teacher}"`,
          section.room,
          section.capacity,
          section.currentStudents,
          section.status,
          section.createdAt,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sections_data.csv";
    a.click();
    toast.success("Data exported to CSV!");
  };

  const exportToText = () => {
    const textContent = sections
      .map(
        (section) =>
          `ID: ${section.id}\nName: ${section.name}\nLevel: ${
            section.level
          }\nTeacher: ${section.teacher}\nRoom: ${section.room}\nCapacity: ${
            section.capacity
          }\nCurrent Students: ${section.currentStudents}\nStatus: ${
            section.status
          }\nCreated: ${section.createdAt}\nDescription: ${
            section.description
          }\nSchedule: ${section.schedule}\n${"=".repeat(50)}\n`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sections_data.txt";
    a.click();
    toast.success("Data exported to text file!");
  };

  const copyToClipboard = () => {
    const textContent = sections
      .map(
        (section) =>
          `${section.name} - ${section.level} | Teacher: ${section.teacher} | Room: ${section.room} | Students: ${section.currentStudents}/${section.capacity}`
      )
      .join("\n");

    navigator.clipboard.writeText(textContent).then(() => {
      toast.success("Data copied to clipboard!");
    });
  };

  const printData = () => {
    const printContent = `
      <h2>Section Management Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>ID</th><th>Name</th><th>Level</th><th>Teacher</th><th>Room</th><th>Capacity</th><th>Current Students</th><th>Status</th><th>Created</th>
        </tr>
        ${sections
          .map(
            (section) => `
          <tr>
            <td>${section.id}</td>
            <td>${section.name}</td>
            <td>${section.level}</td>
            <td>${section.teacher}</td>
            <td>${section.room}</td>
            <td>${section.capacity}</td>
            <td>${section.currentStudents}</td>
            <td>${section.status}</td>
            <td>${section.createdAt}</td>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
            Manage Sections
          </h1>
          <p className="text-muted-foreground">
            Manage class sections and student groups
          </p>
        </div>
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
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-eduos-primary hover:bg-eduos-secondary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>
      </div>

      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              Class Sections ({sections.length})
            </span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Total: {sections.length}
            </Badge>
          </CardTitle>
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search sections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 px-5 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-semibold">Section</th>
                  <th className="text-left p-3 font-semibold">Level</th>
                  <th className="text-left p-3 font-semibold">Teacher</th>
                  <th className="text-left p-3 font-semibold">Room</th>
                  <th className="text-left p-3 font-semibold">Capacity</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Created</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSections.map((section) => (
                  <tr
                    key={section.id}
                    className="border-b hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-3">
                      <div className="font-medium">{section.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {section.description}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <GraduationCap className="h-3 w-3" />
                        {section.level}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-gray-400" />
                        <span
                          className={
                            section.teacher === "TBD"
                              ? "text-red-500"
                              : "text-gray-900"
                          }
                        >
                          {section.teacher}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        {section.room}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getCapacityIcon(
                          section.currentStudents,
                          section.capacity
                        )}
                        <div>
                          <span
                            className={getCapacityColor(
                              section.currentStudents,
                              section.capacity
                            )}
                          >
                            {section.currentStudents}/{section.capacity}
                          </span>
                          <div className="text-xs text-gray-500">
                            {Math.round(
                              (section.currentStudents / section.capacity) * 100
                            )}
                            % full
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        className={`cursor-pointer ${getStatusColor(
                          section.status
                        )}`}
                        onClick={() => toggleStatus(section.id)}
                      >
                        {section.status === "active" ? (
                          <ToggleRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ToggleLeft className="h-3 w-3 mr-1" />
                        )}
                        {section.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{section.createdAt}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(section)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(section)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(section.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          disabled={section.currentStudents > 0}
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

          {filteredSections.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Scissors className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No sections found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div
              className={`sticky top-0 bg-gradient-to-r ${
                isEditing
                  ? "from-orange-500 to-red-500"
                  : "from-eduos-primary to-eduos-secondary"
              } text-white p-6 rounded-t-lg`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {isEditing ? (
                    <Edit className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                  {isEditing ? "Edit Section" : "Add New Section"}
                </h3>
                <Button
                  onClick={() => {
                    setShowAddModal(false);
                    setIsEditing(false);
                    setEditingId(null);
                    setFormData({
                      name: "",
                      level: "",
                      capacity: "",
                      teacher: "",
                      room: "",
                      description: "",
                      schedule: "",
                    });
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sectionName">Section Name *</Label>
                  <Input
                    id="sectionName"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Section A"
                    className="transition-all duration-300 focus:border-eduos-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sectionLevel">Level *</Label>
                  <Input
                    id="sectionLevel"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    placeholder="e.g., Grade 1"
                    className="transition-all duration-300 focus:border-eduos-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="e.g., 30"
                    className="transition-all duration-300 focus:border-eduos-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Input
                    id="room"
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    placeholder="e.g., Room 101"
                    className="transition-all duration-300 focus:border-eduos-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacher">Assigned Teacher</Label>
                <Input
                  id="teacher"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                  placeholder="e.g., Mrs. Johnson"
                  className="transition-all duration-300 focus:border-eduos-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  placeholder="e.g., Monday-Friday, 8:00 AM - 2:00 PM"
                  className="transition-all duration-300 focus:border-eduos-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the section..."
                  className="min-h-[100px] transition-all duration-300 focus:border-eduos-primary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSubmit}
                  className={`flex-1 transition-all duration-300 ${
                    isEditing
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-eduos-primary hover:bg-eduos-secondary"
                  }`}
                >
                  {isEditing ? (
                    <Edit className="h-4 w-4 mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  {isEditing ? "Update Section" : "Create Section"}
                </Button>
                <Button
                  onClick={() => {
                    setShowAddModal(false);
                    setIsEditing(false);
                    setEditingId(null);
                    setFormData({
                      name: "",
                      level: "",
                      capacity: "",
                      teacher: "",
                      room: "",
                      description: "",
                      schedule: "",
                    });
                  }}
                  variant="outline"
                  className="px-6"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Section Modal */}
      {showViewModal && selectedSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-6 rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {selectedSection.name} - {selectedSection.level}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge className="bg-white/20 text-white">
                      <Building className="h-3 w-3 mr-1" />
                      {selectedSection.room}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <Users className="h-3 w-3 mr-1" />
                      {selectedSection.currentStudents}/
                      {selectedSection.capacity}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <UserCheck className="h-3 w-3 mr-1" />
                      {selectedSection.teacher}
                    </Badge>
                    <Badge
                      className={`${getStatusColor(
                        selectedSection.status
                      )} border-white`}
                    >
                      {selectedSection.status}
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
                      <MapPin className="h-4 w-4" />
                      Section Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Level:</span>{" "}
                        {selectedSection.level}
                      </p>
                      <p>
                        <span className="font-medium">Room:</span>{" "}
                        {selectedSection.room}
                      </p>
                      <p>
                        <span className="font-medium">Teacher ID:</span>{" "}
                        {selectedSection.teacherId || "Not assigned"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      Schedule
                    </h4>
                    <p className="text-sm">{selectedSection.schedule}</p>
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
                        <span>Current Students:</span>
                        <span
                          className={getCapacityColor(
                            selectedSection.currentStudents,
                            selectedSection.capacity
                          )}
                        >
                          {selectedSection.currentStudents}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Capacity:</span>
                        <span>{selectedSection.capacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (selectedSection.currentStudents /
                              selectedSection.capacity) *
                              100 >=
                            90
                              ? "bg-red-500"
                              : (selectedSection.currentStudents /
                                  selectedSection.capacity) *
                                  100 >=
                                75
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${
                              (selectedSection.currentStudents /
                                selectedSection.capacity) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {Math.round(
                          (selectedSection.currentStudents /
                            selectedSection.capacity) *
                            100
                        )}
                        % full
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      Timeline
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Created:</span>{" "}
                        {selectedSection.createdAt}
                      </p>
                      <p>
                        <span className="font-medium">Last Updated:</span>{" "}
                        {selectedSection.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  Description
                </h4>
                <p className="text-gray-700">{selectedSection.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <GraduationCap className="h-4 w-4" />
                  Subjects
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSection.subjects.map((subject, index) => (
                    <Badge key={index} variant="outline">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(selectedSection);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Section
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

export default ManageSection;
