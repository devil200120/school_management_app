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

  // Mock data for targeting options
  const grades = [
    "Nursery",
    "KG1",
    "KG2",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ];
  const classes = {
    "Grade 9": ["Grade 9A", "Grade 9B", "Grade 9C"],
    "Grade 10": ["Grade 10A", "Grade 10B", "Grade 10C"],
    "Grade 11": ["Grade 11A", "Grade 11B"],
    "Grade 12": ["Grade 12A", "Grade 12B"],
  };
  const departments = [
    "Mathematics",
    "English",
    "Science",
    "Social Studies",
    "Arts",
    "Physical Education",
    "Computer Science",
    "Languages",
  ];
  const staffDepartments = [
    "Administration",
    "Finance",
    "IT Support",
    "Maintenance",
    "Security",
    "Library",
    "Health Services",
  ];

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    category: "",
    priority: "medium",
    audience: "all",
    targetGroups: {
      students: {
        enabled: false,
        grades: [],
        classes: [],
        allGrades: true,
      },
      parents: {
        enabled: false,
        grades: [],
        classes: [],
        allGrades: true,
      },
      teachers: {
        enabled: false,
        departments: [],
        allDepartments: true,
      },
      staff: {
        enabled: false,
        departments: [],
        allDepartments: true,
      },
    },
    publishSchedule: "immediate",
    startDate: "",
    endDate: "",
    publishDate: "",
    publishTime: "",
    attachment: null,
    requireReadConfirmation: false,
    sendEmailNotification: true,
    sendSMSNotification: false,
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
      targetGroups: {
        students: {
          enabled: false,
          grades: [],
          classes: [],
          allGrades: true,
        },
        parents: {
          enabled: false,
          grades: [],
          classes: [],
          allGrades: true,
        },
        teachers: {
          enabled: false,
          departments: [],
          allDepartments: true,
        },
        staff: {
          enabled: false,
          departments: [],
          allDepartments: true,
        },
      },
      publishSchedule: "immediate",
      startDate: "",
      endDate: "",
      publishDate: "",
      publishTime: "",
      attachment: null,
      requireReadConfirmation: false,
      sendEmailNotification: true,
      sendSMSNotification: false,
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
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Announcement</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Basic Information</h3>
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
                              <SelectItem value="emergency">
                                Emergency
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                          id="content"
                          placeholder="Enter announcement content"
                          rows={4}
                          value={announcementForm.content}
                          onChange={(e) =>
                            setAnnouncementForm({
                              ...announcementForm,
                              content: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Audience Targeting */}
                    <div className="space-y-4 border-t pt-6">
                      <h3 className="text-lg font-medium">
                        Who will see this announcement?
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="audience">Primary Audience</Label>
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
                              <SelectItem value="all">Everyone</SelectItem>
                              <SelectItem value="students">
                                Students Only
                              </SelectItem>
                              <SelectItem value="parents">
                                Parents Only
                              </SelectItem>
                              <SelectItem value="teachers">
                                Teachers Only
                              </SelectItem>
                              <SelectItem value="staff">Staff Only</SelectItem>
                              <SelectItem value="custom">
                                Custom Selection
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="priority">Priority Level</Label>
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
                              <SelectItem value="low">Low Priority</SelectItem>
                              <SelectItem value="medium">
                                Medium Priority
                              </SelectItem>
                              <SelectItem value="high">
                                High Priority
                              </SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Custom Audience Selection */}
                      {announcementForm.audience === "custom" && (
                        <Card className="p-4 bg-blue-50 border-blue-200">
                          <h4 className="font-medium mb-3">
                            Select Target Groups
                          </h4>
                          <div className="space-y-4">
                            {/* Students */}
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id="target-students"
                                className="mt-1"
                                checked={
                                  announcementForm.targetGroups.students.enabled
                                }
                                onChange={(e) =>
                                  setAnnouncementForm({
                                    ...announcementForm,
                                    targetGroups: {
                                      ...announcementForm.targetGroups,
                                      students: {
                                        ...announcementForm.targetGroups
                                          .students,
                                        enabled: e.target.checked,
                                      },
                                    },
                                  })
                                }
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor="target-students"
                                  className="flex items-center gap-2"
                                >
                                  <School className="h-4 w-4" />
                                  Students
                                </Label>
                                {announcementForm.targetGroups.students
                                  .enabled && (
                                  <div className="mt-2 space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="all-students"
                                        checked={
                                          announcementForm.targetGroups.students
                                            .allGrades
                                        }
                                        onChange={(e) =>
                                          setAnnouncementForm({
                                            ...announcementForm,
                                            targetGroups: {
                                              ...announcementForm.targetGroups,
                                              students: {
                                                ...announcementForm.targetGroups
                                                  .students,
                                                allGrades: e.target.checked,
                                                grades: e.target.checked
                                                  ? []
                                                  : announcementForm
                                                      .targetGroups.students
                                                      .grades,
                                              },
                                            },
                                          })
                                        }
                                      />
                                      <Label
                                        htmlFor="all-students"
                                        className="text-sm"
                                      >
                                        All Students
                                      </Label>
                                    </div>
                                    {!announcementForm.targetGroups.students
                                      .allGrades && (
                                      <div className="ml-6">
                                        <Label className="text-sm">
                                          Select Grades:
                                        </Label>
                                        <div className="grid grid-cols-3 gap-2 mt-1">
                                          {grades.map((grade) => (
                                            <label
                                              key={grade}
                                              className="flex items-center space-x-1 text-sm"
                                            >
                                              <input
                                                type="checkbox"
                                                value={grade}
                                                checked={announcementForm.targetGroups.students.grades.includes(
                                                  grade
                                                )}
                                                onChange={(e) => {
                                                  const currentGrades =
                                                    announcementForm
                                                      .targetGroups.students
                                                      .grades;
                                                  const newGrades = e.target
                                                    .checked
                                                    ? [...currentGrades, grade]
                                                    : currentGrades.filter(
                                                        (g) => g !== grade
                                                      );
                                                  setAnnouncementForm({
                                                    ...announcementForm,
                                                    targetGroups: {
                                                      ...announcementForm.targetGroups,
                                                      students: {
                                                        ...announcementForm
                                                          .targetGroups
                                                          .students,
                                                        grades: newGrades,
                                                      },
                                                    },
                                                  });
                                                }}
                                              />
                                              <span>{grade}</span>
                                            </label>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Parents */}
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id="target-parents"
                                className="mt-1"
                                checked={
                                  announcementForm.targetGroups.parents.enabled
                                }
                                onChange={(e) =>
                                  setAnnouncementForm({
                                    ...announcementForm,
                                    targetGroups: {
                                      ...announcementForm.targetGroups,
                                      parents: {
                                        ...announcementForm.targetGroups
                                          .parents,
                                        enabled: e.target.checked,
                                      },
                                    },
                                  })
                                }
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor="target-parents"
                                  className="flex items-center gap-2"
                                >
                                  <Users className="h-4 w-4" />
                                  Parents
                                </Label>
                                {announcementForm.targetGroups.parents
                                  .enabled && (
                                  <div className="mt-2 space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="all-parents"
                                        checked={
                                          announcementForm.targetGroups.parents
                                            .allGrades
                                        }
                                        onChange={(e) =>
                                          setAnnouncementForm({
                                            ...announcementForm,
                                            targetGroups: {
                                              ...announcementForm.targetGroups,
                                              parents: {
                                                ...announcementForm.targetGroups
                                                  .parents,
                                                allGrades: e.target.checked,
                                                grades: e.target.checked
                                                  ? []
                                                  : announcementForm
                                                      .targetGroups.parents
                                                      .grades,
                                              },
                                            },
                                          })
                                        }
                                      />
                                      <Label
                                        htmlFor="all-parents"
                                        className="text-sm"
                                      >
                                        All Parents
                                      </Label>
                                    </div>
                                    {!announcementForm.targetGroups.parents
                                      .allGrades && (
                                      <div className="ml-6">
                                        <Label className="text-sm">
                                          Parents of Students in:
                                        </Label>
                                        <div className="grid grid-cols-3 gap-2 mt-1">
                                          {grades.map((grade) => (
                                            <label
                                              key={grade}
                                              className="flex items-center space-x-1 text-sm"
                                            >
                                              <input
                                                type="checkbox"
                                                value={grade}
                                                checked={announcementForm.targetGroups.parents.grades.includes(
                                                  grade
                                                )}
                                                onChange={(e) => {
                                                  const currentGrades =
                                                    announcementForm
                                                      .targetGroups.parents
                                                      .grades;
                                                  const newGrades = e.target
                                                    .checked
                                                    ? [...currentGrades, grade]
                                                    : currentGrades.filter(
                                                        (g) => g !== grade
                                                      );
                                                  setAnnouncementForm({
                                                    ...announcementForm,
                                                    targetGroups: {
                                                      ...announcementForm.targetGroups,
                                                      parents: {
                                                        ...announcementForm
                                                          .targetGroups.parents,
                                                        grades: newGrades,
                                                      },
                                                    },
                                                  });
                                                }}
                                              />
                                              <span>{grade}</span>
                                            </label>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Teachers */}
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id="target-teachers"
                                className="mt-1"
                                checked={
                                  announcementForm.targetGroups.teachers.enabled
                                }
                                onChange={(e) =>
                                  setAnnouncementForm({
                                    ...announcementForm,
                                    targetGroups: {
                                      ...announcementForm.targetGroups,
                                      teachers: {
                                        ...announcementForm.targetGroups
                                          .teachers,
                                        enabled: e.target.checked,
                                      },
                                    },
                                  })
                                }
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor="target-teachers"
                                  className="flex items-center gap-2"
                                >
                                  <User className="h-4 w-4" />
                                  Teachers
                                </Label>
                                {announcementForm.targetGroups.teachers
                                  .enabled && (
                                  <div className="mt-2 space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="all-teachers"
                                        checked={
                                          announcementForm.targetGroups.teachers
                                            .allDepartments
                                        }
                                        onChange={(e) =>
                                          setAnnouncementForm({
                                            ...announcementForm,
                                            targetGroups: {
                                              ...announcementForm.targetGroups,
                                              teachers: {
                                                ...announcementForm.targetGroups
                                                  .teachers,
                                                allDepartments:
                                                  e.target.checked,
                                                departments: e.target.checked
                                                  ? []
                                                  : announcementForm
                                                      .targetGroups.teachers
                                                      .departments,
                                              },
                                            },
                                          })
                                        }
                                      />
                                      <Label
                                        htmlFor="all-teachers"
                                        className="text-sm"
                                      >
                                        All Teachers
                                      </Label>
                                    </div>
                                    {!announcementForm.targetGroups.teachers
                                      .allDepartments && (
                                      <div className="ml-6">
                                        <Label className="text-sm">
                                          Select Departments:
                                        </Label>
                                        <div className="grid grid-cols-2 gap-2 mt-1">
                                          {departments.map((dept) => (
                                            <label
                                              key={dept}
                                              className="flex items-center space-x-1 text-sm"
                                            >
                                              <input
                                                type="checkbox"
                                                value={dept}
                                                checked={announcementForm.targetGroups.teachers.departments.includes(
                                                  dept
                                                )}
                                                onChange={(e) => {
                                                  const currentDepts =
                                                    announcementForm
                                                      .targetGroups.teachers
                                                      .departments;
                                                  const newDepts = e.target
                                                    .checked
                                                    ? [...currentDepts, dept]
                                                    : currentDepts.filter(
                                                        (d) => d !== dept
                                                      );
                                                  setAnnouncementForm({
                                                    ...announcementForm,
                                                    targetGroups: {
                                                      ...announcementForm.targetGroups,
                                                      teachers: {
                                                        ...announcementForm
                                                          .targetGroups
                                                          .teachers,
                                                        departments: newDepts,
                                                      },
                                                    },
                                                  });
                                                }}
                                              />
                                              <span>{dept}</span>
                                            </label>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Staff */}
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id="target-staff"
                                className="mt-1"
                                checked={
                                  announcementForm.targetGroups.staff.enabled
                                }
                                onChange={(e) =>
                                  setAnnouncementForm({
                                    ...announcementForm,
                                    targetGroups: {
                                      ...announcementForm.targetGroups,
                                      staff: {
                                        ...announcementForm.targetGroups.staff,
                                        enabled: e.target.checked,
                                      },
                                    },
                                  })
                                }
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor="target-staff"
                                  className="flex items-center gap-2"
                                >
                                  <Settings className="h-4 w-4" />
                                  Support Staff
                                </Label>
                                {announcementForm.targetGroups.staff
                                  .enabled && (
                                  <div className="mt-2 space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="all-staff"
                                        checked={
                                          announcementForm.targetGroups.staff
                                            .allDepartments
                                        }
                                        onChange={(e) =>
                                          setAnnouncementForm({
                                            ...announcementForm,
                                            targetGroups: {
                                              ...announcementForm.targetGroups,
                                              staff: {
                                                ...announcementForm.targetGroups
                                                  .staff,
                                                allDepartments:
                                                  e.target.checked,
                                                departments: e.target.checked
                                                  ? []
                                                  : announcementForm
                                                      .targetGroups.staff
                                                      .departments,
                                              },
                                            },
                                          })
                                        }
                                      />
                                      <Label
                                        htmlFor="all-staff"
                                        className="text-sm"
                                      >
                                        All Support Staff
                                      </Label>
                                    </div>
                                    {!announcementForm.targetGroups.staff
                                      .allDepartments && (
                                      <div className="ml-6">
                                        <Label className="text-sm">
                                          Select Departments:
                                        </Label>
                                        <div className="grid grid-cols-2 gap-2 mt-1">
                                          {staffDepartments.map((dept) => (
                                            <label
                                              key={dept}
                                              className="flex items-center space-x-1 text-sm"
                                            >
                                              <input
                                                type="checkbox"
                                                value={dept}
                                                checked={announcementForm.targetGroups.staff.departments.includes(
                                                  dept
                                                )}
                                                onChange={(e) => {
                                                  const currentDepts =
                                                    announcementForm
                                                      .targetGroups.staff
                                                      .departments;
                                                  const newDepts = e.target
                                                    .checked
                                                    ? [...currentDepts, dept]
                                                    : currentDepts.filter(
                                                        (d) => d !== dept
                                                      );
                                                  setAnnouncementForm({
                                                    ...announcementForm,
                                                    targetGroups: {
                                                      ...announcementForm.targetGroups,
                                                      staff: {
                                                        ...announcementForm
                                                          .targetGroups.staff,
                                                        departments: newDepts,
                                                      },
                                                    },
                                                  });
                                                }}
                                              />
                                              <span>{dept}</span>
                                            </label>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>

                    {/* Publishing Options */}
                    <div className="space-y-4 border-t pt-6">
                      <h3 className="text-lg font-medium">
                        Publishing Options
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="publishSchedule">
                            When to Publish
                          </Label>
                          <Select
                            value={announcementForm.publishSchedule}
                            onValueChange={(value) =>
                              setAnnouncementForm({
                                ...announcementForm,
                                publishSchedule: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">
                                Publish Immediately
                              </SelectItem>
                              <SelectItem value="scheduled">
                                Schedule for Later
                              </SelectItem>
                              <SelectItem value="draft">
                                Save as Draft
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {announcementForm.publishSchedule === "scheduled" && (
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="publishDate">Publish Date</Label>
                              <Input
                                id="publishDate"
                                type="date"
                                value={announcementForm.publishDate}
                                onChange={(e) =>
                                  setAnnouncementForm({
                                    ...announcementForm,
                                    publishDate: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="publishTime">Publish Time</Label>
                              <Input
                                id="publishTime"
                                type="time"
                                value={announcementForm.publishTime}
                                onChange={(e) =>
                                  setAnnouncementForm({
                                    ...announcementForm,
                                    publishTime: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Display From</Label>
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
                        <div>
                          <Label htmlFor="endDate">Display Until</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={announcementForm.endDate}
                            onChange={(e) =>
                              setAnnouncementForm({
                                ...announcementForm,
                                endDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notification Options */}
                    <div className="space-y-4 border-t pt-6">
                      <h3 className="text-lg font-medium">
                        Notification Settings
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="requireReadConfirmation"
                            checked={announcementForm.requireReadConfirmation}
                            onChange={(e) =>
                              setAnnouncementForm({
                                ...announcementForm,
                                requireReadConfirmation: e.target.checked,
                              })
                            }
                          />
                          <Label htmlFor="requireReadConfirmation">
                            Require read confirmation
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="sendEmailNotification"
                            checked={announcementForm.sendEmailNotification}
                            onChange={(e) =>
                              setAnnouncementForm({
                                ...announcementForm,
                                sendEmailNotification: e.target.checked,
                              })
                            }
                          />
                          <Label htmlFor="sendEmailNotification">
                            Send email notification
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="sendSMSNotification"
                            checked={announcementForm.sendSMSNotification}
                            onChange={(e) =>
                              setAnnouncementForm({
                                ...announcementForm,
                                sendSMSNotification: e.target.checked,
                              })
                            }
                          />
                          <Label htmlFor="sendSMSNotification">
                            Send SMS notification (for high priority)
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        onClick={handleCreateAnnouncement}
                        className="flex-1"
                        disabled={
                          !announcementForm.title || !announcementForm.content
                        }
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {announcementForm.publishSchedule === "immediate"
                          ? "Publish Now"
                          : announcementForm.publishSchedule === "scheduled"
                          ? "Schedule"
                          : "Save Draft"}
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
