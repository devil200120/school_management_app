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
  Volume2,
  Filter,
} from "lucide-react";

const LibraryAudioBooks = () => {
  // State management
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [sortBy, setSortBy] = useState("title");

  // Form state for add/edit
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    level: "",
    duration: "",
    category: "",
    description: "",
    audioFile: null,
    coverImage: null,
  });

  // Sample audio books data
  const [audioBooks, setAudioBooks] = useState([
    {
      id: 1,
      title: "The Adventures of Tom Sawyer",
      author: "Mark Twain",
      level: "Primary",
      duration: "3:45:20",
      category: "Classic Literature",
      description: "A classic tale of adventure and mischief",
      status: "available",
      dateAdded: "2023-08-15",
      playCount: 145,
      audioUrl: "/audio/tom-sawyer.mp3",
      coverUrl: "/images/tom-sawyer.jpg",
    },
    {
      id: 2,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      level: "Junior Secondary",
      duration: "8:25:10",
      category: "Fantasy",
      description: "The magical journey begins at Hogwarts",
      status: "available",
      dateAdded: "2023-08-10",
      playCount: 289,
      audioUrl: "/audio/harry-potter-1.mp3",
      coverUrl: "/images/harry-potter-1.jpg",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      level: "Senior Secondary",
      duration: "12:15:30",
      category: "Classic Literature",
      description: "A powerful story of justice and moral growth",
      status: "available",
      dateAdded: "2023-08-05",
      playCount: 98,
      audioUrl: "/audio/mockingbird.mp3",
      coverUrl: "/images/mockingbird.jpg",
    },
    {
      id: 4,
      title: "The Little Prince",
      author: "Antoine de Saint-Exupéry",
      level: "Primary",
      duration: "1:55:45",
      category: "Philosophy",
      description: "A beautiful tale about love and human nature",
      status: "maintenance",
      dateAdded: "2023-07-28",
      playCount: 176,
      audioUrl: "/audio/little-prince.mp3",
      coverUrl: "/images/little-prince.jpg",
    },
    {
      id: 5,
      title: "Romeo and Juliet",
      author: "William Shakespeare",
      level: "Senior Secondary",
      duration: "4:30:15",
      category: "Drama",
      description: "The timeless tragedy of star-crossed lovers",
      status: "available",
      dateAdded: "2023-07-20",
      playCount: 87,
      audioUrl: "/audio/romeo-juliet.mp3",
      coverUrl: "/images/romeo-juliet.jpg",
    },
  ]);

  // Handle level selection and filtering
  const handleCheckNow = () => {
    if (!selectedLevel) {
      toast.error("Please select a level", {
        description:
          "You need to select an education level to view audio books.",
        duration: 3000,
      });
      return;
    }

    const filtered = audioBooks.filter(
      (book) =>
        book.level === selectedLevel &&
        (searchTerm === "" ||
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredBooks(filtered);
    setShowResults(true);

    toast.success(`Found ${filtered.length} audio books`, {
      description: `Displaying audio books for ${selectedLevel} level.`,
      duration: 3000,
    });
  };

  // Audio playback handlers
  const handlePlay = (book) => {
    if (currentlyPlaying === book.id) {
      setCurrentlyPlaying(null);
      toast.info("Audio paused", {
        description: `Paused "${book.title}"`,
        duration: 2000,
      });
    } else {
      setCurrentlyPlaying(book.id);
      // Update play count
      setAudioBooks((prev) =>
        prev.map((b) =>
          b.id === book.id ? { ...b, playCount: b.playCount + 1 } : b
        )
      );
      toast.success("Now playing", {
        description: `Playing "${book.title}" by ${book.author}`,
        duration: 3000,
      });
    }
  };

  const handleDownload = (book) => {
    toast.success("Download started", {
      description: `Downloading "${book.title}" audio file.`,
      duration: 3000,
    });
    // Simulate download
    setTimeout(() => {
      toast.success("Download completed", {
        description: `"${book.title}" has been downloaded successfully.`,
        duration: 3000,
      });
    }, 2000);
  };

  // CRUD operations
  const handleAddBook = () => {
    if (!bookForm.title || !bookForm.author || !bookForm.level) {
      toast.error("Missing required fields", {
        description: "Please fill in title, author, and level.",
        duration: 3000,
      });
      return;
    }

    const newBook = {
      id: audioBooks.length + 1,
      ...bookForm,
      status: "available",
      dateAdded: new Date().toISOString().split("T")[0],
      playCount: 0,
      audioUrl: `/audio/${bookForm.title
        .toLowerCase()
        .replace(/\s+/g, "-")}.mp3`,
      coverUrl: `/images/${bookForm.title
        .toLowerCase()
        .replace(/\s+/g, "-")}.jpg`,
    };

    setAudioBooks((prev) => [...prev, newBook]);
    setIsAddDialogOpen(false);
    setBookForm({
      title: "",
      author: "",
      level: "",
      duration: "",
      category: "",
      description: "",
      audioFile: null,
      coverImage: null,
    });

    toast.success("Audio book added successfully", {
      description: `"${newBook.title}" has been added to the library.`,
      duration: 4000,
    });
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setBookForm({
      title: book.title,
      author: book.author,
      level: book.level,
      duration: book.duration,
      category: book.category,
      description: book.description,
      audioFile: null,
      coverImage: null,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateBook = () => {
    if (!bookForm.title || !bookForm.author || !bookForm.level) {
      toast.error("Missing required fields", {
        description: "Please fill in title, author, and level.",
        duration: 3000,
      });
      return;
    }

    setAudioBooks((prev) =>
      prev.map((book) =>
        book.id === selectedBook.id ? { ...book, ...bookForm } : book
      )
    );

    setIsEditDialogOpen(false);
    setSelectedBook(null);
    setBookForm({
      title: "",
      author: "",
      level: "",
      duration: "",
      category: "",
      description: "",
      audioFile: null,
      coverImage: null,
    });

    toast.success("Audio book updated successfully", {
      description: `"${bookForm.title}" has been updated.`,
      duration: 4000,
    });
  };

  const handleDeleteBook = (book) => {
    setAudioBooks((prev) => prev.filter((b) => b.id !== book.id));
    toast.success("Audio book removed", {
      description: `"${book.title}" has been removed from the library.`,
      duration: 3000,
    });
  };

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "author":
        return a.author.localeCompare(b.author);
      case "duration":
        return a.duration.localeCompare(b.duration);
      case "playCount":
        return b.playCount - a.playCount;
      case "dateAdded":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      default:
        return 0;
    }
  });

  const BookCard = ({ book }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-eduos-primary">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {book.title}
            </h3>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{book.category}</Badge>
              <Badge
                className={
                  book.status === "available"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              >
                {book.status === "available" ? "Available" : "Maintenance"}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-gray-500 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{book.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Volume2 className="h-4 w-4" />
              <span className="text-sm">{book.playCount} plays</span>
            </div>
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
          Library Audio Books
        </h2>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Audio Book
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
              <Label htmlFor="search">Search Books</Label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  id="search"
                  placeholder="Search by title, author, or category..."
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
              <BookOpen className="h-4 w-4 mr-2" />
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
                Audio Books for {selectedLevel} ({sortedBooks.length} found)
              </CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                    <SelectItem value="author">Author (A-Z)</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="playCount">Most Popular</SelectItem>
                    <SelectItem value="dateAdded">Recently Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {sortedBooks.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No audio books found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? `No audio books match your search "${searchTerm}" for ${selectedLevel} level.`
                    : `No audio books available for ${selectedLevel} level.`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sortedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Audio Book Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Audio Book</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={bookForm.title}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter book title"
              />
            </div>

            <div className="space-y-2">
              <Label>Author *</Label>
              <Input
                value={bookForm.author}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, author: e.target.value }))
                }
                placeholder="Enter author name"
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

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={bookForm.duration}
                  onChange={(e) =>
                    setBookForm((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  placeholder="e.g., 3:45:20"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={bookForm.category}
                  onChange={(e) =>
                    setBookForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  placeholder="e.g., Fiction"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={bookForm.description}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of the book"
              />
            </div>

            <div className="space-y-2">
              <Label>Audio File</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={(e) =>
                    setBookForm((prev) => ({
                      ...prev,
                      audioFile: e.target.files[0],
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
            <Button onClick={handleAddBook}>Add Audio Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Audio Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Audio Book</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={bookForm.title}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter book title"
              />
            </div>

            <div className="space-y-2">
              <Label>Author *</Label>
              <Input
                value={bookForm.author}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, author: e.target.value }))
                }
                placeholder="Enter author name"
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

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={bookForm.duration}
                  onChange={(e) =>
                    setBookForm((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  placeholder="e.g., 3:45:20"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={bookForm.category}
                  onChange={(e) =>
                    setBookForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  placeholder="e.g., Fiction"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={bookForm.description}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of the book"
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
            <Button onClick={handleUpdateBook}>Update Audio Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LibraryAudioBooks;
