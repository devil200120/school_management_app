
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Download, FileText, Printer, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const AccountantPaymentManagement = () => {
  const paymentData = [
    {
      id: 1,
      receiptNo: "RCP-2024-001",
      studentName: "John Smith",
      class: "JSS 3A",
      amount: "₦45,000",
      date: "2024-04-28",
      paymentMethod: "Bank Transfer",
      status: "Confirmed",
    },
    {
      id: 2,
      receiptNo: "RCP-2024-002",
      studentName: "Sarah Johnson",
      class: "JSS 2B",
      amount: "₦35,000",
      date: "2024-04-27",
      paymentMethod: "Cash",
      status: "Confirmed",
    },
    {
      id: 3,
      receiptNo: "RCP-2024-003",
      studentName: "Michael Brown",
      class: "SSS 1A",
      amount: "₦50,000",
      date: "2024-04-26",
      paymentMethod: "Online Payment",
      status: "Pending",
    },
    {
      id: 4,
      receiptNo: "RCP-2024-004",
      studentName: "Jessica Williams",
      class: "SSS 3C",
      amount: "₦55,000",
      date: "2024-04-26",
      paymentMethod: "Bank Transfer",
      status: "Confirmed",
    },
    {
      id: 5,
      receiptNo: "RCP-2024-005",
      studentName: "David Miller",
      class: "JSS 1A",
      amount: "₦40,000",
      date: "2024-04-25",
      paymentMethod: "Cash",
      status: "Confirmed",
    },
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
            <h1 className="text-2xl font-bold">Payment Management</h1>
            <p className="text-muted-foreground">Manage and monitor student fee payments</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Student Fee Payments</CardTitle>
            <CardDescription>
              Monitor, manage and generate receipts for student fee payments
            </CardDescription>
            
            <Tabs defaultValue="all" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Payments</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by name, receipt number..." className="pl-10 px-5" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Confirm Selected</Button>
                  <Button variant="destructive">Reject Selected</Button>
                </div>
              </div>
              
              <TabsContent value="all" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Input type="checkbox" className="w-4 h-4" />
                      </TableHead>
                      <TableHead>Receipt No</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <Input type="checkbox" className="w-4 h-4" />
                        </TableCell>
                        <TableCell className="font-medium">{payment.receiptNo}</TableCell>
                        <TableCell>{payment.studentName}</TableCell>
                        <TableCell>{payment.class}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.paymentMethod}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              payment.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : payment.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button size="sm" variant="outline">
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Print</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="confirmed">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Input type="checkbox" className="w-4 h-4" />
                      </TableHead>
                      <TableHead>Receipt No</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData
                      .filter((payment) => payment.status === "Confirmed")
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <Input type="checkbox" className="w-4 h-4" />
                          </TableCell>
                          <TableCell className="font-medium">{payment.receiptNo}</TableCell>
                          <TableCell>{payment.studentName}</TableCell>
                          <TableCell>{payment.class}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.paymentMethod}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                              {payment.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button size="sm" variant="outline">
                                <Printer className="h-4 w-4" />
                                <span className="sr-only">Print</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="pending">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Input type="checkbox" className="w-4 h-4" />
                      </TableHead>
                      <TableHead>Receipt No</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData
                      .filter((payment) => payment.status === "Pending")
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <Input type="checkbox" className="w-4 h-4" />
                          </TableCell>
                          <TableCell className="font-medium">{payment.receiptNo}</TableCell>
                          <TableCell>{payment.studentName}</TableCell>
                          <TableCell>{payment.class}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.paymentMethod}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              {payment.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button size="sm">Confirm</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="rejected">
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">No rejected payments found.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AccountantPaymentManagement;
