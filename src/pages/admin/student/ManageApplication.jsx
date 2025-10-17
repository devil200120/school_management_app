import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
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
  CheckCircle,
  XCircle,
  Check,
  X,
  Download,
  Info,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
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

const ManageApplication = () => {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    level: "",
    class: "",
    applicationDate: "",
    status: "",
  });

  // Sample data for demonstration with state management
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Smith",
      level: "Senior Secondary",
      class: "SS 3",
      applicationDate: "2023-08-15",
      status: "pending",
    },
    {
      id: 2,
      name: "Mary Johnson",
      level: "Junior Secondary",
      class: "JS 2",
      applicationDate: "2023-08-10",
      status: "approved",
    },
    {
      id: 3,
      name: "Peter Williams",
      level: "Primary",
      class: "Primary 5",
      applicationDate: "2023-08-05",
      status: "pending",
    },
    {
      id: 4,
      name: "Sarah Brown",
      level: "Senior Secondary",
      class: "SS 1",
      applicationDate: "2023-07-28",
      status: "rejected",
    },
  ]);

  // Filter applications based on search term
  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle application status updates
  const handleApprove = (id) => {
    const application = applications.find((app) => app.id === id);
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "approved" } : app))
    );
    toast.success(`Application approved successfully!`, {
      description: `${application?.name}'s application has been approved and they will be notified.`,
      icon: <Check className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleReject = (id) => {
    const application = applications.find((app) => app.id === id);
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "rejected" } : app))
    );
    toast.error(`Application rejected`, {
      description: `${application?.name}'s application has been rejected and they will be notified.`,
      icon: <X className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleView = (application) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (application) => {
    setSelectedApplication(application);
    setEditForm({
      name: application.name,
      level: application.level,
      class: application.class,
      applicationDate: application.applicationDate,
      status: application.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateApplication = () => {
    if (
      !editForm.name ||
      !editForm.level ||
      !editForm.class ||
      !editForm.applicationDate
    ) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
        duration: 3000,
      });
      return;
    }

    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApplication.id
          ? {
              ...app,
              name: editForm.name,
              level: editForm.level,
              class: editForm.class,
              applicationDate: editForm.applicationDate,
              status: editForm.status,
            }
          : app
      )
    );

    setIsEditDialogOpen(false);
    setSelectedApplication(null);
    setEditForm({
      name: "",
      level: "",
      class: "",
      applicationDate: "",
      status: "",
    });

    toast.success("Application Updated", {
      description: `${editForm.name}'s application has been updated successfully.`,
      icon: <Check className="h-4 w-4" />,
      duration: 4000,
    });
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      ["S/N", "Applicant Name", "Level", "Class", "Application Date", "Status"],
      ...filteredApplications.map((app) => [
        app.id,
        app.name,
        app.level,
        app.class,
        app.applicationDate,
        app.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_applications.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`CSV Export Complete`, {
      description: `Successfully exported ${filteredApplications.length} applications to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredApplications
      .map(
        (app) =>
          `${app.id}. ${app.name} - ${app.level} (${app.class}) - Applied: ${app.applicationDate} - Status: ${app.status}`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_applications.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`Text Export Complete`, {
      description: `Successfully exported ${filteredApplications.length} applications to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info(`Print Dialog Opened`, {
      description: `Preparing to print ${filteredApplications.length} student applications.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredApplications
      .map(
        (app) =>
          `${app.id}\t${app.name}\t${app.level}\t${app.class}\t${app.applicationDate}\t${app.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success(`Copied to Clipboard`, {
          description: `Successfully copied ${filteredApplications.length} applications data to clipboard.`,
          icon: <Copy className="h-4 w-4" />,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error(`Copy Failed`, {
          description: `Unable to copy data to clipboard. Please try again.`,
          icon: <X className="h-4 w-4" />,
          duration: 3000,
        });
      });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Applications
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Student Applications</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search applications..."
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
                  <TableHead className="bg-gray-100">Applicant Name</TableHead>
                  <TableHead className="bg-gray-100">Level</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">
                    Application Date
                  </TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow
                    key={application.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{application.id}</TableCell>
                    <TableCell className="font-medium">
                      {application.name}
                    </TableCell>
                    <TableCell>{application.level}</TableCell>
                    <TableCell>{application.class}</TableCell>
                    <TableCell>{application.applicationDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          application.status === "approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : application.status === "rejected"
                            ? "bg-red-100 text-red-800 hover:bg-red-200"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        {application.status === "approved"
                          ? "Approved"
                          : application.status === "rejected"
                          ? "Rejected"
                          : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                          onClick={() => handleView(application)}
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 hover:bg-yellow-50 hover:border-yellow-300"
                          onClick={() => handleEdit(application)}
                        >
                          <Info size={14} />
                          <span>Edit</span>
                        </Button>
                        {application.status === "pending" && (
                          <>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 flex items-center gap-1 transition-colors"
                              onClick={() => handleApprove(application.id)}
                            >
                              <CheckCircle size={14} />
                              <span>Approve</span>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex items-center gap-1 hover:bg-red-700 transition-colors"
                              onClick={() => handleReject(application.id)}
                            >
                              <XCircle size={14} />
                              <span>Reject</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Application Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Application ID
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedApplication.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Applicant Name
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedApplication.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Education Level
                  </label>
                  <p className="text-sm">{selectedApplication.level}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Class
                  </label>
                  <p className="text-sm">{selectedApplication.class}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Application Date
                  </label>
                  <p className="text-sm">
                    {selectedApplication.applicationDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge
                    variant={
                      selectedApplication.status === "approved"
                        ? "default"
                        : selectedApplication.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {selectedApplication.status.charAt(0).toUpperCase() +
                      selectedApplication.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Additional application details can be added here */}
              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Additional Information
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Application submitted for {selectedApplication.level} -{" "}
                  {selectedApplication.class}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Application Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Applicant Name</Label>
              <Input
                id="editName"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter applicant name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editLevel">Education Level</Label>
              <Select
                value={editForm.level}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, level: value, class: "" }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Junior Secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="Senior Secondary">
                    Senior Secondary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editClass">Class</Label>
              <Select
                value={editForm.class}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, class: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {editForm.level === "Primary" && (
                    <>
                      <SelectItem value="Primary 1">Primary 1</SelectItem>
                      <SelectItem value="Primary 2">Primary 2</SelectItem>
                      <SelectItem value="Primary 3">Primary 3</SelectItem>
                      <SelectItem value="Primary 4">Primary 4</SelectItem>
                      <SelectItem value="Primary 5">Primary 5</SelectItem>
                      <SelectItem value="Primary 6">Primary 6</SelectItem>
                    </>
                  )}
                  {editForm.level === "Junior Secondary" && (
                    <>
                      <SelectItem value="JS 1">JS 1</SelectItem>
                      <SelectItem value="JS 2">JS 2</SelectItem>
                      <SelectItem value="JS 3">JS 3</SelectItem>
                    </>
                  )}
                  {editForm.level === "Senior Secondary" && (
                    <>
                      <SelectItem value="SS 1">SS 1</SelectItem>
                      <SelectItem value="SS 2">SS 2</SelectItem>
                      <SelectItem value="SS 3">SS 3</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editDate">Application Date</Label>
              <Input
                id="editDate"
                type="date"
                value={editForm.applicationDate}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    applicationDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editStatus">Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateApplication}>
              <Check className="h-4 w-4 mr-2" />
              Update Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageApplication;
