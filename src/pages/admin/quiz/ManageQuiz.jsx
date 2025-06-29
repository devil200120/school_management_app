
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Plus, Edit, Eye, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';

const ManageQuiz = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [quizzes] = useState([
    {
      id: '1',
      title: 'Mathematics Quiz - Chapter 5',
      subject: 'Mathematics',
      level: 'Grade 10',
      totalQuestions: 20,
      totalMarks: 40,
      duration: 30,
      status: 'active',
      submissions: 25,
      createdBy: 'Mr. Johnson',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Science Quiz - Physics',
      subject: 'Science',
      level: 'Grade 9',
      totalQuestions: 15,
      totalMarks: 30,
      duration: 25,
      status: 'pending',
      submissions: 0,
      createdBy: 'Ms. Davis',
      createdAt: '2024-01-20'
    }
  ]);

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleActivateQuiz = (id) => {
    toast.success(`Quiz ${id} activated successfully`);
  };

  const handleDeactivateQuiz = (id) => {
    toast.success(`Quiz ${id} deactivated successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Quizzes</h1>
          <p className="text-muted-foreground">Manage all quizzes across all subjects and levels</p>
        </div>
        <Button className="bg-eduos-primary hover:bg-eduos-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add New Quiz
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Management</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Quiz Title</th>
                  <th className="text-left p-3 font-semibold">Subject</th>
                  <th className="text-left p-3 font-semibold">Level</th>
                  <th className="text-left p-3 font-semibold">Questions/Marks</th>
                  <th className="text-left p-3 font-semibold">Duration</th>
                  <th className="text-left p-3 font-semibold">Submissions</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{quiz.title}</div>
                        <div className="text-sm text-muted-foreground">by {quiz.createdBy}</div>
                      </div>
                    </td>
                    <td className="p-3">{quiz.subject}</td>
                    <td className="p-3">
                      <Badge variant="outline">{quiz.level}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{quiz.totalQuestions} questions</div>
                        <div className="text-muted-foreground">{quiz.totalMarks} marks</div>
                      </div>
                    </td>
                    <td className="p-3">{quiz.duration} min</td>
                    <td className="p-3">{quiz.submissions}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(quiz.status)}>
                        {quiz.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {quiz.status === 'pending' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleActivateQuiz(quiz.id)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeactivateQuiz(quiz.id)}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageQuiz;
