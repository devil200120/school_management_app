import React, { useState } from 'react';
import { PageHeader } from '../../../components/teacher/attendance/PageHeader';
import { AttendanceStats } from '../../../components/teacher/attendance/AttendanceStats';
import { TodayAttendance } from '../../../components/teacher/attendance/TodayAttendance';
import { AttendanceRecords } from '../../../components/teacher/attendance/AttendanceRecords';

// Sample attendance data
const attendanceRecords = [
  {
    id: '1',
    date: '2025-05-01',
    status: 'present',
    checkInTime: '08:15',
    checkOutTime: '16:30',
  },
  {
    id: '2',
    date: '2025-04-30',
    status: 'present',
    checkInTime: '08:10',
    checkOutTime: '16:25',
  },
  {
    id: '3',
    date: '2025-04-29',
    status: 'late',
    checkInTime: '09:20',
    checkOutTime: '16:30',
    reason: 'Traffic congestion'
  },
  {
    id: '4',
    date: '2025-04-28',
    status: 'present',
    checkInTime: '08:05',
    checkOutTime: '16:45',
  },
  {
    id: '5',
    date: '2025-04-27',
    status: 'absent',
    reason: 'Medical leave'
  },
  {
    id: '6',
    date: '2025-04-26',
    status: 'present',
    checkInTime: '08:00',
    checkOutTime: '16:30',
  },
  {
    id: '7',
    date: '2025-04-25',
    status: 'leave',
    reason: 'Personal leave'
  },
];

function TeacherMyAttendance() {
  const [month, setMonth] = useState(new Date().toISOString().split('-').slice(0, 2).join('-'));

  const stats = {
    workingDays: attendanceRecords.length,
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    leave: attendanceRecords.filter(r => r.status === 'leave').length,
    attendancePercentage: Math.round(
      (attendanceRecords.filter(r => r.status === 'present' || r.status === 'late').length / attendanceRecords.length) * 100
    )
  };

  const today = new Date().toISOString().split('T')[0];
  const todayRecord = attendanceRecords.find(record => record.date === today);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Attendance"
        description="View and manage your attendance records"
      />
      
      <AttendanceStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TodayAttendance todayRecord={todayRecord} />
        <AttendanceRecords 
          attendanceRecords={attendanceRecords}
          month={month}
          setMonth={setMonth}
        />
      </div>
    </div>
  );
}

export default TeacherMyAttendance;
