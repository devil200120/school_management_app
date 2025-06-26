
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { 
  Check, 
  CheckCircle2, 
  Download, 
  FileText, 
  Info, 
  Loader2, 
  Save, 
  Search, 
  Upload, 
  XCircle 
} from 'lucide-react';

// Sample data for classes and students
const classes = [
  { value: 'class-10a', label: 'Class 10A' },
  { value: 'class-10b', label: 'Class 10B' },
  { value: 'class-11a', label: 'Class 11A' },
  { value: 'class-11b', label: 'Class 11B' },
  { value: 'class-12a', label: 'Class 12A' },
];

const subjects = [
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'english', label: 'English' },
  { value: 'history', label: 'History' },
  { value: 'geography', label: 'Geography' },
  { value: 'computer-science', label: 'Computer Science' },
];

const terms = [
  { value: 'first-term-2025', label: 'First Term 2025-26' },
  { value: 'second-term-2025', label: 'Second Term 2025-26' },
  { value: 'third-term-2025', label: 'Third Term 2025-26' },
  { value: 'first-term-2024', label: 'First Term 2024-25' },
  { value: 'second-term-2024', label: 'Second Term 2024-25' },
  { value: 'third-term-2024', label: 'Third Term 2024-25' },
];

const exams = [
  { value: 'mid-term', label: 'Mid Term Exam' },
  { value: 'final', label: 'Final Exam' },
  { value: 'unit-test-1', label: 'Unit Test 1' },
  { value: 'unit-test-2', label: 'Unit Test 2' },
  { value: 'practical', label: 'Practical Exam' },
];

// Sample students data
const students = [
  { id: '1', name: 'Alice Johnson', admissionNo: 'ST-2025-001', marks: '' },
  { id: '2', name: 'Bob Smith', admissionNo: 'ST-2025-002', marks: '' },
  { id: '3', name: 'Charlie Brown', admissionNo: 'ST-2025-003', marks: '' },
  { id: '4', name: 'Diana Parker', admissionNo: 'ST-2025-004', marks: '' },
  { id: '5', name: 'Edward Wilson', admissionNo: 'ST-2025-005', marks: '' },
  { id: '6', name: 'Frank Thomas', admissionNo: 'ST-2025-006', marks: '' },
  { id: '7', name: 'Grace Miller', admissionNo: 'ST-2025-007', marks: '' },
  { id: '8', name: 'Hannah Clark', admissionNo: 'ST-2025-008', marks: '' },
  { id: '9', name: 'Ian Robinson', admissionNo: 'ST-2025-009', marks: '' },
  { id: '10', name: 'Jessica Martinez', admissionNo: 'ST-2025-010', marks: '' },
  { id: '11', name: 'Kevin Lewis', admissionNo: 'ST-2025-011', marks: '' },
  { id: '12', name: 'Liam Moore', admissionNo: 'ST-2025-012', marks: '' },
  { id: '13', name: 'Mia Taylor', admissionNo: 'ST-2025-013', marks: '' },
  { id: '14', name: 'Nathan Wright', admissionNo: 'ST-2025-014', marks: '' },
  { id: '15', name: 'Olivia Young', admissionNo: 'ST-2025-015', marks: '' },
];


