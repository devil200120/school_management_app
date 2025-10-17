import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import {
  Search,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  Users,
  CreditCard,
  Calendar,
  Save,
} from "lucide-react";
import { toast } from "sonner";

const CustomizationPayment = () => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentStructure, setShowPaymentStructure] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPaymentItem, setSelectedPaymentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state for creating/editing payment items
  const [paymentForm, setPaymentForm] = useState({
    itemName: "",
    amount: "",
    description: "",
    mandatory: true,
  });

  // Sample payment structure data
  const [paymentStructure, setPaymentStructure] = useState([
    {
      id: 1,
      itemName: "Tuition Fee",
      amount: 150000,
      description: "Main school fee for the academic session",
      mandatory: true,
      category: "Academic",
    },
    {
      id: 2,
      itemName: "Development Levy",
      amount: 25000,
      description: "Infrastructure development fee",
      mandatory: true,
      category: "Infrastructure",
    },
    {
      id: 3,
      itemName: "Sports Fee",
      amount: 10000,
      description: "Sports and recreational activities fee",
      mandatory: false,
      category: "Activities",
    },
    {
      id: 4,
      itemName: "Library Fee",
      amount: 8000,
      description: "Library maintenance and book fee",
      mandatory: false,
      category: "Academic",
    },
    {
      id: 5,
      itemName: "Examination Fee",
      amount: 12000,
      description: "Internal and external examination fee",
      mandatory: true,
      category: "Academic",
    },
  ]);

  // Filter payment structure based on search
  const filteredPaymentStructure = paymentStructure.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission to check payment structure
  const handleCheckPaymentStructure = async () => {
    if (!selectedLevel || !selectedClass || !selectedTerm || !selectedSession) {
      toast.error("Missing Information", {
        description:
          "Please select all required fields (Level, Class, Term, and Session).",
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setShowPaymentStructure(true);
      toast.success("Payment Structure Loaded", {
        description: `Loaded payment structure for ${selectedLevel} - ${selectedClass} (${selectedTerm}, ${selectedSession}).`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } catch (error) {
      toast.error("Failed to Load", {
        description: "Failed to load payment structure. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle creating new payment item
  const handleCreatePaymentItem = () => {
    if (!paymentForm.itemName || !paymentForm.amount) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
        duration: 3000,
      });
      return;
    }

    const newItem = {
      id: Date.now(),
      itemName: paymentForm.itemName,
      amount: parseFloat(paymentForm.amount),
      description: paymentForm.description,
      mandatory: paymentForm.mandatory,
      category: "Custom",
    };

    setPaymentStructure((prev) => [...prev, newItem]);
    setPaymentForm({
      itemName: "",
      amount: "",
      description: "",
      mandatory: true,
    });
    setIsCreateDialogOpen(false);

    toast.success("Payment Item Created", {
      description: `${newItem.itemName} has been added to the payment structure.`,
      icon: <Plus className="h-4 w-4" />,
      duration: 4000,
    });
  };

  // Handle editing payment item
  const handleEditPaymentItem = (item) => {
    setSelectedPaymentItem(item);
    setPaymentForm({
      itemName: item.itemName,
      amount: item.amount.toString(),
      description: item.description,
      mandatory: item.mandatory,
    });
    setIsEditDialogOpen(true);
  };

  // Handle updating payment item
  const handleUpdatePaymentItem = () => {
    if (!paymentForm.itemName || !paymentForm.amount) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
        duration: 3000,
      });
      return;
    }

    setPaymentStructure((prev) =>
      prev.map((item) =>
        item.id === selectedPaymentItem.id
          ? {
              ...item,
              itemName: paymentForm.itemName,
              amount: parseFloat(paymentForm.amount),
              description: paymentForm.description,
              mandatory: paymentForm.mandatory,
            }
          : item
      )
    );

    setPaymentForm({
      itemName: "",
      amount: "",
      description: "",
      mandatory: true,
    });
    setSelectedPaymentItem(null);
    setIsEditDialogOpen(false);

    toast.success("Payment Item Updated", {
      description: `${paymentForm.itemName} has been updated successfully.`,
      icon: <Edit className="h-4 w-4" />,
      duration: 4000,
    });
  };

  // Handle deleting payment item
  const handleDeletePaymentItem = (item) => {
    setSelectedPaymentItem(item);
    setIsDeleteDialogOpen(true);
  };

  // Confirm deletion
  const confirmDeletePaymentItem = () => {
    setPaymentStructure((prev) =>
      prev.filter((item) => item.id !== selectedPaymentItem.id)
    );

    toast.success("Payment Item Deleted", {
      description: `${selectedPaymentItem.itemName} has been removed from the payment structure.`,
      icon: <Trash2 className="h-4 w-4" />,
      duration: 4000,
    });

    setSelectedPaymentItem(null);
    setIsDeleteDialogOpen(false);
  };

  // Calculate totals
  const totalMandatory = paymentStructure
    .filter((item) => item.mandatory)
    .reduce((sum, item) => sum + item.amount, 0);

  const totalOptional = paymentStructure
    .filter((item) => !item.mandatory)
    .reduce((sum, item) => sum + item.amount, 0);

  const grandTotal = totalMandatory + totalOptional;

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Customization Payment
        </h2>
      </div>

      {/* Selection Form */}
      <Card className="animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Select Payment Session, Term and Class
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="level">Select Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Junior Secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="Senior Secondary">
                    Senior Secondary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Select Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {selectedLevel === "Primary" && (
                    <>
                      <SelectItem value="Primary 1">Primary 1</SelectItem>
                      <SelectItem value="Primary 2">Primary 2</SelectItem>
                      <SelectItem value="Primary 3">Primary 3</SelectItem>
                      <SelectItem value="Primary 4">Primary 4</SelectItem>
                      <SelectItem value="Primary 5">Primary 5</SelectItem>
                      <SelectItem value="Primary 6">Primary 6</SelectItem>
                    </>
                  )}
                  {selectedLevel === "Junior Secondary" && (
                    <>
                      <SelectItem value="JS 1">JS 1</SelectItem>
                      <SelectItem value="JS 2">JS 2</SelectItem>
                      <SelectItem value="JS 3">JS 3</SelectItem>
                    </>
                  )}
                  {selectedLevel === "Senior Secondary" && (
                    <>
                      <SelectItem value="SS 1">SS 1</SelectItem>
                      <SelectItem value="SS 2">SS 2</SelectItem>
                      <SelectItem value="SS 3">SS 3</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Select Term/Semester</Label>
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Term">First Term</SelectItem>
                  <SelectItem value="Second Term">Second Term</SelectItem>
                  <SelectItem value="Third Term">Third Term</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session">Select Session</Label>
              <Select
                value={selectedSession}
                onValueChange={setSelectedSession}
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024/2025">2024/2025</SelectItem>
                  <SelectItem value="2023/2024">2023/2024</SelectItem>
                  <SelectItem value="2022/2023">2022/2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleCheckPaymentStructure}
            disabled={isLoading}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Check Payment Structure
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Payment Structure Display */}
      {showPaymentStructure && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in delay-200">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-4">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Mandatory Fees
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      ₦{totalMandatory.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Optional Fees
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₦{totalOptional.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-full mr-4">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Amount
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      ₦{grandTotal.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Structure Table */}
          <Card className="animate-fade-in delay-300 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Payment Structure for {selectedLevel} - {selectedClass}
                <Badge className="bg-white text-blue-600 ml-auto">
                  {filteredPaymentStructure.length} Items
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    placeholder="Search payment items..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Payment Item
                </Button>
              </div>

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-gray-100">Item Name</TableHead>
                      <TableHead className="bg-gray-100">Category</TableHead>
                      <TableHead className="bg-gray-100">Amount</TableHead>
                      <TableHead className="bg-gray-100">Type</TableHead>
                      <TableHead className="bg-gray-100">Description</TableHead>
                      <TableHead className="bg-gray-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPaymentStructure.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {item.itemName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          ₦{item.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.mandatory
                                ? "bg-red-100 text-red-800 hover:bg-red-200"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            }
                          >
                            {item.mandatory ? "Mandatory" : "Optional"}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {item.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditPaymentItem(item)}
                              className="hover:bg-blue-50"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletePaymentItem(item)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPaymentStructure.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          {searchTerm
                            ? `No payment items found matching "${searchTerm}"`
                            : "No payment items found"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Create Payment Item Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Payment Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                value={paymentForm.itemName}
                onChange={(e) =>
                  setPaymentForm((prev) => ({
                    ...prev,
                    itemName: e.target.value,
                  }))
                }
                placeholder="Enter payment item name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                value={paymentForm.amount}
                onChange={(e) =>
                  setPaymentForm((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={paymentForm.description}
                onChange={(e) =>
                  setPaymentForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mandatory">Payment Type</Label>
              <Select
                value={paymentForm.mandatory.toString()}
                onValueChange={(value) =>
                  setPaymentForm((prev) => ({
                    ...prev,
                    mandatory: value === "true",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Mandatory</SelectItem>
                  <SelectItem value="false">Optional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreatePaymentItem}>
              <Save className="h-4 w-4 mr-2" />
              Create Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Payment Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editItemName">Item Name</Label>
              <Input
                id="editItemName"
                value={paymentForm.itemName}
                onChange={(e) =>
                  setPaymentForm((prev) => ({
                    ...prev,
                    itemName: e.target.value,
                  }))
                }
                placeholder="Enter payment item name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editAmount">Amount (₦)</Label>
              <Input
                id="editAmount"
                type="number"
                value={paymentForm.amount}
                onChange={(e) =>
                  setPaymentForm((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDescription">Description</Label>
              <Input
                id="editDescription"
                value={paymentForm.description}
                onChange={(e) =>
                  setPaymentForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editMandatory">Payment Type</Label>
              <Select
                value={paymentForm.mandatory.toString()}
                onValueChange={(value) =>
                  setPaymentForm((prev) => ({
                    ...prev,
                    mandatory: value === "true",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Mandatory</SelectItem>
                  <SelectItem value="false">Optional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdatePaymentItem}>
              <Save className="h-4 w-4 mr-2" />
              Update Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedPaymentItem?.itemName}"?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeletePaymentItem}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Item
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CustomizationPayment;
