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
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
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
  PlusCircle,
  Edit,
  Trash,
  Search,
  ArrowUpDown,
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  Download,
  Check,
  X,
  Eye,
  Users,
  BookOpen,
  GraduationCap,
  UserCheck,
  Calendar,
  Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ManageClass = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    level: "",
    capacity: "",
    teacher: "",
    subjects: "",
    resultTemplate: "",
  });

  // Available result templates
  const resultTemplates = [
    {
      id: 1,
      name: "Primary Standard Report",
      level: "Primary",
      description: "Standard academic report template for primary school students"
    },
    {
      id: 2,
      name: "Secondary Detailed Report", 
      level: "Secondary",
      description: "Comprehensive report template with detailed analysis"
    },
    {
      id: 3,
      name: "Junior Secondary Basic",
      level: "Junior Secondary", 
      description: "Simple and clean report template for junior secondary school"
    },
    {
      id: 4,
      name: "Senior Secondary WAEC Format",
      level: "Senior Secondary",
      description: "WAEC-compliant report template with all required sections"
    }
  ];

  // Mock data for classes with state management
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Primary 1A",
      level: "Primary",
      students: 25,
      subjects: 6,
      teacher: "Mrs. Johnson",
      capacity: 30,
      resultTemplate: "Primary Standard Report",
    },
    {
      id: 2,
      name: "Primary 2B",
      level: "Primary",
      students: 28,
      subjects: 7,
      teacher: "Mr. Smith",
      capacity: 30,
      resultTemplate: "Primary Standard Report",
    },
    {
      id: 3,
      name: "JSS 1C",
      level: "Junior Secondary",
      students: 22,
      subjects: 8,
      teacher: "Dr. Williams",
      capacity: 35,
      resultTemplate: "Junior Secondary Basic",
    },
    {
      id: 4,
      name: "JSS 2A",
      level: "Junior Secondary",
      students: 30,
      subjects: 10,
      teacher: "Mrs. Brown",
      capacity: 35,
      resultTemplate: "Junior Secondary Basic",
    },
    {
      id: 5,
      name: "SSS 1B",
      level: "Senior Secondary",
      students: 32,
      subjects: 12,
      teacher: "Prof. Davis",
      capacity: 35,
      resultTemplate: "Secondary Detailed Report",
    },
    {
      id: 6,
      name: "SSS 3A",
      level: "Senior Secondary",
      students: 35,
      subjects: 14,
      teacher: "Dr. Wilson",
      capacity: 40,
      resultTemplate: "Senior Secondary WAEC Format",
    },
  ]);

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Action handlers
  const handleAddNew = () => {
    toast.success("Add New Class", {
      description: "Redirecting to class creation form...",
      icon: <PlusCircle className="h-4 w-4" />,
      duration: 3000,
    });
    // navigate('/admin/class/add');
  };

  const handleView = (classItem) => {
    setSelectedClass(classItem);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (classItem) => {
    setSelectedClass(classItem);
    setEditForm({
      name: classItem.name,
      level: classItem.level,
      capacity: classItem.capacity.toString(),
      teacher: classItem.teacher,
      subjects: classItem.subjects.toString(),
      resultTemplate: classItem.resultTemplate || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateClass = () => {
    if (
      !editForm.name ||
      !editForm.level ||
      !editForm.capacity ||
      !editForm.teacher ||
      !editForm.subjects
    ) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
        duration: 3000,
      });
      return;
    }

    if (isNaN(Number(editForm.capacity)) || Number(editForm.capacity) <= 0) {
      toast.error("Invalid Capacity", {
        description: "Please enter a valid positive number for capacity.",
        duration: 3000,
      });
      return;
    }

    if (isNaN(Number(editForm.subjects)) || Number(editForm.subjects) <= 0) {
      toast.error("Invalid Subjects", {
        description: "Please enter a valid positive number for subjects.",
        duration: 3000,
      });
      return;
    }

    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === selectedClass.id
          ? {
              ...cls,
              name: editForm.name,
              level: editForm.level,
              capacity: Number(editForm.capacity),
              teacher: editForm.teacher,
              subjects: Number(editForm.subjects),
              resultTemplate: editForm.resultTemplate,
            }
          : cls
      )
    );

    setIsEditDialogOpen(false);
    setSelectedClass(null);
    setEditForm({
      name: "",
      level: "",
      capacity: "",
      teacher: "",
      subjects: "",
      resultTemplate: "",
    });

    toast.success("Class Updated", {
      description: `${editForm.name} has been updated successfully.`,
      icon: <Check className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleDelete = (classItem) => {
    setClasses((prev) => prev.filter((c) => c.id !== classItem.id));
    toast.error(`Class Removed`, {
      description: `${classItem.name} (${classItem.level}) has been removed from the system.`,
      icon: <Trash className="h-4 w-4" />,
      duration: 4000,
    });
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "ID",
        "Class Name",
        "Level",
        "Students",
        "Capacity",
        "Subjects",
        "Teacher",
        "Result Template",
      ],
      ...filteredClasses.map((cls) => [
        cls.id,
        cls.name,
        cls.level,
        cls.students,
        cls.capacity,
        cls.subjects,
        cls.teacher,
        cls.resultTemplate || "Not Set",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "classes.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredClasses.length} classes to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredClasses
      .map(
        (cls) =>
          `${cls.id}. ${cls.name} (${cls.level})\nStudents: ${cls.students}/${cls.capacity} | Subjects: ${cls.subjects} | Teacher: ${cls.teacher}\nResult Template: ${cls.resultTemplate || "Not Set"}`
      )
      .join("\n\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "classes.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Text Export Complete", {
      description: `Successfully exported ${filteredClasses.length} classes to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print Dialog Opened", {
      description: `Preparing to print ${filteredClasses.length} class records.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredClasses
      .map(
        (cls) =>
          `${cls.id}\t${cls.name}\t${cls.level}\t${cls.students}\t${cls.capacity}\t${cls.subjects}\t${cls.teacher}\t${cls.resultTemplate || "Not Set"}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredClasses.length} class records to clipboard.`,
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

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Classes
        </h2>
        <Button
          onClick={handleAddNew}
          className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Class
        </Button>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Class Management</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search classes..."
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
              <TableCaption>A list of all classes in the system.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">
                    <div className="flex items-center">
                      S/N
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="bg-gray-100">
                    <div className="flex items-center">
                      Class Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="bg-gray-100">
                    <div className="flex items-center">
                      Level
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="bg-gray-100">Students</TableHead>
                  <TableHead className="bg-gray-100">Subjects</TableHead>
                  <TableHead className="bg-gray-100">Teacher</TableHead>
                  <TableHead className="bg-gray-100">Result Template</TableHead>
                  <TableHead className="bg-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((cls) => (
                  <TableRow
                    key={cls.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{cls.id}</TableCell>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-100 text-purple-800">
                        {cls.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{cls.students}</span>
                        <span className="text-gray-500">/{cls.capacity}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-green-500" />
                        <span>{cls.subjects}</span>
                      </div>
                    </TableCell>
                    <TableCell>{cls.teacher}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        {cls.resultTemplate || "Not Set"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50"
                          onClick={() => handleView(cls)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50"
                          onClick={() => handleEdit(cls)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50"
                          onClick={() => handleDelete(cls)}
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

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{filteredClasses.length}</span> of{" "}
              <span className="font-medium">{classes.length}</span> classes
              <span className="ml-4 text-eduos-primary font-medium">
                Total Students:{" "}
                {classes.reduce((sum, cls) => sum + cls.students, 0)}
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

      {/* View Class Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-eduos-primary" />
              Class Details
            </DialogTitle>
          </DialogHeader>
          {selectedClass && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Class ID
                  </label>
                  <p className="text-sm font-semibold">#{selectedClass.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Class Name
                  </label>
                  <p className="text-sm font-semibold">{selectedClass.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Education Level
                  </label>
                  <Badge className="bg-purple-100 text-purple-800">
                    {selectedClass.level}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Class Teacher
                  </label>
                  <p className="text-sm flex items-center gap-1">
                    <UserCheck className="h-3 w-3 text-blue-500" />
                    {selectedClass.teacher}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Student Enrollment
                  </label>
                  <p className="text-sm flex items-center gap-1">
                    <Users className="h-3 w-3 text-green-500" />
                    <span className="font-medium">
                      {selectedClass.students}
                    </span>
                    <span className="text-gray-500">
                      / {selectedClass.capacity}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Total Subjects
                  </label>
                  <p className="text-sm flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-orange-500" />
                    {selectedClass.subjects} subjects
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Result Template
                  </label>
                  <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                    {selectedClass.resultTemplate || "Not Set"}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Class Status
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Capacity Utilization:</span>
                    <span className="font-medium">
                      {Math.round(
                        (selectedClass.students / selectedClass.capacity) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        selectedClass.students / selectedClass.capacity > 0.9
                          ? "bg-red-500"
                          : selectedClass.students / selectedClass.capacity >
                            0.7
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${
                          (selectedClass.students / selectedClass.capacity) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Additional Information
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  This {selectedClass.level} class is managed by{" "}
                  {selectedClass.teacher} with {selectedClass.subjects} subjects
                  and has space for{" "}
                  {selectedClass.capacity - selectedClass.students} more
                  students.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-eduos-primary" />
              Edit Class Information
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Class Name *</Label>
              <Input
                id="editName"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter class name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editLevel">Education Level *</Label>
              <Select
                value={editForm.level}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, level: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Junior Secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="Senior Secondary">
                    Senior Secondary
                  </SelectItem>
                  <SelectItem value="Elementary">Elementary</SelectItem>
                  <SelectItem value="Middle School">Middle School</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editCapacity">Class Capacity *</Label>
                <Input
                  id="editCapacity"
                  type="number"
                  min="1"
                  max="100"
                  value={editForm.capacity}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      capacity: e.target.value,
                    }))
                  }
                  placeholder="30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editSubjects">Total Subjects *</Label>
                <Input
                  id="editSubjects"
                  type="number"
                  min="1"
                  max="20"
                  value={editForm.subjects}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      subjects: e.target.value,
                    }))
                  }
                  placeholder="8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editTeacher">Class Teacher *</Label>
              <Input
                id="editTeacher"
                value={editForm.teacher}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, teacher: e.target.value }))
                }
                placeholder="Enter teacher name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resultTemplate">Result Template</Label>
              <Select
                value={editForm.resultTemplate}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, resultTemplate: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select result template" />
                </SelectTrigger>
                <SelectContent>
                  {resultTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.name}>
                      <div className="flex flex-col">
                        <span className="font-medium">{template.name}</span>
                        <span className="text-xs text-gray-500">{template.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Select a result template that will be used for generating report cards for this class
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                Preview:
              </h4>
              <p className="text-sm text-blue-700">
                <strong>Class:</strong> {editForm.name || "Not specified"}
                <br />
                <strong>Level:</strong> {editForm.level || "Not selected"}
                <br />
                <strong>Capacity:</strong> {editForm.capacity || "0"} students
                <br />
                <strong>Teacher:</strong> {editForm.teacher || "Not assigned"}
                <br />
                <strong>Result Template:</strong> {editForm.resultTemplate || "Not selected"}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateClass}>
              <Check className="h-4 w-4 mr-2" />
              Update Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageClass;
