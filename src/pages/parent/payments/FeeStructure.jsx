import { useState } from "react";
import {
  Card,
  CardContent,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
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
  ShoppingCart,
  CreditCard,
  Printer,
  Share2,
  Plus,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

const FeeStructure = () => {
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedSession, setSelectedSession] = useState("2024-2025");
  const [cart, setCart] = useState([]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showTermPaymentDialog, setShowTermPaymentDialog] = useState(false);
  const [selectedTermPayment, setSelectedTermPayment] = useState(null);

  // Add to cart function
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        toast.error("Item already in cart");
        return prevCart;
      }
      toast.success(`${item.name} added to cart`);
      return [...prevCart, { ...item, id: Date.now() }];
    });
  };

  // Remove from cart function
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    toast.success("Item removed from cart");
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.amount, 0);

  // Handle term payment
  const handleTermPayment = (schedule) => {
    setSelectedTermPayment(schedule);
    setShowTermPaymentDialog(true);
  };

  // Process term payment
  const processTermPayment = (paymentMethod) => {
    if (!selectedTermPayment) return;

    const paymentData = {
      student: children.find(child => child.id === selectedChild),
      term: selectedTermPayment.term,
      amount: selectedTermPayment.amount,
      dueDate: selectedTermPayment.dueDate,
      method: paymentMethod,
      session: selectedSession
    };

    // Simulate payment processing with different methods
    let loadingMessage = 'Processing payment...';
    let successMessage = 'Payment successful!';
    
    if (paymentMethod === 'card') {
      loadingMessage = 'Processing card payment...';
      successMessage = `Card payment of ₦${selectedTermPayment.amount.toLocaleString()} completed successfully!`;
    } else if (paymentMethod === 'bank') {
      loadingMessage = 'Redirecting to bank portal...';
      successMessage = `Bank transfer initiated for ₦${selectedTermPayment.amount.toLocaleString()}. Please complete the transaction.`;
    } else if (paymentMethod === 'wallet') {
      loadingMessage = 'Processing wallet payment...';
      successMessage = `Wallet payment of ₦${selectedTermPayment.amount.toLocaleString()} completed successfully!`;
    }

    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          // Here you would normally make an API call to your payment processor
          console.log('Payment processed:', paymentData);
          setShowTermPaymentDialog(false);
          setSelectedTermPayment(null);
          resolve();
        }, 3000);
      }),
      {
        loading: loadingMessage,
        success: successMessage + ' Receipt has been sent to your email.',
        error: 'Payment failed. Please try again.',
      }
    );
  };

  // Download fee structure function
  const downloadFeeStructure = () => {
    const selectedChildData = children.find(child => child.id === selectedChild);
    if (!selectedChildData || !feeData) {
      toast.error("No fee structure data available");
      return;
    }

    const content = `
EDUOS SCHOOL MANAGEMENT SYSTEM
Fee Structure Report

Student: ${selectedChildData.name}
Class: ${selectedChildData.class}
Session: ${selectedSession}
Generated: ${new Date().toLocaleDateString()}

COMPULSORY FEES:
====================

TERM FEES (Per Term):
- Tuition Fee: ₦${feeData.termFees.tuition.toLocaleString()}
- Development Fee: ₦${feeData.termFees.development.toLocaleString()}
- Examination Fee: ₦${feeData.termFees.examination.toLocaleString()}
- Library Fee: ₦${feeData.termFees.library.toLocaleString()}
- Sports Fee: ₦${feeData.termFees.sports.toLocaleString()}
- Laboratory Fee: ₦${feeData.termFees.laboratory.toLocaleString()}
-----------------------------------------
TOTAL PER TERM: ₦${feeData.termFees.total.toLocaleString()}

SESSION FEES (One-time):
- Registration: ₦${feeData.sessionFees.registration.toLocaleString()}
- Uniform: ₦${feeData.sessionFees.uniform.toLocaleString()}
- Textbooks: ₦${feeData.sessionFees.textbooks.toLocaleString()}
- PTA: ₦${feeData.sessionFees.pta.toLocaleString()}
- Medical: ₦${feeData.sessionFees.medical.toLocaleString()}
-----------------------------------------
TOTAL SESSION FEE: ₦${feeData.sessionFees.total.toLocaleString()}

TOTAL ANNUAL FEE: ₦${totalAnnualFees.toLocaleString()}

OPTIONAL FEES:
====================
${feeData.optionalFees.map(fee => 
  `- ${fee.name}: ₦${fee.amount.toLocaleString()}\n  ${fee.description}`
).join('\n')}

PAYMENT SCHEDULE:
====================
${feeData.paymentSchedule.map(schedule => 
  `${schedule.term} - Due: ${new Date(schedule.dueDate).toLocaleDateString()} - ₦${schedule.amount.toLocaleString()} - Status: ${schedule.status.toUpperCase()}`
).join('\n')}

Generated by EDUOS School Management System
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Fee_Structure_${selectedChildData.name}_${selectedSession}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Fee structure downloaded successfully!");
  };

  // Share fee structure function
  const shareFeeStructure = async () => {
    const selectedChildData = children.find(child => child.id === selectedChild);
    if (!selectedChildData || !feeData) {
      toast.error("No fee structure data available");
      return;
    }

    const shareData = {
      title: `Fee Structure - ${selectedChildData.name}`,
      text: `Fee structure for ${selectedChildData.name} (${selectedChildData.class}) - ${selectedSession}. Total annual fees: ₦${totalAnnualFees.toLocaleString()}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Fee structure shared successfully!");
      } catch (err) {
        if (err.name !== 'AbortError') {
          fallbackShare(shareData);
        }
      }
    } else {
      fallbackShare(shareData);
    }
  };

  const fallbackShare = (shareData) => {
    navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
      .then(() => toast.success("Fee structure copied to clipboard!"))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  // Print fee structure function
  const printFeeStructure = () => {
    const selectedChildData = children.find(child => child.id === selectedChild);
    if (!selectedChildData || !feeData) {
      toast.error("No fee structure data available");
      return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Fee Structure - ${selectedChildData.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .fee-item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
            .total { font-weight: bold; background: #f5f5f5; padding: 10px; margin: 10px 0; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>EDUOS SCHOOL MANAGEMENT SYSTEM</h1>
            <h2>Fee Structure</h2>
            <p>Student: ${selectedChildData.name} | Class: ${selectedChildData.class} | Session: ${selectedSession}</p>
            <p>Generated: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="section">
            <h3>Term Fees (Payable 3 times per session)</h3>
            ${Object.entries(feeData.termFees).filter(([key]) => key !== 'total').map(([key, amount]) => 
              `<div class="fee-item"><span>${key.charAt(0).toUpperCase() + key.slice(1)} Fee:</span><span>₦${amount.toLocaleString()}</span></div>`
            ).join('')}
            <div class="total">Total Per Term: ₦${feeData.termFees.total.toLocaleString()}</div>
          </div>

          <div class="section">
            <h3>Session Fees (One-time payment)</h3>
            ${Object.entries(feeData.sessionFees).filter(([key]) => key !== 'total').map(([key, amount]) => 
              `<div class="fee-item"><span>${key.charAt(0).toUpperCase() + key.slice(1)} Fee:</span><span>₦${amount.toLocaleString()}</span></div>`
            ).join('')}
            <div class="total">Total Session Fee: ₦${feeData.sessionFees.total.toLocaleString()}</div>
          </div>

          <div class="section">
            <h3>Payment Schedule</h3>
            <table>
              <tr><th>Term</th><th>Due Date</th><th>Amount</th><th>Status</th></tr>
              ${feeData.paymentSchedule.map(schedule => 
                `<tr><td>${schedule.term}</td><td>${new Date(schedule.dueDate).toLocaleDateString()}</td><td>₦${schedule.amount.toLocaleString()}</td><td>${schedule.status.toUpperCase()}</td></tr>`
              ).join('')}
            </table>
          </div>

          <div class="total" style="font-size: 18px;">
            TOTAL ANNUAL FEES: ₦${totalAnnualFees.toLocaleString()}
          </div>

          <div class="section">
            <h3>Optional Fees & Services</h3>
            ${feeData.optionalFees.map(fee => 
              `<div class="fee-item"><span>${fee.name}</span><span>₦${fee.amount.toLocaleString()}</span></div>
               <div style="font-size: 12px; color: #666; margin-left: 10px;">${fee.description}</div>`
            ).join('')}
          </div>

          <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #666;">
            Generated by EDUOS School Management System
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
    toast.success("Printing fee structure...");
  };

  // Process payment function
  const processPayment = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    // Simulate payment processing
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setCart([]);
          setShowPaymentDialog(false);
          resolve();
        }, 2000);
      }),
      {
        loading: 'Processing payment...',
        success: 'Payment successful! Receipt will be sent via email.',
        error: 'Payment failed. Please try again.',
      }
    );
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-3">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Fee Structure
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Comprehensive breakdown of school fees, payment schedules, and optional services
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Academic Year {selectedSession}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/50 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                  onClick={downloadFeeStructure}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/50 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                  onClick={printFeeStructure}
                >
                  <Printer className="h-5 w-5 mr-2" />
                  Print
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/50 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                  onClick={shareFeeStructure}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
                {cart.length > 0 && (
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => setShowPaymentDialog(true)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart ({cart.length})
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Select Student</h3>
                    <p className="text-sm text-gray-500">Choose your child to view fees</p>
                  </div>
                </div>
                <Select value={selectedChild} onValueChange={setSelectedChild}>
                  <SelectTrigger className="h-12 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl">
                    <SelectValue placeholder="Choose your child" />
                  </SelectTrigger>
                  <SelectContent>
                    {children.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        <div className="flex items-center gap-3 py-1">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{child.name}</div>
                            <div className="text-sm text-gray-500">{child.class}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Academic Session</h3>
                    <p className="text-sm text-gray-500">Select the academic year</p>
                  </div>
                </div>
                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl">
                    <SelectValue placeholder="Choose session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((session) => (
                      <SelectItem key={session.value} value={session.value}>
                        <div className="flex items-center gap-3 py-1">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <GraduationCap className="h-4 w-4 text-purple-600" />
                          </div>
                          {session.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {selectedChildData && feeData && (
          <>
            {/* Overview Stats */}
            <div className="mb-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Fee Overview</h2>
                <p className="text-base text-gray-600">Complete breakdown for {selectedChildData.name} - {selectedChildData.class}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="group">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full -ml-6 -mb-6"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <Calendar className="h-6 w-6 text-blue-200" />
                        <Badge className="bg-white/20 text-white border-0 text-xs">Per Term</Badge>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-blue-100">Term Fee</h3>
                        <div className="text-2xl font-bold">₦{feeData.termFees.total.toLocaleString()}</div>
                        <p className="text-xs text-blue-200">3 payments per year</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full -ml-6 -mb-6"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <GraduationCap className="h-6 w-6 text-green-200" />
                        <Badge className="bg-white/20 text-white border-0 text-xs">One-time</Badge>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-green-100">Session Fee</h3>
                        <div className="text-2xl font-bold">₦{feeData.sessionFees.total.toLocaleString()}</div>
                        <p className="text-xs text-green-200">Annual payment</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full -ml-6 -mb-6"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <DollarSign className="h-6 w-6 text-purple-200" />
                        <Badge className="bg-white/20 text-white border-0 text-xs">Total</Badge>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-purple-100">Annual Total</h3>
                        <div className="text-2xl font-bold">₦{totalAnnualFees.toLocaleString()}</div>
                        <p className="text-xs text-purple-200">Compulsory only</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full -ml-6 -mb-6"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <User className="h-6 w-6 text-orange-200" />
                        <Badge className="bg-white/20 text-white border-0 text-xs">Student</Badge>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-orange-100">Class</h3>
                        <div className="text-2xl font-bold">{selectedChildData.class}</div>
                        <p className="text-xs text-orange-200">{selectedChildData.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Breakdown Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
              
              {/* Term Fees */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">Term Fees</h3>
                      <p className="text-blue-100">Payable every term (3x per year)</p>
                    </div>
                    <Badge className="bg-white/20 text-white border-0 px-3 py-1">
                      Recurring
                    </Badge>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  {Object.entries(feeData.termFees).map(([key, amount]) => {
                    if (key === "total") return null;
                    return (
                      <div key={key} className="group">
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
                              {getFeeIcon(key)}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg capitalize text-gray-800">{key} Fee</h4>
                              <p className="text-sm text-gray-500">Per term payment</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-800">₦{amount.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Every term</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-bold">Total Term Fee</h4>
                        <p className="text-blue-200 text-sm">Due every term</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">₦{feeData.termFees.total.toLocaleString()}</div>
                        <div className="text-sm text-blue-200">Next: Jan 15, 2025</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Fees */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">Session Fees</h3>
                      <p className="text-green-100">One-time annual payment</p>
                    </div>
                    <Badge className="bg-white/20 text-white border-0 px-3 py-1">
                      Annual
                    </Badge>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  {Object.entries(feeData.sessionFees).map(([key, amount]) => {
                    if (key === "total") return null;
                    return (
                      <div key={key} className="group">
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
                              {getFeeIcon(key)}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg capitalize text-gray-800">{key} Fee</h4>
                              <p className="text-sm text-gray-500">Annual payment</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-800">₦{amount.toLocaleString()}</div>
                            {amount === 0 && (
                              <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                                ✓ Paid
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-bold">Total Session Fee</h4>
                        <p className="text-green-200 text-sm">Paid once per year</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">₦{feeData.sessionFees.total.toLocaleString()}</div>
                        <div className="text-sm text-green-200">Annual payment</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Fees & Services */}
            <div className="mb-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Optional Services</h2>
                <p className="text-base text-gray-600">Additional services and activities you can add</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">Optional Fees & Services</h3>
                      <p className="text-sm text-purple-100">Choose additional services for enhanced learning</p>
                    </div>
                    <Badge className="bg-white/20 text-white border-0 px-2 py-1 text-xs">
                      Flexible
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {feeData.optionalFees.map((fee, index) => (
                      <div key={index} className="group">
                        <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-5 border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                {getFeeIcon(fee.name.toLowerCase().includes('transport') ? 'transportation' : 
                                         fee.name.toLowerCase().includes('feeding') ? 'feeding' : 
                                         fee.name.toLowerCase().includes('computer') ? 'laboratory' : 'sports')}
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-purple-600">₦{fee.amount.toLocaleString()}</div>
                                <div className="text-xs text-purple-400">per term</div>
                              </div>
                            </div>
                            
                            <h4 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{fee.name}</h4>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{fee.description}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Button 
                              size="sm"
                              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white transform hover:scale-105 transition-all duration-200 shadow-md"
                              onClick={() => addToCart(fee)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
                              onClick={() => toast.info(`More information about ${fee.name}: ${fee.description}`)}
                            >
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {cart.length > 0 && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="h-5 w-5 text-purple-600" />
                          <div>
                            <h4 className="font-bold text-purple-800">{cart.length} item(s) in cart</h4>
                            <p className="text-sm text-purple-600">Ready for checkout</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-purple-600">₦{cartTotal.toLocaleString()}</div>
                          <Button 
                            size="sm"
                            className="mt-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                            onClick={() => setShowPaymentDialog(true)}
                          >
                            Proceed to Checkout
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Schedule */}
            <div className="mb-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Schedule</h2>
                <p className="text-base text-gray-600">Track your payment deadlines for {selectedSession}</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">Payment Timeline</h3>
                      <p className="text-sm text-orange-100">Academic year {selectedSession}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {feeData.paymentSchedule.map((schedule, index) => (
                      <div key={index} className="group">
                        <div className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                          schedule.status === "paid"
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300"
                            : schedule.status === "pending"
                            ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-300"
                            : schedule.status === "overdue"
                            ? "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 hover:border-red-300"
                            : "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-300"
                        }`}>
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            
                            {/* Left side - Term info */}
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                  schedule.status === "paid" ? "bg-green-200" :
                                  schedule.status === "pending" ? "bg-yellow-200" :
                                  schedule.status === "overdue" ? "bg-red-200" : "bg-blue-200"
                                }`}>
                                  {schedule.status === "paid" && <Check className="h-6 w-6 text-green-700" />}
                                  {schedule.status === "pending" && <Calendar className="h-6 w-6 text-yellow-700" />}
                                  {schedule.status === "overdue" && <AlertCircle className="h-6 w-6 text-red-700" />}
                                  {schedule.status === "upcoming" && <Calendar className="h-6 w-6 text-blue-700" />}
                                </div>
                                
                                <div className="flex-1">
                                  <h4 className="text-xl font-bold text-gray-800 mb-1">{schedule.term}</h4>
                                  <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <Calendar className="h-4 w-4" />
                                      <span className="text-sm font-medium">
                                        Due: {new Date(schedule.dueDate).toLocaleDateString('en-US', { 
                                          year: 'numeric', 
                                          month: 'short', 
                                          day: 'numeric'
                                        })}
                                      </span>
                                    </div>
                                    <Badge className={`${getStatusColor(schedule.status)} font-semibold px-2 py-1 text-xs`}>
                                      {schedule.status === "paid" && <Check className="h-3 w-3 mr-1" />}
                                      {schedule.status === "overdue" && <X className="h-3 w-3 mr-1" />}
                                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Right side - Amount and action */}
                            <div className="text-right w-full md:w-auto">
                              <div className="text-2xl font-bold text-gray-800 mb-2">
                                ₦{schedule.amount.toLocaleString()}
                              </div>
                              
                              {schedule.status === "pending" && (
                                <Button 
                                  className="w-full md:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                  onClick={() => handleTermPayment(schedule)}
                                >
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Pay Now
                                </Button>
                              )}
                              
                              {schedule.status === "paid" && (
                                <div className="text-green-600 font-semibold">
                                  ✓ Payment Complete
                                </div>
                              )}
                              
                              {schedule.status === "overdue" && (
                                <div className="space-y-2">
                                  <div className="text-red-600 font-semibold">
                                    ⚠ Overdue
                                  </div>
                                  <Button 
                                    className="w-full md:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"
                                    onClick={() => handleTermPayment(schedule)}
                                  >
                                    Pay Immediately
                                  </Button>
                                </div>
                              )}
                              
                              {schedule.status === "upcoming" && (
                                <div className="text-blue-600 font-semibold">
                                  Upcoming Payment
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Payment Policy */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-orange-800 mb-3">
                          Payment Policy & Guidelines
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <p className="text-sm text-gray-700">Term fees must be paid within 2 weeks of resumption</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <AlertTriangle className="h-3 w-3 text-yellow-600" />
                            </div>
                            <p className="text-sm text-gray-700">Late payment attracts 10% penalty of the term fee</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <p className="text-sm text-gray-700">Session fees are paid once per academic year</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <FileText className="h-3 w-3 text-blue-600" />
                            </div>
                            <p className="text-sm text-gray-700">Keep payment receipts for future reference</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Shopping Cart Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Shopping Cart
              </DialogTitle>
              <DialogDescription>
                Review your selected optional fees before payment
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">₦{item.amount.toLocaleString()}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-xl text-blue-600">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPaymentDialog(false)}
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    onClick={processPayment}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay ₦{cartTotal.toLocaleString()}
                  </Button>
                </div>
              </div>
            )}

            {cart.length === 0 && (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Term Payment Dialog */}
        <Dialog open={showTermPaymentDialog} onOpenChange={setShowTermPaymentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pay Term Fee
              </DialogTitle>
              <DialogDescription>
                {selectedTermPayment && (
                  <>Choose your payment method for {selectedTermPayment.term}</>
                )}
              </DialogDescription>
            </DialogHeader>
            
            {selectedTermPayment && (
              <div className="space-y-6">
                {/* Payment Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Student:</span>
                      <span className="font-medium">{children.find(child => child.id === selectedChild)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Term:</span>
                      <span className="font-medium">{selectedTermPayment.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Due Date:</span>
                      <span className="font-medium">
                        {new Date(selectedTermPayment.dueDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-semibold">Amount:</span>
                      <span className="font-bold text-xl text-blue-600">₦{selectedTermPayment.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Choose Payment Method:</h4>
                  
                  <Button 
                    className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                    onClick={() => processTermPayment('card')}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-xs text-blue-100">Pay instantly with your card</div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full justify-start border-green-200 hover:bg-green-50"
                    onClick={() => processTermPayment('bank')}
                  >
                    <div className="h-5 w-5 mr-3 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold">
                      B
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-800">Bank Transfer</div>
                      <div className="text-xs text-gray-500">Direct transfer to school account</div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50"
                    onClick={() => processTermPayment('wallet')}
                  >
                    <div className="h-5 w-5 mr-3 bg-purple-600 rounded text-white flex items-center justify-center text-xs font-bold">
                      W
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-800">Digital Wallet</div>
                      <div className="text-xs text-gray-500">Pay with mobile money</div>
                    </div>
                  </Button>
                </div>

                {/* Security Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Secure Payment</p>
                      <p className="text-xs text-blue-600">Your payment is protected with bank-level security</p>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowTermPaymentDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* No Data State */}
        {!feeData && selectedChildData && (
          <Card className="border-gray-200 shadow-xl">
            <CardContent className="text-center py-16">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No fee structure found
              </h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                Fee structure for {selectedChildData.name} in {selectedSession} is
                not available yet. Please contact the school administration.
              </p>
              <Button 
                className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={() => toast.info("Contacting school administration...")}
              >
                Contact Administration
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FeeStructure;
