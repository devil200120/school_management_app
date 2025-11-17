import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  UserCheck,
  QrCode,
  CreditCard,
  Camera,
  Clock,
  Users,
  TrendingUp,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Eye,
  Settings,
  Download,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
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
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

const StaffAttendanceHub = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect if we're in admin or accountant context
  const isAccountantView = location.pathname.includes("/accountant/");
  const baseRoute = isAccountantView
    ? "/accountant/attendance"
    : "/admin/attendance";

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [attendanceFilter, setAttendanceFilter] = useState("all");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Sample staff attendance data
  const [todayAttendance, setTodayAttendance] = useState([
    {
      id: 1,
      staffId: "TCH001",
      name: "John Doe",
      department: "Mathematics",
      position: "Head Teacher",
      checkInTime: "08:15:00",
      checkInMethod: "facial_recognition",
      status: "present",
      lateMinutes: 0,
      profileImage: "/api/placeholder/32/32",
    },
    {
      id: 2,
      staffId: "TCH002",
      name: "Sarah Johnson",
      department: "English",
      position: "Senior Teacher",
      checkInTime: "08:22:00",
      checkInMethod: "qr_code",
      status: "late",
      lateMinutes: 7,
      profileImage: "/api/placeholder/32/32",
    },
    {
      id: 3,
      staffId: "TCH003",
      name: "Michael Brown",
      department: "Science",
      position: "Teacher",
      checkInTime: "08:45:00",
      checkInMethod: "nfc_tap",
      status: "late",
      lateMinutes: 30,
      profileImage: "/api/placeholder/32/32",
    },
    {
      id: 4,
      staffId: "ADM001",
      name: "Emily Davis",
      department: "Administration",
      position: "Accountant",
      checkInTime: "07:55:00",
      checkInMethod: "manual_log",
      status: "early",
      lateMinutes: -20,
      profileImage: "/api/placeholder/32/32",
    },
    {
      id: 5,
      staffId: "TCH005",
      name: "Robert Wilson",
      department: "Physical Education",
      position: "PE Teacher",
      checkInTime: null,
      checkInMethod: null,
      status: "absent",
      lateMinutes: 0,
      profileImage: "/api/placeholder/32/32",
    },
  ]);

  // Statistics for dashboard cards
  const [stats, setStats] = useState({
    totalStaff: 45,
    presentToday: 38,
    absentToday: 7,
    lateToday: 12,
    onTimeToday: 26,
    avgCheckInTime: "08:18",
    weeklyAttendanceRate: 94.2,
  });

  const departments = [
    "Mathematics",
    "English",
    "Science",
    "Administration",
    "Physical Education",
    "Arts",
  ];

  const attendanceMethods = [
    {
      id: "manual_log",
      name: "Manual Log",
      icon: Clock,
      description: "Traditional manual attendance logging",
      color: "bg-blue-500",
      route: `${baseRoute}/manual-log`,
    },
    {
      id: "qr_code",
      name: "QR Code Scan",
      icon: QrCode,
      description: "Quick attendance via QR code scanning",
      color: "bg-green-500",
      route: `${baseRoute}/qr-code`,
    },
    {
      id: "nfc_tap",
      name: "NFC Tap",
      icon: CreditCard,
      description: "Contactless attendance with NFC cards",
      color: "bg-purple-500",
      route: `${baseRoute}/nfc`,
    },
    {
      id: "facial_recognition",
      name: "Facial Recognition",
      icon: Camera,
      description: "AI-powered facial recognition system",
      color: "bg-orange-500",
      route: `${baseRoute}/facial-recognition`,
    },
  ];

  // Filter attendance data
  const filteredAttendance = todayAttendance.filter((staff) => {
    const departmentMatch =
      selectedDepartment === "all" || staff.department === selectedDepartment;
    const statusMatch =
      attendanceFilter === "all" || staff.status === attendanceFilter;
    return departmentMatch && statusMatch;
  });

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
      case "early":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Early
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

  const getMethodBadge = (method) => {
    const methodConfig = attendanceMethods.find((m) => m.id === method);
    if (!methodConfig) return null;

    return (
      <Badge variant="outline" className={`border-gray-300 text-gray-700`}>
        <methodConfig.icon className="h-3 w-3 mr-1" />
        {methodConfig.name}
      </Badge>
    );
  };

  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
    setIsDetailsOpen(true);
  };

  const handleExportReport = () => {
    const csvContent = [
      [
        "Staff ID",
        "Name",
        "Department",
        "Check In Time",
        "Status",
        "Method",
        "Late Minutes",
      ],
      ...filteredAttendance.map((staff) => [
        staff.staffId,
        staff.name,
        staff.department,
        staff.checkInTime || "N/A",
        staff.status,
        staff.checkInMethod || "N/A",
        staff.lateMinutes,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `staff_attendance_${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Report Exported", {
      description: "Attendance report has been downloaded successfully.",
      icon: <Download className="h-4 w-4" />,
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
            Staff Attendance Hub
          </h2>
          <p className="text-muted-foreground mt-2">
            Multi-method attendance tracking and management system
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExportReport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button
            onClick={() => navigate(`${baseRoute}/reports`)}
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Staff
                </p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {stats.totalStaff}
                </p>
              </div>
              <Users className="h-8 w-8 text-eduos-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Present Today
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.presentToday}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-300 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Absent Today
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.absentToday}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-400 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Attendance Rate
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.weeklyAttendanceRate}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="methods">Attendance Methods</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Today's Attendance - {new Date().toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border rounded-md px-3 py-2"
                  />
                </div>

                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
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

                <Select
                  value={attendanceFilter}
                  onValueChange={setAttendanceFilter}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="early">Early</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Attendance List */}
              <div className="space-y-3">
                {filteredAttendance.map((staff) => (
                  <div
                    key={staff.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={staff.profileImage}
                        alt={staff.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{staff.name}</h3>
                        <p className="text-sm text-gray-500">
                          {staff.staffId} • {staff.department} •{" "}
                          {staff.position}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">
                          {staff.checkInTime
                            ? staff.checkInTime
                            : "Not checked in"}
                        </p>
                        {staff.lateMinutes > 0 && (
                          <p className="text-sm text-red-500">
                            {staff.lateMinutes} min late
                          </p>
                        )}
                        {staff.lateMinutes < 0 && (
                          <p className="text-sm text-blue-500">
                            {Math.abs(staff.lateMinutes)} min early
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        {getStatusBadge(staff.status)}
                        {staff.checkInMethod &&
                          getMethodBadge(staff.checkInMethod)}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(staff)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredAttendance.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No staff found matching the selected filters.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {attendanceMethods.map((method) => (
              <Card
                key={method.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate(method.route)}
              >
                <CardHeader className="pb-3">
                  <div
                    className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mb-3`}
                  >
                    <method.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {method.description}
                  </p>
                  <Button className="w-full bg-eduos-primary hover:bg-eduos-secondary">
                    Open {method.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Method Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Method Usage Statistics (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-500">Manual Logs</p>
                </div>
                <div className="text-center">
                  <QrCode className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-gray-500">QR Scans</p>
                </div>
                <div className="text-center">
                  <CreditCard className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">67</p>
                  <p className="text-sm text-gray-500">NFC Taps</p>
                </div>
                <div className="text-center">
                  <Camera className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">134</p>
                  <p className="text-sm text-gray-500">Face Recognition</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Attendance System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Working Hours</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Start Time:</label>
                      <input
                        type="time"
                        defaultValue="08:15"
                        className="border rounded px-2 py-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm">End Time:</label>
                      <input
                        type="time"
                        defaultValue="17:00"
                        className="border rounded px-2 py-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Late Tolerance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Grace Period:</label>
                      <input
                        type="number"
                        defaultValue="15"
                        className="border rounded px-2 py-1 w-20"
                      />
                      <span className="text-sm">minutes</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Notifications</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">
                        Email notifications for absences
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">
                        SMS alerts for repeated tardiness
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Method Preferences</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Enable QR Code method</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Enable NFC method</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Enable Facial Recognition</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => toast.success("Settings saved successfully")}
                  className="bg-eduos-primary hover:bg-eduos-secondary"
                >
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Staff Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Staff Attendance Details</DialogTitle>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={selectedStaff.profileImage}
                  alt={selectedStaff.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedStaff.name}
                  </h3>
                  <p className="text-gray-600">
                    {selectedStaff.staffId} • {selectedStaff.department}
                  </p>
                  <p className="text-gray-500">{selectedStaff.position}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Today's Status</h4>
                  <div className="space-y-1">
                    <div>{getStatusBadge(selectedStaff.status)}</div>
                    <p className="text-sm">
                      Check-in: {selectedStaff.checkInTime || "Not checked in"}
                    </p>
                    {selectedStaff.checkInMethod && (
                      <p className="text-sm">
                        Method: {getMethodBadge(selectedStaff.checkInMethod)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Weekly Summary</h4>
                  <div className="space-y-1">
                    <p className="text-sm">Present: 4/5 days</p>
                    <p className="text-sm">Late: 1 time</p>
                    <p className="text-sm">Avg. Check-in: 08:20</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Recent Activity</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  <div className="text-sm">
                    <span className="font-medium">Today:</span> Check-in at{" "}
                    {selectedStaff.checkInTime || "N/A"}
                    {selectedStaff.checkInMethod &&
                      ` via ${selectedStaff.checkInMethod.replace("_", " ")}`}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Yesterday:</span> Check-in at
                    08:12 via facial recognition
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Nov 15:</span> Check-in at
                    08:25 via QR code (10 min late)
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffAttendanceHub;
