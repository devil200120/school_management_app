import React from 'react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { CalendarClock, Clock, FileText, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const AssessmentCard = ({ assignment, onStartAssessment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const today = new Date();
  const endDate = new Date(assignment.endDate);
  const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  const isUrgent = daysRemaining <= 3;

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -3 }}
      className="border rounded-lg p-5 hover:shadow-lg transition-all duration-300 bg-white border-l-4 border-l-eduos-primary"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-eduos-primary">{assignment.subject}</Badge>
            <Badge variant="outline">{assignment.class}</Badge>
            {isUrgent && (
              <motion.div 
                initial={{ scale: 0.8 }} 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Badge className="bg-red-500 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Due Soon
                </Badge>
              </motion.div>
            )}
          </div>
          <h3 className="font-semibold text-lg">{assignment.subject} Assessment</h3>
          <p className="text-gray-600 text-sm">{assignment.description}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{assignment.timeToSpend}</div>
            <div className="flex items-center gap-1">
              <CalendarClock className="h-4 w-4" />
              <span>Due: {formatDate(assignment.endDate)}</span>
              {isUrgent && (
                <span className="text-red-500 font-medium ml-1">
                  ({daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left)
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" /> Marks: {assignment.markContained}
            </div>
          </div>
        </div>
        <Button 
          className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 whitespace-nowrap"
          onClick={() => onStartAssessment(assignment)}
        >
          <Clock className="mr-2 h-4 w-4" /> Start Assessment
        </Button>
      </div>
    </motion.div>
  );
};

export default AssessmentCard;
