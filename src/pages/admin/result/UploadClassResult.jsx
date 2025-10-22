import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  Save,
  ArrowLeft,
  Calculator,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const UploadClassResult = () => {
  // State management for form fields
  const [formData, setFormData] = useState({
    level: "",
    class: "",
    session: "",
    subject: "",
    term: "",
    firstCA: "10",
    secondCA: "10",
    exam: "70",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showStudentGrading, setShowStudentGrading] = useState(false);

  // Sample student data - this would come from API in real application
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Adebayo Johnson",
      regNumber: "EDU/2023/001",
      firstCA: "",
      secondCA: "",
      exam: "",
      total: 0,
      grade: "",
    },
    {
      id: 2,
      name: "Fatima Ibrahim",
      regNumber: "EDU/2023/002",
      firstCA: "",
      secondCA: "",
      exam: "",
      total: 0,
      grade: "",
    },
    {
      id: 3,
      name: "Chinedu Okafor",
      regNumber: "EDU/2023/003",
      firstCA: "",
      secondCA: "",
      exam: "",
      total: 0,
      grade: "",
    },
    {
      id: 4,
      name: "Aisha Mohammed",
      regNumber: "EDU/2023/004",
      firstCA: "",
      secondCA: "",
      exam: "",
      total: 0,
      grade: "",
    },
    {
      id: 5,
      name: "Emeka Nwankwo",
      regNumber: "EDU/2023/005",
      firstCA: "",
      secondCA: "",
      exam: "",
      total: 0,
      grade: "",
    },
    {
      id: 6,
      name: "Blessing Ogundipe",
      regNumber: "EDU/2023/006",
      firstCA: "",
      secondCA: "",
      exam: "",
      total: 0,
      grade: "",
    },
    {
      id: 7,
      name: "Yakubu Musa",
      regNumber: "EDU/2023/007",
      firstCA: "",
      secondCA: "",
      exam: "",
      total: 0,
      grade: "",
    },
    {
      id: 8,
      name: "Grace Adeyemi",
      regNumber: "EDU/2023/008",
      firstCA: "",
      secondCA: "",
      exam: "",
      total: 0,
      grade: "",
    },
  ]);

  // Handle form field changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const { level, class: className, session, subject, term } = formData;
    if (!level || !className || !session || !subject || !term) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields before proceeding.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
      return false;
    }
    return true;
  };

  // Helper function to calculate grade
  const calculateGrade = (total) => {
    if (total >= 80) return "A";
    if (total >= 70) return "B";
    if (total >= 60) return "C";
    if (total >= 50) return "D";
    if (total >= 40) return "E";
    return "F";
  };

  // Handle student score input
  const handleStudentScoreChange = (studentId, field, value) => {
    const numValue = parseFloat(value) || 0;
    const maxValues = {
      firstCA: parseFloat(formData.firstCA) || 10,
      secondCA: parseFloat(formData.secondCA) || 10,
      exam: parseFloat(formData.exam) || 70,
    };

    // Validate against max score
    if (numValue > maxValues[field]) {
      toast.error("Score Error", {
        description: `${field.toUpperCase()} score cannot exceed ${
          maxValues[field]
        }`,
        duration: 3000,
      });
      return;
    }

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentId) {
          const updatedStudent = { ...student, [field]: value };

          // Calculate total and grade
          const firstCA = parseFloat(updatedStudent.firstCA) || 0;
          const secondCA = parseFloat(updatedStudent.secondCA) || 0;
          const exam = parseFloat(updatedStudent.exam) || 0;
          const total = firstCA + secondCA + exam;

          updatedStudent.total = total;
          updatedStudent.grade = calculateGrade(total);

          return updatedStudent;
        }
        return student;
      })
    );
  };

  // Handle Check Now button click
  const handleCheckNow = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call to fetch class students
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Class Found!", {
        description: `Successfully loaded ${students.length} students from ${formData.class} for ${formData.subject} result upload.`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 4000,
      });

      setShowStudentGrading(true);
    } catch (error) {
      toast.error("Error Loading Class", {
        description: "Failed to load class data. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle save all results
  const handleSaveResults = async () => {
    setIsLoading(true);

    try {
      // Simulate API call to save results
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Results Saved!", {
        description: `Successfully saved results for ${students.length} students in ${formData.class}.`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 4000,
      });

      // Reset form or navigate to results list
      console.log("Saved Results:", { formData, students });
    } catch (error) {
      toast.error("Save Error", {
        description: "Failed to save results. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back to form
  const handleBackToForm = () => {
    setShowStudentGrading(false);
  };
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Upload Class Result
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Upload Class and Subject</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
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
                  <SelectItem value="elementary">Elementary</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="senior-secondary">
                    Senior Secondary
                  </SelectItem>
                  <SelectItem value="junior-secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
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
                  <SelectItem value="class1">Class 1</SelectItem>
                  <SelectItem value="class2">Class 2</SelectItem>
                  <SelectItem value="class3">Class 3</SelectItem>
                  <SelectItem value="ss1">SS 1</SelectItem>
                  <SelectItem value="ss2">SS 2</SelectItem>
                  <SelectItem value="ss3">SS 3</SelectItem>
                  <SelectItem value="js1">JS 1</SelectItem>
                  <SelectItem value="js2">JS 2</SelectItem>
                  <SelectItem value="js3">JS 3</SelectItem>
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
                  <SelectItem value="2022-2023">2022/2023</SelectItem>
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
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="economics">Economics</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="geography">Geography</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">
                Select Term/Semester <span className="text-red-500">*</span>
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

            {/* Grade Section with First CA, Second CA & Exam fields */}
            <div className="border-t pt-4 mt-6">
              <h3 className="text-lg font-semibold text-eduos-primary mb-4">
                Grade Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstCA">First CA (Max Score)</Label>
                  <Input
                    id="firstCA"
                    name="firstCA"
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.firstCA}
                    onChange={handleInputChange}
                    className="focus:ring-2 focus:ring-eduos-primary"
                    min="0"
                    max="100"
                  />
                  <p className="text-sm text-gray-500">
                    Maximum score for First CA
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondCA">Second CA (Max Score)</Label>
                  <Input
                    id="secondCA"
                    name="secondCA"
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.secondCA}
                    onChange={handleInputChange}
                    className="focus:ring-2 focus:ring-eduos-primary"
                    min="0"
                    max="100"
                  />
                  <p className="text-sm text-gray-500">
                    Maximum score for Second CA
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exam">Exam (Max Score)</Label>
                  <Input
                    id="exam"
                    name="exam"
                    type="number"
                    placeholder="e.g., 70"
                    value={formData.exam}
                    onChange={handleInputChange}
                    className="focus:ring-2 focus:ring-eduos-primary"
                    min="0"
                    max="100"
                  />
                  <p className="text-sm text-gray-500">
                    Maximum score for Final Exam
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCheckNow}
            disabled={isLoading}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading Class...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Check Now
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      {showStudentGrading && (
        <Card className="mt-6 animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-bold text-eduos-primary">
                  📝 Grade Students - {formData.class} | {formData.subject}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.session} • {formData.term} • {formData.level}
                </p>
              </div>
              <div className="text-sm bg-white px-3 py-1 rounded-lg shadow">
                <strong>{students.length}</strong> Students
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reg. No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-center">
                      First CA ({formData.firstCA})
                    </TableHead>
                    <TableHead className="text-center">
                      Second CA ({formData.secondCA})
                    </TableHead>
                    <TableHead className="text-center">
                      Exam ({formData.exam})
                    </TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((stu) => (
                    <TableRow key={stu.id}>
                      <TableCell>{stu.regNumber}</TableCell>
                      <TableCell>{stu.name}</TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={stu.firstCA}
                          onChange={(e) =>
                            handleStudentScoreChange(
                              stu.id,
                              "firstCA",
                              e.target.value
                            )
                          }
                          min={0}
                          max={formData.firstCA}
                          placeholder="0"
                          className="w-16 text-center"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={stu.secondCA}
                          onChange={(e) =>
                            handleStudentScoreChange(
                              stu.id,
                              "secondCA",
                              e.target.value
                            )
                          }
                          min={0}
                          max={formData.secondCA}
                          placeholder="0"
                          className="w-16 text-center"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={stu.exam}
                          onChange={(e) =>
                            handleStudentScoreChange(
                              stu.id,
                              "exam",
                              e.target.value
                            )
                          }
                          min={0}
                          max={formData.exam}
                          placeholder="0"
                          className="w-20 text-center"
                        />
                      </TableCell>
                      <TableCell className="text-center font-bold text-lg">
                        {stu.total}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`px-2 py-1 rounded text-white font-bold ${
                            stu.grade === "A"
                              ? "bg-green-500"
                              : stu.grade === "B"
                              ? "bg-blue-500"
                              : stu.grade === "C"
                              ? "bg-yellow-500"
                              : stu.grade === "D"
                              ? "bg-orange-500"
                              : stu.grade === "E"
                              ? "bg-red-400"
                              : "bg-red-600"
                          }`}
                        >
                          {stu.grade}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={handleBackToForm}
                disabled={isLoading}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Form
              </Button>
              <Button
                className="bg-eduos-primary hover:bg-eduos-secondary"
                onClick={handleSaveResults}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save All Results
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // Auto-calculate missing scores with average
                  setStudents((prevStudents) =>
                    prevStudents.map((student) => {
                      if (
                        !student.firstCA &&
                        !student.secondCA &&
                        !student.exam
                      ) {
                        const avgFirstCA = Math.floor(
                          Math.random() * parseInt(formData.firstCA)
                        );
                        const avgSecondCA = Math.floor(
                          Math.random() * parseInt(formData.secondCA)
                        );
                        const avgExam = Math.floor(
                          Math.random() * parseInt(formData.exam)
                        );
                        const total = avgFirstCA + avgSecondCA + avgExam;
                        return {
                          ...student,
                          firstCA: avgFirstCA.toString(),
                          secondCA: avgSecondCA.toString(),
                          exam: avgExam.toString(),
                          total: total,
                          grade: calculateGrade(total),
                        };
                      }
                      return student;
                    })
                  );
                  toast.success("Quick Calculate", {
                    description: "Generated sample scores for empty fields",
                    duration: 3000,
                  });
                }}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Auto Fill Sample
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadClassResult;
