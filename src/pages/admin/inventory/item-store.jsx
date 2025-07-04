
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

// Sample data for stores
const stores = [
  { id: 1, name: 'Main Store', code: 'MS001', description: 'Main inventory storage location' },
  { id: 2, name: 'Library Store', code: 'LS002', description: 'Storage for library materials' },
  { id: 3, name: 'Sports Store', code: 'SS003', description: 'Storage for sports equipment' },
  { id: 4, name: 'Administrative Store', code: 'AS004', description: 'Office supplies storage' },
  { id: 5, name: 'Classroom Store', code: 'CS005', description: 'Classroom materials storage' },
];

const ItemStore = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: ''
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
    alert('Store added successfully!');
    // Reset form
    setFormData({
      name: '',
      code: '',
      description: ''
    });
  };

  // Filter stores based on search term
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Item Stores
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Store Form */}
        <Card className="col-span-1 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Add New Store</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Store Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Store Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter store name"
                />
              </div>
              
              {/* Store Code */}
              <div className="space-y-2">
                <Label htmlFor="code">Store Code</Label>
                <Input 
                  id="code" 
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Enter store code"
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
                  placeholder="Enter store description"
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
        
        {/* Stores List */}
        <Card className="col-span-1 lg:col-span-2 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Stores List</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search stores..."
                  className="pl-10 px-5"
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
                    <TableHead className="bg-gray-100">Store Name</TableHead>
                    <TableHead className="bg-gray-100">Store Code</TableHead>
                    <TableHead className="bg-gray-100">Description</TableHead>
                    <TableHead className="bg-gray-100">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStores.map((store) => (
                    <TableRow key={store.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{store.id}</TableCell>
                      <TableCell>{store.name}</TableCell>
                      <TableCell>{store.code}</TableCell>
                      <TableCell>{store.description}</TableCell>
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

export default ItemStore;
