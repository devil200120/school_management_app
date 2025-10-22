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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";

const ManageAssessment = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);
  const [formData, setFormData] = useState({
    level: "",
    class: "",
    subject: "",
  });
  const [questions, setQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setEditFormData({
      question: question.question,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    // Validate edit form
    if (
      !editFormData.question ||
      !editFormData.optionA ||
      !editFormData.optionB ||
      !editFormData.optionC ||
      !editFormData.optionD ||
      !editFormData.correctAnswer
    ) {
      toast.error("Missing information", {
        description: "Please fill in all required fields",
      });
      return;
    }

    // Update the question in the questions array
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

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingQuestion(null);
    setEditFormData({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.level || !formData.class || !formData.subject) {
      toast.error("Missing information", {
        description: "Please select all required fields",
      });
      return;
    }

    setIsChecking(true);

    try {
      // Simulate API call to fetch questions
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock data for demonstration
      const mockQuestions = [
        {
          id: 1,
          question: "What is 2 + 2?",
          optionA: "3",
          optionB: "4",
          optionC: "5",
          optionD: "6",
          correctAnswer: "B",
          level: formData.level,
          class: formData.class,
          subject: formData.subject,
        },
        {
          id: 2,
          question: "What is the capital of Nigeria?",
          optionA: "Lagos",
          optionB: "Kano",
          optionC: "Abuja",
          optionD: "Port Harcourt",
          correctAnswer: "C",
          level: formData.level,
          class: formData.class,
          subject: formData.subject,
        },
      ];

      setQuestions(mockQuestions);
      setShowResults(true);

      toast.success("Questions loaded successfully!", {
        description: `Found ${mockQuestions.length} questions for ${formData.subject} - ${formData.class}`,
      });
    } catch {
      toast.error("Failed to load questions", {
        description: "Please try again later",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Manage Assessment Questions
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Select Assessment Question Subject and Class</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label className="text-sm font-medium">Select Level *</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => handleSelectChange("level", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Select Class *</Label>
                <Select
                  value={formData.class}
                  onValueChange={(value) => handleSelectChange("class", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jss1">JSS 1</SelectItem>
                    <SelectItem value="jss2">JSS 2</SelectItem>
                    <SelectItem value="jss3">JSS 3</SelectItem>
                    <SelectItem value="ss1">SS 1</SelectItem>
                    <SelectItem value="ss2">SS 2</SelectItem>
                    <SelectItem value="ss3">SS 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Select Subject *</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) =>
                    handleSelectChange("subject", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="social-studies">
                      Social Studies
                    </SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="computer-science">
                      Computer Science
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    level: "",
                    class: "",
                    subject: "",
                  });
                  setShowResults(false);
                  setQuestions([]);
                }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={isChecking}
                className="min-w-[120px]"
              >
                {isChecking ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Checking...
                  </>
                ) : (
                  "Check Now"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Questions Results</CardTitle>
            <p className="text-sm text-gray-600">
              Showing {questions.length} questions for {formData.subject} -{" "}
              {formData.class} ({formData.level} level)
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg">
                      Question {index + 1}
                    </h4>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditQuestion(question)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const updatedQuestions = questions.filter(
                            (q) => q.id !== question.id
                          );
                          setQuestions(updatedQuestions);
                          toast.success("Question deleted", {
                            description: "Question removed from the list",
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="mb-3 text-gray-800">{question.question}</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div
                      className={`p-2 rounded ${
                        question.correctAnswer === "A"
                          ? "bg-green-100 border-green-300"
                          : "bg-white border-gray-200"
                      } border`}
                    >
                      <span className="font-medium">A:</span> {question.optionA}
                    </div>
                    <div
                      className={`p-2 rounded ${
                        question.correctAnswer === "B"
                          ? "bg-green-100 border-green-300"
                          : "bg-white border-gray-200"
                      } border`}
                    >
                      <span className="font-medium">B:</span> {question.optionB}
                    </div>
                    <div
                      className={`p-2 rounded ${
                        question.correctAnswer === "C"
                          ? "bg-green-100 border-green-300"
                          : "bg-white border-gray-200"
                      } border`}
                    >
                      <span className="font-medium">C:</span> {question.optionC}
                    </div>
                    <div
                      className={`p-2 rounded ${
                        question.correctAnswer === "D"
                          ? "bg-green-100 border-green-300"
                          : "bg-white border-gray-200"
                      } border`}
                    >
                      <span className="font-medium">D:</span> {question.optionD}
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Correct Answer: Option {question.correctAnswer}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/exam/add-assessment")}
                >
                  Add More Questions
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.success("Export functionality", {
                      description: "Questions exported successfully",
                    });
                  }}
                >
                  Export Questions
                </Button>
              </div>
              <Button
                onClick={() => {
                  toast.success("Assessment ready!", {
                    description: "Questions are ready for assessment",
                  });
                }}
              >
                Finalize Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Question Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Assessment Question</DialogTitle>
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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
    </div>
  );
};

export default ManageAssessment;
