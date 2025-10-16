import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Search,
  FileText,
  FileSpreadsheet,
  Printer,
  Copy,
  Eye,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const ManageTeamResults = () => {
  // State management
  const [formData, setFormData] = useState({
    level: "",
    class: "",
    session: "",
    term: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Sample data for the table
  const [students, setStudents] = useState([
    {
      id: 1,
      admissionNo: "ADM-2023-001",
      name: "John Doe",
      class: "Class 10A",
      term: "First Term",
      session: "2023/2024",
      totalSubjects: 8,
    },
    {
      id: 2,
      admissionNo: "ADM-2023-002",
      name: "Jane Smith",
      class: "Class 10A",
      term: "First Term",
      session: "2023/2024",
      totalSubjects: 8,
    },
    {
      id: 3,
      admissionNo: "ADM-2023-003",
      name: "Alice Johnson",
      class: "Class 10A",
      term: "First Term",
      session: "2023/2024",
      totalSubjects: 8,
    },
    {
      id: 4,
      admissionNo: "ADM-2023-004",
      name: "Bob Brown",
      class: "Class 10A",
      term: "First Term",
      session: "2023/2024",
      totalSubjects: 8,
    },
  ]);

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const { level, class: className, session, term } = formData;
    if (!level || !className || !session || !term) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields before proceeding.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
      return false;
    }
    return true;
  };

  // Handle Check Now
  const handleCheckNow = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowResults(true);
      toast.success("Results Loaded!", {
        description: `Successfully loaded team results for ${formData.class}.`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error Loading Results", {
        description: "Failed to load team results. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "S/N",
        "Admiss No",
        "Name",
        "Class",
        "Term",
        "Session",
        "Total Subjects",
      ],
      ...filteredStudents.map((student, index) => [
        index + 1,
        student.admissionNo,
        student.name,
        student.class,
        student.term,
        student.session,
        student.totalSubjects,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "team_results.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredStudents.length} student records.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportPDF = () => {
    toast.success("PDF Export Started", {
      description: `Generating PDF for ${filteredStudents.length} student records.`,
      icon: <FileText className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print Dialog Opened", {
      description: `Preparing to print ${filteredStudents.length} student records.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredStudents
      .map(
        (student, index) =>
          `${index + 1}\t${student.admissionNo}\t${student.name}\t${
            student.class
          }\t${student.term}\t${student.session}\t${student.totalSubjects}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredStudents.length} student records.`,
          icon: <Copy className="h-4 w-4" />,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error("Copy Failed", {
          description: "Unable to copy data to clipboard. Please try again.",
          icon: <AlertCircle className="h-4 w-4" />,
          duration: 3000,
        });
      });
  };

  const handleViewStudent = (student) => {
    toast.info(`Student Details - ${student.name}`, {
      description: `${student.admissionNo} • ${student.class} • ${student.term} ${student.session}`,
      icon: <Eye className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handlePrintStudent = (student) => {
    toast.success("Individual Print Started", {
      description: `Printing result for ${student.name} (${student.admissionNo}).`,
      icon: <Printer className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrintAllResults = () => {
    toast.success("Bulk Print Started", {
      description: `Printing all results for ${filteredStudents.length} students.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Team Results
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Class and Term for Result</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">
                Select Level <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="junior-secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="senior-secondary">
                    Senior Secondary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">
                Select Class <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.class}
                onValueChange={(value) => handleSelectChange("class", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class10a">Class 10A</SelectItem>
                  <SelectItem value="class10b">Class 10B</SelectItem>
                  <SelectItem value="class11a">Class 11A</SelectItem>
                  <SelectItem value="class12a">Class 12A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session">
                Select Session <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.session}
                onValueChange={(value) => handleSelectChange("session", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-2026">2025/2026</SelectItem>
                  <SelectItem value="2024-2025">2024/2025</SelectItem>
                  <SelectItem value="2023-2024">2023/2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">
                Select Term/Semester <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.term}
                onValueChange={(value) => handleSelectChange("term", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Term</SelectItem>
                  <SelectItem value="second">Second Term</SelectItem>
                  <SelectItem value="third">Third Term</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleCheckNow}
            disabled={isLoading}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading Results...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Check Now
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {showResults && (
        <Card className="mt-3 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white flex flex-row justify-between items-center">
            <CardTitle>Student Results</CardTitle>
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrintAllResults}
              className="hover:bg-white hover:text-eduos-primary transition-colors"
            >
              <Printer className="h-4 w-4 mr-1" />
              Print All Results
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Search students..."
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
                  className="flex items-center gap-1 hover:bg-red-50 hover:border-red-300"
                  onClick={handleExportPDF}
                >
                  <FileText className="h-4 w-4" />
                  <span>PDF</span>
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
                    <TableHead className="bg-gray-100">Admiss No</TableHead>
                    <TableHead className="bg-gray-100">Name</TableHead>
                    <TableHead className="bg-gray-100">Class</TableHead>
                    <TableHead className="bg-gray-100">Term</TableHead>
                    <TableHead className="bg-gray-100">Session</TableHead>
                    <TableHead className="bg-gray-100">
                      Total Subjects
                    </TableHead>
                    <TableHead className="bg-gray-100">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="text-blue-600">
                        {student.admissionNo}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.term}</TableCell>
                      <TableCell>{student.session}</TableCell>
                      <TableCell className="text-center">
                        {student.totalSubjects}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 transition-colors"
                            onClick={() => handleViewStudent(student)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-gray-50"
                            onClick={() => handlePrintStudent(student)}
                          >
                            <Printer className="h-3 w-3 mr-1" />
                            Print
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
      )}
    </div>
  );
};

export default ManageTeamResults;
