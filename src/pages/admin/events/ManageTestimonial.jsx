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
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../components/ui/hover-card";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";

const ManageTestimonial = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for testimonials with state management
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Student",
      content:
        "This school has changed my life completely. The teachers are amazing!",
      date: "2023-05-15",
      status: "approved",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Parent",
      content:
        "My child has improved significantly since joining this institution.",
      date: "2023-06-22",
      status: "approved",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Alumni",
      content:
        "The values I learned here continue to guide me in my professional life.",
      date: "2023-08-10",
      status: "pending",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Student",
      content:
        "The extracurricular activities here have helped me discover my talents.",
      date: "2023-09-01",
      status: "approved",
    },
    {
      id: 5,
      name: "Robert Wilson",
      role: "Parent",
      content: "The communication between teachers and parents is excellent.",
      date: "2023-08-25",
      status: "pending",
    },
  ]);

  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Action handlers
  const handleAdd = () => {
    toast.success("Add Testimonial", {
      description: "Redirecting to add testimonial form...",
      icon: <PlusCircle className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleEdit = (testimonial) => {
    toast.info(`Edit Testimonial - ${testimonial.name}`, {
      description: `Opening editor for ${testimonial.role}'s testimonial`,
      icon: <Edit className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleDelete = (testimonial) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== testimonial.id));
    toast.error(`Testimonial Deleted`, {
      description: `${testimonial.name}'s testimonial has been removed successfully.`,
      icon: <Trash className="h-4 w-4" />,
      duration: 4000,
    });
  };

  const handleUpdateChanges = () => {
    toast.success("Changes Updated", {
      description: "All testimonial changes have been saved successfully.",
      icon: <Check className="h-4 w-4" />,
      duration: 3000,
    });
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Name", "Role", "Content", "Date", "Status"],
      ...filteredTestimonials.map((testimonial) => [
        testimonial.id,
        testimonial.name,
        testimonial.role,
        testimonial.content,
        testimonial.date,
        testimonial.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "testimonials.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV Export Complete", {
      description: `Successfully exported ${filteredTestimonials.length} testimonials to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handleExportText = () => {
    const textContent = filteredTestimonials
      .map(
        (testimonial) =>
          `${testimonial.id}. ${testimonial.name} (${testimonial.role}) - ${testimonial.date}\n"${testimonial.content}"\nStatus: ${testimonial.status}`
      )
      .join("\n\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "testimonials.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Text Export Complete", {
      description: `Successfully exported ${filteredTestimonials.length} testimonials to text file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info("Print Dialog Opened", {
      description: `Preparing to print ${filteredTestimonials.length} testimonials.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  const handleCopy = () => {
    const tableData = filteredTestimonials
      .map(
        (testimonial) =>
          `${testimonial.id}\t${testimonial.name}\t${testimonial.role}\t${testimonial.content}\t${testimonial.date}\t${testimonial.status}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        toast.success("Copied to Clipboard", {
          description: `Successfully copied ${filteredTestimonials.length} testimonials data to clipboard.`,
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
          Manage Testimonials
        </h2>
        <div className="flex gap-3">
          <Button
            className="bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleUpdateChanges}
          >
            <Check className="mr-2 h-4 w-4" /> Update Changes
          </Button>
          <Button
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={handleAdd}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
          </Button>
        </div>
      </div>

      <Card className="animate-fade-in delay-100 mt-3 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Testimonials Management</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search testimonials..."
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
                A list of testimonials from students, parents and alumni.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">ID</TableHead>
                  <TableHead className="bg-gray-100">Name</TableHead>
                  <TableHead className="bg-gray-100">Role</TableHead>
                  <TableHead className="bg-gray-100">Content</TableHead>
                  <TableHead className="bg-gray-100">Date</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.map((testimonial) => (
                  <TableRow
                    key={testimonial.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{testimonial.id}</TableCell>
                    <TableCell className="font-medium">
                      {testimonial.name}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">
                        {testimonial.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <HoverCard>
                        <HoverCardTrigger>
                          <span className="cursor-pointer underline decoration-dotted hover:text-eduos-primary">
                            {testimonial.content.substring(0, 30)}...
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <p className="text-sm">{testimonial.content}</p>
                        </HoverCardContent>
                      </HoverCard>
                    </TableCell>
                    <TableCell>{testimonial.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          testimonial.status === "approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        {testimonial.status === "approved"
                          ? "Approved"
                          : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:border-amber-600 hover:bg-amber-50"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(testimonial)}
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
              <span className="font-medium">{filteredTestimonials.length}</span>{" "}
              of <span className="font-medium">{testimonials.length}</span>{" "}
              testimonials
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

export default ManageTestimonial;
