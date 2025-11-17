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
  FileText,
  Printer,
  Copy,
  Download,
  Check,
  X,
  Award,
  Gift,
  Trophy,
  Medal,
  Star,
  Crown,
  DollarSign,
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

const ManageAwards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addForm, setAddForm] = useState({
    title: "",
    type: "",
    category: "",
    level: "",
    monetaryValue: "",
    physicalReward: "",
    description: "",
    criteria: "",
    currency: "USD",
    status: "active",
    displayOnWebsite: true,
    image: "",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    type: "",
    category: "",
    level: "",
    monetaryValue: "",
    physicalReward: "",
    description: "",
    criteria: "",
    currency: "",
    status: "",
    displayOnWebsite: false,
    image: "",
  });

  // Award Types
  const awardTypes = [
    { value: "monetary", label: "Monetary Award", icon: DollarSign },
    { value: "physical", label: "Physical Gift/Trophy", icon: Gift },
    { value: "certificate", label: "Certificate/Recognition", icon: FileText },
    { value: "combined", label: "Monetary + Physical", icon: Trophy },
  ];

  // Award Categories
  const awardCategories = [
    { value: "academic", label: "Academic Excellence", icon: Star },
    { value: "sports", label: "Sports & Athletics", icon: Trophy },
    { value: "leadership", label: "Leadership", icon: Crown },
    { value: "arts", label: "Arts & Culture", icon: Medal },
    { value: "community", label: "Community Service", icon: Award },
    { value: "attendance", label: "Attendance", icon: Check },
    { value: "behavior", label: "Good Behavior", icon: Star },
    { value: "special", label: "Special Achievement", icon: Trophy },
  ];

  // Mock data for awards list with enhanced structure
  const [awardsList, setAwardsList] = useState([
    {
      id: 1,
      title: "Academic Excellence Award",
      type: "combined",
      category: "academic",
      level: "All Levels",
      monetaryValue: 500,
      physicalReward: "Gold Medal + Trophy",
      description:
        "Highest academic achievement recognition with both monetary and physical rewards",
      criteria: "Overall Average above 3.8 and exemplary conduct",
      currency: "USD",
      status: "active",
      displayOnWebsite: true,
      image: "/academic-excellence.jpg",
      recipients: 15,
      dateCreated: "2024-01-15",
    },
    {
      id: 2,
      title: "Leadership Excellence",
      type: "physical",
      category: "leadership",
      level: "Senior Secondary",
      monetaryValue: 0,
      physicalReward: "Leadership Badge + Certificate",
      description:
        "Recognition for outstanding leadership skills and student mentorship",
      criteria:
        "Demonstrated leadership in student activities and peer support",
      currency: "USD",
      status: "active",
      displayOnWebsite: true,
      image: "/leadership-award.jpg",
      recipients: 8,
      dateCreated: "2024-02-01",
    },
    {
      id: 3,
      title: "Sports Champion",
      type: "monetary",
      category: "sports",
      level: "All Levels",
      monetaryValue: 250,
      physicalReward: "",
      description: "Monetary reward for exceptional sports performance",
      criteria: "First place in inter-school competitions",
      currency: "USD",
      status: "active",
      displayOnWebsite: true,
      image: "/sports-champion.jpg",
      recipients: 12,
      dateCreated: "2024-01-20",
    },
    {
      id: 4,
      title: "Perfect Attendance Award",
      type: "certificate",
      category: "attendance",
      level: "Elementary",
      monetaryValue: 0,
      physicalReward: "Certificate of Excellence",
      description:
        "Recognition certificate for perfect attendance throughout the term",
      criteria: "Zero absences during the academic term",
      currency: "USD",
      status: "active",
      displayOnWebsite: true,
      image: "/perfect-attendance.jpg",
      recipients: 45,
      dateCreated: "2024-01-10",
    },
    {
      id: 5,
      title: "Arts & Culture Star",
      type: "combined",
      category: "arts",
      level: "All Levels",
      monetaryValue: 200,
      physicalReward: "Art Supplies Kit + Trophy",
      description:
        "Combined reward for excellence in arts and cultural activities",
      criteria:
        "Outstanding performance in arts competitions or cultural events",
      currency: "USD",
      status: "active",
      displayOnWebsite: true,
      image: "/arts-culture.jpg",
      recipients: 6,
      dateCreated: "2024-02-15",
    },
    {
      id: 6,
      title: "Community Service Hero",
      type: "physical",
      category: "community",
      level: "All Levels",
      monetaryValue: 0,
      physicalReward: "Service Medal + Community Certificate",
      description:
        "Recognition for outstanding community service and social impact",
      criteria: "Minimum 50 hours of verified community service",
      currency: "USD",
      status: "active",
      displayOnWebsite: true,
      image: "/community-service.jpg",
      recipients: 18,
      dateCreated: "2024-01-25",
    },
  ]);

  // Filter awards list based on search term
  const filteredAwardsList = awardsList.filter(
    (award) =>
      award.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get category icon
  const getCategoryIcon = (category) => {
    const categoryData = awardCategories.find((cat) => cat.value === category);
    return categoryData ? categoryData.icon : Award;
  };

  // Get type icon
  const getTypeIcon = (type) => {
    const typeData = awardTypes.find((t) => t.value === type);
    return typeData ? typeData.icon : Award;
  };

  // Action handlers
  const handleAdd = () => {
    setAddForm({
      title: "",
      type: "",
      category: "",
      level: "",
      monetaryValue: "",
      physicalReward: "",
      description: "",
      criteria: "",
      currency: "USD",
      status: "active",
      displayOnWebsite: true,
      image: "",
    });
    setIsAddDialogOpen(true);
  };

  const handleAddSubmit = () => {
    if (
      !addForm.title ||
      !addForm.type ||
      !addForm.category ||
      !addForm.level ||
      !addForm.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAward = {
      id: awardsList.length + 1,
      ...addForm,
      monetaryValue: parseFloat(addForm.monetaryValue) || 0,
      recipients: 0,
      dateCreated: new Date().toISOString().split("T")[0],
    };

    setAwardsList([...awardsList, newAward]);
    setIsAddDialogOpen(false);
    toast.success("Award added successfully!", {
      description: `${addForm.title} has been added to the awards system.`,
    });
  };

  const handleEdit = (award) => {
    setSelectedItem(award);
    setEditForm({ ...award });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    const updatedAwards = awardsList.map((award) =>
      award.id === selectedItem.id
        ? {
            ...editForm,
            monetaryValue: parseFloat(editForm.monetaryValue) || 0,
          }
        : award
    );
    setAwardsList(updatedAwards);
    setIsEditDialogOpen(false);
    toast.success("Award updated successfully!");
  };

  const handleDelete = (id) => {
    const updatedAwards = awardsList.filter((award) => award.id !== id);
    setAwardsList(updatedAwards);
    toast.success("Award deleted successfully!");
  };

  const handleUpdateChanges = () => {
    toast.success("All changes have been saved successfully!", {
      description: "Awards system has been updated.",
    });
  };

  const handleExport = (type) => {
    const data = filteredAwardsList.map((award) => ({
      Title: award.title,
      Type: award.type,
      Category: award.category,
      Level: award.level,
      "Monetary Value": award.monetaryValue
        ? `${award.currency} ${award.monetaryValue}`
        : "N/A",
      "Physical Reward": award.physicalReward || "N/A",
      Description: award.description,
      Recipients: award.recipients,
      Status: award.status,
      "Display on Website": award.displayOnWebsite ? "Yes" : "No",
    }));

    if (type === "csv") {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        Object.keys(data[0]).join(",") +
        "\n" +
        data.map((row) => Object.values(row).join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "awards_list.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast.success(
      `Awards list exported as ${type.toUpperCase()} successfully!`
    );
  };

  const handleCopy = () => {
    const tableData = filteredAwardsList
      .map(
        (award) =>
          `${award.title}\t${award.type}\t${award.category}\t${award.level}\t${
            award.monetaryValue
              ? `${award.currency} ${award.monetaryValue}`
              : "N/A"
          }\t${award.physicalReward || "N/A"}\t${award.recipients}\t${
            award.status
          }`
      )
      .join("\n");

    const headers =
      "Title\tType\tCategory\tLevel\tMonetary Value\tPhysical Reward\tRecipients\tStatus\n";
    const fullData = headers + tableData;

    navigator.clipboard
      .writeText(fullData)
      .then(() => {
        toast.success("Awards data copied to clipboard!", {
          description:
            "You can now paste this data into any spreadsheet application.",
        });
      })
      .catch(() => {
        toast.error("Failed to copy data", {
          description: "Unable to copy data to clipboard. Please try again.",
        });
      });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Awards & Recognition Management
        </h2>
        <div className="flex gap-3">
          <Button
            className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleUpdateChanges}
          >
            <Check className="mr-2 h-4 w-4" /> Update Changes
          </Button>
          <Button
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleAdd}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Award
          </Button>
        </div>
      </div>

      <Card className="animate-fade-in delay-100 mt-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Awards & Recognition System
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search awards..."
                className="pl-10 px-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-green-50 hover:border-green-300"
                onClick={() => handleExport("csv")}
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-gray-50 hover:border-gray-300"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>
                Current awards and recognition system for student achievements.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Award Title</TableHead>
                  <TableHead className="bg-gray-100">Type</TableHead>
                  <TableHead className="bg-gray-100">Category</TableHead>
                  <TableHead className="bg-gray-100">Level</TableHead>
                  <TableHead className="bg-gray-100">Value/Reward</TableHead>
                  <TableHead className="bg-gray-100">Recipients</TableHead>
                  <TableHead className="bg-gray-100">Website</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAwardsList.map((award) => {
                  const TypeIcon = getTypeIcon(award.type);
                  const CategoryIcon = getCategoryIcon(award.category);

                  return (
                    <TableRow key={award.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-eduos-primary" />
                          {award.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-3 w-3" />
                          <span className="capitalize">
                            {award.type.replace("_", " ")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-3 w-3" />
                          <span className="capitalize">{award.category}</span>
                        </div>
                      </TableCell>
                      <TableCell>{award.level}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {award.monetaryValue > 0 && (
                            <div className="text-green-600 font-medium">
                              {award.currency} {award.monetaryValue}
                            </div>
                          )}
                          {award.physicalReward && (
                            <div className="text-blue-600 text-sm">
                              {award.physicalReward}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <span className="font-semibold text-eduos-primary">
                            {award.recipients}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            award.displayOnWebsite ? "default" : "secondary"
                          }
                          className={
                            award.displayOnWebsite
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {award.displayOnWebsite ? "Visible" : "Hidden"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            award.status === "active" ? "default" : "secondary"
                          }
                          className={
                            award.status === "active"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {award.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(award)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(award.id)}
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

          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{filteredAwardsList.length}</span>{" "}
              of <span className="font-medium">{awardsList.length}</span> awards
              <span className="ml-4 text-eduos-primary font-medium">
                Total Active Awards:{" "}
                {awardsList.filter((award) => award.status === "active").length}
              </span>
              <span className="ml-4 text-green-600 font-medium">
                Website Visible:{" "}
                {
                  awardsList.filter(
                    (award) =>
                      award.displayOnWebsite && award.status === "active"
                  ).length
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Award Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Award</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addTitle">Award Title *</Label>
                <Input
                  id="addTitle"
                  value={addForm.title}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter award title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addType">Award Type *</Label>
                <Select
                  value={addForm.type}
                  onValueChange={(value) =>
                    setAddForm((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select award type" />
                  </SelectTrigger>
                  <SelectContent>
                    {awardTypes.map((type) => (
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
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                    {awardCategories.map((category) => (
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
                <Label htmlFor="addLevel">Education Level *</Label>
                <Select
                  value={addForm.level}
                  onValueChange={(value) =>
                    setAddForm((prev) => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Levels">All Levels</SelectItem>
                    <SelectItem value="Elementary">Elementary</SelectItem>
                    <SelectItem value="Middle School">Middle School</SelectItem>
                    <SelectItem value="High School">High School</SelectItem>
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
            </div>

            {(addForm.type === "monetary" || addForm.type === "combined") && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="addMonetaryValue">Monetary Value</Label>
                  <Input
                    id="addMonetaryValue"
                    type="number"
                    value={addForm.monetaryValue}
                    onChange={(e) =>
                      setAddForm((prev) => ({
                        ...prev,
                        monetaryValue: e.target.value,
                      }))
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
              </div>
            )}

            {(addForm.type === "physical" ||
              addForm.type === "combined" ||
              addForm.type === "certificate") && (
              <div className="space-y-2">
                <Label htmlFor="addPhysicalReward">
                  Physical Reward/Gift Description
                </Label>
                <Input
                  id="addPhysicalReward"
                  value={addForm.physicalReward}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      physicalReward: e.target.value,
                    }))
                  }
                  placeholder="e.g., Trophy + Certificate, Medal, Gift Voucher, etc."
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="addDescription">Award Description *</Label>
              <Textarea
                id="addDescription"
                value={addForm.description}
                onChange={(e) =>
                  setAddForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter detailed description of the award..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addCriteria">Award Criteria</Label>
              <Textarea
                id="addCriteria"
                value={addForm.criteria}
                onChange={(e) =>
                  setAddForm((prev) => ({
                    ...prev,
                    criteria: e.target.value,
                  }))
                }
                placeholder="Enter criteria for earning this award..."
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

              <div className="space-y-2">
                <Label htmlFor="addWebsiteDisplay">Display on Website</Label>
                <Select
                  value={addForm.displayOnWebsite ? "yes" : "no"}
                  onValueChange={(value) =>
                    setAddForm((prev) => ({
                      ...prev,
                      displayOnWebsite: value === "yes",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, Show on Website</SelectItem>
                    <SelectItem value="no">No, Admin Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addImage">Award Image URL</Label>
                <Input
                  id="addImage"
                  value={addForm.image}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/award-image.jpg"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubmit}>
              <Award className="h-4 w-4 mr-2" />
              Add Award
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Award Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Award</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editTitle">Award Title *</Label>
                <Input
                  id="editTitle"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter award title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editType">Award Type *</Label>
                <Select
                  value={editForm.type}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select award type" />
                  </SelectTrigger>
                  <SelectContent>
                    {awardTypes.map((type) => (
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
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                    {awardCategories.map((category) => (
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
                <Label htmlFor="editLevel">Education Level *</Label>
                <Select
                  value={editForm.level}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Levels">All Levels</SelectItem>
                    <SelectItem value="Elementary">Elementary</SelectItem>
                    <SelectItem value="Middle School">Middle School</SelectItem>
                    <SelectItem value="High School">High School</SelectItem>
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
            </div>

            {(editForm.type === "monetary" || editForm.type === "combined") && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editMonetaryValue">Monetary Value</Label>
                  <Input
                    id="editMonetaryValue"
                    type="number"
                    value={editForm.monetaryValue}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        monetaryValue: e.target.value,
                      }))
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
              </div>
            )}

            {(editForm.type === "physical" ||
              editForm.type === "combined" ||
              editForm.type === "certificate") && (
              <div className="space-y-2">
                <Label htmlFor="editPhysicalReward">
                  Physical Reward/Gift Description
                </Label>
                <Input
                  id="editPhysicalReward"
                  value={editForm.physicalReward}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      physicalReward: e.target.value,
                    }))
                  }
                  placeholder="e.g., Trophy + Certificate, Medal, Gift Voucher, etc."
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="editDescription">Award Description *</Label>
              <Textarea
                id="editDescription"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter detailed description of the award..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editCriteria">Award Criteria</Label>
              <Textarea
                id="editCriteria"
                value={editForm.criteria}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    criteria: e.target.value,
                  }))
                }
                placeholder="Enter criteria for earning this award..."
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

              <div className="space-y-2">
                <Label htmlFor="editWebsiteDisplay">Display on Website</Label>
                <Select
                  value={editForm.displayOnWebsite ? "yes" : "no"}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({
                      ...prev,
                      displayOnWebsite: value === "yes",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, Show on Website</SelectItem>
                    <SelectItem value="no">No, Admin Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editImage">Award Image URL</Label>
                <Input
                  id="editImage"
                  value={editForm.image}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/award-image.jpg"
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
              Update Award
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAwards;
