import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { CalendarDays, Clock, Users, FileQuestion, Edit, BarChart2 } from 'lucide-react';

const ViewQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    title: 'Algebra Mid-Term Quiz',
    subject: 'Mathematics',
    class: 'Class 10',
    duration: '30',
    totalQuestions: 15,
    startDate: '2025-05-10',
    endDate: '2025-05-15',
    status: 'active',
    submissions: 28,
    averageScore: 78.5,
    description: 'Cover topics from Chapter 1-5 of the Algebra textbook',
    category: 'Mid-Term',
    difficulty: 'Medium',
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Inactive
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="text-gray-500">
            Completed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quiz Details</h1>
          <p className="text-muted-foreground">View quiz information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/teacher/quiz/manage')}>
            Back to Quizzes
          </Button>
          <Button variant="outline" onClick={() => navigate(`/teacher/quiz/results/${id}`)}>
            <BarChart2 className="mr-2 h-4 w-4" />
            View Results
          </Button>
          <Button onClick={() => navigate(`/teacher/quiz/edit/${id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Quiz
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{quiz.title}</CardTitle>
            {getStatusBadge(quiz.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['Subject', quiz.subject],
              ['Class', quiz.class],
              ['Category', quiz.category],
            ].map(([label, value], i) => (
              <div key={i} className="space-y-2">
                <h3 className="font-medium text-gray-900">{label}</h3>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Difficulty</h3>
              <Badge variant="outline">{quiz.difficulty}</Badge>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Duration</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <p className="text-gray-600">{quiz.duration} minutes</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Total Questions</h3>
              <div className="flex items-center gap-2">
                <FileQuestion className="h-4 w-4 text-gray-500" />
                <p className="text-gray-600">{quiz.totalQuestions}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Start Date</h3>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                <p className="text-gray-600">{formatDate(quiz.startDate)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">End Date</h3>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                <p className="text-gray-600">{formatDate(quiz.endDate)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Submissions</h3>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <p className="text-gray-600">{quiz.submissions} students</p>
              </div>
            </div>
          </div>

          {quiz.averageScore && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Performance Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Average Score</p>
                  <p className="text-2xl font-bold text-blue-600">{quiz.averageScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Submissions</p>
                  <p className="text-2xl font-bold text-green-600">{quiz.submissions}</p>
                </div>
              </div>
            </div>
          )}

          {quiz.description && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Description</h3>
              <p className="text-gray-600">{quiz.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewQuiz;
