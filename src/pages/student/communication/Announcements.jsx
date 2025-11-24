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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  Search,
  Calendar,
  User,
  Clock,
  Bell,
  AlertCircle,
  Eye,
  School,
  Star,
  MessageSquare,
  BellRing,
  Filter,
} from "lucide-react";

const StudentAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);

  // Mock announcements data - filtered for students
  const [announcements] = useState([
    {
      id: 1,
      title: "School Reopening - January 8th, 2025",
      content:
        "Dear Students, We are excited to announce that school will reopen on January 8th, 2025. Please ensure all preparations are complete for the new term. Remember to bring all required textbooks and stationery.",
      category: "General",
      priority: "high",
      audience: "all", // Visible to all including students
      author: "Principal Johnson",
      created: "2024-12-20",
      isRead: false,
      isImportant: true,
      startDate: "2024-12-20",
      endDate: "2025-01-08",
    },
    {
      id: 2,
      title: "New Library Hours",
      content:
        "Starting January 2025, the library will be open from 7:00 AM to 6:00 PM on weekdays and 9:00 AM to 4:00 PM on weekends. Extended study hours available during exam periods.",
      category: "Facilities",
      priority: "medium",
      audience: "students", // Specifically for students
      author: "Library Director",
      created: "2024-12-15",
      isRead: true,
      isImportant: false,
      startDate: "2024-12-15",
      endDate: "2025-02-15",
    },
    {
      id: 3,
      title: "Mid-term Examination Schedule Released",
      content:
        "The mid-term examination schedule for December 2024 has been released. Please check your individual timetables and prepare accordingly. Examination halls will be assigned 48 hours before each exam.",
      category: "Academic",
      priority: "high",
      audience: "students", // Specifically for students
      author: "Academic Director",
      created: "2024-12-10",
      isRead: false,
      isImportant: true,
      startDate: "2024-12-10",
      endDate: "2024-12-30",
    },
    {
      id: 4,
      title: "Sports Day Registration Open",
      content:
        "Registration for the Annual Sports Day is now open! Sign up for your favorite events through the student portal. Last date for registration is January 15th, 2025.",
      category: "Events",
      priority: "medium",
      audience: "students", // Specifically for students
      author: "Sports Coordinator",
      created: "2024-12-08",
      isRead: true,
      isImportant: false,
      startDate: "2024-12-08",
      endDate: "2025-01-15",
    },
    {
      id: 5,
      title: "Science Fair Project Submission",
      content:
        "All Grade 10 students must submit their science fair projects by December 30th, 2024. Projects will be evaluated based on creativity, scientific method, and presentation quality.",
      category: "Academic",
      priority: "high",
      audience: "students", // Specifically for students
      author: "Science Department",
      created: "2024-12-05",
      isRead: false,
      isImportant: true,
      startDate: "2024-12-05",
      endDate: "2024-12-30",
    },
    {
      id: 6,
      title: "New Cafeteria Menu",
      content:
        "We're excited to introduce our new cafeteria menu featuring healthier options and dietary-specific meals. Vegetarian, vegan, and gluten-free options now available daily.",
      category: "Facilities",
      priority: "low",
      audience: "all", // Visible to all including students
      author: "Cafeteria Manager",
      created: "2024-12-01",
      isRead: true,
      isImportant: false,
      startDate: "2024-12-01",
      endDate: "2025-01-31",
    },
  ]);

  // Filter announcements based on search and filters
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || announcement.category === categoryFilter;

    const matchesPriority =
      priorityFilter === "all" || announcement.priority === priorityFilter;

    // Only show announcements targeted at students or all users
    const isForStudents =
      announcement.audience === "students" || announcement.audience === "all";

    return matchesSearch && matchesCategory && matchesPriority && isForStudents;
  });

  // Get priority badge color
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get category badge color
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "Academic":
        return "bg-blue-100 text-blue-800";
      case "Events":
        return "bg-purple-100 text-purple-800";
      case "Facilities":
        return "bg-green-100 text-green-800";
      case "General":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle announcement click
  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowViewDialog(true);

    // Mark as read (in real app, would update in backend)
    if (!announcement.isRead) {
      announcement.isRead = true;
    }
  };

  const unreadCount = announcements.filter((a) => !a.isRead).length;

  return (
    <div className="space-y-6 p-6 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-eduos-primary animate-fade-in">
            Announcements
          </h1>
          <p className="text-gray-600 mt-1">
            Stay updated with the latest news and announcements from school
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Bell className="h-3 w-3" />
            {unreadCount} Unread
          </Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {announcements.length}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-3xl font-bold text-orange-600">
                  {unreadCount}
                </p>
              </div>
              <BellRing className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Important</p>
                <p className="text-3xl font-bold text-red-600">
                  {announcements.filter((a) => a.isImportant).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
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
                    announcements.filter((a) => {
                      const announcementDate = new Date(a.created);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return announcementDate >= weekAgo;
                    }).length
                  }
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search announcements..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Facilities">Facilities</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              !announcement.isRead
                ? "border-l-4 border-l-eduos-primary bg-blue-25"
                : ""
            }`}
            onClick={() => handleAnnouncementClick(announcement)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3
                      className={`text-lg font-semibold ${
                        !announcement.isRead ? "text-eduos-primary" : ""
                      }`}
                    >
                      {announcement.title}
                    </h3>
                    {announcement.isImportant && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                    {!announcement.isRead && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-blue-100 text-blue-700"
                      >
                        New
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <User className="h-4 w-4" />
                    <span>{announcement.author}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>
                      {new Date(announcement.created).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-700 line-clamp-2 mb-3">
                    {announcement.content}
                  </p>

                  <div className="flex items-center gap-2">
                    <Badge
                      className={getCategoryBadgeColor(announcement.category)}
                    >
                      {announcement.category}
                    </Badge>
                    <Badge
                      className={getPriorityBadgeColor(announcement.priority)}
                    >
                      {announcement.priority} priority
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {announcement.audience === "all"
                        ? "All Students"
                        : "Students"}
                    </Badge>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnnouncementClick(announcement);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAnnouncements.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No announcements found
              </h3>
              <p className="text-gray-600">
                {searchTerm ||
                categoryFilter !== "all" ||
                priorityFilter !== "all"
                  ? "Try adjusting your search filters"
                  : "No announcements available at the moment"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* View Announcement Dialog */}
      {selectedAnnouncement && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <School className="h-5 w-5" />
                {selectedAnnouncement.title}
                {selectedAnnouncement.isImportant && (
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                )}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Announcement Meta */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Author:</strong> {selectedAnnouncement.author}
                  </div>
                  <div>
                    <strong>Published:</strong>{" "}
                    {new Date(
                      selectedAnnouncement.created
                    ).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Category:</strong>{" "}
                    <Badge
                      className={getCategoryBadgeColor(
                        selectedAnnouncement.category
                      )}
                    >
                      {selectedAnnouncement.category}
                    </Badge>
                  </div>
                  <div>
                    <strong>Priority:</strong>{" "}
                    <Badge
                      className={getPriorityBadgeColor(
                        selectedAnnouncement.priority
                      )}
                    >
                      {selectedAnnouncement.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Announcement Content */}
              <div className="bg-white p-4 rounded-lg border">
                <div className="prose max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {selectedAnnouncement.content}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Valid Period:</span>
                  <span>
                    {new Date(
                      selectedAnnouncement.startDate
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      selectedAnnouncement.endDate
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {selectedAnnouncement.isImportant && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">
                      This is an important announcement that requires your
                      attention.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowViewDialog(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StudentAnnouncements;
