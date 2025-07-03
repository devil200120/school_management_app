
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Archive, Edit, Eye, FileText, Plus, Trash2 } from 'lucide-react';
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Badge } from "../../../components/ui/badge";

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import DataTable from '../../../components/DataTable';
// import { Assignment, AssignmentSubmission } from '../../../types/teacher';

// Sample data
const assignmentsData = [
  {
    id: "1",
    title: "Algebraic Equations Worksheet",
    description: "Complete the worksheet on solving algebraic equations.",
    subject: "Mathematics",
    class: "Class 10",
    section: "A",
    dueDate: "2025-05-10",
    maxMarks: 20,
    status: "active",
    submissions: [
      {
        id: "s1",
        assignmentId: "1",
        studentId: "101",
        studentName: "John Doe",
        submissionDate: "2025-05-08",
        status: "submitted",
      },
      {
        id: "s2",
        assignmentId: "1",
        studentId: "102",
        studentName: "Jane Smith",
        submissionDate: "2025-05-09",
        status: "graded",
        marks: 18,
        feedback: "Excellent work!"
      },
    ]
  },
  {
    id: "2",
    title: "Essay on Environmental Conservation",
    description: "Write a 500-word essay on the importance of environmental conservation.",
    subject: "English",
    class: "Class 9",
    section: "B",
    dueDate: "2025-05-15",
    maxMarks: 50,
    status: "active",
  },
  {
    id: "3",
    title: "Human Anatomy Quiz",
    description: "Prepare for a quiz on human anatomy systems.",
    subject: "Biology",
    class: "Class 11",
    section: "A",
    dueDate: "2025-05-08",
    maxMarks: 30,
    status: "inactive",
  },
  {
    id: "4",
    title: "Historical Events Timeline",
    description: "Create a timeline of major historical events from 1900 to 2000.",
    subject: "History",
    class: "Class 8",
    section: "C",
    dueDate: "2025-05-20",
    maxMarks: 25,
    status: "active",
  },
  {
    id: "5",
    title: "Chemistry Lab Report",
    description: "Write a lab report on the chemical reactions observed in today's experiment.",
    subject: "Chemistry",
    class: "Class 12",
    section: "A",
    dueDate: "2025-05-12",
    maxMarks: 40,
    status: "inactive",
  }
];

// Submission data structure for the view submissions dialog
const submissionsColumns = [
  { key: "studentName", header: "Student Name", sortable: true },
  { key: "submissionDate", header: "Submitted On", sortable: true },
  { key: "status", header: "Status", sortable: true },
  { key: "marks", header: "Marks", sortable: true },
];

const ManageAssignments = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [viewSubmissions, setViewSubmissions] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Filter assignments based on active tab
  const filteredAssignments = assignmentsData.filter(assignment => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return assignment.status === "active";
    if (activeTab === "inactive") return assignment.status === "inactive";
    if (activeTab === "pending") {
      return assignment.status === "active" && (!assignment.submissions || assignment.submissions.length === 0);
    }
    if (activeTab === "submitted") {
      return assignment.submissions && assignment.submissions.some(s => s.status === "submitted");
    }
    if (activeTab === "graded") {
      return assignment.submissions && assignment.submissions.some(s => s.status === "graded");
    }
    return true;
  });

  // Table columns configuration
  const columns = [
    { key: "title", header: "Assignment", sortable: true },
    { key: "subject", header: "Subject", sortable: true },
    { key: "class", header: "Class", sortable: true },
    { key: "section", header: "Section", sortable: true },
    { key: "dueDate", header: "Due Date", sortable: true },
    { key: "status", header: "Status", sortable: true },
  ];

  // Render assignment status badge
  const renderStatus = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="outline" className="text-gray-500">Inactive</Badge>;
      default:
        return status;
    }
  };

  // Format assignments data for the table
  const tableData = filteredAssignments.map(assignment => ({
    ...assignment,
    status: renderStatus(assignment.status),
  }));

  // Action column for the assignments table
  const actionColumn = (assignment) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {
          setSelectedAssignment(assignment);
          setViewSubmissions(true);
        }}>
          <Eye className="mr-2 h-4 w-4" />
          <span>View Submissions</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/teacher/assignments/edit/${assignment.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit Assignment</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            const newStatus = assignment.status === "Active" ? "inactive" : "active";
            toast.success(`Assignment marked as ${newStatus}`);
          }}
        >
          <Archive className="mr-2 h-4 w-4" />
          <span>{assignment.status === "Active" ? "Deactivate" : "Activate"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-500"
          onClick={() => {
            setSelectedAssignment(assignment);
            setDeleteDialog(true);
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Handle delete assignment
  const handleDelete = () => {
    // In a real app, you would call an API to delete
    toast.success("Assignment deleted successfully");
    setDeleteDialog(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Manage Assignments"
        description="View and manage all your assignments"
      >
        <Button asChild>
          <Link to="/teacher/assignments/add" className="text-decoration">
            <Plus className="mr-2 h-4 w-4" />
            Add Assignment
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="p-4 border-b">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="graded">Graded</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="p-0 m-0">
            <DataTable
              columns={columns}
              data={tableData}
              actionColumn={actionColumn}
            />
          </TabsContent>
        </Tabs>
      </Card>

      {/* View Submissions Dialog */}
      <Dialog open={viewSubmissions} onOpenChange={setViewSubmissions}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedAssignment?.title} - Submissions</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.subject} | {selectedAssignment?.class} {selectedAssignment?.section}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAssignment?.submissions && selectedAssignment.submissions.length > 0 ? (
            <div className="overflow-x-auto">
              <DataTable
                columns={submissionsColumns}
                data={selectedAssignment.submissions.map(submission => ({
                  ...submission,
                  status: submission.status === "graded" ? 
                    <Badge className="bg-green-500">Graded</Badge> : 
                    <Badge className="bg-yellow-500">Submitted</Badge>,
                  marks: submission.marks || "-"
                }))}
                actionColumn={(item) => (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      // In a real app, you would navigate to a grading page
                      toast.info(`Viewing submission from ${item.studentName}`);
                    }}
                  >
                    {item.status.props.children === "Graded" ? "View Feedback" : "Grade"}
                  </Button>
                )}
              />
            </div>
          ) : (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium">No submissions yet</h3>
              <p className="mt-2 text-sm text-gray-500">
                There are no submissions for this assignment yet.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewSubmissions(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Assignment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedAssignment?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAssignments;
