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
  Download,
  Eye,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";

const ManagePettyCash = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock petty cash data from accountant section
  const [pettyCashRecords, setPettyCashRecords] = useState([
    {
      id: 1,
      date: "2024-04-15",
      description: "Office Supplies - Pens and Papers",
      amount: "₦5,500",
      submittedBy: "Accountant",
      category: "Office Supplies",
      status: "Pending",
      receiptNumber: "RC-001",
    },
    {
      id: 2,
      date: "2024-04-14",
      description: "Tea and Coffee for Staff Room",
      amount: "₦3,200",
      submittedBy: "Accountant",
      category: "Refreshments",
      status: "Approved",
      receiptNumber: "RC-002",
      approvedBy: "Admin",
      approvedDate: "2024-04-14",
    },
    {
      id: 3,
      date: "2024-04-13",
      description: "Emergency Phone Credit",
      amount: "₦2,000",
      submittedBy: "Accountant",
      category: "Communication",
      status: "Rejected",
      receiptNumber: "RC-003",
      rejectedBy: "Admin",
      rejectedDate: "2024-04-13",
      rejectionReason: "Should use official communication channels",
    },
    {
      id: 4,
      date: "2024-04-12",
      description: "Cleaning Supplies - Detergent and Brooms",
      amount: "₦7,800",
      submittedBy: "Accountant",
      category: "Cleaning",
      status: "Pending",
      receiptNumber: "RC-004",
    },
    {
      id: 5,
      date: "2024-04-11",
      description: "First Aid Kit Supplies",
      amount: "₦4,500",
      submittedBy: "Accountant",
      category: "Medical",
      status: "Approved",
      receiptNumber: "RC-005",
      approvedBy: "Admin",
      approvedDate: "2024-04-11",
    },
  ]);

  // Filter records based on status and search term
  const filteredRecords = pettyCashRecords.filter((record) => {
    const matchesStatus =
      filterStatus === "all" ||
      record.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle approval
  const handleApprove = (recordId) => {
    setPettyCashRecords(
      pettyCashRecords.map((record) =>
        record.id === recordId
          ? {
              ...record,
              status: "Approved",
              approvedBy: "Admin",
              approvedDate: new Date().toISOString().split("T")[0],
            }
          : record
      )
    );
    toast({
      title: "Petty Cash Approved",
      description: `Petty cash request ID ${recordId} has been approved successfully.`,
    });
  };

  // Handle rejection
  const handleReject = (recordId) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (reason) {
      setPettyCashRecords(
        pettyCashRecords.map((record) =>
          record.id === recordId
            ? {
                ...record,
                status: "Rejected",
                rejectedBy: "Admin",
                rejectedDate: new Date().toISOString().split("T")[0],
                rejectionReason: reason,
              }
            : record
        )
      );
      toast({
        title: "Petty Cash Rejected",
        description: `Petty cash request ID ${recordId} has been rejected.`,
        variant: "destructive",
      });
    }
  };

  // Handle view details
  const handleViewDetails = (record) => {
    setSelectedRecord(record);
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
            <h1 className="text-2xl font-bold">Manage Petty Cash</h1>
            <p className="text-muted-foreground">
              Review and approve petty cash requests from accountant
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const csvData = filteredRecords.map((record) => ({
                  Date: record.date,
                  "Receipt Number": record.receiptNumber,
                  Description: record.description,
                  Category: record.category,
                  Amount: record.amount,
                  Status: record.status,
                  "Submitted By": record.submittedBy,
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
                  `petty-cash-report-${
                    new Date().toISOString().split("T")[0]
                  }.csv`
                );
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast({
                  title: "Export Successful",
                  description:
                    "Petty cash report has been exported successfully.",
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
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute inset-y-0 right-0 flex items-center pr-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search petty cash records..."
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

      {/* Petty Cash Table */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Petty Cash Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Receipt #</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {record.receiptNumber}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{record.description}</div>
                    </TableCell>
                    <TableCell>{record.category}</TableCell>
                    <TableCell className="font-semibold">
                      {record.amount}
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(record)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {record.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleApprove(record.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(record.id)}
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
            {filteredRecords.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No petty cash records found matching your criteria.
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
                {pettyCashRecords.filter((r) => r.status === "Pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Pending Approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {pettyCashRecords.filter((r) => r.status === "Approved").length}
              </div>
              <p className="text-xs text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">
                {pettyCashRecords.filter((r) => r.status === "Rejected").length}
              </div>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                ₦
                {pettyCashRecords
                  .filter((r) => r.status === "Approved")
                  .reduce(
                    (sum, r) =>
                      sum +
                      parseFloat(r.amount.replace("₦", "").replace(",", "")),
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
            <DialogTitle>Petty Cash Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Petty Cash ID
                  </label>
                  <p className="text-sm font-semibold">{selectedRecord.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Receipt Number
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedRecord.receiptNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Date
                  </label>
                  <p className="text-sm font-semibold">{selectedRecord.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Amount
                  </label>
                  <p className="text-sm font-semibold text-green-600">
                    {selectedRecord.amount}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <p className="text-sm">{selectedRecord.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Category
                  </label>
                  <p className="text-sm">{selectedRecord.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Submitted By
                  </label>
                  <p className="text-sm">{selectedRecord.submittedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge
                    variant={
                      selectedRecord.status === "Approved"
                        ? "default"
                        : selectedRecord.status === "Rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {selectedRecord.status}
                  </Badge>
                </div>
                {selectedRecord.approvedBy && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Approved By
                      </label>
                      <p className="text-sm">{selectedRecord.approvedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Approved Date
                      </label>
                      <p className="text-sm">{selectedRecord.approvedDate}</p>
                    </div>
                  </>
                )}
                {selectedRecord.rejectedBy && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Rejected By
                      </label>
                      <p className="text-sm">{selectedRecord.rejectedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Rejected Date
                      </label>
                      <p className="text-sm">{selectedRecord.rejectedDate}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-500">
                        Rejection Reason
                      </label>
                      <p className="text-sm text-red-600">
                        {selectedRecord.rejectionReason}
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

export default ManagePettyCash;
