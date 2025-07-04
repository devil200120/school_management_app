
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Search, FileText, FileSpreadsheet, Printer, Copy, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';

const ManageApplication = () => {
  // Sample data for demonstration
  const applications = [
    { id: 1, name: "John Smith", level: "Senior Secondary", class: "SS 3", applicationDate: "2023-08-15", status: "pending" },
    { id: 2, name: "Mary Johnson", level: "Junior Secondary", class: "JS 2", applicationDate: "2023-08-10", status: "approved" },
    { id: 3, name: "Peter Williams", level: "Primary", class: "Primary 5", applicationDate: "2023-08-05", status: "pending" },
    { id: 4, name: "Sarah Brown", level: "Senior Secondary", class: "SS 1", applicationDate: "2023-07-28", status: "rejected" },
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Applications
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Student Applications</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search applications..."
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
                  <TableHead className="bg-gray-100">Applicant Name</TableHead>
                  <TableHead className="bg-gray-100">Level</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Application Date</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>{application.id}</TableCell>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.level}</TableCell>
                    <TableCell>{application.class}</TableCell>
                    <TableCell>{application.applicationDate}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          application.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : application.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {application.status === 'approved' 
                          ? 'Approved' 
                          : application.status === 'rejected'
                          ? 'Rejected'
                          : 'Pending'
                        }
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Eye size={14} />
                          <span>View</span>
                        </Button>
                        {application.status === 'pending' && (
                          <>
                            <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
                              <CheckCircle size={14} />
                              <span>Approve</span>
                            </Button>
                            <Button variant="destructive" size="sm" className="flex items-center gap-1">
                              <XCircle size={14} />
                              <span>Reject</span>
                            </Button>
                          </>
                        )}
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

export default ManageApplication;
