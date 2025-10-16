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
  Edit,
  Trash2,
  Eye,
  Calendar,
  CalendarDays,
  Clock,
  Users,
  GraduationCap,
  School,
  CheckCircle,
  Download,
  Target,
  BookOpen,
} from "lucide-react";

const ManageTerm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);

  // Enhanced sample data with more details
  const [terms, setTerms] = useState([
    {
      id: 1,
      name: "First Term",
      session: "2024/2025",
      startDate: "2024-09-02",
      endDate: "2024-12-15",
      description:
        "First academic term of the 2024/2025 session covering foundational curriculum",
      status: "active",
      totalWeeks: 15,
      holidays: 2,
      workingDays: 91,
      enrolledStudents: 1250,
      subjects: 12,
      createdAt: "2024-08-15",
    },
    {
      id: 2,
      name: "Second Term",
      session: "2024/2025",
      startDate: "2025-01-08",
      endDate: "2025-04-11",
      description:
        "Second academic term focusing on intermediate topics and assessments",
      status: "upcoming",
      totalWeeks: 13,
      holidays: 1,
      workingDays: 78,
      enrolledStudents: 0,
      subjects: 12,
      createdAt: "2024-08-15",
    },
    {
      id: 3,
      name: "Third Term",
      session: "2024/2025",
      startDate: "2025-04-28",
      endDate: "2025-07-25",
      description:
        "Final term of the academic year with comprehensive reviews and examinations",
      status: "upcoming",
      totalWeeks: 12,
      holidays: 1,
      workingDays: 72,
      enrolledStudents: 0,
      subjects: 12,
      createdAt: "2024-08-15",
    },
    {
      id: 4,
      name: "First Term",
      session: "2023/2024",
      startDate: "2023-09-04",
      endDate: "2023-12-15",
      description: "Completed first term of previous academic session",
      status: "completed",
      totalWeeks: 15,
      holidays: 2,
      workingDays: 91,
      enrolledStudents: 1180,
      subjects: 12,
      createdAt: "2023-08-20",
    },
  ]);

  // Filter terms based on search
  const filteredTerms = terms.filter(
    (term) =>
      term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.session.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (term) => {
    setSelectedTerm(term);
    setShowViewModal(true);
    toast.success(`Viewing term: ${term.name} (${term.session})`);
  };

  const handleEdit = (term) => {
    toast.info(`Edit functionality for "${term.name}" (${term.session})`, {
      description: "Redirecting to edit form...",
      duration: 3000,
    });
    // In a real application, this would navigate to edit form
    // For demo, we'll show a message
    setTimeout(() => {
      toast.success(`Opening edit form for ${term.name}`);
    }, 1000);
  };

  const handleDelete = (id) => {
    const term = terms.find((t) => t.id === id);

    if (!term) {
      toast.error("Term not found!");
      return;
    }

    if (term.status === "active" && term.enrolledStudents > 0) {
      toast.error(
        `Cannot delete active term "${term.name}" with ${term.enrolledStudents} enrolled students`,
        {
          description: "Please complete the term or transfer students first.",
          duration: 5000,
        }
      );
      return;
    }

    // Show confirmation before deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the term "${term.name}" (${term.session})? This action cannot be undone.`
    );

    if (!confirmDelete) {
      toast.info("Deletion cancelled");
      return;
    }

    setTerms((prev) => prev.filter((t) => t.id !== id));
    toast.success(`Term "${term.name}" deleted successfully!`, {
      description:
        "The academic term has been permanently removed from the system.",
      duration: 4000,
    });
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Session",
      "Start Date",
      "End Date",
      "Total Weeks",
      "Working Days",
      "Enrolled Students",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredTerms.map((term) =>
        [
          term.id,
          `"${term.name}"`,
          `"${term.session}"`,
          term.startDate,
          term.endDate,
          term.totalWeeks,
          term.workingDays,
          term.enrolledStudents,
          term.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manage_terms_data.csv";
    a.click();
    toast.success("Data exported to CSV!");
  };

  const exportToText = () => {
    const textContent = filteredTerms
      .map(
        (term) =>
          `ID: ${term.id}\nName: ${term.name}\nSession: ${
            term.session
          }\nStart Date: ${term.startDate}\nEnd Date: ${
            term.endDate
          }\nTotal Weeks: ${term.totalWeeks}\nWorking Days: ${
            term.workingDays
          }\nEnrolled Students: ${term.enrolledStudents}\nStatus: ${
            term.status
          }\nDescription: ${term.description}\n${"=".repeat(50)}\n`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manage_terms_data.txt";
    a.click();
    toast.success("Data exported to text file!");
  };

  const copyToClipboard = () => {
    const textContent = filteredTerms
      .map(
        (term) =>
          `${term.name} (${term.session}) - ${term.startDate} to ${term.endDate} | Students: ${term.enrolledStudents} | Status: ${term.status}`
      )
      .join("\n");

    navigator.clipboard.writeText(textContent).then(() => {
      toast.success("Data copied to clipboard!");
    });
  };

  const printData = () => {
    const printContent = `
      <h2>Manage Terms Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>ID</th><th>Name</th><th>Session</th><th>Start Date</th><th>End Date</th><th>Total Weeks</th><th>Working Days</th><th>Students</th><th>Status</th>
        </tr>
        ${filteredTerms
          .map(
            (term) => `
          <tr>
            <td>${term.id}</td>
            <td>${term.name}</td>
            <td>${term.session}</td>
            <td>${term.startDate}</td>
            <td>${term.endDate}</td>
            <td>${term.totalWeeks}</td>
            <td>${term.workingDays}</td>
            <td>${term.enrolledStudents}</td>
            <td>${term.status}</td>
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
          Manage Term
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

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Term List ({filteredTerms.length})
            </span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Total: {terms.length}
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
                placeholder="Search terms..."
                className="pl-10 px-5 transition-all duration-300 focus:border-eduos-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={exportToCSV}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>CSV</span>
              </Button>
              <Button
                onClick={exportToText}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <FileText className="h-4 w-4" />
                <span>Text</span>
              </Button>
              <Button
                onClick={printData}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
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
                  <TableHead className="bg-gray-100">Term Details</TableHead>
                  <TableHead className="bg-gray-100">Session</TableHead>
                  <TableHead className="bg-gray-100">Duration</TableHead>
                  <TableHead className="bg-gray-100">Students</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTerms.map((term, index) => (
                  <TableRow
                    key={term.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2">
                          <School className="h-4 w-4 text-gray-400" />
                          {term.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {term.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 w-fit"
                      >
                        <GraduationCap className="h-3 w-3" />
                        {term.session}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {term.startDate} to {term.endDate}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {term.totalWeeks} weeks, {term.workingDays} working
                          days
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span
                          className={
                            term.enrolledStudents > 0
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {term.enrolledStudents}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          term.status === "active"
                            ? "bg-green-100 text-green-800"
                            : term.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : term.status === "completed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {term.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(term)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(term)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(term.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          disabled={
                            term.status === "active" &&
                            term.enrolledStudents > 0
                          }
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

          {filteredTerms.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarDays className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">
                {searchTerm
                  ? "No terms found matching your search"
                  : "No academic terms found"}
              </p>
              <p className="text-sm">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "Terms will appear here when they are created"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Term Modal */}
      {showViewModal && selectedTerm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-6 rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {selectedTerm.name} - {selectedTerm.session}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge className="bg-white/20 text-white">
                      <Calendar className="h-3 w-3 mr-1" />
                      {selectedTerm.startDate} to {selectedTerm.endDate}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedTerm.totalWeeks} weeks
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <Users className="h-3 w-3 mr-1" />
                      {selectedTerm.enrolledStudents} students
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
                      Term Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {selectedTerm.name}
                      </p>
                      <p>
                        <span className="font-medium">Session:</span>{" "}
                        {selectedTerm.session}
                      </p>
                      <p>
                        <span className="font-medium">Duration:</span>{" "}
                        {selectedTerm.startDate} to {selectedTerm.endDate}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>
                        <Badge
                          className={`ml-2 ${
                            selectedTerm.status === "active"
                              ? "bg-green-100 text-green-800"
                              : selectedTerm.status === "upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : selectedTerm.status === "completed"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedTerm.status}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      Academic Statistics
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Total Weeks:</span>{" "}
                        {selectedTerm.totalWeeks}
                      </p>
                      <p>
                        <span className="font-medium">Working Days:</span>{" "}
                        {selectedTerm.workingDays}
                      </p>
                      <p>
                        <span className="font-medium">Holidays:</span>{" "}
                        {selectedTerm.holidays}
                      </p>
                      <p>
                        <span className="font-medium">Subjects:</span>{" "}
                        {selectedTerm.subjects}
                      </p>
                      <p>
                        <span className="font-medium">Enrolled Students:</span>{" "}
                        <span
                          className={
                            selectedTerm.enrolledStudents > 0
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {selectedTerm.enrolledStudents}
                        </span>
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
                <p className="text-gray-700">{selectedTerm.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4" />
                  Academic Calendar
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium">Start Date</div>
                    <div className="text-eduos-primary">
                      {selectedTerm.startDate}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium">End Date</div>
                    <div className="text-eduos-primary">
                      {selectedTerm.endDate}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium">Created</div>
                    <div className="text-eduos-primary">
                      {selectedTerm.createdAt}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(selectedTerm);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Term
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

export default ManageTerm;
