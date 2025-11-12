/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  QrCode,
  CheckCircle,
  Camera,
  CameraOff,
  Users,
  Clock,
  Scan,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const QRCodeAttendanceMethod = ({
  students = [],
  onMarkAttendance,
  className = "",
  qrSettings = {
    allowBulkScan: true,
    scanDelay: 1000, // milliseconds between scans
    autoMarkPresent: true,
  },
}) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [cameraStatus, setCameraStatus] = useState("disconnected"); // connected, disconnected, error
  const [isScanning, setIsScanning] = useState(false);
  const [scannedQRCode, setScannedQRCode] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [scanHistory, setScanHistory] = useState([]);

  // Simulate camera connection
  useEffect(() => {
    const connectCamera = () => {
      setCameraStatus("connecting");
      setTimeout(() => {
        setCameraStatus(Math.random() > 0.1 ? "connected" : "error");
      }, 2000);
    };

    connectCamera();
  }, []);

  const startScanning = () => {
    if (cameraStatus !== "connected") return;
    setIsScanning(true);
    setScannedQRCode(null);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  // Simulate QR code scanning
  const simulateQRScanning = () => {
    if (!isScanning) return;

    // Simulate random QR code detection
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    if (randomStudent) {
      handleQRCodeDetected(randomStudent.qrCode, randomStudent);
    }
  };

  const handleQRCodeDetected = (qrCode, studentData) => {
    setScannedQRCode({ qrCode, studentData, timestamp: new Date() });

    if (qrSettings.autoMarkPresent) {
      markAttendanceFromQR(studentData.id, "present");
    }

    // Add scan delay if bulk scanning is enabled
    if (qrSettings.allowBulkScan && qrSettings.scanDelay) {
      setTimeout(() => {
        setScannedQRCode(null);
      }, qrSettings.scanDelay);
    }
  };

  const markAttendanceFromQR = (studentId, status) => {
    // Check if already marked to prevent duplicates
    if (attendanceData[studentId]) {
      return;
    }

    const timestamp = new Date();
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: { status, timestamp, method: "QR" },
    }));

    const studentData = students.find((s) => s.id === studentId);
    const scanRecord = {
      student: studentData,
      timestamp,
      status,
      qrCode: studentData?.qrCode,
    };

    setRecentScans((prev) => [scanRecord, ...prev.slice(0, 4)]);
    setScanHistory((prev) => [scanRecord, ...prev]);

    if (onMarkAttendance) {
      onMarkAttendance(studentId, status, timestamp, "QR");
    }
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const marked = Object.keys(attendanceData).length;
    const present = Object.values(attendanceData).filter(
      (att) => att.status === "present"
    ).length;
    return { total, marked, present, pending: total - marked };
  };

  const stats = getAttendanceStats();

  const retryConnection = () => {
    setCameraStatus("connecting");
    setTimeout(() => {
      setCameraStatus(Math.random() > 0.2 ? "connected" : "error");
    }, 1500);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Camera Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-full ${
                cameraStatus === "connected"
                  ? "bg-green-100 text-green-600"
                  : cameraStatus === "connecting"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <QrCode className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">QR Code Attendance</h2>
              <p className="text-gray-600">
                Scan student ID QR codes for attendance
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {cameraStatus === "connected" && isScanning ? (
                <Camera className="h-5 w-5 text-green-600" />
              ) : (
                <CameraOff className="h-5 w-5 text-red-600" />
              )}
              <Badge
                variant={
                  cameraStatus === "connected"
                    ? isScanning
                      ? "default"
                      : "secondary"
                    : cameraStatus === "connecting"
                    ? "secondary"
                    : "destructive"
                }
              >
                {cameraStatus === "connected"
                  ? isScanning
                    ? "Scanning"
                    : "Ready"
                  : cameraStatus === "connecting"
                  ? "Connecting..."
                  : "Disconnected"}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {stats.marked}/{stats.total}
              </div>
              <div className="text-sm text-gray-500">Students Scanned</div>
            </div>
          </div>
        </div>

        {/* Connection Error */}
        {cameraStatus === "error" && (
          <Card className="p-4 bg-red-50 border-red-200 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">Camera Error</span>
              </div>
              <Button onClick={retryConnection} size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Connection
              </Button>
            </div>
            <p className="text-red-700 text-sm mt-2">
              Unable to access camera. Please check camera permissions and try
              again.
            </p>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

      {/* QR Code Scanner */}
      {cameraStatus === "connected" && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">QR Code Scanner</h3>
            <div className="flex space-x-2">
              {!isScanning ? (
                <Button
                  onClick={startScanning}
                  className="flex items-center space-x-2"
                >
                  <Camera className="h-4 w-4" />
                  <span>Start Scanning</span>
                </Button>
              ) : (
                <Button
                  onClick={stopScanning}
                  variant="destructive"
                  className="flex items-center space-x-2"
                >
                  <CameraOff className="h-4 w-4" />
                  <span>Stop Scanning</span>
                </Button>
              )}
            </div>
          </div>

          {isScanning ? (
            <div className="text-center py-8">
              <div className="w-48 h-48 mx-auto mb-4 border-4 border-dashed border-green-300 rounded-lg flex items-center justify-center bg-green-50 relative overflow-hidden">
                <QrCode className="h-24 w-24 text-green-400" />
                <div className="absolute inset-0 border-2 border-green-500 animate-pulse"></div>
              </div>
              <h4 className="text-lg font-medium mb-2 text-green-700">
                Scanner Active
              </h4>
              <p className="text-gray-600 mb-4">
                Point camera at student QR code
              </p>

              {/* Current Scan Display */}
              {scannedQRCode && (
                <Card className="p-4 bg-green-50 border-green-200 max-w-md mx-auto">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">
                        {scannedQRCode.studentData.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        QR: {scannedQRCode.qrCode} •{" "}
                        {scannedQRCode.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Simulate scanning for demo */}
              <Button
                onClick={simulateQRScanning}
                variant="outline"
                className="mt-4"
              >
                Simulate QR Scan
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-48 h-48 mx-auto mb-4 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <Scan className="h-24 w-24 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium mb-2">Scanner Ready</h4>
              <p className="text-gray-600">
                Click &quot;Start Scanning&quot; to begin
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Recent Scans */}
      {recentScans.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent QR Scans</h3>
          <div className="space-y-3">
            {recentScans.map((scan, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg bg-green-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <QrCode className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">{scan.student?.name}</div>
                    <div className="text-sm text-gray-500">
                      QR: {scan.qrCode} • {scan.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-600">
                  QR Scan
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Scan Statistics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Scan Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {scanHistory.length}
            </div>
            <div className="text-sm text-gray-600">Total Scans</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.present}
            </div>
            <div className="text-sm text-gray-600">Unique Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {scanHistory.length - stats.present}
            </div>
            <div className="text-sm text-gray-600">Duplicate Scans</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {scanHistory.length > 0
                ? Math.round(
                    scanHistory.length /
                      ((Date.now() -
                        (scanHistory[scanHistory.length - 1]?.timestamp ||
                          Date.now())) /
                        60000)
                  ) || 0
                : 0}
            </div>
            <div className="text-sm text-gray-600">Scans/Min</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Attendance Progress</span>
            <span className="text-sm text-gray-600">
              {stats.marked} of {stats.total} students
            </span>
          </div>
          <Progress
            value={(stats.marked / stats.total) * 100}
            className="h-3"
          />
        </div>

        {stats.pending === 0 && stats.total > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-800 font-medium">
                All students have been scanned!
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* QR Code Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Scanner Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Bulk Scanning</div>
              <div className="text-sm text-gray-500">
                Allow multiple quick scans
              </div>
            </div>
            <Badge variant={qrSettings.allowBulkScan ? "default" : "secondary"}>
              {qrSettings.allowBulkScan ? "Enabled" : "Disabled"}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Auto Mark Present</div>
              <div className="text-sm text-gray-500">
                Automatically mark as present on scan
              </div>
            </div>
            <Badge
              variant={qrSettings.autoMarkPresent ? "default" : "secondary"}
            >
              {qrSettings.autoMarkPresent ? "Enabled" : "Disabled"}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Scan Delay</div>
              <div className="text-sm text-gray-500">
                Delay between consecutive scans
              </div>
            </div>
            <Badge variant="outline">{qrSettings.scanDelay}ms</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QRCodeAttendanceMethod;
