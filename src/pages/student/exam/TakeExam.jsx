import React from 'react';
import DataTable from '../../components/DataTable';
import { Button } from '../../components/ui/button';

const columns = [
  { key: 'id', header: '#', sortable: true },
  { key: 'subject', header: 'Subject', sortable: true },
  { key: 'class', header: 'Class', sortable: true },
  { key: 'timeToSpend', header: 'Time to Spend', sortable: true },
  { key: 'startDate', header: 'Start Date', sortable: true },
  { key: 'endDate', header: 'End Date', sortable: true },
  { key: 'examType', header: 'Exam Type', sortable: true },
  { key: 'markContained', header: 'Mark Contained', sortable: true },
];

// Sample data - in a real app this would come from an API
const sampleExams = [
  // Empty array for now as specified in the requirements
];

const TakeExam = () => {
  const handleStartExam = (id) => {
    console.log('Starting exam:', id);
  };

  const actionColumn = (item) => (
    <Button 
      size="sm" 
      className="bg-eduos-primary hover:bg-eduos-secondary"
      onClick={() => handleStartExam(item.id)}
    >
      Start
    </Button>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Take Exam</h1>
      </div>

      <DataTable columns={columns} data={sampleExams} actionColumn={actionColumn} />
    </div>
  );
};

export default TakeExam;
