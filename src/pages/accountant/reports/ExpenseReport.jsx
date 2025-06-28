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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';

const ExpenseReport = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedMonth, setSelectedMonth] = useState<string>('all'); // Changed from empty string to "all"
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // Changed from empty string to "all"

  // Mock data for expense report
  const monthlyData = [
    { month: 'Jan', amount: 1250000 },
    { month: 'Feb', amount: 1350000 },
    { month: 'Mar', amount: 1180000 },
    { month: 'Apr', amount: 1420000 },
    { month: 'May', amount: 1280000 }
  ];

  const dailyData = [
    { day: '1', amount: 45000 },
    { day: '2', amount: 32000 },
    { day: '3', amount: 38000 },
    { day: '4', amount: 0 },
    { day: '5', amount: 0 },
    { day: '6', amount: 55000 },
    { day: '7', amount: 48000 },
    { day: '8', amount: 40000 },
    { day: '9', amount: 36000 },
    { day: '10', amount: 35000 },
    { day: '11', amount: 0 },
    { day: '12', amount: 0 },
    { day: '13', amount: 60000 },
    { day: '14', amount: 45000 },
    { day: '15', amount: 38000 },
    { day: '16', amount: 39000 },
    { day: '17', amount: 42000 },
    { day: '18', amount: 0 },
    { day: '19', amount: 0 },
    { day: '20', amount: 45000 },
    { day: '21', amount: 48000 },
    { day: '22', amount: 42000 },
    { day: '23', amount: 45000 },
    { day: '24', amount: 40000 },
    { day: '25', amount: 0 },
    { day: '26', amount: 0 },
    { day: '27', amount: 52000 },
    { day: '28', amount: 45000 },
    { day: '29', amount: 40000 },
    { day: '30', amount: 35000 }
  ];

  const yearlyData = [
    { year: '2020', amount: 14500000 },
    { year: '2021', amount: 15800000 },
    { year: '2022', amount: 16500000 },
    { year: '2023', amount: 17200000 },
    { year: '2024', amount: 6480000 } // Partial year
  ];

  const categoryData = [
    { name: 'Salaries', value: 3850000, fill: '#8884d8' },
    { name: 'Utilities', value: 850000, fill: '#83a6ed' },
    { name: 'Maintenance', value: 680000, fill: '#8dd1e1' },
    { name: 'School Events', value: 420000, fill: '#82ca9d' },
    { name: 'Teaching Materials', value: 380000, fill: '#a4de6c' },
    { name: 'Other Expenses', value: 300000, fill: '#d0ed57' }
  ];

  // Recent expenses
  const recentExpenses = [
    { date: '2024-05-01', category: 'Salaries', description: 'Staff salaries for April', amount: 1750000 },
    { date: '2024-04-28', category: 'Utilities', description: 'Electricity bill payment', amount: 185000 },
    { date: '2024-04-25', category: 'Maintenance', description: 'Classroom repairs', amount: 120000 },
    { date: '2024-04-22', category: 'Teaching Materials', description: 'Science lab supplies', amount: 85000 },
    { date: '2024-04-18', category: 'Utilities', description: 'Water bill payment', amount: 60000 },
    { date: '2024-04-15', category: 'School Events', description: 'Inter-school sports competition', amount: 150000 },
    { date: '2024-04-10', category: 'Maintenance', description: 'Generator servicing', amount: 45000 },
    { date: '2024-04-05', category: 'Teaching Materials', description: 'Library books', amount: 110000 },
  ];

  // Expense stats
  const expenseStats = {
    totalExpenses: 6480000,
    largestCategory: 'Salaries',
    largestCategoryAmount: 3850000,
    averageMonthlyExpense: 1296000,
    percentageIncrease: 5.8
  };

  const handleDownload = (format) => {
    toast.success(`Downloading expense report as ${format}`);
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
            <h1 className="text-2xl font-bold">Expense Report</h1>
            <p className="text-muted-foreground">Analysis and visualization of school expenses</p>
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
          <Label htmlFor="category">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="salaries">Salaries</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="events">School Events</SelectItem>
              <SelectItem value="teaching">Teaching Materials</SelectItem>
              <SelectItem value="other">Other Expenses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{expenseStats.totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-amber-600">+{expenseStats.percentageIncrease}%</span> vs last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Largest Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expenseStats.largestCategory}</div>
              <p className="text-xs text-muted-foreground">
                ₦{expenseStats.largestCategoryAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{expenseStats.averageMonthlyExpense.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Average monthly expense
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Salaries Ratio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round((expenseStats.largestCategoryAmount / expenseStats.totalExpenses) * 100)}%</div>
              <p className="text-xs text-muted-foreground">
                Of total expenses
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
                <CardTitle>Daily Expenses</CardTitle>
                <CardDescription>
                  Expense amounts for each day of the selected month
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
                      <Bar dataKey="amount" name="Expense Amount" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
                <CardDescription>
                  Expense amounts for each month of the selected year
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
                        name="Expense Amount" 
                        stroke="#f87171"
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
                <CardTitle>Yearly Expenses</CardTitle>
                <CardDescription>
                  Total expense amount for each year
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
                      <Bar dataKey="amount" name="Expense Amount" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense by Category</CardTitle>
            <CardDescription>
              Breakdown of expenses by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
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
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>
              List of most recent expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentExpenses.slice(0, 5).map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>₦{expense.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ExpenseReport;
