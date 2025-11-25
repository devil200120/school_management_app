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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Calendar,
  Search,
  Plus,
  Edit,
  Trash2,
  Clock,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  GraduationCap,
  Download,
  RefreshCw,
  FileText,
  Bell,
  CalendarDays,
  Timer,
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
import { Textarea } from "../../../components/ui/textarea";

const ExamSchedules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [activeTab, setActiveTab] = useState("schedule");

  const [examForm, setExamForm] = useState({
    subject: "",
    class: "",
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
    venue: "",
    examType: "",
    supervisor: "",
    instructions: "",
    materials: "",
  });

  // Mock exam schedules data
  const [examSchedules, setExamSchedules] = useState([
    {
      id: 1,
      subject: "Mathematics",
      class: "Grade 10A",
      date: "2024-12-15",
      startTime: "09:00",
      endTime: "11:00",
      duration: "120 minutes",
      venue: "Examination Hall A",
      examType: "Mid-term Exam",
      supervisor: "Mrs. Adebayo",
      instructions:
        "Bring calculator, ruler, and compass. No programmable calculators allowed.",
      materials: "Calculator, Ruler, Compass, Pencils",
      status: "scheduled",
      studentsCount: 32,
      conflictWarning: false,
    },
    {
      id: 2,
      subject: "English Literature",
      class: "Grade 10A",
      date: "2024-12-15",
      startTime: "14:00",
      endTime: "16:00",
      duration: "120 minutes",
      venue: "Classroom 201",
      examType: "Mid-term Exam",
      supervisor: "Mr. Thompson",
      instructions: "Essay questions only. Use blue or black ink pens only.",
      materials: "Pens (blue/black), Dictionary (if allowed)",
      status: "scheduled",
      studentsCount: 32,
      conflictWarning: false,
    },
    {
      id: 3,
      subject: "Biology",
      class: "Grade 10A",
      date: "2024-12-16",
      startTime: "09:00",
      endTime: "10:30",
      duration: "90 minutes",
      venue: "Science Lab B",
      examType: "Mid-term Exam",
      supervisor: "Dr. Williams",
      instructions:
        "Practical exam. Lab coats mandatory. Safety goggles provided.",
      materials: "Lab coat, Closed shoes, Notebook",
      status: "scheduled",
      studentsCount: 28,
      conflictWarning: false,
    },
    {
      id: 4,
      subject: "Mathematics",
      class: "Grade 9B",
      date: "2024-12-16",
      startTime: "09:00",
      endTime: "11:00",
      duration: "120 minutes",
      venue: "Examination Hall A",
      examType: "Mid-term Exam",
      supervisor: "Mrs. Davis",
      instructions: "Basic calculator allowed. Show all working steps clearly.",
      materials: "Calculator, Ruler, Pencils",
      status: "scheduled",
      studentsCount: 30,
      conflictWarning: true, // Same venue, same time conflict
    },
    {
      id: 5,
      subject: "History",
      class: "Grade 10B",
      date: "2024-12-17",
      startTime: "11:00",
      endTime: "13:00",
      duration: "120 minutes",
      venue: "Classroom 105",
      examType: "Mid-term Exam",
      supervisor: "Ms. Garcia",
      instructions: "Open book exam. Bring your textbooks and notes.",
      materials: "Textbooks, Notes, Pens",
      status: "completed",
      studentsCount: 25,
      conflictWarning: false,
    },
  ]);

  // Mock data for dropdowns
  const classes = ["Grade 9A", "Grade 9B", "Grade 10A", "Grade 10B"];
  const subjects = [
    "Mathematics",
    "English Literature",
    "Biology",
    "Chemistry",
    "Physics",
    "History",
    "Geography",
  ];
  const venues = [
    "Examination Hall A",
    "Examination Hall B",
    "Science Lab A",
    "Science Lab B",
    "Classroom 101",
    "Classroom 201",
  ];
  const supervisors = [
    "Mrs. Adebayo",
    "Mr. Thompson",
    "Dr. Williams",
    "Mrs. Davis",
    "Ms. Garcia",
  ];
  const examTypes = [
    "Mid-term Exam",
    "Final Exam",
    "Quiz",
    "Unit Test",
    "Practical Exam",
  ];

  // Filter exams
  const filteredExams = examSchedules.filter((exam) => {
    const matchesSearch =
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.supervisor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || exam.status === filterStatus;
    const matchesClass = filterClass === "all" || exam.class === filterClass;
    const matchesSubject =
      filterSubject === "all" || exam.subject === filterSubject;

    return matchesSearch && matchesStatus && matchesClass && matchesSubject;
  });

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Detect venue conflicts
  const getVenueConflicts = () => {
    const conflicts = [];
    for (let i = 0; i < examSchedules.length; i++) {
      for (let j = i + 1; j < examSchedules.length; j++) {
        const exam1 = examSchedules[i];
        const exam2 = examSchedules[j];

        if (
          exam1.venue === exam2.venue &&
          exam1.date === exam2.date &&
          exam1.status === "scheduled" &&
          exam2.status === "scheduled"
        ) {
          const start1 = new Date(`${exam1.date}T${exam1.startTime}`);
          const end1 = new Date(`${exam1.date}T${exam1.endTime}`);
          const start2 = new Date(`${exam2.date}T${exam2.startTime}`);
          const end2 = new Date(`${exam2.date}T${exam2.endTime}`);

          if (start1 < end2 && start2 < end1) {
            conflicts.push({
              exam1: exam1,
              exam2: exam2,
              venue: exam1.venue,
              date: exam1.date,
            });
          }
        }
      }
    }
    return conflicts;
  };

  // Calendar view data preparation
  const getCalendarData = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const calendar = [];
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const dayNumber = week * 7 + day - firstDay + 1;
        if (dayNumber > 0 && dayNumber <= daysInMonth) {
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
          )}-${String(dayNumber).padStart(2, "0")}`;
          const dayExams = examSchedules.filter(
            (exam) => exam.date === dateStr
          );
          weekDays.push({
            day: dayNumber,
            date: dateStr,
            exams: dayExams,
            isToday: dayNumber === today.getDate(),
          });
        } else {
          weekDays.push(null);
        }
      }
      calendar.push(weekDays);
    }
    return calendar;
  };

  // Handlers
  const handleAddExam = () => {
    setExamForm({
      subject: "",
      class: "",
      date: "",
      startTime: "",
      endTime: "",
      duration: "",
      venue: "",
      examType: "",
      supervisor: "",
      instructions: "",
      materials: "",
    });
    setIsAddDialogOpen(true);
  };

  const handleSaveExam = () => {
    if (
      !examForm.subject ||
      !examForm.class ||
      !examForm.date ||
      !examForm.startTime ||
      !examForm.endTime
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newExam = {
      id: examSchedules.length + 1,
      ...examForm,
      status: "scheduled",
      studentsCount: Math.floor(Math.random() * 35) + 20, // Mock student count
      conflictWarning: false,
    };

    setExamSchedules([...examSchedules, newExam]);
    setIsAddDialogOpen(false);
    toast.success("Exam scheduled successfully!");
  };

  const handleEditExam = (exam) => {
    setExamForm(exam);
    setSelectedExam(exam);
    setIsEditDialogOpen(true);
  };

  const handleUpdateExam = () => {
    setExamSchedules(
      examSchedules.map((exam) =>
        exam.id === selectedExam.id
          ? { ...examForm, id: selectedExam.id }
          : exam
      )
    );
    setIsEditDialogOpen(false);
    toast.success("Exam updated successfully!");
  };

  const handleDeleteExam = (examId) => {
    setExamSchedules(examSchedules.filter((exam) => exam.id !== examId));
    toast.success("Exam deleted successfully!");
  };

  const handleViewExam = (exam) => {
    setSelectedExam(exam);
    setIsViewDialogOpen(true);
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "";

    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const diff = end - start;
    const minutes = diff / (1000 * 60);

    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins > 0 ? mins + "m" : ""}`.trim();
    } else {
      return `${minutes}m`;
    }
  };

  const exportSchedule = () => {
    toast.success("Exam schedule exported successfully!");
  };

  const sendNotifications = () => {
    toast.success("Notifications sent to all relevant parties!");
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-eduos-primary animate-fade-in">
            Exam Schedules
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor exam schedules, venues, and conflicts
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={exportSchedule}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Schedule
          </Button>
          <Button
            variant="outline"
            onClick={sendNotifications}
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Send Notifications
          </Button>
          <Button
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleAddExam}
          >
            <Plus className="mr-2 h-4 w-4" />
            Schedule Exam
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Exams</p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {examSchedules.length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-3xl font-bold text-blue-600">
                  {examSchedules.filter((e) => e.status === "scheduled").length}
                </p>
              </div>
              <CalendarDays className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {examSchedules.filter((e) => e.status === "completed").length}
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
                <p className="text-sm font-medium text-gray-600">Conflicts</p>
                <p className="text-3xl font-bold text-red-600">
                  {getVenueConflicts().length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conflict Warnings */}
      {getVenueConflicts().length > 0 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-800">
                Venue Conflicts Detected
              </span>
            </div>
            <div className="space-y-2">
              {getVenueConflicts().map((conflict, index) => (
                <div key={index} className="text-sm text-red-700">
                  <strong>{conflict.venue}</strong> on {conflict.date}:{" "}
                  {conflict.exam1.subject} ({conflict.exam1.class}) vs{" "}
                  {conflict.exam2.subject} ({conflict.exam2.class})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Schedule View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Schedule View */}
        <TabsContent value="schedule" className="space-y-6">
          <Card className="animate-fade-in delay-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Exam Schedule (
                {
                  examSchedules.filter((e) => e.status === "scheduled").length
                }{" "}
                upcoming)
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
                      placeholder="Search exams..."
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
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterClass} onValueChange={setFilterClass}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter class" />
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

                  <Select
                    value={filterSubject}
                    onValueChange={setFilterSubject}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
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

              {/* Exams Table */}
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-gray-100">
                        Exam Details
                      </TableHead>
                      <TableHead className="bg-gray-100">Date & Time</TableHead>
                      <TableHead className="bg-gray-100">Venue</TableHead>
                      <TableHead className="bg-gray-100">Supervisor</TableHead>
                      <TableHead className="bg-gray-100">Students</TableHead>
                      <TableHead className="bg-gray-100">Status</TableHead>
                      <TableHead className="bg-gray-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExams.map((exam) => (
                      <TableRow
                        key={exam.id}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          exam.conflictWarning
                            ? "bg-red-50 border-l-4 border-l-red-500"
                            : ""
                        }`}
                        onClick={() => handleViewExam(exam)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">
                                  {exam.subject}
                                </span>
                                {exam.conflictWarning && (
                                  <AlertTriangle className="h-4 w-4 text-red-500" />
                                )}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                <div className="flex items-center gap-2">
                                  <GraduationCap className="h-3 w-3" />
                                  {exam.class}
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs mt-1">
                                {exam.examType}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {exam.date}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {exam.startTime} - {exam.endTime}
                            </div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {exam.duration}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{exam.venue}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{exam.supervisor}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">
                              {exam.studentsCount}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(exam.status)}>
                            {exam.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditExam(exam);
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteExam(exam.id);
                              }}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Summary */}
              <div className="flex justify-between items-center p-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium">{filteredExams.length}</span> of{" "}
                  <span className="font-medium">{examSchedules.length}</span>{" "}
                  exams
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar View */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                December 2024 - Exam Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-3 text-center font-medium text-gray-600 bg-gray-100"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getCalendarData()
                  .flat()
                  .map((day, index) => {
                    if (!day) {
                      return (
                        <div key={index} className="p-3 h-24 bg-gray-50"></div>
                      );
                    }

                    return (
                      <div
                        key={day.date}
                        className={`p-2 h-24 border rounded-lg overflow-y-auto ${
                          day.isToday
                            ? "bg-eduos-primary text-white"
                            : day.exams.length > 0
                            ? "bg-blue-50 border-blue-200"
                            : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className="font-medium text-sm mb-1">
                          {day.day}
                        </div>
                        <div className="space-y-1">
                          {day.exams.map((exam) => (
                            <div
                              key={exam.id}
                              className={`text-xs p-1 rounded cursor-pointer ${
                                day.isToday
                                  ? "bg-white text-eduos-primary"
                                  : "bg-eduos-primary text-white"
                              }`}
                              onClick={() => handleViewExam(exam)}
                            >
                              <div className="font-medium truncate">
                                {exam.subject}
                              </div>
                              <div className="truncate">{exam.startTime}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics View */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exam Distribution by Subject */}
            <Card>
              <CardHeader>
                <CardTitle>Exams by Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => {
                    const count = examSchedules.filter(
                      (e) => e.subject === subject
                    ).length;
                    const percentage =
                      count > 0 ? (count / examSchedules.length) * 100 : 0;

                    return (
                      <div
                        key={subject}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{subject}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-eduos-primary h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">
                            {count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Venue Utilization */}
            <Card>
              <CardHeader>
                <CardTitle>Venue Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {venues.map((venue) => {
                    const count = examSchedules.filter(
                      (e) => e.venue === venue && e.status === "scheduled"
                    ).length;
                    const maxCapacity = 5; // Mock capacity
                    const utilizationRate = (count / maxCapacity) * 100;

                    return (
                      <div key={venue} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{venue}</span>
                          </div>
                          <span className="text-sm">
                            {count}/{maxCapacity}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              utilizationRate > 80
                                ? "bg-red-500"
                                : utilizationRate > 60
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min(utilizationRate, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Supervisor Workload */}
            <Card>
              <CardHeader>
                <CardTitle>Supervisor Workload</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supervisors.map((supervisor) => {
                    const count = examSchedules.filter(
                      (e) =>
                        e.supervisor === supervisor && e.status === "scheduled"
                    ).length;
                    const totalHours = examSchedules
                      .filter(
                        (e) =>
                          e.supervisor === supervisor &&
                          e.status === "scheduled"
                      )
                      .reduce(
                        (total, exam) =>
                          total +
                          parseFloat(exam.duration.replace(/\D/g, "")) / 60,
                        0
                      );

                    return (
                      <div
                        key={supervisor}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="font-medium">{supervisor}</div>
                            <div className="text-sm text-gray-600">
                              {count} exams scheduled
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {totalHours.toFixed(1)}h
                          </div>
                          <div className="text-sm text-gray-600">
                            total time
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Exams Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Exams Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {examSchedules
                    .filter((e) => e.status === "scheduled")
                    .sort(
                      (a, b) =>
                        new Date(a.date + "T" + a.startTime) -
                        new Date(b.date + "T" + b.startTime)
                    )
                    .slice(0, 5)
                    .map((exam) => (
                      <div
                        key={exam.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-eduos-primary rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium">
                            {exam.subject} - {exam.class}
                          </div>
                          <div className="text-sm text-gray-600">
                            {exam.date} at {exam.startTime} • {exam.venue}
                          </div>
                        </div>
                        <Timer className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Exam Dialog */}
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
              {isEditDialogOpen ? "Edit Exam" : "Schedule New Exam"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  value={examForm.subject}
                  onValueChange={(value) =>
                    setExamForm((prev) => ({ ...prev, subject: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Class *</Label>
                <Select
                  value={examForm.class}
                  onValueChange={(value) =>
                    setExamForm((prev) => ({ ...prev, class: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((className) => (
                      <SelectItem key={className} value={className}>
                        {className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={examForm.date}
                  onChange={(e) =>
                    setExamForm((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={examForm.startTime}
                  onChange={(e) => {
                    const newForm = { ...examForm, startTime: e.target.value };
                    if (newForm.startTime && newForm.endTime) {
                      newForm.duration = calculateDuration(
                        newForm.startTime,
                        newForm.endTime
                      );
                    }
                    setExamForm(newForm);
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={examForm.endTime}
                  onChange={(e) => {
                    const newForm = { ...examForm, endTime: e.target.value };
                    if (newForm.startTime && newForm.endTime) {
                      newForm.duration = calculateDuration(
                        newForm.startTime,
                        newForm.endTime
                      );
                    }
                    setExamForm(newForm);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={examForm.duration}
                  readOnly
                  placeholder="Auto-calculated"
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Select
                  value={examForm.venue}
                  onValueChange={(value) =>
                    setExamForm((prev) => ({ ...prev, venue: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select venue" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues.map((venue) => (
                      <SelectItem key={venue} value={venue}>
                        {venue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="examType">Exam Type</Label>
                <Select
                  value={examForm.examType}
                  onValueChange={(value) =>
                    setExamForm((prev) => ({ ...prev, examType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supervisor">Supervisor</Label>
                <Select
                  value={examForm.supervisor}
                  onValueChange={(value) =>
                    setExamForm((prev) => ({ ...prev, supervisor: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {supervisors.map((supervisor) => (
                      <SelectItem key={supervisor} value={supervisor}>
                        {supervisor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                value={examForm.instructions}
                onChange={(e) =>
                  setExamForm((prev) => ({
                    ...prev,
                    instructions: e.target.value,
                  }))
                }
                placeholder="Enter any special instructions for the exam..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="materials">Required Materials</Label>
              <Input
                id="materials"
                value={examForm.materials}
                onChange={(e) =>
                  setExamForm((prev) => ({
                    ...prev,
                    materials: e.target.value,
                  }))
                }
                placeholder="e.g., Calculator, Ruler, Pencils"
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
              onClick={isEditDialogOpen ? handleUpdateExam : handleSaveExam}
            >
              {isEditDialogOpen ? "Update Exam" : "Schedule Exam"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Exam Dialog */}
      {selectedExam && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {selectedExam.subject} - {selectedExam.class}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Exam Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule Details
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Date:</strong> {selectedExam.date}
                      </div>
                      <div>
                        <strong>Time:</strong> {selectedExam.startTime} -{" "}
                        {selectedExam.endTime}
                      </div>
                      <div>
                        <strong>Duration:</strong> {selectedExam.duration}
                      </div>
                      <div>
                        <strong>Type:</strong> {selectedExam.examType}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Venue & Supervision
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Venue:</strong> {selectedExam.venue}
                      </div>
                      <div>
                        <strong>Supervisor:</strong> {selectedExam.supervisor}
                      </div>
                      <div>
                        <strong>Students:</strong> {selectedExam.studentsCount}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Instructions */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Instructions
                  </h4>
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {selectedExam.instructions}
                  </div>
                </CardContent>
              </Card>

              {/* Materials */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Required Materials
                  </h4>
                  <div className="text-sm text-gray-700">
                    {selectedExam.materials}
                  </div>
                </CardContent>
              </Card>

              {/* Status */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Status</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusBadgeColor(selectedExam.status)}>
                      {selectedExam.status}
                    </Badge>
                    {selectedExam.conflictWarning && (
                      <Badge
                        variant="destructive"
                        className="flex items-center gap-1"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        Conflict Warning
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
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
                  handleEditExam(selectedExam);
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Exam
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ExamSchedules;
