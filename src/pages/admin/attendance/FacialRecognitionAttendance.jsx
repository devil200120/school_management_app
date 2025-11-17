import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Camera,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  ArrowLeft,
  RefreshCw,
  ScanLine,
  Shield,
  Zap,
  Brain,
  Upload,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

const FacialRecognitionAttendance = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [stream, setStream] = useState(null);
  const [recognitionResults, setRecognitionResults] = useState(null);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [aiModel, setAiModel] = useState("standard");
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.8);

  // Sample staff data with facial recognition enrollment status
  const [staff] = useState([
    {
      id: "TCH001",
      name: "John Doe",
      department: "Mathematics",
      position: "Head Teacher",
      faceEnrolled: true,
      enrollmentDate: "2024-11-01",
      lastRecognition: "08:15:00",
    },
    {
      id: "TCH002",
      name: "Sarah Johnson",
      department: "English",
      position: "Senior Teacher",
      faceEnrolled: true,
      enrollmentDate: "2024-11-02",
      lastRecognition: "08:22:00",
    },
    {
      id: "TCH003",
      name: "Michael Brown",
      department: "Science",
      position: "Teacher",
      faceEnrolled: false,
      enrollmentDate: null,
      lastRecognition: null,
    },
    {
      id: "ADM001",
      name: "Emily Davis",
      department: "Administration",
      position: "Accountant",
      faceEnrolled: true,
      enrollmentDate: "2024-11-03",
      lastRecognition: "07:55:00",
    },
    {
      id: "TCH005",
      name: "Robert Wilson",
      department: "Physical Education",
      position: "PE Teacher",
      faceEnrolled: false,
      enrollmentDate: null,
      lastRecognition: null,
    },
  ]);

  // Recent facial recognition attendance logs
  const [recentLogs, setRecentLogs] = useState([
    {
      id: 1,
      staffId: "TCH001",
      name: "John Doe",
      department: "Mathematics",
      checkInTime: "08:15:00",
      confidence: 0.94,
      status: "success",
      method: "Facial Recognition",
      processingTime: 0.8,
    },
    {
      id: 2,
      staffId: "ADM001",
      name: "Emily Davis",
      department: "Administration",
      checkInTime: "07:55:00",
      confidence: 0.89,
      status: "success",
      method: "Facial Recognition",
      processingTime: 1.2,
    },
    {
      id: 3,
      staffId: "TCH002",
      name: "Sarah Johnson",
      department: "English",
      checkInTime: "08:22:00",
      confidence: 0.76,
      status: "low_confidence",
      method: "Facial Recognition",
      processingTime: 1.5,
    },
  ]);

  // System statistics
  const [systemStats, setSystemStats] = useState({
    enrolledStaff: 3,
    totalStaff: 5,
    recognitionAccuracy: 94.2,
    avgProcessingTime: 1.1,
    securityLevel: "High",
    modelVersion: "v2.1.0",
  });

  // Initialize camera for facial recognition
  const startFacialRecognition = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      setStream(mediaStream);
      setIsScanning(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      toast.info("Facial Recognition Active", {
        description: "Please look directly at the camera...",
        icon: <Camera className="h-4 w-4" />,
      });

      // Simulate facial recognition processing
      setTimeout(() => {
        const mockResults = {
          staffId: "TCH001",
          confidence: 0.94,
          processingTime: 0.8,
          boundingBox: { x: 340, y: 160, width: 200, height: 240 },
        };
        handleFaceRecognized(mockResults);
      }, 3000);
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Camera Access Error", {
        description:
          "Unable to access camera. Please ensure camera permissions are granted.",
        icon: <Camera className="h-4 w-4" />,
      });
    }
  };

  const stopFacialRecognition = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsScanning(false);
    setRecognitionResults(null);
  };

  const handleFaceRecognized = (results) => {
    setRecognitionResults(results);

    if (results.confidence < confidenceThreshold) {
      toast.warning("Low Confidence", {
        description: `Recognition confidence: ${Math.round(
          results.confidence * 100
        )}%. Please try again.`,
        icon: <AlertTriangle className="h-4 w-4" />,
      });
      return;
    }

    const staffMember = staff.find((s) => s.id === results.staffId);
    if (staffMember && staffMember.faceEnrolled) {
      recordAttendance(staffMember, results);
    } else {
      toast.error("Recognition Failed", {
        description: "Face not recognized or staff member not enrolled.",
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    }

    setIsScanning(false);
  };

  const recordAttendance = (staffMember, recognitionData) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    const newLog = {
      id: recentLogs.length + 1,
      staffId: staffMember.id,
      name: staffMember.name,
      department: staffMember.department,
      checkInTime: timeString,
      confidence: recognitionData.confidence,
      status: now.getHours() >= 8 && now.getMinutes() > 15 ? "late" : "success",
      method: "Facial Recognition",
      processingTime: recognitionData.processingTime,
    };

    setRecentLogs((prev) => [newLog, ...prev.slice(0, 4)]);

    toast.success("Attendance Recorded", {
      description: `${staffMember.name} recognized with ${Math.round(
        recognitionData.confidence * 100
      )}% confidence`,
      icon: <CheckCircle className="h-4 w-4" />,
    });

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const startEnrollment = () => {
    if (!selectedStaff) {
      toast.error("Please select a staff member to enroll");
      return;
    }

    setEnrollmentProgress(0);
    const enrollmentInterval = setInterval(() => {
      setEnrollmentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(enrollmentInterval);
          completeEnrollment();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const completeEnrollment = () => {
    const staffMember = staff.find((s) => s.id === selectedStaff);
    if (staffMember) {
      staffMember.faceEnrolled = true;
      staffMember.enrollmentDate = new Date().toISOString().split("T")[0];

      setSystemStats((prev) => ({
        ...prev,
        enrolledStaff: prev.enrolledStaff + 1,
      }));

      toast.success("Enrollment Complete", {
        description: `${staffMember.name} has been enrolled in facial recognition system`,
        icon: <Brain className="h-4 w-4" />,
      });

      setSelectedStaff("");
      setEnrollmentProgress(0);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      toast.info("Processing Image", {
        description: "Analyzing uploaded image for facial recognition...",
        icon: <Upload className="h-4 w-4" />,
      });

      // Simulate image processing
      setTimeout(() => {
        const mockResults = {
          staffId: "TCH002",
          confidence: 0.87,
          processingTime: 1.4,
          source: "upload",
        };
        handleFaceRecognized(mockResults);
      }, 2000);
    }
  };

  const getStatusBadge = (status, confidence = null) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Success {confidence && `(${Math.round(confidence * 100)}%)`}
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Late {confidence && `(${Math.round(confidence * 100)}%)`}
          </Badge>
        );
      case "low_confidence":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
            Low Confidence {confidence && `(${Math.round(confidence * 100)}%)`}
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Error
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

  const getEnrollmentBadge = (enrolled) => {
    return enrolled ? (
      <Badge className="bg-green-100 text-green-800">
        <Eye className="h-3 w-3 mr-1" />
        Enrolled
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">
        <EyeOff className="h-3 w-3 mr-1" />
        Not Enrolled
      </Badge>
    );
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

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
              <Brain className="h-8 w-8" />
              Facial Recognition Attendance
            </h2>
            <p className="text-muted-foreground mt-1">
              AI-powered biometric attendance tracking system
            </p>
          </div>
        </div>
        <Button
          onClick={() => setShowEnrollment(true)}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Brain className="mr-2 h-4 w-4" />
          Enroll Staff
        </Button>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Enrolled Staff</p>
                <p className="text-2xl font-bold text-orange-600">
                  {systemStats.enrolledStaff}/{systemStats.totalStaff}
                </p>
              </div>
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold text-green-600">
                  {systemStats.recognitionAccuracy}%
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Speed</p>
                <p className="text-2xl font-bold text-blue-600">
                  {systemStats.avgProcessingTime}s
                </p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Level</p>
                <p className="text-lg font-bold text-purple-600">
                  {systemStats.securityLevel}
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recognition Interface */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Facial Recognition Scanner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="camera" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="camera">Live Camera</TabsTrigger>
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                  <TabsTrigger value="settings">AI Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="camera" className="space-y-4">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                    {isScanning ? (
                      <div className="relative w-full h-full">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          autoPlay
                          playsInline
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-64 h-72 border-2 border-orange-500 rounded-lg relative">
                            <ScanLine className="absolute top-0 left-1/2 transform -translate-x-1/2 text-orange-500 animate-bounce" />
                            <div className="absolute top-2 left-2 w-8 h-8 border-l-3 border-t-3 border-orange-500 rounded-tl-lg"></div>
                            <div className="absolute top-2 right-2 w-8 h-8 border-r-3 border-t-3 border-orange-500 rounded-tr-lg"></div>
                            <div className="absolute bottom-2 left-2 w-8 h-8 border-l-3 border-b-3 border-orange-500 rounded-bl-lg"></div>
                            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-3 border-b-3 border-orange-500 rounded-br-lg"></div>
                          </div>
                        </div>
                        {recognitionResults && (
                          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                            <p className="text-sm">Processing...</p>
                            <p className="text-xs">
                              Confidence:{" "}
                              {Math.round(recognitionResults.confidence * 100)}%
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <Brain className="h-16 w-16 mx-auto mb-4" />
                          <p className="text-lg mb-2">
                            Facial Recognition Ready
                          </p>
                          <p className="text-sm">
                            Click &quot;Start Recognition&quot; to begin
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {!isScanning ? (
                      <Button
                        onClick={startFacialRecognition}
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Start Recognition
                      </Button>
                    ) : (
                      <Button
                        onClick={stopFacialRecognition}
                        variant="destructive"
                        className="flex-1"
                      >
                        Stop Recognition
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        stopFacialRecognition();
                        setTimeout(() => startFacialRecognition(), 500);
                      }}
                      disabled={!isScanning}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg mb-2">Upload Image for Recognition</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supported formats: JPG, PNG, WEBP (max 5MB)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                    >
                      Select Image
                    </Button>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Note:</strong> Image recognition is useful for
                      testing or when live camera is not available. Best results
                      with clear, well-lit face photos.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        AI Model
                      </label>
                      <Select value={aiModel} onValueChange={setAiModel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            Standard (Fast)
                          </SelectItem>
                          <SelectItem value="enhanced">
                            Enhanced (Accurate)
                          </SelectItem>
                          <SelectItem value="secure">
                            Secure (High Security)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Confidence Threshold:{" "}
                        {Math.round(confidenceThreshold * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="0.99"
                        step="0.01"
                        value={confidenceThreshold}
                        onChange={(e) =>
                          setConfidenceThreshold(parseFloat(e.target.value))
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>50% (Less Secure)</span>
                        <span>99% (More Secure)</span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-yellow-700">
                        <strong>Recommendation:</strong> Use 80-90% confidence
                        for balance between security and usability.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Staff Enrollment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Staff Enrollment Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {staff.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {member.faceEnrolled ? (
                          <Eye className="h-5 w-5 text-green-600" />
                        ) : (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">
                          {member.id} • {member.department}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getEnrollmentBadge(member.faceEnrolled)}
                      {member.faceEnrolled && (
                        <p className="text-xs text-gray-500 mt-1">
                          Enrolled: {member.enrollmentDate}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Recognitions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div key={log.id} className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Brain className="h-5 w-5 text-orange-600" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{log.name}</p>
                        <p className="text-xs text-gray-500">
                          {log.department}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{log.checkInTime}</p>
                        <p className="text-xs text-gray-500">
                          {log.processingTime}s
                        </p>
                      </div>
                    </div>
                    <div className="ml-8">
                      {getStatusBadge(log.status, log.confidence)}
                    </div>
                  </div>
                ))}

                {recentLogs.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No recognitions yet today</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Recognition Accuracy
                  </span>
                  <span className="font-semibold text-green-600">
                    {systemStats.recognitionAccuracy}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Avg Processing Time
                  </span>
                  <span className="font-semibold text-blue-600">
                    {systemStats.avgProcessingTime}s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">False Positives</span>
                  <span className="font-semibold text-orange-600">0.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Model Version</span>
                  <span className="font-semibold text-purple-600">
                    {systemStats.modelVersion}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Today&apos;s Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Successful Recognitions</span>
                  <span className="font-semibold text-green-600">
                    {
                      recentLogs.filter((log) => log.status === "success")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Low Confidence</span>
                  <span className="font-semibold text-orange-600">
                    {
                      recentLogs.filter(
                        (log) => log.status === "low_confidence"
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Failed Attempts</span>
                  <span className="font-semibold text-red-600">
                    {recentLogs.filter((log) => log.status === "error").length}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="font-bold text-eduos-primary">
                      {recentLogs.length > 0
                        ? Math.round(
                            (recentLogs.filter(
                              (log) => log.status === "success"
                            ).length /
                              recentLogs.length) *
                              100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Staff Enrollment Modal */}
      <Dialog open={showEnrollment} onOpenChange={setShowEnrollment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Enroll Staff in Facial Recognition
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Staff Member
              </label>
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose staff member" />
                </SelectTrigger>
                <SelectContent>
                  {staff
                    .filter((s) => !s.faceEnrolled)
                    .map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} ({member.id})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {enrollmentProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Enrollment Progress</span>
                  <span>{enrollmentProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${enrollmentProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-sm text-orange-700">
                <strong>Instructions:</strong> Staff member should look directly
                at the camera from different angles during enrollment process.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={startEnrollment}
                disabled={!selectedStaff || enrollmentProgress > 0}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                {enrollmentProgress > 0 ? "Enrolling..." : "Start Enrollment"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowEnrollment(false);
                  setEnrollmentProgress(0);
                  setSelectedStaff("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacialRecognitionAttendance;
