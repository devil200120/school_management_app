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
import { Input } from "../../../components/ui/input";
import {
  QrCode,
  Camera,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  ArrowLeft,
  Smartphone,
  Monitor,
  ScanLine,
  UserCheck,
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

const QRCodeAttendance = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [stream, setStream] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [generatedQR, setGeneratedQR] = useState("");
  const [manualCode, setManualCode] = useState("");

  // Sample staff data
  const [staff] = useState([
    {
      id: "TCH001",
      name: "John Doe",
      department: "Mathematics",
      position: "Head Teacher",
    },
    {
      id: "TCH002",
      name: "Sarah Johnson",
      department: "English",
      position: "Senior Teacher",
    },
    {
      id: "TCH003",
      name: "Michael Brown",
      department: "Science",
      position: "Teacher",
    },
    {
      id: "ADM001",
      name: "Emily Davis",
      department: "Administration",
      position: "Accountant",
    },
    {
      id: "TCH005",
      name: "Robert Wilson",
      department: "Physical Education",
      position: "PE Teacher",
    },
  ]);

  // Recent QR attendance logs
  const [recentLogs, setRecentLogs] = useState([
    {
      id: 1,
      staffId: "TCH001",
      name: "John Doe",
      department: "Mathematics",
      checkInTime: "08:15:23",
      status: "success",
      method: "QR Code",
    },
    {
      id: 2,
      staffId: "TCH002",
      name: "Sarah Johnson",
      department: "English",
      checkInTime: "08:22:15",
      status: "success",
      method: "QR Code",
    },
    {
      id: 3,
      staffId: "TCH003",
      name: "Michael Brown",
      department: "Science",
      checkInTime: "08:45:08",
      status: "late",
      method: "QR Code",
    },
  ]);

  // Initialize camera for QR scanning
  const startScanning = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use rear camera if available
      });

      setStream(mediaStream);
      setIsScanning(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      // Simulate QR detection (in real implementation, use a QR detection library)
      setTimeout(() => {
        const mockQRData = "STAFF_QR_TCH001_" + Date.now();
        handleQRDetected(mockQRData);
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

  const stopScanning = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const handleQRDetected = (data) => {
    setQrCodeData(data);
    stopScanning();

    // Extract staff ID from QR data
    const staffIdMatch = data.match(/STAFF_QR_([A-Z0-9]+)_/);
    if (staffIdMatch) {
      const staffId = staffIdMatch[1];
      const staffMember = staff.find((s) => s.id === staffId);

      if (staffMember) {
        recordAttendance(staffMember);
      } else {
        toast.error("Invalid QR Code", {
          description: "Staff member not found in system.",
          icon: <AlertTriangle className="h-4 w-4" />,
        });
      }
    } else {
      toast.error("Invalid QR Code", {
        description: "QR code format not recognized.",
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    }
  };

  const recordAttendance = (staffMember) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    const newLog = {
      id: recentLogs.length + 1,
      staffId: staffMember.id,
      name: staffMember.name,
      department: staffMember.department,
      checkInTime: timeString,
      status: now.getHours() >= 8 && now.getMinutes() > 15 ? "late" : "success",
      method: "QR Code",
    };

    setRecentLogs((prev) => [newLog, ...prev.slice(0, 4)]);

    toast.success("Attendance Recorded", {
      description: `${staffMember.name} checked in at ${timeString}`,
      icon: <CheckCircle className="h-4 w-4" />,
    });
  };

  const generateQRCode = () => {
    if (!selectedStaff) {
      toast.error("Please select a staff member");
      return;
    }

    const qrData = `STAFF_QR_${selectedStaff}_${Date.now()}`;
    setGeneratedQR(qrData);

    toast.success("QR Code Generated", {
      description: "QR code has been generated for the selected staff member.",
      icon: <QrCode className="h-4 w-4" />,
    });
  };

  const handleManualEntry = () => {
    if (!manualCode.trim()) {
      toast.error("Please enter a QR code");
      return;
    }

    handleQRDetected(manualCode);
    setManualCode("");
  };

  const downloadQR = () => {
    // In real implementation, this would generate and download an actual QR code image
    toast.success("QR Code Downloaded", {
      description: "QR code has been saved to your downloads folder.",
      icon: <Download className="h-4 w-4" />,
    });
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
              <QrCode className="h-8 w-8" />
              QR Code Attendance
            </h2>
            <p className="text-muted-foreground mt-1">
              Quick and convenient attendance tracking with QR codes
            </p>
          </div>
        </div>
        <Button
          onClick={() => setShowGenerator(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <QrCode className="mr-2 h-4 w-4" />
          Generate QR Code
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scanner Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                QR Code Scanner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="camera" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="camera">Camera Scan</TabsTrigger>
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
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
                          <div className="w-64 h-64 border-2 border-green-500 rounded-lg relative">
                            <ScanLine className="absolute top-0 left-1/2 transform -translate-x-1/2 text-green-500 animate-bounce" />
                            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-green-500"></div>
                            <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-green-500"></div>
                            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-green-500"></div>
                            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-green-500"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <Camera className="h-16 w-16 mx-auto mb-4" />
                          <p className="text-lg mb-2">Ready to scan QR codes</p>
                          <p className="text-sm">
                            Click "Start Scanning" to begin
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {!isScanning ? (
                      <Button
                        onClick={startScanning}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Start Scanning
                      </Button>
                    ) : (
                      <Button
                        onClick={stopScanning}
                        variant="destructive"
                        className="flex-1"
                      >
                        Stop Scanning
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        stopScanning();
                        setTimeout(() => startScanning(), 500);
                      }}
                      disabled={!isScanning}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      Enter QR Code Manually
                    </label>
                    <Input
                      placeholder="Paste QR code data here..."
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                    />
                    <Button
                      onClick={handleManualEntry}
                      className="w-full bg-eduos-primary hover:bg-eduos-secondary"
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Record Attendance
                    </Button>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Tip:</strong> Manual entry is useful when the
                      camera cannot scan the QR code properly. Staff can also
                      type their QR code data if needed.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                How to Use QR Code Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">For Staff Members:</h4>
                  <ol className="text-sm space-y-2 list-decimal list-inside text-gray-600">
                    <li>Request your personal QR code from admin</li>
                    <li>Save the QR code to your phone or print it</li>
                    <li>Present QR code to scanner upon arrival</li>
                    <li>Wait for confirmation beep/message</li>
                  </ol>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">For Administrators:</h4>
                  <ol className="text-sm space-y-2 list-decimal list-inside text-gray-600">
                    <li>Generate QR codes for each staff member</li>
                    <li>Distribute QR codes via email or print</li>
                    <li>Monitor attendance logs in real-time</li>
                    <li>Export reports for payroll processing</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent QR Check-ins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        log.status === "success"
                          ? "bg-green-500"
                          : log.status === "late"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{log.name}</p>
                      <p className="text-xs text-gray-500">{log.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{log.checkInTime}</p>
                      <Badge
                        className={`text-xs ${
                          log.status === "success"
                            ? "bg-green-100 text-green-800"
                            : log.status === "late"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {log.status === "success"
                          ? "On Time"
                          : log.status === "late"
                          ? "Late"
                          : "Error"}
                      </Badge>
                    </div>
                  </div>
                ))}

                {recentLogs.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <QrCode className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No QR check-ins yet today</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Today's Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">QR Check-ins</span>
                  <span className="font-semibold">{recentLogs.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">On Time</span>
                  <span className="font-semibold text-green-600">
                    {
                      recentLogs.filter((log) => log.status === "success")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Late</span>
                  <span className="font-semibold text-yellow-600">
                    {recentLogs.filter((log) => log.status === "late").length}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="font-bold text-eduos-primary">
                      {recentLogs.length > 0
                        ? Math.round(
                            (recentLogs.filter((log) => log.status !== "error")
                              .length /
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

      {/* QR Code Generator Modal */}
      <Dialog open={showGenerator} onOpenChange={setShowGenerator}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Generate QR Code
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
                  {staff.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name} ({member.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {generatedQR && (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  QR Code for:{" "}
                  <strong>
                    {staff.find((s) => s.id === selectedStaff)?.name}
                  </strong>
                </p>
                <div className="flex gap-2">
                  <Button onClick={downloadQR} size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    onClick={() => toast.success("QR code copied to clipboard")}
                    size="sm"
                    variant="outline"
                  >
                    Copy Link
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={generateQRCode}
                className="flex-1 bg-eduos-primary hover:bg-eduos-secondary"
                disabled={!selectedStaff}
              >
                Generate QR Code
              </Button>
              <Button variant="outline" onClick={() => setShowGenerator(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRCodeAttendance;
