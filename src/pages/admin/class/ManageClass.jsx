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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ManageClass = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

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
    },
    {
      id: 2,
      name: "Primary 2B",
      level: "Primary",
      students: 28,
      subjects: 7,
      teacher: "Mr. Smith",
      capacity: 30,
    },
    {
      id: 3,
      name: "JSS 1C",
      level: "Junior Secondary",
      students: 22,
      subjects: 8,
      teacher: "Dr. Williams",
      capacity: 35,
    },
    {
      id: 4,
      name: "JSS 2A",
      level: "Junior Secondary",
      students: 30,
      subjects: 10,
      teacher: "Mrs. Brown",
      capacity: 35,
    },
    {
      id: 5,
      name: "SSS 1B",
      level: "Senior Secondary",
      students: 32,
      subjects: 12,
      teacher: "Prof. Davis",
      capacity: 35,
    },
    {
      id: 6,
      name: "SSS 3A",
      level: "Senior Secondary",
      students: 35,
      subjects: 14,
      teacher: "Dr. Wilson",
      capacity: 40,
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
    toast.info(`Class Details - ${classItem.name}`, {
      description: `Level: ${classItem.level} • Students: ${classItem.students} • Teacher: ${classItem.teacher}`,
      icon: <Eye className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleEdit = (classItem) => {
    toast.info(`Edit Class - ${classItem.name}`, {
      description: `Opening editor for ${classItem.level} class`,
      icon: <Edit className="h-4 w-4" />,
      duration: 3000,
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
      ],
      ...filteredClasses.map((cls) => [
        cls.id,
        cls.name,
        cls.level,
        cls.students,
        cls.capacity,
        cls.subjects,
        cls.teacher,
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
          `${cls.id}. ${cls.name} (${cls.level})\nStudents: ${cls.students}/${cls.capacity} | Subjects: ${cls.subjects} | Teacher: ${cls.teacher}`
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
          `${cls.id}\t${cls.name}\t${cls.level}\t${cls.students}\t${cls.capacity}\t${cls.subjects}\t${cls.teacher}`
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
    </div>
  );
};

export default ManageClass;
