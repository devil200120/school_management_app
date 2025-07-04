
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const BooksInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books] = useState([
    {
      id: '1',
      title: 'Advanced Mathematics',
      author: 'John Smith',
      isbn: '978-0123456789',
      category: 'textbook',
      quantity: 50,
      availableQuantity: 35,
      publisher: 'Academic Press',
      publishYear: 2023,
      location: 'Library Section A',
      status: 'available'
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0061120084',
      category: 'novel',
      quantity: 25,
      availableQuantity: 5,
      publisher: 'J.B. Lippincott & Co.',
      publishYear: 1960,
      location: 'Library Section B',
      status: 'low-stock'
    },
    {
      id: '3',
      title: 'Climate Change Research',
      author: 'Dr. Emily Johnson',
      isbn: '978-0987654321',
      category: 'research',
      quantity: 10,
      availableQuantity: 8,
      publisher: 'Science Publications',
      publishYear: 2024,
      location: 'Research Section',
      status: 'available'
    },
    {
      id: '4',
      title: 'Dictionary of Terms',
      author: 'Various Authors',
      isbn: '978-0111222333',
      category: 'reference',
      quantity: 15,
      availableQuantity: 0,
      publisher: 'Reference Books Ltd.',
      publishYear: 2022,
      location: 'Reference Section',
      status: 'out-of-stock'
    }
  ]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case 'textbook': return 'bg-blue-100 text-blue-800';
      case 'novel': return 'bg-purple-100 text-purple-800';
      case 'research': return 'bg-green-100 text-green-800';
      case 'reference': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddBook = () => {
    toast.info('Add Book feature would open a modal here');
  };

  const handleEditBook = (id) => {
    toast.info(`Edit book ${id} feature would open a modal here`);
  };

  const handleDeleteBook = (id) => {
    toast.info(`Delete book ${id} feature would show confirmation here`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Books & Research Papers Inventory</h1>
          <p className="text-muted-foreground">Manage textbooks, novels, and research materials</p>
        </div>
        <Button onClick={handleAddBook} className="bg-eduos-primary hover:bg-eduos-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Books & Research Papers
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 px-5"

              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Title</th>
                  <th className="text-left p-3 font-semibold">Author</th>
                  <th className="text-left p-3 font-semibold">ISBN</th>
                  <th className="text-left p-3 font-semibold">Category</th>
                  <th className="text-left p-3 font-semibold">Quantity</th>
                  <th className="text-left p-3 font-semibold">Available</th>
                  <th className="text-left p-3 font-semibold">Location</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{book.title}</td>
                    <td className="p-3">{book.author}</td>
                    <td className="p-3 font-mono text-sm">{book.isbn}</td>
                    <td className="p-3">
                      <Badge className={getCategoryColor(book.category)}>
                        {book.category}
                      </Badge>
                    </td>
                    <td className="p-3">{book.quantity}</td>
                    <td className="p-3">{book.availableQuantity}</td>
                    <td className="p-3">{book.location}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(book.status)}>
                        {book.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBook(book.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No books found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BooksInventory;
