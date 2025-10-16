import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useToast } from "../../../hooks/use-toast";
import {
  Search,
  PlusCircle,
  Download,
  Copy,
  ArrowUpDown,
  Settings,
  FileText,
  Eye,
  Trash2,
  Shield,
  Hash,
  Users,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  BarChart3,
} from "lucide-react";

const GenerateApplicationPin = () => {
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
    pinLength: 12,
    format: "xxxx-xxxx-xxxx",
    session: "2024/2025",
    prefix: "APP",
    includeNumbers: true,
    includeLetters: false,
    includeSpecialChars: false,
    expiryDays: 30,
    description: "",
  });

  // Mock data for application pins with enhanced structure
  const [pins, setPins] = useState([
    {
      id: 1,
      pin: "APP-7835-4592-1928",
      usedBy: "Unassigned",
      session: "2024/2025",
      createdDate: "2024-01-15",
      expiryDate: "2024-02-14",
      status: "active",
      usedDate: null,
      applicantName: null,
      applicantEmail: null,
      description: "Batch #001 - General Application",
      batchId: "BATCH001",
    },
    {
      id: 2,
      pin: "APP-1256-7890-3421",
      usedBy: "John Doe",
      session: "2024/2025",
      createdDate: "2024-01-15",
      expiryDate: "2024-02-14",
      status: "used",
      usedDate: "2024-01-20",
      applicantName: "John Doe",
      applicantEmail: "john.doe@email.com",
      description: "Batch #001 - General Application",
      batchId: "BATCH001",
    },
    {
      id: 3,
      pin: "APP-5432-8765-9012",
      usedBy: "Unassigned",
      session: "2024/2025",
      createdDate: "2024-01-15",
      expiryDate: "2024-02-14",
      status: "active",
      usedDate: null,
      applicantName: null,
      applicantEmail: null,
      description: "Batch #001 - General Application",
      batchId: "BATCH001",
    },
    {
      id: 4,
      pin: "APP-9876-5432-1098",
      usedBy: "Mary Smith",
      session: "2024/2025",
      createdDate: "2024-01-16",
      expiryDate: "2024-02-15",
      status: "used",
      usedDate: "2024-01-22",
      applicantName: "Mary Smith",
      applicantEmail: "mary.smith@email.com",
      description: "Batch #002 - Science Department",
      batchId: "BATCH002",
    },
    {
      id: 5,
      pin: "APP-2468-1357-9081",
      usedBy: "Unassigned",
      session: "2024/2025",
      createdDate: "2024-01-16",
      expiryDate: "2024-01-10",
      status: "expired",
      usedDate: null,
      applicantName: null,
      applicantEmail: null,
      description: "Batch #002 - Science Department",
      batchId: "BATCH002",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("all");
  const [sessionFilter, setSessionFilter] = useState("all");

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

    // Default format: xxxx-xxxx-xxxx
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
      pin.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || pin.status === statusFilter;
    const matchesSession =
      sessionFilter === "all" || pin.session === sessionFilter;

    return matchesSearch && matchesStatus && matchesSession;
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
      const batchId = `BATCH${String(Date.now()).slice(-3)}`;
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
          applicantName: null,
          applicantEmail: null,
          description:
            generateForm.description || `Batch ${batchId} - Application PINs`,
          batchId: batchId,
        });
      }

      setPins((prev) => [...newPins, ...prev]);
      setShowGenerateDialog(false);
      setGenerateForm({
        quantity: 10,
        pinLength: 12,
        format: "xxxx-xxxx-xxxx",
        session: "2024/2025",
        prefix: "APP",
        includeNumbers: true,
        includeLetters: false,
        includeSpecialChars: false,
        expiryDays: 30,
        description: "",
      });

      toast({
        title: "Success",
        description: `Generated ${generateForm.quantity} application PINs successfully.`,
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
      a.download = `application_pins_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Application PINs exported successfully.",
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
          Application PIN Management
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
              <Users className="w-8 h-8 text-blue-500" />
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                className="pl-10"
                placeholder="Search PINs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
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
                <SelectValue placeholder="Filter by session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="2024/2025">2024/2025</SelectItem>
                <SelectItem value="2023/2024">2023/2024</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSessionFilter("all");
              }}
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PINs Table */}
      <Card className="mt-3 animate-fade-in delay-200 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Application PINs ({sortedPins.length})
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
                    onClick={() => handleSort("session")}
                  >
                    <div className="flex items-center">
                      Session
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
                    <TableCell>{pin.session}</TableCell>
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
              Generate Application PINs
            </DialogTitle>
            <DialogDescription>
              Configure PIN generation settings and create secure application
              PINs.
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
                    pinLength: parseInt(e.target.value) || 12,
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
                  <SelectItem value="xxxx-xxxx-xxxx">xxxx-xxxx-xxxx</SelectItem>
                  <SelectItem value="xxxxxx-xxxxxx">xxxxxx-xxxxxx</SelectItem>
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
                placeholder="e.g., APP"
              />
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
                    expiryDays: parseInt(e.target.value) || 30,
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
                placeholder="Describe this batch of PINs..."
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
              PIN Details
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
                      <p className="text-sm mt-1">{viewingPin.applicantName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Used Date</Label>
                      <p className="text-sm mt-1">{viewingPin.usedDate}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm font-medium">
                        Applicant Email
                      </Label>
                      <p className="text-sm mt-1">
                        {viewingPin.applicantEmail}
                      </p>
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

export default GenerateApplicationPin;
