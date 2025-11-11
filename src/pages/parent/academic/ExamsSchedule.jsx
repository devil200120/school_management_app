import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Calendar,
  Clock,
  User,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
  BookOpen,
  MapPin,
  Bell,
} from "lucide-react";

const ExamsSchedule = () => {
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedExam, setSelectedExam] = useState("current");

  // Mock data for exam schedules
  const examSchedules = {
    1: {
      // Sarah Johnson - JSS 2A
      name: "Sarah Johnson",
      class: "JSS 2A",
      exams: {
        current: {
          name: "First Term Examination 2024/2025",
          period: "November 18 - November 29, 2024",
          status: "upcoming",
          subjects: [
            {
              subject: "Mathematics",
              date: "2024-11-18",
              time: "09:00 AM - 11:00 AM",
              duration: "2 hours",
              venue: "Exam Hall A",
              topics: [
                "Quadratic Equations",
                "Simultaneous Equations",
                "Inequalities",
              ],
              instructions: "Bring mathematical instruments and calculator",
            },
            {
              subject: "English Language",
              date: "2024-11-19",
              time: "09:00 AM - 11:30 AM",
              duration: "2.5 hours",
              venue: "Exam Hall B",
              topics: ["Comprehension", "Essay Writing", "Grammar"],
              instructions: "Dictionary not allowed",
            },
            {
              subject: "Physics",
              date: "2024-11-20",
              time: "09:00 AM - 11:00 AM",
              duration: "2 hours",
              venue: "Physics Lab",
              topics: ["Motion", "Force and Energy", "Waves"],
              instructions: "Calculator allowed, no phones",
            },
            {
              subject: "Chemistry",
              date: "2024-11-21",
              time: "09:00 AM - 11:00 AM",
              duration: "2 hours",
              venue: "Chemistry Lab",
              topics: [
                "Atomic Structure",
                "Chemical Bonding",
                "Acids and Bases",
              ],
              instructions: "Periodic table will be provided",
            },
            {
              subject: "Biology",
              date: "2024-11-22",
              time: "09:00 AM - 11:00 AM",
              duration: "2 hours",
              venue: "Biology Lab",
              topics: [
                "Cell Biology",
                "Plant and Animal Nutrition",
                "Reproduction",
              ],
              instructions: "Diagrams must be properly labeled",
            },
            {
              subject: "Geography",
              date: "2024-11-25",
              time: "09:00 AM - 11:00 AM",
              duration: "2 hours",
              venue: "Exam Hall A",
              topics: ["Weather and Climate", "Map Reading", "Agriculture"],
              instructions: "Atlas will be provided",
            },
            {
              subject: "History",
              date: "2024-11-26",
              time: "09:00 AM - 10:30 AM",
              duration: "1.5 hours",
              venue: "Exam Hall B",
              topics: [
                "Pre-colonial Nigeria",
                "Colonial Administration",
                "Independence",
              ],
              instructions: "Write legibly",
            },
            {
              subject: "Computer Studies",
              date: "2024-11-27",
              time: "09:00 AM - 10:30 AM",
              duration: "1.5 hours",
              venue: "ICT Lab",
              topics: [
                "Computer Hardware",
                "Software Applications",
                "Internet",
              ],
              instructions: "Practical and theory components",
            },
          ],
        },
        previous: {
          name: "Third Term Examination 2023/2024",
          period: "July 8 - July 19, 2024",
          status: "completed",
          subjects: [
            {
              subject: "Mathematics",
              date: "2024-07-08",
              time: "09:00 AM - 11:00 AM",
              duration: "2 hours",
              venue: "Exam Hall A",
              grade: "A",
              score: "92/100",
            },
            {
              subject: "English Language",
              date: "2024-07-09",
              time: "09:00 AM - 11:30 AM",
              duration: "2.5 hours",
              venue: "Exam Hall B",
              grade: "B+",
              score: "88/100",
            },
            // More subjects...
          ],
        },
      },
    },
    2: {
      // Michael Johnson - Primary 5B
      name: "Michael Johnson",
      class: "Primary 5B",
      exams: {
        current: {
          name: "First Term Examination 2024/2025",
          period: "November 20 - November 27, 2024",
          status: "upcoming",
          subjects: [
            {
              subject: "Mathematics",
              date: "2024-11-20",
              time: "10:00 AM - 11:30 AM",
              duration: "1.5 hours",
              venue: "Primary Exam Hall",
              topics: ["Multiplication", "Division", "Fractions"],
              instructions: "No calculator allowed",
            },
            {
              subject: "English Language",
              date: "2024-11-21",
              time: "10:00 AM - 11:30 AM",
              duration: "1.5 hours",
              venue: "Primary Exam Hall",
              topics: ["Reading Comprehension", "Composition", "Grammar"],
              instructions: "Write neatly",
            },
            {
              subject: "Basic Science",
              date: "2024-11-22",
              time: "10:00 AM - 11:00 AM",
              duration: "1 hour",
              venue: "Science Corner",
              topics: ["Living and Non-living Things", "Plants", "Animals"],
              instructions: "Study your notes well",
            },
            {
              subject: "Social Studies",
              date: "2024-11-25",
              time: "10:00 AM - 11:00 AM",
              duration: "1 hour",
              venue: "Primary Exam Hall",
              topics: ["Family", "Community", "Nigerian Culture"],
              instructions: "Answer all questions",
            },
            {
              subject: "Creative Arts",
              date: "2024-11-26",
              time: "10:00 AM - 11:00 AM",
              duration: "1 hour",
              venue: "Art Room",
              topics: ["Drawing", "Painting", "Craft Making"],
              instructions: "Bring art materials",
            },
            {
              subject: "Computer Studies",
              date: "2024-11-27",
              time: "10:00 AM - 11:00 AM",
              duration: "1 hour",
              venue: "Computer Lab",
              topics: [
                "Parts of Computer",
                "Uses of Computer",
                "Computer Safety",
              ],
              instructions: "Practical session included",
            },
          ],
        },
      },
    },
  };

  const children = [
    { id: "1", name: "Sarah Johnson", class: "JSS 2A" },
    { id: "2", name: "Michael Johnson", class: "Primary 5B" },
  ];

  const examPeriods = [
    { value: "current", label: "Upcoming Exams" },
    { value: "previous", label: "Previous Results" },
  ];

  const selectedChildData = examSchedules[selectedChild];
  const examData = selectedChildData?.exams?.[selectedExam];

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            Upcoming
          </Badge>
        );
      case "ongoing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Ongoing
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDaysUntilExam = (examDate) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUpcomingExams = () => {
    if (!examData?.subjects) return [];
    return examData.subjects
      .filter((subject) => {
        const examDate = new Date(subject.date);
        const today = new Date();
        return examDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  };

  const upcomingExams = getUpcomingExams();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exams Schedule</h1>
          <p className="text-gray-600 mt-1">
            View examination timetables and preparation guidelines
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Schedule
        </Button>
      </div>

      {/* Quick Alert for Upcoming Exams */}
      {upcomingExams.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Bell className="h-5 w-5" />
              Upcoming Exams Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingExams.map((exam, index) => {
                const daysLeft = getDaysUntilExam(exam.date);
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{exam.subject}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        {new Date(exam.date).toLocaleDateString()} at{" "}
                        {exam.time}
                      </span>
                    </div>
                    <Badge
                      className={
                        daysLeft <= 3
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {daysLeft === 0
                        ? "Today"
                        : daysLeft === 1
                        ? "Tomorrow"
                        : `${daysLeft} days left`}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Child</label>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your child" />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {child.name} - {child.class}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Exam Period</label>
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger>
              <SelectValue placeholder="Choose exam period" />
            </SelectTrigger>
            <SelectContent>
              {examPeriods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedChildData && examData && (
        <>
          {/* Exam Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {examData.name}
                </div>
                {getStatusBadge(examData.status)}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {selectedChildData.name} - {selectedChildData.class}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {examData.period}
                </span>
              </div>
            </CardHeader>
          </Card>

          {/* Exam Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Examination Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examData.subjects.map((exam, index) => {
                  const daysUntilExam = getDaysUntilExam(exam.date);
                  const isToday = daysUntilExam === 0;
                  const isUpcoming =
                    daysUntilExam > 0 && examData.status === "upcoming";

                  return (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 transition-all ${
                        isToday
                          ? "border-red-300 bg-red-50"
                          : isUpcoming && daysUntilExam <= 3
                          ? "border-orange-300 bg-orange-50"
                          : "hover:shadow-md"
                      }`}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Subject and Basic Info */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-blue-500" />
                              {exam.subject}
                            </h3>
                            {examData.status === "upcoming" && (
                              <Badge
                                className={
                                  isToday
                                    ? "bg-red-100 text-red-800"
                                    : daysUntilExam <= 3
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-blue-100 text-blue-800"
                                }
                              >
                                {isToday
                                  ? "Today"
                                  : daysUntilExam === 1
                                  ? "Tomorrow"
                                  : `${daysUntilExam} days`}
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(exam.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {exam.time} ({exam.duration})
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {exam.venue}
                            </div>
                          </div>
                        </div>

                        {/* Topics/Results */}
                        <div className="space-y-2">
                          {examData.status === "upcoming" && exam.topics ? (
                            <>
                              <h4 className="font-medium text-gray-900">
                                Topics to Study:
                              </h4>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {exam.topics.map((topic, topicIndex) => (
                                  <li
                                    key={topicIndex}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : examData.status === "completed" && exam.grade ? (
                            <>
                              <h4 className="font-medium text-gray-900">
                                Results:
                              </h4>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">Grade:</span>
                                  <Badge className="bg-green-100 text-green-800">
                                    {exam.grade}
                                  </Badge>
                                </div>
                                <div className="text-sm">
                                  Score: {exam.score}
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>

                        {/* Instructions */}
                        <div className="space-y-2">
                          {exam.instructions && (
                            <>
                              <h4 className="font-medium text-gray-900">
                                Instructions:
                              </h4>
                              <p className="text-sm text-gray-700 italic">
                                {exam.instructions}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Exam Guidelines */}
          {examData.status === "upcoming" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Examination Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-800">
                      What to Bring:
                    </h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Valid student ID card</li>
                      <li>• Blue or black pens (at least 2)</li>
                      <li>• Pencils and eraser</li>
                      <li>• Ruler and mathematical instruments</li>
                      <li>• Calculator (where permitted)</li>
                      <li>• Water bottle</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-800">
                      What NOT to Bring:
                    </h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Mobile phones or smart devices</li>
                      <li>• Unauthorized materials or notes</li>
                      <li>• Food items (except water)</li>
                      <li>• Bags (only clear pouches allowed)</li>
                      <li>• Any electronic devices</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-800">
                    Important Reminders:
                  </h4>
                  <ul className="text-sm space-y-1 text-blue-700">
                    <li>• Arrive at least 15 minutes before exam time</li>
                    <li>• Late arrivals may not be admitted</li>
                    <li>• Follow all examination rules and regulations</li>
                    <li>
                      • Any form of malpractice will result in disqualification
                    </li>
                    <li>
                      • Results will be released within 2 weeks after completion
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {!examData && selectedChildData && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No exam schedule found
            </h3>
            <p className="text-gray-600">
              No examination schedule available for {selectedChildData.name} in
              the selected period.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExamsSchedule;
