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
import {
  QrCode,
  ArrowLeft,
  Camera,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Smartphone,
  Wifi,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AccountantQRAttendance = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [qrResult, setQrResult] = useState("");
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Current accountant data
  const accountantData = {
    id: "ACC001",
    name: "Sarah Johnson",
    role: "Senior Accountant",
    department: "Finance & Administration",
    employeeId: "EMP2024001",
  };

  // Sample QR code data for demonstration
  const validQRCode = `EDUOS_ATTENDANCE_${
    new Date().toISOString().split("T")[0]
  }_FINANCE_DEPT`;

  const handleStartScanning = () => {
    setScanning(true);
    setQrResult("");
    toast.info("QR Scanner activated", {
      description: "Point your camera at the QR code to mark attendance",
    });

    // Simulate QR scanning process
    setTimeout(() => {
      if (scanning) {
        setQrResult(validQRCode);
        handleQRProcessed(validQRCode);
      }
    }, 3000); // Simulate 3 second scan
  };

  const handleStopScanning = () => {
    setScanning(false);
    toast.info("QR Scanner deactivated");
  };

  const handleQRProcessed = (qrData) => {
    setScanning(false);

    // Validate QR code
    if (
      qrData.includes("EDUOS_ATTENDANCE") &&
      qrData.includes(new Date().toISOString().split("T")[0])
    ) {
      setAttendanceMarked(true);
      const currentTime = new Date();
      const isLate =
        currentTime.getHours() > 9 ||
        (currentTime.getHours() === 9 && currentTime.getMinutes() > 0);

      toast.success("Attendance marked successfully!", {
        description: `Welcome ${accountantData.name}! ${
          isLate ? "(Late arrival)" : ""
        }`,
        icon: <CheckCircle className="h-4 w-4" />,
      });
    } else {
      toast.error("Invalid QR Code", {
        description: "This QR code is not valid for attendance marking",
        icon: <XCircle className="h-4 w-4" />,
      });
    }
  };

  const handleManualQRInput = () => {
    const qrInput = prompt("Enter QR code manually:");
    if (qrInput) {
      setQrResult(qrInput);
      handleQRProcessed(qrInput);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
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

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3 mb-2">
              <QrCode className="text-purple-600" />
              QR Code Attendance
            </h1>
            <p className="text-gray-600">
              Scan QR code to mark your attendance quickly
            </p>
          </div>
        </div>

        {/* Current Time */}
        <Card className="mb-6 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">
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
          </CardContent>
        </Card>

        {/* Main QR Scanner Interface */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Camera className="text-blue-600" />
              QR Code Scanner
            </CardTitle>
            <CardDescription className="text-center">
              Position the QR code within the camera frame to mark attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Scanner Area */}
            <div className="relative mx-auto">
              <div
                className={`w-80 h-80 mx-auto border-4 rounded-lg transition-all duration-300 ${
                  scanning
                    ? "border-blue-500 bg-blue-50 animate-pulse"
                    : attendanceMarked
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-center h-full">
                  {scanning ? (
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-blue-600 font-medium">Scanning...</p>
                      <p className="text-gray-500 text-sm">
                        Point camera at QR code
                      </p>
                    </div>
                  ) : attendanceMarked ? (
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <p className="text-green-600 font-medium">
                        Attendance Marked!
                      </p>
                      <p className="text-gray-500 text-sm">
                        Successfully recorded
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">Ready to scan</p>
                      <p className="text-gray-400 text-sm">
                        Click start to begin
                      </p>
                    </div>
                  )}
                </div>

                {/* Corner indicators */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-blue-500 rounded-tl"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-blue-500 rounded-tr"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-blue-500 rounded-bl"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-blue-500 rounded-br"></div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4">
              {!scanning && !attendanceMarked && (
                <Button
                  onClick={handleStartScanning}
                  className="bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start Scanning
                </Button>
              )}

              {scanning && (
                <Button
                  onClick={handleStopScanning}
                  variant="outline"
                  size="lg"
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Stop Scanner
                </Button>
              )}

              {attendanceMarked && (
                <Button
                  onClick={() => {
                    setAttendanceMarked(false);
                    setQrResult("");
                  }}
                  variant="outline"
                  size="lg"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Scan Again
                </Button>
              )}
            </div>

            {/* Manual Input Option */}
            <div className="border-t pt-6">
              <p className="text-gray-600 mb-3">
                Having trouble with the camera?
              </p>
              <Button
                onClick={handleManualQRInput}
                variant="outline"
                disabled={scanning}
              >
                <QrCode className="mr-2 h-4 w-4" />
                Enter QR Code Manually
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {accountantData.name}
                </h3>
                <p className="text-gray-600">{accountantData.role}</p>
                <p className="text-gray-600 text-sm">
                  {accountantData.department}
                </p>
                <p className="text-gray-600 text-sm">
                  ID: {accountantData.employeeId}
                </p>
              </div>
              <div className="text-right">
                <Badge
                  variant={attendanceMarked ? "default" : "outline"}
                  className={
                    attendanceMarked ? "bg-green-100 text-green-800" : ""
                  }
                >
                  {attendanceMarked ? "Present" : "Not Marked"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {qrResult && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-sm">Scan Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all">
                {qrResult}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Scanned at: {new Date().toLocaleString()}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              How to Use QR Code Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <ol className="list-decimal list-inside space-y-2">
              <li>Click "Start Scanning" to activate the camera</li>
              <li>Position the QR code within the scanning frame</li>
              <li>Hold steady until the scan completes automatically</li>
              <li>
                Your attendance will be marked instantly upon successful scan
              </li>
              <li>If camera access is denied, use the manual input option</li>
            </ol>

            <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-200">
              <p className="font-semibold mb-2">Quick Tips:</p>
              <ul className="text-sm space-y-1">
                <li>• Ensure good lighting for better scan accuracy</li>
                <li>• Hold the QR code 6-12 inches from the camera</li>
                <li>• Make sure the entire QR code is visible in the frame</li>
                <li>• Each QR code is valid for one day only</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Technical Info */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>Mobile Compatible</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                <span>Real-time Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Instant Verification</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountantQRAttendance;
