
import { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../components/ui/table';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle} from '../../../components/ui/dialog';
import { toast } from 'sonner';
import { CheckCircle, Eye, Star, XCircle } from 'lucide-react';

// Sample quiz data
const mockQuizzes = [
  {
    id: 1,
    title: 'Mathematics: Algebra Fundamentals',
    subject: 'Mathematics',
    class: 'JSS 3',
    teacher: 'Mr. Johnson',
    questions: 20,
    duration: 30,
    status: 'Active',
    dateCreated: '2025-04-28',
    attempts: 45
  },
  {
    id: 2,
    title: 'English: Grammar and Punctuation',
    subject: 'English Language',
    class: 'SSS 1',
    teacher: 'Mrs. Smith',
    questions: 25,
    duration: 45,
    status: 'Active',
    dateCreated: '2025-04-26',
    attempts: 62
  },
  {
    id: 3,
    title: 'Physics: Forces and Motion',
    subject: 'Physics',
    class: 'SSS 2',
    teacher: 'Dr. Williams',
    questions: 15,
    duration: 20,
    status: 'Pending Approval',
    dateCreated: '2025-05-01',
    attempts: 0
  },
  {
    id: 4,
    title: 'Chemistry: Periodic Table',
    subject: 'Chemistry',
    class: 'SSS 3',
    teacher: 'Prof. Brown',
    questions: 30,
    duration: 40,
    status: 'Inactive',
    dateCreated: '2025-04-20',
    attempts: 32
  },
  {
    id: 5,
    title: 'Biology: Cell Structure',
    subject: 'Biology',
    class: 'SSS 1',
    teacher: 'Dr. Davis',
    questions: 22,
    duration: 35,
    status: 'Pending Approval',
    dateCreated: '2025-05-01',
    attempts: 0
  }
];

// Sample student performance data
const mockPerformance = [
  {
    id: 1,
    quizTitle: 'Mathematics: Algebra Fundamentals',
    subject: 'Mathematics',
    class: 'JSS 3',
    totalStudents: 45,
    averageScore: 72,
    highestScore: 96,
    lowestScore: 42,
    passRate: 84
  },
  {
    id: 2,
    quizTitle: 'English: Grammar and Punctuation',
    subject: 'English Language',
    class: 'SSS 1',
    totalStudents: 62,
    averageScore: 68,
    highestScore: 92,
    lowestScore: 38,
    passRate: 76
  },
  {
    id: 4,
    quizTitle: 'Chemistry: Periodic Table',
    subject: 'Chemistry',
    class: 'SSS 3',
    totalStudents: 32,
    averageScore: 74,
    highestScore: 98,
    lowestScore: 45,
    passRate: 88
  }
];

const ManageQuiz = () => {
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [viewPerformanceDialog, setViewPerformanceDialog] = useState(false);
  const [viewDetailsDialog, setViewDetailsDialog] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = 
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && quiz.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleStatusChange = (quizId, newStatus) => {
    const updatedQuizzes = quizzes.map(quiz => 
      quiz.id === quizId ? { ...quiz, status: newStatus } : quiz
    );
    setQuizzes(updatedQuizzes);
    
    toast.success(`Quiz ${newStatus === 'Active' ? 'approved' : 'rejected'} successfully`);
  };

  const getQuizPerformance = (quizId) => {
    return mockPerformance.find(p => p.id === quizId);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="bg-eduos-light px-2 p-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="px-2">
              <CardTitle className="pt-1">Quiz Management</CardTitle>
              <CardDescription className="pb-0">Manage and monitor quizzes across all subjects and classes</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-1">
          <Tabs defaultValue="manage" className="w-full">
            <div className="px-1 py-1 border-b">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="manage">All Quizzes</TabsTrigger>
                <TabsTrigger value="approval">Pending Approval</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-2 space-y-2">
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <Input 
                  placeholder="Search quizzes..." 
                  value={searchTerm}
                  onChange={handleSearch}
                  className="max-w-xs"
                />
                
                <Select 
                  defaultValue="all" 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending approval">Pending Approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="manage" className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>List of all quizzes in the system</TableCaption>
                    <TableHeader >
                      <TableRow className="p-4">
                        <TableHead >Title</TableHead>
                        <TableHead  className="p-4" >Subject</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuizzes.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8">No quizzes found</TableCell>
                        </TableRow>
                      ) : (
                        filteredQuizzes.map((quiz) => (
                          <TableRow key={quiz.id}>
                            <TableCell className="font-medium">{quiz.title}</TableCell>
                            <TableCell>{quiz.subject}</TableCell>
                            <TableCell>{quiz.class}</TableCell>
                            <TableCell>{quiz.teacher}</TableCell>
                            <TableCell>{quiz.questions}</TableCell>
                            <TableCell>{quiz.duration} mins</TableCell>
                            <TableCell>
                              <Badge 
                                className={`${quiz.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                  quiz.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                                  'bg-yellow-100 text-yellow-800'}`}
                              >
                                {quiz.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{quiz.dateCreated}</TableCell>
                            <TableCell className="text-right space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setSelectedQuiz(quiz);
                                  setViewDetailsDialog(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {quiz.attempts > 0 && (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => {
                                    setSelectedQuiz(quiz);
                                    setViewPerformanceDialog(true);
                                  }}
                                >
                                  <Star className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="approval" className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>List of quizzes pending approval</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Date Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuizzes.filter(q => q.status === 'Pending Approval').length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">No pending quizzes found</TableCell>
                        </TableRow>
                      ) : (
                        filteredQuizzes
                          .filter(q => q.status === 'Pending Approval')
                          .map((quiz) => (
                            <TableRow key={quiz.id}>
                              <TableCell className="font-medium">{quiz.title}</TableCell>
                              <TableCell>{quiz.subject}</TableCell>
                              <TableCell>{quiz.class}</TableCell>
                              <TableCell>{quiz.teacher}</TableCell>
                              <TableCell>{quiz.questions}</TableCell>
                              <TableCell>{quiz.duration} mins</TableCell>
                              <TableCell>{quiz.dateCreated}</TableCell>
                              <TableCell className="text-right space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-green-600 hover:text-green-700"
                                  onClick={() => handleStatusChange(quiz.id, 'Active')}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => handleStatusChange(quiz.id, 'Inactive')}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => {
                                    setSelectedQuiz(quiz);
                                    setViewDetailsDialog(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>Quiz performance statistics</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Quiz Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Total Students</TableHead>
                        <TableHead>Average Score</TableHead>
                        <TableHead>Highest Score</TableHead>
                        <TableHead>Pass Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPerformance.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">No performance data found</TableCell>
                        </TableRow>
                      ) : (
                        mockPerformance.map((performance) => (
                          <TableRow key={performance.id}>
                            <TableCell className="font-medium">{performance.quizTitle}</TableCell>
                            <TableCell>{performance.subject}</TableCell>
                            <TableCell>{performance.class}</TableCell>
                            <TableCell>{performance.totalStudents}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className="font-medium">{performance.averageScore}%</span>
                                <div className="ml-2 h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${
                                      performance.averageScore >= 70 ? 'bg-green-500' : 
                                      performance.averageScore >= 50 ? 'bg-yellow-500' : 
                                      'bg-red-500'
                                    }`} 
                                    style={{ width: `${performance.averageScore}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{performance.highestScore}%</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className="font-medium">{performance.passRate}%</span>
                                <div className="ml-2 h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-eduos-primary" 
                                    style={{ width: `${performance.passRate}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quiz Details Dialog */}
      <Dialog open={viewDetailsDialog} onOpenChange={setViewDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Quiz Details</DialogTitle>
            <DialogDescription>
              View detailed information about this quiz
            </DialogDescription>
          </DialogHeader>

          {selectedQuiz && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Quiz Title</h4>
                  <p className="font-medium">{selectedQuiz.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                  <p>{selectedQuiz.subject}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Class</h4>
                  <p>{selectedQuiz.class}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Teacher</h4>
                  <p>{selectedQuiz.teacher}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Questions</h4>
                  <p>{selectedQuiz.questions}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Duration</h4>
                  <p>{selectedQuiz.duration} minutes</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <Badge 
                    className={`${selectedQuiz.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      selectedQuiz.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                      'bg-yellow-100 text-yellow-800'}`}
                  >
                    {selectedQuiz.status}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date Created</h4>
                  <p>{selectedQuiz.dateCreated}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Student Attempts</h4>
                  <p>{selectedQuiz.attempts}</p>
                </div>
              </div>

              {selectedQuiz.status === 'Pending Approval' && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleStatusChange(selectedQuiz.id, 'Inactive');
                      setViewDetailsDialog(false);
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      handleStatusChange(selectedQuiz.id, 'Active');
                      setViewDetailsDialog(false);
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Performance Details Dialog */}
      <Dialog open={viewPerformanceDialog} onOpenChange={setViewPerformanceDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Quiz Performance</DialogTitle>
            <DialogDescription>
              Detailed student performance for this quiz
            </DialogDescription>
          </DialogHeader>

          {selectedQuiz && getQuizPerformance(selectedQuiz.id) && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Average Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-eduos-primary">
                      {getQuizPerformance(selectedQuiz.id)?.averageScore}%
                    </div>
                    <div className="mt-2 h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          getQuizPerformance(selectedQuiz.id)?.averageScore >= 70 ? 'bg-green-500' : 
                          getQuizPerformance(selectedQuiz.id)?.averageScore >= 50 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`} 
                        style={{ width: `${getQuizPerformance(selectedQuiz.id)?.averageScore}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Pass Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {getQuizPerformance(selectedQuiz.id)?.passRate}%
                    </div>
                    <div className="mt-2 h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${getQuizPerformance(selectedQuiz.id)?.passRate}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Highest Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-eduos-primary">
                      {getQuizPerformance(selectedQuiz.id)?.highestScore}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Lowest Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-700">
                      {getQuizPerformance(selectedQuiz.id)?.lowestScore}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">Score Distribution</h3>
                <div className="grid grid-cols-5 gap-1">
                  <div className="h-24 flex items-end">
                    <div className="w-full bg-red-500 h-[15%]"></div>
                  </div>
                  <div className="h-24 flex items-end">
                    <div className="w-full bg-orange-500 h-[25%]"></div>
                  </div>
                  <div className="h-24 flex items-end">
                    <div className="w-full bg-yellow-500 h-[35%]"></div>
                  </div>
                  <div className="h-24 flex items-end">
                    <div className="w-full bg-green-500 h-[60%]"></div>
                  </div>
                  <div className="h-24 flex items-end">
                    <div className="w-full bg-green-700 h-[40%]"></div>
                  </div>
                </div>
                <div className="grid grid-cols-5 text-xs text-center mt-1 text-gray-600">
                  <div>0-20%</div>
                  <div>21-40%</div>
                  <div>41-60%</div>
                  <div>61-80%</div>
                  <div>81-100%</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageQuiz;
