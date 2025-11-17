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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  MessageCircle,
  Send,
  Search,
  User,
  Calendar,
  Reply,
  Archive,
  Star,
  Paperclip,
  Plus,
  Eye,
  Download,
  RefreshCw,
  Clock,
  Users,
  GraduationCap,
  Mail,
  MessageSquare,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const StudentMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const [filterStudent, setFilterStudent] = useState("all");

  const [composeForm, setComposeForm] = useState({
    recipient: "",
    subject: "",
    message: "",
    priority: "normal",
    studentName: "",
    category: "general",
  });

  // Mock messages data from teacher to students
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "Mrs. Adebayo (Teacher)",
      fromEmail: "m.adebayo@school.edu",
      to: "Sarah Johnson",
      toEmail: "sarah.johnson@student.edu",
      subject: "Assignment Reminder: Mathematics Quiz",
      preview:
        "This is a reminder that your mathematics quiz is due tomorrow...",
      content:
        "Dear Sarah,\n\nThis is a reminder that your mathematics quiz on algebraic equations is due tomorrow, November 12th, 2024.\n\nPlease make sure you have completed all the questions and submit your work before 11:59 PM.\n\nIf you have any questions about the quiz, please don't hesitate to ask during our next class or reply to this message.\n\nGood luck with your quiz!\n\nBest regards,\nMrs. Adebayo\nMathematics Teacher",
      date: "2024-11-11",
      time: "14:30",
      read: true,
      starred: false,
      priority: "high",
      studentName: "Sarah Johnson",
      studentClass: "Grade 10A",
      hasReplies: true,
      repliesCount: 1,
      lastReply: "2024-11-11",
      category: "academic",
      attachments: ["quiz_guidelines.pdf"],
    },
    {
      id: 2,
      from: "Mrs. Adebayo (Teacher)",
      fromEmail: "m.adebayo@school.edu",
      to: "Michael Smith",
      toEmail: "michael.smith@student.edu",
      subject: "Great Improvement in Mathematics",
      preview: "I wanted to congratulate you on your recent improvement...",
      content:
        "Dear Michael,\n\nI wanted to congratulate you on your recent improvement in mathematics. Your test scores have shown significant progress over the past month.\n\nYour dedication to attending the extra help sessions is paying off. Keep up the excellent work!\n\nI'm proud of your commitment to learning and improvement. Continue to ask questions when you need clarification.\n\nWell done!\n\nBest regards,\nMrs. Adebayo",
      date: "2024-11-10",
      time: "16:45",
      read: true,
      starred: true,
      priority: "normal",
      studentName: "Michael Smith",
      studentClass: "Grade 9B",
      hasReplies: false,
      repliesCount: 0,
      lastReply: null,
      category: "encouragement",
      attachments: [],
    },
    {
      id: 3,
      from: "Mrs. Adebayo (Teacher)",
      fromEmail: "m.adebayo@school.edu",
      to: "Emma Brown",
      toEmail: "emma.brown@student.edu",
      subject: "Makeup Assignment - November 8th Lesson",
      preview:
        "Since you were absent on November 8th, here is your makeup assignment...",
      content:
        "Dear Emma,\n\nSince you were absent on November 8th due to your medical appointment, I'm providing you with the makeup assignment for the lesson you missed.\n\nWe covered quadratic functions and their graphs. Please:\n1. Read Chapter 7, sections 7.1-7.3 in your textbook\n2. Complete the practice problems on page 142-143\n3. Watch the video tutorial I've attached\n\nThe assignment is due by Friday, November 15th. If you need any clarification, please let me know.\n\nBest regards,\nMrs. Adebayo",
      date: "2024-11-09",
      time: "09:15",
      read: true,
      starred: false,
      priority: "normal",
      studentName: "Emma Brown",
      studentClass: "Grade 10A",
      hasReplies: false,
      repliesCount: 0,
      lastReply: null,
      category: "makeup_work",
      attachments: [
        "quadratic_functions_tutorial.mp4",
        "homework_worksheet.pdf",
      ],
    },
    {
      id: 4,
      from: "Mrs. Adebayo (Teacher)",
      fromEmail: "m.adebayo@school.edu",
      to: "David Wilson",
      toEmail: "david.wilson@student.edu",
      subject: "Behavioral Discussion Follow-up",
      preview: "Following our conversation about classroom behavior...",
      content:
        "Dear David,\n\nFollowing our conversation about classroom behavior, I want to acknowledge the positive changes I've seen in your participation and attitude.\n\nYour willingness to follow classroom rules and respect your classmates has been noticed and appreciated. Keep up this positive behavior.\n\nRemember our agreement about:\n- Raising your hand before speaking\n- Staying in your seat during lessons\n- Treating classmates with respect\n\nI'm confident you can continue this improvement. Thank you for making our classroom a better learning environment for everyone.\n\nBest regards,\nMrs. Adebayo",
      date: "2024-11-08",
      time: "11:20",
      read: true,
      starred: false,
      priority: "normal",
      studentName: "David Wilson",
      studentClass: "Grade 9B",
      hasReplies: true,
      repliesCount: 1,
      lastReply: "2024-11-09",
      category: "behavioral",
      attachments: [],
    },
    {
      id: 5,
      from: "Mrs. Adebayo (Teacher)",
      fromEmail: "m.adebayo@school.edu",
      to: "Sofia Garcia",
      toEmail: "sofia.garcia@student.edu",
      subject: "Field Trip Permission Confirmation",
      preview:
        "Your permission form for the Science Museum field trip has been received...",
      content:
        "Dear Sofia,\n\nYour permission form for the Science Museum field trip on November 20th, 2024, has been received and approved.\n\nPlease remember to:\n- Arrive at school by 8:00 AM on the trip day\n- Bring a packed lunch and water bottle\n- Wear comfortable walking shoes\n- Bring a notebook and pen for observations\n\nWe're excited to have you join us for this educational experience!\n\nIf you have any questions about the trip, please let me know.\n\nBest regards,\nMrs. Adebayo",
      date: "2024-11-07",
      time: "13:30",
      read: false,
      starred: false,
      priority: "normal",
      studentName: "Sofia Garcia",
      studentClass: "Grade 10A",
      hasReplies: false,
      repliesCount: 0,
      lastReply: null,
      category: "field_trip",
      attachments: ["field_trip_itinerary.pdf"],
    },
  ]);

  // Mock students and classes data
  const students = [
    {
      id: 1,
      name: "Sarah Johnson",
      class: "Grade 10A",
      email: "sarah.johnson@student.edu",
    },
    {
      id: 2,
      name: "Michael Smith",
      class: "Grade 9B",
      email: "michael.smith@student.edu",
    },
    {
      id: 3,
      name: "Emma Brown",
      class: "Grade 10A",
      email: "emma.brown@student.edu",
    },
    {
      id: 4,
      name: "David Wilson",
      class: "Grade 9B",
      email: "david.wilson@student.edu",
    },
    {
      id: 5,
      name: "Sofia Garcia",
      class: "Grade 10A",
      email: "sofia.garcia@student.edu",
    },
    {
      id: 6,
      name: "James Lee",
      class: "Grade 9B",
      email: "james.lee@student.edu",
    },
    {
      id: 7,
      name: "Olivia Taylor",
      class: "Grade 10A",
      email: "olivia.taylor@student.edu",
    },
  ];

  const classes = ["Grade 9A", "Grade 9B", "Grade 10A", "Grade 10B"];

  // Filter messages
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "unread" && !message.read) ||
      (filterStatus === "read" && message.read) ||
      (filterStatus === "starred" && message.starred);

    const matchesClass =
      filterClass === "all" || message.studentClass === filterClass;
    const matchesStudent =
      filterStudent === "all" || message.studentName === filterStudent;

    return matchesSearch && matchesStatus && matchesClass && matchesStudent;
  });

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "academic":
        return GraduationCap;
      case "encouragement":
        return Star;
      case "behavioral":
        return MessageSquare;
      case "makeup_work":
        return Calendar;
      case "field_trip":
        return Building;
      default:
        return MessageCircle;
    }
  };

  // Get priority badge color
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "normal":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handlers
  const handleComposeMessage = () => {
    setComposeForm({
      recipient: "",
      subject: "",
      message: "",
      priority: "normal",
      studentName: "",
      category: "general",
    });
    setIsComposeDialogOpen(true);
  };

  const handleSendMessage = () => {
    if (
      !composeForm.recipient ||
      !composeForm.subject ||
      !composeForm.message
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create new message
    const newMsg = {
      id: messages.length + 1,
      from: "Mrs. Adebayo (Teacher)",
      fromEmail: "m.adebayo@school.edu",
      to: composeForm.studentName,
      toEmail: composeForm.recipient,
      subject: composeForm.subject,
      preview: composeForm.message.substring(0, 50) + "...",
      content: composeForm.message,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: true,
      starred: false,
      priority: composeForm.priority,
      studentName: composeForm.studentName,
      studentClass:
        students.find((s) => s.name === composeForm.studentName)?.class || "",
      hasReplies: false,
      repliesCount: 0,
      lastReply: null,
      category: composeForm.category,
      attachments: [],
    };

    setMessages([newMsg, ...messages]);
    setIsComposeDialogOpen(false);
    toast.success("Message sent successfully!");
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      // Mark as read
      setMessages(
        messages.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
    }
    setIsViewDialogOpen(true);
  };

  const handleToggleStar = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
      )
    );
    toast.success("Message starred status updated");
  };

  const handleReply = () => {
    if (newMessage.trim()) {
      // Handle reply logic here
      setNewMessage("");
      toast.success("Reply sent successfully!");
      setIsViewDialogOpen(false);
    }
  };

  const handleMarkAllAsRead = () => {
    setMessages(messages.map((msg) => ({ ...msg, read: true })));
    toast.success("All messages marked as read");
  };

  const getUnreadCount = () => {
    return messages.filter((msg) => !msg.read).length;
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-eduos-primary animate-fade-in">
            Student Messages
          </h1>
          <p className="text-gray-600 mt-1">
            Communicate directly with students about academics and school
            matters
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Mark All Read
          </Button>
          <Button
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleComposeMessage}
          >
            <Plus className="mr-2 h-4 w-4" />
            Compose Message
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Messages
                </p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {messages.length}
                </p>
              </div>
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Unread Messages
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {getUnreadCount()}
                </p>
              </div>
              <MessageCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  High Priority
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {messages.filter((m) => m.priority === "high").length}
                </p>
              </div>
              <Star className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-green-600">
                  {
                    messages.filter((m) => {
                      const msgDate = new Date(m.date);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return msgDate >= weekAgo;
                    }).length
                  }
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Management */}
      <Card className="animate-fade-in delay-100 mt-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Student Messages ({getUnreadCount()} unread)
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
                  placeholder="Search messages..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="starred">Starred</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStudent} onValueChange={setFilterStudent}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.name}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Messages Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Message</TableHead>
                  <TableHead className="bg-gray-100">To (Student)</TableHead>
                  <TableHead className="bg-gray-100">Student</TableHead>
                  <TableHead className="bg-gray-100">Category</TableHead>
                  <TableHead className="bg-gray-100">Priority</TableHead>
                  <TableHead className="bg-gray-100">Date</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => {
                  const CategoryIcon = getCategoryIcon(message.category);

                  return (
                    <TableRow
                      key={message.id}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        !message.read
                          ? "bg-blue-50 border-l-4 border-l-blue-500"
                          : ""
                      }`}
                      onClick={() => handleViewMessage(message)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              !message.read ? "bg-blue-500" : "bg-transparent"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`${
                                  !message.read ? "font-bold" : ""
                                }`}
                              >
                                {message.subject}
                              </span>
                              {message.starred && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                              {message.hasReplies && (
                                <Badge variant="outline" className="text-xs">
                                  {message.repliesCount} replies
                                </Badge>
                              )}
                              {message.attachments.length > 0 && (
                                <Paperclip className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {message.preview}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{message.to}</div>
                          <div className="text-sm text-gray-500">
                            {message.toEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-sm">
                              {message.studentName}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {message.studentClass}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline" className="capitalize">
                            {message.category.replace("_", " ")}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getPriorityBadgeColor(message.priority)}
                        >
                          {message.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{message.date}</div>
                          <div className="text-sm text-gray-500">
                            {message.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStar(message.id);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Star
                              className={`h-4 w-4 ${
                                message.starred
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-400"
                              }`}
                            />
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
              <span className="font-medium">{filteredMessages.length}</span> of{" "}
              <span className="font-medium">{messages.length}</span> messages
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compose Message Dialog */}
      <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compose Message to Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Select Student *</Label>
                <Select
                  value={composeForm.studentName}
                  onValueChange={(value) => {
                    const student = students.find((s) => s.name === value);
                    setComposeForm((prev) => ({
                      ...prev,
                      studentName: value,
                      recipient: student ? student.email : "",
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.name}>
                        <div className="flex flex-col">
                          <span>{student.name}</span>
                          <span className="text-sm text-gray-500">
                            {student.class}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={composeForm.category}
                  onValueChange={(value) =>
                    setComposeForm((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="encouragement">Encouragement</SelectItem>
                    <SelectItem value="makeup_work">Makeup Work</SelectItem>
                    <SelectItem value="field_trip">Field Trip</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={composeForm.subject}
                  onChange={(e) =>
                    setComposeForm((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  placeholder="Enter message subject"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={composeForm.priority}
                  onValueChange={(value) =>
                    setComposeForm((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Student Email</Label>
              <Input
                id="recipient"
                value={composeForm.recipient}
                readOnly
                placeholder="Select student first to auto-fill email"
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={composeForm.message}
                onChange={(e) =>
                  setComposeForm((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                placeholder="Type your message here..."
                rows={6}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsComposeDialogOpen(false)}
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

      {/* View Message Dialog */}
      {selectedMessage && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-xl">
                    {selectedMessage.subject}
                  </DialogTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>To: {selectedMessage.to}</span>
                    <span>•</span>
                    <span>Student: {selectedMessage.studentName}</span>
                    <span>•</span>
                    <span>
                      {selectedMessage.date} at {selectedMessage.time}
                    </span>
                    <span>•</span>
                    <Badge
                      className={getPriorityBadgeColor(
                        selectedMessage.priority
                      )}
                    >
                      {selectedMessage.priority} priority
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStar(selectedMessage.id)}
                >
                  <Star
                    className={`h-4 w-4 ${
                      selectedMessage.starred
                        ? "text-yellow-500 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              {/* Message Content */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">
                          To: {selectedMessage.to}
                        </span>
                        <Badge variant="outline">Student</Badge>
                        <Badge>Class: {selectedMessage.studentClass}</Badge>
                      </div>
                      <div className="whitespace-pre-line text-gray-700">
                        {selectedMessage.content}
                      </div>

                      {selectedMessage.attachments.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <div className="text-sm font-medium text-gray-600">
                            Attachments:
                          </div>
                          {selectedMessage.attachments.map(
                            (attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                              >
                                <Paperclip className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{attachment}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="ml-auto"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reply Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Reply className="h-4 w-4" />
                    Follow-up Message to {selectedMessage.to}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your follow-up message..."
                    rows={4}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsViewDialogOpen(false)}
                    >
                      Close
                    </Button>
                    <Button onClick={handleReply}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Follow-up
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StudentMessages;
