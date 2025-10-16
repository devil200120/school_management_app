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
  Layers,
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

const ManageLevel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for demonstration with enhanced state management
  const [levels, setLevels] = useState([
    {
      id: 1,
      name: "Primary 1",
      code: "P1",
      description: "First year of primary education",
      category: "Primary",
      minAge: 6,
      maxAge: 7,
      totalStudents: 120,
      totalSections: 4,
      subjects: 8,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Primary 6",
      code: "P6",
      description: "Final year of primary education",
      category: "Primary",
      minAge: 11,
      maxAge: 12,
      totalStudents: 95,
      totalSections: 3,
      subjects: 10,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      name: "JSS 1",
      code: "JS1",
      description: "First year junior secondary school",
      category: "Junior Secondary",
      minAge: 12,
      maxAge: 13,
      totalStudents: 80,
      totalSections: 3,
      subjects: 12,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 4,
      name: "SSS 3",
      code: "SS3",
      description: "Final year senior secondary school",
      category: "Senior Secondary",
      minAge: 17,
      maxAge: 18,
      totalStudents: 65,
      totalSections: 2,
      subjects: 15,
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      id: 5,
      name: "Pre-Nursery",
      code: "PN",
      description: "Pre-nursery preparatory level",
      category: "Early Years",
      minAge: 3,
      maxAge: 4,
      totalStudents: 0,
      totalSections: 0,
      subjects: 5,
      status: "inactive",
      createdAt: "2024-01-05",
    },
    {
      id: 6,
      name: "JSS 3",
      code: "JS3",
      description: "Final year junior secondary school",
      category: "Junior Secondary",
      minAge: 14,
      maxAge: 15,
      totalStudents: 88,
      totalSections: 3,
      subjects: 14,
      status: "active",
      createdAt: "2024-01-15",
    },
  ]);

  // Filter levels based on search term
  const filteredLevels = levels.filter(
    (level) =>
      level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Action handlers
  const handleAddNew = () => {
    toast.success("Add New Level", {
      description: "Redirecting to level creation form...",
      icon: <PlusCircle className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleView = (level) => {
    toast.info(`Level Details - ${level.name}`, {
      description: `Category: ${level.category} • Age: ${level.minAge}-${level.maxAge} • Students: ${level.totalStudents} • Sections: ${level.totalSections}`,
      icon: <Eye className="h-4 w-4" />,
      duration: 5000,
    });
  };

  const handleEdit = (level) => {
    toast.info(`Edit Level - ${level.name}`, {
      description: `Opening editor for ${level.category} level`,
      icon: <Edit className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleDelete = (level) => {
    setLevels((prev) => prev.filter((l) => l.id !== level.id));
    toast.error(`Level Removed`, {
      description: `${level.name} has been removed from the system.`,
      icon: <Trash className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleToggleStatus = (level) => {
    const newStatus = level.status === "active" ? "inactive" : "active";
    setLevels((prev) =>
      prev.map((l) => (l.id === level.id ? { ...l, status: newStatus } : l))
    );
    toast.success(
      `Level ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      {
        description: `${level.name} is now ${newStatus}.`,
        icon:
          newStatus === "active" ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          ),
        duration: 3000,
      }
    );
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "ID",
        "Level Name",
        "Code",
        "Category",
        "Age Range",
        "Students",
        "Sections",
        "Subjects",
        "Status",
      ],
      ...filteredLevels.map((level) => [
        level.id,
        level.name,
        level.code,
        level.category,
        `${level.minAge}-${level.maxAge}`,
        level.totalStudents,
        level.totalSections,
        level.subjects,
        level.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "academic_levels.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredLevels.length} academic levels to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredLevels
      .map(
        (level) =>
          `${level.id}. ${level.name} (${level.code})\nCategory: ${level.category} | Age: ${level.minAge}-${level.maxAge} | Students: ${level.totalStudents} | Sections: ${level.totalSections} | Status: ${level.status}`
      )
      .join("\n\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "academic_levels.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Text Export Complete", {
      description: `Successfully exported ${filteredLevels.length} academic levels to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print Dialog Opened", {
      description: `Preparing to print ${filteredLevels.length} academic level records.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredLevels
      .map(
        (level) =>
          `${level.id}\t${level.name}\t${level.code}\t${level.category}\t${level.minAge}-${level.maxAge}\t${level.totalStudents}\t${level.totalSections}\t${level.subjects}\t${level.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredLevels.length} academic level records to clipboard.`,
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
          Manage Academic Levels
        </h2>
        <Button
          className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          onClick={handleAddNew}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Level
        </Button>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-semibold">
              Academic Level Management
            </span>
            <Badge
              variant="secondary"
              className="ml-auto bg-white/20 text-white"
            >
              {filteredLevels.length} Total
            </Badge>
          </CardTitle>
          <div className="flex justify-between items-center mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
              <Input
                placeholder="Search levels, codes, or categories..."
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
                <TableHead className="font-semibold">Level Name</TableHead>
                <TableHead className="font-semibold">Code</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold text-center">
                  Age Range
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Students
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Sections
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
              {filteredLevels.length > 0 ? (
                filteredLevels.map((level) => (
                  <TableRow
                    key={level.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-eduos-primary" />
                        {level.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <Badge variant="outline" className="font-medium">
                        {level.code}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <Badge
                        variant="secondary"
                        className={
                          level.category === "Primary"
                            ? "bg-blue-100 text-blue-800"
                            : level.category === "Junior Secondary"
                            ? "bg-green-100 text-green-800"
                            : level.category === "Senior Secondary"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                        }
                      >
                        {level.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">
                        {level.minAge}-{level.maxAge} years
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">
                          {level.totalStudents}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="font-medium">
                        {level.totalSections}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <BookOpen className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{level.subjects}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          level.status === "active" ? "default" : "secondary"
                        }
                        className={
                          level.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
                        }
                        onClick={() => handleToggleStatus(level)}
                      >
                        {level.status === "active" ? (
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
                          onClick={() => handleView(level)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition-all duration-200"
                          onClick={() => handleEdit(level)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-200"
                          onClick={() => handleDelete(level)}
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
                    colSpan={9}
                    className="text-center py-8 text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <GraduationCap className="h-12 w-12 text-gray-300" />
                      <p className="text-lg font-medium">
                        No academic levels found
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

export default ManageLevel;
