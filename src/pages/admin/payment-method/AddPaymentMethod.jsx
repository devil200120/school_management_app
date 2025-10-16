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
  CreditCard,
  Building,
  Smartphone,
  Globe,
  Shield,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const AddPaymentMethod = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: "Credit Card",
      type: "card",
      status: "active",
      gateway: "stripe",
      description: "Accept credit and debit card payments",
      fees: "2.9% + $0.30",
      currency: ["USD", "EUR", "GBP"],
      config: {
        publicKey: "pk_test_...",
        secretKey: "sk_test_...",
        webhookUrl: "https://school.edu/webhooks/stripe",
      },
      createdAt: "2024-01-15",
      lastUsed: "2024-04-20",
    },
    {
      id: 2,
      name: "Bank Transfer",
      type: "bank",
      status: "active",
      gateway: "ach",
      description: "Direct bank account transfers",
      fees: "0.8% (max $5)",
      currency: ["USD"],
      config: {
        routingNumber: "021000021",
        accountNumber: "****1234",
        bankName: "Chase Bank",
      },
      createdAt: "2024-01-10",
      lastUsed: "2024-04-18",
    },
    {
      id: 3,
      name: "PayPal",
      type: "wallet",
      status: "inactive",
      gateway: "paypal",
      description: "PayPal digital wallet payments",
      fees: "2.9% + $0.30",
      currency: ["USD", "EUR"],
      config: {
        clientId: "client_id_123",
        clientSecret: "client_secret_456",
        environment: "sandbox",
      },
      createdAt: "2024-01-05",
      lastUsed: "2024-03-15",
    },
    {
      id: 4,
      name: "Cash",
      type: "offline",
      status: "active",
      gateway: "manual",
      description: "In-person cash payments",
      fees: "Free",
      currency: ["USD"],
      config: {
        requireReceipt: true,
        autoConfirm: false,
      },
      createdAt: "2024-01-01",
      lastUsed: "2024-04-21",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    gateway: "",
    description: "",
    fees: "",
    currency: [],
    config: {},
  });

  const [editingMethod, setEditingMethod] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewingMethod, setViewingMethod] = useState(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [configuringMethod, setConfiguringMethod] = useState(null);
  const [configData, setConfigData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentTypes = [
    { value: "card", label: "Credit/Debit Card", icon: CreditCard },
    { value: "bank", label: "Bank Transfer", icon: Building },
    { value: "wallet", label: "Digital Wallet", icon: Smartphone },
    { value: "offline", label: "Offline Payment", icon: Globe },
  ];

  const gatewayOptions = {
    card: [
      { value: "stripe", label: "Stripe" },
      { value: "square", label: "Square" },
      { value: "paypal_card", label: "PayPal Cards" },
    ],
    bank: [
      { value: "ach", label: "ACH Transfer" },
      { value: "wire", label: "Wire Transfer" },
      { value: "plaid", label: "Plaid" },
    ],
    wallet: [
      { value: "paypal", label: "PayPal" },
      { value: "apple_pay", label: "Apple Pay" },
      { value: "google_pay", label: "Google Pay" },
    ],
    offline: [
      { value: "manual", label: "Manual Processing" },
      { value: "pos", label: "Point of Sale" },
    ],
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      gateway: "",
      description: "",
      fees: "",
      currency: [],
      config: {},
    });
    setEditingMethod(null);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.type || !formData.gateway) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const methodData = {
        ...formData,
        id: editingMethod ? editingMethod.id : Date.now(),
        status: "active",
        createdAt: editingMethod
          ? editingMethod.createdAt
          : new Date().toISOString().split("T")[0],
        lastUsed: null,
      };

      if (editingMethod) {
        setPaymentMethods((prev) =>
          prev.map((method) =>
            method.id === editingMethod.id ? methodData : method
          )
        );
        toast({
          title: "Success",
          description: "Payment method updated successfully.",
        });
      } else {
        setPaymentMethods((prev) => [methodData, ...prev]);
        toast({
          title: "Success",
          description: "Payment method added successfully.",
        });
      }

      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save payment method. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (method) => {
    setFormData({
      name: method.name,
      type: method.type,
      gateway: method.gateway,
      description: method.description,
      fees: method.fees,
      currency: method.currency,
      config: method.config,
    });
    setEditingMethod(method);
  };

  const handleDelete = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPaymentMethods((prev) =>
        prev.filter((method) => method.id !== deletingId)
      );
      toast({
        title: "Success",
        description: "Payment method deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete payment method. Please try again.",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (methodId) => {
    try {
      const method = paymentMethods.find((m) => m.id === methodId);
      const newStatus = method.status === "active" ? "inactive" : "active";

      setPaymentMethods((prev) =>
        prev.map((m) => (m.id === methodId ? { ...m, status: newStatus } : m))
      );

      toast({
        title: "Success",
        description: `Payment method ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payment method status.",
        variant: "destructive",
      });
    }
  };

  const handleViewMethod = (method) => {
    setViewingMethod(method);
    setShowViewDialog(true);
  };

  const handleConfigureMethod = (method) => {
    setConfiguringMethod(method);
    setConfigData(method.config || {});
    setShowConfigDialog(true);
  };

  const handleSaveConfig = async () => {
    try {
      setPaymentMethods((prev) =>
        prev.map((method) =>
          method.id === configuringMethod.id
            ? { ...method, config: configData }
            : method
        )
      );

      toast({
        title: "Success",
        description: "Payment method configuration updated successfully.",
      });

      setShowConfigDialog(false);
      setConfiguringMethod(null);
      setConfigData({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration.",
        variant: "destructive",
      });
    }
  };

  const getTypeIcon = (type) => {
    const typeObj = paymentTypes.find((t) => t.value === type);
    const Icon = typeObj?.icon || CreditCard;
    return <Icon className="w-4 h-4" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "text-green-600 bg-green-50",
      inactive: "text-red-600 bg-red-50",
      pending: "text-yellow-600 bg-yellow-50",
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: CheckCircle,
      inactive: XCircle,
      pending: AlertTriangle,
    };
    const Icon = icons[status] || AlertTriangle;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Payment Method Management
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {editingMethod ? "Edit Payment Method" : "Add New Payment Method"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Payment Method Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g. Credit Card, PayPal, Bank Transfer"
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Payment Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value, gateway: "" }))
                }
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gateway">Payment Gateway *</Label>
              <Select
                value={formData.gateway}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, gateway: value }))
                }
                disabled={!formData.type}
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select gateway" />
                </SelectTrigger>
                <SelectContent>
                  {formData.type &&
                    gatewayOptions[formData.type]?.map((gateway) => (
                      <SelectItem key={gateway.value} value={gateway.value}>
                        {gateway.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fees">Transaction Fees</Label>
              <Input
                id="fees"
                value={formData.fees}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fees: e.target.value }))
                }
                placeholder="e.g. 2.9% + $0.30"
                className="transition-all duration-300 focus:border-eduos-primary"
              />
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
              placeholder="Brief description of this payment method"
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
                : editingMethod
                ? "Update Method"
                : "Add Method"}
            </Button>
            {editingMethod && (
              <Button onClick={resetForm} variant="outline" className="flex-1">
                Cancel Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods List */}
      <Card className="mt-3 animate-fade-in delay-200 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Methods ({paymentMethods.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {paymentMethods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                No payment methods configured. Add your first payment method
                above.
              </p>
            </div>
          ) : (
            paymentMethods.map((method) => (
              <div
                key={method.id}
                className="p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getTypeIcon(method.type)}
                      <h3 className="font-medium text-gray-800 text-lg">
                        {method.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(
                          method.status
                        )}`}
                      >
                        {getStatusIcon(method.status)}
                        {method.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {method.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span>Gateway: {method.gateway}</span>
                      <span>Fees: {method.fees}</span>
                      <span>Added: {method.createdAt}</span>
                      {method.lastUsed && (
                        <span>Last Used: {method.lastUsed}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      onClick={() => handleViewMethod(method)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      onClick={() => handleConfigureMethod(method)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      Configure
                    </Button>
                    <Button
                      onClick={() => handleEdit(method)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleToggleStatus(method.id)}
                      variant={
                        method.status === "active" ? "destructive" : "default"
                      }
                      size="sm"
                      className="text-xs"
                    >
                      {method.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      onClick={() => {
                        setDeletingId(method.id);
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

      {/* View Method Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Payment Method Details
            </DialogTitle>
          </DialogHeader>
          {viewingMethod && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Method Name</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingMethod.name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getTypeIcon(viewingMethod.type)}
                    <span className="text-sm text-gray-700">
                      {viewingMethod.type}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Gateway</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingMethod.gateway}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs mt-1 inline-flex items-center gap-1 ${getStatusColor(
                      viewingMethod.status
                    )}`}
                  >
                    {getStatusIcon(viewingMethod.status)}
                    {viewingMethod.status}
                  </span>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Transaction Fees
                  </Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingMethod.fees}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Supported Currency
                  </Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingMethod.currency?.join(", ") || "Not specified"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created Date</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingMethod.createdAt}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Used</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingMethod.lastUsed || "Never"}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-gray-700 mt-1">
                  {viewingMethod.description}
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

      {/* Configuration Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configure {configuringMethod?.name}
            </DialogTitle>
            <DialogDescription>
              Configure gateway settings and security parameters for this
              payment method.
            </DialogDescription>
          </DialogHeader>
          {configuringMethod && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(configuringMethod.config || {}).map(
                  ([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </Label>
                      <Input
                        value={configData[key] || value || ""}
                        onChange={(e) =>
                          setConfigData((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        placeholder={`Enter ${key}`}
                        type={
                          key.toLowerCase().includes("secret") ||
                          key.toLowerCase().includes("password")
                            ? "password"
                            : "text"
                        }
                        className="transition-all duration-300 focus:border-eduos-primary"
                      />
                    </div>
                  )
                )}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex items-center gap-2 text-yellow-700">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Security Notice</span>
                </div>
                <p className="text-sm text-yellow-600 mt-1">
                  Ensure all API keys and credentials are kept secure. Never
                  share these with unauthorized personnel.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfigDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveConfig}
              className="bg-eduos-primary hover:bg-eduos-secondary"
            >
              Save Configuration
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
              Are you sure you want to delete this payment method? This action
              cannot be undone and may affect existing transactions.
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
              Delete Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPaymentMethod;
