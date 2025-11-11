import {
  Home,
  Users,
  CreditCard,
  FileText,
  Settings,
  UserCheck,
  Calendar,
  BookOpen,
  MessageCircle,
  Receipt,
  TrendingUp,
  Bell,
  User,
  GraduationCap,
  BanknoteIcon as Bank,
} from "lucide-react";

export const parentMenuItems = [
  {
    title: "Dashboard",
    path: "/parent",
    icon: Home,
  },
  {
    title: "My Children",
    path: "/parent/children",
    icon: Users,
    submenu: [
      {
        title: "View Children",
        path: "/parent/children/view",
        icon: Users,
      },
      {
        title: "Academic Progress",
        path: "/parent/children/progress",
        icon: TrendingUp,
      },
      {
        title: "Attendance Report",
        path: "/parent/children/attendance",
        icon: UserCheck,
      },
      {
        title: "Results & Grades",
        path: "/parent/children/results",
        icon: GraduationCap,
      },
    ],
  },
  {
    title: "Payment Management",
    path: "/parent/payments",
    icon: CreditCard,
    submenu: [
      {
        title: "School Fees",
        path: "/parent/payments/school-fees",
        icon: Bank,
      },
      {
        title: "Payment History",
        path: "/parent/payments/history",
        icon: Receipt,
      },
      {
        title: "Fee Structure",
        path: "/parent/payments/fee-structure",
        icon: FileText,
      },
    ],
  },
  {
    title: "Communication",
    path: "/parent/communication",
    icon: MessageCircle,
    submenu: [
      {
        title: "Messages",
        path: "/parent/communication/messages",
        icon: MessageCircle,
      },
      {
        title: "Announcements",
        path: "/parent/communication/announcements",
        icon: Bell,
      },
      {
        title: "Teacher Contact",
        path: "/parent/communication/teachers",
        icon: User,
      },
    ],
  },
  {
    title: "Academic Info",
    path: "/parent/academic",
    icon: BookOpen,
    submenu: [
      {
        title: "Timetable",
        path: "/parent/academic/timetable",
        icon: Calendar,
      },
      {
        title: "Assignments",
        path: "/parent/academic/assignments",
        icon: BookOpen,
      },
      {
        title: "Exams Schedule",
        path: "/parent/academic/exams",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Settings",
    path: "/parent/settings",
    icon: Settings,
    submenu: [
      {
        title: "Profile Settings",
        path: "/parent/settings/profile",
        icon: User,
      },
      {
        title: "Notifications",
        path: "/parent/settings/notifications",
        icon: Bell,
      },
    ],
  },
];
