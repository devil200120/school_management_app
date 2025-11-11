import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  FileText,
  Download,
  Calendar,
  DollarSign,
  User,
  GraduationCap,
  BookOpen,
  Trophy,
  Utensils,
  Bus,
  ShirtIcon as Uniform,
  Calculator,
  AlertCircle,
} from "lucide-react";

const FeeStructure = () => {
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedSession, setSelectedSession] = useState("2024-2025");

  // Mock data for fee structures
  const feeStructures = {
    "2024-2025": {
      "JSS 2A": {
        termFees: {
          tuition: 35000,
          development: 5000,
          examination: 2000,
          library: 1000,
          sports: 1500,
          laboratory: 2500,
          total: 47000,
        },
        sessionFees: {
          admission: 0, // Already paid
          registration: 2000,
          uniform: 8000,
          textbooks: 12000,
          pta: 3000,
          medical: 1500,
          total: 26500,
        },
        optionalFees: [
          {
            name: "Extra Curricular Activities",
            amount: 5000,
            description: "Drama, Music, Art classes",
          },
          {
            name: "Hostel Accommodation",
            amount: 45000,
            description: "Per term for boarding students",
          },
          {
            name: "Feeding (Day Students)",
            amount: 25000,
            description: "Lunch and snacks per term",
          },
          {
            name: "Transportation",
            amount: 15000,
            description: "School bus service per term",
          },
          {
            name: "Computer Training",
            amount: 8000,
            description: "ICT practical sessions",
          },
        ],
        paymentSchedule: [
          {
            term: "First Term",
            dueDate: "2024-09-15",
            amount: 47000,
            status: "paid",
          },
          {
            term: "Second Term",
            dueDate: "2025-01-15",
            amount: 47000,
            status: "pending",
          },
          {
            term: "Third Term",
            dueDate: "2025-05-15",
            amount: 47000,
            status: "upcoming",
          },
        ],
      },
      "Primary 5B": {
        termFees: {
          tuition: 25000,
          development: 3000,
          examination: 1500,
          library: 800,
          sports: 1000,
          laboratory: 1200,
          total: 32500,
        },
        sessionFees: {
          admission: 0,
          registration: 1500,
          uniform: 6000,
          textbooks: 8000,
          pta: 2000,
          medical: 1000,
          total: 18500,
        },
        optionalFees: [
          {
            name: "Extra Curricular Activities",
            amount: 3000,
            description: "Arts and crafts, music",
          },
          {
            name: "Feeding (Day Students)",
            amount: 20000,
            description: "Lunch and snacks per term",
          },
          {
            name: "Transportation",
            amount: 12000,
            description: "School bus service per term",
          },
          {
            name: "Swimming Lessons",
            amount: 5000,
            description: "Weekly swimming classes",
          },
        ],
        paymentSchedule: [
          {
            term: "First Term",
            dueDate: "2024-09-15",
            amount: 32500,
            status: "paid",
          },
          {
            term: "Second Term",
            dueDate: "2025-01-15",
            amount: 32500,
            status: "pending",
          },
          {
            term: "Third Term",
            dueDate: "2025-05-15",
            amount: 32500,
            status: "upcoming",
          },
        ],
      },
    },
  };

  const children = [
    { id: "1", name: "Sarah Johnson", class: "JSS 2A" },
    { id: "2", name: "Michael Johnson", class: "Primary 5B" },
  ];

  const sessions = [
    { value: "2024-2025", label: "2024/2025 Academic Session" },
    { value: "2023-2024", label: "2023/2024 Academic Session" },
  ];

  const getSelectedChild = () =>
    children.find((child) => child.id === selectedChild);
  const selectedChildData = getSelectedChild();
  const feeData = selectedChildData
    ? feeStructures[selectedSession]?.[selectedChildData.class]
    : null;

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFeeIcon = (feeType) => {
    switch (feeType) {
      case "tuition":
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case "development":
        return <GraduationCap className="h-5 w-5 text-green-500" />;
      case "examination":
        return <FileText className="h-5 w-5 text-purple-500" />;
      case "library":
        return <BookOpen className="h-5 w-5 text-orange-500" />;
      case "sports":
        return <Trophy className="h-5 w-5 text-red-500" />;
      case "laboratory":
        return <Calculator className="h-5 w-5 text-indigo-500" />;
      case "uniform":
        return <Uniform className="h-5 w-5 text-pink-500" />;
      case "feeding":
        return <Utensils className="h-5 w-5 text-yellow-500" />;
      case "transportation":
        return <Bus className="h-5 w-5 text-cyan-500" />;
      default:
        return <DollarSign className="h-5 w-5 text-gray-500" />;
    }
  };

  const totalAnnualFees = feeData
    ? feeData.termFees.total * 3 + feeData.sessionFees.total
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Structure</h1>
          <p className="text-gray-600 mt-1">
            View detailed breakdown of school fees and payment schedules
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Fee Structure
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Child</label>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your child" />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {child.name} - {child.class}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Academic Session</label>
          <Select value={selectedSession} onValueChange={setSelectedSession}>
            <SelectTrigger>
              <SelectValue placeholder="Choose session" />
            </SelectTrigger>
            <SelectContent>
              {sessions.map((session) => (
                <SelectItem key={session.value} value={session.value}>
                  {session.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedChildData && feeData && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Term Fee</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  ₦{feeData.termFees.total.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Per term</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Session Fee
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ₦{feeData.sessionFees.total.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  One-time per session
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Annual Total
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  ₦{totalAnnualFees.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Compulsory fees only
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {selectedChildData.class}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedChildData.name}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Term Fees Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Term Fees Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(feeData.termFees).map(([key, amount]) => {
                  if (key === "total") return null;
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getFeeIcon(key)}
                        <div>
                          <h4 className="font-medium capitalize">{key} Fee</h4>
                          <p className="text-sm text-gray-600">Per term</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          ₦{amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">Total Term Fee</h4>
                  <div className="text-2xl font-bold text-blue-600">
                    ₦{feeData.termFees.total.toLocaleString()}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Payable every term (3 times per session)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Session Fees Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Session Fees Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(feeData.sessionFees).map(([key, amount]) => {
                  if (key === "total") return null;
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getFeeIcon(key)}
                        <div>
                          <h4 className="font-medium capitalize">{key} Fee</h4>
                          <p className="text-sm text-gray-600">
                            One-time payment
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          ₦{amount.toLocaleString()}
                        </div>
                        {amount === 0 && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Paid
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">Total Session Fee</h4>
                  <div className="text-2xl font-bold text-green-600">
                    ₦{feeData.sessionFees.total.toLocaleString()}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  One-time payment at the beginning of the session
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Optional Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Optional Fees & Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feeData.optionalFees.map((fee, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{fee.name}</h4>
                      <div className="font-bold text-blue-600">
                        ₦{fee.amount.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{fee.description}</p>
                    <Button size="sm" variant="outline" className="mt-3 w-full">
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Payment Schedule - {selectedSession}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeData.paymentSchedule.map((schedule, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${
                      schedule.status === "paid"
                        ? "bg-green-50 border-green-200"
                        : schedule.status === "pending"
                        ? "bg-yellow-50 border-yellow-200"
                        : schedule.status === "overdue"
                        ? "bg-red-50 border-red-200"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{schedule.term}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Due:{" "}
                            {new Date(schedule.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          ₦{schedule.amount.toLocaleString()}
                        </div>
                        <Badge className={getStatusColor(schedule.status)}>
                          {schedule.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-orange-800">
                      Payment Policy
                    </h4>
                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                      <li>
                        • Term fees must be paid within 2 weeks of resumption
                      </li>
                      <li>
                        • Late payment attracts a penalty of 10% of the term fee
                      </li>
                      <li>
                        • Session fees are paid once at the beginning of the
                        academic year
                      </li>
                      <li>
                        • Optional fees can be paid separately or with term fees
                      </li>
                      <li>
                        • Payment receipts must be kept for record purposes
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!feeData && selectedChildData && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No fee structure found
            </h3>
            <p className="text-gray-600">
              Fee structure for {selectedChildData.name} in {selectedSession} is
              not available yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FeeStructure;
