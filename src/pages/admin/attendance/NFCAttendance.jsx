import { useState, useEffect } from "react";
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
  Wifi,
  WifiOff,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Radio,
  UserCheck,
  Settings,
  RefreshCw,
  Zap,
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

const NFCAttendance = () => {
  const navigate = useNavigate();
  const [isNFCEnabled, setIsNFCEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [nfcSupported, setNFCSupported] = useState(false);
  const [showCardManager, setShowCardManager] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [cardId, setCardId] = useState("");
  const [manualCardId, setManualCardId] = useState("");

  // Sample staff data
  const [staff] = useState([
    {
      id: "TCH001",
      name: "John Doe",
      department: "Mathematics",
      position: "Head Teacher",
      cardId: "NFC001234",
    },
    {
      id: "TCH002",
      name: "Sarah Johnson",
      department: "English",
      position: "Senior Teacher",
      cardId: "NFC001235",
    },
    {
      id: "TCH003",
      name: "Michael Brown",
      department: "Science",
      position: "Teacher",
      cardId: null,
    },
    {
      id: "ADM001",
      name: "Emily Davis",
      department: "Administration",
      position: "Accountant",
      cardId: "NFC001237",
    },
    {
      id: "TCH005",
      name: "Robert Wilson",
      department: "Physical Education",
      position: "PE Teacher",
      cardId: "NFC001238",
    },
  ]);

  // NFC card registry
  const [nfcCards, setNFCCards] = useState([
    {
      id: "NFC001234",
      staffId: "TCH001",
      staffName: "John Doe",
      status: "active",
      assignedDate: "2024-11-01",
    },
    {
      id: "NFC001235",
      staffId: "TCH002",
      staffName: "Sarah Johnson",
      status: "active",
      assignedDate: "2024-11-02",
    },
    {
      id: "NFC001237",
      staffId: "ADM001",
      staffName: "Emily Davis",
      status: "active",
      assignedDate: "2024-11-03",
    },
    {
      id: "NFC001238",
      staffId: "TCH005",
      staffName: "Robert Wilson",
      status: "lost",
      assignedDate: "2024-11-04",
    },
  ]);

  // Recent NFC attendance logs
  const [recentLogs, setRecentLogs] = useState([
    {
      id: 1,
      staffId: "TCH001",
      name: "John Doe",
      department: "Mathematics",
      checkInTime: "08:12:45",
      cardId: "NFC001234",
      status: "success",
      method: "NFC Tap",
    },
    {
      id: 2,
      staffId: "ADM001",
      name: "Emily Davis",
      department: "Administration",
      checkInTime: "07:55:30",
      cardId: "NFC001237",
      status: "success",
      method: "NFC Tap",
    },
  ]);

  // Check for NFC support
  useEffect(() => {
    if ("NDEFReader" in window) {
      setNFCSupported(true);
      setIsNFCEnabled(true);
    } else {
      setNFCSupported(false);
      toast.info("NFC Not Supported", {
        description:
          "This device does not support NFC. Manual entry is available.",
        icon: <CreditCard className="h-4 w-4" />,
      });
    }
  }, []);

  // Start NFC listening
  const startNFCListening = async () => {
    if (!nfcSupported) {
      toast.error("NFC not supported on this device");
      return;
    }

    try {
      setIsListening(true);

      // Simulate NFC reading (in real implementation, use NDEFReader)
      toast.info("NFC Ready", {
        description: "Waiting for NFC card tap...",
        icon: <Radio className="h-4 w-4" />,
      });

      // Simulate NFC card detection after 2 seconds
      setTimeout(() => {
        const mockCardId = "NFC001234";
        handleNFCRead(mockCardId);
      }, 2000);
    } catch (error) {
      console.error("Error starting NFC:", error);
      toast.error("NFC Error", {
        description: "Failed to start NFC reader. Please try again.",
        icon: <AlertTriangle className="h-4 w-4" />,
      });
      setIsListening(false);
    }
  };

  const stopNFCListening = () => {
    setIsListening(false);
    toast.info("NFC Stopped", {
      description: "NFC reader has been stopped.",
      icon: <WifiOff className="h-4 w-4" />,
    });
  };

  const handleNFCRead = (cardId) => {
    setIsListening(false);

    // Find staff member by card ID
    const staffMember = staff.find((s) => s.cardId === cardId);
    const nfcCard = nfcCards.find((c) => c.id === cardId);

    if (!nfcCard) {
      toast.error("Unknown Card", {
        description: "This NFC card is not registered in the system.",
        icon: <AlertTriangle className="h-4 w-4" />,
      });
      return;
    }

    if (nfcCard.status === "lost" || nfcCard.status === "disabled") {
      toast.error("Card Disabled", {
        description: "This card has been marked as lost or disabled.",
        icon: <AlertTriangle className="h-4 w-4" />,
      });
      return;
    }

    if (staffMember) {
      recordAttendance(staffMember, cardId);
    } else {
      toast.error("Staff Not Found", {
        description: "No staff member found for this card.",
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    }
  };

  const recordAttendance = (staffMember, cardId) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    const newLog = {
      id: recentLogs.length + 1,
      staffId: staffMember.id,
      name: staffMember.name,
      department: staffMember.department,
      checkInTime: timeString,
      cardId: cardId,
      status: now.getHours() >= 8 && now.getMinutes() > 15 ? "late" : "success",
      method: "NFC Tap",
    };

    setRecentLogs((prev) => [newLog, ...prev.slice(0, 4)]);

    toast.success("Attendance Recorded", {
      description: `${staffMember.name} checked in at ${timeString}`,
      icon: <CheckCircle className="h-4 w-4" />,
    });
  };

  const handleManualEntry = () => {
    if (!manualCardId.trim()) {
      toast.error("Please enter a card ID");
      return;
    }

    handleNFCRead(manualCardId.toUpperCase());
    setManualCardId("");
  };

  const assignCard = () => {
    if (!selectedStaff || !cardId) {
      toast.error("Please select staff member and enter card ID");
      return;
    }

    // Check if card already exists
    const existingCard = nfcCards.find((c) => c.id === cardId);
    if (existingCard) {
      toast.error("Card already assigned");
      return;
    }

    const staffMember = staff.find((s) => s.id === selectedStaff);
    const newCard = {
      id: cardId,
      staffId: selectedStaff,
      staffName: staffMember.name,
      status: "active",
      assignedDate: new Date().toISOString().split("T")[0],
    };

    setNFCCards((prev) => [...prev, newCard]);
    setCardId("");
    setSelectedStaff("");

    toast.success("Card Assigned", {
      description: `NFC card assigned to ${staffMember.name}`,
      icon: <CreditCard className="h-4 w-4" />,
    });
  };

  const toggleCardStatus = (cardId, newStatus) => {
    setNFCCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, status: newStatus } : card
      )
    );

    toast.success("Card Status Updated", {
      description: `Card ${cardId} is now ${newStatus}`,
      icon: <Settings className="h-4 w-4" />,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Success
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Late
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

  const getCardStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Active
          </Badge>
        );
      case "lost":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Lost
          </Badge>
        );
      case "disabled":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            Disabled
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
              <CreditCard className="h-8 w-8" />
              NFC Attendance System
            </h2>
            <p className="text-muted-foreground mt-1">
              Contactless attendance tracking with NFC cards
            </p>
          </div>
        </div>
        <Button
          onClick={() => setShowCardManager(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Manage Cards
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NFC Reader Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5" />
                NFC Reader Status
                {nfcSupported ? (
                  <Badge className="bg-green-100 text-green-800">
                    <Wifi className="h-3 w-3 mr-1" />
                    Supported
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">
                    <WifiOff className="h-3 w-3 mr-1" />
                    Not Supported
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="reader" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="reader">NFC Reader</TabsTrigger>
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                </TabsList>

                <TabsContent value="reader" className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg overflow-hidden relative">
                    <div className="relative w-full h-full flex items-center justify-center">
                      {isListening ? (
                        <div className="text-center text-white">
                          <div className="relative">
                            <CreditCard className="h-24 w-24 mx-auto mb-4 animate-pulse" />
                            <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin w-32 h-32 mx-auto"></div>
                          </div>
                          <p className="text-xl mb-2">
                            Listening for NFC Cards
                          </p>
                          <p className="text-sm opacity-80">
                            Hold your NFC card near the reader
                          </p>
                        </div>
                      ) : (
                        <div className="text-center text-white">
                          <CreditCard className="h-24 w-24 mx-auto mb-4 opacity-60" />
                          <p className="text-xl mb-2">NFC Reader Ready</p>
                          <p className="text-sm opacity-80">
                            Click "Start Reading" to begin
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {!isListening ? (
                      <Button
                        onClick={startNFCListening}
                        disabled={!nfcSupported}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        <Radio className="mr-2 h-4 w-4" />
                        Start Reading
                      </Button>
                    ) : (
                      <Button
                        onClick={stopNFCListening}
                        variant="destructive"
                        className="flex-1"
                      >
                        <WifiOff className="mr-2 h-4 w-4" />
                        Stop Reading
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        stopNFCListening();
                        setTimeout(() => startNFCListening(), 500);
                      }}
                      disabled={!nfcSupported || !isListening}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      Enter NFC Card ID Manually
                    </label>
                    <Input
                      placeholder="e.g., NFC001234"
                      value={manualCardId}
                      onChange={(e) =>
                        setManualCardId(e.target.value.toUpperCase())
                      }
                    />
                    <Button
                      onClick={handleManualEntry}
                      className="w-full bg-eduos-primary hover:bg-eduos-secondary"
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Record Attendance
                    </Button>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-sm text-amber-700">
                      <strong>Note:</strong> Manual entry should only be used
                      when the NFC reader is not functioning properly or for
                      testing purposes.
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
                How to Use NFC Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">For Staff Members:</h4>
                  <ol className="text-sm space-y-2 list-decimal list-inside text-gray-600">
                    <li>Ensure you have your assigned NFC card</li>
                    <li>Wait for "Start Reading" status</li>
                    <li>Hold your card near the NFC reader</li>
                    <li>Wait for confirmation beep/message</li>
                  </ol>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">For Administrators:</h4>
                  <ol className="text-sm space-y-2 list-decimal list-inside text-gray-600">
                    <li>Issue NFC cards to staff members</li>
                    <li>Register cards in the system</li>
                    <li>Monitor attendance in real-time</li>
                    <li>Manage lost/stolen cards</li>
                  </ol>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">
                      Advantages of NFC
                    </h5>
                    <p className="text-sm text-blue-700">
                      Fast, contactless, secure, works without internet, and
                      supports multiple card types
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Statistics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent NFC Check-ins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{log.name}</p>
                      <p className="text-xs text-gray-500">{log.department}</p>
                      <p className="text-xs text-purple-600">{log.cardId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{log.checkInTime}</p>
                      {getStatusBadge(log.status)}
                    </div>
                  </div>
                ))}

                {recentLogs.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No NFC check-ins yet today</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Card Registry Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Cards</span>
                  <span className="font-semibold">{nfcCards.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active</span>
                  <span className="font-semibold text-green-600">
                    {nfcCards.filter((card) => card.status === "active").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lost/Disabled</span>
                  <span className="font-semibold text-red-600">
                    {
                      nfcCards.filter(
                        (card) =>
                          card.status === "lost" || card.status === "disabled"
                      ).length
                    }
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">NFC Usage Today</span>
                    <span className="font-bold text-purple-600">
                      {recentLogs.length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold text-green-600">
                    {recentLogs.length > 0
                      ? Math.round(
                          (recentLogs.filter((log) => log.status === "success")
                            .length /
                            recentLogs.length) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Avg. Response Time</span>
                  <span className="font-semibold text-blue-600">0.8s</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Reader Status</span>
                  <Badge
                    className={`text-xs ${
                      nfcSupported && isNFCEnabled
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {nfcSupported && isNFCEnabled ? "Online" : "Offline"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Card Management Modal */}
      <Dialog open={showCardManager} onOpenChange={setShowCardManager}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              NFC Card Management
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Assign New Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assign New Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Staff Member
                    </label>
                    <Select
                      value={selectedStaff}
                      onValueChange={setSelectedStaff}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        {staff
                          .filter((s) => !s.cardId)
                          .map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name} ({member.id})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Card ID
                    </label>
                    <Input
                      placeholder="e.g., NFC001239"
                      value={cardId}
                      onChange={(e) => setCardId(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>
                <Button
                  onClick={assignCard}
                  disabled={!selectedStaff || !cardId}
                  className="mt-4 bg-purple-600 hover:bg-purple-700"
                >
                  Assign Card
                </Button>
              </CardContent>
            </Card>

            {/* Current Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registered Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nfcCards.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">{card.staffName}</p>
                          <p className="text-sm text-gray-500">
                            {card.id} • Assigned: {card.assignedDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getCardStatusBadge(card.status)}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            toggleCardStatus(
                              card.id,
                              card.status === "active" ? "disabled" : "active"
                            )
                          }
                        >
                          {card.status === "active" ? "Disable" : "Enable"}
                        </Button>
                        {card.status === "active" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => toggleCardStatus(card.id, "lost")}
                          >
                            Mark Lost
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NFCAttendance;
