
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const QuizAnswers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [answers] = useState([
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU001',
      quizTitle: 'Mathematics Quiz',
      questionNumber: 1,
      question: 'What is 2 + 2?',
      studentAnswer: '4',
      correctAnswer: '4',
      isCorrect: true,
      points: 1,
      submittedAt: '2024-01-15 10:30 AM'
    },
    {
      id: '2',
      studentName: 'John Doe',
      studentId: 'STU001',
      quizTitle: 'Mathematics Quiz',
      questionNumber: 2,
      question: 'What is the square root of 16?',
      studentAnswer: '3',
      correctAnswer: '4',
      isCorrect: false,
      points: 0,
      submittedAt: '2024-01-15 10:30 AM'
    },
    {
      id: '3',
      studentName: 'Jane Smith',
      studentId: 'STU002',
      quizTitle: 'Science Quiz',
      questionNumber: 1,
      question: 'What is H2O?',
      studentAnswer: 'Water',
      correctAnswer: 'Water',
      isCorrect: true,
      points: 1,
      submittedAt: '2024-01-15 11:15 AM'
    }
  ]);

  const filteredAnswers = answers.filter(answer =>
    answer.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    answer.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    answer.quizTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    answer.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewAnswer = (id) => {
    toast.info(`View detailed answer for submission ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quiz Answers</h1>
          <p className="text-muted-foreground">Review student answers and performance by question</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='p-2'>Student Answers</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute ml-5 left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 ml-1 px-5"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Student</th>
                  <th className="text-left p-3 font-semibold">Quiz</th>
                  <th className="text-left p-3 font-semibold">Question #</th>
                  <th className="text-left p-3 font-semibold">Question</th>
                  <th className="text-left p-3 font-semibold">Student Answer</th>
                  <th className="text-left p-3 font-semibold">Correct Answer</th>
                  <th className="text-left p-3 font-semibold">Result</th>
                  <th className="text-left p-3 font-semibold">Points</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnswers.map((answer) => (
                  <tr key={answer.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{answer.studentName}</div>
                        <div className="text-sm text-muted-foreground">{answer.studentId}</div>
                      </div>
                    </td>
                    <td className="p-3">{answer.quizTitle}</td>
                    <td className="p-3">{answer.questionNumber}</td>
                    <td className="p-3 max-w-xs">
                      <div className="truncate" title={answer.question}>
                        {answer.question}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {answer.studentAnswer}
                      </span>
                    </td>
                    <td className="p-3 text-green-600 font-medium">
                      {answer.correctAnswer}
                    </td>
                    <td className="p-3">
                      {answer.isCorrect ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Correct
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          <XCircle className="h-3 w-3 mr-1" />
                          Incorrect
                        </Badge>
                      )}
                    </td>
                    <td className="p-3">{answer.points}</td>
                    <td className="p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewAnswer(answer.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAnswers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No quiz answers found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizAnswers;
