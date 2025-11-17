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
  PlusCircle,
  Package,
  DollarSign,
  ShoppingBag,
  Shirt,
  MapPin,
  BookOpen,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const AddOptionalService = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);

  const [serviceForm, setServiceForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    currency: "USD",
    status: "active",
    availableFor: "all",
    requiresApproval: false,
    maxQuantity: "1",
    image: "",
    vendor: "",
    specifications: "",
    validFrom: "",
    validUntil: "",
    termsAndConditions: "",
  });

  // Service Categories
  const serviceCategories = [
    { value: "uniforms", label: "School Uniforms", icon: Shirt },
    { value: "bags", label: "School Bags & Supplies", icon: ShoppingBag },
    { value: "books", label: "Books & Materials", icon: BookOpen },
    { value: "excursions", label: "Excursions & Trips", icon: MapPin },
    { value: "equipment", label: "Sports Equipment", icon: Package },
    { value: "meals", label: "Meal Plans", icon: DollarSign },
    { value: "transport", label: "Transportation", icon: Calendar },
    { value: "other", label: "Other Services", icon: Package },
  ];

  const handleInputChange = (field, value) => {
    setServiceForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !serviceForm.name ||
      !serviceForm.category ||
      !serviceForm.price ||
      !serviceForm.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (parseFloat(serviceForm.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    if (parseInt(serviceForm.maxQuantity) <= 0) {
      toast.error("Max quantity must be greater than 0");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create service object
      const newService = {
        id: Date.now(),
        ...serviceForm,
        price: parseFloat(serviceForm.price),
        maxQuantity: parseInt(serviceForm.maxQuantity),
        enrolledStudents: 0,
        totalRevenue: 0,
        dateCreated: new Date().toISOString().split("T")[0],
      };

      console.log("New service created:", newService);

      toast.success("Optional service added successfully!", {
        description: `${serviceForm.name} has been added to the services list.`,
      });

      // Reset form
      setServiceForm({
        name: "",
        category: "",
        description: "",
        price: "",
        currency: "USD",
        status: "active",
        availableFor: "all",
        requiresApproval: false,
        maxQuantity: "1",
        image: "",
        vendor: "",
        specifications: "",
        validFrom: "",
        validUntil: "",
        termsAndConditions: "",
      });
    } catch (error) {
      toast.error("Failed to add service. Please try again.");
      console.error("Error adding service:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    if (!serviceForm.name || !serviceForm.category || !serviceForm.price) {
      toast.error("Please fill in required fields before previewing");
      return;
    }
    setIsPreviewDialogOpen(true);
  };

  const getCategoryIcon = (category) => {
    const categoryData = serviceCategories.find(
      (cat) => cat.value === category
    );
    return categoryData ? categoryData.icon : Package;
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add New Optional Service
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Service Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceName">Service Name *</Label>
                      <Input
                        id="serviceName"
                        value={serviceForm.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter service name"
                        className="w-full"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={serviceForm.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceCategories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              <div className="flex items-center gap-2">
                                <category.icon className="w-4 h-4" />
                                {category.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={serviceForm.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Enter detailed service description..."
                      rows={4}
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Pricing Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={serviceForm.price}
                        onChange={(e) =>
                          handleInputChange("price", e.target.value)
                        }
                        placeholder="0.00"
                        className="w-full"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={serviceForm.currency}
                        onValueChange={(value) =>
                          handleInputChange("currency", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="NGN">NGN (₦)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxQuantity">
                        Max Quantity per Student
                      </Label>
                      <Input
                        id="maxQuantity"
                        type="number"
                        min="1"
                        value={serviceForm.maxQuantity}
                        onChange={(e) =>
                          handleInputChange("maxQuantity", e.target.value)
                        }
                        placeholder="1"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Availability Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Availability Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="availableFor">Available For</Label>
                      <Select
                        value={serviceForm.availableFor}
                        onValueChange={(value) =>
                          handleInputChange("availableFor", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Students</SelectItem>
                          <SelectItem value="elementary">
                            Elementary Only
                          </SelectItem>
                          <SelectItem value="middle-school">
                            Middle School Only
                          </SelectItem>
                          <SelectItem value="high-school">
                            High School Only
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={serviceForm.status}
                        onValueChange={(value) =>
                          handleInputChange("status", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="validFrom">Valid From</Label>
                      <Input
                        id="validFrom"
                        type="date"
                        value={serviceForm.validFrom}
                        onChange={(e) =>
                          handleInputChange("validFrom", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="validUntil">Valid Until</Label>
                      <Input
                        id="validUntil"
                        type="date"
                        value={serviceForm.validUntil}
                        onChange={(e) =>
                          handleInputChange("validUntil", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="requiresApproval"
                      checked={serviceForm.requiresApproval}
                      onChange={(e) =>
                        handleInputChange("requiresApproval", e.target.checked)
                      }
                    />
                    <Label htmlFor="requiresApproval" className="text-sm">
                      Requires admin approval before enrollment
                    </Label>
                  </div>
                </div>

                {/* Vendor Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Vendor & Specifications
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendor">Vendor/Supplier</Label>
                      <Input
                        id="vendor"
                        value={serviceForm.vendor}
                        onChange={(e) =>
                          handleInputChange("vendor", e.target.value)
                        }
                        placeholder="Vendor name"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Service Image URL</Label>
                      <Input
                        id="image"
                        value={serviceForm.image}
                        onChange={(e) =>
                          handleInputChange("image", e.target.value)
                        }
                        placeholder="/service-image.jpg"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specifications">Specifications</Label>
                    <Textarea
                      id="specifications"
                      value={serviceForm.specifications}
                      onChange={(e) =>
                        handleInputChange("specifications", e.target.value)
                      }
                      placeholder="Technical specifications, sizes, colors, materials, etc..."
                      rows={3}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="termsAndConditions">
                      Terms & Conditions
                    </Label>
                    <Textarea
                      id="termsAndConditions"
                      value={serviceForm.termsAndConditions}
                      onChange={(e) =>
                        handleInputChange("termsAndConditions", e.target.value)
                      }
                      placeholder="Terms and conditions, refund policy, delivery information, etc..."
                      rows={3}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreview}
                    className="px-6"
                  >
                    Preview
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-eduos-primary hover:bg-eduos-secondary px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding Service...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Service
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Guidelines */}
        <div className="space-y-6">
          <Card className="animate-fade-in delay-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-800 text-lg">
                Service Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-blue-700">Service Name:</strong>
                  <p className="text-gray-600 mt-1">
                    Use clear, descriptive names that students and parents can
                    easily understand.
                  </p>
                </div>
                <div>
                  <strong className="text-blue-700">Pricing:</strong>
                  <p className="text-gray-600 mt-1">
                    Set competitive prices and consider bulk discounts for
                    multiple quantities.
                  </p>
                </div>
                <div>
                  <strong className="text-blue-700">Approval Required:</strong>
                  <p className="text-gray-600 mt-1">
                    Enable for high-value items or services requiring special
                    authorization.
                  </p>
                </div>
                <div>
                  <strong className="text-blue-700">Availability:</strong>
                  <p className="text-gray-600 mt-1">
                    Set appropriate grade-level restrictions for age-appropriate
                    services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in delay-300">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-800 text-lg flex items-center gap-2">
                <Package className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Most Popular Category
                  </span>
                  <span className="text-sm font-semibold">Uniforms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Average Service Price
                  </span>
                  <span className="text-sm font-semibold">$62</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Services</span>
                  <span className="text-sm font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Total Enrollments
                  </span>
                  <span className="text-sm font-semibold">1,245</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Service Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    {serviceForm.category &&
                      (() => {
                        const CategoryIcon = getCategoryIcon(
                          serviceForm.category
                        );
                        return (
                          <CategoryIcon className="h-8 w-8 text-eduos-primary" />
                        );
                      })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {serviceForm.name || "Service Name"}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {serviceForm.description ||
                        "Service description will appear here..."}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-green-600">
                        {serviceForm.currency} {serviceForm.price || "0.00"}
                      </div>
                      {serviceForm.category && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                          {serviceForm.category}
                        </span>
                      )}
                    </div>
                    {serviceForm.specifications && (
                      <div className="mt-3 text-sm text-gray-600">
                        <strong>Specifications:</strong>{" "}
                        {serviceForm.specifications}
                      </div>
                    )}
                    {serviceForm.vendor && (
                      <div className="mt-2 text-sm text-gray-500">
                        Provided by: {serviceForm.vendor}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPreviewDialogOpen(false)}
            >
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddOptionalService;
