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

  const handleGenerateIDCards = async () => {
    if (selectedStaff.length === 0) {
      toast.error("Please select at least one staff member");
      return;
    }

    const selectedStaffData = staffData.filter((staff) =>
      selectedStaff.includes(staff.id)
    );

    if (selectedStaffData.length === 1) {
      // Generate single card
      generateSingleCard(selectedStaffData[0]);
    } else {
      // Generate bulk cards
      generateBulkCards(selectedStaffData);
    }
  };

  // Generate single ID card
  const generateSingleCard = async (staff) => {
    toast.info("Generating ID card...", {
      description: `Creating ID card for ${staff.name}`,
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const cardHTML = generateSingleCardHTML(staff);

      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow.document.write(cardHTML);
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };

      toast.success("ID card generated", {
        description: `ID card for ${staff.name} has been generated successfully.`,
      });
    } catch (error) {
      toast.error("Generation failed", {
        description: "Failed to generate ID card. Please try again.",
      });
    }
  };

  // Generate bulk ID cards
  const generateBulkCards = async (staffList) => {
    toast.info("Generating bulk ID cards...", {
      description: `Creating ${staffList.length} ID cards`,
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate cards HTML
      const cardsHTML = generateBulkCardsHTML(staffList);

      // Open print window
      const printWindow = window.open("", "_blank", "width=1200,height=800");
      printWindow.document.write(cardsHTML);
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };

      toast.success(`Generated ${staffList.length} ID cards`, {
        description: "ID cards have been generated successfully.",
        icon: <CreditCard className="h-4 w-4" />,
      });

      // Reset selection after successful generation
      setSelectedStaff([]);
    } catch (error) {
      toast.error("Generation failed", {
        description: "Failed to generate ID cards. Please try again.",
      });
    }
  };

  // Helper functions for card generation
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

  // Generate single card HTML
  const generateSingleCardHTML = (staff) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Staff ID Card - ${staff.name}</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f8f9fa;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
          }
          .card-container {
            margin: 20px 0;
          }
          .id-card {
            width: 380px;
            height: 240px;
            background: ${getTemplateGradient(selectedTemplate)};
            border-radius: 15px;
            padding: 18px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            color: white;
            position: relative;
            overflow: hidden;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            font-weight: bold;
          }
          .school-name {
            font-size: 16px;
            letter-spacing: 1px;
          }
          .card-type {
            font-size: 10px;
            background: rgba(255,255,255,0.2);
            padding: 4px 8px;
            border-radius: 12px;
          }
          .main-content {
            display: flex;
            gap: 15px;
            margin-bottom: 12px;
          }
          .photo-section {
            width: 70px;
            height: 85px;
            background: rgba(255,255,255,0.15);
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            text-align: center;
            backdrop-filter: blur(10px);
          }
          .staff-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .staff-name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 3px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px;
          }
          .info-row {
            display: flex;
            flex-direction: column;
          }
          .label {
            font-size: 9px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            font-size: 11px;
            font-weight: 600;
          }
          .footer {
            position: absolute;
            bottom: 12px;
            left: 18px;
            right: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 9px;
          }
          .qr-code {
            width: 30px;
            height: 30px;
            background: white;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            font-size: 8px;
            text-align: center;
          }
          /* Card Back */
          .card-back {
            width: 380px;
            height: 240px;
            background: linear-gradient(135deg, #6b7280 0%, #4b5563 50%, #374151 100%);
            border-radius: 15px;
            padding: 18px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            color: white;
            margin-top: 20px;
          }
          .back-header {
            text-align: center;
            margin-bottom: 15px;
            font-weight: bold;
            font-size: 14px;
          }
          .terms {
            font-size: 8px;
            line-height: 1.4;
            opacity: 0.9;
            margin-bottom: 10px;
          }
          .contact-info {
            font-size: 9px;
            margin-bottom: 8px;
          }
          @media print {
            body { 
              background: white;
              padding: 10px;
              margin: 0;
            }
            .card-container {
              page-break-after: always;
              margin: 20px auto;
            }
            .id-card, .card-back {
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
          }
        </style>
      </head>
      <body>
        <div class="card-container">
          <!-- Front Side -->
          <div class="id-card">
            <div class="header">
              <div class="school-name">EDUOS ACADEMY</div>
              <div class="card-type">STAFF ID</div>
            </div>
            
            <div class="main-content">
              <div class="photo-section">
                PHOTO
              </div>
              
              <div class="staff-info">
                <div class="staff-name">${staff.name}</div>
                
                <div class="info-grid">
                  <div class="info-row">
                    <div class="label">Employee ID</div>
                    <div class="value">${staff.employeeId}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Department</div>
                    <div class="value">${staff.department}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Position</div>
                    <div class="value">${staff.role}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Access Level</div>
                    <div class="value">${determineAccessLevel(
                      staff.role
                    ).replace("LEVEL_", "L")}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <div>Valid: ${new Date().getFullYear()}-${
      new Date().getFullYear() + 1
    }</div>
              <div class="qr-code">QR</div>
              <div>Card #: ${generateCardNumber(staff.employeeId).slice(
                -6
              )}</div>
            </div>
          </div>
          
          <!-- Back Side -->
          <div class="card-back">
            <div class="back-header">STAFF IDENTIFICATION CARD - BACK</div>
            
            <div class="contact-info">
              <strong>Contact Information:</strong><br>
              Email: ${staff.email}<br>
              Phone: ${staff.phone}<br>
              Emergency: ${staff.emergencyContact}
            </div>
            
            <div class="terms">
              <strong>Terms & Conditions:</strong><br>
              • This card remains property of EDUOS Academy<br>
              • Must be worn visibly while on school premises<br>
              • Report immediately if lost or stolen<br>
              • Access level determines facility permissions<br>
              • Card must be renewed annually<br>
              • Non-transferable - valid for assigned staff only
            </div>
            
            <div class="contact-info">
              <strong>School Contact:</strong><br>
              EDUOS Academy • 123 Education Blvd<br>
              Phone: +1-234-567-8900 • www.eduos.edu
            </div>
          </div>
        </div>
        
        <script>
          console.log('Staff ID Card Generated for:', '${staff.name}');
          console.log('Employee ID:', '${staff.employeeId}');
          console.log('Access Level:', '${determineAccessLevel(staff.role)}');
        </script>
      </body>
      </html>
    `;
  };

  // Generate bulk cards HTML
  const generateBulkCardsHTML = (staffList) => {
    const cardsHTML = staffList
      .map(
        (staff) => `
      <div class="card-wrapper">
        ${generateSingleCardHTML(staff)}
      </div>
    `
      )
      .join("");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bulk Staff ID Cards - ${staffList.length} Cards</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f8f9fa;
          }
          .cards-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .card-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            page-break-inside: avoid;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            color: #2563eb;
          }
          .header h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .header p {
            font-size: 14px;
            color: #6b7280;
          }
          @media print {
            body { 
              background: white; 
              padding: 10px;
            }
            .header {
              margin-bottom: 20px;
            }
            .cards-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
            .card-wrapper {
              page-break-inside: avoid;
              margin-bottom: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>EDUOS Academy</h1>
          <p>Staff ID Cards Batch - Generated on ${new Date().toLocaleDateString()}</p>
          <p>Total Cards: ${staffList.length}</p>
        </div>
        <div class="cards-container">
          ${cardsHTML}
        </div>
        
        <script>
          console.log('Bulk Staff ID Cards Generated');
          console.log('Total Cards:', ${staffList.length});
          console.log('Generation Date:', '${new Date().toISOString()}');
        </script>
      </body>
      </html>
    `;
  };

  // Get template gradient
  const getTemplateGradient = (template) => {
    const gradients = {
      professional:
        "linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1d4ed8 100%)",
      modern: "linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)",
      elegant: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
      classic: "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)",
    };
    return gradients[template] || gradients.professional;
  };

  const handlePreviewCard = (staff) => {
    setCurrentStaffPreview(staff);
    setPreviewMode(true);
  };

  // PropTypes would be used for validation in larger projects
  /* eslint-disable react/prop-types */
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
                              onClick={() => generateSingleCard(staff)}
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
                      setPreviewMode(false);
                      generateSingleCard(currentStaffPreview);
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
