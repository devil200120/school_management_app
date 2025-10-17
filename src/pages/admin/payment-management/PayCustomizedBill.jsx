import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
import {
  Search,
  FileText,
  FileSpreadsheet,
  Printer,
  Copy,
  Eye,
  Edit,
  DollarSign,
  Users,
  CreditCard,
  Calendar,
  Check,
  X,
  Download,
  Receipt,
} from "lucide-react";

const PayCustomizedBill = () => {
  // State management
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);

  // Sample customized bill data - expanded with more entries for better demonstration
  const [customizedBills] = useState([
    {
      id: 1,
      studentName: "John Smith",
      admissionNumber: "ADM001",
      level: "Elementary",
      class: "Class 1",
      term: "First Term",
      session: "2023-2024",
      billType: "School Fees",
      amount: 150000,
      customAmount: 175000,
      dueDate: "2024-01-15",
      status: "pending",
      description: "Tuition fees with extra curricular activities",
    },
    {
      id: 2,
      studentName: "Mary Johnson",
      admissionNumber: "ADM002",
      level: "Elementary",
      class: "Class 2",
      term: "Second Term",
      session: "2022-2023",
      billType: "Development Levy",
      amount: 50000,
      customAmount: 65000,
      dueDate: "2024-01-20",
      status: "paid",
      description: "Infrastructure development and maintenance",
    },
    {
      id: 3,
      studentName: "Peter Williams",
      admissionNumber: "ADM003",
      level: "High School",
      class: "Class 3",
      term: "Second Term",
      session: "2023-2024",
      billType: "Examination Fees",
      amount: 25000,
      customAmount: 30000,
      dueDate: "2024-02-10",
      status: "overdue",
      description: "External examination registration fees",
    },
    {
      id: 4,
      studentName: "Sarah Brown",
      admissionNumber: "ADM004",
      level: "Elementary",
      class: "Class 4",
      term: "First Term",
      session: "2023-2024",
      billType: "Uniform & Books",
      amount: 35000,
      customAmount: 42000,
      dueDate: "2024-01-25",
      status: "pending",
      description: "School uniform and textbook packages",
    },
    {
      id: 5,
      studentName: "Michael Davis",
      admissionNumber: "ADM005",
      level: "Middle School",
      class: "Class 1",
      term: "First Term",
      session: "2023-2024",
      billType: "Laboratory Fees",
      amount: 40000,
      customAmount: 45000,
      dueDate: "2024-01-18",
      status: "pending",
      description: "Science laboratory equipment and materials",
    },
    {
      id: 6,
      studentName: "Emily Wilson",
      admissionNumber: "ADM006",
      level: "Elementary",
      class: "Class 3",
      term: "Third Term",
      session: "2023-2024",
      billType: "Sports Fee",
      amount: 20000,
      customAmount: 28000,
      dueDate: "2024-03-15",
      status: "paid",
      description: "Athletic activities and sports equipment",
    },
    {
      id: 7,
      studentName: "David Thompson",
      admissionNumber: "ADM007",
      level: "College",
      class: "Class 2",
      term: "First Term",
      session: "2023-2024",
      billType: "Project Fee",
      amount: 80000,
      customAmount: 95000,
      dueDate: "2024-01-30",
      status: "overdue",
      description: "Final year project materials and supervision",
    },
    {
      id: 8,
      studentName: "Lisa Anderson",
      admissionNumber: "ADM008",
      level: "High School",
      class: "Class 1",
      term: "Second Term",
      session: "2023-2024",
      billType: "Computer Lab Fee",
      amount: 30000,
      customAmount: 35000,
      dueDate: "2024-02-05",
      status: "pending",
      description: "Computer laboratory usage and maintenance",
    },
    {
      id: 9,
      studentName: "Robert Garcia",
      admissionNumber: "ADM009",
      level: "Middle School",
      class: "Class 3",
      term: "First Term",
      session: "2022-2023",
      billType: "Library Fee",
      amount: 15000,
      customAmount: 18000,
      dueDate: "2023-12-20",
      status: "paid",
      description: "Library resources and book maintenance",
    },
    {
      id: 10,
      studentName: "Jessica Martinez",
      admissionNumber: "ADM010",
      level: "Elementary",
      class: "Class 5",
      term: "Third Term",
      session: "2023-2024",
      billType: "Art & Music Fee",
      amount: 25000,
      customAmount: 32000,
      dueDate: "2024-03-10",
      status: "pending",
      description: "Art supplies and music instrument rental",
    },
  ]);

  // Filter bills based on search and selection criteria
  const filteredBills = customizedBills.filter((bill) => {
    const matchesSearch =
      bill.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.billType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = !selectedLevel || bill.level === selectedLevel;
    const matchesClass = !selectedClass || bill.class === selectedClass;
    const matchesTerm = !selectedTerm || bill.term === selectedTerm;
    const matchesSession = !selectedSession || bill.session === selectedSession;

    return (
      matchesSearch &&
      matchesLevel &&
      matchesClass &&
      matchesTerm &&
      matchesSession
    );
  });

  // Handle form submission
  const handleCheckNow = () => {
    if (!selectedLevel || !selectedClass || !selectedTerm || !selectedSession) {
      toast.error("Missing Selection", {
        description:
          "Please select level, class, term, and session to proceed.",
        duration: 3000,
      });
      return;
    }

    setShowResults(true);
    toast.success("Bills Retrieved Successfully", {
      description: `Found ${filteredBills.length} customized bills for ${selectedLevel} - ${selectedClass}, ${selectedTerm}, ${selectedSession}.`,
      icon: <Check className="h-4 w-4" />,
      duration: 4000,
    });
  };

  // Handle show all bills
  const handleShowAllBills = () => {
    setSelectedLevel("");
    setSelectedClass("");
    setSelectedTerm("");
    setSelectedSession("");
    setShowResults(true);
    toast.success("All Bills Displayed", {
      description: `Showing all ${customizedBills.length} customized bills from the system.`,
      icon: <Check className="h-4 w-4" />,
      duration: 3000,
    });
  };

  // Handle view payment details
  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  // Handle payment processing
  const handleProcessPayment = (payment) => {
    setSelectedPayment(payment);
    setIsPayDialogOpen(true);
  };

  // Handle payment confirmation
  const handleConfirmPayment = () => {
    if (selectedPayment) {
      toast.success("Payment Processed", {
        description: `Payment of ₦${selectedPayment.customAmount.toLocaleString()} for ${
          selectedPayment.studentName
        } has been successfully processed.`,
        icon: <Check className="h-4 w-4" />,
        duration: 4000,
      });
      setIsPayDialogOpen(false);
      setSelectedPayment(null);
    }
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "S/N",
        "Student Name",
        "Admission No.",
        "Level",
        "Class",
        "Term",
        "Session",
        "Bill Type",
        "Original Amount",
        "Custom Amount",
        "Due Date",
        "Status",
      ],
      ...filteredBills.map((bill) => [
        bill.id,
        bill.studentName,
        bill.admissionNumber,
        bill.level,
        bill.class,
        bill.term,
        bill.session,
        bill.billType,
        bill.amount,
        bill.customAmount,
        bill.dueDate,
        bill.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customized_bills.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`CSV Export Complete`, {
      description: `Successfully exported ${filteredBills.length} customized bills to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredBills
      .map(
        (bill) =>
          `${bill.id}. ${bill.studentName} (${bill.admissionNumber}) - ${
            bill.billType
          }: ₦${bill.customAmount.toLocaleString()} - Due: ${
            bill.dueDate
          } - Status: ${bill.status}`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customized_bills.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`Text Export Complete`, {
      description: `Successfully exported ${filteredBills.length} customized bills to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info(`Print Dialog Opened`, {
      description: `Preparing to print ${filteredBills.length} customized bills.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredBills
      .map(
        (bill) =>
          `${bill.id}\t${bill.studentName}\t${bill.admissionNumber}\t${
            bill.level
          }\t${bill.class}\t${bill.term}\t${bill.session}\t${
            bill.billType
          }\t₦${bill.amount.toLocaleString()}\t₦${bill.customAmount.toLocaleString()}\t${
            bill.dueDate
          }\t${bill.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success(`Copied to Clipboard`, {
          description: `Successfully copied ${filteredBills.length} customized bills data to clipboard.`,
          icon: <Copy className="h-4 w-4" />,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error(`Copy Failed`, {
          description: `Unable to copy data to clipboard. Please try again.`,
          icon: <X className="h-4 w-4" />,
          duration: 3000,
        });
      });
  };

  // Get summary statistics
  const totalBills = filteredBills.length;
  const totalAmount = filteredBills.reduce(
    (sum, bill) => sum + bill.customAmount,
    0
  );
  const paidBills = filteredBills.filter(
    (bill) => bill.status === "paid"
  ).length;
  const pendingBills = filteredBills.filter(
    (bill) => bill.status === "pending"
  ).length;
  const overdueBills = filteredBills.filter(
    (bill) => bill.status === "overdue"
  ).length;
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Pay Customized Bill
        </h2>
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-eduos-primary hover:text-white transition-colors"
          onClick={handleShowAllBills}
        >
          <Eye className="h-4 w-4" />
          Show All Bills
        </Button>
      </div>

      {/* Summary Dashboard */}
      {showResults && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Bills
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalBills}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in delay-100">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₦{totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in delay-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Check className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Paid Bills
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {paidBills}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in delay-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending/Overdue
                  </p>
                  <p className="text-2xl font-bold text-red-700">
                    {pendingBills + overdueBills}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Selection Form */}
      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Payment Session, Term and Class</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="level">Select Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Elementary">Elementary</SelectItem>
                  <SelectItem value="Middle School">Middle School</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="College">College</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Select Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 1">Class 1</SelectItem>
                  <SelectItem value="Class 2">Class 2</SelectItem>
                  <SelectItem value="Class 3">Class 3</SelectItem>
                  <SelectItem value="Class 4">Class 4</SelectItem>
                  <SelectItem value="Class 5">Class 5</SelectItem>
                  <SelectItem value="Class 6">Class 6</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Select Term/Semester</Label>
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Term">First Term</SelectItem>
                  <SelectItem value="Second Term">Second Term</SelectItem>
                  <SelectItem value="Third Term">Third Term</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session">Select Session</Label>
              <Select
                value={selectedSession}
                onValueChange={setSelectedSession}
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">2023/2024</SelectItem>
                  <SelectItem value="2022-2023">2022/2023</SelectItem>
                  <SelectItem value="2021-2022">2021/2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            onClick={handleCheckNow}
          >
            Filter Bills
          </Button>

          <div className="text-center">
            <Button
              variant="outline"
              className="w-full hover:bg-gray-50 transition-colors"
              onClick={handleShowAllBills}
            >
              View All Bills ({customizedBills.length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      {showResults && (
        <Card className="mt-6 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>
              {selectedLevel || selectedClass || selectedTerm || selectedSession
                ? `Customized Bills - ${selectedLevel || "All Levels"} ${
                    selectedClass || "All Classes"
                  } (${selectedTerm || "All Terms"}, ${
                    selectedSession || "All Sessions"
                  })`
                : "All Customized Bills"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Search bills..."
                  className="pl-10 px-5"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 hover:bg-green-50 hover:border-green-300"
                  onClick={handleExportCSV}
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>CSV</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                  onClick={handleExportText}
                >
                  <FileText className="h-4 w-4" />
                  <span>Text</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 hover:bg-gray-50 hover:border-gray-300"
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-gray-100">S/N</TableHead>
                    <TableHead className="bg-gray-100">Student Name</TableHead>
                    <TableHead className="bg-gray-100">Admission No.</TableHead>
                    <TableHead className="bg-gray-100">Bill Type</TableHead>
                    <TableHead className="bg-gray-100">
                      Original Amount
                    </TableHead>
                    <TableHead className="bg-gray-100">Custom Amount</TableHead>
                    <TableHead className="bg-gray-100">Due Date</TableHead>
                    <TableHead className="bg-gray-100">Status</TableHead>
                    <TableHead className="bg-gray-100">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.length > 0 ? (
                    filteredBills.map((bill) => (
                      <TableRow
                        key={bill.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell>{bill.id}</TableCell>
                        <TableCell className="font-medium">
                          {bill.studentName}
                        </TableCell>
                        <TableCell>{bill.admissionNumber}</TableCell>
                        <TableCell>{bill.billType}</TableCell>
                        <TableCell>₦{bill.amount.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">
                          ₦{bill.customAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>{bill.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              bill.status === "paid"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : bill.status === "overdue"
                                ? "bg-red-100 text-red-800 hover:bg-red-200"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            }`}
                          >
                            {bill.status === "paid"
                              ? "Paid"
                              : bill.status === "overdue"
                              ? "Overdue"
                              : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                              onClick={() => handleViewPayment(bill)}
                            >
                              <Eye size={14} />
                              <span>View</span>
                            </Button>
                            {bill.status !== "paid" && (
                              <Button
                                variant="default"
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 flex items-center gap-1 transition-colors"
                                onClick={() => handleProcessPayment(bill)}
                              >
                                <CreditCard size={14} />
                                <span>Pay</span>
                              </Button>
                            )}
                            {bill.status === "paid" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
                                onClick={() => handleViewPayment(bill)}
                              >
                                <Receipt size={14} />
                                <span>Receipt</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <div className="flex flex-col items-center space-y-2">
                          <Search className="h-8 w-8 text-gray-400" />
                          <p className="text-gray-500 font-medium">
                            No bills found
                          </p>
                          <p className="text-sm text-gray-400">
                            Try adjusting your search criteria or click
                            &quot;Show All Bills&quot; to view all records.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Payment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Customized Bill Details</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Bill ID
                  </label>
                  <p className="text-sm font-semibold">{selectedPayment.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Student Name
                  </label>
                  <p className="text-sm font-semibold">
                    {selectedPayment.studentName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Admission Number
                  </label>
                  <p className="text-sm">{selectedPayment.admissionNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Level & Class
                  </label>
                  <p className="text-sm">
                    {selectedPayment.level} - {selectedPayment.class}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Term & Session
                  </label>
                  <p className="text-sm">
                    {selectedPayment.term}, {selectedPayment.session}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Bill Type
                  </label>
                  <p className="text-sm">{selectedPayment.billType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Original Amount
                  </label>
                  <p className="text-sm">
                    ₦{selectedPayment.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Custom Amount
                  </label>
                  <p className="text-sm font-semibold text-green-600">
                    ₦{selectedPayment.customAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Due Date
                  </label>
                  <p className="text-sm">{selectedPayment.dueDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge
                    variant={
                      selectedPayment.status === "paid"
                        ? "default"
                        : selectedPayment.status === "overdue"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {selectedPayment.status.charAt(0).toUpperCase() +
                      selectedPayment.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Description
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPayment.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Processing Dialog */}
      <Dialog open={isPayDialogOpen} onOpenChange={setIsPayDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Student:</span>
                    <span className="font-medium">
                      {selectedPayment.studentName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bill Type:</span>
                    <span>{selectedPayment.billType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Original Amount:</span>
                    <span>₦{selectedPayment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Amount to Pay:</span>
                    <span className="text-green-600">
                      ₦{selectedPayment.customAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select defaultValue="cash">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="pos">POS</SelectItem>
                    <SelectItem value="online">Online Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Payment Reference (Optional)</Label>
                <Input id="reference" placeholder="Enter payment reference" />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPayDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPayment}
              className="bg-green-500 hover:bg-green-600"
            >
              <Check className="h-4 w-4 mr-2" />
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayCustomizedBill;
