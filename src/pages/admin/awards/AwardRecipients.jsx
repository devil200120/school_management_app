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
  Copy,
  Check,
  Award,
  User,
  Calendar,
  Star,
  Trophy,
  Medal,
  Gift,
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

const AwardRecipients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterYear, setFilterYear] = useState("all");

  const [addForm, setAddForm] = useState({
    studentName: "",
    studentId: "",
    awardTitle: "",
    category: "",
    dateAwarded: "",
    academicYear: "",
    class: "",
    remarks: "",
    presentedBy: "",
  });

  const [editForm, setEditForm] = useState({
    studentName: "",
    studentId: "",
    awardTitle: "",
    category: "",
    dateAwarded: "",
    academicYear: "",
    class: "",
    remarks: "",
    presentedBy: "",
  });

  // Mock data for award recipients
  const [recipients, setRecipients] = useState([
    {
      id: 1,
      studentName: "Emily Johnson",
      studentId: "STU-2024-001",
      awardTitle: "Academic Excellence Award",
      category: "academic",
      dateAwarded: "2024-06-15",
      academicYear: "2023-2024",
      class: "Grade 12A",
      monetaryValue: 500,
      physicalReward: "Gold Medal + Trophy",
      remarks: "Outstanding performance in all subjects with 98% average",
      presentedBy: "Principal Dr. Smith",
      image: "/students/emily.jpg",
    },
    {
      id: 2,
      studentName: "Marcus Thompson",
      studentId: "STU-2024-002",
      awardTitle: "Leadership Excellence",
      category: "leadership",
      dateAwarded: "2024-05-20",
      academicYear: "2023-2024",
      class: "Grade 11B",
      monetaryValue: 0,
      physicalReward: "Leadership Badge + Certificate",
      remarks: "Exceptional leadership as student council president",
      presentedBy: "Vice Principal Mrs. Davis",
      image: "/students/marcus.jpg",
    },
    {
      id: 3,
      studentName: "Sofia Rodriguez",
      studentId: "STU-2024-003",
      awardTitle: "Sports Champion",
      category: "sports",
      dateAwarded: "2024-04-10",
      academicYear: "2023-2024",
      class: "Grade 10C",
      monetaryValue: 250,
      physicalReward: "",
      remarks: "First place in state-level swimming championship",
      presentedBy: "Sports Director Mr. Wilson",
      image: "/students/sofia.jpg",
    },
    {
      id: 4,
      studentName: "David Chen",
      studentId: "STU-2024-004",
      awardTitle: "Arts & Culture Star",
      category: "arts",
      dateAwarded: "2024-03-25",
      academicYear: "2023-2024",
      class: "Grade 9A",
      monetaryValue: 200,
      physicalReward: "Art Supplies Kit + Trophy",
      remarks: "Outstanding performance in national art competition",
      presentedBy: "Art Teacher Ms. Anderson",
      image: "/students/david.jpg",
    },
    {
      id: 5,
      studentName: "Isabella White",
      studentId: "STU-2024-005",
      awardTitle: "Community Service Hero",
      category: "community",
      dateAwarded: "2024-02-14",
      academicYear: "2023-2024",
      class: "Grade 11A",
      monetaryValue: 0,
      physicalReward: "Service Medal + Community Certificate",
      remarks: "Completed 120+ hours of community service",
      presentedBy: "Community Liaison Mrs. Taylor",
      image: "/students/isabella.jpg",
    },
    {
      id: 6,
      studentName: "James Mitchell",
      studentId: "STU-2024-006",
      awardTitle: "Perfect Attendance Award",
      category: "attendance",
      dateAwarded: "2024-06-30",
      academicYear: "2023-2024",
      class: "Grade 8B",
      monetaryValue: 0,
      physicalReward: "Certificate of Excellence",
      remarks: "Perfect attendance for entire academic year",
      presentedBy: "Homeroom Teacher Mr. Brown",
      image: "/students/james.jpg",
    },
  ]);

  // Awards list for dropdown
  const availableAwards = [
    "Academic Excellence Award",
    "Leadership Excellence",
    "Sports Champion",
    "Arts & Culture Star",
    "Community Service Hero",
    "Perfect Attendance Award",
    "Science Fair Award",
    "Mathematics Olympiad",
    "Debate Championship",
    "Environmental Stewardship",
  ];

  // Categories
  const categories = [
    { value: "academic", label: "Academic", icon: Star },
    { value: "sports", label: "Sports", icon: Trophy },
    { value: "leadership", label: "Leadership", icon: Award },
    { value: "arts", label: "Arts & Culture", icon: Medal },
    { value: "community", label: "Community Service", icon: Gift },
    { value: "attendance", label: "Attendance", icon: Check },
  ];

  // Get category icon
  const getCategoryIcon = (category) => {
    const categoryData = categories.find((cat) => cat.value === category);
    return categoryData ? categoryData.icon : Award;
  };

  // Filter recipients
  const filteredRecipients = recipients.filter((recipient) => {
    const matchesSearch =
      recipient.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.awardTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.class.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || recipient.category === filterCategory;
    const matchesYear =
      filterYear === "all" || recipient.academicYear === filterYear;

    return matchesSearch && matchesCategory && matchesYear;
  });

  // Get unique academic years
  const academicYears = [...new Set(recipients.map((r) => r.academicYear))]
    .sort()
    .reverse();

  // Action handlers
  const handleAdd = () => {
    setAddForm({
      studentName: "",
      studentId: "",
      awardTitle: "",
      category: "",
      dateAwarded: "",
      academicYear: "",
      class: "",
      remarks: "",
      presentedBy: "",
    });
    setIsAddDialogOpen(true);
  };

  const handleAddSubmit = () => {
    if (!addForm.studentName || !addForm.awardTitle || !addForm.dateAwarded) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newRecipient = {
      id: recipients.length + 1,
      ...addForm,
      monetaryValue: 0, // This would be fetched from the award data
      physicalReward: "", // This would be fetched from the award data
      image: "/students/placeholder.jpg",
    };

    setRecipients([...recipients, newRecipient]);
    setIsAddDialogOpen(false);
    toast.success("Award recipient added successfully!", {
      description: `${addForm.studentName} has been awarded ${addForm.awardTitle}.`,
    });
  };

  const handleEdit = (recipient) => {
    setSelectedRecipient(recipient);
    setEditForm({ ...recipient });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    const updatedRecipients = recipients.map((recipient) =>
      recipient.id === selectedRecipient.id ? { ...editForm } : recipient
    );
    setRecipients(updatedRecipients);
    setIsEditDialogOpen(false);
    toast.success("Award recipient updated successfully!");
  };

  const handleDelete = (id) => {
    const updatedRecipients = recipients.filter(
      (recipient) => recipient.id !== id
    );
    setRecipients(updatedRecipients);
    toast.success("Award recipient removed successfully!");
  };

  const handleExport = () => {
    const data = filteredRecipients.map((recipient) => ({
      "Student Name": recipient.studentName,
      "Student ID": recipient.studentId,
      "Award Title": recipient.awardTitle,
      Category: recipient.category,
      "Date Awarded": recipient.dateAwarded,
      "Academic Year": recipient.academicYear,
      Class: recipient.class,
      "Monetary Value": recipient.monetaryValue || "N/A",
      "Physical Reward": recipient.physicalReward || "N/A",
      "Presented By": recipient.presentedBy,
      Remarks: recipient.remarks,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "award_recipients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Award recipients data exported successfully!");
  };

  const handleCopy = () => {
    const tableData = filteredRecipients
      .map(
        (recipient) =>
          `${recipient.studentName}\t${recipient.studentId}\t${recipient.awardTitle}\t${recipient.category}\t${recipient.dateAwarded}\t${recipient.class}\t${recipient.presentedBy}`
      )
      .join("\n");

    const headers =
      "Student Name\tStudent ID\tAward Title\tCategory\tDate Awarded\tClass\tPresented By\n";
    const fullData = headers + tableData;

    navigator.clipboard
      .writeText(fullData)
      .then(() => {
        toast.success("Recipients data copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy data to clipboard.");
      });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Award Recipients
        </h2>
        <div className="flex gap-3">
          <Button
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleAdd}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Recipient
          </Button>
        </div>
      </div>

      <Card className="animate-fade-in delay-100 mt-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Award Recipients Management
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
                  placeholder="Search recipients..."
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

              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {academicYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
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
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-gray-50 hover:border-gray-300"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>

          {/* Recipients Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>
                Award recipients and their achievement records.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Student</TableHead>
                  <TableHead className="bg-gray-100">Award</TableHead>
                  <TableHead className="bg-gray-100">Category</TableHead>
                  <TableHead className="bg-gray-100">Date</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Reward</TableHead>
                  <TableHead className="bg-gray-100">Presented By</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecipients.map((recipient) => {
                  const CategoryIcon = getCategoryIcon(recipient.category);

                  return (
                    <TableRow key={recipient.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-semibold">
                              {recipient.studentName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {recipient.studentId}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          {recipient.awardTitle}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-4 w-4 text-eduos-primary" />
                          <Badge variant="outline" className="capitalize">
                            {recipient.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(recipient.dateAwarded).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{recipient.class}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {recipient.monetaryValue > 0 && (
                            <div className="text-green-600 text-sm font-medium">
                              ${recipient.monetaryValue}
                            </div>
                          )}
                          {recipient.physicalReward && (
                            <div className="text-blue-600 text-xs">
                              {recipient.physicalReward}
                            </div>
                          )}
                          {!recipient.monetaryValue &&
                            !recipient.physicalReward && (
                              <span className="text-gray-400 text-sm">
                                Certificate
                              </span>
                            )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {recipient.presentedBy}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(recipient)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(recipient.id)}
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
              <span className="font-medium">{filteredRecipients.length}</span>{" "}
              of <span className="font-medium">{recipients.length}</span>{" "}
              recipients
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-green-600 font-medium">
                Total Awards: {recipients.length}
              </span>
              <span className="text-blue-600 font-medium">
                This Year:{" "}
                {
                  recipients.filter((r) => r.academicYear === "2023-2024")
                    .length
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Recipient Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Award Recipient</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addStudentName">Student Name *</Label>
                <Input
                  id="addStudentName"
                  value={addForm.studentName}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      studentName: e.target.value,
                    }))
                  }
                  placeholder="Enter student full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addStudentId">Student ID</Label>
                <Input
                  id="addStudentId"
                  value={addForm.studentId}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      studentId: e.target.value,
                    }))
                  }
                  placeholder="STU-2024-XXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addAwardTitle">Award Title *</Label>
                <Select
                  value={addForm.awardTitle}
                  onValueChange={(value) =>
                    setAddForm((prev) => ({ ...prev, awardTitle: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select award" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAwards.map((award) => (
                      <SelectItem key={award} value={award}>
                        {award}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addCategory">Category</Label>
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
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addDateAwarded">Date Awarded *</Label>
                <Input
                  id="addDateAwarded"
                  type="date"
                  value={addForm.dateAwarded}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      dateAwarded: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addAcademicYear">Academic Year</Label>
                <Input
                  id="addAcademicYear"
                  value={addForm.academicYear}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      academicYear: e.target.value,
                    }))
                  }
                  placeholder="2023-2024"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addClass">Class</Label>
                <Input
                  id="addClass"
                  value={addForm.class}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, class: e.target.value }))
                  }
                  placeholder="Grade 10A"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="addPresentedBy">Presented By</Label>
              <Input
                id="addPresentedBy"
                value={addForm.presentedBy}
                onChange={(e) =>
                  setAddForm((prev) => ({
                    ...prev,
                    presentedBy: e.target.value,
                  }))
                }
                placeholder="Principal, Teacher, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addRemarks">Remarks</Label>
              <Textarea
                id="addRemarks"
                value={addForm.remarks}
                onChange={(e) =>
                  setAddForm((prev) => ({ ...prev, remarks: e.target.value }))
                }
                placeholder="Additional notes or achievements..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubmit}>
              <Award className="h-4 w-4 mr-2" />
              Add Recipient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Recipient Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Award Recipient</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editStudentName">Student Name *</Label>
                <Input
                  id="editStudentName"
                  value={editForm.studentName}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      studentName: e.target.value,
                    }))
                  }
                  placeholder="Enter student full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editStudentId">Student ID</Label>
                <Input
                  id="editStudentId"
                  value={editForm.studentId}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      studentId: e.target.value,
                    }))
                  }
                  placeholder="STU-2024-XXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editAwardTitle">Award Title *</Label>
                <Select
                  value={editForm.awardTitle}
                  onValueChange={(value) =>
                    setEditForm((prev) => ({ ...prev, awardTitle: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select award" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAwards.map((award) => (
                      <SelectItem key={award} value={award}>
                        {award}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editCategory">Category</Label>
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
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editDateAwarded">Date Awarded *</Label>
                <Input
                  id="editDateAwarded"
                  type="date"
                  value={editForm.dateAwarded}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      dateAwarded: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editAcademicYear">Academic Year</Label>
                <Input
                  id="editAcademicYear"
                  value={editForm.academicYear}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      academicYear: e.target.value,
                    }))
                  }
                  placeholder="2023-2024"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editClass">Class</Label>
                <Input
                  id="editClass"
                  value={editForm.class}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, class: e.target.value }))
                  }
                  placeholder="Grade 10A"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editPresentedBy">Presented By</Label>
              <Input
                id="editPresentedBy"
                value={editForm.presentedBy}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    presentedBy: e.target.value,
                  }))
                }
                placeholder="Principal, Teacher, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editRemarks">Remarks</Label>
              <Textarea
                id="editRemarks"
                value={editForm.remarks}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, remarks: e.target.value }))
                }
                placeholder="Additional notes or achievements..."
                rows={3}
              />
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
              Update Recipient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AwardRecipients;
