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
import { Textarea } from "../../../components/ui/textarea";
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
  Calculator,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AdminAccountantIDCards = () => {
  const navigate = useNavigate();
  const [selectedAccountants, setSelectedAccountants] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [previewMode, setPreviewMode] = useState(false);
  const [currentAccountantPreview, setCurrentAccountantPreview] =
    useState(null);
  const [addAccountantMode, setAddAccountantMode] = useState(false);
  const [newAccountantData, setNewAccountantData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "Finance & Administration",
    emergencyContact: "",
    address: "",
    specializations: [],
    workingHours: "8:00 AM - 5:00 PM",
  });

  // Accountant staff data
  const [accountantData] = useState([
    {
      id: "ACC001",
      employeeId: "EMP2024001",
      name: "Sarah Johnson",
      department: "Finance & Administration",
      role: "Senior Accountant",
      phone: "+1234567890",
      email: "sarah.johnson@school.edu",
      emergencyContact: "+0987654321",
      address: "123 Finance Street, Business District",
      dateJoined: "2022-03-15",
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
      qrCode: "ACC001QR",
      accessLevel: "FINANCE_ADMIN",
      specializations: [
        "Financial Reporting",
        "Budget Management",
        "Tax Preparation",
      ],
      workingHours: "8:00 AM - 5:00 PM",
    },
    {
      id: "ACC002",
      employeeId: "EMP2024002",
      name: "Michael Chen",
      department: "Finance & Administration",
      role: "Junior Accountant",
      phone: "+1234567891",
      email: "michael.chen@school.edu",
      emergencyContact: "+0987654322",
      address: "456 Accounting Avenue, Finance Town",
      dateJoined: "2023-06-01",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      qrCode: "ACC002QR",
      accessLevel: "FINANCE_STANDARD",
      specializations: ["Accounts Payable", "Data Entry", "Invoice Processing"],
      workingHours: "8:30 AM - 5:30 PM",
    },
    {
      id: "ACC003",
      employeeId: "EMP2024003",
      name: "Emily Rodriguez",
      department: "Finance & Administration",
      role: "Accounts Manager",
      phone: "+1234567892",
      email: "emily.rodriguez@school.edu",
      emergencyContact: "+0987654323",
      address: "789 Treasury Lane, Financial City",
      dateJoined: "2021-09-12",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      qrCode: "ACC003QR",
      accessLevel: "FINANCE_MANAGER",
      specializations: [
        "Payroll Management",
        "Financial Analysis",
        "Audit Coordination",
      ],
      workingHours: "7:30 AM - 4:30 PM",
    },
    {
      id: "ACC004",
      employeeId: "EMP2024004",
      name: "David Wilson",
      department: "Finance & Administration",
      role: "Finance Assistant",
      phone: "+1234567893",
      email: "david.wilson@school.edu",
      emergencyContact: "+0987654324",
      address: "321 Bookkeeper Road, Accounting District",
      dateJoined: "2023-11-20",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      qrCode: "ACC004QR",
      accessLevel: "FINANCE_ASSISTANT",
      specializations: [
        "Record Keeping",
        "Receipt Management",
        "Data Verification",
      ],
      workingHours: "9:00 AM - 6:00 PM",
    },
    {
      id: "ACC005",
      employeeId: "EMP2024005",
      name: "Lisa Patel",
      department: "Finance & Administration",
      role: "Chief Financial Officer",
      phone: "+1234567894",
      email: "lisa.patel@school.edu",
      emergencyContact: "+0987654325",
      address: "654 Executive Boulevard, Finance Headquarters",
      dateJoined: "2020-01-08",
      photo:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      qrCode: "ACC005QR",
      accessLevel: "FINANCE_EXECUTIVE",
      specializations: [
        "Strategic Planning",
        "Investment Management",
        "Risk Assessment",
      ],
      workingHours: "8:00 AM - 6:00 PM",
    },
  ]);

  const departments = [
    "Finance & Administration",
    "Accounting",
    "Treasury",
    "Audit",
  ];

  const roles = [
    "Chief Financial Officer",
    "Finance Manager",
    "Senior Accountant",
    "Junior Accountant",
    "Accounts Manager",
    "Finance Assistant",
    "Bookkeeper",
    "Auditor",
  ];

  const templates = [
    { id: "professional", name: "Professional Blue", color: "bg-blue-600" },
    { id: "financial", name: "Financial Green", color: "bg-green-600" },
    { id: "executive", name: "Executive Gold", color: "bg-yellow-600" },
    { id: "modern", name: "Modern Purple", color: "bg-purple-600" },
  ];

  // Filter accountants based on search and filters
  const filteredAccountants = accountantData.filter((accountant) => {
    const matchesSearch =
      accountant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accountant.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accountant.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || accountant.department === filterDepartment;
    const matchesRole = filterRole === "all" || accountant.role === filterRole;

    return matchesSearch && matchesDepartment && matchesRole;
  });

  const handleAccountantSelection = (accountantId, isSelected) => {
    if (isSelected) {
      setSelectedAccountants((prev) => [...prev, accountantId]);
    } else {
      setSelectedAccountants((prev) =>
        prev.filter((id) => id !== accountantId)
      );
    }
  };

  const handleSelectAll = () => {
    if (selectedAccountants.length === filteredAccountants.length) {
      setSelectedAccountants([]);
    } else {
      setSelectedAccountants(
        filteredAccountants.map((accountant) => accountant.id)
      );
    }
  };

  const handleGenerateIDCards = async () => {
    if (selectedAccountants.length === 0) {
      toast.error("Please select at least one accountant");
      return;
    }

    const selectedAccountantData = accountantData.filter((accountant) =>
      selectedAccountants.includes(accountant.id)
    );

    if (selectedAccountantData.length === 1) {
      // Generate single card
      generateSingleCard(selectedAccountantData[0]);
    } else {
      // Generate bulk cards
      generateBulkCards(selectedAccountantData);
    }
  };

  // Generate single ID card
  const generateSingleCard = async (accountant) => {
    toast.info("Generating Accountant ID card...", {
      description: `Creating ID card for ${accountant.name}`,
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const cardHTML = generateSingleCardHTML(accountant);

      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow.document.write(cardHTML);
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };

      toast.success("Accountant ID card generated", {
        description: `ID card for ${accountant.name} has been generated successfully.`,
      });
    } catch (error) {
      toast.error("Generation failed", {
        description: "Failed to generate ID card. Please try again.",
      });
    }
  };

  // Generate bulk ID cards
  const generateBulkCards = async (accountantList) => {
    toast.info("Generating bulk Accountant ID cards...", {
      description: `Creating ${accountantList.length} ID cards`,
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate cards HTML
      const cardsHTML = generateBulkCardsHTML(accountantList);

      // Open print window
      const printWindow = window.open("", "_blank", "width=1200,height=800");
      printWindow.document.write(cardsHTML);
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };

      toast.success(`Generated ${accountantList.length} Accountant ID cards`, {
        description: "ID cards have been generated successfully.",
        icon: <CreditCard className="h-4 w-4" />,
      });

      // Reset selection after successful generation
      setSelectedAccountants([]);
    } catch (error) {
      toast.error("Generation failed", {
        description: "Failed to generate ID cards. Please try again.",
      });
    }
  };

  // Helper functions for card generation
  const determineAccessLevel = (role) => {
    const accessLevels = {
      "Chief Financial Officer": "LEVEL_5_EXECUTIVE",
      "Finance Manager": "LEVEL_4_MANAGER",
      "Accounts Manager": "LEVEL_4_MANAGER",
      "Senior Accountant": "LEVEL_3_SENIOR",
      "Junior Accountant": "LEVEL_2_STANDARD",
      "Finance Assistant": "LEVEL_1_ASSISTANT",
      Bookkeeper: "LEVEL_2_STANDARD",
      Auditor: "LEVEL_3_SENIOR",
    };
    return accessLevels[role] || "LEVEL_1_ASSISTANT";
  };

  const generateCardNumber = (employeeId) => {
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `FIN${year}${employeeId.replace("EMP", "")}${randomSuffix}`;
  };

  // Generate single card HTML
  const generateSingleCardHTML = (accountant) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Accountant ID Card - ${accountant.name}</title>
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
          .department-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            background: rgba(255,255,255,0.15);
            padding: 2px 6px;
            border-radius: 8px;
            font-size: 8px;
            font-weight: bold;
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
          .accountant-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .accountant-name {
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
          .specializations {
            margin-top: 4px;
            font-size: 8px;
            opacity: 0.9;
            line-height: 1.2;
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
          .finance-icon {
            position: absolute;
            bottom: 45px;
            right: 18px;
            opacity: 0.3;
            font-size: 24px;
          }
          /* Card Back */
          .card-back {
            width: 380px;
            height: 240px;
            background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%);
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
          .access-permissions {
            background: rgba(255,255,255,0.1);
            padding: 8px;
            border-radius: 6px;
            margin-bottom: 8px;
          }
          .access-title {
            font-size: 9px;
            font-weight: bold;
            margin-bottom: 4px;
          }
          .access-list {
            font-size: 8px;
            line-height: 1.3;
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
            <div class="department-badge">FINANCE</div>
            
            <div class="header">
              <div class="school-name">EDUOS ACADEMY</div>
              <div class="card-type">ACCOUNTANT ID</div>
            </div>
            
            <div class="main-content">
              <div class="photo-section">
                PHOTO
              </div>
              
              <div class="accountant-info">
                <div class="accountant-name">${accountant.name}</div>
                
                <div class="info-grid">
                  <div class="info-row">
                    <div class="label">Employee ID</div>
                    <div class="value">${accountant.employeeId}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Position</div>
                    <div class="value">${accountant.role}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Department</div>
                    <div class="value">${accountant.department}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Access Level</div>
                    <div class="value">${determineAccessLevel(
                      accountant.role
                    ).replace("LEVEL_", "L")}</div>
                  </div>
                </div>
                
                <div class="specializations">
                  Specializations: ${accountant.specializations.join(", ")}
                </div>
              </div>
            </div>
            
            <div class="finance-icon">💰</div>
            
            <div class="footer">
              <div>Valid: ${new Date().getFullYear()}-${
      new Date().getFullYear() + 1
    }</div>
              <div class="qr-code">QR</div>
              <div>Card #: ${generateCardNumber(accountant.employeeId).slice(
                -6
              )}</div>
            </div>
          </div>
          
          <!-- Back Side -->
          <div class="card-back">
            <div class="back-header">FINANCE DEPARTMENT - STAFF ID CARD</div>
            
            <div class="contact-info">
              <strong>Contact Information:</strong><br>
              Email: ${accountant.email}<br>
              Phone: ${accountant.phone}<br>
              Emergency: ${accountant.emergencyContact}<br>
              Working Hours: ${accountant.workingHours}
            </div>
            
            <div class="access-permissions">
              <div class="access-title">Financial System Access:</div>
              <div class="access-list">
                • Accounting software and financial databases<br>
                • Budget management and reporting systems<br>
                • Payroll and employee financial records<br>
                • Audit trails and compliance documentation<br>
                • Treasury and cash management systems
              </div>
            </div>
            
            <div class="terms">
              <strong>Terms & Conditions:</strong><br>
              • This card remains property of EDUOS Academy<br>
              • Must be worn visibly while on school premises<br>
              • Provides access to financial systems and records<br>
              • Report immediately if lost or stolen<br>
              • Access level determines system permissions<br>
              • Card must be renewed annually<br>
              • Non-transferable - valid for assigned accountant only
            </div>
            
            <div class="contact-info">
              <strong>School Contact:</strong><br>
              EDUOS Academy • 123 Education Blvd<br>
              Phone: +1-234-567-8900 • www.eduos.edu
            </div>
          </div>
        </div>
        
        <script>
          console.log('Accountant ID Card Generated for:', '${
            accountant.name
          }');
          console.log('Employee ID:', '${accountant.employeeId}');
          console.log('Access Level:', '${determineAccessLevel(
            accountant.role
          )}');
          console.log('Specializations:', '${accountant.specializations.join(
            ", "
          )}');
        </script>
      </body>
      </html>
    `;
  };

  // Generate bulk cards HTML
  const generateBulkCardsHTML = (accountantList) => {
    const cardsHTML = accountantList
      .map(
        (accountant) => `
      <div class="card-wrapper">
        ${generateSingleCardHTML(accountant)}
      </div>
    `
      )
      .join("");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bulk Accountant ID Cards - ${accountantList.length} Cards</title>
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
          <h1>EDUOS Academy - Finance Department</h1>
          <p>Accountant ID Cards Batch - Generated on ${new Date().toLocaleDateString()}</p>
          <p>Total Cards: ${accountantList.length}</p>
        </div>
        <div class="cards-container">
          ${cardsHTML}
        </div>
        
        <script>
          console.log('Bulk Accountant ID Cards Generated');
          console.log('Total Cards:', ${accountantList.length});
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
      financial:
        "linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)",
      executive:
        "linear-gradient(135deg, #d97706 0%, #b45309 50%, #92400e 100%)",
      modern: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
    };
    return gradients[template] || gradients.professional;
  };

  const handlePreviewCard = (accountant) => {
    setCurrentAccountantPreview(accountant);
    setPreviewMode(true);
  };

  const handleAddAccountant = () => {
    setAddAccountantMode(true);
  };

  const handleSaveNewAccountant = () => {
    // Validate required fields
    if (
      !newAccountantData.name ||
      !newAccountantData.email ||
      !newAccountantData.phone ||
      !newAccountantData.role
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Generate new accountant data
    const newAccountant = {
      id: `ACC${String(accountantData.length + 1).padStart(3, "0")}`,
      employeeId: `EMP2024${String(accountantData.length + 1).padStart(
        3,
        "0"
      )}`,
      name: newAccountantData.name,
      email: newAccountantData.email,
      phone: newAccountantData.phone,
      role: newAccountantData.role,
      department: newAccountantData.department,
      emergencyContact: newAccountantData.emergencyContact,
      address: newAccountantData.address,
      dateJoined: new Date().toISOString().split("T")[0],
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      qrCode: `ACC${String(accountantData.length + 1).padStart(3, "0")}QR`,
      accessLevel: determineAccessLevel(newAccountantData.role),
      specializations:
        newAccountantData.specializations.length > 0
          ? newAccountantData.specializations
          : ["General Accounting", "Record Keeping"],
      workingHours: newAccountantData.workingHours,
    };

    toast.success("New accountant added successfully!", {
      description: `${newAccountant.name} has been added to the system.`,
    });

    // Reset form
    setNewAccountantData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "Finance & Administration",
      emergencyContact: "",
      address: "",
      specializations: [],
      workingHours: "8:00 AM - 5:00 PM",
    });
    setAddAccountantMode(false);
  };

  const handleCancelAddAccountant = () => {
    setAddAccountantMode(false);
    setNewAccountantData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "Finance & Administration",
      emergencyContact: "",
      address: "",
      specializations: [],
      workingHours: "8:00 AM - 5:00 PM",
    });
  };

  // PropTypes would be used for validation in larger projects
  /* eslint-disable react/prop-types */
  const IDCardPreview = ({ accountant, template }) => {
    const templateColors = {
      professional: {
        primary: "bg-blue-600",
        secondary: "bg-blue-50",
        text: "text-blue-900",
        accent: "border-blue-200",
      },
      financial: {
        primary: "bg-green-600",
        secondary: "bg-green-50",
        text: "text-green-900",
        accent: "border-green-200",
      },
      executive: {
        primary: "bg-yellow-600",
        secondary: "bg-yellow-50",
        text: "text-yellow-900",
        accent: "border-yellow-200",
      },
      modern: {
        primary: "bg-purple-600",
        secondary: "bg-purple-50",
        text: "text-purple-900",
        accent: "border-purple-200",
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
            <div className="text-xs flex items-center gap-1">
              <Calculator size={14} />
              ACCOUNTANT
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex gap-3">
          {/* Photo */}
          <div className="w-16 h-20 bg-gray-200 rounded border overflow-hidden flex-shrink-0">
            <img
              src={accountant.photo}
              alt={accountant.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-1">
            <h3 className={`font-bold text-sm ${colors.text}`}>
              {accountant.name}
            </h3>
            <p className="text-xs text-gray-600">{accountant.role}</p>
            <p className="text-xs text-gray-600">{accountant.department}</p>
            <p className="text-xs font-mono text-gray-800">
              ID: {accountant.employeeId}
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
                <div className="flex items-center gap-2">
                  <CreditCard className="text-blue-600" />
                  <Calculator className="text-green-600" />
                </div>
                Accountant ID Card Generator
              </h1>
              <p className="text-gray-600">
                Generate identification cards for accounting staff members
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-blue-600">
                {filteredAccountants.length} Accountants
              </Badge>
              <Badge variant="outline" className="text-green-600">
                {selectedAccountants.length} Selected
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
                  {selectedAccountants.length === filteredAccountants.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>

                <Button
                  onClick={handleGenerateIDCards}
                  className="w-full"
                  disabled={selectedAccountants.length === 0}
                >
                  <Printer size={16} className="mr-2" />
                  Generate Cards ({selectedAccountants.length})
                </Button>
              </CardContent>
            </Card>

            {/* Finance Department Info */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">
                    Finance Department
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  Generate official ID cards for accounting staff with special
                  access permissions for financial systems and records.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Accountant List */}
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
                        placeholder="Search by name, employee ID, or role..."
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

            {/* Accountant Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Finance & Accounting Staff</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddAccountant}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Accountant
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
                              selectedAccountants.length ===
                                filteredAccountants.length &&
                              filteredAccountants.length > 0
                            }
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                      )}
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Specializations</TableHead>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Working Hours</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccountants.map((accountant) => (
                      <TableRow key={accountant.id}>
                        {bulkMode && (
                          <TableCell>
                            <Checkbox
                              checked={selectedAccountants.includes(
                                accountant.id
                              )}
                              onCheckedChange={(checked) =>
                                handleAccountantSelection(
                                  accountant.id,
                                  checked
                                )
                              }
                            />
                          </TableCell>
                        )}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                              <img
                                src={accountant.photo}
                                alt={accountant.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/placeholder.svg";
                                }}
                              />
                            </div>
                            <div>
                              <div className="font-medium">
                                {accountant.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {accountant.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              accountant.role.includes("Chief") ||
                              accountant.role.includes("Manager")
                                ? "bg-purple-100 text-purple-800 border-purple-200"
                                : "bg-green-100 text-green-800 border-green-200"
                            }
                          >
                            {accountant.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            {accountant.specializations
                              .slice(0, 2)
                              .map((spec, idx) => (
                                <div key={idx} className="text-gray-600">
                                  • {spec}
                                </div>
                              ))}
                            {accountant.specializations.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{accountant.specializations.length - 2} more
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm">
                            {accountant.employeeId}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600">
                            {accountant.workingHours}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePreviewCard(accountant)}
                            >
                              <Eye size={14} className="mr-1" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => generateSingleCard(accountant)}
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

        {/* Add Accountant Dialog */}
        <Dialog open={addAccountantMode} onOpenChange={setAddAccountantMode}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus size={20} />
                Add New Accountant
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newAccountantData.name}
                    onChange={(e) =>
                      setNewAccountantData({
                        ...newAccountantData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAccountantData.email}
                    onChange={(e) =>
                      setNewAccountantData({
                        ...newAccountantData,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={newAccountantData.phone}
                    onChange={(e) =>
                      setNewAccountantData({
                        ...newAccountantData,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role/Position *</Label>
                  <Select
                    value={newAccountantData.role}
                    onValueChange={(value) =>
                      setNewAccountantData({
                        ...newAccountantData,
                        role: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newAccountantData.department}
                    onValueChange={(value) =>
                      setNewAccountantData({
                        ...newAccountantData,
                        department: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={newAccountantData.emergencyContact}
                    onChange={(e) =>
                      setNewAccountantData({
                        ...newAccountantData,
                        emergencyContact: e.target.value,
                      })
                    }
                    placeholder="Emergency contact number"
                  />
                </div>
                <div>
                  <Label htmlFor="workingHours">Working Hours</Label>
                  <Input
                    id="workingHours"
                    value={newAccountantData.workingHours}
                    onChange={(e) =>
                      setNewAccountantData({
                        ...newAccountantData,
                        workingHours: e.target.value,
                      })
                    }
                    placeholder="e.g., 8:00 AM - 5:00 PM"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={newAccountantData.address}
                  onChange={(e) =>
                    setNewAccountantData({
                      ...newAccountantData,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter full address"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="specializations">Specializations</Label>
                <Textarea
                  id="specializations"
                  value={newAccountantData.specializations.join(", ")}
                  onChange={(e) => {
                    const specs = e.target.value
                      .split(",")
                      .map((spec) => spec.trim())
                      .filter((spec) => spec.length > 0);
                    setNewAccountantData({
                      ...newAccountantData,
                      specializations: specs,
                    });
                  }}
                  placeholder="Enter specializations separated by commas (e.g., Financial Reporting, Budget Management)"
                  rows={2}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple specializations with commas
                </p>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleCancelAddAccountant}>
                Cancel
              </Button>
              <Button onClick={handleSaveNewAccountant}>
                <Plus size={16} className="mr-2" />
                Add Accountant
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Preview Dialog */}
        <Dialog open={previewMode} onOpenChange={setPreviewMode}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Accountant ID Card Preview</DialogTitle>
            </DialogHeader>
            {currentAccountantPreview && (
              <div className="space-y-4">
                <IDCardPreview
                  accountant={currentAccountantPreview}
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
                      generateSingleCard(currentAccountantPreview);
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

export default AdminAccountantIDCards;
