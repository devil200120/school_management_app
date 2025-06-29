
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { PlusCircle, Edit, Trash, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageAdmin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for admins
  const admins = [
    { id: 1, name: 'John Doe', role: 'Super Admin', email: 'johndoe@example.com', phone: '+1234567890', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Admin', email: 'janesmith@example.com', phone: '+1987654321', status: 'Active' },
    { id: 3, name: 'Mike Johnson', role: 'Finance Officer', email: 'mikejohnson@example.com', phone: '+1122334455', status: 'Inactive' },
    { id: 4, name: 'Sarah Williams', role: 'Registrar', email: 'sarahwilliams@example.com', phone: '+1555666777', status: 'Active' },
  ];

  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Administrators
        </h2>
        <Button 
          onClick={() => navigate('/admin/admin-users/add')}
          className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Admin
        </Button>
      </div>

      <Card className="animate-fade-in delay-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white flex flex-row items-center justify-between">
          <CardTitle>Administrator List</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            <Input 
              className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableCaption>A list of all administrators in the system.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.map((admin) => (
                <TableRow key={admin.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>{admin.id}</TableCell>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.phone}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {admin.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:border-amber-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between p-4 border-t">
            <div className="flex items-center gap-4">
              <Button size="sm" variant="outline">CSV</Button>
              <Button size="sm" variant="outline">PDF</Button>
              <Button size="sm" variant="outline">Print</Button>
              <Button size="sm" variant="outline">Copy</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAdmin;
