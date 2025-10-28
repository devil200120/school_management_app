import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { toast } from "../../../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const ApproveExpenses = () => {
  const [filterStatus, setFilterStatus] = useState("pending");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock expenses from accountant section requiring approval
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2024-04-15",
      description: "School Uniform Purchase for Students",
      amount: "₦45,000",
      submittedBy: "Accountant",
      category: "Student Supplies",
      status: "Pending",
      priority: "High",
      receiptNumber: "EXP-001",
      vendor: "Unity Textiles Ltd",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 2,
      date: "2024-04-14",
      description: "Laboratory Equipment Maintenance",
      amount: "₦25,500",
      submittedBy: "Accountant",
      category: "Infrastructure",
      status: "Pending",
      priority: "Medium",
      receiptNumber: "EXP-002",
      vendor: "SciTech Solutions",
      paymentMethod: "Cash",
    },
    {
      id: 3,
      date: "2024-04-13",
      description: "Monthly Internet & WiFi Subscription",
      amount: "₦18,000",
      submittedBy: "Accountant",
      category: "Utilities",
      status: "Approved",
      priority: "High",
      receiptNumber: "EXP-003",
      vendor: "MTN Business",
      paymentMethod: "Direct Debit",
      approvedBy: "Admin",
      approvedDate: "2024-04-13",
    },
    {
      id: 4,
      date: "2024-04-12",
      description: "Teachers' Training Workshop",
      amount: "₦35,000",
      submittedBy: "Accountant",
      category: "Professional Development",
      status: "Pending",
      priority: "Low",
      receiptNumber: "EXP-004",
      vendor: "EduTrain Institute",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 5,
      date: "2024-04-11",
      description: "Office Furniture Replacement",
      amount: "₦67,500",
      submittedBy: "Accountant",
      category: "Furniture",
      status: "Rejected",
      priority: "Medium",
      receiptNumber: "EXP-005",
      vendor: "Modern Office Ltd",
      paymentMethod: "Cash",
      rejectedBy: "Admin",
      rejectedDate: "2024-04-11",
      rejectionReason: "Budget exceeded for this quarter",
    },
    {
      id: 6,
      date: "2024-04-10",
      description: "Security System Upgrade",
      amount: "₦125,000",
      submittedBy: "Accountant",
      category: "Security",
      status: "Pending",
      priority: "High",
      receiptNumber: "EXP-006",
      vendor: "SecureGuard Systems",
      paymentMethod: "Bank Transfer",
    },
  ]);

  // Filter expenses based on status, priority, and search term
  const filteredExpenses = expenses.filter((expense) => {
    const matchesStatus =
      filterStatus === "all" ||
      expense.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesPriority =
      filterPriority === "all" ||
      expense.priority.toLowerCase() === filterPriority.toLowerCase();
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  // Handle approval
  const handleApprove = (expenseId) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === expenseId
          ? {
              ...expense,
              status: "Approved",
              approvedBy: "Admin",
              approvedDate: new Date().toISOString().split("T")[0],
            }
          : expense
      )
    );
    toast({
      title: "Expense Approved",
      description: `Expense ID ${expenseId} has been approved successfully.`,
    });
  };

  // Handle rejection with reason
  const handleReject = (expenseId) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (reason) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === expenseId
            ? {
                ...expense,
                status: "Rejected",
                rejectedBy: "Admin",
                rejectedDate: new Date().toISOString().split("T")[0],
                rejectionReason: reason,
              }
            : expense
        )
      );
      toast({
        title: "Expense Rejected",
        description: `Expense ID ${expenseId} has been rejected.`,
        variant: "destructive",
      });
    }
  };

  // Handle view details
  const handleViewDetails = (expense) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "Low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

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

  // Calculate totals
  const pendingTotal = expenses
    .filter((e) => e.status === "Pending")
    .reduce(
      (sum, e) => sum + parseFloat(e.amount.replace("₦", "").replace(",", "")),
      0
    );

  const approvedTotal = expenses
    .filter((e) => e.status === "Approved")
    .reduce(
      (sum, e) => sum + parseFloat(e.amount.replace("₦", "").replace(",", "")),
      0
    );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 p-6 pb-16"
    >
      <motion.div variants={item}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Approve Expenses</h1>
            <p className="text-muted-foreground">
              Review and approve expense requests submitted by accountant
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const pendingExpenses = expenses.filter(
                  (e) => e.status === "Pending"
                );
                if (pendingExpenses.length === 0) {
                  toast({
                    title: "No Pending Expenses",
                    description: "There are no pending expenses to approve.",
                    variant: "destructive",
                  });
                  return;
                }

                const confirmBulkApproval = window.confirm(
                  `Are you sure you want to approve all ${pendingExpenses.length} pending expenses?`
                );

                if (confirmBulkApproval) {
                  setExpenses(
                    expenses.map((expense) =>
                      expense.status === "Pending"
                        ? {
                            ...expense,
                            status: "Approved",
                            approvedBy: "Admin",
                            approvedDate: new Date()
                              .toISOString()
                              .split("T")[0],
                          }
                        : expense
                    )
                  );

                  toast({
                    title: "Bulk Approval Successful",
                    description: `${pendingExpenses.length} expenses have been approved successfully.`,
                  });
                }
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Bulk Approve
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {expenses.filter((e) => e.status === "Pending").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pending Review
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    ₦{pendingTotal.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pending Amount
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {expenses.filter((e) => e.status === "Approved").length}
              </div>
              <p className="text-xs text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                ₦{approvedTotal.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Approved Amount</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute inset-y-0 right-0 flex items-center pr-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search expenses, vendors, categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-3 pr-10"
                  />
                </div>
              </div>
              <div className="w-full lg:w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full lg:w-48">
                <Select
                  value={filterPriority}
                  onValueChange={setFilterPriority}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expenses Table */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Expense Approval Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Receipt #</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {expense.receiptNumber}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={expense.description}>
                        {expense.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {expense.category}
                      </div>
                    </TableCell>
                    <TableCell>{expense.vendor}</TableCell>
                    <TableCell className="font-semibold">
                      {expense.amount}
                    </TableCell>
                    <TableCell>{getPriorityBadge(expense.priority)}</TableCell>
                    <TableCell>{getStatusBadge(expense.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(expense)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {expense.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleApprove(expense.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(expense.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredExpenses.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No expenses found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* View Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
          </DialogHeader>
          {selectedExpense && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Expense ID
                  </label>
                  <p className="text-sm font-semibold">{selectedExpense.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Receipt Number
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedExpense.receiptNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Date
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedExpense.date}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Category
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedExpense.category}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <p className="text-sm">{selectedExpense.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Amount
                  </label>
                  <p className="text-sm font-semibold text-green-600">
                    {selectedExpense.amount}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Vendor
                  </label>
                  <p className="text-sm">{selectedExpense.vendor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Payment Method
                  </label>
                  <p className="text-sm">{selectedExpense.paymentMethod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Priority
                  </label>
                  <Badge
                    variant={
                      selectedExpense.priority === "High"
                        ? "destructive"
                        : selectedExpense.priority === "Medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedExpense.priority}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Submitted By
                  </label>
                  <p className="text-sm">{selectedExpense.submittedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge
                    variant={
                      selectedExpense.status === "Approved"
                        ? "default"
                        : selectedExpense.status === "Rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {selectedExpense.status}
                  </Badge>
                </div>
                {selectedExpense.approvedBy && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Approved By
                      </label>
                      <p className="text-sm">{selectedExpense.approvedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Approved Date
                      </label>
                      <p className="text-sm">{selectedExpense.approvedDate}</p>
                    </div>
                  </>
                )}
                {selectedExpense.rejectedBy && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Rejected By
                      </label>
                      <p className="text-sm">{selectedExpense.rejectedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Rejected Date
                      </label>
                      <p className="text-sm">{selectedExpense.rejectedDate}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-500">
                        Rejection Reason
                      </label>
                      <p className="text-sm text-red-600">
                        {selectedExpense.rejectionReason}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ApproveExpenses;
