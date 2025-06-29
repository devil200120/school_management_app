
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
import { Search, FileText, FileSpreadsheet, Printer } from 'lucide-react';

// Sample data for suppliers
const suppliers = [
  { 
    id: 1, 
    name: 'Tech Solutions Inc.', 
    phone: '123-456-7890', 
    email: 'info@techsolutions.com', 
    address: '123 Tech St, Silicon Valley, CA' 
  },
  { 
    id: 2, 
    name: 'Educational Publishers', 
    phone: '234-567-8901', 
    email: 'contact@edupub.com', 
    address: '456 Book Rd, Reading, NY' 
  },
  { 
    id: 3, 
    name: 'Sports Equipment Co.', 
    phone: '345-678-9012', 
    email: 'sales@sportsequip.com', 
    address: '789 Field Ave, Sportsville, FL' 
  },
  { 
    id: 4, 
    name: 'Furniture Depot', 
    phone: '456-789-0123', 
    email: 'info@furnituredepot.com', 
    address: '321 Chair Blvd, Desktown, TX' 
  },
  { 
    id: 5, 
    name: 'Stationery Supplies', 
    phone: '567-890-1234', 
    email: 'orders@stationsupplies.com', 
    address: '654 Paper St, Penville, WA' 
  },
];

const ItemSupplier = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API
    alert('Supplier added successfully!');
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: ''
    });
  };

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.phone.includes(searchTerm) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Item Suppliers
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Supplier Form */}
        <Card className="col-span-1 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Add New Supplier</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Supplier Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter supplier name"
                />
              </div>
              
              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>
              
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </div>
              
              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter supplier address"
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
        
        {/* Suppliers List */}
        <Card className="col-span-1 lg:col-span-2 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Suppliers List</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search suppliers..."
                  className="pl-10 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                    <TableHead className="bg-gray-100">Name</TableHead>
                    <TableHead className="bg-gray-100">Phone</TableHead>
                    <TableHead className="bg-gray-100">Email</TableHead>
                    <TableHead className="bg-gray-100">Address</TableHead>
                    <TableHead className="bg-gray-100">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{supplier.id}</TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.address}</TableCell>
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

export default ItemSupplier;
