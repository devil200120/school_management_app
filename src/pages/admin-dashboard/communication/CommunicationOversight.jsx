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
  Building,
  Shield,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  FileText,
  Settings,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

const CommunicationOversight = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock conversations data from admin perspective
  const [conversations, setConversations] = useState([
    {
      id: 1,
      participants: ["Mrs. Adebayo (Teacher)", "Mr. Johnson (Parent)"],
      subject: "Sarah's Advanced Math Program Discussion",
      studentName: "Sarah Johnson",
      studentClass: "Grade 10A",
      department: "Mathematics",
      lastMessage:
        "Thank you for considering Sarah for the advanced program...",
      messageCount: 3,
      unreadCount: 0,
      status: "active",
      priority: "normal",
      flagged: false,
      lastActivity: "2024-11-11",
      category: "academic",
      teacherName: "Mrs. Adebayo",
      parentEmail: "m.johnson@email.com",
    },
    {
      id: 2,
      participants: ["Mrs. Adebayo (Teacher)", "Mrs. Smith (Parent)"],
      subject: "Michael's Math Tutoring Request",
      studentName: "Michael Smith",
      studentClass: "Grade 9B",
      department: "Mathematics",
      lastMessage:
        "I appreciate your quick response about the tutoring options...",
      messageCount: 4,
      unreadCount: 1,
      status: "active",
      priority: "high",
      flagged: true,
      lastActivity: "2024-11-10",
      category: "academic_support",
      teacherName: "Mrs. Adebayo",
      parentEmail: "j.smith@email.com",
    },
    {
      id: 3,
      participants: ["Mr. Williams (Teacher)", "Dr. Brown (Parent)"],
      subject: "Emma's Attendance and Medical Documentation",
      studentName: "Emma Brown",
      studentClass: "Grade 10A",
      department: "Biology",
      lastMessage: "Thank you for providing the medical certificate...",
      messageCount: 2,
      unreadCount: 0,
      status: "resolved",
      priority: "normal",
      flagged: false,
      lastActivity: "2024-11-09",
      category: "attendance",
      teacherName: "Mr. Williams",
      parentEmail: "dr.brown@email.com",
    },
    {
      id: 4,
      participants: ["Mrs. Adebayo (Teacher)", "Mr. Wilson (Parent)"],
      subject: "David's Behavioral Concerns and Action Plan",
      studentName: "David Wilson",
      studentClass: "Grade 9B",
      department: "Mathematics",
      lastMessage: "We have implemented consequences at home as discussed...",
      messageCount: 5,
      unreadCount: 2,
      status: "escalated",
      priority: "high",
      flagged: true,
      lastActivity: "2024-11-08",
      category: "behavioral",
      teacherName: "Mrs. Adebayo",
      parentEmail: "a.wilson@email.com",
    },
  ]);

  // Mock analytics data
  const analyticsData = {
    totalConversations: conversations.length,
    activeConversations: conversations.filter((c) => c.status === "active")
      .length,
    escalatedConversations: conversations.filter(
      (c) => c.status === "escalated"
    ).length,
    avgResponseTime: "4.2 hours",
    satisfactionRate: "94%",
    topCategories: [
      { name: "Academic", count: 8, percentage: 40 },
      { name: "Behavioral", count: 6, percentage: 30 },
      { name: "Attendance", count: 4, percentage: 20 },
      { name: "Other", count: 2, percentage: 10 },
    ],
    departmentStats: [
      { name: "Mathematics", conversations: 6, avgResponse: "3.8h" },
      { name: "English", conversations: 4, avgResponse: "4.2h" },
      { name: "Science", conversations: 5, avgResponse: "4.5h" },
      { name: "History", conversations: 3, avgResponse: "3.2h" },
    ],
  };

  // Filter conversations
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      conversation.teacherName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      conversation.participants.some((p) =>
        p.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filterStatus === "all" || conversation.status === filterStatus;
    const matchesDepartment =
      filterDepartment === "all" ||
      conversation.department === filterDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "escalated":
        return "bg-red-100 text-red-800";
      case "resolved":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "academic":
        return GraduationCap;
      case "academic_support":
        return Users;
      case "behavioral":
        return MessageSquare;
      case "attendance":
        return Calendar;
      case "permission":
        return User;
      default:
        return MessageCircle;
    }
  };

  // Handlers
  const handleViewConversation = (conversation) => {
    setSelectedConversation(conversation);
    setIsViewDialogOpen(true);
  };

  const handleFlagConversation = (conversationId) => {
    setConversations(
      conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, flagged: !conv.flagged } : conv
      )
    );
    toast.success("Conversation flag status updated");
  };

  const handleEscalateConversation = (conversationId) => {
    setConversations(
      conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, status: "escalated", priority: "high" }
          : conv
      )
    );
    toast.success("Conversation escalated successfully");
  };

  const handleResolveConversation = (conversationId) => {
    setConversations(
      conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, status: "resolved" } : conv
      )
    );
    toast.success("Conversation marked as resolved");
  };

  const generateReport = () => {
    toast.success("Communication report generated successfully!");
  };

  const departments = [
    "Mathematics",
    "English",
    "Science",
    "History",
    "Physical Education",
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-eduos-primary animate-fade-in">
            Communication Oversight
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage all parent-teacher communications
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={generateReport}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview & Analytics</TabsTrigger>
          <TabsTrigger value="conversations">Active Conversations</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Escalations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Conversations
                    </p>
                    <p className="text-3xl font-bold text-eduos-primary">
                      {analyticsData.totalConversations}
                    </p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active</p>
                    <p className="text-3xl font-bold text-green-600">
                      {analyticsData.activeConversations}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Escalated
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {analyticsData.escalatedConversations}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Avg Response
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {analyticsData.avgResponseTime}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Category Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-eduos-primary rounded-full"></div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-eduos-primary h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {category.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Department Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Department Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.departmentStats.map((dept, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{dept.name}</div>
                        <div className="text-sm text-gray-600">
                          {dept.conversations} conversations
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">
                          Avg: {dept.avgResponse}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversations Tab */}
        <TabsContent value="conversations" className="space-y-6">
          <Card className="animate-fade-in delay-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                All Conversations (
                {conversations.filter((c) => c.unreadCount > 0).length} need
                attention)
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
                      placeholder="Search conversations..."
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
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="escalated">Escalated</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filterDepartment}
                    onValueChange={setFilterDepartment}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter department" />
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

              {/* Conversations Table */}
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-gray-100">
                        Conversation
                      </TableHead>
                      <TableHead className="bg-gray-100">
                        Participants
                      </TableHead>
                      <TableHead className="bg-gray-100">Student</TableHead>
                      <TableHead className="bg-gray-100">Department</TableHead>
                      <TableHead className="bg-gray-100">Status</TableHead>
                      <TableHead className="bg-gray-100">Activity</TableHead>
                      <TableHead className="bg-gray-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredConversations.map((conversation) => {
                      const CategoryIcon = getCategoryIcon(
                        conversation.category
                      );

                      return (
                        <TableRow
                          key={conversation.id}
                          className={`hover:bg-gray-50 cursor-pointer ${
                            conversation.unreadCount > 0
                              ? "bg-blue-50 border-l-4 border-l-blue-500"
                              : ""
                          } ${
                            conversation.flagged
                              ? "bg-yellow-50 border-l-4 border-l-yellow-500"
                              : ""
                          }`}
                          onClick={() => handleViewConversation(conversation)}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  conversation.unreadCount > 0
                                    ? "bg-blue-500"
                                    : "bg-transparent"
                                }`}
                              ></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`${
                                      conversation.unreadCount > 0
                                        ? "font-bold"
                                        : ""
                                    }`}
                                  >
                                    {conversation.subject}
                                  </span>
                                  {conversation.flagged && (
                                    <AlertTriangle className="h-4 w-4 text-yellow-500 fill-current" />
                                  )}
                                  <Badge
                                    className={getPriorityBadgeColor(
                                      conversation.priority
                                    )}
                                  >
                                    {conversation.priority}
                                  </Badge>
                                  {conversation.unreadCount > 0 && (
                                    <Badge variant="destructive">
                                      {conversation.unreadCount} new
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                                  {conversation.lastMessage}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {conversation.participants.map(
                                (participant, index) => (
                                  <div key={index} className="text-sm">
                                    {participant}
                                  </div>
                                )
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-gray-400" />
                              <div>
                                <div className="font-medium text-sm">
                                  {conversation.studentName}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {conversation.studentClass}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">
                                {conversation.department}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusBadgeColor(
                                conversation.status
                              )}
                            >
                              {conversation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm">
                                {conversation.lastActivity}
                              </div>
                              <div className="text-xs text-gray-500">
                                {conversation.messageCount} messages
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFlagConversation(conversation.id);
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <AlertTriangle
                                  className={`h-4 w-4 ${
                                    conversation.flagged
                                      ? "text-yellow-500 fill-current"
                                      : "text-gray-400"
                                  }`}
                                />
                              </Button>
                              {conversation.status !== "escalated" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEscalateConversation(conversation.id);
                                  }}
                                  className="h-8 w-8 p-0"
                                >
                                  <Shield className="h-4 w-4 text-red-400" />
                                </Button>
                              )}
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
                  <span className="font-medium">
                    {filteredConversations.length}
                  </span>{" "}
                  of <span className="font-medium">{conversations.length}</span>{" "}
                  conversations
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Escalated Conversations */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Escalated Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversations
                    .filter((c) => c.status === "escalated")
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className="p-4 bg-red-50 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium">
                              {conversation.subject}
                            </div>
                            <div className="text-sm text-gray-600">
                              {conversation.studentName} •{" "}
                              {conversation.department}
                            </div>
                            <div className="text-sm text-gray-600">
                              Last activity: {conversation.lastActivity}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleResolveConversation(conversation.id)
                            }
                          >
                            Resolve
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Flagged Conversations */}
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <Star className="h-5 w-5" />
                  Flagged for Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversations
                    .filter((c) => c.flagged)
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className="p-4 bg-yellow-50 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium">
                              {conversation.subject}
                            </div>
                            <div className="text-sm text-gray-600">
                              {conversation.studentName} •{" "}
                              {conversation.department}
                            </div>
                            <div className="text-sm text-gray-600">
                              Last activity: {conversation.lastActivity}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleFlagConversation(conversation.id)
                            }
                          >
                            Unflag
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Response Time Alerts */}
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Clock className="h-5 w-5" />
                Response Time Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">
                    3 conversations need urgent attention
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Messages waiting more than 24 hours for teacher response
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Conversation Dialog */}
      {selectedConversation && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-xl">
                    {selectedConversation.subject}
                  </DialogTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Student: {selectedConversation.studentName}</span>
                    <span>•</span>
                    <span>Class: {selectedConversation.studentClass}</span>
                    <span>•</span>
                    <span>Department: {selectedConversation.department}</span>
                    <span>•</span>
                    <Badge
                      className={getStatusBadgeColor(
                        selectedConversation.status
                      )}
                    >
                      {selectedConversation.status}
                    </Badge>
                    <Badge
                      className={getPriorityBadgeColor(
                        selectedConversation.priority
                      )}
                    >
                      {selectedConversation.priority} priority
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleFlagConversation(selectedConversation.id)
                    }
                  >
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        selectedConversation.flagged
                          ? "text-yellow-500 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleEscalateConversation(selectedConversation.id)
                    }
                  >
                    <Shield className="h-4 w-4" />
                    Escalate
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              {/* Conversation Overview */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Participants</h4>
                      <div className="space-y-2">
                        {selectedConversation.participants.map(
                          (participant, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{participant}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Conversation Stats</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          Total Messages: {selectedConversation.messageCount}
                        </div>
                        <div>Unread: {selectedConversation.unreadCount}</div>
                        <div>
                          Last Activity: {selectedConversation.lastActivity}
                        </div>
                        <div>Category: {selectedConversation.category}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-2">Last Message Preview</div>
                    <div className="text-sm text-gray-700">
                      {selectedConversation.lastMessage}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Administrative Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() =>
                        handleEscalateConversation(selectedConversation.id)
                      }
                      className="w-full"
                      disabled={selectedConversation.status === "escalated"}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {selectedConversation.status === "escalated"
                        ? "Already Escalated"
                        : "Escalate Conversation"}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() =>
                        handleResolveConversation(selectedConversation.id)
                      }
                      className="w-full"
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Mark as Resolved
                    </Button>

                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Notification
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

export default CommunicationOversight;
