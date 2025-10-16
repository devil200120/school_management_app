import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  Plus,
  Clock,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Sparkles,
  Eye,
  Edit,
  Trash2,
  FileText,
  Download,
  Copy,
  Printer,
  Users,
  CalendarDays,
  Target,
  School,
} from "lucide-react";

const AddTerm = () => {
  const [formData, setFormData] = useState({
    termName: "",
    session: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "",
  });

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTermDetails = (startDate, endDate) => {
    if (!startDate || !endDate) return { totalWeeks: 0, workingDays: 0 };

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.ceil(diffDays / 7);
    const workingDays = Math.floor((diffDays * 5) / 7); // Approximate working days

    return { totalWeeks, workingDays };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.termName.trim()) {
      toast.error("Please enter a term name!", {
        description: "Term name is required to create a new term.",
        duration: 4000,
      });
      return;
    }

    if (!formData.session) {
      toast.error("Please select an academic session!", {
        description: "Academic session selection is required.",
        duration: 4000,
      });
      return;
    }

    if (!formData.startDate) {
      toast.error("Please enter a start date!", {
        description: "Start date is required.",
        duration: 4000,
      });
      return;
    }

    if (!formData.endDate) {
      toast.error("Please enter an end date!", {
        description: "End date is required.",
        duration: 4000,
      });
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.error("End date must be after start date!", {
        description: "Please check your date selection.",
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);

    // Calculate term details
    const { totalWeeks, workingDays } = calculateTermDetails(
      formData.startDate,
      formData.endDate
    );

    setTimeout(() => {
      if (isEditing && editingId) {
        // Update existing term
        setTerms((prev) =>
          prev.map((term) =>
            term.id === editingId
              ? {
                  ...term,
                  name: formData.termName,
                  session: formData.session,
                  startDate: formData.startDate,
                  endDate: formData.endDate,
                  description:
                    formData.description || "No description provided",
                  status: formData.status || "upcoming",
                  totalWeeks,
                  workingDays,
                }
              : term
          )
        );
        setIsEditing(false);
        setEditingId(null);
        toast.success(`🎉 Term "${formData.termName}" updated successfully!`, {
          description: `Academic term has been updated for ${formData.session} session.`,
          duration: 5000,
        });
      } else {
        // Create new term
        const newTerm = {
          id: terms.length + 1,
          name: formData.termName,
          session: formData.session,
          startDate: formData.startDate,
          endDate: formData.endDate,
          description: formData.description || "No description provided",
          status: formData.status || "upcoming",
          totalWeeks,
          holidays: 1,
          workingDays,
          enrolledStudents: 0,
          subjects: 12,
          createdAt: new Date().toISOString().split("T")[0],
        };

        setTerms((prev) => [newTerm, ...prev]);

        toast.success(`🎉 Term "${formData.termName}" created successfully!`, {
          description: `Academic term has been added for ${formData.session} session with ${totalWeeks} weeks duration.`,
          duration: 5000,
          action: {
            label: "View",
            onClick: () => {
              toast.info(`Viewing ${formData.termName} details`);
            },
          },
        });
      }

      // Reset form
      setFormData({
        termName: "",
        session: "",
        startDate: "",
        endDate: "",
        description: "",
        status: "",
      });
      setIsLoading(false);
    }, 800);
  };

  const handleView = (term) => {
    setSelectedTerm(term);
    setShowViewModal(true);
    toast.success(`Viewing term: ${term.name} (${term.session})`);
  };

  const handleEdit = (term) => {
    setFormData({
      termName: term.name,
      session: term.session,
      startDate: term.startDate,
      endDate: term.endDate,
      description: term.description,
      status: term.status,
    });
    setIsEditing(true);
    setEditingId(term.id);
    toast.info(`Now editing: ${term.name} (${term.session})`);
    // Scroll to form
    setTimeout(() => {
      document
        .querySelector(".term-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      termName: "",
      session: "",
      startDate: "",
      endDate: "",
      description: "",
      status: "",
    });
    toast.info("Edit cancelled");
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
      ...terms.map((term) =>
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
    a.download = "academic_terms_data.csv";
    a.click();
    toast.success("Data exported to CSV!");
  };

  const exportToText = () => {
    const textContent = terms
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
    a.download = "academic_terms_data.txt";
    a.click();
    toast.success("Data exported to text file!");
  };

  const copyToClipboard = () => {
    const textContent = terms
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
      <h2>Academic Terms Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>ID</th><th>Name</th><th>Session</th><th>Start Date</th><th>End Date</th><th>Total Weeks</th><th>Working Days</th><th>Students</th><th>Status</th>
        </tr>
        ${terms
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
    <div className="space-y-6 p-4 md:p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Academic Term Management
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card
          className={`mt-3 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 ${
            isEditing ? "border-t-orange-500" : "border-t-eduos-primary"
          } term-form`}
        >
          <CardHeader
            className={`bg-gradient-to-r ${
              isEditing
                ? "from-orange-500 to-red-500"
                : "from-eduos-primary to-eduos-secondary"
            } text-white`}
          >
            <CardTitle className="flex items-center gap-2">
              {isEditing ? (
                <Edit className="h-5 w-5" />
              ) : (
                <Calendar className="h-5 w-5" />
              )}
              {isEditing ? "Edit Term Information" : "Term Information"}
            </CardTitle>
            <CardDescription className="text-white/80">
              {isEditing
                ? "Update academic term details"
                : "Create a new academic term in the system"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="termName">Term Name *</Label>
                  <Input
                    id="termName"
                    name="termName"
                    value={formData.termName}
                    onChange={handleInputChange}
                    placeholder="e.g. First Term, Second Term, etc."
                    className="transition-all duration-300 focus:border-eduos-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session">Academic Session *</Label>
                  <Select
                    value={formData.session}
                    onValueChange={(value) =>
                      handleSelectChange("session", value)
                    }
                  >
                    <SelectTrigger className="transition-all duration-300">
                      <SelectValue placeholder="Select session" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024/2025">2024/2025</SelectItem>
                      <SelectItem value="2025/2026">2025/2026</SelectItem>
                      <SelectItem value="2023/2024">2023/2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:border-eduos-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:border-eduos-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Term Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger className="transition-all duration-300">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Term Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the term objectives and focus areas..."
                  className="min-h-[100px] transition-all duration-300 focus:border-eduos-primary"
                />
              </div>

              {/* Term calculation preview */}
              {formData.startDate && formData.endDate && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Term Duration Preview
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600">Total Weeks: </span>
                      <span className="font-medium">
                        {
                          calculateTermDetails(
                            formData.startDate,
                            formData.endDate
                          ).totalWeeks
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-600">Working Days: </span>
                      <span className="font-medium">
                        {
                          calculateTermDetails(
                            formData.startDate,
                            formData.endDate
                          ).workingDays
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="bg-gray-50 border-t px-6 py-4">
              <div className="flex gap-3 w-full">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                    isEditing
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-eduos-primary hover:bg-eduos-secondary"
                  }`}
                >
                  {isLoading ? (
                    <>Processing...</>
                  ) : isEditing ? (
                    <>
                      <Edit className="h-4 w-4" />
                      Update Term
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Add Term
                    </>
                  )}
                </Button>
                {isEditing && (
                  <Button
                    type="button"
                    onClick={cancelEdit}
                    variant="outline"
                    className="px-6 transition-all duration-300 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>

      {/* Academic Terms List */}
      <Card className="animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Academic Terms ({terms.length})
            </span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Total: {terms.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-50">S/N</TableHead>
                  <TableHead className="bg-gray-50">Term Details</TableHead>
                  <TableHead className="bg-gray-50">Session</TableHead>
                  <TableHead className="bg-gray-50">Duration</TableHead>
                  <TableHead className="bg-gray-50">Students</TableHead>
                  <TableHead className="bg-gray-50">Status</TableHead>
                  <TableHead className="bg-gray-50">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {terms.map((term, index) => (
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

          {terms.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarDays className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">
                No academic terms created yet
              </p>
              <p className="text-sm">
                Add your first academic term using the form above!
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

export default AddTerm;
