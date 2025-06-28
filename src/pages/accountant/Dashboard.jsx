
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { CircleDollarSign, Users, Calendar, Wallet, ArrowUpRight, TrendingUp, MoreHorizontal, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

const AccountantDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const dashboardStats = [
    {
      title: "Today's Collection",
      value: "₦125,000",
      icon: <CircleDollarSign className="h-8 w-8 text-emerald-500" />,
      change: "+8.2%",
      trend: "up",
      bgGradient: "from-emerald-50 to-teal-50",
      iconBg: "bg-emerald-100",
      description: "10 new payments today"
    },
    {
      title: "This Month Collection",
      value: "₦2,450,000",
      icon: <Calendar className="h-8 w-8 text-blue-500" />,
      change: "+12.5%",
      trend: "up",
      bgGradient: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      description: "₦150,000 more than last month"
    },
    {
      title: "Debt Amount",
      value: "₦380,000",
      icon: <Wallet className="h-8 w-8 text-red-500" />,
      change: "-5.3%",
      trend: "down",
      bgGradient: "from-red-50 to-orange-50",
      iconBg: "bg-red-100",
      description: "15 students with pending fees"
    },
    {
      title: "New Registrations",
      value: "24",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      change: "+15.3%",
      trend: "up",
      bgGradient: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      description: "This term registrations"
    },
  ];

  const feeStatusData = [
    {
      id: 1,
      student: "John Smith",
      class: "JSS 3A",
      feeStatus: "Completed",
      amountPaid: "₦45,000",
      amountDue: "₦0",
      paymentDate: "2024-03-12",
    },
    {
      id: 2,
      student: "Sarah Johnson",
      class: "JSS 2B",
      feeStatus: "Pending",
      amountPaid: "₦25,000",
      amountDue: "₦20,000",
      paymentDate: "2024-02-28",
    },
    {
      id: 3,
      student: "Michael Brown",
      class: "SSS 1A",
      feeStatus: "Completed",
      amountPaid: "₦55,000",
      amountDue: "₦0",
      paymentDate: "2024-03-15",
    },
    {
      id: 4,
      student: "Jessica Williams",
      class: "SSS 3C",
      feeStatus: "Pending",
      amountPaid: "₦35,000",
      amountDue: "₦20,000",
      paymentDate: "2024-03-05",
    },
    {
      id: 5,
      student: "David Miller",
      class: "JSS 1A",
      feeStatus: "Not Started",
      amountPaid: "₦0",
      amountDue: "₦45,000",
      paymentDate: "-",
    },
  ];

  const revenueData = [
    { month: 'Jan', collection: 1800000, expenses: 950000 },
    { month: 'Feb', collection: 2100000, expenses: 1050000 },
    { month: 'Mar', collection: 1950000, expenses: 980000 },
    { month: 'Apr', collection: 2450000, expenses: 1100000 },
    { month: 'May', collection: 2200000, expenses: 1020000 },
    { month: 'Jun', collection: 2650000, expenses: 1150000 },
    { month: 'Jul', collection: 2350000, expenses: 980000 },
  ];

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
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleDownload = (format) => {
    toast.success(`Downloading ${format} report`);
  };

  const handleViewDetails = (studentId) => {
    toast.info(`Viewing details for student ID: ${studentId}`);
  };

  return (
    <motion.div 
      className="space-y-6" 
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Welcome Section */}
      <motion.div variants={item} className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
                <p className="text-gray-500 mb-3">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-blue-600">You have 3 pending tasks and 5 messages to review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center gap-2 justify-center h-auto py-3">
                <Wallet className="h-4 w-4" />
                <span>Record Payment</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 justify-center h-auto py-3">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 justify-center h-auto py-3">
                <Users className="h-4 w-4" />
                <span>View Debtors</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 justify-center h-auto py-3">
                <CircleDollarSign className="h-4 w-4" />
                <span>Record Expense</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dashboard Stats */}
      <motion.div variants={item}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className={`overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br ${stat.bgGradient} border-0`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.iconBg} p-2 rounded-full`}>
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  <div className="flex items-center mt-3">
                    <span className={`text-xs flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                      )}
                      {stat.change} from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Revenue Chart & Fee Status */}
      <motion.div variants={item}>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 max-w-[400px]">
            <TabsTrigger value="overview">Financial Overview</TabsTrigger>
            <TabsTrigger value="fee-status">Fee Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <p className="text-sm text-muted-foreground">Monthly collection vs expenses</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Report Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDownload('PDF')}>Download PDF</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload('Excel')}>Export to Excel</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload('CSV')}>Export CSV</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => `₦${(value).toLocaleString()}`}
                      labelFormatter={(label) => `${label} 2024`}
                    />
                    <Bar dataKey="collection" name="Collection" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fee-status">
            <Card>
              <CardHeader>
                <CardTitle>Student Fee Status</CardTitle>
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Class" />
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

                    <Select defaultValue="2024">
                      <SelectTrigger>
                        <SelectValue placeholder="Session" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2023/2024</SelectItem>
                        <SelectItem value="2023">2022/2023</SelectItem>
                        <SelectItem value="2022">2021/2022</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="second">
                      <SelectTrigger>
                        <SelectValue placeholder="Term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first">First Term</SelectItem>
                        <SelectItem value="second">Second Term</SelectItem>
                        <SelectItem value="third">Third Term</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Search student..." className="max-w-xs" />
                    <Button>Search</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount Paid</TableHead>
                      <TableHead>Amount Due</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeStatusData.map((row) => (
                      <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">{row.student}</TableCell>
                        <TableCell>{row.class}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              row.feeStatus === "Completed"
                                ? "bg-green-100 text-green-800"
                                : row.feeStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {row.feeStatus}
                          </span>
                        </TableCell>
                        <TableCell>{row.amountPaid}</TableCell>
                        <TableCell>{row.amountDue}</TableCell>
                        <TableCell>{row.paymentDate}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(row.id)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AccountantDashboard;
