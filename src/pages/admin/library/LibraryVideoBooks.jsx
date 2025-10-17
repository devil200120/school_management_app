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
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Search,
  Plus,
  Play,
  Pause,
  Download,
  Edit,
  Trash2,
  Upload,
  Clock,
  BookOpen,
  Video,
  Filter,
  Eye,
  Calendar,
  Users,
  Monitor,
} from "lucide-react";

const LibraryVideoBooks = () => {
  // State management
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [sortBy, setSortBy] = useState("title");

  // Form state for add/edit
  const [bookForm, setBookForm] = useState({
    title: "",
    instructor: "",
    level: "",
    subject: "",
    duration: "",
    category: "",
    description: "",
    videoQuality: "",
    videoSize: "",
    videoFile: null,
    thumbnail: null,
  });

  // Sample video books data
  const [videoBooks, setVideoBooks] = useState([
    {
      id: 1,
      title: "Introduction to Mathematics",
      instructor: "Prof. Ahmad Yusuf",
      level: "Primary",
      subject: "Mathematics",
      duration: "2:30:45",
      category: "Educational",
      description: "Basic mathematics concepts for primary school students",
      status: "available",
      dateAdded: "2023-08-15",
      viewCount: 145,
      videoQuality: "1080p",
      videoSize: "1.2 GB",
      videoUrl: "/videos/intro-mathematics.mp4",
      thumbnailUrl: "/images/intro-mathematics-thumb.jpg",
    },
    {
      id: 2,
      title: "English Grammar Fundamentals",
      instructor: "Mrs. Fatima Ibrahim",
      level: "Junior Secondary",
      subject: "English Language",
      duration: "3:15:20",
      category: "Language Arts",
      description: "Comprehensive guide to English grammar rules and usage",
      status: "available",
      dateAdded: "2023-08-10",
      viewCount: 289,
      videoQuality: "720p",
      videoSize: "800 MB",
      videoUrl: "/videos/english-grammar.mp4",
      thumbnailUrl: "/images/english-grammar-thumb.jpg",
    },
    {
      id: 3,
      title: "Physics Experiments and Demonstrations",
      instructor: "Dr. Olumide Adebayo",
      level: "Senior Secondary",
      subject: "Physics",
      duration: "4:45:30",
      category: "Science",
      description: "Practical physics experiments with detailed explanations",
      status: "available",
      dateAdded: "2023-08-05",
      viewCount: 198,
      videoQuality: "1080p",
      videoSize: "2.1 GB",
      videoUrl: "/videos/physics-experiments.mp4",
      thumbnailUrl: "/images/physics-experiments-thumb.jpg",
    },
    {
      id: 4,
      title: "Basic Computer Skills",
      instructor: "Mr. Chukwuma Okafor",
      level: "Primary",
      subject: "Computer Science",
      duration: "1:55:45",
      category: "Technology",
      description: "Introduction to computers and basic digital literacy",
      status: "maintenance",
      dateAdded: "2023-07-28",
      viewCount: 176,
      videoQuality: "720p",
      videoSize: "650 MB",
      videoUrl: "/videos/basic-computer-skills.mp4",
      thumbnailUrl: "/images/basic-computer-skills-thumb.jpg",
    },
    {
      id: 5,
      title: "Chemistry Laboratory Techniques",
      instructor: "Dr. Aisha Mohammed",
      level: "Senior Secondary",
      subject: "Chemistry",
      duration: "3:30:15",
      category: "Science",
      description: "Safe laboratory practices and experimental procedures",
      status: "available",
      dateAdded: "2023-07-20",
      viewCount: 87,
      videoQuality: "1080p",
      videoSize: "1.8 GB",
      videoUrl: "/videos/chemistry-lab-techniques.mp4",
      thumbnailUrl: "/images/chemistry-lab-techniques-thumb.jpg",
    },
    {
      id: 6,
      title: "History of Nigeria",
      instructor: "Prof. Kemi Adeleke",
      level: "Junior Secondary",
      subject: "History",
      duration: "2:45:20",
      category: "Social Studies",
      description: "Comprehensive overview of Nigerian history and culture",
      status: "available",
      dateAdded: "2023-07-15",
      viewCount: 156,
      videoQuality: "720p",
      videoSize: "900 MB",
      videoUrl: "/videos/history-of-nigeria.mp4",
      thumbnailUrl: "/images/history-of-nigeria-thumb.jpg",
    },
  ]);

  // Handle level selection and filtering
  const handleCheckNow = () => {
    if (!selectedLevel) {
      toast.error("Please select a level", {
        description:
          "You need to select an education level to view video books.",
        duration: 3000,
      });
      return;
    }

    const filtered = videoBooks.filter(
      (book) =>
        book.level === selectedLevel &&
        (searchTerm === "" ||
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredBooks(filtered);
    setShowResults(true);

    toast.success(`Found ${filtered.length} video books`, {
      description: `Displaying video books for ${selectedLevel} level.`,
      duration: 3000,
    });
  };

  // Video playback handlers
  const handlePlay = (book) => {
    if (currentlyPlaying === book.id) {
      setCurrentlyPlaying(null);
      toast.info("Video paused", {
        description: `Paused "${book.title}"`,
        duration: 2000,
      });
    } else {
      setCurrentlyPlaying(book.id);
      // Update view count
      setVideoBooks((prev) =>
        prev.map((b) =>
          b.id === book.id ? { ...b, viewCount: b.viewCount + 1 } : b
        )
      );
      toast.success("Now playing", {
        description: `Playing "${book.title}" by ${book.instructor}`,
        duration: 3000,
      });
    }
  };

  const handleDownload = (book) => {
    toast.success("Download started", {
      description: `Downloading "${book.title}" video file (${book.videoSize}).`,
      duration: 3000,
    });
    // Simulate download
    setTimeout(() => {
      toast.success("Download completed", {
        description: `"${book.title}" has been downloaded successfully.`,
        duration: 3000,
      });
    }, 3000);
  };

  // CRUD operations
  const handleAddBook = () => {
    if (
      !bookForm.title ||
      !bookForm.instructor ||
      !bookForm.level ||
      !bookForm.subject
    ) {
      toast.error("Missing required fields", {
        description: "Please fill in title, instructor, level, and subject.",
        duration: 3000,
      });
      return;
    }

    const newBook = {
      id: videoBooks.length + 1,
      ...bookForm,
      status: "available",
      dateAdded: new Date().toISOString().split("T")[0],
      viewCount: 0,
      videoUrl: `/videos/${bookForm.title
        .toLowerCase()
        .replace(/\s+/g, "-")}.mp4`,
      thumbnailUrl: `/images/${bookForm.title
        .toLowerCase()
        .replace(/\s+/g, "-")}-thumb.jpg`,
    };

    setVideoBooks((prev) => [...prev, newBook]);
    setIsAddDialogOpen(false);
    setBookForm({
      title: "",
      instructor: "",
      level: "",
      subject: "",
      duration: "",
      category: "",
      description: "",
      videoQuality: "",
      videoSize: "",
      videoFile: null,
      thumbnail: null,
    });

    toast.success("Video book added successfully", {
      description: `"${newBook.title}" has been added to the library.`,
      duration: 4000,
    });
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setBookForm({
      title: book.title,
      instructor: book.instructor,
      level: book.level,
      subject: book.subject,
      duration: book.duration,
      category: book.category,
      description: book.description,
      videoQuality: book.videoQuality,
      videoSize: book.videoSize,
      videoFile: null,
      thumbnail: null,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateBook = () => {
    if (
      !bookForm.title ||
      !bookForm.instructor ||
      !bookForm.level ||
      !bookForm.subject
    ) {
      toast.error("Missing required fields", {
        description: "Please fill in title, instructor, level, and subject.",
        duration: 3000,
      });
      return;
    }

    setVideoBooks((prev) =>
      prev.map((book) =>
        book.id === selectedBook.id ? { ...book, ...bookForm } : book
      )
    );

    setIsEditDialogOpen(false);
    setSelectedBook(null);
    setBookForm({
      title: "",
      instructor: "",
      level: "",
      subject: "",
      duration: "",
      category: "",
      description: "",
      videoQuality: "",
      videoSize: "",
      videoFile: null,
      thumbnail: null,
    });

    toast.success("Video book updated successfully", {
      description: `"${bookForm.title}" has been updated.`,
      duration: 4000,
    });
  };

  const handleDeleteBook = (book) => {
    setVideoBooks((prev) => prev.filter((b) => b.id !== book.id));
    toast.success("Video book removed", {
      description: `"${book.title}" has been removed from the library.`,
      duration: 3000,
    });
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setIsViewDialogOpen(true);
  };

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "instructor":
        return a.instructor.localeCompare(b.instructor);
      case "subject":
        return a.subject.localeCompare(b.subject);
      case "duration":
        return a.duration.localeCompare(b.duration);
      case "viewCount":
        return b.viewCount - a.viewCount;
      case "dateAdded":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      default:
        return 0;
    }
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "maintenance":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const VideoCard = ({ book }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-eduos-primary">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {book.title}
            </h3>
            <p className="text-gray-600 mb-2">by {book.instructor}</p>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{book.subject}</Badge>
              <Badge variant="outline">{book.category}</Badge>
              {getStatusBadge(book.status)}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-gray-500 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{book.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 mb-1">
              <Monitor className="h-4 w-4" />
              <span className="text-sm">{book.videoQuality}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Users className="h-4 w-4" />
              <span className="text-sm">{book.viewCount} views</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div>
            <strong>Quality:</strong> {book.videoQuality}
          </div>
          <div>
            <strong>Size:</strong> {book.videoSize}
          </div>
          <div>
            <strong>Subject:</strong> {book.subject}
          </div>
          <div>
            <strong>Level:</strong> {book.level}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{book.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => handlePlay(book)}
              disabled={book.status !== "available"}
              className="flex items-center gap-1"
            >
              {currentlyPlaying === book.id ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {currentlyPlaying === book.id ? "Pause" : "Play"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewBook(book)}
              className="flex items-center gap-1"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(book)}
              disabled={book.status !== "available"}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditBook(book)}
              className="flex items-center gap-1"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteBook(book)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Library Video Books
        </h2>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Video Book
        </Button>
      </div>

      {/* Level Selection Card */}
      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Student Session and Level</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="level">Select Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Junior Secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="Senior Secondary">
                    Senior Secondary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search">Search Videos</Label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  id="search"
                  placeholder="Search by title, instructor, subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              onClick={handleCheckNow}
              className="bg-eduos-primary hover:bg-eduos-secondary transition-colors"
            >
              <Video className="h-4 w-4 mr-2" />
              Check Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && (
        <Card className="animate-fade-in delay-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Video Books for {selectedLevel} ({sortedBooks.length} found)
              </CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                    <SelectItem value="instructor">Instructor (A-Z)</SelectItem>
                    <SelectItem value="subject">Subject</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="viewCount">Most Viewed</SelectItem>
                    <SelectItem value="dateAdded">Recently Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {sortedBooks.length === 0 ? (
              <div className="text-center py-12">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No video books found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? `No video books match your search "${searchTerm}" for ${selectedLevel} level.`
                    : `No video books available for ${selectedLevel} level.`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sortedBooks.map((book) => (
                  <VideoCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* View Video Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Video Details</DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Title
                  </label>
                  <p className="text-sm font-semibold">{selectedBook.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Instructor
                  </label>
                  <p className="text-sm">{selectedBook.instructor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Subject
                  </label>
                  <p className="text-sm">{selectedBook.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Level
                  </label>
                  <p className="text-sm">{selectedBook.level}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Duration
                  </label>
                  <p className="text-sm">{selectedBook.duration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Quality
                  </label>
                  <p className="text-sm">{selectedBook.videoQuality}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    File Size
                  </label>
                  <p className="text-sm">{selectedBook.videoSize}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Views
                  </label>
                  <p className="text-sm">{selectedBook.viewCount}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-500">
                  Description
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedBook.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Video Book Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Video Book</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={bookForm.title}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter video title"
              />
            </div>

            <div className="space-y-2">
              <Label>Instructor *</Label>
              <Input
                value={bookForm.instructor}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    instructor: e.target.value,
                  }))
                }
                placeholder="Enter instructor name"
              />
            </div>

            <div className="space-y-2">
              <Label>Level *</Label>
              <Select
                value={bookForm.level}
                onValueChange={(value) =>
                  setBookForm((prev) => ({ ...prev, level: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Junior Secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="Senior Secondary">
                    Senior Secondary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject *</Label>
              <Input
                value={bookForm.subject}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="e.g., Mathematics"
              />
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                value={bookForm.duration}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, duration: e.target.value }))
                }
                placeholder="e.g., 2:30:45"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={bookForm.category}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, category: e.target.value }))
                }
                placeholder="e.g., Educational"
              />
            </div>

            <div className="space-y-2">
              <Label>Video Quality</Label>
              <Select
                value={bookForm.videoQuality}
                onValueChange={(value) =>
                  setBookForm((prev) => ({ ...prev, videoQuality: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                  <SelectItem value="4K">4K</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Video Size</Label>
              <Input
                value={bookForm.videoSize}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    videoSize: e.target.value,
                  }))
                }
                placeholder="e.g., 1.2 GB"
              />
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label>Description</Label>
              <Input
                value={bookForm.description}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of the video"
              />
            </div>

            <div className="space-y-2">
              <Label>Video File</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) =>
                    setBookForm((prev) => ({
                      ...prev,
                      videoFile: e.target.files[0],
                    }))
                  }
                />
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Thumbnail</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setBookForm((prev) => ({
                      ...prev,
                      thumbnail: e.target.files[0],
                    }))
                  }
                />
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBook}>Add Video Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Video Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Video Book</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={bookForm.title}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter video title"
              />
            </div>

            <div className="space-y-2">
              <Label>Instructor *</Label>
              <Input
                value={bookForm.instructor}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    instructor: e.target.value,
                  }))
                }
                placeholder="Enter instructor name"
              />
            </div>

            <div className="space-y-2">
              <Label>Level *</Label>
              <Select
                value={bookForm.level}
                onValueChange={(value) =>
                  setBookForm((prev) => ({ ...prev, level: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Junior Secondary">
                    Junior Secondary
                  </SelectItem>
                  <SelectItem value="Senior Secondary">
                    Senior Secondary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject *</Label>
              <Input
                value={bookForm.subject}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="e.g., Mathematics"
              />
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                value={bookForm.duration}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, duration: e.target.value }))
                }
                placeholder="e.g., 2:30:45"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={bookForm.category}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, category: e.target.value }))
                }
                placeholder="e.g., Educational"
              />
            </div>

            <div className="space-y-2">
              <Label>Video Quality</Label>
              <Select
                value={bookForm.videoQuality}
                onValueChange={(value) =>
                  setBookForm((prev) => ({ ...prev, videoQuality: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                  <SelectItem value="4K">4K</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Video Size</Label>
              <Input
                value={bookForm.videoSize}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    videoSize: e.target.value,
                  }))
                }
                placeholder="e.g., 1.2 GB"
              />
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label>Description</Label>
              <Input
                value={bookForm.description}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of the video"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateBook}>Update Video Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LibraryVideoBooks;
