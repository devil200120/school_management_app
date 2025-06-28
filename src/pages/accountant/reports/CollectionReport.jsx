
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { toast } from 'sonner';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const CollectionReport = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedMonth, setSelectedMonth] = useState<string>("all"); // Changed from empty string to "all"
  const [selectedClass, setSelectedClass] = useState<string>("all"); // Changed from empty string to "all"

  // Mock data for collection report
  const monthlyData = [
    { month: 'Jan', amount: 2450000 },
    { month: 'Feb', amount: 2350000 },
    { month: 'Mar', amount: 2480000 },
    { month: 'Apr', amount: 2520000 },
    { month: 'May', amount: 2380000 }
  ];

  const dailyData = [
    { day: '1', amount: 85000 },
    { day: '2', amount: 92000 },
    { day: '3', amount: 78000 },
    { day: '4', amount: 0 },
    { day: '5', amount: 0 },
    { day: '6', amount: 105000 },
    { day: '7', amount: 98000 },
    { day: '8', amount: 90000 },
    { day: '9', amount: 86000 },
    { day: '10', amount: 75000 },
    { day: '11', amount: 0 },
    { day: '12', amount: 0 },
    { day: '13', amount: 110000 },
    { day: '14', amount: 95000 },
    { day: '15', amount: 88000 },
    { day: '16', amount: 79000 },
    { day: '17', amount: 82000 },
    { day: '18', amount: 0 },
    { day: '19', amount: 0 },
    { day: '20', amount: 95000 },
    { day: '21', amount: 88000 },
    { day: '22', amount: 92000 },
    { day: '23', amount: 85000 },
    { day: '24', amount: 80000 },
    { day: '25', amount: 0 },
    { day: '26', amount: 0 },
    { day: '27', amount: 102000 },
    { day: '28', amount: 95000 },
    { day: '29', amount: 90000 },
    { day: '30', amount: 85000 }
  ];

  const yearlyData = [
    { year: '2020', amount: 24500000 },
    { year: '2021', amount: 26800000 },
    { year: '2022', amount: 28500000 },
    { year: '2023', amount: 30200000 },
    { year: '2024', amount: 12180000 } // Partial year
  ];

  const purposeData = [
    { name: 'Tuition Fee', value: 18500000, fill: '#8884d8' },
    { name: 'Development Levy', value: 5200000, fill: '#83a6ed' },
    { name: 'Lab Fee', value: 2800000, fill: '#8dd1e1' },
    { name: 'Sports Fee', value: 1900000, fill: '#82ca9d' },
    { name: 'Examination Fee', value: 2950000, fill: '#a4de6c' },
    { name: 'Other Fees', value: 1650000, fill: '#d0ed57' }
  ];

  // Collection stats
  const collectionStats = {
    totalCollected: 12180000,
    studentCount: 750,
    averagePerStudent: 16240,
    percentageIncrease: 8.3,
    topCollection: {
      class: 'SSS 3',
      amount: 3250000
    }
  };

  const handleDownload = (format) => {
    toast.success(`Downloading collection report as ${format}`);
    // In a real implementation, this would trigger a file download
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Collection Report</h1>
            <p className="text-muted-foreground">Analysis and visualization of fee collection data</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDownload("PDF")}>
                  PDF Format
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("Excel")}>
                  Excel Format
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/3 space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger id="year" className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/3 space-y-2">
          <Label htmlFor="month">Month</Label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger id="month" className="w-full">
              <SelectValue placeholder="All Months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/3 space-y-2">
          <Label htmlFor="class">Class</Label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger id="class" className="w-full">
              <SelectValue placeholder="All Classes" />
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
      </motion.div>

      <motion.div variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{collectionStats.totalCollected.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{collectionStats.percentageIncrease}%</span> vs last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Student Count
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{collectionStats.studentCount}</div>
              <p className="text-xs text-muted-foreground">
                With payments this year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Per Student
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{collectionStats.averagePerStudent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Average payment collected
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Top Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{collectionStats.topCollection.class}</div>
              <p className="text-xs text-muted-foreground">
                ₦{collectionStats.topCollection.amount.toLocaleString()} collected
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Collection</CardTitle>
                <CardDescription>
                  Collection amount for each day of the selected month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dailyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis tickFormatter={(value) => `₦${(value / 1000)}k`} />
                      <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="amount" name="Collection Amount" fill="#4ade80" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Collection</CardTitle>
                <CardDescription>
                  Collection amount for each month of the selected year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `₦${(value / 1000000)}M`} />
                      <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        name="Collection Amount" 
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="yearly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Collection</CardTitle>
                <CardDescription>
                  Total collection amount for each year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={yearlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `₦${(value / 1000000)}M`} />
                      <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="amount" name="Collection Amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Collection by Purpose</CardTitle>
            <CardDescription>
              Breakdown of collection amounts by fee purpose
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={purposeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {purposeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CollectionReport;
