
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../../components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Calendar as CalendarIcon, FileText, Printer, FileSpreadsheet } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../lib/utils';
import { Calendar } from '../../../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';
import { Badge } from '../../../components/ui/badge';

// Sample data for the issued items
const issuedItems = [
  { 
    id: 1, 
    issueDate: '2025-05-15', 
    returnDate: '2025-06-15',
    itemCategory: 'Electronics', 
    item: 'Laptop', 
    quantity: 1, 
    issueTo: 'John Doe',
    issueBy: 'Admin',
    status: 'Issued'
  },
  { 
    id: 2, 
    issueDate: '2025-05-10', 
    returnDate: '2025-05-20',
    itemCategory: 'Books', 
    item: 'Mathematics Textbook', 
    quantity: 5, 
    issueTo: 'Library',
    issueBy: 'Admin',
    status: 'Returned'
  },
  { 
    id: 3, 
    issueDate: '2025-05-05', 
    returnDate: '2025-07-05',
    itemCategory: 'Sports', 
    item: 'Basketball', 
    quantity: 3, 
    issueTo: 'Sports Department',
    issueBy: 'Admin',
    status: 'Issued'
  },
];

// List of sample user types
const userTypes = ['Student', 'Teacher', 'Staff', 'Department'];

// List of sample item categories
const itemCategories = ['Electronics', 'Books', 'Sports', 'Furniture', 'Stationery'];

// List of items by category
const itemsByCategory = {
  'Electronics': ['Laptop', 'Projector', 'Speakers', 'Camera'],
  'Books': ['Mathematics Textbook', 'Science Textbook', 'History Book', 'Literature Collection'],
  'Sports': ['Basketball', 'Football', 'Cricket Kit', 'Tennis Racket'],
  'Furniture': ['Desk', 'Chair', 'Bookshelf', 'Table'],
  'Stationery': ['Notebooks', 'Pens', 'Markers', 'Staplers']
};

const IssuesItem = () => {
  // Form state
  const [formData, setFormData] = useState({
    userType: '',
    issueTo: '',
    issueBy: 'Admin', // Default value
    issueDate: '',
    returnDate: '',
    note: '',
    itemCategory: '',
    item: '',
    quantity: '1',
  });

  // Calendar state
  const [issueDateOpen, setIssueDateOpen] = useState(false);
  const [returnDateOpen, setReturnDateOpen] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      // Reset item if category changes
      ...(name === 'itemCategory' ? { item: '' } : {}) 
    }));
  };

  // Handle date selection
  const handleIssueDate = (date) => {
    if (date) {
      setFormData(prev => ({ ...prev, issueDate: format(date, 'yyyy-MM-dd') }));
      setIssueDateOpen(false);
    }
  };

  const handleReturnDate = (date) => {
    if (date) {
      setFormData(prev => ({ ...prev, returnDate: format(date, 'yyyy-MM-dd') }));
      setReturnDateOpen(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API
    alert('Item issued successfully!');
    // Reset form
    setFormData({
      userType: '',
      issueTo: '',
      issueBy: 'Admin',
      issueDate: '',
      returnDate: '',
      note: '',
      itemCategory: '',
      item: '',
      quantity: '1',
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Issues Item
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issue Item Form */}
        <Card className="col-span-1 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Issue New Item</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type */}
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select 
                  value={formData.userType} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, userType: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Issue To */}
              <div className="space-y-2">
                <Label htmlFor="issueTo">Issue To</Label>
                <Input 
                  id="issueTo" 
                  name="issueTo"
                  value={formData.issueTo}
                  onChange={handleChange}
                  placeholder="Enter name or ID"
                />
              </div>
              
              {/* Issue By */}
              <div className="space-y-2">
                <Label htmlFor="issueBy">Issue By</Label>
                <Input 
                  id="issueBy" 
                  name="issueBy"
                  value={formData.issueBy}
                  onChange={handleChange}
                  disabled
                />
              </div>
              
              {/* Issue Date */}
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Popover open={issueDateOpen} onOpenChange={setIssueDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.issueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.issueDate ? formData.issueDate : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.issueDate ? new Date(formData.issueDate) : undefined}
                      onSelect={handleIssueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Return Date */}
              <div className="space-y-2">
                <Label htmlFor="returnDate">Return Date</Label>
                <Popover open={returnDateOpen} onOpenChange={setReturnDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.returnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.returnDate ? formData.returnDate : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.returnDate ? new Date(formData.returnDate) : undefined}
                      onSelect={handleReturnDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Note */}
              <div className="space-y-2">
                <Label htmlFor="note">Note</Label>
                <Textarea 
                  id="note" 
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Enter additional notes if any"
                  rows={3}
                />
              </div>
              
              {/* Item Category */}
              <div className="space-y-2">
                <Label htmlFor="itemCategory">Item Category</Label>
                <Select 
                  value={formData.itemCategory} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, itemCategory: value, item: '' }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Item */}
              <div className="space-y-2">
                <Label htmlFor="item">Item</Label>
                <Select 
                  value={formData.item} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, item: value }));
                  }}
                  disabled={!formData.itemCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.itemCategory && itemsByCategory[formData.itemCategory]?.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                  id="quantity" 
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300"
              >
                Issue Item
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Issued Items List */}
        <Card className="col-span-1 lg:col-span-2 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Issued Items List</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <div className="relative">
                <Input
                  placeholder="Search items..."
                  className="pl-10 w-full md:w-64"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Excel</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>PDF</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-gray-100">ID</TableHead>
                    <TableHead className="bg-gray-100">Item</TableHead>
                    <TableHead className="bg-gray-100">Category</TableHead>
                    <TableHead className="bg-gray-100">Quantity</TableHead>
                    <TableHead className="bg-gray-100">Issue Date</TableHead>
                    <TableHead className="bg-gray-100">Return Date</TableHead>
                    <TableHead className="bg-gray-100">Status</TableHead>
                    <TableHead className="bg-gray-100">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issuedItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.itemCategory}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.issueDate}</TableCell>
                      <TableCell>{item.returnDate}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            item.status === 'Returned' ? 'bg-green-500' : 
                            item.status === 'Issued' ? 'bg-blue-500' : 'bg-yellow-500'
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssuesItem;
