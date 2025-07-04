import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Search, FileText, FileSpreadsheet, Printer, Copy } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';

const ManagePayment = () => {
  // Sample data for demonstration
  const payments = [
    { id: 1, transactionId: "TRX-12345", studentName: "John Doe", class: "Class 10A", amount: "$500", date: "2023-04-15", status: "Completed" },
    { id: 2, transactionId: "TRX-67890", studentName: "Jane Smith", class: "Class 10B", amount: "$500", date: "2023-04-14", status: "Pending" },
    { id: 3, transactionId: "TRX-54321", studentName: "Alice Johnson", class: "Class 10A", amount: "$500", date: "2023-04-12", status: "Completed" },
    { id: 4, transactionId: "TRX-09876", studentName: "Bob Brown", class: "Class 10C", amount: "$500", date: "2023-04-10", status: "Failed" },
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Payment
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search payments..."
                   className="pl-10 px-5"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileSpreadsheet className="h-4 w-4" />
                <span>CSV</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Text</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">S/N</TableHead>
                  <TableHead className="bg-gray-100">Transaction ID</TableHead>
                  <TableHead className="bg-gray-100">Student Name</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Amount</TableHead>
                  <TableHead className="bg-gray-100">Date</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.transactionId}</TableCell>
                    <TableCell>{payment.studentName}</TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Badge className={`
                        ${payment.status === 'Completed' ? 'bg-green-500' : ''}
                        ${payment.status === 'Pending' ? 'bg-amber-500' : ''}
                        ${payment.status === 'Failed' ? 'bg-red-500' : ''}
                      `}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">View</Button>
                        <Button variant="outline" size="sm">Receipt</Button>
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
  );
};

export default ManagePayment;
