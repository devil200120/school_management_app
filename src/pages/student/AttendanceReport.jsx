import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Calendar } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/table';

const AttendanceReport = () => {
  const [classSelected, setClassSelected] = useState('');
  const [sectionSelected, setSectionSelected] = useState('');
  const [semesterSelected, setSemesterSelected] = useState('');
  const [showReport, setShowReport] = useState(false);

  const months = ['January', 'February', 'March', 'April', 'May'];
  const attendanceData = {
    January: { present: 20, absent: 2, late: 1, total: 23 },
    February: { present: 18, absent: 0, late: 2, total: 20 },
    March: { present: 22, absent: 1, late: 0, total: 23 },
    April: { present: 21, absent: 1, late: 1, total: 23 },
    May: { present: 16, absent: 0, late: 0, total: 16 }
  };

  const handleCheckAttendance = () => {
    if (classSelected && sectionSelected && semesterSelected) {
      setShowReport(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-6 w-6 text-eduos-primary" />
        <h1 className="text-2xl font-bold">Attendance Report</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Check Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Select Class */}
            <div className="space-y-2">
              <label htmlFor="class" className="text-sm font-medium">Select Class</label>
              <Select value={classSelected} onValueChange={setClassSelected}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary1">Primary 1</SelectItem>
                  <SelectItem value="primary2">Primary 2</SelectItem>
                  <SelectItem value="primary3">Primary 3</SelectItem>
                  <SelectItem value="primary4">Primary 4</SelectItem>
                  <SelectItem value="primary5">Primary 5</SelectItem>
                  <SelectItem value="primary6">Primary 6</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select Section */}
            <div className="space-y-2">
              <label htmlFor="section" className="text-sm font-medium">Select Section</label>
              <Select value={sectionSelected} onValueChange={setSectionSelected}>
                <SelectTrigger id="section">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select Semester */}
            <div className="space-y-2">
              <label htmlFor="semester" className="text-sm font-medium">Select Semester</label>
              <Select value={semesterSelected} onValueChange={setSemesterSelected}>
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Semester</SelectItem>
                  <SelectItem value="second">Second Semester</SelectItem>
                  <SelectItem value="third">Third Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="mt-6 bg-eduos-primary hover:bg-eduos-secondary"
            onClick={handleCheckAttendance}
            disabled={!classSelected || !sectionSelected || !semesterSelected}
          >
            Check Now
          </Button>
        </CardContent>
      </Card>

      {showReport && (
        <Card className="mt-6 overflow-auto">
          <CardHeader className="bg-eduos-primary text-white">
            <CardTitle className="text-white">
              Attendance Report: Class {classSelected.charAt(0).toUpperCase() + classSelected.slice(1)} - 
              Section {sectionSelected} - 
              {semesterSelected === 'first' ? ' First' : semesterSelected === 'second' ? ' Second' : ' Third'} Semester
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-4">
              <div>
                <p className="font-medium">Student Name: <span className="font-normal">John Doe</span></p>
                <p className="font-medium">Roll Number: <span className="font-normal">EDU-2023-001</span></p>
              </div>
              <div>
                <p className="font-medium">Total Present Days: <span className="font-normal">97 (93.2%)</span></p>
                <p className="font-medium">Total Absent Days: <span className="font-normal">4 (3.8%)</span></p>
                <p className="font-medium">Total Late Days: <span className="font-normal">3 (3.0%)</span></p>
              </div>
            </div>

            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="bg-eduos-primary text-white">
                  <TableHead className="font-bold text-white">Month</TableHead>
                  <TableHead className="font-bold text-white">Present</TableHead>
                  <TableHead className="font-bold text-white">Absent</TableHead>
                  <TableHead className="font-bold text-white">Late</TableHead>
                  <TableHead className="font-bold text-white">Total Days</TableHead>
                  <TableHead className="font-bold text-white">Attendance %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {months.map((month, index) => {
                  const { present, absent, late, total } = attendanceData[month];
                  const attendancePercentage = Math.round((present / total) * 100);

                  return (
                    <TableRow key={month} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <TableCell className="font-medium">{month}</TableCell>
                      <TableCell>{present}</TableCell>
                      <TableCell>{absent}</TableCell>
                      <TableCell>{late}</TableCell>
                      <TableCell>{total}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className={`h-2.5 rounded-full ${
                                attendancePercentage >= 90
                                  ? 'bg-green-500'
                                  : attendancePercentage >= 80
                                  ? 'bg-yellow-400'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${attendancePercentage}%` }}
                            />
                          </div>
                          <span>{attendancePercentage}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendanceReport;
