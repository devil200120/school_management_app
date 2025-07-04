
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { PlusCircle, Edit, Trash } from 'lucide-react';

const StudentPriceList = () => {
  // Mock data for price list
  const priceList = [
    { id: 1, item: 'Registration Fee', level: 'All Levels', price: '$50', description: 'One-time registration fee for new students' },
    { id: 2, item: 'Tuition Fee', level: 'Elementary', price: '$500', description: 'Per term tuition fee' },
    { id: 3, item: 'Tuition Fee', level: 'Middle School', price: '$650', description: 'Per term tuition fee' },
    { id: 4, item: 'Tuition Fee', level: 'High School', price: '$800', description: 'Per term tuition fee' },
    { id: 5, item: 'Books and Supplies', level: 'Elementary', price: '$100', description: 'Per term book and supply fee' },
    { id: 6, item: 'Books and Supplies', level: 'Middle School', price: '$150', description: 'Per term book and supply fee' },
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Student Price List
        </h2>
        <div className="flex gap-3">
          <Button 
            className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Update Changes
          </Button>
          <Button 
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Price
          </Button>
        </div>
      </div>

      <Card className="animate-fade-in delay-100 mt-3 overflow-hidden">
        <CardHeader className="bg-eduos-primary text-white">
          <CardTitle>Fee Structure</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableCaption>Current price list for all student services.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceList.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell>{item.level}</TableCell>
                  <TableCell className="font-bold text-green-600">{item.price}</TableCell>
                  <TableCell>{item.description}</TableCell>
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

export default StudentPriceList;
