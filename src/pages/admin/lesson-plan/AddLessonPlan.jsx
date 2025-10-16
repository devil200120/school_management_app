import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Plus,
  Save,
  FileText,
  Calendar,
  Book,
  Users,
  Target,
  Clock,
  CheckCircle,
  X,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

const AddLessonPlan = () => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    class: "",
    term: "",
    week: "",
    duration: "",
    topic: "",
    objectives: [""],
    materials: [""],
    procedures: [{ step: "", description: "" }],
    assessment: "",
    differentiation: "",
    homework: "",
    teacherNotes: "",
  });

  const [attachments, setAttachments] = useState([]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle array field changes
  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Handle procedure changes
  const handleProcedureChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      procedures: prev.procedures.map((proc, i) =>
        i === index ? { ...proc, [field]: value } : proc
      ),
    }));
  };

  // Add new field functions
  const addObjective = () => {
    setFormData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }));
  };

  const addMaterial = () => {
    setFormData((prev) => ({
      ...prev,
      materials: [...prev.materials, ""],
    }));
  };

  const addProcedure = () => {
    setFormData((prev) => ({
      ...prev,
      procedures: [...prev.procedures, { step: "", description: "" }],
    }));
  };

  // Remove field functions
  const removeObjective = (index) => {
    if (formData.objectives.length > 1) {
      setFormData((prev) => ({
        ...prev,
        objectives: prev.objectives.filter((_, i) => i !== index),
      }));
    }
  };

  const removeMaterial = (index) => {
    if (formData.materials.length > 1) {
      setFormData((prev) => ({
        ...prev,
        materials: prev.materials.filter((_, i) => i !== index),
      }));
    }
  };

  const removeProcedure = (index) => {
    if (formData.procedures.length > 1) {
      setFormData((prev) => ({
        ...prev,
        procedures: prev.procedures.filter((_, i) => i !== index),
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setAttachments((prev) => [...prev, ...files]);

    toast.success("Files Added", {
      description: `${files.length} file(s) have been attached to the lesson plan.`,
      icon: <Upload className="h-4 w-4" />,
      duration: 3000,
    });
  };

  // Remove attachment
  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    toast.info("File Removed", {
      description: "Attachment has been removed from the lesson plan.",
      icon: <X className="h-4 w-4" />,
      duration: 2000,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.subject || !formData.class) {
      toast.error("Missing Required Fields", {
        description: "Please fill in the title, subject, and class fields.",
        icon: <X className="h-4 w-4" />,
        duration: 4000,
      });
      return;
    }

    // Success message
    toast.success("Lesson Plan Created Successfully!", {
      description: `Lesson plan "${formData.title}" has been created and is ready for review.`,
      icon: <CheckCircle className="h-4 w-4" />,
      duration: 5000,
    });

    // Reset form
    setFormData({
      title: "",
      subject: "",
      class: "",
      term: "",
      week: "",
      duration: "",
      topic: "",
      objectives: [""],
      materials: [""],
      procedures: [{ step: "", description: "" }],
      assessment: "",
      differentiation: "",
      homework: "",
      teacherNotes: "",
    });
    setAttachments([]);
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Lesson Plan
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Lesson Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter lesson title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  onValueChange={(value) => handleInputChange("subject", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="english">English Language</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="social-studies">
                      Social Studies
                    </SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="class">Class Level *</Label>
                <Select
                  onValueChange={(value) => handleInputChange("class", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary-1">Primary 1</SelectItem>
                    <SelectItem value="primary-2">Primary 2</SelectItem>
                    <SelectItem value="primary-3">Primary 3</SelectItem>
                    <SelectItem value="primary-4">Primary 4</SelectItem>
                    <SelectItem value="primary-5">Primary 5</SelectItem>
                    <SelectItem value="primary-6">Primary 6</SelectItem>
                    <SelectItem value="jss-1">JSS 1</SelectItem>
                    <SelectItem value="jss-2">JSS 2</SelectItem>
                    <SelectItem value="jss-3">JSS 3</SelectItem>
                    <SelectItem value="sss-1">SSS 1</SelectItem>
                    <SelectItem value="sss-2">SSS 2</SelectItem>
                    <SelectItem value="sss-3">SSS 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="term">Term</Label>
                <Select
                  onValueChange={(value) => handleInputChange("term", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">First Term</SelectItem>
                    <SelectItem value="second">Second Term</SelectItem>
                    <SelectItem value="third">Third Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="week">Week</Label>
                <Input
                  id="week"
                  placeholder="e.g., Week 1"
                  value={formData.week}
                  onChange={(e) => handleInputChange("week", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 40"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="topic">Topic/Unit</Label>
              <Input
                id="topic"
                placeholder="Enter main topic or unit"
                value={formData.topic}
                onChange={(e) => handleInputChange("topic", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Learning Objectives */}
        <Card className="animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Learning Objectives
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {formData.objectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Learning objective ${index + 1}`}
                  value={objective}
                  onChange={(e) =>
                    handleArrayChange("objectives", index, e.target.value)
                  }
                />
                {formData.objectives.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeObjective(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addObjective}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Objective
            </Button>
          </CardContent>
        </Card>

        {/* Materials and Resources */}
        <Card className="animate-fade-in delay-300 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Materials and Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {formData.materials.map((material, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Material/Resource ${index + 1}`}
                  value={material}
                  onChange={(e) =>
                    handleArrayChange("materials", index, e.target.value)
                  }
                />
                {formData.materials.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeMaterial(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addMaterial}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Material
            </Button>
          </CardContent>
        </Card>

        {/* Lesson Procedures */}
        <Card className="animate-fade-in delay-400 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Lesson Procedures
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {formData.procedures.map((procedure, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">
                    Step {index + 1}
                  </Label>
                  {formData.procedures.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeProcedure(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="Step title (e.g., Introduction, Direct Instruction)"
                  value={procedure.step}
                  onChange={(e) =>
                    handleProcedureChange(index, "step", e.target.value)
                  }
                />
                <Textarea
                  placeholder="Detailed description of this step"
                  value={procedure.description}
                  onChange={(e) =>
                    handleProcedureChange(index, "description", e.target.value)
                  }
                  rows={3}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addProcedure}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Step
            </Button>
          </CardContent>
        </Card>

        {/* Assessment and Additional Information */}
        <Card className="animate-fade-in delay-500 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Assessment and Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="assessment">Assessment Methods</Label>
              <Textarea
                id="assessment"
                placeholder="Describe how students will be assessed (formative, summative, etc.)"
                value={formData.assessment}
                onChange={(e) =>
                  handleInputChange("assessment", e.target.value)
                }
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="differentiation">
                Differentiation Strategies
              </Label>
              <Textarea
                id="differentiation"
                placeholder="How will you address different learning needs?"
                value={formData.differentiation}
                onChange={(e) =>
                  handleInputChange("differentiation", e.target.value)
                }
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="homework">Homework/Extension Activities</Label>
              <Textarea
                id="homework"
                placeholder="What follow-up activities or homework will be assigned?"
                value={formData.homework}
                onChange={(e) => handleInputChange("homework", e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="teacherNotes">Teacher Notes/Reflections</Label>
              <Textarea
                id="teacherNotes"
                placeholder="Any additional notes, anticipated challenges, or reflections"
                value={formData.teacherNotes}
                onChange={(e) =>
                  handleInputChange("teacherNotes", e.target.value)
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* File Attachments */}
        <Card className="animate-fade-in delay-600 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-600 to-slate-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              File Attachments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="files">Attach Supporting Documents</Label>
              <Input
                id="files"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png,.gif"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: PDF, Word, PowerPoint, Images (Max 10MB each)
              </p>
            </div>
            {attachments.length > 0 && (
              <div className="space-y-2">
                <Label>Attached Files:</Label>
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <span className="text-sm">{file.name}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button
            type="submit"
            className="bg-eduos-primary hover:bg-eduos-secondary"
          >
            <Save className="h-4 w-4 mr-2" />
            Create Lesson Plan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLessonPlan;
