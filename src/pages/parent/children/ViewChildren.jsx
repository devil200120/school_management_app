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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Users,
  Search,
  Edit,
  Eye,
  UserCheck,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  BookOpen,
  Clock,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ViewChildren = () => {
  const [children, setChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  // Mock data - In real app, fetch from API
  useEffect(() => {
    setChildren([
      {
        id: 1,
        name: "Sarah Johnson",
        class: "JSS 2A",
        admissionNo: "EDU2023001",
        profilePicture: null,
        dateOfBirth: "2010-05-15",
        gender: "Female",
        address: "123 Main Street, Lagos",
        parentPhone: "+234 803 123 4567",
        parentEmail: "parent@example.com",
        emergencyContact: "+234 806 987 6543",
        bloodGroup: "O+",
        allergies: "None",
        attendance: 95,
        lastGrade: "A",
        status: "active",
        subjects: [
          { name: "Mathematics", grade: "A", teacher: "Mr. Williams" },
          { name: "English Language", grade: "B+", teacher: "Mrs. Adams" },
          { name: "Physics", grade: "A-", teacher: "Dr. Brown" },
          { name: "Chemistry", grade: "B+", teacher: "Mrs. Davis" },
          { name: "Biology", grade: "A", teacher: "Mr. Wilson" },
          { name: "Geography", grade: "B", teacher: "Ms. Taylor" },
          { name: "History", grade: "A-", teacher: "Mr. Johnson" },
          { name: "Computer Studies", grade: "A", teacher: "Mrs. Lee" },
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
        class: "Primary 5B",
        admissionNo: "EDU2023002",
        profilePicture: null,
        dateOfBirth: "2014-08-22",
        gender: "Male",
        address: "123 Main Street, Lagos",
        parentPhone: "+234 803 123 4567",
        parentEmail: "parent@example.com",
        emergencyContact: "+234 806 987 6543",
        bloodGroup: "A+",
        allergies: "Peanuts",
        attendance: 89,
        lastGrade: "B+",
        status: "active",
        subjects: [
          { name: "Mathematics", grade: "B+", teacher: "Mrs. Smith" },
          { name: "English Language", grade: "A-", teacher: "Mr. Jones" },
          { name: "Science", grade: "B", teacher: "Mrs. Green" },
          { name: "Social Studies", grade: "B+", teacher: "Mr. Clark" },
          { name: "Creative Arts", grade: "A", teacher: "Ms. White" },
          { name: "Physical Education", grade: "A", teacher: "Coach Brown" },
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

      {/* Child Details Modal/Panel */}
      {selectedChild && !editMode && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedChild.profilePicture} />
                <AvatarFallback>
                  {selectedChild.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl">{selectedChild.name}</h2>
                <p className="text-sm text-gray-600">
                  {selectedChild.admissionNo}
                </p>
              </div>
            </CardTitle>
            <Button variant="outline" onClick={() => setSelectedChild(null)}>
              Close
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      DOB:{" "}
                      {new Date(selectedChild.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Gender: {selectedChild.gender}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Address: {selectedChild.address}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Parent: {selectedChild.parentPhone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Email: {selectedChild.parentEmail}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-500" />
                    <span className="text-sm">
                      Emergency: {selectedChild.emergencyContact}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Performance */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Academic Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedChild.subjects.map((subject, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm">{subject.name}</h4>
                      <Badge className={getGradeColor(subject.grade)}>
                        {subject.grade}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      Teacher: {subject.teacher}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {selectedChild.recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Clock className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm">{activity.activity}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {selectedChild.upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <Calendar className="h-4 w-4 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">{event.event}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Modal */}
      {editMode && selectedChild && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Edit {selectedChild.name}'s Information</CardTitle>
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
    </div>
  );
};

export default ViewChildren;
