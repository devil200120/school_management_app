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
import { Checkbox } from "../../../components/ui/checkbox";
import { BookOpen, Save, Upload, Plus, X } from "lucide-react";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    instructor: "",
    duration: "",
    level: "",
    price: "",
    isPaid: false,
    isFeatured: false,
    thumbnail: null,
    objectives: [""],
    modules: [
      {
        title: "",
        description: "",
        videos: [{ title: "", url: "", duration: "" }],
      },
    ],
  });

  const addObjective = () => {
    setCourseData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }));
  };

  const updateObjective = (index, value) => {
    setCourseData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => (i === index ? value : obj)),
    }));
  };

  const removeObjective = (index) => {
    setCourseData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }));
  };

  const addModule = () => {
    setCourseData((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          title: "",
          description: "",
          videos: [{ title: "", url: "", duration: "" }],
        },
      ],
    }));
  };

  const updateModule = (moduleIndex, field, value) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module, i) =>
        i === moduleIndex ? { ...module, [field]: value } : module
      ),
    }));
  };

  const addVideo = (moduleIndex) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module, i) =>
        i === moduleIndex
          ? {
              ...module,
              videos: [...module.videos, { title: "", url: "", duration: "" }],
            }
          : module
      ),
    }));
  };

  const updateVideo = (moduleIndex, videoIndex, field, value) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module, i) =>
        i === moduleIndex
          ? {
              ...module,
              videos: module.videos.map((video, j) =>
                j === videoIndex ? { ...video, [field]: value } : video
              ),
            }
          : module
      ),
    }));
  };

  const handleSaveCourse = () => {
    if (
      !courseData.title.trim() ||
      !courseData.category ||
      !courseData.instructor
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Course created successfully!");
    // Reset form
    setCourseData({
      title: "",
      description: "",
      category: "",
      instructor: "",
      duration: "",
      level: "",
      price: "",
      isPaid: false,
      isFeatured: false,
      thumbnail: null,
      objectives: [""],
      modules: [
        {
          title: "",
          description: "",
          videos: [{ title: "", url: "", duration: "" }],
        },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Add E-Learning Course
          </h1>
          <p className="text-muted-foreground">
            Create a new course for the e-learning platform
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={courseData.title}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Enter course title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={courseData.category}
                  onValueChange={(value) =>
                    setCourseData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="computer">Computer Science</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                value={courseData.description}
                onChange={(e) =>
                  setCourseData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter course description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor *</Label>
                <Select
                  value={courseData.instructor}
                  onValueChange={(value) =>
                    setCourseData((prev) => ({ ...prev, instructor: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-sarah">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="prof-mike">
                      Prof. Michael Chen
                    </SelectItem>
                    <SelectItem value="ms-emily">Ms. Emily Davis</SelectItem>
                    <SelectItem value="dr-david">Dr. David Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={courseData.duration}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  placeholder="e.g., 8 weeks"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  value={courseData.level}
                  onValueChange={(value) =>
                    setCourseData((prev) => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  value={courseData.price}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  placeholder="Enter price (leave empty for free)"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPaid"
                    checked={courseData.isPaid}
                    onCheckedChange={(checked) =>
                      setCourseData((prev) => ({ ...prev, isPaid: checked }))
                    }
                  />
                  <Label htmlFor="isPaid">Paid Course</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={courseData.isFeatured}
                    onCheckedChange={(checked) =>
                      setCourseData((prev) => ({
                        ...prev,
                        isFeatured: checked,
                      }))
                    }
                  />
                  <Label htmlFor="isFeatured">Featured Course</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Objectives */}
        <Card>
          <CardHeader>
            <CardTitle>Course Objectives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseData.objectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={objective}
                  onChange={(e) => updateObjective(index, e.target.value)}
                  placeholder="Enter learning objective"
                  className="flex-1"
                />
                {courseData.objectives.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeObjective(index)}
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
              Add Objective
            </Button>
          </CardContent>
        </Card>

        {/* Course Modules */}
        <Card>
          <CardHeader>
            <CardTitle>Course Modules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {courseData.modules.map((module, moduleIndex) => (
              <div
                key={moduleIndex}
                className="border rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Module {moduleIndex + 1}</h4>
                  {courseData.modules.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCourseData((prev) => ({
                          ...prev,
                          modules: prev.modules.filter(
                            (_, i) => i !== moduleIndex
                          ),
                        }))
                      }
                    >
                      Remove Module
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={module.title}
                    onChange={(e) =>
                      updateModule(moduleIndex, "title", e.target.value)
                    }
                    placeholder="Module title"
                  />
                  <Textarea
                    value={module.description}
                    onChange={(e) =>
                      updateModule(moduleIndex, "description", e.target.value)
                    }
                    placeholder="Module description"
                    rows={2}
                  />
                </div>

                <div className="space-y-3">
                  <h5 className="text-sm font-medium">Videos</h5>
                  {module.videos.map((video, videoIndex) => (
                    <div
                      key={videoIndex}
                      className="grid grid-cols-1 md:grid-cols-3 gap-2"
                    >
                      <Input
                        value={video.title}
                        onChange={(e) =>
                          updateVideo(
                            moduleIndex,
                            videoIndex,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Video title"
                      />
                      <Input
                        value={video.url}
                        onChange={(e) =>
                          updateVideo(
                            moduleIndex,
                            videoIndex,
                            "url",
                            e.target.value
                          )
                        }
                        placeholder="Video URL"
                      />
                      <Input
                        value={video.duration}
                        onChange={(e) =>
                          updateVideo(
                            moduleIndex,
                            videoIndex,
                            "duration",
                            e.target.value
                          )
                        }
                        placeholder="Duration (e.g., 15 min)"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addVideo(moduleIndex)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addModule}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveCourse}
            className="bg-eduos-primary hover:bg-eduos-secondary"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Course
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
