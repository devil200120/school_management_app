import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Calendar, Download, Search, Plus, Eye } from "lucide-react";
import { motion } from "framer-motion";

const ClassPaymentList = () => {
  const navigate = useNavigate();

  const handleView = (paymentId) => {
    navigate(`/accountant/payments/view/${paymentId}`);
  };

  const handleDownload = (payment) => {
    toast.success("Download Started", {
      description: `Downloading payment report for ${payment.class}`,
    });
  };

  const handleAddPayment = () => {
    navigate("/accountant/payments/add");
  };

  const handleTodayPayments = () => {
    toast.info("Filter Applied", {
      description: "Showing today's payments only",
    });
  };

  const handleExport = () => {
    toast.success("Export Started", {
      description: "Payment list is being exported to Excel",
    });
  };
  const paymentData = [
    {
      id: 1,
      date: "2024-04-28",
      class: "JSS 3A",
      section: "Science",
      term: "Second Term",
      level: "Junior",
      totalAmount: "₦450,000",
      paidAmount: "₦450,000",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-04-27",
      class: "SSS 2B",
      section: "Arts",
      term: "Second Term",
      level: "Senior",
      totalAmount: "₦520,000",
      paidAmount: "₦480,000",
      status: "Pending",
    },
    {
      id: 3,
      date: "2024-04-26",
      class: "JSS 1C",
      section: "Commercial",
      term: "Second Term",
      level: "Junior",
      totalAmount: "₦380,000",
      paidAmount: "₦320,000",
      status: "Pending",
    },
    {
      id: 4,
      date: "2024-04-25",
      class: "SSS 3A",
      section: "Science",
      term: "Second Term",
      level: "Senior",
      totalAmount: "₦550,000",
      paidAmount: "₦550,000",
      status: "Completed",
    },
    {
      id: 5,
      date: "2024-04-25",
      class: "JSS 2A",
      section: "Science",
      term: "Second Term",
      level: "Junior",
      totalAmount: "₦420,000",
      paidAmount: "₦380,000",
      status: "Pending",
    },
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
            <h1 className="text-2xl font-bold">Class Payment List</h1>
            <p className="text-muted-foreground">
              View and manage payments by class
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddPayment} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Payment
            </Button>
            <Button
              onClick={handleTodayPayments}
              variant="outline"
              className="gap-2"
            >
              <Calendar className="h-4 w-4" />
              Today&apos;s Payments
            </Button>
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Payment Collection</CardTitle>
            <CardDescription>
              Daily payment collections from different classes, sections and
              levels
            </CardDescription>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1">
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

                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Terms</SelectItem>
                    <SelectItem value="first">First Term</SelectItem>
                    <SelectItem value="second">Second Term</SelectItem>
                    <SelectItem value="third">Third Term</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-10 px-5" />
                </div>
                <Button>Filter</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentData.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>{payment.section}</TableCell>
                    <TableCell>{payment.term}</TableCell>
                    <TableCell>{payment.level}</TableCell>
                    <TableCell>{payment.totalAmount}</TableCell>
                    <TableCell>{payment.paidAmount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "Completed" ? "default" : "outline"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(payment.id)}
                          className="gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(payment)}
                          className="gap-1"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </TableCell>
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

export default ClassPaymentList;
