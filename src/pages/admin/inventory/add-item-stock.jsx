
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
import { Calendar as CalendarIcon, Search, FileText, FileSpreadsheet, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../lib/utils';
import { Calendar } from '../../../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';

// Sample data for item stock
const stockItems = [
  { 
    id: 1, 
    item: 'Laptop', 
    itemCategory: 'Electronics', 
    supplier: 'Tech Solutions Inc.', 
    store: 'Main Store',
    quantity: 10,
    purchasePrice: 1200,
    date: '2025-01-15'
  },
  { 
    id: 2, 
    item: 'Mathematics Textbook', 
    itemCategory: 'Books', 
    supplier: 'Educational Publishers', 
    store: 'Library Store',
    quantity: 50,
    purchasePrice: 25,
    date: '2025-02-10'
  },
  { 
    id: 3, 
    item: 'Basketball', 
    itemCategory: 'Sports', 
    supplier: 'Sports Equipment Co.', 
    store: 'Sports Store',
    quantity: 15,
    purchasePrice: 45,
    date: '2025-03-20'
  },
];

// Sample data for dropdowns
const itemCategories = ['Electronics', 'Books', 'Sports', 'Furniture', 'Stationery'];
const items = {
  'Electronics': ['Laptop', 'Projector', 'Speakers', 'Camera'],
  'Books': ['Mathematics Textbook', 'Science Textbook', 'History Book', 'Literature Collection'],
  'Sports': ['Basketball', 'Football', 'Cricket Kit', 'Tennis Racket'],
  'Furniture': ['Desk', 'Chair', 'Bookshelf', 'Table'],
  'Stationery': ['Notebooks', 'Pens', 'Markers', 'Staplers']
};
const suppliers = ['Tech Solutions Inc.', 'Educational Publishers', 'Sports Equipment Co.', 'Furniture Depot', 'Stationery Supplies'];
const stores = ['Main Store', 'Library Store', 'Sports Store', 'Administrative Store', 'Classroom Store'];

const AddItemStock = () => {
  // Form state
  const [formData, setFormData] = useState({
    itemCategory: '',
    item: '',
    supplier: '',
    store: '',
    quantity: '',
    purchasePrice: '',
    date: '',
    document: '',
    description: ''
  });
  
  // Date picker state
  const [dateOpen, setDateOpen] = useState(false);

  // Handle form changes
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
  const handleDateSelect = (date) => {
    if (date) {
      setFormData(prev => ({ ...prev, date: format(date, 'yyyy-MM-dd') }));
      setDateOpen(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API
    alert('Item stock added successfully!');
    // Reset form
    setFormData({
      itemCategory: '',
      item: '',
      supplier: '',
      store: '',
      quantity: '',
      purchasePrice: '',
      date: '',
      document: '',
      description: ''
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Item Stock
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Item Stock Form */}
        <Card className="col-span-1 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Add New Item Stock</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    {formData.itemCategory && items[formData.itemCategory]?.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Supplier */}
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select 
                  value={formData.supplier} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, supplier: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Store */}
              <div className="space-y-2">
                <Label htmlFor="store">Store</Label>
                <Select 
                  value={formData.store} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, store: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store} value={store}>
                        {store}
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
                  placeholder="Enter quantity"
                  min="1"
                />
              </div>
              
              {/* Purchase Price */}
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input 
                  id="purchasePrice" 
                  name="purchasePrice"
                  type="number"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
              </div>
              
              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? formData.date : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date ? new Date(formData.date) : undefined}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Attach Document */}
              <div className="space-y-2">
                <Label htmlFor="document">Attach Document</Label>
                <Input 
                  id="document" 
                  name="document"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData(prev => ({ ...prev, document: file.name }));
                    }
                  }}
                />
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
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
        
        {/* Item Stock List */}
        <Card className="col-span-1 lg:col-span-2 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Item Stock List</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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
                    <TableHead className="bg-gray-100">Supplier</TableHead>
                    <TableHead className="bg-gray-100">Store</TableHead>
                    <TableHead className="bg-gray-100">Quantity</TableHead>
                    <TableHead className="bg-gray-100">Purchase Price</TableHead>
                    <TableHead className="bg-gray-100">Date</TableHead>
                    <TableHead className="bg-gray-100">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.itemCategory}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.store}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.purchasePrice}</TableCell>
                      <TableCell>{item.date}</TableCell>
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

export default AddItemStock;
