import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap,
  ClipboardList,
  CalendarDays, 
  FileQuestion, 
  FileText, 
  Video, 
  UserCheck, 
  Users
} from 'lucide-react';
import { MenuItem } from '../types/sidebar';

// Menu items for teacher
export const teacherMenuItems: MenuItem[] = [
  { 
    title: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/teacher' 
  },
  { 
    title: 'Exam Management', 
    icon: GraduationCap, 
    path: '/teacher/exam', 
    submenu: [
      { title: 'Add Assessment', path: '/teacher/exam/add-assessment' },
      { title: 'Manage Assessment', path: '/teacher/exam/manage-assessment' },
      { title: 'Add Exam Questions', path: '/teacher/exam/add-questions' },
      { title: 'Questions', path: '/teacher/exam/manage-exam-questions' },
    ]
  },
  { 
    title: 'Result Management', 
    icon: ClipboardList, 
    path: '/teacher/result', 
    submenu: [
      //{ title: 'Result Card Settings', path: '/teacher/result/result-card-settings' },
      { title: 'Upload Student Result', path: '/teacher/result/upload-student' },
      { title: 'Upload Class Result', path: '/teacher/result/upload-class' },
      { title: 'Edit Class Result', path: '/teacher/result/edit' },
    ]
  },
  { 
    title: 'Lesson Plan', 
    icon: BookOpen, 
    path: '/teacher/lesson-plan',
    submenu: [
      { title: 'Add Lesson Plan', path: '/teacher/lesson-plan/add' },
      { title: 'Manage Lesson Plans', path: '/teacher/lesson-plan/manage' },
    ]
  },
  { 
    title: 'Time Table', 
    icon: CalendarDays, 
    path: '/teacher/timetable' 
  },
  { 
    title: 'Quiz', 
    icon: FileQuestion, 
    path: '/teacher/quiz',
    submenu: [
      { title: 'Add Quiz', path: '/teacher/quiz/add' },
      { title: 'Manage Quiz', path: '/teacher/quiz/manage' },
    ]
  },
  { 
    title: 'Assignments', 
    icon: FileText, 
    path: '/teacher/assignments',
    submenu: [
      { title: 'Add Assignment', path: '/teacher/assignments/add' },
      { title: 'Manage Assignments', path: '/teacher/assignments/manage' },
      { title: 'Assignment Reports', path: '/teacher/assignments/reports' },
    ]
  },
  { 
    title: 'Live Classes', 
    icon: Video, 
    path: '/teacher/live-classes',
    submenu: [
      { title: 'Schedule Class', path: '/teacher/live-classes/schedule' },
      { title: 'Manage Classes', path: '/teacher/live-classes/manage' },
    ]
  },
  { 
    title: 'Attendance Management', 
    icon: UserCheck, 
    path: '/teacher/attendance',
    submenu: [
      { title: 'Attendance Management', path: '/teacher/attendance' },
      
    ]
  },
  { 
    title: 'Teacher Attendance', 
    icon: UserCheck, 
    path: '/teacher/attendance',
    submenu: [
      { title: 'My Attendance', path: '/teacher/attendance/my' },
      { title: 'Leave Management', path: '/teacher/attendance/leave' },
    ]
  },
  { 
    title: 'Student Attendance', 
    icon: Users, 
    path: '/teacher/student-attendance' 
  },
];
