import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Search,
  FileText,
  FileSpreadsheet,
  Printer,
  Copy,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  School,
  Award,
  BookOpen,
  Calendar,
  Check,
  X,
  Layout,
} from "lucide-react";
import { toast } from "sonner";

// Report Card Preview Component
const ReportCardPreview = ({ template, isFullSize = false }) => {
  // Use template data if needed, for now using static data for demonstration
  const templateData = template || {};
  const scaleClass = isFullSize ? "scale-100" : "scale-[0.3]";
  const containerClass = isFullSize
    ? "w-full h-auto"
    : "w-64 h-32 overflow-hidden";

  return (
    <div className={`${containerClass} bg-white relative`}>
      <div
        className={`transform ${scaleClass} origin-top-left ${
          isFullSize ? "" : "w-[800px] h-[1000px]"
        } border-4 border-green-600`}
      >
        {/* APPROVED Stamp */}
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 text-sm font-bold rounded z-10">
          APPROVED
        </div>

        {/* Header with School Info */}
        <div className="border-b-4 border-black bg-white">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">EDUOS</h1>
                <p className="text-sm text-gray-700">
                  We Serve You Better We Serve You Better
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">08163237773, 08123455678</span>{" "}
                  Email : admin@yourdomain.com
                </p>
              </div>
            </div>
            <div className="w-16 h-20 bg-gray-200 border-2 border-gray-400 flex items-center justify-center">
              <div className="w-12 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-600">Photo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Report Title */}
        <div className="text-center py-3 bg-white border-b-2 border-black">
          <h2 className="text-lg font-bold text-black">
            PRIMARY ONE FIRST TERM ACADEMIC REPORTS
          </h2>
        </div>

        {/* Student Information Section */}
        <div className="grid grid-cols-2 gap-0 bg-white">
          {/* Left Column */}
          <div className="border-r-2 border-black">
            {/* Student's Name */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                Student&apos;s Name:
              </div>
              <div className="p-2 text-sm">MUHAMMAD, Ahmad</div>
            </div>
            {/* Admission Number */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                Admission Number :
              </div>
              <div className="p-2 text-sm">Fcapfnd/cps/14/263</div>
            </div>
            {/* Student Class */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                Student Class :
              </div>
              <div className="p-2 text-sm">Primary One</div>
            </div>
            {/* No. In Class */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                No. In Class :
              </div>
              <div className="p-2 text-sm">-</div>
            </div>
            {/* No. of Times School Opened */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                No. of Times School Opened :
              </div>
              <div className="p-2 text-sm">100</div>
            </div>
            {/* No. of Times Present */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                No. of Times Present :
              </div>
              <div className="p-2 text-sm">100</div>
            </div>
            {/* No. of Times Absent */}
            <div className="grid grid-cols-2">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                No. of Times Absent :
              </div>
              <div className="p-2 text-sm">0</div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Term */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                Term
              </div>
              <div className="p-2 text-sm">FIRST TERM</div>
            </div>
            {/* Session */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                Session
              </div>
              <div className="p-2 text-sm">2023/2024</div>
            </div>
            {/* Total Marks Obtainable */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                Total Marks Obtainable
              </div>
              <div className="p-2 text-sm">200</div>
            </div>
            {/* Total Scored */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                Total Scored
              </div>
              <div className="p-2 text-sm">152</div>
            </div>
            {/* Class Position */}
            <div className="grid grid-cols-2 border-b border-black">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                Class Position
              </div>
              <div className="p-2 text-sm">1st</div>
            </div>
            {/* Students Average */}
            <div className="grid grid-cols-2">
              <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
                Students Average
              </div>
              <div className="p-2 text-sm">76%</div>
            </div>
          </div>
        </div>

        {/* Academic Results Section */}
        <div className="border-t-2 border-black bg-white">
          <div className="bg-blue-200 border-b-2 border-black p-2 text-center">
            <h3 className="text-sm font-bold">
              Summary of the First Term Work
            </h3>
          </div>

          <div className="flex">
            {/* Main Academic Table */}
            <div className="flex-1">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="border border-black p-1 text-xs font-bold transform -rotate-90 w-6">
                      SUBJECT
                    </th>
                    <th className="border border-black p-1 text-xs font-bold">
                      First C.A.
                    </th>
                    <th className="border border-black p-1 text-xs font-bold">
                      Second C.A.
                    </th>
                    <th className="border border-black p-1 text-xs font-bold">
                      3rd C.A.
                    </th>
                    <th className="border border-black p-1 text-xs font-bold">
                      Examination
                    </th>
                    <th className="border border-black p-1 text-xs font-bold">
                      Total Score
                    </th>
                    <th className="border border-black p-1 text-xs font-bold">
                      Class Statistics
                    </th>
                    <th className="border border-black p-1 text-xs font-bold">
                      Inference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-1 text-xs font-bold bg-blue-100">
                      Mathematics
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      20 15
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      10
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      12
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      70 49
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      100
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      76 76.00 76.00
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      B2 Very Good
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-xs font-bold bg-blue-100">
                      English Language
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      20 15
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      10
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      12
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      70 49
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      100
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      76 76.00 76.00
                    </td>
                    <td className="border border-black p-1 text-xs text-center">
                      B2 Very Good
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Total and Statistics Row */}
              <div className="grid grid-cols-4 border-t-2 border-black text-xs">
                <div className="border-r border-black p-1 font-bold">
                  Total of Subjects Offered: 2
                </div>
                <div className="border-r border-black p-1 font-bold">
                  Total of Subjects Pass: 2
                </div>
                <div className="border-r border-black p-1 font-bold">
                  Net Score: 152/200
                </div>
                <div className="p-1 font-bold">Net Grade: Very Good</div>
              </div>
            </div>

            {/* Psychomotor Domain */}
            <div className="w-48 border-l-2 border-black">
              <div className="bg-blue-200 border-b border-black p-1 text-center">
                <h4 className="text-xs font-bold">Psychomotor Domain</h4>
              </div>

              {/* Skills Grid */}
              <div className="space-y-0">
                {[
                  "Handwriting",
                  "Verbal Fluency",
                  "Games/Sports",
                  "Handling Tools",
                  "Affective Domain",
                  "Punctuality",
                  "Neatness",
                  "Politeness",
                  "Co-operation",
                  "Attentiveness",
                  "Carrying Out of Assignment",
                  "Leadership Skill",
                  "Elocution",
                ].map((skill, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 border-b border-black"
                  >
                    <div className="col-span-2 text-xs border-r border-black p-1">
                      {skill}
                    </div>
                    <div className="text-xs text-center p-1">4</div>
                  </div>
                ))}
              </div>

              {/* Co-curricular Activities */}
              <div className="border-t-2 border-black">
                <div className="bg-blue-200 border-b border-black p-1 text-center">
                  <h4 className="text-xs font-bold">
                    Co-curricular Activities
                  </h4>
                </div>
                {["Athletics", "Volley Ball", "Table Tennis"].map(
                  (activity, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 border-b border-black"
                    >
                      <div className="col-span-2 text-xs border-r border-black p-1">
                        {activity}
                      </div>
                      <div className="text-xs text-center p-1">4</div>
                    </div>
                  )
                )}
              </div>

              {/* Key To Rate */}
              <div className="border-t-2 border-black">
                <div className="bg-blue-200 border-b border-black p-1 text-center">
                  <h4 className="text-xs font-bold">Key To Rate</h4>
                </div>
                <div className="text-xs">
                  <div className="grid grid-cols-3 border-b border-black">
                    <div className="border-r border-black p-1">G:</div>
                    <div className="border-r border-black p-1">fail</div>
                    <div className="p-1">1</div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-black">
                    <div className="border-r border-black p-1">49</div>
                    <div className="border-r border-black p-1">Pass</div>
                    <div className="p-1">2</div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-black">
                    <div className="border-r border-black p-1">50</div>
                    <div className="border-r border-black p-1">Good</div>
                    <div className="p-1">3</div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-black">
                    <div className="border-r border-black p-1">51</div>
                    <div className="border-r border-black p-1">Very Good</div>
                    <div className="p-1">4</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="border-r border-black p-1">85</div>
                    <div className="border-r border-black p-1"></div>
                    <div className="p-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments and Signatures Section */}
        <div className="border-t-2 border-black bg-white">
          <div className="grid grid-cols-2 border-b border-black">
            <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
              Head of School&apos;s Remark:
            </div>
            <div className="p-2 text-sm">You Are Get Credit</div>
          </div>
          <div className="grid grid-cols-2 border-b border-black">
            <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
              Class Teacher&apos;s Remark:
            </div>
            <div className="p-2 text-sm">You Get Credit</div>
          </div>
          <div className="grid grid-cols-2 border-b border-black">
            <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
              Head of School&apos;s Signature:
            </div>
            <div className="p-2 text-sm"></div>
          </div>
          <div className="grid grid-cols-2">
            <div className="bg-blue-200 border-r border-black p-2 text-sm font-bold">
              Next Term School Fees:
            </div>
            <div className="p-2 text-sm"></div>
          </div>
        </div>

        {/* Note Section */}
        <div className="border-t-2 border-black bg-white p-2">
          <div className="text-sm font-bold">NOTE:</div>
        </div>

        {/* School Seal */}
        <div className="flex justify-start items-end p-4">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-4 border-yellow-700 flex items-center justify-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultTemplates = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateForm, setTemplateForm] = useState({
    name: "",
    type: "",
    level: "",
    description: "",
    layout: "",
    colorScheme: "",
    status: "active",
    subjects: [],
    gradeSystem: "",
    hasLogo: true,
    hasWatermark: false,
  });

  // Enhanced sample data for templates
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Primary Standard Report",
      type: "Standard",
      level: "Primary",
      description:
        "Standard academic report template for primary school students with subject grades and comments",
      layout: "Portrait",
      colorScheme: "Blue & White",
      status: "active",
      subjects: [
        "Mathematics",
        "English Language",
        "Science",
        "Social Studies",
      ],
      gradeSystem: "A-F",
      hasLogo: true,
      hasWatermark: false,
      dateCreated: "2023-08-15",
      lastModified: "2023-10-01",
      usageCount: 45,
      preview: "/primary-report-preview.jpg",
    },
    {
      id: 2,
      name: "Secondary Detailed Report",
      type: "Detailed",
      level: "Secondary",
      description:
        "Comprehensive report template with detailed analysis, psychomotor skills, and behavioral assessment",
      layout: "Portrait",
      colorScheme: "Green & Gold",
      status: "active",
      subjects: [
        "Mathematics",
        "English Language",
        "Physics",
        "Chemistry",
        "Biology",
        "Geography",
      ],
      gradeSystem: "A1-F9",
      hasLogo: true,
      hasWatermark: true,
      dateCreated: "2023-07-20",
      lastModified: "2023-09-28",
      usageCount: 32,
      preview: "/secondary-report-preview.jpg",
    },
    {
      id: 3,
      name: "Junior Secondary Basic",
      type: "Basic",
      level: "Junior Secondary",
      description:
        "Simple and clean report template for junior secondary school with essential academic information",
      layout: "Portrait",
      colorScheme: "Purple & Silver",
      status: "active",
      subjects: [
        "Mathematics",
        "English Language",
        "Basic Science",
        "Social Studies",
        "French",
      ],
      gradeSystem: "A-E",
      hasLogo: true,
      hasWatermark: false,
      dateCreated: "2023-06-10",
      lastModified: "2023-09-15",
      usageCount: 28,
      preview: "/junior-report-preview.jpg",
    },
    {
      id: 4,
      name: "Senior Secondary WAEC Format",
      type: "WAEC Format",
      level: "Senior Secondary",
      description:
        "WAEC-compliant report template with all required sections and grading format",
      layout: "Portrait",
      colorScheme: "Navy & Gold",
      status: "draft",
      subjects: [
        "Mathematics",
        "English Language",
        "Physics",
        "Chemistry",
        "Biology",
        "Economics",
      ],
      gradeSystem: "A1-F9",
      hasLogo: true,
      hasWatermark: true,
      dateCreated: "2023-09-01",
      lastModified: "2023-10-10",
      usageCount: 15,
      preview: "/waec-report-preview.jpg",
    },
  ]);

  // Filter templates based on search term
  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler functions
  const handleView = (template) => {
    setSelectedTemplate(template);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setTemplateForm({
      name: template.name,
      type: template.type,
      level: template.level,
      description: template.description,
      layout: template.layout,
      colorScheme: template.colorScheme,
      status: template.status,
      subjects: template.subjects,
      gradeSystem: template.gradeSystem,
      hasLogo: template.hasLogo,
      hasWatermark: template.hasWatermark,
    });
    setIsEditDialogOpen(true);
  };

  const handleAdd = () => {
    setTemplateForm({
      name: "",
      type: "",
      level: "",
      description: "",
      layout: "",
      colorScheme: "",
      status: "active",
      subjects: [],
      gradeSystem: "",
      hasLogo: true,
      hasWatermark: false,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (template) => {
    setSelectedTemplate(template);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (!templateForm.name || !templateForm.type || !templateForm.level) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
        duration: 3000,
      });
      return;
    }

    if (selectedTemplate) {
      // Update existing template
      setTemplates((prev) =>
        prev.map((template) =>
          template.id === selectedTemplate.id
            ? {
                ...template,
                ...templateForm,
                lastModified: new Date().toISOString().split("T")[0],
              }
            : template
        )
      );
      setIsEditDialogOpen(false);
      toast.success("Template Updated", {
        description: `${templateForm.name} has been updated successfully.`,
        icon: <Check className="h-4 w-4" />,
        duration: 4000,
      });
    } else {
      // Add new template
      const newTemplate = {
        ...templateForm,
        id: templates.length + 1,
        dateCreated: new Date().toISOString().split("T")[0],
        lastModified: new Date().toISOString().split("T")[0],
        usageCount: 0,
        preview: "/default-preview.jpg",
      };
      setTemplates((prev) => [...prev, newTemplate]);
      setIsAddDialogOpen(false);
      toast.success("Template Created", {
        description: `${templateForm.name} has been created successfully.`,
        icon: <Check className="h-4 w-4" />,
        duration: 4000,
      });
    }

    setSelectedTemplate(null);
    setTemplateForm({
      name: "",
      type: "",
      level: "",
      description: "",
      layout: "",
      colorScheme: "",
      status: "active",
      subjects: [],
      gradeSystem: "",
      hasLogo: true,
      hasWatermark: false,
    });
  };

  const confirmDelete = () => {
    setTemplates((prev) =>
      prev.filter((template) => template.id !== selectedTemplate.id)
    );
    setIsDeleteDialogOpen(false);

    toast.success("Template Deleted", {
      description: `${selectedTemplate.name} has been deleted successfully.`,
      icon: <Check className="h-4 w-4" />,
      duration: 4000,
    });

    setSelectedTemplate(null);
  };

  const handleDownloadTemplate = (template) => {
    // Simulate template download
    toast.success("Template Download", {
      description: `Downloading ${template.name} template...`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  // Export functions
  const handleExportCSV = () => {
    const csvContent = [
      [
        "ID",
        "Name",
        "Type",
        "Level",
        "Layout",
        "Color Scheme",
        "Status",
        "Usage Count",
        "Date Created",
      ],
      ...filteredTemplates.map((template) => [
        template.id,
        template.name,
        template.type,
        template.level,
        template.layout,
        template.colorScheme,
        template.status,
        template.usageCount,
        template.dateCreated,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "result_templates.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`CSV Export Complete`, {
      description: `Successfully exported ${filteredTemplates.length} templates to CSV file.`,
      icon: <Download className="h-4 w-4" />,
      duration: 3000,
    });
  };

  const handlePrint = () => {
    window.print();
    toast.info(`Print Dialog Opened`, {
      description: `Preparing to print ${filteredTemplates.length} result templates.`,
      icon: <Printer className="h-4 w-4" />,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Result Templates
        </h2>
        <Button
          onClick={handleAdd}
          className="bg-eduos-primary hover:bg-eduos-primary/90 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Template
        </Button>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Report Card Templates</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search templates..."
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
                className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
            </div>
          </div>

          {/* Templates Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-all duration-200 border border-gray-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {template.name}
                    </CardTitle>
                    <Badge
                      className={`${
                        template.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {template.status === "active" ? "Active" : "Draft"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Template Preview - Using ReportCardPreview Component */}
                  <div className="mb-4 rounded-lg overflow-hidden border border-gray-300">
                    <ReportCardPreview template={template} isFullSize={false} />
                  </div>

                  {/* Template Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Type:
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {template.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Level:
                      </span>
                      <span className="text-sm text-gray-800">
                        {template.level}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Layout:
                      </span>
                      <span className="text-sm text-gray-800">
                        {template.layout}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Usage:
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {template.usageCount} times
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 hover:bg-blue-50"
                      onClick={() => handleView(template)}
                    >
                      <Eye size={14} />
                      <span>Preview</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 hover:bg-green-50"
                      onClick={() => handleDownloadTemplate(template)}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 hover:bg-yellow-50"
                      onClick={() => handleEdit(template)}
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 hover:bg-red-50 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(template)}
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No templates found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? `No templates match your search for "${searchTerm}"`
                  : "Get started by creating your first result template"}
              </p>
              {!searchTerm && (
                <Button
                  onClick={handleAdd}
                  className="bg-eduos-primary hover:bg-eduos-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Template
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Template Preview Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Template Preview: {selectedTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ReportCardPreview
                  template={selectedTemplate}
                  isFullSize={true}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <strong>Template Type:</strong> {selectedTemplate.type}
                  </p>
                  <p>
                    <strong>Education Level:</strong> {selectedTemplate.level}
                  </p>
                  <p>
                    <strong>Layout:</strong> {selectedTemplate.layout}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Color Scheme:</strong>{" "}
                    {selectedTemplate.colorScheme}
                  </p>
                  <p>
                    <strong>Grade System:</strong>{" "}
                    {selectedTemplate.gradeSystem}
                  </p>
                  <p>
                    <strong>Usage Count:</strong> {selectedTemplate.usageCount}{" "}
                    times
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {selectedTemplate.description}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close Preview
            </Button>
            <Button onClick={() => handleDownloadTemplate(selectedTemplate)}>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Template Dialog */}
      <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
            setSelectedTemplate(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              {isEditDialogOpen ? "Edit Template" : "Add New Template"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name *</Label>
                <Input
                  id="templateName"
                  value={templateForm.name}
                  onChange={(e) =>
                    setTemplateForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter template name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateType">Template Type *</Label>
                <Select
                  value={templateForm.type}
                  onValueChange={(value) =>
                    setTemplateForm((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Detailed">Detailed</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="WAEC Format">WAEC Format</SelectItem>
                    <SelectItem value="NECO Format">NECO Format</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateLevel">Education Level *</Label>
                <Select
                  value={templateForm.level}
                  onValueChange={(value) =>
                    setTemplateForm((prev) => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primary">Primary</SelectItem>
                    <SelectItem value="Junior Secondary">
                      Junior Secondary
                    </SelectItem>
                    <SelectItem value="Senior Secondary">
                      Senior Secondary
                    </SelectItem>
                    <SelectItem value="All Levels">All Levels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateLayout">Layout</Label>
                <Select
                  value={templateForm.layout}
                  onValueChange={(value) =>
                    setTemplateForm((prev) => ({ ...prev, layout: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Portrait">Portrait</SelectItem>
                    <SelectItem value="Landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="colorScheme">Color Scheme</Label>
                <Select
                  value={templateForm.colorScheme}
                  onValueChange={(value) =>
                    setTemplateForm((prev) => ({ ...prev, colorScheme: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blue & White">Blue & White</SelectItem>
                    <SelectItem value="Green & Gold">Green & Gold</SelectItem>
                    <SelectItem value="Purple & Silver">
                      Purple & Silver
                    </SelectItem>
                    <SelectItem value="Navy & Gold">Navy & Gold</SelectItem>
                    <SelectItem value="Red & White">Red & White</SelectItem>
                    <SelectItem value="Black & Gold">Black & Gold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradeSystem">Grade System</Label>
                <Select
                  value={templateForm.gradeSystem}
                  onValueChange={(value) =>
                    setTemplateForm((prev) => ({ ...prev, gradeSystem: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A-F">A-F</SelectItem>
                    <SelectItem value="A-E">A-E</SelectItem>
                    <SelectItem value="A1-F9">A1-F9</SelectItem>
                    <SelectItem value="1-100">1-100</SelectItem>
                    <SelectItem value="Distinction/Credit/Pass/Fail">
                      Distinction/Credit/Pass/Fail
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={templateForm.status}
                  onValueChange={(value) =>
                    setTemplateForm((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={templateForm.description}
                onChange={(e) =>
                  setTemplateForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter template description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasLogo"
                  checked={templateForm.hasLogo}
                  onChange={(e) =>
                    setTemplateForm((prev) => ({
                      ...prev,
                      hasLogo: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <Label htmlFor="hasLogo">Include School Logo</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasWatermark"
                  checked={templateForm.hasWatermark}
                  onChange={(e) =>
                    setTemplateForm((prev) => ({
                      ...prev,
                      hasWatermark: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <Label htmlFor="hasWatermark">Include Watermark</Label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setIsEditDialogOpen(false);
                setSelectedTemplate(null);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>
              <Check className="h-4 w-4 mr-2" />
              {isEditDialogOpen ? "Update Template" : "Create Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete Template
            </DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this template? This action
                cannot be undone.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Template:</span>{" "}
                    {selectedTemplate.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Type:</span>{" "}
                    {selectedTemplate.type}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Level:</span>{" "}
                    {selectedTemplate.level}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Usage Count:</span>{" "}
                    {selectedTemplate.usageCount} times
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedTemplate(null);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResultTemplates;
