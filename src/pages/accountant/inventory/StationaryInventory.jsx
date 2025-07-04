import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Download, Package, TrendingUp } from 'lucide-react';

const StationaryInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stationaryItems] = useState([
    {
      id: '1',
      name: 'A4 Paper',
      category: 'Paper',
      quantity: 500,
      unitPrice: 0.10,
      totalValue: 50.00,
      supplier: 'Office Supplies Co.',
      lastUpdated: '2024-01-15',
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Blue Pens',
      category: 'Writing',
      quantity: 25,
      unitPrice: 1.50,
      totalValue: 37.50,
      supplier: 'Pen World',
      lastUpdated: '2024-01-10',
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'Markers',
      category: 'Writing',
      quantity: 0,
      unitPrice: 3.00,
      totalValue: 0.00,
      supplier: 'Art Supplies Ltd.',
      lastUpdated: '2024-01-05',
      status: 'out-of-stock'
    }
  ]);

  const filteredItems = stationaryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalValue = stationaryItems.reduce((sum, item) => sum + item.totalValue, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stationary Inventory</h1>
          <p className="text-muted-foreground">Monitor stationary supplies and expenses</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{stationaryItems.length}</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">
                  {stationaryItems.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length}
                </p>
              </div>
              <Package className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Stationary Items
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
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
                  <th className="text-left p-3 font-semibold">Item Name</th>
                  <th className="text-left p-3 font-semibold">Category</th>
                  <th className="text-left p-3 font-semibold">Quantity</th>
                  <th className="text-left p-3 font-semibold">Unit Price</th>
                  <th className="text-left p-3 font-semibold">Total Value</th>
                  <th className="text-left p-3 font-semibold">Supplier</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">${item.unitPrice.toFixed(2)}</td>
                    <td className="p-3 font-semibold">${item.totalValue.toFixed(2)}</td>
                    <td className="p-3">{item.supplier}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="p-3">{item.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No stationary items found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StationaryInventory;
