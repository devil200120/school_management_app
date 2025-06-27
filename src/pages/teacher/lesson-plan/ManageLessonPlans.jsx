
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
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
} from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Copy, 
  Download, 
  Edit, 
  Eye, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  User 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useToast } from '../../../hooks/use-toast';

// Sample lesson plans data
const lessonPlans = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    class: 'Class 8',
    section: 'Section A',
    date: '2025-05-15',
    duration: '45',
    status: 'planned',
    objectives: ['Understand basic algebraic concepts', 'Solve simple equations'],
    createdAt: '2025-05-01',
  },
  {
    id: '2',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    class: 'Class 10',
    section: 'Section B',
    date: '2025-05-10',
    duration: '60',
    status: 'completed',
    objectives: ['Understand and apply Newton\'s three laws of motion', 'Solve problems using F=ma'],
    createdAt: '2025-04-28',
  },
  {
    id: '3',
    title: 'Cell Structure and Function',
    subject: 'Biology',
    class: 'Class 9',
    section: 'Section A',
    date: '2025-05-12',
    duration: '45',
    status: 'planned',
    objectives: ['Identify parts of a cell', 'Understand cell functions'],
    createdAt: '2025-05-02',
  },
  {
    id: '4',
    title: 'Chemical Bonding',
    subject: 'Chemistry',
    class: 'Class 11',
    section: 'Section A',
    date: '2025-05-06',
    duration: '55',
    status: 'completed',
    objectives: ['Understand ionic and covalent bonds', 'Draw Lewis structures'],
    createdAt: '2025-04-25',
  },
  {
    id: '5',
    title: 'Shakespeare\'s Hamlet',
    subject: 'English',
    class: 'Class 12',
    section: 'Section B',
    date: '2025-05-18',
    duration: '60',
    status: 'planned',
    objectives: ['Analyze key themes in Hamlet', 'Discuss character development'],
    createdAt: '2025-05-03',
  },
  {
    id: '6',
    title: 'World War II',
    subject: 'History',
    class: 'Class 10',
    section: 'Section C',
    date: '2025-05-08',
    duration: '50',
    status: 'completed',
    objectives: ['Understand major events of WWII', 'Analyze impact on modern world'],
    createdAt: '2025-04-26',
  },
  {
    id: '7',
    title: 'HTML and CSS Basics',
    subject: 'Computer Science',
    class: 'Class 9',
    section: 'Section B',
    date: '2025-05-20',
    duration: '45',
    status: 'planned',
    objectives: ['Create basic HTML pages', 'Apply CSS styling'],
    createdAt: '2025-05-04',
  },
];

const ManageLessonPlans= () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isPlanViewOpen, setIsPlanViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  
  const filteredPlans = lessonPlans.filter(plan => {
    const matchesSearch = 
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      plan.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSubject = subjectFilter === 'all' || plan.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleViewPlan = (id) => {
    setSelectedPlanId(id);
    setIsPlanViewOpen(true);
  };

  const handleEditPlan = (id) => {
    // In a real app, navigate to the edit page with the plan ID
    navigate(`/teacher/lesson-plan/edit/${id}`);
  };

  const handleDeleteConfirm = () => {
    if (!selectedPlanId) return;
    
    // In a real app, you would delete the plan from your backend
    console.log(`Deleting plan with ID: ${selectedPlanId}`);
    
    toast({
      title: "Lesson plan deleted",
      description: "The lesson plan has been deleted successfully."
    });
    
    setIsDeleteDialogOpen(false);
    setSelectedPlanId(null);
  };

  const handleDuplicatePlan = (id) => {
    // In a real app, you would duplicate the plan in your backend
    console.log(`Duplicating plan with ID: ${id}`);
    
    toast({
      title: "Lesson plan duplicated",
      description: "A copy of the lesson plan has been created."
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'planned':
        return <Badge className="bg-blue-500">Planned</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-red-600 border-red-600">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const selectedPlan = selectedPlanId ? lessonPlans.find(plan => plan.id === selectedPlanId) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Lesson Plans</h1>
          <p className="text-muted-foreground">View and manage your teaching plans</p>
        </div>
        
        <Button onClick={() => navigate('/teacher/lesson-plan/add')} className="gap-2">
          <Plus size={16} />
          Create New Plan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search lesson plans..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <Select 
                  value={subjectFilter} 
                  onValueChange={setSubjectFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <BookOpen size={14} className="mr-2" />
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
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
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  <TableHead>Subject</TableHead>
                  <TableHead>Class / Section</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No lesson plans found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.title}</TableCell>
                      <TableCell>{plan.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{plan.class}, {plan.section}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(plan.date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{plan.duration} mins</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(plan.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal size={16} />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewPlan(plan.id)}>
                              <Eye size={14} className="mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditPlan(plan.id)}>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicatePlan(plan.id)}>
                              <Copy size={14} className="mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download size={14} className="mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedPlanId(plan.id);
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
            Showing {filteredPlans.length} of {lessonPlans.length} lesson plans
          </div>
          {/* Pagination could go here */}
        </CardFooter>
      </Card>
      
      {/* View Lesson Plan Dialog */}
      <Dialog open={isPlanViewOpen} onOpenChange={setIsPlanViewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Lesson Plan Details</DialogTitle>
            <DialogDescription>
              {selectedPlan && (
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={selectedPlan.status === 'completed' ? 'outline' : 'default'}
                    className={`
                      ${selectedPlan.status === 'planned' ? 'bg-blue-500' : 
                       selectedPlan.status === 'completed' ? 'text-green-600 border-green-600' : ''}
                    `}
                  >
                    {selectedPlan.status.charAt(0).toUpperCase() + selectedPlan.status.slice(1)}
                  </Badge>
                  <span className="text-sm">Created on {formatDate(selectedPlan.createdAt)}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPlan && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">{selectedPlan.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p>{selectedPlan.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Class & Section</p>
                    <p>{selectedPlan.class}, {selectedPlan.section}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p>{formatDate(selectedPlan.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p>{selectedPlan.duration} minutes</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Objectives</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedPlan.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
              
              {/* Additional content would be shown here based on the actual lesson plan data */}
              <div className="bg-gray-50 p-4 rounded-md border">
                <p className="text-gray-500 text-sm mb-2">Additional details</p>
                <p className="text-sm">This preview shows limited information. To view the complete lesson plan, click "Edit" to open the full view.</p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between w-full gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                if (selectedPlanId) handleEditPlan(selectedPlanId);
                setIsPlanViewOpen(false);
              }}
            >
              <Edit size={16} className="mr-2" />
              Edit Plan
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsPlanViewOpen(false)}>
                Close
              </Button>
              <Button>
                <Download size={16} className="mr-2" />
                Download PDF
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lesson Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lesson plan? This action cannot be undone.
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
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageLessonPlans;
