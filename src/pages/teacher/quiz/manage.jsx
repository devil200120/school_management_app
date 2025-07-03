
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader} from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import {
  CalendarDays,
  Clock,
  Edit,
  Eye,
  Filter,
  BarChart2,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  CheckCircle,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { toast } from 'sonner';

// Sample quiz data
const quizzes = [
  {
    id: '1',
    title: 'Algebra Mid-Term Quiz',
    subject: 'Mathematics',
    class: 'Class 10',
    duration: '30',
    totalQuestions: 15,
    startDate: '2025-05-10',
    endDate: '2025-05-15',
    status: 'active',
    createdBy: 'John Doe',
    createdOn: '2025-04-25',
    submissions: 28,
    averageScore: 78.5,
    description: 'Cover topics from Chapter 1-5 of the Algebra textbook',
    category: 'Mid-Term',
    difficulty: 'Medium'
  },
  {
    id: '2',
    title: 'Physics Forces Quiz',
    subject: 'Physics',
    class: 'Class 11',
    duration: '45',
    totalQuestions: 20,
    startDate: '2025-05-05',
    endDate: '2025-05-08',
    status: 'active',
    createdBy: 'John Doe',
    createdOn: '2025-04-20',
    submissions: 15,
    averageScore: 65.2,
    description: 'Quiz covers Newton\'s Laws of Motion',
    category: 'Weekly',
    difficulty: 'Hard'
  },
  {
    id: '3',
    title: 'English Grammar Assessment',
    subject: 'English',
    class: 'Class 9',
    duration: '25',
    totalQuestions: 10,
    startDate: '2025-04-28',
    endDate: '2025-04-28',
    status: 'completed',
    createdBy: 'John Doe',
    createdOn: '2025-04-15',
    submissions: 32,
    averageScore: 88.3,
    description: 'Assessment on parts of speech and tenses',
    category: 'Weekly',
    difficulty: 'Easy',
    completedDate: '2025-04-28'
  },
  {
    id: '4',
    title: 'Chemistry Periodic Table',
    subject: 'Chemistry',
    class: 'Class 11',
    duration: '40',
    totalQuestions: 25,
    startDate: '2025-06-15',
    endDate: '2025-06-20',
    status: 'inactive',
    createdBy: 'John Doe',
    createdOn: '2025-04-10',
    description: 'Quiz on periodic table elements and properties',
    category: 'Final',
    difficulty: 'Medium'
  },
  {
    id: '5',
    title: 'Computer Science Algorithms',
    subject: 'Computer Science',
    class: 'Class 12',
    duration: '60',
    totalQuestions: 15,
    startDate: '2025-05-12',
    endDate: '2025-05-14',
    status: 'active',
    createdBy: 'John Doe',
    createdOn: '2025-04-28',
    submissions: 8,
    averageScore: 72.1,
    description: 'Quiz on sorting algorithms and time complexity',
    category: 'Monthly',
    difficulty: 'Hard'
  },
];

const ManageQuiz = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const navigate = useNavigate();

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;
    const matchesClass = classFilter === 'all' || quiz.class === classFilter;

    return matchesSearch && matchesStatus && matchesClass;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Inactive</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-gray-500">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleDeleteQuiz = (id) => {
    console.log(`Delete quiz with id: ${id}`);
    toast.success("Quiz deleted successfully");
    setQuizToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Quizzes</h1>
          <p className="text-muted-foreground">View and manage all your quizzes and assessments</p>
        </div>
        <Button onClick={() => navigate('/teacher/quiz/add')} className="gap-2">
          <Plus size={16} />
          Create New Quiz
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search quizzes..."
                className="pl-10 px-5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter size={14} className="mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-[130px]">
                  <Users size={14} className="mr-2" />
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Class 9">Class 9</SelectItem>
                  <SelectItem value="Class 10">Class 10</SelectItem>
                  <SelectItem value="Class 11">Class 11</SelectItem>
                  <SelectItem value="Class 12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Responses</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuizzes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No quizzes found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell>
                        <div className="font-medium">{quiz.title}</div>
                        <div className="text-sm text-gray-500">{quiz.subject}</div>
                      </TableCell>
                      <TableCell>{quiz.class}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarDays size={14} />
                          <span>{formatDate(quiz.startDate)}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          to {formatDate(quiz.endDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock size={14} />
                          <span>{quiz.duration} min</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {quiz.totalQuestions} questions
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(quiz.status)}</TableCell>
                      <TableCell>
                        {quiz.submissions ? (
                          <>
                            <div className="flex items-center gap-1 text-sm">
                              <CheckCircle size={14} />
                              <span>{quiz.submissions} submissions</span>
                            </div>
                            {quiz.averageScore && (
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <BarChart2 size={12} />
                                <span>Avg: {quiz.averageScore}%</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">No submissions yet</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal size={16} />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/teacher/quiz/view/${quiz.id}`)}>
                              <Eye size={14} className="mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/teacher/quiz/results/${quiz.id}`)}>
                              <BarChart2 size={14} className="mr-2" />
                              View Results
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/teacher/quiz/edit/${quiz.id}`)}>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setQuizToDelete(quiz.id);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredQuizzes.length} of {quizzes.length} quizzes
          </div>
          {/* Pagination could go here */}
        </CardFooter>
      </Card>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Quiz</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this quiz? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => quizToDelete && handleDeleteQuiz(quizToDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);
};

export default ManageQuiz;
