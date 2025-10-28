import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { useToast } from "../../../hooks/use-toast";
import {
  Search,
  PlusCircle,
  Download,
  Copy,
  ArrowUpDown,
  Eye,
  Trash2,
  RefreshCw,
  Settings,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Hash,
  TrendingUp,
  BarChart3,
  GraduationCap,
  ClipboardList,
  BookOpen,
  Calendar,
} from "lucide-react";

const GenerateResultPin = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewingPin, setViewingPin] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Generation settings
  const [generateForm, setGenerateForm] = useState({
    quantity: 10,
    pinLength: 10,
    format: "xxx-xxx-xxxx",
    session: "2024/2025",
    prefix: "RST",
    examType: "Midterm",
    class: "All Classes",
    includeNumbers: true,
    includeLetters: false,
    includeSpecialChars: false,
    expiryDays: 7,
    description: "",
  });

  // Mock data for result pins with enhanced structure
  const [pins, setPins] = useState([
    {
      id: 1,
      pin: "RST-485-7293",
      usedBy: "Unassigned",
      session: "2024/2025",
      createdDate: "2024-01-15",
      expiryDate: "2024-01-22",
      status: "active",
      usedDate: null,
      studentName: null,
      studentId: null,
      examType: "Midterm",
      class: "JSS 1A",
      description: "Batch #001 - Midterm Results",
      batchId: "RSTBATCH001",
    },
    {
      id: 2,
      pin: "RST-162-5890",
      usedBy: "Sarah Johnson",
      session: "2024/2025",
      createdDate: "2024-01-15",
      expiryDate: "2024-01-22",
      status: "used",
      usedDate: "2024-01-18",
      studentName: "Sarah Johnson",
      studentId: "STU001",
      examType: "Midterm",
      class: "JSS 1A",
      description: "Batch #001 - Midterm Results",
      batchId: "RSTBATCH001",
    },
    {
      id: 3,
      pin: "RST-734-8251",
      usedBy: "Unassigned",
      session: "2024/2025",
      createdDate: "2024-01-15",
      expiryDate: "2024-01-22",
      status: "active",
      usedDate: null,
      studentName: null,
      studentId: null,
      examType: "Midterm",
      class: "JSS 1A",
      description: "Batch #001 - Midterm Results",
      batchId: "RSTBATCH001",
    },
    {
      id: 4,
      pin: "RST-908-1647",
      usedBy: "Michael Chen",
      session: "2024/2025",
      createdDate: "2024-01-16",
      expiryDate: "2024-01-23",
      status: "used",
      usedDate: "2024-01-19",
      studentName: "Michael Chen",
      studentId: "STU002",
      examType: "Final",
      class: "JSS 2B",
      description: "Batch #002 - Final Results",
      batchId: "RSTBATCH002",
    },
    {
      id: 5,
      pin: "RST-235-4789",
      usedBy: "Unassigned",
      session: "2024/2025",
      createdDate: "2024-01-10",
      expiryDate: "2024-01-17",
      status: "expired",
      usedDate: null,
      studentName: null,
      studentId: null,
      examType: "Quiz",
      class: "JSS 3C",
      description: "Batch #003 - Quiz Results",
      batchId: "RSTBATCH003",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("all");
  const [sessionFilter, setSessionFilter] = useState("all");
  const [examTypeFilter, setExamTypeFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  // PIN generation functions
  const generateSecurePin = (length, options) => {
    const numbers = "0123456789";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*";

    let charset = "";
    if (options.includeNumbers) charset += numbers;
    if (options.includeLetters) charset += letters;
    if (options.includeSpecialChars) charset += specialChars;

    if (!charset) charset = numbers; // Fallback to numbers

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  };

  const formatPin = (pin, format) => {
    if (format === "plain") return pin;

    // Default format: xxx-xxx-xxxx
    const segments = format.split("-");
    let formatted = "";
    let pinIndex = 0;

    segments.forEach((segment, index) => {
      if (index > 0) formatted += "-";
      formatted += pin.substring(pinIndex, pinIndex + segment.length);
      pinIndex += segment.length;
    });

    return formatted;
  };

  // Filter and sort pins
  const filteredPins = pins.filter((pin) => {
    const matchesSearch =
      pin.pin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pin.usedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pin.session.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pin.examType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pin.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pin.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || pin.status === statusFilter;
    const matchesSession =
      sessionFilter === "all" || pin.session === sessionFilter;
    const matchesExamType =
      examTypeFilter === "all" || pin.examType === examTypeFilter;
    const matchesClass = classFilter === "all" || pin.class === classFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesSession &&
      matchesExamType &&
      matchesClass
    );
  });

  const sortedPins = [...filteredPins].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleGeneratePins = async () => {
    if (generateForm.quantity < 1 || generateForm.quantity > 1000) {
      toast({
        title: "Validation Error",
        description: "Quantity must be between 1 and 1000.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (generateForm.pinLength < 4 || generateForm.pinLength > 32) {
      toast({
        title: "Validation Error",
        description: "PIN length must be between 4 and 32 characters.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newPins = [];
      const batchId = `RSTBATCH${String(Date.now()).slice(-3)}`;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + generateForm.expiryDays);

      for (let i = 0; i < generateForm.quantity; i++) {
        const rawPin = generateSecurePin(generateForm.pinLength, generateForm);
        const formattedPin = generateForm.prefix
          ? `${generateForm.prefix}-${formatPin(
              rawPin,
              generateForm.format.replace(/^[A-Z]+-/, "")
            )}`
          : formatPin(rawPin, generateForm.format);

        newPins.push({
          id: Date.now() + i,
          pin: formattedPin,
          usedBy: "Unassigned",
          session: generateForm.session,
          createdDate: new Date().toISOString().split("T")[0],
          expiryDate: expiryDate.toISOString().split("T")[0],
          status: "active",
          usedDate: null,
          studentName: null,
          studentId: null,
          examType: generateForm.examType,
          class: generateForm.class,
          description:
            generateForm.description ||
            `Batch ${batchId} - ${generateForm.examType} Results`,
          batchId: batchId,
        });
      }

      setPins((prev) => [...newPins, ...prev]);
      setShowGenerateDialog(false);
      setGenerateForm({
        quantity: 10,
        pinLength: 10,
        format: "xxx-xxx-xxxx",
        session: "2024/2025",
        prefix: "RST",
        examType: "Midterm",
        class: "All Classes",
        includeNumbers: true,
        includeLetters: false,
        includeSpecialChars: false,
        expiryDays: 7,
        description: "",
      });

      toast({
        title: "Success",
        description: `Generated ${generateForm.quantity} result PINs successfully.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PINs. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeletePin = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPins((prev) => prev.filter((pin) => pin.id !== deletingId));
      toast({
        title: "Success",
        description: "PIN deleted successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete PIN. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setShowDeleteDialog(false);
      setDeletingId(null);
    }
  };

  const handleExportPins = () => {
    try {
      const exportData = sortedPins.map((pin) => ({
        PIN: pin.pin,
        Status: pin.status,
        "Used By": pin.usedBy,
        Session: pin.session,
        "Exam Type": pin.examType,
        Class: pin.class,
        "Created Date": pin.createdDate,
        "Expiry Date": pin.expiryDate,
        "Used Date": pin.usedDate || "N/A",
        Description: pin.description,
        "Batch ID": pin.batchId,
      }));

      const csv = [
        Object.keys(exportData[0]).join(","),
        ...exportData.map((row) =>
          Object.values(row)
            .map((val) => `"${val}"`)
            .join(",")
        ),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `result_pins_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Result PINs exported successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export PINs. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleCopyAllPins = () => {
    const pinList = sortedPins.map((pin) => pin.pin).join("\n");
    navigator.clipboard
      .writeText(pinList)
      .then(() => {
        toast({
          title: "Success",
          description: `Copied ${sortedPins.length} PINs to clipboard.`,
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy PINs to clipboard.",
          variant: "destructive",
          duration: 4000,
        });
      });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "used":
        return <XCircle className="w-4 h-4 text-blue-500" />;
      case "expired":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "text-green-600 bg-green-50",
      used: "text-blue-600 bg-blue-50",
      expired: "text-red-600 bg-red-50",
    };
    return colors[status] || "text-gray-600 bg-gray-50";
  };

  const getStats = () => {
    const total = pins.length;
    const active = pins.filter((p) => p.status === "active").length;
    const used = pins.filter((p) => p.status === "used").length;
    const expired = pins.filter((p) => p.status === "expired").length;
    const usageRate = total > 0 ? ((used / total) * 100).toFixed(1) : 0;

    return { total, active, used, expired, usageRate };
  };

  const stats = getStats();

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Result PIN Management
        </h2>
        <div className="flex gap-3">
          <Button
            onClick={handleCopyAllPins}
            className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Copy className="mr-2 h-4 w-4" /> Copy All PINs
          </Button>
          <Button
            onClick={handleExportPins}
            className="bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Download className="mr-2 h-4 w-4" /> Export PINs
          </Button>
          <Button
            onClick={() => setShowGenerateDialog(true)}
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Generate New PINs
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Hash className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total PINs</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in delay-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Active PINs</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in delay-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Used PINs</p>
                <p className="text-2xl font-bold">{stats.used}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in delay-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Expired PINs</p>
                <p className="text-2xl font-bold">{stats.expired}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in delay-400">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Usage Rate</p>
                <p className="text-2xl font-bold">{stats.usageRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mt-3 animate-fade-in delay-100">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 w-4 h-4 pointer-events-none" />
              <Input
                className="pl-3 pr-10"
                placeholder="Search PINs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sessionFilter} onValueChange={setSessionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="2024/2025">2024/2025</SelectItem>
                <SelectItem value="2023/2024">2023/2024</SelectItem>
              </SelectContent>
            </Select>
            <Select value={examTypeFilter} onValueChange={setExamTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Exam Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Midterm">Midterm</SelectItem>
                <SelectItem value="Final">Final</SelectItem>
                <SelectItem value="Quiz">Quiz</SelectItem>
              </SelectContent>
            </Select>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="JSS 1A">JSS 1A</SelectItem>
                <SelectItem value="JSS 2B">JSS 2B</SelectItem>
                <SelectItem value="JSS 3C">JSS 3C</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSessionFilter("all");
                setExamTypeFilter("all");
                setClassFilter("all");
              }}
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PINs Table */}
      <Card className="mt-3 animate-fade-in delay-200 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Result PINs ({sortedPins.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center">
                      S/N
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("pin")}
                  >
                    <div className="flex items-center">
                      PIN
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("usedBy")}
                  >
                    <div className="flex items-center">
                      Used By
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("examType")}
                  >
                    <div className="flex items-center">
                      Exam Type
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("class")}
                  >
                    <div className="flex items-center">
                      Class
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("createdDate")}
                  >
                    <div className="flex items-center">
                      Created
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPins.map((pin, index) => (
                  <TableRow
                    key={pin.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-mono font-medium">
                      {pin.pin}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(pin.status)}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                            pin.status
                          )}`}
                        >
                          {pin.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{pin.usedBy}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        {pin.examType}
                      </span>
                    </TableCell>
                    <TableCell>{pin.class}</TableCell>
                    <TableCell>{pin.createdDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          onClick={() => {
                            setViewingPin(pin);
                            setShowViewDialog(true);
                          }}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => {
                            setDeletingId(pin.id);
                            setShowDeleteDialog(true);
                          }}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Generate PINs Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Generate Result PINs
            </DialogTitle>
            <DialogDescription>
              Configure PIN generation settings for result checking access.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (1-1000)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="1000"
                value={generateForm.quantity}
                onChange={(e) =>
                  setGenerateForm((prev) => ({
                    ...prev,
                    quantity: parseInt(e.target.value) || 1,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinLength">PIN Length (4-32)</Label>
              <Input
                id="pinLength"
                type="number"
                min="4"
                max="32"
                value={generateForm.pinLength}
                onChange={(e) =>
                  setGenerateForm((prev) => ({
                    ...prev,
                    pinLength: parseInt(e.target.value) || 10,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">Format Pattern</Label>
              <Select
                value={generateForm.format}
                onValueChange={(value) =>
                  setGenerateForm((prev) => ({ ...prev, format: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xxx-xxx-xxxx">xxx-xxx-xxxx</SelectItem>
                  <SelectItem value="xxxx-xxxx">xxxx-xxxx</SelectItem>
                  <SelectItem value="plain">Plain (no formatting)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prefix">Prefix</Label>
              <Input
                id="prefix"
                value={generateForm.prefix}
                onChange={(e) =>
                  setGenerateForm((prev) => ({
                    ...prev,
                    prefix: e.target.value,
                  }))
                }
                placeholder="e.g., RST"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="examType">Exam Type</Label>
              <Select
                value={generateForm.examType}
                onValueChange={(value) =>
                  setGenerateForm((prev) => ({ ...prev, examType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Midterm">Midterm Exam</SelectItem>
                  <SelectItem value="Final">Final Exam</SelectItem>
                  <SelectItem value="Quiz">Quiz</SelectItem>
                  <SelectItem value="Assignment">Assignment</SelectItem>
                  <SelectItem value="Test">Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select
                value={generateForm.class}
                onValueChange={(value) =>
                  setGenerateForm((prev) => ({ ...prev, class: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Classes">All Classes</SelectItem>
                  <SelectItem value="JSS 1A">JSS 1A</SelectItem>
                  <SelectItem value="JSS 1B">JSS 1B</SelectItem>
                  <SelectItem value="JSS 2A">JSS 2A</SelectItem>
                  <SelectItem value="JSS 2B">JSS 2B</SelectItem>
                  <SelectItem value="JSS 3A">JSS 3A</SelectItem>
                  <SelectItem value="JSS 3B">JSS 3B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session">Session</Label>
              <Select
                value={generateForm.session}
                onValueChange={(value) =>
                  setGenerateForm((prev) => ({ ...prev, session: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024/2025">2024/2025</SelectItem>
                  <SelectItem value="2023/2024">2023/2024</SelectItem>
                  <SelectItem value="2022/2023">2022/2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDays">Expiry (Days)</Label>
              <Input
                id="expiryDays"
                type="number"
                min="1"
                max="365"
                value={generateForm.expiryDays}
                onChange={(e) =>
                  setGenerateForm((prev) => ({
                    ...prev,
                    expiryDays: parseInt(e.target.value) || 7,
                  }))
                }
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Character Types</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={generateForm.includeNumbers}
                    onChange={(e) =>
                      setGenerateForm((prev) => ({
                        ...prev,
                        includeNumbers: e.target.checked,
                      }))
                    }
                  />
                  Numbers
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={generateForm.includeLetters}
                    onChange={(e) =>
                      setGenerateForm((prev) => ({
                        ...prev,
                        includeLetters: e.target.checked,
                      }))
                    }
                  />
                  Letters
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={generateForm.includeSpecialChars}
                    onChange={(e) =>
                      setGenerateForm((prev) => ({
                        ...prev,
                        includeSpecialChars: e.target.checked,
                      }))
                    }
                  />
                  Special Characters
                </label>
              </div>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={generateForm.description}
                onChange={(e) =>
                  setGenerateForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe this batch of result PINs..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowGenerateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGeneratePins}
              disabled={isGenerating}
              className="bg-eduos-primary hover:bg-eduos-secondary"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Generate PINs
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View PIN Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Result PIN Details
            </DialogTitle>
          </DialogHeader>
          {viewingPin && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">PIN</Label>
                  <p className="text-lg font-mono bg-gray-100 p-2 rounded">
                    {viewingPin.pin}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(viewingPin.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        viewingPin.status
                      )}`}
                    >
                      {viewingPin.status}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Exam Type</Label>
                  <p className="text-sm mt-1">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {viewingPin.examType}
                    </span>
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Class</Label>
                  <p className="text-sm mt-1">{viewingPin.class}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Session</Label>
                  <p className="text-sm mt-1">{viewingPin.session}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Batch ID</Label>
                  <p className="text-sm mt-1">{viewingPin.batchId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created Date</Label>
                  <p className="text-sm mt-1">{viewingPin.createdDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Expiry Date</Label>
                  <p className="text-sm mt-1">{viewingPin.expiryDate}</p>
                </div>
                {viewingPin.status === "used" && (
                  <>
                    <div>
                      <Label className="text-sm font-medium">Used By</Label>
                      <p className="text-sm mt-1">{viewingPin.studentName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Student ID</Label>
                      <p className="text-sm mt-1">{viewingPin.studentId}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm font-medium">Used Date</Label>
                      <p className="text-sm mt-1">{viewingPin.usedDate}</p>
                    </div>
                  </>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm mt-1">{viewingPin.description}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this PIN? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePin}>
              Delete PIN
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateResultPin;
