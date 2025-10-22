import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";

const ManageExamQuestions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deletingQuestion, setDeletingQuestion] = useState(null);
  const [editFormData, setEditFormData] = useState({
    question: "",
    subject: "",
    class: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  // Dummy data for the questions - now using state
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is 2 + 2?",
      subject: "Mathematics",
      class: "JSS 1",
      optionA: "3",
      optionB: "4",
      optionC: "5",
      optionD: "6",
      correctAnswer: "B",
    },
    {
      id: 2,
      question: "Who wrote Romeo and Juliet?",
      subject: "English",
      class: "SS 3",
      optionA: "Charles Dickens",
      optionB: "William Shakespeare",
      optionC: "Jane Austen",
      optionD: "Mark Twain",
      correctAnswer: "B",
    },
    {
      id: 3,
      question: "What is the chemical formula for water?",
      subject: "Chemistry",
      class: "SS 2",
      optionA: "H2O",
      optionB: "CO2",
      optionC: "O2",
      optionD: "N2",
      correctAnswer: "A",
    },
  ]);

  const filteredQuestions = questions.filter(
    (question) =>
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setEditFormData({
      question: question.question,
      subject: question.subject,
      class: question.class,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
    });
    setShowEditModal(true);
  };

  const handleDeleteQuestion = (question) => {
    setDeletingQuestion(question);
    setShowDeleteModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    // Validate form
    const requiredFields = [
      "question",
      "subject",
      "class",
      "optionA",
      "optionB",
      "optionC",
      "optionD",
      "correctAnswer",
    ];
    const missingFields = requiredFields.filter(
      (field) => !editFormData[field]
    );

    if (missingFields.length > 0) {
      toast.error("Missing information", {
        description: "Please fill in all required fields",
      });
      return;
    }

    // Update the question
    const updatedQuestions = questions.map((q) =>
      q.id === editingQuestion.id ? { ...q, ...editFormData } : q
    );

    setQuestions(updatedQuestions);
    setShowEditModal(false);
    setEditingQuestion(null);

    toast.success("Question updated successfully!", {
      description: "The question has been saved with your changes",
    });
  };

  const confirmDelete = () => {
    const updatedQuestions = questions.filter(
      (q) => q.id !== deletingQuestion.id
    );
    setQuestions(updatedQuestions);
    setShowDeleteModal(false);
    setDeletingQuestion(null);

    toast.success("Question deleted successfully!", {
      description: "The question has been removed from the list",
    });
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingQuestion(null);
    setEditFormData({
      question: "",
      subject: "",
      class: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight">
        Manage Exam Questions
      </h2>

      <Card className="shadow-md">
        <CardHeader className="p-3 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <CardTitle className="text-lg sm:text-xl">
              Exam Questions List
            </CardTitle>
            <div className="relative w-full sm:w-auto">
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">ID</TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Question
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Subject
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">Class</TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Options
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Correct
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="text-xs sm:text-sm p-2 sm:p-3 md:p-4">
                        {question.id}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm p-2 sm:p-3 md:p-4 max-w-[150px] truncate">
                        {question.question}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm p-2 sm:p-3 md:p-4">
                        {question.subject}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm p-2 sm:p-3 md:p-4">
                        {question.class}
                      </TableCell>
                      <TableCell className="p-2 sm:p-3 md:p-4">
                        <ul className="text-[10px] sm:text-xs">
                          <li className="truncate">A: {question.optionA}</li>
                          <li className="truncate">B: {question.optionB}</li>
                          <li className="truncate">C: {question.optionC}</li>
                          <li className="truncate">D: {question.optionD}</li>
                        </ul>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm p-2 sm:p-3 md:p-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          {question.correctAnswer}
                        </span>
                      </TableCell>
                      <TableCell className="p-2 sm:p-3 md:p-4">
                        <div className="flex flex-col xs:flex-row gap-1 xs:gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[10px] sm:text-xs h-7 px-2"
                            onClick={() => handleEditQuestion(question)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="text-[10px] sm:text-xs h-7 px-2"
                            onClick={() => handleDeleteQuestion(question)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Question Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Exam Question</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <Label htmlFor="editQuestion">Question *</Label>
              <textarea
                id="editQuestion"
                name="question"
                value={editFormData.question}
                onChange={handleEditFormChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Enter the question"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editSubject">Subject *</Label>
                <Input
                  id="editSubject"
                  name="subject"
                  value={editFormData.subject}
                  onChange={handleEditFormChange}
                  placeholder="Enter subject"
                  required
                />
              </div>

              <div>
                <Label htmlFor="editClass">Class *</Label>
                <Input
                  id="editClass"
                  name="class"
                  value={editFormData.class}
                  onChange={handleEditFormChange}
                  placeholder="Enter class"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editOptionA">Option A *</Label>
                <Input
                  id="editOptionA"
                  name="optionA"
                  value={editFormData.optionA}
                  onChange={handleEditFormChange}
                  placeholder="Enter option A"
                  required
                />
              </div>

              <div>
                <Label htmlFor="editOptionB">Option B *</Label>
                <Input
                  id="editOptionB"
                  name="optionB"
                  value={editFormData.optionB}
                  onChange={handleEditFormChange}
                  placeholder="Enter option B"
                  required
                />
              </div>

              <div>
                <Label htmlFor="editOptionC">Option C *</Label>
                <Input
                  id="editOptionC"
                  name="optionC"
                  value={editFormData.optionC}
                  onChange={handleEditFormChange}
                  placeholder="Enter option C"
                  required
                />
              </div>

              <div>
                <Label htmlFor="editOptionD">Option D *</Label>
                <Input
                  id="editOptionD"
                  name="optionD"
                  value={editFormData.optionD}
                  onChange={handleEditFormChange}
                  placeholder="Enter option D"
                  required
                />
              </div>
            </div>

            <div>
              <Label>Select Correct Option *</Label>
              <RadioGroup
                value={editFormData.correctAnswer}
                onValueChange={(value) =>
                  setEditFormData((prev) => ({ ...prev, correctAnswer: value }))
                }
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="A" id="editOptA" />
                  <Label htmlFor="editOptA">Option A</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="B" id="editOptB" />
                  <Label htmlFor="editOptB">Option B</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="C" id="editOptC" />
                  <Label htmlFor="editOptC">Option C</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="D" id="editOptD" />
                  <Label htmlFor="editOptD">Option D</Label>
                </div>
              </RadioGroup>
            </div>

            <DialogFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-gray-600">
              Are you sure you want to delete this question? This action cannot
              be undone.
            </p>
            {deletingQuestion && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-800">
                  &ldquo;{deletingQuestion.question}&rdquo;
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {deletingQuestion.subject} - {deletingQuestion.class}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setDeletingQuestion(null);
              }}
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Delete Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageExamQuestions;
