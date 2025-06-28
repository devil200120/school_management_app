
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../../components/ui/card';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';

// Import our new components
import PaymentFilters from '../../../components/accountant/payments/PaymentFilters';
import PaymentTable from '../../../components/accountant/payments/PaymentTable';
import PaymentSummary from '../../../components/accountant/payments/PaymentSummary';
import PaymentStats from '../../../components/accountant/payments/PaymentStats';

const PaymentRecords = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPurpose, setSelectedPurpose] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const paymentRecords = [
    {
      id: 1,
      date: "2024-04-28",
      receiptNo: "RCP-2024-001",
      studentName: "John Smith",
      class: "JSS 3A",
      section: "Science",
      purpose: "Tuition Fee",
      amount: "₦45,000",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-04-27",
      receiptNo: "RCP-2024-002",
      studentName: "Sarah Johnson",
      class: "JSS 2B",
      section: "Arts",
      purpose: "Development Levy",
      amount: "₦15,000",
      status: "Completed",
    },
    {
      id: 3,
      date: "2024-04-27",
      receiptNo: "RCP-2024-003",
      studentName: "Sarah Johnson",
      class: "JSS 2B",
      section: "Arts",
      purpose: "Sports Fee",
      amount: "₦5,000",
      status: "Completed",
    },
    {
      id: 4,
      date: "2024-04-26",
      receiptNo: "RCP-2024-004",
      studentName: "Michael Brown",
      class: "SSS 1A",
      section: "Science",
      purpose: "Tuition Fee",
      amount: "₦50,000",
      status: "Pending",
    },
    {
      id: 5,
      date: "2024-04-25",
      receiptNo: "RCP-2024-005",
      studentName: "Jessica Williams",
      class: "SSS 3C",
      section: "Commercial",
      purpose: "Tuition Fee",
      amount: "₦55,000",
      status: "Completed",
    },
    {
      id: 6,
      date: "2024-04-25",
      receiptNo: "RCP-2024-006",
      studentName: "David Miller",
      class: "JSS 1A",
      section: "Science",
      purpose: "Computer Lab Fee",
      amount: "₦8,000",
      status: "Completed",
    },
    {
      id: 7,
      date: "2024-04-24",
      receiptNo: "RCP-2024-007",
      studentName: "Emily Davis",
      class: "SSS 2A",
      section: "Science",
      purpose: "Library Fee",
      amount: "₦3,000",
      status: "Completed",
    },
    {
      id: 8,
      date: "2024-04-23",
      receiptNo: "RCP-2024-008",
      studentName: "James Wilson",
      class: "JSS 3B",
      section: "Arts",
      purpose: "Tuition Fee",
      amount: "₦45,000",
      status: "Completed",
    },
    {
      id: 9,
      date: "2024-04-22",
      receiptNo: "RCP-2024-009",
      studentName: "Olivia Martinez",
      class: "SSS 1B",
      section: "Commercial",
      purpose: "Development Levy",
      amount: "₦15,000",
      status: "Pending",
    },
    {
      id: 10,
      date: "2024-04-21",
      receiptNo: "RCP-2024-010",
      studentName: "Daniel Thompson",
      class: "JSS 1C",
      section: "Arts",
      purpose: "Tuition Fee",
      amount: "₦45,000",
      status: "Completed",
    },
  ];

  const handleSearch = () => {
    toast.success("Search applied");
    // In a real implementation, this would filter the data
  };

  const handleDownload = (format) => {
    toast.success(`Downloading payment records as ${format}`);
    // In a real implementation, this would trigger a file download
  };

  const handleViewDetails = (id) => {
    toast.info(`Viewing details for receipt #${id}`);
    // In a real implementation, this would navigate to a details page or open a modal
  };

  const handlePrint = (id) => {
    toast.info(`Printing receipt #${id}`);
    // In a real implementation, this would trigger print functionality
  };

  // Calculate statistics
  const totalAmount = paymentRecords.reduce((sum, record) => {
    return sum + parseFloat(record.amount.replace('₦', '').replace(',', ''));
  }, 0);

  const completedAmount = paymentRecords
    .filter(record => record.status === 'Completed')
    .reduce((sum, record) => {
      return sum + parseFloat(record.amount.replace('₦', '').replace(',', ''));
    }, 0);

  const pendingAmount = paymentRecords
    .filter(record => record.status === 'Pending')
    .reduce((sum, record) => {
      return sum + parseFloat(record.amount.replace('₦', '').replace(',', ''));
    }, 0);

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

  // Group payment records by class for the summary
  const paymentsByClass = paymentRecords.reduce((acc, record) => {
    const className = record.class;
    if (!acc[className]) {
      acc[className] = {
        count: 0,
        total: 0
      };
    }
    acc[className].count += 1;
    acc[className].total += parseFloat(record.amount.replace('₦', '').replace(',', ''));
    return acc;
  }, {});

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
            <h1 className="text-2xl font-bold">Payment Records</h1>
            <p className="text-muted-foreground">View and analyze all payment records</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
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

      <motion.div variants={item}>
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">Payment List</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Records</CardTitle>
                <CardDescription>
                  Comprehensive view of all payment records
                </CardDescription>
                
                <PaymentFilters 
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  selectedPurpose={selectedPurpose}
                  setSelectedPurpose={setSelectedPurpose}
                  selectedClass={selectedClass}
                  setSelectedClass={setSelectedClass}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                />
              </CardHeader>
              <CardContent>
                <PaymentTable 
                  paymentRecords={paymentRecords}
                  handleViewDetails={handleViewDetails}
                  handlePrint={handlePrint}
                />
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between">
                <PaymentStats 
                  recordsCount={paymentRecords.length}
                  totalAmount={totalAmount}
                  completedAmount={completedAmount}
                  pendingAmount={pendingAmount}
                />
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="summary" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>
                  Overview of payments by class and section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentSummary 
                  paymentsByClass={paymentsByClass}
                  totalAmount={totalAmount}
                  totalClasses={Object.keys(paymentsByClass).length}
                  averageAmount={totalAmount / paymentRecords.length}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default PaymentRecords;
