/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  CheckCircle,
  CameraOff,
  Users,
  Clock,
  Eye,
  AlertCircle,
  RefreshCw,
  UserCheck,
  Brain,
  Shield,
} from "lucide-react";

const FaceRecognitionAttendanceMethod = ({
  students = [],
  onMarkAttendance,
  className = "",
  faceSettings = {
    confidenceThreshold: 0.85,
    allowMultipleFaces: true,
    requireLiveness: true,
    autoCapture: true,
  },
}) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [cameraStatus, setCameraStatus] = useState("disconnected"); // connected, disconnected, error
  const [recognitionStatus, setRecognitionStatus] = useState("inactive"); // active, inactive, processing
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [currentRecognition, setCurrentRecognition] = useState(null);
  const [recentRecognitions, setRecentRecognitions] = useState([]);

  // Simulate camera and AI model initialization
  useEffect(() => {
    const initializeSystem = () => {
      setCameraStatus("connecting");
      setTimeout(() => {
        const cameraConnected = Math.random() > 0.1;
        setCameraStatus(cameraConnected ? "connected" : "error");

        if (cameraConnected) {
          // Simulate AI model loading
          setRecognitionStatus("loading");
          setTimeout(() => {
            setRecognitionStatus("inactive");
          }, 3000);
        }
      }, 2500);
    };

    initializeSystem();
  }, []);

  const startRecognition = () => {
    if (cameraStatus !== "connected") return;
    setRecognitionStatus("active");
    setDetectedFaces([]);
    setCurrentRecognition(null);
  };

  const stopRecognition = () => {
    setRecognitionStatus("inactive");
    setDetectedFaces([]);
    setCurrentRecognition(null);
  };

  // Simulate face detection and recognition
  const simulateFaceRecognition = () => {
    if (recognitionStatus !== "active") return;

    setRecognitionStatus("processing");
    setDetectedFaces([
      {
        id: 1,
        confidence: 0.92,
        boundingBox: { x: 50, y: 50, width: 100, height: 120 },
      },
    ]);

    setTimeout(() => {
      // Simulate random student recognition
      const randomStudent =
        students[Math.floor(Math.random() * students.length)];
      if (randomStudent && randomStudent.faceRegistered) {
        handleFaceRecognized(randomStudent, 0.92);
      } else {
        setCurrentRecognition({
          status: "unknown",
          confidence: 0.45,
          message: "Face not recognized or not registered",
        });
        setTimeout(() => {
          setCurrentRecognition(null);
          setRecognitionStatus("active");
        }, 3000);
      }
    }, 2000);
  };

  const handleFaceRecognized = (studentData, confidence) => {
    if (confidence < faceSettings.confidenceThreshold) {
      setCurrentRecognition({
        status: "low_confidence",
        student: studentData,
        confidence,
        message: `Low confidence (${(confidence * 100).toFixed(
          1
        )}%). Recognition threshold is ${
          faceSettings.confidenceThreshold * 100
        }%`,
      });
      setTimeout(() => {
        setCurrentRecognition(null);
        setRecognitionStatus("active");
      }, 3000);
      return;
    }

    // Check if already marked
    if (attendanceData[studentData.id]) {
      setCurrentRecognition({
        status: "already_marked",
        student: studentData,
        confidence,
        message: "Student already marked present",
      });
      setTimeout(() => {
        setCurrentRecognition(null);
        setRecognitionStatus("active");
      }, 2000);
      return;
    }

    setCurrentRecognition({
      status: "recognized",
      student: studentData,
      confidence,
      message: `Recognized with ${(confidence * 100).toFixed(1)}% confidence`,
    });

    // Auto mark attendance if enabled
    if (faceSettings.autoCapture) {
      setTimeout(() => {
        markAttendanceFromFace(studentData.id, "present", confidence);
      }, 1000);
    }
  };

  const markAttendanceFromFace = (studentId, status, confidence) => {
    const timestamp = new Date();
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        status,
        timestamp,
        method: "Face Recognition",
        confidence,
      },
    }));

    const studentData = students.find((s) => s.id === studentId);
    const recognitionRecord = {
      student: studentData,
      timestamp,
      status,
      confidence,
      method: "Face Recognition",
    };

    setRecentRecognitions((prev) => [recognitionRecord, ...prev.slice(0, 4)]);
    setCurrentRecognition({
      status: "marked",
      student: studentData,
      confidence,
      message: "Attendance marked successfully!",
    });

    if (onMarkAttendance) {
      onMarkAttendance(studentId, status, timestamp, "Face Recognition");
    }

    setTimeout(() => {
      setCurrentRecognition(null);
      setRecognitionStatus("active");
    }, 2000);
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const registered = students.filter((s) => s.faceRegistered).length;
    const marked = Object.keys(attendanceData).length;
    const present = Object.values(attendanceData).filter(
      (att) => att.status === "present"
    ).length;
    return { total, registered, marked, present, pending: registered - marked };
  };

  const stats = getAttendanceStats();

  const retryConnection = () => {
    setCameraStatus("connecting");
    setRecognitionStatus("inactive");
    setTimeout(() => {
      const success = Math.random() > 0.2;
      setCameraStatus(success ? "connected" : "error");
      if (success) {
        setRecognitionStatus("loading");
        setTimeout(() => setRecognitionStatus("inactive"), 2000);
      }
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "recognized":
        return "border-green-300 bg-green-50";
      case "marked":
        return "border-green-500 bg-green-100";
      case "unknown":
        return "border-red-300 bg-red-50";
      case "low_confidence":
        return "border-yellow-300 bg-yellow-50";
      case "already_marked":
        return "border-blue-300 bg-blue-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* System Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-full ${
                cameraStatus === "connected" && recognitionStatus === "active"
                  ? "bg-green-100 text-green-600"
                  : cameraStatus === "connecting" ||
                    recognitionStatus === "loading"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <Camera className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Face Recognition Attendance
              </h2>
              <p className="text-gray-600">
                AI-powered facial recognition system
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <Badge
                variant={
                  recognitionStatus === "active"
                    ? "default"
                    : recognitionStatus === "loading"
                    ? "secondary"
                    : "outline"
                }
              >
                {recognitionStatus === "active"
                  ? "AI Active"
                  : recognitionStatus === "loading"
                  ? "Loading..."
                  : recognitionStatus === "processing"
                  ? "Processing..."
                  : "AI Ready"}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {stats.marked}/{stats.registered}
              </div>
              <div className="text-sm text-gray-500">Face Recognized</div>
            </div>
          </div>
        </div>

        {/* System Error */}
        {cameraStatus === "error" && (
          <Card className="p-4 bg-red-50 border-red-200 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">System Error</span>
              </div>
              <Button onClick={retryConnection} size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Connection
              </Button>
            </div>
            <p className="text-red-700 text-sm mt-2">
              Camera or AI system unavailable. Please check device permissions
              and connectivity.
            </p>
          </Card>
        )}

        {/* Recognition Settings */}
        {cameraStatus === "connected" && (
          <Card className="p-4 bg-blue-50 border-blue-200 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                Recognition Settings
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <span className="text-blue-700">Confidence: </span>
                <span className="font-medium">
                  {faceSettings.confidenceThreshold * 100}%
                </span>
              </div>
              <div>
                <span className="text-blue-700">Multiple Faces: </span>
                <span className="font-medium">
                  {faceSettings.allowMultipleFaces ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="text-blue-700">Liveness: </span>
                <span className="font-medium">
                  {faceSettings.requireLiveness ? "Required" : "Optional"}
                </span>
              </div>
              <div>
                <span className="text-blue-700">Auto Mark: </span>
                <span className="font-medium">
                  {faceSettings.autoCapture ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-lg font-bold">{stats.total}</div>
                <div className="text-xs text-gray-600">Total Students</div>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-lg font-bold">{stats.registered}</div>
                <div className="text-xs text-gray-600">Face Registered</div>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-lg font-bold">{stats.present}</div>
                <div className="text-xs text-gray-600">Present</div>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <div>
                <div className="text-lg font-bold">{stats.pending}</div>
                <div className="text-xs text-gray-600">Pending</div>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* Face Recognition Interface */}
      {cameraStatus === "connected" && recognitionStatus !== "loading" && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Face Recognition Scanner</h3>
            <div className="flex space-x-2">
              {recognitionStatus === "inactive" ? (
                <Button
                  onClick={startRecognition}
                  className="flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Start Recognition</span>
                </Button>
              ) : (
                <Button
                  onClick={stopRecognition}
                  variant="destructive"
                  className="flex items-center space-x-2"
                >
                  <CameraOff className="h-4 w-4" />
                  <span>Stop Recognition</span>
                </Button>
              )}
            </div>
          </div>

          {recognitionStatus === "active" ||
          recognitionStatus === "processing" ? (
            <div className="text-center py-8">
              <div className="w-64 h-48 mx-auto mb-4 border-4 border-dashed border-purple-300 rounded-lg flex items-center justify-center bg-purple-50 relative overflow-hidden">
                <Camera className="h-20 w-20 text-purple-400" />

                {/* Face Detection Overlay */}
                {detectedFaces.map((face, index) => (
                  <div
                    key={index}
                    className="absolute border-2 border-green-500 rounded"
                    style={{
                      left: `${face.boundingBox.x}px`,
                      top: `${face.boundingBox.y}px`,
                      width: `${face.boundingBox.width}px`,
                      height: `${face.boundingBox.height}px`,
                    }}
                  >
                    <div className="bg-green-500 text-white text-xs px-1 -mt-5">
                      {(face.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}

                {recognitionStatus === "processing" && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                    <div className="text-white font-semibold">
                      Processing...
                    </div>
                  </div>
                )}
              </div>

              <h4 className="text-lg font-medium mb-2 text-purple-700">
                {recognitionStatus === "processing"
                  ? "Processing Face..."
                  : "Looking for Faces"}
              </h4>
              <p className="text-gray-600 mb-4">Position face in camera view</p>

              {/* Current Recognition Status */}
              {currentRecognition && (
                <Card
                  className={`p-4 max-w-md mx-auto ${getStatusColor(
                    currentRecognition.status
                  )}`}
                >
                  <div className="flex items-center space-x-3">
                    {currentRecognition.status === "recognized" ||
                    currentRecognition.status === "marked" ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : currentRecognition.status === "unknown" ? (
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    ) : (
                      <UserCheck className="h-6 w-6 text-yellow-600" />
                    )}
                    <div className="text-left">
                      {currentRecognition.student && (
                        <div className="font-medium">
                          {currentRecognition.student.name}
                        </div>
                      )}
                      <div className="text-sm">
                        {currentRecognition.message}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Simulate recognition for demo */}
              <Button
                onClick={simulateFaceRecognition}
                variant="outline"
                className="mt-4"
              >
                Simulate Face Detection
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-64 h-48 mx-auto mb-4 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <Eye className="h-20 w-20 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium mb-2">Recognition Inactive</h4>
              <p className="text-gray-600">
                Click &quot;Start Recognition&quot; to begin
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Loading State */}
      {recognitionStatus === "loading" && (
        <Card className="p-6">
          <div className="text-center py-8">
            <Brain className="h-16 w-16 mx-auto mb-4 text-purple-400 animate-pulse" />
            <h3 className="text-lg font-semibold mb-2">Loading AI Model</h3>
            <p className="text-gray-600 mb-4">
              Initializing facial recognition system...
            </p>
            <Progress value={66} className="max-w-sm mx-auto" />
          </div>
        </Card>
      )}

      {/* Recent Recognitions */}
      {recentRecognitions.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Recent Face Recognitions
          </h3>
          <div className="space-y-3">
            {recentRecognitions.map((recognition, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg bg-green-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Camera className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {recognition.student?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Confidence: {(recognition.confidence * 100).toFixed(1)}% •{" "}
                      {recognition.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <Badge variant="default" className="bg-purple-600">
                  Face Recognition
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Progress Summary */}
      {stats.registered > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recognition Progress</h3>
            <span className="text-sm text-gray-600">
              {stats.marked} of {stats.registered} registered students
            </span>
          </div>
          <Progress
            value={(stats.marked / stats.registered) * 100}
            className="h-3"
          />

          {stats.pending === 0 && stats.registered > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-800 font-medium">
                  All registered students recognized!
                </span>
              </div>
            </div>
          )}

          {stats.total - stats.registered > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-800 font-medium">
                  {stats.total - stats.registered} students not registered for
                  face recognition
                </span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                These students need to register their faces before using this
                attendance method.
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default FaceRecognitionAttendanceMethod;
