import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { toast } from "sonner";
import {
  BookOpen,
  Edit3,
  Eye,
  Search,
  Trash2,
  Users,
  Star,
  DollarSign,
  TrendingUp,
  Award,
  Play,
} from "lucide-react";

// Sample course data
const mockCourses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    category: "Mathematics",
    instructor: "Dr. Sarah Johnson",
    students: 156,
    rating: 4.8,
    price: 15000,
    status: "published",
    duration: "8 weeks",
    modules: 12,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    category: "Science",
    instructor: "Prof. Michael Chen",
    students: 203,
    rating: 4.6,
    price: 0,
    status: "published",
    duration: "10 weeks",
    modules: 15,
    createdAt: "2024-02-01",
  },
  {
    id: 3,
    title: "English Literature",
    category: "English",
    instructor: "Ms. Emily Davis",
    students: 89,
    rating: 4.9,
    price: 12000,
    status: "draft",
    duration: "6 weeks",
    modules: 8,
    createdAt: "2024-02-10",
  },
  {
    id: 4,
    title: "Computer Programming Basics",
    category: "Computer Science",
    instructor: "Dr. David Wilson",
    students: 274,
    rating: 4.7,
    price: 25000,
    status: "published",
    duration: "12 weeks",
    modules: 20,
    createdAt: "2024-01-20",
  },
];

const ManageCourse = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [editCourseData, setEditCourseData] = useState(null);

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || course.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || course.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setIsViewDialogOpen(true);
  };

  const handleEditCourse = (course) => {
    setEditCourseData({ ...course });
    setIsEditDialogOpen(true);
  };

  const handleUpdateCourse = () => {
    if (!editCourseData.title.trim()) {
      toast.error("Course title is required");
      return;
    }

    setCourses(
      courses.map((course) =>
        course.id === editCourseData.id ? editCourseData : course
      )
    );
    toast.success("Course updated successfully");
    setIsEditDialogOpen(false);
    setEditCourseData(null);
  };

  const handleDeleteCourse = (course) => {
    setCourseToDelete(course);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setCourses(courses.filter((course) => course.id !== courseToDelete.id));
    toast.success("Course deleted successfully");
    setIsDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  const handleStatusChange = (courseId, newStatus) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, status: newStatus } : course
      )
    );
    toast.success(`Course ${newStatus} successfully`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Calculate statistics
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(
    (c) => c.status === "published"
  ).length;
  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0
  );
  const totalRevenue = courses.reduce(
    (sum, course) => sum + course.price * course.students,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Manage E-Learning Courses
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor all e-learning courses
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Courses
                </p>
                <p className="text-2xl font-bold">{totalCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold">{publishedCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  ₦{totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription>Search and filter courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Computer Science">
                  Computer Science
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-gray-500">
                        {course.modules} modules • {course.duration}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{course.instructor}</div>
                      <div className="text-sm text-gray-500">
                        {course.category}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      {course.students}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      {course.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    {course.price === 0 ? (
                      <Badge variant="outline" className="text-green-600">
                        Free
                      </Badge>
                    ) : (
                      `₦${course.price.toLocaleString()}`
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCourse(course)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCourse(course)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Select
                        value={course.status}
                        onValueChange={(value) =>
                          handleStatusChange(course.id, value)
                        }
                      >
                        <SelectTrigger className="w-[100px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">Publish</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archive</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCourse(course)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Course Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
            <DialogDescription>
              View detailed information about the course
            </DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Course Title</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCourse.title}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Category</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCourse.category}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Instructor</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCourse.instructor}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Duration</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCourse.duration}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Students Enrolled</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCourse.students}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Rating</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCourse.rating}/5.0
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Price</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCourse.price === 0
                      ? "Free"
                      : `₦${selectedCourse.price.toLocaleString()}`}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Status</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCourse.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {selectedCourse.modules}
                  </div>
                  <div className="text-sm text-gray-500">Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    ₦
                    {(
                      selectedCourse.price * selectedCourse.students
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Revenue</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Modify course information and settings
            </DialogDescription>
          </DialogHeader>
          {editCourseData && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Course Title</label>
                  <Input
                    value={editCourseData.title}
                    onChange={(e) =>
                      setEditCourseData({
                        ...editCourseData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter course title"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={editCourseData.category}
                    onValueChange={(value) =>
                      setEditCourseData({ ...editCourseData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Computer Science">
                        Computer Science
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instructor</label>
                  <Input
                    value={editCourseData.instructor}
                    onChange={(e) =>
                      setEditCourseData({
                        ...editCourseData,
                        instructor: e.target.value,
                      })
                    }
                    placeholder="Enter instructor name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Input
                    value={editCourseData.duration}
                    onChange={(e) =>
                      setEditCourseData({
                        ...editCourseData,
                        duration: e.target.value,
                      })
                    }
                    placeholder="e.g., 8 weeks"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (₦)</label>
                  <Input
                    type="number"
                    value={editCourseData.price}
                    onChange={(e) =>
                      setEditCourseData({
                        ...editCourseData,
                        price: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Enter price"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Modules</label>
                  <Input
                    type="number"
                    value={editCourseData.modules}
                    onChange={(e) =>
                      setEditCourseData({
                        ...editCourseData,
                        modules: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Number of modules"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateCourse}
              className="bg-eduos-primary hover:bg-eduos-secondary"
            >
              Update Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{courseToDelete?.title}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCourse;
