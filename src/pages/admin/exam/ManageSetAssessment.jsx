
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '../../../components/ui/table';
import { Input } from '../../../components/ui/input';

const ManageSetAssessment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Dummy data for assessments
  const assessments = [
    { 
      id: 1, 
      subject: 'Mathematics', 
      class: 'Class 1', 
      totalQuestions: 50, 
      displayQuestions: 20, 
      timeToSpend: '30 minutes', 
      startDate: '2023-01-15', 
      endDate: '2023-01-20' 
    },
    { 
      id: 2, 
      subject: 'English', 
      class: 'Class 3', 
      totalQuestions: 40, 
      displayQuestions: 30, 
      timeToSpend: '45 minutes', 
      startDate: '2023-02-10', 
      endDate: '2023-02-15' 
    },
    { 
      id: 3, 
      subject: 'Science', 
      class: 'Class 2', 
      totalQuestions: 35, 
      displayQuestions: 25, 
      timeToSpend: '40 minutes', 
      startDate: '2023-03-05', 
      endDate: '2023-03-10' 
    },
  ];

  const filteredAssessments = assessments.filter(
    assessment => 
      assessment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Manage Set Assessment</h2>
        <Button>Set New Assessment</Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Assessment List</CardTitle>
            <div className="relative w-full sm:w-auto">
              <Input
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="flex justify-end mb-4 space-x-2">
              <Button variant="outline" size="sm">CSV</Button>
              <Button variant="outline" size="sm">PDF</Button>
              <Button variant="outline" size="sm">Print</Button>
              <Button variant="outline" size="sm">Copy</Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead className="cursor-pointer">
                    Subject
                    <span className="ml-2">↕️</span>
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    Class
                    <span className="ml-2">↕️</span>
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    Total Question
                    <span className="ml-2">↕️</span>
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    Total Ques to display
                    <span className="ml-2">↕️</span>
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    Time to spend
                    <span className="ml-2">↕️</span>
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    Start date
                    <span className="ml-2">↕️</span>
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    End date
                    <span className="ml-2">↕️</span>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.map((assessment, index) => (
                  <TableRow key={assessment.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{assessment.subject}</TableCell>
                    <TableCell>{assessment.class}</TableCell>
                    <TableCell>{assessment.totalQuestions}</TableCell>
                    <TableCell>{assessment.displayQuestions}</TableCell>
                    <TableCell>{assessment.timeToSpend}</TableCell>
                    <TableCell>{assessment.startDate}</TableCell>
                    <TableCell>{assessment.endDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
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

export default ManageSetAssessment;
