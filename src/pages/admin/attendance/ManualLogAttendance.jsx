import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Clock,
  CheckCircle,
  Users,
  ArrowLeft,
  UserCheck,
  Search,
  Calendar,
  FileText,
  Edit,
  Save,
  X,
  Plus,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
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

const ManualLogAttendance = () => {
  const navigate = useNavigate();
  const [selectedStaff, setSelectedStaff] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [editingLog, setEditingLog] = useState(null);
  const [showBulkEntry, setShowBulkEntry] = useState(false);

  // Sample staff data
  const [staff] = useState([
    {
      id: "TCH001",
      name: "John Doe",
      department: "Mathematics",
      position: "Head Teacher",
      employeeId: "EMP001",
    },
    {
      id: "TCH002",
      name: "Sarah Johnson",
      department: "English",
      position: "Senior Teacher",
      employeeId: "EMP002",
    },
    {
      id: "TCH003",
      name: "Michael Brown",
      department: "Science",
      position: "Teacher",
      employeeId: "EMP003",
    },
    {
      id: "ADM001",
      name: "Emily Davis",
      department: "Administration",
      position: "Accountant",
      employeeId: "EMP004",
    },
    {
      id: "TCH005",
      name: "Robert Wilson",
      department: "Physical Education",
      position: "PE Teacher",
      employeeId: "EMP005",
    },
  ]);

  // Manual attendance logs
  const [attendanceLogs, setAttendanceLogs] = useState([
    {
      id: 1,
      staffId: "TCH001",
      staffName: "John Doe",
      department: "Mathematics",
      date: "2024-11-17",
      checkInTime: "08:15:00",
      checkOutTime: "17:30:00",
      status: "present",
      notes: "On time arrival",
      loggedBy: "Admin",
      loggedAt: "2024-11-17 08:15:30",
      method: "Manual Log",
    },
    {
      id: 2,
      staffId: "TCH002",
      staffName: "Sarah Johnson",
      department: "English",
      date: "2024-11-17",
      checkInTime: "08:25:00",
      checkOutTime: null,
      status: "late",
      notes: "Traffic delay",
      loggedBy: "Admin",
      loggedAt: "2024-11-17 08:25:15",
      method: "Manual Log",
    },
    {
      id: 3,
      staffId: "TCH005",
      staffName: "Robert Wilson",
      department: "Physical Education",
      date: "2024-11-17",
      checkInTime: null,
      checkOutTime: null,
      status: "absent",
      notes: "Sick leave",
      loggedBy: "HR",
      loggedAt: "2024-11-17 09:00:00",
      method: "Manual Log",
    },
  ]);

  const departments = [
    "Mathematics",
    "English",
    "Science",
    "Administration",
    "Physical Education",
  ];

  // Filter logs based on search and filters
  const filteredLogs = attendanceLogs.filter((log) => {
    const matchesSearch =
      log.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = log.date === filterDate;
    const matchesDepartment =
      filterDepartment === "all" || log.department === filterDepartment;

    return matchesSearch && matchesDate && matchesDepartment;
  });

  // Get current time for default check-in
  useEffect(() => {
    const now = new Date();
    setCheckInTime(now.toTimeString().slice(0, 5));
  }, []);

  const handleManualEntry = () => {
    if (!selectedStaff) {
      toast.error("Please select a staff member");
      return;
    }

    const staffMember = staff.find((s) => s.id === selectedStaff);
    const newLog = {
      id: attendanceLogs.length + 1,
      staffId: selectedStaff,
      staffName: staffMember.name,
      department: staffMember.department,
      date: filterDate,
      checkInTime: attendanceStatus === "absent" ? null : checkInTime,
      checkOutTime: checkOutTime || null,
      status: attendanceStatus,
      notes: notes,
      loggedBy: "Admin", // In real app, this would be the current user
      loggedAt: new Date().toISOString(),
      method: "Manual Log",
    };

    setAttendanceLogs((prev) => [newLog, ...prev]);

    // Reset form
    setSelectedStaff("");
    setAttendanceStatus("present");
    setNotes("");
    setCheckOutTime("");

    toast.success("Attendance Recorded", {
      description: `${staffMember.name} marked as ${attendanceStatus}`,
      icon: <CheckCircle className="h-4 w-4" />,
    });
  };

  const handleEditLog = (log) => {
    setEditingLog({
      ...log,
      originalId: log.id,
    });
  };

  const saveEditedLog = () => {
    if (!editingLog) return;

    setAttendanceLogs((prev) =>
      prev.map((log) =>
        log.id === editingLog.originalId
          ? {
              ...log,
              checkInTime: editingLog.checkInTime,
              checkOutTime: editingLog.checkOutTime,
              status: editingLog.status,
              notes: editingLog.notes,
            }
          : log
      )
    );

    setEditingLog(null);
    toast.success("Attendance Updated", {
      icon: <Save className="h-4 w-4" />,
    });
  };

  const deleteLog = (logId) => {
    setAttendanceLogs((prev) => prev.filter((log) => log.id !== logId));
    toast.success("Attendance Log Deleted", {
      icon: <X className="h-4 w-4" />,
    });
  };

  const exportLogs = () => {
    const csvContent = [
      [
        "Staff ID",
        "Name",
        "Department",
        "Date",
        "Check In",
        "Check Out",
        "Status",
        "Notes",
        "Logged By",
      ],
      ...filteredLogs.map((log) => [
        log.staffId,
        log.staffName,
        log.department,
        log.date,
        log.checkInTime || "N/A",
        log.checkOutTime || "N/A",
        log.status,
        log.notes,
        log.loggedBy,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `manual_attendance_${filterDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Export Complete", {
      description: "Attendance logs have been exported successfully.",
      icon: <Download className="h-4 w-4" />,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Present
          </Badge>
        );
      case "absent":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Absent
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Late
          </Badge>
        );
      case "half_day":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Half Day
          </Badge>
        );
      case "sick_leave":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            Sick Leave
          </Badge>
        );
      case "vacation":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
            Vacation
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

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/attendance/staff")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Hub
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in flex items-center gap-3">
              <Clock className="h-8 w-8" />
              Manual Attendance Log
            </h2>
            <p className="text-muted-foreground mt-1">
              Traditional attendance recording and management
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={exportLogs}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={() => setShowBulkEntry(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Bulk Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Manual Entry Form */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Record Attendance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Staff Member
                </label>
                <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} ({member.employeeId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select
                  value={attendanceStatus}
                  onValueChange={setAttendanceStatus}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="half_day">Half Day</SelectItem>
                    <SelectItem value="sick_leave">Sick Leave</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {attendanceStatus !== "absent" && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Check-in Time
                  </label>
                  <Input
                    type="time"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Check-out Time (Optional)
                </label>
                <Input
                  type="time"
                  value={checkOutTime}
                  onChange={(e) => setCheckOutTime(e.target.value)}
                  placeholder="Leave blank if not available"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Notes</label>
                <Textarea
                  placeholder="Additional notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={handleManualEntry}
                disabled={!selectedStaff}
                className="w-full bg-eduos-primary hover:bg-eduos-secondary"
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Record Attendance
              </Button>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Quick Tip:</strong> Use manual entry for retroactive
                  attendance, corrections, or when other methods are
                  unavailable.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Logs */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Attendance Records
                <Badge variant="outline" className="ml-auto">
                  {filteredLogs.length} entries
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6 flex-wrap">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    placeholder="Search staff..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <Input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-40"
                  />
                </div>

                <Select
                  value={filterDepartment}
                  onValueChange={setFilterDepartment}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter department" />
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

              {/* Attendance Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Logged By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{log.staffName}</p>
                            <p className="text-sm text-gray-500">
                              {log.staffId} • {log.department}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>In: {log.checkInTime || "N/A"}</p>
                            <p>Out: {log.checkOutTime || "N/A"}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-600 max-w-32 truncate">
                            {log.notes || "No notes"}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{log.loggedBy}</p>
                            <p className="text-gray-500">
                              {new Date(log.loggedAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditLog(log)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteLog(log.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredLogs.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-gray-500"
                        >
                          No attendance records found for the selected filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {
                      filteredLogs.filter((log) => log.status === "present")
                        .length
                    }
                  </p>
                  <p className="text-sm text-gray-600">Present</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">
                    {
                      filteredLogs.filter((log) => log.status === "absent")
                        .length
                    }
                  </p>
                  <p className="text-sm text-gray-600">Absent</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {filteredLogs.filter((log) => log.status === "late").length}
                  </p>
                  <p className="text-sm text-gray-600">Late</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {
                      filteredLogs.filter(
                        (log) =>
                          log.status === "half_day" ||
                          log.status === "sick_leave" ||
                          log.status === "vacation"
                      ).length
                    }
                  </p>
                  <p className="text-sm text-gray-600">Leave</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Log Modal */}
      <Dialog
        open={!!editingLog}
        onOpenChange={(open) => !open && setEditingLog(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Attendance Record
            </DialogTitle>
          </DialogHeader>
          {editingLog && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Staff Member
                </label>
                <Input value={editingLog.staffName} disabled />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select
                  value={editingLog.status}
                  onValueChange={(value) =>
                    setEditingLog({ ...editingLog, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="half_day">Half Day</SelectItem>
                    <SelectItem value="sick_leave">Sick Leave</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {editingLog.status !== "absent" && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Check-in Time
                  </label>
                  <Input
                    type="time"
                    value={editingLog.checkInTime || ""}
                    onChange={(e) =>
                      setEditingLog({
                        ...editingLog,
                        checkInTime: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Check-out Time
                </label>
                <Input
                  type="time"
                  value={editingLog.checkOutTime || ""}
                  onChange={(e) =>
                    setEditingLog({
                      ...editingLog,
                      checkOutTime: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Notes</label>
                <Textarea
                  value={editingLog.notes || ""}
                  onChange={(e) =>
                    setEditingLog({ ...editingLog, notes: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={saveEditedLog}
                  className="flex-1 bg-eduos-primary hover:bg-eduos-secondary"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditingLog(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bulk Entry Modal */}
      <Dialog open={showBulkEntry} onOpenChange={setShowBulkEntry}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Bulk Attendance Entry
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Coming Soon:</strong> Bulk attendance entry will allow
                you to record attendance for multiple staff members at once
                using CSV upload or batch form entry.
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowBulkEntry(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManualLogAttendance;
