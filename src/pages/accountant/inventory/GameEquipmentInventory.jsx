import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Download, Gamepad2, TrendingUp } from 'lucide-react';

const GameEquipmentInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gameEquipment] = useState([
    {
      id: '1',
      name: 'Basketball',
      category: 'Sports Equipment',
      quantity: 15,
      unitCost: 25.00,
      totalValue: 375.00,
      condition: 'good',
      location: 'Sports Storage Room',
      status: 'available'
    },
    {
      id: '2',
      name: 'Chess Set',
      category: 'Board Games',
      quantity: 8,
      unitCost: 35.00,
      totalValue: 280.00,
      condition: 'excellent',
      location: 'Games Room',
      status: 'available'
    }
  ]);

  const filteredItems = gameEquipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-use': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'damaged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalValue = gameEquipment.reduce((sum, item) => sum + item.totalValue, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Game Equipment Inventory</h1>
          <p className="text-muted-foreground">Monitor sports and recreational equipment costs</p>
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
              <Gamepad2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{gameEquipment.reduce((sum, item) => sum + item.quantity, 0)}</p>
              </div>
              <Gamepad2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Game Equipment
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
                    <td className="p-3 font-semibold">${item.totalValue.toFixed(2)}</td>
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

export default GameEquipmentInventory;
