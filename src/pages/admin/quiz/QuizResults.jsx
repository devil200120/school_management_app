
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Eye, Download, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

const QuizResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results] = useState([
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU001',
      quizTitle: 'Mathematics Quiz',
      score: 8,
      totalQuestions: 10,
      timeSpent: '15 minutes',
      submittedAt: '2024-01-15 10:30 AM',
      status: 'completed'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentId: 'STU002',
      quizTitle: 'Science Quiz',
      score: 7,
      totalQuestions: 10,
      timeSpent: '12 minutes',
      submittedAt: '2024-01-15 11:15 AM',
      status: 'completed'
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      studentId: 'STU003',
      quizTitle: 'History Quiz',
      score: 0,
      totalQuestions: 10,
      timeSpent: '0 minutes',
      submittedAt: '',
      status: 'not-started'
    }
  ]);

  const filteredResults = results.filter(result =>
    result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.quizTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScorePercentage = (score, total) => {
    return total > 0 ? Math.round((score / total) * 100) : 0;
  };

  const handleViewDetails = (id) => {
    toast.info(`View detailed results for quiz ${id}`);
  };

  const handleDownloadReport = () => {
    toast.info('Downloading quiz results report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quiz Results</h1>
          <p className="text-muted-foreground">View and analyze student quiz performance</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleDownloadReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button className="bg-eduos-primary hover:bg-eduos-secondary">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Performance</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search results..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
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
                  <th className="text-left p-3 font-semibold">Student ID</th>
                  <th className="text-left p-3 font-semibold">Quiz</th>
                  <th className="text-left p-3 font-semibold">Score</th>
                  <th className="text-left p-3 font-semibold">Percentage</th>
                  <th className="text-left p-3 font-semibold">Time Spent</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Submitted</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => (
                  <tr key={result.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{result.studentName}</td>
                    <td className="p-3">{result.studentId}</td>
                    <td className="p-3">{result.quizTitle}</td>
                    <td className="p-3">
                      {result.status === 'completed' ? `${result.score}/${result.totalQuestions}` : '-'}
                    </td>
                    <td className="p-3">
                      {result.status === 'completed' ? (
                        <span className={`font-semibold ${
                          getScorePercentage(result.score, result.totalQuestions) >= 70 
                            ? 'text-green-600' 
                            : getScorePercentage(result.score, result.totalQuestions) >= 50 
                              ? 'text-yellow-600' 
                              : 'text-red-600'
                        }`}>
                          {getScorePercentage(result.score, result.totalQuestions)}%
                        </span>
                      ) : '-'}
                    </td>
                    <td className="p-3">{result.timeSpent || '-'}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(result.status)}>
                        {result.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="p-3">{result.submittedAt || '-'}</td>
                    <td className="p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(result.id)}
                        disabled={result.status === 'not-started'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredResults.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No quiz results found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;
