
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
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
import { toast } from 'sonner';
import { Calendar, Search, Coins, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { Calendar as CalendarComponent } from '../../../components/ui/calendar';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

const PendingSalaries = () => {
  const [date, setDate] = useState();
  const [position, setPosition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Mock data for teachers with pending salaries
  const pendingSalaries = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Science Teacher',
      department: 'Science',
      salaryMonth: 'April 2024',
      amount: 120000,
      accountNumber: '0123456789',
      bank: 'First Bank',
      dueDate: '2024-05-05'
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Mathematics Teacher',
      department: 'Mathematics',
      salaryMonth: 'April 2024',
      amount: 115000,
      accountNumber: '9876543210',
      bank: 'GT Bank',
      dueDate: '2024-05-05'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      position: 'English Teacher',
      department: 'Languages',
      salaryMonth: 'April 2024',
      amount: 110000,
      accountNumber: '5678901234',
      bank: 'Access Bank',
      dueDate: '2024-05-05'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      position: 'Vice Principal',
      department: 'Administration',
      salaryMonth: 'April 2024',
      amount: 180000,
      accountNumber: '1357924680',
      bank: 'Zenith Bank',
      dueDate: '2024-05-05'
    },
    {
      id: 5,
      name: 'Michael Davis',
      position: 'Computer Teacher',
      department: 'ICT',
      salaryMonth: 'April 2024',
      amount: 125000,
      accountNumber: '2468013579',
      bank: 'UBA',
      dueDate: '2024-05-05'
    }
  ];

  const handleSearch = () => {
    toast.success('Search applied');
    // In a real implementation, this would filter the data
  };

  const handleApproveSalary = () => {
    if (selectedStaff) {
      toast.success(`Salary approved for ${selectedStaff.name}`);
      setIsApproveDialogOpen(false);
      // In a real implementation, this would update the database
    }
  };

  const openApproveDialog = (staff) => {
    setSelectedStaff(staff);
    setIsApproveDialogOpen(true);
  };

  const handleApproveBatch = () => {
    toast.success('All selected salaries have been approved for payment');
    // In a real implementation, this would update multiple records
  };

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

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Pending Salaries</h1>
            <p className="text-muted-foreground">Manage and approve pending salary payments</p>
          </div>
          <Button onClick={handleApproveBatch}>
            <Coins className="mr-2 h-4 w-4" />
            Approve All Selected
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Pending Salary Payments</CardTitle>
            <CardDescription>
              Teacher and staff salaries pending approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "MMMM yyyy") : "Select month"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
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
                  <Button
                    onClick={handleSearch}
                    className="rounded-l-none"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <input type="checkbox" className="border border-gray-300 rounded-sm" />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Salary Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Bank Details</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingSalaries.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <input type="checkbox" className="border border-gray-300 rounded-sm" />
                      </TableCell>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.salaryMonth}</TableCell>
                      <TableCell>₦{staff.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>{staff.bank}</div>
                          <div>{staff.accountNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>{staff.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          onClick={() => openApproveDialog({ id: staff.id, name: staff.name, amount: staff.amount })}
                        >
                          <FileCheck className="h-4 w-4 mr-1" />
                          Approve
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
              Showing {pendingSalaries.length} pending salary payments
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="font-medium">
                Total: <span className="text-primary">₦{pendingSalaries.reduce((sum, staff) => sum + staff.amount, 0).toLocaleString()}</span>
              </span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Salary Payment</DialogTitle>
            <DialogDescription>
              You are about to approve the following salary payment:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Staff Name:</div>
              <div>{selectedStaff?.name}</div>
              <div className="font-medium">Amount:</div>
              <div>₦{selectedStaff?.amount.toLocaleString()}</div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleApproveSalary}>Confirm Approval</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default PendingSalaries;
