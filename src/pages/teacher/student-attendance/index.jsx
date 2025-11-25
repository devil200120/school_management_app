import { useState, useEffect } from "react";
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
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Check,
  X,
  Clock,
  Download,
  Search,
  BarChart2,
  Save,
  CheckCircle,
  QrCode,
  Radio,
  Camera,
  Shuffle,
  Smartphone,
  Settings,
  Zap,
  UserCheck,
  Calendar,
  Users,
  TrendingUp,
  AlertCircle,
  BookOpen,
  Timer,
  RefreshCw,
  Filter,
  Grid,
  List,
  Grid3X3,
  XCircle,
  TableIcon,
} from "lucide-react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced sample data for students with additional information
const students = [
  {
    id: "S001",
    name: "John Smith",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rollNumber: "001",
    class: "Class 9",
    section: "A",
    attendancePercentage: 92,
    status: "present",
  },
  {
    id: "S002",
    name: "Maria Garcia",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
    rollNumber: "002",
    class: "Class 9",
    section: "A",
    attendancePercentage: 88,
    status: "present",
  },
  {
    id: "S003",
    name: "Ahmed Khan",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rollNumber: "003",
    class: "Class 9",
    section: "A",
    attendancePercentage: 95,
    status: "absent",
  },
  {
    id: "S004",
    name: "Lisa Chen",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rollNumber: "004",
    class: "Class 9",
    section: "A",
    attendancePercentage: 90,
    status: "present",
  },
  {
    id: "S005",
    name: "David Wilson",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rollNumber: "005",
    class: "Class 9",
    section: "A",
    attendancePercentage: 85,
    status: "late",
  },
  {
    id: "S006",
    name: "Priya Patel",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rollNumber: "006",
    class: "Class 9",
    section: "A",
    attendancePercentage: 97,
    status: "present",
  },
  {
    id: "S007",
    name: "Michael Brown",
    photo:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    rollNumber: "007",
    class: "Class 9",
    section: "A",
    attendancePercentage: 89,
    status: "present",
  },
  {
    id: "S008",
    name: "Sarah Johnson",
    photo:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    rollNumber: "008",
    class: "Class 9",
    section: "A",
    attendancePercentage: 93,
    status: "present",
  },
  {
    id: "S009",
    name: "James Lee",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    rollNumber: "009",
    class: "Class 9",
    section: "A",
    attendancePercentage: 91,
    status: "present",
  },
  {
    id: "S010",
    name: "Emma Davis",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rollNumber: "010",
    class: "Class 9",
    section: "A",
    attendancePercentage: 96,
    status: "present",
  },
  {
    id: "S011",
    name: "Mohammed Ali",
    photo:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=150&h=150&fit=crop&crop=face",
    rollNumber: "011",
    class: "Class 9",
    section: "A",
    attendancePercentage: 87,
    status: "present",
  },
  {
    id: "S012",
    name: "Sofia Rodriguez",
    photo:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    rollNumber: "012",
    class: "Class 9",
    section: "A",
    attendancePercentage: 94,
    status: "present",
  },
  {
    id: "S013",
    name: "William Taylor",
    photo:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face",
    rollNumber: "013",
    class: "Class 9",
    section: "A",
    attendancePercentage: 86,
    status: "present",
  },
  {
    id: "S014",
    name: "Olivia Martin",
    photo:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face",
    rollNumber: "014",
    class: "Class 9",
    section: "A",
    attendancePercentage: 98,
    status: "present",
  },
  {
    id: "S015",
    name: "Daniel Kim",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    rollNumber: "015",
    class: "Class 9",
    section: "A",
    attendancePercentage: 84,
    status: "present",
  },
];

