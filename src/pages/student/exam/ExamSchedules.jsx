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
  Clock,
  MapPin,
  BookOpen,
  GraduationCap,
  FileText,
  Eye,
  CalendarDays,
  AlertCircle,
  Users,
  Timer,
  Download,
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

const StudentExamSchedules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [activeTab, setActiveTab] = useState("schedule");

  // Mock exam schedules data for current student's class
  const [examSchedules] = useState([
    {
      id: 1,
      subject: "Mathematics",
      class: "Grade 10A", // Student's class
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
      totalMarks: "100",
      status: "scheduled",
      studentsCount: 32,
      syllabus: "Chapters 1-5: Algebra, Geometry, Trigonometry",
      preparationTips:
        "Review practice problems from textbook. Focus on word problems and geometric proofs.",
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
      totalMarks: "100",
      status: "scheduled",
      studentsCount: 32,
      syllabus: "Shakespeare's Romeo and Juliet, Poetry analysis",
      preparationTips:
        "Practice essay writing. Review character analysis and themes.",
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
      totalMarks: "80",
      status: "scheduled",
      studentsCount: 28,
      syllabus: "Cell structure, Photosynthesis, Human anatomy",
      preparationTips:
        "Review lab procedures and safety protocols. Practice diagram labeling.",
    },
    {
      id: 4,
      subject: "Chemistry",
      class: "Grade 10A",
      date: "2024-12-17",
      startTime: "11:00",
      endTime: "12:30",
      duration: "90 minutes",
      venue: "Science Lab A",
      examType: "Mid-term Exam",
      supervisor: "Dr. Johnson",
      instructions:
        "Theoretical and practical questions. Show all calculations clearly.",
      materials: "Calculator, Periodic table (provided), Lab equipment",
      totalMarks: "80",
      status: "scheduled",
      studentsCount: 28,
      syllabus: "Atomic structure, Chemical bonding, Acids and bases",
      preparationTips:
        "Memorize periodic table trends. Practice chemical equations and calculations.",
    },
    {
      id: 5,
      subject: "History",
      class: "Grade 10A",
      date: "2024-12-18",
      startTime: "10:00",
      endTime: "12:00",
      duration: "120 minutes",
      venue: "Classroom 105",
      examType: "Mid-term Exam",
      supervisor: "Ms. Garcia",
      instructions: "Open book exam. Bring your textbooks and notes.",
      materials: "Textbooks, Notes, Pens",
      totalMarks: "100",
      status: "scheduled",
      studentsCount: 25,
      syllabus: "World War I & II, Independence movements",
      preparationTips:
        "Organize your notes by topics. Practice timeline questions.",
    },
  ]);

  // Mock subjects for this student's class
  const subjects = [
    "Mathematics",
    "English Literature",
    "Biology",
    "Chemistry",
    "Physics",
    "History",
    "Geography",
  ];

  // Filter exams
  const filteredExams = examSchedules.filter((exam) => {
    const matchesSearch =
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || exam.status === filterStatus;
    const matchesSubject =
      filterSubject === "all" || exam.subject === filterSubject;

    return matchesSearch && matchesStatus && matchesSubject;
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

  // Get urgency badge
  const getUrgencyBadge = (examDate) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return (
        <Badge variant="destructive" className="text-xs">
          Tomorrow
        </Badge>
      );
    } else if (diffDays <= 3) {
      return (
        <Badge
          variant="outline"
          className="text-xs border-yellow-500 text-yellow-700"
        >
          In {diffDays} days
        </Badge>
      );
    } else if (diffDays <= 7) {
      return (
        <Badge variant="outline" className="text-xs">
          Next week
        </Badge>
      );
    }
    return null;
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

  const handleDownloadSchedule = () => {
    // Mock download functionality
    const blob = new Blob(
      [
        `Exam Schedule for Grade 10A\n\n${examSchedules
          .map(
            (exam) =>
              `${exam.subject} - ${exam.date} at ${exam.startTime} (${exam.venue})`
          )
          .join("\n")}`,
      ],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exam-schedule.txt";
    a.click();
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-eduos-primary animate-fade-in">
            My Exam Schedule
          </h1>
          <p className="text-gray-600 mt-1">
            View your upcoming exams and preparation guidelines
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleDownloadSchedule}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Schedule
        </Button>
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
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
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
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-orange-600">
                  {
                    examSchedules.filter((exam) => {
                      const today = new Date();
                      const examDate = new Date(exam.date);
                      const diffTime = examDate.getTime() - today.getTime();
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                      return diffDays <= 7 && diffDays >= 0;
                    }).length
                  }
                </p>
              </div>
              <Timer className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-3xl font-bold text-green-600">
                  {examSchedules
                    .reduce((total, exam) => {
                      const duration = parseInt(exam.duration.match(/\d+/)[0]);
                      return total + duration / 60;
                    }, 0)
                    .toFixed(1)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Exams Alert */}
      {examSchedules.some((exam) => {
        const today = new Date();
        const examDate = new Date(exam.date);
        const diffTime = examDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3 && diffDays >= 0;
      }) && (
        <Card className="border-l-4 border-l-orange-500 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span className="font-medium text-orange-800">
                Upcoming Exams This Week
              </span>
            </div>
            <div className="space-y-1">
              {examSchedules
                .filter((exam) => {
                  const today = new Date();
                  const examDate = new Date(exam.date);
                  const diffTime = examDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 3 && diffDays >= 0;
                })
                .map((exam, index) => (
                  <div key={index} className="text-sm text-orange-700">
                    <strong>{exam.subject}</strong> on {exam.date} at{" "}
                    {exam.startTime} - {exam.venue}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="schedule">Schedule View</TabsTrigger>
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

        {/* Schedule View */}
        <TabsContent value="schedule" className="space-y-6">
          <Card className="animate-fade-in delay-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                My Exam Schedule (
                {
                  filteredExams.filter((e) => e.status === "scheduled").length
                }{" "}
                upcoming)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Exams Table */}
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-gray-100">Subject</TableHead>
                      <TableHead className="bg-gray-100">Date & Time</TableHead>
                      <TableHead className="bg-gray-100">Venue</TableHead>
                      <TableHead className="bg-gray-100">Duration</TableHead>
                      <TableHead className="bg-gray-100">Status</TableHead>
                      <TableHead className="bg-gray-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExams.map((exam) => (
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
                                <span className="font-medium">
                                  {exam.subject}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {exam.examType}
                                </Badge>
                                {getUrgencyBadge(exam.date)}
                              </div>
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
                            <Timer className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{exam.duration}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {exam.totalMarks} marks
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
                            ? "bg-red-50 border-red-200"
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
                                  : "bg-red-500 text-white"
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
      </Tabs>

      {/* View Exam Dialog */}
      {selectedExam && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {selectedExam.subject} Exam Details
                {getUrgencyBadge(selectedExam.date)}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Exam Details
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Subject:</strong> {selectedExam.subject}
                      </div>
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
                      <div>
                        <strong>Total Marks:</strong> {selectedExam.totalMarks}
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
                        <strong>Class:</strong> {selectedExam.class}
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
                    Exam Instructions
                  </h4>
                  <div className="text-sm text-gray-700 whitespace-pre-line bg-yellow-50 p-3 rounded border">
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
                  <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded border">
                    {selectedExam.materials}
                  </div>
                </CardContent>
              </Card>

              {/* Syllabus */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Exam Syllabus
                  </h4>
                  <div className="text-sm text-gray-700">
                    {selectedExam.syllabus}
                  </div>
                </CardContent>
              </Card>

              {/* Preparation Tips */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Preparation Tips
                  </h4>
                  <div className="text-sm text-gray-700 bg-green-50 p-3 rounded border">
                    {selectedExam.preparationTips}
                  </div>
                </CardContent>
              </Card>

              {/* Status */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Status</h4>
                  <Badge className={getStatusBadgeColor(selectedExam.status)}>
                    {selectedExam.status}
                  </Badge>
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
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StudentExamSchedules;
