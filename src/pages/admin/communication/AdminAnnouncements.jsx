import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  Bell,
  AlertCircle,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  Users,
  School,
  Star,
  MessageSquare,
  BellRing,
  Archive,
  Settings,
  Download,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

const AdminAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterAudience, setFilterAudience] = useState("all");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    category: "",
    priority: "medium",
    audience: "all",
    startDate: "",
    endDate: "",
    attachment: null,
  });

  // Mock announcements data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "School Reopening - January 8th, 2025",
      content:
        "Dear Students, Parents, and Staff, We are excited to announce that school will reopen on January 8th, 2025. Please ensure all preparations are complete.",
      category: "General",
      priority: "high",
      audience: "all",
      author: "Principal Johnson",
      created: "2024-12-20",
      status: "published",
      views: 245,
      likes: 18,
      replies: 5,
      startDate: "2024-12-20",
      endDate: "2025-01-08",
    },
    {
      id: 2,
      title: "Parent-Teacher Conference Schedule",
      content:
        "The parent-teacher conferences are scheduled for January 15-17. Please book your slots through the parent portal.",
      category: "Academic",
      priority: "medium",
      audience: "parents",
      author: "Academic Director",
      created: "2024-12-18",
      status: "published",
      views: 189,
      likes: 12,
      replies: 3,
      startDate: "2024-12-18",
      endDate: "2025-01-17",
    },
    {
      id: 3,
      title: "New Library Hours",
      content:
        "Starting January 2025, the library will be open from 7:00 AM to 6:00 PM on weekdays and 9:00 AM to 4:00 PM on weekends.",
      category: "Facilities",
      priority: "low",
      audience: "students",
      author: "Library Director",
      created: "2024-12-15",
      status: "draft",
      views: 56,
      likes: 8,
      replies: 1,
      startDate: "2024-12-15",
      endDate: "2025-02-15",
    },
  ]);

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

  const handleCreateAnnouncement = () => {
    if (!announcementForm.title || !announcementForm.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAnnouncement = {
      id: announcements.length + 1,
      ...announcementForm,
      author: "Admin",
      created: new Date().toISOString().split("T")[0],
      status: "published",
      views: 0,
      likes: 0,
      replies: 0,
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setAnnouncementForm({
      title: "",
      content: "",
      category: "",
      priority: "medium",
      audience: "all",
      startDate: "",
      endDate: "",
      attachment: null,
    });
    setShowCreateDialog(false);
    toast.success("Announcement created successfully!");
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
    toast.success("Announcement deleted successfully!");
  };

  const handleViewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowViewDialog(true);
  };

  const handleEditAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setAnnouncementForm({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      priority: announcement.priority,
      audience: announcement.audience,
      startDate: announcement.startDate,
      endDate: announcement.endDate,
      attachment: null,
    });
    setShowEditDialog(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAudienceIcon = (audience) => {
    switch (audience) {
      case "students":
        return <School className="h-4 w-4" />;
      case "parents":
        return <Users className="h-4 w-4" />;
      case "teachers":
        return <User className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const totalAnnouncements = announcements.length;
  const publishedCount = announcements.filter(
    (a) => a.status === "published"
  ).length;
  const draftCount = announcements.filter((a) => a.status === "draft").length;
  const totalViews = announcements.reduce((sum, a) => sum + a.views, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Announcements
          </h1>
          <p className="text-lg text-gray-600">
            Create, manage and track school announcements
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Announcements</p>
                  <p className="text-2xl font-bold">{totalAnnouncements}</p>
                </div>
                <BellRing className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Published</p>
                  <p className="text-2xl font-bold">{publishedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Draft</p>
                  <p className="text-2xl font-bold">{draftCount}</p>
                </div>
                <Archive className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Views</p>
                  <p className="text-2xl font-bold">{totalViews}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={filterPriority}
                    onValueChange={setFilterPriority}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={filterAudience}
                    onValueChange={setFilterAudience}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Audience</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="parents">Parents</SelectItem>
                      <SelectItem value="teachers">Teachers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Dialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
              >
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Announcement
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Announcement</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="Enter announcement title"
                          value={announcementForm.title}
                          onChange={(e) =>
                            setAnnouncementForm({
                              ...announcementForm,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={announcementForm.category}
                          onValueChange={(value) =>
                            setAnnouncementForm({
                              ...announcementForm,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="events">Events</SelectItem>
                            <SelectItem value="facilities">
                              Facilities
                            </SelectItem>
                            <SelectItem value="health">
                              Health & Safety
                            </SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={announcementForm.priority}
                          onValueChange={(value) =>
                            setAnnouncementForm({
                              ...announcementForm,
                              priority: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="audience">Audience</Label>
                        <Select
                          value={announcementForm.audience}
                          onValueChange={(value) =>
                            setAnnouncementForm({
                              ...announcementForm,
                              audience: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="students">Students</SelectItem>
                            <SelectItem value="parents">Parents</SelectItem>
                            <SelectItem value="teachers">Teachers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={announcementForm.startDate}
                          onChange={(e) =>
                            setAnnouncementForm({
                              ...announcementForm,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        placeholder="Enter announcement content"
                        rows={6}
                        value={announcementForm.content}
                        onChange={(e) =>
                          setAnnouncementForm({
                            ...announcementForm,
                            content: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleCreateAnnouncement}
                        className="flex-1"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Create & Publish
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowCreateDialog(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className="hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                          {announcement.title}
                        </h3>
                        <div className="flex gap-2">
                          <Badge
                            className={`text-xs ${getPriorityColor(
                              announcement.priority
                            )}`}
                          >
                            {announcement.priority}
                          </Badge>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              announcement.status
                            )}`}
                          >
                            {announcement.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {announcement.content}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {announcement.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {announcement.created}
                      </div>
                      <div className="flex items-center gap-1">
                        {getAudienceIcon(announcement.audience)}
                        {announcement.audience}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {announcement.views} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {announcement.likes} likes
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {announcement.replies} replies
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewAnnouncement(announcement)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAnnouncement(announcement)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No announcements found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Announcement
              </Button>
            </CardContent>
          </Card>
        )}

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {selectedAnnouncement?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedAnnouncement && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className={`text-xs ${getPriorityColor(
                      selectedAnnouncement.priority
                    )}`}
                  >
                    {selectedAnnouncement.priority} priority
                  </Badge>
                  <Badge
                    className={`text-xs ${getStatusColor(
                      selectedAnnouncement.status
                    )}`}
                  >
                    {selectedAnnouncement.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {selectedAnnouncement.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Audience: {selectedAnnouncement.audience}
                  </Badge>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedAnnouncement.content}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <strong>Author:</strong> {selectedAnnouncement.author}
                  </div>
                  <div>
                    <strong>Created:</strong> {selectedAnnouncement.created}
                  </div>
                  <div>
                    <strong>Views:</strong> {selectedAnnouncement.views}
                  </div>
                  <div>
                    <strong>Engagement:</strong> {selectedAnnouncement.likes}{" "}
                    likes, {selectedAnnouncement.replies} replies
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleEditAnnouncement(selectedAnnouncement)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Announcement
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
