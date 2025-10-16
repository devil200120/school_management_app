import React, { useState } from "react";
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
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Plus,
  Scissors,
  GraduationCap,
  Building,
  Users,
  Calendar,
  UserCheck,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const AddSection = () => {
  const [formData, setFormData] = useState({
    sectionName: "",
    classLevel: "",
  });

  const [sections, setSections] = useState([
    {
      id: "1",
      name: "Section A",
      level: "Grade 1",
      capacity: 30,
      currentStudents: 28,
      teacher: "Mrs. Johnson",
      room: "Room 101",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Section B",
      level: "Grade 1",
      capacity: 30,
      currentStudents: 25,
      teacher: "Mr. Smith",
      room: "Room 102",
      status: "active",
      createdAt: "2024-01-15",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      classLevel: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.sectionName.trim()) {
      toast.error("Please enter a section name!", {
        description: "Section name is required to create a new section.",
        duration: 4000,
      });
      return;
    }

    if (!formData.classLevel) {
      toast.error("Please select a class level!", {
        description: "Class level selection is required.",
        duration: 4000,
      });
      return;
    }

    const newSection = {
      id: (sections.length + 1).toString(),
      name: formData.sectionName,
      level: formData.classLevel,
      capacity: 30,
      currentStudents: 0,
      teacher: "TBD",
      room: "TBD",
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setSections((prev) => [newSection, ...prev]);

    // Beautiful success message
    toast.success(
      `🎉 Section "${formData.sectionName}" created successfully!`,
      {
        description: `${formData.classLevel} section has been added and is ready for student enrollment.`,
        duration: 5000,
        action: {
          label: "View",
          onClick: () => {
            toast.info(`Viewing ${formData.sectionName} details`);
          },
        },
      }
    );

    // Reset form
    setFormData({
      sectionName: "",
      classLevel: "",
    });
  };
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Section
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Section Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sectionName">Enter Section Name</Label>
              <Input
                id="sectionName"
                name="sectionName"
                value={formData.sectionName}
                onChange={handleInputChange}
                placeholder="e.g. Section A, Morning Section, etc."
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classLevel">Select Class Level</Label>
              <Select
                value={formData.classLevel}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 1">Grade 1</SelectItem>
                  <SelectItem value="Grade 2">Grade 2</SelectItem>
                  <SelectItem value="Grade 3">Grade 3</SelectItem>
                  <SelectItem value="Grade 4">Grade 4</SelectItem>
                  <SelectItem value="Grade 5">Grade 5</SelectItem>
                  <SelectItem value="Grade 6">Grade 6</SelectItem>
                  <SelectItem value="Grade 7">Grade 7</SelectItem>
                  <SelectItem value="Grade 8">Grade 8</SelectItem>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                  <SelectItem value="Grade 12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Add Now
          </Button>
        </CardContent>
      </Card>

      {/* Existing Sections Display */}
      <Card className="mt-6 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              Existing Sections ({sections.length})
            </span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Total: {sections.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-semibold">S/N</th>
                  <th className="text-left p-3 font-semibold">Section Name</th>
                  <th className="text-left p-3 font-semibold">Class Level</th>
                  <th className="text-left p-3 font-semibold">Teacher</th>
                  <th className="text-left p-3 font-semibold">Room</th>
                  <th className="text-left p-3 font-semibold">Students</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Created</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section, index) => (
                  <tr
                    key={section.id}
                    className="border-b hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-3 text-gray-600 font-medium">
                      {index + 1}
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-gray-900">
                        {section.name}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 w-fit"
                      >
                        <GraduationCap className="h-3 w-3" />
                        {section.level}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-gray-400" />
                        <span
                          className={
                            section.teacher === "TBD"
                              ? "text-red-500 font-medium"
                              : "text-gray-900"
                          }
                        >
                          {section.teacher}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span
                          className={
                            section.room === "TBD"
                              ? "text-red-500 font-medium"
                              : "text-gray-900"
                          }
                        >
                          {section.room}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">
                          {section.currentStudents}/{section.capacity}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        className={
                          section.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {section.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {section.createdAt}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sections.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Scissors className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">
                No sections created yet
              </p>
              <p className="text-sm">
                Add your first section using the form above!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSection;
