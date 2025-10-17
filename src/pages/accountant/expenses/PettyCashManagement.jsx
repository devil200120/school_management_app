import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Download,
  FileText,
  Plus,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Calendar } from "../../../components/ui/calendar";
import { format } from "date-fns";
import { cn } from "../../../lib/utils";
import { toast } from "../../../hooks/use-toast";

const PettyCashManagement = () => {
  const [pettyCashData, setPettyCashData] = useState([
    {
      id: 1,
      date: "2024-04-28",
      amount: "₦15,000",
      description: "Teacher refreshments for staff meeting",
      recordedBy: "Robert Miller",
    },
    {
      id: 2,
      date: "2024-04-27",
      amount: "₦8,500",
      description: "Sports day event supplies",
      recordedBy: "Robert Miller",
    },
    {
      id: 3,
      date: "2024-04-26",
      amount: "₦4,200",
      description: "Office supplies for administrative staff",
      recordedBy: "Sarah Davis",
    },
    {
      id: 4,
      date: "2024-04-25",
      amount: "₦12,800",
      description: "Refreshments for parent-teacher meeting",
      recordedBy: "Robert Miller",
    },
    {
      id: 5,
      date: "2024-04-24",
      amount: "₦6,500",
      description: "Transportation for inter-school competition",
      recordedBy: "Sarah Davis",
    },
    {
      id: 6,
      date: "2024-04-23",
      amount: "₦3,800",
      description: "Science lab consumables for SSS 3 practical",
      recordedBy: "Robert Miller",
    },
    {
      id: 7,
      date: "2024-04-22",
      amount: "₦7,200",
      description: "Printing materials for exam preparation",
      recordedBy: "Robert Miller",
    },
  ]);

  const [newPettyCash, setNewPettyCash] = useState({
    date: new Date(),
    amount: "",
    description: "",
  });

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(pettyCashData);

  const totalAmount = pettyCashData.reduce((sum, record) => {
    return sum + parseFloat(record.amount.replace("₦", "").replace(",", ""));
  }, 0);

  const handleAddPettyCash = () => {
    if (!newPettyCash.amount || !newPettyCash.description) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(newPettyCash.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount greater than zero",
        variant: "destructive",
      });
      return;
    }

    const updatedData = [
      {
        id: pettyCashData.length + 1,
        date: format(newPettyCash.date, "yyyy-MM-dd"),
        amount: `₦${amount.toLocaleString()}`,
        description: newPettyCash.description,
        recordedBy: "Robert Miller", // Assuming the current user is Robert Miller
      },
      ...pettyCashData,
    ];

    setPettyCashData(updatedData);
    setFilteredData(updatedData);

    setNewPettyCash({
      date: new Date(),
      amount: "",
      description: "",
    });

    toast({
      title: "Success",
      description: "Petty cash record added successfully",
    });
  };

  const handleApplyDateFilter = () => {
    let filtered = [...pettyCashData];

    if (startDate && endDate) {
      filtered = filtered.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate >= startDate && recordDate <= endDate;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.recordedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.amount.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
    toast({
      title: "Filter Applied",
      description: `Showing ${filtered.length} records based on your criteria`,
    });
  };

  const handleExportRecords = () => {
    const dataToExport = filteredData.length > 0 ? filteredData : pettyCashData;
    const csvContent = [
      ["Date", "Amount", "Description", "Recorded By"],
      ...dataToExport.map((record) => [
        record.date,
        record.amount,
        record.description,
        record.recordedBy,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "petty_cash_records.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `Exported ${dataToExport.length} petty cash records to CSV`,
    });
  };

  const handleViewRecord = (recordId) => {
    const record = pettyCashData.find((r) => r.id === recordId);
    if (record) {
      toast({
        title: "Record Details",
        description: `${record.date}: ${record.amount} - ${record.description}`,
      });
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
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Petty Cash Management</h1>
            <p className="text-muted-foreground">
              Manage and track petty cash expenditures
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Petty Cash Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Petty Cash Record</DialogTitle>
                <DialogDescription>
                  Record a new petty cash expenditure.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newPettyCash.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newPettyCash.date
                          ? format(newPettyCash.date, "PPP")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newPettyCash.date}
                        onSelect={(date) =>
                          date && setNewPettyCash({ ...newPettyCash, date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newPettyCash.amount}
                    onChange={(e) =>
                      setNewPettyCash({
                        ...newPettyCash,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter detailed description of the expenditure"
                    value={newPettyCash.description}
                    onChange={(e) =>
                      setNewPettyCash({
                        ...newPettyCash,
                        description: e.target.value,
                      })
                    }
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddPettyCash}>
                  Add Record
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Petty Cash Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              For the current fiscal period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              This Month&apos;s Expenditure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦
              {(totalAmount * 0.85)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦25,000.00</div>
            <p className="text-xs text-muted-foreground">
              From allocated budget of ₦100,000.00
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Petty Cash Records</CardTitle>
            <CardDescription>
              Track and manage all petty cash expenditures
            </CardDescription>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Start Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "End Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Button variant="outline" onClick={handleApplyDateFilter}>
                  Apply Date Filter
                </Button>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    className="pl-10 px-5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={handleExportRecords}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Recorded By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(filteredData.length > 0 ? filteredData : pettyCashData).map(
                  (record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell className="font-medium">
                        {record.amount}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {record.description}
                      </TableCell>
                      <TableCell>{record.recordedBy}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewRecord(record.id)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between">
            <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
              Showing{" "}
              {filteredData.length > 0
                ? filteredData.length
                : pettyCashData.length}{" "}
              records
            </p>
            <div className="text-sm font-medium">
              Total Expenditure: ₦{totalAmount.toLocaleString()}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PettyCashManagement;
