import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";
import {
  Users,
  CreditCard,
  TrendingUp,
  Calendar,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  BookOpen,
  GraduationCap,
  UserCheck,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ParentDashboard = () => {
  const [children, setChildren] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Mock data - In real app, fetch from API
  useEffect(() => {
    // Mock children data
    setChildren([
      {
        id: 1,
        name: "Sarah Johnson",
        class: "JSS 2A",
        admissionNo: "EDU2023001",
        profilePicture: null,
        attendance: 95,
        lastGrade: "A",
        status: "active",
        subjects: 8,
        recentActivity: "Submitted Mathematics Assignment",
        nextExam: "English Language - Nov 15, 2024",
      },
      {
        id: 2,
        name: "Michael Johnson",
        class: "Primary 5B",
        admissionNo: "EDU2023002",
        profilePicture: null,
        attendance: 89,
        lastGrade: "B+",
        status: "active",
        subjects: 6,
        recentActivity: "Completed Science Quiz",
        nextExam: "Mathematics - Nov 12, 2024",
      },
    ]);

    // Mock payment data
    setPayments([
      {
        id: 1,
        type: "School Fees - Term 1",
        amount: 45000,
        dueDate: "2024-11-30",
        status: "pending",
        student: "Sarah Johnson",
      },
      {
        id: 2,
        type: "School Fees - Term 1",
        amount: 35000,
        dueDate: "2024-12-15",
        status: "overdue",
        student: "Michael Johnson",
      },
      {
        id: 3,
        type: "Extra Curricular Activities",
        amount: 8000,
        dueDate: "2024-11-25",
        status: "pending",
        student: "Sarah Johnson",
      },
    ]);

    // Mock notifications
    setNotifications([
      {
        id: 1,
        message: "Sarah's Mathematics exam scheduled for Nov 15",
        type: "exam",
        time: "2 hours ago",
        read: false,
      },
      {
        id: 2,
        message: "School fees payment reminder",
        type: "payment",
        time: "1 day ago",
        read: false,
      },
      {
        id: 3,
        message: "PTA meeting scheduled for Nov 20",
        type: "announcement",
        time: "2 days ago",
        read: true,
      },
    ]);
  }, []);

  const handlePaymentAction = (paymentId, action) => {
    if (action === "pay") {
      navigate("/parent/payments/school-fees");
      toast.success("Redirecting to payment page...");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 95) return "text-green-600";
    if (attendance >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your children's
            education.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate("/parent/payments/school-fees")}
            className="bg-green-600 hover:bg-green-700"
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Pay School Fees
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/parent/children/view")}
          >
            <Users className="mr-2 h-4 w-4" />
            Manage Children
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Children
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{children.length}</div>
            <p className="text-xs text-muted-foreground">
              All actively enrolled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦
              {payments
                .reduce((sum, payment) => sum + payment.amount, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {payments.length} payment(s) due
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Attendance
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {children.length > 0
                ? Math.round(
                    children.reduce((sum, child) => sum + child.attendance, 0) /
                      children.length
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Overall attendance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Notifications
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => !n.read).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires your attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Children Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              My Children
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Avatar>
                    <AvatarImage src={child.profilePicture} />
                    <AvatarFallback>
                      {child.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">
                        {child.name}
                      </p>
                      <Badge variant="outline">{child.class}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Admission No: {child.admissionNo}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <span
                        className={`flex items-center gap-1 ${getAttendanceColor(
                          child.attendance
                        )}`}
                      >
                        <UserCheck className="h-3 w-3" />
                        {child.attendance}% Attendance
                      </span>
                      <span className="flex items-center gap-1 text-blue-600">
                        <BookOpen className="h-3 w-3" />
                        {child.subjects} Subjects
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Latest: {child.recentActivity}
                    </p>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/parent/children/view")}
              >
                View All Children
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{payment.type}</p>
                    <p className="text-xs text-muted-foreground">
                      For: {payment.student}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(payment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-sm font-bold">
                      ₦{payment.amount.toLocaleString()}
                    </p>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                    <div>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handlePaymentAction(payment.id, "pay")}
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/parent/payments/history")}
              >
                View Payment History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  !notification.read ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <div className="mt-1">
                  {notification.type === "exam" && (
                    <Calendar className="h-4 w-4 text-blue-600" />
                  )}
                  {notification.type === "payment" && (
                    <CreditCard className="h-4 w-4 text-yellow-600" />
                  )}
                  {notification.type === "announcement" && (
                    <Bell className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/parent/communication/messages")}
            >
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDashboard;
