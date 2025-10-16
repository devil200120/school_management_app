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
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  Download,
  Check,
  X,
  Eye,
  UserCheck,
  UserX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ManageAdmin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for admins with state management
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Super Admin",
      email: "johndoe@example.com",
      phone: "+1234567890",
      status: "Active",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Admin",
      email: "janesmith@example.com",
      phone: "+1987654321",
      status: "Active",
      joinDate: "2023-03-22",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Finance Officer",
      email: "mikejohnson@example.com",
      phone: "+1122334455",
      status: "Inactive",
      joinDate: "2023-02-10",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Registrar",
      email: "sarahwilliams@example.com",
      phone: "+1555666777",
      status: "Active",
      joinDate: "2023-04-05",
    },
    {
      id: 5,
      name: "David Brown",
      role: "Academic Officer",
      email: "davidbrown@example.com",
      phone: "+1333444555",
      status: "Active",
      joinDate: "2023-05-12",
    },
  ]);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Action handlers
  const handleAddNew = () => {
    toast.success("Add New Administrator", {
      description: "Redirecting to administrator creation form...",
      icon: <PlusCircle className="h-4 w-4" />,
      duration: 3000,
    });
    // navigate('/admin/admin-users/add');
  };

  const handleView = (admin) => {
    toast.info(`Administrator Details - ${admin.name}`, {
      description: `Role: ${admin.role} • Email: ${admin.email} • Status: ${admin.status}`,
      icon: <Eye className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleEdit = (admin) => {
    toast.info(`Edit Administrator - ${admin.name}`, {
      description: `Opening editor for ${admin.role} account`,
      icon: <Edit className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleDelete = (admin) => {
    setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
    toast.error(`Administrator Removed`, {
      description: `${admin.name} (${admin.role}) has been removed from the system.`,
      icon: <Trash className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleActivate = (admin) => {
    setAdmins((prev) =>
      prev.map((a) => (a.id === admin.id ? { ...a, status: "Active" } : a))
    );
    toast.success(`Administrator Activated`, {
      description: `${admin.name} account has been activated successfully.`,
      icon: <UserCheck className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleDeactivate = (admin) => {
    setAdmins((prev) =>
      prev.map((a) => (a.id === admin.id ? { ...a, status: "Inactive" } : a))
    );
    toast.error(`Administrator Deactivated`, {
      description: `${admin.name} account has been deactivated.`,
      icon: <UserX className="h-4 w-4" />,
      duration: 4000,
    });
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Name", "Role", "Email", "Phone", "Status", "Join Date"],
      ...filteredAdmins.map((admin) => [
        admin.id,
        admin.name,
        admin.role,
        admin.email,
        admin.phone,
        admin.status,
        admin.joinDate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "administrators.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredAdmins.length} administrators to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredAdmins
      .map(
        (admin) =>
          `${admin.id}. ${admin.name} (${admin.role})\nEmail: ${admin.email} | Phone: ${admin.phone}\nStatus: ${admin.status} | Joined: ${admin.joinDate}`
      )
      .join("\n\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "administrators.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Text Export Complete", {
      description: `Successfully exported ${filteredAdmins.length} administrators to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print Dialog Opened", {
      description: `Preparing to print ${filteredAdmins.length} administrator records.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredAdmins
      .map(
        (admin) =>
          `${admin.id}\t${admin.name}\t${admin.role}\t${admin.email}\t${admin.phone}\t${admin.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredAdmins.length} administrator records to clipboard.`,
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
          Manage Administrators
        </h2>
        <Button
          onClick={handleAddNew}
          className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Admin
        </Button>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Administrator Management</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search administrators..."
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
              <TableCaption>
                A list of all administrators in the system.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">ID</TableHead>
                  <TableHead className="bg-gray-100">Name</TableHead>
                  <TableHead className="bg-gray-100">Role</TableHead>
                  <TableHead className="bg-gray-100">Email</TableHead>
                  <TableHead className="bg-gray-100">Phone</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow
                    key={admin.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{admin.id}</TableCell>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.phone}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          admin.status === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50"
                          onClick={() => handleView(admin)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50"
                          onClick={() => handleEdit(admin)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {admin.status === "Inactive" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:border-green-300 hover:bg-green-50"
                            onClick={() => handleActivate(admin)}
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-orange-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50"
                            onClick={() => handleDeactivate(admin)}
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50"
                          onClick={() => handleDelete(admin)}
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
              <span className="font-medium">{filteredAdmins.length}</span> of{" "}
              <span className="font-medium">{admins.length}</span>{" "}
              administrators
              <span className="ml-4 text-eduos-primary font-medium">
                Active: {admins.filter((a) => a.status === "Active").length}
              </span>
              <span className="ml-2 text-red-600 font-medium">
                Inactive: {admins.filter((a) => a.status === "Inactive").length}
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

export default ManageAdmin;
