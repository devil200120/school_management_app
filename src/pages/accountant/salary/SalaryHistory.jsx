import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
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
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
import { Calendar, Download, Search, FileSearch } from "lucide-react";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Calendar as CalendarComponent } from "../../../components/ui/calendar";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

const SalaryHistory = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [position, setPosition] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Mock data for salary history
  const salaryHistory = [
    {
      id: 1,
      name: "John Doe",
      position: "Science Teacher",
      department: "Science",
      salaryMonth: "April 2024",
      amount: 120000,
      paymentDate: "2024-04-28",
      paymentReference: "PAY-2024-001",
      status: "Paid",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Mathematics Teacher",
      department: "Mathematics",
      salaryMonth: "April 2024",
      amount: 115000,
      paymentDate: "2024-04-28",
      paymentReference: "PAY-2024-002",
      status: "Paid",
    },
    {
      id: 3,
      name: "Robert Johnson",
      position: "English Teacher",
      department: "Languages",
      salaryMonth: "April 2024",
      amount: 110000,
      paymentDate: "2024-04-28",
      paymentReference: "PAY-2024-003",
      status: "Paid",
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Vice Principal",
      department: "Administration",
      salaryMonth: "March 2024",
      amount: 180000,
      paymentDate: "2024-03-29",
      paymentReference: "PAY-2024-004",
      status: "Paid",
    },
    {
      id: 5,
      name: "Michael Davis",
      position: "Computer Teacher",
      department: "ICT",
      salaryMonth: "March 2024",
      amount: 125000,
      paymentDate: "2024-03-29",
      paymentReference: "PAY-2024-005",
      status: "Paid",
    },
    {
      id: 6,
      name: "Emily Wilson",
      position: "Art Teacher",
      department: "Arts",
      salaryMonth: "March 2024",
      amount: 105000,
      paymentDate: "2024-03-29",
      paymentReference: "PAY-2024-006",
      status: "Paid",
    },
    {
      id: 7,
      name: "Daniel Thompson",
      position: "Physical Education Teacher",
      department: "Sports",
      salaryMonth: "March 2024",
      amount: 110000,
      paymentDate: "2024-03-29",
      paymentReference: "PAY-2024-007",
      status: "Paid",
    },
    {
      id: 8,
      name: "Olivia Martinez",
      position: "Biology Teacher",
      department: "Science",
      salaryMonth: "February 2024",
      amount: 118000,
      paymentDate: "2024-02-28",
      paymentReference: "PAY-2024-008",
      status: "Paid",
    },
  ];

  const handleSearch = () => {
    toast.success("Search applied");
    // In a real implementation, this would filter the data
  };

  const handleViewDetails = (id) => {
    const salary = salaryHistory.find((s) => s.id === id);
    setSelectedSalary(salary);
    setIsViewDialogOpen(true);
  };

  const handleDownload = (format) => {
    toast.success(`Downloading salary history as ${format}`);
    // In a real implementation, this would trigger a file download
  };

  // Animation variants
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
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">Salary History</h1>
            <p className="text-muted-foreground">
              View and track all processed salary payments
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDownload("PDF")}>
                  PDF Format
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("Excel")}>
                  Excel Format
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("CSV")}>
                  CSV Format
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Salary Payment Records</CardTitle>
            <CardDescription>
              Historical records of all processed salary payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {startDate
                        ? format(startDate, "PPP")
                        : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Administration</SelectItem>
                    <SelectItem value="support">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search">Search Staff</Label>
                <div className="flex">
                  <Input
                    id="search"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button onClick={handleSearch} className="rounded-l-none">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Salary Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.name}
                      </TableCell>
                      <TableCell>{record.position}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>{record.salaryMonth}</TableCell>
                      <TableCell>₦{record.amount.toLocaleString()}</TableCell>
                      <TableCell>{record.paymentDate}</TableCell>
                      <TableCell>{record.paymentReference}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500">
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(record.id)}
                        >
                          <FileSearch className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between">
            <div className="text-sm text-muted-foreground mb-2 sm:mb-0">
              Showing {salaryHistory.length} salary payments
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="font-medium">
                Total:{" "}
                <span className="text-primary">
                  ₦
                  {salaryHistory
                    .reduce((sum, record) => sum + record.amount, 0)
                    .toLocaleString()}
                </span>
              </span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* View Salary Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Salary Payment Details</DialogTitle>
          </DialogHeader>
          {selectedSalary && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Payment ID
                  </label>
                  <p className="text-sm font-semibold">{selectedSalary.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Reference Number
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedSalary.paymentReference}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Employee Name
                  </label>
                  <p className="text-sm font-semibold">{selectedSalary.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Position
                  </label>
                  <p className="text-sm">{selectedSalary.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Department
                  </label>
                  <p className="text-sm">{selectedSalary.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Salary Month
                  </label>
                  <p className="text-sm">{selectedSalary.salaryMonth}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Amount Paid
                  </label>
                  <p className="text-sm font-semibold text-green-600">
                    ₦{selectedSalary.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Payment Date
                  </label>
                  <p className="text-sm">{selectedSalary.paymentDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge
                    variant={
                      selectedSalary.status === "Paid" ? "default" : "secondary"
                    }
                  >
                    {selectedSalary.status}
                  </Badge>
                </div>
              </div>

              {/* Additional payment details */}
              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Payment Summary
                </label>
                <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Salary Amount:</span>
                      <span className="font-medium">
                        ₦{selectedSalary.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="font-medium">Bank Transfer</span>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span>Reference:</span>
                      <span className="font-medium">
                        {selectedSalary.paymentReference}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional information */}
              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Additional Information
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Salary payment for {selectedSalary.name} (
                  {selectedSalary.position}) for the period of{" "}
                  {selectedSalary.salaryMonth}. Payment was processed on{" "}
                  {selectedSalary.paymentDate}.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default SalaryHistory;
