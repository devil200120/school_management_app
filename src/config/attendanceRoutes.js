import AdminAttendancePanel from '../pages/attendance/AdminAttendancePanel';
import TeacherAttendancePanel from '../pages/attendance/TeacherAttendancePanel';
import StudentAttendancePanel from '../pages/attendance/StudentAttendancePanel';

// Attendance System Routes Configuration
export const attendanceRoutes = [
  {
    path: '/admin/attendance',
    component: AdminAttendancePanel,
    title: 'Admin Attendance Configuration',
    description: 'Configure attendance methods and manage student records',
    roles: ['admin']
  },
  {
    path: '/teacher/attendance',
    component: TeacherAttendancePanel,
    title: 'Teacher Attendance Dashboard',
    description: 'Take attendance and manage punch records',
    roles: ['teacher']
  },
  {
    path: '/student/attendance',
    component: StudentAttendancePanel,
    title: 'Student Attendance Dashboard',
    description: 'View personal attendance records and statistics',
    roles: ['student']
  }
];

// Menu items for different user roles
export const adminAttendanceMenuItems = [
  {
    label: 'Attendance System',
    path: '/admin/attendance',
    icon: 'UserCheck',
    submenu: [
      {
        label: 'System Configuration',
        path: '/admin/attendance',
        description: 'Configure attendance methods and settings'
      },
      {
        label: 'Student Management',
        path: '/admin/attendance#students',
        description: 'Manage student IDs and credentials'
      },
      {
        label: 'Teacher Settings',
        path: '/admin/attendance#teachers',
        description: 'Configure teacher punch requirements'
      }
    ]
  }
];

export const teacherAttendanceMenuItems = [
  {
    label: 'Attendance',
    path: '/teacher/attendance',
    icon: 'UserCheck',
    submenu: [
      {
        label: 'Take Attendance',
        path: '/teacher/attendance',
        description: 'Mark student attendance for classes'
      },
      {
        label: 'Punch Records',
        path: '/teacher/attendance#punch',
        description: 'Manage punch in/out records'
      },
      {
        label: 'Reports',
        path: '/teacher/attendance#reports',
        description: 'View attendance reports and statistics'
      },
      {
        label: 'Salary View',
        path: '/teacher/attendance#salary',
        description: 'Check attendance-based salary calculation'
      }
    ]
  }
];

export const studentAttendanceMenuItems = [
  {
    label: 'My Attendance',
    path: '/student/attendance',
    icon: 'Calendar',
    submenu: [
      {
        label: 'Overview',
        path: '/student/attendance',
        description: 'View attendance statistics and progress'
      },
      {
        label: 'Daily Records',
        path: '/student/attendance#records',
        description: 'Check daily attendance records'
      },
      {
        label: 'Subject-wise',
        path: '/student/attendance#subjects',
        description: 'View subject-wise attendance breakdown'
      },
      {
        label: 'My Profile',
        path: '/student/attendance#profile',
        description: 'Manage attendance methods and profile'
      }
    ]
  }
];

export default {
  attendanceRoutes,
  adminAttendanceMenuItems,
  teacherAttendanceMenuItems,
  studentAttendanceMenuItems
};