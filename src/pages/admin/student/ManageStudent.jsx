import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../../components/ui/table";
import { useToast } from "../../../hooks/use-toast";
import { motion } from "framer-motion";
import {
  Search,
  FileDown,
  FileUp,
  UserPlus,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  GraduationCap,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  BarChart3,
  Download,
  RefreshCw,
  MessageSquare,
  UserCog,
  Archive,
  Hash,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const ManageStudent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [level, setLevel] = useState("");
  const [session, setSession] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Enhanced student data with comprehensive information
  const [studentsData, setStudentsData] = useState([
    {
      id: 1,
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      middleName: "Michael",
      admissionId: "STU-2024-001",
      level: "Primary",
      class: "Primary One A",
      gender: "Male",
      status: "Active",
      dateOfBirth: "2015-03-15",
      admissionDate: "2024-01-15",
      email: "john.doe@email.com",
      phone: "+234-801-234-5678",
      address: "123 Main Street, Lagos",
      nationality: "Nigerian",
      bloodGroup: "O+",
      parentName: "Michael Doe",
      parentPhone: "+234-803-456-7890",
      parentEmail: "michael.doe@email.com",
      parentOccupation: "Engineer",
      relationship: "Father",
      emergencyContact: "+234-805-678-9012",
      medicalConditions: "None",
      subjects: ["Mathematics", "English", "Science"],
      averageGrade: 85.5,
      attendance: 95,
      fees: {
        totalFees: 150000,
        paidFees: 120000,
        balanceFees: 30000,
        lastPayment: "2024-09-15",
      },
      notes: "Excellent student with strong academic performance.",
    },
    {
      id: 2,
      name: "Jane Smith",
      firstName: "Jane",
      lastName: "Smith",
      middleName: "Grace",
      admissionId: "STU-2024-002",
      level: "Primary",
      class: "Primary One A",
      gender: "Female",
      status: "Active",
      dateOfBirth: "2015-07-22",
      admissionDate: "2024-01-20",
      email: "jane.smith@email.com",
      phone: "+234-802-345-6789",
      address: "456 Oak Avenue, Abuja",
      nationality: "Nigerian",
      bloodGroup: "A+",
      parentName: "Grace Smith",
      parentPhone: "+234-804-567-8901",
      parentEmail: "grace.smith@email.com",
      parentOccupation: "Doctor",
      relationship: "Mother",
      emergencyContact: "+234-806-789-0123",
      medicalConditions: "Asthma",
      subjects: ["Mathematics", "English", "Science"],
      averageGrade: 92.0,
      attendance: 98,
      fees: {
        totalFees: 150000,
        paidFees: 150000,
        balanceFees: 0,
        lastPayment: "2024-10-01",
      },
      notes: "Outstanding student, class prefect.",
    },
    {
      id: 3,
      name: "Peter Johnson",
      firstName: "Peter",
      lastName: "Johnson",
      middleName: "David",
      admissionId: "STU-2024-003",
      level: "Primary",
      class: "Primary One B",
      gender: "Male",
      status: "Suspended",
      dateOfBirth: "2015-11-08",
      admissionDate: "2024-02-01",
      email: "peter.johnson@email.com",
      phone: "+234-803-456-7890",
      address: "789 Pine Street, Port Harcourt",
      nationality: "Nigerian",
      bloodGroup: "B+",
      parentName: "David Johnson",
      parentPhone: "+234-805-678-9012",
      parentEmail: "david.johnson@email.com",
      parentOccupation: "Lawyer",
      relationship: "Father",
      emergencyContact: "+234-807-890-1234",
      medicalConditions: "None",
      subjects: ["Mathematics", "English", "Science"],
      averageGrade: 72.3,
      attendance: 85,
      fees: {
        totalFees: 150000,
        paidFees: 75000,
        balanceFees: 75000,
        lastPayment: "2024-08-15",
      },
      notes:
        "Suspended for disciplinary issues. Meeting scheduled with parents.",
    },
    {
      id: 4,
      name: "Mary Wilson",
      firstName: "Mary",
      lastName: "Wilson",
      middleName: "Elizabeth",
      admissionId: "STU-2024-004",
      level: "Primary",
      class: "Primary Two A",
      gender: "Female",
      status: "Active",
      dateOfBirth: "2014-05-12",
      admissionDate: "2024-01-25",
      email: "mary.wilson@email.com",
      phone: "+234-804-567-8901",
      address: "321 Elm Drive, Kano",
      nationality: "Nigerian",
      bloodGroup: "AB+",
      parentName: "Elizabeth Wilson",
      parentPhone: "+234-806-789-0123",
      parentEmail: "elizabeth.wilson@email.com",
      parentOccupation: "Teacher",
      relationship: "Mother",
      emergencyContact: "+234-808-901-2345",
      medicalConditions: "Allergic to nuts",
      subjects: ["Mathematics", "English", "Science", "Social Studies"],
      averageGrade: 88.7,
      attendance: 96,
      fees: {
        totalFees: 150000,
        paidFees: 150000,
        balanceFees: 0,
        lastPayment: "2024-09-30",
      },
      notes: "Excellent performance in all subjects.",
    },
    {
      id: 5,
      name: "David Brown",
      firstName: "David",
      lastName: "Brown",
      middleName: "Christopher",
      admissionId: "STU-2024-005",
      level: "Primary",
      class: "Primary Two B",
      gender: "Male",
      status: "Inactive",
      dateOfBirth: "2014-09-03",
      admissionDate: "2024-02-10",
      email: "david.brown@email.com",
      phone: "+234-805-678-9012",
      address: "654 Maple Road, Ibadan",
      nationality: "Nigerian",
      bloodGroup: "O-",
      parentName: "Christopher Brown",
      parentPhone: "+234-807-890-1234",
      parentEmail: "christopher.brown@email.com",
      parentOccupation: "Banker",
      relationship: "Father",
      emergencyContact: "+234-809-012-3456",
      medicalConditions: "None",
      subjects: ["Mathematics", "English", "Science", "Social Studies"],
      averageGrade: 79.2,
      attendance: 92,
      fees: {
        totalFees: 150000,
        paidFees: 100000,
        balanceFees: 50000,
        lastPayment: "2024-07-20",
      },
      notes: "Student on leave due to family relocation.",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!level) {
      toast({
        title: "Validation Error",
        description: "Please select a level",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!session) {
      toast({
        title: "Validation Error",
        description: "Please select a session",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowStudents(true);
      toast({
        title: "Success",
        description: `Students loaded for ${level} level, ${session} session`,
        duration: 3000,
      });
    }, 800);
  };

  // Enhanced filtering logic
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      student.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesClass = classFilter === "all" || student.class === classFilter;
    const matchesGender =
      genderFilter === "all" ||
      student.gender.toLowerCase() === genderFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesClass && matchesGender;
  });

  // Enhanced sorting logic
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleExport = () => {
    try {
      const exportData = sortedStudents.map((student) => ({
        "Admission ID": student.admissionId,
        "Full Name": student.name,
        Class: student.class,
        Gender: student.gender,
        Status: student.status,
        Email: student.email,
        Phone: student.phone,
        "Parent Name": student.parentName,
        "Parent Phone": student.parentPhone,
        "Average Grade": student.averageGrade,
        "Attendance %": student.attendance,
        "Balance Fees": student.fees.balanceFees,
      }));

      const csv = [
        Object.keys(exportData[0]).join(","),
        ...exportData.map((row) =>
          Object.values(row)
            .map((val) => `"${val}"`)
            .join(",")
        ),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `students_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Student data exported successfully!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleImport = () => {
    toast({
      title: "Import Feature",
      description: "Please select an Excel or CSV file to import student data",
      duration: 3000,
    });
  };

  const handleAddStudent = () => {
    navigate("/admin/student/add");
  };

  const handleDeleteStudent = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setStudentsData((prev) =>
        prev.filter((student) => student.id !== deletingId)
      );
      toast({
        title: "Success",
        description: "Student deleted successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete student. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setShowDeleteDialog(false);
      setDeletingId(null);
    }
  };

  const handleSendMessage = () => {
    // Get message details from form
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const sendToParentCheckbox = document.getElementById("sendToParent");

    const subject = subjectInput?.value || "";
    const message = messageInput?.value || "";
    const sendToParent = sendToParentCheckbox?.checked || false;

    // Validate inputs
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both subject and message.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Simulate sending message
    const recipients = [`${selectedStudent?.name} (${selectedStudent?.email})`];
    if (sendToParent) {
      recipients.push(
        `Parent/Guardian (${
          selectedStudent?.parentEmail || "parent@example.com"
        })`
      );
    }

    // Create detailed message summary
    const messageSummary = `
MESSAGE SENT SUCCESSFULLY
=========================

To: ${recipients.join(", ")}
Subject: ${subject}
Message: ${message}
Sent Date: ${new Date().toLocaleString()}
Status: Delivered

The message has been sent to the specified recipients and they will receive it via email and SMS notification.
    `;

    toast({
      title: "Message Sent Successfully",
      description: `Message sent to ${recipients.length} recipient(s).`,
      duration: 4000,
    });

    // Show detailed confirmation
    alert(messageSummary);

    // Clear form and close dialog
    if (subjectInput) subjectInput.value = "";
    if (messageInput) messageInput.value = "";
    if (sendToParentCheckbox) sendToParentCheckbox.checked = false;

    setShowMessageDialog(false);
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "inactive":
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case "suspended":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "text-green-600 bg-green-50 border-green-200",
      inactive: "text-gray-600 bg-gray-50 border-gray-200",
      suspended: "text-red-600 bg-red-50 border-red-200",
    };
    return (
      colors[status.toLowerCase()] || "text-gray-600 bg-gray-50 border-gray-200"
    );
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return "text-green-600 bg-green-50";
    if (grade >= 80) return "text-blue-600 bg-blue-50";
    if (grade >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getStats = () => {
    const total = studentsData.length;
    const active = studentsData.filter((s) => s.status === "Active").length;
    const inactive = studentsData.filter((s) => s.status === "Inactive").length;
    const suspended = studentsData.filter(
      (s) => s.status === "Suspended"
    ).length;
    const averageGrade =
      studentsData.reduce((sum, s) => sum + s.averageGrade, 0) / total;
    const averageAttendance =
      studentsData.reduce((sum, s) => sum + s.attendance, 0) / total;
    const totalOwed = studentsData.reduce(
      (sum, s) => sum + s.fees.balanceFees,
      0
    );

    return {
      total,
      active,
      inactive,
      suspended,
      averageGrade: averageGrade.toFixed(1),
      averageAttendance: averageAttendance.toFixed(1),
      totalOwed,
    };
  };

  const stats = getStats();

  return (
    <div className="space-y-6 p-4 md:p-6 pb-16">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-eduos-primary">
          Student Management System
        </h2>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-1"
          >
            <FileDown size={16} />
            Export
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleImport}
            className="flex items-center gap-1"
          >
            <FileUp size={16} />
            Import
          </Button>

          <Button
            size="sm"
            onClick={handleAddStudent}
            className="flex items-center gap-1 bg-eduos-primary hover:bg-eduos-secondary"
          >
            <UserPlus size={16} />
            Add Student
          </Button>
        </div>
      </motion.div>

      {/* Statistics Dashboard */}
      {showStudents && (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          <Card className="animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <XCircle className="w-8 h-8 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Inactive</p>
                  <p className="text-2xl font-bold">{stats.inactive}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Suspended</p>
                  <p className="text-2xl font-bold">{stats.suspended}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-400">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Avg Grade</p>
                  <p className="text-2xl font-bold">{stats.averageGrade}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-indigo-500" />
                <div>
                  <p className="text-sm text-gray-600">Avg Attendance</p>
                  <p className="text-2xl font-bold">
                    {stats.averageAttendance}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Hash className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Total Owed</p>
                  <p className="text-xl font-bold">
                    ₦{stats.totalOwed.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Select Application Session And Level</CardTitle>
            <CardDescription className="text-white/80">
              Filter students by session and education level
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="level">Select Level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="junior">Junior Secondary</SelectItem>
                      <SelectItem value="senior">Senior Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session">Select Session</Label>
                  <Select value={session} onValueChange={setSession}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Session" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-eduos-primary hover:bg-eduos-secondary transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load Students"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {showStudents && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Enhanced Filters */}
          <Card className="mt-3 animate-fade-in delay-100">
            <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Advanced Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    className="pl-10"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="Primary One A">Primary One A</SelectItem>
                    <SelectItem value="Primary One B">Primary One B</SelectItem>
                    <SelectItem value="Primary Two A">Primary Two A</SelectItem>
                    <SelectItem value="Primary Two B">Primary Two B</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setClassFilter("all");
                    setGenderFilter("all");
                  }}
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="text-xl font-semibold text-eduos-primary flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Student Directory - {level} Level ({sortedStudents.length})
            </h3>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50 sticky top-0">
                  <TableRow>
                    <TableHead
                      className="font-semibold cursor-pointer"
                      onClick={() => handleSort("admissionId")}
                    >
                      <div className="flex items-center">
                        Admission ID
                        <RefreshCw className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Name
                        <RefreshCw className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold cursor-pointer"
                      onClick={() => handleSort("class")}
                    >
                      <div className="flex items-center">
                        Class
                        <RefreshCw className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Gender</TableHead>
                    <TableHead
                      className="font-semibold cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center">
                        Status
                        <RefreshCw className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold cursor-pointer"
                      onClick={() => handleSort("averageGrade")}
                    >
                      <div className="flex items-center">
                        Grade
                        <RefreshCw className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold cursor-pointer"
                      onClick={() => handleSort("attendance")}
                    >
                      <div className="flex items-center">
                        Attendance
                        <RefreshCw className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Balance</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedStudents.length > 0 ? (
                    sortedStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium font-mono">
                          {student.admissionId}
                        </TableCell>
                        <TableCell className="font-medium">
                          {student.name}
                        </TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(student.status)}
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                student.status
                              )}`}
                            >
                              {student.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(
                              student.averageGrade
                            )}`}
                          >
                            {student.averageGrade}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-blue-500" />
                            {student.attendance}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${
                              student.fees.balanceFees > 0
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            ₦{student.fees.balanceFees.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedStudent(student);
                                setShowViewDialog(true);
                              }}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedStudent(student);
                                setShowEditDialog(true);
                              }}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedStudent(student);
                                setShowMessageDialog(true);
                              }}
                            >
                              <MessageSquare className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setDeletingId(student.id);
                                setShowDeleteDialog(true);
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="text-center py-8 text-gray-500"
                      >
                        No students found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center pt-4">
            <p className="text-sm text-gray-500">
              Showing {sortedStudents.length} of {studentsData.length} students
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* View Student Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Student Profile - {selectedStudent?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium">Full Name</Label>
                        <p className="text-sm mt-1">{selectedStudent.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Admission ID
                        </Label>
                        <p className="text-sm mt-1 font-mono">
                          {selectedStudent.admissionId}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Gender</Label>
                        <p className="text-sm mt-1">{selectedStudent.gender}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Date of Birth
                        </Label>
                        <p className="text-sm mt-1">
                          {selectedStudent.dateOfBirth}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Nationality
                        </Label>
                        <p className="text-sm mt-1">
                          {selectedStudent.nationality}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Blood Group
                        </Label>
                        <p className="text-sm mt-1">
                          {selectedStudent.bloodGroup}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Address</Label>
                      <p className="text-sm mt-1">{selectedStudent.address}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium">Class</Label>
                        <p className="text-sm mt-1">{selectedStudent.class}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Level</Label>
                        <p className="text-sm mt-1">{selectedStudent.level}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Average Grade
                        </Label>
                        <p
                          className={`text-sm mt-1 font-semibold ${
                            getGradeColor(selectedStudent.averageGrade).split(
                              " "
                            )[0]
                          }`}
                        >
                          {selectedStudent.averageGrade}%
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Attendance
                        </Label>
                        <p className="text-sm mt-1 font-semibold text-blue-600">
                          {selectedStudent.attendance}%
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Admission Date
                        </Label>
                        <p className="text-sm mt-1">
                          {selectedStudent.admissionDate}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(selectedStudent.status)}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                              selectedStudent.status
                            )}`}
                          >
                            {selectedStudent.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Subjects</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedStudent.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact & Parent Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm mt-1">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p className="text-sm mt-1">{selectedStudent.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Emergency Contact
                      </Label>
                      <p className="text-sm mt-1">
                        {selectedStudent.emergencyContact}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Medical Conditions
                      </Label>
                      <p className="text-sm mt-1">
                        {selectedStudent.medicalConditions}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Parent/Guardian Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <p className="text-sm mt-1">
                          {selectedStudent.parentName}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Relationship
                        </Label>
                        <p className="text-sm mt-1">
                          {selectedStudent.relationship}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p className="text-sm mt-1">
                        {selectedStudent.parentPhone}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm mt-1">
                        {selectedStudent.parentEmail}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Occupation</Label>
                      <p className="text-sm mt-1">
                        {selectedStudent.parentOccupation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Financial Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Total Fees</Label>
                      <p className="text-lg font-semibold mt-1">
                        ₦{selectedStudent.fees.totalFees.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Paid Fees</Label>
                      <p className="text-lg font-semibold mt-1 text-green-600">
                        ₦{selectedStudent.fees.paidFees.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Balance</Label>
                      <p
                        className={`text-lg font-semibold mt-1 ${
                          selectedStudent.fees.balanceFees > 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        ₦{selectedStudent.fees.balanceFees.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Last Payment
                      </Label>
                      <p className="text-sm mt-1">
                        {selectedStudent.fees.lastPayment}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Notes & Comments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedStudent.notes}</p>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setShowViewDialog(false);
                setShowEditDialog(true);
              }}
              className="bg-eduos-primary hover:bg-eduos-secondary"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Send Message
            </DialogTitle>
            <DialogDescription>
              Send a message to {selectedStudent?.name} and their
              parent/guardian.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter message subject" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message..."
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sendToParent" defaultChecked />
              <Label htmlFor="sendToParent" className="text-sm">
                Also send to parent/guardian
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowMessageDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              className="bg-eduos-primary hover:bg-eduos-secondary"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this student? This action cannot
              be undone and will remove all associated records.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteStudent}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageStudent;
