import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Calendar,
  BookOpen,
  Users,
  Send,
  Search,
  Filter,
  Star,
  MessageSquare,
  Video,
  PhoneCall,
  Award,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

const TeacherContact = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [selectedChild, setSelectedChild] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  // Mock children data
  const children = [
    { id: 1, name: "Sarah Johnson", class: "JSS 2A" },
    { id: 2, name: "Michael Johnson", class: "JSS 1B" },
  ];

  // Mock teachers data
  const teachers = [
    {
      id: 1,
      name: "Mrs. Elizabeth Thompson",
      subject: "Mathematics",
      class: "JSS 2A",
      childId: 1,
      email: "e.thompson@school.edu",
      phone: "+234-801-234-5678",
      avatar: "/placeholder.svg",
      department: "Mathematics Department",
      experience: "8 years",
      qualification: "M.Ed Mathematics, B.Sc Mathematics",
      specialization: "Algebra, Geometry, Statistics",
      officeLocation: "Math Block, Room 201",
      officeHours: "Mon-Fri: 2:00 PM - 4:00 PM",
      rating: 4.8,
      totalStudents: 45,
      isClassTeacher: true,
      subjects: ["Mathematics", "Further Mathematics"],
      lastActive: "2024-11-12T10:30:00Z",
      responseTime: "Usually responds within 2 hours",
    },
    {
      id: 2,
      name: "Mr. David Wilson",
      subject: "English Language",
      class: "JSS 2A",
      childId: 1,
      email: "d.wilson@school.edu",
      phone: "+234-802-345-6789",
      avatar: "/placeholder.svg",
      department: "Languages Department",
      experience: "12 years",
      qualification: "M.A English Literature, B.A English",
      specialization: "Literature, Creative Writing, Grammar",
      officeLocation: "Language Block, Room 105",
      officeHours: "Mon-Fri: 1:00 PM - 3:00 PM",
      rating: 4.9,
      totalStudents: 42,
      isClassTeacher: false,
      subjects: ["English Language", "Literature"],
      lastActive: "2024-11-12T09:45:00Z",
      responseTime: "Usually responds within 1 hour",
    },
    {
      id: 3,
      name: "Dr. Sarah Adebayo",
      subject: "Biology",
      class: "JSS 2A",
      childId: 1,
      email: "s.adebayo@school.edu",
      phone: "+234-803-456-7890",
      avatar: "/placeholder.svg",
      department: "Science Department",
      experience: "15 years",
      qualification: "Ph.D Biology, M.Sc Botany",
      specialization: "Cell Biology, Ecology, Genetics",
      officeLocation: "Science Block, Room 302",
      officeHours: "Tue-Thu: 3:00 PM - 5:00 PM",
      rating: 4.7,
      totalStudents: 38,
      isClassTeacher: false,
      subjects: ["Biology", "Basic Science"],
      lastActive: "2024-11-12T11:15:00Z",
      responseTime: "Usually responds within 3 hours",
    },
    {
      id: 4,
      name: "Mrs. Grace Okafor",
      subject: "Mathematics",
      class: "JSS 1B",
      childId: 2,
      email: "g.okafor@school.edu",
      phone: "+234-804-567-8901",
      avatar: "/placeholder.svg",
      department: "Mathematics Department",
      experience: "6 years",
      qualification: "B.Ed Mathematics, B.Sc Mathematics",
      specialization: "Basic Mathematics, Problem Solving",
      officeLocation: "Math Block, Room 105",
      officeHours: "Mon-Fri: 11:00 AM - 1:00 PM",
      rating: 4.6,
      totalStudents: 35,
      isClassTeacher: true,
      subjects: ["Mathematics", "Basic Mathematics"],
      lastActive: "2024-11-12T08:30:00Z",
      responseTime: "Usually responds within 4 hours",
    },
    {
      id: 5,
      name: "Mr. James Okwu",
      subject: "Physics",
      class: "JSS 1B",
      childId: 2,
      email: "j.okwu@school.edu",
      phone: "+234-805-678-9012",
      avatar: "/placeholder.svg",
      department: "Science Department",
      experience: "10 years",
      qualification: "M.Sc Physics, B.Sc Physics",
      specialization: "Mechanics, Thermodynamics, Optics",
      officeLocation: "Science Block, Room 205",
      officeHours: "Mon-Wed-Fri: 2:00 PM - 4:00 PM",
      rating: 4.5,
      totalStudents: 40,
      isClassTeacher: false,
      subjects: ["Physics", "Basic Science"],
      lastActive: "2024-11-12T07:20:00Z",
      responseTime: "Usually responds within 6 hours",
    },
  ];

  // Filter teachers based on search and filters
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      subjectFilter === "all" ||
      teacher.subject.toLowerCase() === subjectFilter.toLowerCase();
    const matchesChild =
      selectedChild === "all" || teacher.childId === parseInt(selectedChild);
    return matchesSearch && matchesSubject && matchesChild;
  });

  const handleSendMessage = async () => {
    if (!messageSubject.trim() || !messageContent.trim()) {
      toast.error("Please fill in both subject and message");
      return;
    }

    try {
      // Simulate sending message
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`Message sent to ${selectedTeacher?.name} successfully!`);
      setMessageSubject("");
      setMessageContent("");
      setIsMessageDialogOpen(false);
      setSelectedTeacher(null);
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const getSubjectColor = (subject) => {
    const colors = {
      Mathematics: "bg-blue-100 text-blue-800",
      "English Language": "bg-green-100 text-green-800",
      Biology: "bg-purple-100 text-purple-800",
      Physics: "bg-red-100 text-red-800",
      Chemistry: "bg-yellow-100 text-yellow-800",
      History: "bg-orange-100 text-orange-800",
    };
    return colors[subject] || "bg-gray-100 text-gray-800";
  };

  const formatLastActive = (timestamp) => {
    const now = new Date();
    const lastActive = new Date(timestamp);
    const diffHours = Math.floor((now - lastActive) / (1000 * 60 * 60));

    if (diffHours < 1) return "Active now";
    if (diffHours < 24) return `Active ${diffHours}h ago`;
    return `Active ${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Users className="h-8 w-8 text-blue-500" />
          Teachers Directory
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect and communicate with your children&apos;s teachers. Send
          messages, schedule meetings, and stay updated on academic progress.
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Find Teachers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by teacher name or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Child Filter */}
            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger>
                <SelectValue placeholder="Select child" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Children</SelectItem>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id.toString()}>
                    {child.name} ({child.class})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Subject Filter */}
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="English Language">
                  English Language
                </SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="History">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card
            key={teacher.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback>
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    {teacher.isClassTeacher && (
                      <Badge className="bg-gold-100 text-gold-800 text-xs">
                        Class Teacher
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Badge className={getSubjectColor(teacher.subject)}>
                      {teacher.subject}
                    </Badge>
                    <p className="text-sm text-gray-600">{teacher.class}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {formatLastActive(teacher.lastActive)}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{teacher.rating}/5.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>{teacher.totalStudents} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-purple-500" />
                  <span>{teacher.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>
                    Office {teacher.officeLocation.split(",")[1]?.trim()}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{teacher.phone}</span>
                </div>
              </div>

              {/* Response Time */}
              <div className="p-2 bg-blue-50 rounded text-sm text-blue-700">
                <Clock className="h-4 w-4 inline mr-1" />
                {teacher.responseTime}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Dialog
                  open={
                    isMessageDialogOpen && selectedTeacher?.id === teacher.id
                  }
                  onOpenChange={setIsMessageDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="flex-1"
                      onClick={() => setSelectedTeacher(teacher)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Send Message to {teacher.name}</DialogTitle>
                      <DialogDescription>
                        Send a message regarding{" "}
                        {children.find((c) => c.id === teacher.childId)?.name}
                        &apos;s progress in {teacher.subject}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Subject
                        </label>
                        <Input
                          placeholder="Enter message subject..."
                          value={messageSubject}
                          onChange={(e) => setMessageSubject(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Message
                        </label>
                        <Textarea
                          placeholder="Type your message here..."
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          rows={5}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsMessageDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm">
                  <PhoneCall className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No teachers found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <Calendar className="h-6 w-6 text-blue-500" />
              <div className="text-center">
                <div className="font-medium">Schedule Meeting</div>
                <div className="text-sm text-gray-500">
                  Book parent-teacher conference
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <BookOpen className="h-6 w-6 text-green-500" />
              <div className="text-center">
                <div className="font-medium">View Class Timetable</div>
                <div className="text-sm text-gray-500">
                  Check class schedules
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <Award className="h-6 w-6 text-purple-500" />
              <div className="text-center">
                <div className="font-medium">Progress Reports</div>
                <div className="text-sm text-gray-500">
                  Access academic reports
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherContact;
