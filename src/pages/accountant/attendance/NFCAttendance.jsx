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
  Wifi,
  ArrowLeft,
  CreditCard,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Smartphone,
  Radio,
  AlertCircle,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AccountantNFCAttendance = () => {
  const navigate = useNavigate();
  const [nfcActive, setNfcActive] = useState(false);
  const [nfcStatus, setNfcStatus] = useState("disconnected");
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastCardTap, setLastCardTap] = useState(null);

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
    nfcCardId: "NFC_ACC001_2024",
  };

  // Simulate NFC reader connection
  const handleConnectNFC = async () => {
    setNfcStatus("connecting");
    toast.info("Connecting to NFC reader...");

    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setNfcStatus("connected");
      toast.success("NFC reader connected successfully!");
    } catch (error) {
      setNfcStatus("error");
      toast.error("Failed to connect NFC reader");
    }
  };

  const handleStartNFC = () => {
    if (nfcStatus !== "connected") {
      handleConnectNFC();
      return;
    }

    setNfcActive(true);
    toast.info("NFC Reader activated", {
      description: "Tap your NFC card on the reader to mark attendance",
      icon: <Radio className="h-4 w-4" />,
    });

    // Simulate NFC card detection
    setTimeout(() => {
      if (nfcActive) {
        handleNFCTapped(accountantData.nfcCardId);
      }
    }, 3000); // Simulate 3 second wait for card tap
  };

  const handleStopNFC = () => {
    setNfcActive(false);
    toast.info("NFC Reader deactivated");
  };

  const handleNFCTapped = (cardId) => {
    setNfcActive(false);
    setLastCardTap({
      cardId,
      timestamp: new Date(),
    });

    // Validate NFC card
    if (cardId === accountantData.nfcCardId) {
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
      toast.error("Invalid NFC Card", {
        description: "This NFC card is not registered for this user",
        icon: <XCircle className="h-4 w-4" />,
      });
    }
  };

  const handleManualCardInput = () => {
    const cardInput = prompt("Enter NFC card ID manually:");
    if (cardInput) {
      setLastCardTap({
        cardId: cardInput,
        timestamp: new Date(),
      });
      handleNFCTapped(cardInput);
    }
  };

  const getStatusColor = () => {
    switch (nfcStatus) {
      case "connected":
        return "text-green-600";
      case "connecting":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = () => {
    switch (nfcStatus) {
      case "connected":
        return <CheckCircle className="h-5 w-5" />;
      case "connecting":
        return <RefreshCw className="h-5 w-5 animate-spin" />;
      case "error":
        return <XCircle className="h-5 w-5" />;
      default:
        return <Radio className="h-5 w-5" />;
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
              <Wifi className="text-green-600" />
              NFC Card Attendance
            </h1>
            <p className="text-gray-600">
              Tap your NFC card to mark attendance instantly
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

        {/* NFC Reader Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Radio className="text-blue-600" />
                NFC Reader Status
              </span>
              <Badge
                variant="outline"
                className={`${getStatusColor()} border-current`}
              >
                {nfcStatus.charAt(0).toUpperCase() + nfcStatus.slice(1)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={getStatusColor()}>{getStatusIcon()}</div>
                <div>
                  <p className="font-medium">
                    {nfcStatus === "connected" && "Ready to scan NFC cards"}
                    {nfcStatus === "connecting" && "Establishing connection..."}
                    {nfcStatus === "error" && "Connection failed"}
                    {nfcStatus === "disconnected" && "Not connected"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {nfcStatus === "connected" &&
                      "NFC reader is active and ready"}
                    {nfcStatus === "connecting" &&
                      "Please wait while connecting"}
                    {nfcStatus === "error" && "Please check reader connection"}
                    {nfcStatus === "disconnected" &&
                      "Click connect to activate reader"}
                  </p>
                </div>
              </div>
              {nfcStatus === "disconnected" || nfcStatus === "error" ? (
                <Button
                  onClick={handleConnectNFC}
                  disabled={nfcStatus === "connecting"}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Connect Reader
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>

        {/* Main NFC Interface */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <CreditCard className="text-blue-600" />
              NFC Card Reader
            </CardTitle>
            <CardDescription className="text-center">
              Hold your NFC card near the reader to mark attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Reader Area */}
            <div className="relative mx-auto">
              <div
                className={`w-80 h-80 mx-auto border-4 rounded-lg transition-all duration-300 ${
                  nfcActive
                    ? "border-green-500 bg-green-50"
                    : attendanceMarked
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-center h-full">
                  {nfcActive ? (
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Wifi className="w-10 h-10 text-white" />
                      </motion.div>
                      <p className="text-green-600 font-medium">
                        NFC Reader Active
                      </p>
                      <p className="text-gray-500 text-sm">
                        Tap your card here
                      </p>

                      {/* Ripple effect */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [0, 2], opacity: [0.8, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                          className="w-40 h-40 border-4 border-green-400 rounded-full"
                        />
                      </div>
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
                      <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">Ready to read</p>
                      <p className="text-gray-400 text-sm">
                        {nfcStatus === "connected"
                          ? "Tap start to begin"
                          : "Connect reader first"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4">
              {!nfcActive && !attendanceMarked && nfcStatus === "connected" && (
                <Button
                  onClick={handleStartNFC}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Radio className="mr-2 h-5 w-5" />
                  Start NFC Reader
                </Button>
              )}

              {nfcActive && (
                <Button onClick={handleStopNFC} variant="outline" size="lg">
                  <XCircle className="mr-2 h-5 w-5" />
                  Stop Reader
                </Button>
              )}

              {attendanceMarked && (
                <Button
                  onClick={() => {
                    setAttendanceMarked(false);
                    setLastCardTap(null);
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
              <p className="text-gray-600 mb-3">Card reader not working?</p>
              <Button
                onClick={handleManualCardInput}
                variant="outline"
                disabled={nfcActive}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Enter Card ID Manually
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
                <p className="text-gray-600 text-sm font-mono">
                  NFC: {accountantData.nfcCardId}
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

        {/* Last Card Tap */}
        {lastCardTap && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-sm">Last NFC Card Tap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-3 rounded">
                <div className="font-mono text-sm break-all mb-2">
                  Card ID: {lastCardTap.cardId}
                </div>
                <div className="text-sm text-gray-600">
                  Tapped at: {lastCardTap.timestamp.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              How to Use NFC Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-green-700">
            <ol className="list-decimal list-inside space-y-2">
              <li>Ensure the NFC reader is connected and active</li>
              <li>Click "Start NFC Reader" to activate scanning</li>
              <li>Hold your NFC card within 2 inches of the reader</li>
              <li>Wait for the confirmation sound and green light</li>
              <li>Your attendance will be marked automatically</li>
            </ol>

            <div className="mt-4 p-3 bg-green-100 rounded border border-green-200">
              <p className="font-semibold mb-2">NFC Card Tips:</p>
              <ul className="text-sm space-y-1">
                <li>• Keep your card flat and parallel to the reader</li>
                <li>• Remove card from wallet/holder for better reading</li>
                <li>• Hold card steady for 1-2 seconds during scan</li>
                <li>• Each card is uniquely registered to one employee</li>
                <li>
                  • Report lost or damaged cards to IT support immediately
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Technical Info */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Instant Recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>Contactless Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Real-time Processing</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountantNFCAttendance;
