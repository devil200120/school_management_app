
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
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
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
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../../components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../../components/ui/tabs';
import { Textarea } from '../../../components/ui/textarea';
import { Download, Eye, MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';

// Sample lesson plan data
const mockLessonPlans = [
  {
    id: 1,
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    teacher: 'Mr. Johnson',
    class: 'JSS 3',
    term: 'First Term',
    week: 'Week 1',
    dateSubmitted: '2025-04-28',
    status: 'Approved',
    feedback: 2,
    rating: 4.5
  },
  {
    id: 2,
    title: 'Shakespeare\'s Macbeth',
    subject: 'English Language',
    teacher: 'Mrs. Smith',
    class: 'SSS 2',
    term: 'First Term',
    week: 'Week 1',
    dateSubmitted: '2025-04-29',
    status: 'Pending Review',
    feedback: 0,
    rating: 0
  },
  {
    id: 3,
    title: 'Cell Structure and Function',
    subject: 'Biology',
    teacher: 'Dr. Williams',
    class: 'SSS 1',
    term: 'First Term',
    week: 'Week 1',
    dateSubmitted: '2025-04-26',
    status: 'Needs Revision',
    feedback: 3,
    rating: 3.0
  },
  {
    id: 4,
    title: 'Introduction to Electric Circuits',
    subject: 'Physics',
    teacher: 'Prof. Brown',
    class: 'SSS 3',
    term: 'First Term',
    week: 'Week 1',
    dateSubmitted: '2025-04-27',
    status: 'Approved',
    feedback: 1,
    rating: 5.0
  },
  {
    id: 5,
    title: 'Chemical Reactions and Equations',
    subject: 'Chemistry',
    teacher: 'Dr. Davis',
    class: 'SSS 2',
    term: 'First Term',
    week: 'Week 1',
    dateSubmitted: '2025-04-30',
    status: 'Pending Review',
    feedback: 0,
    rating: 0
  }
];

// Sample student feedbacks
const mockFeedbacks = [
  {
    id: 1,
    lessonPlanId: 1,
    studentName: 'Emma Johnson',
    class: 'JSS 3',
    comment: 'The examples made it easy to understand algebraic equations.',
    rating: 5,
    dateSubmitted: '2025-05-02'
  },
  {
    id: 2,
    lessonPlanId: 1,
    studentName: 'James Smith',
    class: 'JSS 3',
    comment: 'Could use more practice problems, but overall a good lesson.',
    rating: 4,
    dateSubmitted: '2025-05-02'
  },
  {
    id: 3,
    lessonPlanId: 3,
    studentName: 'Sophia Williams',
    class: 'SSS 1',
    comment: 'The diagrams of cell structures were helpful but I would like more interactive content.',
    rating: 3,
    dateSubmitted: '2025-05-01'
  },
  {
    id: 4,
    lessonPlanId: 3,
    studentName: 'Liam Brown',
    class: 'SSS 1',
    comment: 'Enjoyed the lesson but found some concepts difficult to grasp.',
    rating: 3,
    dateSubmitted: '2025-04-30'
  },
  {
    id: 5,
    lessonPlanId: 3,
    studentName: 'Olivia Davis',
    class: 'SSS 1',
    comment: 'The activities were engaging and helped me understand cell functions better.',
    rating: 4,
    dateSubmitted: '2025-05-01'
  },
  {
    id: 6,
    lessonPlanId: 4,
    studentName: 'Noah Wilson',
    class: 'SSS 3',
    comment: 'Excellent explanation of how electric circuits work. The practical applications were particularly helpful.',
    rating: 5,
    dateSubmitted: '2025-04-29'
  }
];

// Sample lesson plan details
const sampleLessonPlanContent = {
  overview: 
    `This lesson introduces students to the fundamental concepts of algebra, including variables, expressions, equations, and basic operations. Students will learn how to identify, write, and solve basic algebraic equations.`,
  objectives: [
    'Understand the concept of variables in algebra',
    'Identify and write algebraic expressions',
    'Solve simple one-step algebraic equations',
    'Apply algebraic concepts to real-world scenarios'
  ],
  materials: [
    'Textbook: "Fundamentals of Algebra"',
    'Worksheets for practice',
    'Interactive whiteboard',
    'Algebra tiles (manipulatives)'
  ],
  procedure: [
    {
      step: 'Introduction (10 minutes)',
      description: 'Begin by discussing real-world scenarios where algebra is used. Present a problem that can be solved using algebra to generate interest.'
    },
    {
      step: 'Direct Instruction (20 minutes)',
      description: 'Introduce variables and explain that they represent unknown values. Demonstrate how to write expressions using variables. Show examples of translating word problems into algebraic expressions.'
    },
    {
      step: 'Guided Practice (15 minutes)',
      description: 'Work through several examples of writing and solving simple equations as a class. Use the think-aloud strategy to model problem-solving thoughts.'
    },
    {
      step: 'Independent Practice (20 minutes)',
      description: 'Students work on worksheet problems individually or in pairs. Teacher circulates to provide support and clarification.'
    },
    {
      step: 'Closure (5 minutes)',
      description: 'Summarize key concepts learned. Have students share one thing they learned and one question they still have.'
    }
  ],
  assessment: 'Formative assessment through worksheet completion, class participation, and exit ticket responses. Summative assessment will be a quiz at the end of the week.',
  differentiation: 'Advanced students will receive more complex problems involving multiple steps. Students needing support will work with simplified equations and receive step-by-step guidance cards.',
  homework: 'Complete practice problems 1-10 on page 25 of the textbook. Write a real-world scenario that can be solved using an algebraic equation.'
};

const ViewLessonPlans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [selectedLessonPlan, setSelectedLessonPlan] = useState(null);
  const [viewDetailsDialog, setViewDetailsDialog] = useState(false);
  const [adminFeedback, setAdminFeedback] = useState('');
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLessonPlans = mockLessonPlans.filter(plan => {
    const matchesSearch = 
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || plan.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesClass = classFilter === 'all' || plan.class.toLowerCase() === classFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesClass;
  });

  const handleStatusChange = (planId, newStatus) => {
    // In a real app, you'd update this in your backend
    toast.success(`Lesson plan status updated to ${newStatus}`);
    setViewDetailsDialog(false);
  };

  const submitFeedback = () => {
    if (adminFeedback.trim() === '') {
      toast.error('Please enter feedback before submitting');
      return;
    }
    
    toast.success('Feedback submitted successfully');
    setAdminFeedback('');
    setFeedbackDialogOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get feedback for a specific lesson plan
  const getLessonPlanFeedback = (lessonPlanId) => {
    return mockFeedbacks.filter(feedback => feedback.lessonPlanId === lessonPlanId);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="bg-eduos-light">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lesson Plans</CardTitle>
              <CardDescription>Review and manage teacher lesson plans</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  placeholder="Search lesson plans..." 
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
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending review">Pending Review</SelectItem>
                    <SelectItem value="needs revision">Needs Revision</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  defaultValue="all" 
                  onValueChange={setClassFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="jss 3">JSS 3</SelectItem>
                    <SelectItem value="sss 1">SSS 1</SelectItem>
                    <SelectItem value="sss 2">SSS 2</SelectItem>
                    <SelectItem value="sss 3">SSS 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>List of all lesson plans</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Week</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLessonPlans.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">No lesson plans found</TableCell>
                    </TableRow>
                  ) : (
                    filteredLessonPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.title}</TableCell>
                        <TableCell>{plan.subject}</TableCell>
                        <TableCell>{plan.teacher}</TableCell>
                        <TableCell>{plan.class}</TableCell>
                        <TableCell>{plan.week}</TableCell>
                        <TableCell>{formatDate(plan.dateSubmitted)}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`${
                              plan.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              plan.status === 'Needs Revision' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {plan.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {plan.feedback > 0 ? (
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{plan.feedback}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedLessonPlan(plan);
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
          </div>
        </CardContent>
      </Card>

      {/* Lesson Plan Details Dialog */}
      <Dialog open={viewDetailsDialog} onOpenChange={setViewDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lesson Plan Details</DialogTitle>
            <DialogDescription>
              Review detailed lesson plan information
            </DialogDescription>
          </DialogHeader>

          {selectedLessonPlan && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedLessonPlan.title}</h2>
                  <p className="text-gray-600">
                    {selectedLessonPlan.subject} | {selectedLessonPlan.class} | {selectedLessonPlan.term} | {selectedLessonPlan.week}
                  </p>
                </div>
                
                <div className="mt-2 md:mt-0 flex items-center gap-2">
                  <Badge 
                    className={`${
                      selectedLessonPlan.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      selectedLessonPlan.status === 'Needs Revision' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedLessonPlan.status}
                  </Badge>
                  
                  {selectedLessonPlan.rating > 0 && (
                    <Badge className="bg-eduos-light text-eduos-primary flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{selectedLessonPlan.rating.toFixed(1)}/5</span>
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="border-t border-b py-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Teacher:</span> {selectedLessonPlan.teacher}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Submitted:</span> {formatDate(selectedLessonPlan.dateSubmitted)}
                </p>
              </div>

              <Tabs defaultValue="content" className="w-full">
                <TabsList>
                  <TabsTrigger value="content">Lesson Content</TabsTrigger>
                  <TabsTrigger value="feedback">
                    Student Feedback
                    {selectedLessonPlan.feedback > 0 && <span className="ml-1 text-xs bg-eduos-primary text-white rounded-full px-1.5">{selectedLessonPlan.feedback}</span>}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Overview</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                      {sampleLessonPlanContent.overview}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Learning Objectives</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {sampleLessonPlanContent.objectives.map((objective, index) => (
                        <li key={index} className="text-gray-700">{objective}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Materials Required</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {sampleLessonPlanContent.materials.map((material, index) => (
                        <li key={index} className="text-gray-700">{material}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Lesson Procedure</h3>
                    <div className="space-y-3">
                      {sampleLessonPlanContent.procedure.map((step, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                          <h4 className="font-medium">{step.step}</h4>
                          <p className="text-gray-700">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Assessment</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                      {sampleLessonPlanContent.assessment}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Differentiation</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                      {sampleLessonPlanContent.differentiation}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Homework</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                      {sampleLessonPlanContent.homework}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="feedback" className="space-y-4 mt-4">
                  {getLessonPlanFeedback(selectedLessonPlan.id).length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-md">
                      <MessageSquare className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-500">No student feedback available for this lesson plan</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getLessonPlanFeedback(selectedLessonPlan.id).map((feedback) => (
                        <div key={feedback.id} className="bg-gray-50 p-4 rounded-md">
                          <div className="flex justify-between mb-2">
                            <div>
                              <p className="font-medium">{feedback.studentName}</p>
                              <p className="text-sm text-gray-600">{feedback.class} | {formatDate(feedback.dateSubmitted)}</p>
                            </div>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <ThumbsUp 
                                  key={i} 
                                  className={`h-4 w-4 ${i < feedback.rating ? 'text-eduos-primary' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{feedback.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="pt-4 flex justify-end gap-2 border-t">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setAdminFeedback('');
                    setFeedbackDialogOpen(true);
                  }}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Provide Feedback
                </Button>
                
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Plan
                </Button>
                
                {selectedLessonPlan.status === 'Pending Review' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="border-red-200 text-red-500 hover:bg-red-50"
                      onClick={() => handleStatusChange(selectedLessonPlan.id, 'Needs Revision')}
                    >
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Needs Revision
                    </Button>
                    
                    <Button
                      onClick={() => handleStatusChange(selectedLessonPlan.id, 'Approved')}
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Approve Plan
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Admin Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogDescription>
              Share your feedback with the teacher about this lesson plan
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Textarea 
              placeholder="Enter your feedback here..."
              value={adminFeedback}
              onChange={(e) => setAdminFeedback(e.target.value)}
              rows={6}
            />
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitFeedback}>
                Submit Feedback
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewLessonPlans;
