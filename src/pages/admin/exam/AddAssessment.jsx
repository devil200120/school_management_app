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
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const AddAssessment = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    subject: "",
    class: "",
    level: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "",
    correctAnswer: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description:
            "Please select a valid image file (JPEG, PNG, JPG, or GIF)",
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please select an image smaller than 5MB",
        });
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      toast.success("Image selected", {
        description: `Selected: ${file.name}`,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "question",
      "subject",
      "class",
      "level",
      "optionA",
      "optionB",
      "optionC",
      "optionD",
      "correctOption",
      "correctAnswer",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error("Missing information", {
        description: "Please fill in all required fields",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Assessment added:", formData);

      toast.success("Assessment question added successfully!", {
        description: "The question has been added to the question bank",
      });

      // Reset form
      setFormData({
        question: "",
        subject: "",
        class: "",
        level: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: "",
        correctAnswer: "",
        image: null,
      });

      // Navigate back to manage questions or stay on page
      // navigate('/admin/exam/manage-questions');
    } catch (error) {
      toast.error("Failed to add question", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Add Assessment/Questions
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Create New Assessment Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="question">Question</Label>
                <textarea
                  id="question"
                  name="question"
                  placeholder="Enter the question"
                  value={formData.question}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  required
                />
              </div>

              {/* Subject, Class, and Level Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Subject *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      handleSelectChange("subject", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
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

                <div>
                  <Label className="text-sm font-medium">Class *</Label>
                  <Select
                    value={formData.class}
                    onValueChange={(value) =>
                      handleSelectChange("class", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
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
                  <Label className="text-sm font-medium">
                    Difficulty Level *
                  </Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) =>
                      handleSelectChange("level", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="optionA">Option A</Label>
                  <Input
                    id="optionA"
                    name="optionA"
                    placeholder="Enter option A"
                    value={formData.optionA}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="optionB">Option B</Label>
                  <Input
                    id="optionB"
                    name="optionB"
                    placeholder="Enter option B"
                    value={formData.optionB}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="optionC">Option C</Label>
                  <Input
                    id="optionC"
                    name="optionC"
                    placeholder="Enter option C"
                    value={formData.optionC}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="optionD">Option D</Label>
                  <Input
                    id="optionD"
                    name="optionD"
                    placeholder="Enter option D"
                    value={formData.optionD}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Select Correct Option</Label>
                <RadioGroup
                  value={formData.correctOption}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, correctOption: value }))
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="A" id="optA" />
                    <Label htmlFor="optA">Option A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="B" id="optB" />
                    <Label htmlFor="optB">Option B</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="C" id="optC" />
                    <Label htmlFor="optC">Option C</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="D" id="optD" />
                    <Label htmlFor="optD">Option D</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="correctAnswer">
                  Enter Correct Ans in Words
                </Label>
                <Input
                  id="correctAnswer"
                  name="correctAnswer"
                  placeholder="Enter the correct answer in words"
                  value={formData.correctAnswer}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="questionImage">Question Image</Label>
                <Input
                  id="questionImage"
                  name="questionImage"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      question: "",
                      subject: "",
                      class: "",
                      level: "",
                      optionA: "",
                      optionB: "",
                      optionC: "",
                      optionD: "",
                      correctOption: "",
                      correctAnswer: "",
                      image: null,
                    });
                  }}
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    "ADD NOW"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddAssessment;
