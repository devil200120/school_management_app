import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
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
  Trash,
  RefreshCw,
  Download,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

const ManageTrashedStudent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToRestore, setStudentToRestore] = useState(null);

  // Sample data for demonstration with state management
  const [students, setStudents] = useState([
    {
      id: 1,
      surname: "Smith",
      otherName: "John",
      level: "Senior Secondary",
      class: "SS 3",
      dept: "Science",
      admissionNo: "SS2023001",
      status: "Inactive",
      deletedDate: "2023-09-15",
      reason: "Poor academic performance",
      parentContact: "08012345678",
      email: "john.smith@email.com",
    },
    {
      id: 2,
      surname: "Johnson",
      otherName: "Mary",
      level: "Junior Secondary",
      class: "JS 2",
      dept: "Arts",
      admissionNo: "JS2023015",
      status: "Graduated",
      deletedDate: "2023-08-20",
      reason: "Graduation completed",
      parentContact: "08087654321",
      email: "mary.johnson@email.com",
    },
    {
      id: 3,
      surname: "Williams",
      otherName: "Peter",
      level: "Primary",
      class: "Primary 5",
      dept: "N/A",
      admissionNo: "P2023042",
      status: "Transferred",
      deletedDate: "2023-07-10",
      reason: "Transferred to another school",
      parentContact: "08056789012",
      email: "peter.williams@email.com",
    },
    {
      id: 4,
      surname: "Brown",
      otherName: "Sarah",
      level: "Senior Secondary",
      class: "SS 1",
      dept: "Commercial",
      admissionNo: "SS2023103",
      status: "Inactive",
      deletedDate: "2023-09-01",
      reason: "Extended absence",
      parentContact: "08034567890",
      email: "sarah.brown@email.com",
    },
  ]);

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.otherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle restore student
  const handleRestoreStudent = (student) => {
    setStudentToRestore(student);
    setIsRestoreDialogOpen(true);
  };

  const confirmRestore = () => {
    if (studentToRestore) {
      setStudents((prev) => prev.filter((s) => s.id !== studentToRestore.id));
      toast.success("Student restored successfully!", {
        description: `${studentToRestore.otherName} ${studentToRestore.surname} has been restored to active students.`,
        duration: 4000,
      });
      setIsRestoreDialogOpen(false);
      setStudentToRestore(null);
    }
  };

  // Handle delete student permanently
  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id));
      toast.error("Student deleted permanently!", {
        description: `${studentToDelete.otherName} ${studentToDelete.surname} has been permanently removed from the system.`,
        duration: 4000,
      });
      setIsDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  // Handle view student details
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "S/N",
        "Surname",
        "Other Name",
        "Level",
        "Class",
        "Dept",
        "Admission No",
        "Status",
        "Deleted Date",
        "Reason",
      ],
      ...filteredStudents.map((student) => [
        student.id,
        student.surname,
        student.otherName,
        student.level,
        student.class,
        student.dept,
        student.admissionNo,
        student.status,
        student.deletedDate,
        student.reason,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trashed_students.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredStudents.length} trashed student records to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredStudents
      .map(
        (student) =>
          `${student.id}. ${student.surname}, ${student.otherName} - ${student.level} (${student.class}) - ${student.admissionNo} - Status: ${student.status} - Deleted: ${student.deletedDate}`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trashed_students.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Text Export Complete", {
      description: `Successfully exported ${filteredStudents.length} trashed student records to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print Dialog Opened", {
      description: `Preparing to print ${filteredStudents.length} trashed student records.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredStudents
      .map(
        (student) =>
          `${student.id}\t${student.surname}\t${student.otherName}\t${student.level}\t${student.class}\t${student.dept}\t${student.admissionNo}\t${student.status}\t${student.deletedDate}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredStudents.length} trashed student records to clipboard.`,
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
          Manage Trashed Students
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Trashed Student Records</CardTitle>
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
                  <TableHead className="bg-gray-100">Surname</TableHead>
                  <TableHead className="bg-gray-100">Other Name</TableHead>
                  <TableHead className="bg-gray-100">Level</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Dept</TableHead>
                  <TableHead className="bg-gray-100">Admission No</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{student.id}</TableCell>
                    <TableCell className="font-medium">
                      {student.surname}
                    </TableCell>
                    <TableCell>{student.otherName}</TableCell>
                    <TableCell>{student.level}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.dept}</TableCell>
                    <TableCell>{student.admissionNo}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          student.status === "Graduated"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : student.status === "Transferred"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                          onClick={() => handleViewStudent(student)}
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1 transition-colors"
                          onClick={() => handleRestoreStudent(student)}
                        >
                          <RefreshCw size={14} />
                          <span>Restore</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-red-700 transition-colors"
                          onClick={() => handleDeleteStudent(student)}
                        >
                          <Trash size={14} />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-8 text-gray-500"
                    >
                      {searchTerm
                        ? `No trashed students found matching "${searchTerm}"`
                        : "No trashed students found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Student Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Trashed Student Details</DialogTitle>
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
                    Full Name
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedStudent.otherName} {selectedStudent.surname}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Admission Number
                  </label>
                  <p className="text-sm">{selectedStudent.admissionNo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Level & Class
                  </label>
                  <p className="text-sm">
                    {selectedStudent.level} - {selectedStudent.class}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Department
                  </label>
                  <p className="text-sm">{selectedStudent.dept}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge
                    variant={
                      selectedStudent.status === "Graduated"
                        ? "default"
                        : selectedStudent.status === "Transferred"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {selectedStudent.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Deleted Date
                  </label>
                  <p className="text-sm">{selectedStudent.deletedDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Parent Contact
                  </label>
                  <p className="text-sm">{selectedStudent.parentContact}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Email Address
                  </label>
                  <p className="text-sm">{selectedStudent.email}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Reason for Removal
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedStudent.reason}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Restore Confirmation Dialog */}
      <AlertDialog
        open={isRestoreDialogOpen}
        onOpenChange={setIsRestoreDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-600" />
              Restore Student
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to restore {studentToRestore?.otherName}{" "}
              {studentToRestore?.surname}? This will move the student back to
              the active student list and they will regain access to all school
              services.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRestore}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Restore Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Permanently Delete Student
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete{" "}
              {studentToDelete?.otherName} {studentToDelete?.surname}? This
              action cannot be undone and all student data will be permanently
              removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageTrashedStudent;
