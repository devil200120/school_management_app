
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
import { Search, FileText, FileSpreadsheet, Printer } from 'lucide-react';

// Sample data for items
const sampleItems = [
  { id: 1, name: 'Laptop', category: 'Electronics', unit: 'Piece', description: 'Dell XPS 13, Intel Core i7' },
  { id: 2, name: 'Mathematics Textbook', category: 'Books', unit: 'Piece', description: 'Grade 10 Mathematics textbook' },
  { id: 3, name: 'Basketball', category: 'Sports', unit: 'Piece', description: 'Standard size basketball' },
  { id: 4, name: 'Chair', category: 'Furniture', unit: 'Piece', description: 'Office chair with adjustable height' },
  { id: 5, name: 'Whiteboard Marker', category: 'Stationery', unit: 'Pack', description: 'Pack of 10 markers, multiple colors' },
];

// Sample data for item categories
const itemCategories = ['Electronics', 'Books', 'Sports', 'Furniture', 'Stationery'];

// Sample data for units
const units = ['Piece', 'Pack', 'Box', 'Set', 'Dozen', 'Kg', 'Liter', 'Meter'];

const AddItem = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unit: '',
    description: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API
    alert('Item added successfully!');
    // Reset form
    setFormData({
      name: '',
      category: '',
      unit: '',
      description: ''
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Item
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Item Form */}
        <Card className="col-span-1 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Add New Item</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter item name"
                />
              </div>
              
              {/* Item Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Item Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, category: value }));
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
              
              {/* Unit */}
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select 
                  value={formData.unit} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, unit: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter item description"
                  rows={3}
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300"
              >
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Items List */}
        <Card className="col-span-1 lg:col-span-2 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Item List</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search items..."
                className="pl-10 px-5"
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
                    <TableHead className="bg-gray-100">Item Name</TableHead>
                    <TableHead className="bg-gray-100">Category</TableHead>
                    <TableHead className="bg-gray-100">Unit</TableHead>
                    <TableHead className="bg-gray-100">Description</TableHead>
                    <TableHead className="bg-gray-100">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.description}</TableCell>
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

export default AddItem;
