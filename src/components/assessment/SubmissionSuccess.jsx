import React from 'react';
import { DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { Download, Share, Home } from 'lucide-react';

const CheckIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SubmissionSuccess = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      className="py-12 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex justify-center mb-6"
        variants={itemVariants}
      >
        <motion.div 
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            backgroundColor: ["#dcfce7", "#bbf7d0", "#dcfce7"] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <CheckIcon className="h-12 w-12 text-green-500" />
        </motion.div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <DialogTitle className="text-2xl mb-3">Assessment Submitted!</DialogTitle>
        <DialogDescription className="text-lg mb-8">
          Thank you for completing the assessment. Your answers have been recorded.
        </DialogDescription>
      </motion.div>
      
      <motion.div 
        className="flex flex-wrap justify-center gap-3"
        variants={itemVariants}
      >
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Certificate
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          Share Result
        </Button>
        <Button className="bg-eduos-primary hover:bg-eduos-secondary flex items-center gap-2">
          <Home className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </motion.div>
      
      <motion.div 
        className="mt-8 text-gray-500 text-sm"
        variants={itemVariants}
      >
        Your results will be available in the "My Assessment Score" section.
      </motion.div>
    </motion.div>
  );
};

export default SubmissionSuccess;
