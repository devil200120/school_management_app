
import React from 'react';
import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Card } from '../../../components/ui/card';
import AssignmentForm from '../../../components/teacher/assignments/AssignmentForm';

const AddAssignment = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Add New Assignment"
        description="Create a new assignment for your students"
        backLink="/teacher/assignments"
      />

      <Card className="p-6">
        <AssignmentForm />
      </Card>
    </div>
  );
};

export default AddAssignment;
