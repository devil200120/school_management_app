import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  ChevronLeft,
  Clock,
  UserCheck,
  Users,
  QrCode,
  Smartphone,
  Calendar,
  Download,
  Printer,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  LogIn,
  LogOut,
  Timer,
  MapPin,
  Camera,
  Wifi,
  BarChart3,
  TrendingUp,
  Eye,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const StaffAttendanceHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("punch-system");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showBiometricScanner, setShowBiometricScanner] = useState(false);
  const [biometricScanStage, setBiometricScanStage] = useState("idle"); // idle, scanning, processing, success, error
  const [scannedStaff, setScannedStaff] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Dummy staff data with real-time attendance
  const [staffData] = useState([
    {
      id: "STAFF001",
      name: "Dr. Sarah Johnson",
      department: "Mathematics",
      role: "Head of Department",
      status: "checked-in",
      checkInTime: "08:15:00",
      checkOutTime: null,
      workingHours: "7:45",
      attendanceRate: 95.5,
      lateCount: 2,
      absentCount: 3,
      location: "Main Building",
      device: "QR Code",
    },
    {
      id: "STAFF002",
      name: "Prof. Michael Chen",
      department: "Science",
      role: "Physics Teacher",
      status: "checked-out",
      checkInTime: "08:30:00",
      checkOutTime: "16:45:00",
      workingHours: "8:15",
      attendanceRate: 90.9,
      lateCount: 5,
      absentCount: 2,
      location: "Science Lab",
      device: "NFC Card",
    },
    {
      id: "STAFF003",
      name: "Ms. Emily Rodriguez",
      department: "Language Arts",
      role: "English Teacher",
      status: "checked-in",
      checkInTime: "08:00:00",
      checkOutTime: null,
      workingHours: "8:30",
      attendanceRate: 100,
      lateCount: 0,
      absentCount: 0,
      location: "Classroom 201",
      device: "Mobile App",
    },
    {
      id: "STAFF004",
      name: "Mr. David Thompson",
      department: "Administration",
      role: "Vice Principal",
      status: "checked-in",
      checkInTime: "07:45:00",
      checkOutTime: null,
      workingHours: "8:45",
      attendanceRate: 95.5,
      lateCount: 1,
      absentCount: 1,
      location: "Admin Office",
      device: "Biometric",
    },
    {
      id: "STAFF005",
      name: "Mrs. Lisa Williams",
      department: "Arts",
      role: "Art Teacher",
      status: "absent",
      checkInTime: null,
      checkOutTime: null,
      workingHours: "0:00",
      attendanceRate: 86.4,
      lateCount: 8,
      absentCount: 5,
      location: null,
      device: null,
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
  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || staff.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Calculate statistics
  const totalStaff = filteredStaff.length;
  const checkedInStaff = filteredStaff.filter(
    (staff) => staff.status === "checked-in"
  ).length;
  const checkedOutStaff = filteredStaff.filter(
    (staff) => staff.status === "checked-out"
  ).length;
  const absentStaff = filteredStaff.filter(
    (staff) => staff.status === "absent"
  ).length;
  const averageAttendance =
    filteredStaff.reduce((sum, staff) => sum + staff.attendanceRate, 0) /
    filteredStaff.length;

  const handlePunchAction = (staffId, action) => {
    const staff = staffData.find((s) => s.id === staffId);
    if (!staff) return;

    const now = currentTime.toTimeString().slice(0, 8);

    if (action === "check-in") {
      staff.status = "checked-in";
      staff.checkInTime = now;
      staff.checkOutTime = null;
      toast.success(`${staff.name} checked in at ${now}`);
    } else if (action === "check-out") {
      staff.status = "checked-out";
      staff.checkOutTime = now;
      toast.success(`${staff.name} checked out at ${now}`);
    }
  };

  // Settings management state
  const [attendanceSettings, setAttendanceSettings] = useState(() => {
    const savedSettings = localStorage.getItem("attendanceSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          workingHoursStart: "08:00",
          workingHoursEnd: "17:00",
          breakTimeStart: "12:00",
          breakTimeEnd: "13:00",
          minimumWorkingHours: 8,
          overtimeThreshold: 9,
          graceTimeMinutes: 15,
          weekends: ["Saturday", "Sunday"],
          holidays: [],
          autoMarkAbsent: true,
          requireReasonForLateness: true,
          allowSelfCheckIn: false,
          notifyLateArrival: true,
          attendanceEmailReports: true,
        };
  });

  const handleResetSettings = () => {
    toast.warning("Resetting all attendance settings to default values...");

    const defaultSettings = {
      workingHoursStart: "08:00",
      workingHoursEnd: "17:00",
      breakTimeStart: "12:00",
      breakTimeEnd: "13:00",
      minimumWorkingHours: 8,
      overtimeThreshold: 9,
      graceTimeMinutes: 15,
      weekends: ["Saturday", "Sunday"],
      holidays: [],
      autoMarkAbsent: true,
      requireReasonForLateness: true,
      allowSelfCheckIn: false,
      notifyLateArrival: true,
      attendanceEmailReports: true,
    };

    setTimeout(() => {
      setAttendanceSettings(defaultSettings);
      localStorage.setItem(
        "attendanceSettings",
        JSON.stringify(defaultSettings)
      );

      // Generate reset confirmation report
      const resetReport =
        "data:text/csv;charset=utf-8," +
        `EDUOS ACADEMY - ATTENDANCE SETTINGS RESET REPORT\n` +
        `Date: ${new Date().toLocaleString()}\n` +
        `Action: Settings Reset to Defaults\n` +
        `Performed By: Admin User\n\n` +
        `RESET SETTINGS\n` +
        `Setting,Default Value\n` +
        Object.entries(defaultSettings)
          .map(
            ([key, value]) =>
              `"${key}","${Array.isArray(value) ? value.join(", ") : value}"`
          )
          .join("\n");

      const encodedUri = encodeURI(resetReport);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `attendance_settings_reset_${
          new Date().toISOString().split("T")[0]
        }.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(
        "All attendance settings have been reset to default values! Reset report downloaded."
      );
    }, 1500);
  };

  const handleSaveSettings = () => {
    toast.success("Validating and saving attendance settings...");

    // Perform comprehensive validation
    const errors = [];

    if (
      attendanceSettings.workingHoursStart >= attendanceSettings.workingHoursEnd
    ) {
      errors.push("Working hours end time must be after start time");
    }

    if (attendanceSettings.breakTimeStart >= attendanceSettings.breakTimeEnd) {
      errors.push("Break end time must be after break start time");
    }

    if (
      attendanceSettings.minimumWorkingHours < 1 ||
      attendanceSettings.minimumWorkingHours > 24
    ) {
      errors.push("Minimum working hours must be between 1 and 24");
    }

    if (
      attendanceSettings.graceTimeMinutes < 0 ||
      attendanceSettings.graceTimeMinutes > 120
    ) {
      errors.push("Grace time must be between 0 and 120 minutes");
    }

    if (
      attendanceSettings.overtimeThreshold <
      attendanceSettings.minimumWorkingHours
    ) {
      errors.push(
        "Overtime threshold must be greater than minimum working hours"
      );
    }

    if (errors.length > 0) {
      setTimeout(() => {
        toast.error(`Settings validation failed: ${errors.join(", ")}`);
      }, 1000);
      return;
    }

    setTimeout(() => {
      localStorage.setItem(
        "attendanceSettings",
        JSON.stringify(attendanceSettings)
      );

      // Generate settings backup
      const settingsBackup =
        "data:text/csv;charset=utf-8," +
        `EDUOS ACADEMY - ATTENDANCE SETTINGS BACKUP\n` +
        `Date: ${new Date().toLocaleString()}\n` +
        `Backup Type: Post-Save Configuration\n` +
        `Total Settings: ${Object.keys(attendanceSettings).length}\n\n` +
        `CURRENT CONFIGURATION\n` +
        `Setting,Value,Description\n` +
        `Working Hours Start,${attendanceSettings.workingHoursStart},"Daily work start time"\n` +
        `Working Hours End,${attendanceSettings.workingHoursEnd},"Daily work end time"\n` +
        `Break Time Start,${attendanceSettings.breakTimeStart},"Lunch break start"\n` +
        `Break Time End,${attendanceSettings.breakTimeEnd},"Lunch break end"\n` +
        `Minimum Working Hours,${attendanceSettings.minimumWorkingHours},"Required daily hours"\n` +
        `Overtime Threshold,${attendanceSettings.overtimeThreshold},"Hours before overtime"\n` +
        `Grace Time Minutes,${attendanceSettings.graceTimeMinutes},"Late arrival tolerance"\n` +
        `Weekends,"${attendanceSettings.weekends.join(
          ", "
        )}","Non-working days"\n` +
        `Auto Mark Absent,${attendanceSettings.autoMarkAbsent},"Auto-absence marking"\n` +
        `Require Late Reason,${attendanceSettings.requireReasonForLateness},"Late arrival justification"\n` +
        `Allow Self Check-in,${attendanceSettings.allowSelfCheckIn},"Staff self-service"\n` +
        `Notify Late Arrival,${attendanceSettings.notifyLateArrival},"Late arrival alerts"\n` +
        `Email Reports,${attendanceSettings.attendanceEmailReports},"Automated email reports"\n`;

      const encodedUri = encodeURI(settingsBackup);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `attendance_settings_backup_${
          new Date().toISOString().split("T")[0]
        }.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(
        "Attendance settings saved successfully! Configuration backup downloaded."
      );
    }, 1500);
  };

  // NFC Card Reader Handler
  const handleNFCReader = () => {
    toast.info("Initializing NFC card reader...");
    setTimeout(() => {
      toast.success(
        "NFC card reader is now active! Place staff ID cards near the reader."
      );
      // Simulate NFC reading functionality
      setTimeout(() => {
        toast.info("NFC card detected - Processing...");
        setTimeout(() => {
          const randomStaff =
            staffData[Math.floor(Math.random() * staffData.length)];
          handlePunchAction(
            randomStaff.id,
            randomStaff.status === "checked-in" ? "check-out" : "check-in"
          );
        }, 1500);
      }, 3000);
    }, 1000);
  };

  // Biometric Scanner Handler - Enhanced with Visual Modal
  const handleBiometricScanner = () => {
    setShowBiometricScanner(true);
    setBiometricScanStage("idle");
    setScannedStaff(null);
  };

  const startBiometricScan = () => {
    setBiometricScanStage("scanning");

    // Simulate scanning process
    setTimeout(() => {
      setBiometricScanStage("processing");

      setTimeout(() => {
        // Randomly select staff member for demo
        const randomStaff =
          staffData[Math.floor(Math.random() * staffData.length)];
        setScannedStaff(randomStaff);
        setBiometricScanStage("success");

        // Auto punch after successful scan
        setTimeout(() => {
          handlePunchAction(
            randomStaff.id,
            randomStaff.status === "checked-in" ? "check-out" : "check-in"
          );
        }, 1500);
      }, 2000);
    }, 3000);
  };

  const resetBiometricScanner = () => {
    setBiometricScanStage("idle");
    setScannedStaff(null);
  };

  const BiometricScannerModal = () => {
    if (!showBiometricScanner) return null;

    return (
      <Dialog
        open={showBiometricScanner}
        onOpenChange={setShowBiometricScanner}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              🔐 Biometric Scanner
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Fingerprint Scanner Visual */}
            <div className="flex justify-center">
              <div
                className={`relative w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                  biometricScanStage === "idle"
                    ? "border-gray-300 bg-gray-50"
                    : biometricScanStage === "scanning"
                    ? "border-blue-400 bg-blue-50 animate-pulse"
                    : biometricScanStage === "processing"
                    ? "border-yellow-400 bg-yellow-50 animate-spin"
                    : biometricScanStage === "success"
                    ? "border-green-400 bg-green-50"
                    : "border-red-400 bg-red-50"
                }`}
              >
                {/* Fingerprint Icon */}
                <div
                  className={`text-6xl transition-all duration-300 ${
                    biometricScanStage === "idle"
                      ? "text-gray-400"
                      : biometricScanStage === "scanning"
                      ? "text-blue-500"
                      : biometricScanStage === "processing"
                      ? "text-yellow-500"
                      : biometricScanStage === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  🔒
                </div>

                {/* Scanning Animation */}
                {biometricScanStage === "scanning" && (
                  <>
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-bounce"></div>
                  </>
                )}

                {/* Success Checkmark */}
                {biometricScanStage === "success" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-green-500 text-7xl animate-bounce">
                      ✅
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Text */}
            <div className="text-center space-y-2">
              {biometricScanStage === "idle" && (
                <>
                  <h3 className="text-lg font-semibold">
                    Place Finger on Scanner
                  </h3>
                  <p className="text-gray-600">
                    Position your finger on the biometric scanner to begin
                  </p>
                </>
              )}

              {biometricScanStage === "scanning" && (
                <>
                  <h3 className="text-lg font-semibold text-blue-600">
                    🔍 Scanning Fingerprint...
                  </h3>
                  <p className="text-gray-600">
                    Please hold still while we scan your biometric data
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 bg-blue-500 rounded-full animate-pulse"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </>
              )}

              {biometricScanStage === "processing" && (
                <>
                  <h3 className="text-lg font-semibold text-yellow-600">
                    ⚙️ Processing Biometric Data...
                  </h3>
                  <p className="text-gray-600">
                    Matching fingerprint with employee database
                  </p>
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </>
              )}

              {biometricScanStage === "success" && scannedStaff && (
                <>
                  <h3 className="text-lg font-semibold text-green-600">
                    ✅ Biometric Verified!
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                    <p className="font-medium text-green-800">
                      Employee: {scannedStaff.name}
                    </p>
                    <p className="text-sm text-green-700">
                      Department: {scannedStaff.department}
                    </p>
                    <p className="text-sm text-green-700">
                      Status: {scannedStaff.status}
                    </p>
                    <div className="text-xs text-green-600 mt-2">
                      🕒 {new Date().toLocaleTimeString()} | Attendance recorded
                      automatically
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              {biometricScanStage === "idle" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowBiometricScanner(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={startBiometricScan}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    🔍 Start Scan
                  </Button>
                </>
              )}

              {biometricScanStage === "success" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowBiometricScanner(false)}
                  >
                    Done
                  </Button>
                  <Button
                    onClick={resetBiometricScanner}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    🔄 Scan Another
                  </Button>
                </>
              )}
            </div>

            {/* Security Notice */}
            <div className="text-xs text-center text-gray-500 bg-gray-50 p-2 rounded">
              🔒 Biometric data is encrypted and processed securely
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Export Attendance Data Handler
  const handleExportAttendance = () => {
    toast.success("Generating comprehensive attendance report...");

    setTimeout(() => {
      // Calculate attendance statistics
      const stats = {
        totalStaff: filteredStaff.length,
        presentToday: filteredStaff.filter(
          (staff) => staff.status === "Present" || staff.status === "checked-in"
        ).length,
        absentToday: filteredStaff.filter((staff) => staff.status === "Absent")
          .length,
        lateToday: filteredStaff.filter((staff) => staff.status === "Late")
          .length,
        onLeaveToday: filteredStaff.filter((staff) => staff.status === "Leave")
          .length,
        averageAttendance:
          filteredStaff.reduce((sum, staff) => sum + staff.attendanceRate, 0) /
          filteredStaff.length,
      };

      // Department-wise breakdown
      const departmentStats = {};
      filteredStaff.forEach((staff) => {
        if (!departmentStats[staff.department]) {
          departmentStats[staff.department] = {
            total: 0,
            present: 0,
            absent: 0,
            late: 0,
            leave: 0,
          };
        }
        departmentStats[staff.department].total++;
        if (staff.status === "Present" || staff.status === "checked-in")
          departmentStats[staff.department].present++;
        if (staff.status === "Absent")
          departmentStats[staff.department].absent++;
        if (staff.status === "Late") departmentStats[staff.department].late++;
        if (staff.status === "Leave") departmentStats[staff.department].leave++;
      });

      const csvContent =
        "data:text/csv;charset=utf-8," +
        `EDUOS ACADEMY - ATTENDANCE REPORT\n` +
        `Date: ${selectedDate || new Date().toISOString().split("T")[0]}\n` +
        `Generated: ${new Date().toLocaleString()}\n` +
        `Report Type: Comprehensive Daily Report\n\n` +
        `ATTENDANCE SUMMARY\n` +
        `Total Staff,${stats.totalStaff}\n` +
        `Present Today,${stats.presentToday}\n` +
        `Absent Today,${stats.absentToday}\n` +
        `Late Arrivals,${stats.lateToday}\n` +
        `On Leave,${stats.onLeaveToday}\n` +
        `Average Monthly Attendance,${stats.averageAttendance.toFixed(
          1
        )}%\n\n` +
        `DEPARTMENT BREAKDOWN\n` +
        `Department,Total Staff,Present,Absent,Late,On Leave,Attendance Rate\n` +
        Object.entries(departmentStats)
          .map(([dept, data]) => {
            const attendanceRate =
              data.total > 0
                ? (((data.present + data.late) / data.total) * 100).toFixed(1)
                : 0;
            return `${dept},${data.total},${data.present},${data.absent},${data.late},${data.leave},${attendanceRate}%`;
          })
          .join("\n") +
        "\n\n" +
        `DETAILED STAFF ATTENDANCE\n` +
        `Name,Department,Check-in,Check-out,Status,Hours Worked,Monthly Attendance\n` +
        filteredStaff
          .map(
            (staff) =>
              `"${staff.name}",${staff.department},${
                staff.checkInTime || "N/A"
              },${staff.checkOutTime || "N/A"},${staff.status},${
                staff.workingHours || 0
              },${staff.attendanceRate}%`
          )
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `attendance_report_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Comprehensive attendance report exported successfully!");
    }, 2000);
  };

  // Print Attendance Report Handler
  const handlePrintReport = () => {
    toast.info("Preparing attendance report for printing...");

    setTimeout(() => {
      // Create a printable version of the report
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>EDUOS Academy - Daily Attendance Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .stats { display: flex; justify-content: space-around; margin: 20px 0; }
              .stat-box { text-align: center; border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .present { background-color: #d4edda; }
              .absent { background-color: #f8d7da; }
              .late { background-color: #fff3cd; }
              @media print { .no-print { display: none; } }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>EDUOS ACADEMY</h1>
              <h2>Daily Attendance Report</h2>
              <p>Date: ${new Date().toLocaleDateString()} | Generated: ${new Date().toLocaleTimeString()}</p>
            </div>
            
            <div class="stats">
              <div class="stat-box">
                <h3>${checkedInStaff}</h3>
                <p>Present</p>
              </div>
              <div class="stat-box">
                <h3>${totalStaff - checkedInStaff}</h3>
                <p>Absent</p>
              </div>
              <div class="stat-box">
                <h3>${averageAttendance.toFixed(1)}%</h3>
                <p>Avg Attendance</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Department</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                ${filteredStaff
                  .map(
                    (staff) => `
                  <tr class="${staff.status.toLowerCase()}">
                    <td>${staff.name}</td>
                    <td>${staff.department}</td>
                    <td>${staff.checkInTime || "-"}</td>
                    <td>${staff.checkOutTime || "-"}</td>
                    <td>${staff.status}</td>
                    <td>${staff.workingHours || 0}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `;

      const printWindow = window.open("", "_blank");
      printWindow.document.write(printContent);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.print();
        toast.success("Print dialog opened! Report ready for printing.");
      }, 500);
    }, 1500);
  };

  // View Staff Details Handler
  const handleViewStaffDetails = (staff) => {
    toast.info(`Loading detailed information for ${staff.name}...`);

    setTimeout(() => {
      const detailsContent = `
Staff Details - ${staff.name}
Department: ${staff.department}
Current Status: ${staff.status}
Check-in Time: ${staff.checkInTime || "Not checked in"}
Check-out Time: ${staff.checkOutTime || "Not checked out"}
Working Hours Today: ${staff.workingHours || 0} hours
Monthly Attendance Rate: ${staff.attendanceRate}%
Total Days Present: ${Math.floor((staff.attendanceRate * 22) / 100)} days
Total Days Absent: ${22 - Math.floor((staff.attendanceRate * 22) / 100)} days
      `;

      alert(detailsContent);
      toast.success(`Staff details displayed for ${staff.name}`);
    }, 1000);
  };

  // Bulk Actions Handler
  const handleBulkMarkAttendance = (status) => {
    if (selectedRows.length === 0) {
      toast.warning("Please select staff members first!");
      return;
    }

    toast.success(
      `Marking ${selectedRows.length} staff members as ${status}...`
    );

    setTimeout(() => {
      const selectedStaffData = filteredStaff.filter((_, index) =>
        selectedRows.includes(index)
      );

      selectedStaffData.forEach((staff) => {
        staff.status = status;
        if (status === "Present" || status === "checked-in") {
          staff.checkInTime = new Date().toTimeString().slice(0, 5);
          staff.checkOutTime = null;
          staff.workingHours = 0;
        } else if (status === "Absent") {
          staff.checkInTime = null;
          staff.checkOutTime = null;
          staff.workingHours = 0;
        }
      });

      setSelectedRows([]);
      toast.success(
        `Successfully marked ${selectedStaffData.length} staff members as ${status}!`
      );
    }, 1500);
  };

  const QRScannerComponent = () => {
    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);

    const simulateQRScan = () => {
      setScanning(true);
      toast.info("Scanning QR code...");

      setTimeout(() => {
        const randomStaff =
          staffData[Math.floor(Math.random() * staffData.length)];
        setScanResult(randomStaff);
        setScanning(false);
        toast.success(`QR Code scanned successfully for ${randomStaff.name}!`);

        // Automatically punch in/out after scan
        setTimeout(() => {
          handlePunchAction(
            randomStaff.id,
            randomStaff.status === "checked-in" ? "check-out" : "check-in"
          );
        }, 1000);
      }, 2000);
    };

    return (
      <div className="bg-white p-6 rounded-lg">
        <div className="text-center space-y-4">
          <div
            className={`mx-auto w-64 h-64 border-2 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden ${
              scanning
                ? "border-green-400 bg-green-50"
                : "border-gray-300 bg-gray-100"
            }`}
          >
            {scanning && (
              <div className="absolute inset-0 bg-green-200 opacity-30 animate-pulse"></div>
            )}
            <QrCode
              size={80}
              className={scanning ? "text-green-600" : "text-gray-400"}
            />
            {scanning && (
              <div className="absolute bottom-2 left-2 right-2 h-1 bg-green-500 animate-pulse rounded"></div>
            )}
          </div>

          {scanResult ? (
            <div className="space-y-2">
              <p className="text-lg font-medium text-green-600">
                Scan Complete!
              </p>
              <p className="text-gray-600">Staff: {scanResult.name}</p>
              <p className="text-gray-600">
                Department: {scanResult.department}
              </p>
            </div>
          ) : (
            <>
              <p className="text-lg font-medium">
                {scanning ? "Scanning QR Code..." : "QR Code Scanner Ready"}
              </p>
              <p className="text-gray-600">
                {scanning
                  ? "Please hold steady..."
                  : "Position the QR code within the frame to scan"}
              </p>
            </>
          )}

          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => setShowQRScanner(false)}>
              Cancel
            </Button>
            {!scanning && !scanResult && (
              <Button onClick={simulateQRScan}>
                <QrCode className="mr-2" size={16} />
                Start Scanning
              </Button>
            )}
            {scanResult && (
              <Button
                onClick={() => {
                  setScanResult(null);
                  setScanning(false);
                }}
              >
                <Camera className="mr-2" size={16} />
                Scan Another
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

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
                <UserCheck className="text-blue-600" />
                Staff Attendance Hub
              </h1>
              <p className="text-gray-600">
                Monitor and manage staff attendance with QR/NFC technology
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-gray-900">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-gray-600">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="punch-system">Punch System</TabsTrigger>
            <TabsTrigger value="live-tracking">Live Tracking</TabsTrigger>
            <TabsTrigger value="attendance-reports">Reports</TabsTrigger>
            <TabsTrigger value="attendance-settings">Settings</TabsTrigger>
          </TabsList>

          {/* Punch System Tab */}
          <TabsContent value="punch-system" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Present Today
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {checkedInStaff}
                      </p>
                    </div>
                    <UserCheck className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Checked Out
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {checkedOutStaff}
                      </p>
                    </div>
                    <LogOut className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Absent
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        {absentStaff}
                      </p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Attendance Rate
                      </p>
                      <p className="text-2xl font-bold text-purple-600">
                        {averageAttendance.toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Punch Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Punch Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    size="lg"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setShowQRScanner(true)}
                  >
                    <QrCode size={24} />
                    QR Code Scanner
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={handleNFCReader}
                  >
                    <Smartphone size={24} />
                    NFC Card Reader
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={handleBiometricScanner}
                  >
                    <Camera size={24} />
                    Biometric Scanner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Tracking Tab */}
          <TabsContent value="live-tracking" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <Input
                      placeholder="Search staff by name or role..."
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

            {/* Real-time Attendance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Attendance Tracking</CardTitle>
                {selectedRows.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleBulkMarkAttendance("Present")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Mark Present ({selectedRows.length})
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleBulkMarkAttendance("Absent")}
                      variant="destructive"
                    >
                      Mark Absent ({selectedRows.length})
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleBulkMarkAttendance("Late")}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      Mark Late ({selectedRows.length})
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setSelectedRows([])}
                      variant="outline"
                    >
                      Clear Selection
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          checked={
                            selectedRows.length === filteredStaff.length &&
                            filteredStaff.length > 0
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRows(
                                Array.from(
                                  { length: filteredStaff.length },
                                  (_, i) => i
                                )
                              );
                            } else {
                              setSelectedRows([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Hours Worked</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((staff, index) => (
                      <TableRow key={staff.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(index)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedRows([...selectedRows, index]);
                              } else {
                                setSelectedRows(
                                  selectedRows.filter((row) => row !== index)
                                );
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{staff.name}</div>
                            <div className="text-sm text-gray-500">
                              {staff.role}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{staff.department}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              staff.status === "checked-in"
                                ? "bg-green-100 text-green-800"
                                : staff.status === "checked-out"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {staff.status === "checked-in" && (
                              <CheckCircle size={12} className="mr-1" />
                            )}
                            {staff.status === "checked-out" && (
                              <LogOut size={12} className="mr-1" />
                            )}
                            {staff.status === "absent" && (
                              <XCircle size={12} className="mr-1" />
                            )}
                            {staff.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {staff.checkInTime ? (
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              {staff.checkInTime}
                            </div>
                          ) : (
                            <span className="text-gray-400">--:--</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {staff.checkOutTime ? (
                            <div className="flex items-center gap-2">
                              <LogOut size={14} />
                              {staff.checkOutTime}
                            </div>
                          ) : (
                            <span className="text-gray-400">--:--</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {staff.workingHours}
                          </div>
                        </TableCell>
                        <TableCell>
                          {staff.location ? (
                            <div className="flex items-center gap-1">
                              <MapPin size={12} />
                              <span className="text-sm">{staff.location}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">Unknown</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {staff.status === "absent" ||
                            staff.status === "checked-out" ? (
                              <Button
                                size="sm"
                                onClick={() =>
                                  handlePunchAction(staff.id, "check-in")
                                }
                              >
                                <LogIn size={14} className="mr-1" />
                                Check In
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handlePunchAction(staff.id, "check-out")
                                }
                              >
                                <LogOut size={14} className="mr-1" />
                                Check Out
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Reports Tab */}
          <TabsContent value="attendance-reports" className="space-y-6">
            {/* Report Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Attendance Reports</CardTitle>
                <p className="text-gray-600">
                  Export and print comprehensive attendance reports
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    onClick={handleExportAttendance}
                    className="h-16 flex flex-col gap-1"
                  >
                    <Download size={20} />
                    <span>Export CSV Report</span>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handlePrintReport}
                    className="h-16 flex flex-col gap-1"
                  >
                    <Printer size={20} />
                    <span>Print Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Individual Staff Attendance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStaff.map((staff) => (
                <Card key={staff.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{staff.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {staff.department} • {staff.role}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Attendance Rate */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          Attendance Rate
                        </span>
                        <span className="text-sm font-bold">
                          {staff.attendanceRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
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
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-bold text-green-600">
                          {30 - staff.absentCount - staff.lateCount}
                        </div>
                        <div className="text-green-700">On Time</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <div className="font-bold text-yellow-600">
                          {staff.lateCount}
                        </div>
                        <div className="text-yellow-700">Late</div>
                      </div>
                      <div className="text-center p-2 bg-red-50 rounded">
                        <div className="font-bold text-red-600">
                          {staff.absentCount}
                        </div>
                        <div className="text-red-700">Absent</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-bold text-blue-600">
                          {staff.workingHours}
                        </div>
                        <div className="text-blue-700">Avg Hours</div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleViewStaffDetails(staff)}
                    >
                      <BarChart3 size={14} className="mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="attendance-settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium">
                      Working Hours
                    </Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center gap-4">
                        <Label className="w-24">Start Time:</Label>
                        <Input
                          type="time"
                          defaultValue="08:00"
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <Label className="w-24">End Time:</Label>
                        <Input
                          type="time"
                          defaultValue="17:00"
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <Label className="w-24">Break Time:</Label>
                        <Input
                          type="number"
                          defaultValue="60"
                          className="w-32"
                        />
                        <span className="text-sm text-gray-600">minutes</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      Attendance Rules
                    </Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center gap-4">
                        <Label className="w-32">Late Threshold:</Label>
                        <Input
                          type="number"
                          defaultValue="15"
                          className="w-32"
                        />
                        <span className="text-sm text-gray-600">minutes</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Label className="w-32">Early Leave:</Label>
                        <Input
                          type="number"
                          defaultValue="30"
                          className="w-32"
                        />
                        <span className="text-sm text-gray-600">minutes</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Label className="w-32">Overtime Start:</Label>
                        <Input
                          type="number"
                          defaultValue="480"
                          className="w-32"
                        />
                        <span className="text-sm text-gray-600">minutes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Label className="text-base font-medium">Punch Methods</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <QrCode className="text-blue-600" />
                        <div>
                          <h4 className="font-medium">QR Code</h4>
                          <p className="text-sm text-gray-600">Enabled</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <Smartphone className="text-green-600" />
                        <div>
                          <h4 className="font-medium">NFC Card</h4>
                          <p className="text-sm text-gray-600">Enabled</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <Camera className="text-purple-600" />
                        <div>
                          <h4 className="font-medium">Biometric</h4>
                          <p className="text-sm text-gray-600">Available</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={handleResetSettings}>
                    Reset to Defaults
                  </Button>
                  <Button onClick={handleSaveSettings}>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* QR Scanner Dialog */}
        <Dialog open={showQRScanner} onOpenChange={setShowQRScanner}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>QR Code Scanner</DialogTitle>
            </DialogHeader>
            <QRScannerComponent />
          </DialogContent>
        </Dialog>

        {/* Biometric Scanner Modal */}
        <BiometricScannerModal />
      </div>
    </motion.div>
  );
};

export default StaffAttendanceHub;
