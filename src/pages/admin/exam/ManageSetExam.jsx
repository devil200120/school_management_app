import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { toast } from "sonner";
import {
  Search,
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  Edit,
  Trash2,
  Plus,
  Eye,
} from "lucide-react";

const ManageSetExam = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [exams, setExams] = useState([
    // Sample exam data
    {
      id: 1,
      subject: "Mathematics",
      class: "Class 1",
      totalQuestions: 100,
      displayQuestions: 50,
      timeToSpend: "2 hours",
      startDate: "2023-05-15",
      endDate: "2023-05-15",
      examType: "Mid-Term",
    },
    {
      id: 2,
      subject: "English",
      class: "Class 3",
      totalQuestions: 80,
      displayQuestions: 60,
      timeToSpend: "1.5 hours",
      startDate: "2023-05-16",
      endDate: "2023-05-16",
      examType: "Final",
    },
    {
      id: 3,
      subject: "Science",
      class: "Class 2",
      totalQuestions: 70,
      displayQuestions: 50,
      timeToSpend: "1.5 hours",
      startDate: "2023-05-17",
      endDate: "2023-05-17",
      examType: "Mid-Term",
    },
  ]);

  // Export and action functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "S/N",
        "Subject",
        "Class",
        "Exam Type",
        "Total Questions",
        "Display Questions",
        "Time",
        "Start Date",
        "End Date",
      ],
      ...filteredExams.map((exam, index) => [
        index + 1,
        exam.subject,
        exam.class,
        exam.examType,
        exam.totalQuestions,
        exam.displayQuestions,
        exam.timeToSpend,
        exam.startDate,
        exam.endDate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exams.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV exported successfully!");
  };

  const handleExportPDF = () => {
    toast.success("PDF export initiated!");
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print dialog opened");
  };

  const handleCopy = () => {
    const tableData = filteredExams
      .map(
        (exam, index) =>
          `${index + 1}\t${exam.subject}\t${exam.class}\t${exam.examType}\t${
            exam.totalQuestions
          }\t${exam.displayQuestions}\t${exam.timeToSpend}\t${
            exam.startDate
          }\t${exam.endDate}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Table data copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy data");
      });
  };

  const handleSetNewExam = () => {
    toast.info("Redirecting to Create New Exam page...");
  };

  const handleEdit = (exam) => {
    toast.info(`Editing exam: ${exam.subject} for ${exam.class}`);
  };

  const handleDelete = (examId) => {
    setExams((prevExams) => prevExams.filter((exam) => exam.id !== examId));
    toast.success("Exam deleted successfully!");
  };

  const handleView = (exam) => {
    toast.info(`Viewing details for: ${exam.subject} (${exam.class})`);
  };

  const filteredExams = exams.filter(
    (exam) =>
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary">
          Manage Set Exam
        </h2>
        <Button
          onClick={handleSetNewExam}
          className="bg-eduos-primary hover:bg-eduos-secondary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Set New Exam
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Exam List</CardTitle>
            <div className="relative w-full sm:w-auto">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="flex justify-end mb-4 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="flex items-center gap-1 hover:bg-green-50 hover:border-green-300"
              >
                <FileSpreadsheet className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                className="flex items-center gap-1 hover:bg-red-50 hover:border-red-300"
              >
                <FileText className="h-4 w-4" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-1 hover:bg-gray-50 hover:border-gray-300"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Total Question</TableHead>
                  <TableHead>Total Ques to display</TableHead>
                  <TableHead>Time to spend</TableHead>
                  <TableHead>Start date</TableHead>
                  <TableHead>End date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam, index) => (
                  <TableRow key={exam.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.class}</TableCell>
                    <TableCell>{exam.examType}</TableCell>
                    <TableCell>{exam.totalQuestions}</TableCell>
                    <TableCell>{exam.displayQuestions}</TableCell>
                    <TableCell>{exam.timeToSpend}</TableCell>
                    <TableCell>{exam.startDate}</TableCell>
                    <TableCell>{exam.endDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(exam)}
                          className="hover:bg-blue-50"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(exam)}
                          className="hover:bg-yellow-50"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(exam.id)}
                          className="hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
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
    </div>
  );
};

export default ManageSetExam;
