import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
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
  Copy,
  Download,
  Check,
  Eye,
  Edit,
  Edit2,
  Trash2,
  Plus,
  Building2,
  Users,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const ManageDepartment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    level: "",
    head: "",
    teachers: "",
    subjects: "",
    status: "",
    description: "",
    established: "",
  });

  // Sample departments data
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Computer Science",
      code: "CS",
      level: "Undergraduate",
      head: "Dr. Smith Johnson",
      teachers: 15,
      subjects: 8,
      status: "active",
      capacity: 120,
      description:
        "Leading department in computer science and technology education.",
      established: "1995",
    },
    {
      id: 2,
      name: "Mathematics",
      code: "MATH",
      level: "Graduate",
      head: "Prof. Alice Wilson",
      teachers: 12,
      subjects: 6,
      status: "active",
      capacity: 80,
      description: "Excellence in mathematical education and research.",
      established: "1988",
    },
    {
      id: 3,
      name: "English Literature",
      code: "ENG",
      level: "Undergraduate",
      head: "Dr. Robert Davis",
      teachers: 10,
      subjects: 5,
      status: "inactive",
      capacity: 60,
      description:
        "Department focused on English language and literature studies.",
      established: "1992",
    },
  ]);

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    toast.info("Add Department", {
      description: "Redirecting to Add Department page...",
      icon: <Plus className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleViewDepartment = (department) => {
    setSelectedDepartment(department);
    setIsViewDialogOpen(true);
    toast.success("Department Details", {
      description: `Viewing details for ${department.name}`,
      icon: <Eye className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleEditDepartment = (department) => {
    setSelectedDepartment(department);
    setEditForm({
      name: department.name,
      level: department.level,
      head: department.head,
      teachers: department.teachers.toString(),
      subjects: department.subjects.toString(),
      status: department.status,
      description: department.description || "",
      established: department.established || "",
    });
    setIsEditDialogOpen(true);
    toast.info("Edit Mode", {
      description: `Editing ${department.name} department`,
      icon: <Edit2 className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleDeleteDepartment = (id) => {
    const dept = departments.find((d) => d.id === id);
    if (dept) {
      setDepartments((prev) => prev.filter((d) => d.id !== id));
      toast.success("Department Deleted", {
        description: `${dept.name} has been removed successfully.`,
        icon: <Trash2 className="h-4 w-4" />,
        duration: 3000,
      });
    }
  };

  const handleUpdateDepartment = () => {
    if (!editForm.name || !editForm.level || !editForm.head) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 3000,
      });
      return;
    }

    setDepartments((prev) =>
      prev.map((dept) =>
        dept.id === selectedDepartment.id
          ? {
              ...dept,
              name: editForm.name,
              level: editForm.level,
              head: editForm.head,
              teachers: Number(editForm.teachers),
              subjects: Number(editForm.subjects),
              status: editForm.status,
              description: editForm.description,
              established: editForm.established,
            }
          : dept
      )
    );

    setIsEditDialogOpen(false);
    setSelectedDepartment(null);
    setEditForm({
      name: "",
      level: "",
      head: "",
      teachers: "",
      subjects: "",
      status: "",
      description: "",
      established: "",
    });

    toast.success("Department Updated", {
      description: `${editForm.name} has been updated successfully.`,
      icon: <Check className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportCSV = () => {
    const csvContent =
      "ID,Name,Level,Head,Teachers,Subjects,Status\n" +
      filteredDepartments
        .map(
          (dept) =>
            `${dept.id},"${dept.name}","${dept.level}","${dept.head}",${dept.teachers},${dept.subjects},${dept.status}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "departments.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredDepartments.length} departments.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredDepartments
      .map(
        (dept) =>
          `${dept.id}. ${dept.name} (${dept.level})\nHead: ${dept.head} | Teachers: ${dept.teachers} | Subjects: ${dept.subjects}`
      )
      .join("\n\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "departments.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Text Export Complete", {
      description: `Successfully exported ${filteredDepartments.length} departments.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredDepartments
      .map(
        (dept) =>
          `${dept.id}\t${dept.name}\t${dept.level}\t${dept.head}\t${dept.teachers}\t${dept.subjects}\t${dept.status}`
      )
      .join("\n");

    navigator.clipboard.writeText(tableData).then(() => {
      toast.success("Copied to Clipboard", {
        description: "Department data has been copied successfully.",
        icon: <Copy className="h-4 w-4" />,
        duration: 3000,
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Clean Header Section - Unacademy Style */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Departments
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your institution departments and their details
              </p>
            </div>
            <Button
              onClick={handleAddNew}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium inline-flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              Add Department
            </Button>
          </div>
        </div>

        {/* Main Content Card - Clean Unacademy Style */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-200 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    All Departments
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {filteredDepartments.length} departments found
                  </p>
                </div>
              </div>

              {/* Search and Actions */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportCSV}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-1" />
                    CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportText}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    TXT
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Clean Modern Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="h-12 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </TableHead>
                    <TableHead className="h-12 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </TableHead>
                    <TableHead className="h-12 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Head
                    </TableHead>
                    <TableHead className="h-12 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff
                    </TableHead>
                    <TableHead className="h-12 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subjects
                    </TableHead>
                    <TableHead className="h-12 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="h-12 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {filteredDepartments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Building2 className="h-6 w-6 text-gray-400" />
                          </div>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">
                            No departments found
                          </h3>
                          <p className="text-sm text-gray-500">
                            Get started by adding your first department.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDepartments.map((department) => (
                      <TableRow
                        key={department.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-indigo-600">
                                {department.code}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {department.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Code: {department.code}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {department.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {department.head}
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {department.teachers}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-center">
                          <Badge
                            variant="secondary"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {department.subjects}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              department.status === "active"
                                ? "default"
                                : "secondary"
                            }
                            className={`${
                              department.status === "active"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                            }`}
                          >
                            {department.status === "active"
                              ? "Active"
                              : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDepartment(department)}
                              className="h-8 w-8 p-0 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditDepartment(department)}
                              className="h-8 w-8 p-0 text-gray-400 hover:text-amber-600 hover:bg-amber-50"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteDepartment(department.id)
                              }
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clean View Department Dialog - Unacademy Style */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-600" />
              Department Details
            </DialogTitle>
          </DialogHeader>
          {selectedDepartment && (
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedDepartment.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Department Code: {selectedDepartment.code}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      selectedDepartment.status === "active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {selectedDepartment.status === "active"
                      ? "Active"
                      : "Inactive"}
                  </Badge>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Education Level
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDepartment.level}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Department Head
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDepartment.head}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Teaching Staff
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDepartment.teachers} teachers
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Total Subjects
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDepartment.subjects} subjects
                  </p>
                </div>
                {selectedDepartment.established && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Established
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedDepartment.established}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Staff-Subject Ratio
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDepartment.teachers && selectedDepartment.subjects
                      ? `${(
                          selectedDepartment.teachers /
                          selectedDepartment.subjects
                        ).toFixed(1)} : 1`
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Description */}
              {selectedDepartment.description && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    {selectedDepartment.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Clean Edit Department Dialog - Unacademy Style */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Edit className="h-5 w-5 text-indigo-600" />
              Edit Department
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="editName"
                  className="text-sm font-medium text-gray-700"
                >
                  Department Name *
                </Label>
                <Input
                  id="editName"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Enter department name"
                  className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="editLevel"
                  className="text-sm font-medium text-gray-700"
                >
                  Education Level *
                </Label>
                <Select
                  value={editForm.level}
                  onValueChange={(value) =>
                    setEditForm({ ...editForm, level: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                    <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="editHead"
                  className="text-sm font-medium text-gray-700"
                >
                  Department Head *
                </Label>
                <Input
                  id="editHead"
                  value={editForm.head}
                  onChange={(e) =>
                    setEditForm({ ...editForm, head: e.target.value })
                  }
                  placeholder="Enter head name"
                  className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="editStatus"
                  className="text-sm font-medium text-gray-700"
                >
                  Status
                </Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) =>
                    setEditForm({ ...editForm, status: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="editTeachers"
                  className="text-sm font-medium text-gray-700"
                >
                  Number of Teachers
                </Label>
                <Input
                  id="editTeachers"
                  type="number"
                  value={editForm.teachers}
                  onChange={(e) =>
                    setEditForm({ ...editForm, teachers: e.target.value })
                  }
                  placeholder="0"
                  className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="editSubjects"
                  className="text-sm font-medium text-gray-700"
                >
                  Number of Subjects
                </Label>
                <Input
                  id="editSubjects"
                  type="number"
                  value={editForm.subjects}
                  onChange={(e) =>
                    setEditForm({ ...editForm, subjects: e.target.value })
                  }
                  placeholder="0"
                  className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="editDescription"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </Label>
              <Textarea
                id="editDescription"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                placeholder="Enter department description..."
                rows={3}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="editEstablished"
                className="text-sm font-medium text-gray-700"
              >
                Established Year
              </Label>
              <Input
                id="editEstablished"
                value={editForm.established}
                onChange={(e) =>
                  setEditForm({ ...editForm, established: e.target.value })
                }
                placeholder="e.g., 1995"
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateDepartment}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Update Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageDepartment;
