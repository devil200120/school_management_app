import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { useToast } from "../../../hooks/use-toast";
import { Badge } from "../../../components/ui/badge";
import {
  BookOpen,
  Edit,
  Eye,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Upload,
  Download as DownloadIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

// Sample question bank data
const questionBank = [
  {
    id: "1",
    question: "What is the value of π (pi) to two decimal places?",
    type: "multiple-choice",
    subject: "Mathematics",
    topic: "Geometry",
    difficulty: "Easy",
    options: ["3.14", "3.41", "3.12", "3.16"],
    correctAnswer: 0,
    createdAt: "2025-04-15",
  },
  {
    id: "2",
    question: "Which of the following is not a primary color?",
    type: "multiple-choice",
    subject: "Physics",
    topic: "Optics",
    difficulty: "Easy",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: 3,
    createdAt: "2025-04-12",
  },
  {
    id: "3",
    question: "What is the chemical formula for water?",
    type: "multiple-choice",
    subject: "Chemistry",
    topic: "Basic Chemistry",
    difficulty: "Easy",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctAnswer: 1,
    createdAt: "2025-04-10",
  },
  {
    id: "4",
    question: "Calculate the derivative of f(x) = 3x² + 2x - 5",
    type: "multiple-choice",
    subject: "Mathematics",
    topic: "Calculus",
    difficulty: "Medium",
    options: [
      "f'(x) = 6x + 2",
      "f'(x) = 3x + 2",
      "f'(x) = 6x - 5",
      "f'(x) = 6x² + 2",
    ],
    correctAnswer: 0,
    createdAt: "2025-04-08",
  },
  {
    id: "5",
    question: "Which planet is known as the Red Planet?",
    type: "multiple-choice",
    subject: "Geography",
    topic: "Astronomy",
    difficulty: "Easy",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    createdAt: "2025-04-05",
  },
];

const ManageExamQuestions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);
  const [isViewQuestionDialogOpen, setIsViewQuestionDialogOpen] =
    useState(false);
  const [isEditQuestionDialogOpen, setIsEditQuestionDialogOpen] =
    useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [activeTab, setActiveTab] = useState("question-bank");
  const [bulkUploadFile, setBulkUploadFile] = useState(null);

  // New question form state
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    type: "multiple-choice",
    subject: "",
    topic: "",
    difficulty: "Medium",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  const { toast } = useToast();

  const filteredQuestions = questionBank.filter((q) => {
    const matchesSearch = q.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSubject =
      subjectFilter === "all" || q.subject === subjectFilter;
    const matchesDifficulty =
      difficultyFilter === "all" || q.difficulty === difficultyFilter;

    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const handleAddQuestion = () => {
    // Validate question data
    if (!newQuestion.question || !newQuestion.subject || !newQuestion.topic) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (newQuestion.options.some((opt) => !opt)) {
      toast({
        title: "Incomplete options",
        description: "Please fill in all answer options.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would add the question to your database
    console.log("New Question:", newQuestion);

    toast({
      title: "Question added successfully",
      description: "The question has been added to your question bank.",
    });

    // Reset form and close dialog
    setNewQuestion({
      question: "",
      type: "multiple-choice",
      subject: "",
      topic: "",
      difficulty: "Medium",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
    setIsAddQuestionDialogOpen(false);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleDeleteQuestion = () => {
    // In a real app, you would delete the question from your database
    console.log(`Delete question with id: ${selectedQuestionId}`);

    toast({
      title: "Question deleted",
      description: "The question has been removed from your question bank.",
    });

    setSelectedQuestionId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleBulkUpload = () => {
    if (!bulkUploadFile) {
      toast({
        title: "No file selected",
        description: "Please select an Excel file to upload.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would process the file and upload questions
    console.log("Uploading file:", bulkUploadFile.name);

    toast({
      title: "Questions uploaded successfully",
      description: `${bulkUploadFile.name} has been processed and questions have been added to your question bank.`,
    });

    setBulkUploadFile(null);
  };

  const selectedQuestion = selectedQuestionId
    ? questionBank.find((q) => q.id === selectedQuestionId)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="mb-0">
          <h1 className="text-2xl font-bold tracking-tight">
            Manage Exam Questions
          </h1>
          <p className="text-muted-foreground pt-0">
            Create and manage your questions
          </p>
        </div>

        <Button
          onClick={() => setIsAddQuestionDialogOpen(true)}
          className="gap-2"
        >
          <Plus size={16} />
          Add New Question
        </Button>
      </div>

      <Tabs value={activeTab} className="mb-2" onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="question-bank">Questions</TabsTrigger>
          <TabsTrigger value="bulk-upload">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="question-bank">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-96 mb-3">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search questions..."
                    className="pl-10 px-5"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Select
                      value={subjectFilter}
                      onValueChange={setSubjectFilter}
                    >
                      <SelectTrigger className="w-[130px]">
                        <BookOpen size={14} className="mr-2" />
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Geography">Geography</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select
                      value={difficultyFilter}
                      onValueChange={setDifficultyFilter}
                    >
                      <SelectTrigger className="w-[130px]">
                        <Filter size={14} className="mr-2" />
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Subject & Topic</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuestions.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-8 text-gray-500"
                        >
                          No questions found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredQuestions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="font-medium">
                            {question.question.length > 80
                              ? `${question.question.substring(0, 80)}...`
                              : question.question}
                          </TableCell>
                          <TableCell>
                            <div>{question.subject}</div>
                            <div className="text-sm text-gray-500">
                              {question.topic}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                question.difficulty === "Easy"
                                  ? "bg-green-500"
                                  : question.difficulty === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }
                            >
                              {question.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>{question.type}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal size={16} />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedQuestionId(question.id);
                                    setIsViewQuestionDialogOpen(true);
                                  }}
                                >
                                  <Eye size={14} className="mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedQuestionId(question.id);
                                    setIsEditQuestionDialogOpen(true);
                                  }}
                                >
                                  <Edit size={14} className="mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedQuestionId(question.id);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 size={14} className="mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk-upload">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Upload Questions</CardTitle>
              <CardDescription>
                Upload multiple questions at once using an Excel template
              </CardDescription>
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
                    accept=".xlsx,.xls"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setBulkUploadFile(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      asChild
                    >
                      <span>Select File</span>
                    </Button>
                  </label>

                  {bulkUploadFile && (
                    <div className="mt-4 p-3 border rounded-md bg-gray-50 flex items-center gap-2">
                      <FileText className="text-blue-500 h-4 w-4" />
                      <span className="text-sm">{bulkUploadFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Download Template</h3>
                  <Button variant="outline" className="gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    Template
                  </Button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">
                    Instructions
                  </h4>
                  <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                    <li>Download the Excel template</li>
                    <li>
                      Fill in your questions following the specified format
                    </li>
                    <li>Save the file and upload it here</li>
                    <li>
                      For multiple-choice questions, separate options with a
                      semicolon (;)
                    </li>
                    <li>
                      Specify the correct answer by its index (starting from 0)
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={handleBulkUpload}
                  disabled={!bulkUploadFile}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Questions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Question Dialog */}
      <Dialog
        open={isAddQuestionDialogOpen}
        onOpenChange={setIsAddQuestionDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>
              Create a new question for your question bank
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Question Text
              </label>
              <Textarea
                placeholder="Enter your question here"
                value={newQuestion.question}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, question: e.target.value })
                }
                className="min-h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Select
                  value={newQuestion.subject}
                  onValueChange={(value) =>
                    setNewQuestion({ ...newQuestion, subject: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Computer Science">
                      Computer Science
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Topic</label>
                <Input
                  placeholder="E.g., Algebra, Geometry, etc."
                  value={newQuestion.topic}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, topic: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Question Type
                </label>
                <Select
                  value={newQuestion.type}
                  onValueChange={(value) =>
                    setNewQuestion({ ...newQuestion, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">
                      Multiple Choice
                    </SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Difficulty Level
                </label>
                <Select
                  value={newQuestion.difficulty}
                  onValueChange={(value) =>
                    setNewQuestion({ ...newQuestion, difficulty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Answer Options
              </label>
              <div className="space-y-3">
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="correct-answer"
                        checked={newQuestion.correctAnswer === index}
                        onChange={() =>
                          setNewQuestion({
                            ...newQuestion,
                            correctAnswer: index,
                          })
                        }
                        className="mr-2"
                      />
                      <label htmlFor={`option-${index}`} className="text-sm">
                        Correct
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddQuestionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddQuestion}>Add Question</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Question Dialog */}
      <Dialog
        open={isViewQuestionDialogOpen}
        onOpenChange={setIsViewQuestionDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Question Details</DialogTitle>
          </DialogHeader>

          {selectedQuestion && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Question:</h3>
                <p className="p-3 bg-gray-50 border rounded-md mt-1">
                  {selectedQuestion.question}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Subject:</h3>
                  <p>{selectedQuestion.subject}</p>
                </div>
                <div>
                  <h3 className="font-medium">Topic:</h3>
                  <p>{selectedQuestion.topic}</p>
                </div>
                <div>
                  <h3 className="font-medium">Type:</h3>
                  <p>{selectedQuestion.type}</p>
                </div>
                <div>
                  <h3 className="font-medium">Difficulty:</h3>
                  <Badge
                    className={
                      selectedQuestion.difficulty === "Easy"
                        ? "bg-green-500"
                        : selectedQuestion.difficulty === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }
                  >
                    {selectedQuestion.difficulty}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Created:</h3>
                <p>
                  {new Date(selectedQuestion.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewQuestionDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Question Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Question</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteQuestion}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageExamQuestions;
