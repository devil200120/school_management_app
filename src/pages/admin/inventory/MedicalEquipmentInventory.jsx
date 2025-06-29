
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Plus, Edit, Trash2, Heart } from 'lucide-react';
import { toast } from 'sonner';


const MedicalEquipmentInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicalEquipment] = useState([
    {
      id: '1',
      name: 'First Aid Kit',
      category: 'Emergency',
      quantity: 5,
      expiryDate: '2025-06-30',
      supplier: 'Medical Supplies Inc.',
      location: 'Nurse Office',
      status: 'available'
    },
    {
      id: '2',
      name: 'Thermometer',
      category: 'Diagnostic',
      quantity: 3,
      expiryDate: '2026-12-31',
      supplier: 'Health Equipment Co.',
      location: 'Nurse Office',
      status: 'available'
    },
    {
      id: '3',
      name: 'Bandages',
      category: 'Treatment',
      quantity: 2,
      expiryDate: '2024-03-15',
      supplier: 'Medical Supplies Inc.',
      location: 'Nurse Office',
      status: 'low-stock'
    },
    {
      id: '4',
      name: 'Antiseptic Wipes',
      category: 'Sanitization',
      quantity: 0,
      expiryDate: '2023-12-31',
      supplier: 'Clean Care Ltd.',
      location: 'Nurse Office',
      status: 'expired'
    }
  ]);

  const filteredItems = medicalEquipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const handleAddItem = () => {
    toast.info('Add Medical Equipment feature would open a modal here');
  };

  const handleEditItem = (id) => {
    toast.info(`Edit equipment ${id} feature would open a modal here`);
  };

  const handleDeleteItem = (id) => {
    toast.info(`Delete equipment ${id} feature would show confirmation here`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Medical Equipment Inventory</h1>
          <p className="text-muted-foreground">Manage medical supplies and healthcare equipment</p>
        </div>
        <Button onClick={handleAddItem} className="bg-eduos-primary hover:bg-eduos-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Medical Equipment
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Equipment Name</th>
                  <th className="text-left p-3 font-semibold">Category</th>
                  <th className="text-left p-3 font-semibold">Quantity</th>
                  <th className="text-left p-3 font-semibold">Expiry Date</th>
                  <th className="text-left p-3 font-semibold">Supplier</th>
                  <th className="text-left p-3 font-semibold">Location</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">
                      <span className={isExpiringSoon(item.expiryDate) ? 'text-orange-600 font-semibold' : ''}>
                        {item.expiryDate}
                      </span>
                      {isExpiringSoon(item.expiryDate) && (
                        <Badge className="ml-2 bg-orange-100 text-orange-800">
                          Expiring Soon
                        </Badge>
                      )}
                    </td>
                    <td className="p-3">{item.supplier}</td>
                    <td className="p-3">{item.location}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditItem(item.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
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
          
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No medical equipment found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalEquipmentInventory;
