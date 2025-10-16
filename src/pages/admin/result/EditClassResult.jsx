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
  Search,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";

const EditClassResult = () => {
  // State management for form and student data
  const [formData, setFormData] = useState({
    level: "",
    class: "",
    session: "",
    subject: "",
    term: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showResultTable, setShowResultTable] = useState(false);

  // Sample student results data (this would come from API based on selected criteria)
  const [studentResults, setStudentResults] = useState([
    {
      id: 1,
      admissionNo: "FCAPT/001/CPS/74/263",
      name: "Muhammad Ahmad",
      class: "Primary One",
      firstCA: "8",
      secondCA: "9",
      exam: "75",
      total: "92",
      grade: "A",
      remarks: "Excellent performance",
      obtainableMarks: "100",
    },
    {
      id: 2,
      admissionNo: "FCAPT/002/CPS/74/264",
      name: "Fatima Aliyu",
      class: "Primary One",
      firstCA: "7",
      secondCA: "8",
      exam: "68",
      total: "83",
      grade: "B",
      remarks: "Very good work",
      obtainableMarks: "100",
    },
  ]);

  // Grading system with obtainable reference marks
  const gradeSystem = [
    { min: 90, max: 100, grade: "A+", remarks: "Outstanding" },
    { min: 80, max: 89, grade: "A", remarks: "Excellent" },
    { min: 70, max: 79, grade: "B+", remarks: "Very Good" },
    { min: 60, max: 69, grade: "B", remarks: "Good" },
    { min: 50, max: 59, grade: "C", remarks: "Average" },
    { min: 40, max: 49, grade: "D", remarks: "Below Average" },
    { min: 0, max: 39, grade: "F", remarks: "Failed" },
  ];

  // Calculate grade and remarks based on percentage
  const calculateGradeAndRemarks = (total, obtainableMarks) => {
    const percentage = (parseFloat(total) / parseFloat(obtainableMarks)) * 100;
    const gradeInfo = gradeSystem.find(
      (grade) => percentage >= grade.min && percentage <= grade.max
    );
    return gradeInfo || { grade: "F", remarks: "Failed" };
  };

  // Handle form field changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle result score updates
  const handleScoreChange = (studentId, field, value) => {
    setStudentResults((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          const updatedStudent = { ...student, [field]: value };

          // Calculate total, grade and remarks if it's a score field or obtainable marks
          if (
            ["firstCA", "secondCA", "exam", "obtainableMarks"].includes(field)
          ) {
            const firstCA = parseFloat(updatedStudent.firstCA) || 0;
            const secondCA = parseFloat(updatedStudent.secondCA) || 0;
            const exam = parseFloat(updatedStudent.exam) || 0;
            const total = firstCA + secondCA + exam;
            const obtainable =
              parseFloat(updatedStudent.obtainableMarks) || 100;

            const { grade, remarks } = calculateGradeAndRemarks(
              total,
              obtainable
            );

            updatedStudent.total = total.toString();
            updatedStudent.grade = grade;
            updatedStudent.remarks = remarks;
          }

          return updatedStudent;
        }
        return student;
      })
    );
  };

  // Handle direct grade change
  const handleGradeChange = (studentId, grade) => {
    setStudentResults((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          const gradeInfo = gradeSystem.find((g) => g.grade === grade);
          return {
            ...student,
            grade,
            remarks: gradeInfo ? gradeInfo.remarks : student.remarks,
          };
        }
        return student;
      })
    );
  };

  // Handle direct remarks change
  const handleRemarksChange = (studentId, remarks) => {
    setStudentResults((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          return { ...student, remarks };
        }
        return student;
      })
    );
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

  // Handle Load Results button click
  const handleLoadResults = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call to load results
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowResultTable(true);
      toast.success("Results Loaded!", {
        description: `Successfully loaded results for ${formData.class} - ${formData.subject}.`,
        icon: <Users className="h-4 w-4" />,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error Loading Results", {
        description: "Failed to load result data. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Save Results
  const handleSaveResults = async () => {
    setIsLoading(true);

    try {
      // Simulate API call to save results
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Results Updated Successfully!", {
        description: `Successfully updated results for ${studentResults.length} students.`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 4000,
      });
    } catch (error) {
      toast.error("Save Failed", {
        description: "Failed to save results. Please try again.",
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
          Edit Class Result
        </h2>
      </div>

      {/* Selection Form */}
      <Card className="mt-3 animate-fade-in delay-100 max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Edit Subject and Class</CardTitle>
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

            <div className="space-y-2 md:col-span-2">
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
            onClick={handleLoadResults}
            disabled={isLoading}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading && !showResultTable ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading Results...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Load Results for Editing
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Editing Table */}
      {showResultTable && (
        <Card className="animate-fade-in shadow-lg">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Student Results
            </CardTitle>
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
                    <TableHead className="bg-gray-100">Total</TableHead>
                    <TableHead className="bg-gray-100">Obtainable</TableHead>
                    <TableHead className="bg-gray-100">Grade</TableHead>
                    <TableHead className="bg-gray-100">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentResults.map((student, index) => (
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
                          max="10"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
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
                          max="10"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="w-20 text-center"
                          value={student.exam}
                          onChange={(e) =>
                            handleScoreChange(
                              student.id,
                              "exam",
                              e.target.value
                            )
                          }
                          min="0"
                          max="80"
                        />
                      </TableCell>
                      <TableCell className="font-semibold text-center">
                        {student.total}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="w-20 text-center"
                          value={student.obtainableMarks}
                          onChange={(e) =>
                            handleScoreChange(
                              student.id,
                              "obtainableMarks",
                              e.target.value
                            )
                          }
                          min="1"
                          max="200"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={student.grade}
                          onValueChange={(value) =>
                            handleGradeChange(student.id, value)
                          }
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {gradeSystem.map((grade) => (
                              <SelectItem key={grade.grade} value={grade.grade}>
                                {grade.grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          className="w-32"
                          value={student.remarks}
                          onChange={(e) =>
                            handleRemarksChange(student.id, e.target.value)
                          }
                          placeholder="Enter remarks"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleSaveResults}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-8 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save All Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EditClassResult;