// Sample attendance records
const initialAttendanceRecords = [
  {
    id: "A001",
    studentId: "S001",
    studentName: "John Smith",
    date: "2025-05-01",
    status: "present",
    class: "Class 9",
    section: "A",
    subject: "Mathematics",
  },
  {
    id: "A002",
    studentId: "S002",
    studentName: "Maria Garcia",
    date: "2025-05-01",
    status: "present",
    class: "Class 9",
    section: "A",
    subject: "Mathematics",
  },
  {
    id: "A003",
    studentId: "S003",
    studentName: "Ahmed Khan",
    date: "2025-05-01",
    status: "absent",
    class: "Class 9",
    section: "A",
    subject: "Mathematics",
    remarks: "Informed absence due to medical reasons",
  },
  {
    id: "A004",
    studentId: "S004",
    studentName: "Lisa Chen",
    date: "2025-05-01",
    status: "present",
    class: "Class 9",
    section: "A",
    subject: "Mathematics",
  },
  {
    id: "A005",
    studentId: "S005",
    studentName: "David Wilson",
    date: "2025-05-01",
    status: "late",
    class: "Class 9",
    section: "A",
    subject: "Mathematics",
    remarks: "Late by 10 minutes",
  },
];

const TeacherStudentAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("Class 9");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or table
  const [isLoading, setIsLoading] = useState(false);

  // Attendance states
  const [attendanceRecords, setAttendanceRecords] = useState(
    initialAttendanceRecords
  );
  const [studentAttendance, setStudentAttendance] = useState({});
  const [remarks, setRemarks] = useState({});

  // Advanced Attendance Features
  const [attendanceMode, setAttendanceMode] = useState("manual");
  const [randomNumber, setRandomNumber] = useState("");
  const [showRandomNumber, setShowRandomNumber] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [faceRecognitionActive, setFaceRecognitionActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [barcodeScanner, setBarcodeScanner] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState("");
  const [nfcConnectionStatus, setNfcConnectionStatus] =
    useState("disconnected");
  const [faceDetectionConfidence, setFaceDetectionConfidence] = useState(0);
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const [cameraStream, setCameraStream] = useState(null);
  const [attendanceLog, setAttendanceLog] = useState([]);

  // Animation states
  const [updatedStudents, setUpdatedStudents] = useState(new Set());

  // Advanced Attendance Functions
  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 9000) + 1000; // 4-digit number
    setRandomNumber(newRandomNumber.toString());
    setShowRandomNumber(true);

    // Auto-hide after 3 minutes
    setTimeout(() => {
      setShowRandomNumber(false);
    }, 180000);
  };

  const generateQRCode = () => {
    const classData = {
      type: "attendance",
      class: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      date: selectedDate,
      randomNumber: randomNumber || Math.floor(Math.random() * 9000) + 1000,
      timestamp: Date.now(),
      teacher: "Current Teacher", // You can replace with actual teacher data
      schoolId: "SCHOOL_001", // You can replace with actual school ID
    };

    // Create a more readable QR code format
    const qrData = `ATTENDANCE:${JSON.stringify(classData)}`;
    setQrCode(qrData);

    toast.success("QR Code generated successfully!");
  };

  const startBarcodeScanner = () => {
    setBarcodeScanner(true);
    toast.info("Barcode scanner activated. Point camera at student barcode.");

    // Simulate barcode scanning
    setTimeout(() => {
      if (barcodeScanner) {
        const randomStudentIndex = Math.floor(Math.random() * students.length);
        const randomStudent = students[randomStudentIndex];
        handleBarcodeScanned(
          `BARCODE_${randomStudent.id}_${randomStudent.rollNumber}`
        );
      }
    }, Math.random() * 3000 + 2000); // 2-5 seconds
  };

  const stopBarcodeScanner = () => {
    setBarcodeScanner(false);
    setScannedBarcode("");
    toast.info("Barcode scanner deactivated");
  };

  const handleBarcodeScanned = (barcodeData) => {
    const student = students.find(
      (s) => barcodeData.includes(s.id) || barcodeData.includes(s.rollNumber)
    );

    if (student) {
      setScannedBarcode(barcodeData);
      handleAttendanceChange(student.id, "present");
      setAttendanceLog((prev) => [
        ...prev,
        {
          id: Date.now(),
          studentId: student.id,
          studentName: student.name,
          status: "present",
          method: "barcode",
          timestamp: new Date(),
          barcodeData: barcodeData,
        },
      ]);
      toast.success(`${student.name} marked present via barcode scan`);
      setBarcodeScanner(false);
    } else {
      toast.error("Barcode not recognized");
      setBarcodeScanner(false);
    }
  };

  const initializeNFCReader = async () => {
    try {
      setNfcConnectionStatus("connecting");
      toast.info("Initializing NFC reader...");

      setTimeout(() => {
        setNfcConnectionStatus("connected");
        toast.success("NFC reader connected successfully");
      }, 2000);
    } catch {
      setNfcConnectionStatus("error");
      toast.error("Failed to connect to NFC reader");
    }
  };

  const startNFCReader = () => {
    if (nfcConnectionStatus !== "connected") {
      initializeNFCReader();
      return;
    }

    setNfcEnabled(true);
    toast.info("NFC Reader active - Waiting for card tap...");

    setTimeout(() => {
      if (nfcEnabled) {
        const randomStudentIndex = Math.floor(Math.random() * students.length);
        const randomStudent = students[randomStudentIndex];
        handleNFCScanned(`NFC_${randomStudent.id}_${randomStudent.rollNumber}`);
      }
    }, Math.random() * 3000 + 1000);
  };

  const handleNFCScanned = (nfcData) => {
    const student = students.find(
      (s) => nfcData.includes(s.id) || nfcData.includes(s.rollNumber)
    );

    if (student) {
      handleAttendanceChange(student.id, "present");
      setAttendanceLog((prev) => [
        ...prev,
        {
          id: Date.now(),
          studentId: student.id,
          studentName: student.name,
          status: "present",
          method: "nfc",
          timestamp: new Date(),
          nfcData: nfcData,
        },
      ]);
      toast.success(`${student.name} marked present via NFC`);
      setNfcEnabled(false);
    } else {
      toast.error("NFC card not recognized");
      setNfcEnabled(false);
    }
  };

  const enableFaceRecognition = async () => {
    try {
      setFaceRecognitionActive(true);
      setFaceDetectionConfidence(0);
      toast.info("Initializing face recognition system...");

      const faceDetectionInterval = setInterval(() => {
        if (!faceRecognitionActive) {
          clearInterval(faceDetectionInterval);
          return;
        }

        setFaceDetectionConfidence((prev) => {
          const newConfidence = Math.min(prev + Math.random() * 25, 100);

          if (newConfidence > 85) {
            const randomStudentIndex = Math.floor(
              Math.random() * students.length
            );
            const randomStudent = students[randomStudentIndex];

            handleFaceRecognized(randomStudent, newConfidence);
            clearInterval(faceDetectionInterval);
          }

          return newConfidence;
        });
      }, 500);

      // Set up camera stream simulation
      setTimeout(() => {
        setCameraStream("active");
        toast.success("Camera access granted - Face recognition active");
      }, 1500);

      // Auto-stop after 30 seconds
      setTimeout(() => {
        if (faceRecognitionActive) {
          setFaceRecognitionActive(false);
          setFaceDetectionConfidence(0);
          setCameraStream(null);
          clearInterval(faceDetectionInterval);
          toast.info("Face recognition timeout");
        }
      }, 30000);
    } catch {
      toast.error("Camera access denied. Please enable camera permissions.");
      setFaceRecognitionActive(false);
    }
  };

  const handleFaceRecognized = (student, confidence) => {
    if (confidence > 75) {
      handleAttendanceChange(student.id, "present");
      setRecognizedFaces((prev) => [
        ...prev,
        { ...student, confidence, timestamp: new Date() },
      ]);
      setAttendanceLog((prev) => [
        ...prev,
        {
          id: Date.now(),
          studentId: student.id,
          studentName: student.name,
          status: "present",
          method: "face",
          timestamp: new Date(),
          confidence: confidence,
        },
      ]);
      toast.success(
        `${student.name} recognized and marked present (${confidence.toFixed(
          1
        )}% confidence)`
      );
      setFaceRecognitionActive(false);
      setFaceDetectionConfidence(0);
      setCameraStream(null);
    } else {
      toast.warning(
        `Low confidence (${confidence.toFixed(1)}%) - Please try again`
      );
    }
  };

  const handleAttendanceSubmit = () => {
    const presentCount = Object.values(studentAttendance).filter(
      (status) => status === "present"
    ).length;
    const absentCount = Object.values(studentAttendance).filter(
      (status) => status === "absent"
    ).length;
    const lateCount = Object.values(studentAttendance).filter(
      (status) => status === "late"
    ).length;

    alert(
      `Attendance submitted!\nPresent: ${presentCount}\nAbsent: ${absentCount}\nLate: ${lateCount}`
    );
  };

  // Stats for the attendance
  const stats = {
    total: students.length,
    present: Object.values(studentAttendance).filter(
      (status) => status === "present"
    ).length,
    absent: Object.values(studentAttendance).filter(
      (status) => status === "absent"
    ).length,
    late: Object.values(studentAttendance).filter((status) => status === "late")
      .length,
    notMarked: students.length - Object.keys(studentAttendance).length,
  };

  // Charts data
  const pieData = [
    { name: "Present", value: stats.present, color: "#10b981" },
    { name: "Absent", value: stats.absent, color: "#ef4444" },
    { name: "Late", value: stats.late, color: "#f59e0b" },
  ];

  const weeklyData = [
    { day: "Mon", present: 13, absent: 2, late: 0 },
    { day: "Tue", present: 14, absent: 1, late: 0 },
    { day: "Wed", present: 12, absent: 2, late: 1 },
    { day: "Thu", present: 14, absent: 0, late: 1 },
    {
      day: "Fri",
      present: stats.present,
      absent: stats.absent,
      late: stats.late,
    },
  ];

  // Handle attendance marking
  const handleAttendanceChange = (studentId, status) => {
    setStudentAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));

    // Add animation trigger
    setUpdatedStudents((prev) => new Set(prev).add(studentId));
  };

  // Handle remarks change
  const handleRemarksChange = (studentId, remark) => {
    setRemarks((prev) => ({
      ...prev,
      [studentId]: remark,
    }));
  };

  // Save attendance
  const handleSaveAttendance = () => {
    // Here you would typically send the attendance data to your API
    console.log({
      date: selectedDate,
      class: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      attendance: studentAttendance,
      remarks,
    });

    toast.success("Attendance saved successfully");

    // Update local attendance records
    const newRecords = students.map((student) => ({
      id: `A${Date.now()}-${student.id}`,
      studentId: student.id,
      studentName: student.name,
      date: selectedDate,
      status: studentAttendance[student.id] || "present",
      class: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      remarks: remarks[student.id],
    }));

    setAttendanceRecords(newRecords);
  };

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Student Attendance
          </h1>
          <p className="text-muted-foreground">
            Manage attendance for your classes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export Report
          </Button>
          <Button variant="outline" className="gap-2">
            <BarChart2 size={16} />
            Analytics
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Present
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {stats.present}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700">
              Absent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              {stats.absent}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">
              Late
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">
              {stats.late}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Today&apos;s attendance summary</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between items-center text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Absent</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                <span>Late</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Weekly Trend Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>
            <CardDescription>
              This week&apos;s attendance patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={weeklyData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10b981" />
                <Bar dataKey="absent" fill="#ef4444" />
                <Bar dataKey="late" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>
            Select class, section, and date to mark attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 7">Class 7</SelectItem>
                  <SelectItem value="Class 8">Class 8</SelectItem>
                  <SelectItem value="Class 9">Class 9</SelectItem>
                  <SelectItem value="Class 10">Class 10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Section</label>
              <Select
                value={selectedSection}
                onValueChange={setSelectedSection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Subject</label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Attendance Method Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-4 border rounded-lg bg-gray-50">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Attendance Method
              </label>
              <Select value={attendanceMode} onValueChange={setAttendanceMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">
                    <div className="flex items-center gap-2">
                      <UserCheck size={16} />
                      Manual
                    </div>
                  </SelectItem>
                  <SelectItem value="barcode">
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} />
                      Barcode
                    </div>
                  </SelectItem>
                  <SelectItem value="qr">
                    <div className="flex items-center gap-2">
                      <QrCode size={16} />
                      QR Code
                    </div>
                  </SelectItem>
                  <SelectItem value="nfc">
                    <div className="flex items-center gap-2">
                      <Radio size={16} />
                      NFC
                    </div>
                  </SelectItem>
                  <SelectItem value="face">
                    <div className="flex items-center gap-2">
                      <Camera size={16} />
                      Face Recognition
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {attendanceMode === "barcode" && (
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Barcode Scanner
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={
                      barcodeScanner ? stopBarcodeScanner : startBarcodeScanner
                    }
                    className="flex items-center gap-1"
                  >
                    <Smartphone size={14} />
                    {barcodeScanner ? "Stop Scanner" : "Start Scanner"}
                  </Button>
                </div>
                {barcodeScanner && (
                  <div className="mt-2 p-2 bg-blue-100 border border-blue-300 rounded text-blue-700 text-xs">
                    📷 Scanner Active - Point at barcode
                  </div>
                )}
                {scannedBarcode && (
                  <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded text-green-700 text-xs">
                    ✅ Last scan: {scannedBarcode}
                  </div>
                )}
              </div>
            )}

            {attendanceMode === "qr" && (
              <div>
                <label className="text-sm font-medium mb-1 block">
                  QR Code Generator
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateQRCode}
                  className="flex items-center gap-1"
                >
                  <QrCode size={14} />
                  Generate QR
                </Button>
                {qrCode && (
                  <div className="mt-2 p-2 bg-purple-100 border border-purple-300 rounded text-purple-700 text-xs">
                    📱 QR Code Generated
                  </div>
                )}
              </div>
            )}

            {attendanceMode === "nfc" && (
              <div>
                <label className="text-sm font-medium mb-1 block">
                  NFC Reader
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={
                      nfcEnabled ? () => setNfcEnabled(false) : startNFCReader
                    }
                    className="flex items-center gap-1"
                    disabled={nfcConnectionStatus === "connecting"}
                  >
                    <Radio size={14} />
                    {nfcEnabled ? "Stop NFC" : "Start NFC"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateRandomNumber}
                    className="flex items-center gap-1"
                  >
                    <Shuffle size={14} />
                    Number
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge
                    variant={
                      nfcConnectionStatus === "connected"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {nfcConnectionStatus === "connected"
                      ? "🟢 Connected"
                      : nfcConnectionStatus === "connecting"
                      ? "🟡 Connecting..."
                      : "⚫ Disconnected"}
                  </Badge>
                  {showRandomNumber && (
                    <Badge variant="outline" className="text-xs font-mono">
                      #{randomNumber}
                    </Badge>
                  )}
                </div>
                {nfcEnabled && (
                  <div className="mt-2 p-2 bg-blue-100 border border-blue-300 rounded text-blue-700 text-xs">
                    📡 NFC Active - Tap student card
                  </div>
                )}
              </div>
            )}

            {attendanceMode === "face" && (
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Face Recognition
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={
                      faceRecognitionActive
                        ? () => setFaceRecognitionActive(false)
                        : enableFaceRecognition
                    }
                    className="flex items-center gap-1"
                    disabled={faceRecognitionActive}
                  >
                    <Camera size={14} />
                    {faceRecognitionActive ? "Active..." : "Start Camera"}
                  </Button>
                </div>
                {faceRecognitionActive && (
                  <div className="mt-2 space-y-1">
                    <div className="p-2 bg-green-100 border border-green-300 rounded text-green-700 text-xs">
                      🎥 Camera Active - Look at camera
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${faceDetectionConfidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">
                        {faceDetectionConfidence.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                )}
                {cameraStream && !faceRecognitionActive && (
                  <div className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded text-gray-700 text-xs">
                    📷 Camera Ready
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1 block">Actions</label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Settings size={14} />
                  Settings
                </Button>
                <Button
                  size="sm"
                  onClick={handleAttendanceSubmit}
                  className="flex items-center gap-1"
                >
                  <Zap size={14} />
                  Submit
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full md:w-1/3">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                type="text"
                placeholder="Search by name or ID"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "table" : "grid")
                }
                className="gap-2"
                variant="outline"
              >
                {viewMode === "grid" ? (
                  <>
                    <TableIcon size={16} />
                    Table View
                  </>
                ) : (
                  <>
                    <Grid3X3 size={16} />
                    Grid View
                  </>
                )}
              </Button>
              <Button
                className="gap-2"
                onClick={() => {
                  const allPresent = {};
                  filteredStudents.forEach((s) => {
                    allPresent[s.id] = "present";
                  });
                  setStudentAttendance(allPresent);
                }}
              >
                <CheckCircle size={16} />
                Mark All Present
              </Button>
            </div>
          </div>

          {/* Student Attendance Section */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => {
                const currentStatus = studentAttendance[student.id];
                const isUpdated = updatedStudents.has(student.id);

                return (
                  <motion.div
                    key={student.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: isUpdated ? [1, 1.05, 1] : 1,
                      transition: { duration: 0.3 },
                    }}
                    className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${
                      isUpdated ? "ring-2 ring-blue-200" : ""
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={student.photo}
                            alt={student.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {student.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>Roll: {student.rollNumber}</span>
                            <Badge
                              variant={
                                currentStatus === "present"
                                  ? "default"
                                  : currentStatus === "absent"
                                  ? "destructive"
                                  : currentStatus === "late"
                                  ? "warning"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {currentStatus
                                ? currentStatus.charAt(0).toUpperCase() +
                                  currentStatus.slice(1)
                                : "Not Marked"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Attendance Rate:
                          </span>
                          <div className="flex items-center space-x-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                student.attendancePercentage >= 90
                                  ? "bg-green-500"
                                  : student.attendancePercentage >= 75
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                            <span className="font-medium">
                              {student.attendancePercentage}%
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            size="sm"
                            variant={
                              currentStatus === "present"
                                ? "default"
                                : "outline"
                            }
                            className={`gap-1 transition-all ${
                              currentStatus === "present"
                                ? "bg-green-500 hover:bg-green-600 text-white shadow-md"
                                : "hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                            }`}
                            onClick={() =>
                              handleAttendanceChange(student.id, "present")
                            }
                          >
                            <CheckCircle size={14} />
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              currentStatus === "absent" ? "default" : "outline"
                            }
                            className={`gap-1 transition-all ${
                              currentStatus === "absent"
                                ? "bg-red-500 hover:bg-red-600 text-white shadow-md"
                                : "hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                            }`}
                            onClick={() =>
                              handleAttendanceChange(student.id, "absent")
                            }
                          >
                            <XCircle size={14} />
                            Absent
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              currentStatus === "late" ? "default" : "outline"
                            }
                            className={`gap-1 transition-all ${
                              currentStatus === "late"
                                ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md"
                                : "hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300"
                            }`}
                            onClick={() =>
                              handleAttendanceChange(student.id, "late")
                            }
                          >
                            <Clock size={14} />
                            Late
                          </Button>
                        </div>

                        <div>
                          <Input
                            value={remarks[student.id] || ""}
                            onChange={(e) =>
                              handleRemarksChange(student.id, e.target.value)
                            }
                            placeholder="Add remarks (optional)"
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[100px]">Roll</TableHead>
                    <TableHead className="w-[100px]">Rate</TableHead>
                    <TableHead className="w-[200px]">Mark Attendance</TableHead>
                    <TableHead>Remarks (Optional)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const currentStatus = studentAttendance[student.id];
                    const isUpdated = updatedStudents.has(student.id);

                    return (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          backgroundColor: isUpdated
                            ? "#f0f9ff"
                            : "transparent",
                        }}
                        transition={{ duration: 0.2 }}
                        className="group"
                      >
                        <TableCell>
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={student.photo}
                              alt={student.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <Badge
                              variant={
                                currentStatus === "present"
                                  ? "default"
                                  : currentStatus === "absent"
                                  ? "destructive"
                                  : currentStatus === "late"
                                  ? "warning"
                                  : "secondary"
                              }
                              className="text-xs mt-1"
                            >
                              {currentStatus
                                ? currentStatus.charAt(0).toUpperCase() +
                                  currentStatus.slice(1)
                                : "Not Marked"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {student.rollNumber}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                student.attendancePercentage >= 90
                                  ? "bg-green-500"
                                  : student.attendancePercentage >= 75
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                            <span className="text-sm font-medium">
                              {student.attendancePercentage}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant={
                                currentStatus === "present"
                                  ? "default"
                                  : "outline"
                              }
                              className={`gap-1 transition-all ${
                                currentStatus === "present"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "hover:bg-green-50 hover:text-green-600"
                              }`}
                              onClick={() =>
                                handleAttendanceChange(student.id, "present")
                              }
                            >
                              <CheckCircle size={12} />P
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                currentStatus === "absent"
                                  ? "default"
                                  : "outline"
                              }
                              className={`gap-1 transition-all ${
                                currentStatus === "absent"
                                  ? "bg-red-500 hover:bg-red-600"
                                  : "hover:bg-red-50 hover:text-red-600"
                              }`}
                              onClick={() =>
                                handleAttendanceChange(student.id, "absent")
                              }
                            >
                              <XCircle size={12} />A
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                currentStatus === "late" ? "default" : "outline"
                              }
                              className={`gap-1 transition-all ${
                                currentStatus === "late"
                                  ? "bg-amber-500 hover:bg-amber-600"
                                  : "hover:bg-amber-50 hover:text-amber-600"
                              }`}
                              onClick={() =>
                                handleAttendanceChange(student.id, "late")
                              }
                            >
                              <Clock size={12} />L
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={remarks[student.id] || ""}
                            onChange={(e) =>
                              handleRemarksChange(student.id, e.target.value)
                            }
                            placeholder="Add remarks"
                            className="text-sm"
                          />
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button className="gap-2" onClick={handleSaveAttendance}>
              <Save size={16} />
              Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Display Modal */}
      {qrCode && (
        <Card className="p-6">
          <CardHeader>
            <CardTitle>QR Code for Attendance</CardTitle>
            <CardDescription>
              Students can scan this QR code to mark their attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center mb-4">
              <QRCode
                value={qrCode}
                size={256}
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  width: "256px",
                }}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                Class: {selectedClass} | Section: {selectedSection}
              </p>
              <p>
                Subject: {selectedSubject} | Date: {selectedDate}
              </p>
              {showRandomNumber && (
                <p className="font-mono text-lg font-bold text-blue-600">
                  Access Code: {randomNumber}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setQrCode("")}
            >
              Close QR Code
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Attendance Activity Log */}
      {attendanceLog.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Attendance Activity Log</CardTitle>
            <CardDescription>
              Recent attendance marking activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {attendanceLog
                .slice(-10)
                .reverse()
                .map((log) => (
                  <div
                    key={log.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      log.status === "present"
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {log.method === "barcode" && (
                          <Smartphone size={16} className="text-blue-600" />
                        )}
                        {log.method === "qr" && (
                          <QrCode size={16} className="text-purple-600" />
                        )}
                        {log.method === "nfc" && (
                          <Radio size={16} className="text-green-600" />
                        )}
                        {log.method === "face" && (
                          <Camera size={16} className="text-orange-600" />
                        )}
                        {log.method === "manual" && (
                          <UserCheck size={16} className="text-gray-600" />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {log.method.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium">{log.studentName}</p>
                        <p className="text-sm text-gray-600">
                          Status: {log.status} |{" "}
                          {log.timestamp.toLocaleTimeString()}
                        </p>
                        {log.confidence && (
                          <p className="text-xs text-gray-500">
                            Confidence: {log.confidence.toFixed(1)}%
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {log.status === "present" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherStudentAttendance;
