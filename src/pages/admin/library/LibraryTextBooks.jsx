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
  Download,
  Edit,
  Trash2,
  Upload,
  BookOpen,
  Filter,
  Eye,
  FileText,
  Calendar,
  Users,
} from "lucide-react";

const LibraryTextBooks = () => {
  // State management
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortBy, setSortBy] = useState("title");

  // Form state for add/edit
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    level: "",
    subject: "",
    isbn: "",
    publisher: "",
    publishYear: "",
    pages: "",
    description: "",
    quantity: "",
    available: "",
    bookFile: null,
    coverImage: null,
  });

  // Sample text books data
  const [textBooks, setTextBooks] = useState([
    {
      id: 1,
      title: "New General Mathematics",
      author: "M.J. Timayi",
      level: "Senior Secondary",
      subject: "Mathematics",
      isbn: "978-123-456-789-0",
      publisher: "Longman Nigeria",
      publishYear: "2023",
      pages: "350",
      description:
        "Comprehensive mathematics textbook for senior secondary students",
      quantity: 50,
      available: 35,
      status: "available",
      dateAdded: "2023-08-15",
      borrowCount: 45,
      bookUrl: "/books/new-general-mathematics.pdf",
      coverUrl: "/images/new-general-mathematics.jpg",
    },
    {
      id: 2,
      title: "New School Physics",
      author: "M.W. Anyakoha",
      level: "Senior Secondary",
      subject: "Physics",
      isbn: "978-987-654-321-0",
      publisher: "Africana First Publishers",
      publishYear: "2023",
      pages: "420",
      description: "Modern physics textbook with practical applications",
      quantity: 40,
      available: 28,
      status: "available",
      dateAdded: "2023-08-10",
      borrowCount: 32,
      bookUrl: "/books/new-school-physics.pdf",
      coverUrl: "/images/new-school-physics.jpg",
    },
    {
      id: 3,
      title: "Comprehensive English",
      author: "J.O.J. Nwachukwu",
      level: "Junior Secondary",
      subject: "English Language",
      isbn: "978-555-666-777-8",
      publisher: "Africana First Publishers",
      publishYear: "2022",
      pages: "280",
      description: "Complete guide to English language for junior secondary",
      quantity: 60,
      available: 45,
      status: "available",
      dateAdded: "2023-08-05",
      borrowCount: 67,
      bookUrl: "/books/comprehensive-english.pdf",
      coverUrl: "/images/comprehensive-english.jpg",
    },
    {
      id: 4,
      title: "Primary Mathematics",
      author: "Nigerian Educational Research Council",
      level: "Primary",
      subject: "Mathematics",
      isbn: "978-111-222-333-4",
      publisher: "NERDC Press",
      publishYear: "2023",
      pages: "180",
      description: "Foundation mathematics for primary school students",
      quantity: 80,
      available: 65,
      status: "available",
      dateAdded: "2023-07-28",
      borrowCount: 89,
      bookUrl: "/books/primary-mathematics.pdf",
      coverUrl: "/images/primary-mathematics.jpg",
    },
    {
      id: 5,
      title: "Basic Science and Technology",
      author: "A.B. Iwena",
      level: "Junior Secondary",
      subject: "Basic Science",
      isbn: "978-999-888-777-6",
      publisher: "Tonad Publishers",
      publishYear: "2022",
      pages: "320",
      description: "Introduction to science and technology concepts",
      quantity: 45,
      available: 12,
      status: "low_stock",
      dateAdded: "2023-07-20",
      borrowCount: 78,
      bookUrl: "/books/basic-science-technology.pdf",
      coverUrl: "/images/basic-science-technology.jpg",
    },
    {
      id: 6,
      title: "Chemistry for Schools",
      author: "O.Y. Ababio",
      level: "Senior Secondary",
      subject: "Chemistry",
      isbn: "978-444-555-666-7",
      publisher: "Africana First Publishers",
      publishYear: "2023",
      pages: "480",
      description: "Advanced chemistry textbook with experiments",
      quantity: 30,
      available: 0,
      status: "out_of_stock",
      dateAdded: "2023-07-15",
      borrowCount: 56,
      bookUrl: "/books/chemistry-for-schools.pdf",
      coverUrl: "/images/chemistry-for-schools.jpg",
    },
  ]);

  // Handle level selection and filtering
  const handleCheckNow = () => {
    if (!selectedLevel) {
      toast.error("Please select a level", {
        description:
          "You need to select an education level to view text books.",
        duration: 3000,
      });
      return;
    }

    const filtered = textBooks.filter(
      (book) =>
        book.level === selectedLevel &&
        (searchTerm === "" ||
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.publisher.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredBooks(filtered);
    setShowResults(true);

    toast.success(`Found ${filtered.length} text books`, {
      description: `Displaying text books for ${selectedLevel} level.`,
      duration: 3000,
    });
  };

  // CRUD operations
  const handleAddBook = () => {
    if (
      !bookForm.title ||
      !bookForm.author ||
      !bookForm.level ||
      !bookForm.subject
    ) {
      toast.error("Missing required fields", {
        description: "Please fill in title, author, level, and subject.",
        duration: 3000,
      });
      return;
    }

    const newBook = {
      id: textBooks.length + 1,
      ...bookForm,
      quantity: parseInt(bookForm.quantity) || 0,
      available: parseInt(bookForm.available) || 0,
      status:
        parseInt(bookForm.available) > 10
          ? "available"
          : parseInt(bookForm.available) > 0
          ? "low_stock"
          : "out_of_stock",
      dateAdded: new Date().toISOString().split("T")[0],
      borrowCount: 0,
      bookUrl: `/books/${bookForm.title
        .toLowerCase()
        .replace(/\s+/g, "-")}.pdf`,
      coverUrl: `/images/${bookForm.title
        .toLowerCase()
        .replace(/\s+/g, "-")}.jpg`,
    };

    setTextBooks((prev) => [...prev, newBook]);
    setIsAddDialogOpen(false);
    setBookForm({
      title: "",
      author: "",
      level: "",
      subject: "",
      isbn: "",
      publisher: "",
      publishYear: "",
      pages: "",
      description: "",
      quantity: "",
      available: "",
      bookFile: null,
      coverImage: null,
    });

    toast.success("Text book added successfully", {
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
      subject: book.subject,
      isbn: book.isbn,
      publisher: book.publisher,
      publishYear: book.publishYear,
      pages: book.pages,
      description: book.description,
      quantity: book.quantity.toString(),
      available: book.available.toString(),
      bookFile: null,
      coverImage: null,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateBook = () => {
    if (
      !bookForm.title ||
      !bookForm.author ||
      !bookForm.level ||
      !bookForm.subject
    ) {
      toast.error("Missing required fields", {
        description: "Please fill in title, author, level, and subject.",
        duration: 3000,
      });
      return;
    }

    setTextBooks((prev) =>
      prev.map((book) =>
        book.id === selectedBook.id
          ? {
              ...book,
              ...bookForm,
              quantity: parseInt(bookForm.quantity) || 0,
              available: parseInt(bookForm.available) || 0,
              status:
                parseInt(bookForm.available) > 10
                  ? "available"
                  : parseInt(bookForm.available) > 0
                  ? "low_stock"
                  : "out_of_stock",
            }
          : book
      )
    );

    setIsEditDialogOpen(false);
    setSelectedBook(null);
    setBookForm({
      title: "",
      author: "",
      level: "",
      subject: "",
      isbn: "",
      publisher: "",
      publishYear: "",
      pages: "",
      description: "",
      quantity: "",
      available: "",
      bookFile: null,
      coverImage: null,
    });

    toast.success("Text book updated successfully", {
      description: `"${bookForm.title}" has been updated.`,
      duration: 4000,
    });
  };

  const handleDeleteBook = (book) => {
    setTextBooks((prev) => prev.filter((b) => b.id !== book.id));
    toast.success("Text book removed", {
      description: `"${book.title}" has been removed from the library.`,
      duration: 3000,
    });
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setIsViewDialogOpen(true);
  };

  const handleDownload = (book) => {
    toast.success("Download started", {
      description: `Downloading "${book.title}" PDF file.`,
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

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "author":
        return a.author.localeCompare(b.author);
      case "subject":
        return a.subject.localeCompare(b.subject);
      case "available":
        return b.available - a.available;
      case "borrowCount":
        return b.borrowCount - a.borrowCount;
      case "dateAdded":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      default:
        return 0;
    }
  });

  const getStatusBadge = (status, available) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-100 text-green-800">
            Available ({available})
          </Badge>
        );
      case "low_stock":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Low Stock ({available})
          </Badge>
        );
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

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
              <Badge variant="secondary">{book.subject}</Badge>
              {getStatusBadge(book.status, book.available)}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-gray-500 mb-1">
              <FileText className="h-4 w-4" />
              <span className="text-sm">{book.pages} pages</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Users className="h-4 w-4" />
              <span className="text-sm">{book.borrowCount} borrowed</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div>
            <strong>Publisher:</strong> {book.publisher}
          </div>
          <div>
            <strong>Year:</strong> {book.publishYear}
          </div>
          <div>
            <strong>ISBN:</strong> {book.isbn}
          </div>
          <div>
            <strong>Total:</strong> {book.quantity} copies
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{book.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
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
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 pb-12 md:pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in leading-tight">
          Library Text Books
        </h2>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Text Book
        </Button>
      </div>

      {/* Level Selection Card */}
      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-4 md:p-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">
            Select Student Session and Level
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="level" className="text-sm sm:text-base">
                Select Level
              </Label>
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
              <Label htmlFor="search" className="text-sm sm:text-base">
                Search Books
              </Label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  id="search"
                  placeholder="Search by title, author, subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm sm:text-base"
                />
              </div>
            </div>

            <Button
              onClick={handleCheckNow}
              className="bg-eduos-primary hover:bg-eduos-secondary transition-colors text-sm sm:text-base py-2 px-3 sm:px-4"
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
                Text Books for {selectedLevel} ({sortedBooks.length} found)
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
                    <SelectItem value="subject">Subject</SelectItem>
                    <SelectItem value="available">Most Available</SelectItem>
                    <SelectItem value="borrowCount">Most Borrowed</SelectItem>
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
                  No text books found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? `No text books match your search "${searchTerm}" for ${selectedLevel} level.`
                    : `No text books available for ${selectedLevel} level.`}
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

      {/* View Book Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
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
                    Author
                  </label>
                  <p className="text-sm">{selectedBook.author}</p>
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
                    Publisher
                  </label>
                  <p className="text-sm">{selectedBook.publisher}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Year
                  </label>
                  <p className="text-sm">{selectedBook.publishYear}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    ISBN
                  </label>
                  <p className="text-sm">{selectedBook.isbn}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Pages
                  </label>
                  <p className="text-sm">{selectedBook.pages}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Total Copies
                  </label>
                  <p className="text-sm">{selectedBook.quantity}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Available
                  </label>
                  <p className="text-sm">{selectedBook.available}</p>
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

      {/* Add Text Book Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Text Book</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label>ISBN</Label>
              <Input
                value={bookForm.isbn}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, isbn: e.target.value }))
                }
                placeholder="978-123-456-789-0"
              />
            </div>

            <div className="space-y-2">
              <Label>Publisher</Label>
              <Input
                value={bookForm.publisher}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    publisher: e.target.value,
                  }))
                }
                placeholder="Publisher name"
              />
            </div>

            <div className="space-y-2">
              <Label>Publish Year</Label>
              <Input
                value={bookForm.publishYear}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    publishYear: e.target.value,
                  }))
                }
                placeholder="2023"
              />
            </div>

            <div className="space-y-2">
              <Label>Pages</Label>
              <Input
                value={bookForm.pages}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, pages: e.target.value }))
                }
                placeholder="Number of pages"
              />
            </div>

            <div className="space-y-2">
              <Label>Total Quantity</Label>
              <Input
                type="number"
                value={bookForm.quantity}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, quantity: e.target.value }))
                }
                placeholder="Total copies"
              />
            </div>

            <div className="space-y-2">
              <Label>Available Copies</Label>
              <Input
                type="number"
                value={bookForm.available}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    available: e.target.value,
                  }))
                }
                placeholder="Available copies"
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
                placeholder="Brief description of the book"
              />
            </div>

            <div className="space-y-2">
              <Label>Book File (PDF)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setBookForm((prev) => ({
                      ...prev,
                      bookFile: e.target.files[0],
                    }))
                  }
                />
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setBookForm((prev) => ({
                      ...prev,
                      coverImage: e.target.files[0],
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
            <Button onClick={handleAddBook}>Add Text Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Text Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Text Book</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label>ISBN</Label>
              <Input
                value={bookForm.isbn}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, isbn: e.target.value }))
                }
                placeholder="978-123-456-789-0"
              />
            </div>

            <div className="space-y-2">
              <Label>Publisher</Label>
              <Input
                value={bookForm.publisher}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    publisher: e.target.value,
                  }))
                }
                placeholder="Publisher name"
              />
            </div>

            <div className="space-y-2">
              <Label>Publish Year</Label>
              <Input
                value={bookForm.publishYear}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    publishYear: e.target.value,
                  }))
                }
                placeholder="2023"
              />
            </div>

            <div className="space-y-2">
              <Label>Pages</Label>
              <Input
                value={bookForm.pages}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, pages: e.target.value }))
                }
                placeholder="Number of pages"
              />
            </div>

            <div className="space-y-2">
              <Label>Total Quantity</Label>
              <Input
                type="number"
                value={bookForm.quantity}
                onChange={(e) =>
                  setBookForm((prev) => ({ ...prev, quantity: e.target.value }))
                }
                placeholder="Total copies"
              />
            </div>

            <div className="space-y-2">
              <Label>Available Copies</Label>
              <Input
                type="number"
                value={bookForm.available}
                onChange={(e) =>
                  setBookForm((prev) => ({
                    ...prev,
                    available: e.target.value,
                  }))
                }
                placeholder="Available copies"
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
            <Button onClick={handleUpdateBook}>Update Text Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LibraryTextBooks;
