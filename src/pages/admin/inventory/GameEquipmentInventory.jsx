
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Plus, Edit, Trash2, Gamepad2 } from 'lucide-react';
import { toast } from 'sonner';


const GameEquipmentInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gameEquipment] = useState([
    {
      id: '1',
      name: 'Basketball',
      category: 'Sports Equipment',
      quantity: 15,
      condition: 'good',
      location: 'Sports Storage Room',
      lastMaintenance: '2024-01-10',
      status: 'available'
    },
    {
      id: '2',
      name: 'Chess Set',
      category: 'Board Games',
      quantity: 8,
      condition: 'excellent',
      location: 'Games Room',
      lastMaintenance: '2024-01-05',
      status: 'available'
    },
    {
      id: '3',
      name: 'Football',
      category: 'Sports Equipment',
      quantity: 3,
      condition: 'fair',
      location: 'Sports Storage Room',
      lastMaintenance: '2023-12-20',
      status: 'in-use'
    },
    {
      id: '4',
      name: 'Table Tennis Paddle',
      category: 'Sports Equipment',
      quantity: 1,
      condition: 'poor',
      location: 'Recreation Room',
      lastMaintenance: '2023-11-15',
      status: 'maintenance'
    }
  ]);

  const filteredItems = gameEquipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-use': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'damaged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddItem = () => {
    toast.info('Add Game Equipment feature would open a modal here');
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
          <h1 className="text-2xl font-bold tracking-tight">Game Equipment Inventory</h1>
          <p className="text-muted-foreground">Manage sports and recreational equipment</p>
        </div>
        <Button onClick={handleAddItem} className="bg-eduos-primary hover:bg-eduos-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Game Equipment
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
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
                  <th className="text-left p-3 font-semibold">Condition</th>
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
                      <Badge className={getConditionColor(item.condition)}>
                        {item.condition}
                      </Badge>
                    </td>
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
              No game equipment found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GameEquipmentInventory;
