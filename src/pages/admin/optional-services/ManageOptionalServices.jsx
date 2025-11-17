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
  PlusCircle,
  Edit,
  Trash,
  Search,
  FileSpreadsheet,
  Printer,
  Check,
  X,
  Package,
  DollarSign,
  Users,
  Calendar,
  ShoppingBag,
  Shirt,
  MapPin,
  BookOpen,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
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

const ManageOptionalServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [addForm, setAddForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    currency: "USD",
    status: "active",
    availableFor: "all",
    requiresApproval: false,
    maxQuantity: "",
    image: "",
    vendor: "",
    specifications: "",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    currency: "",
    status: "",
    availableFor: "",
    requiresApproval: false,
    maxQuantity: "",
    image: "",
    vendor: "",
    specifications: "",
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

  // Mock data for optional services
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Standard School Uniform Set",
      category: "uniforms",
      description:
        "Complete school uniform including shirt, trousers/skirt, tie, and blazer",
      price: 120.0,
      currency: "USD",
      status: "active",
      availableFor: "all",
      requiresApproval: false,
      maxQuantity: 5,
      image: "/uniform-set.jpg",
      vendor: "SchoolWear Ltd",
      specifications: "Available in sizes XS-XXL, Navy blue with school emblem",
      enrolledStudents: 245,
      totalRevenue: 29400,
      dateCreated: "2024-01-15",
    },
    {
      id: 2,
      name: "Premium School Backpack",
      category: "bags",
      description: "Durable backpack with laptop compartment and school logo",
      price: 45.0,
      currency: "USD",
      status: "active",
      availableFor: "all",
      requiresApproval: false,
      maxQuantity: 3,
      image: "/school-backpack.jpg",
      vendor: "EduBags Inc",
      specifications: "Water-resistant, 25L capacity, padded straps",
      enrolledStudents: 180,
      totalRevenue: 8100,
      dateCreated: "2024-02-01",
    },
    {
      id: 3,
      name: "Science Lab Kit",
      category: "equipment",
      description:
        "Individual science laboratory equipment kit for practical sessions",
      price: 85.0,
      currency: "USD",
      status: "active",
      availableFor: "high-school",
      requiresApproval: true,
      maxQuantity: 1,
      image: "/science-kit.jpg",
      vendor: "LabEquip Pro",
      specifications: "Includes microscope, measuring tools, safety equipment",
      enrolledStudents: 67,
      totalRevenue: 5695,
      dateCreated: "2024-01-20",
    },
    {
      id: 4,
      name: "Educational Trip to Science Museum",
      category: "excursions",
      description:
        "Full day educational excursion including transport and guided tour",
      price: 35.0,
      currency: "USD",
      status: "active",
      availableFor: "middle-school",
      requiresApproval: true,
      maxQuantity: 1,
      image: "/museum-trip.jpg",
      vendor: "EduTours",
      specifications: "Includes lunch, transport, and educational materials",
      enrolledStudents: 120,
      totalRevenue: 4200,
      dateCreated: "2024-03-10",
    },
    {
      id: 5,
      name: "Weekly Meal Plan",
      category: "meals",
      description:
        "Nutritious weekly meal plan prepared by certified nutritionist",
      price: 25.0,
      currency: "USD",
      status: "active",
      availableFor: "all",
      requiresApproval: false,
      maxQuantity: 1,
      image: "/meal-plan.jpg",
      vendor: "Healthy Eats Catering",
      specifications:
        "5 days/week, balanced nutrition, dietary restrictions accommodated",
      enrolledStudents: 310,
      totalRevenue: 7750,
      dateCreated: "2024-01-05",
    },
    {
      id: 6,
      name: "Sports Equipment Rental",
      category: "equipment",
      description:
        "Monthly sports equipment rental for extracurricular activities",
      price: 20.0,
      currency: "USD",
      status: "inactive",
      availableFor: "all",
      requiresApproval: false,
      maxQuantity: 2,
      image: "/sports-equipment.jpg",
      vendor: "SportGear Rentals",
      specifications: "Includes balls, rackets, protective gear",
      enrolledStudents: 0,
      totalRevenue: 0,
      dateCreated: "2024-02-15",
    },
  ]);

  // Get category icon
  const getCategoryIcon = (category) => {
    const categoryData = serviceCategories.find(
      (cat) => cat.value === category
    );
    return categoryData ? categoryData.icon : Package;
  };

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.vendor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || service.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || service.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Action handlers
  const handleAdd = () => {
    setAddForm({
      name: "",
      category: "",
      description: "",
      price: "",
      currency: "USD",
      status: "active",
      availableFor: "all",
      requiresApproval: false,
      maxQuantity: "",
      image: "",
      vendor: "",
      specifications: "",
    });
    setIsAddDialogOpen(true);
  };

  const handleAddSubmit = () => {
    if (
      !addForm.name ||
      !addForm.category ||
      !addForm.price ||
      !addForm.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newService = {
      id: services.length + 1,
      ...addForm,
      price: parseFloat(addForm.price),
      maxQuantity: parseInt(addForm.maxQuantity) || 1,
      enrolledStudents: 0,
      totalRevenue: 0,
      dateCreated: new Date().toISOString().split("T")[0],
    };

    setServices([...services, newService]);
    setIsAddDialogOpen(false);
    toast.success("Optional service added successfully!", {
      description: `${addForm.name} has been added to the services list.`,
    });
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setEditForm({ ...service });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    const updatedServices = services.map((service) =>
      service.id === selectedService.id
        ? {
            ...editForm,
            price: parseFloat(editForm.price),
            maxQuantity: parseInt(editForm.maxQuantity) || 1,
          }
        : service
    );
    setServices(updatedServices);
    setIsEditDialogOpen(false);
    toast.success("Service updated successfully!");
  };

  const handleDelete = (id) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
    toast.success("Service deleted successfully!");
  };

  const handleToggleStatus = (id) => {
    const updatedServices = services.map((service) =>
      service.id === id
        ? {
            ...service,
            status: service.status === "active" ? "inactive" : "active",
          }
        : service
    );
    setServices(updatedServices);
    toast.success("Service status updated!");
  };

  const handleExport = () => {
    const data = filteredServices.map((service) => ({
      Name: service.name,
      Category: service.category,
      Price: `${service.currency} ${service.price}`,
      Status: service.status,
      "Available For": service.availableFor,
      "Enrolled Students": service.enrolledStudents,
      "Total Revenue": `${service.currency} ${service.totalRevenue}`,
      Vendor: service.vendor,
      "Date Created": service.dateCreated,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "optional_services.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Services data exported successfully!");
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Optional Services Management
        </h2>
        <div className="flex gap-3">
          <Button
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleAdd}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Services
                </p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {services.length}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Services
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {services.filter((s) => s.status === "active").length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Enrollments
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {services.reduce((sum, s) => sum + s.enrolledStudents, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  $
                  {services
                    .reduce((sum, s) => sum + s.totalRevenue, 0)
                    .toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in delay-100 mt-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Optional Services Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Filters and Search */}
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="flex gap-4 w-full sm:w-auto">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Search services..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4" />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-green-50 hover:border-green-300"
                onClick={handleExport}
              >
                <FileSpreadsheet className="h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>

          {/* Services Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>
                Optional fee-based services available for student enrollment.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Service</TableHead>
                  <TableHead className="bg-gray-100">Category</TableHead>
                  <TableHead className="bg-gray-100">Price</TableHead>
                  <TableHead className="bg-gray-100">Enrollments</TableHead>
                  <TableHead className="bg-gray-100">Revenue</TableHead>
                  <TableHead className="bg-gray-100">Available For</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => {
                  const CategoryIcon = getCategoryIcon(service.category);

                  return (
                    <TableRow key={service.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="h-5 w-5 text-eduos-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{service.name}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline" className="capitalize">
                            {service.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-green-600">
                          {service.currency} {service.price.toFixed(2)}
                        </div>
                        {service.maxQuantity > 1 && (
                          <div className="text-xs text-gray-500">
                            Max: {service.maxQuantity}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold">
                            {service.enrolledStudents}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-blue-600">
                          {service.currency}{" "}
                          {service.totalRevenue.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {service.availableFor.replace("-", " ")}
                        </Badge>
                        {service.requiresApproval && (
                          <div className="text-xs text-orange-600 mt-1">
                            Requires Approval
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            service.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            service.status === "active"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {service.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(service)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(service.id)}
                            className={`h-8 w-8 p-0 ${
                              service.status === "active"
                                ? "text-red-600 hover:text-red-800"
                                : "text-green-600 hover:text-green-800"
                            }`}
                          >
                            {service.status === "active" ? (
                              <X className="h-4 w-4" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(service.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{filteredServices.length}</span> of{" "}
              <span className="font-medium">{services.length}</span> services
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Optional Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addName">Service Name *</Label>
                <Input
                  id="addName"
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter service name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addCategory">Category *</Label>
                <Select
                  value={addForm.category}
                  onValueChange={(value) =>
                    setAddForm((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map((category) => (
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="addDescription">Description *</Label>
              <Textarea
                id="addDescription"
                value={addForm.description}
                onChange={(e) =>
                  setAddForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter detailed service description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addPrice">Price *</Label>
                <Input
                  id="addPrice"
                  type="number"
                  step="0.01"
                  value={addForm.price}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addCurrency">Currency</Label>
                <Select
                  value={addForm.currency}
                  onValueChange={(value) =>
                    setAddForm((prev) => ({ ...prev, currency: value }))
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
                <Label htmlFor="addMaxQuantity">Max Quantity</Label>
                <Input
                  id="addMaxQuantity"
                  type="number"
                  value={addForm.maxQuantity}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      maxQuantity: e.target.value,
                    }))
                  }
                  placeholder="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addAvailableFor">Available For</Label>
                <Select
                  value={addForm.availableFor}
                  onValueChange={(value) =>
                    setAddForm((prev) => ({ ...prev, availableFor: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="elementary">Elementary Only</SelectItem>
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
                <Label htmlFor="addVendor">Vendor/Supplier</Label>
                <Input
                  id="addVendor"
                  value={addForm.vendor}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, vendor: e.target.value }))
                  }
                  placeholder="Vendor name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="addSpecifications">Specifications</Label>
              <Textarea
                id="addSpecifications"
                value={addForm.specifications}
                onChange={(e) =>
                  setAddForm((prev) => ({
                    ...prev,
                    specifications: e.target.value,
                  }))
                }
                placeholder="Technical specifications, sizes, colors, etc..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addStatus">Status</Label>
                <Select
                  value={addForm.status}
                  onValueChange={(value) =>
                    setAddForm((prev) => ({ ...prev, status: value }))
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

              <div className="flex items-center space-x-2 pt-8">
                <input
                  type="checkbox"
                  id="addRequiresApproval"
                  checked={addForm.requiresApproval}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      requiresApproval: e.target.checked,
                    }))
                  }
                />
                <Label htmlFor="addRequiresApproval">Requires Approval</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addImage">Image URL</Label>
                <Input
                  id="addImage"
                  value={addForm.image}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/service-image.jpg"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubmit}>
              <Package className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Optional Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editName">Service Name *</Label>
                <Input
                  id="editName"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter service name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editCategory">Category *</Label>
                <Select
                  value={editForm.category}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map((category) => (
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="editDescription">Description *</Label>
              <Textarea
                id="editDescription"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter detailed service description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editPrice">Price *</Label>
                <Input
                  id="editPrice"
                  type="number"
                  step="0.01"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editCurrency">Currency</Label>
                <Select
                  value={editForm.currency}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, currency: value }))
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
                <Label htmlFor="editMaxQuantity">Max Quantity</Label>
                <Input
                  id="editMaxQuantity"
                  type="number"
                  value={editForm.maxQuantity}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      maxQuantity: e.target.value,
                    }))
                  }
                  placeholder="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editAvailableFor">Available For</Label>
                <Select
                  value={editForm.availableFor}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, availableFor: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="elementary">Elementary Only</SelectItem>
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
                <Label htmlFor="editVendor">Vendor/Supplier</Label>
                <Input
                  id="editVendor"
                  value={editForm.vendor}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, vendor: e.target.value }))
                  }
                  placeholder="Vendor name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editSpecifications">Specifications</Label>
              <Textarea
                id="editSpecifications"
                value={editForm.specifications}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    specifications: e.target.value,
                  }))
                }
                placeholder="Technical specifications, sizes, colors, etc..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editStatus">Status</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, status: value }))
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

              <div className="flex items-center space-x-2 pt-8">
                <input
                  type="checkbox"
                  id="editRequiresApproval"
                  checked={editForm.requiresApproval}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      requiresApproval: e.target.checked,
                    }))
                  }
                />
                <Label htmlFor="editRequiresApproval">Requires Approval</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editImage">Image URL</Label>
                <Input
                  id="editImage"
                  value={editForm.image}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/service-image.jpg"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>
              <Check className="h-4 w-4 mr-2" />
              Update Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageOptionalServices;
