
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '../../../components/ui/table';
import { Input } from '../../../components/ui/input';

const ManageSetExam = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Dummy data for exams
  const exams = [
    { 
      id: 1, 
      subject: 'Mathematics', 
      class: 'Class 1', 
      totalQuestions: 100, 
      displayQuestions: 50, 
      timeToSpend: '2 hours', 
      startDate: '2023-05-15', 
      endDate: '2023-05-15', 
      examType: 'Mid-Term'
    },
    { 
      id: 2, 
      subject: 'English', 
      class: 'Class 3', 
      totalQuestions: 80, 
      displayQuestions: 60, 
      timeToSpend: '1.5 hours', 
      startDate: '2023-05-16', 
      endDate: '2023-05-16',
      examType: 'Final'
    },
    { 
      id: 3, 
      subject: 'Science', 
      class: 'Class 2', 
      totalQuestions: 70, 
      displayQuestions: 50, 
      timeToSpend: '1.5 hours', 
      startDate: '2023-05-17', 
      endDate: '2023-05-17',
      examType: 'Mid-Term'
    },
  ];

  const filteredExams = exams.filter(
    exam => 
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Manage Set Exam</h2>
        <Button>Set New Exam</Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Exam List</CardTitle>
            <div className="relative w-full sm:w-auto">
              <Input
                placeholder="Search exams..."
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
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Total Question</TableHead>
                  <TableHead>Total Ques to display</TableHead>
                  <TableHead>Time to spend</TableHead>
                  <TableHead>Start date</TableHead>
                  <TableHead>End date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam, index) => (
                  <TableRow key={exam.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.class}</TableCell>
                    <TableCell>{exam.examType}</TableCell>
                    <TableCell>{exam.totalQuestions}</TableCell>
                    <TableCell>{exam.displayQuestions}</TableCell>
                    <TableCell>{exam.timeToSpend}</TableCell>
                    <TableCell>{exam.startDate}</TableCell>
                    <TableCell>{exam.endDate}</TableCell>
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

export default ManageSetExam;
