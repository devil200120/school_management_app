import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Target,
  Download,
  Filter,
} from "lucide-react";

const ReportCardInsights = () => {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedTerm, setSelectedTerm] = useState("first-term");
  const [selectedSession, setSelectedSession] = useState("2024-2025");

  // Mock data for insights
  const classPerformanceData = [
    {
      class: "JSS 1",
      averageScore: 78,
      totalStudents: 45,
      excellence: 12,
      credit: 20,
      pass: 10,
      fail: 3,
    },
    {
      class: "JSS 2",
      averageScore: 72,
      totalStudents: 42,
      excellence: 8,
      credit: 18,
      pass: 14,
      fail: 2,
    },
    {
      class: "JSS 3",
      averageScore: 76,
      totalStudents: 38,
      excellence: 10,
      credit: 16,
      pass: 10,
      fail: 2,
    },
    {
      class: "SSS 1",
      averageScore: 69,
      totalStudents: 35,
      excellence: 5,
      credit: 15,
      pass: 12,
      fail: 3,
    },
    {
      class: "SSS 2",
      averageScore: 74,
      totalStudents: 32,
      excellence: 7,
      credit: 14,
      pass: 9,
      fail: 2,
    },
    {
      class: "SSS 3",
      averageScore: 81,
      totalStudents: 28,
      excellence: 12,
      credit: 10,
      pass: 5,
      fail: 1,
    },
  ];

  const subjectPerformanceData = [
    {
      subject: "Mathematics",
      averageScore: 72,
      difficulty: "High",
      passRate: 68,
    },
    {
      subject: "English",
      averageScore: 78,
      difficulty: "Medium",
      passRate: 82,
    },
    { subject: "Physics", averageScore: 69, difficulty: "High", passRate: 65 },
    {
      subject: "Chemistry",
      averageScore: 71,
      difficulty: "High",
      passRate: 67,
    },
    {
      subject: "Biology",
      averageScore: 75,
      difficulty: "Medium",
      passRate: 78,
    },
    { subject: "History", averageScore: 79, difficulty: "Low", passRate: 85 },
    {
      subject: "Geography",
      averageScore: 77,
      difficulty: "Medium",
      passRate: 80,
    },
    {
      subject: "Economics",
      averageScore: 73,
      difficulty: "Medium",
      passRate: 72,
    },
  ];

  const gradeDistributionData = [
    { name: "A (Excellent)", value: 64, color: "#22c55e" },
    { name: "B (Credit)", value: 113, color: "#3b82f6" },
    { name: "C (Pass)", value: 60, color: "#f59e0b" },
    { name: "F (Fail)", value: 13, color: "#ef4444" },
  ];

  const topPerformersData = [
    { name: "Sarah Johnson", class: "SSS 3", average: 94.5, position: 1 },
    { name: "Michael Chen", class: "SSS 3", average: 92.8, position: 2 },
    { name: "Aisha Ibrahim", class: "SSS 2", average: 91.2, position: 3 },
    { name: "David Williams", class: "JSS 3", average: 90.7, position: 4 },
    { name: "Grace Okafor", class: "SSS 1", average: 89.9, position: 5 },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const calculateOverallStats = () => {
    const totalStudents = classPerformanceData.reduce(
      (sum, cls) => sum + cls.totalStudents,
      0
    );
    const totalExcellence = classPerformanceData.reduce(
      (sum, cls) => sum + cls.excellence,
      0
    );
    const totalCredit = classPerformanceData.reduce(
      (sum, cls) => sum + cls.credit,
      0
    );
    const totalPass = classPerformanceData.reduce(
      (sum, cls) => sum + cls.pass,
      0
    );
    const totalFail = classPerformanceData.reduce(
      (sum, cls) => sum + cls.fail,
      0
    );
    const overallAverage =
      classPerformanceData.reduce(
        (sum, cls) => sum + cls.averageScore * cls.totalStudents,
        0
      ) / totalStudents;

    return {
      totalStudents,
      overallAverage: overallAverage.toFixed(1),
      excellenceRate: ((totalExcellence / totalStudents) * 100).toFixed(1),
      passRate: (
        ((totalExcellence + totalCredit + totalPass) / totalStudents) *
        100
      ).toFixed(1),
      failRate: ((totalFail / totalStudents) * 100).toFixed(1),
    };
  };

  const stats = calculateOverallStats();

  return (
    <motion.div
      className="space-y-6 p-6 pb-16"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Report Card Insights</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics and insights on student academic
              performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Report Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Academic Session
                </label>
                <Select
                  value={selectedSession}
                  onValueChange={setSelectedSession}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Term</label>
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-term">First Term</SelectItem>
                    <SelectItem value="second-term">Second Term</SelectItem>
                    <SelectItem value="third-term">Third Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="jss1">JSS 1</SelectItem>
                    <SelectItem value="jss2">JSS 2</SelectItem>
                    <SelectItem value="jss3">JSS 3</SelectItem>
                    <SelectItem value="sss1">SSS 1</SelectItem>
                    <SelectItem value="sss2">SSS 2</SelectItem>
                    <SelectItem value="sss3">SSS 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Overview Stats */}
      <motion.div variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {stats.totalStudents}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total Students
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {stats.overallAverage}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Overall Average
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.passRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">Pass Rate</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.excellenceRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Excellence Rate
                  </p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Main Insights */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Academic Performance Analysis</CardTitle>
            <CardDescription>
              Detailed insights and analytics on student performance across
              different metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="class-performance" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="class-performance">
                  Class Performance
                </TabsTrigger>
                <TabsTrigger value="subject-analysis">
                  Subject Analysis
                </TabsTrigger>
                <TabsTrigger value="grade-distribution">
                  Grade Distribution
                </TabsTrigger>
                <TabsTrigger value="student-insights">
                  Student Insights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="class-performance" className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={classPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="class" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="averageScore"
                        fill="#3b82f6"
                        name="Average Score"
                      />
                      <Bar
                        dataKey="totalStudents"
                        fill="#10b981"
                        name="Total Students"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {classPerformanceData.map((classData) => (
                    <Card key={classData.class}>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{classData.class}</h3>
                            <Badge variant="outline">
                              {classData.totalStudents} students
                            </Badge>
                          </div>
                          <div className="text-2xl font-bold text-blue-600">
                            {classData.averageScore}%
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span>Excellence:</span>
                              <span className="text-green-600 font-medium">
                                {classData.excellence}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Credit:</span>
                              <span className="text-blue-600 font-medium">
                                {classData.credit}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Pass:</span>
                              <span className="text-yellow-600 font-medium">
                                {classData.pass}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fail:</span>
                              <span className="text-red-600 font-medium">
                                {classData.fail}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="subject-analysis" className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="subject"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="averageScore"
                        fill="#8b5cf6"
                        name="Average Score"
                      />
                      <Bar
                        dataKey="passRate"
                        fill="#06d6a0"
                        name="Pass Rate %"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {subjectPerformanceData.map((subject) => (
                    <Card key={subject.subject}>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{subject.subject}</h3>
                          <div className="text-xl font-bold text-purple-600">
                            {subject.averageScore}%
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Pass Rate:</span>
                            <span className="font-medium text-green-600">
                              {subject.passRate}%
                            </span>
                          </div>
                          <Badge
                            variant={
                              subject.difficulty === "High"
                                ? "destructive"
                                : subject.difficulty === "Medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {subject.difficulty} Difficulty
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="grade-distribution" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          dataKey="value"
                          data={gradeDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                        >
                          {gradeDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Grade Distribution Summary
                    </h3>
                    {gradeDistributionData.map((grade) => (
                      <div
                        key={grade.name}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: grade.color }}
                          />
                          <span className="font-medium">{grade.name}</span>
                        </div>
                        <div className="text-lg font-bold">{grade.value}</div>
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            {stats.passRate}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Overall Pass Rate
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-600">
                            {stats.failRate}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Failure Rate
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="student-insights" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top Performers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        Top Performers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {topPerformersData.map((student) => (
                          <div
                            key={student.name}
                            className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
                          >
                            <div>
                              <div className="font-semibold">
                                {student.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {student.class}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-yellow-600">
                                {student.average}%
                              </div>
                              <Badge variant="outline">
                                #{student.position}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingDown className="h-5 w-5 text-blue-500" />
                        Performance Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md bg-gray-50">
                          <p className="text-sm text-gray-500">Class Average</p>
                          <p className="text-2xl font-bold text-eduos-primary">
                            {stats.overallAverage}%
                          </p>
                        </div>
                        <div className="p-4 border rounded-md bg-gray-50">
                          <p className="text-sm text-gray-500">
                            Total Students
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            {stats.totalStudents}
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h3 className="font-medium mb-2">
                            Top Performing Subjects
                          </h3>
                          <ol className="list-decimal list-inside space-y-1">
                            <li>History (79%)</li>
                            <li>English (78%)</li>
                            <li>Geography (77%)</li>
                          </ol>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h3 className="font-medium mb-2">
                            Areas Needing Improvement
                          </h3>
                          <ol className="list-decimal list-inside space-y-1">
                            <li>Physics (69%)</li>
                            <li>Chemistry (71%)</li>
                            <li>Mathematics (72%)</li>
                          </ol>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ReportCardInsights;
