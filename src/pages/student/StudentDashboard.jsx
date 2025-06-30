import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatCard from '../../components/assessment/StatCard';
import { BookOpen, Award, Clock, ClipboardCheck } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const StudentDashboard = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: 'Take Assessment',
      path: '/student/assignment/take-assessment',
      icon: <ClipboardCheck className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500" />,
    },
    {
      title: 'Check Results',
      path: '/student/result/check',
      icon: <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />,
    },
    {
      title: 'View Timetable',
      path: '/student/timetable',
      icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />,
    },
    {
      title: 'Digital Library',
      path: '/student/library/ebooks',
      icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-6 sm:space-y-8"
    >
      <DashboardLayout />

      {/* Quick Access Cards */}
      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 sm:text-left">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickLinks.map((link, index) => (
            <StatCard
              key={index}
              title={link.title}
              value="Explore"
              icon={link.icon}
              color="from-white to-gray-50"
              onClick={() => navigate(link.path)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;
