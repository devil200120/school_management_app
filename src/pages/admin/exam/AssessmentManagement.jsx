
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Plus, Edit, Eye, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';


const AssessmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assessments] = useState([
    {
      id: '1',
      title: 'Mathematics Mid-term Exam',
      subject: 'Mathematics',
      level: 'Grade 10',
      type: 'exam',
      totalQuestions: 25,
      totalMarks: 100,
      duration: 120,
      startDate: '2024-02-01',
      endDate: '2024-02-03',
      status: 'active',
      studentsEnrolled: 45,
      studentsCompleted: 32,
      createdBy: 'Mr. Johnson'
    },
    {
      id: '2',
      title: 'Science Quiz Chapter 5',
      subject: 'Science',
      level: 'Grade 8',
      type: 'quiz',
      totalQuestions: 15,
      totalMarks: 30,
      duration: 30,
      startDate: '2024-01-25',
      endDate: '2024-01-27',
      status: 'completed',
      studentsEnrolled: 38,
      studentsCompleted: 35,
      createdBy: 'Ms. Davis'
    },
    {
      id: '3',
      title: 'English Essay Assignment',
      subject: 'English',
      level: 'Grade 9',
      type: 'assignment',
      totalQuestions: 3,
      totalMarks: 50,
      duration: 0,
      startDate: '2024-02-05',
      endDate: '2024-02-12',
      status: 'draft',
      studentsEnrolled: 0,
      studentsCompleted: 0,
      createdBy: 'Mrs. Smith'
    }
  ]);

  const filteredAssessments = assessments.filter(assessment =>
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'graded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'quiz': return 'bg-yellow-100 text-yellow-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'assignment': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateAssessment = () => {
    toast.info('Create new assessment feature would open a modal here');
  };

  const handleEditAssessment = (id) => {
    toast.info(`Edit assessment ${id} feature would open a modal here`);
  };

  const handleViewAssessment = (id) => {
    toast.info(`View assessment ${id} details`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assessment Management</h1>
          <p className="text-muted-foreground">Create and manage assessments, quizzes, and exams</p>
        </div>
        <Button onClick={handleCreateAssessment} className="bg-eduos-primary hover:bg-eduos-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Assessments</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 px-5"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Title</th>
                  <th className="text-left p-3 font-semibold">Subject</th>
                  <th className="text-left p-3 font-semibold">Level</th>
                  <th className="text-left p-3 font-semibold">Type</th>
                  <th className="text-left p-3 font-semibold">Questions/Marks</th>
                  <th className="text-left p-3 font-semibold">Duration</th>
                  <th className="text-left p-3 font-semibold">Period</th>
                  <th className="text-left p-3 font-semibold">Progress</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((assessment) => (
                  <tr key={assessment.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{assessment.title}</div>
                        <div className="text-sm text-muted-foreground">by {assessment.createdBy}</div>
                      </div>
                    </td>
                    <td className="p-3">{assessment.subject}</td>
                    <td className="p-3">
                      <Badge variant="outline">{assessment.level}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={getTypeColor(assessment.type)}>
                        {assessment.type}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{assessment.totalQuestions} questions</div>
                        <div className="text-muted-foreground">{assessment.totalMarks} marks</div>
                      </div>
                    </td>
                    <td className="p-3">
                      {assessment.duration > 0 ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {assessment.duration} min
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No limit</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {assessment.startDate}
                        </div>
                        <div className="text-muted-foreground">to {assessment.endDate}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{assessment.studentsCompleted}/{assessment.studentsEnrolled}</div>
                        <div className="text-muted-foreground">completed</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(assessment.status)}>
                        {assessment.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewAssessment(assessment.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAssessment(assessment.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAssessments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No assessments found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentManagement;
