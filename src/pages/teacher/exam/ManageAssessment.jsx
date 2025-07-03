import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
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
  Edit, 
  Eye, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  Users,
  Clock 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { useToast } from '../../../hooks/use-toast';

// Sample exam data
const exams = [
  {
    id: '1',
    title: 'Mathematics Mid-Term Exam',
    subject: 'Mathematics',
    class: 'Class 10',
    section: 'Section A',
    examType: 'Mid-Term',
    startDate: '2025-05-10',
    endDate: '2025-05-10',
    timeToSpend: '90',
    totalQuestions: 25,
    totalMarks: 100,
    status: 'upcoming',
    participantsCount: 35,
  },
  {
    id: '2',
    title: 'Physics Weekly Test',
    subject: 'Physics',
    class: 'Class 11',
    section: 'Section B',
    examType: 'Weekly Test',
    startDate: '2025-05-05',
    endDate: '2025-05-05',
    timeToSpend: '45',
    totalQuestions: 15,
    totalMarks: 30,
    status: 'active',
    participantsCount: 28,
  },
  {
    id: '3',
    title: 'English Literature Quiz',
    subject: 'English',
    class: 'Class 9',
    section: 'Section C',
    examType: 'Quiz',
    startDate: '2025-04-28',
    endDate: '2025-04-28',
    timeToSpend: '30',
    totalQuestions: 20,
    totalMarks: 20,
    status: 'completed',
    participantsCount: 33,
    averageScore: 16.2,
    highestScore: 20,
    lowestScore: 8,
  },
  {
    id: '4',
    title: 'Chemistry Final Exam',
    subject: 'Chemistry',
    class: 'Class 11',
    section: 'Section A',
    examType: 'Final Exam',
    startDate: '2025-06-15',
    endDate: '2025-06-15',
    timeToSpend: '180',
    totalQuestions: 50,
    totalMarks: 100,
    status: 'draft',
    participantsCount: 0,
  },
  {
    id: '5',
    title: 'Computer Science Practical Test',
    subject: 'Computer Science',
    class: 'Class 12',
    section: 'Section A',
    examType: 'Practical',
    startDate: '2025-05-12',
    endDate: '2025-05-13',
    timeToSpend: '120',
    totalQuestions: 10,
    totalMarks: 50,
    status: 'upcoming',
    participantsCount: 22,
  },
];

const ManageAssessment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [examToDelete, setExamToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Filter exams based on search and filters
  const filteredExams = exams.filter(exam => {
    const matchesSearch = 
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    const matchesClass = classFilter === 'all' || exam.class === classFilter;
    
    return matchesSearch && matchesStatus && matchesClass;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-gray-500">Completed</Badge>;
      case 'draft':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleDeleteExam = (id) => {
    // In a real app, you would delete the exam from your database
    console.log(`Delete exam with id: ${id}`);
    
    toast({
      title: "Assessment deleted",
      description: "The assessment has been deleted successfully."
    });
    
    setExamToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex mb-2 flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Assessments</h1>
          <p className="text-muted-foreground">View and manage all your assessments and exams</p>
        </div>
        
        <Button onClick={() => navigate('/teacher/exam/add-assessment')} className="gap-2">
          <Plus size={16} />
          Add New Assessment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col mb-4 md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search assessments..." 
                className="pl-10 px-5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[130px]">
                    <Filter size={14} className="mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Select 
                  value={classFilter} 
                  onValueChange={setClassFilter}
                >
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
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Class / Section</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No assessments found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>
                        <div className="font-medium">{exam.title}</div>
                        <div className="text-sm text-gray-500">{exam.subject}</div>
                      </TableCell>
                      <TableCell>
                        <div>{exam.class}</div>
                        <div className="text-sm text-gray-500">{exam.section}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarDays size={14} />
                          <span>{formatDate(exam.startDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock size={14} />
                          <span>{exam.timeToSpend} minutes</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(exam.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Users size={14} />
                          <span>{exam.participantsCount} students</span>
                        </div>
                        {exam.averageScore && (
                          <div className="text-xs text-gray-500">
                            Avg. Score: {exam.averageScore}/{exam.totalMarks}
                          </div>
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
                            <DropdownMenuItem onClick={() => navigate(`/teacher/exam/view/${exam.id}`)}>
                              <Eye size={14} className="mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/teacher/exam/edit/${exam.id}`)}>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => {
                                setExamToDelete(exam.id);
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
            Showing {filteredExams.length} of {exams.length} assessments
          </div>
          {/* Pagination could go here */}
        </CardFooter>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Assessment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assessment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => examToDelete && handleDeleteExam(examToDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAssessment;
