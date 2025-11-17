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
  Smartphone,
  QrCode,
  Wifi,
  Check,
  X,
  FileText,
  School,
  User,
  Calendar,
  Hash,
  Building,
  Phone,
  Mail,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { generateBarcode, generateQRCode, formatNFCData, generateAttendanceData } from "../../../utils/idCardUtils";

const StudentIDCardGenerator = () => {
  const navigate = useNavigate();
  
  // State management
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewStudent, setPreviewStudent] = useState(null);
  const [cardSettings, setCardSettings] = useState({
    scannable: "barcode", // "barcode" or "nfc"
    includePhoto: true,
    includeQR: true,
    cardTemplate: "standard", // "standard" or "premium"
    schoolLogo: true,
    emergencyContact: true,
  });

  // Sample data - levels
  const levels = [
    "Primary",
    "Junior Secondary", 
    "Senior Secondary"
  ];

  // Sample data - classes by level
  const classesByLevel = {
    "Primary": [
      { id: "p1a", name: "Primary One A", students: 25 },
      { id: "p1b", name: "Primary One B", students: 28 },
      { id: "p2a", name: "Primary Two A", students: 30 },
      { id: "p2b", name: "Primary Two B", students: 27 },
      { id: "p3a", name: "Primary Three A", students: 32 },
      { id: "p3b", name: "Primary Three B", students: 29 }
    ],
    "Junior Secondary": [
      { id: "js1a", name: "JSS 1A", students: 35 },
      { id: "js1b", name: "JSS 1B", students: 33 },
      { id: "js1c", name: "JSS 1C", students: 31 },
      { id: "js2a", name: "JSS 2A", students: 30 },
      { id: "js2b", name: "JSS 2B", students: 28 },
      { id: "js3a", name: "JSS 3A", students: 29 }
    ],
    "Senior Secondary": [
      { id: "ss1a", name: "SSS 1A", students: 32 },
      { id: "ss1b", name: "SSS 1B", students: 30 },
      { id: "ss2a", name: "SSS 2A", students: 28 },
      { id: "ss2b", name: "SSS 2B", students: 31 },
      { id: "ss3a", name: "SSS 3A", students: 25 },
      { id: "ss3b", name: "SSS 3B", students: 27 }
    ]
  };

  // Sample students data
  const [studentsData] = useState([
    {
      id: 1,
      admissionNo: "STU-2024-001",
      firstName: "John",
      lastName: "Doe", 
      middleName: "Michael",
      class: "Primary One A",
      level: "Primary",
      gender: "Male",
      dateOfBirth: "2015-03-15",
      bloodGroup: "O+",
      parentName: "Mary Doe",
      parentPhone: "+234-801-234-5678",
      emergencyContact: "+234-803-456-7890",
      address: "123 Main Street, Lagos",
      email: "john.doe@example.com",
      photo: "/api/placeholder/150/150",
      status: "Active",
      enrollmentDate: "2024-01-15"
    },
    {
      id: 2,
      admissionNo: "STU-2024-002",
      firstName: "Jane",
      lastName: "Smith",
      middleName: "Grace",
      class: "Primary One A",
      level: "Primary",
      gender: "Female",
      dateOfBirth: "2015-07-22",
      bloodGroup: "A+",
      parentName: "Grace Smith",
      parentPhone: "+234-802-345-6789",
      emergencyContact: "+234-804-567-8901",
      address: "456 Oak Avenue, Abuja",
      email: "jane.smith@example.com",
      photo: "/api/placeholder/150/150",
      status: "Active",
      enrollmentDate: "2024-01-20"
    },
    {
      id: 3,
      admissionNo: "STU-2024-003",
      firstName: "Peter",
      lastName: "Johnson",
      middleName: "David",
      class: "Primary One B",
      level: "Primary",
      gender: "Male",
      dateOfBirth: "2015-11-08",
      bloodGroup: "B+",
      parentName: "Linda Johnson",
      parentPhone: "+234-803-456-7890",
      emergencyContact: "+234-805-678-9012",
      address: "789 Pine Street, Port Harcourt",
      email: "peter.johnson@example.com",
      photo: "/api/placeholder/150/150",
      status: "Active",
      enrollmentDate: "2024-02-01"
    },
    {
      id: 4,
      admissionNo: "STU-2024-004",
      firstName: "Mary",
      lastName: "Wilson",
      middleName: "Elizabeth",
      class: "JSS 1A",
      level: "Junior Secondary",
      gender: "Female",
      dateOfBirth: "2009-05-12",
      bloodGroup: "AB+",
      parentName: "Elizabeth Wilson",
      parentPhone: "+234-804-567-8901",
      emergencyContact: "+234-806-789-0123",
      address: "321 Elm Drive, Kano",
      email: "mary.wilson@example.com",
      photo: "/api/placeholder/150/150",
      status: "Active",
      enrollmentDate: "2024-01-25"
    },
    {
      id: 5,
      admissionNo: "STU-2024-005",
      firstName: "David",
      lastName: "Brown",
      middleName: "Christopher",
      class: "SSS 1A",
      level: "Senior Secondary",
      gender: "Male",
      dateOfBirth: "2007-09-03",
      bloodGroup: "O-",
      parentName: "Christopher Brown",
      parentPhone: "+234-805-678-9012",
      emergencyContact: "+234-807-890-1234",
      address: "654 Maple Road, Ibadan",
      email: "david.brown@example.com",
      photo: "/api/placeholder/150/150",
      status: "Active",
      enrollmentDate: "2024-02-10"
    }
  ]);

  // Filter students based on selected level and class
  const filteredStudents = studentsData.filter(student => {
    const levelMatch = !selectedLevel || student.level === selectedLevel;
    const classMatch = !selectedClass || student.class === selectedClass;
    const searchMatch = !searchTerm || 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    return levelMatch && classMatch && searchMatch && student.status === "Active";
  });

  // Get classes for selected level
  const availableClasses = selectedLevel ? classesByLevel[selectedLevel] || [] : [];

  // Handle student selection
  const handleStudentSelect = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
      setSelectAll(false);
    }
  };

  // Handle select all
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedStudents(filteredStudents.map(student => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  // Preview single ID card
  const previewCard = (student) => {
    setPreviewStudent(student);
    setShowPreview(true);
  };

  // Generate bulk ID cards
  const generateBulkCards = async () => {
    if (selectedStudents.length === 0) {
      toast.error("No students selected", {
        description: "Please select at least one student to generate ID cards.",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedStudentData = filteredStudents.filter(student => 
        selectedStudents.includes(student.id)
      );
      
      // Generate cards HTML
      const cardsHTML = generateBulkCardsHTML(selectedStudentData);
      
      // Open print window
      const printWindow = window.open('', '_blank', 'width=1200,height=800');
      printWindow.document.write(cardsHTML);
      printWindow.document.close();
      
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
      
      toast.success(`Generated ${selectedStudents.length} ID cards`, {
        description: "ID cards have been generated successfully.",
        icon: <CreditCard className="h-4 w-4" />
      });
      
    } catch (error) {
      toast.error("Generation failed", {
        description: "Failed to generate ID cards. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate individual card
  const generateSingleCard = async (student) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const cardHTML = generateSingleCardHTML(student);
      
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.write(cardHTML);
      printWindow.document.close();
      
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
      
      toast.success("ID card generated", {
        description: `ID card for ${student.firstName} ${student.lastName} has been generated.`,
      });
      
    } catch (error) {
      toast.error("Generation failed", {
        description: "Failed to generate ID card. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate single card HTML
  const generateSingleCardHTML = (student) => {
    const barcodeData = generateAttendanceData(student, 'barcode');
    const qrData = generateAttendanceData(student, 'qr');
    const nfcData = formatNFCData(student);
    
    // Generate actual barcode and QR code images
    const barcodeImage = generateBarcode(barcodeData, 120, 30);
    const qrCodeImage = generateQRCode(qrData, 60);
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Student ID Card - ${student.firstName} ${student.lastName}</title>
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
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1d4ed8 100%);
            border-radius: 15px;
            padding: 18px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            color: white;
            position: relative;
            overflow: hidden;
            border: 3px solid rgba(255,255,255,0.1);
          }
          .card-pattern {
            position: absolute;
            top: -50px;
            right: -50px;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
            border-radius: 50%;
          }
          .card-header {
            text-align: center;
            margin-bottom: 12px;
            position: relative;
            z-index: 2;
          }
          .school-logo {
            width: 25px;
            height: 25px;
            background: rgba(255,255,255,0.15);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 5px;
            font-size: 14px;
          }
          .school-name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 3px;
            text-shadow: 0 1px 3px rgba(0,0,0,0.3);
          }
          .card-title {
            font-size: 11px;
            opacity: 0.9;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .card-content {
            display: flex;
            gap: 15px;
            height: 150px;
            position: relative;
            z-index: 2;
          }
          .photo-section {
            width: 85px;
            text-align: center;
          }
          .student-photo {
            width: 80px;
            height: 100px;
            border-radius: 8px;
            border: 3px solid rgba(255,255,255,0.8);
            background: rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            margin-bottom: 6px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }
          .qr-code-container {
            margin-top: 5px;
          }
          .qr-code {
            width: 45px;
            height: 45px;
            border-radius: 6px;
            border: 2px solid rgba(255,255,255,0.6);
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
          }
          .qr-code img {
            width: 40px;
            height: 40px;
            border-radius: 4px;
          }
          .scan-text {
            font-size: 7px;
            margin-top: 3px;
            opacity: 0.8;
            text-align: center;
          }
          .student-info {
            flex: 1;
            font-size: 10px;
            line-height: 1.4;
          }
          .student-name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            text-transform: uppercase;
            text-shadow: 0 1px 3px rgba(0,0,0,0.3);
            letter-spacing: 0.5px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
          }
          .info-row {
            margin-bottom: 4px;
          }
          .label {
            font-weight: 600;
            opacity: 0.85;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          .value {
            margin-left: 5px;
            font-weight: 500;
          }
          .scannable-section {
            position: absolute;
            bottom: 12px;
            right: 15px;
            text-align: center;
            z-index: 3;
          }
          .barcode-container {
            background: white;
            padding: 4px;
            border-radius: 6px;
            border: 2px solid rgba(255,255,255,0.8);
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          }
          .barcode-container img {
            width: 100px;
            height: 25px;
            display: block;
          }
          .nfc-indicator {
            background: rgba(255,255,255,0.15);
            border: 2px solid rgba(255,255,255,0.6);
            border-radius: 8px;
            padding: 8px;
            backdrop-filter: blur(10px);
          }
          .nfc-icon {
            font-size: 20px;
            margin-bottom: 3px;
          }
          .validity {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 8px;
            opacity: 0.7;
            text-align: right;
          }
          .card-back {
            margin-top: 40px;
            background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%);
            border-radius: 15px;
            padding: 18px;
            text-align: center;
            font-size: 10px;
            line-height: 1.5;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            border: 3px solid rgba(255,255,255,0.1);
            color: white;
          }
          .emergency-info {
            margin-bottom: 12px;
            background: rgba(255,255,255,0.1);
            padding: 10px;
            border-radius: 8px;
          }
          .back-title {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #fbbf24;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          }
          .emergency-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
            font-size: 9px;
          }
          .terms {
            margin-top: 10px;
            padding-top: 8px;
            border-top: 1px solid rgba(255,255,255,0.2);
            font-size: 8px;
            opacity: 0.8;
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
          <!-- Front of Card -->
          <div class="id-card">
            <div class="card-pattern"></div>
            
            <div class="validity">
              Valid Until: Dec ${new Date().getFullYear() + 1}
            </div>
            
            <div class="card-header">
              ${cardSettings.schoolLogo ? '<div class="school-logo">🏫</div>' : ''}
              <div class="school-name">EDUOS International School</div>
              <div class="card-title">Student Identity Card</div>
            </div>
            
            <div class="card-content">
              <div class="photo-section">
                <div class="student-photo">
                  STUDENT<br>PHOTO
                </div>
                ${cardSettings.includeQR ? `
                  <div class="qr-code-container">
                    <div class="qr-code">
                      <img src="${qrCodeImage}" alt="QR Code" />
                    </div>
                    <div class="scan-text">ATTENDANCE QR</div>
                  </div>
                ` : ''}
              </div>
              
              <div class="student-info">
                <div class="student-name">${student.firstName} ${student.lastName}</div>
                
                <div class="info-grid">
                  <div class="info-row">
                    <div class="label">Student ID</div>
                    <div class="value">${student.admissionNo}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Class</div>
                    <div class="value">${student.class}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Level</div>
                    <div class="value">${student.level}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Gender</div>
                    <div class="value">${student.gender}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Date of Birth</div>
                    <div class="value">${new Date(student.dateOfBirth).toLocaleDateString()}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Blood Group</div>
                    <div class="value">${student.bloodGroup}</div>
                  </div>
                </div>
                
                <div style="margin-top: 10px; font-size: 9px; opacity: 0.9;">
                  <div class="info-row">
                    <div class="label">Parent/Guardian</div>
                    <div class="value">${student.parentName}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Contact</div>
                    <div class="value">${student.parentPhone}</div>
                  </div>
                </div>
              </div>
            </div>
            
            ${cardSettings.scannable === 'barcode' ? `
              <div class="scannable-section">
                <div class="barcode-container">
                  <img src="${barcodeImage}" alt="Barcode" />
                </div>
                <div class="scan-text">ATTENDANCE BARCODE</div>
              </div>
            ` : ''}
            
            ${cardSettings.scannable === 'nfc' ? `
              <div class="scannable-section">
                <div class="nfc-indicator">
                  <div class="nfc-icon">📶</div>
                  <div class="scan-text">NFC ENABLED</div>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Back of Card -->
          ${cardSettings.emergencyContact ? `
            <div class="card-back">
              <div class="back-title">🚨 EMERGENCY INFORMATION</div>
              
              <div class="emergency-info">
                <div class="emergency-row">
                  <strong>Emergency Contact:</strong>
                  <span>${student.emergencyContact}</span>
                </div>
                <div class="emergency-row">
                  <strong>Home Address:</strong>
                  <span>${student.address}</span>
                </div>
                <div class="emergency-row">
                  <strong>Student Email:</strong>
                  <span>${student.email}</span>
                </div>
              </div>
              
              <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 6px; margin: 8px 0;">
                <div class="emergency-row">
                  <strong>School Emergency:</strong>
                  <span>+234 1 234 5678</span>
                </div>
                <div class="emergency-row">
                  <strong>School Email:</strong>
                  <span>emergency@eduos.edu.ng</span>
                </div>
                <div class="emergency-row">
                  <strong>Website:</strong>
                  <span>www.eduos.edu.ng</span>
                </div>
              </div>
              
              <div class="terms">
                <strong>Important:</strong> This card is the property of EDUOS International School. 
                If found, please contact the school immediately. This card must be carried at all 
                times on school premises and presented when requested by school staff.
                <br><br>
                <strong>Lost Card:</strong> Report immediately to school administration. 
                Replacement fee applies.
              </div>
            </div>
          ` : ''}
        </div>
        
        <script>
          // Store NFC data for potential integration
          window.nfcData = ${JSON.stringify(nfcData)};
          console.log('ID Card Generated for:', '${student.firstName} ${student.lastName}');
          console.log('Barcode Data:', '${barcodeData}');
          console.log('QR Code Data:', ${JSON.stringify(qrData)});
          console.log('NFC Data:', window.nfcData);
        </script>
      </body>
      </html>
    `;
  };

  // Generate bulk cards HTML
  const generateBulkCardsHTML = (students) => {
    const cardsHTML = students.map(student => `
      <div class="card-wrapper">
        ${generateSingleCardHTML(student)}
      </div>
    `).join('');
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bulk Student ID Cards - ${students.length} Cards</title>
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
          <h1>EDUOS International School</h1>
          <p>Student ID Cards Batch - Generated on ${new Date().toLocaleDateString()}</p>
          <p>Total Cards: ${students.length}</p>
        </div>
        <div class="cards-container">
          ${cardsHTML}
        </div>
        
        <script>
          console.log('Bulk ID Cards Generated');
          console.log('Total Cards:', ${students.length});
          console.log('Generation Date:', '${new Date().toISOString()}');
        </script>
      </body>
      </html>
    `;
  };

  useEffect(() => {
    // Update select all when filtered students change
    if (filteredStudents.length > 0) {
      setSelectAll(selectedStudents.length === filteredStudents.length);
    }
  }, [selectedStudents, filteredStudents]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-eduos-primary flex items-center gap-3">
            <CreditCard className="h-8 w-8" />
            Student ID Card Generator
          </h2>
          <p className="text-gray-600 mt-2">
            Generate and print student ID cards with scannable elements for attendance
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            disabled={selectedStudents.length === 0}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button
            onClick={generateBulkCards}
            disabled={selectedStudents.length === 0 || isLoading}
            className="bg-eduos-primary hover:bg-eduos-primary/90"
          >
            {isLoading ? (
              "Generating..."
            ) : (
              <>
                <Printer className="mr-2 h-4 w-4" />
                Generate Cards ({selectedStudents.length})
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Card Settings & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Card Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium">Scannable Element</Label>
                <Select value={cardSettings.scannable} onValueChange={(value) => 
                  setCardSettings(prev => ({ ...prev, scannable: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barcode">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Barcode
                      </div>
                    </SelectItem>
                    <SelectItem value="nfc">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4" />
                        NFC Tag
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Card Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-qr"
                      checked={cardSettings.includeQR}
                      onCheckedChange={(checked) => 
                        setCardSettings(prev => ({ ...prev, includeQR: checked }))
                      }
                    />
                    <Label htmlFor="include-qr" className="text-sm">Include QR Code</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="emergency-contact"
                      checked={cardSettings.emergencyContact}
                      onCheckedChange={(checked) => 
                        setCardSettings(prev => ({ ...prev, emergencyContact: checked }))
                      }
                    />
                    <Label htmlFor="emergency-contact" className="text-sm">Emergency Info (Back)</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Template</Label>
                <Select value={cardSettings.cardTemplate} onValueChange={(value) => 
                  setCardSettings(prev => ({ ...prev, cardTemplate: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Template</SelectItem>
                    <SelectItem value="premium">Premium Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Level and Class Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="level">Level</Label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="class">Class</Label>
                <Select 
                  value={selectedClass} 
                  onValueChange={setSelectedClass}
                  disabled={!selectedLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClasses.map((classItem) => (
                      <SelectItem key={classItem.id} value={classItem.name}>
                        {classItem.name} ({classItem.students} students)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="search">Search Students</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedLevel("");
                    setSelectedClass("");
                    setSearchTerm("");
                    setSelectedStudents([]);
                    setSelectAll(false);
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Students Table */}
      {filteredStudents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Students List
                </span>
                <Badge variant="outline">
                  {filteredStudents.length} students found
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectAll}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Student Info</TableHead>
                      <TableHead>Class & Level</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedStudents.includes(student.id)}
                            onCheckedChange={(checked) => handleStudentSelect(student.id, checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {student.firstName} {student.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {student.admissionNo}
                            </div>
                            <div className="text-sm text-gray-500">
                              DOB: {new Date(student.dateOfBirth).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.class}</div>
                            <div className="text-sm text-gray-500">{student.level}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{student.parentName}</div>
                            <div className="text-sm text-gray-500">{student.parentPhone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={student.status === "Active" ? "default" : "secondary"}
                            className={student.status === "Active" ? "bg-green-100 text-green-800" : ""}
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => previewCard(student)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => generateSingleCard(student)}
                              disabled={isLoading}
                            >
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Bulk Actions */}
              {selectedStudents.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-blue-800">
                      {selectedStudents.length} student(s) selected
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedStudents([]);
                          setSelectAll(false);
                        }}
                      >
                        Clear Selection
                      </Button>
                      <Button
                        size="sm"
                        onClick={generateBulkCards}
                        disabled={isLoading}
                        className="bg-eduos-primary hover:bg-eduos-primary/90"
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        Generate Selected Cards
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Empty State */}
      {filteredStudents.length === 0 && (selectedLevel || selectedClass || searchTerm) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or search terms.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedLevel("");
                  setSelectedClass("");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              ID Card Preview
            </DialogTitle>
          </DialogHeader>
          {previewStudent && (
            <div className="space-y-4">
              {/* Mock ID Card Preview */}
              <div className="bg-gradient-to-br from-eduos-primary to-blue-700 rounded-lg p-4 text-white text-xs">
                <div className="text-center mb-3">
                  <div className="font-bold">EDUOS International School</div>
                  <div className="text-xs opacity-90">STUDENT IDENTITY CARD</div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-16 h-20 bg-white/20 rounded border-2 border-white/30 flex items-center justify-center text-white/70">
                    PHOTO
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-sm">
                      {previewStudent.firstName} {previewStudent.lastName}
                    </div>
                    <div>ID: {previewStudent.admissionNo}</div>
                    <div>Class: {previewStudent.class}</div>
                    <div>Level: {previewStudent.level}</div>
                    <div>DOB: {new Date(previewStudent.dateOfBirth).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-end">
                  <div className="text-xs">
                    {cardSettings.scannable === 'barcode' ? (
                      <div className="bg-white text-black p-1 rounded text-center font-mono">
                        {generateAttendanceData(previewStudent, 'barcode')}
                      </div>
                    ) : (
                      <div className="text-center">
                        <Wifi className="h-4 w-4" />
                        <div>NFC</div>
                      </div>
                    )}
                  </div>
                  {cardSettings.includeQR && (
                    <div className="bg-white w-8 h-8 rounded flex items-center justify-center">
                      <QrCode className="h-6 w-6 text-black" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">
                    {cardSettings.scannable === 'barcode' ? 'Barcode' : 'NFC'} Enabled
                  </Badge>
                  {cardSettings.includeQR && (
                    <Badge variant="outline">QR Code</Badge>
                  )}
                </div>
                <div className="space-y-1 text-xs">
                  {cardSettings.scannable === 'barcode' && (
                    <p>
                      <strong>Barcode Data:</strong> {generateAttendanceData(previewStudent, 'barcode')}
                    </p>
                  )}
                  {cardSettings.includeQR && (
                    <p>
                      <strong>QR Code:</strong> Contains attendance scan data with student info
                    </p>
                  )}
                  {cardSettings.scannable === 'nfc' && (
                    <p>
                      <strong>NFC Data:</strong> Student ID, admission number, and class information
                    </p>
                  )}
                </div>
                <p className="mt-2">
                  This preview shows how the ID card will look when generated. 
                  The actual card will include all selected features with functional scannable elements.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPreview(false)}
            >
              Close
            </Button>
            {previewStudent && (
              <Button
                onClick={() => {
                  generateSingleCard(previewStudent);
                  setShowPreview(false);
                }}
              >
                <Printer className="mr-2 h-4 w-4" />
                Generate This Card
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentIDCardGenerator;