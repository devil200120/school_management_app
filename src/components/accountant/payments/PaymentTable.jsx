
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../ui/table';
import { Button } from '../../ui/button';
import { FileText, Printer } from 'lucide-react';
import { Badge } from '../../ui/badge';


const PaymentTable = ({ 
  paymentRecords, 
  handleViewDetails, 
  handlePrint 
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Receipt No</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.date}</TableCell>
              <TableCell className="font-medium">{record.receiptNo}</TableCell>
              <TableCell>{record.studentName}</TableCell>
              <TableCell>{record.class}</TableCell>
              <TableCell>{record.section}</TableCell>
              <TableCell>{record.purpose}</TableCell>
              <TableCell>{record.amount}</TableCell>
              <TableCell>
                <Badge 
                  variant={record.status === "Completed" ? "default" : "outline"}
                  className={record.status === "Completed" ? "bg-green-500" : ""}
                >
                  {record.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewDetails(record.id)}
                  >
                    <FileText className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:ml-2 md:inline-block">View</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handlePrint(record.id)}
                  >
                    <Printer className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:ml-2 md:inline-block">Print</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
