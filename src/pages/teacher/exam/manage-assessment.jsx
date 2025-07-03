
import { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  CalendarDays,
  BookOpen,
  User,
  Clock,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Card,
  CardContent,
} from '../../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Badge } from '../../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

// Sample assessment data
const sampleAssessments = [
  {
    id: '1',
    title: 'Midterm Mathematics Exam',
    subject: 'Mathematics',
    class: 'Class 5',
    section: 'A',
    date: '2023-06-15',
    duration: '120 minutes',
    status: 'active',
    totalStudents: 32,
    submitted: 28,
  },
  {
    id: '2',
    title: 'English Grammar Quiz',
    subject: 'English',
    class: 'Class 4',
    section: 'B',
    date: '2023-06-10',
    duration: '45 minutes',
    status: 'completed',
    totalStudents: 30,
    submitted: 30,
  },
  {
    id: '3',
    title: 'Science Weekly Test',
    subject: 'Science',
    class: 'Class 6',
    section: 'A',
    date: '2023-06-20',
    duration: '60 minutes',
    status: 'upcoming',
    totalStudents: 35,
    submitted: 0,
  },
  {
    id: '4',
    title: 'History Final Exam',
    subject: 'History',
    class: 'Class 5',
    section: 'C',
    date: '2023-06-25',
    duration: '180 minutes',
    status: 'upcoming',
    totalStudents: 33,
    submitted: 0,
  },
  {
    id: '5',
    title: 'Computer Science Project',
    subject: 'Computer Science',
    class: 'Class 6',
    section: 'B',
    date: '2023-06-05',
    duration: '120 minutes',
    status: 'completed',
    totalStudents: 30,
    submitted: 28,
  },
];

const ManageAssessment= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const subjects = ['All', 'Mathematics', 'English', 'Science', 'History', 'Geography', 'Computer Science'];
  const classes = ['All', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];
  const statuses = ['All', 'active', 'upcoming', 'completed'];

  // Filter assessments based on search and filters
  const filteredAssessments = sampleAssessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || assessment.subject === selectedSubject;
    const matchesClass = selectedClass === 'All' || assessment.class === selectedClass;
    const matchesStatus = selectedStatus === 'All' || assessment.status === selectedStatus;
    
    return matchesSearch && matchesSubject && matchesClass && matchesStatus;
  });

  // Handle assessment deletion
  const handleDelete = () => {
    console.log('Delete assessment with ID:', selectedAssessmentId);
    toast.success('Assessment deleted successfully');
    setIsDeleteDialogOpen(false);
  };

  // Get selected assessment details
  const getSelectedAssessment = () => {
    return sampleAssessments.find(assessment => assessment.id === selectedAssessmentId);
  };

  // Handle view assessment
  const handleView = (id) => {
    setSelectedAssessmentId(id);
    setIsViewDialogOpen(true);
  };

  // Handle edit assessment
  const handleEdit = (id) => {
    console.log('Edit assessment with ID:', id);
    toast.info('Editing assessment');
    // In a real app, you would navigate to edit page
    // navigate(`/teacher/exam/edit-assessment/${id}`);
  };

  // Handle duplicate assessment
  const handleDuplicate = (id) => {
    console.log('Duplicate assessment with ID:', id);
    toast.success('Assessment duplicated successfully');
  };

  return (
    <div className="">
      <PageHeader 
        title="Manage Assessments"
        description="View, edit, and manage your assessments"
       
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
         <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            <Input
              type="search"
              placeholder="Search assessments..."
              className="pl-8 h-9 w-full flex rounded-md border border-input bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedSubject}
              onValueChange={setSelectedSubject}
            >
              <SelectTrigger className="w-[130px] hover:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger className="w-[130px] hover:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-[130px] hover:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status} className="capitalize">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          asChild
          className="bg-blue-600 hover:bg-blue-700 transition-all hover:shadow-md w-full sm:w-auto"
        >
          <Link to="/teacher/exam/add-assessment"  className="text-decoration">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Assessment
          </Link>
        </Button>
      </div>

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-blue-50">
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Submission</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No assessments found. Create a new assessment to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssessments.map((assessment) => (
                    <TableRow key={assessment.id} className="hover:bg-blue-50/40 transition-colors">
                      <TableCell>{assessment.id}</TableCell>
                      <TableCell className="font-medium">{assessment.title}</TableCell>
                      <TableCell>{assessment.subject}</TableCell>
                      <TableCell>{assessment.class} {assessment.section}</TableCell>
                      <TableCell>{assessment.date}</TableCell>
                      <TableCell>{assessment.duration}</TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={
                            assessment.status === 'active' ? "default" : 
                            assessment.status === 'upcoming' ? "outline" : "secondary"
                          }
                          className={
                            assessment.status === 'active' ? "bg-green-100 text-green-800 hover:bg-green-200" :
                            assessment.status === 'upcoming' ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                            "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }
                        >
                          {assessment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {assessment.status !== 'upcoming' ? (
                          <span className="text-sm">
                            {assessment.submitted}/{assessment.totalStudents}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleView(assessment.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(assessment.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(assessment.id)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedAssessmentId(assessment.id);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
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
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assessment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Assessment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
          </DialogHeader>
          
          {selectedAssessmentId && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">{getSelectedAssessment()?.title}</h3>
                <Badge 
                  variant="outline" 
                  className={
                    getSelectedAssessment()?.status === 'active' ? "bg-green-100 text-green-800 mt-2" :
                    getSelectedAssessment()?.status === 'upcoming' ? "bg-blue-100 text-blue-800 mt-2" :
                    "bg-gray-100 text-gray-800 mt-2"
                  }
                >
                  {getSelectedAssessment()?.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p>{getSelectedAssessment()?.subject}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p>{getSelectedAssessment()?.class} {getSelectedAssessment()?.section}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p>{getSelectedAssessment()?.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p>{getSelectedAssessment()?.duration}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Submission Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-lg font-medium">{getSelectedAssessment()?.totalStudents}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="text-lg font-medium">{getSelectedAssessment()?.submitted}</p>
                  </div>
                </div>
                
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${getSelectedAssessment()?.status !== 'upcoming' && getSelectedAssessment()?.totalStudents
                        ? (getSelectedAssessment().submitted / getSelectedAssessment().totalStudents * 100)
                        : 0}%`
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="flex space-x-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    handleEdit(selectedAssessmentId);
                    setIsViewDialogOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Assessment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAssessment;
