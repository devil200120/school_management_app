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
import { useToast } from "../../../hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Book,
  Trophy,
  Bus,
  Building,
  FileText,
  Target,
  TrendingUp,
  Calendar,
  Users,
} from "lucide-react";

const AddPaymentPurpose = () => {
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
      status: "active",
      createdAt: "2024-01-05",
      totalCollected: 3750.0,
      studentsCount: 150,
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
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    amount: "",
    frequency: "",
    mandatory: false,
    dueDate: "",
  });

  const [editingPurpose, setEditingPurpose] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewingPurpose, setViewingPurpose] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "academic", label: "Academic Fees", icon: Book },
    { value: "facility", label: "Facility Fees", icon: Building },
    { value: "extracurricular", label: "Extracurricular", icon: Trophy },
    { value: "service", label: "Service Fees", icon: Bus },
    { value: "other", label: "Other Fees", icon: FileText },
  ];

  const frequencies = [
    { value: "monthly", label: "Monthly" },
    { value: "semester", label: "Semester" },
    { value: "annual", label: "Annual" },
    { value: "one-time", label: "One-time" },
  ];

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      amount: "",
      frequency: "",
      mandatory: false,
      dueDate: "",
    });
    setEditingPurpose(null);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.category || !formData.amount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const purposeData = {
        ...formData,
        id: editingPurpose ? editingPurpose.id : Date.now(),
        amount: parseFloat(formData.amount),
        status: "active",
        createdAt: editingPurpose
          ? editingPurpose.createdAt
          : new Date().toISOString().split("T")[0],
        totalCollected: editingPurpose ? editingPurpose.totalCollected : 0,
        studentsCount: editingPurpose ? editingPurpose.studentsCount : 0,
      };

      if (editingPurpose) {
        setPaymentPurposes((prev) =>
          prev.map((purpose) =>
            purpose.id === editingPurpose.id ? purposeData : purpose
          )
        );
        toast({
          title: "Success",
          description: "Payment purpose updated successfully.",
          duration: 3000,
        });
      } else {
        setPaymentPurposes((prev) => [purposeData, ...prev]);
        toast({
          title: "Success",
          description: "Payment purpose added successfully.",
          duration: 3000,
        });
      }

      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save payment purpose. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (purpose) => {
    setFormData({
      name: purpose.name,
      category: purpose.category,
      description: purpose.description,
      amount: purpose.amount.toString(),
      frequency: purpose.frequency,
      mandatory: purpose.mandatory,
      dueDate: purpose.dueDate,
    });
    setEditingPurpose(purpose);
  };

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

  const getTotalRevenue = () => {
    return paymentPurposes.reduce(
      (sum, purpose) => sum + purpose.totalCollected,
      0
    );
  };

  const getActiveCount = () => {
    return paymentPurposes.filter((purpose) => purpose.status === "active")
      .length;
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
              <Target className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Purposes</p>
                <p className="text-2xl font-bold">{paymentPurposes.length}</p>
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
                <p className="text-sm text-gray-600">Paying Students</p>
                <p className="text-2xl font-bold">
                  {paymentPurposes.reduce((sum, p) => sum + p.studentsCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {editingPurpose
              ? "Edit Payment Purpose"
              : "Add New Payment Purpose"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Purpose Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g. Tuition Fee, Library Fee, etc."
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4" />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, amount: e.target.value }))
                }
                placeholder="0.00"
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Payment Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, frequency: value }))
                }
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date/Schedule</Label>
              <Input
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
                placeholder="e.g. 15th of each month"
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="mandatory"
                  checked={formData.mandatory}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      mandatory: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <Label htmlFor="mandatory">Mandatory Payment</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Brief description of this payment purpose"
              className="min-h-[100px] transition-all duration-300 focus:border-eduos-primary"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              {isSubmitting
                ? "Saving..."
                : editingPurpose
                ? "Update Purpose"
                : "Add Purpose"}
            </Button>
            {editingPurpose && (
              <Button onClick={resetForm} variant="outline" className="flex-1">
                Cancel Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Purposes List */}
      <Card className="mt-3 animate-fade-in delay-200 max-w-6xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Payment Purposes ({paymentPurposes.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {paymentPurposes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                No payment purposes configured. Add your first payment purpose
                above.
              </p>
            </div>
          ) : (
            paymentPurposes.map((purpose) => (
              <div
                key={purpose.id}
                className="p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getCategoryIcon(purpose.category)}
                      <h3 className="font-medium text-gray-800 text-lg">
                        {purpose.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          purpose.status
                        )}`}
                      >
                        {purpose.status}
                      </span>
                      {purpose.mandatory && (
                        <span className="px-2 py-1 rounded-full text-xs bg-orange-50 text-orange-600">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {purpose.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                      <div>
                        <span className="font-medium">Amount:</span> $
                        {purpose.amount}
                      </div>
                      <div>
                        <span className="font-medium">Frequency:</span>{" "}
                        {purpose.frequency}
                      </div>
                      <div>
                        <span className="font-medium">Revenue:</span> $
                        {purpose.totalCollected.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Students:</span>{" "}
                        {purpose.studentsCount}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
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
                      onClick={() => handleEdit(purpose)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleToggleStatus(purpose.id)}
                      variant={
                        purpose.status === "active" ? "destructive" : "default"
                      }
                      size="sm"
                      className="text-xs"
                    >
                      {purpose.status === "active" ? "Deactivate" : "Activate"}
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
                </div>
              </div>
            ))
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
                  <Label className="text-sm font-medium">Purpose Name</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingPurpose.name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getCategoryIcon(viewingPurpose.category)}
                    <span className="text-sm text-gray-700">
                      {getCategoryLabel(viewingPurpose.category)}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Amount</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    ${viewingPurpose.amount}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Frequency</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingPurpose.frequency}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs mt-1 inline-block ${getStatusColor(
                      viewingPurpose.status
                    )}`}
                  >
                    {viewingPurpose.status}
                  </span>
                </div>
                <div>
                  <Label className="text-sm font-medium">Mandatory</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingPurpose.mandatory ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Collected</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    ${viewingPurpose.totalCollected.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Students Count</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingPurpose.studentsCount}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Due Date/Schedule</Label>
                <p className="text-sm text-gray-700 mt-1">
                  {viewingPurpose.dueDate}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-gray-700 mt-1">
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

export default AddPaymentPurpose;
