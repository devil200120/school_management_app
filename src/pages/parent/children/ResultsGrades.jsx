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
  GraduationCap,
  User,
  Download,
  FileText,
  Star,
  Trophy,
  Calendar,
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Medal,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

const ResultsGrades = () => {
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedSession, setSelectedSession] = useState("2023-2024");
  const [selectedTerm, setSelectedTerm] = useState("1");

  // Mock data for children's results and grades
  const children = [
    {
      id: "1",
      name: "Sarah Johnson",
      class: "JSS 2A",
      admissionNo: "EDU2023001",
      profileImg: "/profile_photo.png",
      currentGPA: 3.8,
      classRank: 3,
      totalStudents: 45,
      sessions: {
        "2023-2024": {
          terms: {
            1: {
              name: "First Term 2023/2024",
              gpa: 3.8,
              position: 3,
              totalStudents: 45,
              status: "Completed",
              subjects: [
                {
                  name: "Mathematics",
                  score: 92,
                  grade: "A",
                  position: 2,
                  teacher: "Mr. Adebayo",
                  remarks: "Excellent performance",
                },
                {
                  name: "English Language",
                  score: 88,
                  grade: "B+",
                  position: 5,
                  teacher: "Mrs. Oluwaseun",
                  remarks: "Very good improvement",
                },
                {
                  name: "Physics",
                  score: 85,
                  grade: "A-",
                  position: 4,
                  teacher: "Dr. Emeka",
                  remarks: "Good understanding",
                },
                {
                  name: "Chemistry",
                  score: 82,
                  grade: "B",
                  position: 8,
                  teacher: "Mr. Taiwo",
                  remarks: "Needs more practice",
                },
                {
                  name: "Biology",
                  score: 90,
                  grade: "A",
                  position: 1,
                  teacher: "Mrs. Kemi",
                  remarks: "Outstanding work",
                },
                {
                  name: "Geography",
                  score: 87,
                  grade: "B+",
                  position: 3,
                  teacher: "Mr. John",
                  remarks: "Very good progress",
                },
              ],
              examDetails: {
                firstCA: 30,
                secondCA: 30,
                exam: 40,
                total: 100,
              },
              principalRemarks:
                "Sarah has shown excellent academic performance this term. She demonstrates strong analytical skills and good study habits.",
              teacherRemarks:
                "Sarah is a dedicated student who participates actively in class discussions. She shows great potential in sciences.",
              nextTermResumes: "2024-01-08",
            },
            2: {
              name: "Second Term 2023/2024",
              gpa: 3.9,
              position: 2,
              totalStudents: 45,
              status: "Completed",
              subjects: [
                {
                  name: "Mathematics",
                  score: 94,
                  grade: "A",
                  position: 1,
                  teacher: "Mr. Adebayo",
                  remarks: "Exceptional performance",
                },
                {
                  name: "English Language",
                  score: 90,
                  grade: "A-",
                  position: 3,
                  teacher: "Mrs. Oluwaseun",
                  remarks: "Significant improvement",
                },
                {
                  name: "Physics",
                  score: 88,
                  grade: "B+",
                  position: 3,
                  teacher: "Dr. Emeka",
                  remarks: "Steady progress",
                },
                {
                  name: "Chemistry",
                  score: 85,
                  grade: "A-",
                  position: 6,
                  teacher: "Mr. Taiwo",
                  remarks: "Good improvement",
                },
                {
                  name: "Biology",
                  score: 92,
                  grade: "A",
                  position: 1,
                  teacher: "Mrs. Kemi",
                  remarks: "Consistently excellent",
                },
                {
                  name: "Geography",
                  score: 89,
                  grade: "B+",
                  position: 2,
                  teacher: "Mr. John",
                  remarks: "Excellent understanding",
                },
              ],
            },
            3: {
              name: "Third Term 2023/2024",
              gpa: 3.7,
              position: 4,
              totalStudents: 45,
              status: "In Progress",
            },
          },
        },
      },
      achievements: [
        {
          title: "Best Student in Mathematics",
          term: "Second Term",
          year: "2023/2024",
        },
        {
          title: "Most Improved Student",
          term: "First Term",
          year: "2023/2024",
        },
        {
          title: "Science Quiz Champion",
          term: "First Term",
          year: "2023/2024",
        },
      ],
    },
    {
      id: "2",
      name: "Michael Johnson",
      class: "Primary 5B",
      admissionNo: "EDU2023002",
      profileImg: "/profile_photo.png",
      currentGPA: 3.2,
      classRank: 12,
      totalStudents: 38,
      sessions: {
        "2023-2024": {
          terms: {
            1: {
              name: "First Term 2023/2024",
              gpa: 3.2,
              position: 12,
              totalStudents: 38,
              status: "Completed",
              subjects: [
                {
                  name: "Mathematics",
                  score: 78,
                  grade: "B",
                  position: 15,
                  teacher: "Mrs. Funmi",
                  remarks: "Good effort",
                },
                {
                  name: "English Language",
                  score: 75,
                  grade: "B-",
                  position: 18,
                  teacher: "Mr. Segun",
                  remarks: "Needs improvement",
                },
                {
                  name: "Basic Science",
                  score: 83,
                  grade: "B+",
                  position: 8,
                  teacher: "Mrs. Bola",
                  remarks: "Very good performance",
                },
                {
                  name: "Social Studies",
                  score: 88,
                  grade: "B+",
                  position: 5,
                  teacher: "Mr. Ade",
                  remarks: "Excellent work",
                },
                {
                  name: "Creative Arts",
                  score: 92,
                  grade: "A",
                  position: 2,
                  teacher: "Mrs. Nike",
                  remarks: "Outstanding creativity",
                },
              ],
            },
          },
        },
      },
      achievements: [
        {
          title: "Art Competition Winner",
          term: "First Term",
          year: "2023/2024",
        },
        { title: "Best Handwriting", term: "First Term", year: "2023/2024" },
      ],
    },
  ];

  const sessions = [
    { value: "2023-2024", label: "2023/2024 Academic Session" },
    { value: "2022-2023", label: "2022/2023 Academic Session" },
  ];

  const terms = [
    { value: "1", label: "First Term" },
    { value: "2", label: "Second Term" },
    { value: "3", label: "Third Term" },
  ];

  const getSelectedChildData = () =>
    children.find((child) => child.id === selectedChild);

  const getGradeColor = (grade) => {
    if (grade.includes("A")) return "bg-green-100 text-green-800";
    if (grade.includes("B")) return "bg-blue-100 text-blue-800";
    if (grade.includes("C")) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getPositionSuffix = (position) => {
    const j = position % 10;
    const k = position % 100;
    if (j === 1 && k !== 11) return position + "st";
    if (j === 2 && k !== 12) return position + "nd";
    if (j === 3 && k !== 13) return position + "rd";
    return position + "th";
  };

  // Handle report card download
  const handleDownloadReportCard = async () => {
    try {
      toast.success("Generating report card...");

      const selectedChildData = getSelectedChildData();
      const termData =
        selectedChildData?.sessions?.[selectedSession]?.terms?.[selectedTerm];
      const sessionName =
        sessions.find((s) => s.value === selectedSession)?.label ||
        selectedSession;
      const termName =
        terms.find((t) => t.value === selectedTerm)?.label ||
        `Term ${selectedTerm}`;

      if (!termData) {
        toast.error("No data available for the selected term");
        return;
      }

      // Calculate overall statistics
      const subjects = termData.subjects || [];
      const totalMarks = subjects.reduce(
        (sum, subject) => sum + subject.score,
        0
      );
      const averageScore =
        subjects.length > 0 ? (totalMarks / subjects.length).toFixed(1) : 0;

      // Generate report card content
      const reportContent = `ACADEMIC REPORT CARD
=====================================

Student Information:
- Name: ${selectedChildData?.name || "N/A"}
- Class: ${selectedChildData?.class || "N/A"}
- Admission Number: ${selectedChildData?.admissionNo || "N/A"}
- Session: ${sessionName}
- Term: ${termName}

Academic Performance Summary:
- Overall Average: ${termData.gpa || "N/A"}
- Class Position: ${getPositionSuffix(termData.position || 0)} out of ${
        termData.totalStudents || 0
      } students
- Average Score: ${averageScore}%
- Status: ${termData.status || "N/A"}

Subject Breakdown:
=====================================
${subjects
  .map((subject) => {
    const percentage = ((subject.score / subject.total) * 100).toFixed(1);
    const performance =
      percentage >= 80
        ? "Excellent"
        : percentage >= 70
        ? "Very Good"
        : percentage >= 60
        ? "Good"
        : percentage >= 50
        ? "Fair"
        : "Poor";

    return `${subject.name}:
  Score: ${subject.score}/${subject.total} (${percentage}%)
  Grade: ${subject.grade}
  Performance: ${performance}
  Teacher: ${subject.teacher}
  Remarks: ${subject.remarks || "Good effort"}
  `;
  })
  .join("\n")}

Performance Analysis:
=====================================
Strengths:
${
  subjects
    .filter((s) => (s.score / s.total) * 100 >= 80)
    .map(
      (s) =>
        `✅ ${s.name} - ${s.grade} (${((s.score / s.total) * 100).toFixed(1)}%)`
    )
    .join("\n") || "- Work on improving performance across subjects"
}

Areas for Improvement:
${
  subjects
    .filter((s) => (s.score / s.total) * 100 < 60)
    .map(
      (s) =>
        `⚠️ ${s.name} - ${s.grade} (${((s.score / s.total) * 100).toFixed(1)}%)`
    )
    .join("\n") || "- Maintain current excellent performance"
}

Overall Assessment:
${
  termData.gpa >= 3.5
    ? "🏆 OUTSTANDING PERFORMANCE - Keep up the excellent work!"
    : termData.gpa >= 3.0
    ? "⭐ GOOD PERFORMANCE - Continue working hard!"
    : termData.gpa >= 2.5
    ? "📈 FAIR PERFORMANCE - More effort needed!"
    : "📚 NEEDS IMPROVEMENT - Please seek additional support"
}

Teacher's Comments:
"${
        termData.teacherComment ||
        "Continue to work hard and maintain good study habits. Well done!"
      }"

Next Term Expectations:
- Maintain current strengths
- Focus on improving weaker subjects
- Participate actively in class discussions
- Complete all assignments on time

Report Generated: ${new Date().toLocaleString()}
Generated by: School Management System - Parent Portal

END OF REPORT
=====================================`;

      // Create and download the file
      const blob = new Blob([reportContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedChildData?.name?.replace(
        /\s+/g,
        "_"
      )}_Report_Card_${selectedSession.replace("/", "-")}_${termName.replace(
        /\s+/g,
        "_"
      )}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Report card downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download report card. Please try again.");
    }
  };

  const selectedChildData = getSelectedChildData();
  const termData =
    selectedChildData?.sessions?.[selectedSession]?.terms?.[selectedTerm];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Modern Header with Gradient Background */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                    Results & Grades
                  </h1>
                  <p className="text-blue-100 mt-1 text-sm md:text-base">
                    Track academic performance and achievements
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200 w-full lg:w-auto"
                onClick={handleDownloadReportCard}
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download Report Card</span>
                <span className="sm:hidden">Download</span>
              </Button>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Enhanced Filters Section */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-indigo-600" />
              Filter Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Select Child
                </label>
                <Select value={selectedChild} onValueChange={setSelectedChild}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                    <SelectValue placeholder="Choose your child" />
                  </SelectTrigger>
                  <SelectContent>
                    {children.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        <div className="flex items-center gap-2 py-1">
                          <div className="p-1 bg-indigo-100 rounded-full">
                            <User className="h-3 w-3 text-indigo-600" />
                          </div>
                          <div>
                            <div className="font-medium">{child.name}</div>
                            <div className="text-xs text-gray-500">
                              {child.class}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Academic Session
                </label>
                <Select
                  value={selectedSession}
                  onValueChange={setSelectedSession}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                    <SelectValue placeholder="Choose session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((session) => (
                      <SelectItem key={session.value} value={session.value}>
                        {session.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <label className="text-sm font-medium text-gray-700">
                  Term
                </label>
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                    <SelectValue placeholder="Choose term" />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => (
                      <SelectItem key={term.value} value={term.value}>
                        {term.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedChildData && (
          <>
            {/* Enhanced Student Overview */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="flex items-center gap-2 relative z-10">
                  <Award className="h-5 w-5" />
                  Student Profile & Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  {/* Profile Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                    <div className="relative">
                      <img
                        src={selectedChildData.profileImg}
                        alt={selectedChildData.name}
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-blue-100"
                      />
                      <div className="absolute -bottom-2 -right-2 p-2 bg-green-500 text-white rounded-full shadow-lg">
                        <Medal className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                        {selectedChildData.name}
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600 justify-center sm:justify-start">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-medium">
                            Class: {selectedChildData.class}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 justify-center sm:justify-start">
                          <FileText className="h-4 w-4" />
                          <span>
                            Admission: {selectedChildData.admissionNo}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 md:p-6 rounded-2xl text-white text-center shadow-lg transform hover:scale-105 transition-transform">
                      <div className="p-2 bg-white/20 rounded-full inline-block mb-2">
                        <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold">
                        {selectedChildData.currentGPA}
                      </div>
                      <div className="text-blue-100 text-sm">
                        Current Average
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 md:p-6 rounded-2xl text-white text-center shadow-lg transform hover:scale-105 transition-transform">
                      <div className="p-2 bg-white/20 rounded-full inline-block mb-2">
                        <BarChart3 className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold">
                        {getPositionSuffix(selectedChildData.classRank)}
                      </div>
                      <div className="text-emerald-100 text-sm">Class Rank</div>
                      <div className="text-emerald-200 text-xs">
                        of {selectedChildData.totalStudents} students
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-purple-700">
                      {selectedChildData.achievements?.length || 0}
                    </div>
                    <div className="text-xs text-purple-600">Achievements</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-orange-700">
                      {Object.keys(selectedChildData.sessions).length}
                    </div>
                    <div className="text-xs text-orange-600">Sessions</div>
                  </div>
                  <div className="bg-gradient-to-r from-rose-100 to-rose-200 p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-rose-700">A+</div>
                    <div className="text-xs text-rose-600">Top Grade</div>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-100 to-cyan-200 p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-cyan-700">95%</div>
                    <div className="text-xs text-cyan-600">Attendance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Term Results */}
            {termData && (
              <>
                {/* Modern Term Overview */}
                <Card className="shadow-xl border-0 bg-white overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {termData.name} - Result Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Performance Cards Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-2xl border-l-4 border-blue-500 transform hover:scale-105 transition-transform">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-500 text-white rounded-lg">
                            <TrendingUp className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-2xl md:text-3xl font-bold text-blue-700">
                              {termData.gpa}
                            </div>
                            <div className="text-sm text-blue-600 font-medium">
                              Term Average
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 md:p-6 rounded-2xl border-l-4 border-emerald-500 transform hover:scale-105 transition-transform">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-emerald-500 text-white rounded-lg">
                            <Medal className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-2xl md:text-3xl font-bold text-emerald-700">
                              {getPositionSuffix(termData.position)}
                            </div>
                            <div className="text-sm text-emerald-600 font-medium">
                              Position
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-6 rounded-2xl border-l-4 border-purple-500 transform hover:scale-105 transition-transform">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-purple-500 text-white rounded-lg">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-2xl md:text-3xl font-bold text-purple-700">
                              {termData.totalStudents}
                            </div>
                            <div className="text-sm text-purple-600 font-medium">
                              Total Students
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-6 rounded-2xl border-l-4 border-orange-500 transform hover:scale-105 transition-transform">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-orange-500 text-white rounded-lg">
                            <Award className="h-4 w-4" />
                          </div>
                          <div>
                            <Badge
                              className={`text-sm font-semibold ${
                                termData.status === "Completed"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-yellow-100 text-yellow-800 border-yellow-200"
                              }`}
                            >
                              {termData.status}
                            </Badge>
                            <div className="text-sm text-orange-600 font-medium mt-1">
                              Status
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Subject Results */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-6">
                        <BookOpen className="h-5 w-5 text-indigo-600" />
                        <h4 className="font-bold text-xl text-gray-900">
                          Subject Performance
                        </h4>
                      </div>

                      {/* Mobile View - Cards */}
                      <div className="block lg:hidden space-y-4">
                        {termData.subjects.map((subject, index) => (
                          <Card
                            key={index}
                            className="shadow-md border-l-4 border-indigo-500"
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <h5 className="font-bold text-lg text-gray-900">
                                  {subject.name}
                                </h5>
                                <Badge
                                  className={`${getGradeColor(
                                    subject.grade
                                  )} text-sm font-bold`}
                                >
                                  {subject.grade}
                                </Badge>
                              </div>

                              <div className="space-y-3">
                                {/* Score with Progress Bar */}
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium">Score</span>
                                    <span className="font-bold text-lg">
                                      {subject.score}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                                      style={{ width: `${subject.score}%` }}
                                    ></div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">
                                      Position:
                                    </span>
                                    <span className="font-semibold ml-1">
                                      {getPositionSuffix(subject.position)}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">
                                      Teacher:
                                    </span>
                                    <span className="font-medium ml-1">
                                      {subject.teacher}
                                    </span>
                                  </div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <span className="text-gray-600 text-sm font-medium">
                                    Remarks:{" "}
                                  </span>
                                  <span className="text-gray-700 text-sm">
                                    {subject.remarks}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Desktop View - Table */}
                      <div className="hidden lg:block">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                  <th className="text-left p-4 font-bold">
                                    Subject
                                  </th>
                                  <th className="text-center p-4 font-bold">
                                    Score
                                  </th>
                                  <th className="text-center p-4 font-bold">
                                    Grade
                                  </th>
                                  <th className="text-center p-4 font-bold">
                                    Position
                                  </th>
                                  <th className="text-left p-4 font-bold">
                                    Teacher
                                  </th>
                                  <th className="text-left p-4 font-bold">
                                    Remarks
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {termData.subjects.map((subject, index) => (
                                  <tr
                                    key={index}
                                    className="hover:bg-indigo-50 transition-colors border-b"
                                  >
                                    <td className="p-4">
                                      <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100 rounded-lg">
                                          <BookOpen className="h-4 w-4 text-indigo-600" />
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                          {subject.name}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="flex flex-col items-center gap-2">
                                        <span className="font-bold text-lg">
                                          {subject.score}%
                                        </span>
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                          <div
                                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                                            style={{
                                              width: `${subject.score}%`,
                                            }}
                                          ></div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <Badge
                                        className={`${getGradeColor(
                                          subject.grade
                                        )} font-bold`}
                                      >
                                        {subject.grade}
                                      </Badge>
                                    </td>
                                    <td className="p-4 text-center font-bold text-lg">
                                      {getPositionSuffix(subject.position)}
                                    </td>
                                    <td className="p-4 font-medium">
                                      {subject.teacher}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600 max-w-xs">
                                      {subject.remarks}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Exam Structure */}
                    {termData.examDetails && (
                      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-0 shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-lg text-gray-900">
                            Assessment Structure
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white text-center shadow-md">
                              <div className="text-2xl font-bold">
                                {termData.examDetails.firstCA}%
                              </div>
                              <div className="text-blue-100 text-sm font-medium">
                                First CA
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-xl text-white text-center shadow-md">
                              <div className="text-2xl font-bold">
                                {termData.examDetails.secondCA}%
                              </div>
                              <div className="text-emerald-100 text-sm font-medium">
                                Second CA
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white text-center shadow-md">
                              <div className="text-2xl font-bold">
                                {termData.examDetails.exam}%
                              </div>
                              <div className="text-purple-100 text-sm font-medium">
                                Final Exam
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-xl text-white text-center shadow-md">
                              <div className="text-2xl font-bold">
                                {termData.examDetails.total}%
                              </div>
                              <div className="text-gray-200 text-sm font-medium">
                                Total
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Enhanced Comments Section */}
                    {(termData.teacherRemarks || termData.principalRemarks) && (
                      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-indigo-600" />
                            Teacher&apos;s and Principal&apos;s Comments
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {termData.teacherRemarks && (
                            <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-md">
                              <h5 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Class Teacher&apos;s Remarks:
                              </h5>
                              <p className="text-gray-700 leading-relaxed">
                                {termData.teacherRemarks}
                              </p>
                            </div>
                          )}
                          {termData.principalRemarks && (
                            <div className="bg-white p-4 rounded-xl border-l-4 border-emerald-500 shadow-md">
                              <h5 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                Principal&apos;s Remarks:
                              </h5>
                              <p className="text-gray-700 leading-relaxed">
                                {termData.principalRemarks}
                              </p>
                            </div>
                          )}
                          {termData.nextTermResumes && (
                            <div className="bg-white p-4 rounded-xl border-l-4 border-purple-500 shadow-md">
                              <div className="flex items-center gap-2 text-purple-700">
                                <Calendar className="h-4 w-4" />
                                <span className="font-semibold">
                                  Next term resumes:
                                </span>
                                <span className="font-bold">
                                  {new Date(
                                    termData.nextTermResumes
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {/* Enhanced Achievements Section */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Academic Achievements & Awards
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedChildData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="group bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-200 hover:border-yellow-400 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-20 -translate-y-10 translate-x-10"></div>

                      <div className="relative z-10">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl shadow-lg">
                            <Star className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-orange-600 transition-colors">
                              {achievement.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <p className="text-sm text-gray-600 font-medium">
                                {achievement.term}, {achievement.year}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Achievement Badge */}
                        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-3 rounded-lg border border-yellow-200">
                          <div className="flex items-center justify-center gap-2 text-orange-700">
                            <Medal className="h-4 w-4" />
                            <span className="text-sm font-bold">
                              Excellence Award
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Achievement Placeholder */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center min-h-[200px] group hover:border-indigo-400 transition-colors">
                    <div className="p-4 bg-gray-200 group-hover:bg-indigo-100 rounded-full transition-colors">
                      <Trophy className="h-8 w-8 text-gray-400 group-hover:text-indigo-500" />
                    </div>
                    <h4 className="font-semibold text-gray-500 mt-3">
                      More Achievements Coming
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Keep up the great work!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultsGrades;
