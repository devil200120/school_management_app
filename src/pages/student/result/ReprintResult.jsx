import DataTable from '../../../components/DataTable';
import { Button } from '../../../components/ui/button';
import { Printer } from 'lucide-react';

const columns = [
  { key: 'id', header: '#', sortable: true },
  { key: 'resultClass', header: 'Result Class', sortable: true },
  { key: 'resultTerms', header: 'Result Terms', sortable: true },
  { key: 'session', header: 'Session', sortable: true },
  { key: 'resultChecker', header: 'Result Checker', sortable: true },
];

// Placeholder for result data
const sampleResults = [];

const ReprintResult = () => {
  const handlePrintResult = (id) => {
    console.log('Printing result:', id);
  };

  const actionColumn = (item) => (
    <Button 
      size="sm" 
      variant="outline"
      onClick={() => handlePrintResult(item.id)}
      className="flex items-center gap-1"
    >
      <Printer size={16} />
      Print
    </Button>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reprint Checker Result</h1>
      </div>

      <DataTable columns={columns} data={sampleResults} actionColumn={actionColumn} />
    </div>
  );
};

export default ReprintResult;
