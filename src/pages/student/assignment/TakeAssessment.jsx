import { useEffect } from 'react';
import { toast } from '../../../hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/card';
import { motion } from 'framer-motion';
import { PenTool, Clock, Award } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const TakeAssessment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast({
      title: "Welcome to Assessments",
      description: "Here you can take your scheduled assessments",
    });
  }, []);

  const assessments = [
    {
      id: "1",
      title: "Mathematics Mid-Term",
      subject: "Mathematics",
      questions: 30,
      duration: "60 minutes",
      deadline: "April 30, 2025",
      status: "available"
    },
    {
      id: "2",
      title: "Physics Quiz",
      subject: "Physics",
      questions: 20,
      duration: "45 minutes",
      deadline: "May 5, 2025",
      status: "available"
    },
    {
      id: "3",
      title: "English Literature Essay",
      subject: "English",
      questions: 5,
      duration: "90 minutes",
      deadline: "May 10, 2025",
      status: "available"
    },
    {
      id: "4",
      title: "Computer Science Practical",
      subject: "Computer Science",
      questions: 15,
      duration: "120 minutes",
      deadline: "April 28, 2025",
      status: "completed"
    }
  ];

  const handleStartAssessment = (id) => {
    toast({
      title: "Assessment Started",
      description: "Good luck with your assessment!",
    });
    // navigate(`/assessments/${id}`); // Enable this for actual routing
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Assessments</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Available Assessments */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <PenTool className="mr-2 text-eduos-primary" size={18} />
              Available Assessments
            </h3>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {assessments
                .filter(a => a.status === "available")
                .map((assessment) => (
                  <motion.div
                    key={assessment.id}
                    variants={item}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleStartAssessment(assessment.id)}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p style={{marginBottom: 0}} className="font-medium text-eduos-primary">{assessment.title}</p>
                        <p style={{marginBottom: 0}} className="text-sm text-gray-600">{assessment.subject}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>

                    <div className="mt-3 flex items-center text-xs text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Award size={14} className="mr-1" />
                        {assessment.questions} questions
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {assessment.duration}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-gray-500">
                      Due by: {assessment.deadline}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </CardContent>
        </Card>

        {/* Completed Assessments */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="mr-2 text-eduos-secondary" size={18} />
              Completed Assessments
            </h2>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {assessments
                .filter(a => a.status === "completed")
                .map((assessment) => (
                  <motion.div
                    key={assessment.id}
                    variants={item}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    whileHover={{
                      y: -2,
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p style={{marginBottom: 0}} className="font-medium">{assessment.title}</p>
                        <p style={{marginBottom: 0}} className="text-sm text-gray-600">{assessment.subject}</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>

                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Award size={14} className="mr-1" />
                        Score: 85%
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {assessment.duration}
                      </span>
                    </div>
                  </motion.div>
                ))}

              {assessments.filter(a => a.status === "completed").length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No completed assessments yet
                </div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TakeAssessment;
