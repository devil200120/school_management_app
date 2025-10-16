import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import { toast } from "sonner";
import { Download, FileText, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

const BalanceSheet = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("all"); // Changed from empty string to "all"
  const [selectedQuarter, setSelectedQuarter] = useState("all"); // Changed from empty string to "all"

  // Detailed inventory data
  const inventoryData = [
    {
      category: "Stationery & Supplies",
      items: [
        {
          name: "A4 Paper (500 units × ₦0.10)",
          quantity: 500,
          unitPrice: 0.1,
          value: 50000,
        },
        {
          name: "Blue Pens (250 units × ₦1.50)",
          quantity: 250,
          unitPrice: 1.5,
          value: 37500,
        },
        {
          name: "Exercise Books (300 units × ₦2.00)",
          quantity: 300,
          unitPrice: 2.0,
          value: 60000,
        },
        {
          name: "Notebooks (150 units × ₦3.50)",
          quantity: 150,
          unitPrice: 3.5,
          value: 52500,
        },
      ],
    },
    {
      category: "Medical Equipment",
      items: [
        {
          name: "First Aid Kits (15 units × ₦5000)",
          quantity: 15,
          unitPrice: 5000,
          value: 75000,
        },
        {
          name: "Thermometers (25 units × ₦1200)",
          quantity: 25,
          unitPrice: 1200,
          value: 30000,
        },
        {
          name: "Blood Pressure Monitors (3 units × ₦8000)",
          quantity: 3,
          unitPrice: 8000,
          value: 24000,
        },
      ],
    },
    {
      category: "Sports Equipment",
      items: [
        {
          name: "Football (20 units × ₦3500)",
          quantity: 20,
          unitPrice: 3500,
          value: 70000,
        },
        {
          name: "Basketball (10 units × ₦4200)",
          quantity: 10,
          unitPrice: 4200,
          value: 42000,
        },
        {
          name: "Tennis Rackets (8 units × ₦2800)",
          quantity: 8,
          unitPrice: 2800,
          value: 22400,
        },
      ],
    },
    {
      category: "Library Resources",
      items: [
        {
          name: "Textbooks (200 units × ₦2500)",
          quantity: 200,
          unitPrice: 2500,
          value: 50000,
        },
        {
          name: "Reference Books (80 units × ₦4000)",
          quantity: 80,
          unitPrice: 4000,
          value: 32000,
        },
        {
          name: "Digital Resources License",
          quantity: 1,
          unitPrice: 15000,
          value: 15000,
        },
      ],
    },
  ];

  // Calculate total inventory value
  const totalInventoryValue = inventoryData.reduce(
    (total, category) =>
      total +
      category.items.reduce((subtotal, item) => subtotal + item.value, 0),
    0
  );

  // Mock balance sheet data with detailed inventory
  const assetData = [
    {
      category: "Current Assets",
      items: [
        { name: "Cash & Bank", amount: 3250000 },
        { name: "Accounts Receivable", amount: 1850000 },
        { name: "Inventory (Detailed Below)", amount: totalInventoryValue },
        { name: "Prepaid Expenses", amount: 250000 },
      ],
    },
    {
      category: "Non-Current Assets",
      items: [
        { name: "Property & Equipment", amount: 15250000 },
        { name: "Land & Buildings", amount: 25500000 },
        { name: "Furniture & Fixtures", amount: 1850000 },
        { name: "Long-term Investments", amount: 2500000 },
      ],
    },
  ];

  const liabilityData = [
    {
      category: "Current Liabilities",
      items: [
        { name: "Accounts Payable", amount: 950000 },
        { name: "Short-term Loans", amount: 1250000 },
        { name: "Accrued Expenses", amount: 380000 },
        { name: "Deferred Revenue", amount: 1750000 },
      ],
    },
    {
      category: "Non-Current Liabilities",
      items: [
        { name: "Long-term Loans", amount: 8500000 },
        { name: "Mortgage Payable", amount: 6250000 },
      ],
    },
  ];

  const equityData = [
    { name: "School Fund", amount: 25000000 },
    { name: "Retained Earnings", amount: 4570000 },
    { name: "Current Year Surplus", amount: 2500000 },
  ];

  // Calculate totals
  const totalAssets = assetData.reduce(
    (total, category) =>
      total +
      category.items.reduce((subtotal, item) => subtotal + item.amount, 0),
    0
  );

  const totalLiabilities = liabilityData.reduce(
    (total, category) =>
      total +
      category.items.reduce((subtotal, item) => subtotal + item.amount, 0),
    0
  );

  const totalEquity = equityData.reduce(
    (total, item) => total + item.amount,
    0
  );

  const handleDownload = (format) => {
    toast.success(`Downloading balance sheet as ${format}`);
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
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Balance Sheet</h1>
            <p className="text-muted-foreground">
              Financial position statement with assets, liabilities and equity
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
                <DropdownMenuItem onClick={() => handleDownload("Print")}>
                  Print Version
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <div className="w-full md:w-1/3 space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger id="year" className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/3 space-y-2">
          <Label htmlFor="quarter">Quarter</Label>
          <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
            <SelectTrigger id="quarter" className="w-full">
              <SelectValue placeholder="Select quarter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Quarters</SelectItem>
              <SelectItem value="Q1">Q1 (Jan-Mar)</SelectItem>
              <SelectItem value="Q2">Q2 (Apr-Jun)</SelectItem>
              <SelectItem value="Q3">Q3 (Jul-Sep)</SelectItem>
              <SelectItem value="Q4">Q4 (Oct-Dec)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/3 space-y-2">
          <Label htmlFor="month">Month</Label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger id="month" className="w-full">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>EDUOS School Financial Statement</CardTitle>
                <CardDescription>
                  As of {selectedMonth ? `Month ${selectedMonth}, ` : ""}
                  {selectedYear}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full max-w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="inventory">Inventory Details</TabsTrigger>
                <TabsTrigger value="liabilities">
                  Liabilities & Equity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <span className="bg-green-100 p-2 rounded-full mr-2">
                          <FileText className="h-4 w-4 text-green-600" />
                        </span>
                        Total Assets
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₦{totalAssets.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <span className="bg-red-100 p-2 rounded-full mr-2">
                          <FileText className="h-4 w-4 text-red-600" />
                        </span>
                        Total Liabilities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₦{totalLiabilities.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <span className="bg-blue-100 p-2 rounded-full mr-2">
                          <Calculator className="h-4 w-4 text-blue-600" />
                        </span>
                        Total Equity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ₦{totalEquity.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-2">
                    Assets = Liabilities + Equity
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                      ₦{totalAssets.toLocaleString()}
                    </span>
                    <span className="text-gray-500">=</span>
                    <span className="text-xl font-bold">
                      ₦{(totalLiabilities + totalEquity).toLocaleString()}
                    </span>
                  </div>
                  <div
                    className={`mt-2 text-sm ${
                      Math.abs(totalAssets - (totalLiabilities + totalEquity)) <
                      1
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {Math.abs(totalAssets - (totalLiabilities + totalEquity)) <
                    1
                      ? "Balance sheet is properly balanced"
                      : "Balance sheet is not balanced"}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assets" className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="w-[50%]">Description</TableHead>
                      <TableHead className="text-right">Amount (₦)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetData.map((category, idx) => (
                      <React.Fragment key={idx}>
                        <TableRow className="bg-muted/50">
                          <TableCell colSpan={2} className="font-medium">
                            {category.category}
                          </TableCell>
                        </TableRow>
                        {category.items.map((item, itemIdx) => (
                          <TableRow key={`${idx}-${itemIdx}`}>
                            <TableCell className="pl-8">{item.name}</TableCell>
                            <TableCell className="text-right">
                              {item.amount.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                    <TableRow className="font-bold">
                      <TableCell>Total Assets</TableCell>
                      <TableCell className="text-right">
                        ₦{totalAssets.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="inventory" className="pt-6">
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Inventory Summary
                    </h3>
                    <p className="text-blue-700 text-sm">
                      Total inventory value across all categories:{" "}
                      <span className="font-bold">
                        ₦{totalInventoryValue.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  {inventoryData.map((category, categoryIdx) => (
                    <Card key={categoryIdx} className="border border-gray-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold text-gray-800">
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="w-[40%]">
                                Item Name
                              </TableHead>
                              <TableHead className="text-center">
                                Quantity
                              </TableHead>
                              <TableHead className="text-center">
                                Unit Price (₦)
                              </TableHead>
                              <TableHead className="text-right">
                                Total Value (₦)
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {category.items.map((item, itemIdx) => (
                              <TableRow
                                key={`${categoryIdx}-${itemIdx}`}
                                className="border-b border-gray-100"
                              >
                                <TableCell className="font-medium">
                                  {item.name}
                                </TableCell>
                                <TableCell className="text-center">
                                  {item.quantity}
                                </TableCell>
                                <TableCell className="text-center">
                                  {item.unitPrice.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                  {item.value.toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="bg-gray-50 font-semibold">
                              <TableCell colSpan={3} className="text-right">
                                Category Total:
                              </TableCell>
                              <TableCell className="text-right">
                                ₦
                                {category.items
                                  .reduce((sum, item) => sum + item.value, 0)
                                  .toLocaleString()}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="bg-green-50 border border-green-200">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-green-900">
                          Grand Total Inventory Value:
                        </span>
                        <span className="text-2xl font-bold text-green-700">
                          ₦{totalInventoryValue.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-green-600 text-sm mt-2">
                        This amount is reflected in the Current Assets section
                        of the balance sheet.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="liabilities" className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="w-[50%]">Description</TableHead>
                      <TableHead className="text-right">Amount (₦)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {liabilityData.map((category, idx) => (
                      <React.Fragment key={idx}>
                        <TableRow className="bg-muted/50">
                          <TableCell colSpan={2} className="font-medium">
                            {category.category}
                          </TableCell>
                        </TableRow>
                        {category.items.map((item, itemIdx) => (
                          <TableRow key={`${idx}-${itemIdx}`}>
                            <TableCell className="pl-8">{item.name}</TableCell>
                            <TableCell className="text-right">
                              {item.amount.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                    <TableRow className="font-bold">
                      <TableCell>Total Liabilities</TableCell>
                      <TableCell className="text-right">
                        ₦{totalLiabilities.toLocaleString()}
                      </TableCell>
                    </TableRow>

                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={2} className="font-medium">
                        Equity
                      </TableCell>
                    </TableRow>

                    {equityData.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="pl-8">{item.name}</TableCell>
                        <TableCell className="text-right">
                          {item.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow className="font-bold">
                      <TableCell>Total Equity</TableCell>
                      <TableCell className="text-right">
                        ₦{totalEquity.toLocaleString()}
                      </TableCell>
                    </TableRow>

                    <TableRow className="font-bold bg-gray-100">
                      <TableCell>Total Liabilities & Equity</TableCell>
                      <TableCell className="text-right">
                        ₦{(totalLiabilities + totalEquity).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default BalanceSheet;
