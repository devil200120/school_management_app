/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CreditCard,
  CheckCircle,
  Wifi,
  WifiOff,
  Users,
  Clock,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const NFCAttendanceMethod = ({
  students = [],
  onMarkAttendance,
  className = "",
  nfcSettings = {
    requireRandomNumber: true,
    numberLength: 6,
    expiryMinutes: 5,
    allowDuplicates: false,
    encryptionEnabled: true,
  },
}) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [nfcReaderStatus, setNfcReaderStatus] = useState("disconnected"); // connected, disconnected, error
  const [currentRandomNumber, setCurrentRandomNumber] = useState(null);
  const [numberExpiry, setNumberExpiry] = useState(null);
  const [scannedCard, setScannedCard] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [recentScans, setRecentScans] = useState([]);

  // Simulate NFC reader connection
  useEffect(() => {
    const connectReader = () => {
      setNfcReaderStatus("connecting");
      setTimeout(() => {
        setNfcReaderStatus(Math.random() > 0.1 ? "connected" : "error");
      }, 2000);
    };

    connectReader();
  }, []);

  // Generate random number for verification
  const generateRandomNumber = () => {
    if (nfcSettings.requireRandomNumber) {
      const number = Math.floor(
        Math.random() * Math.pow(10, nfcSettings.numberLength)
      )
        .toString()
        .padStart(nfcSettings.numberLength, "0");
      setCurrentRandomNumber(number);
      setNumberExpiry(new Date(Date.now() + nfcSettings.expiryMinutes * 60000));
    }
  };

  // Check if random number is expired
  const isNumberExpired = () => {
    return numberExpiry && new Date() > numberExpiry;
  };

  // Auto-generate random number when connected
  useEffect(() => {
    if (nfcReaderStatus === "connected" && nfcSettings.requireRandomNumber) {
      generateRandomNumber();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nfcReaderStatus, nfcSettings.requireRandomNumber]);

  // Simulate NFC card scanning
  const simulateNFCScanning = () => {
    if (nfcReaderStatus !== "connected") return;

    // Simulate random NFC card detection
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    if (randomStudent) {
      handleNFCCardDetected(randomStudent.nfcId, randomStudent);
    }
  };

  const handleNFCCardDetected = (nfcId, studentData) => {
    setScannedCard({ nfcId, studentData, timestamp: new Date() });

    if (nfcSettings.requireRandomNumber) {
      setIsVerifying(true);
    } else {
      // Auto-mark attendance if no verification required
      markAttendanceFromNFC(studentData.id, "present");
    }
  };

  const verifyAndMarkAttendance = () => {
    if (!scannedCard) return;

    if (nfcSettings.requireRandomNumber) {
      if (verificationCode !== currentRandomNumber) {
        alert("Invalid verification code!");
        return;
      }

      if (isNumberExpired()) {
        alert("Verification code has expired!");
        generateRandomNumber();
        return;
      }
    }

    markAttendanceFromNFC(scannedCard.studentData.id, "present");
    setScannedCard(null);
    setVerificationCode("");
    setIsVerifying(false);

    if (nfcSettings.requireRandomNumber) {
      generateRandomNumber(); // Generate new number for next scan
    }
  };

  const markAttendanceFromNFC = (studentId, status) => {
    const timestamp = new Date();
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: { status, timestamp, method: "NFC" },
    }));

    const studentData = students.find((s) => s.id === studentId);
    setRecentScans((prev) => [
      { student: studentData, timestamp, status },
      ...prev.slice(0, 4), // Keep last 5 scans
    ]);

    if (onMarkAttendance) {
      onMarkAttendance(studentId, status, timestamp, "NFC");
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
    setNfcReaderStatus("connecting");
    setTimeout(() => {
      setNfcReaderStatus(Math.random() > 0.2 ? "connected" : "error");
    }, 1500);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* NFC Reader Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-full ${
                nfcReaderStatus === "connected"
                  ? "bg-green-100 text-green-600"
                  : nfcReaderStatus === "connecting"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">NFC Card Attendance</h2>
              <p className="text-gray-600">
                Tap NFC cards for automatic attendance
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {nfcReaderStatus === "connected" ? (
                <Wifi className="h-5 w-5 text-green-600" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-600" />
              )}
              <Badge
                variant={
                  nfcReaderStatus === "connected"
                    ? "default"
                    : nfcReaderStatus === "connecting"
                    ? "secondary"
                    : "destructive"
                }
              >
                {nfcReaderStatus === "connected"
                  ? "Connected"
                  : nfcReaderStatus === "connecting"
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

        {/* Connection Status Details */}
        {nfcReaderStatus === "error" && (
          <Card className="p-4 bg-red-50 border-red-200 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">
                  NFC Reader Error
                </span>
              </div>
              <Button onClick={retryConnection} size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Connection
              </Button>
            </div>
            <p className="text-red-700 text-sm mt-2">
              Unable to connect to NFC reader. Please check device connection
              and try again.
            </p>
          </Card>
        )}

        {/* Random Number Display */}
        {nfcReaderStatus === "connected" &&
          nfcSettings.requireRandomNumber &&
          currentRandomNumber && (
            <Card className="p-4 bg-blue-50 border-blue-200 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  <div>
                    <span className="text-blue-800 font-medium">
                      Verification Code
                    </span>
                    <div className="text-2xl font-bold text-blue-900 font-mono">
                      {currentRandomNumber}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-blue-700">
                  <div>Expires in:</div>
                  <div className="font-medium">
                    {numberExpiry
                      ? Math.max(
                          0,
                          Math.ceil((numberExpiry - new Date()) / 1000 / 60)
                        )
                      : 0}{" "}
                    min
                  </div>
                </div>
              </div>
              <Button
                onClick={generateRandomNumber}
                size="sm"
                variant="outline"
                className="mt-3"
              >
                Generate New Code
              </Button>
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

      {/* NFC Scanning Area */}
      {nfcReaderStatus === "connected" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">NFC Scanning Area</h3>

          <div className="text-center py-8">
            <div className="w-32 h-32 mx-auto mb-4 border-4 border-dashed border-blue-300 rounded-full flex items-center justify-center bg-blue-50">
              <CreditCard className="h-16 w-16 text-blue-400" />
            </div>
            <h4 className="text-lg font-medium mb-2">Ready to Scan</h4>
            <p className="text-gray-600 mb-4">Hold NFC card near the reader</p>

            {/* Simulate scanning for demo */}
            <Button onClick={simulateNFCScanning} variant="outline">
              Simulate NFC Card Tap
            </Button>
          </div>

          {/* Verification Dialog */}
          {scannedCard && isVerifying && (
            <Card className="mt-6 p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-center space-x-3 mb-4">
                <ShieldCheck className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Verification Required</span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm mb-2">
                    NFC Card detected for:{" "}
                    <strong>{scannedCard.studentData.name}</strong>
                  </p>
                  <p className="text-xs text-gray-600">
                    Card ID: {scannedCard.nfcId}
                  </p>
                </div>

                <div>
                  <Label className="mb-2 block">Enter Verification Code</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder={`Enter ${nfcSettings.numberLength} digit code`}
                      maxLength={nfcSettings.numberLength}
                      className="font-mono text-lg"
                    />
                    <Button
                      onClick={verifyAndMarkAttendance}
                      disabled={!verificationCode}
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </Card>
      )}

      {/* Recent Scans */}
      {recentScans.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent NFC Scans</h3>
          <div className="space-y-3">
            {recentScans.map((scan, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg bg-green-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">{scan.student?.name}</div>
                    <div className="text-sm text-gray-500">
                      {scan.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-600">
                  NFC Scan
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Progress Summary */}
      {stats.total > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Attendance Progress</h3>
            <span className="text-sm text-gray-600">
              {stats.marked} of {stats.total} students
            </span>
          </div>
          <Progress
            value={(stats.marked / stats.total) * 100}
            className="h-3"
          />

          {stats.pending === 0 && (
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
      )}
    </div>
  );
};

export default NFCAttendanceMethod;
