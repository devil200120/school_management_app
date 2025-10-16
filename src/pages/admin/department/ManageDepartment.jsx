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
import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Search,
  FileText,
  FileSpreadsheet,
  Printer,
  Copy,
  Download,
  Check,
  X,
  Eye,
  Edit,
  Trash,
  PlusCircle,
  Building,
  Users,
} from "lucide-react";
import { toast } from "sonner";

const ManageDepartment = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for demonstration with state management
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Science Department",
      level: "High School",
      head: "Dr. Johnson",
      teachers: 12,
      subjects: 8,
      status: "active",
    },
    {
      id: 2,
      name: "Arts Department",
      level: "College",
      head: "Prof. Smith",
      teachers: 8,
      subjects: 6,
      status: "active",
    },
    {
      id: 3,
      name: "Mathematics Department",
      level: "Middle School",
      head: "Mrs. Williams",
      teachers: 6,
      subjects: 4,
      status: "active",
    },
    {
      id: 4,
      name: "Sports Department",
      level: "Elementary",
      head: "Coach Brown",
      teachers: 4,
      subjects: 2,
      status: "inactive",
    },
    {
      id: 5,
      name: "Languages Department",
      level: "High School",
      head: "Dr. Davis",
      teachers: 10,
      subjects: 5,
      status: "active",
    },
    {
      id: 6,
      name: "Technology Department",
      level: "College",
      head: "Prof. Wilson",
      teachers: 7,
      subjects: 6,
      status: "active",
    },
  ]);

  // Filter departments based on search term
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Action handlers
  const handleAddNew = () => {
    toast.success("Add New Department", {
      description: "Redirecting to department creation form...",
      icon: <PlusCircle className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleView = (dept) => {
    toast.info(`Department Details - ${dept.name}`, {
      description: `Level: ${dept.level} • Head: ${dept.head} • Teachers: ${dept.teachers} • Subjects: ${dept.subjects}`,
      icon: <Eye className="h-4 w-4" />,
      duration: 5000,
    });
  };

  const handleEdit = (dept) => {
    toast.info(`Edit Department - ${dept.name}`, {
      description: `Opening editor for ${dept.level} department`,
      icon: <Edit className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleDelete = (dept) => {
    setDepartments((prev) => prev.filter((d) => d.id !== dept.id));
    toast.error(`Department Removed`, {
      description: `${dept.name} has been removed from the system.`,
      icon: <Trash className="h-4 w-4" />,
      duration: 4000,
    });
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "ID",
        "Department Name",
        "Level",
        "Head",
        "Teachers",
        "Subjects",
        "Status",
      ],
      ...filteredDepartments.map((dept) => [
        dept.id,
        dept.name,
        dept.level,
        dept.head,
        dept.teachers,
        dept.subjects,
        dept.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "departments.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredDepartments.length} departments to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredDepartments
      .map(
        (dept) =>
          `${dept.id}. ${dept.name} (${dept.level})\nHead: ${dept.head} | Teachers: ${dept.teachers} | Subjects: ${dept.subjects} | Status: ${dept.status}`
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
      description: `Successfully exported ${filteredDepartments.length} departments to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print Dialog Opened", {
      description: `Preparing to print ${filteredDepartments.length} department records.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredDepartments
      .map(
        (dept) =>
          `${dept.id}\t${dept.name}\t${dept.level}\t${dept.head}\t${dept.teachers}\t${dept.subjects}\t${dept.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredDepartments.length} department records to clipboard.`,
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
          Manage Departments
        </h2>
        <Button
          className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          onClick={handleAddNew}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            <span className="text-xl font-semibold">Department Management</span>
            <Badge
              variant="secondary"
              className="ml-auto bg-white/20 text-white"
            >
              {filteredDepartments.length} Total
            </Badge>
          </CardTitle>
          <div className="flex justify-between items-center mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
              <Input
                placeholder="Search departments, levels, or heads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 min-w-[300px]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10 transition-all duration-200"
                onClick={handleExportCSV}
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10 transition-all duration-200"
                onClick={handleExportText}
              >
                <FileText className="h-4 w-4 mr-2" />
                Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10 transition-all duration-200"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10 transition-all duration-200"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-100">
                <TableHead className="font-semibold">Department Name</TableHead>
                <TableHead className="font-semibold">Level</TableHead>
                <TableHead className="font-semibold">Department Head</TableHead>
                <TableHead className="font-semibold text-center">
                  Teachers
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Subjects
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((department) => (
                  <TableRow
                    key={department.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-eduos-primary" />
                        {department.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <Badge variant="outline" className="font-medium">
                        {department.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {department.head}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">
                          {department.teachers}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="font-medium">
                        {department.subjects}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          department.status === "active"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          department.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }
                      >
                        {department.status === "active" ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <X className="h-3 w-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200"
                          onClick={() => handleView(department)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition-all duration-200"
                          onClick={() => handleEdit(department)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-200"
                          onClick={() => handleDelete(department)}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Building className="h-12 w-12 text-gray-300" />
                      <p className="text-lg font-medium">
                        No departments found
                      </p>
                      <p className="text-sm">
                        Try adjusting your search criteria
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageDepartment;
