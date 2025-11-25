import { useState } from "react";
import PropTypes from "prop-types";
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
  Clock,
  Users,
  MapPin,
  BookOpen,
  GraduationCap,
  FileText,
  Eye,
  CalendarDays,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
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

const TeacherExamSchedules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [activeTab, setActiveTab] = useState("schedule");

  // Mock exam schedules data - filtered for current teacher
  const [examSchedules] = useState([
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
      supervisor: "Mrs. Adebayo", // Current teacher
      instructions:
        "Bring calculator, ruler, and compass. No programmable calculators allowed.",
      materials: "Calculator, Ruler, Compass, Pencils",
      status: "scheduled",
      studentsCount: 32,
      isMyExam: true, // This teacher is supervising
    },
    {
      id: 2,
      subject: "Mathematics",
      class: "Grade 9B",
      date: "2024-12-16",
      startTime: "09:00",
      endTime: "11:00",
      duration: "120 minutes",
      venue: "Examination Hall A",
      examType: "Mid-term Exam",
      supervisor: "Mrs. Adebayo", // Current teacher
      instructions: "Basic calculator allowed. Show all working steps clearly.",
      materials: "Calculator, Ruler, Pencils",
      status: "scheduled",
      studentsCount: 30,
      isMyExam: true,
    },
    {
      id: 3,
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
      isMyExam: false, // Different teacher
    },
    {
      id: 4,
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
      isMyExam: false,
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
  ];

  // Filter exams
  const filteredExams = examSchedules.filter((exam) => {
    const matchesSearch =
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.venue.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || exam.status === filterStatus;
    const matchesClass = filterClass === "all" || exam.class === filterClass;
    const matchesSubject =
      filterSubject === "all" || exam.subject === filterSubject;

    return matchesSearch && matchesStatus && matchesClass && matchesSubject;
  });

  // Separate exams the teacher is supervising vs all exams
  const myExams = filteredExams.filter((exam) => exam.isMyExam);
  const allExams = filteredExams;

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
  const handleViewExam = (exam) => {
    setSelectedExam(exam);
    setIsViewDialogOpen(true);
  };

  const ExamTable = ({ exams, title }) => (
    <Card className="animate-fade-in delay-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {title} ({exams.filter((e) => e.status === "scheduled").length}{" "}
          upcoming)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Exams Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-100">Exam Details</TableHead>
                <TableHead className="bg-gray-100">Date & Time</TableHead>
                <TableHead className="bg-gray-100">Venue</TableHead>
                <TableHead className="bg-gray-100">Students</TableHead>
                <TableHead className="bg-gray-100">Status</TableHead>
                <TableHead className="bg-gray-100">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow
                  key={exam.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewExam(exam)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{exam.subject}</span>
                          {exam.isMyExam && (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              My Exam
                            </Badge>
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
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{exam.studentsCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(exam.status)}>
                      {exam.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewExam(exam);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="flex justify-between items-center p-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{exams.length}</span> exam(s)
          </div>
        </div>
      </CardContent>
    </Card>
  );

  ExamTable.propTypes = {
    exams: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
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
            View exam schedules and your supervision assignments
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Exams</p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {myExams.length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Exams</p>
                <p className="text-3xl font-bold text-blue-600">
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
                <p className="text-sm font-medium text-gray-600">Students</p>
                <p className="text-3xl font-bold text-green-600">
                  {myExams.reduce(
                    (total, exam) => total + exam.studentsCount,
                    0
                  )}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">My Exams</TabsTrigger>
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        {/* Filters */}
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

            <Select value={filterSubject} onValueChange={setFilterSubject}>
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
        </div>

        {/* My Exams View */}
        <TabsContent value="schedule" className="space-y-6">
          <ExamTable exams={myExams} title="My Supervision Schedule" />
        </TabsContent>

        {/* All Exams View */}
        <TabsContent value="all" className="space-y-6">
          <ExamTable exams={allExams} title="All Exam Schedules" />
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
                                  : exam.isMyExam
                                  ? "bg-green-100 text-green-800"
                                  : "bg-eduos-primary text-white"
                              }`}
                              onClick={() => handleViewExam(exam)}
                            >
                              <div className="font-medium truncate">
                                {exam.subject}
                              </div>
                              <div className="truncate">{exam.startTime}</div>
                              {exam.isMyExam && (
                                <div className="text-xs">★ Supervising</div>
                              )}
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
      </Tabs>

      {/* View Exam Dialog */}
      {selectedExam && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {selectedExam.subject} - {selectedExam.class}
                {selectedExam.isMyExam && (
                  <Badge className="bg-green-100 text-green-800">
                    My Supervision
                  </Badge>
                )}
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
                    {selectedExam.isMyExam && (
                      <Badge className="bg-green-100 text-green-800">
                        Supervising
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {selectedExam.isMyExam && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">
                      Supervisor Responsibilities
                    </span>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • Arrive at the venue 15 minutes before exam start time
                    </li>
                    <li>
                      • Ensure proper seating arrangement and verify student
                      identities
                    </li>
                    <li>
                      • Monitor students throughout the examination period
                    </li>
                    <li>• Collect answer sheets and materials at the end</li>
                    <li>• Submit completed attendance and report forms</li>
                  </ul>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
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

export default TeacherExamSchedules;