const UploadClassResult = () => {
  const [activeTab, setActiveTab] = useState('manual-entry');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [maxMarks, setMaxMarks] = useState<string>('100');
  const [isStudentsLoaded, setIsStudentsLoaded] = useState(false);
  const [studentsData, setStudentsData] = useState<Object>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  
  // Function to get students data
  const handleLoadStudents = () => {
    if (!selectedClass || !selectedSubject || !selectedTerm || !selectedExam) {
      toast.error("Please select all required fields");
      return;
    }
    
    setIsStudentsLoaded(true);
    setStudentsData(students.map(student => ({ ...student, grade: '', remarks: '', absent: false })));
    
    toast.success("Students data loaded successfully");
  };

  // Function to handle marks input change
  const handleMarksChange = (id, value) => {
    setStudentsData(prevData => 
      prevData.map(student => 
        student.id === id ? { ...student, marks: value, absent: false } : student
      )
    );
  };
  
  // Function to handle remarks change
  const handleRemarksChange = (id, value) => {
    setStudentsData(prevData => 
      prevData.map(student => 
        student.id === id ? { ...student, remarks: value } : student
      )
    );
  };
  
  // Function to mark student as absent
  const handleAbsentToggle = (id) => {
    setStudentsData(prevData => 
      prevData.map(student => 
        student.id === id ? { ...student, absent: !student.absent, marks: student.absent ? '' : 'AB' } : student
      )
    );
  };

  // Function to calculate grade
  const calculateGrade = (marks) => {
    const numMarks = parseFloat(marks);
    const maxM = parseFloat(maxMarks);
    
    if (isNaN(numMarks)) return '';
    
    const percentage = (numMarks / maxM) * 100;
    
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  // Function to handle bulk file upload
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };
  
  // Function to process uploaded file
  const processUploadedFile = () => {
    if (!uploadedFile) {
      toast.error("Please upload a file first");
      return;
    }
    
    if (!selectedClass || !selectedSubject || !selectedTerm || !selectedExam) {
      toast.error("Please select all required fields");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsStudentsLoaded(true);
      
      // In a real app, you would parse the file and extract student data
      // This is just a simulation
      setStudentsData(students.map(student => ({ 
        ...student, 
        marks: Math.floor(Math.random() * 40 + 60).toString(),
        grade: '',
        remarks: '',
        absent: false
      })));
      
      toast.success("File processed successfully");
    }, 2000);
  };
  
  // Function to handle form submission
  const handleSubmitResults = () => {
    setIsSubmitting(true);
    
    // Validate all students have marks or are marked absent
    const hasIncompleteEntries = studentsData.some(student => 
      !student.marks && !student.absent
    );
    
    if (hasIncompleteEntries) {
      setShowConfirmationDialog(true);
      setIsSubmitting(false);
      return;
    }
    
    submitResults();
  };
  
  const submitResults = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Calculate grades for all students
      const updatedData = studentsData.map(student => ({
        ...student,
        grade: student.absent ? 'AB' : calculateGrade(student.marks)
      }));
      
      setStudentsData(updatedData);
      
      toast.success("Results uploaded successfully");
      setShowConfirmationDialog(false);
    }, 1500);
  };

  // Filter students based on search query
  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.admissionNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Class Results</h1>
        <p className="text-muted-foreground">Enter results for an entire class at once</p>
      </div>
      
      <Tabs defaultValue="manual-entry" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="manual-entry">Manual Entry</TabsTrigger>
          <TabsTrigger value="excel-upload">Excel Upload</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          {/* Common form fields across both tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assessment Details</CardTitle>
              <CardDescription>Select the class and subject to upload results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="class" className="text-sm font-medium">Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="term" className="text-sm font-medium">Term</label>
                  <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                    <SelectTrigger id="term">
                      <SelectValue placeholder="Select Term" />
                    </SelectTrigger>
                    <SelectContent>
                      {terms.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="exam" className="text-sm font-medium">Exam Type</label>
                  <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger id="exam">
                      <SelectValue placeholder="Select Exam Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {exams.map((e) => (
                        <SelectItem key={e.value} value={e.value}>
                          {e.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="max-marks" className="text-sm font-medium">Maximum Marks</label>
                  <Input 
                    id="max-marks" 
                    type="number" 
                    value={maxMarks} 
                    onChange={(e) => setMaxMarks(e.target.value)}
                  />
                </div>
              </div>
              
              {activeTab === 'manual-entry' && (
                <div className="flex justify-end">
                  <Button 
                    onClick={handleLoadStudents} 
                    disabled={!selectedClass || !selectedSubject || !selectedTerm || !selectedExam}
                  >
                    Load Students
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <TabsContent value="manual-entry" className="mt-4">
          {isStudentsLoaded && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Enter Student Marks</CardTitle>
                  <CardDescription>Enter marks for each student in the class</CardDescription>
                </div>
                
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] rounded-md border">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background">
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Admission No.</TableHead>
                        <TableHead className="w-32">Marks (/{maxMarks})</TableHead>
                        <TableHead className="w-32">Remarks</TableHead>
                        <TableHead className="w-24 text-center">Absent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center h-32">
                            No students match your search criteria
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredStudents.map((student, index) => (
                          <TableRow key={student.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.admissionNo}</TableCell>
                            <TableCell>
                              <Input 
                                type="text"
                                value={student.marks}
                                onChange={(e) => handleMarksChange(student.id, e.target.value)}
                                disabled={student.absent}
                                className={student.absent ? "bg-gray-100" : ""}
                              />
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="text"
                                value={student.remarks || ''}
                                onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                                placeholder="Optional"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <button
                                onClick={() => handleAbsentToggle(student.id)}
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  student.absent 
                                    ? "bg-red-100 text-red-600 hover:bg-red-200" 
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                }`}
                              >
                                {student.absent ? <Check className="h-4 w-4" /> : ""}
                              </button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {filteredStudents.length} students shown
                </div>
                <Button
                  onClick={handleSubmitResults}
                  disabled={studentsData.length === 0}
                  className="gap-2"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {!isSubmitting && <Save className="h-4 w-4" />}
                  Submit Results
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="excel-upload" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload Excel File</CardTitle>
              <CardDescription>Upload student marks in Excel format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12">
                <div className="flex flex-col items-center text-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <h3 className="font-medium">Upload Excel File</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Drag and drop your Excel file here or click to browse
                  </p>
                  
                  <Input 
                    type="file" 
                    id="file-upload" 
                    className="hidden"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer" asChild>
                      <span>Select File</span>
                    </Button>
                  </label>
                  
                  {uploadedFile && (
                    <div className="mt-4 p-3 border rounded-md bg-gray-50 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{uploadedFile.name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Download Template</h3>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Template
                  </Button>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Instructions</h4>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    <li>Download the Excel template</li>
                    <li>Fill in student marks following the specified format</li>
                    <li>Ensure admission numbers match correctly</li>
                    <li>Mark absent students with 'AB' in the marks column</li>
                    <li>Save the file and upload it</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={processUploadedFile}
                  disabled={!uploadedFile || !selectedClass || !selectedSubject || !selectedTerm || !selectedExam || isProcessing}
                  className="gap-2"
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Process File
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {isStudentsLoaded && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Processed Student Marks</CardTitle>
                <CardDescription>Review and submit marks imported from Excel</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] rounded-md border">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background">
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Admission No.</TableHead>
                        <TableHead className="w-24">Marks (/{maxMarks})</TableHead>
                        <TableHead className="w-24">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentsData.map((student, index) => {
                        const isValid = student.marks && !isNaN(parseFloat(student.marks)) && parseFloat(student.marks) <= parseFloat(maxMarks);
                        const isAbsent = student.marks === 'AB';
                        
                        return (
                          <TableRow key={student.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.admissionNo}</TableCell>
                            <TableCell>{student.marks}</TableCell>
                            <TableCell>
                              {isAbsent ? (
                                <span className="inline-flex items-center gap-1 text-yellow-600 text-sm">
                                  <Info className="h-4 w-4" /> Absent
                                </span>
                              ) : isValid ? (
                                <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                                  <CheckCircle2 className="h-4 w-4" /> Valid
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                                  <XCircle className="h-4 w-4" /> Invalid
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {studentsData.length} students imported
                </div>
                <Button
                  onClick={handleSubmitResults}
                  disabled={studentsData.length === 0}
                  className="gap-2"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {!isSubmitting && <Save className="h-4 w-4" />}
                  Submit Results
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Incomplete Marks</DialogTitle>
            <DialogDescription>
              Some students do not have marks entered and are not marked as absent.
              Do you want to continue anyway?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitResults}>
              Submit Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadClassResult;
