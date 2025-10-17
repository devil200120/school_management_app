import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Search, Users, BookOpen } from "lucide-react";
import { toast } from "sonner";

const GroupStudent = () => {
  const [level, setLevel] = useState("");
  const [classValue, setClassValue] = useState("");
  const [section, setSection] = useState("");
  const [session, setSession] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock student data for demonstration
  const mockStudents = [
    { id: 1, name: "John Doe", admissionNo: "STU001", currentSection: null },
    { id: 2, name: "Jane Smith", admissionNo: "STU002", currentSection: null },
    { id: 3, name: "Mike Johnson", admissionNo: "STU003", currentSection: "A" },
    {
      id: 4,
      name: "Sarah Wilson",
      admissionNo: "STU004",
      currentSection: null,
    },
    { id: 5, name: "David Brown", admissionNo: "STU005", currentSection: "B" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!level || !classValue || !section || !session) {
      toast.error("Missing information", {
        description:
          "Please select all required fields (Level, Class, Section, and Session).",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to fetch students
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStudents(mockStudents);

      toast.success("Students loaded successfully!", {
        description: `Found ${mockStudents.length} students for ${level} - ${classValue}, Section ${section} (${session}).`,
        duration: 4000,
      });
    } catch (error) {
      console.error("Error loading students:", error);
      toast.error("Failed to load students", {
        description:
          "There was an error loading the student data. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGroupStudent = (studentId, targetSection) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, currentSection: targetSection }
          : student
      )
    );

    const student = students.find((s) => s.id === studentId);
    toast.success("Student grouped successfully!", {
      description: `${student?.name} has been moved to Section ${targetSection}.`,
      duration: 3000,
    });
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Group Students
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Group Students Into Class Sections</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="level">Select Level</Label>
                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Primary">Primary</option>
                  <option value="Junior Secondary">Junior Secondary</option>
                  <option value="Senior Secondary">Senior Secondary</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Select Class</Label>
                <select
                  id="class"
                  value={classValue}
                  onChange={(e) => setClassValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="Primary 1">Primary 1</option>
                  <option value="Primary 2">Primary 2</option>
                  <option value="Primary 3">Primary 3</option>
                  <option value="Primary 4">Primary 4</option>
                  <option value="Primary 5">Primary 5</option>
                  <option value="Primary 6">Primary 6</option>
                  <option value="JS 1">JS 1</option>
                  <option value="JS 2">JS 2</option>
                  <option value="JS 3">JS 3</option>
                  <option value="SS 1">SS 1</option>
                  <option value="SS 2">SS 2</option>
                  <option value="SS 3">SS 3</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Select Section</Label>
                <select
                  id="section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session">Select Session</Label>
                <select
                  id="session"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Session</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-eduos-primary hover:bg-eduos-secondary transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  !level || !classValue || !section || !session || isLoading
                }
              >
                <Users size={16} />
                <span>{isLoading ? "Loading..." : "Go Now"}</span>
              </Button>
            </div>
          </form>

          <div className="mt-8 border rounded-md">
            <div className="bg-gray-100 p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-medium flex items-center gap-2">
                  <BookOpen size={18} />
                  Available Students
                  {students.length > 0 && (
                    <span className="bg-eduos-primary text-white px-2 py-1 rounded-full text-xs">
                      {filteredStudents.length}
                    </span>
                  )}
                </h3>
                {students.length > 0 && (
                  <div className="relative w-64">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-eduos-primary"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              {students.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Please select a level, class, section and session to view
                  students
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-eduos-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">
                            Admission No: {student.admissionNo}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {student.currentSection ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Section {student.currentSection}
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            Unassigned
                          </span>
                        )}
                        <select
                          onChange={(e) =>
                            handleGroupStudent(student.id, e.target.value)
                          }
                          className="px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-eduos-primary"
                          value={student.currentSection || ""}
                        >
                          <option value="">Move to...</option>
                          <option value="A">Section A</option>
                          <option value="B">Section B</option>
                          <option value="C">Section C</option>
                          <option value="D">Section D</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  {filteredStudents.length === 0 && searchTerm && (
                    <p className="text-center text-gray-500 py-4">
                      No students found matching &ldquo;{searchTerm}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupStudent;
