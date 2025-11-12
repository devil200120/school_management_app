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
  Bell,
  Search,
  Filter,
  Calendar,
  Clock,
  School,
  AlertCircle,
  Info,
  Star,
  BookOpen,
  Users,
  Megaphone,
  Download,
  Eye,
  Archive,
} from "lucide-react";

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Mock announcements data
  const announcements = [
    {
      id: 1,
      title: "Parent-Teacher Conference 2024",
      content:
        "Dear Parents, We are pleased to announce our annual Parent-Teacher Conference scheduled for December 15-16, 2024. This is an excellent opportunity to discuss your child's progress with their teachers. Please book your slots through the parent portal by December 10th.",
      category: "academic",
      priority: "high",
      date: "2024-11-10",
      time: "09:00 AM",
      author: "Principal Johnson",
      department: "Administration",
      isRead: false,
      attachments: ["PTC_Schedule.pdf", "Booking_Guidelines.pdf"],
      targetAudience: "All Parents",
      expiryDate: "2024-12-20",
    },
    {
      id: 2,
      title: "School Fees Payment Reminder",
      content:
        "This is a friendly reminder that the second term school fees are due by November 30th, 2024. Please ensure timely payment to avoid any inconvenience. Online payment options are available through the parent portal.",
      category: "finance",
      priority: "medium",
      date: "2024-11-08",
      time: "02:30 PM",
      author: "Finance Department",
      department: "Finance",
      isRead: true,
      attachments: ["Fee_Structure.pdf"],
      targetAudience: "All Parents",
      expiryDate: "2024-11-30",
    },
    {
      id: 3,
      title: "Inter-House Sports Competition",
      content:
        "Get ready for our exciting Inter-House Sports Competition! The event will take place on November 25th, 2024. Students from all houses will compete in various sports activities. Parents are invited to attend and cheer for their children.",
      category: "sports",
      priority: "low",
      date: "2024-11-05",
      time: "11:15 AM",
      author: "Sports Department",
      department: "Sports",
      isRead: true,
      attachments: ["Sports_Schedule.pdf", "House_Teams.pdf"],
      targetAudience: "All Parents",
      expiryDate: "2024-11-25",
    },
    {
      id: 4,
      title: "COVID-19 Safety Guidelines Update",
      content:
        "Following the latest health advisory, we have updated our COVID-19 safety protocols. All students and staff are required to follow the new guidelines. Please review the attached document for detailed information.",
      category: "health",
      priority: "high",
      date: "2024-11-12",
      time: "08:00 AM",
      author: "Health Committee",
      department: "Health & Safety",
      isRead: false,
      attachments: ["COVID_Guidelines_v3.pdf"],
      targetAudience: "All Parents",
      expiryDate: "2024-12-31",
    },
    {
      id: 5,
      title: "Science Fair 2024 - Call for Participation",
      content:
        "We invite all students to participate in our annual Science Fair. The theme for this year is 'Innovations for Tomorrow'. Registration is open until November 20th. Exciting prizes await the winners!",
      category: "academic",
      priority: "medium",
      date: "2024-11-01",
      time: "10:45 AM",
      author: "Science Department",
      department: "Science",
      isRead: true,
      attachments: ["Science_Fair_Rules.pdf", "Registration_Form.pdf"],
      targetAudience: "Parents of Science Students",
      expiryDate: "2024-12-05",
    },
    {
      id: 6,
      title: "Library Book Return Reminder",
      content:
        "Please remind your children to return any overdue library books by November 15th, 2024. Late return fees may apply for books returned after the due date. Check your child's library account for any pending returns.",
      category: "general",
      priority: "low",
      date: "2024-10-28",
      time: "03:20 PM",
      author: "Library Department",
      department: "Library",
      isRead: true,
      attachments: [],
      targetAudience: "All Parents",
      expiryDate: "2024-11-15",
    },
  ];

  // Filter announcements based on search and filters
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || announcement.category === categoryFilter;
    const matchesPriority =
      priorityFilter === "all" || announcement.priority === priorityFilter;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case "academic":
        return <BookOpen className="h-4 w-4" />;
      case "finance":
        return <School className="h-4 w-4" />;
      case "sports":
        return <Users className="h-4 w-4" />;
      case "health":
        return <AlertCircle className="h-4 w-4" />;
      case "general":
        return <Info className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority) => {
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

  const getCategoryColor = (category) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800";
      case "finance":
        return "bg-purple-100 text-purple-800";
      case "sports":
        return "bg-orange-100 text-orange-800";
      case "health":
        return "bg-red-100 text-red-800";
      case "general":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const unreadCount = announcements.filter((a) => !a.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Megaphone className="h-8 w-8 text-blue-500" />
            School Announcements
          </h1>
          <p className="text-gray-600 mt-1">
            Stay updated with the latest news and announcements from school
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-blue-600">
            <Bell className="h-3 w-3 mr-1" />
            {unreadCount} Unread
          </Badge>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="health">Health & Safety</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              !announcement.isRead ? "border-blue-500 bg-blue-50/30" : ""
            }`}
            onClick={() => setSelectedAnnouncement(announcement)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(announcement.category)}
                    <Badge className={getCategoryColor(announcement.category)}>
                      {announcement.category.charAt(0).toUpperCase() +
                        announcement.category.slice(1)}
                    </Badge>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority.toUpperCase()}
                    </Badge>
                    {!announcement.isRead && (
                      <Badge className="bg-blue-500 text-white">New</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">
                    {announcement.title}
                  </CardTitle>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(announcement.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {announcement.time}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {announcement.author}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 mb-3 line-clamp-3">
                {announcement.content}
              </p>

              {announcement.attachments.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <Download className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {announcement.attachments.length} attachment(s)
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Department: {announcement.department}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No announcements found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(selectedAnnouncement.category)}
                      <Badge
                        className={getCategoryColor(
                          selectedAnnouncement.category
                        )}
                      >
                        {selectedAnnouncement.category.charAt(0).toUpperCase() +
                          selectedAnnouncement.category.slice(1)}
                      </Badge>
                      <Badge
                        className={getPriorityColor(
                          selectedAnnouncement.priority
                        )}
                      >
                        {selectedAnnouncement.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">
                      {selectedAnnouncement.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(
                          selectedAnnouncement.date
                        ).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedAnnouncement.time}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAnnouncement(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Message</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedAnnouncement.content}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Author</h5>
                    <p className="text-gray-600">
                      {selectedAnnouncement.author}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">
                      Department
                    </h5>
                    <p className="text-gray-600">
                      {selectedAnnouncement.department}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">
                      Target Audience
                    </h5>
                    <p className="text-gray-600">
                      {selectedAnnouncement.targetAudience}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">
                      Valid Until
                    </h5>
                    <p className="text-gray-600">
                      {new Date(
                        selectedAnnouncement.expiryDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {selectedAnnouncement.attachments.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">
                      Attachments
                    </h5>
                    <div className="space-y-2">
                      {selectedAnnouncement.attachments.map(
                        (attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <span className="text-sm text-gray-700">
                              {attachment}
                            </span>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAnnouncement(null)}
                  >
                    Close
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      <Archive className="h-3 w-3 mr-1" />
                      Archive
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
