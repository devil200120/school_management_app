import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { ArrowLeft, Download, Users, TrendingUp, Award } from 'lucide-react';

const QuizResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    title: 'Algebra Mid-Term Quiz',
    subject: 'Mathematics',
    class: 'Class 10',
    totalQuestions: 15,
    submissions: 28,
    averageScore: 78.5,
    highestScore: 95,
    lowestScore: 45
  });

  const [results, setResults] = useState([
    { id: 1, studentName: 'John Doe', score: 85, percentage: 85, status: 'completed', submissionDate: '2025-05-12', timeTaken: '25 min' },
    { id: 2, studentName: 'Jane Smith', score: 92, percentage: 92, status: 'completed', submissionDate: '2025-05-11', timeTaken: '22 min' },
    { id: 3, studentName: 'Mike Johnson', score: 78, percentage: 78, status: 'completed', submissionDate: '2025-05-12', timeTaken: '28 min' },
    { id: 4, studentName: 'Sarah Wilson', score: 95, percentage: 95, status: 'completed', submissionDate: '2025-05-10', timeTaken: '20 min' },
    { id: 5, studentName: 'David Brown', score: 67, percentage: 67, status: 'completed', submissionDate: '2025-05-13', timeTaken: '30 min' }
  ]);

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  const getGradeBadge = (percentage) => {
    const grade = getGrade(percentage);
    const color = percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500';
    return <Badge className={color}>{grade}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/teacher/quiz/manage')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Quiz Results</h1>
            <p className="text-muted-foreground">{quiz.title} - {quiz.subject}</p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Total Submissions</p>
                <p className="text-2xl font-bold">{quiz.submissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-2xl font-bold">{quiz.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-500">Highest Score</p>
                <p className="text-2xl font-bold">{quiz.highestScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-red-500 rotate-180" />
              <div>
                <p className="text-sm text-gray-500">Lowest Score</p>
                <p className="text-2xl font-bold">{quiz.lowestScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Time Taken</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.studentName}</TableCell>
                    <TableCell>{result.score}/{quiz.totalQuestions}</TableCell>
                    <TableCell>{result.percentage}%</TableCell>
                    <TableCell>{getGradeBadge(result.percentage)}</TableCell>
                    <TableCell>{result.timeTaken}</TableCell>
                    <TableCell>{new Date(result.submissionDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Completed</Badge>
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

export default QuizResults;
