
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';
import { Calendar as CalendarIcon, Download, FileText, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '../../../components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { Calendar } from '../../../components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '../../../lib/utils';
import { Badge } from '../../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { toast } from '../../../hooks/use-toast';

// Import recharts for expense analytics
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ExpenseManagement = () => {
  const [date, setDate] = useState();
  
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2024-04-15",
      category: "Student Activities",
      description: "Annual Sports Day Event",
      amount: "₦250,000",
      approvedBy: "Mrs. Johnson",
      status: "Approved",
    },
    {
      id: 2,
      date: "2024-04-10",
      category: "Maintenance",
      description: "Classroom Repairs and Painting",
      amount: "₦180,000",
      approvedBy: "Mr. Williams",
      status: "Approved",
    },
    {
      id: 3,
      date: "2024-04-05",
      category: "Educational Materials",
      description: "Textbooks for Library",
      amount: "₦320,000",
      approvedBy: "Mrs. Johnson",
      status: "Approved",
    },
    {
      id: 4,
      date: "2024-04-01",
      category: "Utilities",
      description: "Electricity Bills for March",
      amount: "₦95,000",
      approvedBy: "Mr. Williams",
      status: "Approved",
    },
    {
      id: 5,
      date: "2024-03-28",
      category: "Staff Development",
      description: "Teacher Training Workshop",
      amount: "₦150,000",
      approvedBy: "Mrs. Johnson",
      status: "Pending",
    },
    {
      id: 6,
      date: "2024-03-25",
      category: "Technology",
      description: "Computer Lab Equipment",
      amount: "₦400,000",
      approvedBy: "Mr. Williams",
      status: "Approved",
    },
    {
      id: 7,
      date: "2024-03-20",
      category: "Student Activities",
      description: "Cultural Festival",
      amount: "₦180,000",
      approvedBy: "Mrs. Johnson",
      status: "Approved",
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    date: new Date(),
    category: '',
    description: '',
    amount: '',
    approvedBy: '',
  });

  // Calculate total expense amount
  const totalAmount = expenses.reduce((sum, expense) => {
    return sum + parseFloat(expense.amount.replace('₦', '').replace(',', ''));
  }, 0);

  // Prepare data for pie chart
  const pieChartData = [
    { name: 'Student Activities', value: 430000 },
    { name: 'Maintenance', value: 180000 },
    { name: 'Educational Materials', value: 320000 },
    { name: 'Utilities', value: 95000 },
    { name: 'Staff Development', value: 150000 },
    { name: 'Technology', value: 400000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6384'];

  // Prepare data for bar chart - Monthly expenses vs. revenue
  const monthlyComparisonData = [
    { name: 'Jan', expense: 820000, revenue: 1200000 },
    { name: 'Feb', expense: 750000, revenue: 1100000 },
    { name: 'Mar', expense: 930000, revenue: 1300000 },
    { name: 'Apr', expense: 850000, revenue: 1250000 },
  ];

  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.description || !newExpense.amount || !newExpense.approvedBy) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount greater than zero",
        variant: "destructive",
      });
      return;
    }

    setExpenses([
      {
        id: expenses.length + 1,
        date: format(newExpense.date, 'yyyy-MM-dd'),
        category: newExpense.category,
        description: newExpense.description,
        amount: `₦${amount.toLocaleString()}`,
        approvedBy: newExpense.approvedBy,
        status: "Pending",
      },
      ...expenses,
    ]);

    setNewExpense({
      date: new Date(),
      category: '',
      description: '',
      amount: '',
      approvedBy: '',
    });

    toast({
      title: "Success",
      description: "Expense record added successfully",
    });
  };

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
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Expense Management</h1>
            <p className="text-muted-foreground">Track and analyze school expenses</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Record a new expense for the school.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newExpense.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newExpense.date ? format(newExpense.date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newExpense.date}
                        onSelect={(date) => date && setNewExpense({...newExpense, date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student Activities">Student Activities</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Educational Materials">Educational Materials</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Staff Development">Staff Development</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter detailed description of the expense" 
                    value={newExpense.description}
                    onChange={e => setNewExpense({...newExpense, description: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="0.00" 
                    value={newExpense.amount}
                    onChange={e => setNewExpense({...newExpense, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approvedBy">Approved By</Label>
                  <Input 
                    id="approvedBy" 
                    placeholder="Name of approving authority" 
                    value={newExpense.approvedBy}
                    onChange={e => setNewExpense({...newExpense, approvedBy: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddExpense}>
                  Add Expense
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Expense by Category</CardTitle>
              <CardDescription>
                Distribution of expenses across different categories
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                    <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Expense vs Revenue</CardTitle>
              <CardDescription>
                Monthly comparison of expenses and revenue
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyComparisonData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, '']} />
                    <Legend />
                    <Bar name="Expense" dataKey="expense" fill="#FF8042" />
                    <Bar name="Revenue" dataKey="revenue" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Expense Records</CardTitle>
            <CardDescription>
              Detailed record of all school expenses
            </CardDescription>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Start Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "End Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="student-activities">Student Activities</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="educational-materials">Educational Materials</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="staff-development">Staff Development</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search expenses..." className="pl-8" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Filter</Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Approved By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell className="max-w-xs truncate">{expense.description}</TableCell>
                    <TableCell className="font-medium">{expense.amount}</TableCell>
                    <TableCell>{expense.approvedBy}</TableCell>
                    <TableCell>
                      <Badge variant={expense.status === "Approved" ? "default" : "outline"}>
                        {expense.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between">
            <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
              Showing {expenses.length} records
            </p>
            <div className="text-sm font-medium">
              Total Expenses: ₦{totalAmount.toLocaleString()}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ExpenseManagement;
