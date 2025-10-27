import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { toast } from "sonner";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
} from "lucide-react";

const UploadStudentResult = () => {
  // State management for form and student data
  const [formData, setFormData] = useState({
    level: "",
    session: "",
    class: "",
    subject: "",
    term: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showStudentTable, setShowStudentTable] = useState(false);

  // Sample student data (this would come from API based on selected class)
  const [students, setStudents] = useState([
    {
      id: 1,
      admissionNo: "FCAPT/001/CPS/74/263",
      name: "Muhammad Ahmad",
      class: "Primary One",
      firstCA: "",
      secondCA: "",
      exam: "",
    },
  ]);

  // Handle form field changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle student score updates
  const handleScoreChange = (studentId, field, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, [field]: value } : student
      )
    );
  };

  // Validate form
  const validateForm = () => {
    const { level, session, class: className, subject, term } = formData;
    if (!level || !session || !className || !subject || !term) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields before proceeding.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
      return false;
    }
    return true;
  };

  // Handle Load Students button click
  const handleLoadStudents = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call to load students
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowStudentTable(true);
      toast.success("Students Loaded!", {
        description: `Successfully loaded students for ${formData.class} - ${formData.subject}.`,
        icon: <Users className="h-4 w-4" />,
        duration: 3000,
      });
    } catch {
      toast.error("Error Loading Students", {
        description: "Failed to load student data. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Upload Results - for individual student or all students
  const handleUpload = async (studentId = null) => {
    // If uploading for a specific student
    if (studentId) {
      const student = students.find((s) => s.id === studentId);
      const hasScores = student.firstCA || student.secondCA || student.exam;

      if (!hasScores) {
        toast.error("No Scores Entered", {
          description: `Please enter at least one score for ${student.name} before uploading.`,
          icon: <AlertCircle className="h-4 w-4" />,
          duration: 4000,
        });
        return;
      }
    } else {
      // Validate that at least some scores are entered for bulk upload
      const studentsWithScores = students.filter(
        (student) => student.firstCA || student.secondCA || student.exam
      );

      if (studentsWithScores.length === 0) {
        toast.error("No Scores Entered", {
          description:
            "Please enter at least one score for any student before uploading.",
          icon: <AlertCircle className="h-4 w-4" />,
          duration: 4000,
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      // Simulate API call to upload results
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (studentId) {
        const student = students.find((s) => s.id === studentId);
        toast.success("Result Uploaded!", {
          description: `Successfully uploaded result for ${student.name}.`,
          icon: <CheckCircle className="h-4 w-4" />,
          duration: 3000,
        });
      } else {
        const studentsWithScores = students.filter(
          (student) => student.firstCA || student.secondCA || student.exam
        );

        toast.success("Results Uploaded Successfully!", {
          description: `Successfully uploaded results for ${studentsWithScores.length} students.`,
          icon: <CheckCircle className="h-4 w-4" />,
          duration: 4000,
        });

        // Reset form after successful bulk upload
        setShowStudentTable(false);
        setFormData({
          level: "",
          session: "",
          class: "",
          subject: "",
          term: "",
        });
      }
    } catch {
      toast.error("Upload Failed", {
        description: "Failed to upload results. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Upload Student Result
        </h2>
      </div>

      {/* Selection Form */}
      <Card className="mt-3 animate-fade-in delay-100 max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Student Session and Level</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">
                Select Level <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="junior-secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="senior-secondary">
                    Senior Secondary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session">
                Select Session <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.session}
                onValueChange={(value) => handleSelectChange("session", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-2026">2025/2026</SelectItem>
                  <SelectItem value="2024-2025">2024/2025</SelectItem>
                  <SelectItem value="2023-2024">2023/2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">
                Select Class <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.class}
                onValueChange={(value) => handleSelectChange("class", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary-one">Primary One</SelectItem>
                  <SelectItem value="primary-two">Primary Two</SelectItem>
                  <SelectItem value="js1">JS 1</SelectItem>
                  <SelectItem value="js2">JS 2</SelectItem>
                  <SelectItem value="ss1">SS 1</SelectItem>
                  <SelectItem value="ss2">SS 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">
                Select Subject <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => handleSelectChange("subject", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English Language</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">
                Select Term <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.term}
                onValueChange={(value) => handleSelectChange("term", value)}
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Term</SelectItem>
                  <SelectItem value="second">Second Term</SelectItem>
                  <SelectItem value="third">Third Term</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleLoadStudents}
            disabled={isLoading}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading && !showStudentTable ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading Students...
              </>
            ) : (
              <>
                <Users className="h-4 w-4 mr-2" />
                Load Students
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Student Results Table */}
      {showStudentTable && (
        <Card className="animate-fade-in shadow-lg">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Enter Student Results</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-gray-100">S/N</TableHead>
                    <TableHead className="bg-gray-100">Admiss. No.</TableHead>
                    <TableHead className="bg-gray-100">Name</TableHead>
                    <TableHead className="bg-gray-100">Class</TableHead>
                    <TableHead className="bg-gray-100">1st CA</TableHead>
                    <TableHead className="bg-gray-100">2nd CA</TableHead>
                    <TableHead className="bg-gray-100">Exam</TableHead>
                    <TableHead className="bg-gray-100">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="text-sm text-blue-600">
                        {student.admissionNo}
                      </TableCell>
                      <TableCell className="font-medium text-eduos-primary">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0"
                          className="w-16 text-center"
                          value={student.firstCA}
                          onChange={(e) =>
                            handleScoreChange(
                              student.id,
                              "firstCA",
                              e.target.value
                            )
                          }
                          min="0"
                          max="100"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0"
                          className="w-16 text-center"
                          value={student.secondCA}
                          onChange={(e) =>
                            handleScoreChange(
                              student.id,
                              "secondCA",
                              e.target.value
                            )
                          }
                          min="0"
                          max="100"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0"
                          className="w-16 text-center"
                          value={student.exam}
                          onChange={(e) =>
                            handleScoreChange(
                              student.id,
                              "exam",
                              e.target.value
                            )
                          }
                          min="0"
                          max="100"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleUpload(student.id)}
                          disabled={isLoading}
                          size="sm"
                          className="bg-eduos-primary hover:bg-eduos-secondary transition-colors disabled:opacity-50 min-w-[80px]"
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-3 w-3 mr-1" />
                              Upload Now
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Tip:</span> You can upload results
                individually for each student or all at once using the button
                below.
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={() => {
                    setShowStudentTable(false);
                    toast.info("Form Reset", {
                      description:
                        "Student table has been cleared. You can select different criteria.",
                    });
                  }}
                  variant="outline"
                  disabled={isLoading}
                >
                  Change Selection
                </Button>
                <Button
                  onClick={() => handleUpload()}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 disabled:opacity-50 min-w-[180px]"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading All...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload All Results Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadStudentResult;
