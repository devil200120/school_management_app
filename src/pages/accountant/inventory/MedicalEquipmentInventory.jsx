import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Download, Heart, TrendingUp } from 'lucide-react';

const MedicalEquipmentInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicalEquipment] = useState([
    {
      id: '1',
      name: 'First Aid Kit',
      category: 'Emergency',
      quantity: 5,
      unitCost: 50.00,
      expiryDate: '2025-06-30',
      location: 'Nurse Office',
      status: 'available'
    },
    {
      id: '2',
      name: 'Thermometer',
      category: 'Diagnostic',
      quantity: 3,
      unitCost: 20.00,
      expiryDate: '2026-12-31',
      location: 'Nurse Office',
      status: 'available'
    }
  ]);

  const filteredItems = medicalEquipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const totalValue = medicalEquipment.reduce((sum, item) => sum + (item.unitCost * item.quantity), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Medical Equipment Inventory</h1>
          <p className="text-muted-foreground">Monitor medical supplies and healthcare costs</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-eduos-primary hover:bg-eduos-secondary">
            <TrendingUp className="h-4 w-4 mr-2" />
            Cost Analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
              </div>
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{medicalEquipment.reduce((sum, item) => sum + item.quantity, 0)}</p>
              </div>
              <Heart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Medical Equipment
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
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
                  <th className="text-left p-3 font-semibold">Equipment Name</th>
                  <th className="text-left p-3 font-semibold">Category</th>
                  <th className="text-left p-3 font-semibold">Quantity</th>
                  <th className="text-left p-3 font-semibold">Unit Cost</th>
                  <th className="text-left p-3 font-semibold">Total Value</th>
                  <th className="text-left p-3 font-semibold">Expiry Date</th>
                  <th className="text-left p-3 font-semibold">Location</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">${item.unitCost.toFixed(2)}</td>
                    <td className="p-3 font-semibold">${(item.unitCost * item.quantity).toFixed(2)}</td>
                    <td className="p-3">{item.expiryDate}</td>
                    <td className="p-3">{item.location}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalEquipmentInventory;
