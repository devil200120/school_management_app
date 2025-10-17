import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
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
  Users,
  Eye,
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  Download,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

const ViewClassStudents = () => {
  const [session, setSession] = useState("");
  const [level, setLevel] = useState("");
  const [classValue, setClassValue] = useState("");
  const [showSessionHistory, setShowSessionHistory] = useState(false);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Mock student data for demonstration
  const mockStudents = [
    {
      id: 1,
      admissionNo: "SS2023001",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      dateOfBirth: "2005-03-15",
      parentName: "Jane Doe",
      parentPhone: "08012345678",
      email: "john.doe@email.com",
      address: "123 Main Street, Lagos",
      status: "Active",
      enrollmentDate: "2023-09-01",
      section: "A",
    },
    {
      id: 2,
      admissionNo: "SS2023002",
      firstName: "Mary",
      lastName: "Smith",
      gender: "Female",
      dateOfBirth: "2005-07-22",
      parentName: "James Smith",
      parentPhone: "08087654321",
      email: "mary.smith@email.com",
      address: "456 Oak Avenue, Abuja",
      status: "Active",
      enrollmentDate: "2023-09-01",
      section: "A",
    },
    {
      id: 3,
      admissionNo: "SS2023003",
      firstName: "David",
      lastName: "Johnson",
      gender: "Male",
      dateOfBirth: "2005-11-08",
      parentName: "Linda Johnson",
      parentPhone: "08056789012",
      email: "david.johnson@email.com",
      address: "789 Pine Road, Port Harcourt",
      status: "Active",
      enrollmentDate: "2023-09-01",
      section: "B",
    },
    {
      id: 4,
      admissionNo: "SS2023004",
      firstName: "Sarah",
      lastName: "Wilson",
      gender: "Female",
      dateOfBirth: "2005-02-14",
      parentName: "Michael Wilson",
      parentPhone: "08034567890",
      email: "sarah.wilson@email.com",
      address: "321 Cedar Lane, Kano",
      status: "Active",
      enrollmentDate: "2023-09-01",
      section: "B",
    },
    {
      id: 5,
      admissionNo: "SS2023005",
      firstName: "Ahmed",
      lastName: "Ibrahim",
      gender: "Male",
      dateOfBirth: "2005-05-30",
      parentName: "Fatima Ibrahim",
      parentPhone: "08023456789",
      email: "ahmed.ibrahim@email.com",
      address: "654 Elm Street, Kaduna",
      status: "Active",
      enrollmentDate: "2023-09-01",
      section: "A",
    },
  ];

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session || !level || !classValue) {
      toast.error("Missing information", {
        description:
          "Please select Session, Level, and Class to view students.",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to fetch students
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStudents(mockStudents);

      toast.success("Students loaded successfully!", {
        description: `Found ${mockStudents.length} students in ${level} - ${classValue} for ${session} session.`,
        duration: 4000,
      });
    } catch (error) {
      console.error("Error loading students:", error);
      toast.error("Failed to load students", {
        description:
          "There was an error loading the student data. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "S/N",
        "Admission No",
        "First Name",
        "Last Name",
        "Gender",
        "Date of Birth",
        "Parent Name",
        "Parent Phone",
        "Email",
        "Section",
        "Status",
      ],
      ...filteredStudents.map((student, index) => [
        index + 1,
        student.admissionNo,
        student.firstName,
        student.lastName,
        student.gender,
        student.dateOfBirth,
        student.parentName,
        student.parentPhone,
        student.email,
        student.section,
        student.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${level}_${classValue}_${session}_students.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredStudents.length} student records to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredStudents
      .map(
        (student, index) =>
          `${index + 1}. ${student.firstName} ${student.lastName} (${
            student.admissionNo
          }) - Section ${student.section} - Parent: ${student.parentName} (${
            student.parentPhone
          })`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${level}_${classValue}_${session}_students.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Text Export Complete", {
      description: `Successfully exported ${filteredStudents.length} student records to text file.`,
      icon: <Download className="h-4 w-4" />,
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
          `${index + 1}\t${student.admissionNo}\t${student.firstName}\t${
            student.lastName
          }\t${student.gender}\t${student.parentPhone}\t${student.section}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredStudents.length} student records to clipboard.`,
          icon: <Copy className="h-4 w-4" />,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error("Copy Failed", {
          description: "Unable to copy data to clipboard. Please try again.",
          duration: 3000,
        });
      });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          View Class Students
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Level, Class and Session of Students</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="session">Session</Label>
                <select
                  id="session"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Session</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Select Level</Label>
                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Primary">Primary</option>
                  <option value="Junior Secondary">Junior Secondary</option>
                  <option value="Senior Secondary">Senior Secondary</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Select Class</Label>
                <select
                  id="class"
                  value={classValue}
                  onChange={(e) => setClassValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="Primary 1">Primary 1</option>
                  <option value="Primary 2">Primary 2</option>
                  <option value="Primary 3">Primary 3</option>
                  <option value="Primary 4">Primary 4</option>
                  <option value="Primary 5">Primary 5</option>
                  <option value="Primary 6">Primary 6</option>
                  <option value="JS 1">JS 1</option>
                  <option value="JS 2">JS 2</option>
                  <option value="JS 3">JS 3</option>
                  <option value="SS 1">SS 1</option>
                  <option value="SS 2">SS 2</option>
                  <option value="SS 3">SS 3</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="showHistory"
                checked={showSessionHistory}
                onCheckedChange={(checked) => setShowSessionHistory(checked)}
              />
              <label
                htmlFor="showHistory"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show with session history
              </label>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-eduos-primary hover:bg-eduos-secondary transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!session || !level || !classValue || isLoading}
              >
                <Users size={16} />
                <span>{isLoading ? "Loading..." : "Go Now"}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Students List */}
      {students.length > 0 && (
        <Card className="animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Class Students - {level} {classValue} ({session})
              <Badge className="bg-white text-eduos-primary ml-auto">
                {filteredStudents.length} Students
              </Badge>
            </CardTitle>
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
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-gray-100">S/N</TableHead>
                    <TableHead className="bg-gray-100">Admission No</TableHead>
                    <TableHead className="bg-gray-100">Full Name</TableHead>
                    <TableHead className="bg-gray-100">Gender</TableHead>
                    <TableHead className="bg-gray-100">Section</TableHead>
                    <TableHead className="bg-gray-100">
                      Parent Contact
                    </TableHead>
                    <TableHead className="bg-gray-100">Status</TableHead>
                    <TableHead className="bg-gray-100">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {student.admissionNo}
                      </TableCell>
                      <TableCell>
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700"
                        >
                          Section {student.section}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.parentPhone}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            student.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                          onClick={() => handleViewStudent(student)}
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredStudents.length === 0 && searchTerm && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-8 text-gray-500"
                      >
                        No students found matching &ldquo;{searchTerm}&rdquo;
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Student Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Student ID
                  </label>
                  <p className="text-sm font-semibold">{selectedStudent.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Admission Number
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedStudent.admissionNo}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Gender
                  </label>
                  <p className="text-sm">{selectedStudent.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </label>
                  <p className="text-sm">{selectedStudent.dateOfBirth}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Section
                  </label>
                  <Badge variant="outline">
                    Section {selectedStudent.section}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Parent/Guardian
                  </label>
                  <p className="text-sm">{selectedStudent.parentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Parent Phone
                  </label>
                  <p className="text-sm">{selectedStudent.parentPhone}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Email Address
                  </label>
                  <p className="text-sm">{selectedStudent.email}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Address
                  </label>
                  <p className="text-sm">{selectedStudent.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Enrollment Date
                  </label>
                  <p className="text-sm">{selectedStudent.enrollmentDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge
                    variant={
                      selectedStudent.status === "Active"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {selectedStudent.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewClassStudents;
