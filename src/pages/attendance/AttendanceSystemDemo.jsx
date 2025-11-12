import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Import attendance method components
import NormalAttendanceMethod from "../components/attendance/NormalAttendanceMethod";
import NFCAttendanceMethod from "../components/attendance/NFCAttendanceMethod";
import QRCodeAttendanceMethod from "../components/attendance/QRCodeAttendanceMethod";
import FaceRecognitionAttendanceMethod from "../components/attendance/FaceRecognitionAttendanceMethod";

import {
  UserCheck,
  CreditCard,
  QrCode,
  Camera,
  CheckCircle,
  Users,
  Calendar,
  Clock,
  BarChart3,
} from "lucide-react";

const AttendanceSystemDemo = () => {
  const [selectedClass, setSelectedClass] = useState("10A");
  const [selectedPeriod, setSelectedPeriod] = useState("Period 1");
  const [attendanceData, setAttendanceData] = useState({});

  // Mock data
  const classes = ["10A", "10B", "11A", "11B", "12A", "12B"];
  const periods = [
    "Period 1",
    "Period 2",
    "Period 3",
    "Period 4",
    "Period 5",
    "Period 6",
  ];

  const students = [
    {
      id: "STD001",
      name: "John Doe",
      rollNo: "001",
      class: "10A",
      nfcId: "NFC123456",
      qrCode: "QR001",
      faceRegistered: true,
    },
    {
      id: "STD002",
      name: "Jane Smith",
      rollNo: "002",
      class: "10A",
      nfcId: "NFC789012",
      qrCode: "QR002",
      faceRegistered: true,
    },
    {
      id: "STD003",
      name: "Mike Johnson",
      rollNo: "003",
      class: "10A",
      nfcId: "NFC345678",
      qrCode: "QR003",
      faceRegistered: false,
    },
    {
      id: "STD004",
      name: "Sarah Wilson",
      rollNo: "004",
      class: "10A",
      nfcId: "NFC901234",
      qrCode: "QR004",
      faceRegistered: true,
    },
    {
      id: "STD005",
      name: "David Brown",
      rollNo: "005",
      class: "10A",
      nfcId: "NFC567890",
      qrCode: "QR005",
      faceRegistered: true,
    },
  ];

  const attendanceMethods = [
    { id: "normal", name: "Normal Attendance", icon: UserCheck, enabled: true },
    { id: "nfc", name: "NFC Card", icon: CreditCard, enabled: true },
    { id: "qr", name: "QR Code", icon: QrCode, enabled: true },
    { id: "face", name: "Face Recognition", icon: Camera, enabled: true },
  ];

  const handleAttendanceUpdate = (studentId, status, timestamp, method) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        status,
        timestamp,
        method,
        studentName: students.find((s) => s.id === studentId)?.name,
      },
    }));
  };

  const getOverallStats = () => {
    const total = students.length;
    const marked = Object.keys(attendanceData).length;
    const present = Object.values(attendanceData).filter(
      (att) => att.status === "present"
    ).length;
    const absent = Object.values(attendanceData).filter(
      (att) => att.status === "absent"
    ).length;
    return {
      total,
      marked,
      present,
      absent,
      percentage: total > 0 ? ((present / total) * 100).toFixed(1) : 0,
    };
  };

  const stats = getOverallStats();

  const clearAttendance = () => {
    setAttendanceData({});
  };

  const exportAttendance = () => {
    const attendanceReport = {
      class: selectedClass,
      period: selectedPeriod,
      date: new Date().toISOString().split("T")[0],
      timestamp: new Date().toISOString(),
      students: students.map((student) => ({
        ...student,
        attendance: attendanceData[student.id] || {
          status: "not_marked",
          timestamp: null,
          method: null,
        },
      })),
      summary: stats,
    };

    const dataStr = JSON.stringify(attendanceReport, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance_${selectedClass}_${selectedPeriod}_${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            School Attendance System Demo
          </h1>
          <p className="text-gray-600">
            Complete attendance management system with multiple recognition
            methods
          </p>
        </div>

        {/* Class and Period Selection */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Class Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Class
              </label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Period
              </label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period} value={period}>
                      {period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button onClick={clearAttendance} variant="outline">
                Clear All
              </Button>
              <Button onClick={exportAttendance} variant="default">
                Export Data
              </Button>
            </div>
          </div>

          {/* Overall Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.present}</div>
                  <div className="text-sm text-gray-600">Present</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.absent}</div>
                  <div className="text-sm text-gray-600">Absent</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {stats.total - stats.marked}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.percentage}%</div>
                  <div className="text-sm text-gray-600">Attendance</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">
                {stats.marked}/{stats.total} students marked
              </span>
            </div>
            <Progress
              value={(stats.marked / stats.total) * 100}
              className="h-3"
            />
          </div>
        </Card>

        {/* Attendance Methods */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Attendance Methods</h2>
            <div className="flex space-x-2">
              {attendanceMethods.map((method) => (
                <Badge
                  key={method.id}
                  variant={method.enabled ? "default" : "secondary"}
                  className="flex items-center space-x-1"
                >
                  <method.icon className="h-3 w-3" />
                  <span>{method.name}</span>
                </Badge>
              ))}
            </div>
          </div>

          <Tabs defaultValue="normal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="normal"
                className="flex items-center space-x-2"
              >
                <UserCheck className="h-4 w-4" />
                <span>Normal</span>
              </TabsTrigger>
              <TabsTrigger value="nfc" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>NFC Card</span>
              </TabsTrigger>
              <TabsTrigger value="qr" className="flex items-center space-x-2">
                <QrCode className="h-4 w-4" />
                <span>QR Code</span>
              </TabsTrigger>
              <TabsTrigger value="face" className="flex items-center space-x-2">
                <Camera className="h-4 w-4" />
                <span>Face Recognition</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="normal">
              <NormalAttendanceMethod
                students={students}
                onMarkAttendance={handleAttendanceUpdate}
              />
            </TabsContent>

            <TabsContent value="nfc">
              <NFCAttendanceMethod
                students={students}
                onMarkAttendance={handleAttendanceUpdate}
                nfcSettings={{
                  requireRandomNumber: true,
                  numberLength: 6,
                  expiryMinutes: 5,
                  allowDuplicates: false,
                  encryptionEnabled: true,
                }}
              />
            </TabsContent>

            <TabsContent value="qr">
              <QRCodeAttendanceMethod
                students={students}
                onMarkAttendance={handleAttendanceUpdate}
                qrSettings={{
                  allowBulkScan: true,
                  scanDelay: 1000,
                  autoMarkPresent: true,
                }}
              />
            </TabsContent>

            <TabsContent value="face">
              <FaceRecognitionAttendanceMethod
                students={students}
                onMarkAttendance={handleAttendanceUpdate}
                faceSettings={{
                  confidenceThreshold: 0.85,
                  allowMultipleFaces: true,
                  requireLiveness: true,
                  autoCapture: true,
                }}
              />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Attendance Summary */}
        {Object.keys(attendanceData).length > 0 && (
          <Card className="p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>
            <div className="space-y-3">
              {Object.entries(attendanceData).map(([studentId, attendance]) => (
                <div
                  key={studentId}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        attendance.status === "present"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <div>
                      <div className="font-medium">
                        {attendance.studentName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Marked at: {attendance.timestamp?.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        attendance.status === "present"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {attendance.status}
                    </Badge>
                    <Badge variant="outline">{attendance.method}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Completion Status */}
        {stats.marked === stats.total && stats.total > 0 && (
          <Card className="p-6 mt-6 bg-green-50 border-green-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  Attendance Complete!
                </h3>
                <p className="text-green-700">
                  All {stats.total} students in {selectedClass} have been marked
                  for {selectedPeriod}.{stats.present} present, {stats.absent}{" "}
                  absent.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AttendanceSystemDemo;
