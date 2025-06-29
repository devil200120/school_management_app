
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '../../../components/ui/table';
import { Input } from '../../../components/ui/input';

const ManageExamQuestions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Dummy data for the questions
  const questions = [
    { id: 1, question: 'What is 2 + 2?', subject: 'Math', class: 'Class 1', options: ['3', '4', '5', '6'], correctAnswer: 'B' },
    { id: 2, question: 'Who wrote Romeo and Juliet?', subject: 'English', class: 'Class 3', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'], correctAnswer: 'B' },
    { id: 3, question: 'What is the chemical formula for water?', subject: 'Science', class: 'Class 2', options: ['H2O', 'CO2', 'O2', 'N2'], correctAnswer: 'A' },
  ];

  const filteredQuestions = questions.filter(
    question => 
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight">Manage Exam Questions</h2>
      
      <Card className="shadow-md">
        <CardHeader className="p-3 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <CardTitle className="text-lg sm:text-xl">Exam Questions List</CardTitle>
            <div className="relative w-full sm:w-auto">
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">ID</TableHead>
                    <TableHead className="text-xs sm:text-sm">Question</TableHead>
                    <TableHead className="text-xs sm:text-sm">Subject</TableHead>
                    <TableHead className="text-xs sm:text-sm">Class</TableHead>
                    <TableHead className="text-xs sm:text-sm">Options</TableHead>
                    <TableHead className="text-xs sm:text-sm">Correct</TableHead>
                    <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuestions.map(question => (
                    <TableRow key={question.id}>
                      <TableCell className="text-xs sm:text-sm p-2 sm:p-3 md:p-4">{question.id}</TableCell>
                      <TableCell className="text-xs sm:text-sm p-2 sm:p-3 md:p-4 max-w-[150px] truncate">{question.question}</TableCell>
                      <TableCell className="text-xs sm:text-sm p-2 sm:p-3 md:p-4">{question.subject}</TableCell>
                      <TableCell className="text-xs sm:text-sm p-2 sm:p-3 md:p-4">{question.class}</TableCell>
                      <TableCell className="p-2 sm:p-3 md:p-4">
                        <ul className="text-[10px] sm:text-xs">
                          {question.options.map((option, index) => (
                            <li key={index} className="truncate">{String.fromCharCode(65 + index)}: {option}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm p-2 sm:p-3 md:p-4">{question.correctAnswer}</TableCell>
                      <TableCell className="p-2 sm:p-3 md:p-4">
                        <div className="flex flex-col xs:flex-row gap-1 xs:gap-2">
                          <Button variant="outline" size="sm" className="text-[10px] sm:text-xs h-7 px-2">Edit</Button>
                          <Button variant="destructive" size="sm" className="text-[10px] sm:text-xs h-7 px-2">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageExamQuestions;
