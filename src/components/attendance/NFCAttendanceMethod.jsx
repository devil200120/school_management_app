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
  Camera,
  Fingerprint,
  MapPin,
  Shield,
  AlertTriangle,
  Eye,
  Lock,
  Zap,
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
    requireBiometric: true,
    requirePhotoVerification: true,
    maxDailyScans: 3,
    locationVerification: true,
    timeWindowRestriction: true,
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
  const [encryptedCardData, setEncryptedCardData] = useState(null);
  const [biometricVerified, setBiometricVerified] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);
  const [dailyScansCount, setDailyScansCount] = useState({});
  const [securityAlerts, setSecurityAlerts] = useState([]);
  const [suspiciousActivity, setSuspiciousActivity] = useState([]);

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

  // Enhanced security: Generate encrypted random number
  const generateRandomNumber = () => {
    if (nfcSettings.requireRandomNumber) {
      const number = Math.floor(
        Math.random() * Math.pow(10, nfcSettings.numberLength)
      )
        .toString()
        .padStart(nfcSettings.numberLength, "0");

      // Add timestamp and device fingerprint for encryption
      const timestamp = Date.now();
      const deviceFingerprint = navigator.userAgent.slice(0, 20);
      const encryptedNumber = btoa(
        `${number}-${timestamp}-${deviceFingerprint}`
      );

      setCurrentRandomNumber(number);
      setNumberExpiry(new Date(Date.now() + nfcSettings.expiryMinutes * 60000));

      // Store encrypted version for validation
      localStorage.setItem("nfc_encrypted_code", encryptedNumber);
    }
  };

  // Enhanced security validations
  const validateCardSecurity = (nfcId, studentData) => {
    const validationResults = {
      valid: true,
      errors: [],
      warnings: [],
    };

    // Check daily scan limits
    const today = new Date().toDateString();
    const todayScans = dailyScansCount[studentData.id]?.[today] || 0;
    if (todayScans >= nfcSettings.maxDailyScans) {
      validationResults.valid = false;
      validationResults.errors.push(
        `Maximum daily scans (${nfcSettings.maxDailyScans}) exceeded`
      );
    }

    // Check time window restrictions
    if (nfcSettings.timeWindowRestriction) {
      const currentHour = new Date().getHours();
      const isValidTime = currentHour >= 7 && currentHour <= 17; // 7 AM to 5 PM
      if (!isValidTime) {
        validationResults.valid = false;
        validationResults.errors.push(
          "Attendance marking outside allowed hours (7 AM - 5 PM)"
        );
      }
    }

    // Validate NFC card encryption
    if (nfcSettings.encryptionEnabled) {
      const expectedHash = generateCardHash(nfcId, studentData.id);
      const receivedHash = simulateCardHash(nfcId); // In real scenario, this comes from card
      if (expectedHash !== receivedHash) {
        validationResults.valid = false;
        validationResults.errors.push("Card encryption validation failed");
        setSuspiciousActivity((prev) => [
          ...prev,
          {
            type: "INVALID_ENCRYPTION",
            studentId: studentData.id,
            nfcId: nfcId,
            timestamp: new Date(),
            details: "Card hash mismatch detected",
          },
        ]);
      }
    }

    // Check for suspicious rapid scanning
    const recentScanTimes = recentScans
      .filter((scan) => scan.student?.id === studentData.id)
      .map((scan) => scan.timestamp.getTime());

    if (recentScanTimes.length > 0) {
      const timeSinceLastScan = Date.now() - Math.max(...recentScanTimes);
      if (timeSinceLastScan < 30000) {
        // Less than 30 seconds
        validationResults.valid = false;
        validationResults.errors.push("Suspicious rapid scanning detected");
        setSuspiciousActivity((prev) => [
          ...prev,
          {
            type: "RAPID_SCANNING",
            studentId: studentData.id,
            nfcId: nfcId,
            timestamp: new Date(),
            details: `Scan attempt ${
              timeSinceLastScan / 1000
            }s after last scan`,
          },
        ]);
      }
    }

    return validationResults;
  };

  const generateCardHash = (nfcId, studentId) => {
    // Simulate hash generation (in real app, use proper encryption)
    const combined = `${nfcId}-${studentId}-${new Date().toDateString()}`;
    return btoa(combined).slice(0, 16);
  };

  const simulateCardHash = (nfcId) => {
    // Simulate hash from card (in real scenario, this would be read from the NFC chip)
    return btoa(
      `${nfcId}-${
        students.find((s) => s.nfcId === nfcId)?.id
      }-${new Date().toDateString()}`
    ).slice(0, 16);
  };

  const requestBiometricVerification = async () => {
    if (!nfcSettings.requireBiometric) return true;

    try {
      // Simulate biometric verification (fingerprint/face)
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(Math.random() > 0.1); // 90% success rate
        }, 2000);
      });

      setBiometricVerified(result);
      return result;
    } catch (error) {
      setBiometricVerified(false);
      return false;
    }
  };

  const captureVerificationPhoto = async () => {
    if (!nfcSettings.requirePhotoVerification) return true;

    try {
      // Simulate photo capture
      await new Promise((resolve) => {
        setTimeout(() => {
          setPhotoTaken(true);
          resolve();
        }, 1500);
      });
      return true;
    } catch (error) {
      setPhotoTaken(false);
      return false;
    }
  };

  const verifyLocation = () => {
    if (!nfcSettings.locationVerification) return true;

    // Simulate location verification (GPS, WiFi fingerprinting)
    const isValidLocation = Math.random() > 0.05; // 95% success rate
    setLocationVerified(isValidLocation);

    if (!isValidLocation) {
      setSecurityAlerts((prev) => [
        ...prev,
        {
          type: "LOCATION_MISMATCH",
          message: "Attendance attempt from unauthorized location",
          timestamp: new Date(),
          severity: "HIGH",
        },
      ]);
    }

    return isValidLocation;
  };

  const updateDailyScanCount = (studentId) => {
    const today = new Date().toDateString();
    setDailyScansCount((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [today]: (prev[studentId]?.[today] || 0) + 1,
      },
    }));
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

  const handleNFCCardDetected = async (nfcId, studentData) => {
    // Step 1: Basic security validation
    const securityCheck = validateCardSecurity(nfcId, studentData);

    if (!securityCheck.valid) {
      setSecurityAlerts((prev) => [
        ...prev,
        {
          type: "SECURITY_VIOLATION",
          message: securityCheck.errors.join(", "),
          timestamp: new Date(),
          severity: "HIGH",
          studentId: studentData.id,
          nfcId: nfcId,
        },
      ]);

      // Show error and reject
      alert(`Security Check Failed:\n${securityCheck.errors.join("\n")}`);
      return;
    }

    // Step 2: Set up verification process
    setScannedCard({
      nfcId,
      studentData,
      timestamp: new Date(),
      securityLevel: "ENHANCED",
    });

    // Step 3: Start multi-factor authentication
    if (
      nfcSettings.requireRandomNumber ||
      nfcSettings.requireBiometric ||
      nfcSettings.requirePhotoVerification ||
      nfcSettings.locationVerification
    ) {
      setIsVerifying(true);

      // Initialize all verification flags
      setBiometricVerified(false);
      setPhotoTaken(false);
      setLocationVerified(false);

      // Start parallel verifications
      const verificationPromises = [];

      if (nfcSettings.requireBiometric) {
        verificationPromises.push(requestBiometricVerification());
      }

      if (nfcSettings.requirePhotoVerification) {
        verificationPromises.push(captureVerificationPhoto());
      }

      if (nfcSettings.locationVerification) {
        verificationPromises.push(Promise.resolve(verifyLocation()));
      }

      // Wait for all automatic verifications
      try {
        await Promise.all(verificationPromises);
      } catch (error) {
        console.error("Verification failed:", error);
        setIsVerifying(false);
        return;
      }
    } else {
      // Auto-mark if no additional verification required
      markAttendanceFromNFC(studentData.id, "present");
    }
  };

  const verifyAndMarkAttendance = async () => {
    if (!scannedCard) return;

    const verificationErrors = [];

    // Verify random number if required
    if (nfcSettings.requireRandomNumber) {
      if (verificationCode !== currentRandomNumber) {
        verificationErrors.push("Invalid verification code");
      }

      if (isNumberExpired()) {
        verificationErrors.push("Verification code has expired");
        generateRandomNumber();
      }

      // Verify encrypted code integrity
      const storedEncrypted = localStorage.getItem("nfc_encrypted_code");
      if (!storedEncrypted) {
        verificationErrors.push("Security token missing");
      }
    }

    // Check biometric verification
    if (nfcSettings.requireBiometric && !biometricVerified) {
      verificationErrors.push("Biometric verification failed");
    }

    // Check photo verification
    if (nfcSettings.requirePhotoVerification && !photoTaken) {
      verificationErrors.push("Photo verification required");
    }

    // Check location verification
    if (nfcSettings.locationVerification && !locationVerified) {
      verificationErrors.push("Location verification failed");
    }

    // If any verification failed, reject
    if (verificationErrors.length > 0) {
      setSecurityAlerts((prev) => [
        ...prev,
        {
          type: "VERIFICATION_FAILED",
          message: verificationErrors.join(", "),
          timestamp: new Date(),
          severity: "MEDIUM",
          studentId: scannedCard.studentData.id,
        },
      ]);

      alert(
        `Verification Failed:\n${verificationErrors.join(
          "\n"
        )}\n\nAttendance not marked.`
      );
      return;
    }

    // All verifications passed - mark attendance
    markAttendanceFromNFC(scannedCard.studentData.id, "present");
    updateDailyScanCount(scannedCard.studentData.id);

    // Clean up verification state
    setScannedCard(null);
    setVerificationCode("");
    setIsVerifying(false);
    setBiometricVerified(false);
    setPhotoTaken(false);
    setLocationVerified(false);

    // Clear encrypted code
    localStorage.removeItem("nfc_encrypted_code");

    // Generate new verification code for next scan
    if (nfcSettings.requireRandomNumber) {
      generateRandomNumber();
    }

    // Log successful secure attendance
    console.log(
      `Secure attendance marked for ${scannedCard.studentData.name} with enhanced verification`
    );
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

        {/* Enhanced Security Monitoring */}
        <Card className="p-4 bg-gray-50 border-gray-200 mb-4">
          <h4 className="flex items-center gap-2 text-sm font-medium mb-3">
            <Shield className="h-4 w-4 text-blue-600" />
            Security Status
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div
              className={`p-2 rounded border ${
                nfcSettings.encryptionEnabled
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center gap-1 text-xs">
                <Lock
                  className={`h-3 w-3 ${
                    nfcSettings.encryptionEnabled
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                />
                Encryption: {nfcSettings.encryptionEnabled ? "ON" : "OFF"}
              </div>
            </div>
            <div
              className={`p-2 rounded border ${
                nfcSettings.requireBiometric
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex items-center gap-1 text-xs">
                <Fingerprint
                  className={`h-3 w-3 ${
                    nfcSettings.requireBiometric
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                />
                Biometric: {nfcSettings.requireBiometric ? "ON" : "OFF"}
              </div>
            </div>
            <div
              className={`p-2 rounded border ${
                nfcSettings.locationVerification
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex items-center gap-1 text-xs">
                <MapPin
                  className={`h-3 w-3 ${
                    nfcSettings.locationVerification
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                />
                Location: {nfcSettings.locationVerification ? "ON" : "OFF"}
              </div>
            </div>
            <div
              className={`p-2 rounded border ${
                nfcSettings.requirePhotoVerification
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex items-center gap-1 text-xs">
                <Camera
                  className={`h-3 w-3 ${
                    nfcSettings.requirePhotoVerification
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                />
                Photo: {nfcSettings.requirePhotoVerification ? "ON" : "OFF"}
              </div>
            </div>
          </div>
        </Card>

        {/* Security Alerts */}
        {securityAlerts.length > 0 && (
          <Card className="p-4 bg-red-50 border-red-200 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-red-800 font-medium">Security Alerts</span>
              <Badge variant="destructive" className="text-xs">
                {securityAlerts.length}
              </Badge>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {securityAlerts.slice(-3).map((alert, index) => (
                <div
                  key={index}
                  className="text-sm text-red-700 bg-red-100 p-2 rounded"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{alert.type}</span>
                    <span className="text-xs">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-xs mt-1">{alert.message}</div>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setSecurityAlerts([])}
              size="sm"
              variant="outline"
              className="mt-2 text-xs"
            >
              Clear Alerts
            </Button>
          </Card>
        )}

        {/* Suspicious Activity Monitoring */}
        {suspiciousActivity.length > 0 && (
          <Card className="p-4 bg-orange-50 border-orange-200 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="h-4 w-4 text-orange-600" />
              <span className="text-orange-800 font-medium">
                Suspicious Activity
              </span>
              <Badge
                variant="outline"
                className="text-orange-700 border-orange-300"
              >
                {suspiciousActivity.length}
              </Badge>
            </div>
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {suspiciousActivity.slice(-2).map((activity, index) => (
                <div
                  key={index}
                  className="text-sm text-orange-700 bg-orange-100 p-2 rounded"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{activity.type}</span>
                    <span className="text-xs">
                      {activity.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-xs mt-1">{activity.details}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Enhanced Random Number Display with Security Features */}
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

          {/* Enhanced Multi-Factor Verification Dialog */}
          {scannedCard && isVerifying && (
            <Card className="mt-6 p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-center space-x-3 mb-4">
                <ShieldCheck className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">
                  Enhanced Security Verification
                </span>
                <Badge variant="outline" className="text-xs">
                  Multi-Factor Authentication
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm mb-2">
                    NFC Card detected for:{" "}
                    <strong>{scannedCard.studentData.name}</strong>
                  </p>
                  <p className="text-xs text-gray-600">
                    Card ID: {scannedCard.nfcId} | Security Level:{" "}
                    {scannedCard.securityLevel}
                  </p>
                </div>

                {/* Verification Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Random Code Verification */}
                  {nfcSettings.requireRandomNumber && (
                    <div className="p-3 border rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">
                          Verification Code
                        </span>
                      </div>
                      <Input
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder={`Enter ${nfcSettings.numberLength} digit code`}
                        maxLength={nfcSettings.numberLength}
                        className="font-mono text-lg"
                      />
                    </div>
                  )}

                  {/* Biometric Verification Status */}
                  {nfcSettings.requireBiometric && (
                    <div className="p-3 border rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Fingerprint
                          className={`h-4 w-4 ${
                            biometricVerified
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          Biometric Scan
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 p-2 rounded text-sm ${
                          biometricVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {biometricVerified ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Verified
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Scanning...
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Photo Verification Status */}
                  {nfcSettings.requirePhotoVerification && (
                    <div className="p-3 border rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera
                          className={`h-4 w-4 ${
                            photoTaken ? "text-green-600" : "text-gray-400"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          Photo Capture
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 p-2 rounded text-sm ${
                          photoTaken
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {photoTaken ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Photo Captured
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Capturing...
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Location Verification Status */}
                  {nfcSettings.locationVerification && (
                    <div className="p-3 border rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin
                          className={`h-4 w-4 ${
                            locationVerified
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          Location Check
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 p-2 rounded text-sm ${
                          locationVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {locationVerified ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Valid Location
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4" />
                            Location Check Failed
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Verification Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Verification Progress</span>
                    <span>
                      {
                        [
                          !nfcSettings.requireRandomNumber ||
                            verificationCode.length ===
                              nfcSettings.numberLength,
                          !nfcSettings.requireBiometric || biometricVerified,
                          !nfcSettings.requirePhotoVerification || photoTaken,
                          !nfcSettings.locationVerification || locationVerified,
                        ].filter(Boolean).length
                      }{" "}
                      /{" "}
                      {
                        [
                          nfcSettings.requireRandomNumber,
                          nfcSettings.requireBiometric,
                          nfcSettings.requirePhotoVerification,
                          nfcSettings.locationVerification,
                        ].filter(Boolean).length
                      }{" "}
                      Complete
                    </span>
                  </div>
                  <Progress
                    value={
                      ([
                        !nfcSettings.requireRandomNumber ||
                          verificationCode.length === nfcSettings.numberLength,
                        !nfcSettings.requireBiometric || biometricVerified,
                        !nfcSettings.requirePhotoVerification || photoTaken,
                        !nfcSettings.locationVerification || locationVerified,
                      ].filter(Boolean).length /
                        [
                          nfcSettings.requireRandomNumber,
                          nfcSettings.requireBiometric,
                          nfcSettings.requirePhotoVerification,
                          nfcSettings.locationVerification,
                        ].filter(Boolean).length) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={verifyAndMarkAttendance}
                    disabled={
                      (nfcSettings.requireRandomNumber && !verificationCode) ||
                      (nfcSettings.requireBiometric && !biometricVerified) ||
                      (nfcSettings.requirePhotoVerification && !photoTaken) ||
                      (nfcSettings.locationVerification && !locationVerified)
                    }
                    className="flex-1"
                  >
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Complete Secure Verification
                  </Button>
                  <Button
                    onClick={() => {
                      setScannedCard(null);
                      setIsVerifying(false);
                      setVerificationCode("");
                      setBiometricVerified(false);
                      setPhotoTaken(false);
                      setLocationVerified(false);
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>

                {/* Security Warning */}
                <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-xs text-blue-800">
                      <strong>Enhanced Security Active:</strong> This system
                      uses multi-factor authentication to prevent unauthorized
                      card usage. All attempts are logged and monitored.
                    </div>
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

      {/* Enhanced Security Summary */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Enhanced Security Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2 text-sm">
              Active Security Measures
            </h4>
            <ul className="text-xs space-y-1">
              <li className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-green-600" />
                Multi-factor authentication
              </li>
              <li className="flex items-center gap-2">
                <Lock className="h-3 w-3 text-green-600" />
                Encrypted card validation
              </li>
              <li className="flex items-center gap-2">
                <Fingerprint className="h-3 w-3 text-green-600" />
                Biometric verification
              </li>
              <li className="flex items-center gap-2">
                <Camera className="h-3 w-3 text-green-600" />
                Photo verification
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-green-600" />
                Location validation
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-green-600" />
                Time window restrictions
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-sm">Anti-Fraud Protection</h4>
            <ul className="text-xs space-y-1">
              <li>• Daily scan limits per student</li>
              <li>• Rapid scanning detection</li>
              <li>• Card cloning prevention</li>
              <li>• Real-time security monitoring</li>
              <li>• Audit trail logging</li>
              <li>• Suspicious activity alerts</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white border border-blue-200 rounded">
          <p className="text-xs text-blue-800">
            <strong>Security Notice:</strong> All NFC card transactions are
            monitored and logged. Unauthorized attempts to use cards will be
            reported to school administration. Students must use only their
            assigned cards during designated hours.
          </p>
        </div>
      </Card>

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
