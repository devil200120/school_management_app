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
  Clock,
  Search,
  Filter,
  Download,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";

const ManageExpenses = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock expense data from accountant section
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2024-04-15",
      category: "Student Activities",
      description: "Annual Sports Day Event",
      amount: "₦250,000",
      submittedBy: "Accountant",
      submittedDate: "2024-04-15",
      status: "Pending",
      priority: "High",
    },
    {
      id: 2,
      date: "2024-04-10",
      category: "Maintenance",
      description: "Classroom Repairs and Painting",
      amount: "₦180,000",
      submittedBy: "Accountant",
      submittedDate: "2024-04-10",
      status: "Approved",
      priority: "Medium",
      approvedBy: "Admin",
      approvedDate: "2024-04-11",
    },
    {
      id: 3,
      date: "2024-04-05",
      category: "Educational Materials",
      description: "Textbooks for Library",
      amount: "₦320,000",
      submittedBy: "Accountant",
      submittedDate: "2024-04-05",
      status: "Rejected",
      priority: "Low",
      rejectedBy: "Admin",
      rejectedDate: "2024-04-06",
      rejectionReason: "Budget exceeded for this quarter",
    },
    {
      id: 4,
      date: "2024-04-01",
      category: "Utilities",
      description: "Electricity Bills for March",
      amount: "₦95,000",
      submittedBy: "Accountant",
      submittedDate: "2024-04-01",
      status: "Pending",
      priority: "High",
    },
    {
      id: 5,
      date: "2024-03-28",
      category: "Staff Development",
      description: "Teacher Training Workshop",
      amount: "₦150,000",
      submittedBy: "Accountant",
      submittedDate: "2024-03-28",
      status: "Approved",
      priority: "Medium",
      approvedBy: "Admin",
      approvedDate: "2024-03-29",
    },
  ]);

  // Filter expenses based on status and search term
  const filteredExpenses = expenses.filter((expense) => {
    const matchesStatus =
      filterStatus === "all" ||
      expense.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle expense approval
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

  // Handle expense rejection
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

  // Get priority badge color
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">{priority}</Badge>;
      case "Medium":
        return <Badge variant="secondary">{priority}</Badge>;
      case "Low":
        return <Badge variant="outline">{priority}</Badge>;
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
            <h1 className="text-2xl font-bold">Manage Expenses</h1>
            <p className="text-muted-foreground">
              Review and approve expense requests from accountant
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const csvData = filteredExpenses.map((expense) => ({
                  Date: expense.date,
                  Category: expense.category,
                  Description: expense.description,
                  Amount: expense.amount,
                  Priority: expense.priority,
                  Status: expense.status,
                  "Submitted By": expense.submittedBy,
                }));

                const csvContent =
                  "data:text/csv;charset=utf-8," +
                  Object.keys(csvData[0]).join(",") +
                  "\n" +
                  csvData.map((row) => Object.values(row).join(",")).join("\n");

                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute(
                  "download",
                  `expense-report-${new Date().toISOString().split("T")[0]}.csv`
                );
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast({
                  title: "Export Successful",
                  description: "Expense report has been exported successfully.",
                });
              }}
            >
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
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute inset-y-0 right-0 flex items-center pr-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-3 pr-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
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
            <CardTitle>Expense Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
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
                    <TableCell>{expense.category}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{expense.description}</div>
                    </TableCell>
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

      {/* Summary Stats */}
      <motion.div variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {expenses.filter((e) => e.status === "Pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Pending Approval</p>
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
              <div className="text-2xl font-bold text-red-600">
                {expenses.filter((e) => e.status === "Rejected").length}
              </div>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                ₦
                {expenses
                  .filter((e) => e.status === "Approved")
                  .reduce(
                    (sum, e) =>
                      sum +
                      parseFloat(e.amount.replace("₦", "").replace(",", "")),
                    0
                  )
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total Approved</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* View Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
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
                    Submitted Date
                  </label>
                  <p className="text-sm">{selectedExpense.submittedDate}</p>
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

export default ManageExpenses;
