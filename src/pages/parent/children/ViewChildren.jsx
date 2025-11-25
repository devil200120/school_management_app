import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Progress } from "../../../components/ui/progress";
import {
  Users,
  Search,
  Edit,
  Eye,
  UserCheck,
  Calendar,
  Phone,
  MapPin,
  Clock,
  Award,
  Heart,
  Plus,
  Upload,
  Activity,
  Target,
  Stethoscope,
  CheckCircle,
  Camera,
  Printer,
  BookMarked,
} from "lucide-react";
import { toast } from "sonner";

const ViewChildren = () => {
  const [children, setChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [showAddContactDialog, setShowAddContactDialog] = useState(false);
  const [showUploadDocDialog, setShowUploadDocDialog] = useState(false);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [showEditMedicalDialog, setShowEditMedicalDialog] = useState(false);
  const [showEditTransportDialog, setShowEditTransportDialog] = useState(false);

  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
    workplace: "",
  });

  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "",
    file: null,
  });

  const [newNote, setNewNote] = useState({
    note: "",
    category: "",
  });

  const [medicalData, setMedicalData] = useState({});
  const [transportData, setTransportData] = useState({});

  // Mock data - Enhanced with comprehensive student management information
  useEffect(() => {
    setChildren([
      {
        id: 1,
        name: "Sarah Johnson",
        firstName: "Sarah",
        middleName: "Grace",
        lastName: "Johnson",
        fullName: "Sarah Johnson",
        level: "Junior Secondary",
        class: "JSS 2A",
        section: "A",
        department: "Junior Secondary",
        admissionNo: "EDU2023001",
        admissionNumber: "EDU2023001",
        rollNumber: "JSS/2A/001",
        accessPin: "SARAH2024",
        profilePicture: null,
        dateOfBirth: "2010-05-15",
        age: 13,
        gender: "Female",
        nationality: "Nigerian",
        stateOfOrigin: "Lagos",
        localGovernment: "Ikeja",
        address: "123 Main Street, Lagos",
        studentPhone: "+234 804 123 4567",
        studentEmail: "sarah.johnson@student.school.edu",
        academicSession: "2024/2025",
        admissionDate: "2023-09-01",
        status: "Active",
        parentName: "John Johnson",
        primaryGuardian: "John Johnson",
        parentPhone: "+234 803 123 4567",
        parentEmail: "parent@example.com",
        parentAddress: "123 Main Street, Lagos",
        parentOccupation: "University Lecturer",
        parentNationality: "Nigerian",
        emergencyContact: "+234 806 987 6543",
        guardianRelationship: "Father",
        bloodGroup: "O+",
        allergies: "None",
        attendance: 95,
        lastGrade: "A",
        overallGrade: "A",

        // Medical Information
        medicalInfo: {
          height: "150 cm",
          weight: "45 kg",
          lastCheckup: "2024-09-15",
          vaccinations: ["COVID-19", "Hepatitis B", "Measles"],
          medications: [],
          chronicConditions: "None",
          doctorName: "Dr. Adebayo Olatunji",
          doctorPhone: "+234 701 234 5678",
          healthInsurance: "NHIS - 123456789",
        },

        // Emergency Contacts
        emergencyContacts: [
          {
            name: "John Johnson (Father)",
            relationship: "Father",
            phone: "+234 803 123 4567",
            email: "john.johnson@email.com",
            address: "123 Main Street, Lagos",
            workplace: "Lagos State University",
          },
          {
            name: "Mary Johnson (Mother)",
            relationship: "Mother",
            phone: "+234 806 987 6543",
            email: "mary.johnson@email.com",
            address: "123 Main Street, Lagos",
            workplace: "First Bank Nigeria",
          },
          {
            name: "Grace Okafor (Aunt)",
            relationship: "Aunt",
            phone: "+234 808 555 1234",
            email: "grace.okafor@email.com",
            address: "456 Victoria Island, Lagos",
            workplace: "Federal Ministry of Education",
          },
        ],

        // Documents
        documents: [
          {
            name: "Birth Certificate",
            type: "Identity",
            status: "Verified",
            uploadDate: "2024-01-15",
            expiryDate: null,
          },
          {
            name: "Medical Report",
            type: "Medical",
            status: "Valid",
            uploadDate: "2024-09-15",
            expiryDate: "2025-09-15",
          },
          {
            name: "Previous School Report",
            type: "Academic",
            status: "Verified",
            uploadDate: "2024-01-20",
            expiryDate: null,
          },
          {
            name: "Passport Photograph",
            type: "Identity",
            status: "Valid",
            uploadDate: "2024-08-10",
            expiryDate: "2025-08-10",
          },
        ],

        // Behavioral Records
        behavioralRecords: [
          {
            date: "2024-11-01",
            type: "Positive",
            description: "Helped a classmate with mathematics assignment",
            teacher: "Mrs. Williams",
            action: "Verbal Praise",
            severity: "low",
          },
          {
            date: "2024-10-25",
            type: "Achievement",
            description: "Won first place in science fair",
            teacher: "Dr. Brown",
            action: "Certificate Award",
            severity: "low",
          },
          {
            date: "2024-10-15",
            type: "Concern",
            description: "Late submission of English assignment",
            teacher: "Mrs. Adams",
            action: "Parent Notification",
            severity: "medium",
          },
        ],

        // Parent Notes
        parentNotes: [
          {
            date: "2024-11-08",
            note: "Sarah mentioned she's struggling with chemistry. Arranged extra tutoring.",
            category: "Academic Support",
          },
          {
            date: "2024-10-30",
            note: "Request for pickup by aunt Grace Okafor on Friday due to parent meeting.",
            category: "Transportation",
          },
          {
            date: "2024-10-20",
            note: "Updated emergency contact information. Father's new workplace contact.",
            category: "Contact Update",
          },
        ],

        // Transportation
        transportation: {
          method: "School Bus",
          route: "Route A - Victoria Island",
          busNumber: "SMS-001",
          driverName: "Mr. Emeka Okonkwo",
          driverPhone: "+234 803 999 1234",
          pickupTime: "7:30 AM",
          dropoffTime: "3:45 PM",
          pickupLocation: "Victoria Island Bus Stop",
          specialInstructions: "Call parent if late pickup",
        },

        // Extended data...
        subjects: [
          {
            name: "Mathematics",
            grade: "A",
            teacher: "Mr. Williams",
            currentScore: 92,
          },
          {
            name: "English Language",
            grade: "B+",
            teacher: "Mrs. Adams",
            currentScore: 88,
          },
          {
            name: "Physics",
            grade: "A-",
            teacher: "Dr. Brown",
            currentScore: 85,
          },
          {
            name: "Chemistry",
            grade: "B+",
            teacher: "Mrs. Davis",
            currentScore: 82,
          },
          {
            name: "Biology",
            grade: "A",
            teacher: "Mr. Wilson",
            currentScore: 90,
          },
          {
            name: "Geography",
            grade: "B",
            teacher: "Ms. Taylor",
            currentScore: 87,
          },
          {
            name: "History",
            grade: "A-",
            teacher: "Mr. Johnson",
            currentScore: 84,
          },
          {
            name: "Computer Studies",
            grade: "A",
            teacher: "Mrs. Lee",
            currentScore: 91,
          },
        ],
        recentActivities: [
          {
            date: "2024-11-08",
            activity: "Submitted Mathematics Assignment",
            type: "assignment",
          },
          {
            date: "2024-11-07",
            activity: "Attended Physics Practical Class",
            type: "attendance",
          },
          {
            date: "2024-11-05",
            activity: "Completed Chemistry Quiz - Score: 85%",
            type: "quiz",
          },
          {
            date: "2024-11-03",
            activity: "Participated in Science Fair",
            type: "event",
          },
        ],
        upcomingEvents: [
          { date: "2024-11-15", event: "English Language Exam", type: "exam" },
          {
            date: "2024-11-18",
            event: "Mathematics Assignment Due",
            type: "assignment",
          },
          { date: "2024-11-20", event: "PTA Meeting", type: "meeting" },
        ],
      },
      {
        id: 2,
        name: "Michael Johnson",
        firstName: "Michael",
        middleName: "David",
        lastName: "Johnson",
        fullName: "Michael Johnson",
        level: "Primary",
        class: "Primary 5B",
        section: "B",
        department: "Primary",
        admissionNo: "EDU2023002",
        admissionNumber: "EDU2023002",
        rollNumber: "PRI/5B/002",
        accessPin: "MICHAEL2024",
        profilePicture: null,
        dateOfBirth: "2014-08-22",
        age: 10,
        gender: "Male",
        nationality: "Nigerian",
        stateOfOrigin: "Lagos",
        localGovernment: "Surulere",
        address: "123 Main Street, Lagos",
        studentPhone: "+234 805 234 5678",
        studentEmail: "michael.johnson@student.school.edu",
        academicSession: "2024/2025",
        admissionDate: "2023-09-01",
        status: "Active",
        parentName: "John Johnson",
        primaryGuardian: "John Johnson",
        parentPhone: "+234 803 123 4567",
        parentEmail: "parent@example.com",
        parentAddress: "123 Main Street, Lagos",
        parentOccupation: "University Lecturer",
        parentNationality: "Nigerian",
        emergencyContact: "+234 806 987 6543",
        guardianRelationship: "Father",
        bloodGroup: "A+",
        allergies: "Peanuts",
        attendance: 89,
        lastGrade: "B+",
        overallGrade: "B+",

        // Medical Information
        medicalInfo: {
          height: "135 cm",
          weight: "32 kg",
          lastCheckup: "2024-08-20",
          vaccinations: ["COVID-19", "MMR", "DPT"],
          medications: ["EpiPen (for peanut allergy)"],
          chronicConditions: "Peanut Allergy",
          doctorName: "Dr. Funmi Adeleke",
          doctorPhone: "+234 702 345 6789",
          healthInsurance: "NHIS - 987654321",
        },

        // Emergency Contacts
        emergencyContacts: [
          {
            name: "John Johnson (Father)",
            relationship: "Father",
            phone: "+234 803 123 4567",
            email: "john.johnson@email.com",
            address: "123 Main Street, Lagos",
            workplace: "Lagos State University",
          },
          {
            name: "Mary Johnson (Mother)",
            relationship: "Mother",
            phone: "+234 806 987 6543",
            email: "mary.johnson@email.com",
            address: "123 Main Street, Lagos",
            workplace: "First Bank Nigeria",
          },
        ],

        // Documents
        documents: [
          {
            name: "Birth Certificate",
            type: "Identity",
            status: "Verified",
            uploadDate: "2024-01-15",
            expiryDate: null,
          },
          {
            name: "Allergy Medical Report",
            type: "Medical",
            status: "Valid",
            uploadDate: "2024-08-20",
            expiryDate: "2025-08-20",
          },
        ],

        // Behavioral Records
        behavioralRecords: [
          {
            date: "2024-11-05",
            type: "Achievement",
            description: "Art Competition - 2nd Place",
            teacher: "Ms. White",
            action: "Certificate Award",
            severity: "low",
          },
        ],

        // Parent Notes
        parentNotes: [
          {
            date: "2024-11-01",
            note: "Reminded teacher about peanut allergy. EpiPen is in school bag.",
            category: "Medical Alert",
          },
        ],

        // Transportation
        transportation: {
          method: "Parent Pickup",
          route: "N/A",
          busNumber: "N/A",
          driverName: "N/A",
          driverPhone: "N/A",
          pickupTime: "N/A",
          dropoffTime: "3:30 PM",
          pickupLocation: "School Gate",
          specialInstructions: "Wait for parent at main gate",
        },

        subjects: [
          {
            name: "Mathematics",
            grade: "B+",
            teacher: "Mrs. Smith",
            currentScore: 81,
          },
          {
            name: "English Language",
            grade: "A-",
            teacher: "Mr. Jones",
            currentScore: 86,
          },
          {
            name: "Science",
            grade: "B",
            teacher: "Mrs. Green",
            currentScore: 79,
          },
          {
            name: "Social Studies",
            grade: "B+",
            teacher: "Mr. Clark",
            currentScore: 83,
          },
          {
            name: "Creative Arts",
            grade: "A",
            teacher: "Ms. White",
            currentScore: 92,
          },
          {
            name: "Physical Education",
            grade: "A",
            teacher: "Coach Brown",
            currentScore: 89,
          },
        ],
        recentActivities: [
          {
            date: "2024-11-08",
            activity: "Completed Science Project",
            type: "assignment",
          },
          {
            date: "2024-11-07",
            activity: "Perfect Attendance This Week",
            type: "attendance",
          },
          {
            date: "2024-11-05",
            activity: "Art Competition - 2nd Place",
            type: "achievement",
          },
        ],
        upcomingEvents: [
          { date: "2024-11-12", event: "Mathematics Test", type: "exam" },
          {
            date: "2024-11-16",
            event: "Science Project Presentation",
            type: "presentation",
          },
        ],
      },
    ]);
  }, []);

  const filteredChildren = children.filter(
    (child) =>
      child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      child.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      child.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (child) => {
    setSelectedChild(child);
    setEditData({
      parentPhone: child.parentPhone,
      parentEmail: child.parentEmail,
      address: child.address,
      emergencyContact: child.emergencyContact,
      allergies: child.allergies,
    });
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    // In real app, send to API
    setChildren(
      children.map((child) =>
        child.id === selectedChild.id ? { ...child, ...editData } : child
      )
    );
    toast.success("Child information updated successfully!");
    setEditMode(false);
    setSelectedChild(null);
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.relationship || !newContact.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedChildren = children.map((child) =>
      child.id === selectedChild.id
        ? {
            ...child,
            emergencyContacts: [
              ...child.emergencyContacts,
              { ...newContact, id: Date.now() },
            ],
          }
        : child
    );

    setChildren(updatedChildren);
    setSelectedChild({
      ...selectedChild,
      emergencyContacts: [
        ...selectedChild.emergencyContacts,
        { ...newContact, id: Date.now() },
      ],
    });
    setNewContact({
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
      workplace: "",
    });
    setShowAddContactDialog(false);
    toast.success("Emergency contact added successfully!");
  };

  const handleUploadDocument = () => {
    if (!newDocument.name || !newDocument.type) {
      toast.error("Please fill in all required fields");
      return;
    }

    const document = {
      ...newDocument,
      id: Date.now(),
      status: "Pending Review",
      uploadDate: new Date().toISOString().split("T")[0],
      expiryDate: null,
    };

    const updatedChildren = children.map((child) =>
      child.id === selectedChild.id
        ? {
            ...child,
            documents: [...child.documents, document],
          }
        : child
    );

    setChildren(updatedChildren);
    setSelectedChild({
      ...selectedChild,
      documents: [...selectedChild.documents, document],
    });
    setNewDocument({ name: "", type: "", file: null });
    setShowUploadDocDialog(false);
    toast.success("Document uploaded successfully!");
  };

  const handleAddNote = () => {
    if (!newNote.note || !newNote.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const note = {
      ...newNote,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
    };

    const updatedChildren = children.map((child) =>
      child.id === selectedChild.id
        ? {
            ...child,
            parentNotes: [note, ...child.parentNotes],
          }
        : child
    );

    setChildren(updatedChildren);
    setSelectedChild({
      ...selectedChild,
      parentNotes: [note, ...selectedChild.parentNotes],
    });
    setNewNote({ note: "", category: "" });
    setShowAddNoteDialog(false);
    toast.success("Note added successfully!");
  };

  const handleUpdateMedical = () => {
    const updatedChildren = children.map((child) =>
      child.id === selectedChild.id
        ? {
            ...child,
            medicalInfo: { ...child.medicalInfo, ...medicalData },
          }
        : child
    );

    setChildren(updatedChildren);
    setSelectedChild({
      ...selectedChild,
      medicalInfo: { ...selectedChild.medicalInfo, ...medicalData },
    });
    setShowEditMedicalDialog(false);
    toast.success("Medical information updated successfully!");
  };

  const handleUpdateTransport = () => {
    const updatedChildren = children.map((child) =>
      child.id === selectedChild.id
        ? {
            ...child,
            transportation: { ...child.transportation, ...transportData },
          }
        : child
    );

    setChildren(updatedChildren);
    setSelectedChild({
      ...selectedChild,
      transportation: { ...selectedChild.transportation, ...transportData },
    });
    setShowEditTransportDialog(false);
    toast.success("Transportation information updated successfully!");
  };

  const openEditMedical = () => {
    setMedicalData(selectedChild.medicalInfo);
    setShowEditMedicalDialog(true);
  };

  const openEditTransport = () => {
    setTransportData(selectedChild.transportation);
    setShowEditTransportDialog(true);
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-800";
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-800";
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 95) return "text-green-600";
    if (attendance >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Children</h1>
          <p className="text-gray-600">
            Manage and view detailed information about your children.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Search children..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Children Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredChildren.map((child) => (
          <Card
            key={child.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={child.profilePicture} />
                    <AvatarFallback>
                      {child.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{child.name}</h3>
                    <p className="text-sm text-gray-600">{child.admissionNo}</p>
                    <Badge variant="outline">{child.class}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedChild(child)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(child)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <UserCheck
                    className={`h-5 w-5 mx-auto mb-1 ${getAttendanceColor(
                      child.attendance
                    )}`}
                  />
                  <p className="text-sm font-medium">{child.attendance}%</p>
                  <p className="text-xs text-gray-600">Attendance</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Award className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-sm font-medium">{child.lastGrade}</p>
                  <p className="text-xs text-gray-600">Last Grade</p>
                </div>
              </div>

              {/* Subject Performance */}
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Subjects</h4>
                <div className="grid grid-cols-2 gap-2">
                  {child.subjects.slice(0, 4).map((subject, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-xs"
                    >
                      <span className="truncate">{subject.name}</span>
                      <Badge
                        className={`text-xs ${getGradeColor(subject.grade)}`}
                      >
                        {subject.grade}
                      </Badge>
                    </div>
                  ))}
                </div>
                {child.subjects.length > 4 && (
                  <p className="text-xs text-gray-500 mt-2">
                    +{child.subjects.length - 4} more subjects
                  </p>
                )}
              </div>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => setSelectedChild(child)}
              >
                View Full Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Child Details Modal with Comprehensive Management */}
      {selectedChild && !editMode && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedChild.profilePicture} />
                <AvatarFallback className="text-lg">
                  {selectedChild.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{selectedChild.name}</h2>
                <div className="flex items-center gap-4 mt-1">
                  <Badge variant="outline" className="font-medium">
                    {selectedChild.admissionNo}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    {selectedChild.class}
                  </Badge>
                  <Badge
                    className={
                      selectedChild.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {selectedChild.status}
                  </Badge>
                </div>
              </div>
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-1" />
                Update Photo
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-1" />
                Print Profile
              </Button>
              <Button variant="outline" onClick={() => setSelectedChild(null)}>
                Close
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="emergency">Emergency</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="transport">Transport</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <UserCheck
                        className={`h-8 w-8 ${getAttendanceColor(
                          selectedChild.attendance
                        )}`}
                      />
                      <div>
                        <div className="text-2xl font-bold">
                          {selectedChild.attendance}%
                        </div>
                        <div className="text-sm text-gray-600">Attendance</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <Award className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold">
                          {selectedChild.lastGrade}
                        </div>
                        <div className="text-sm text-gray-600">
                          Average Grade
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <BookMarked className="h-8 w-8 text-purple-600" />
                      <div>
                        <div className="text-2xl font-bold">
                          {selectedChild.subjects.length}
                        </div>
                        <div className="text-sm text-gray-600">Subjects</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-3">
                      <Activity className="h-8 w-8 text-orange-600" />
                      <div>
                        <div className="text-2xl font-bold">
                          {selectedChild.recentActivities.length}
                        </div>
                        <div className="text-sm text-gray-600">Activities</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Full Name</div>
                            <div className="text-gray-600">
                              {selectedChild.firstName}{" "}
                              {selectedChild.middleName
                                ? selectedChild.middleName + " "
                                : ""}
                              {selectedChild.lastName}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Date of Birth</div>
                            <div className="text-gray-600">
                              {new Date(
                                selectedChild.dateOfBirth
                              ).toLocaleDateString()}
                              (
                              {new Date().getFullYear() -
                                new Date(
                                  selectedChild.dateOfBirth
                                ).getFullYear()}{" "}
                              years)
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Gender</div>
                            <div className="text-gray-600">
                              {selectedChild.gender}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Heart className="h-4 w-4 text-red-500" />
                          <div>
                            <div className="font-medium">Blood Group</div>
                            <div className="text-gray-600">
                              {selectedChild.bloodGroup}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Nationality</div>
                            <div className="text-gray-600">
                              {selectedChild.nationality || "Not specified"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">State of Origin</div>
                            <div className="text-gray-600">
                              {selectedChild.stateOfOrigin || "Not specified"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Local Government</div>
                            <div className="text-gray-600">
                              {selectedChild.localGovernment || "Not specified"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Stethoscope className="h-4 w-4 text-blue-500" />
                          <div>
                            <div className="font-medium">Allergies</div>
                            <div className="text-gray-600">
                              {selectedChild.allergies || "None reported"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Address</div>
                            <div className="text-gray-600">
                              {selectedChild.address}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Phone Number</div>
                            <div className="text-gray-600">
                              {selectedChild.studentPhone || "Not provided"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Email Address</div>
                            <div className="text-gray-600">
                              {selectedChild.studentEmail || "Not provided"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Access PIN</div>
                            <div className="text-gray-600">
                              {selectedChild.accessPin || "Not assigned"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookMarked className="h-5 w-5" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <BookMarked className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Level</div>
                            <div className="text-gray-600">
                              {selectedChild.level || "Not specified"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <BookMarked className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Class</div>
                            <div className="text-gray-600">
                              {selectedChild.class}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <BookMarked className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Section</div>
                            <div className="text-gray-600">
                              {selectedChild.section || "Not specified"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <BookMarked className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Department</div>
                            <div className="text-gray-600">
                              {selectedChild.department || "Not specified"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <BookMarked className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Admission Number</div>
                            <div className="text-gray-600">
                              {selectedChild.admissionNo}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Academic Session</div>
                            <div className="text-gray-600">
                              {selectedChild.session || "2024/2025"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Admission Date</div>
                            <div className="text-gray-600">
                              {selectedChild.admissionDate || "Not specified"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Status</div>
                            <Badge
                              className={
                                selectedChild.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {selectedChild.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Parent/Guardian Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Parent/Guardian Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Parent Name</div>
                            <div className="text-gray-600">
                              {selectedChild.parentName ||
                                selectedChild.primaryGuardian ||
                                "Not specified"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Parent Phone</div>
                            <div className="text-gray-600">
                              {selectedChild.parentPhone}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Parent Email</div>
                            <div className="text-gray-600">
                              {selectedChild.parentEmail}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Parent Address</div>
                            <div className="text-gray-600">
                              {selectedChild.parentAddress ||
                                selectedChild.address}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Occupation</div>
                            <div className="text-gray-600">
                              {selectedChild.parentOccupation ||
                                "Not specified"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">
                              Parent Nationality
                            </div>
                            <div className="text-gray-600">
                              {selectedChild.parentNationality ||
                                "Not specified"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-red-500" />
                          <div>
                            <div className="font-medium">Emergency Contact</div>
                            <div className="text-gray-600">
                              {selectedChild.emergencyContact}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Relationship</div>
                            <div className="text-gray-600">
                              {selectedChild.guardianRelationship || "Parent"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Academic Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedChild.subjects.map((subject, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{subject.name}</h4>
                            <Badge className={getGradeColor(subject.grade)}>
                              {subject.grade}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Score:</span>
                              <span className="font-semibold">
                                {subject.currentScore}%
                              </span>
                            </div>
                            <Progress
                              value={subject.currentScore}
                              className="h-2"
                            />
                            <p className="text-xs text-gray-600">
                              Teacher: {subject.teacher}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Recent Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedChild.recentActivities.map(
                          (activity, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <div
                                className={`p-1 rounded-full ${
                                  activity.type === "assignment"
                                    ? "bg-blue-100"
                                    : activity.type === "attendance"
                                    ? "bg-green-100"
                                    : activity.type === "quiz"
                                    ? "bg-purple-100"
                                    : activity.type === "achievement"
                                    ? "bg-yellow-100"
                                    : "bg-gray-100"
                                }`}
                              >
                                <Activity
                                  className={`h-3 w-3 ${
                                    activity.type === "assignment"
                                      ? "text-blue-600"
                                      : activity.type === "attendance"
                                      ? "text-green-600"
                                      : activity.type === "quiz"
                                      ? "text-purple-600"
                                      : activity.type === "achievement"
                                      ? "text-yellow-600"
                                      : "text-gray-600"
                                  }`}
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {activity.activity}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {new Date(activity.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Upcoming Events
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedChild.upcomingEvents.map((event, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                          >
                            <div
                              className={`p-1 rounded-full ${
                                event.type === "exam"
                                  ? "bg-red-100"
                                  : event.type === "assignment"
                                  ? "bg-blue-100"
                                  : event.type === "meeting"
                                  ? "bg-green-100"
                                  : "bg-purple-100"
                              }`}
                            >
                              <Calendar
                                className={`h-3 w-3 ${
                                  event.type === "exam"
                                    ? "text-red-600"
                                    : event.type === "assignment"
                                    ? "text-blue-600"
                                    : event.type === "meeting"
                                    ? "text-green-600"
                                    : "text-purple-600"
                                }`}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {event.event}
                              </p>
                              <p className="text-xs text-gray-600">
                                {new Date(event.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Medical Tab */}
              <TabsContent value="medical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-blue-600" />
                        Medical Information
                      </CardTitle>
                      <Button size="sm" onClick={openEditMedical}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Medical Info
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Physical Stats
                          </Label>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Height:</span>
                              <span className="font-medium">
                                {selectedChild.medicalInfo.height}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Weight:</span>
                              <span className="font-medium">
                                {selectedChild.medicalInfo.weight}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Doctor Information
                          </Label>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Doctor:</span>
                              <span className="font-medium">
                                {selectedChild.medicalInfo.doctorName}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Vaccinations
                        </Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedChild.medicalInfo.vaccinations.map(
                            (vaccination, index) => (
                              <Badge
                                key={index}
                                className="bg-green-100 text-green-800"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {vaccination}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Emergency Contacts Tab */}
              <TabsContent value="emergency" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Emergency Contacts</h3>
                  <Button
                    size="sm"
                    onClick={() => setShowAddContactDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Contact
                  </Button>
                </div>

                <div className="space-y-4">
                  {selectedChild.emergencyContacts.map((contact, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-lg">
                          {contact.name}
                        </h4>
                        <Badge variant="outline" className="mb-3">
                          {contact.relationship}
                        </Badge>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{contact.phone}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Documents</h3>
                  <Button
                    size="sm"
                    onClick={() => setShowUploadDocDialog(true)}
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Upload Document
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedChild.documents.map((document, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium">{document.name}</h4>
                        <Badge className="bg-green-100 text-green-800 mt-2">
                          {document.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Behavior Tab */}
              <TabsContent value="behavior" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Behavioral Records</h3>
                </div>

                <div className="space-y-4">
                  {selectedChild.behavioralRecords.map((record, index) => (
                    <Card key={index} className="border-l-4 border-green-500">
                      <CardContent className="p-4">
                        <Badge className="bg-green-100 text-green-800">
                          {record.type}
                        </Badge>
                        <p className="text-sm mt-2">{record.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Parent Notes</h3>
                  <Button size="sm" onClick={() => setShowAddNoteDialog(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Note
                  </Button>
                </div>

                <div className="space-y-4">
                  {selectedChild.parentNotes.map((note, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <Badge variant="outline">{note.category}</Badge>
                        <p className="text-sm mt-2">{note.note}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Transport Tab */}
              <TabsContent value="transport" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Transportation Information</CardTitle>
                      <Button size="sm" onClick={openEditTransport}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Transport
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium">
                          Transport Method
                        </Label>
                        <Badge className="bg-blue-100 text-blue-800 mt-1">
                          {selectedChild.transportation.method}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Edit Modal */}
      {editMode && selectedChild && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Edit {selectedChild.name}&apos;s Information</CardTitle>
            <div className="flex gap-2">
              <Button onClick={handleSaveEdit}>Save Changes</Button>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Parent Phone</Label>
                <Input
                  id="parentPhone"
                  value={editData.parentPhone}
                  onChange={(e) =>
                    setEditData({ ...editData, parentPhone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Parent Email</Label>
                <Input
                  id="parentEmail"
                  value={editData.parentEmail}
                  onChange={(e) =>
                    setEditData({ ...editData, parentEmail: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={editData.emergencyContact}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      emergencyContact: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  value={editData.allergies}
                  onChange={(e) =>
                    setEditData({ ...editData, allergies: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={editData.address}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Background overlay for modals */}
      {(selectedChild || editMode) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setSelectedChild(null);
            setEditMode(false);
          }}
        />
      )}

      {/* Add Contact Dialog */}
      {showAddContactDialog && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white">
          <CardHeader>
            <CardTitle>Add Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Name *</Label>
                <Input
                  id="contactName"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  placeholder="Enter contact name"
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship *</Label>
                <Input
                  id="relationship"
                  value={newContact.relationship}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      relationship: e.target.value,
                    })
                  }
                  placeholder="e.g., Uncle, Aunt, Guardian"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Phone Number *</Label>
                <Input
                  id="contactPhone"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="contactWorkplace">Workplace</Label>
                <Input
                  id="contactWorkplace"
                  value={newContact.workplace}
                  onChange={(e) =>
                    setNewContact({ ...newContact, workplace: e.target.value })
                  }
                  placeholder="Enter workplace"
                />
              </div>
              <div>
                <Label htmlFor="contactAddress">Address</Label>
                <Textarea
                  id="contactAddress"
                  value={newContact.address}
                  onChange={(e) =>
                    setNewContact({ ...newContact, address: e.target.value })
                  }
                  placeholder="Enter address"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddContact} className="flex-1">
                Add Contact
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddContactDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Document Dialog */}
      {showUploadDocDialog && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white">
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="docName">Document Name *</Label>
                <Input
                  id="docName"
                  value={newDocument.name}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, name: e.target.value })
                  }
                  placeholder="Enter document name"
                />
              </div>
              <div>
                <Label htmlFor="docType">Document Type *</Label>
                <Input
                  id="docType"
                  value={newDocument.type}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, type: e.target.value })
                  }
                  placeholder="e.g., Medical, Identity, Academic"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="docFile">Choose File</Label>
                <Input
                  id="docFile"
                  type="file"
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, file: e.target.files[0] })
                  }
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleUploadDocument} className="flex-1">
                Upload Document
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUploadDocDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Note Dialog */}
      {showAddNoteDialog && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white">
          <CardHeader>
            <CardTitle>Add Parent Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="noteCategory">Category *</Label>
              <Input
                id="noteCategory"
                value={newNote.category}
                onChange={(e) =>
                  setNewNote({ ...newNote, category: e.target.value })
                }
                placeholder="e.g., Academic Support, Medical Alert, Transportation"
              />
            </div>
            <div>
              <Label htmlFor="noteText">Note *</Label>
              <Textarea
                id="noteText"
                rows={4}
                value={newNote.note}
                onChange={(e) =>
                  setNewNote({ ...newNote, note: e.target.value })
                }
                placeholder="Enter your note here..."
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddNote} className="flex-1">
                Add Note
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddNoteDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Medical Dialog */}
      {showEditMedicalDialog && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white">
          <CardHeader>
            <CardTitle>Edit Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  value={medicalData.height || ""}
                  onChange={(e) =>
                    setMedicalData({ ...medicalData, height: e.target.value })
                  }
                  placeholder="e.g., 150 cm"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  value={medicalData.weight || ""}
                  onChange={(e) =>
                    setMedicalData({ ...medicalData, weight: e.target.value })
                  }
                  placeholder="e.g., 45 kg"
                />
              </div>
              <div>
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input
                  id="doctorName"
                  value={medicalData.doctorName || ""}
                  onChange={(e) =>
                    setMedicalData({
                      ...medicalData,
                      doctorName: e.target.value,
                    })
                  }
                  placeholder="Enter doctor's name"
                />
              </div>
              <div>
                <Label htmlFor="doctorPhone">Doctor Phone</Label>
                <Input
                  id="doctorPhone"
                  value={medicalData.doctorPhone || ""}
                  onChange={(e) =>
                    setMedicalData({
                      ...medicalData,
                      doctorPhone: e.target.value,
                    })
                  }
                  placeholder="Enter doctor's phone"
                />
              </div>
              <div>
                <Label htmlFor="healthInsurance">Health Insurance</Label>
                <Input
                  id="healthInsurance"
                  value={medicalData.healthInsurance || ""}
                  onChange={(e) =>
                    setMedicalData({
                      ...medicalData,
                      healthInsurance: e.target.value,
                    })
                  }
                  placeholder="Enter insurance details"
                />
              </div>
              <div>
                <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                <Input
                  id="chronicConditions"
                  value={medicalData.chronicConditions || ""}
                  onChange={(e) =>
                    setMedicalData({
                      ...medicalData,
                      chronicConditions: e.target.value,
                    })
                  }
                  placeholder="Enter any chronic conditions"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdateMedical} className="flex-1">
                Update Medical Info
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowEditMedicalDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Transport Dialog */}
      {showEditTransportDialog && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white">
          <CardHeader>
            <CardTitle>Edit Transportation Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="transportMethod">Transport Method</Label>
                <Input
                  id="transportMethod"
                  value={transportData.method || ""}
                  onChange={(e) =>
                    setTransportData({
                      ...transportData,
                      method: e.target.value,
                    })
                  }
                  placeholder="e.g., School Bus, Parent Pickup"
                />
              </div>
              <div>
                <Label htmlFor="transportRoute">Route</Label>
                <Input
                  id="transportRoute"
                  value={transportData.route || ""}
                  onChange={(e) =>
                    setTransportData({
                      ...transportData,
                      route: e.target.value,
                    })
                  }
                  placeholder="Enter route details"
                />
              </div>
              <div>
                <Label htmlFor="busNumber">Bus Number</Label>
                <Input
                  id="busNumber"
                  value={transportData.busNumber || ""}
                  onChange={(e) =>
                    setTransportData({
                      ...transportData,
                      busNumber: e.target.value,
                    })
                  }
                  placeholder="Enter bus number"
                />
              </div>
              <div>
                <Label htmlFor="pickupLocation">Pickup Location</Label>
                <Input
                  id="pickupLocation"
                  value={transportData.pickupLocation || ""}
                  onChange={(e) =>
                    setTransportData({
                      ...transportData,
                      pickupLocation: e.target.value,
                    })
                  }
                  placeholder="Enter pickup location"
                />
              </div>
              <div>
                <Label htmlFor="pickupTime">Pickup Time</Label>
                <Input
                  id="pickupTime"
                  value={transportData.pickupTime || ""}
                  onChange={(e) =>
                    setTransportData({
                      ...transportData,
                      pickupTime: e.target.value,
                    })
                  }
                  placeholder="e.g., 7:30 AM"
                />
              </div>
              <div>
                <Label htmlFor="dropoffTime">Dropoff Time</Label>
                <Input
                  id="dropoffTime"
                  value={transportData.dropoffTime || ""}
                  onChange={(e) =>
                    setTransportData({
                      ...transportData,
                      dropoffTime: e.target.value,
                    })
                  }
                  placeholder="e.g., 3:45 PM"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="specialInstructions">
                  Special Instructions
                </Label>
                <Textarea
                  id="specialInstructions"
                  value={transportData.specialInstructions || ""}
                  onChange={(e) =>
                    setTransportData({
                      ...transportData,
                      specialInstructions: e.target.value,
                    })
                  }
                  placeholder="Enter any special instructions"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdateTransport} className="flex-1">
                Update Transport Info
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowEditTransportDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Background overlay for dialogs */}
      {(showAddContactDialog ||
        showUploadDocDialog ||
        showAddNoteDialog ||
        showEditMedicalDialog ||
        showEditTransportDialog) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setShowAddContactDialog(false);
            setShowUploadDocDialog(false);
            setShowAddNoteDialog(false);
            setShowEditMedicalDialog(false);
            setShowEditTransportDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default ViewChildren;
