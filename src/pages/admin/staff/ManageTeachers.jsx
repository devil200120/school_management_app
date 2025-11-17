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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import {
  Search,
  FileSpreadsheet,
  Printer,
  Copy,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  UserPlus,
  Users,
  GraduationCap,
  Building,
  Phone,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const ManageTeachers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Sample teacher data with comprehensive information
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      employeeId: "MAT001",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@school.com",
      phone: "+234 801 234 5678",
      department: "Mathematics",
      position: "Head Teacher",
      subjects: ["Mathematics", "Further Mathematics"],
      classes: ["SS 1A", "SS 2A", "SS 3A"],
      qualification: "M.Sc Mathematics",
      experience: 8,
      joinDate: "2020-01-15",
      employmentType: "permanent",
      basicSalary: 250000,
      allowances: 75000,
      housingAllowance: 40000,
      transportAllowance: 25000,
      teachingAllowance: 30000,
      grossSalary: 420000,
      taxDeduction: 25000,
      netSalary: 395000,
      bankName: "GTBank",
      accountNumber: "0123456789",
      status: "active",
      dateOfBirth: "1985-03-12",
      address: "123 Lagos Street, Ikeja, Lagos",
      emergencyContact: "Jane Doe - +234 802 345 6789",
    },
    {
      id: 2,
      employeeId: "ENG002",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@school.com",
      phone: "+234 803 456 7890",
      department: "English",
      position: "Senior Teacher",
      subjects: ["English Language", "Literature"],
      classes: ["JSS 1A", "JSS 2A"],
      qualification: "B.Ed English",
      experience: 5,
      joinDate: "2021-09-01",
      employmentType: "permanent",
      basicSalary: 200000,
      allowances: 50000,
      housingAllowance: 30000,
      transportAllowance: 20000,
      teachingAllowance: 25000,
      grossSalary: 325000,
      taxDeduction: 18000,
      netSalary: 307000,
      bankName: "First Bank",
      accountNumber: "1234567890",
      status: "active",
      dateOfBirth: "1988-07-22",
      address: "456 Abuja Road, Garki, FCT",
      emergencyContact: "Michael Johnson - +234 804 567 8901",
    },
    {
      id: 3,
      employeeId: "SCI003",
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@school.com",
      phone: "+234 805 678 9012",
      department: "Science",
      position: "Teacher",
      subjects: ["Physics", "Chemistry"],
      classes: ["SS 1B", "SS 2B"],
      qualification: "B.Sc Physics",
      experience: 3,
      joinDate: "2023-01-10",
      employmentType: "contract",
      basicSalary: 180000,
      allowances: 40000,
      housingAllowance: 25000,
      transportAllowance: 15000,
      teachingAllowance: 20000,
      grossSalary: 280000,
      taxDeduction: 15000,
      netSalary: 265000,
      bankName: "Zenith Bank",
      accountNumber: "2345678901",
      status: "active",
      dateOfBirth: "1990-11-05",
      address: "789 Port Harcourt Street, GRA, Rivers",
      emergencyContact: "Lisa Brown - +234 806 789 0123",
    },
    {
      id: 4,
      employeeId: "ART004",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@school.com",
      phone: "+234 807 890 1234",
      department: "Arts",
      position: "Teacher",
      subjects: ["Fine Arts", "Music"],
      classes: ["JSS 1B", "JSS 2B", "JSS 3B"],
      qualification: "B.A Fine Arts",
      experience: 4,
      joinDate: "2022-03-15",
      employmentType: "permanent",
      basicSalary: 170000,
      allowances: 35000,
      housingAllowance: 20000,
      transportAllowance: 12000,
      teachingAllowance: 18000,
      grossSalary: 255000,
      taxDeduction: 12000,
      netSalary: 243000,
      bankName: "UBA",
      accountNumber: "3456789012",
      status: "on-leave",
      dateOfBirth: "1987-09-18",
      address: "321 Kano Close, Kaduna",
      emergencyContact: "David Davis - +234 808 901 2345",
    },
    {
      id: 5,
      employeeId: "ADM005",
      firstName: "Robert",
      lastName: "Wilson",
      email: "robert.wilson@school.com",
      phone: "+234 809 012 3456",
      department: "Administration",
      position: "Vice Principal",
      subjects: [],
      classes: [],
      qualification: "M.Ed Educational Administration",
      experience: 12,
      joinDate: "2018-08-20",
      employmentType: "permanent",
      basicSalary: 400000,
      allowances: 100000,
      housingAllowance: 60000,
      transportAllowance: 40000,
      teachingAllowance: 0,
      grossSalary: 600000,
      taxDeduction: 40000,
      netSalary: 560000,
      bankName: "Access Bank",
      accountNumber: "4567890123",
      status: "active",
      dateOfBirth: "1975-12-10",
      address: "654 Ibadan Avenue, Oyo State",
      emergencyContact: "Mary Wilson - +234 810 123 4567",
    },
  ]);

  const departments = [
    "Mathematics",
    "English",
    "Science",
    "Arts",
    "Administration",
    "Physical Education",
  ];

  // Filter teachers based on search term, department, and status
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" || teacher.department === filterDepartment;
    const matchesStatus =
      filterStatus === "all" || teacher.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handle teacher actions
  const handleView = (teacher) => {
    setSelectedTeacher(teacher);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (teacher) => {
    toast.info(`Edit Teacher`, {
      description: `Redirecting to edit profile for ${teacher.firstName} ${teacher.lastName}...`,
      icon: <Edit className="h-4 w-4" />,
      duration: 2000,
    });
    navigate(`/admin/staff/edit-teacher/${teacher.id}`);
  };

  const handleDelete = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  const handleManageSalary = (teacher) => {
    toast.info(`Manage Salary`, {
      description: `Redirecting to salary management for ${teacher.firstName} ${teacher.lastName}...`,
      icon: <DollarSign className="h-4 w-4" />,
      duration: 2000,
    });
    navigate(`/admin/salary-management/teacher/${teacher.id}`);
  };

  const confirmDelete = () => {
    setTeachers((prev) =>
      prev.filter((teacher) => teacher.id !== selectedTeacher.id)
    );
    setIsDeleteDialogOpen(false);
    toast.success(`Teacher Removed`, {
      description: `${selectedTeacher.firstName} ${selectedTeacher.lastName} has been removed from the system.`,
      icon: <Trash2 className="h-4 w-4" />,
      duration: 4000,
    });
    setSelectedTeacher(null);
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "Employee ID",
        "Name",
        "Email",
        "Department",
        "Position",
        "Experience",
        "Basic Salary",
        "Gross Salary",
        "Net Salary",
        "Status",
        "Join Date",
      ],
      ...filteredTeachers.map((teacher) => [
        teacher.employeeId,
        `${teacher.firstName} ${teacher.lastName}`,
        teacher.email,
        teacher.department,
        teacher.position,
        `${teacher.experience} years`,
        teacher.basicSalary.toLocaleString(),
        teacher.grossSalary.toLocaleString(),
        teacher.netSalary.toLocaleString(),
        teacher.status,
        teacher.joinDate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `teachers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`CSV Export Complete`, {
      description: `Successfully exported ${filteredTeachers.length} teacher records.`,
      icon: <FileSpreadsheet className="h-4 w-4" />,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info(`Print Dialog Opened`, {
      icon: <Printer className="h-4 w-4" />,
    });
  };

  const handleCopy = () => {
    const tableData = filteredTeachers
      .map(
        (teacher) =>
          `${teacher.employeeId}\t${teacher.firstName} ${teacher.lastName}\t${
            teacher.email
          }\t${teacher.department}\t${
            teacher.position
          }\t₦${teacher.netSalary.toLocaleString()}`
      )
      .join("\n");

    navigator.clipboard.writeText(tableData).then(() => {
      toast.success(`Copied to Clipboard`, {
        description: `Successfully copied ${filteredTeachers.length} teacher records.`,
        icon: <Copy className="h-4 w-4" />,
      });
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            Inactive
          </Badge>
        );
      case "on-leave":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            On Leave
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Suspended
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            {status}
          </Badge>
        );
    }
  };

  const getEmploymentTypeBadge = (type) => {
    switch (type) {
      case "permanent":
        return (
          <Badge variant="outline" className="border-green-300 text-green-700">
            Permanent
          </Badge>
        );
      case "contract":
        return (
          <Badge variant="outline" className="border-blue-300 text-blue-700">
            Contract
          </Badge>
        );
      case "part-time":
        return (
          <Badge
            variant="outline"
            className="border-orange-300 text-orange-700"
          >
            Part-time
          </Badge>
        );
      case "temporary":
        return (
          <Badge
            variant="outline"
            className="border-purple-300 text-purple-700"
          >
            Temporary
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Teachers & Staff
        </h2>
        <Button
          className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300"
          onClick={() => navigate("/admin/staff/add-teacher")}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Teacher
        </Button>
      </div>

      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Teaching Staff Management
            <Badge className="bg-white text-eduos-primary ml-auto">
              {filteredTeachers.length} Teachers
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="flex gap-4 w-full sm:w-auto">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Search teachers..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select
                value={filterDepartment}
                onValueChange={setFilterDepartment}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by department" />
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

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleExportCSV}
              >
                <FileSpreadsheet className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Teacher</TableHead>
                  <TableHead className="bg-gray-100">Contact</TableHead>
                  <TableHead className="bg-gray-100">Department</TableHead>
                  <TableHead className="bg-gray-100">Position</TableHead>
                  <TableHead className="bg-gray-100">Salary</TableHead>
                  <TableHead className="bg-gray-100">Employment</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow
                    key={teacher.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium">
                          {teacher.firstName} {teacher.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {teacher.employeeId}
                        </div>
                        <div className="text-sm text-gray-500">
                          {teacher.experience} years exp.
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{teacher.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{teacher.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{teacher.department}</div>
                        {teacher.subjects.length > 0 && (
                          <div className="text-sm text-gray-500">
                            {teacher.subjects.slice(0, 2).join(", ")}
                            {teacher.subjects.length > 2 && "..."}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{teacher.position}</div>
                        {teacher.classes.length > 0 && (
                          <div className="text-sm text-gray-500">
                            {teacher.classes.length} classes
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-green-600">
                          ₦{teacher.netSalary.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          Basic: ₦{teacher.basicSalary.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getEmploymentTypeBadge(teacher.employmentType)}
                        <div className="text-xs text-gray-500">
                          Joined: {teacher.joinDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(teacher.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(teacher)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(teacher)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleManageSalary(teacher)}
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                        >
                          <DollarSign className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(teacher)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTeachers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      {searchTerm ||
                      filterDepartment !== "all" ||
                      filterStatus !== "all"
                        ? "No teachers found matching the current filters"
                        : "No teachers found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{filteredTeachers.length}</span> of{" "}
              <span className="font-medium">{teachers.length}</span> teachers
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Teacher Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Teacher Profile: {selectedTeacher?.firstName}{" "}
              {selectedTeacher?.lastName}
            </DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Employee ID
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedTeacher.employeeId}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedTeacher.firstName} {selectedTeacher.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </label>
                    <p className="text-sm">{selectedTeacher.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-sm">{selectedTeacher.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="text-sm">{selectedTeacher.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <div className="mt-1">
                      {getStatusBadge(selectedTeacher.status)}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label className="text-sm font-medium text-gray-500">
                      Address
                    </label>
                    <p className="text-sm">{selectedTeacher.address}</p>
                  </div>
                  <div className="col-span-3">
                    <label className="text-sm font-medium text-gray-500">
                      Emergency Contact
                    </label>
                    <p className="text-sm">
                      {selectedTeacher.emergencyContact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Department
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedTeacher.department}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Position
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedTeacher.position}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Employment Type
                    </label>
                    <div className="mt-1">
                      {getEmploymentTypeBadge(selectedTeacher.employmentType)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Qualification
                    </label>
                    <p className="text-sm">{selectedTeacher.qualification}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Experience
                    </label>
                    <p className="text-sm">
                      {selectedTeacher.experience} years
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Join Date
                    </label>
                    <p className="text-sm">{selectedTeacher.joinDate}</p>
                  </div>
                </div>

                {selectedTeacher.subjects.length > 0 && (
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-500">
                      Subjects Teaching
                    </label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTeacher.subjects.map((subject) => (
                        <Badge
                          key={subject}
                          variant="outline"
                          className="text-xs"
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTeacher.classes.length > 0 && (
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-500">
                      Classes Handling
                    </label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTeacher.classes.map((cls) => (
                        <Badge key={cls} variant="outline" className="text-xs">
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Salary Information */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Salary Information
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Basic Salary
                    </label>
                    <p className="text-sm font-semibold text-green-600">
                      ₦{selectedTeacher.basicSalary.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Allowances
                    </label>
                    <p className="text-sm font-semibold text-blue-600">
                      ₦{selectedTeacher.allowances.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Housing Allowance
                    </label>
                    <p className="text-sm font-semibold text-purple-600">
                      ₦{selectedTeacher.housingAllowance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Transport Allowance
                    </label>
                    <p className="text-sm font-semibold text-orange-600">
                      ₦{selectedTeacher.transportAllowance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Teaching Allowance
                    </label>
                    <p className="text-sm font-semibold text-indigo-600">
                      ₦{selectedTeacher.teachingAllowance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Tax Deduction
                    </label>
                    <p className="text-sm font-semibold text-red-600">
                      ₦{selectedTeacher.taxDeduction.toLocaleString()}
                    </p>
                  </div>
                  <div className="col-span-3 border-t pt-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Gross Salary
                        </label>
                        <p className="text-lg font-bold text-green-600">
                          ₦{selectedTeacher.grossSalary.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Net Salary
                        </label>
                        <p className="text-lg font-bold text-eduos-primary">
                          ₦{selectedTeacher.netSalary.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Information */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Bank Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Bank Name
                    </label>
                    <p className="text-sm font-semibold">
                      {selectedTeacher.bankName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Account Number
                    </label>
                    <p className="text-sm font-mono">
                      {selectedTeacher.accountNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false);
                handleEdit(selectedTeacher);
              }}
              className="bg-eduos-primary hover:bg-eduos-primary/90"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Teacher
            </Button>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false);
                handleManageSalary(selectedTeacher);
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Manage Salary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Teacher</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <strong>
                {selectedTeacher?.firstName} {selectedTeacher?.lastName}
              </strong>{" "}
              from the system? This action cannot be undone and will remove all
              associated records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Remove Teacher
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageTeachers;
