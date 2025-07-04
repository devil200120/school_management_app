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
import { 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Progress } from '../../../components/ui/progress';

const RevenueAnalytics = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Mock data for revenue analytics
  const revenueVsExpenseData = [
    { month: 'Jan', revenue: 2450000, expense: 1250000, profit: 1200000 },
    { month: 'Feb', revenue: 2350000, expense: 1350000, profit: 1000000 },
    { month: 'Mar', revenue: 2480000, expense: 1180000, profit: 1300000 },
    { month: 'Apr', revenue: 2520000, expense: 1420000, profit: 1100000 },
    { month: 'May', revenue: 2380000, expense: 1280000, profit: 1100000 }
  ];

  const revenueSourceData = [
    { name: 'Tuition Fees', value: 18500000, fill: '#8884d8' },
    { name: 'Development Levy', value: 2200000, fill: '#83a6ed' },
    { name: 'Examination Fees', value: 1800000, fill: '#8dd1e1' },
    { name: 'Registration Fees', value: 1500000, fill: '#82ca9d' },
    { name: 'Others', value: 750000, fill: '#a4de6c' }
  ];

  const expenseCategoryData = [
    { name: 'Salaries', value: 16500000, fill: '#FF8042' },
    { name: 'Facilities', value: 3800000, fill: '#FFBB28' },
    { name: 'Administrative', value: 2500000, fill: '#00C49F' },
    { name: 'Learning Materials', value: 1200000, fill: '#0088FE' },
    { name: 'Others', value: 750000, fill: '#FF0000' }
  ];

  const profitabilityData = [
    { year: '2020', profitMargin: 28 },
    { year: '2021', profitMargin: 32 },
    { year: '2022', profitMargin: 35 },
    { year: '2023', profitMargin: 38 },
    { year: '2024', profitMargin: 36 } // Current year (partial)
  ];

  const classRevenueData = [
    { class: 'JSS 1', amount: 4250000, students: 125 },
    { class: 'JSS 2', amount: 4180000, students: 120 },
    { class: 'JSS 3', amount: 4320000, students: 128 },
    { class: 'SSS 1', amount: 4850000, students: 132 },
    { class: 'SSS 2', amount: 4520000, students: 115 },
    { class: 'SSS 3', amount: 4630000, students: 130 },
  ];

  // Financial metrics
  const financialMetrics = {
    totalRevenue: 24750000,
    totalExpenses: 16280000,
    netProfit: 8470000,
    profitMargin: 34.2,
    revenueGrowth: 6.8,
    expenseGrowth: 4.5
  };

  const handleDownload = (format) => {
    toast.success(`Downloading revenue analysis as ${format}`);
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
            <h1 className="text-2xl font-bold">Revenue Analytics</h1>
            <p className="text-muted-foreground">Comprehensive analysis of revenue, expenses, and profitability</p>
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
                <DropdownMenuItem onClick={() => handleDownload("PowerPoint")}>
                  PowerPoint Format
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/2 space-y-2">
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
        <div className="w-full md:w-1/2 space-y-2">
          <Label htmlFor="period">Period</Label>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger id="period" className="w-full">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="termly">Termly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{financialMetrics.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{financialMetrics.revenueGrowth}%</span> vs last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{financialMetrics.totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-amber-600">+{financialMetrics.expenseGrowth}%</span> vs last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Net Profit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₦{financialMetrics.netProfit.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {financialMetrics.profitMargin}% profit margin
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>
              Monthly comparison of revenue, expenses, and profit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={revenueVsExpenseData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₦${(value / 1000000)}M`} />
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                  <Bar dataKey="expense" name="Expenses" fill="#f87171" />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    name="Profit"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Sources</CardTitle>
            <CardDescription>
              Breakdown of revenue by source
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>
              Breakdown of expenses by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#82ca9d"
                    dataKey="value"
                  >
                    {expenseCategoryData.map((entry, index) => (
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

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profit Margin Trend</CardTitle>
            <CardDescription>
              Profit margin trends over the past 5 years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={profitabilityData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Area 
                    type="monotone" 
                    dataKey="profitMargin" 
                    name="Profit Margin" 
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Revenue Analysis</CardTitle>
            <CardDescription>
              Revenue generated by each class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Avg. per Student</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classRevenueData.map((item) => (
                  <TableRow key={item.class}>
                    <TableCell className="font-medium">{item.class}</TableCell>
                    <TableCell>₦{item.amount.toLocaleString()}</TableCell>
                    <TableCell>{item.students}</TableCell>
                    <TableCell>₦{(item.amount / item.students).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Financial Health Metrics</CardTitle>
            <CardDescription>
              Key financial indicators and targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Profit Margin (Target: 40%)</span>
                  <span className="text-sm font-medium">{financialMetrics.profitMargin}%</span>
                </div>
                <Progress value={financialMetrics.profitMargin * 2.5} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Revenue Growth (Target: 10%)</span>
                  <span className="text-sm font-medium">{financialMetrics.revenueGrowth}%</span>
                </div>
                <Progress value={financialMetrics.revenueGrowth * 10} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Expense Control (Target: &lt;5%)</span>
                  <span className="text-sm font-medium">{financialMetrics.expenseGrowth}%</span>
                </div>
                <Progress value={(10 - financialMetrics.expenseGrowth) * 10} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Revenue to Expense Ratio (Target: 1.6)</span>
                  <span className="text-sm font-medium">
                    {(financialMetrics.totalRevenue / financialMetrics.totalExpenses).toFixed(2)}
                  </span>
                </div>
                <Progress 
                  value={((financialMetrics.totalRevenue / financialMetrics.totalExpenses) / 2) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default RevenueAnalytics;
