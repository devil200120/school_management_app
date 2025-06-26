import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Archive, Edit, Eye, Trash2 } from 'lucide-react';
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Badge } from "../../../components/ui/badge";


const assignmentsData = [
  {
    id: "1",
    title: "Algebraic Equations Worksheet",
    description: "Complete the worksheet...",
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
      }
    ]
  },
  // More assignments...
];

const submissionsColumns = [
  { key: "studentName", header: "Student Name", sortable: true },
  { key: "submissionDate", header: "Submitted On", sortable: true },
  { key: "status", header: "Status", sortable: true },
  { key: "marks", header: "Marks", sortable: true },
];

function ManageAssignments() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewSubmissions, setViewSubmissions] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

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

  const tableData = filteredAssignments.map(assignment => ({
    ...assignment,
    status: renderStatus(assignment.status),
  }));

  const actionColumn = (assignment) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">Actions</Button>
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

  const handleDelete = () => {
    toast.success("Assignment deleted successfully");
    setDeleteDialog(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="space-y-6">
      {/* JSX continues... */}
    </div>
  );
}

export default ManageAssignments;
