import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
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
import { useToast } from "../../../hooks/use-toast";
import { Badge } from "../../../components/ui/badge";
import { AlertCircle, CheckCircle, Loader2, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

const formSchema = z.object({
  class: z.string().min(1, { message: "Class is required" }),
  section: z.string().min(1, { message: "Section is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  examType: z.string().min(1, { message: "Exam Type is required" }),
  term: z.string().min(1, { message: "Term is required" }),
  academicYear: z.string().min(1, { message: "Academic Year is required" }),
});

const sampleResults = [
  {
    id: "1",
    name: "Aiden Smith",
    admissionNo: "ADM001",
    marks: "85",
    totalMarks: "100",
    grade: "A",
    remarks: "Excellent",
    originalMarks: "85",
    isModified: false,
  },
  {
    id: "2",
    name: "Sophia Johnson",
    admissionNo: "ADM002",
    marks: "92",
    totalMarks: "100",
    grade: "A+",
    remarks: "Outstanding",
    originalMarks: "92",
    isModified: false,
  },
  {
    id: "3",
    name: "Liam Williams",
    admissionNo: "ADM003",
    marks: "78",
    totalMarks: "100",
    grade: "B+",
    remarks: "Very Good",
    originalMarks: "78",
    isModified: false,
  },
  {
    id: "4",
    name: "Emma Brown",
    admissionNo: "ADM004",
    marks: "65",
    totalMarks: "100",
    grade: "B",
    remarks: "Good",
    originalMarks: "65",
    isModified: false,
  },
  {
    id: "5",
    name: "Noah Davis",
    admissionNo: "ADM005",
    marks: "73",
    totalMarks: "100",
    grade: "B+",
    remarks: "Very Good",
    originalMarks: "73",
    isModified: false,
  },
  {
    id: "6",
    name: "Olivia Miller",
    admissionNo: "ADM006",
    marks: "55",
    totalMarks: "100",
    grade: "C",
    remarks: "Average",
    originalMarks: "55",
    isModified: false,
  },
  {
    id: "7",
    name: "Elijah Wilson",
    admissionNo: "ADM007",
    marks: "88",
    totalMarks: "100",
    grade: "A",
    remarks: "Excellent",
    originalMarks: "88",
    isModified: false,
  },
  {
    id: "8",
    name: "Ava Martinez",
    admissionNo: "ADM008",
    marks: "62",
    totalMarks: "100",
    grade: "B",
    remarks: "Good",
    originalMarks: "62",
    isModified: false,
  },
  {
    id: "9",
    name: "Lucas Anderson",
    admissionNo: "ADM009",
    marks: "41",
    totalMarks: "100",
    grade: "D",
    remarks: "Below Average",
    originalMarks: "41",
    isModified: false,
  },
  {
    id: "10",
    name: "Isabella Taylor",
    admissionNo: "ADM010",
    marks: "95",
    totalMarks: "100",
    grade: "A+",
    remarks: "Outstanding",
    originalMarks: "95",
    isModified: false,
  },
];

const grades = [
  { min: 90, max: 100, grade: "A+", remarks: "Outstanding" },
  { min: 80, max: 89, grade: "A", remarks: "Excellent" },
  { min: 70, max: 79, grade: "B+", remarks: "Very Good" },
  { min: 60, max: 69, grade: "B", remarks: "Good" },
  { min: 50, max: 59, grade: "C", remarks: "Average" },
  { min: 40, max: 49, grade: "D", remarks: "Below Average" },
  { min: 0, max: 39, grade: "F", remarks: "Failed" },
];

const EditClassResult = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isResultsFound, setIsResultsFound] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [studentResults, setStudentResults] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class: "",
      section: "",
      subject: "",
      examType: "",
      term: "",
      academicYear: "",
    },
  });

  const calculateGrade = (marks, totalMarks) => {
    if (!marks || !totalMarks) return { grade: "", remarks: "" };
    const percentage = (marks / totalMarks) * 100;
    for (const gradeInfo of grades) {
      if (percentage >= gradeInfo.min && percentage <= gradeInfo.max) {
        return { grade: gradeInfo.grade, remarks: gradeInfo.remarks };
      }
    }
    return { grade: "N/A", remarks: "Not Available" };
  };

  const searchResults = () => {
    const formValues = form.getValues();
    if (
      !formValues.class ||
      !formValues.section ||
      !formValues.subject ||
      !formValues.examType ||
      !formValues.term ||
      !formValues.academicYear
    ) {
      toast({
        title: "Missing information",
        description:
          "Please fill in all the required fields to search for results.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const resultsWithMetadata = sampleResults.map((result) => ({
        ...result,
        originalMarks: result.marks,
        isModified: false,
      }));
      setStudentResults(resultsWithMetadata);
      setIsResultsFound(true);
      setIsLoading(false);
      toast({
        title: "Results found",
        description: `Found ${resultsWithMetadata.length} student results.`,
      });
    }, 1500);
  };

  const handleMarksChange = (studentId, value) => {
    const updatedResults = studentResults.map((student) => {
      if (student.id === studentId) {
        const marks = Number(value);
        const totalMarks = Number(student.totalMarks);
        const { grade, remarks } =
          marks && totalMarks
            ? calculateGrade(marks, totalMarks)
            : { grade: "", remarks: "" };
        const isModified = student.originalMarks !== value;
        return { ...student, marks: value, grade, remarks, isModified };
      }
      return student;
    });
    setStudentResults(updatedResults);
  };

  const handleTotalMarksChange = (studentId, value) => {
    const updatedResults = studentResults.map((student) => {
      if (student.id === studentId) {
        const marks = Number(student.marks);
        const totalMarks = Number(value);
        const { grade, remarks } =
          marks && totalMarks
            ? calculateGrade(marks, totalMarks)
            : { grade: "", remarks: "" };
        const isModified = true; // Total marks change is always a modification
        return { ...student, totalMarks: value, grade, remarks, isModified };
      }
      return student;
    });
    setStudentResults(updatedResults);
  };

  const handleGradeChange = (studentId, grade) => {
    const updatedResults = studentResults.map((student) => {
      if (student.id === studentId) {
        const gradeInfo = grades.find((g) => g.grade === grade);
        return {
          ...student,
          grade,
          remarks: gradeInfo ? gradeInfo.remarks : student.remarks,
          isModified: true,
        };
      }
      return student;
    });
    setStudentResults(updatedResults);
  };

  const handleRemarksChange = (studentId, remarks) => {
    const updatedResults = studentResults.map((student) => {
      if (student.id === studentId) {
        return { ...student, remarks, isModified: true };
      }
      return student;
    });
    setStudentResults(updatedResults);
  };

  const handleSaveChanges = () => {
    const modifiedResults = studentResults.filter(
      (student) => student.isModified
    );
    if (modifiedResults.length === 0) {
      toast({
        title: "No changes detected",
        description: "No marks have been modified.",
      });
      return;
    }
    setIsConfirmDialogOpen(true);
  };

  const confirmSaveChanges = () => {
    setIsConfirmDialogOpen(false);
    const modifiedResults = studentResults.filter(
      (student) => student.isModified
    );
    console.log("Modified results to save:", modifiedResults);
    toast({
      title: "Changes saved successfully",
      description: `Updated marks for ${modifiedResults.length} students.`,
    });
    const updatedResults = studentResults.map((student) => ({
      ...student,
      originalMarks: student.marks,
      isModified: false,
    }));
    setStudentResults(updatedResults);
  };

  const hasModifiedResults = studentResults.some(
    (student) => student.isModified
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Edit Class Results
        </h1>
        <p className="text-muted-foreground">
          Modify existing results for a class
        </p>
      </div>

      <Form {...form}>
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Select the criteria to find the results you want to edit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="class-6">Class 6</SelectItem>
                        <SelectItem value="class-7">Class 7</SelectItem>
                        <SelectItem value="class-8">Class 8</SelectItem>
                        <SelectItem value="class-9">Class 9</SelectItem>
                        <SelectItem value="class-10">Class 10</SelectItem>
                        <SelectItem value="class-11">Class 11</SelectItem>
                        <SelectItem value="class-12">Class 12</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="section-a">Section A</SelectItem>
                        <SelectItem value="section-b">Section B</SelectItem>
                        <SelectItem value="section-c">Section C</SelectItem>
                        <SelectItem value="section-d">Section D</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="computer-science">
                          Computer Science
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="examType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mid-term">Mid Term</SelectItem>
                        <SelectItem value="final">Final Exam</SelectItem>
                        <SelectItem value="practical">Practical</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="first-term">First Term</SelectItem>
                        <SelectItem value="second-term">Second Term</SelectItem>
                        <SelectItem value="third-term">Third Term</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="academicYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select academic year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                        <SelectItem value="2025-2026">2025-2026</SelectItem>
                        <SelectItem value="2026-2027">2026-2027</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="button" onClick={searchResults} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Results
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </Form>

      {isResultsFound && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Edit Results</CardTitle>
              <CardDescription>
                Modify the marks as needed and save your changes
              </CardDescription>
            </div>
            {hasModifiedResults && (
              <div className="flex items-center text-amber-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                Unsaved changes
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Admission No</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Obtainable</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead className="w-[100px] text-right">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentResults.map((student, index) => (
                    <TableRow
                      key={student.id}
                      className={student.isModified ? "bg-amber-50" : undefined}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.admissionNo}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max={student.totalMarks}
                          value={student.marks}
                          onChange={(e) =>
                            handleMarksChange(student.id, e.target.value)
                          }
                          className={`w-20 ${
                            student.isModified ? "border-amber-500" : ""
                          }`}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          max="200"
                          value={student.totalMarks}
                          onChange={(e) =>
                            handleTotalMarksChange(student.id, e.target.value)
                          }
                          className={`w-20 ${
                            student.isModified ? "border-amber-500" : ""
                          }`}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={student.grade}
                          onValueChange={(value) =>
                            handleGradeChange(student.id, value)
                          }
                        >
                          <SelectTrigger
                            className={`w-20 ${
                              student.isModified ? "border-amber-500" : ""
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {grades.map((grade) => (
                              <SelectItem key={grade.grade} value={grade.grade}>
                                {grade.grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={student.remarks}
                          onChange={(e) =>
                            handleRemarksChange(student.id, e.target.value)
                          }
                          className={`w-32 ${
                            student.isModified ? "border-amber-500" : ""
                          }`}
                          placeholder="Enter remarks"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        {student.isModified ? (
                          <span className="text-amber-500 text-sm">
                            Modified
                          </span>
                        ) : (
                          <span className="text-green-500 text-sm flex items-center justify-end gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Saved
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-gray-500">
              {hasModifiedResults ? (
                <span className="text-amber-600">
                  You have unsaved changes to{" "}
                  {studentResults.filter((s) => s.isModified).length} student
                  records
                </span>
              ) : (
                <span>All changes are saved</span>
              )}
            </div>
            <Button onClick={handleSaveChanges} disabled={!hasModifiedResults}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      )}

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to update the marks for{" "}
              {studentResults.filter((s) => s.isModified).length} students. This
              action cannot be easily reversed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSaveChanges}>
              Yes, save changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditClassResult;
