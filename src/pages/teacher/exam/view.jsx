import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { CalendarDays, Clock, Users, FileText, Edit } from 'lucide-react';

const ViewAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState({
    title: 'Mathematics Mid-Term Exam',
    subject: 'Mathematics',
    class: 'Class 10',
    section: 'A',
    examType: 'Mid-Term',
    startDate: '2025-05-10',
    endDate: '2025-05-10',
    timeToSpend: '90',
    totalQuestions: 25,
    totalMarks: 100,
    status: 'upcoming',
    participantsCount: 35,
    description: 'This is a comprehensive mid-term examination covering chapters 1-5 of the Mathematics curriculum.'
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assessment Details</h1>
          <p className="text-muted-foreground">View assessment information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/teacher/exam/manage-assessment')}>
            Back to Assessments
          </Button>
          <Button onClick={() => navigate(`/teacher/exam/edit/${id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Assessment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{assessment.title}</CardTitle>
            {getStatusBadge(assessment.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Subject</h3>
              <p className="text-gray-600">{assessment.subject}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Class & Section</h3>
              <p className="text-gray-600">{assessment.class} - {assessment.section}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Exam Type</h3>
              <p className="text-gray-600">{assessment.examType}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Start Date</h3>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                <p className="text-gray-600">{formatDate(assessment.startDate)}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">End Date</h3>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                <p className="text-gray-600">{formatDate(assessment.endDate)}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Duration</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <p className="text-gray-600">{assessment.timeToSpend} minutes</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Total Questions</h3>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <p className="text-gray-600">{assessment.totalQuestions}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Total Marks</h3>
              <p className="text-gray-600">{assessment.totalMarks}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Participants</h3>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <p className="text-gray-600">{assessment.participantsCount} students</p>
              </div>
            </div>
          </div>
          
          {assessment.description && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Description</h3>
              <p className="text-gray-600">{assessment.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewAssessment;
