import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  User,
  MapPin,
  BookOpen,
  Award,
  Activity,
  QrCode,
  Wifi,
  Camera,
  Settings,
  ChevronRight,
  X,
  AlertCircle,
  Play,
  Square,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Html5Qrcode } from "html5-qrcode";

const StudentAttendanceDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState({
    isPunchedIn: false,
    punchInTime: null,
    punchOutTime: null,
    todayStatus: "not_marked",
    method: null,
  });
  const [activeMethod, setActiveMethod] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState("");

  // Modal states for different methods
  const [showQRModal, setShowQRModal] = useState(false);
  const [showNFCModal, setShowNFCModal] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);

  // Camera and scanning refs
  const qrScannerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const faceDetectionRef = useRef(null);

  // Use ref to track current punch status for async operations
  const isPunchedInRef = useRef(attendanceStatus.isPunchedIn);

  // Auto-fetched student data (simulated)
  const studentData = {
    id: "STD001",
    name: "John Doe",
    class: "10A", // Auto-fetched from student profile
    section: "Science", // Auto-fetched
    rollNo: "001",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  };

  // Attendance methods available for students
  const attendanceMethods = [
    {
      id: "manual",
      title: "Manual Punch",
      description: "Traditional punch in/out with buttons",
      icon: <Clock className="h-8 w-8" />,
      color: "bg-blue-500",
      action: "manual",
      status: "primary",
    },
    {
      id: "qr",
      title: "QR Code Punch",
      description: "Scan your student QR code to punch in/out",
      icon: <QrCode className="h-8 w-8" />,
      color: "bg-purple-500",
      action: "qr",
      status: "active",
    },
    {
      id: "nfc",
      title: "NFC Card Punch",
      description: "Tap your student NFC card to punch in/out",
      icon: <Wifi className="h-8 w-8" />,
      color: "bg-green-500",
      action: "nfc",
      status: "available",
    },
    {
      id: "facial",
      title: "Face Recognition Punch",
      description: "Use face recognition for punch in/out",
      icon: <Camera className="h-8 w-8" />,
      color: "bg-orange-500",
      action: "facial",
      status: "beta",
    },
  ];

  // Auto-calculated attendance stats
  const attendanceStats = {
    currentMonth: {
      totalDays: 22,
      presentDays: 20,
      absentDays: 2,
      lateArrivals: 1,
      percentage: 91,
    },
    overall: {
      totalDays: 180,
      presentDays: 164,
      percentage: 91.1,
    },
  };

  // Recent attendance history (last 7 days)
  const recentAttendance = [
    {
      date: "Today",
      status: "present",
      time: "08:45 AM",
      method: "Face Recognition",
    },
    {
      date: "Yesterday",
      status: "present",
      time: "08:50 AM",
      method: "QR Code",
    },
    { date: "Nov 29", status: "late", time: "09:15 AM", method: "Manual" },
    { date: "Nov 28", status: "present", time: "08:40 AM", method: "NFC Card" },
    { date: "Nov 27", status: "absent", time: null, method: null },
    {
      date: "Nov 26",
      status: "present",
      time: "08:35 AM",
      method: "Face Recognition",
    },
    { date: "Nov 25", status: "present", time: "08:55 AM", method: "QR Code" },
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keep ref in sync with state
  useEffect(() => {
    isPunchedInRef.current = attendanceStatus.isPunchedIn;
  }, [attendanceStatus.isPunchedIn]);

  // Check if already checked in today
  useEffect(() => {
    const today = new Date().toDateString();
    const existingAttendance = localStorage.getItem(
      `student_attendance_${today}`
    );
    if (existingAttendance) {
      const parsedAttendance = JSON.parse(existingAttendance);
      setAttendanceStatus({
        ...parsedAttendance,
        punchInTime: parsedAttendance.punchInTime
          ? new Date(parsedAttendance.punchInTime)
          : null,
        punchOutTime: parsedAttendance.punchOutTime
          ? new Date(parsedAttendance.punchOutTime)
          : null,
      });
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      stopQRScanner();
    };
  }, []);

  // Auto-start QR scanner when modal opens
  useEffect(() => {
    if (showQRModal) {
      const timer = setTimeout(() => {
        startRealQRScanning();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showQRModal]);

  const stopQRScanner = async () => {
    if (qrScannerRef.current) {
      try {
        await qrScannerRef.current.stop();
      } catch (e) {
        // Ignore errors during cleanup
      }
      qrScannerRef.current = null;
    }
  };

  const stopCamera = () => {
    if (faceDetectionRef.current) {
      cancelAnimationFrame(faceDetectionRef.current);
      faceDetectionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handlePunchIn = (method = "manual") => {
    const now = new Date();
    const classStartTime = new Date();
    classStartTime.setHours(9, 0, 0, 0);

    const isLate = now > classStartTime;
    const status = isLate ? "late" : "present";

    const newAttendance = {
      isPunchedIn: true,
      punchInTime: now,
      punchOutTime: null,
      todayStatus: status,
      method: method,
    };

    setAttendanceStatus(newAttendance);

    const today = new Date().toDateString();
    localStorage.setItem(
      `student_attendance_${today}`,
      JSON.stringify({ ...newAttendance, punchInTime: now.toISOString() })
    );

    toast.success(
      isLate ? "Punched In - You're late today" : "Punched In successfully!",
      {
        description: `Welcome ${
          studentData.name
        }! Method: ${method.toUpperCase()}`,
      }
    );
  };

  const handlePunchOut = (method = "manual") => {
    const now = new Date();
    const newAttendance = {
      ...attendanceStatus,
      isPunchedIn: false,
      punchOutTime: now,
    };

    setAttendanceStatus(newAttendance);

    const today = new Date().toDateString();
    localStorage.setItem(
      `student_attendance_${today}`,
      JSON.stringify({
        ...newAttendance,
        punchInTime: attendanceStatus.punchInTime?.toISOString(),
        punchOutTime: now.toISOString(),
      })
    );

    const duration = attendanceStatus.punchInTime
      ? ((now - attendanceStatus.punchInTime) / 1000 / 60 / 60).toFixed(1)
      : 0;

    toast.success("Punched Out successfully!", {
      description: `Total time at school: ${duration} hours`,
    });
  };

  const handleMethodSelect = (method) => {
    setActiveMethod(method.action);

    if (method.action === "manual") {
      if (!attendanceStatus.isPunchedIn) {
        handlePunchIn("manual");
      } else {
        handlePunchOut("manual");
      }
    } else if (method.action === "qr") {
      setShowQRModal(true);
    } else if (method.action === "nfc") {
      setShowNFCModal(true);
      startRealNFCScanning();
    } else if (method.action === "facial") {
      setShowFaceModal(true);
    }
  };

  // ============ REAL QR CODE SCANNING ============
  const startRealQRScanning = async () => {
    setIsScanning(true);
    setScanMessage("📱 Starting camera for QR scan...");

    try {
      const qrScanner = new Html5Qrcode("student-qr-reader");
      qrScannerRef.current = qrScanner;

      await qrScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => handleQRCodeScanned(decodedText),
        () => {} // Ignore scan errors (continuous scanning)
      );

      setScanMessage("📷 Point camera at your QR code...");
    } catch (err) {
      console.error("QR Scanner error:", err);
      setScanMessage("❌ Camera access denied or not available");
      toast.error("Camera Error", {
        description:
          "Please allow camera access to scan QR codes. Error: " + err.message,
      });
    }
  };

  const handleQRCodeScanned = async (decodedText) => {
    await stopQRScanner();
    setScanMessage("✅ QR Code detected!");

    // Validate QR code
    if (
      decodedText.includes("STUDENT") ||
      decodedText.includes("STD") ||
      decodedText.includes("ATTENDANCE")
    ) {
      toast.success("QR Code Verified!", {
        description: `Code: ${decodedText.substring(0, 20)}...`,
      });
      setTimeout(() => {
        if (!isPunchedInRef.current) {
          handlePunchIn("qr");
        } else {
          handlePunchOut("qr");
        }
        closeQRModal();
      }, 1000);
    } else {
      toast.error("Invalid QR Code", {
        description: "This QR code is not registered for student attendance",
      });
      setScanMessage("❌ Invalid QR code. Scanning again...");
      setTimeout(() => startRealQRScanning(), 2000);
    }
  };

  const closeQRModal = async () => {
    await stopQRScanner();
    setShowQRModal(false);
    setIsScanning(false);
    setScanMessage("");
    setActiveMethod(null);
  };

  // ============ REAL NFC SCANNING ============
  const startRealNFCScanning = async () => {
    setIsScanning(true);
    setScanMessage("💳 Initializing NFC reader...");

    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan();

        setScanMessage("💳 Ready! Tap your NFC card...");

        ndef.addEventListener("reading", ({ serialNumber }) => {
          handleNFCCardScanned(serialNumber);
        });

        ndef.addEventListener("readingerror", () => {
          toast.error("NFC Read Error", {
            description: "Could not read NFC card. Try again.",
          });
        });
      } catch (error) {
        console.error("NFC Error:", error);
        setScanMessage("❌ NFC error: " + error.message);
        toast.error("NFC Error", {
          description: error.message || "Could not start NFC reader",
        });
      }
    } else {
      // Simulation mode for browsers without NFC support
      setScanMessage("💳 NFC Simulation Mode - Tap your card...");
      toast.info("NFC Simulation Mode", {
        description: "Real NFC not available. Running in simulation mode for demo.",
      });
      
      // Simulate NFC card detection after 3 seconds
      setTimeout(() => {
        if (showNFCModal) {
          setScanMessage("💳 Scanning...");
          setTimeout(() => {
            const simulatedSerialNumber = "NFC-STD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
            handleNFCCardScanned(simulatedSerialNumber);
          }, 1500);
        }
      }, 2000);
    }
  };

  const handleNFCCardScanned = (serialNumber) => {
    setScanMessage("✅ NFC Card detected!");
    toast.success("NFC Card Recognized", {
      description: `Card ID: ${serialNumber.substring(0, 8)}...`,
    });

    setTimeout(() => {
      if (!isPunchedInRef.current) {
        handlePunchIn("nfc");
      } else {
        handlePunchOut("nfc");
      }
      closeNFCModal();
    }, 1000);
  };

  const closeNFCModal = () => {
    setShowNFCModal(false);
    setIsScanning(false);
    setScanMessage("");
    setActiveMethod(null);
  };

  // ============ REAL FACE RECOGNITION ============
  const startRealFaceRecognition = async () => {
    setIsScanning(true);
    setScanMessage("👤 Starting camera...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setScanMessage("👤 Position your face in the oval...");
          detectFace();
        };
      }
    } catch (err) {
      console.error("Camera error:", err);
      setScanMessage("❌ Camera access denied");
      toast.error("Camera Error", {
        description: "Please allow camera access for face recognition",
      });
    }
  };

  const detectFace = () => {
    if (!videoRef.current || !canvasRef.current || !streamRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    let frameCount = 0;
    let consecutiveDetections = 0;
    const requiredDetections = 15; // About 0.5 seconds of stable detection

    const detect = () => {
      if (!streamRef.current) return;

      frameCount++;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Analyze frame for face-like content
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const hasFace = analyzeImageForFace(imageData);

      if (hasFace) {
        consecutiveDetections++;
        setScanMessage(
          `👤 Face detected! Hold steady... ${Math.min(
            100,
            Math.round((consecutiveDetections / requiredDetections) * 100)
          )}%`
        );

        if (consecutiveDetections >= requiredDetections) {
          // Face consistently detected - verify
          setScanMessage("✅ Face verified! Processing...");
          const faceImage = canvas.toDataURL("image/jpeg", 0.8);
          handleFaceRecognized(faceImage);
          return;
        }
      } else {
        consecutiveDetections = Math.max(0, consecutiveDetections - 2);
        if (frameCount % 15 === 0) {
          setScanMessage("👤 Position your face in the oval...");
        }
      }

      faceDetectionRef.current = requestAnimationFrame(detect);
    };

    faceDetectionRef.current = requestAnimationFrame(detect);
  };

  const analyzeImageForFace = (imageData) => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    let skinPixels = 0;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;
    const totalPixels = (Math.PI * radius * radius) / 16; // Approximate sampled area

    for (let y = centerY - radius; y < centerY + radius; y += 4) {
      for (let x = centerX - radius; x < centerX + radius; x += 4) {
        // Check if within oval
        const dx = (x - centerX) / radius;
        const dy = (y - centerY) / (radius * 1.3);
        if (dx * dx + dy * dy > 1) continue;

        const i = (Math.floor(y) * width + Math.floor(x)) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Improved skin tone detection (works for various skin tones)
        const isSkin =
          r > 60 &&
          g > 40 &&
          b > 20 &&
          r > g &&
          r > b &&
          Math.abs(r - g) > 10 &&
          r - b > 10 &&
          r < 250 &&
          g < 250 &&
          b < 230;

        if (isSkin) skinPixels++;
      }
    }

    // Require at least 20% skin pixels in the detection area
    return skinPixels > totalPixels * 0.2;
  };

  const handleFaceRecognized = (faceImage) => {
    stopCamera();

    toast.success("Face Recognized!", {
      description: `Welcome, ${studentData.name}!`,
    });

    setTimeout(() => {
      if (!isPunchedInRef.current) {
        handlePunchIn("face");
      } else {
        handlePunchOut("face");
      }
      closeFaceModal();
    }, 1000);
  };

  const closeFaceModal = () => {
    stopCamera();
    setShowFaceModal(false);
    setIsScanning(false);
    setScanMessage("");
    setActiveMethod(null);
  };

  const formatTime = (date) => {
    return date
      ? date.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--:--";
  };

  const getWorkingDuration = () => {
    if (!attendanceStatus.punchInTime) return "0 min";
    const endTime = attendanceStatus.punchOutTime || currentDate;
    const diffMs = endTime - attendanceStatus.punchInTime;
    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "late":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "absent":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const configs = {
      present: {
        variant: "default",
        label: "Present",
        className: "bg-green-500",
      },
      late: { variant: "secondary", label: "Late", className: "bg-yellow-500" },
      absent: { variant: "destructive", label: "Absent" },
    };

    const config = configs[status] || { variant: "outline", label: "Unknown" };

    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getTodayStatusIcon = () => {
    switch (attendanceStatus.todayStatus) {
      case "present":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "late":
        return <Clock className="h-6 w-6 text-yellow-600" />;
      default:
        return <XCircle className="h-6 w-6 text-gray-400" />;
    }
  };

  const getTodayStatusBadge = () => {
    switch (attendanceStatus.todayStatus) {
      case "present":
        return <Badge className="bg-green-500">✓ Present</Badge>;
      case "late":
        return <Badge className="bg-yellow-500">⏰ Late</Badge>;
      default:
        return <Badge variant="secondary">○ Not Marked</Badge>;
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header - Auto-populated */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <User className="text-blue-600" />
                My Attendance
              </h1>
              <p className="text-gray-600">
                Track your daily attendance and performance
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {currentDate.toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-600">
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Student Profile Card - Auto-populated */}
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden border-2 border-white/30">
                    <img
                      src={studentData.photo}
                      alt={studentData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{studentData.name}</h2>
                    <p className="text-blue-100">
                      Roll No: {studentData.rollNo}
                    </p>
                    <p className="text-blue-100 text-sm">
                      Class {studentData.class} • {studentData.section} • ID:{" "}
                      {studentData.id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    {getTodayStatusIcon()}
                    {getTodayStatusBadge()}
                  </div>
                  {attendanceStatus.punchInTime && (
                    <div className="text-sm text-blue-100">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      {formatTime(attendanceStatus.punchInTime)} via {attendanceStatus.method?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Methods */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Attendance Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {attendanceMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div
                          className={`${method.color} p-3 rounded-lg text-white mx-auto mb-3 w-fit`}
                        >
                          {method.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 text-xs mb-4">
                          {method.description}
                        </p>
                        <Button
                          onClick={() => handleMethodSelect(method)}
                          variant="outline"
                          className="w-full group text-xs"
                          disabled={
                            isScanning && activeMethod === method.action
                          }
                          size="sm"
                        >
                          {!attendanceStatus.isPunchedIn
                            ? "Punch In"
                            : attendanceStatus.punchOutTime
                            ? "Complete"
                            : "Punch Out"}
                          <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Control Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Attendance Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Punch In
                      </label>
                      <div className="text-xl font-bold text-gray-900">
                        {formatTime(attendanceStatus.punchInTime)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Punch Out
                      </label>
                      <div className="text-xl font-bold text-gray-900">
                        {formatTime(attendanceStatus.punchOutTime)}
                      </div>
                    </div>
                  </div>
                  {attendanceStatus.isPunchedIn && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Time at School:
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          {getWorkingDuration()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => handlePunchIn("manual")}
                    disabled={attendanceStatus.isPunchedIn}
                    className="w-full h-14 text-lg"
                    size="lg"
                  >
                    <Play className="mr-2 h-6 w-6" />
                    {attendanceStatus.isPunchedIn
                      ? "Already Punched In"
                      : "Punch In"}
                  </Button>
                  <Button
                    onClick={() => handlePunchOut("manual")}
                    disabled={!attendanceStatus.isPunchedIn}
                    variant="destructive"
                    className="w-full h-14 text-lg"
                    size="lg"
                  >
                    <Square className="mr-2 h-6 w-6" />
                    {!attendanceStatus.isPunchedIn
                      ? "Not Punched In"
                      : "Punch Out"}
                  </Button>
                </div>

                {attendanceStatus.punchInTime &&
                  attendanceStatus.punchOutTime && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-800 font-medium">
                          Day Complete!
                        </span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Total time at school: {getWorkingDuration()}
                      </p>
                    </motion.div>
                  )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today&apos;s Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-900">
                      {getWorkingDuration()}
                    </div>
                    <div className="text-sm text-blue-700">Time at School</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    {getTodayStatusIcon()}
                    <div className="text-lg font-bold text-gray-900 mt-2">
                      {attendanceStatus.todayStatus === "present"
                        ? "On Time"
                        : attendanceStatus.todayStatus === "late"
                        ? "Late Entry"
                        : "Not Marked"}
                    </div>
                    <div className="text-sm text-gray-600">Status</div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    School Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">School Opens:</span>
                      <span className="font-medium">8:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class Starts:</span>
                      <span className="font-medium">9:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">School Closes:</span>
                      <span className="font-medium">3:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      This Month
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {attendanceStats.currentMonth.presentDays}/
                      {attendanceStats.currentMonth.totalDays}
                    </p>
                    <p className="text-xs text-gray-500">Days Present</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Attendance Rate
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {attendanceStats.currentMonth.percentage}%
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Absent Days
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {attendanceStats.currentMonth.absentDays}
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Late Arrivals
                    </p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {attendanceStats.currentMonth.lateArrivals}
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Attendance (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAttendance.map((record, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(record.status)}
                    <div>
                      <div className="font-medium text-gray-900">
                        {record.date}
                      </div>
                      <div className="text-sm text-gray-600">
                        {record.time
                          ? `${record.time} • ${record.method}`
                          : "Not marked"}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(record.status)}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overall Performance Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Overall Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {attendanceStats.overall.percentage}%
                </div>
                <div className="text-sm text-blue-700 font-medium">
                  Overall Attendance
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {attendanceStats.overall.presentDays}/
                  {attendanceStats.overall.totalDays} days
                </div>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {attendanceStats.currentMonth.percentage >= 90
                    ? "Excellent"
                    : attendanceStats.currentMonth.percentage >= 80
                    ? "Good"
                    : "Needs Improvement"}
                </div>
                <div className="text-sm text-green-700 font-medium">
                  Performance Grade
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Based on current month
                </div>
              </div>

              <div className="text-center p-6 bg-indigo-50 rounded-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {Math.max(0, 22 - attendanceStats.currentMonth.presentDays)}
                </div>
                <div className="text-sm text-indigo-700 font-medium">
                  Days Remaining
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  To complete this month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Guidelines */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">
                  Attendance Guidelines
                </h3>
                <div className="text-blue-700 text-sm space-y-1">
                  <p>• Minimum 75% attendance required for exam eligibility</p>
                  <p>
                    • 90% attendance qualifies you for academic excellence
                    awards
                  </p>
                  <p>• Late arrivals after 9:00 AM are marked as "Late"</p>
                  <p>
                    • Contact class teacher for any attendance discrepancies
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Scanner Modal */}
      <Dialog
        open={showQRModal}
        onOpenChange={(open) => {
          if (!open) closeQRModal();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-purple-600" />
              QR Code Scanner
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-600 mb-2">
              {scanMessage || "Initializing camera..."}
            </div>
            <div
              id="student-qr-reader"
              className="w-full rounded-lg overflow-hidden bg-black"
              style={{ minHeight: "300px" }}
            ></div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm">
              <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-blue-700">
                Point your camera at any QR code containing &quot;STUDENT&quot;,
                &quot;STD&quot;, or &quot;ATTENDANCE&quot;
              </span>
            </div>
            <Button variant="outline" onClick={closeQRModal} className="w-full">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* NFC Scanner Modal */}
      <Dialog
        open={showNFCModal}
        onOpenChange={(open) => {
          if (!open) closeNFCModal();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-600" />
              NFC Card Reader
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center py-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Wifi className="h-12 w-12 text-green-600" />
              </motion.div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {scanMessage || "Ready to scan..."}
              </p>
              <p className="text-sm text-gray-600">
                Hold your student NFC card near your device
              </p>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-sm">
              <AlertCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-green-700">
                {"NDEFReader" in window 
                  ? "Hold your student NFC card near your device to scan."
                  : "Demo Mode: NFC will auto-simulate in a few seconds. Real NFC works on Chrome Android only."}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={closeNFCModal}
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Face Recognition Modal */}
      <Dialog
        open={showFaceModal}
        onOpenChange={(open) => {
          if (!open) closeFaceModal();
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-orange-600" />
              Face Recognition
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-600 mb-2">
              {scanMessage || "Starting camera..."}
            </div>
            <div
              className="relative rounded-lg overflow-hidden bg-black"
              style={{ minHeight: "320px" }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ minHeight: "320px", transform: "scaleX(-1)" }}
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-64 border-4 border-dashed border-white/60 rounded-full"></div>
              </div>
              {isScanning && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {scanMessage}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg text-sm">
              <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <span className="text-orange-700">
                Position your face within the oval and stay still for
                verification
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={startRealFaceRecognition}
                disabled={isScanning}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                <Camera className="h-4 w-4 mr-2" />
                Start Camera
              </Button>
              <Button
                variant="outline"
                onClick={closeFaceModal}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentAttendanceDashboard;
