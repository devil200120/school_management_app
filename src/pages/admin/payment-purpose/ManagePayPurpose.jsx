import React, { useState, useEffect } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
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
import { useToast } from "../../../hooks/use-toast";
import {
  Search,
  FileText,
  Edit,
  Trash2,
  Eye,
  Download,
  Filter,
  DollarSign,
  TrendingUp,
  Users,
  BarChart,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Book,
  Building,
  Trophy,
  Bus,
} from "lucide-react";

const ManagePayPurpose = () => {
  const { toast } = useToast();
  const [paymentPurposes, setPaymentPurposes] = useState([
    {
      id: 1,
      name: "Tuition Fee",
      category: "academic",
      description: "Regular academic tuition fees for semester/term",
      amount: 1500.0,
      frequency: "semester",
      mandatory: true,
      dueDate: "15th of each month",
      status: "active",
      createdAt: "2024-01-15",
      totalCollected: 125000.0,
      studentsCount: 250,
      lastPayment: "2024-12-15",
    },
    {
      id: 2,
      name: "Examination Fee",
      category: "academic",
      description: "Fees for semester examinations and result processing",
      amount: 75.0,
      frequency: "semester",
      mandatory: true,
      dueDate: "Before exam period",
      status: "active",
      createdAt: "2024-01-10",
      totalCollected: 18750.0,
      studentsCount: 250,
      lastPayment: "2024-12-10",
    },
    {
      id: 3,
      name: "Library Fee",
      category: "facility",
      description: "Access to library resources and services",
      amount: 50.0,
      frequency: "annual",
      mandatory: false,
      dueDate: "Start of academic year",
      status: "active",
      createdAt: "2024-01-08",
      totalCollected: 8500.0,
      studentsCount: 170,
      lastPayment: "2024-12-08",
    },
    {
      id: 4,
      name: "Sports Fee",
      category: "extracurricular",
      description: "Sports activities and equipment maintenance",
      amount: 25.0,
      frequency: "semester",
      mandatory: false,
      dueDate: "Optional",
      status: "inactive",
      createdAt: "2024-01-05",
      totalCollected: 3750.0,
      studentsCount: 150,
      lastPayment: "2024-11-20",
    },
    {
      id: 5,
      name: "Transport Fee",
      category: "service",
      description: "School bus transportation services",
      amount: 100.0,
      frequency: "monthly",
      mandatory: false,
      dueDate: "1st of each month",
      status: "active",
      createdAt: "2024-01-03",
      totalCollected: 12000.0,
      studentsCount: 120,
      lastPayment: "2024-12-01",
    },
  ]);

  const [filteredPurposes, setFilteredPurposes] = useState(paymentPurposes);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewingPurpose, setViewingPurpose] = useState(null);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "academic", label: "Academic Fees", icon: Book },
    { value: "facility", label: "Facility Fees", icon: Building },
    { value: "extracurricular", label: "Extracurricular", icon: Trophy },
    { value: "service", label: "Service Fees", icon: Bus },
  ];

  // Filter purposes based on search and filters
  useEffect(() => {
    let filtered = paymentPurposes;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (purpose) =>
          purpose.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          purpose.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          purpose.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (purpose) => purpose.category === categoryFilter
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((purpose) => purpose.status === statusFilter);
    }

    setFilteredPurposes(filtered);
  }, [paymentPurposes, searchTerm, categoryFilter, statusFilter]);

  const handleDelete = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPaymentPurposes((prev) =>
        prev.filter((purpose) => purpose.id !== deletingId)
      );
      toast({
        title: "Success",
        description: "Payment purpose deleted successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete payment purpose. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setShowDeleteDialog(false);
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (purposeId) => {
    try {
      const purpose = paymentPurposes.find((p) => p.id === purposeId);
      const newStatus = purpose.status === "active" ? "inactive" : "active";

      setPaymentPurposes((prev) =>
        prev.map((p) => (p.id === purposeId ? { ...p, status: newStatus } : p))
      );

      toast({
        title: "Success",
        description: `Payment purpose ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payment purpose status.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleViewPurpose = (purpose) => {
    setViewingPurpose(purpose);
    setShowViewDialog(true);
  };

  const handleExportData = () => {
    try {
      const exportData = filteredPurposes.map((purpose) => ({
        "Purpose Name": purpose.name,
        Category: purpose.category,
        Amount: `$${purpose.amount}`,
        Frequency: purpose.frequency,
        Status: purpose.status,
        Mandatory: purpose.mandatory ? "Yes" : "No",
        "Total Collected": `$${purpose.totalCollected}`,
        "Students Count": purpose.studentsCount,
        "Created Date": purpose.createdAt,
        "Last Payment": purpose.lastPayment,
      }));

      const csv = [
        Object.keys(exportData[0]).join(","),
        ...exportData.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `payment_purposes_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Payment purposes data exported successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find((c) => c.value === category);
    const Icon = categoryObj?.icon || FileText;
    return <Icon className="w-4 h-4" />;
  };

  const getCategoryLabel = (category) => {
    const categoryObj = categories.find((c) => c.value === category);
    return categoryObj?.label || category;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "text-green-600 bg-green-50",
      inactive: "text-red-600 bg-red-50",
    };
    return colors[status] || colors.active;
  };

  const getStatusIcon = (status) => {
    return status === "active" ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  const getTotalRevenue = () => {
    return filteredPurposes.reduce(
      (sum, purpose) => sum + purpose.totalCollected,
      0
    );
  };

  const getActiveCount = () => {
    return filteredPurposes.filter((purpose) => purpose.status === "active")
      .length;
  };

  const getTotalStudents = () => {
    return filteredPurposes.reduce(
      (sum, purpose) => sum + purpose.studentsCount,
      0
    );
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Payment Purpose Management
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Purposes</p>
                <p className="text-2xl font-bold">{filteredPurposes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in delay-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Active Purposes</p>
                <p className="text-2xl font-bold">{getActiveCount()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in delay-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${getTotalRevenue().toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in delay-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold">{getTotalStudents()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="mt-3 animate-fade-in delay-100 max-w-6xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search payment purposes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-2">
                      {category.icon && <category.icon className="w-4 h-4" />}
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleExportData}
              className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Purposes Table */}
      <Card className="mt-3 animate-fade-in delay-200 max-w-6xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Payment Purposes ({filteredPurposes.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {filteredPurposes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No payment purposes found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Purpose
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Revenue
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Students
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPurposes.map((purpose) => (
                    <tr
                      key={purpose.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-gray-800">
                            {purpose.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {purpose.frequency}
                          </div>
                          {purpose.mandatory && (
                            <span className="inline-block px-2 py-1 rounded-full text-xs bg-orange-50 text-orange-600 mt-1">
                              Mandatory
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(purpose.category)}
                          <span className="text-sm">
                            {getCategoryLabel(purpose.category)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">${purpose.amount}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(purpose.status)}
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                              purpose.status
                            )}`}
                          >
                            {purpose.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="font-medium text-green-600">
                            ${purpose.totalCollected.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Total collected
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="font-medium">
                            {purpose.studentsCount}
                          </div>
                          <div className="text-xs text-gray-500">Enrolled</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          <Button
                            onClick={() => handleViewPurpose(purpose)}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button
                            onClick={() => handleToggleStatus(purpose.id)}
                            variant={
                              purpose.status === "active"
                                ? "destructive"
                                : "default"
                            }
                            size="sm"
                            className="text-xs"
                          >
                            {purpose.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                          <Button
                            onClick={() => {
                              setDeletingId(purpose.id);
                              setShowDeleteDialog(true);
                            }}
                            variant="destructive"
                            size="sm"
                            className="text-xs"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Purpose Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Payment Purpose Details
            </DialogTitle>
          </DialogHeader>
          {viewingPurpose && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Purpose Name
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {viewingPurpose.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Category
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    {getCategoryIcon(viewingPurpose.category)}
                    <span className="text-sm text-gray-900">
                      {getCategoryLabel(viewingPurpose.category)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Amount
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    ${viewingPurpose.amount}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Frequency
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {viewingPurpose.frequency}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Status
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(viewingPurpose.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        viewingPurpose.status
                      )}`}
                    >
                      {viewingPurpose.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Mandatory
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {viewingPurpose.mandatory ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </label>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    ${viewingPurpose.totalCollected.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Students Enrolled
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {viewingPurpose.studentsCount}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Created Date
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {viewingPurpose.createdAt}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Last Payment
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {viewingPurpose.lastPayment}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Due Date/Schedule
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {viewingPurpose.dueDate}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Description
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {viewingPurpose.description}
                </p>
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
              Are you sure you want to delete this payment purpose? This action
              cannot be undone and may affect financial tracking.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Purpose
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePayPurpose;
