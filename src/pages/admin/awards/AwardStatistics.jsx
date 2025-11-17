import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Award,
  TrendingUp,
  Users,
  DollarSign,
  Trophy,
  Star,
  Calendar,
  Target,
  FileSpreadsheet,
  Download,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const AwardStatistics = () => {
  const [selectedYear, setSelectedYear] = useState("2023-2024");
  const [selectedCategory] = useState("all");

  // Mock statistics data
  const [statsData] = useState({
    overview: {
      totalAwards: 156,
      totalRecipients: 142,
      totalValue: 18750,
      categoriesActive: 6,
      lastMonthGrowth: 12.5,
    },
    categoryStats: [
      {
        category: "Academic",
        count: 45,
        value: 8500,
        percentage: 28.8,
        color: "#3B82F6",
      },
      {
        category: "Sports",
        count: 32,
        value: 4200,
        percentage: 20.5,
        color: "#EF4444",
      },
      {
        category: "Leadership",
        count: 28,
        value: 2800,
        percentage: 17.9,
        color: "#8B5CF6",
      },
      {
        category: "Arts",
        count: 24,
        value: 2400,
        percentage: 15.4,
        color: "#EC4899",
      },
      {
        category: "Community",
        count: 18,
        value: 600,
        percentage: 11.5,
        color: "#10B981",
      },
      {
        category: "Attendance",
        count: 9,
        value: 250,
        percentage: 5.8,
        color: "#F59E0B",
      },
    ],
    monthlyTrends: [
      { month: "Sep", awards: 12, value: 1500 },
      { month: "Oct", awards: 18, value: 2200 },
      { month: "Nov", awards: 15, value: 1800 },
      { month: "Dec", awards: 22, value: 2800 },
      { month: "Jan", awards: 25, value: 3200 },
      { month: "Feb", awards: 20, value: 2400 },
      { month: "Mar", awards: 28, value: 3500 },
      { month: "Apr", awards: 16, value: 1350 },
    ],
    classDistribution: [
      { class: "Grade 12", count: 35, percentage: 22.4 },
      { class: "Grade 11", count: 28, percentage: 17.9 },
      { class: "Grade 10", count: 25, percentage: 16.0 },
      { class: "Grade 9", count: 22, percentage: 14.1 },
      { class: "Grade 8", count: 18, percentage: 11.5 },
      { class: "Grade 7", count: 15, percentage: 9.6 },
      { class: "Grade 6", count: 13, percentage: 8.3 },
    ],
    topPerformers: [
      {
        student: "Emily Johnson",
        awards: 4,
        totalValue: 1200,
        categories: ["Academic", "Leadership"],
      },
      {
        student: "Marcus Thompson",
        awards: 3,
        totalValue: 800,
        categories: ["Sports", "Leadership"],
      },
      {
        student: "Sofia Rodriguez",
        awards: 3,
        totalValue: 750,
        categories: ["Academic", "Arts"],
      },
      {
        student: "David Chen",
        awards: 2,
        totalValue: 600,
        categories: ["Arts", "Community"],
      },
      {
        student: "Isabella White",
        awards: 2,
        totalValue: 400,
        categories: ["Community", "Leadership"],
      },
    ],
  });

  // Generate report data
  const generateReport = () => {
    const reportData = {
      period: selectedYear,
      category: selectedCategory,
      generatedAt: new Date().toISOString(),
      summary: statsData.overview,
      categoryBreakdown: statsData.categoryStats,
      monthlyTrends: statsData.monthlyTrends,
      topPerformers: statsData.topPerformers,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `awards-report-${selectedYear}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Award Statistics & Analytics
        </h2>
        <div className="flex gap-3">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select academic year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
              <SelectItem value="2022-2023">2022-2023</SelectItem>
              <SelectItem value="2021-2022">2021-2022</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={generateReport}
            className="bg-green-600 hover:bg-green-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-fade-in delay-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Awards
                </p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {statsData.overview.totalAwards}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />+
                  {statsData.overview.lastMonthGrowth}% from last month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recipients</p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {statsData.overview.totalRecipients}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Unique students awarded
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-eduos-primary">
                  ${statsData.overview.totalValue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Monetary awards given
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-400">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-eduos-primary">
                  {statsData.overview.categoriesActive}
                </p>
                <p className="text-xs text-gray-500 mt-1">Active award types</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="animate-fade-in delay-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Awards by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statsData.categoryStats}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ category, percentage }) =>
                      `${category}: ${percentage}%`
                    }
                  >
                    {statsData.categoryStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Awards"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="animate-fade-in delay-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Monthly Award Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={statsData.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      value,
                      name === "awards" ? "Awards" : "Value ($)",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="awards"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card className="animate-fade-in delay-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Category Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData.categoryStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "count" ? value : `$${value}`,
                    name === "count" ? "Awards" : "Total Value",
                  ]}
                />
                <Bar dataKey="count" fill="#3B82F6" name="count" />
                <Bar dataKey="value" fill="#EF4444" name="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Distribution */}
        <Card className="animate-fade-in delay-800">
          <CardHeader>
            <CardTitle>Awards by Grade Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statsData.classDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.class}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-eduos-primary h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">
                      {item.count}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="animate-fade-in delay-900">
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statsData.topPerformers.map((performer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-eduos-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {performer.student}
                      </p>
                      <div className="flex gap-1">
                        {performer.categories.map((category, catIndex) => (
                          <Badge
                            key={catIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-eduos-primary">
                      {performer.awards} awards
                    </p>
                    <p className="text-xs text-gray-600">
                      ${performer.totalValue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="animate-fade-in delay-1000">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            Export & Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => generateReport()}
            >
              <Download className="w-4 h-4" />
              Statistical Report
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.print()}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Print Statistics
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => generateReport()}
            >
              <Download className="w-4 h-4" />
              Export Data (JSON)
            </Button>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">
              Report Insights
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Academic excellence accounts for{" "}
                {statsData.categoryStats[0].percentage}% of all awards
              </li>
              <li>
                • Award distribution shows strong performance across all grade
                levels
              </li>
              <li>
                • Monthly trends indicate consistent recognition throughout the
                academic year
              </li>
              <li>
                • Top performers demonstrate excellence across multiple
                categories
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AwardStatistics;
