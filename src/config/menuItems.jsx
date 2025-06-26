
import { 
  Home,
  PenTool,
  Library,
  DollarSign,
  ClipboardCheck,
  Clock,
  ListCheck,
  Award,
  MonitorPlay,
  Printer,
  FileText,
  FileCheck,
} from 'lucide-react';

export const menuItems = [
  {
    title: 'Dashboard',
    path: '/student',
    icon: Home,
  },
  {
    title: 'Assignment',
    path: '/student/assignment',
    icon: PenTool,
    submenu: [
      { title: 'Take Assessment', path: '/student/assignment/take-assessment' },
      { title: 'My Assessment Score', path: '/student/assignment/assessment-score' }
    ]
  },
  {
    title: 'E Library',
    path: '/student/library',
    icon: Library,
    submenu: [
      { title: 'Text Book (Audio)', path: '/student/library/audio' },
      { title: 'Text Book (E Books)', path: '/student/library/ebooks' },
      { title: 'Text Book (Video)', path: '/student/library/video' },
      { title: 'Video Books', path: '/student/library/video-books' }
    ]
  },
  {
    title: 'Make Payment',
    path: '/student/payment',
    icon: DollarSign,
    submenu: [
      { title: 'Pay Bill', path: '/student/payment/pay-bill' },
      { title: 'Payment Record', path: '/student/payment/record' }
    ]
  },
  {
    title: 'Online Exam',
    path: '/student/exam',
    icon: ClipboardCheck,
    submenu: [
      { title: 'Print Exam Score', path: '/student/exam/score' },
      { title: 'Take Exam', path: '/student/exam/take' }
    ]
  },
  {
    title: 'Time Table',
    path: '/student/timetable',
    icon: Clock,
  },
  {
    title: 'Attendance Report',
    path: '/student/attendance',
    icon: ListCheck,
  },
  {
    title: 'Quiz',
    path: '/student/quiz',
    icon: Award,
  },
  {
    title: 'E-Learning',
    path: '/student/elearning',
    icon: MonitorPlay,
    submenu: [
      { title: 'Live Classes', path: '/student/elearning/live-classes' },
      { title: 'Courses', path: '/student/elearning/courses' }
    ]
  },
  {
    title: 'Print Exam Card',
    path: '/student/exam-card',
    icon: Printer,
  },
  {
    title: 'Print Exam Pass',
    path: '/student/exam-pass',
    icon: Printer,
  },
  {
    title: 'Print Form',
    path: '/student/print-form',
    icon: FileText,
  },
  {
    title: 'Print Result',
    path: '/student/result',
    icon: FileCheck,
    submenu: [
      { title: 'Check New Result', path: '/student/result/check' },
      { title: 'Reprint Checker Result', path: '/student/result/reprint' }
    ]
  }
];
