import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Settings,
  Users,
  CreditCard,
  QrCode,
  Camera,
  UserCheck,
  Clock,
  ShieldCheck,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const AdminAttendancePanel = () => {
  const [attendanceMethods, setAttendanceMethods] = useState({
    normal: { enabled: true, name: "Normal Attendance" },
    nfc: { enabled: true, name: "NFC Card" },
    qrCode: { enabled: true, name: "QR Code" },
    faceRecognition: { enabled: false, name: "Face Recognition" },
  });

  const [teacherPunchSettings, setTeacherPunchSettings] = useState({
    defaultMode: "punch-in-out", // punch-in-only, punch-in-out, no-punch
    allowOverride: true,
    requiredForSalary: true,
    graceMinutes: 15,
  });

  const [nfcSettings, setNfcSettings] = useState({
    requireRandomNumber: true,
    numberLength: 6,
    expiryMinutes: 5,
    allowDuplicates: false,
    encryptionEnabled: true,
  });

  const [students, setStudents] = useState([
    {
      id: "STD001",
      name: "John Doe",
      class: "10A",
      nfcCardId: "NFC123456",
      qrCode: "QR001",
      faceRegistered: true,
      status: "Active",
    },
    {
      id: "STD002",
      name: "Jane Smith",
      class: "10B",
      nfcCardId: "NFC789012",
      qrCode: "QR002",
      faceRegistered: false,
      status: "Active",
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    studentId: "",
    class: "",
    nfcCardId: "",
    qrCode: "",
  });

  const toggleAttendanceMethod = (method) => {
    setAttendanceMethods((prev) => ({
      ...prev,
      [method]: {
        ...prev[method],
        enabled: !prev[method].enabled,
      },
    }));
  };

  const updateTeacherPunchSetting = (setting, value) => {
    setTeacherPunchSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const updateNfcSetting = (setting, value) => {
    setNfcSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const generateRandomNFC = () => {
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setNewStudent((prev) => ({
      ...prev,
      nfcCardId: `NFC${randomId}`,
    }));
  };

  const generateQRCode = () => {
    const qrId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setNewStudent((prev) => ({
      ...prev,
      qrCode: `QR${qrId}`,
    }));
  };

  const addStudent = () => {
    if (newStudent.name && newStudent.studentId && newStudent.class) {
      setStudents((prev) => [
        ...prev,
        {
          id: newStudent.studentId,
          name: newStudent.name,
          class: newStudent.class,
          nfcCardId: newStudent.nfcCardId,
          qrCode: newStudent.qrCode,
          faceRegistered: false,
          status: "Active",
        },
      ]);
      setNewStudent({
        name: "",
        studentId: "",
        class: "",
        nfcCardId: "",
        qrCode: "",
      });
      setIsStudentDialogOpen(false);
    }
  };

  const exportStudentData = () => {
    const dataStr = JSON.stringify(students, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "student_attendance_data.json";
    link.click();
  };

  const editStudent = (student) => {
    setSelectedStudent(student);
    setNewStudent({
      name: student.name,
      studentId: student.id,
      class: student.class,
      nfcCardId: student.nfcCardId,
      qrCode: student.qrCode,
    });
    setIsStudentDialogOpen(true);
  };

  const deleteStudent = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((prev) => prev.filter((student) => student.id !== studentId));
    }
  };

  const updateStudent = () => {
    if (newStudent.name && newStudent.studentId && newStudent.class) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id
            ? {
                ...student,
                id: newStudent.studentId,
                name: newStudent.name,
                class: newStudent.class,
                nfcCardId: newStudent.nfcCardId,
                qrCode: newStudent.qrCode,
              }
            : student
        )
      );
      setSelectedStudent(null);
      setNewStudent({
        name: "",
        studentId: "",
        class: "",
        nfcCardId: "",
        qrCode: "",
      });
      setIsStudentDialogOpen(false);
    }
  };

  const AttendanceMethodCard = ({ method, methodKey, icon: Icon }) => (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`p-3 rounded-full ${
              method.enabled
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{method.name}</h3>
            <p className="text-sm text-gray-500">
              {methodKey === "normal" && "Manual attendance marking"}
              {methodKey === "nfc" && "NFC card tapping system"}
              {methodKey === "qrCode" && "QR code scanning"}
              {methodKey === "faceRecognition" && "Facial recognition system"}
            </p>
          </div>
        </div>
        <Switch
          checked={method.enabled}
          onCheckedChange={() => toggleAttendanceMethod(methodKey)}
        />
      </div>
      {method.enabled && (
        <div className="space-y-2 pt-2 border-t">
          <Badge
            variant={method.enabled ? "default" : "secondary"}
            className="text-xs"
          >
            {method.enabled ? "Active" : "Inactive"}
          </Badge>
          {methodKey === "nfc" && method.enabled && (
            <p className="text-xs text-blue-600">
              Requires NFC-enabled devices
            </p>
          )}
          {methodKey === "faceRecognition" && method.enabled && (
            <p className="text-xs text-purple-600">
              AI-powered facial recognition
            </p>
          )}
        </div>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Attendance System Configuration
          </h1>
          <p className="text-gray-600">
            Manage attendance methods, teacher settings, and student records
          </p>
        </div>

        <Tabs defaultValue="methods" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="methods"
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Attendance Methods</span>
            </TabsTrigger>
            <TabsTrigger
              value="teachers"
              className="flex items-center space-x-2"
            >
              <UserCheck className="h-4 w-4" />
              <span>Teacher Settings</span>
            </TabsTrigger>
            <TabsTrigger value="nfc" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>NFC Configuration</span>
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Student Management</span>
            </TabsTrigger>
          </TabsList>

          {/* Attendance Methods Tab */}
          <TabsContent value="methods" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Available Attendance Methods</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AttendanceMethodCard
                  method={attendanceMethods.normal}
                  methodKey="normal"
                  icon={UserCheck}
                />
                <AttendanceMethodCard
                  method={attendanceMethods.nfc}
                  methodKey="nfc"
                  icon={CreditCard}
                />
                <AttendanceMethodCard
                  method={attendanceMethods.qrCode}
                  methodKey="qrCode"
                  icon={QrCode}
                />
                <AttendanceMethodCard
                  method={attendanceMethods.faceRecognition}
                  methodKey="faceRecognition"
                  icon={Camera}
                />
              </div>
            </Card>
          </TabsContent>

          {/* Teacher Settings Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <span>Teacher Punch System Configuration</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">
                    Default Punch Mode
                  </Label>
                  <Select
                    value={teacherPunchSettings.defaultMode}
                    onValueChange={(value) =>
                      updateTeacherPunchSetting("defaultMode", value)
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punch-in-only">
                        Punch In Only
                      </SelectItem>
                      <SelectItem value="punch-in-out">Punch In/Out</SelectItem>
                      <SelectItem value="no-punch">
                        No Punch Required
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    Default setting for all teachers
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">
                      Allow Individual Override
                    </Label>
                    <p className="text-xs text-gray-500">
                      Teachers can change their punch setting
                    </p>
                  </div>
                  <Switch
                    checked={teacherPunchSettings.allowOverride}
                    onCheckedChange={(value) =>
                      updateTeacherPunchSetting("allowOverride", value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">
                      Required for Salary Calculation
                    </Label>
                    <p className="text-xs text-gray-500">
                      Include attendance in salary computation
                    </p>
                  </div>
                  <Switch
                    checked={teacherPunchSettings.requiredForSalary}
                    onCheckedChange={(value) =>
                      updateTeacherPunchSetting("requiredForSalary", value)
                    }
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Grace Period (Minutes)
                  </Label>
                  <Input
                    type="number"
                    value={teacherPunchSettings.graceMinutes}
                    onChange={(e) =>
                      updateTeacherPunchSetting(
                        "graceMinutes",
                        parseInt(e.target.value)
                      )
                    }
                    className="mt-2 w-32"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Late arrival tolerance
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* NFC Configuration Tab */}
          <TabsContent value="nfc" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>NFC Security Configuration</span>
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">
                      Require Random Number Verification
                    </Label>
                    <p className="text-xs text-gray-500">
                      Additional security layer for NFC taps
                    </p>
                  </div>
                  <Switch
                    checked={nfcSettings.requireRandomNumber}
                    onCheckedChange={(value) =>
                      updateNfcSetting("requireRandomNumber", value)
                    }
                  />
                </div>

                {nfcSettings.requireRandomNumber && (
                  <>
                    <div>
                      <Label className="text-sm font-medium">
                        Random Number Length
                      </Label>
                      <Input
                        type="number"
                        value={nfcSettings.numberLength}
                        onChange={(e) =>
                          updateNfcSetting(
                            "numberLength",
                            parseInt(e.target.value)
                          )
                        }
                        className="mt-2 w-32"
                        min="4"
                        max="10"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        4-10 digit random number
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Number Expiry (Minutes)
                      </Label>
                      <Input
                        type="number"
                        value={nfcSettings.expiryMinutes}
                        onChange={(e) =>
                          updateNfcSetting(
                            "expiryMinutes",
                            parseInt(e.target.value)
                          )
                        }
                        className="mt-2 w-32"
                        min="1"
                        max="60"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        How long the number stays valid
                      </p>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">
                      Allow Duplicate Cards
                    </Label>
                    <p className="text-xs text-gray-500">
                      Multiple students can share NFC card
                    </p>
                  </div>
                  <Switch
                    checked={nfcSettings.allowDuplicates}
                    onCheckedChange={(value) =>
                      updateNfcSetting("allowDuplicates", value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">
                      Enable Encryption
                    </Label>
                    <p className="text-xs text-gray-500">
                      Encrypt NFC communication
                    </p>
                  </div>
                  <Switch
                    checked={nfcSettings.encryptionEnabled}
                    onCheckedChange={(value) =>
                      updateNfcSetting("encryptionEnabled", value)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Student Management Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Student ID Management</span>
                </h2>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={exportStudentData}
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </Button>
                  <Dialog
                    open={isStudentDialogOpen}
                    onOpenChange={(open) => {
                      setIsStudentDialogOpen(open);
                      if (!open) {
                        setSelectedStudent(null);
                        setNewStudent({
                          name: "",
                          studentId: "",
                          class: "",
                          nfcCardId: "",
                          qrCode: "",
                        });
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="flex items-center space-x-2"
                        onClick={() => setSelectedStudent(null)}
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Student</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          {selectedStudent ? "Edit Student" : "Add New Student"}
                        </DialogTitle>
                        <DialogDescription>
                          {selectedStudent
                            ? "Edit student information and attendance credentials."
                            : "Add a new student and generate their attendance credentials."}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Student Name</Label>
                          <Input
                            id="name"
                            value={newStudent.name}
                            onChange={(e) =>
                              setNewStudent((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Enter student name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="studentId">Student ID</Label>
                          <Input
                            id="studentId"
                            value={newStudent.studentId}
                            onChange={(e) =>
                              setNewStudent((prev) => ({
                                ...prev,
                                studentId: e.target.value,
                              }))
                            }
                            placeholder="Enter student ID"
                          />
                        </div>
                        <div>
                          <Label htmlFor="class">Class</Label>
                          <Input
                            id="class"
                            value={newStudent.class}
                            onChange={(e) =>
                              setNewStudent((prev) => ({
                                ...prev,
                                class: e.target.value,
                              }))
                            }
                            placeholder="Enter class"
                          />
                        </div>
                        <div>
                          <Label htmlFor="nfcCard">NFC Card ID</Label>
                          <div className="flex space-x-2">
                            <Input
                              id="nfcCard"
                              value={newStudent.nfcCardId}
                              onChange={(e) =>
                                setNewStudent((prev) => ({
                                  ...prev,
                                  nfcCardId: e.target.value,
                                }))
                              }
                              placeholder="NFC card ID"
                            />
                            <Button
                              type="button"
                              onClick={generateRandomNFC}
                              variant="outline"
                              size="sm"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="qrCode">QR Code ID</Label>
                          <div className="flex space-x-2">
                            <Input
                              id="qrCode"
                              value={newStudent.qrCode}
                              onChange={(e) =>
                                setNewStudent((prev) => ({
                                  ...prev,
                                  qrCode: e.target.value,
                                }))
                              }
                              placeholder="QR code ID"
                            />
                            <Button
                              type="button"
                              onClick={generateQRCode}
                              variant="outline"
                              size="sm"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={selectedStudent ? updateStudent : addStudent}
                        >
                          {selectedStudent ? "Update Student" : "Add Student"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="space-y-4">
                {students.map((student) => (
                  <Card key={student.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <div className="flex space-x-3 text-sm text-gray-500">
                            <span>ID: {student.id}</span>
                            <span>Class: {student.class}</span>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              NFC: {student.nfcCardId}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              QR: {student.qrCode}
                            </Badge>
                            <Badge
                              variant={
                                student.faceRegistered ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              Face:{" "}
                              {student.faceRegistered
                                ? "Registered"
                                : "Not Registered"}
                            </Badge>
                            <Badge
                              variant={
                                student.status === "Active"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {student.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editStudent(student)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => deleteStudent(student.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAttendancePanel;
