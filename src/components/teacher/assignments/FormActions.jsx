
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export const FormActions = () => {
  return (
    <div className="flex justify-between items-center pt-4">
      <Button type="button" variant="outline" asChild>
        <Link to="/teacher/assignments" className="text-decoration">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Cancel
        </Link>
      </Button>
      <Button type="submit" className="ml-2">
        <Save className="mr-2 h-4 w-4" />
        Create Assignment
      </Button>
    </div>
  );
};
