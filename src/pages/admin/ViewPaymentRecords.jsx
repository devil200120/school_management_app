
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Search, FileText, FileSpreadsheet, Printer, Copy, Calendar, Check, XCircle } from 'lucide-react';
import { Select } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';

const ViewPaymentRecords = () => {
  // Sample data for demonstration
  const payments = [
    { id: 1, name: "John Smith", class: "SS 3", amount: 45000, purpose: "School Fees", date: "2023-08-15", status: "completed" },
    { id: 2, name: "Mary Johnson", class: "JS 2", amount: 35000, purpose: "School Fees", date: "2023-08-10", status: "pending" },
    { id: 3, name: "Peter Williams", class: "Primary 5", amount: 25000, purpose: "Excursion Fee", date: "2023-08-05", status: "completed" },
    { id: 4, name: "Sarah Brown", class: "SS 1", amount: 40000, purpose: "School Fees", date: "2023-07-28", status: "failed" },
  ];

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    paymentStatus: '',
    paymentPurpose: '',
    class: ''
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          View Payment Records
        </h2>
        <Button className="bg-eduos-primary hover:bg-eduos-secondary transition-colors flex items-center gap-2">
          <Calendar size={16} />
          <span>Generate Report</span>
        </Button>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="mb-6 p-4 border rounded-md bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Filter Payment Records</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select>
                  <select
                    id="paymentStatus"
                    value={filters.paymentStatus}
                    onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                    className="w-full"
                  >
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentPurpose">Payment Purpose</Label>
                <Select>
                  <select
                    id="paymentPurpose"
                    value={filters.paymentPurpose}
                    onChange={(e) => handleFilterChange('paymentPurpose', e.target.value)}
                    className="w-full"
                  >
                    <option value="">All</option>
                    <option value="School Fees">School Fees</option>
                    <option value="Uniform">Uniform</option>
                    <option value="Books">Books</option>
                    <option value="Excursion">Excursion</option>
                  </select>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select>
                  <select
                    id="class"
                    value={filters.class}
                    onChange={(e) => handleFilterChange('class', e.target.value)}
                    className="w-full"
                  >
                    <option value="">All</option>
                    <option value="SS 3">SS 3</option>
                    <option value="SS 2">SS 2</option>
                    <option value="SS 1">SS 1</option>
                    <option value="JS 3">JS 3</option>
                    <option value="JS 2">JS 2</option>
                    <option value="JS 1">JS 1</option>
                  </select>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => setFilters({
                  startDate: '',
                  endDate: '',
                  paymentStatus: '',
                  paymentPurpose: '',
                  class: ''
                })}
              >
                Reset
              </Button>
              <Button className="bg-eduos-primary hover:bg-eduos-secondary transition-colors">
                Apply Filters
              </Button>
            </div>
          </div>

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
                  <TableHead className="bg-gray-100">Student Name</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Amount</TableHead>
                  <TableHead className="bg-gray-100">Purpose</TableHead>
                  <TableHead className="bg-gray-100">Payment Date</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.name}</TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>₦{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.purpose}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          payment.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        } flex items-center gap-1 w-fit`}
                      >
                        {payment.status === 'completed' 
                          ? <><Check size={12} /> Completed</> 
                          : payment.status === 'pending'
                          ? <span>Pending</span>
                          : <><XCircle size={12} /> Failed</>
                        }
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewPaymentRecords;
