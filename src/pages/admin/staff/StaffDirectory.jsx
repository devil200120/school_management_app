import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import {
  Users,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  UserCheck,
  ChevronLeft,
  Plus,
  Download,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const StaffDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Comprehensive staff data
  const [staffMembers, setStaffMembers] = useState([
    {
      id: "STAFF001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@eduos.com",
      phone: "+1 (555) 123-4567",
      department: "Mathematics",
      role: "Head of Department",
      employeeId: "EMP001",
      dateJoined: "2020-08-15",
      address: "123 Oak Street, Springfield, IL 62701",
      status: "Active",
      avatar: "/api/placeholder/150/150",
      qualifications: "PhD in Mathematics, MSc in Applied Mathematics",
      experience: "8 years",
      subjects: ["Calculus", "Linear Algebra", "Statistics"],
      salary: 85000,
      attendanceRate: 95.5,
      emergencyContact: {
        name: "John Johnson",
        relationship: "Spouse",
        phone: "+1 (555) 123-4568",
      },
    },
    {
      id: "STAFF002",
      name: "Prof. Michael Chen",
      email: "michael.chen@eduos.com",
      phone: "+1 (555) 234-5678",
      department: "Science",
      role: "Physics Teacher",
      employeeId: "EMP002",
      dateJoined: "2019-09-01",
      address: "456 Pine Avenue, Springfield, IL 62702",
      status: "Active",
      avatar: "/api/placeholder/150/150",
      qualifications: "MSc in Physics, BSc in Applied Physics",
      experience: "12 years",
      subjects: ["Physics", "Advanced Physics", "Laboratory Science"],
      salary: 75000,
      attendanceRate: 90.9,
      emergencyContact: {
        name: "Lisa Chen",
        relationship: "Spouse",
        phone: "+1 (555) 234-5679",
      },
    },
    {
      id: "STAFF003",
      name: "Ms. Emily Rodriguez",
      email: "emily.rodriguez@eduos.com",
      phone: "+1 (555) 345-6789",
      department: "Language Arts",
      role: "English Teacher",
      employeeId: "EMP003",
      dateJoined: "2021-01-10",
      address: "789 Elm Drive, Springfield, IL 62703",
      status: "Active",
      avatar: "/api/placeholder/150/150",
      qualifications: "MA in English Literature, BA in English",
      experience: "6 years",
      subjects: ["English Literature", "Creative Writing", "Grammar"],
      salary: 70000,
      attendanceRate: 100,
      emergencyContact: {
        name: "Maria Rodriguez",
        relationship: "Mother",
        phone: "+1 (555) 345-6790",
      },
    },
    {
      id: "STAFF004",
      name: "Mr. David Thompson",
      email: "david.thompson@eduos.com",
      phone: "+1 (555) 456-7890",
      department: "Administration",
      role: "Vice Principal",
      employeeId: "EMP004",
      dateJoined: "2018-03-20",
      address: "321 Maple Lane, Springfield, IL 62704",
      status: "Active",
      avatar: "/api/placeholder/150/150",
      qualifications: "MEd in Educational Leadership, BA in Education",
      experience: "15 years",
      subjects: ["Administration", "Educational Policy"],
      salary: 95000,
      attendanceRate: 95.5,
      emergencyContact: {
        name: "Jennifer Thompson",
        relationship: "Spouse",
        phone: "+1 (555) 456-7891",
      },
    },
    {
      id: "STAFF005",
      name: "Mrs. Lisa Williams",
      email: "lisa.williams@eduos.com",
      phone: "+1 (555) 567-8901",
      department: "Arts",
      role: "Art Teacher",
      employeeId: "EMP005",
      dateJoined: "2022-06-05",
      address: "654 Birch Road, Springfield, IL 62705",
      status: "On Leave",
      avatar: "/api/placeholder/150/150",
      qualifications: "BFA in Fine Arts, Certificate in Art Education",
      experience: "4 years",
      subjects: ["Visual Arts", "Art History", "Sculpture"],
      salary: 65000,
      attendanceRate: 86.4,
      emergencyContact: {
        name: "Robert Williams",
        relationship: "Spouse",
        phone: "+1 (555) 567-8902",
      },
    },
  ]);

  const departments = [
    "Mathematics",
    "Science",
    "Language Arts",
    "Administration",
    "Arts",
  ];

  // Filter staff based on search and department
  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || staff.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
    setShowDetailsModal(true);
  };

  const handleEditStaff = (staff) => {
    navigate(`/admin/staff/edit-teacher/${staff.id}`);
  };

  const handleDeleteStaff = (staff) => {
    setSelectedStaff(staff);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setStaffMembers((prev) => prev.filter((s) => s.id !== selectedStaff.id));
    setShowDeleteModal(false);
    toast.success(`${selectedStaff.name} has been removed from the system`);
  };

  const handleExportDirectory = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Email,Phone,Department,Role,Employee ID,Date Joined,Status,Salary\n" +
      filteredStaff
        .map(
          (staff) =>
            `"${staff.name}","${staff.email}","${staff.phone}","${staff.department}","${staff.role}","${staff.employeeId}","${staff.dateJoined}","${staff.status}","${staff.salary}"`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `staff_directory_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Staff directory exported successfully!");
  };

  const handleImportStaff = () => {
    // Create file input for CSV import
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // In a real app, you'd parse the CSV and add to staffMembers
        toast.success(`Importing staff data from ${file.name}...`);
        setTimeout(() => {
          toast.success("Staff data imported successfully!");
        }, 2000);
      }
    };
    input.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const StaffDetailsModal = ({ staff }) => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <Users className="w-10 h-10 text-gray-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{staff.name}</h3>
          <p className="text-gray-600">
            {staff.role} • {staff.department}
          </p>
          <Badge className={getStatusColor(staff.status)}>{staff.status}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Contact Information</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{staff.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{staff.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{staff.address}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Employment Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Employee ID:</span>
              <span className="font-medium">{staff.employeeId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date Joined:</span>
              <span className="font-medium">
                {new Date(staff.dateJoined).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Experience:</span>
              <span className="font-medium">{staff.experience}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Salary:</span>
              <span className="font-medium">
                ${staff.salary.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Qualifications</h4>
          <p className="text-gray-700">{staff.qualifications}</p>

          <h5 className="font-medium">Subjects Taught:</h5>
          <div className="flex flex-wrap gap-2">
            {staff.subjects.map((subject, index) => (
              <Badge key={index} variant="outline">
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Emergency Contact</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{staff.emergencyContact.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Relationship:</span>
              <span className="font-medium">
                {staff.emergencyContact.relationship}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">
                {staff.emergencyContact.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Attendance Rate:</span>
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  staff.attendanceRate >= 95
                    ? "bg-green-500"
                    : staff.attendanceRate >= 85
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${staff.attendanceRate}%` }}
              ></div>
            </div>
            <span className="font-medium">{staff.attendanceRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="text-blue-600" />
                Staff Directory
              </h1>
              <p className="text-gray-600">
                Manage all staff members and their information
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleImportStaff}>
                <Upload size={16} className="mr-2" />
                Import Staff
              </Button>
              <Button variant="outline" onClick={handleExportDirectory}>
                <Download size={16} className="mr-2" />
                Export Directory
              </Button>
              <Button onClick={() => navigate("/admin/staff/add-teacher")}>
                <Plus size={16} className="mr-2" />
                Add Staff Member
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  placeholder="Search by name, email, or employee ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Staff Directory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Members ({filteredStaff.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">{staff.name}</div>
                          <div className="text-sm text-gray-500">
                            {staff.role}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{staff.email}</div>
                        <div className="text-xs text-gray-500">
                          {staff.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{staff.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {staff.employeeId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(staff.status)}>
                        {staff.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            staff.attendanceRate >= 95
                              ? "bg-green-500"
                              : staff.attendanceRate >= 85
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-sm">{staff.attendanceRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(staff)}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditStaff(staff)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteStaff(staff)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Staff Details Modal */}
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Staff Details</DialogTitle>
            </DialogHeader>
            {selectedStaff && <StaffDetailsModal staff={selectedStaff} />}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </Button>
              <Button onClick={() => handleEditStaff(selectedStaff)}>
                <Edit size={16} className="mr-2" />
                Edit Details
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Are you sure you want to remove{" "}
                <strong>{selectedStaff?.name}</strong> from the system?
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This action cannot be undone.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                <Trash2 size={16} className="mr-2" />
                Delete Staff Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default StaffDirectory;
