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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  User,
  Calendar,
  BookOpen,
  Award,
  BarChart3,
  Download,
  GraduationCap,
  Target,
  Star,
  Activity,
  Trophy,
} from "lucide-react";

const AcademicProgress = () => {
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedTerm, setSelectedTerm] = useState("current");

  // Mock data for children's academic progress
  const children = [
    {
      id: "1",
      name: "Sarah Johnson",
      class: "JSS 2A",
      admissionNo: "EDU2023001",
      profileImg: "/profile_photo.png",
      currentGPA: 3.8,
      previousGPA: 3.6,
      subjects: [
        {
          name: "Mathematics",
          currentGrade: "A",
          percentage: 92,
          trend: "up",
          improvement: "+8%",
        },
        {
          name: "English Language",
          currentGrade: "B+",
          percentage: 88,
          trend: "up",
          improvement: "+5%",
        },
        {
          name: "Physics",
          currentGrade: "A-",
          percentage: 85,
          trend: "down",
          improvement: "-2%",
        },
        {
          name: "Chemistry",
          currentGrade: "B",
          percentage: 82,
          trend: "up",
          improvement: "+12%",
        },
        {
          name: "Biology",
          currentGrade: "A",
          percentage: 90,
          trend: "stable",
          improvement: "0%",
        },
        {
          name: "Geography",
          currentGrade: "B+",
          percentage: 87,
          trend: "up",
          improvement: "+7%",
        },
      ],
      // Historical performance data for charts
      progressHistory: [
        { month: "Sep", gpa: 3.2, attendance: 92 },
        { month: "Oct", gpa: 3.4, attendance: 94 },
        { month: "Nov", gpa: 3.6, attendance: 96 },
        { month: "Dec", gpa: 3.7, attendance: 93 },
        { month: "Jan", gpa: 3.8, attendance: 98 },
      ],
      subjectRadarData: [
        { subject: "Math", score: 92, fullMark: 100 },
        { subject: "English", score: 88, fullMark: 100 },
        { subject: "Physics", score: 85, fullMark: 100 },
        { subject: "Chemistry", score: 82, fullMark: 100 },
        { subject: "Biology", score: 90, fullMark: 100 },
        { subject: "Geography", score: 87, fullMark: 100 },
      ],
      gradeDistribution: [
        { name: "A Grades", value: 3, color: "#10B981" },
        { name: "B Grades", value: 3, color: "#3B82F6" },
        { name: "C Grades", value: 0, color: "#F59E0B" },
        { name: "D Grades", value: 0, color: "#EF4444" },
      ],
      weeklyStudyHours: [
        { day: "Mon", hours: 3 },
        { day: "Tue", hours: 4 },
        { day: "Wed", hours: 2.5 },
        { day: "Thu", hours: 3.5 },
        { day: "Fri", hours: 2 },
        { day: "Sat", hours: 5 },
        { day: "Sun", hours: 4 },
      ],
      achievements: [
        {
          title: "Best Student in Mathematics",
          date: "2024-10-15",
          type: "academic",
        },
        {
          title: "Science Quiz Winner",
          date: "2024-09-20",
          type: "competition",
        },
        { title: "Perfect Attendance", date: "2024-08-30", type: "attendance" },
      ],
      termProgress: {
        current: {
          term: "First Term 2024",
          percentage: 78,
          status: "In Progress",
        },
        previous: {
          term: "Third Term 2023",
          percentage: 82,
          status: "Completed",
        },
      },
    },
    {
      id: "2",
      name: "Michael Johnson",
      class: "Primary 5B",
      admissionNo: "EDU2023002",
      profileImg: "/profile_photo.png",
      currentGPA: 3.2,
      previousGPA: 3.0,
      subjects: [
        {
          name: "Mathematics",
          currentGrade: "B",
          percentage: 78,
          trend: "up",
          improvement: "+10%",
        },
        {
          name: "English Language",
          currentGrade: "B-",
          percentage: 75,
          trend: "up",
          improvement: "+3%",
        },
        {
          name: "Science",
          currentGrade: "B+",
          percentage: 83,
          trend: "up",
          improvement: "+15%",
        },
        {
          name: "Social Studies",
          currentGrade: "A-",
          percentage: 88,
          trend: "stable",
          improvement: "0%",
        },
        {
          name: "Creative Arts",
          currentGrade: "A",
          percentage: 92,
          trend: "up",
          improvement: "+5%",
        },
      ],
      // Historical performance data for charts
      progressHistory: [
        { month: "Sep", gpa: 2.8, attendance: 88 },
        { month: "Oct", gpa: 2.9, attendance: 90 },
        { month: "Nov", gpa: 3.0, attendance: 92 },
        { month: "Dec", gpa: 3.1, attendance: 94 },
        { month: "Jan", gpa: 3.2, attendance: 96 },
      ],
      subjectRadarData: [
        { subject: "Math", score: 78, fullMark: 100 },
        { subject: "English", score: 75, fullMark: 100 },
        { subject: "Science", score: 83, fullMark: 100 },
        { subject: "Social St.", score: 88, fullMark: 100 },
        { subject: "Arts", score: 92, fullMark: 100 },
      ],
      gradeDistribution: [
        { name: "A Grades", value: 2, color: "#10B981" },
        { name: "B Grades", value: 3, color: "#3B82F6" },
        { name: "C Grades", value: 0, color: "#F59E0B" },
        { name: "D Grades", value: 0, color: "#EF4444" },
      ],
      weeklyStudyHours: [
        { day: "Mon", hours: 2 },
        { day: "Tue", hours: 2.5 },
        { day: "Wed", hours: 1.5 },
        { day: "Thu", hours: 2 },
        { day: "Fri", hours: 1 },
        { day: "Sat", hours: 3 },
        { day: "Sun", hours: 2 },
      ],
      achievements: [
        { title: "Art Competition Winner", date: "2024-11-01", type: "art" },
        {
          title: "Most Improved Student",
          date: "2024-10-10",
          type: "improvement",
        },
      ],
      termProgress: {
        current: {
          term: "First Term 2024",
          percentage: 72,
          status: "In Progress",
        },
        previous: {
          term: "Third Term 2023",
          percentage: 68,
          status: "Completed",
        },
      },
    },
  ];

  const getSelectedChildData = () =>
    children.find((child) => child.id === selectedChild);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getGradeColor = (grade) => {
    if (grade.includes("A")) return "bg-green-100 text-green-800";
    if (grade.includes("B")) return "bg-blue-100 text-blue-800";
    if (grade.includes("C")) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const selectedChildData = getSelectedChildData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Academic Progress
          </h1>
          <p className="text-gray-600 mt-1">
            Track your child&apos;s academic performance and growth
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Child and Term Selection */}
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
          <label className="text-sm font-medium">Select Term</label>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger>
              <SelectValue placeholder="Choose term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Term</SelectItem>
              <SelectItem value="previous">Previous Term</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedChildData && (
        <>
          {/* Student Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Student Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={selectedChildData.profileImg}
                  alt={selectedChildData.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {selectedChildData.name}
                  </h3>
                  <p className="text-gray-600">
                    Class: {selectedChildData.class}
                  </p>
                  <p className="text-gray-600">
                    Admission No: {selectedChildData.admissionNo}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedChildData.currentGPA}
                  </div>
                  <div className="text-sm text-gray-600">Current Average</div>
                  <div className="flex items-center gap-1 mt-1">
                    {selectedChildData.currentGPA >
                    selectedChildData.previousGPA ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        selectedChildData.currentGPA >
                        selectedChildData.previousGPA
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {selectedChildData.currentGPA >
                      selectedChildData.previousGPA
                        ? "+"
                        : ""}
                      {(
                        selectedChildData.currentGPA -
                        selectedChildData.previousGPA
                      ).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Term Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Current Term Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{selectedChildData.termProgress.current.term}</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {selectedChildData.termProgress.current.status}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${selectedChildData.termProgress.current.percentage}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      {selectedChildData.termProgress.current.percentage}%
                      Complete
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Previous Term</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        {selectedChildData.termProgress.previous.term}
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        {selectedChildData.termProgress.previous.status}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${selectedChildData.termProgress.previous.percentage}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      {selectedChildData.termProgress.previous.percentage}%
                      Complete
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedChildData.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold">{subject.name}</h4>
                      <Badge className={getGradeColor(subject.currentGrade)}>
                        {subject.currentGrade}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Score</span>
                          <span className="font-medium">
                            {subject.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${subject.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Improvement
                        </span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(subject.trend)}
                          <span
                            className={`text-sm ${getTrendColor(
                              subject.trend
                            )}`}
                          >
                            {subject.improvement}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Academic Progress Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Progress Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={selectedChildData.progressHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 4]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="gpa"
                      stroke="#3B82F6"
                      fill="url(#colorGPA)"
                      strokeWidth={3}
                    />
                    <defs>
                      <linearGradient id="colorGPA" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subject Skills Radar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Subject Skills Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={selectedChildData.subjectRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Grade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={selectedChildData.gradeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {selectedChildData.gradeDistribution.map(
                        (entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Study Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Weekly Study Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedChildData.weeklyStudyHours}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#8884d8" radius={[4, 4, 0, 0]}>
                      {selectedChildData.weeklyStudyHours.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`hsl(${220 + index * 20}, 70%, 60%)`}
                          />
                        )
                      )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Performance Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Strengths */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Strengths</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-green-700">
                    {selectedChildData.subjects
                      .filter((s) => s.percentage >= 85)
                      .map((subject, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Excellent in {subject.name} ({subject.percentage}%)
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-800">
                      Areas to Improve
                    </h4>
                  </div>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    {selectedChildData.subjects
                      .filter((s) => s.percentage < 85)
                      .map((subject, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Focus on {subject.name} ({subject.percentage}%)
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">
                      Recommendations
                    </h4>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Increase study time by 30 minutes daily
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Request extra help in weaker subjects
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Join study groups for peer learning
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedChildData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                  >
                    <div className="p-3 bg-yellow-100 rounded-full">
                      {achievement.type === "academic" && (
                        <Star className="h-6 w-6 text-yellow-600" />
                      )}
                      {achievement.type === "competition" && (
                        <Target className="h-6 w-6 text-blue-600" />
                      )}
                      {achievement.type === "attendance" && (
                        <Calendar className="h-6 w-6 text-green-600" />
                      )}
                      {achievement.type === "art" && (
                        <Award className="h-6 w-6 text-purple-600" />
                      )}
                      {achievement.type === "improvement" && (
                        <TrendingUp className="h-6 w-6 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">
                        Achieved on{" "}
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {achievement.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AcademicProgress;
