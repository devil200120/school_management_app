import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  PlusCircle,
  Edit,
  Trash,
  Search,
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  Download,
  Check,
  X,
  DollarSign,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";

const StudentPriceList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for price list with state management
  const [priceList, setPriceList] = useState([
    {
      id: 1,
      item: "Registration Fee",
      level: "All Levels",
      price: 50,
      description: "One-time registration fee for new students",
      currency: "USD",
      status: "active",
    },
    {
      id: 2,
      item: "Tuition Fee",
      level: "Elementary",
      price: 500,
      description: "Per term tuition fee",
      currency: "USD",
      status: "active",
    },
    {
      id: 3,
      item: "Tuition Fee",
      level: "Middle School",
      price: 650,
      description: "Per term tuition fee",
      currency: "USD",
      status: "active",
    },
    {
      id: 4,
      item: "Tuition Fee",
      level: "High School",
      price: 800,
      description: "Per term tuition fee",
      currency: "USD",
      status: "active",
    },
    {
      id: 5,
      item: "Books and Supplies",
      level: "Elementary",
      price: 100,
      description: "Per term book and supply fee",
      currency: "USD",
      status: "active",
    },
    {
      id: 6,
      item: "Books and Supplies",
      level: "Middle School",
      price: 150,
      description: "Per term book and supply fee",
      currency: "USD",
      status: "active",
    },
    {
      id: 7,
      item: "Laboratory Fee",
      level: "High School",
      price: 120,
      description: "Science laboratory usage fee per term",
      currency: "USD",
      status: "active",
    },
    {
      id: 8,
      item: "Sports Fee",
      level: "All Levels",
      price: 75,
      description: "Sports activities and equipment fee",
      currency: "USD",
      status: "inactive",
    },
  ]);

  // Filter price list based on search term
  const filteredPriceList = priceList.filter(
    (item) =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Action handlers
  const handleAdd = () => {
    toast.success("Add New Price Item", {
      description: "Redirecting to add new price item form...",
      icon: <PlusCircle className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleEdit = (item) => {
    toast.info(`Edit Price Item - ${item.item}`, {
      description: `Opening editor for ${item.level} fee structure`,
      icon: <Edit className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleDelete = (item) => {
    setPriceList((prev) => prev.filter((p) => p.id !== item.id));
    toast.error(`Price Item Deleted`, {
      description: `${item.item} for ${item.level} has been removed from the fee structure.`,
      icon: <Trash className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleUpdateChanges = () => {
    toast.success("Fee Structure Updated", {
      description:
        "All price changes have been saved and will take effect immediately.",
      icon: <Check className="h-4 w-4" />,
      duration: 3000,
    });
  };

  // Format currency
  const formatPrice = (price, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Item", "Level", "Price", "Currency", "Description", "Status"],
      ...filteredPriceList.map((item) => [
        item.id,
        item.item,
        item.level,
        item.price,
        item.currency,
        item.description,
        item.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_price_list.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredPriceList.length} price items to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredPriceList
      .map(
        (item) =>
          `${item.id}. ${item.item} - ${item.level}\nPrice: ${formatPrice(
            item.price,
            item.currency
          )}\nDescription: ${item.description}\nStatus: ${item.status}`
      )
      .join("\n\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_price_list.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Text Export Complete", {
      description: `Successfully exported ${filteredPriceList.length} price items to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print Dialog Opened", {
      description: `Preparing to print ${filteredPriceList.length} price items.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredPriceList
      .map(
        (item) =>
          `${item.id}\t${item.item}\t${item.level}\t${formatPrice(
            item.price,
            item.currency
          )}\t${item.description}\t${item.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredPriceList.length} price items data to clipboard.`,
          icon: <Copy className="h-4 w-4" />,
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error("Copy Failed", {
          description: "Unable to copy data to clipboard. Please try again.",
          icon: <X className="h-4 w-4" />,
          duration: 3000,
        });
      });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Student Price List
        </h2>
        <div className="flex gap-3">
          <Button
            className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleUpdateChanges}
          >
            <Check className="mr-2 h-4 w-4" /> Update Changes
          </Button>
          <Button
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleAdd}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Price
          </Button>
        </div>
      </div>

      <Card className="animate-fade-in delay-100 mt-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Fee Structure Management
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
                placeholder="Search price items..."
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
              <TableCaption>
                Current price list for all student services and fees.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">ID</TableHead>
                  <TableHead className="bg-gray-100">Item</TableHead>
                  <TableHead className="bg-gray-100">Level</TableHead>
                  <TableHead className="bg-gray-100">Price</TableHead>
                  <TableHead className="bg-gray-100">Description</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPriceList.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">{item.item}</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-100 text-purple-800">
                        {item.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold text-green-600 text-lg">
                      {formatPrice(item.price, item.currency)}
                    </TableCell>
                    <TableCell
                      className="max-w-xs truncate"
                      title={item.description}
                    >
                      {item.description}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          item.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {item.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:border-amber-600 hover:bg-amber-50"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{filteredPriceList.length}</span> of{" "}
              <span className="font-medium">{priceList.length}</span> price
              items
              <span className="ml-4 text-eduos-primary font-medium">
                Total Active Items:{" "}
                {priceList.filter((item) => item.status === "active").length}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentPriceList;
