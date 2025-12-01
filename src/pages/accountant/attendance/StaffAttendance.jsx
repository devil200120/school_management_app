import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  UserCheck,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Filter,
  Search,
  Plus,
  Edit,
  Save,
  ArrowLeft,
  TrendingUp,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AccountantStaffAttendance = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [searchQuery, setSearchQuery] = useState("");
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState("not_marked");

  // Current accountant data (only showing data for the logged-in accountant)
  const currentAccountant = {
    id: "ACC001",
    employeeId: "EMP2024001",
    name: "Sarah Johnson",
    role: "Senior Accountant",
    department: "Finance & Administration",
    email: "sarah.johnson@school.edu",
    phone: "+1234567890",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
    joinDate: "2022-03-15",
    workingHours: "8:00 AM - 5:00 PM",
    currentSalary: null, // Note: No salary calculation for accountant attendance
  };

  // Mock attendance records for the current accountant
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: "ATT001",
      date: "2024-12-01",
      checkIn: "08:45",
      checkOut: "17:30",
      status: "present",
      totalHours: "8h 45m",
      remarks: "",
    },
    {
      id: "ATT002",
      date: "2024-11-30",
      checkIn: "09:15",
      checkOut: "17:45",
      status: "late",
      totalHours: "8h 30m",
      remarks: "Traffic delay",
    },
    {
      id: "ATT003",
      date: "2024-11-29",
      checkIn: "08:30",
      checkOut: "17:15",
      status: "present",
      totalHours: "8h 45m",
      remarks: "",
    },
    {
      id: "ATT004",
      date: "2024-11-28",
      checkIn: null,
      checkOut: null,
      status: "absent",
      totalHours: "0h",
      remarks: "Sick leave approved",
    },
    {
      id: "ATT005",
      date: "2024-11-27",
      checkIn: "08:40",
      checkOut: "17:20",
      status: "present",
      totalHours: "8h 40m",
      remarks: "",
    },
  ]);

  // Calculate attendance statistics
  const calculateStats = () => {
    const currentMonthRecords = attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getMonth() + 1 === filterMonth &&
        recordDate.getFullYear() === filterYear
      );
    });

    const totalDays = currentMonthRecords.length;
    const presentDays = currentMonthRecords.filter(
      (r) => r.status === "present"
    ).length;
    const lateDays = currentMonthRecords.filter(
      (r) => r.status === "late"
    ).length;
    const absentDays = currentMonthRecords.filter(
      (r) => r.status === "absent"
    ).length;
    const attendancePercentage =
      totalDays > 0
        ? Math.round(((presentDays + lateDays) / totalDays) * 100)
        : 0;

    // Calculate total working hours
    const totalMinutes = currentMonthRecords.reduce((acc, record) => {
      if (record.totalHours && record.totalHours !== "0h") {
        const [hours, minutes] = record.totalHours
          .replace(/[hm]/g, "")
          .split(" ");
        return acc + parseInt(hours) * 60 + (parseInt(minutes) || 0);
      }
      return acc;
    }, 0);

    const totalWorkingHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return {
      totalDays,
      presentDays,
      lateDays,
      absentDays,
      attendancePercentage,
      totalWorkingHours: `${totalWorkingHours}h ${remainingMinutes}m`,
    };
  };

  const stats = calculateStats();

  // Handle manual attendance marking
  const handleMarkAttendance = () => {
    const today = new Date().toISOString().split("T")[0];
    const existingRecord = attendanceRecords.find((r) => r.date === today);

    if (existingRecord) {
      toast.info("Attendance already marked for today");
      return;
    }

    const currentTime = new Date();
    const checkInTime = currentTime.toTimeString().slice(0, 5);

    // Determine status based on check-in time
    const isLate =
      currentTime.getHours() > 9 ||
      (currentTime.getHours() === 9 && currentTime.getMinutes() > 0);

    const newRecord = {
      id: `ATT${Date.now()}`,
      date: today,
      checkIn: checkInTime,
      checkOut: null,
      status: isLate ? "late" : "present",
      totalHours: "In Progress",
      remarks: isLate ? "Late arrival" : "",
    };

    setAttendanceRecords((prev) => [newRecord, ...prev]);
    setAttendanceStatus(isLate ? "late" : "present");

    toast.success("Attendance marked successfully!", {
      description: `Check-in time: ${checkInTime}${isLate ? " (Late)" : ""}`,
    });
  };

  const handleCheckOut = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayRecord = attendanceRecords.find((r) => r.date === today);

    if (!todayRecord || !todayRecord.checkIn) {
      toast.error("Please check in first");
      return;
    }

    if (todayRecord.checkOut) {
      toast.info("Already checked out for today");
      return;
    }

    const currentTime = new Date();
    const checkOutTime = currentTime.toTimeString().slice(0, 5);

    // Calculate total hours
    const checkInDate = new Date(`${today}T${todayRecord.checkIn}`);
    const checkOutDate = new Date(`${today}T${checkOutTime}`);
    const diffMs = checkOutDate - checkInDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    const updatedRecords = attendanceRecords.map((record) =>
      record.date === today
        ? {
            ...record,
            checkOut: checkOutTime,
            totalHours: `${diffHours}h ${diffMinutes}m`,
          }
        : record
    );

    setAttendanceRecords(updatedRecords);
    toast.success("Check-out recorded!", {
      description: `Check-out time: ${checkOutTime}`,
    });
  };

  const handleEditAttendance = (record) => {
    setEditingAttendance(record);
  };

  const handleSaveEdit = (recordId, updates) => {
    setAttendanceRecords((prev) =>
      prev.map((record) =>
        record.id === recordId ? { ...record, ...updates } : record
      )
    );
    setEditingAttendance(null);
    toast.success("Attendance updated successfully");
  };

  const filteredRecords = attendanceRecords.filter((record) => {
    const recordDate = new Date(record.date);
    const matchesMonth = recordDate.getMonth() + 1 === filterMonth;
    const matchesYear = recordDate.getFullYear() === filterYear;
    const matchesSearch =
      record.date.includes(searchQuery) ||
      record.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.remarks &&
        record.remarks.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesMonth && matchesYear && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const config = {
      present: {
        variant: "default",
        label: "Present",
        className: "bg-green-100 text-green-800",
      },
      absent: {
        variant: "destructive",
        label: "Absent",
        className: "bg-red-100 text-red-800",
      },
      late: {
        variant: "secondary",
        label: "Late",
        className: "bg-yellow-100 text-yellow-800",
      },
    };

    const { variant, label, className } = config[status] || {
      variant: "outline",
      label: status,
    };

    return (
      <Badge variant={variant} className={className}>
        {label}
      </Badge>
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "late":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const todayRecord = attendanceRecords.find(
    (r) => r.date === new Date().toISOString().split("T")[0]
  );
  const hasCheckedIn = todayRecord && todayRecord.checkIn;
  const hasCheckedOut = todayRecord && todayRecord.checkOut;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/accountant/attendance")}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Hub
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <UserCheck className="text-blue-600" />
                My Attendance Records
              </h1>
              <p className="text-gray-600">
                Manage your daily attendance and work hours
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => window.print()}>
                <Download size={16} className="mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Current User Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                  <AvatarImage
                    src={currentAccountant.photo}
                    alt={currentAccountant.name}
                  />
                  <AvatarFallback className="bg-blue-600 text-white text-lg">
                    {currentAccountant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentAccountant.name}
                  </h2>
                  <p className="text-blue-700 font-medium">
                    {currentAccountant.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {currentAccountant.department}
                  </p>
                  <p className="text-gray-600 text-sm">
                    ID: {currentAccountant.employeeId}
                  </p>
                </div>
              </div>

              <div className="text-right space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(
                    hasCheckedOut
                      ? "present"
                      : hasCheckedIn
                      ? "present"
                      : "not_marked"
                  )}
                  <span className="font-semibold">
                    {!hasCheckedIn
                      ? "Not Checked In"
                      : !hasCheckedOut
                      ? "Checked In"
                      : "Day Complete"}
                  </span>
                </div>

                <div className="space-x-2">
                  <Button
                    onClick={handleMarkAttendance}
                    disabled={hasCheckedIn}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {hasCheckedIn ? "Checked In" : "Check In"}
                  </Button>

                  <Button
                    onClick={handleCheckOut}
                    disabled={!hasCheckedIn || hasCheckedOut}
                    variant="outline"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {hasCheckedOut ? "Checked Out" : "Check Out"}
                  </Button>
                </div>

                {todayRecord && todayRecord.checkIn && (
                  <div className="text-sm text-gray-600">
                    In: {todayRecord.checkIn}{" "}
                    {todayRecord.checkOut && `• Out: ${todayRecord.checkOut}`}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Attendance Rate
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.attendancePercentage}%
                  </p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Present Days
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.presentDays}
                  </p>
                  <p className="text-xs text-gray-500">
                    Out of {stats.totalDays}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Late Days</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.lateDays}
                  </p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Working Hours
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.totalWorkingHours}
                  </p>
                  <p className="text-xs text-gray-500">Total this month</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Attendance History</span>
              <div className="flex items-center gap-2 text-sm font-normal">
                <Filter className="h-4 w-4" />
                <Select
                  value={filterMonth.toString()}
                  onValueChange={(value) => setFilterMonth(parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filterYear.toString()}
                  onValueChange={(value) => setFilterYear(parseInt(value))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2023, 2024, 2025].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
            <CardDescription className="flex items-center gap-4">
              <span>Your daily attendance records and work hours</span>
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  placeholder="Search by date, status, or remarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-gray-500"
                      >
                        No attendance records found for the selected period
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            {getStatusBadge(record.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {record.checkIn ? (
                            <span className="font-mono">{record.checkIn}</span>
                          ) : (
                            <span className="text-gray-400">--</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {record.checkOut ? (
                            <span className="font-mono">{record.checkOut}</span>
                          ) : record.status === "absent" ? (
                            <span className="text-gray-400">--</span>
                          ) : (
                            <span className="text-yellow-600 text-sm">
                              In progress
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {record.totalHours}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">
                            {record.remarks || "--"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditAttendance(record)}
                            disabled={
                              record.date ===
                              new Date().toISOString().split("T")[0]
                            }
                          >
                            <Edit size={14} className="mr-1" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">
                  Note: Salary Calculation Not Applied
                </h3>
                <p className="text-blue-700 text-sm">
                  This attendance system is for time tracking purposes only.
                  Accountant salaries are processed separately and do not depend
                  on daily attendance records. For payroll inquiries, please
                  contact HR administration.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountantStaffAttendance;
