import React from 'react';
import DataTable from '../../components/DataTable';

const columns = [
  { key: 'id', header: 'S/N', sortable: true },
  { key: 'studentName', header: 'Student Name', sortable: true },
  { key: 'admissionNo', header: 'Admission No.', sortable: true },
  { key: 'examScore', header: 'Exam Score', sortable: true },
  { key: 'class', header: 'Class', sortable: true },
  { key: 'subject', header: 'Subject', sortable: true },
  { key: 'date', header: 'Date', sortable: true },
];

// Sample data - in a real app this would come from an API
const sampleScores = [
  // Empty array for now as specified in the requirements
];

const ExamScorePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Print Exam Score</h1>
      </div>

      <DataTable columns={columns} data={sampleScores} />
    </div>
  );
};

export default ExamScorePage;
