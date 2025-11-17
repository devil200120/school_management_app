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
  Search,
  FileSpreadsheet,
  Printer,
  Check,
  X,
  Package,
  Users,
  DollarSign,
  Calendar,
  ShoppingBag,
  Shirt,
  MapPin,
  BookOpen,
  User,
  GraduationCap,
  Building,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";

const ServiceAssignments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Mock data for assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      studentId: "STU001",
      studentName: "John Smith",
      class: "Grade 10A",
      serviceId: 1,
      serviceName: "Standard School Uniform Set",
      serviceCategory: "uniforms",
      price: 120.0,
      quantity: 2,
      totalAmount: 240.0,
      status: "approved",
      dateAssigned: "2024-01-15",
      paymentStatus: "paid",
      paymentDate: "2024-01-20",
      approvedBy: "Principal Johnson",
      notes: "Extra large size requested",
    },
    {
      id: 2,
      studentId: "STU002",
      studentName: "Emma Wilson",
      class: "Grade 9B",
      serviceId: 2,
      serviceName: "Premium School Backpack",
      serviceCategory: "bags",
      price: 45.0,
      quantity: 1,
      totalAmount: 45.0,
      status: "approved",
      dateAssigned: "2024-02-01",
      paymentStatus: "paid",
      paymentDate: "2024-02-03",
      approvedBy: "Admin Staff",
      notes: "Navy blue color preferred",
    },
    {
      id: 3,
      studentId: "STU003",
      studentName: "Michael Brown",
      class: "Grade 11C",
      serviceId: 3,
      serviceName: "Science Lab Kit",
      serviceCategory: "equipment",
      price: 85.0,
      quantity: 1,
      totalAmount: 85.0,
      status: "pending",
      dateAssigned: "2024-03-15",
      paymentStatus: "pending",
      paymentDate: null,
      approvedBy: null,
      notes: "Requires parent approval",
    },
    {
      id: 4,
      studentId: "STU004",
      studentName: "Sarah Davis",
      class: "Grade 8A",
      serviceId: 4,
      serviceName: "Educational Trip to Science Museum",
      serviceCategory: "excursions",
      price: 35.0,
      quantity: 1,
      totalAmount: 35.0,
      status: "approved",
      dateAssigned: "2024-03-10",
      paymentStatus: "paid",
      paymentDate: "2024-03-12",
      approvedBy: "Vice Principal",
      notes: "Medical form submitted",
    },
    {
      id: 5,
      studentId: "STU005",
      studentName: "Alex Johnson",
      class: "Grade 12A",
      serviceId: 5,
      serviceName: "Weekly Meal Plan",
      serviceCategory: "meals",
      price: 25.0,
      quantity: 1,
      totalAmount: 25.0,
      status: "approved",
      dateAssigned: "2024-01-05",
      paymentStatus: "paid",
      paymentDate: "2024-01-05",
      approvedBy: "Admin Staff",
      notes: "Vegetarian meals only",
    },
  ]);

  // Mock data for services and classes
  const services = [
    {
      id: 1,
      name: "Standard School Uniform Set",
      category: "uniforms",
      price: 120.0,
    },
    { id: 2, name: "Premium School Backpack", category: "bags", price: 45.0 },
    { id: 3, name: "Science Lab Kit", category: "equipment", price: 85.0 },
    {
      id: 4,
      name: "Educational Trip to Science Museum",
      category: "excursions",
      price: 35.0,
    },
    { id: 5, name: "Weekly Meal Plan", category: "meals", price: 25.0 },
  ];

  const classes = [
    "Grade 8A",
    "Grade 8B",
    "Grade 9A",
    "Grade 9B",
    "Grade 10A",
    "Grade 10B",
    "Grade 11A",
    "Grade 11B",
    "Grade 11C",
    "Grade 12A",
    "Grade 12B",
  ];

  const students = [
    { id: "STU001", name: "John Smith", class: "Grade 10A" },
    { id: "STU002", name: "Emma Wilson", class: "Grade 9B" },
    { id: "STU003", name: "Michael Brown", class: "Grade 11C" },
    { id: "STU004", name: "Sarah Davis", class: "Grade 8A" },
    { id: "STU005", name: "Alex Johnson", class: "Grade 12A" },
    { id: "STU006", name: "Lisa Chen", class: "Grade 10B" },
    { id: "STU007", name: "David Rodriguez", class: "Grade 9A" },
  ];

  // Service categories with icons
  const serviceCategories = {
    uniforms: { icon: Shirt, color: "blue" },
    bags: { icon: ShoppingBag, color: "green" },
    equipment: { icon: Package, color: "purple" },
    excursions: { icon: MapPin, color: "orange" },
    meals: { icon: DollarSign, color: "red" },
    books: { icon: BookOpen, color: "indigo" },
  };

  // Filter assignments
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === "all" || assignment.class === selectedClass;
    const matchesService =
      selectedService === "all" ||
      assignment.serviceId.toString() === selectedService;

    return matchesSearch && matchesClass && matchesService;
  });

  // Get category icon
  const getCategoryIcon = (category) => {
    return serviceCategories[category]?.icon || Package;
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusBadgeColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Action handlers
  const handleApprove = (id) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id
        ? { ...assignment, status: "approved", approvedBy: "Current Admin" }
        : assignment
    );
    setAssignments(updatedAssignments);
    toast.success("Service assignment approved!");
  };

  const handleReject = (id) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, status: "rejected" } : assignment
    );
    setAssignments(updatedAssignments);
    toast.success("Service assignment rejected!");
  };

  const handleBulkAssign = () => {
    setIsAssignDialogOpen(true);
  };

  const handleExport = () => {
    const data = filteredAssignments.map((assignment) => ({
      "Student ID": assignment.studentId,
      "Student Name": assignment.studentName,
      Class: assignment.class,
      Service: assignment.serviceName,
      Category: assignment.serviceCategory,
      Price: `$${assignment.price}`,
      Quantity: assignment.quantity,
      "Total Amount": `$${assignment.totalAmount}`,
      Status: assignment.status,
      "Payment Status": assignment.paymentStatus,
      "Date Assigned": assignment.dateAssigned,
      "Approved By": assignment.approvedBy || "N/A",
      Notes: assignment.notes || "N/A",
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "service_assignments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Service assignments exported successfully!");
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Service Assignments
        </h2>
        <div className="flex gap-3">
          <Button
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleBulkAssign}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Bulk Assign
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
                  Total Assignments
                </p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {assignments.length}
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
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">
                  {assignments.filter((a) => a.status === "approved").length}
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
                  Pending Approval
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {assignments.filter((a) => a.status === "pending").length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-600" />
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
                <p className="text-3xl font-bold text-purple-600">
                  $
                  {assignments
                    .filter((a) => a.paymentStatus === "paid")
                    .reduce((sum, a) => sum + a.totalAmount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in delay-100 mt-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Service Assignments Management
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
                  placeholder="Search students or services..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedService}
                onValueChange={setSelectedService}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.name}
                    </SelectItem>
                  ))}
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

          {/* Assignments Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>
                Student service assignments and approval status.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Student</TableHead>
                  <TableHead className="bg-gray-100">Service</TableHead>
                  <TableHead className="bg-gray-100">Amount</TableHead>
                  <TableHead className="bg-gray-100">
                    Assignment Status
                  </TableHead>
                  <TableHead className="bg-gray-100">Payment Status</TableHead>
                  <TableHead className="bg-gray-100">Date Assigned</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment) => {
                  const CategoryIcon = getCategoryIcon(
                    assignment.serviceCategory
                  );

                  return (
                    <TableRow key={assignment.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <User className="h-5 w-5 text-eduos-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">
                              {assignment.studentName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {assignment.studentId}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {assignment.class}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="h-4 w-4 text-eduos-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">
                              {assignment.serviceName}
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {assignment.serviceCategory}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold text-green-600">
                            ${assignment.totalAmount.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500">
                            ${assignment.price} × {assignment.quantity}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusBadgeColor(assignment.status)}
                        >
                          {assignment.status}
                        </Badge>
                        {assignment.approvedBy && (
                          <div className="text-xs text-gray-500 mt-1">
                            by {assignment.approvedBy}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getPaymentStatusBadgeColor(
                            assignment.paymentStatus
                          )}
                        >
                          {assignment.paymentStatus}
                        </Badge>
                        {assignment.paymentDate && (
                          <div className="text-xs text-gray-500 mt-1">
                            {assignment.paymentDate}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{assignment.dateAssigned}</div>
                        {assignment.notes && (
                          <div className="text-xs text-gray-500 italic mt-1">
                            {assignment.notes}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {assignment.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(assignment.id)}
                              className="h-8 px-3 text-green-600 hover:text-green-800 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(assignment.id)}
                              className="h-8 px-3 text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {assignment.status !== "pending" && (
                          <Badge variant="outline" className="text-xs">
                            {assignment.status === "approved"
                              ? "Completed"
                              : "No action needed"}
                          </Badge>
                        )}
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
              <span className="font-medium">{filteredAssignments.length}</span>{" "}
              of <span className="font-medium">{assignments.length}</span>{" "}
              assignments
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Assignment Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bulk Service Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Service</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose service to assign" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem
                        key={service.id}
                        value={service.id.toString()}
                      >
                        <div className="flex items-center gap-2">
                          {service.name} - ${service.price}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Class</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((className) => (
                      <SelectItem key={className} value={className}>
                        {className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Assignment Notes</Label>
              <Textarea
                placeholder="Add notes for this assignment..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Select Students</Label>
              <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                <div className="space-y-2">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={student.id}
                        checked={selectedStudents.includes(student.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents([
                              ...selectedStudents,
                              student.id,
                            ]);
                          } else {
                            setSelectedStudents(
                              selectedStudents.filter((id) => id !== student.id)
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={student.id}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">
                            {student.id} - {student.class}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {selectedStudents.length} student(s) selected
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle bulk assignment logic here
                toast.success(
                  `Service assigned to ${selectedStudents.length} students!`
                );
                setIsAssignDialogOpen(false);
                setSelectedStudents([]);
              }}
            >
              <Users className="h-4 w-4 mr-2" />
              Assign to Selected Students
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceAssignments;
