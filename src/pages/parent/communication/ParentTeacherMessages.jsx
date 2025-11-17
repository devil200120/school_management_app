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
  Filter,
  Download,
  RefreshCw,
  Clock,
  Users,
  GraduationCap,
  Mail,
  MessageSquare,
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

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTeacher, setFilterTeacher] = useState("all");
  const [filterChild, setFilterChild] = useState("all");

  const [composeForm, setComposeForm] = useState({
    recipient: "",
    subject: "",
    message: "",
    priority: "normal",
    childName: "",
  });

  // Mock messages data with enhanced structure
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "Mrs. Adebayo",
      fromEmail: "m.adebayo@school.edu",
      role: "Mathematics Teacher",
      subject: "Sarah's Math Progress",
      preview:
        "I wanted to update you on Sarah's excellent performance in Mathematics this term...",
      content:
        "Dear Mr. Johnson,\n\nI wanted to update you on Sarah's excellent performance in Mathematics this term. She has shown remarkable improvement and consistently scores above 90% in all assessments. Her problem-solving skills have particularly impressed me.\n\nI would like to recommend her for the advanced math program next semester. Please let me know if you'd like to discuss this further.\n\nBest regards,\nMrs. Adebayo",
      date: "2024-11-10",
      time: "14:30",
      read: false,
      starred: true,
      priority: "high",
      childName: "Sarah Johnson",
      hasReplies: true,
      repliesCount: 2,
      lastReply: "2024-11-11",
      category: "academic",
      attachments: [],
    },
    {
      id: 2,
      from: "Principal Williams",
      fromEmail: "principal@school.edu",
      role: "School Principal",
      subject: "Parent-Teacher Conference Invitation",
      preview:
        "You are invited to attend the upcoming parent-teacher conference...",
      content:
        "Dear Parents,\n\nYou are cordially invited to attend the upcoming parent-teacher conference scheduled for November 25th, 2024, from 2:00 PM to 6:00 PM.\n\nThis will be an excellent opportunity to discuss your child's academic progress, social development, and any concerns you may have.\n\nPlease confirm your attendance by November 20th.\n\nWarm regards,\nPrincipal Williams",
      date: "2024-11-08",
      time: "09:15",
      read: true,
      starred: false,
      priority: "normal",
      childName: "All Children",
      hasReplies: false,
      repliesCount: 0,
      lastReply: null,
      category: "administrative",
      attachments: ["conference_schedule.pdf"],
    },
    {
      id: 3,
      from: "Mr. Olumide",
      fromEmail: "s.olumide@school.edu",
      role: "Class Teacher - Grade 8",
      subject: "Michael's Attendance Concern",
      preview:
        "I noticed Michael was absent yesterday without prior notification...",
      content:
        "Dear Mr. & Mrs. Johnson,\n\nI noticed Michael was absent yesterday (November 6th) without prior notification. This is his third unexcused absence this month.\n\nAs per school policy, I need to inform you that continued absences may affect his academic standing. Please ensure to send a note explaining any future absences.\n\nIf there are any underlying issues affecting his attendance, please don't hesitate to reach out so we can work together to support Michael.\n\nBest regards,\nMr. Olumide",
      date: "2024-11-07",
      time: "11:45",
      read: true,
      starred: false,
      priority: "high",
      childName: "Michael Johnson",
      hasReplies: true,
      repliesCount: 1,
      lastReply: "2024-11-07",
      category: "behavioral",
      attachments: [],
    },
    {
      id: 4,
      from: "Mrs. Fatima",
      fromEmail: "a.fatima@school.edu",
      role: "English Literature Teacher",
      subject: "Outstanding Essay Work - Sarah",
      preview: "Sarah submitted an exceptional essay on Nigerian literature...",
      content:
        "Dear Mr. Johnson,\n\nI wanted to commend Sarah for her outstanding essay on Nigerian literature. Her analysis of Chinua Achebe's 'Things Fall Apart' was particularly insightful and demonstrated a deep understanding of the cultural context.\n\nI've recommended her work to be featured in our school's literary magazine. With your permission, we'd like to publish her essay in the next edition.\n\nPlease let me know if you have any questions.\n\nBest regards,\nMrs. Fatima",
      date: "2024-11-05",
      time: "16:20",
      read: true,
      starred: true,
      priority: "normal",
      childName: "Sarah Johnson",
      hasReplies: false,
      repliesCount: 0,
      lastReply: null,
      category: "academic",
      attachments: ["sarah_essay.pdf"],
    },
    {
      id: 5,
      from: "School Nurse",
      fromEmail: "nurse@school.edu",
      role: "School Health Services",
      subject: "Health Check-up Reminder",
      preview: "Annual health check-up due for all students...",
      content:
        "Dear Parents,\n\nThis is a reminder that annual health check-ups are due for all students before the end of November 2024.\n\nPlease schedule an appointment with our school nurse or submit recent medical records from your family doctor.\n\nRequired checks include:\n- Vision and hearing screening\n- Vaccination status update\n- General health assessment\n\nPlease contact the health office to schedule an appointment.\n\nThank you for your cooperation.\n\nSchool Health Services",
      date: "2024-11-03",
      time: "10:00",
      read: false,
      starred: false,
      priority: "normal",
      childName: "All Children",
      hasReplies: false,
      repliesCount: 0,
      lastReply: null,
      category: "health",
      attachments: ["health_checklist.pdf"],
    },
  ]);

  // Mock children and teachers data
  const children = [
    { id: 1, name: "Sarah Johnson", class: "Grade 10A" },
    { id: 2, name: "Michael Johnson", class: "Grade 8B" },
  ];

  const teachers = [
    {
      id: 1,
      name: "Mrs. Adebayo",
      subject: "Mathematics",
      email: "m.adebayo@school.edu",
    },
    {
      id: 2,
      name: "Mr. Olumide",
      subject: "Class Teacher - Grade 8",
      email: "s.olumide@school.edu",
    },
    {
      id: 3,
      name: "Mrs. Fatima",
      subject: "English Literature",
      email: "a.fatima@school.edu",
    },
    {
      id: 4,
      name: "Principal Williams",
      subject: "Administration",
      email: "principal@school.edu",
    },
    {
      id: 5,
      name: "School Nurse",
      subject: "Health Services",
      email: "nurse@school.edu",
    },
  ];

  // Filter messages
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "unread" && !message.read) ||
      (filterStatus === "read" && message.read) ||
      (filterStatus === "starred" && message.starred);

    const matchesTeacher =
      filterTeacher === "all" || message.from === filterTeacher;
    const matchesChild =
      filterChild === "all" ||
      message.childName === filterChild ||
      message.childName === "All Children";

    return matchesSearch && matchesStatus && matchesTeacher && matchesChild;
  });

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "academic":
        return GraduationCap;
      case "behavioral":
        return Users;
      case "administrative":
        return MessageSquare;
      case "health":
        return User;
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
      childName: "",
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
      from: "You (Parent)",
      fromEmail: "parent@email.com",
      role: "Parent",
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
      childName: composeForm.childName,
      hasReplies: false,
      repliesCount: 0,
      lastReply: null,
      category: "parent_inquiry",
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
            Parent-Teacher Messages
          </h1>
          <p className="text-gray-600 mt-1">
            Communicate with teachers and school administration
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
                  Starred Messages
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {messages.filter((m) => m.starred).length}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
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
            Messages Inbox ({getUnreadCount()} unread)
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

              <Select value={filterTeacher} onValueChange={setFilterTeacher}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teachers</SelectItem>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.name}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterChild} onValueChange={setFilterChild}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.name}>
                      {child.name}
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
                  <TableHead className="bg-gray-100">From</TableHead>
                  <TableHead className="bg-gray-100">Child</TableHead>
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
                          <div className="font-medium">{message.from}</div>
                          <div className="text-sm text-gray-500">
                            {message.role}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {message.childName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline" className="capitalize">
                            {message.category}
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
            <DialogTitle>Compose New Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient *</Label>
                <Select
                  value={composeForm.recipient}
                  onValueChange={(value) =>
                    setComposeForm((prev) => ({ ...prev, recipient: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.name}>
                        <div className="flex flex-col">
                          <span>{teacher.name}</span>
                          <span className="text-sm text-gray-500">
                            {teacher.subject}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="childName">Regarding Child *</Label>
                <Select
                  value={composeForm.childName}
                  onValueChange={(value) =>
                    setComposeForm((prev) => ({ ...prev, childName: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select child" />
                  </SelectTrigger>
                  <SelectContent>
                    {children.map((child) => (
                      <SelectItem key={child.id} value={child.name}>
                        <div className="flex flex-col">
                          <span>{child.name}</span>
                          <span className="text-sm text-gray-500">
                            {child.class}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
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
                    <span>From: {selectedMessage.from}</span>
                    <span>•</span>
                    <span>To: You (Parent)</span>
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
                    <div className="w-10 h-10 bg-eduos-primary text-white rounded-full flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">
                          {selectedMessage.from}
                        </span>
                        <Badge variant="outline">{selectedMessage.role}</Badge>
                        {selectedMessage.childName !== "All Children" && (
                          <Badge>Re: {selectedMessage.childName}</Badge>
                        )}
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
                    Reply to {selectedMessage.from}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your reply..."
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
                      <Reply className="h-4 w-4 mr-2" />
                      Send Reply
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

export default Messages;
