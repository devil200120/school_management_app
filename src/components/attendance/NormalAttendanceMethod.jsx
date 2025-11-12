/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UserCheck,
  CheckCircle,
  XCircle,
  Search,
  Users,
  Clock,
} from "lucide-react";

const NormalAttendanceMethod = ({
  students = [],
  onMarkAttendance,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceData, setAttendanceData] = useState({});

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAttendance = (studentId, status) => {
    const timestamp = new Date();
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: { status, timestamp, method: "Normal" },
    }));

    if (onMarkAttendance) {
      onMarkAttendance(studentId, status, timestamp, "Normal");
    }
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const marked = Object.keys(attendanceData).length;
    const present = Object.values(attendanceData).filter(
      (att) => att.status === "present"
    ).length;
    const absent = Object.values(attendanceData).filter(
      (att) => att.status === "absent"
    ).length;
    return { total, marked, present, absent, pending: total - marked };
  };

  const stats = getAttendanceStats();

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Normal Attendance</h2>
              <p className="text-gray-600">Manual student attendance marking</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {stats.marked}/{stats.total}
              </div>
              <div className="text-sm text-gray-500">Students Marked</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Label className="mb-2 block">Search Students</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, ID, or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-lg font-bold">{stats.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-lg font-bold">{stats.present}</div>
                <div className="text-xs text-gray-600">Present</div>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <div className="text-lg font-bold">{stats.absent}</div>
                <div className="text-xs text-gray-600">Absent</div>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <div>
                <div className="text-lg font-bold">{stats.pending}</div>
                <div className="text-xs text-gray-600">Pending</div>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* Student List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Student List ({filteredStudents.length})
        </h3>

        {filteredStudents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No students found matching your search</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredStudents.map((student) => {
              const attendance = attendanceData[student.id];
              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {student.rollNo}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{student.name}</h4>
                      <div className="flex space-x-2 text-sm text-gray-500">
                        <span>ID: {student.id}</span>
                        <span>Roll: {student.rollNo}</span>
                        <span>Class: {student.class || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {attendance && (
                      <div className="text-right text-xs text-gray-500">
                        <div>Marked at</div>
                        <div>{attendance.timestamp.toLocaleTimeString()}</div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={
                          attendance?.status === "present"
                            ? "default"
                            : "outline"
                        }
                        onClick={() => markAttendance(student.id, "present")}
                        className={
                          attendance?.status === "present"
                            ? "bg-green-600 hover:bg-green-700"
                            : "text-green-600 hover:text-green-700 hover:bg-green-50"
                        }
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Present
                      </Button>

                      <Button
                        size="sm"
                        variant={
                          attendance?.status === "absent"
                            ? "default"
                            : "outline"
                        }
                        onClick={() => markAttendance(student.id, "absent")}
                        className={
                          attendance?.status === "absent"
                            ? "bg-red-600 hover:bg-red-700"
                            : "text-red-600 hover:text-red-700 hover:bg-red-50"
                        }
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Absent
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Completion Status */}
      {stats.pending === 0 && stats.total > 0 && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <span className="text-green-800 font-medium">
                Attendance Complete!
              </span>
              <p className="text-green-700 text-sm">
                All {stats.total} students have been marked. {stats.present}{" "}
                present, {stats.absent} absent.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      {stats.pending > 0 && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-blue-800 font-medium">Quick Actions</span>
              <p className="text-blue-700 text-sm">
                Mark remaining {stats.pending} students quickly
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  students.forEach((student) => {
                    if (!attendanceData[student.id]) {
                      markAttendance(student.id, "present");
                    }
                  });
                }}
                className="text-green-600 hover:bg-green-50"
              >
                Mark All Present
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  students.forEach((student) => {
                    if (!attendanceData[student.id]) {
                      markAttendance(student.id, "absent");
                    }
                  });
                }}
                className="text-red-600 hover:bg-red-50"
              >
                Mark All Absent
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default NormalAttendanceMethod;
