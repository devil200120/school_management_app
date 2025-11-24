import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
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
import { Badge } from "../../../components/ui/badge";
import {
  CreditCard,
  Users,
  Search,
  Printer,
  Download,
  Eye,
  Settings,
  BarChart3,
  UserCheck,
  QrCode,
  Wifi,
  Check,
  X,
  FileText,
  School,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  Plus,
  Filter,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const StaffIDCardGenerator = () => {
  const navigate = useNavigate();
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [previewMode, setPreviewMode] = useState(false);
  const [currentStaffPreview, setCurrentStaffPreview] = useState(null);

  // Dummy staff data
  const [staffData] = useState([
    {
      id: "STAFF001",
      employeeId: "EMP2024001",
      name: "Dr. Sarah Johnson",
      department: "Mathematics",
      role: "Head of Department",
      phone: "+1234567890",
      email: "sarah.johnson@school.edu",
      emergencyContact: "+0987654321",
      address: "123 Education Street, Learning City",
      dateJoined: "2020-08-15",
      photo: "/placeholder.svg",
      qrCode: "STAFF001QR",
    },
    {
      id: "STAFF002",
      employeeId: "EMP2024002",
      name: "Prof. Michael Chen",
      department: "Science",
      role: "Physics Teacher",
      phone: "+1234567891",
      email: "michael.chen@school.edu",
      emergencyContact: "+0987654322",
      address: "456 Science Avenue, Research Town",
      dateJoined: "2019-09-01",
      photo: "/placeholder.svg",
      qrCode: "STAFF002QR",
    },
    {
      id: "STAFF003",
      employeeId: "EMP2024003",
      name: "Ms. Emily Rodriguez",
      department: "Language Arts",
      role: "English Teacher",
      phone: "+1234567892",
      email: "emily.rodriguez@school.edu",
      emergencyContact: "+0987654323",
      address: "789 Literature Lane, Writing City",
      dateJoined: "2021-01-12",
      photo: "/placeholder.svg",
      qrCode: "STAFF003QR",
    },
    {
      id: "STAFF004",
      employeeId: "EMP2024004",
      name: "Mr. David Thompson",
      department: "Administration",
      role: "Vice Principal",
      phone: "+1234567893",
      email: "david.thompson@school.edu",
      emergencyContact: "+0987654324",
      address: "321 Admin Road, Management City",
      dateJoined: "2018-03-20",
      photo: "/placeholder.svg",
      qrCode: "STAFF004QR",
    },
    {
      id: "STAFF005",
      employeeId: "EMP2024005",
      name: "Mrs. Lisa Williams",
      department: "Arts",
      role: "Art Teacher",
      phone: "+1234567894",
      email: "lisa.williams@school.edu",
      emergencyContact: "+0987654325",
      address: "654 Creative Boulevard, Art District",
      dateJoined: "2020-11-08",
      photo: "/placeholder.svg",
      qrCode: "STAFF005QR",
    },
  ]);

  const departments = [
    "Mathematics",
    "Science",
    "Language Arts",
    "Administration",
    "Arts",
    "Physical Education",
    "Music",
    "Computer Science",
  ];

  const roles = [
    "Head of Department",
    "Teacher",
    "Assistant Teacher",
    "Principal",
    "Vice Principal",
    "Administrative Assistant",
    "Counselor",
    "Librarian",
  ];

  const templates = [
    { id: "professional", name: "Professional Blue", color: "bg-blue-600" },
    { id: "modern", name: "Modern Green", color: "bg-green-600" },
    { id: "elegant", name: "Elegant Purple", color: "bg-purple-600" },
    { id: "classic", name: "Classic Red", color: "bg-red-600" },
  ];

  // Filter staff based on search and filters
  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || staff.department === filterDepartment;
    const matchesRole = filterRole === "all" || staff.role === filterRole;

    return matchesSearch && matchesDepartment && matchesRole;
  });

  const handleStaffSelection = (staffId, isSelected) => {
    if (isSelected) {
      setSelectedStaff((prev) => [...prev, staffId]);
    } else {
      setSelectedStaff((prev) => prev.filter((id) => id !== staffId));
    }
  };

  const handleSelectAll = () => {
    if (selectedStaff.length === filteredStaff.length) {
      setSelectedStaff([]);
    } else {
      setSelectedStaff(filteredStaff.map((staff) => staff.id));
    }
  };

  const handleGenerateIDCards = () => {
    if (selectedStaff.length === 0) {
      toast.error("Please select at least one staff member");
      return;
    }

    const selectedStaffData = staffData.filter((staff) =>
      selectedStaff.includes(staff.id)
    );

    toast.success(
      `Starting ID card generation process for ${selectedStaff.length} staff member(s)...`
    );

    // Generate comprehensive ID card package
    let processedCount = 0;
    const totalCards = selectedStaffData.length;
    const generationResults = [];

    selectedStaffData.forEach((staff, index) => {
      setTimeout(() => {
        // Generate individual ID card data
        const idCardData = generateIDCardData(staff);

        // Create CSV file for each staff member's ID card
        const csvContent = createIDCardCSV(idCardData);
        downloadIDCard(staff, csvContent);

        generationResults.push({
          staffId: staff.id,
          name: staff.name,
          generated: true,
          timestamp: new Date().toISOString(),
        });

        processedCount++;
        toast.success(
          `ID card generated for ${staff.name} (${processedCount}/${totalCards})`
        );

        // When all cards are processed, generate summary report
        if (processedCount === totalCards) {
          setTimeout(() => {
            generateSummaryReport(generationResults);
            toast.success(
              `🎉 All ${totalCards} ID cards generated successfully! Summary report downloaded.`
            );
          }, 1000);
        }
      }, index * 1500); // Stagger generation to show progress
    });
  };

  const generateIDCardData = (staff) => {
    const currentDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(currentDate.getFullYear() + 1);

    return {
      // Basic Information
      employeeId: staff.employeeId,
      fullName: staff.name,
      department: staff.department,
      position: staff.role,
      photo: staff.photo,

      // Contact Information
      phone: staff.phone,
      email: staff.email,
      emergencyContact: staff.emergencyContact,
      address: staff.address,

      // Employment Details
      dateJoined: staff.dateJoined,
      cardIssueDate: currentDate.toISOString().split("T")[0],
      cardExpiryDate: expiryDate.toISOString().split("T")[0],

      // Security Information
      qrCode: `EDUOS_${staff.employeeId}_${currentDate.getTime()}`,
      accessLevel: determineAccessLevel(staff.role),
      cardNumber: generateCardNumber(staff.employeeId),

      // Template Information
      template: selectedTemplate,

      // School Information
      schoolName: "EDUOS ACADEMY",
      schoolAddress: "123 Education Boulevard, Learning City, LC 12345",
      schoolPhone: "+1-234-567-8900",
      principalName: "Dr. Margaret Anderson",
    };
  };

  const determineAccessLevel = (role) => {
    const accessLevels = {
      Principal: "LEVEL_5_EXECUTIVE",
      "Vice Principal": "LEVEL_4_ADMIN",
      "Head of Department": "LEVEL_3_DEPARTMENT",
      "Senior Teacher": "LEVEL_2_SENIOR",
      Teacher: "LEVEL_1_STANDARD",
      "Assistant Teacher": "LEVEL_1_STANDARD",
      Administrator: "LEVEL_3_DEPARTMENT",
      Counselor: "LEVEL_2_SENIOR",
    };
    return accessLevels[role] || "LEVEL_1_STANDARD";
  };

  const generateCardNumber = (employeeId) => {
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `EDU${year}${employeeId.replace("STAFF", "")}${randomSuffix}`;
  };

  const createIDCardCSV = (cardData) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      `EDUOS ACADEMY - STAFF IDENTIFICATION CARD\n` +
      `Generated: ${new Date().toLocaleString()}\n` +
      `Template: ${selectedTemplate.toUpperCase()}\n\n` +
      `PERSONAL INFORMATION\n` +
      `Full Name,${cardData.fullName}\n` +
      `Employee ID,${cardData.employeeId}\n` +
      `Department,${cardData.department}\n` +
      `Position,${cardData.position}\n` +
      `Date Joined,${cardData.dateJoined}\n\n` +
      `CONTACT DETAILS\n` +
      `Phone,${cardData.phone}\n` +
      `Email,${cardData.email}\n` +
      `Emergency Contact,${cardData.emergencyContact}\n` +
      `Address,"${cardData.address}"\n\n` +
      `CARD INFORMATION\n` +
      `Card Number,${cardData.cardNumber}\n` +
      `Issue Date,${cardData.cardIssueDate}\n` +
      `Expiry Date,${cardData.cardExpiryDate}\n` +
      `Access Level,${cardData.accessLevel}\n` +
      `QR Code,${cardData.qrCode}\n\n` +
      `SCHOOL INFORMATION\n` +
      `School Name,${cardData.schoolName}\n` +
      `School Address,"${cardData.schoolAddress}"\n` +
      `School Phone,${cardData.schoolPhone}\n` +
      `Principal,${cardData.principalName}\n\n` +
      `SECURITY FEATURES\n` +
      `Digital Signature,SHA256:${btoa(cardData.qrCode).substring(0, 16)}\n` +
      `Verification Code,${cardData.cardNumber.substring(-8)}\n` +
      `Hologram Serial,HOL${Math.floor(Math.random() * 10000)}\n\n` +
      `USAGE INSTRUCTIONS\n` +
      `"This ID card provides access to school facilities based on the assigned access level."\n` +
      `"Present this card at security checkpoints and for school-related transactions."\n` +
      `"Report immediately if lost or stolen to the administration office."\n` +
      `"Card must be renewed annually before expiry date."\n`;

    return csvContent;
  };

  const downloadIDCard = (staff, csvContent) => {
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `ID_Card_${staff.name.replace(/\s+/g, "_")}_${staff.employeeId}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateSummaryReport = (results) => {
    const summaryContent =
      "data:text/csv;charset=utf-8," +
      `EDUOS ACADEMY - ID CARD GENERATION SUMMARY REPORT\n` +
      `Generation Date: ${new Date().toLocaleString()}\n` +
      `Total Cards Generated: ${results.length}\n` +
      `Template Used: ${selectedTemplate.toUpperCase()}\n` +
      `Batch ID: BATCH_${new Date().toISOString().split("T")[0]}_${Math.floor(
        Math.random() * 1000
      )}\n\n` +
      `GENERATION STATISTICS\n` +
      `Successful Generations: ${results.filter((r) => r.generated).length}\n` +
      `Failed Generations: ${results.filter((r) => !r.generated).length}\n` +
      `Success Rate: ${(
        (results.filter((r) => r.generated).length / results.length) *
        100
      ).toFixed(1)}%\n\n` +
      `DETAILED RESULTS\n` +
      `Staff ID,Staff Name,Status,Generation Time\n` +
      results
        .map(
          (result) =>
            `${result.staffId},"${result.name}",${
              result.generated ? "SUCCESS" : "FAILED"
            },${new Date(result.timestamp).toLocaleString()}`
        )
        .join("\n") +
      "\n\n" +
      `NEXT STEPS\n` +
      `"1. Review generated ID card files for accuracy"\n` +
      `"2. Print ID cards using recommended card printer settings"\n` +
      `"3. Laminate cards for durability and security"\n` +
      `"4. Distribute cards to respective staff members"\n` +
      `"5. Update staff database with card issuance records"\n` +
      `"6. Schedule card renewal reminders for next year"\n\n` +
      `PRINT SPECIFICATIONS\n` +
      `Card Size: 85.60 × 53.98 mm (CR80 Standard)\n` +
      `Print Resolution: 300 DPI minimum\n` +
      `Material: PVC plastic with security features\n` +
      `Orientation: Landscape\n` +
      `Color Mode: CMYK for professional quality\n`;

    const encodedUri = encodeURI(summaryContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `ID_Card_Generation_Summary_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviewCard = (staff) => {
    setCurrentStaffPreview(staff);
    setPreviewMode(true);
  };

  const IDCardPreview = ({ staff, template }) => {
    const templateColors = {
      professional: {
        primary: "bg-blue-600",
        secondary: "bg-blue-50",
        text: "text-blue-900",
        accent: "border-blue-200",
      },
      modern: {
        primary: "bg-green-600",
        secondary: "bg-green-50",
        text: "text-green-900",
        accent: "border-green-200",
      },
      elegant: {
        primary: "bg-purple-600",
        secondary: "bg-purple-50",
        text: "text-purple-900",
        accent: "border-purple-200",
      },
      classic: {
        primary: "bg-red-600",
        secondary: "bg-red-50",
        text: "text-red-900",
        accent: "border-red-200",
      },
    };

    const colors = templateColors[template] || templateColors.professional;

    return (
      <div className="w-80 h-48 mx-auto bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
        {/* Header */}
        <div className={`${colors.primary} text-white p-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <School size={20} />
              <span className="font-bold text-sm">EDUOS ACADEMY</span>
            </div>
            <div className="text-xs">STAFF ID</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex gap-3">
          {/* Photo */}
          <div className="w-16 h-20 bg-gray-200 rounded border overflow-hidden flex-shrink-0">
            <img
              src={staff.photo}
              alt={staff.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-1">
            <h3 className={`font-bold text-sm ${colors.text}`}>{staff.name}</h3>
            <p className="text-xs text-gray-600">{staff.role}</p>
            <p className="text-xs text-gray-600">{staff.department}</p>
            <p className="text-xs font-mono text-gray-800">
              ID: {staff.employeeId}
            </p>
            <div className="flex justify-between items-end mt-2">
              <div className="text-xs text-gray-500">
                Valid: {new Date().getFullYear()}-{new Date().getFullYear() + 1}
              </div>
              <QrCode size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <CreditCard className="text-blue-600" />
                Staff ID Card Generator
              </h1>
              <p className="text-gray-600">
                Generate and manage staff identification cards
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-blue-600">
                {filteredStaff.length} Staff Members
              </Badge>
              <Badge variant="outline" className="text-green-600">
                {selectedStaff.length} Selected
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Template Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings size={18} />
                  Card Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded ${template.color}`}
                      ></div>
                      <span className="font-medium text-sm">
                        {template.name}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bulk Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users size={18} />
                  Bulk Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bulk-mode"
                    checked={bulkMode}
                    onCheckedChange={setBulkMode}
                  />
                  <Label htmlFor="bulk-mode" className="text-sm">
                    Enable bulk selection
                  </Label>
                </div>

                <Button
                  onClick={handleSelectAll}
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={!bulkMode}
                >
                  {selectedStaff.length === filteredStaff.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>

                <Button
                  onClick={handleGenerateIDCards}
                  className="w-full"
                  disabled={selectedStaff.length === 0}
                >
                  <Printer size={16} className="mr-2" />
                  Generate Cards ({selectedStaff.length})
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Staff List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <Input
                        placeholder="Search by name or employee ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select
                    value={filterDepartment}
                    onValueChange={setFilterDepartment}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Staff Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Staff Members</span>
                  <Button variant="outline" size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Staff
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {bulkMode && (
                        <TableHead className="w-12">
                          <Checkbox
                            checked={
                              selectedStaff.length === filteredStaff.length &&
                              filteredStaff.length > 0
                            }
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                      )}
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((staff) => (
                      <TableRow key={staff.id}>
                        {bulkMode && (
                          <TableCell>
                            <Checkbox
                              checked={selectedStaff.includes(staff.id)}
                              onCheckedChange={(checked) =>
                                handleStaffSelection(staff.id, checked)
                              }
                            />
                          </TableCell>
                        )}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                              <img
                                src={staff.photo}
                                alt={staff.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/placeholder.svg";
                                }}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{staff.name}</div>
                              <div className="text-sm text-gray-500">
                                {staff.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{staff.department}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{staff.role}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm">
                            {staff.employeeId}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePreviewCard(staff)}
                            >
                              <Eye size={14} className="mr-1" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedStaff([staff.id]);
                                handleGenerateIDCards();
                              }}
                            >
                              <Printer size={14} className="mr-1" />
                              Generate
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Dialog */}
        <Dialog open={previewMode} onOpenChange={setPreviewMode}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>ID Card Preview</DialogTitle>
            </DialogHeader>
            {currentStaffPreview && (
              <div className="space-y-4">
                <IDCardPreview
                  staff={currentStaffPreview}
                  template={selectedTemplate}
                />
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setPreviewMode(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedStaff([currentStaffPreview.id]);
                      setPreviewMode(false);
                      handleGenerateIDCards();
                    }}
                  >
                    <Printer size={16} className="mr-2" />
                    Generate This Card
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default StaffIDCardGenerator;
