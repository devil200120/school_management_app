/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  UserCheck,
  Clock,
  Users,
  CreditCard,
  QrCode,
  Camera,
  CheckCircle,
  XCircle,
  Play,
  Square,
  DollarSign,
  BarChart3,
  Timer,
  AlertCircle,
} from "lucide-react";

const TeacherAttendancePanel = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [punchStatus, setPunchStatus] = useState({
    isPunchedIn: false,
    punchInTime: null,
    punchOutTime: null,
  });
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [attendanceMethod, setAttendanceMethod] = useState("normal");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // New states for attendance methods
  const [nfcReaderActive, setNfcReaderActive] = useState(false);
  const [qrScannerActive, setQrScannerActive] = useState(false);
  const [faceRecognitionActive, setFaceRecognitionActive] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [nfcConnectionStatus, setNfcConnectionStatus] =
    useState("disconnected");
  const [lastScanAttempt, setLastScanAttempt] = useState(null);
  const [duplicateScanPrevention, setDuplicateScanPrevention] = useState(
    new Set()
  );
  const [cameraStream, setCameraStream] = useState(null);
  const [faceDetectionConfidence, setFaceDetectionConfidence] = useState(0);
  const [recognizedFaces, setRecognizedFaces] = useState([]);

  // Enhanced mock data with more realistic information
  const classes = ["10A", "10B", "11A", "11B", "12A", "12B"];
  const periods = [
    "Period 1 (08:00-08:45)",
    "Period 2 (08:45-09:30)",
    "Period 3 (09:45-10:30)",
    "Period 4 (10:30-11:15)",
    "Period 5 (11:30-12:15)",
    "Period 6 (12:15-13:00)",
  ];

  const students = [
    {
      id: "STD001",
      name: "John Doe",
      rollNo: "001",
      nfcId: "NFC123456",
      qrCode: "QR001",
      faceId: "FACE001",
      cardNumber: "1234567890123456",
      cardStatus: "active",
      lastAttendance: null,
      attendanceStreak: 5,
      photo: "/api/photos/student001.jpg",
    },
    {
      id: "STD002",
      name: "Jane Smith",
      rollNo: "002",
      nfcId: "NFC789012",
      qrCode: "QR002",
      faceId: "FACE002",
      cardNumber: "2345678901234567",
      cardStatus: "active",
      lastAttendance: null,
      attendanceStreak: 8,
      photo: "/api/photos/student002.jpg",
    },
    {
      id: "STD003",
      name: "Mike Johnson",
      rollNo: "003",
      nfcId: "NFC345678",
      qrCode: "QR003",
      faceId: "FACE003",
      cardNumber: "3456789012345678",
      cardStatus: "active",
      lastAttendance: null,
      attendanceStreak: 3,
      photo: "/api/photos/student003.jpg",
    },
    {
      id: "STD004",
      name: "Sarah Wilson",
      rollNo: "004",
      nfcId: "NFC901234",
      qrCode: "QR004",
      faceId: "FACE004",
      cardNumber: "4567890123456789",
      cardStatus: "blocked",
      lastAttendance: null,
      attendanceStreak: 0,
      photo: "/api/photos/student004.jpg",
    },
    {
      id: "STD005",
      name: "David Brown",
      rollNo: "005",
      nfcId: "NFC567890",
      qrCode: "QR005",
      faceId: "FACE005",
      cardNumber: "5678901234567890",
      cardStatus: "active",
      lastAttendance: null,
      attendanceStreak: 12,
      photo: "/api/photos/student005.jpg",
    },
  ];

  const [studentAttendance, setStudentAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = { status: null, timestamp: null, method: null };
      return acc;
    }, {})
  );

  // Mock salary data
  const salaryData = {
    currentMonth: {
      workedDays: 22,
      totalDays: 30,
      percentage: 73.3,
      basicSalary: 45000,
      attendanceBonus: 2000,
      deductions: 500,
      netSalary: 46500,
    },
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePunchIn = () => {
    setPunchStatus({
      isPunchedIn: true,
      punchInTime: new Date(),
      punchOutTime: null,
    });
  };

  const handlePunchOut = () => {
    setPunchStatus((prev) => ({
      ...prev,
      isPunchedIn: false,
      punchOutTime: new Date(),
    }));
  };

  const markAttendance = (
    studentId,
    status,
    method = attendanceMethod,
    additionalData = {}
  ) => {
    const currentTime = new Date();
    const student = students.find((s) => s.id === studentId);

    // Check for duplicate scans (prevent scanning same student multiple times within 30 seconds)
    const recentScanKey = `${studentId}-${method}`;
    if (duplicateScanPrevention.has(recentScanKey)) {
      setScannedData(
        `⚠️ Duplicate scan detected for ${student?.name}. Please wait before scanning again.`
      );
      setTimeout(() => setScannedData(""), 4000);
      return false;
    }

    // Update attendance
    setStudentAttendance((prev) => ({
      ...prev,
      [studentId]: {
        status,
        timestamp: currentTime,
        method: method,
        confidence: additionalData.confidence || 100,
        deviceId: additionalData.deviceId || "teacher-device-001",
        location: additionalData.location || "Classroom",
      },
    }));

    // Add to attendance log
    setAttendanceLog((prev) => [
      ...prev,
      {
        id: Date.now(),
        studentId,
        studentName: student?.name,
        rollNo: student?.rollNo,
        status,
        timestamp: currentTime,
        method,
        confidence: additionalData.confidence || 100,
        deviceId: additionalData.deviceId || "teacher-device-001",
        additionalData,
      },
    ]);

    // Add to duplicate prevention (expires after 30 seconds)
    setDuplicateScanPrevention((prev) => {
      const newSet = new Set(prev);
      newSet.add(recentScanKey);
      setTimeout(() => {
        setDuplicateScanPrevention((current) => {
          const updated = new Set(current);
          updated.delete(recentScanKey);
          return updated;
        });
      }, 30000);
      return newSet;
    });

    // Update last scan attempt
    setLastScanAttempt({ studentId, timestamp: currentTime, method, status });

    return true;
  };

  // Enhanced NFC Reader Functions
  const initializeNFCReader = async () => {
    try {
      setNfcConnectionStatus("connecting");
      setScannedData("🔄 Initializing NFC reader...");

      // Simulate NFC reader initialization
      setTimeout(() => {
        setNfcConnectionStatus("connected");
        setScannedData("✅ NFC reader connected successfully");
        setTimeout(() => setScannedData(""), 3000);
      }, 2000);
    } catch (error) {
      setNfcConnectionStatus("error");
      setScannedData("❌ Failed to connect to NFC reader");
      setTimeout(() => setScannedData(""), 3000);
    }
  };

  const startNFCReader = () => {
    if (nfcConnectionStatus !== "connected") {
      initializeNFCReader();
      return;
    }

    setNfcReaderActive(true);
    setScannedData("📱 NFC Reader active - Waiting for card tap...");

    // Simulate realistic NFC reading with random timing
    const randomDelay = Math.random() * 3000 + 1000; // 1-4 seconds
    setTimeout(() => {
      if (nfcReaderActive) {
        // Simulate random NFC card detection
        const randomStudentIndex = Math.floor(Math.random() * students.length);
        const randomStudent = students[randomStudentIndex];
        handleNFCScanned(randomStudent.nfcId, {
          cardNumber: randomStudent.cardNumber,
          signalStrength: Math.floor(Math.random() * 40) + 60, // 60-100%
          readTime: Math.floor(Math.random() * 200) + 100, // 100-300ms
        });
      }
    }, randomDelay);
  };

  const stopNFCReader = () => {
    setNfcReaderActive(false);
    setScannedData("⏹️ NFC Reader stopped");
    setTimeout(() => setScannedData(""), 2000);
  };

  const handleNFCScanned = (nfcData, additionalData = {}) => {
    const student = students.find((s) => s.nfcId === nfcData);

    if (!student) {
      setScannedData(`❌ Unknown NFC card: ${nfcData}`);
      setAttendanceLog((prev) => [
        ...prev,
        {
          id: Date.now(),
          studentId: "unknown",
          studentName: "Unknown Card",
          status: "failed",
          timestamp: new Date(),
          method: "nfc",
          error: "Card not registered",
          nfcData,
        },
      ]);
      setTimeout(() => setScannedData(""), 4000);
      setNfcReaderActive(false);
      return;
    }

    if (student.cardStatus === "blocked") {
      setScannedData(`🚫 Card blocked for ${student.name}`);
      setTimeout(() => setScannedData(""), 4000);
      setNfcReaderActive(false);
      return;
    }

    const success = markAttendance(student.id, "present", "nfc", {
      ...additionalData,
      nfcId: nfcData,
      cardNumber: student.cardNumber,
    });

    if (success) {
      setScannedData(`✅ ${student.name} marked present via NFC`);
      // Visual/Audio feedback simulation
      setTimeout(() => {
        setScannedData(
          `🎯 Signal: ${additionalData.signalStrength || 85}% | Read time: ${
            additionalData.readTime || 150
          }ms`
        );
        setTimeout(() => setScannedData(""), 3000);
      }, 2000);
    }

    setNfcReaderActive(false);
  };

  // Enhanced QR Code Scanner Functions
  const initializeCamera = async () => {
    try {
      setScannedData("📷 Requesting camera access...");

      // Simulate camera permission request
      setTimeout(() => {
        const granted = Math.random() > 0.1; // 90% success rate
        if (granted) {
          setCameraStream("mock-stream");
          setScannedData("✅ Camera access granted");
          setTimeout(() => setScannedData(""), 2000);
        } else {
          setScannedData("❌ Camera access denied");
          setTimeout(() => setScannedData(""), 3000);
        }
      }, 1500);
    } catch (error) {
      setScannedData("❌ Camera initialization failed");
      setTimeout(() => setScannedData(""), 3000);
    }
  };

  const startQRScanner = () => {
    if (!cameraStream) {
      initializeCamera();
      return;
    }

    setQrScannerActive(true);
    setScannedData("📷 QR Scanner active - Position QR code in view...");

    // Simulate realistic QR scanning
    const scanInterval = setInterval(() => {
      if (!qrScannerActive) {
        clearInterval(scanInterval);
        return;
      }

      // Simulate QR detection chance (70% per second)
      if (Math.random() > 0.3) {
        const randomStudentIndex = Math.floor(Math.random() * students.length);
        const randomStudent = students[randomStudentIndex];
        clearInterval(scanInterval);
        handleQRScanned(randomStudent.qrCode, {
          quality: Math.floor(Math.random() * 30) + 70, // 70-100%
          distance: Math.floor(Math.random() * 50) + 20, // 20-70cm
          angle: Math.floor(Math.random() * 30) - 15, // -15 to +15 degrees
        });
      }
    }, 1000);

    // Auto-timeout after 15 seconds
    setTimeout(() => {
      if (qrScannerActive) {
        clearInterval(scanInterval);
        setScannedData("⏰ QR scan timeout - No code detected");
        setQrScannerActive(false);
        setTimeout(() => setScannedData(""), 3000);
      }
    }, 15000);
  };

  const stopQRScanner = () => {
    setQrScannerActive(false);
    setScannedData("⏹️ QR Scanner stopped");
    setTimeout(() => setScannedData(""), 2000);
  };

  const handleQRScanned = (qrData, additionalData = {}) => {
    const student = students.find((s) => s.qrCode === qrData);

    if (!student) {
      setScannedData(`❌ Invalid QR code: ${qrData}`);
      setAttendanceLog((prev) => [
        ...prev,
        {
          id: Date.now(),
          studentId: "unknown",
          studentName: "Invalid QR",
          status: "failed",
          timestamp: new Date(),
          method: "qrcode",
          error: "QR code not recognized",
          qrData,
        },
      ]);
      setTimeout(() => setScannedData(""), 4000);
      setQrScannerActive(false);
      return;
    }

    const success = markAttendance(student.id, "present", "qrcode", {
      ...additionalData,
      qrCode: qrData,
    });

    if (success) {
      setScannedData(`✅ ${student.name} marked present via QR scan`);
      setTimeout(() => {
        setScannedData(
          `📊 Quality: ${additionalData.quality || 85}% | Distance: ${
            additionalData.distance || 35
          }cm`
        );
        setTimeout(() => setScannedData(""), 3000);
      }, 2000);
    }

    setQrScannerActive(false);
  };

  // Enhanced Face Recognition Functions
  const initializeFaceRecognition = async () => {
    try {
      setScannedData("👤 Initializing face recognition system...");

      setTimeout(() => {
        setScannedData("📷 Loading camera for face detection...");
        setTimeout(() => {
          setCameraStream("face-detection-stream");
          setScannedData("🧠 Loading face recognition models...");
          setTimeout(() => {
            setScannedData("✅ Face recognition system ready");
            setTimeout(() => setScannedData(""), 2000);
          }, 2000);
        }, 1500);
      }, 1000);
    } catch (error) {
      setScannedData("❌ Face recognition initialization failed");
      setTimeout(() => setScannedData(""), 3000);
    }
  };

  const startFaceRecognition = () => {
    if (!cameraStream || cameraStream !== "face-detection-stream") {
      initializeFaceRecognition();
      return;
    }

    setFaceRecognitionActive(true);
    setFaceDetectionConfidence(0);
    setRecognizedFaces([]);
    setScannedData("👤 Face recognition active - Look at the camera...");

    // Simulate face detection process
    const detectionInterval = setInterval(() => {
      if (!faceRecognitionActive) {
        clearInterval(detectionInterval);
        return;
      }

      // Simulate face detection confidence building
      setFaceDetectionConfidence((prev) => {
        const newConfidence = Math.min(prev + Math.random() * 25, 100);

        if (newConfidence > 85) {
          // High confidence - attempt recognition
          const randomStudentIndex = Math.floor(
            Math.random() * students.length
          );
          const randomStudent = students[randomStudentIndex];
          clearInterval(detectionInterval);

          handleFaceRecognized(randomStudent.faceId, {
            confidence: newConfidence,
            facePosition: {
              x: Math.floor(Math.random() * 200) + 100,
              y: Math.floor(Math.random() * 200) + 100,
              width: 150,
              height: 180,
            },
            lightingCondition: "good",
            faceAngle: Math.floor(Math.random() * 20) - 10,
          });
        }

        return newConfidence;
      });
    }, 500);

    // Auto-timeout after 20 seconds
    setTimeout(() => {
      if (faceRecognitionActive) {
        clearInterval(detectionInterval);
        setScannedData("⏰ Face recognition timeout");
        setFaceRecognitionActive(false);
        setTimeout(() => setScannedData(""), 3000);
      }
    }, 20000);
  };

  const stopFaceRecognition = () => {
    setFaceRecognitionActive(false);
    setFaceDetectionConfidence(0);
    setScannedData("⏹️ Face recognition stopped");
    setTimeout(() => setScannedData(""), 2000);
  };

  const handleFaceRecognized = (faceId, additionalData = {}) => {
    const student = students.find((s) => s.faceId === faceId);

    if (!student) {
      setScannedData(`❌ Face not recognized in database`);
      setAttendanceLog((prev) => [
        ...prev,
        {
          id: Date.now(),
          studentId: "unknown",
          studentName: "Unknown Face",
          status: "failed",
          timestamp: new Date(),
          method: "face",
          error: "Face not in database",
          confidence: additionalData.confidence || 0,
        },
      ]);
      setTimeout(() => setScannedData(""), 4000);
      setFaceRecognitionActive(false);
      return;
    }

    // Check confidence threshold
    if (additionalData.confidence < 75) {
      setScannedData(
        `⚠️ Low confidence (${additionalData.confidence.toFixed(
          1
        )}%) - Please try again`
      );
      setTimeout(() => setScannedData(""), 4000);
      setFaceRecognitionActive(false);
      return;
    }

    const success = markAttendance(student.id, "present", "face", {
      ...additionalData,
      faceId: faceId,
    });

    if (success) {
      setScannedData(`✅ ${student.name} recognized and marked present`);
      setTimeout(() => {
        setScannedData(
          `🎯 Confidence: ${additionalData.confidence.toFixed(1)}% | Angle: ${
            additionalData.faceAngle || 0
          }°`
        );
        setTimeout(() => setScannedData(""), 3000);
      }, 2000);
    }

    setFaceRecognitionActive(false);
    setFaceDetectionConfidence(0);
  };

  const formatTime = (date) => {
    return date
      ? date.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--";
  };

  const getAttendanceStats = () => {
    const total = Object.keys(studentAttendance).length;
    const present = Object.values(studentAttendance).filter(
      (att) => att.status === "present"
    ).length;
    const absent = Object.values(studentAttendance).filter(
      (att) => att.status === "absent"
    ).length;
    const pending = total - present - absent;

    return {
      total,
      present,
      absent,
      pending,
      percentage: total > 0 ? ((present / total) * 100).toFixed(1) : 0,
    };
  };

  const stats = getAttendanceStats();

  const AttendanceMethodButton = ({
    method,
    icon: Icon,
    label,
    isActive,
    onClick,
  }) => (
    <Button
      variant={isActive ? "default" : "outline"}
      onClick={() => onClick(method)}
      className="flex-1 flex items-center justify-center space-x-2 h-16"
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Teacher Attendance Dashboard
          </h1>
          <p className="text-gray-600">
            Manage class attendance and track your punch records
          </p>
          <div className="mt-4 text-lg font-medium text-gray-800">
            {currentTime.toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </div>
        </div>

        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="attendance"
              className="flex items-center space-x-2"
            >
              <UserCheck className="h-4 w-4" />
              <span>Take Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="punch" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Punch In/Out</span>
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger value="salary" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Salary View</span>
            </TabsTrigger>
          </TabsList>

          {/* Take Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            {/* Class and Period Selection */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Class Configuration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label>Select Class</Label>
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select Period</Label>
                  <Select
                    value={selectedPeriod}
                    onValueChange={setSelectedPeriod}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose a period" />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map((period) => (
                        <SelectItem key={period} value={period}>
                          {period}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Attendance Method Selection */}
              <div className="mb-6">
                <Label className="mb-3 block">Attendance Method</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <AttendanceMethodButton
                    method="normal"
                    icon={UserCheck}
                    label="Normal"
                    isActive={attendanceMethod === "normal"}
                    onClick={setAttendanceMethod}
                  />
                  <AttendanceMethodButton
                    method="nfc"
                    icon={CreditCard}
                    label="NFC Card"
                    isActive={attendanceMethod === "nfc"}
                    onClick={setAttendanceMethod}
                  />
                  <AttendanceMethodButton
                    method="qrcode"
                    icon={QrCode}
                    label="QR Code"
                    isActive={attendanceMethod === "qrcode"}
                    onClick={setAttendanceMethod}
                  />
                  <AttendanceMethodButton
                    method="face"
                    icon={Camera}
                    label="Face Recognition"
                    isActive={attendanceMethod === "face"}
                    onClick={setAttendanceMethod}
                  />
                </div>
              </div>
            </Card>

            {/* Attendance Method Specific Interface */}
            {selectedClass && selectedPeriod && (
              <div className="space-y-6">
                {/* Enhanced NFC Reader Interface */}
                {attendanceMethod === "nfc" && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <span>NFC Card Reader System</span>
                      <Badge
                        variant={
                          nfcConnectionStatus === "connected"
                            ? "default"
                            : "secondary"
                        }
                        className="ml-2"
                      >
                        {nfcConnectionStatus === "connected"
                          ? "🟢 Connected"
                          : nfcConnectionStatus === "connecting"
                          ? "🟡 Connecting..."
                          : nfcConnectionStatus === "error"
                          ? "🔴 Error"
                          : "⚫ Disconnected"}
                      </Badge>
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* NFC Reader Control */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">
                          Reader Control
                        </h4>
                        <div
                          className={`p-6 border-2 border-dashed rounded-lg text-center ${
                            nfcReaderActive
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                        >
                          {nfcReaderActive ? (
                            <div className="space-y-3">
                              <div className="animate-pulse">
                                <CreditCard className="h-16 w-16 text-blue-600 mx-auto mb-3" />
                                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                              </div>
                              <p className="text-blue-600 font-medium">
                                📡 NFC Reader Active
                              </p>
                              <p className="text-sm text-gray-600">
                                Tap your student ID card on the reader
                              </p>
                              <div className="mt-3 p-2 bg-blue-100 rounded">
                                <p className="text-xs text-blue-800">
                                  🔍 Scanning for NFC signals...
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                  Range: 4cm | Frequency: 13.56 MHz
                                </p>
                              </div>
                              <Button
                                onClick={stopNFCReader}
                                variant="outline"
                                size="sm"
                                className="mt-2"
                              >
                                ⏹️ Stop Reader
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-3" />
                              <p className="text-gray-600">
                                NFC Reader Inactive
                              </p>
                              <p className="text-sm text-gray-500">
                                Click to start scanning for student cards
                              </p>
                              <div className="mt-3 p-2 bg-gray-100 rounded">
                                <p className="text-xs text-gray-600">
                                  Status: {nfcConnectionStatus}
                                </p>
                                {lastScanAttempt && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Last scan:{" "}
                                    {lastScanAttempt.timestamp.toLocaleTimeString()}
                                  </p>
                                )}
                              </div>
                              <Button
                                onClick={startNFCReader}
                                disabled={nfcConnectionStatus === "connecting"}
                                className="mt-2"
                              >
                                {nfcConnectionStatus === "disconnected"
                                  ? "🔗 Connect & Start"
                                  : "▶️ Start NFC Reader"}
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Status Messages */}
                        {scannedData && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-800 text-sm font-medium">
                              {scannedData}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Student Cards Status */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">
                          Student Cards ({students.length})
                        </h4>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {students.map((student) => (
                            <div
                              key={student.id}
                              className="border rounded-lg p-3 bg-gray-50"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-medium text-sm">
                                    {student.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Roll: {student.rollNo}
                                  </p>
                                </div>
                                <Badge
                                  variant={
                                    student.cardStatus === "active"
                                      ? "default"
                                      : "destructive"
                                  }
                                >
                                  {student.cardStatus === "active"
                                    ? "🟢 Active"
                                    : "🔴 Blocked"}
                                </Badge>
                              </div>

                              <div className="space-y-1 text-xs text-gray-600">
                                <p>🆔 NFC: {student.nfcId}</p>
                                <p>
                                  💳 Card: ****{student.cardNumber.slice(-4)}
                                </p>
                                <p>
                                  📊 Streak: {student.attendanceStreak} days
                                </p>
                              </div>

                              <div className="mt-2 flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleNFCScanned(student.nfcId, {
                                      cardNumber: student.cardNumber,
                                      signalStrength: 95,
                                      readTime: 120,
                                    })
                                  }
                                  disabled={student.cardStatus !== "active"}
                                  className="text-xs flex-1"
                                >
                                  📱 Simulate Tap
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Recent Scans */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-700">
                          NFC Activity Log
                        </h4>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {attendanceLog.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                              No NFC activity yet
                            </p>
                          ) : (
                            attendanceLog
                              .filter((log) => log.method === "nfc")
                              .slice(-10)
                              .reverse()
                              .map((log) => (
                                <div
                                  key={log.id}
                                  className={`p-3 rounded border ${
                                    log.status === "present"
                                      ? "bg-green-50 border-green-200"
                                      : log.status === "failed"
                                      ? "bg-red-50 border-red-200"
                                      : "bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <span className="text-sm font-medium">
                                        {log.studentName}
                                      </span>
                                      {log.rollNo && (
                                        <span className="text-xs text-gray-500 ml-2">
                                          #{log.rollNo}
                                        </span>
                                      )}
                                      <p className="text-xs mt-1 flex items-center space-x-1">
                                        <span>
                                          {log.status === "present"
                                            ? "✅"
                                            : "❌"}
                                        </span>
                                        <span>{log.status}</span>
                                        {log.confidence && (
                                          <span>• {log.confidence}%</span>
                                        )}
                                      </p>
                                      {log.additionalData && (
                                        <p className="text-xs text-gray-500 mt-1">
                                          {log.additionalData.signalStrength &&
                                            `📶 ${log.additionalData.signalStrength}% • `}
                                          {log.additionalData.readTime &&
                                            `⚡ ${log.additionalData.readTime}ms`}
                                        </p>
                                      )}
                                      {log.error && (
                                        <p className="text-xs text-red-600 mt-1">
                                          ⚠️ {log.error}
                                        </p>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <span className="text-xs text-gray-500">
                                        {log.timestamp.toLocaleTimeString()}
                                      </span>
                                      <div className="flex items-center space-x-1 mt-1">
                                        <CreditCard className="h-3 w-3 text-blue-600" />
                                        <span className="text-xs text-blue-600">
                                          NFC
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* QR Code Scanner Interface */}
                {attendanceMethod === "qrcode" && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <QrCode className="h-5 w-5 text-purple-600" />
                      <span>QR Code Scanner</span>
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Scanner Interface */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">
                          Camera Scanner
                        </h4>
                        <div
                          className={`p-6 border-2 border-dashed rounded-lg text-center ${
                            qrScannerActive
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-300"
                          }`}
                        >
                          {qrScannerActive ? (
                            <div className="space-y-3">
                              <div className="animate-pulse">
                                <QrCode className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                              </div>
                              <p className="text-purple-600 font-medium">
                                Camera Active
                              </p>
                              <p className="text-sm text-gray-600">
                                Position QR code in view
                              </p>
                              <div className="w-32 h-32 border-2 border-purple-400 rounded-lg mx-auto flex items-center justify-center">
                                <div className="w-16 h-16 border border-purple-300 rounded animate-ping"></div>
                              </div>
                              <Button
                                onClick={stopQRScanner}
                                variant="outline"
                                size="sm"
                                className="mt-2"
                              >
                                Stop Scanner
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-600">
                                QR Scanner Inactive
                              </p>
                              <Button onClick={startQRScanner} className="mt-2">
                                Start QR Scanner
                              </Button>
                            </div>
                          )}
                        </div>
                        {scannedData && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 text-sm font-medium">
                              {scannedData}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Student QR Codes Display */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">
                          Student QR Codes
                        </h4>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {students.map((student) => (
                            <div
                              key={student.id}
                              className="border rounded-lg p-3 bg-gray-50"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-medium text-sm">
                                    {student.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Roll: {student.rollNo}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-purple-600 font-medium">
                                    QR: {student.qrCode}
                                  </p>
                                </div>
                              </div>
                              {/* QR Code Display */}
                              <div className="flex justify-center">
                                <div className="w-20 h-20 bg-white border rounded flex items-center justify-center relative">
                                  <div className="grid grid-cols-8 gap-0.5 w-16 h-16">
                                    {/* Simple QR Code pattern simulation */}
                                    {Array.from({ length: 64 }, (_, i) => (
                                      <div
                                        key={i}
                                        className={`w-1 h-1 ${
                                          (i +
                                            student.qrCode.charCodeAt(
                                              i % student.qrCode.length
                                            )) %
                                            2 ===
                                          0
                                            ? "bg-black"
                                            : "bg-white"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 flex justify-center">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleQRScanned(student.qrCode)
                                  }
                                  className="text-xs"
                                >
                                  Simulate Scan
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Scans */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-700">
                          Recent QR Scans
                        </h4>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {attendanceLog.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                              No scans yet
                            </p>
                          ) : (
                            attendanceLog
                              .filter((log) => log.method === "qrcode")
                              .slice(-10)
                              .reverse()
                              .map((log) => (
                                <div
                                  key={log.id}
                                  className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded"
                                >
                                  <div>
                                    <span className="text-sm font-medium">
                                      {log.studentName}
                                    </span>
                                    <p className="text-xs text-gray-500">
                                      Status: {log.status}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs text-gray-500">
                                      {log.timestamp.toLocaleTimeString()}
                                    </span>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <QrCode className="h-3 w-3 text-purple-600" />
                                      <span className="text-xs text-purple-600">
                                        QR Scan
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Enhanced Face Recognition Interface */}
                {attendanceMethod === "face" && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <Camera className="h-5 w-5 text-green-600" />
                      <span>AI Face Recognition System</span>
                      <Badge
                        variant={cameraStream ? "default" : "secondary"}
                        className="ml-2"
                      >
                        {cameraStream ? "🟢 Camera Ready" : "⚫ Camera Off"}
                      </Badge>
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Face Detection Interface */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">
                          Live Face Detection
                        </h4>
                        <div
                          className={`p-6 border-2 border-dashed rounded-lg text-center ${
                            faceRecognitionActive
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                          }`}
                        >
                          {faceRecognitionActive ? (
                            <div className="space-y-3">
                              <div className="relative">
                                <Camera className="h-16 w-16 text-green-600 mx-auto mb-3" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-200 to-transparent animate-pulse rounded-full"></div>
                              </div>
                              <p className="text-green-600 font-medium">
                                🎥 Face Recognition Active
                              </p>
                              <p className="text-sm text-gray-600">
                                Look directly at the camera
                              </p>

                              {/* Face Detection Viewfinder */}
                              <div className="w-48 h-36 border-2 border-green-400 rounded-lg mx-auto flex items-center justify-center relative overflow-hidden bg-gray-100">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-100 to-transparent animate-pulse"></div>

                                {/* Face Detection Box */}
                                <div className="w-24 h-30 border-2 border-green-500 rounded-lg flex items-center justify-center relative">
                                  <div className="w-16 h-20 bg-green-300 rounded-lg animate-ping opacity-50"></div>

                                  {/* Confidence Meter */}
                                  <div className="absolute -bottom-8 left-0 right-0">
                                    <div className="text-xs text-green-700 font-medium mb-1">
                                      Confidence:{" "}
                                      {faceDetectionConfidence.toFixed(1)}%
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                        style={{
                                          width: `${faceDetectionConfidence}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>

                                {/* Scanning Lines */}
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-green-400 animate-pulse"></div>
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 animate-pulse"></div>
                              </div>

                              <div className="mt-4 p-2 bg-green-100 rounded text-xs">
                                <p className="text-green-800">
                                  🧠 AI Processing...
                                </p>
                                <p className="text-green-600">
                                  Resolution: 1920x1080 | FPS: 30
                                </p>
                                <p className="text-green-600">
                                  Lighting: Good | Angle: Optimal
                                </p>
                              </div>

                              <Button
                                onClick={stopFaceRecognition}
                                variant="outline"
                                size="sm"
                                className="mt-2"
                              >
                                ⏹️ Stop Recognition
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-3" />
                              <p className="text-gray-600">
                                Face Recognition Inactive
                              </p>
                              <p className="text-sm text-gray-500">
                                AI-powered facial recognition system
                              </p>

                              <div className="mt-3 p-3 bg-gray-100 rounded">
                                <p className="text-xs text-gray-600 font-medium">
                                  System Status:
                                </p>
                                <p className="text-xs text-gray-500">
                                  Camera:{" "}
                                  {cameraStream
                                    ? "✅ Ready"
                                    : "❌ Not initialized"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  AI Models:{" "}
                                  {cameraStream === "face-detection-stream"
                                    ? "✅ Loaded"
                                    : "❌ Not loaded"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Database: ✅ {students.length} faces enrolled
                                </p>
                              </div>

                              <Button
                                onClick={startFaceRecognition}
                                className="mt-2"
                              >
                                {cameraStream !== "face-detection-stream"
                                  ? "🔗 Initialize System"
                                  : "▶️ Start Face Recognition"}
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Status Messages */}
                        {scannedData && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 text-sm font-medium">
                              {scannedData}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Student Face Database */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">
                          Enrolled Faces ({students.length})
                        </h4>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {students.map((student) => (
                            <div
                              key={student.id}
                              className="border rounded-lg p-3 bg-gray-50"
                            >
                              <div className="flex items-center space-x-3">
                                {/* Face Thumbnail Simulation */}
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    {student.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </span>
                                </div>

                                <div className="flex-1">
                                  <p className="font-medium text-sm">
                                    {student.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Roll: {student.rollNo}
                                  </p>
                                  <p className="text-xs text-purple-600">
                                    Face ID: {student.faceId}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-2 space-y-1 text-xs text-gray-600">
                                <div className="flex justify-between">
                                  <span>Enrollment Date:</span>
                                  <span>Sep 15, 2024</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Recognition Rate:</span>
                                  <span className="text-green-600">96.8%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Last Updated:</span>
                                  <span>Oct 28, 2024</span>
                                </div>
                              </div>

                              <div className="mt-3 flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleFaceRecognized(student.faceId, {
                                      confidence: 92.5,
                                      facePosition: {
                                        x: 150,
                                        y: 120,
                                        width: 150,
                                        height: 180,
                                      },
                                      lightingCondition: "good",
                                      faceAngle: 2,
                                    })
                                  }
                                  className="text-xs flex-1"
                                >
                                  👤 Simulate Recognition
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Recognition Log */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-700">
                          Recognition Activity
                        </h4>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {attendanceLog.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                              No face recognition activity yet
                            </p>
                          ) : (
                            attendanceLog
                              .filter((log) => log.method === "face")
                              .slice(-10)
                              .reverse()
                              .map((log) => (
                                <div
                                  key={log.id}
                                  className={`p-3 rounded border ${
                                    log.status === "present"
                                      ? "bg-green-50 border-green-200"
                                      : log.status === "failed"
                                      ? "bg-red-50 border-red-200"
                                      : "bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                          <span className="text-white text-xs font-semibold">
                                            {log.studentName
                                              ?.split(" ")
                                              .map((n) => n[0])
                                              .join("") || "?"}
                                          </span>
                                        </div>
                                        <span className="text-sm font-medium">
                                          {log.studentName}
                                        </span>
                                        {log.rollNo && (
                                          <span className="text-xs text-gray-500">
                                            #{log.rollNo}
                                          </span>
                                        )}
                                      </div>

                                      <p className="text-xs mt-1 flex items-center space-x-1">
                                        <span>
                                          {log.status === "present"
                                            ? "✅"
                                            : "❌"}
                                        </span>
                                        <span>{log.status}</span>
                                        {log.confidence && (
                                          <span>
                                            • {log.confidence.toFixed(1)}%
                                          </span>
                                        )}
                                      </p>

                                      {log.additionalData && (
                                        <p className="text-xs text-gray-500 mt-1">
                                          {log.additionalData.faceAngle !==
                                            undefined &&
                                            `📐 ${log.additionalData.faceAngle}° • `}
                                          {log.additionalData
                                            .lightingCondition &&
                                            `💡 ${log.additionalData.lightingCondition}`}
                                        </p>
                                      )}

                                      {log.error && (
                                        <p className="text-xs text-red-600 mt-1">
                                          ⚠️ {log.error}
                                        </p>
                                      )}
                                    </div>

                                    <div className="text-right">
                                      <span className="text-xs text-gray-500">
                                        {log.timestamp.toLocaleTimeString()}
                                      </span>
                                      <div className="flex items-center space-x-1 mt-1">
                                        <Camera className="h-3 w-3 text-green-600" />
                                        <span className="text-xs text-green-600">
                                          Face AI
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* Attendance Stats */}
            {selectedClass && selectedPeriod && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">Total</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.total}
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">Present</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.present}
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-medium">Absent</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    {stats.absent}
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Timer className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-600">
                    {stats.pending}
                  </div>
                </Card>
              </div>
            )}

            {/* Student List for Attendance */}
            {selectedClass && selectedPeriod && (
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    Student Attendance - {selectedClass} ({selectedPeriod})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      Attendance: {stats.percentage}%
                    </span>
                    <Progress
                      value={parseFloat(stats.percentage)}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {students.map((student) => {
                    const attendance = studentAttendance[student.id];
                    return (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {student.rollNo}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <div className="flex space-x-2 text-xs text-gray-500">
                              <span>Roll: {student.rollNo}</span>
                              {attendanceMethod === "nfc" && (
                                <span>NFC: {student.nfcId}</span>
                              )}
                              {attendanceMethod === "qrcode" && (
                                <span>QR: {student.qrCode}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {attendance.status && (
                            <div className="text-xs text-gray-500">
                              <div>
                                Marked at: {formatTime(attendance.timestamp)}
                              </div>
                              <div>Method: {attendance.method}</div>
                            </div>
                          )}
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant={
                                attendance.status === "present"
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                markAttendance(student.id, "present")
                              }
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Present
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                attendance.status === "absent"
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                markAttendance(student.id, "absent")
                              }
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Absent
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {stats.present + stats.absent === stats.total && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        Attendance Complete
                      </span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      All students marked for {selectedClass} - {selectedPeriod}
                    </p>
                  </div>
                )}
              </Card>
            )}
          </TabsContent>

          {/* Punch In/Out Tab */}
          <TabsContent value="punch" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                Teacher Punch System
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-blue-900">
                      Current Status
                    </h3>
                    <Badge
                      variant={
                        punchStatus.isPunchedIn ? "default" : "secondary"
                      }
                    >
                      {punchStatus.isPunchedIn
                        ? "Punched In"
                        : "Not Punched In"}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-blue-700">Punch In Time</Label>
                      <div className="text-lg font-semibold text-blue-900">
                        {formatTime(punchStatus.punchInTime)}
                      </div>
                    </div>

                    <div>
                      <Label className="text-blue-700">Punch Out Time</Label>
                      <div className="text-lg font-semibold text-blue-900">
                        {formatTime(punchStatus.punchOutTime)}
                      </div>
                    </div>

                    {punchStatus.isPunchedIn && punchStatus.punchInTime && (
                      <div>
                        <Label className="text-blue-700">
                          Working Duration
                        </Label>
                        <div className="text-lg font-semibold text-blue-900">
                          {Math.floor(
                            (currentTime - punchStatus.punchInTime) / 1000 / 60
                          )}{" "}
                          minutes
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Punch Actions</h3>
                  <div className="space-y-4">
                    <Button
                      onClick={handlePunchIn}
                      disabled={punchStatus.isPunchedIn}
                      className="w-full flex items-center justify-center space-x-2 h-12"
                      variant={
                        punchStatus.isPunchedIn ? "secondary" : "default"
                      }
                    >
                      <Play className="h-5 w-5" />
                      <span>Punch In</span>
                    </Button>

                    <Button
                      onClick={handlePunchOut}
                      disabled={!punchStatus.isPunchedIn}
                      className="w-full flex items-center justify-center space-x-2 h-12"
                      variant={
                        !punchStatus.isPunchedIn ? "secondary" : "destructive"
                      }
                    >
                      <Square className="h-5 w-5" />
                      <span>Punch Out</span>
                    </Button>
                  </div>

                  {punchStatus.punchInTime && punchStatus.punchOutTime && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm font-medium">
                          Day Complete
                        </span>
                      </div>
                      <p className="text-green-700 text-xs mt-1">
                        Total working time:{" "}
                        {Math.floor(
                          (punchStatus.punchOutTime - punchStatus.punchInTime) /
                            1000 /
                            60
                        )}{" "}
                        minutes
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            {/* Quick Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      Classes Today
                    </p>
                    <p className="text-2xl font-bold text-blue-900">6</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700">
                      Avg Attendance
                    </p>
                    <p className="text-2xl font-bold text-green-900">85%</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-700">
                      Hours Today
                    </p>
                    <p className="text-2xl font-bold text-purple-900">7.5h</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-700">
                      Total Students
                    </p>
                    <p className="text-2xl font-bold text-orange-900">142</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Reports Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Date Selection & Calendar */}
              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>Date Selection</span>
                </h3>
                <div className="space-y-4">
                  {/* Simple Date Input */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Select Date</Label>
                    <input
                      type="date"
                      value={
                        selectedDate
                          ? selectedDate.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setSelectedDate(new Date(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Selected Date Display */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Selected Date
                    </p>
                    <p className="text-sm text-blue-700">
                      {selectedDate
                        ? selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "No date selected"}
                    </p>
                  </div>

                  {/* Quick Date Options */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Quick Select</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedDate(new Date())}
                        className="text-xs"
                      >
                        Today
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const yesterday = new Date();
                          yesterday.setDate(yesterday.getDate() - 1);
                          setSelectedDate(yesterday);
                        }}
                        className="text-xs"
                      >
                        Yesterday
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const lastWeek = new Date();
                          lastWeek.setDate(lastWeek.getDate() - 7);
                          setSelectedDate(lastWeek);
                        }}
                        className="text-xs"
                      >
                        Last Week
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const lastMonth = new Date();
                          lastMonth.setMonth(lastMonth.getMonth() - 1);
                          setSelectedDate(lastMonth);
                        }}
                        className="text-xs"
                      >
                        Last Month
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Daily Performance */}
              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-gray-600" />
                  <span>Daily Performance</span>
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Class 10A
                      </span>
                      <Badge variant="default" className="text-xs">
                        Present: 28/30
                      </Badge>
                    </div>
                    <Progress value={93.3} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">
                      Period 1-2 • 93.3% attendance
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Class 10B
                      </span>
                      <Badge variant="default" className="text-xs">
                        Present: 25/28
                      </Badge>
                    </div>
                    <Progress value={89.3} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">
                      Period 3-4 • 89.3% attendance
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Class 11A
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Present: 22/26
                      </Badge>
                    </div>
                    <Progress value={84.6} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">
                      Period 5-6 • 84.6% attendance
                    </p>
                  </div>
                </div>
              </Card>

              {/* Weekly Summary */}
              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Timer className="h-5 w-5 text-gray-600" />
                  <span>Weekly Summary</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Total Classes
                      </p>
                      <p className="text-xs text-blue-700">This week</p>
                    </div>
                    <span className="text-lg font-bold text-blue-900">24</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Avg Attendance
                      </p>
                      <p className="text-xs text-green-700">Weekly average</p>
                    </div>
                    <span className="text-lg font-bold text-green-900">
                      87.2%
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-purple-900">
                        Working Hours
                      </p>
                      <p className="text-xs text-purple-700">This week</p>
                    </div>
                    <span className="text-lg font-bold text-purple-900">
                      38.5h
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-orange-900">
                        Punctuality
                      </p>
                      <p className="text-xs text-orange-700">On-time rate</p>
                    </div>
                    <span className="text-lg font-bold text-orange-900">
                      95%
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Class Performance Trends</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        High Attendance (&gt;90%)
                      </span>
                    </div>
                    <Badge variant="default">3 classes</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Average Attendance (75-90%)
                      </span>
                    </div>
                    <Badge variant="secondary">2 classes</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Low Attendance (&lt;75%)
                      </span>
                    </div>
                    <Badge variant="destructive">1 class</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <span>Action Items</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">
                        Follow up required
                      </span>
                    </div>
                    <p className="text-xs text-amber-700 mt-1">
                      Class 11A has declining attendance trend
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        Parent meeting
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      5 students with poor attendance this week
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Good performance
                      </span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Class 10A maintaining excellent attendance
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Salary View Tab */}
          <TabsContent value="salary" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Salary Overview</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
                  <h3 className="font-semibold text-green-900 mb-4">
                    Current Month Attendance
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">Worked Days:</span>
                      <span className="font-semibold text-green-900">
                        {salaryData.currentMonth.workedDays}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Total Days:</span>
                      <span className="font-semibold text-green-900">
                        {salaryData.currentMonth.totalDays}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Attendance %:</span>
                      <span className="font-semibold text-green-900">
                        {salaryData.currentMonth.percentage}%
                      </span>
                    </div>
                    <Progress
                      value={salaryData.currentMonth.percentage}
                      className="mt-2"
                    />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Salary Calculation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Basic Salary:</span>
                      <span className="font-semibold">
                        ₦{salaryData.currentMonth.basicSalary.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Attendance Bonus:</span>
                      <span className="font-semibold">
                        +₦
                        {salaryData.currentMonth.attendanceBonus.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Deductions:</span>
                      <span className="font-semibold">
                        -₦{salaryData.currentMonth.deductions.toLocaleString()}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Net Salary:</span>
                      <span>
                        ₦{salaryData.currentMonth.netSalary.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              {salaryData.currentMonth.percentage < 80 && (
                <Card className="p-4 bg-yellow-50 border-yellow-200 mt-6">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="text-yellow-800 font-medium">
                      Attendance Warning
                    </span>
                  </div>
                  <p className="text-yellow-700 text-sm mt-1">
                    Your attendance is below 80%. This may affect your
                    attendance bonus and salary.
                  </p>
                </Card>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherAttendancePanel;
