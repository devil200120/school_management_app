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
  Megaphone,
  Send,
  Search,
  Calendar,
  Users,
  BookOpen,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  AlertTriangle,
  CheckCircle,
  Bell,
  Download,
  RefreshCw,
  FileText,
  GraduationCap,
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

const TeacherAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterAudience, setFilterAudience] = useState("all");

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    priority: "normal",
    audience: "class",
    targetClasses: [],
    expiryDate: "",
    category: "general",
  });

  // Mock announcements data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Mathematics Quiz Postponed",
      content:
        "The mathematics quiz scheduled for tomorrow has been postponed to Friday, November 15th due to the school assembly. Please use this extra time to review Chapter 7 on quadratic functions.",
      priority: "high",
      audience: "class",
      targetClasses: ["Grade 10A", "Grade 10B"],
      category: "academic",
      status: "active",
      date: "2024-11-11",
      time: "14:30",
      expiryDate: "2024-11-15",
      author: "Mrs. Adebayo",
      views: 45,
      readBy: ["Sarah Johnson", "Michael Smith", "Emma Brown"],
    },
    {
      id: 2,
      title: "Science Museum Field Trip - Important Information",
      content:
        "Reminder about our upcoming field trip to the Science Museum on November 20th. Please ensure you have submitted your permission forms and bring a packed lunch. We will depart at 8:00 AM sharp.",
      priority: "normal",
      audience: "class",
      targetClasses: ["Grade 10A"],
      category: "field_trip",
      status: "active",
      date: "2024-11-10",
      time: "16:00",
      expiryDate: "2024-11-20",
      author: "Mrs. Adebayo",
      views: 32,
      readBy: ["Sarah Johnson", "Emma Brown", "Sofia Garcia"],
    },
    {
      id: 3,
      title: "Extra Math Help Sessions Available",
      content:
        "I will be offering extra help sessions every Tuesday and Thursday after school from 3:30 PM to 4:30 PM in Room 101. These sessions are free and open to all students who need additional support with mathematics.",
      priority: "normal",
      audience: "department",
      targetClasses: ["Grade 9A", "Grade 9B", "Grade 10A", "Grade 10B"],
      category: "academic_support",
      status: "active",
      date: "2024-11-08",
      time: "09:15",
      expiryDate: "2024-12-20",
      author: "Mrs. Adebayo",
      views: 78,
      readBy: ["Michael Smith", "David Wilson", "James Lee"],
    },
    {
      id: 4,
      title: "Homework Policy Reminder",
      content:
        "Please remember that all homework assignments must be submitted on time. Late submissions will result in point deductions. If you have extenuating circumstances, please speak with me before the due date.",
      priority: "normal",
      audience: "class",
      targetClasses: ["Grade 9B", "Grade 10A"],
      category: "policies",
      status: "active",
      date: "2024-11-07",
      time: "11:45",
      expiryDate: "2024-11-30",
      author: "Mrs. Adebayo",
      views: 56,
      readBy: ["David Wilson", "Sarah Johnson", "Emma Brown"],
    },
    {
      id: 5,
      title: "Congratulations to Quiz Winners",
      content:
        "Congratulations to the winners of last week's mathematics quiz: 1st place - Sarah Johnson, 2nd place - Emma Brown, 3rd place - Sofia Garcia. Excellent work everyone!",
      priority: "low",
      audience: "class",
      targetClasses: ["Grade 10A"],
      category: "recognition",
      status: "expired",
      date: "2024-11-05",
      time: "13:20",
      expiryDate: "2024-11-10",
      author: "Mrs. Adebayo",
      views: 89,
      readBy: ["Sarah Johnson", "Emma Brown", "Sofia Garcia", "Olivia Taylor"],
    },
  ]);

  // Mock classes data
  const classes = ["Grade 9A", "Grade 9B", "Grade 10A", "Grade 10B"];
  const categories = [
    "general",
    "academic",
    "field_trip",
    "academic_support",
    "policies",
    "recognition",
  ];

  // Filter announcements
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || announcement.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || announcement.priority === filterPriority;
    const matchesAudience =
      filterAudience === "all" || announcement.audience === filterAudience;

    return matchesSearch && matchesStatus && matchesPriority && matchesAudience;
  });

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      case "draft":
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
        return BookOpen;
      case "field_trip":
        return Building;
      case "academic_support":
        return Users;
      case "policies":
        return FileText;
      case "recognition":
        return CheckCircle;
      default:
        return Megaphone;
    }
  };

  // Handlers
  const handleAddAnnouncement = () => {
    setAnnouncementForm({
      title: "",
      content: "",
      priority: "normal",
      audience: "class",
      targetClasses: [],
      expiryDate: "",
      category: "general",
    });
    setIsAddDialogOpen(true);
  };

  const handleSaveAnnouncement = () => {
    if (!announcementForm.title || !announcementForm.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAnnouncement = {
      id: announcements.length + 1,
      title: announcementForm.title,
      content: announcementForm.content,
      priority: announcementForm.priority,
      audience: announcementForm.audience,
      targetClasses: announcementForm.targetClasses,
      category: announcementForm.category,
      status: "active",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      expiryDate: announcementForm.expiryDate,
      author: "Mrs. Adebayo",
      views: 0,
      readBy: [],
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setIsAddDialogOpen(false);
    toast.success("Announcement published successfully!");
  };

  const handleEditAnnouncement = (announcement) => {
    setAnnouncementForm({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
      audience: announcement.audience,
      targetClasses: announcement.targetClasses,
      expiryDate: announcement.expiryDate,
      category: announcement.category,
    });
    setSelectedAnnouncement(announcement);
    setIsEditDialogOpen(true);
  };

  const handleUpdateAnnouncement = () => {
    setAnnouncements(
      announcements.map((announcement) =>
        announcement.id === selectedAnnouncement.id
          ? { ...announcement, ...announcementForm }
          : announcement
      )
    );
    setIsEditDialogOpen(false);
    toast.success("Announcement updated successfully!");
  };

  const handleDeleteAnnouncement = (announcementId) => {
    setAnnouncements(
      announcements.filter((announcement) => announcement.id !== announcementId)
    );
    toast.success("Announcement deleted successfully!");
  };

  const handleViewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsViewDialogOpen(true);
  };

  const handleExpireAnnouncement = (announcementId) => {
    setAnnouncements(
      announcements.map((announcement) =>
        announcement.id === announcementId
          ? { ...announcement, status: "expired" }
          : announcement
      )
    );
    toast.success("Announcement expired successfully!");
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-eduos-primary animate-fade-in">
            Teacher Announcements
          </h1>
          <p className="text-gray-600 mt-1">
            Publish and manage announcements for your students and classes
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleAddAnnouncement}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Announcements
                </p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {announcements.length}
                </p>
              </div>
              <Megaphone className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {announcements.filter((a) => a.status === "active").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
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
                <p className="text-3xl font-bold text-red-600">
                  {announcements.filter((a) => a.priority === "high").length}
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
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-orange-600">
                  {announcements.reduce((sum, a) => sum + a.views, 0)}
                </p>
              </div>
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements Management */}
      <Card className="animate-fade-in delay-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            My Announcements (
            {announcements.filter((a) => a.status === "active").length} active)
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
                  placeholder="Search announcements..."
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
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterAudience} onValueChange={setFilterAudience}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Audience</SelectItem>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                  <SelectItem value="school">School</SelectItem>
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

          {/* Announcements Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Announcement</TableHead>
                  <TableHead className="bg-gray-100">Audience</TableHead>
                  <TableHead className="bg-gray-100">Category</TableHead>
                  <TableHead className="bg-gray-100">Priority</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Views</TableHead>
                  <TableHead className="bg-gray-100">Date</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnnouncements.map((announcement) => {
                  const CategoryIcon = getCategoryIcon(announcement.category);

                  return (
                    <TableRow
                      key={announcement.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewAnnouncement(announcement)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="h-4 w-4 text-gray-400" />
                          <div className="flex-1">
                            <div className="font-medium">
                              {announcement.title}
                            </div>
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {announcement.content.substring(0, 100)}...
                            </div>
                            {announcement.expiryDate && (
                              <div className="flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  Expires: {announcement.expiryDate}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant="outline" className="capitalize mb-1">
                            {announcement.audience}
                          </Badge>
                          <div className="text-xs text-gray-500">
                            {announcement.targetClasses.join(", ")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {announcement.category.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getPriorityBadgeColor(
                            announcement.priority
                          )}
                        >
                          {announcement.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusBadgeColor(announcement.status)}
                        >
                          {announcement.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">
                            {announcement.views}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{announcement.date}</div>
                          <div className="text-sm text-gray-500">
                            {announcement.time}
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
                              handleEditAnnouncement(announcement);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {announcement.status === "active" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExpireAnnouncement(announcement.id);
                              }}
                              className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700"
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAnnouncement(announcement.id);
                            }}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
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
              <span className="font-medium">
                {filteredAnnouncements.length}
              </span>{" "}
              of <span className="font-medium">{announcements.length}</span>{" "}
              announcements
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Announcement Dialog */}
      <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={() => {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen
                ? "Edit Announcement"
                : "Create New Announcement"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={announcementForm.title}
                onChange={(e) =>
                  setAnnouncementForm((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Enter announcement title"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={announcementForm.priority}
                  onValueChange={(value) =>
                    setAnnouncementForm((prev) => ({
                      ...prev,
                      priority: value,
                    }))
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

              <div className="space-y-2">
                <Label htmlFor="audience">Audience</Label>
                <Select
                  value={announcementForm.audience}
                  onValueChange={(value) =>
                    setAnnouncementForm((prev) => ({
                      ...prev,
                      audience: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Specific Classes</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                    <SelectItem value="school">Entire School</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={announcementForm.category}
                  onValueChange={(value) =>
                    setAnnouncementForm((prev) => ({
                      ...prev,
                      category: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {announcementForm.audience === "class" && (
              <div className="space-y-2">
                <Label>Target Classes</Label>
                <div className="grid grid-cols-2 gap-2">
                  {classes.map((className) => (
                    <label
                      key={className}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={announcementForm.targetClasses.includes(
                          className
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAnnouncementForm((prev) => ({
                              ...prev,
                              targetClasses: [...prev.targetClasses, className],
                            }));
                          } else {
                            setAnnouncementForm((prev) => ({
                              ...prev,
                              targetClasses: prev.targetClasses.filter(
                                (c) => c !== className
                              ),
                            }));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{className}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={announcementForm.expiryDate}
                onChange={(e) =>
                  setAnnouncementForm((prev) => ({
                    ...prev,
                    expiryDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={announcementForm.content}
                onChange={(e) =>
                  setAnnouncementForm((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                placeholder="Enter announcement content..."
                rows={6}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setIsEditDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={
                isEditDialogOpen
                  ? handleUpdateAnnouncement
                  : handleSaveAnnouncement
              }
            >
              <Bell className="h-4 w-4 mr-2" />
              {isEditDialogOpen
                ? "Update Announcement"
                : "Publish Announcement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Announcement Dialog */}
      {selectedAnnouncement && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                {selectedAnnouncement.title}
              </DialogTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>By: {selectedAnnouncement.author}</span>
                <span>•</span>
                <span>
                  {selectedAnnouncement.date} at {selectedAnnouncement.time}
                </span>
                <span>•</span>
                <Badge
                  className={getPriorityBadgeColor(
                    selectedAnnouncement.priority
                  )}
                >
                  {selectedAnnouncement.priority} priority
                </Badge>
                <Badge
                  className={getStatusBadgeColor(selectedAnnouncement.status)}
                >
                  {selectedAnnouncement.status}
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              {/* Announcement Details */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Audience
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Type:</strong> {selectedAnnouncement.audience}
                      </div>
                      <div>
                        <strong>Classes:</strong>{" "}
                        {selectedAnnouncement.targetClasses.join(", ")}
                      </div>
                      <div>
                        <strong>Category:</strong>{" "}
                        {selectedAnnouncement.category.replace("_", " ")}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Engagement
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Views:</strong> {selectedAnnouncement.views}
                      </div>
                      <div>
                        <strong>Read by:</strong>{" "}
                        {selectedAnnouncement.readBy.length} students
                      </div>
                      {selectedAnnouncement.expiryDate && (
                        <div>
                          <strong>Expires:</strong>{" "}
                          {selectedAnnouncement.expiryDate}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Content
                  </h4>
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {selectedAnnouncement.content}
                  </div>
                </CardContent>
              </Card>

              {/* Read By List */}
              {selectedAnnouncement.readBy.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Read By Students
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnnouncement.readBy.map((student, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {student}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false);
                  handleEditAnnouncement(selectedAnnouncement);
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Announcement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TeacherAnnouncements;
